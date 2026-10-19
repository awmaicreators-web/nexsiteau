/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — The NexSite Standard (Compact Quality Section)
 * Features:
 * - Spacious 3-column layout without repetitive badges or boxed jargon.
 * - 3 Quality Pillars: Precision Typography & Grid, Clean Code & Zero Bloat, Direct Senior Pod Access.
 * - High-clarity imagery with subtle hover responsiveness.
 * - Clean section marker and balanced typography.
 */

import React from 'react';
import { SectionHeader } from './SectionHeader';
import { ScrollReveal } from '../hooks/useScrollReveal';

export const ProductionRigor: React.FC = () => {
  const qualityPillars = [
    {
      title: 'Precision Typography & Grid',
      desc: 'Built on disciplined proportional scales with intentional whitespace and responsive layout precision across all screen sizes.',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      category: 'Design Discipline',
    },
    {
      title: 'Clean Code & Zero Bloat',
      desc: 'Lightweight modern frameworks that load in milliseconds, accompanied by clean structure and documentation your team can maintain.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      category: 'Engineering Rigor',
    },
    {
      title: 'Direct Technical Access',
      desc: 'Collaborate directly with the developers and designers executing your project, eliminating misunderstandings and delays.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      category: 'Seamless Workflow',
    },
  ];

  return (
    <section className="w-full py-20 lg:py-24 bg-[#F8F8F6] text-[#1A1C1C] transition-colors border-t border-[#E8E8E5]">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <SectionHeader
          label="THE NEXSITE STANDARD"
          title="Production rigor in every single build"
          description="We avoid bloated page builders, messy templates, and communication lag to deliver clean, maintainable digital products."
        />

        {/* Spacious 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {qualityPillars.map((pillar, idx) => (
            <ScrollReveal
              key={idx}
              delay={idx * 80}
              distance={20}
              className="h-full"
            >
              <div className="h-full rounded-[24px] overflow-hidden border border-[#E8E8E5] bg-white group hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                {/* Visual Image */}
                <div className="relative h-52 sm:h-56 overflow-hidden bg-[#EEEEEE]">
                  <ScrollReveal scale={true} duration={750} className="w-full h-full overflow-hidden">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  </ScrollReveal>
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-black/75 text-white backdrop-blur-xs">
                      {pillar.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-bold font-['Space_Grotesk',sans-serif] text-[#1A1C1C] mb-3 group-hover:text-[#1A5CFF] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed font-['Inter',sans-serif]">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
