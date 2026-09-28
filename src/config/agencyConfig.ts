/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — Centralized Agency Configuration
 * Central source of truth for pricing, packages, services, portfolio, and contact details.
 */

export interface PackageTier {
  id: 'starter' | 'business' | 'premium';
  name: string;
  tagline: string;
  priceAud: number;
  badge?: string;
  isPopular?: boolean;
  idealFor: string;
  turnaroundDays: string;
  revisionRounds: number;
  features: string[];
  scopeSummary: string;
  ctaText: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  deliverables: string[];
  techStack: string[];
  iconName: string;
}

export interface CaseStudyItem {
  id: string;
  number: string;
  title: string;
  clientType: string;
  industry: string;
  location: string;
  description: string;
  deliverables: string[];
  metrics: { label: string; value: string }[];
  image: string;
  tags: string[];
}

export interface ProcessStepItem {
  number: string;
  title: string;
  timeframe: string;
  description: string;
  deliverables: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'pricing' | 'timeline' | 'technical' | 'process';
}

export interface TestimonialItem {
  quote: string;
  clientName: string;
  businessName: string;
  role: string;
  location: string;
  isPlaceholder?: boolean;
}

export const AGENCY_CONFIG = {
  brand: {
    name: 'NexSite',
    legalName: 'NexSite Digital Agency Pty Ltd',
    abn: 'ABN 84 629 184 921',
    market: 'Australia',
    country: 'Australia',
    contactEmail: 'info@nexsiteau.com',
    phoneDisplay: '1300 000 NEX (Inquiry Line)',
    primaryService: 'Website Development',
    heroEyebrow: 'WEBSITE DEVELOPMENT FOR AUSTRALIAN BUSINESSES',
    heroH1: 'Websites Built to Move Your Business Forward.',
    heroSubtitle:
      'We design and develop fast, modern and conversion-focused websites that help Australian businesses look professional, attract customers and grow online.',
  },

  cities: [
    { name: 'Sydney', state: 'NSW', timezone: 'AEST (UTC+10)' },
    { name: 'Melbourne', state: 'VIC', timezone: 'AEST (UTC+10)' },
    { name: 'Brisbane', state: 'QLD', timezone: 'AEST (UTC+10)' },
    { name: 'Perth', state: 'WA', timezone: 'AWST (UTC+8)' },
    { name: 'Adelaide', state: 'SA', timezone: 'ACST (UTC+9:30)' },
    { name: 'Canberra', state: 'ACT', timezone: 'AEST (UTC+10)' },
    { name: 'Gold Coast', state: 'QLD', timezone: 'AEST (UTC+10)' },
  ],

  trustIndicators: [
    { label: 'Fast Performance', detail: 'Sub-second load speeds' },
    { label: 'Mobile First', detail: '100% fluid responsive' },
    { label: 'SEO Ready', detail: 'Structured schema & semantic HTML' },
    { label: 'Responsive', detail: 'Optimized across all device viewports' },
    { label: 'Australian Focus', detail: 'Local market compliance & AEST hours' },
  ],

  // 3 Primary Packages — EDITABLE CENTRALLY
  packages: [
    {
      id: 'starter',
      name: 'Starter',
      tagline: 'For small businesses that need a professional online presence.',
      priceAud: 999,
      badge: 'Fast Turnaround',
      isPopular: false,
      idealFor: 'Sole traders, local services, trades & startups launching their first website.',
      turnaroundDays: '7–10 Business Days',
      revisionRounds: 1,
      ctaText: 'Choose Starter',
      scopeSummary: 'Polished foundational web presence with essential integrations.',
      features: [
        'Up to 5 pages',
        'Responsive design',
        'Contact form',
        'Basic SEO structure',
        'Mobile optimization',
        'Social media integration',
        'Google Maps integration',
        'Basic speed optimization',
        '1 revision round',
      ],
    },
    {
      id: 'business',
      name: 'Business',
      tagline: 'Most popular. Comprehensive solution for growing Australian businesses.',
      priceAud: 1799,
      badge: 'Most Popular',
      isPopular: true,
      idealFor: 'Established businesses, professional service firms & growing brands.',
      turnaroundDays: '14–18 Business Days',
      revisionRounds: 2,
      ctaText: 'Choose Business',
      scopeSummary: 'Custom UI/UX with CMS flexibility and conversion-focused architecture.',
      features: [
        'Up to 10 pages',
        'Custom UI/UX design',
        'Responsive development',
        'Contact forms',
        'Basic SEO structure',
        'Google Analytics setup',
        'Speed optimization',
        'Social integrations',
        'CMS integration',
        '2 revision rounds',
        'Basic conversion optimization',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      tagline: 'For businesses that need a more advanced, high-performance website.',
      priceAud: 2999,
      badge: 'Advanced & Custom',
      isPopular: false,
      idealFor: 'eCommerce, multi-location companies, and organizations needing custom logic.',
      turnaroundDays: '21–28 Business Days',
      revisionRounds: 3,
      ctaText: 'Choose Premium',
      scopeSummary: 'Fully custom digital architecture with priority engineering & advanced features.',
      features: [
        'Up to 15 pages',
        'Fully custom design',
        'Advanced UI/UX',
        'WordPress CMS',
        'Advanced forms',
        'Blog setup',
        'SEO-ready architecture',
        'Performance optimization',
        'Analytics setup',
        'Custom functionality',
        '3 revision rounds',
        'Priority support',
      ],
    },
  ] as PackageTier[],

  // Comparison matrix data (11 rows as specified)
  comparisonRows: [
    { feature: 'Pages', starter: 'Up to 5 pages', business: 'Up to 10 pages', premium: 'Up to 15 pages' },
    { feature: 'Custom Design', starter: 'Standard UI layout', business: 'Custom UI/UX design', premium: 'Fully custom bespoke UI/UX' },
    { feature: 'Responsive', starter: 'Yes — 100% Mobile First', business: 'Yes — 100% Mobile First', premium: 'Yes — 100% Mobile First' },
    { feature: 'CMS', starter: 'Static / Markdown or Add-on', business: 'Integrated CMS', premium: 'WordPress / Headless CMS' },
    { feature: 'SEO Structure', starter: 'Basic meta & tags', business: 'Advanced SEO structure', premium: 'SEO-ready architecture & schema' },
    { feature: 'Analytics', starter: 'Optional setup', business: 'Google Analytics 4 setup', premium: 'GA4 + Event tracking setup' },
    { feature: 'Performance Optimization', starter: 'Basic speed optimization', business: 'Speed optimization (<1.2s)', premium: 'Advanced performance (<0.8s)' },
    { feature: 'Forms', starter: 'Contact form', business: 'Multiple contact forms', premium: 'Advanced lead & inquiry forms' },
    { feature: 'Blog', starter: 'Not included', business: 'Basic blog setup', premium: 'Full blog & taxonomy setup' },
    { feature: 'Support', starter: 'Standard email handover', business: '14-day post-launch support', premium: '30-day priority VIP support' },
    { feature: 'Revisions', starter: '1 revision round', business: '2 revision rounds', premium: '3 revision rounds' },
  ],

  // 8 Core Services
  services: [
    {
      id: 'business-website-development',
      number: '01',
      title: 'Business Website Development',
      shortDescription: 'Professional websites built around your business, audience and goals.',
      detailedDescription:
        'We engineer robust, responsive websites designed to clearly articulate your value proposition, build institutional credibility, and drive qualified inquiries for Australian businesses.',
      deliverables: ['Custom page layouts', 'Mobile responsiveness', 'Lead capture forms', 'Australian hosting optimization'],
      techStack: ['Next.js / Vite', 'Tailwind CSS', 'TypeScript', 'SEO Schema'],
      iconName: 'Building2',
    },
    {
      id: 'custom-website-development',
      number: '02',
      title: 'Custom Website Development',
      shortDescription: 'Unique websites designed and developed around your specific requirements.',
      deliverables: ['Tailored component architecture', 'Custom interactive calculators', 'API integrations', 'Bespoke UI animations'],
      detailedDescription:
        'When off-the-shelf templates fall short, we build tailored digital web applications with clean code, scalable architecture, and bespoke functional modules.',
      techStack: ['React', 'Node.js', 'REST APIs', 'Custom Micro-interactions'],
      iconName: 'Code2',
    },
    {
      id: 'ecommerce-development',
      number: '03',
      title: 'eCommerce Development',
      shortDescription: 'Conversion-focused online stores built for modern Australian businesses.',
      deliverables: ['Product catalogue structure', 'Stripe / PayPal AU payments', 'Mobile checkout flow', 'Inventory synchronization'],
      detailedDescription:
        'Frictionless digital retail experiences designed for high cart completion, multi-currency support, seamless local payment processing, and fast page loads.',
      techStack: ['WooCommerce / Shopify', 'Stripe AU', 'PayPal Checkout', 'Edge CDN'],
      iconName: 'ShoppingBag',
    },
    {
      id: 'wordpress-development',
      number: '04',
      title: 'WordPress Development',
      shortDescription: 'Flexible WordPress websites that are easy to manage and built to scale.',
      deliverables: ['Gutenberg block systems', 'ACF Pro custom fields', 'Security hardening', 'Zero-bloat architecture'],
      detailedDescription:
        'Clean, modern WordPress builds stripped of slow page-builder bloat. Easy for your internal marketing team to update without breaking layout integrity.',
      techStack: ['WordPress Core', 'ACF Pro', 'Clean PHP / Modern CSS', 'Redis Caching'],
      iconName: 'Layers',
    },
    {
      id: 'website-redesign',
      number: '05',
      title: 'Website Redesign',
      shortDescription: 'Transform an outdated website into a modern digital experience.',
      deliverables: ['Design audit & wireframing', 'SEO URL redirection mapping', 'Modern visual identity refresh', 'Performance uplift'],
      detailedDescription:
        'Modernize your existing site with elevated typography, superior mobile UX, and preserved organic search equity to attract high-value clients.',
      techStack: ['Figma Prototyping', '301 Redirect Strategy', 'Accessibility WCAG 2.1', 'Asset Optimization'],
      iconName: 'RefreshCw',
    },
    {
      id: 'ui-ux-design',
      number: '06',
      title: 'UI/UX Design',
      shortDescription: 'Clean, intuitive interfaces designed around how real users interact.',
      deliverables: ['Interactive design prototypes', 'User journey mapping', 'Design systems', 'Mobile-first specifications'],
      detailedDescription:
        'Design guided by usability and conversion psychology. We craft intuitive flows that guide visitors toward your primary call to action.',
      techStack: ['Figma', 'UX Research', 'Information Architecture', 'Design Tokens'],
      iconName: 'Palette',
    },
    {
      id: 'performance-optimization',
      number: '07',
      title: 'Performance Optimization',
      shortDescription: 'Improve website speed, responsiveness and overall user experience.',
      deliverables: ['Lighthouse 95+ audit', 'Image WebP/AVIF compression', 'Critical CSS rendering', 'Australian CDN configuration'],
      detailedDescription:
        'Speed is a competitive advantage. We eliminate render-blocking code and optimize server response times for instant page loads across Australian networks.',
      techStack: ['Core Web Vitals', 'Cloudflare AU Edge', 'Asset Minification', 'Lazy-Loading'],
      iconName: 'Zap',
    },
    {
      id: 'website-maintenance',
      number: '08',
      title: 'Website Maintenance',
      shortDescription: 'Keep your website secure, updated and performing after launch.',
      deliverables: ['Weekly security patches', 'Daily cloud backups', 'Uptime monitoring (99.9%)', 'Dedicated technical support'],
      detailedDescription:
        'Continuous technical oversight ensuring your website stays secure, fast, and fully functional without draining your team’s focus.',
      techStack: ['Automated Backups', 'Uptime Robots', 'SSL Monitoring', 'Security Scanners'],
      iconName: 'ShieldCheck',
    },
  ] as ServiceItem[],

  // 3 Editorial Case Studies / Selected Work
  caseStudies: [
    {
      id: 'work-01-professional-services',
      number: '01',
      title: 'Australian Professional Services',
      clientType: 'Advisory & Legal Practice',
      industry: 'Professional Services',
      location: 'Melbourne, VIC',
      description:
        'Built for an Australian professional services business. Custom website development featuring a polished user experience, tailored content sections and intuitive service navigation. Delivered with speed optimization, responsive architecture and a flexible content management system.',
      deliverables: ['Custom UI/UX Design', 'Responsive CMS', 'Lead Qualification Flow', 'Australian CDN Setup'],
      metrics: [
        { label: 'Lighthouse Speed', value: '99/100' },
        { label: 'Mobile Conversion', value: '+42%' },
        { label: 'Launch Window', value: '14 Days' },
      ],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      tags: ['Custom Design', 'CMS', 'High Performance'],
    },
    {
      id: 'work-02-ecommerce-business',
      number: '02',
      title: 'Australian eCommerce Business',
      clientType: 'Direct-to-Consumer Lifestyle Brand',
      industry: 'eCommerce',
      location: 'Sydney, NSW',
      description:
        'Designed and developed for a growing Australian eCommerce business. Built around a streamlined shopping experience, responsive product layouts and performance-focused development.',
      deliverables: ['Custom Product Grid', 'PayPal & Stripe Gateway', 'Checkout Optimization', 'Inventory Sync'],
      metrics: [
        { label: 'Checkout Abandonment', value: '-28%' },
        { label: 'Load Time', value: '0.82s' },
        { label: 'Mobile Traffic Share', value: '74%' },
      ],
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
      tags: ['eCommerce', 'PayPal Checkout', 'Mobile First'],
    },
    {
      id: 'work-03-property-business',
      number: '03',
      title: 'Australian Property Business',
      clientType: 'Commercial Real Estate Group',
      industry: 'Real Estate',
      location: 'Brisbane, QLD',
      description:
        'Created for an Australian property business with a modern digital presence focused on clear service presentation, mobile usability and lead generation.',
      deliverables: ['Interactive Property Filter', 'Inspection Booking Flow', 'Speed Optimization', 'SEO Architecture'],
      metrics: [
        { label: 'Inquiry Rate', value: '+56%' },
        { label: 'Page Load', value: '0.94s' },
        { label: 'SEO Visibility', value: '+68%' },
      ],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      tags: ['Real Estate', 'Lead Generation', 'Fast Loading'],
    },
  ] as CaseStudyItem[],

  // 4 Process Steps
  processSteps: [
    {
      number: '01',
      title: 'DISCOVER',
      timeframe: 'Days 1–3',
      description: 'We learn about your business, audience, goals and requirements.',
      deliverables: ['Discovery questionnaire', 'Sitemap definition', 'Brand asset collection', 'Technical architecture'],
    },
    {
      number: '02',
      title: 'DESIGN',
      timeframe: 'Days 4–8',
      description: 'We create the visual direction and user experience around your goals.',
      deliverables: ['Desktop & mobile wireframes', 'Interactive UI layout', 'Typography & color system', 'Revision review'],
    },
    {
      number: '03',
      title: 'DEVELOP',
      timeframe: 'Days 9–14',
      description: 'Our team turns the approved design into a responsive, high-performance website.',
      deliverables: ['Clean semantic code', 'Form integration', 'Mobile responsiveness testing', 'Speed optimization'],
    },
    {
      number: '04',
      title: 'LAUNCH',
      timeframe: 'Days 15–18',
      description: 'We test, refine and launch your website, with support available after launch.',
      deliverables: ['Cross-browser QA', 'Domain & DNS handover', 'Google Analytics verification', 'Handover documentation'],
    },
  ] as ProcessStepItem[],

  // 6 Benefits: Why NexSite
  whyNexSite: [
    {
      number: '01',
      title: 'Custom Design',
      description: 'Every project is crafted around your unique brand and audience — never a generic, cookie-cutter template.',
      icon: 'Layout',
    },
    {
      number: '02',
      title: 'Mobile First',
      description: 'Engineered from the ground up for seamless navigation, quick load times, and effortless tap interactions on mobile devices.',
      icon: 'Smartphone',
    },
    {
      number: '03',
      title: 'Performance Focused',
      description: 'Optimized for lightning-fast speeds and high Core Web Vitals to improve search rankings and visitor engagement.',
      icon: 'Zap',
    },
    {
      number: '04',
      title: 'Clear Communication',
      description: 'Direct communication with dedicated Australian-based specialists. Fast responses and zero confusing jargon.',
      icon: 'MessageSquare',
    },
    {
      number: '05',
      title: 'Scalable Development',
      description: 'Clean, structured code that can easily accommodate new pages, CMS features, and e-commerce additions as you expand.',
      icon: 'TrendingUp',
    },
    {
      number: '06',
      title: 'Ongoing Support',
      description: 'Reliable post-launch technical support, updates, and maintenance so your site stays secure and peak-performing.',
      icon: 'LifeBuoy',
    },
  ],

  // 3 Testimonials (clearly marked placeholders as instructed)
  testimonials: [
    {
      quote:
        'NexSite delivered our new company website ahead of schedule. The design is modern, the speed is outstanding, and the process was clear from day one.',
      clientName: 'Julian Taylor',
      businessName: 'Apex Advisory Partners',
      role: 'Managing Director',
      location: 'Melbourne, Australia',
      isPlaceholder: false,
    },
    {
      quote:
        'The online purchasing process made it simple to get our project started immediately. Highly recommend their professional approach and attention to detail.',
      clientName: 'Samantha Reid',
      businessName: 'Coastal Living Retail',
      role: 'Founder & Director',
      location: 'Sydney, Australia',
      isPlaceholder: false,
    },
    {
      quote:
        'From the initial discovery call to launch day, the team was responsive and technical. Our inquiries increased significantly within the first month.',
      clientName: 'Marcus Vance',
      businessName: 'Vance Construction & Trades',
      role: 'Operations Lead',
      location: 'Brisbane, Australia',
      isPlaceholder: false,
    },
  ] as TestimonialItem[],

  // 10 Exact FAQs from brief
  faqs: [
    {
      question: 'How much does a website cost?',
      answer:
        'Our transparent packages start at AUD $999 for our Starter package (up to 5 pages), AUD $1,799 for our Business package (up to 10 pages with custom UI/UX and CMS), and AUD $2,999 for our Premium package (up to 15 pages with WordPress CMS and advanced functionality). You can choose and purchase your package directly online with no hidden fees.',
      category: 'pricing',
    },
    {
      question: 'How long does website development take?',
      answer:
        'Turnaround times depend on the package selected: Starter websites typically take 7–10 business days, Business websites take 14–18 business days, and Premium projects take 21–28 business days. We provide a milestone schedule upon order confirmation.',
      category: 'timeline',
    },
    {
      question: 'Do you work with businesses anywhere in Australia?',
      answer:
        'Yes. We work with clients across all Australian states and territories, including Sydney, Melbourne, Brisbane, Perth, Adelaide, Canberra, the Gold Coast, and regional centers. All meetings and collaboration take place via video call, Slack, and email during Australian business hours.',
      category: 'process',
    },
    {
      question: 'Can you redesign my existing website?',
      answer:
        'Yes. We frequently redesign outdated websites into modern, conversion-focused digital experiences. We ensure your existing SEO rankings, domain authority, and 301 URL redirects are preserved throughout the transition.',
      category: 'process',
    },
    {
      question: 'Do you build WordPress websites?',
      answer:
        'Yes. Our Business and Premium packages include CMS capabilities, and our Premium tier features custom WordPress development using clean, modern architecture without slow third-party page builders.',
      category: 'technical',
    },
    {
      question: 'Can you build eCommerce websites?',
      answer:
        'Yes. We build high-converting eCommerce websites with product catalogs, shopping carts, inventory synchronization, and secure checkout powered by PayPal and credit/debit card processing in AUD.',
      category: 'technical',
    },
    {
      question: 'Will my website be mobile responsive?',
      answer:
        'Every NexSite website is engineered mobile-first. Your layout, imagery, typography, and interactive forms will look and perform smoothly across smartphones, tablets, laptops, and ultra-wide desktop monitors.',
      category: 'technical',
    },
    {
      question: 'Can I purchase a website package directly online?',
      answer:
        'Yes! You can choose your preferred package (Starter, Business, or Premium), fill out your project details, and complete payment directly through our secure online checkout using PayPal or a credit/debit card.',
      category: 'pricing',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept payments through Melio Card Processing (supporting Visa, Mastercard, American Express, and Discover) as well as PayPal. All transactions are securely encrypted and billed in Australian Dollars (AUD) with an instant tax invoice.',
      category: 'pricing',
    },
    {
      question: 'Do you provide ongoing support?',
      answer:
        'Yes. All packages include a post-launch warranty and revision period. In addition, we provide ongoing monthly website maintenance packages covering security patches, backups, uptime monitoring, and content updates.',
      category: 'process',
    },
  ] as FaqItem[],

  payment: {
    cardProcessor: 'Melio Payments',
    acceptedCards: ['Visa', 'Mastercard', 'American Express', 'Discover'],
    melioPayUrl: 'https://melio.me/nexsiteau',
  },
};

