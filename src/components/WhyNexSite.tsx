/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — Why NexSite (Consolidated Benefits Section)
 * Replaces redundant repetition with one clear, high-impact benefits section:
 * - Clear differentiators for Australian businesses & agency partners.
 * - Readable contrast, purposeful whitespace, zero AI clutter.
 */

import React from 'react';
import { Clock, ShieldCheck, Code, MessageSquare, ArrowRight } from 'lucide-react';

interface WhyNexSiteProps {
  onStartEnquiry?: () => void;
}

export const WhyNexSite: React.FC<WhyNexSiteProps> = ({ onStartEnquiry }) => {
  const benefits = [
    {
      num: '01',
      title: 'Australian Timezone & Local Support',
      icon: <Clock size={22} className="text-[#1A5CFF]" />,
      description:
        'Communicate directly with our team during Australian business hours (AEST/AEDT). No waiting 24 hours for basic email replies or dealing with offshore communication friction.',
    },
    {
      num: '02',
      title: 'Guaranteed Sprint Delivery',
      icon: <ShieldCheck size={22} className="text-[#1A5CFF]" />,
      description:
        'Every project runs on fixed, transparent milestone schedules. We hold ourselves contractually accountable to launch dates so your business launch stays on track.',
    },
    {
      num: '03',
      title: '100% Code & Asset Ownership',
      icon: <Code size={22} className="text-[#1A5CFF]" />,
      description:
        'Upon launch, you own all design files, source code, and assets outright. Zero proprietary vendor lock-in, recurring agency platform fees, or host captivity.',
    },
    {
      num: '04',
      title: 'Transparent, Direct Communication',
      icon: <MessageSquare size={22} className="text-[#1A5CFF]" />,
      description:
        'Speak directly with the developers building your site. Fast feedback loops, regular progress demonstrations, and clear answers to your technical questions.',
    },
  ];

  return (
    <section id="why-nexsite" className="w-full py-20 lg:py-28 bg-[#FFFFFF] text-[#1A1C1C] transition-colors border-t border-[#E8E8E5] scroll-mt-20">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 lg:mb-18">
          <div className="max-w-2xl">
            <span className="font-['JetBrains_Mono',monospace] text-[11px] leading-[16px] font-semibold text-[#1A5CFF] uppercase tracking-[0.08em] block mb-3">
              THE NEXSITE DIFFERENCE
            </span>
            <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl lg:text-[46px] lg:leading-[54px] font-bold tracking-tight text-[#1A1C1C] mb-4">
              Reliable web development without the friction
            </h2>
            <p className="font-['Inter',sans-serif] text-base lg:text-[17px] leading-[26px] text-[#444748]">
              We bridge the gap between expensive tier-one agencies and unpredictable freelancers,
              delivering production-grade websites with total transparency.
            </p>
          </div>

          <div>
            <button
              onClick={onStartEnquiry}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A1C1C] hover:bg-[#1A5CFF] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              <span>Discuss Your Project</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* 4 Core Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <div
              key={b.num}
              className="p-8 rounded-2xl bg-[#F8F8F6] border border-[#E8E8E5] flex flex-col justify-between hover:border-[#1A5CFF]/30 hover:bg-white transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-bold text-neutral-400">
                    {b.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E8E8E5] flex items-center justify-center">
                    {b.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold font-['Space_Grotesk',sans-serif] text-[#1A1C1C] mb-3">
                  {b.title}
                </h3>

                <p className="text-sm font-['Inter',sans-serif] text-[#555859] leading-relaxed">
                  {b.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E8E8E5] text-xs font-mono text-[#1A5CFF] font-medium">
                NexSite Standard
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
