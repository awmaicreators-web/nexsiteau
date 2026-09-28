/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — The NexSite Standard // Production Rigor
 * Section rhythm: Cream Canvas (#F8F8F6).
 * Restrained cards, clean typography, disciplined engineering standards.
 */

import React from 'react';

export const ProductionRigor: React.FC = () => {
  const cards = [
    {
      title: 'Precision Typography & Grid',
      desc: 'Built on systematic proportional scales with disciplined whitespace rhythm and responsive layout precision across all viewports.',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      badge: 'SWISS DISCIPLINE',
    },
    {
      title: 'Clean Code & Zero Bloat',
      desc: 'Pure modern frameworks with sub-second page loads, headless architectures, and complete developer documentation for your internal team.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      badge: 'TYPESCRIPT & REACT',
    },
    {
      title: 'Direct Senior Pod Access',
      desc: 'Work directly with the senior engineers and designers executing your build—never junior account manager middlemen.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      badge: 'DIRECT SENIOR POD',
    },
  ];

  return (
    <section className="w-full py-24 lg:py-28 bg-[#F8F8F6] text-[#1A1C1C] transition-colors border-t border-[#E8E8E5]">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <span className="font-['JetBrains_Mono',monospace] text-[11px] leading-[16px] font-semibold text-[#1A5CFF] uppercase tracking-[0.08em] block mb-3">
            THE NEXSITE STANDARD
          </span>
          <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl lg:text-[48px] lg:leading-[56px] font-bold tracking-tight mb-3 text-[#1A1C1C]">
            Production Rigor In Every Single Build
          </h2>
          <p className="font-['Inter',sans-serif] text-base text-[#444748] leading-relaxed">
            No bloated page builders, generic marketplace templates, or offshore communication lag.
          </p>
        </div>

        {/* 3-Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden border border-[#E8E8E5] bg-white transition-all duration-300 group hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-48 sm:h-56 overflow-hidden bg-[#EEEEEE]">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-black/85 text-white border border-white/10">
                    {card.badge}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-xl font-bold font-['Space_Grotesk',sans-serif] text-[#1A1C1C] mb-3 group-hover:text-[#1A5CFF] transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm font-['Inter',sans-serif] text-[#8E8E8A] leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
