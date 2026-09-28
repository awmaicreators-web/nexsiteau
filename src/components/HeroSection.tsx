/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — Hero Section
 * Background: Black (#000000).
 * Large crescent visual, restrained subtle blue glow, centered typography,
 * source-approved CTAs, zero blinking dots, zero AI slop.
 */

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import heroMoonBg from '../assets/hero-bg-hd.jpg';

interface HeroSectionProps {
  onStartClick: () => void;
  onExploreWorkClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartClick,
  onExploreWorkClick,
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#000000] pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24 flex flex-col justify-center items-center text-center selection:bg-[#2563EB] selection:text-white min-h-[520px] lg:min-h-[580px]">
      {/* Background Image Container — Responsive & Positioned Down for Visibility */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 flex justify-center items-start">
        {/* Subtle electric blue atmospheric glow behind moon crest */}
        <div className="absolute w-[440px] sm:w-[680px] md:w-[880px] lg:w-[1100px] h-[220px] sm:h-[300px] md:h-[360px] bg-[#1A5CFF]/25 blur-[90px] sm:blur-[130px] rounded-full top-20 sm:top-24 md:top-28 lg:top-32 left-1/2 -translate-x-1/2 pointer-events-none" />

        {/* High-Definition 100% Watermark-Free Moon Crescent — Positioned down to be clearly visible */}
        <img
          src={heroMoonBg}
          alt="Celestial Crescent Moon"
          className="absolute left-1/2 -translate-x-1/2 top-14 sm:top-18 md:top-22 lg:top-24 w-[540px] sm:w-[760px] md:w-[980px] lg:w-[1200px] xl:w-[1360px] max-w-none h-auto object-contain opacity-95 mix-blend-screen filter contrast-[1.15] brightness-[1.08] pointer-events-none"
          loading="eager"
        />

        {/* Seamless bottom fade into pure black background */}
        <div className="absolute inset-x-0 bottom-0 h-44 sm:h-56 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent pointer-events-none" />
      </div>

      {/* Subtle Architectural Grid Lines Overlay */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-[1] opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, #000 30%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, #000 30%, transparent 85%)',
        }}
      />

      {/* Hero Content Stage */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col items-center justify-center my-auto">
        {/* Headline — strictly 3 lines on desktop, never exceeding 3 lines */}
        <h1 className="text-white font-['Space_Grotesk',sans-serif] font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[56px] lg:leading-[1.18] tracking-tight max-w-[1100px] mx-auto mb-6 sm:mb-8 text-center drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)]">
          <span className="lg:block">Helping agencies scale through</span>{' '}
          <span className="lg:block">reliable web development, UI/UX,</span>{' '}
          <span className="lg:block">and seamless execution</span>
        </h1>

        {/* Sub-description */}
        <p className="text-neutral-300 font-['Inter',sans-serif] text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-normal drop-shadow-[0_1px_10px_rgba(0,0,0,0.8)]">
          We partner with design studios and agencies to handle development behind the scenes,
          ensuring projects are delivered on time and to a high standard.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onStartClick}
            className="btn-shimmer inline-flex items-center gap-3 px-8 py-3.5 bg-[#2563EB] hover:bg-[#1A5CFF] text-white rounded-full font-semibold text-sm transition-all duration-200 active:scale-95 group cursor-pointer shadow-lg shadow-blue-900/30"
          >
            <span>Let&apos;s get started</span>
            <span className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight size={15} className="stroke-[2.5]" />
            </span>
          </button>
          <button
            onClick={onExploreWorkClick}
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#111111]/85 hover:bg-white/10 text-white border border-white/20 font-medium text-sm transition-all duration-200 active:scale-95 cursor-pointer backdrop-blur-sm"
          >
            <span>See how we work</span>
          </button>
        </div>
      </div>
    </section>
  );
};
