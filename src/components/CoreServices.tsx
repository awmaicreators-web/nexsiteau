/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — 02 // Core Services (Interactive Service Explorer)
 * Replaces repetitive card grid with a split selector & detail explorer.
 * Features:
 * - 8 Authentic NexSite Services from agencyData.
 * - Desktop: Vertical service selector (~28% width) + Detailed showcase (~72% width).
 * - Mobile: Accessible interactive accordion for cramped-free reading.
 * - Smooth crossfade, technology tags, and direct inquiry link.
 */

import React, { useState } from 'react';
import { SectionHeader } from './SectionHeader';
import {
  Code,
  Palette,
  Server,
  ShoppingBag,
  Wrench,
  Users,
  Zap,
  Globe,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollReveal';

interface CoreServicesProps {
  onSelectService?: (serviceName: string) => void;
}

interface ServiceData {
  id: string;
  num: string;
  title: string;
  tag: string;
  desc: string;
  benefit: string;
  icon: React.ReactNode;
  deliverables: string[];
  techStack: string[];
}

const SERVICES_LIST: ServiceData[] = [
  {
    id: 'cms-dev',
    num: '01',
    title: 'Custom CMS Development',
    tag: 'WordPress / Webflow / Headless',
    desc: 'Flexible and scalable CMS solutions tailored to your business for easy content management and long-term growth. Built with clean code that marketing teams can update effortlessly without breaking layouts.',
    benefit: 'Empowers your team to publish blog posts, case studies, and landing pages with zero code friction.',
    icon: <Code size={24} className="text-[#1A5CFF]" />,
    deliverables: ['Custom page template architecture', 'Structured ACF / Webflow CMS fields', 'Automated staging to production flow', 'Comprehensive client editorial guide'],
    techStack: ['WordPress Headless', 'Webflow', 'Tailwind CSS', 'TypeScript'],
  },
  {
    id: 'ui-ux',
    num: '02',
    title: 'Modern UI/UX Design',
    tag: 'Figma / Design Tokens',
    desc: 'Clean, intuitive, and visually engaging interfaces that elevate your brand and drive meaningful user interactions across smartphones, tablets, and wide desktop displays.',
    benefit: 'Transforms complicated service offerings into clear, credible, high-converting digital journeys.',
    icon: <Palette size={24} className="text-[#1A5CFF]" />,
    deliverables: ['Interactive Figma prototypes', 'Systematic typographic & color scales', 'Mobile-first responsive wireframes', 'Micro-interactions & animation specs'],
    techStack: ['Figma', 'Framer Tokens', 'Prototyping', 'Design Systems'],
  },
  {
    id: 'backend',
    num: '03',
    title: 'Reliable Backend Systems',
    tag: 'Node / PostgreSQL / APIs',
    desc: 'Stable, secure, and scalable backend architecture to support smooth platform operations, complex relational data models, third-party webhook integrations, and client portals.',
    benefit: 'Ensures business-critical logic and database transactions run 24/7 without performance bottlenecks.',
    icon: <Server size={24} className="text-[#1A5CFF]" />,
    deliverables: ['Custom REST & GraphQL endpoints', 'Relational database schema modeling', 'Secure authentication & session state', 'Third-party CRM/ERP webhooks'],
    techStack: ['Node.js', 'PostgreSQL', 'Express', 'JWT / OAuth2'],
  },
  {
    id: 'ecommerce',
    num: '04',
    title: 'eCommerce That Converts',
    tag: 'Shopify / Stripe AU',
    desc: 'Fast, secure, and conversion-focused online stores built to improve purchasing journeys and maximize checkout completion rates across Australian and international markets.',
    benefit: 'Eliminates checkout friction and powers seamless multi-currency transactions with local gateways.',
    icon: <ShoppingBag size={24} className="text-[#1A5CFF]" />,
    deliverables: ['Custom Shopify & Headless storefronts', 'Stripe, Apple Pay & PayPal AU gateways', 'Cart abandonment recovery paths', 'Real-time inventory synchronization'],
    techStack: ['Shopify Liquid', 'Stripe API', 'Apple Pay', 'Multi-Currency'],
  },
  {
    id: 'support-maintenance',
    num: '05',
    title: 'Ongoing Support & Maintenance',
    tag: 'SLA Guaranteed Care',
    desc: 'Continuous technical oversight, proactive security patches, automated off-site backups, and uptime monitoring to keep systems running at peak performance year-round.',
    benefit: 'Protects your agency reputation with guaranteed rapid response times whenever technical questions arise.',
    icon: <Wrench size={24} className="text-[#1A5CFF]" />,
    deliverables: ['Core framework & security updates', 'Daily automated encrypted backups', '24/7 uptime & SSL monitoring', 'Dedicated priority support queue'],
    techStack: ['Edge Monitoring', 'Cloudflare SSL', 'Automated CI/CD', 'Slack SLA'],
  },
  {
    id: 'outsourcing',
    num: '06',
    title: 'Bespoke Outsourcing',
    tag: 'Agency Extension',
    desc: 'Dedicated web development and engineering capacity designed to help digital agencies scale client throughput without the overhead, payroll taxes, or recruitment delays of full-time hiring.',
    benefit: 'Enables your studio to accept larger contract scopes with guaranteed sprint fulfillment behind the scenes.',
    icon: <Users size={24} className="text-[#1A5CFF]" />,
    deliverables: ['Dedicated senior engineer pod', 'Flexible sprint queue management', 'Complete white-label confidentiality', 'Transparent daily progress reporting'],
    techStack: ['Git Submodules', 'Private Repositories', 'Loom Walkthroughs', 'Slack Sync'],
  },
  {
    id: 'performance',
    num: '07',
    title: 'Performance Optimization',
    tag: 'Lighthouse 95+ Score',
    desc: 'Sub-second page speeds, code splitting, asset minification, CDN optimization, and Core Web Vitals remediation to maximize user engagement and search engine rankings.',
    benefit: 'Dramatically reduces bounce rates and ensures visitors experience instant page navigation on any connection.',
    icon: <Zap size={24} className="text-[#1A5CFF]" />,
    deliverables: ['Lighthouse 95+ speed guarantee', 'Modern image format delivery (AVIF/WebP)', 'Critical CSS & script deferral', 'Server-side edge caching rules'],
    techStack: ['Next.js Caching', 'Cloudflare CDN', 'Web Vitals', 'Brotli Compression'],
  },
  {
    id: 'seo-hosting',
    num: '08',
    title: 'Onsite SEO & Hosting',
    tag: 'Edge Infrastructure',
    desc: 'Semantic structured data, OpenGraph social protocols, automated XML sitemaps, and enterprise-grade Australian hosting configuration for maximum discoverability.',
    benefit: 'Gives search engines clean, structured signals that elevate organic visibility across target regions.',
    icon: <Globe size={24} className="text-[#1A5CFF]" />,
    deliverables: ['Schema.org JSON-LD structured data', 'Local Australian DNS & server zones', 'OpenGraph & Twitter preview cards', 'Canonical & 301 redirect mapping'],
    techStack: ['Schema.org', 'OpenGraph', 'Sydney/Melbourne Edge', 'DNSSEC'],
  },
];

export const CoreServices: React.FC<CoreServicesProps> = ({ onSelectService }) => {
  const [activeId, setActiveId] = useState(SERVICES_LIST[0].id);
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(SERVICES_LIST[0].id);

  const activeService = SERVICES_LIST.find((s) => s.id === activeId) || SERVICES_LIST[0];

  const handleServiceClick = (srv: ServiceData) => {
    setActiveId(srv.id);
  };

  const toggleMobileAccordion = (id: string) => {
    setMobileExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="services"
      className="w-full py-20 lg:py-24 bg-white text-[#1A1C1C] transition-colors border-t border-[#E8E8E5] scroll-mt-20"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <SectionHeader
          showDot={false}
          label="02 // CORE SERVICES"
          title="Engineered for reliability, performance, and scale"
          description="Everything your business or agency needs to execute high-calibre web projects. No unnecessary complexity or technical jargon."
        />

        {/* Desktop Interactive Service Explorer (Hidden on Mobile) */}
        <div className="hidden md:block">
          <ScrollReveal delay={100} distance={20}>
            <div className="rounded-[28px] bg-[#F8F8F6] border border-[#E8E8E5] p-6 lg:p-8 grid grid-cols-12 gap-8 items-start shadow-xs">
              {/* Left Selector Menu (~28% width) */}
              <div className="col-span-4 lg:col-span-4 flex flex-col gap-1.5" role="tablist" aria-label="Services List">
                {SERVICES_LIST.map((srv) => {
                  const isActive = srv.id === activeId;
                  return (
                    <button
                      key={srv.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleServiceClick(srv)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A5CFF] ${
                        isActive
                          ? 'bg-white text-[#1A5CFF] shadow-xs border-l-4 border-l-[#1A5CFF] font-semibold pl-3.5'
                          : 'hover:bg-white/60 text-neutral-700 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <span className={`font-mono text-xs ${isActive ? 'text-[#1A5CFF] font-bold' : 'text-neutral-400'}`}>
                          {srv.num}
                        </span>
                        <span className="text-sm truncate">{srv.title}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Detail Panel (~72% width) */}
              <div className="col-span-8 lg:col-span-8 bg-white rounded-2xl border border-[#E8E8E5] p-8 lg:p-10 shadow-xs flex flex-col justify-between min-h-[460px]">
                <div className="animate-fadeIn key={activeService.id}">
                  {/* Top Bar: Icon + Number + Tag */}
                  <div className="flex items-center justify-between pb-6 border-b border-[#E8E8E5] mb-6">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-[#EBF2FF] flex items-center justify-center shrink-0">
                        {activeService.icon}
                      </div>
                      <div>
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1A5CFF] block">
                          SERVICE // {activeService.num}
                        </span>
                        <h3 className="font-['Space_Grotesk',sans-serif] text-2xl lg:text-[28px] font-bold text-[#1A1C1C]">
                          {activeService.title}
                        </h3>
                      </div>
                    </div>

                    <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#F4F4F1] border border-[#E8E8E5] text-neutral-600">
                      {activeService.tag}
                    </span>
                  </div>

                  {/* Benefit Statement & Description */}
                  <div className="mb-6">
                    <p className="text-base lg:text-[17px] font-medium text-[#1A1C1C] leading-snug mb-3 font-['Inter',sans-serif]">
                      {activeService.benefit}
                    </p>
                    <p className="text-sm text-neutral-600 leading-relaxed font-['Inter',sans-serif]">
                      {activeService.desc}
                    </p>
                  </div>

                  {/* Key Deliverables Matrix */}
                  <div className="pt-4 border-t border-[#E8E8E5] mb-6">
                    <span className="font-mono text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-3">
                      Production Deliverables Included:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeService.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700">
                          <CheckCircle2 size={15} className="text-[#1A5CFF] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {activeService.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-[#F8F9FC] text-neutral-600 border border-[#E5E9F2]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action CTA */}
                <div className="pt-6 mt-8 border-t border-[#E8E8E5] flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400">
                    Transparent Scope &amp; 100% Code Ownership
                  </span>
                  <button
                    onClick={() => onSelectService?.(activeService.title)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A5CFF] hover:bg-[#0B4AE8] text-white text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
                  >
                    <span>Enquire About {activeService.title}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Mobile Accordion View (Under md Viewport) */}
        <div className="block md:hidden space-y-3">
          {SERVICES_LIST.map((srv) => {
            const isExpanded = mobileExpandedId === srv.id;
            return (
              <div
                key={srv.id}
                className="rounded-2xl bg-[#F8F8F6] border border-[#E8E8E5] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleMobileAccordion(srv.id)}
                  className="w-full p-4 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#1A5CFF]">
                      {srv.num}
                    </span>
                    <span className="font-bold text-sm text-[#1A1C1C] font-['Space_Grotesk']">
                      {srv.title}
                    </span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-neutral-500 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180 text-[#1A5CFF]' : ''
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="p-4 pt-0 border-t border-[#E8E8E5] bg-white animate-fadeIn text-xs sm:text-sm">
                    <div className="py-3">
                      <p className="font-semibold text-[#1A1C1C] mb-2">{srv.benefit}</p>
                      <p className="text-neutral-600 mb-4 leading-relaxed">{srv.desc}</p>

                      <div className="space-y-1.5 mb-4">
                        {srv.deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2 text-xs text-neutral-700">
                            <span className="text-[#1A5CFF] font-semibold select-none shrink-0">&mdash;</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {srv.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#F4F4F1] text-neutral-600 border border-[#E8E8E5]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => onSelectService?.(srv.title)}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#1A5CFF] text-white font-medium text-xs flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Enquire About {srv.title}</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
