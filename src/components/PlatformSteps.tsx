/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — 04 // Our Process (Two Inner Sections Layout)
 * Structure:
 * - Two inner sections within the section container:
 *   1. Left Inner Section: Sticky text column with section label, heading, description,
 *      sprint quality indicators, and the action button embedded in the text.
 *   2. Right Inner Section: Steps 1 to 4 with smooth scroll-triggered reveal animation
 *      and active milestone progress tracker.
 */

import React, { useState, useEffect, useRef } from 'react';
import { PLATFORM_STEPS } from '../data/agencyData';
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollReveal';

interface PlatformStepsProps {
  onStartProject?: () => void;
}

export const PlatformSteps: React.FC<PlatformStepsProps> = ({ onStartProject }) => {
  const [activeStepHover, setActiveStepHover] = useState<number | null>(null);
  const [activeVisibleStep, setActiveVisibleStep] = useState<number>(1);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const stepDetails = [
    {
      timeframe: 'Day 1',
      highlights: ['Detailed scope breakdown', 'Fixed sprint timeline alignment', 'Dedicated Slack kickoff'],
    },
    {
      timeframe: 'Days 2–7',
      highlights: ['Daily production staging links', 'Component & token implementation', 'Asynchronous Loom walkthroughs'],
    },
    {
      timeframe: 'Days 8–9',
      highlights: ['Collaborative agency revision round', 'Mobile & cross-browser QA', 'Performance & Lighthouse checks'],
    },
    {
      timeframe: 'Day 10+',
      highlights: ['DNS cutover & production launch', 'Full Git repository transfer', '30-day post-launch warranty care'],
    },
  ];

  // Track active step during scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const targetY = window.innerHeight * 0.45;
      let currentActive = 1;
      let minDistance = Infinity;

      stepRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - targetY);
        if (distance < minDistance) {
          minDistance = distance;
          currentActive = index + 1;
        }
      });

      setActiveVisibleStep(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="platform"
      className="w-full py-20 lg:py-24 bg-white text-[#1A1C1C] transition-colors border-t border-[#E8E8E5] scroll-mt-20"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Two Inner Sections Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Inner Section 1: Sticky Text and Embedded Action Button */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <ScrollReveal delay={0} distance={16}>
              <div className="space-y-6 sm:space-y-7">
                {/* Section Badge */}
                <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#F8F8F6] border border-[#E8E8E5] shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#1A5CFF] shrink-0" aria-hidden="true" />
                  <span className="font-['JetBrains_Mono',monospace] text-[11px] font-semibold text-[#1A1C1C] uppercase tracking-[0.1em]">
                    04 // OUR PROCESS
                  </span>
                </div>

                {/* Main Heading */}
                <h2 className="font-['Space_Grotesk',sans-serif] text-[32px] sm:text-[40px] lg:text-[44px] lg:leading-[1.14] font-bold tracking-tight text-[#1A1C1C]">
                  Simple process, no unnecessary steps
                </h2>

                {/* Supporting Text */}
                <p className="font-['Inter',sans-serif] text-base sm:text-[17px] text-[#555859] leading-relaxed">
                  Every phase is intentional and transparent. No confusion, no endless back-and-forth — just a structured path from your brief to a live, production-grade website.
                </p>

                {/* Key Process Highlights */}
                <div className="space-y-3 py-3 border-y border-[#E8E8E5]">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-700 font-['Inter',sans-serif]">
                    <CheckCircle2 size={16} className="text-[#1A5CFF] shrink-0" />
                    <span>Guaranteed sprint delivery with fixed commitments</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-700 font-['Inter',sans-serif]">
                    <CheckCircle2 size={16} className="text-[#1A5CFF] shrink-0" />
                    <span>Daily staging links &amp; asynchronous Loom updates</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-700 font-['Inter',sans-serif]">
                    <CheckCircle2 size={16} className="text-[#1A5CFF] shrink-0" />
                    <span>Direct senior engineering access with zero middlemen</span>
                  </div>
                </div>

                {/* Action Button Included in Text Section */}
                {onStartProject && (
                  <div className="pt-1">
                    <button
                      onClick={onStartProject}
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1A5CFF] hover:bg-[#0B4AE8] text-white font-medium text-[15px] sm:text-base transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg active:scale-95 group"
                    >
                      <span>Start Your Project Brief</span>
                      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white transition-transform group-hover:translate-x-0.5 shrink-0">
                        <ArrowRight size={14} className="stroke-[2.5]" />
                      </span>
                    </button>
                    <p className="mt-2.5 text-xs text-neutral-500 font-mono">
                      Scope kick-off within 24 hours · Fixed sprint guarantee
                    </p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* Inner Section 2: Steps 1 to 4 with Scroll Animation */}
          <div className="lg:col-span-7 relative">
            {/* Continuous Vertical Timeline Track */}
            <div
              className="absolute left-6 sm:left-8 top-6 bottom-6 w-[2px] bg-[#E8E8E5] -translate-x-1/2 pointer-events-none"
              aria-hidden="true"
            />

            {/* Steps 1 to 4 Stack */}
            <div className="space-y-10 sm:space-y-12">
              {PLATFORM_STEPS.map((step, idx) => {
                const meta = stepDetails[idx] || stepDetails[0];
                const isHovered = activeStepHover === step.step;
                const isCurrent = activeVisibleStep === step.step;
                const isPast = activeVisibleStep > step.step;

                return (
                  <div
                    key={step.step}
                    ref={(el) => {
                      stepRefs.current[idx] = el;
                    }}
                  >
                    <ScrollReveal
                      delay={idx * 70}
                      distance={22}
                      className="relative flex items-start gap-5 sm:gap-8 group"
                    >
                      {/* Numbered Timeline Circle Marker (1 to 4) */}
                      <div className="relative z-10 shrink-0">
                        <div
                          className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center font-mono font-bold text-sm sm:text-base border-2 transition-all duration-300 shadow-xs ${
                            isHovered || isCurrent
                              ? 'bg-[#1A5CFF] text-white border-[#1A5CFF] scale-105 shadow-md'
                              : isPast
                              ? 'bg-[#EBF2FF] text-[#1A5CFF] border-[#1A5CFF]/40'
                              : 'bg-white text-neutral-800 border-[#E8E8E5] group-hover:border-[#1A5CFF] group-hover:text-[#1A5CFF]'
                          }`}
                        >
                          0{step.step}
                        </div>
                      </div>

                      {/* Step Content Panel */}
                      <div
                        onMouseEnter={() => setActiveStepHover(step.step)}
                        onMouseLeave={() => setActiveStepHover(null)}
                        className={`flex-1 rounded-2xl sm:rounded-3xl border p-6 sm:p-8 transition-all duration-300 ${
                          isHovered || isCurrent
                            ? 'bg-white border-[#1A5CFF]/50 shadow-sm'
                            : 'bg-[#F8F8F6] border-[#E8E8E5] hover:border-[#1A5CFF]/30 hover:bg-white'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono text-xs font-bold text-[#1A5CFF] uppercase tracking-wider">
                              PHASE 0{step.step}
                            </span>
                            <span className="text-neutral-300" aria-hidden="true">·</span>
                            <span className="inline-flex items-center gap-1 text-xs font-mono text-neutral-500">
                              <Clock size={12} />
                              {meta.timeframe}
                            </span>
                          </div>

                          <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-mono font-medium bg-white border border-[#E8E8E5] text-neutral-700">
                            {step.badge}
                          </span>
                        </div>

                        <h3 className="font-['Space_Grotesk',sans-serif] text-xl sm:text-2xl font-bold text-[#1A1C1C] mb-3 group-hover:text-[#1A5CFF] transition-colors">
                          {step.title}
                        </h3>

                        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-6 font-['Inter',sans-serif]">
                          {step.desc}
                        </p>

                        {/* Step Milestone Checklist */}
                        <div className="pt-4 border-t border-[#E8E8E5] grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-neutral-700 font-['Inter',sans-serif]">
                          {meta.highlights.map((item, hIdx) => (
                            <div key={hIdx} className="flex items-center gap-2">
                              <CheckCircle2 size={14} className="text-[#1A5CFF] shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </ScrollReveal>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
