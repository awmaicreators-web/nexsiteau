/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — Interactive Process Ticker & Workflow
 * Section rhythm: Cream Canvas (#F8F8F6) process matrix + Black (#000000) marquee.
 * Strictly complies with Master Instruction:
 * - 28-second linear infinite animation, pause on hover.
 * - STATIC blue/grey separators (NO animate-pulse on dots).
 * - Restrained typography: Space Grotesk & Inter.
 */

import React from 'react';
import { ScrollReveal } from '../hooks/useScrollReveal';

export const InteractiveProcessTicker: React.FC = () => {
  const tickerItems = [
    'VISUALIZE',
    'CREATE',
    'DESIGN',
    'DEVELOP',
    'LAUNCH',
    'EVOLVE',
  ];

  return (
    <section className="w-full py-16 lg:py-24 bg-[#F8F8F6] text-[#1A1C1C] transition-colors border-t border-[#E8E8E5]">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 mb-12">
        <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#E8E8E5] shadow-sm">
          {/* Introductory Partnership Lead (Moved from Hero) */}
          <ScrollReveal delay={0} distance={16} className="max-w-3xl mb-8 pb-7 border-b border-[#E8E8E5]">
            <span className="font-['JetBrains_Mono',monospace] text-[11px] leading-[16px] font-semibold text-[#1A5CFF] uppercase tracking-[0.08em] block mb-2">
              HOW WE DELIVER
            </span>
            <p className="font-['Inter',sans-serif] text-base sm:text-[17px] text-[#444748] leading-relaxed">
              We partner with design studios and agencies to handle development behind the scenes, ensuring projects are delivered on time and to a high standard.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Step 01 */}
            <ScrollReveal delay={0} distance={20} className="flex flex-col group cursor-default">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-lg bg-[#EBF1FF] text-[#1A5CFF] flex items-center justify-center font-mono text-xs font-bold">
                  1
                </span>
                <span className="font-mono text-xs text-[#1A5CFF] uppercase font-bold tracking-wider">
                  Step 01
                </span>
              </div>
              <h4 className="text-lg font-bold text-[#1A1C1C] mb-2 font-['Inter',sans-serif]">
                Discovery Call
              </h4>
              <p className="text-sm text-[#8E8E8A] leading-relaxed">
                We dive into your goals, audience, and vision to establish clear architectural direction.
              </p>
            </ScrollReveal>

            {/* Step 02 */}
            <ScrollReveal delay={80} distance={20} className="flex flex-col group cursor-default">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-lg bg-[#EEEEEE] text-[#444748] flex items-center justify-center font-mono text-xs font-bold group-hover:bg-[#1A5CFF] group-hover:text-white transition-colors">
                  2
                </span>
                <span className="font-mono text-xs text-[#8E8E8A] uppercase font-bold tracking-wider group-hover:text-[#1A5CFF] transition-colors">
                  Step 02
                </span>
              </div>
              <h4 className="text-lg font-bold text-[#1A1C1C] mb-2 font-['Inter',sans-serif]">
                Strategy &amp; Planning
              </h4>
              <p className="text-sm text-[#8E8E8A] leading-relaxed">
                Mapping out the user journey, wireframes, and tech stack for seamless execution.
              </p>
            </ScrollReveal>

            {/* Step 03 */}
            <ScrollReveal delay={160} distance={20} className="flex flex-col group cursor-default">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-lg bg-[#EEEEEE] text-[#444748] flex items-center justify-center font-mono text-xs font-bold group-hover:bg-[#1A5CFF] group-hover:text-white transition-colors">
                  3
                </span>
                <span className="font-mono text-xs text-[#8E8E8A] uppercase font-bold tracking-wider group-hover:text-[#1A5CFF] transition-colors">
                  Step 03
                </span>
              </div>
              <h4 className="text-lg font-bold text-[#1A1C1C] mb-2 font-['Inter',sans-serif]">
                Design &amp; Development
              </h4>
              <p className="text-sm text-[#8E8E8A] leading-relaxed">
                Crafting high-converting UI and building clean, scalable code that performs reliably.
              </p>
            </ScrollReveal>

            {/* Step 04 */}
            <ScrollReveal delay={240} distance={20} className="flex flex-col group cursor-default">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-lg bg-[#EEEEEE] text-[#444748] flex items-center justify-center font-mono text-xs font-bold group-hover:bg-[#1A5CFF] group-hover:text-white transition-colors">
                  4
                </span>
                <span className="font-mono text-xs text-[#8E8E8A] uppercase font-bold tracking-wider group-hover:text-[#1A5CFF] transition-colors">
                  Step 04
                </span>
              </div>
              <h4 className="text-lg font-bold text-[#1A1C1C] mb-2 font-['Inter',sans-serif]">
                Launch &amp; Scale
              </h4>
              <p className="text-sm text-[#8E8E8A] leading-relaxed">
                Thorough testing, smooth deployment, and ongoing optimization to drive partner growth.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Linear Infinite Marquee Ticker */}
      <div className="w-full bg-[#000000] text-white py-5 overflow-hidden select-none border-y border-[#1A1C1C]">
        <div className="animate-marquee">
          {/* Half 1 */}
          <div className="flex items-center shrink-0">
            {tickerItems.concat(tickerItems).map((item, idx) => (
              <span
                key={`a-${idx}`}
                className="font-bold text-lg tracking-widest flex items-center gap-8 text-[#E2E2E2] hover:text-white transition-colors cursor-default pr-8"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <span>{item}</span>
                <span
                  className="w-2 h-2 rounded-full bg-[#1A5CFF] inline-block opacity-80"
                  aria-hidden="true"
                />
              </span>
            ))}
          </div>

          {/* Half 2 (seamless clone for -50% loop) */}
          <div className="flex items-center shrink-0" aria-hidden="true">
            {tickerItems.concat(tickerItems).map((item, idx) => (
              <span
                key={`b-${idx}`}
                className="font-bold text-lg tracking-widest flex items-center gap-8 text-[#E2E2E2] hover:text-white transition-colors cursor-default pr-8"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <span>{item}</span>
                <span
                  className="w-2 h-2 rounded-full bg-[#1A5CFF] inline-block opacity-80"
                  aria-hidden="true"
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
