/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — Global Header (Exact Original NexSite Implementation)
 */

import React, { useState, useEffect } from 'react';
import { NexSiteLogo } from './NexSiteLogo';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface GlobalHeaderProps {
  currentView: 'home' | 'packages' | 'services' | 'work' | 'contact' | 'landing';
  onNavigate: (view: 'home' | 'packages' | 'services' | 'work' | 'contact' | 'landing', sectionId?: string) => void;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  currentView: _currentView,
  onNavigate,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    view: 'home' | 'packages' | 'services' | 'work' | 'contact' | 'landing',
    sectionId?: string
  ) => {
    setIsMenuOpen(false);
    onNavigate(view, sectionId);
  };

  const navItems = [
    { label: 'Home', view: 'home' as const, id: undefined },
    { label: 'Website Design', view: 'landing' as const, id: undefined },
    { label: 'Services & Capabilities', view: 'services' as const, id: 'services' },
    { label: 'How We Work', view: 'home' as const, id: 'how-we-work' },
    { label: 'Case Studies', view: 'work' as const, id: 'case-studies' },
    { label: 'Platform Process', view: 'home' as const, id: 'platform' },
    { label: 'Client Testimonials', view: 'home' as const, id: 'testimonials' },
    { label: 'Packages & Scoping', view: 'packages' as const, id: undefined },
    { label: 'Contact & Advisory', view: 'contact' as const, id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#06080F]/20 backdrop-blur-xl border-b border-white/[0.05]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="relative z-10 h-full max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none transition-transform hover:opacity-90 active:scale-95"
            aria-label="NexSite Home"
          >
            <NexSiteLogo size="md" themeVariant="dark" />
          </button>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => handleNav('packages')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A5CFF] hover:bg-[#0B4AE8] text-white text-sm font-medium transition-all duration-200 active:scale-95 cursor-pointer shadow-sm"
            >
              <span>Choose a Package &amp; Start</span>
              <ArrowUpRight size={15} />
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 flex items-center justify-center text-white transition-colors active:scale-90 cursor-pointer focus:outline-none"
              aria-label={isMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
              aria-expanded={isMenuOpen}
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                <Menu
                  size={20}
                  className={`absolute inset-0 transition-all duration-200 ease-in-out transform ${
                    isMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                  }`}
                />
                <X
                  size={20}
                  className={`absolute inset-0 transition-all duration-200 ease-in-out transform ${
                    isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Menu Drawer */}
      <div
        className={`fixed inset-x-0 top-20 bottom-0 z-40 bg-[#F8F8F6] backdrop-blur-3xl transition-all duration-350 ease-out overflow-y-auto ${
          isMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto visible'
            : 'opacity-0 -translate-y-4 pointer-events-none invisible'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-12 flex flex-col justify-between min-h-[calc(100vh-80px)]">
          <nav className="flex flex-col space-y-4 sm:space-y-6">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNav(item.view, item.id)}
                className={`flex items-center justify-between py-3 border-b border-[#E8E8E5] text-left group cursor-pointer transition-all duration-400 ease-out transform ${
                  isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${Math.min(index * 35 + 50, 350)}ms` : '0ms',
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
            style={{ transitionDelay: isMenuOpen ? '320ms' : '0ms' }}
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
