/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — Packages & Checkout FAQs
 * Clean accordion with accessible keyboard support, Space Grotesk headings, and Inter body text.
 */

import React, { useState } from 'react';
import { FAQS } from '../data/agencyData';
import { ChevronDown, Calendar, ArrowRight } from 'lucide-react';

interface CheckoutFaqsProps {
  onScheduleCall?: () => void;
}

export const CheckoutFaqs: React.FC<CheckoutFaqsProps> = ({ onScheduleCall }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-20 lg:py-24 bg-[#FFFFFF] text-[#1A1C1C] transition-colors border-t border-[#E8E8E5]">
      <div className="max-w-[1000px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-['JetBrains_Mono',monospace] text-[11px] leading-[16px] font-semibold text-[#1A5CFF] uppercase tracking-[0.08em] block mb-3">
            FREQUENTLY ADDRESSED
          </span>
          <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-[#1A1C1C]">
            Packages &amp; Instant Checkout FAQs
          </h2>
          <p className="font-['Inter',sans-serif] text-sm sm:text-base text-[#444748] leading-relaxed">
            Clear answers about how we start, build, guarantee, and hand over your digital property.
          </p>
        </div>

        {/* FAQs list */}
        <div className="space-y-4 mb-14">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 ease-out overflow-hidden ${
                  isOpen
                    ? 'bg-[#F8F8F6] border-[#1A5CFF]/50 shadow-md ring-1 ring-[#1A5CFF]/10'
                    : 'bg-white border-[#E8E8E5] hover:border-[#D1D1CD] hover:shadow-xs'
                }`}
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <span className={`font-['Inter',sans-serif] font-bold text-base sm:text-lg transition-colors duration-200 ${
                    isOpen ? 'text-[#1A5CFF]' : 'text-[#1A1C1C] group-hover:text-black'
                  }`}>
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 ${
                      isOpen ? 'rotate-180 bg-[#1A5CFF] text-white shadow-sm' : 'rotate-0 bg-[#EEEEEE] text-[#1A1C1C] group-hover:bg-[#E2E2E0]'
                    }`}
                  >
                    <ChevronDown size={17} className="transition-transform duration-300" />
                  </div>
                </button>

                {/* Smooth CSS Grid accordion collapse / expand */}
                <div
                  className={`grid transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-2 text-sm sm:text-base font-['Inter',sans-serif] text-[#444748] leading-relaxed border-t border-[#E8E8E5]/70">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Help Callout */}
        {onScheduleCall && (
          <div className="p-8 rounded-2xl bg-[#F8F8F6] border border-[#E8E8E5] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h4 className="font-['Space_Grotesk',sans-serif] text-lg font-bold text-[#1A1C1C] mb-1">
                Have specific technical architecture questions?
              </h4>
              <p className="text-xs text-[#8E8E8A]">
                Speak directly with an engineering lead before placing your order.
              </p>
            </div>
            <button
              onClick={onScheduleCall}
              className="px-6 py-3 rounded-lg bg-[#1A1C1C] hover:bg-black text-white text-xs font-mono font-bold flex items-center gap-2 transition-colors cursor-pointer shrink-0"
            >
              <Calendar size={14} />
              <span>Book Technical Sync</span>
              <ArrowRight size={13} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
