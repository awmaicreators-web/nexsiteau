/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — Authoritative Agency Data & Case Studies
 */

import { PackageTier, ScopeEnhancement, CaseStudy } from '../types';

export const PACKAGE_TIERS: PackageTier[] = [
  {
    id: 'essential',
    name: 'Essential Agency Launch',
    scopeDuration: 'SPRINT SCOPE: 10 DAYS',
    scopeIcon: 'bolt',
    priceAud: 2850,
    billingPeriod: 'fixed',
    description: 'Boutique design firms, high-converting product landing showcases, and dynamic brand portfolios seeking pristine execution.',
    deliverables: [
      '10-Day Guaranteed Deployment Timeline',
      '5 Custom Responsive Pages (Figma to Production Code)',
      'Comprehensive Technical SEO & OpenGraph Suite',
      'Lighthouse Score Guarantee: 98+ Speed Score',
      'Static Web Framework (Next.js / Astro / Tailwind)',
    ],
  },
  {
    id: 'high-growth',
    name: 'High-Growth Web Engine',
    badge: 'MOST POPULAR CHOICE',
    isPopular: true,
    scopeDuration: 'SPRINT SCOPE: 2-3 WEEKS',
    scopeIcon: 'schedule',
    priceAud: 4950,
    billingPeriod: 'fixed',
    description: 'The flagship build for scaling businesses requiring robust CMS management, advanced conversion funnels, and dynamic interactions.',
    deliverables: [
      '2-3 Week Accelerated Sprint Execution',
      'Custom Headless CMS Architecture or Webflow Setup',
      'Fluid Micro-Interactions & Framer Motion Sequences',
      'CRM & Payment Webhook Integrations (HubSpot, Stripe)',
      'Dedicated Private Slack Channel & Asynchronous Loom Updates',
      '30-Day Post-Launch Hypercare & Team Onboarding',
    ],
  },
  {
    id: 'dedicated-pod',
    name: 'Dedicated Pod / White-Label',
    scopeDuration: 'CONTINUOUS RETAINER',
    scopeIcon: 'groups',
    priceAud: 8500,
    billingPeriod: 'month',
    description: 'An entire senior design & full-stack dev department embedded directly into your agency workflow without in-house hiring.',
    deliverables: [
      'Full Pod: Senior Frontend + UX Designer + Lead Architect',
      'Unlimited Active Design & Code Requests (Queue Managed)',
      'Strict 4-Hour Response SLA Guarantee',
      '100% White-Label Capability (Agency Brand Protected)',
      'Pause or Cancel Anytime After Month One',
    ],
  },
];

export const SCOPE_ENHANCEMENTS: ScopeEnhancement[] = [
  {
    id: 'rush-delivery',
    name: 'Expedited 5-Day Rush Delivery',
    description: 'Dual-shift engineering pod dedicated to cutting launch schedule in half.',
    priceAud: 750,
    isIncluded: false,
    selected: false,
  },
  {
    id: 'white-label-nda',
    name: 'White-Label Partner SLA & Mutual NDA',
    description: 'Legally binding non-disclosure protocol & silent Git commits.',
    priceAud: 0,
    isIncluded: true,
    selected: true,
  },
  {
    id: 'threejs-3d',
    name: 'Advanced 3D / WebGL / Three.js Scene Integration',
    description: 'Custom interactive shader scene with GPU-optimized physics rendering.',
    priceAud: 1200,
    isIncluded: false,
    selected: false,
  },
  {
    id: 'stripe-billing',
    name: 'E-Commerce & Stripe Billing Automation',
    description: 'Custom subscription tiers, customer portal, invoices, and webhook handlers.',
    priceAud: 950,
    isIncluded: false,
    selected: false,
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'roto-baller',
    client: 'Roto Baller',
    title: 'High-Velocity Sports Data Platform',
    description: 'Built for a growing sports analytics company. Custom website development featuring a polished user experience, tailored content sections, and intuitive service navigation. Delivered with speed optimization, responsive architecture, and a flexible WordPress Headless CMS.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAa7GR3nwQgOMg_12rmPSz2gtuaaDiVszJyZsjMQv3vhCRIQ4qFnqCa99ehAqJ4C5hBt8BPWQhEdmnECwgwjTWGYvEozSeO2MNWWQ_zZSdH9RLjwj-Au8VLgeMuM7cfzrEwW-lWki0Vj_6EwezXAh0UvAy9A8aFawrP1Mfx0BrBbjIOii1mzZlIT9nw5qjdDVlOrmZ5zsm_EI0f4H3P1d4TwTB3fYgIw-E80IhEJd-tZhEK2dhL1Vy_fHcmus5NvDeDVA',
    alt: 'High-density real-time sports analytics platform interface with dynamic data visualization, sports team statistics, and responsive player news cards on desktop and tablet viewports',
    tags: ['Sports Analytics', 'Headless CMS', 'High Load'],
    metrics: [
      { stat: '0.4s', label: 'Average Page Load', isHighlight: false },
      { stat: '+340%', label: 'Ad Engagement Rate', isHighlight: true },
    ],
    stack: 'Wordpress Headless / Node Backend',
    fullCaseSummary: 'Roto Baller required handling millions of daily page views during peak sporting events. We architected a Next.js edge caching proxy over a WordPress GraphQL headless backend with sub-second API roundtrips.',
  },
  {
    id: 'eurobike',
    client: 'Eurobike',
    title: 'European Alpine Tour & Fleet Engine',
    description: 'Developed for a renowned European motorcycle & cycling tour brand. Full eCommerce build with custom booking flows, seasonal departure calendars, and localized tour management. Speed-optimized, conversion-focused, and tailored for international cross-border travelers.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCn-0cv3_Z6DaXgQUii4Sc7BdR30V57Me_59K2fVlmoym28EmqsG5OiGuKUUHb0l-y0SnuGRotzG-wBAaqL-c0a9EDFvkLsxT6o0YvtV9h1MrA8_b5k1JJERXZY679roOm5iEMBqaMP0WcpxN4Lr-pBBfQNarzuMoVG7L2IWM23P7v06VDxhG7_2fAOtAZJ1FyxNW9d8pfoXL_OFKZQweROGL0tL2jnFvMjuzKUYGnqpdqS7YP7__PtESrdLCaZcTE--A',
    alt: 'European cycling travel and motorcycle tour booking interface with interactive alpine itinerary maps and multi-currency checkout',
    tags: ['eCommerce', 'Global Booking', 'Stripe Multi-Currency'],
    metrics: [
      { stat: '6', label: 'Languages & Currencies', isHighlight: false },
      { stat: '100/100', label: 'Checkout Reliability', isHighlight: true },
    ],
    stack: 'Custom Booking Engine / Stripe Global',
    fullCaseSummary: 'Created custom booking workflows with multi-currency Stripe Connect routing, dynamic tour capacity management, and automatic PDF ticket generation.',
  },
  {
    id: 'nasstive',
    client: 'Nasstive Entertainment',
    title: 'Nightlife Ticketing & VIP Reservation Portal',
    description: 'Built for a premier live events and club crawl tour operator. Custom event platform featuring interactive venue itineraries, real-time ticketing, and a brand-forward aesthetic. Delivered as a dark-themed, mobile-first build for a recurring US design agency partner.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgaVjNaEflOqE7lzWawmi8-PnRSM1o5dhUWJcPcNpHgA0Fom2DHl_I4L4w-y-rhiIUtgtkUQtrNqhhp50U-12ceKiiot626tZtRLp18kqbJVKqReWsWpIjD57vytAjcYkaFXWjcnZyw3hJXXEj61krB7LNpNMH1YtMsGY_0FzAaBwBmgFhFA-h6MnlegfZcGYFy2CeoSYnYiCnjVIr3ArJDxxLDJZxchV_znz1Y30FNJYPBybfocYIwsX-mKYCmEJQ5btVYEk2KzWdmw',
    alt: 'High-energy dark mode nightlife platform UI featuring ticketing passes and mobile ticket QR codes',
    tags: ['Mobile-First PWA', 'QR Passes', 'Live Events'],
    metrics: [
      { stat: '85%', label: 'Mobile Checkout Share', isHighlight: false },
      { stat: '3-Click', label: 'Ticket Purchase Loop', isHighlight: true },
    ],
    stack: 'Mobile-First PWA / QR Integrations',
    fullCaseSummary: 'Designed for smartphone partygoers with frictionless Apple Pay/Google Pay one-tap purchase, dynamic scannable QR ticket generation, and real-time door scanner validation.',
  },
];

export const HOW_WE_WORK_STEPS = [
  {
    number: '01',
    icon: 'forum',
    title: 'Dedicated Communication',
    description: 'We keep communication clear, consistent, and easy to follow so you always know what’s happening. No chasing updates or confusion — everything is shared in a structured way that fits your workflow.',
  },
  {
    number: '02',
    icon: 'bolt',
    title: 'Fast Turnaround',
    description: 'We work with your deadlines in mind because your delivery impacts your reputation. Projects are handled efficiently without compromising quality, helping you meet timelines with confidence.',
  },
  {
    number: '03',
    icon: 'dataset',
    title: 'Scalable Support',
    description: 'Whether it’s one project or multiple ongoing tasks, we adjust based on your workload. This allows your agency to grow without worrying about hiring or resource limitations.',
  },
  {
    number: '04',
    icon: 'visibility_off',
    title: 'White-Label Ready',
    description: 'We work behind the scenes as part of your team, maintaining full confidentiality. Your clients see your brand, while we handle the execution seamlessly in the background.',
  },
];

export const CORE_SERVICES = [
  {
    num: '01',
    title: 'Custom CMS Development',
    icon: 'code',
    desc: 'Flexible and scalable CMS solutions tailored to your business for easy content management and long-term growth. Built with WordPress, Webflow, and Shopify.',
    tag: 'WordPress / Webflow',
  },
  {
    num: '02',
    title: 'Modern UI/UX Design',
    icon: 'draw',
    desc: 'Clean, intuitive, and visually engaging interfaces that enhance user experience and drive meaningful interactions across all devices.',
    tag: 'Figma / Framer',
  },
  {
    num: '03',
    title: 'Reliable Backend Systems',
    icon: 'dns',
    desc: 'Stable, secure, and scalable backend architecture to support smooth platform operations, complex data models, and API integrations.',
    tag: 'Node / Postgres / APIs',
  },
  {
    num: '04',
    title: 'eCommerce That Converts',
    icon: 'shopping_bag',
    desc: 'Fast, secure, and conversion-focused online stores built to improve user journeys and maximize revenue performance.',
    tag: 'Shopify / Stripe',
  },
  {
    num: '05',
    title: 'Ongoing Support & Maintenance',
    icon: 'build',
    desc: 'Continuous technical support, security patches, regular updates, and performance monitoring to keep systems running smoothly.',
    tag: 'SLA Guaranteed',
  },
  {
    num: '06',
    title: 'Bespoke Outsourcing',
    icon: 'groups',
    desc: 'Dedicated web development and engineering support tailored to help studios and agencies scale without internal hiring costs.',
    tag: 'Agency Extension',
  },
  {
    num: '07',
    title: 'Performance Optimization',
    icon: 'speed',
    desc: 'Sub-second page speeds, asset refactoring, CDN optimization, and Core Web Vitals remediation guarantees.',
    tag: 'Lighthouse 95+ Score',
  },
  {
    num: '08',
    title: 'Onsite SEO & Hosting',
    icon: 'travel_explore',
    desc: 'Semantic structured data, OpenGraph protocols, XML schema setups, and enterprise hosting orchestration.',
    tag: 'Edge Infrastructure',
  },
];

export const PLATFORM_STEPS = [
  {
    step: 1,
    title: 'Share your requirement',
    desc: 'Send us your design or idea and we quickly review everything to align on scope, timeline, and expectations. This ensures a smooth start without confusion.',
    badge: 'Scope in < 24h',
  },
  {
    step: 2,
    title: 'We build',
    desc: 'Our team handles the full development process with regular updates and clear progress. Everything is built efficiently while keeping quality and deadlines in focus.',
    badge: 'Daily Staging Builds',
  },
  {
    step: 3,
    title: 'Review and refine',
    desc: 'You review the work and share feedback, and we make the necessary adjustments. The process stays smooth, flexible, and aligned with your expectations.',
    badge: 'Iterative Sprints',
  },
  {
    step: 4,
    title: 'Launch and support',
    desc: 'We take care of deployment and ensure everything goes live without issues. Ongoing support remains available for updates, fixes, and future needs.',
    badge: 'Ongoing Care Retainer',
  },
];

export const TESTIMONIALS = [
  {
    quote: 'NexSite has been exceptional to work with — quality code, clear Australian time zone communication, and zero surprises. They’ve become an indispensable engineering arm for our studio.',
    author: 'Vytautas Paukštelis',
    role: 'Founder at MVO Agency',
    company: 'MVO Agency',
    initials: 'VP',
  },
  {
    quote: 'Working with NexSite has made it straightforward for us to scale development output. Their responsiveness and delivery speed make them an invaluable engineering partner.',
    author: 'Andreas Philippou',
    role: 'Co-founder & Director at Solvi Digital',
    company: 'Solvi Digital',
    initials: 'AP',
  },
  {
    quote: 'NexSite consistently delivers production-grade builds and is seamless to collaborate with. Their team is proactive, dependable, and solution-focused from day one.',
    author: 'Bryan Barbeau',
    role: 'CEO at Your Digital Canvas',
    company: 'Your Digital Canvas',
    initials: 'BB',
  },
  {
    quote: 'What stands out about NexSite is their reliability. They fit seamlessly into our agency workflow and keep complex builds moving forward without hand-holding.',
    author: 'Todd Reagor',
    role: 'Founder at Reagor Media',
    company: 'Reagor Media',
    initials: 'TR',
  },
];

export const FAQS = [
  {
    question: 'What happens immediately after I submit the deposit or inquiry?',
    answer: 'Three automated events occur instantaneously: our team logs your brief manifest directly into our project management portal, creates your private repository, and prepares kickoff deliverables. Within 2 hours, you will receive an invitation to your dedicated Slack workspace where your lead designer and engineer introduce themselves.',
  },
  {
    question: 'How does the 100% On-Time Delivery Guarantee work?',
    answer: 'Every package specifies an ironclad sprint duration (e.g. 10 days for Essential, 2–3 weeks for Growth). If NexSite fails to deliver the verified initial production staging link within the stipulated schedule, we credit 100% of the project deposit and finish the implementation free of charge. We believe accountability must be contractual.',
  },
  {
    question: 'Can I pay in installments or do you require 100% upfront?',
    answer: 'By default, all milestone projects run on a 50/50 model: 50% deposit to initiate sprint scheduling and kickoff, and the remaining 50% only upon your final staging review and approval before DNS migration. Clients who choose to pay 100% upfront receive an immediate 5% discount across the total package.',
  },
  {
    question: 'Are you capable of executing as a 100% white-label agency partner?',
    answer: 'Yes. Over 50% of our production volume is delivered under strict White-Label agreements for established digital agencies and consultancies. All Git commits are scrubbed, deliverables are packaged under your branding, and we execute mutual non-disclosure agreements prior to kickoff.',
  },
  {
    question: 'Who owns the intellectual property and code repository?',
    answer: 'You own 100% of the intellectual property, design tokens, Figma project files, and source code upon project completion. There are no vendor lock-ins, recurring proprietary license fees, or ongoing agency hostage agreements. Everything is transferred to your organization’s GitHub or Vercel account.',
  },
];
