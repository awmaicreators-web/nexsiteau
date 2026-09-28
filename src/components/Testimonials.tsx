/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — 05 // Testimonials
 * Section rhythm: Cream Canvas (#F8F8F6).
 * Clean cards, subtle star rating (NO bright orange/amber), restrained typography.
 */

import React from 'react';
import { TESTIMONIALS } from '../data/agencyData';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="w-full py-24 lg:py-28 bg-[#F8F8F6] text-[#1A1C1C] transition-colors border-t border-[#E8E8E5]">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 lg:mb-20">
          <span className="font-['JetBrains_Mono',monospace] text-[11px] leading-[16px] font-semibold text-[#1A5CFF] uppercase tracking-[0.08em] block mb-3">
            05 // TESTIMONIALS
          </span>
          <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl lg:text-[48px] lg:leading-[56px] font-bold tracking-tight text-[#1A1C1C] mb-4">
            Clients share their experience
          </h2>
          <p className="font-['Inter',sans-serif] text-base lg:text-[18px] lg:leading-[28px] text-[#444748]">
            Every project is a partnership, and the feedback we receive guides how we grow. Here’s
            what some of our collaborators had to say about working together.
          </p>
        </div>

        {/* 4-Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-10 rounded-2xl bg-white border border-[#E8E8E5] transition-all duration-200 flex flex-col justify-between hover:border-[#1A5CFF]/40 hover:shadow-sm"
            >
              <div className="mb-6">
                {/* 5-Stars in Electric Blue (Clean, restrained — NO orange/amber) */}
                <div className="flex text-[#1A5CFF] mb-5 gap-1" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, sIdx) => (
                    <Star key={sIdx} size={16} className="fill-[#1A5CFF] text-[#1A5CFF]" />
                  ))}
                </div>

                <blockquote className="text-base sm:text-lg font-['Inter',sans-serif] text-[#1A1C1C] leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>

              <div className="pt-6 border-t border-[#E8E8E5] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EEEEEE] text-[#1A1C1C] font-bold font-mono text-sm flex items-center justify-center border border-[#E8E8E5]">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1A1C1C] font-['Inter',sans-serif]">
                    {t.author}
                  </h4>
                  <p className="text-xs text-[#8E8E8A] font-mono">
                    {t.role} — {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
