/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — Footer Component (Calmed Atmospheric Composition)
 * Visual Refinements:
 * - Calmed background: 40% dark navy overlay on the background image to soften bright cyan glare and grain.
 * - Refined feature panel: darker, subtly translucent navy surface (no solid gradient), fine 12% white border, subtle divider.
 * - Refined contact area: prominent clickable email with elegant semi-bold font weight, comfortable arrow gap, natural mobile fit.
 * - Preserved full 1240px content width, 15-16px readable navigation, and all existing destinations & legal modal triggers.
 */

import React from 'react';
import { NexSiteLogo } from './NexSiteLogo';
import { Building2, Layers, ArrowUpRight, ArrowRight } from 'lucide-react';
import footerBg from '../assets/footer-bg.jpg';
import { ScrollReveal } from '../hooks/useScrollReveal';

interface FooterProps {
  onNavigate: (path: string, sectionId?: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  return (
    <footer
      className="relative w-full text-white pt-16 sm:pt-20 pb-20 sm:pb-24 border-t border-white/[0.08] overflow-hidden bg-[#060B18] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${footerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark Navy Overlay (40% Opacity):
          Softens the background grain and intense cyan glare while preserving visible blue and teal tones.
          Positioned strictly behind the z-10 content so text and elements stay crisp and 100% opaque. */}
      <div className="absolute inset-0 bg-[#060B18]/40 pointer-events-none" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* 1. Pre-Footer Compact CTA Panel */}
        <ScrollReveal delay={0} distance={18} className="mb-14 sm:mb-20">
          <div className="rounded-[28px] bg-[#070D1F]/50 border border-white/[0.12] backdrop-blur-md p-8 sm:p-10 lg:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-bold font-['Space_Grotesk',sans-serif] text-white tracking-tight">
                Let&apos;s build your next website.
              </h3>
              <p className="text-base sm:text-[17px] text-neutral-300 font-['Inter',sans-serif] mt-2 leading-relaxed">
                Tell us what you have in mind, and let&apos;s discuss the next step.
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <button
                onClick={() => onNavigate('/', 'contact')}
                className="inline-flex items-center gap-2.5 px-8 h-[52px] rounded-full bg-[#1A5CFF] hover:bg-[#0B4AE8] text-white font-medium text-base transition-all duration-200 active:scale-95 cursor-pointer shadow-md"
              >
                <span>Discuss Your Project</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* 2. Top Navigation Row: Immediately visible and accessible without waiting */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 sm:pb-12 border-b border-white/[0.08]">
          {/* Brand Logo */}
          <button
            onClick={() => onNavigate('/', 'top')}
            className="flex items-center gap-2 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A5CFF] rounded-lg transition-transform hover:opacity-90 active:scale-95 self-start md:self-auto"
            aria-label="NexSite Home"
          >
            <NexSiteLogo size="md" themeVariant="dark" />
          </button>

          {/* Simple Top Navigation Links (15-16px readable scale) */}
          <nav className="flex flex-wrap items-center gap-7 sm:gap-9 text-[15px] sm:text-base font-medium text-neutral-300">
            <button
              onClick={() => onNavigate('/', 'top')}
              className="hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A5CFF] rounded px-1 py-0.5"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('/', 'services')}
              className="hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A5CFF] rounded px-1 py-0.5"
            >
              Services
            </button>
            <button
              onClick={() => onNavigate('/', 'case-studies')}
              className="hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A5CFF] rounded px-1 py-0.5"
            >
              Our Work
            </button>
            <button
              onClick={() => onNavigate('/', 'contact')}
              className="hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A5CFF] rounded px-1 py-0.5"
            >
              Contact
            </button>
          </nav>
        </div>

        {/* 3. Centered Translucent Feature Panel with Gentle Entrance Reveal */}
        <ScrollReveal delay={0} distance={20} className="my-10 sm:my-14 max-w-[1180px] mx-auto">
          <div className="rounded-[26px] sm:rounded-[30px] bg-[#070D1F]/50 border border-white/[0.12] backdrop-blur-md p-6 sm:p-9 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
              {/* Left Half: Serving Australian Businesses */}
              <div className="flex items-center gap-5 p-4 sm:p-6 justify-center md:justify-start">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/90 shrink-0">
                  <Building2 size={24} />
                </div>
                <div>
                  <span className="text-xs sm:text-[13px] font-mono uppercase tracking-wider text-neutral-400 font-medium block">
                    Serving
                  </span>
                  <span className="text-xl sm:text-2xl font-bold font-['Space_Grotesk',sans-serif] text-white block mt-0.5">
                    Australian Businesses
                  </span>
                </div>
              </div>

              {/* Right Half: Partnering with Creative Agencies */}
              <div className="flex items-center gap-5 p-4 sm:p-6 justify-center md:justify-start">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/90 shrink-0">
                  <Layers size={24} />
                </div>
                <div>
                  <span className="text-xs sm:text-[13px] font-mono uppercase tracking-wider text-neutral-400 font-medium block">
                    Partnering with
                  </span>
                  <span className="text-xl sm:text-2xl font-bold font-['Space_Grotesk',sans-serif] text-white block mt-0.5">
                    Creative Agencies
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 4. Prominent Centered Contact Area with Gentle Entrance Reveal */}
        <ScrollReveal delay={90} distance={18} className="text-center my-10 sm:my-14">
          <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.14em] text-neutral-400 font-medium block mb-3">
            Have a project in mind?
          </span>
          <a
            href="mailto:info@nexsiteau.com"
            className="group inline-flex items-center justify-center gap-3 text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-semibold font-['Space_Grotesk',sans-serif] text-white hover:text-[#1A5CFF] transition-colors break-all sm:break-normal"
          >
            <span>info@nexsiteau.com</span>
            <ArrowUpRight
              size={30}
              className="shrink-0 text-neutral-400 group-hover:text-[#1A5CFF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
            />
          </a>
        </ScrollReveal>

        {/* 5. Clean Bottom Legal Bar & Secondary Links */}
        <div className="pt-8 mt-12 sm:mt-16 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-[13px] text-neutral-400 font-['Inter',sans-serif]">
          {/* Copyright */}
          <div>
            © 2026 NexSite. All rights reserved. Australian Web Design &amp; Development.
          </div>

          {/* Legal Links & Secondary Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-neutral-600" aria-hidden="true">·</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span className="text-neutral-600" aria-hidden="true">·</span>
            <button
              onClick={() => onNavigate('/website-design')}
              className="hover:text-white text-neutral-300 transition-colors cursor-pointer font-medium"
            >
              Website Design
            </button>
            <span className="text-neutral-600" aria-hidden="true">·</span>
            <button
              onClick={() => onNavigate('/packages')}
              className="hover:text-white text-neutral-300 transition-colors cursor-pointer font-medium"
            >
              Packages
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
