/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — 03 // Case Studies (Image-Led Portfolio Showcase)
 * Reference: Comettech portfolio composition (1 Large Featured + 2 Supporting Two-Column).
 * Features:
 * - 1 Large Hero Featured Project (Roto Baller Sports Analytics).
 * - 2 Supporting Projects underneath (Eurobike & Nasstive Entertainment).
 * - Authentic screenshots mapped 100% to project descriptions.
 * - Project name, 2-3 clean category tags, concise summary, and accessible modal trigger.
 * - Stacks gracefully on mobile viewports.
 */

import React, { useState, useEffect, useRef } from 'react';
import { CASE_STUDIES } from '../data/agencyData';
import { CaseStudy } from '../types';
import { ArrowUpRight, X, ArrowRight, ExternalLink } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { ScrollReveal } from '../hooks/useScrollReveal';

interface CaseStudiesProps {
  onSelectCase?: (study: CaseStudy) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onSelectCase }) => {
  const [activeModalStudy, setActiveModalStudy] = useState<CaseStudy | null>(null);
  const modalCloseRef = useRef<HTMLButtonElement>(null);

  const handleOpenStudy = (study: CaseStudy) => {
    setActiveModalStudy(study);
    onSelectCase?.(study);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModalStudy) {
        setActiveModalStudy(null);
      }
    };

    if (activeModalStudy) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => modalCloseRef.current?.focus(), 80);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeModalStudy]);

  const featuredStudy = CASE_STUDIES[0]; // Roto Baller
  const supportingStudies = CASE_STUDIES.slice(1, 3); // Eurobike & Nasstive

  return (
    <section
      id="case-studies"
      className="w-full py-20 lg:py-24 bg-[#F8F8F6] text-[#1A1C1C] transition-colors border-t border-[#E8E8E5]"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <SectionHeader
          label="03 // CASE STUDIES"
          title="Work delivered for agency partners"
          description="A selection of recent production web builds engineered for performance, clean responsiveness, and high conversion."
        />

        {/* 1. Large Featured Project Spanning Container Width */}
        {featuredStudy && (
          <ScrollReveal delay={100} distance={24} className="mb-8 lg:mb-10">
            <div className="rounded-[28px] sm:rounded-[32px] overflow-hidden border border-[#E8E8E5] bg-white shadow-xs group hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12">
              {/* Screenshot Media (~7 cols) */}
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[480px] overflow-hidden bg-[#EEEEEE]">
                <ScrollReveal scale={true} duration={800} className="w-full h-full">
                  <img
                    src={featuredStudy.image}
                    alt={featuredStudy.alt || featuredStudy.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </ScrollReveal>
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-black/80 text-white backdrop-blur-md">
                    FEATURED PROJECT
                  </span>
                </div>
              </div>

              {/* Project Details (~5 cols) */}
              <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-[#1A5CFF] uppercase tracking-wider">
                      CLIENT // {featuredStudy.client}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">Production Build</span>
                  </div>

                  <h3 className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl font-bold text-[#1A1C1C] mb-4 group-hover:text-[#1A5CFF] transition-colors">
                    {featuredStudy.title}
                  </h3>

                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-6 font-['Inter',sans-serif]">
                    {featuredStudy.description}
                  </p>

                  {/* Clean Category Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {featuredStudy.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#F4F4F1] text-neutral-700 border border-[#E8E8E5]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Verified Metrics */}
                  {featuredStudy.metrics && featuredStudy.metrics.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#E8E8E5] mb-8">
                      {featuredStudy.metrics.map((m, mIdx) => (
                        <div key={mIdx}>
                          <span className="block text-xl font-bold font-['Space_Grotesk'] text-[#1A1C1C]">
                            {m.stat}
                          </span>
                          <span className="text-xs font-mono text-neutral-500">
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <button
                    onClick={() => handleOpenStudy(featuredStudy)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1A5CFF] hover:bg-[#0B4AE8] text-white text-sm font-semibold transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
                  >
                    <span>Explore Production Scope</span>
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* 2. Two Supporting Projects Underneath in 2-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {supportingStudies.map((study, idx) => (
            <ScrollReveal
              key={study.id}
              delay={idx * 100}
              distance={22}
              className="h-full"
            >
              <div className="h-full rounded-[28px] overflow-hidden border border-[#E8E8E5] bg-white shadow-xs group hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                {/* Screenshot Media */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-[#EEEEEE]">
                  <ScrollReveal scale={true} duration={800} className="w-full h-full">
                    <img
                      src={study.image}
                      alt={study.alt || study.title}
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  </ScrollReveal>
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white/90 text-neutral-900 border border-[#E8E8E5] backdrop-blur-md">
                      {study.client}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      {study.tags.slice(0, 2).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-[#F4F4F1] text-neutral-600 border border-[#E8E8E5]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h4 className="font-['Space_Grotesk',sans-serif] text-xl sm:text-2xl font-bold text-[#1A1C1C] mb-3 group-hover:text-[#1A5CFF] transition-colors">
                      {study.title}
                    </h4>

                    <p className="text-sm text-neutral-600 leading-relaxed mb-6 font-['Inter',sans-serif]">
                      {study.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E8E8E5] flex items-center justify-between">
                    <span className="text-xs font-mono text-neutral-400">
                      Case Study
                    </span>
                    <button
                      onClick={() => handleOpenStudy(study)}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1A5CFF] hover:text-[#0B3CC1] cursor-pointer transition-colors"
                    >
                      <span>Explore Scope</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Accessible, Responsive Case Study Detail Modal */}
      {activeModalStudy && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeModalStudy.title}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn"
        >
          <div className="bg-white text-[#1A1C1C] max-w-2xl w-full rounded-2xl border border-[#E8E8E5] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header Media */}
            <div className="relative h-60 sm:h-72 overflow-hidden bg-[#EEEEEE] shrink-0">
              <img
                src={activeModalStudy.image}
                alt={activeModalStudy.title}
                className="w-full h-full object-cover"
              />
              <button
                ref={modalCloseRef}
                onClick={() => setActiveModalStudy(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1A5CFF]"
                aria-label="Close Case Study Details"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-[#EBF2FF] text-[#1A5CFF]">
                    {activeModalStudy.client}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">Verified Partner Build</span>
                </div>
                <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-bold text-[#1A1C1C]">
                  {activeModalStudy.title}
                </h3>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2">
                  Production Architecture &amp; Delivery
                </h4>
                <p className="text-sm text-neutral-700 leading-relaxed font-['Inter',sans-serif]">
                  {activeModalStudy.fullCaseSummary || activeModalStudy.description}
                </p>
              </div>

              {activeModalStudy.metrics && activeModalStudy.metrics.length > 0 && (
                <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#F8F8F6] border border-[#E8E8E5]">
                  {activeModalStudy.metrics.map((m, mIdx) => (
                    <div key={mIdx}>
                      <span className="block text-2xl font-bold font-['Space_Grotesk'] text-[#1A1C1C]">
                        {m.stat}
                      </span>
                      <span className="text-xs font-mono text-neutral-500">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {activeModalStudy.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#F4F4F1] text-neutral-700 border border-[#E8E8E5]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-[#E8E8E5] bg-[#F8F8F6] flex items-center justify-between shrink-0">
              <span className="text-xs font-mono text-neutral-500">
                100% Confidential Execution
              </span>
              <button
                onClick={() => setActiveModalStudy(null)}
                className="px-5 py-2.5 rounded-xl bg-[#1A1C1C] hover:bg-black text-white text-xs font-semibold cursor-pointer transition-colors"
              >
                Close Project Overview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
