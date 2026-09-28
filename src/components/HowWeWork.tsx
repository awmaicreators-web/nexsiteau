/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — 01 // How We Work
 * Section rhythm: Light Surface (#F9F9F9).
 * Preserves 4 cards: Dedicated Communication, Fast Turnaround, Scalable Support, White-Label Ready.
 * White background, #E8E8E5 subtle border, 16px radius, 48px padding, restrained hover lift.
 */

import React from 'react';
import { HOW_WE_WORK_STEPS } from '../data/agencyData';
import { MessageSquare, Zap, Layers, EyeOff, ArrowRight } from 'lucide-react';

interface HowWeWorkProps {
  onExplorePackages?: () => void;
}

export const HowWeWork: React.FC<HowWeWorkProps> = ({ onExplorePackages }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'forum':
        return <MessageSquare size={20} />;
      case 'bolt':
        return <Zap size={20} />;
      case 'dataset':
        return <Layers size={20} />;
      case 'visibility_off':
        return <EyeOff size={20} />;
      default:
        return <Zap size={20} />;
    }
  };

  return (
    <section
      id="how-we-work"
      className="w-full py-24 lg:py-28 bg-[#F9F9F9] text-[#1A1C1C] transition-colors"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header: Two-Sided Desktop Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 lg:mb-24">
          <div className="max-w-2xl">
            <span className="font-['JetBrains_Mono',monospace] text-[11px] leading-[16px] font-semibold text-[#1A5CFF] uppercase tracking-[0.08em] block mb-3">
              01 // HOW WE WORK
            </span>
            <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl lg:text-[48px] lg:leading-[56px] font-bold tracking-tight text-[#1A1C1C] mb-4">
              Built to support how agencies actually work
            </h2>
            <p className="font-['Inter',sans-serif] text-base lg:text-[18px] lg:leading-[28px] text-[#444748]">
              We partner with agencies and modern companies to handle development behind the scenes,
              ensuring projects are delivered on time and to a high standard. As your workload grows,
              our team scales with you, allowing you to focus on client relationships and business growth.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-['JetBrains_Mono',monospace] font-medium bg-[#EEEEEE] border border-[#E8E8E5] text-[#444748]">
              Zero Management Overhead
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-['JetBrains_Mono',monospace] font-medium bg-[#EBF1FF] border border-[#1A5CFF]/30 text-[#1A5CFF]">
              Guaranteed Sprint Timelines
            </span>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_WE_WORK_STEPS.map((step) => (
            <div
              key={step.number}
              onClick={onExplorePackages}
              className="p-8 sm:p-10 rounded-2xl bg-white border border-[#E8E8E5] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 hover:border-[#1A5CFF]/50 hover:shadow-lg cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-bold font-['Space_Grotesk',sans-serif] text-[#E8E8E8] group-hover:text-[#1A5CFF] transition-colors">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#F4F4F1] text-[#1A1C1C] flex items-center justify-center transition-all duration-300 group-hover:bg-[#1A5CFF] group-hover:text-white group-hover:rotate-6">
                    {getIcon(step.icon)}
                  </div>
                </div>

                <h3 className="text-xl font-bold font-['Inter',sans-serif] text-[#1A1C1C] mb-3 group-hover:text-[#1A5CFF] transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm font-['Inter',sans-serif] text-[#8E8E8A] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E8E8E5] flex items-center justify-between">
                <span className="text-xs font-['JetBrains_Mono',monospace] text-[#8E8E8A] uppercase tracking-wider">
                  NexSite Standard
                </span>
                <ArrowRight
                  size={14}
                  className="text-[#1A5CFF] transform group-hover:translate-x-1 transition-transform"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
