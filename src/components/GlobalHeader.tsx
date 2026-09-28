/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — Global Header (Exact Home Header Master)
 * As specified in Master Instruction:
 * - Fixed, 80px height, Top: 0, Left: 0, Right: 0, Z-index: 50
 * - Background: Solid/subtle translucent black (#000000) with subtle bottom border
 * - Inner max width: 1320px, margins: 20px mobile / 32px tablet / 48px desktop
 * - Left: NexSite logo image 32px + "Nexsite" wordmark 24px, weight 300, white, gap 8px
 * - Center: Intentionally empty (no conventional desktop nav links across header)
 * - Right:
 *    1. CTA "Choose a Package & Start" (px-6 py-2.5, bg #2563EB, hover #1A5CFF, rounded-lg, text-sm font-semibold text-white)
 *    2. Menu button (44px x 44px, rounded-lg, bg-white/10 hover:bg-white/20, border border-white/15, 20px white icon, active:scale-95)
 * - Mobile Menu: Top 80px, background #F8F8F6 with subtle border, 24px dark text links with electric blue hover and arrow.
 */

import React, { useState, useEffect } from 'react';
import { NexSiteLogo } from './NexSiteLogo';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface GlobalHeaderProps {
  currentView: 'home' | 'packages' | 'services' | 'work' | 'contact';
  onNavigate: (view: 'home' | 'packages' | 'services' | 'work' | 'contact', sectionId?: string) => void;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  currentView,
  onNavigate,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll for dynamic glassmorphic depth
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scrolling when mobile drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const handleNav = (
    view: 'home' | 'packages' | 'services' | 'work' | 'contact',
    sectionId?: string
  ) => {
    setIsMenuOpen(false);
    onNavigate(view, sectionId);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 border-none ${
          isScrolled
            ? 'bg-black/55 backdrop-blur-2xl backdrop-saturate-[180%] backdrop-contrast-[105%] shadow-[0_12px_36px_rgba(0,0,0,0.45)]'
            : 'bg-black/30 backdrop-blur-2xl backdrop-saturate-[160%] shadow-[0_8px_30px_rgba(0,0,0,0.25)]'
        }`}
        style={{ borderStyle: 'none', borderWidth: 0 }}
      >
        <div
          className="relative z-10 h-full max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between"
          style={{ borderStyle: 'none' }}
        >
          {/* Left: NexSite Logo & Wordmark */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none transition-transform hover:scale-[1.02] active:scale-95"
            aria-label="NexSite Home"
          >
            <NexSiteLogo size="md" themeVariant="dark" />
          </button>

          {/* Right Action Group */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Header CTA: "Choose a Package & Start" — Enhanced glass jewel sheen */}
            <button
              onClick={() => handleNav('packages')}
              className="btn-shimmer hidden sm:inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1A5CFF] hover:brightness-110 text-white text-sm font-semibold transition-all duration-200 active:scale-95 cursor-pointer shadow-[0_4px_24px_rgba(37,99,235,0.45),inset_0_1px_1px_rgba(255,255,255,0.35)] border border-blue-400/35"
            >
              <span>Choose a Package &amp; Start</span>
              <ArrowUpRight size={15} />
            </button>

            {/* Menu Trigger Button: Ultra-clear Frosted Glass Tile with smooth animated icon */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/[0.08] hover:bg-white/[0.18] border border-white/10 backdrop-blur-xl flex items-center justify-center text-white transition-all duration-300 active:scale-90 cursor-pointer focus:outline-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_16px_rgba(0,0,0,0.25)]"
              aria-label={isMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
              aria-expanded={isMenuOpen}
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                <Menu
                  size={20}
                  className={`absolute inset-0 transition-all duration-300 ease-in-out transform ${
                    isMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                  }`}
                />
                <X
                  size={20}
                  className={`absolute inset-0 transition-all duration-300 ease-in-out transform ${
                    isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / Full Nav Drawer: Top 80px, Background #F8F8F6 with Smooth Sliding Curtain */}
      <div
        className={`fixed inset-x-0 top-20 bottom-0 z-40 bg-[#F8F8F6] backdrop-blur-3xl transition-all duration-350 ease-out overflow-y-auto ${
          isMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto visible'
            : 'opacity-0 -translate-y-4 pointer-events-none invisible'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-12 flex flex-col justify-between min-h-[calc(100vh-80px)]">
          <nav className="flex flex-col space-y-4 sm:space-y-6">
            {[
              { label: 'Home', view: 'home' as const, id: undefined },
              { label: 'Services & Capabilities', view: 'services' as const, id: 'services' },
              { label: 'How We Work', view: 'home' as const, id: 'how-we-work' },
              { label: 'Case Studies', view: 'work' as const, id: 'case-studies' },
              { label: 'Platform Process', view: 'home' as const, id: 'platform' },
              { label: 'Client Testimonials', view: 'home' as const, id: 'testimonials' },
              { label: 'Packages & Scoping', view: 'packages' as const, id: undefined },
              { label: 'Contact & Advisory', view: 'contact' as const, id: 'contact' },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNav(item.view, item.id)}
                className={`flex items-center justify-between py-3 border-b border-[#E8E8E5] text-left group cursor-pointer transition-all duration-400 ease-out transform ${
                  isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${Math.min(idx * 35 + 50, 350)}ms` : '0ms',
                }}
              >
                <span className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl font-bold text-[#1A1C1C] group-hover:text-[#1A5CFF] group-hover:translate-x-1 transition-all duration-200">
                  {item.label}
                </span>
                <ArrowUpRight
                  size={20}
                  className="text-[#8E8E8A] group-hover:text-[#1A5CFF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200"
                />
              </button>
            ))}
          </nav>

          <div
            className={`pt-10 border-t border-[#E8E8E5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-500 ease-out transform ${
              isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: isMenuOpen ? '320ms' : '0ms',
            }}
          >
            <div>
              <span className="text-xs font-mono text-[#8E8E8A] uppercase block">
                DIRECT CLIENT &amp; AGENCY INTAKE
              </span>
              <a
                href="mailto:info@nexsiteau.com"
                className="text-base font-bold text-[#1A1C1C] hover:text-[#1A5CFF] transition-colors"
              >
                info@nexsiteau.com
              </a>
            </div>

            <button
              onClick={() => handleNav('packages')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#2563EB] hover:bg-[#1A5CFF] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer shadow-md"
            >
              <span>Select Architecture Package</span>
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
