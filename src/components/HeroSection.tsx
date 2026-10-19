/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — Refined Homepage Hero Section
 * Using user-uploaded hero background image (hero.jpg):
 * - Clean atmospheric space composition with natural planet curvature.
 * - Refined medium (500) headline typography, widened 1100px container, and balanced 3-line desktop wrap.
 * - Side-by-side 52px buttons with 15-16px labels, comfortable padding, and 16px gap.
 * - Crisp text legibility with balanced spacing and clean section transition.
 */

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import heroBg from '../assets/hero.jpg';
import { useHeroParallax } from '../hooks/useScrollReveal';

interface HeroSectionProps {
  onStartClick: () => void;
  onExploreWorkClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartClick,
  onExploreWorkClick,
}) => {
  // Desktop-only subtle scroll-linked parallax (0–28px), disabled on mobile & reduced-motion
  const bgOffset = useHeroParallax(28);

  return (
    <section className="relative w-full overflow-hidden bg-[#000000] pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 flex flex-col justify-center items-center text-center selection:bg-[#1A5CFF] selection:text-white min-h-[580px] lg:min-h-[640px]">
      {/* Background Hero Layer using uploaded hero.jpg with subtle desktop parallax */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0 bg-[#000000] bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          transform: `translate3d(0, ${bgOffset}px, 0)`,
          transition: 'transform 0.1s cubic-bezier(0, 0, 0.2, 1)',
        }}
      >
        {/* Soft bottom vignette overlay ensuring clean blend into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-24 sm:h-36 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Stage: Focused on Headline & CTA Row */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col items-center justify-center my-auto">
        {/* Refined Headline Typography:
            Genuine medium (500) font weight, widened 1100px container,
            balanced 3-line desktop wrap with comfortable 1.14 line-height,
            and natural mobile wrapping */}
        <h1 className="text-white font-['Space_Grotesk',sans-serif] font-medium text-[34px] sm:text-[44px] md:text-[52px] lg:text-[58px] xl:text-[62px] leading-[1.14] tracking-[-0.015em] max-w-[1100px] mx-auto mb-8 sm:mb-9 lg:mb-10 text-center drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
          <span className="block sm:inline lg:block">Helping agencies scale through</span>{' '}
          <span className="block sm:inline lg:block">reliable web development, UI/UX,</span>{' '}
          <span className="block sm:inline lg:block">and seamless execution</span>
        </h1>

        {/* Action Buttons:
            Strictly side-by-side horizontal row on desktop with 16px gap,
            52px height, 15-16px readable labels, and clear proportioned arrow */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          {/* Primary Action Button */}
          <button
            onClick={onStartClick}
            className="inline-flex items-center justify-center gap-3 px-8 h-[52px] bg-[#1A5CFF] hover:bg-[#0B4AE8] text-white rounded-full font-medium text-[15px] sm:text-base transition-all duration-200 active:scale-95 cursor-pointer shadow-md w-full sm:w-auto"
          >
            <span>Let&apos;s get started</span>
            <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0">
              <ArrowUpRight size={16} className="stroke-[2.5]" />
            </span>
          </button>

          {/* Secondary Action Button */}
          <button
            onClick={onExploreWorkClick}
            className="inline-flex items-center justify-center px-8 h-[52px] rounded-full bg-white/[0.06] hover:bg-white/[0.14] text-white border border-white/20 font-medium text-[15px] sm:text-base transition-all duration-200 active:scale-95 cursor-pointer backdrop-blur-sm w-full sm:w-auto"
          >
            <span>See how we work</span>
          </button>
        </div>
      </div>
    </section>
  );
};
