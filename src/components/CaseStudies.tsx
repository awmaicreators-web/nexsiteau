/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — 03 // Case Studies
 * Section rhythm: Cream Canvas (#F8F8F6).
 * Large imagery, clean metadata, editorial layout.
 * Strictly complies with Master Instruction:
 * - NO fake "SLA VERIFIED" or "ALL BUILDS SHIPPED ON-TIME" badges.
 * - Maximum image hover scale: 1.02 (ease-out, 600ms).
 * - Restrained typography and subtle transitions.
 */

import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/agencyData';
import { CaseStudy } from '../types';
import { ArrowUpRight, X } from 'lucide-react';

interface CaseStudiesProps {
  onSelectCase?: (study: CaseStudy) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onSelectCase }) => {
  const [activeModalStudy, setActiveModalStudy] = useState<CaseStudy | null>(null);

  const handleOpenStudy = (study: CaseStudy) => {
    setActiveModalStudy(study);
    onSelectCase?.(study);
  };

  return (
    <section
      id="case-studies"
      className="w-full py-24 lg:py-28 bg-[#F8F8F6] text-[#1A1C1C] transition-colors"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <span className="font-['JetBrains_Mono',monospace] text-[11px] leading-[16px] font-semibold text-[#1A5CFF] uppercase tracking-[0.08em] block mb-3">
            03 // CASE STUDIES
          </span>
          <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl lg:text-[48px] lg:leading-[56px] font-bold tracking-tight text-[#1A1C1C] mb-4">
            Work delivered for agency partners
          </h2>
          <p className="font-['Inter',sans-serif] text-base lg:text-[18px] lg:leading-[28px] text-[#444748]">
            Each project is built with precision, performance, and client satisfaction in mind.
          </p>
        </div>

        {/* Case Studies Stack */}
        <div className="flex flex-col gap-12">
          {CASE_STUDIES.map((study, index) => {
            const isImageFirst = index % 2 === 0;

            return (
              <article
                key={study.id}
                className="rounded-3xl overflow-hidden border border-[#E8E8E5] bg-white transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 group hover:shadow-lg"
              >
                {/* Image Section (Clean crop, max hover scale 1.02) */}
                <div
                  className={`lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-[#EEEEEE] ${
                    isImageFirst ? 'order-1' : 'order-1 lg:order-2'
                  }`}
                >
                  <img
                    src={study.image}
                    alt={study.alt || study.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>

                {/* Content Section */}
                <div
                  className={`lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between ${
                    isImageFirst ? 'order-2' : 'order-2 lg:order-1'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-[#8E8E8A] uppercase tracking-wider font-semibold">
                        CLIENT // {study.client}
                      </span>
                    </div>

                    <h3 className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl font-bold text-[#1A1C1C] mb-4 group-hover:text-[#1A5CFF] transition-colors">
                      {study.title}
                    </h3>

                    <p className="text-sm sm:text-base font-['Inter',sans-serif] text-[#444748] leading-relaxed mb-6">
                      {study.description}
                    </p>

                    {/* Clean Stack Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {study.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-[#F4F4F1] text-[#444748] border border-[#E8E8E5]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Metrics Grid */}
                    {study.metrics && study.metrics.length > 0 && (
                      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#E8E8E5]">
                        {study.metrics.map((m, mIdx) => (
                          <div key={mIdx}>
                            <span className="block text-xl font-bold font-['Space_Grotesk',sans-serif] text-[#1A1C1C]">
                              {m.stat}
                            </span>
                            <span className="text-xs font-mono text-[#8E8E8A]">
                              {m.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#E8E8E5] flex items-center justify-between">
                    <button
                      onClick={() => handleOpenStudy(study)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A5CFF] hover:text-[#0B3CC1] transition-colors cursor-pointer"
                    >
                      <span>Explore Production Scope</span>
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      {activeModalStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white text-[#1A1C1C] max-w-2xl w-full rounded-2xl border border-[#E8E8E5] shadow-2xl overflow-hidden">
            <div className="relative h-64 sm:h-72 overflow-hidden bg-[#EEEEEE]">
              <img
                src={activeModalStudy.image}
                alt={activeModalStudy.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveModalStudy(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <span className="text-xs font-mono text-[#1A5CFF] uppercase font-bold tracking-wider block mb-1">
                {activeModalStudy.tags?.[0] || 'ENGINEERING'} // {activeModalStudy.client}
              </span>
              <h3 className="text-2xl font-bold font-['Space_Grotesk',sans-serif] text-[#1A1C1C] mb-3">
                {activeModalStudy.title}
              </h3>
              <p className="text-sm font-['Inter',sans-serif] text-[#444748] leading-relaxed mb-6">
                {activeModalStudy.fullCaseSummary || activeModalStudy.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {activeModalStudy.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#F4F4F1] text-[#444748] border border-[#E8E8E5]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-end pt-4 border-t border-[#E8E8E5]">
                <button
                  onClick={() => setActiveModalStudy(null)}
                  className="px-6 py-2.5 bg-[#1A1C1C] hover:bg-black text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                >
                  Close Scope
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
