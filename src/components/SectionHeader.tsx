/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — Unified Section Header System
 * Reference: Comettech section markers (subtle pill, electric blue dot, restrained label).
 * Standardized typography scale:
 * - Eyebrow: 11px JetBrains Mono with 8px blue accent dot.
 * - Title: 28-34px mobile, 40-48px desktop (Space Grotesk, 700 weight).
 * - Description: 16-18px Inter, 1.65 line-height.
 */

import React from 'react';
import { ScrollReveal } from '../hooks/useScrollReveal';

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  className?: string;
  showDot?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  description,
  align = 'center',
  className = '',
  showDot = true,
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 sm:mb-16 lg:mb-20 ${isCenter ? 'max-w-3xl mx-auto text-center' : 'max-w-2xl text-left'} ${className}`}>
      {/* Section Marker Badge */}
      <ScrollReveal delay={0} distance={10}>
        <div className={`inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white border border-[#E8E8E5] shadow-xs mb-4 ${isCenter ? 'mx-auto' : ''}`}>
          {showDot && (
            <span className="w-2 h-2 rounded-full bg-[#1A5CFF] shrink-0" aria-hidden="true" />
          )}
          <span className="font-['JetBrains_Mono',monospace] text-[11px] font-semibold text-[#1A1C1C] uppercase tracking-[0.1em]">
            {label}
          </span>
        </div>
      </ScrollReveal>

      {/* Section Title */}
      <ScrollReveal delay={80} distance={20}>
        <h2 className="font-['Space_Grotesk',sans-serif] text-[28px] sm:text-[36px] lg:text-[46px] lg:leading-[1.16] font-bold tracking-tight text-[#1A1C1C] mb-4">
          {title}
        </h2>
      </ScrollReveal>

      {/* Supporting Text */}
      {description && (
        <ScrollReveal delay={160} distance={16}>
          <p className="font-['Inter',sans-serif] text-[16px] sm:text-[17px] lg:text-[18px] text-[#555859] leading-[1.65] max-w-2xl mx-auto">
            {description}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
};
