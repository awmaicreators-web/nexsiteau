/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — Customer Landing Page (/website-design)
 * Redesigned brand composition:
 * - Restores NexSite's genuine brand identity (atmospheric navy hero & footer, warm-white work & content, pale-blue services).
 * - Spacious desktop split hero (~52% copy / ~48% visual showcase) with authentic Eurobike interface preview and overlapping mobile screen.
 * - Single selected work showcase with Roto Baller, Eurobike, and labelled design concept.
 * - Engaging 2-column benefits section (left: intro; right: 3 stacked substantial items).
 * - Structured 2x2 services section on pale-blue background.
 * - Clean 3-step process with prominent numbering and connecting lines.
 * - 2-column FAQ and substantial white enquiry form panel against deep navy.
 * - Connected atmospheric footer with authentic branding.
 */

import React, { useState, useEffect } from 'react';
import { NexSiteLogo } from './NexSiteLogo';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Globe,
  RefreshCw,
  Smartphone,
  Layers,
  Send,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Mail,
  MessageSquare,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollReveal';
import heroMidnightMoon from '../assets/hero-moon-midnight.jpg';
import practiceCoPreview from '../assets/practice-and-co-preview.svg';
import footerBg from '../assets/footer-bg.jpg';

interface CustomerLandingPageProps {
  onBackToHome: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

// Consistent responsive container matching specification:
// Mobile: width: calc(100% - 40px)
// Tablet/Desktop: width: min(1200px, calc(100% - 64px)); margin-inline: auto;
const CONTAINER_CLASS = 'w-[calc(100%-40px)] sm:w-[min(1200px,calc(100%-64px))] mx-auto';

export const CustomerLandingPage: React.FC<CustomerLandingPageProps> = ({
  onBackToHome,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  // Sync page title and meta description
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Website Design for Australian Businesses | NexSite';

    const metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Website design and development for Australian businesses that want to make a stronger first impression.'
      );
    }

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalDesc) {
        metaDesc.setAttribute('content', originalDesc);
      }
    };
  }, []);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [currentWebsite, setCurrentWebsite] = useState('');
  const [serviceNeeded, setServiceNeeded] = useState('New website');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Hamburger Menu State
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // FAQ Accordion State (first item open by default)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Smooth scroll helper with header offset
  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid work email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: businessName.trim() || undefined,
          service: `Customer Quote Request: ${serviceNeeded}`,
          notes: `Current Website: ${currentWebsite.trim() || 'None provided'}\n\nProject Notes:\n${description.trim() || 'No additional details provided'}`,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(
          data.error || 'Unable to submit enquiry right now. Please email info@nexsiteau.com directly.'
        );
      }
    } catch {
      setErrorMessage(
        'A network connection error occurred. Please try again or email us directly at info@nexsiteau.com.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Unified Selected Projects: All 3 Projects in Same Section with Equal Size, Structure & Styling
  const projects = [
    {
      id: 'eurobike',
      title: 'European Alpine Tour & Fleet Engine',
      client: 'Eurobike',
      scopeItems: ['Custom Responsive Build', 'Multi-Currency Engine', 'Itinerary Discovery'],
      description:
        'Engineered for international travelers with clear departure itineraries, high-resolution fleet galleries, and frictionless mobile booking flows.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCn-0cv3_Z6DaXgQUii4Sc7BdR30V57Me_59K2fVlmoym28EmqsG5OiGuKUUHb0l-y0SnuGRotzG-wBAaqL-c0a9EDFvkLsxT6o0YvtV9h1MrA8_b5k1JJERXZY679roOm5iEMBqaMP0WcpxN4Lr-pBBfQNarzuMoVG7L2IWM23P7v06VDxhG7_2fAOtAZJ1FyxNW9d8pfoXL_OFKZQweROGL0tL2jnFvMjuzKUYGnqpdqS7YP7__PtESrdLCaZcTE--A',
      tag: 'Verified Client Build',
      clarification: null,
      alt: 'Eurobike Alpine tour booking platform interface',
      statusText: 'Live Client Platform',
    },
    {
      id: 'rotoballer',
      title: 'High-Velocity Sports Data Platform',
      client: 'Roto Baller',
      scopeItems: ['Headless CMS', 'Real-Time Team Statistics', 'Sub-Second Page Load'],
      description:
        'Ultra-fast editorial publishing platform delivering live scores, player projections, and responsive mobile layouts for millions of active fans.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAa7GR3nwQgOMg_12rmPSz2gtuaaDiVszJyZsjMQv3vhCRIQ4qFnqCa99ehAqJ4C5hBt8BPWQhEdmnECwgwjTWGYvEozSeO2MNWWQ_zZSdH9RLjwj-Au8VLgeMuM7cfzrEwW-lWki0Vj_6EwezXAh0UvAy9A8aFawrP1Mfx0BrBbjIOii1mzZlIT9nw5qjdDVlOrmZ5zsm_EI0f4H3P1d4TwTB3fYgIw-E80IhEJd-tZhEK2dhL1Vy_fHcmus5NvDeDVA',
      tag: 'Verified Client Build',
      clarification: null,
      alt: 'Roto Baller real-time sports data and content platform interface',
      statusText: 'Live Client Platform',
    },
    {
      id: 'practice-co',
      title: 'Practice & Co. Corporate Advisory',
      client: 'Practice & Co.',
      scopeItems: ['Consultation Pathways', 'Multi-Page Architecture', 'Local Australian Edge'],
      description:
        'Warm, high-end editorial website concept engineered for corporate advisory firms, featuring clear client discovery and integrated consultation scheduling.',
      image: practiceCoPreview,
      tag: 'Design concept',
      clarification: 'Illustrative design and proposed technical scope.',
      alt: 'Corporate website design concept with consultation links and professional service sections.',
      statusText: 'Design Concept Preview',
    },
  ];

  // Benefits
  const benefits = [
    {
      icon: <Sparkles size={20} className="text-[#1A5CFF]" />,
      title: 'Explain your business clearly',
      description:
        'Present your services and expertise in plain, structured language so first-time visitors immediately understand what you do, who you help, and why you are the right choice.',
    },
    {
      icon: <MessageSquare size={20} className="text-[#1A5CFF]" />,
      title: 'Make contacting you straightforward',
      description:
        'Provide intuitive contact paths, simple quote forms, and clear calls to action so reaching out feels effortless rather than a chore on every screen.',
    },
    {
      icon: <Smartphone size={20} className="text-[#1A5CFF]" />,
      title: 'Deliver a consistent experience on mobile',
      description:
        'Ensure fast loading times and natural touch navigation on smartphones, where more than half of your potential clients first discover your business.',
    },
  ];

  // Services
  const services = [
    {
      icon: <Globe size={22} className="text-[#1A5CFF]" />,
      title: 'Business Websites',
      description:
        'Bespoke multi-page websites that present your services, credentials, and client pathways with absolute clarity.',
    },
    {
      icon: <RefreshCw size={22} className="text-[#1A5CFF]" />,
      title: 'Website Redesigns',
      description:
        'Modernising outdated platforms to improve mobile usability, speed, and clarity while preserving your existing domain name.',
    },
    {
      icon: <Smartphone size={22} className="text-[#1A5CFF]" />,
      title: 'Mobile-Friendly Layouts',
      description:
        'Interfaces engineered specifically for smartphone users with readable typography, tap-friendly buttons, and clean layouts.',
    },
    {
      icon: <Layers size={22} className="text-[#1A5CFF]" />,
      title: 'Content & Enquiry Forms',
      description:
        'Intuitive tools that let you update your own content easily, paired with reliable enquiry forms sent directly to your email.',
    },
  ];

  // Process Steps
  const processSteps = [
    {
      number: '01',
      title: 'Tell us what you need.',
      description:
        'Share your goals, your current website, and the pages you require so we understand your timeline and project scope.',
    },
    {
      number: '02',
      title: 'Review the direction.',
      description:
        'We align on the layout structure, visual direction, and fixed scope proposal before any development work begins.',
    },
    {
      number: '03',
      title: 'Build, refine, and launch.',
      description:
        'We develop your site, review staging together, connect your domain name, and launch with 100% complete code ownership.',
    },
  ];

  // FAQs
  const faqs = [
    {
      q: 'Can you redesign my existing website?',
      a: 'Yes. We regularly redesign and rebuild existing websites to improve mobile responsiveness, speed, content clarity, and customer enquiry rates while preserving your existing domain name and search standing.',
    },
    {
      q: 'How much will my website cost?',
      a: 'Pricing depends on the agreed scope. Tell us what you need and we can discuss the appropriate option. We provide transparent, itemised proposals before work starts, so there are never unexpected surprises or hidden fees.',
    },
    {
      q: 'How long does a project take?',
      a: 'Typical timelines are agreed after scope review, generally ranging from 2 to 4 weeks depending on the number of pages, content readiness, and specific technical features.',
    },
    {
      q: 'Can I update my website myself?',
      a: 'Yes. We build with intuitive content management systems (such as WordPress or modern headless CMS) that allow you to update text, photos, blog posts, and service information easily without touching code.',
    },
    {
      q: 'Do you provide hosting or ongoing support?',
      a: 'Yes. We assist with Australian edge hosting, domain setup, SSL certificates, and offer optional post-launch support retainers for regular security updates and continuous technical care.',
    },
    {
      q: 'What happens after I enquire?',
      a: 'We review your website goals and follow up directly to schedule a brief discovery discussion and prepare a transparent, itemized proposal tailored to your business.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#15171C] font-['Inter',sans-serif] selection:bg-[#1A5CFF] selection:text-white">
      {/* =========================================================================
          1. HEADER (Deep Black / Midnight Atmosphere Matching Brand Identity)
          ========================================================================= */}
      <header className="sticky top-0 z-50 bg-[#050811] border-b border-white/[0.08] h-[76px] transition-all">
        <div className={`${CONTAINER_CLASS} h-full flex items-center justify-between`}>
          {/* Logo links back to Home */}
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A5CFF] rounded-lg transition-opacity hover:opacity-85"
            aria-label="NexSite Home"
          >
            <NexSiteLogo size="md" themeVariant="dark" />
          </button>

          {/* Desktop Navigation & Action Button */}
          <div className="hidden md:flex items-center gap-7">
            <nav className="flex items-center gap-7 text-[15px] font-medium text-neutral-300">
              <button
                onClick={() => scrollToSection('selected-work')}
                className="hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A5CFF] rounded px-1"
              >
                Work
              </button>
              <button
                onClick={() => scrollToSection('faqs')}
                className="hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A5CFF] rounded px-1"
              >
                FAQs
              </button>
            </nav>

            <button
              onClick={() => scrollToSection('quote-form')}
              className="inline-flex items-center gap-2 px-6 h-[46px] rounded-xl bg-[#1A5CFF] hover:bg-[#0B4AE8] text-white text-sm font-semibold transition-all duration-200 cursor-pointer shadow-sm active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Get a Website Quote</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-11 h-11 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 flex items-center justify-center text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A5CFF]"
              aria-label={isMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#050811]/95 backdrop-blur-2xl border-b border-white/10 px-5 py-5 shadow-2xl animate-fadeIn">
            <nav className="flex flex-col gap-3">
              <button
                onClick={() => scrollToSection('selected-work')}
                className="w-full text-left py-2.5 px-3 rounded-lg text-base font-medium text-neutral-200 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                Work
              </button>
              <button
                onClick={() => scrollToSection('faqs')}
                className="w-full text-left py-2.5 px-3 rounded-lg text-base font-medium text-neutral-200 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                FAQs
              </button>
              <div className="pt-2">
                <button
                  onClick={() => scrollToSection('quote-form')}
                  className="w-full h-12 rounded-xl bg-[#1A5CFF] hover:bg-[#0B4AE8] text-white text-base font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <span>Get a Website Quote</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* =========================================================================
          2. HERO SECTION (Selector 1: Full-Width Atmospheric Cratered Moon Background)
          ========================================================================= */}
      <section className="relative bg-[#050811] text-white pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-[96px] lg:pb-[104px] border-b border-white/[0.08] overflow-hidden">
        {/* Full-width atmospheric hero background showcasing Cratered Moon in Midnight Blue */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 bg-cover bg-no-repeat bg-center md:bg-[position:right_center]"
          style={{
            backgroundImage: `url(${heroMidnightMoon})`,
          }}
        />

        {/* Soft atmospheric gradient: text readable on left, moon brightly visible on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050811]/90 via-[#050811]/50 to-transparent pointer-events-none z-0" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050811] to-transparent pointer-events-none z-0" />

        {/* Centered Hero Content */}
        <div className={`relative z-10 ${CONTAINER_CLASS} text-center flex flex-col items-center justify-center`}>
          {/* Centered Headline: max 960px wide, fluid 38px mobile to 68px desktop */}
          <h1 className="font-['Space_Grotesk',sans-serif] font-medium text-[38px] sm:text-[48px] md:text-[58px] lg:text-[68px] leading-[1.12] sm:leading-[1.1] tracking-[-0.02em] text-white max-w-[960px] mx-auto mb-5 sm:mb-6">
            Better websites.
            <br className="hidden sm:inline" />{' '}
            Built for your business.
          </h1>

          {/* Centered Description: max 600px wide */}
          <p className="text-base sm:text-[17px] lg:text-[18px] text-neutral-300 leading-relaxed max-w-[600px] mx-auto mb-9 sm:mb-10 font-normal">
            Website design and development for Australian businesses that want to make a stronger first impression.
          </p>

          {/* Centered Action Buttons: Side-by-side on desktop (16px gap), stacked on mobile */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto max-w-[360px] sm:max-w-none mx-auto">
            <button
              onClick={() => scrollToSection('quote-form')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 h-[50px] sm:h-[52px] rounded-xl bg-[#1A5CFF] hover:bg-[#0B4AE8] text-white font-semibold text-base transition-colors duration-200 cursor-pointer shadow-md active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Get a Website Quote</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => scrollToSection('selected-work')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 h-[50px] sm:h-[52px] rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/20 text-white font-medium text-base transition-colors cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A5CFF]"
            >
              <span>Explore Our Work</span>
              <ArrowUpRight size={16} className="text-neutral-400" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SELECTED WORK (All projects in one section, exact same size & ordered text)
          ========================================================================= */}
      <section id="selected-work" className="py-20 lg:py-24 bg-[#FAFAF7] scroll-mt-20">
        <div className={CONTAINER_CLASS}>
          {/* Section Header */}
          <ScrollReveal delay={0} distance={18}>
            <div className="max-w-2xl mb-12 sm:mb-14">
              <span className="font-mono text-xs font-semibold text-[#1A5CFF] uppercase tracking-wider block mb-2">
                SELECTED WORK
              </span>
              <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight text-[#15171C] mb-4">
                See what your next website could look like.
              </h2>
              <p className="text-base sm:text-lg text-[#555D6B] leading-relaxed">
                Recent website projects designed and developed for speed, clarity, and real customer enquiries.
              </p>
            </div>
          </ScrollReveal>

          {/* Unified Project Grid: All 3 Projects in Same Section, Equal Size & Ordered Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {projects.map((project, idx) => (
              <ScrollReveal key={project.id} delay={idx * 70 + 40} distance={20} className="h-full">
                <div className="rounded-2xl bg-white border border-[#E5E7EB] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full group">
                  {/* Equal Size Image Preview Container */}
                  <div className="aspect-[16/10] w-full overflow-hidden bg-[#F6F7F9] border-b border-[#EAECE8] relative">
                    <img
                      src={project.image}
                      alt={project.alt}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>

                  {/* Clean, Ordered Text Panel */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-4">
                    <div className="space-y-3">
                      {/* 1. Client Tag & Status Badge */}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-xs font-mono uppercase tracking-wider text-[#555D6B] font-semibold">
                          {project.client}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-[#EBF2FF] text-[#1A5CFF] border border-[#1A5CFF]/20">
                          <CheckCircle2 size={12} className="text-[#1A5CFF]" />
                          <span>{project.tag}</span>
                        </span>
                      </div>

                      {/* 2. Main Title */}
                      <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-semibold text-[#15171C] leading-snug group-hover:text-[#1A5CFF] transition-colors">
                        {project.title}
                      </h3>

                      {/* 3. Description */}
                      <p className="text-sm text-[#555D6B] leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* 4. Ordered Scope & Deliverables */}
                    <div className="pt-3 border-t border-[#F0F2F5] space-y-3 mt-auto">
                      <div className="flex flex-wrap gap-1.5">
                        {project.scopeItems.map((item, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-[#F4F6FA] text-neutral-700 border border-[#E2E6EE]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono text-[#1A5CFF] font-semibold pt-1">
                        <span className="text-neutral-400 font-normal">{project.statusText}</span>
                        <span className="flex items-center gap-1">
                          <span>Details</span>
                          <ArrowUpRight size={13} />
                        </span>
                      </div>

                      {project.clarification && (
                        <p className="text-[11px] font-mono text-neutral-400 leading-normal pt-1">
                          {project.clarification}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. BENEFITS SECTION (Engaging 2-Column Section, No Heavy Boxed Cards)
          ========================================================================= */}
      <section className="py-20 lg:py-24 bg-white border-t border-[#EAECE8]">
        <div className={CONTAINER_CLASS}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Column (~42%) */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <ScrollReveal delay={0} distance={18}>
                <span className="font-mono text-xs font-semibold text-[#1A5CFF] uppercase tracking-wider block mb-2">
                  WHY IT MATTERS
                </span>
                <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight text-[#15171C] mb-4">
                  Make it easier for customers to choose you.
                </h2>
                <p className="text-base sm:text-lg text-[#555D6B] leading-relaxed">
                  A good business website should make the offer clear and the next step obvious. We design
                  websites that help first-time visitors understand your value and feel confident reaching out.
                </p>
              </ScrollReveal>
            </div>

            {/* Right Column (~58%) — 3 Substantial Stacked Benefits */}
            <div className="lg:col-span-7 divide-y divide-[#E5E7EB] border-t border-b border-[#E5E7EB]">
              {benefits.map((b, idx) => (
                <ScrollReveal key={idx} delay={idx * 70} distance={18}>
                  <div className="py-7 sm:py-8 flex items-start gap-4 sm:gap-5">
                    <div className="w-10 h-10 rounded-xl bg-[#F0F4FD] border border-[#E2E8F4] flex items-center justify-center shrink-0 mt-1">
                      {b.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-['Space_Grotesk',sans-serif] text-xl sm:text-2xl font-semibold text-[#15171C] mb-2">
                        {b.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#555D6B] leading-relaxed">
                        {b.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. SERVICES SECTION (Pale-Blue Section with 2x2 Grid)
          ========================================================================= */}
      <section className="py-20 lg:py-24 bg-[#F0F4FD] border-t border-b border-[#E2E8F4]">
        <div className={CONTAINER_CLASS}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Clear Introduction */}
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <ScrollReveal delay={0} distance={18}>
                <span className="font-mono text-xs font-semibold text-[#1A5CFF] uppercase tracking-wider block mb-2">
                  SERVICES
                </span>
                <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight text-[#15171C] mb-4">
                  A website shaped around what you need.
                </h2>
                <p className="text-base sm:text-lg text-[#555D6B] leading-relaxed mb-6">
                  Every project is quoted on its agreed deliverables. From establishing your first professional presence to a complete digital overhaul, we keep your scope clear and transparent.
                </p>
                <div className="p-4 rounded-xl bg-white/70 border border-[#D8DFEE] text-xs text-[#555D6B] leading-relaxed">
                  Final scope and technical integrations are confirmed in your itemised proposal before kickoff.
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Structured 2x2 Service Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {services.map((srv, idx) => (
                <ScrollReveal key={idx} delay={idx * 60 + 50} distance={18}>
                  <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#D8DFEE] shadow-xs flex flex-col justify-between h-full">
                    <div className="min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-[#F0F4FD] border border-[#D8DFEE] flex items-center justify-center mb-4 sm:mb-5">
                        {srv.icon}
                      </div>
                      <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-semibold text-[#15171C] mb-2">
                        {srv.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#555D6B] leading-relaxed">
                        {srv.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. SIMPLE PROCESS (Three Steps with Strong Hierarchy & Desktop Connectors)
          ========================================================================= */}
      <section className="py-20 lg:py-24 bg-[#FAFAF7]">
        <div className={CONTAINER_CLASS}>
          {/* Section Heading */}
          <ScrollReveal delay={0} distance={18}>
            <div className="max-w-2xl mb-12 sm:mb-14">
              <span className="font-mono text-xs font-semibold text-[#1A5CFF] uppercase tracking-wider block mb-2">
                OUR PROCESS
              </span>
              <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight text-[#15171C] mb-4">
                From first conversation to launch.
              </h2>
              <p className="text-base sm:text-lg text-[#555D6B] leading-relaxed">
                No complicated handoffs or technical confusion. Here is what happens at each stage of your project.
              </p>
            </div>
          </ScrollReveal>

          {/* 3 Numbered Steps with Desktop Horizontal Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 relative">
            {processSteps.map((step, idx) => (
              <ScrollReveal key={idx} delay={idx * 80} distance={18}>
                <div className="flex flex-col relative min-w-0">
                  {/* Step Number */}
                  <span className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl font-bold text-[#1A5CFF] mb-3 sm:mb-4">
                    {step.number}
                  </span>
                  <h3 className="font-['Space_Grotesk',sans-serif] text-xl sm:text-2xl font-semibold text-[#15171C] mb-2 sm:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#555D6B] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. FAQS (2-Column Desktop Composition, Fine Line Accordion)
          ========================================================================= */}
      <section id="faqs" className="py-20 lg:py-24 bg-white border-t border-[#EAECE8] scroll-mt-20">
        <div className={CONTAINER_CLASS}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Column: Title & Reassurance */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <ScrollReveal delay={0} distance={18}>
                <span className="font-mono text-xs font-semibold text-[#1A5CFF] uppercase tracking-wider block mb-2">
                  FREQUENTLY ASKED QUESTIONS
                </span>
                <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight text-[#15171C] mb-4">
                  Common questions answered.
                </h2>
                <p className="text-base sm:text-lg text-[#555D6B] leading-relaxed mb-6">
                  Everything you need to know about our design process, turnaround, ownership, and how we quote website builds.
                </p>
                <p className="text-sm text-[#555D6B]">
                  Have a specific question not covered here? Reach out via our enquiry form and we’ll answer directly.
                </p>
              </ScrollReveal>
            </div>

            {/* Right Column: Accordion Rows */}
            <div className="lg:col-span-7 divide-y divide-[#E2E6ED] border-t border-b border-[#E2E6ED]">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="py-5 sm:py-6">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A5CFF] rounded"
                      aria-expanded={isOpen}
                    >
                      <span className="font-['Space_Grotesk',sans-serif] font-semibold text-lg sm:text-xl text-[#15171C] leading-snug">
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp size={20} className="text-[#1A5CFF] shrink-0 mt-1" />
                      ) : (
                        <ChevronDown size={20} className="text-[#555D6B] shrink-0 mt-1" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="mt-3.5 pr-2 sm:pr-6 text-sm sm:text-base text-[#555D6B] leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. ENQUIRY SECTION (Substantial White Form Panel against Deep Navy)
          ========================================================================= */}
      <section id="quote-form" className="py-20 lg:py-26 bg-[#080D1B] text-white border-t border-white/[0.08] scroll-mt-20">
        <div className={CONTAINER_CLASS}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Invitation Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <ScrollReveal delay={0} distance={18}>
                <span className="font-mono text-xs font-semibold text-[#1A5CFF] uppercase tracking-wider block mb-2">
                  GET IN TOUCH
                </span>
                <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl lg:text-[46px] font-semibold tracking-tight text-white mb-4">
                  Let’s talk about your website.
                </h2>
                <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-8">
                  Tell us a little about your business and what you want to achieve. We’ll review your details
                  and be in touch to discuss the next step.
                </p>

                <div className="space-y-4 pt-6 border-t border-white/10 text-sm text-neutral-300">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-[#1A5CFF] shrink-0" />
                    <span>No obligation discovery discussion</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-[#1A5CFF] shrink-0" />
                    <span>Transparent itemised proposal before kickoff</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-[#1A5CFF] shrink-0" />
                    <span>Direct email: info@nexsiteau.com</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Form Card: Substantial White Panel */}
            <div className="lg:col-span-7 bg-white text-[#15171C] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
              {!isSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
                  {errorMessage && (
                    <div
                      role="alert"
                      className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2.5"
                    >
                      <AlertCircle size={18} className="shrink-0 text-red-500" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Name & Work Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#15171C] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Jason Croft"
                        className="w-full px-4 h-12 rounded-xl text-base border border-[#D5D9E2] bg-white text-[#15171C] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#1A5CFF] focus:border-[#1A5CFF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#15171C] mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. jason@business.com.au"
                        className="w-full px-4 h-12 rounded-xl text-base border border-[#D5D9E2] bg-white text-[#15171C] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#1A5CFF] focus:border-[#1A5CFF]"
                      />
                    </div>
                  </div>

                  {/* Business Name & Current Website */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#15171C] mb-1.5">
                        Business Name <span className="text-[#555D6B] font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Croft Advisory"
                        className="w-full px-4 h-12 rounded-xl text-base border border-[#D5D9E2] bg-white text-[#15171C] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#1A5CFF] focus:border-[#1A5CFF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#15171C] mb-1.5">
                        Current Website <span className="text-[#555D6B] font-normal">(Optional)</span>
                      </label>
                      <input
                        type="url"
                        value={currentWebsite}
                        onChange={(e) => setCurrentWebsite(e.target.value)}
                        placeholder="e.g. https://mybusiness.com.au"
                        className="w-full px-4 h-12 rounded-xl text-base border border-[#D5D9E2] bg-white text-[#15171C] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#1A5CFF] focus:border-[#1A5CFF]"
                      />
                    </div>
                  </div>

                  {/* What do you need? Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-[#15171C] mb-1.5">
                      What do you need? *
                    </label>
                    <select
                      value={serviceNeeded}
                      onChange={(e) => setServiceNeeded(e.target.value)}
                      className="w-full px-4 h-12 rounded-xl text-base border border-[#D5D9E2] bg-white text-[#15171C] focus:outline-none focus:ring-2 focus:ring-[#1A5CFF] focus:border-[#1A5CFF]"
                    >
                      <option value="New website">New website</option>
                      <option value="Website redesign">Website redesign</option>
                      <option value="Online store">Online store</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                  </div>

                  {/* Short Project Description */}
                  <div>
                    <label className="block text-xs font-semibold text-[#15171C] mb-1.5">
                      Short Project Description <span className="text-[#555D6B] font-normal">(Optional)</span>
                    </label>
                    <textarea
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Briefly describe what your business does and what you would like your website to achieve..."
                      className="w-full p-4 rounded-xl text-base border border-[#D5D9E2] bg-white text-[#15171C] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#1A5CFF] focus:border-[#1A5CFF] resize-none"
                    />
                  </div>

                  {/* Submit Action Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-[52px] px-6 rounded-xl font-semibold text-base bg-[#1A5CFF] hover:bg-[#0B4AE8] text-white flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-md disabled:opacity-50 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A5CFF]"
                  >
                    {isSubmitting ? (
                      <span>Submitting enquiry...</span>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Get a Website Quote</span>
                      </>
                    )}
                  </button>

                  {/* Direct Contact & Privacy Notice */}
                  <div className="pt-2 text-center text-xs text-[#555D6B] leading-relaxed space-y-1">
                    <p>
                      Or reach out directly via{' '}
                      <a
                        href="mailto:info@nexsiteau.com"
                        className="text-[#15171C] hover:text-[#1A5CFF] underline font-medium transition-colors"
                      >
                        info@nexsiteau.com
                      </a>
                    </p>
                    <p>
                      By submitting, you agree to our{' '}
                      <button
                        type="button"
                        onClick={onOpenPrivacy}
                        className="text-[#15171C] hover:text-[#1A5CFF] underline cursor-pointer"
                      >
                        Privacy Policy
                      </button>
                      . No unsolicited newsletters or spam.
                    </p>
                  </div>
                </form>
              ) : (
                /* Confirmed Submission State */
                <div className="py-12 text-center space-y-4 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-blue-50 text-[#1A5CFF] flex items-center justify-center mx-auto border border-blue-200">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-['Space_Grotesk',sans-serif] font-semibold text-[#15171C]">
                    Thanks — your enquiry has been received.
                  </h3>
                  <p className="text-base text-[#555D6B] max-w-md mx-auto leading-relaxed">
                    We’ll be in touch to discuss your project and prepare a clear proposal tailored to{' '}
                    <strong className="text-[#15171C]">{email}</strong>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. COMPACT FOOTER (Connecting to Main Website Brand)
          ========================================================================= */}
      <footer
        className="relative w-full text-white pt-14 pb-16 border-t border-white/[0.08] overflow-hidden bg-[#080D1B] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${footerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Subtle Dark Navy Calming Overlay */}
        <div className="absolute inset-0 bg-[#080D1B]/85 pointer-events-none" />

        <div className={`relative z-10 ${CONTAINER_CLASS} space-y-6`}>
          {/* Top Brand Info Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <NexSiteLogo size="md" themeVariant="dark" />
              <span className="text-neutral-500 text-xs sm:text-sm hidden sm:inline">·</span>
              <span className="text-neutral-400 text-xs sm:text-sm">
                Website design &amp; development for Australian businesses.
              </span>
            </div>
            <p className="text-xs text-neutral-500 whitespace-nowrap">
              © {new Date().getFullYear()} NexSite. All rights reserved.
            </p>
          </div>

          {/* Bottom Links Row: All links strictly on the same single line */}
          <div className="pt-5 border-t border-white/10 flex items-center justify-center sm:justify-start">
            <div className="flex flex-row items-center justify-center sm:justify-start gap-3 sm:gap-5 text-xs sm:text-sm text-neutral-400 whitespace-nowrap overflow-x-auto max-w-full py-1">
              <a href="mailto:info@nexsiteau.com" className="hover:text-white transition-colors">
                info@nexsiteau.com
              </a>
              <span className="text-neutral-600">·</span>
              <button
                onClick={() => scrollToSection('selected-work')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Work
              </button>
              <span className="text-neutral-600">·</span>
              <button
                onClick={() => scrollToSection('faqs')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                FAQs
              </button>
              <span className="text-neutral-600">·</span>
              <button
                onClick={onOpenPrivacy}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <span className="text-neutral-600">·</span>
              <button
                onClick={onOpenTerms}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
              <span className="text-neutral-600">·</span>
              <button
                onClick={onBackToHome}
                className="hover:text-white text-[#1A5CFF] transition-colors cursor-pointer font-medium"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

