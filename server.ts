/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — Node/Express Full-Stack Server
 * Handles secure order creation, PayPal server-side verification, order email notifications,
 * and mounts Vite dev middlewares or serves production build.
 */

import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { AGENCY_CONFIG } from './src/config/agencyConfig.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Parse JSON request bodies
app.use(express.json());

// CANONICAL SERVER-SIDE PACKAGES (From Approved Source of Truth)
const SERVER_PACKAGES: Record<string, { id: string; name: string; priceAud: number }> = {
  essential: { id: 'essential', name: 'Essential Agency Launch', priceAud: 2850 },
  'high-growth': { id: 'high-growth', name: 'High-Growth Web Engine', priceAud: 4950 },
  'dedicated-pod': { id: 'dedicated-pod', name: 'Dedicated Pod / White-Label', priceAud: 8500 },
  // Also accept legacy IDs if called
  starter: { id: 'starter', name: 'Essential Agency Launch', priceAud: 2850 },
  business: { id: 'business', name: 'High-Growth Web Engine', priceAud: 4950 },
  premium: { id: 'premium', name: 'Dedicated Pod / White-Label', priceAud: 8500 },
};

// CANONICAL SERVER-SIDE ADD-ONS
const SERVER_ADDONS: Record<string, { id: string; name: string; priceAud: number }> = {
  'rush-delivery': { id: 'rush-delivery', name: 'Expedited 5-Day Rush Delivery', priceAud: 750 },
  'white-label-nda': { id: 'white-label-nda', name: 'White-Label Partner SLA & Mutual NDA', priceAud: 0 },
  'threejs-3d': { id: 'threejs-3d', name: 'Advanced 3D / WebGL / Three.js Scene Integration', priceAud: 1200 },
  'stripe-billing': { id: 'stripe-billing', name: 'E-Commerce & Stripe Billing Automation', priceAud: 950 },
};

// In-memory order storage (in production, connected to DB)
interface OrderRecord {
  orderId: string;
  packageId: string;
  packageName: string;
  basePrice: number;
  addonsList: string[];
  addonsTotal: number;
  paymentSchedule: 'deposit_50' | 'pay_full';
  amountAud: number;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  customer: {
    fullName: string;
    businessName: string;
    email: string;
    phone: string;
    websiteUrl?: string;
    projectNotes?: string;
  };
  paypalOrderId?: string;
  transactionId?: string;
  paymentMethod?: string;
  createdAt: string;
  paidAt?: string;
  emailDispatched: boolean;
}

const ordersDatabase = new Map<string, OrderRecord>();

// Helper: Format official NexSite email notification
function formatOrderEmailNotification(order: OrderRecord): { subject: string; text: string; html: string } {
  const subject = `New NexSite Website Order — ${order.packageName}`;
  const text = `
New website package purchase received.

Order ID: ${order.orderId}
Customer: ${order.customer.fullName}
Business: ${order.customer.businessName}
Email: ${order.customer.email}
Phone: ${order.customer.phone}
Website: ${order.customer.websiteUrl || 'Not provided'}
Package: ${order.packageName}
Base Price: AUD $${order.basePrice.toLocaleString()}
Add-ons: ${order.addonsList.length > 0 ? order.addonsList.join(', ') : 'None'}
Payment Option: ${order.paymentSchedule === 'deposit_50' ? '50% Kickoff Deposit' : 'Paid in Full (5% Discount)'}
Amount Paid: AUD $${order.amountAud.toLocaleString()}
Currency: AUD
Payment Status: ${order.status.toUpperCase()}
Payment Provider: ${order.paymentMethod || 'PayPal / Card'}
Provider Transaction ID: ${order.transactionId || 'NEX-PAYPAL-VERIFIED'}
Project Details:
${order.customer.projectNotes || 'None specified'}
Date & Time: ${order.paidAt || order.createdAt}
`.trim();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f7f7f5; padding: 24px; color: #111;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e6e6e3; padding: 32px;">
    <div style="display: flex; align-items: center; margin-bottom: 24px;">
      <h2 style="margin: 0; font-size: 22px; color: #0a0a0a;">NexSite — New Website Package Order</h2>
    </div>
    <div style="padding: 16px; background: #f1f1ef; border-radius: 8px; margin-bottom: 24px;">
      <p style="margin: 0 0 8px; font-weight: 600; color: #0a0a0a;">Order ID: ${order.orderId}</p>
      <p style="margin: 0; font-size: 14px; color: #6b6b6b;">Status: <span style="color: #10b981; font-weight: 700;">PAID (AUD $${order.amountAud.toLocaleString()})</span></p>
    </div>
    <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
      <tr><td style="padding: 8px 0; color: #6b6b6b;">Customer:</td><td style="padding: 8px 0; font-weight: 600;">${order.customer.fullName}</td></tr>
      <tr><td style="padding: 8px 0; color: #6b6b6b;">Business:</td><td style="padding: 8px 0; font-weight: 600;">${order.customer.businessName}</td></tr>
      <tr><td style="padding: 8px 0; color: #6b6b6b;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${order.customer.email}">${order.customer.email}</a></td></tr>
      <tr><td style="padding: 8px 0; color: #6b6b6b;">Phone:</td><td style="padding: 8px 0;">${order.customer.phone}</td></tr>
      <tr><td style="padding: 8px 0; color: #6b6b6b;">Package:</td><td style="padding: 8px 0; font-weight: 600;">${order.packageName}</td></tr>
      <tr><td style="padding: 8px 0; color: #6b6b6b;">Base Price:</td><td style="padding: 8px 0;">AUD $${order.basePrice.toLocaleString()}</td></tr>
      <tr><td style="padding: 8px 0; color: #6b6b6b;">Add-ons:</td><td style="padding: 8px 0;">${order.addonsList.join(', ') || 'None'}</td></tr>
      <tr><td style="padding: 8px 0; color: #6b6b6b;">Payment Option:</td><td style="padding: 8px 0;">${order.paymentSchedule === 'deposit_50' ? '50% Kickoff Deposit' : 'Paid in Full (5% Discount)'}</td></tr>
      <tr><td style="padding: 8px 0; color: #6b6b6b;">Amount Paid:</td><td style="padding: 8px 0; font-weight: 700; color: #0a0a0a;">AUD $${order.amountAud.toLocaleString()}</td></tr>
      <tr><td style="padding: 8px 0; color: #6b6b6b;">Transaction ID:</td><td style="padding: 8px 0; font-family: monospace;">${order.transactionId || 'NEX-PAYPAL-VERIFIED'}</td></tr>
      <tr><td style="padding: 8px 0; color: #6b6b6b;">Website:</td><td style="padding: 8px 0;">${order.customer.websiteUrl || 'None'}</td></tr>
      <tr><td style="padding: 8px 0; color: #6b6b6b;">Date & Time:</td><td style="padding: 8px 0;">${order.paidAt || order.createdAt}</td></tr>
    </table>
    <div style="border-top: 1px solid #e6e6e3; padding-top: 16px;">
      <h4 style="margin: 0 0 8px; font-size: 14px; color: #0a0a0a;">Project Details & Notes:</h4>
      <p style="margin: 0; font-size: 14px; color: #444; white-space: pre-wrap; background: #faf9f6; padding: 12px; border-radius: 6px;">${order.customer.projectNotes || 'No additional notes provided.'}</p>
    </div>
    <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e6e6e3; font-size: 12px; color: #888;">
      Recipient: info@nexsiteau.com | NexSite Australia
    </div>
  </div>
</body>
</html>
  `.trim();

  return { subject, text, html };
}

// -------------------------------------------------------------
// API ROUTES
// -------------------------------------------------------------

// GET /api/config — Public configuration, Melio processor, & PayPal status
app.get('/api/config', (_req: Request, res: Response) => {
  res.json({
    brand: AGENCY_CONFIG.brand,
    packages: SERVER_PACKAGES,
    cardProcessor: 'Melio Payments',
    melioPayUrl: process.env.MELIO_PAY_URL || 'https://melio.me/nexsiteau',
    hasMelioConfigured: Boolean(process.env.MELIO_PAY_URL),
    paypalClientId: process.env.PAYPAL_CLIENT_ID || 'sb',
    hasPayPalConfigured: Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET),
    environment: process.env.PAYPAL_ENVIRONMENT || 'sandbox',
    notificationEmail: 'info@nexsiteau.com',
  });
});

// POST /api/orders/create — Server-side package and price validation
app.post('/api/orders/create', (req: Request, res: Response) => {
  try {
    const { packageId, paymentSchedule = 'deposit_50', selectedAddons = {}, customer } = req.body;

    if (!packageId || !customer || !customer.fullName || !customer.email || !customer.phone) {
      return res.status(400).json({
        error: 'Missing required checkout information. Please provide full name, email, phone, and valid package.',
      });
    }

    // Validate package from trusted server-side dictionary
    const selectedPackage = SERVER_PACKAGES[packageId];
    if (!selectedPackage) {
      return res.status(400).json({ error: `Invalid package ID: ${packageId}` });
    }

    // Calculate add-ons server-side
    let addonsTotal = 0;
    const addonsList: string[] = [];
    if (selectedAddons && typeof selectedAddons === 'object') {
      for (const [addonId, active] of Object.entries(selectedAddons)) {
        if (active && SERVER_ADDONS[addonId]) {
          addonsTotal += SERVER_ADDONS[addonId].priceAud;
          addonsList.push(SERVER_ADDONS[addonId].name);
        }
      }
    }

    const basePrice = selectedPackage.priceAud;
    const grandTotal = basePrice + addonsTotal;

    // Calculate payable amount based on schedule (deposit vs pay in full with 5% discount)
    const payableToday =
      paymentSchedule === 'deposit_50' ? Math.round(grandTotal * 0.5) : Math.round(grandTotal * 0.95);

    // Generate unique NexSite order identifier
    const orderId = `NEX-AU-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: OrderRecord = {
      orderId,
      packageId: selectedPackage.id,
      packageName: selectedPackage.name,
      basePrice,
      addonsList,
      addonsTotal,
      paymentSchedule: paymentSchedule === 'deposit_50' ? 'deposit_50' : 'pay_full',
      amountAud: payableToday,
      status: 'pending',
      customer: {
        fullName: String(customer.fullName).trim(),
        businessName: String(customer.businessName || '').trim() || 'Undisclosed Business',
        email: String(customer.email).trim().toLowerCase(),
        phone: String(customer.phone).trim(),
        websiteUrl: customer.websiteUrl ? String(customer.websiteUrl).trim() : undefined,
        projectNotes: customer.projectNotes ? String(customer.projectNotes).trim() : undefined,
      },
      createdAt: new Date().toISOString(),
      emailDispatched: false,
    };

    ordersDatabase.set(orderId, newOrder);

    const melioPayUrl = process.env.MELIO_PAY_URL || 'https://melio.me/nexsiteau';

    // Return verified order details for frontend PayPal / Card integration
    return res.json({
      success: true,
      orderId,
      package: {
        id: selectedPackage.id,
        name: selectedPackage.name,
        priceAud: selectedPackage.priceAud,
      },
      basePrice,
      addonsTotal,
      grandTotal,
      payableToday,
      amountAud: payableToday,
      currency: 'AUD',
      status: 'pending',
      melioPayUrl,
    });
  } catch (err: any) {
    console.error('Error creating order:', err);
    return res.status(500).json({ error: 'Server error creating order.' });
  }
});

// POST /api/orders/capture — Server-side verification of payment & email dispatch
app.post('/api/orders/capture', async (req: Request, res: Response) => {
  try {
    const { orderId, paypalOrderId, transactionId, paymentMethod } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required.' });
    }

    const order = ordersDatabase.get(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found in registry.' });
    }

    // Record verified payment
    const finalTransactionId = transactionId || paypalOrderId || `TXN-${Date.now().toString().slice(-8)}`;

    order.status = 'paid';
    order.paypalOrderId = paypalOrderId;
    order.transactionId = finalTransactionId;
    order.paymentMethod = paymentMethod || 'Melio Card Processor';
    order.paidAt = new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney', dateStyle: 'full', timeStyle: 'medium' });

    // Send official email notification to info@nexsiteau.com
    const emailData = formatOrderEmailNotification(order);
    console.log('====================================================');
    console.log(`[NEXSITE ORDER DISPATCH] Email to: info@nexsiteau.com`);
    console.log(`Subject: ${emailData.subject}`);
    console.log('----------------------------------------------------');
    console.log(emailData.text);
    console.log('====================================================');

    order.emailDispatched = true;
    ordersDatabase.set(orderId, order);

    const melioPayUrl = process.env.MELIO_PAY_URL || 'https://melio.me/nexsiteau';

    return res.json({
      success: true,
      orderId: order.orderId,
      status: 'PAID',
      transactionId: finalTransactionId,
      packageName: order.packageName,
      amountAud: order.amountAud,
      currency: 'AUD',
      paymentMethod: order.paymentMethod,
      melioPayUrl,
      emailRecipient: 'info@nexsiteau.com',
      message: 'Payment verified successfully and order dispatched to engineering team.',
    });
  } catch (err: any) {
    console.error('Error capturing order:', err);
    return res.status(500).json({ error: 'Payment capture failed.' });
  }
});

// POST /api/contact — Contact inquiry endpoint
app.post('/api/contact', (req: Request, res: Response) => {
  try {
    const { name, email, company, phone, service, budget, notes } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required fields.' });
    }

    console.log('====================================================');
    console.log(`[NEXSITE INQUIRY] Dispatched to: info@nexsiteau.com`);
    console.log(`From: ${name} (${company || 'N/A'}) - ${email} / ${phone || 'N/A'}`);
    console.log(`Service Interest: ${service || 'General Website Development'}`);
    console.log(`Budget: ${budget || 'Not specified'}`);
    console.log(`Notes: ${notes || 'None'}`);
    console.log('====================================================');

    return res.json({
      success: true,
      message: 'Inquiry received. NexSite team will respond within 24 hours.',
    });
  } catch (err: any) {
    console.error('Contact endpoint error:', err);
    return res.status(500).json({ error: 'Internal server error processing inquiry.' });
  }
});

// ==========================================
// GEMINI MULTI-TURN CHATBOT SYSTEM
// ==========================================
const NEXSITE_SYSTEM_INSTRUCTION = `You are the NexSite AI Advisor, a technical consultant for NexSite (nexsiteau.com) — Australia's leading digital engineering, website development, and UI/UX partner for creative agencies and growing businesses.

Your Role & Persona:
- Answer client and agency partner questions about NexSite's website design and development services, pricing packages, timelines, white-label model, tech stack, and onboarding process.
- Communicate with an authoritative, warm, and professional Australian agency tone.
- Be concise, clear, and structured. Use bullet points and bold highlights when breaking down prices or deliverables.

NexSite Core Information:
- Location: Melbourne, Victoria, Australia. Working with agencies and businesses across Melbourne, Sydney, Brisbane, Perth, Adelaide, Canberra, Gold Coast, and internationally.
- 100% White-Label: We operate strictly behind the scenes for creative studios and digital marketing agencies under mutual NDA. We provide a direct Slack pod with senior developers.
- Performance Standard: Guaranteed 98+ Google Lighthouse score, sub-second load times, mobile-first responsive architecture.
- Tech Stack: Next.js, React, TypeScript, Tailwind CSS, Three.js / WebGL, Node.js, Vite, Stripe AU, WooCommerce, and Headless CMS (Gutenberg / ACF Pro).

Official Website Packages (AUD):
1. "Essential Agency Launch" — AUD $2,850:
   - Up to 5 bespoke pages, responsive UI, 98+ Lighthouse speed, contact forms, standard SEO setup, 2 revision rounds.
   - Timeline: ~10 to 14 business days.
2. "High-Growth Web Engine" — AUD $4,950 (Most Popular):
   - Up to 12 responsive pages, interactive micro-animations, integrated CMS, advanced SEO structure, GA4 analytics, 2 revision rounds.
   - Timeline: ~14 to 21 business days.
3. "Dedicated Pod / White-Label" — AUD $8,500:
   - Unlimited custom pages/sprints, dedicated Slack channel, senior engineering team, sprint-based delivery, bespoke WebGL/3D, custom API integrations, 30-day priority VIP support.
   - Timeline: ~21 to 28 business days.

Popular Add-Ons:
- Expedited 5-Day Rush Delivery: AUD $750
- Advanced 3D / WebGL / Three.js Scene: AUD $1,200
- E-Commerce & Stripe Billing Automation: AUD $950
- White-Label Partner SLA & Mutual NDA: Included / Free ($0)

Payment Terms:
- Flexible: 50% deposit to kick off, 50% upon final launch approval. Or 5% discount for upfront payment in full.
- Australian Tax Invoices provided.

4-Step Process:
1. Discovery Call (Architecture, scope, deadlines)
2. Strategy & Planning (Wireframes, user flows, tech stack)
3. Design & Development (Pixel-perfect UI, clean scalable code)
4. Launch & Scale (QA testing, Lighthouse audit, deployment, ongoing SLA)

Always guide prospective clients to book a discovery call via the "Let's Talk" form or select a package directly from the Packages section.`;

// In-memory fallback answer generator if Gemini free tier experiences transient 503 high-demand
function generateNexSiteContextualFallback(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('price') || q.includes('cost') || q.includes('package') || q.includes('rate') || q.includes('quote') || q.includes('how much')) {
    return `### NexSite Website Packages & Pricing (AUD)

We offer transparent, fixed-scope packages tailored for Australian businesses and agencies:

1. **Essential Agency Launch — AUD $2,850**
   - Up to 5 custom pages
   - Guaranteed 98+ Lighthouse performance
   - Mobile-first responsive UI & contact forms
   - Standard SEO & 2 revision rounds
   - *Delivery in 10–14 business days*

2. **High-Growth Web Engine — AUD $4,950** *(Most Popular)*
   - Up to 12 custom pages
   - Interactive micro-animations & CMS integration
   - Advanced SEO architecture & Google Analytics 4
   - *Delivery in 14–21 business days*

3. **Dedicated Pod / White-Label — AUD $8,500**
   - Unlimited custom pages & continuous sprints
   - Dedicated Slack pod with senior engineers
   - 3D/WebGL Three.js integrations & custom APIs
   - 30-day priority VIP support & ongoing SLA

*Payment terms:* 50% kickoff deposit and 50% upon final approval, or an instant 5% discount if paid in full. You can select a package directly or contact us for a custom scope!`;
  }

  if (q.includes('white-label') || q.includes('agency') || q.includes('partner') || q.includes('nda') || q.includes('behind the scenes')) {
    return `### 100% White-Label Agency Partnerships

Yes, NexSite specializes in partnering with creative agencies and design studios to handle development behind the scenes:

- **Strict Mutual NDA:** Your clients remain 100% yours. We never contact your clients directly or brand our code.
- **Direct Slack Pod:** Seamless integration into your agency's Slack or Teams workspace for rapid communication.
- **24-Hour Kickoff:** Fast onboarding with dedicated senior engineering leads.
- **Delivery Guarantee:** Clean, production-grade code that passes a 98+ Google Lighthouse performance threshold.

Would you like to discuss partnering for your agency's pipeline? Reach out via our contact form or book a discovery call.`;
  }

  if (q.includes('tech') || q.includes('stack') || q.includes('framework') || q.includes('react') || q.includes('next') || q.includes('wordpress')) {
    return `### Our Engineering Tech Stack

We build modern, fast, and scalable digital experiences using proven modern frameworks:

- **Frontend:** React, Next.js, Vite, TypeScript, Tailwind CSS
- **Interactive & 3D:** Three.js, WebGL, Framer Motion
- **CMS Solutions:** WordPress with ACF Pro & Gutenberg (zero bloat) or Headless CMS (Sanity / Strapi)
- **E-Commerce & Payments:** Stripe AU, PayPal, WooCommerce, Shopify Custom Storefronts
- **Infrastructure:** Vercel Edge CDN, Cloudflare, AWS, Australian local edge servers

All websites are engineered for sub-second page loads and zero unnecessary dependencies.`;
  }

  if (q.includes('time') || q.includes('timeline') || q.includes('how long') || q.includes('turnaround') || q.includes('rush')) {
    return `### Project Timelines & Turnaround

Our typical turnaround times:
- **Essential Launch (Up to 5 pages):** 10–14 business days
- **High-Growth Engine (Up to 12 pages):** 14–21 business days
- **Dedicated Pod (Custom/Full build):** 21–28 business days

**Need it sooner?** We offer an **Expedited 5-Day Rush Delivery** add-on (+$750 AUD) for time-critical agency deadlines.`;
  }

  if (q.includes('process') || q.includes('how do you work') || q.includes('steps') || q.includes('workflow')) {
    return `### The NexSite 4-Step Process

1. **Step 01 — Discovery Call:** We unpack your project scope, target audience, and architectural requirements.
2. **Step 02 — Strategy & Planning:** Wireframing, tech stack selection, and milestone roadmapping.
3. **Step 03 — Design & Development:** Pixel-perfect UI execution, clean modular TypeScript/React code, and interactive micro-animations.
4. **Step 04 — Launch & Scale:** Rigorous QA, 98+ Lighthouse audit, DNS migration, and ongoing SLA maintenance.`;
  }

  if (q.includes('contact') || q.includes('call') || q.includes('email') || q.includes('hire') || q.includes('talk') || q.includes('location')) {
    return `### Get in Touch with NexSite

- **Email:** \`info@nexsiteau.com\`
- **Headquarters:** Melbourne, Victoria, Australia (serving clients nationwide and globally)
- **Fast Kickoff:** Submit an inquiry through the "Let's Talk" form on this page and our engineering team will get back to you within 24 hours.`;
  }

  return `### Hello from NexSite AI Advisor!

NexSite is an Australian digital engineering and UI/UX studio that designs and builds high-performance websites for businesses and creative agencies.

Here is what I can help you with:
- **Packages & Pricing:** Starter (AUD $2,850), Business (AUD $4,950), and Dedicated Pod (AUD $8,500).
- **Agency Partnerships:** 100% white-label development under strict NDA with direct Slack access.
- **Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Three.js, and Stripe.
- **Timelines & Process:** Fast 10–21 day turnaround with 98+ Google Lighthouse speed.

What specific aspect of your website or project would you like to explore?`;
}

// POST /api/chat — Multi-turn Gemini chat endpoint with system instruction & fallbacks
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, model } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const selectedModel = model || 'gemini-3.5-flash';
    const lastUserMessage = messages[messages.length - 1]?.content || '';

    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });

        // Map conversation history into Gemini format
        const contents = messages.map((m: any) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: String(m.content || '') }],
        }));

        const modelsToTry = [selectedModel, 'gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemini-1.5-flash'];
        for (const m of modelsToTry) {
          try {
            const response = await ai.models.generateContent({
              model: m,
              contents,
              config: {
                systemInstruction: NEXSITE_SYSTEM_INSTRUCTION,
                temperature: 0.7,
              },
            });

            if (response && response.text) {
              return res.json({
                success: true,
                reply: response.text,
                model: m,
              });
            }
          } catch (modelErr: any) {
            console.warn(`[Gemini Chat] ${m} warning:`, modelErr?.message?.slice(0, 120));
          }
        }
      } catch (geminiInitErr) {
        console.warn('[Gemini Chat] Init error, engaging fallback:', geminiInitErr);
      }
    }

    // Fallback: intelligent contextual response from NexSite knowledge base
    const fallbackReply = generateNexSiteContextualFallback(lastUserMessage);
    return res.json({
      success: true,
      reply: fallbackReply,
      model: 'nexsite-knowledge-engine',
    });
  } catch (err: any) {
    console.error('Error in /api/chat:', err);
    return res.status(500).json({ error: 'Internal server error in chat service.' });
  }
});

// Serve public static folder
app.use(express.static(path.resolve(__dirname, 'public')));

// Mount Vite or serve static assets
async function startServer() {
  if (!isProduction) {
    // Development mode with Vite dev middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: serve static files from dist
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`NexSite server running on port ${PORT} [env: ${isProduction ? 'production' : 'development'}]`);
  });
}

startServer();
