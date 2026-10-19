/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — 05 // Testimonials (Uniform, Same-Height Cards)
 * Features:
 * - 4 perfectly aligned cards with identical uniform height across the grid.
 * - Same baseline and top alignment (no staggered offset).
 * - Flex-stretch layout ensuring quote space is balanced and author meta is strictly aligned.
 * - Restrained initials avatar treatment and crisp, authentic feedback.
 */

import React from 'react';
import { TESTIMONIALS } from '../data/agencyData';
import { SectionHeader } from './SectionHeader';
import { Quote } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollReveal';

export const Testimonials: React.FC = () => {
  return (
    <section
      id="testimonials"
      className="w-full py-20 lg:py-24 bg-white text-[#1A1C1C] transition-colors border-t border-[#E8E8E5]"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <SectionHeader
          label="05 // TESTIMONIALS"
          title="Clients share their experience"
          description="Every build is a partnership. Here is feedback from agency directors and founders who collaborate with our engineering team."
        />

        {/* 4 Cards Grid: Uniform Same-Height Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2 pb-6 items-stretch">
          {TESTIMONIALS.map((t, idx) => {
            return (
              <ScrollReveal
                key={idx}
                delay={idx * 70}
                distance={20}
                className="h-full flex flex-col"
              >
                <div className="h-full rounded-2xl sm:rounded-3xl bg-[#F8F8F6] border border-[#E8E8E5] p-6 sm:p-7 flex flex-col justify-between hover:border-[#1A5CFF]/40 hover:bg-white hover:shadow-xs transition-all duration-200">
                  {/* Quotation Body */}
                  <div className="flex-1 flex flex-col justify-start">
                    <div className="mb-4 text-[#1A5CFF]/40">
                      <Quote size={20} className="rotate-180" />
                    </div>

                    <blockquote className="text-[14px] sm:text-[15px] font-['Inter',sans-serif] text-neutral-800 leading-relaxed mb-6">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                  </div>

                  {/* Author Meta (Aligned across all cards) */}
                  <div className="pt-4 border-t border-[#E8E8E5] flex items-center gap-3 shrink-0">
                    <div className="w-9 h-9 rounded-full bg-[#EBF2FF] text-[#1A5CFF] font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-[#1A5CFF]/20">
                      {t.initials || t.author.charAt(0)}
                    </div>
                    <div className="truncate">
                      <h4 className="text-xs sm:text-sm font-bold text-[#1A1C1C] font-['Space_Grotesk'] truncate">
                        {t.author}
                      </h4>
                      <p className="text-[11px] text-neutral-500 font-mono truncate">
                        {t.role} &mdash; {t.company}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
