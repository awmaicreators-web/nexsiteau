/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — Simple Process Section
 * Consolidated 4-step process in plain, customer-friendly language:
 * 1. Scope & Discover
 * 2. Design & Prototype
 * 3. Build & Test
 * 4. Launch & Support
 */

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const SimpleProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      step: 1,
      num: '01',
      title: 'Discuss Your Requirements',
      duration: 'Kickoff (Days 1–3)',
      desc: 'We learn about your business, target audience, and key website goals. Together, we define a clear scope, schedule, and checklist so everyone is aligned from day one.',
      points: ['Discovery questionnaire', 'Sitemap & page architecture', 'Asset & branding collection'],
    },
    {
      step: 2,
      num: '02',
      title: 'Design & Visual Direction',
      duration: 'Wireframes & UI',
      desc: 'We craft clean, intuitive wireframes and interactive UI layouts. You review the design direction and share feedback before any code is written, ensuring full alignment.',
      points: ['Mobile & desktop wireframes', 'Modern typography & color system', 'Interactive feedback review'],
    },
    {
      step: 3,
      num: '03',
      title: 'Build & Quality Testing',
      duration: 'Engineering Sprints',
      desc: 'Our developers build clean, modern code tailored to your exact specifications. Every page undergoes performance optimization, mobile checks, and browser testing.',
      points: ['Responsive development', 'Speed optimization (Lighthouse 95+)', 'SEO & form testing'],
    },
    {
      step: 4,
      num: '04',
      title: 'Review, Launch & Support',
      duration: 'DNS Go-Live',
      desc: 'You review the live staging build for final signoff. Once approved, we handle domain configuration, launch your website smoothly, and provide ongoing technical care.',
      points: ['DNS migration & SSL setup', 'Handover documentation', 'Post-launch support care'],
    },
  ];

  return (
    <section id="process" className="w-full py-20 lg:py-28 bg-[#F8F8F6] text-[#1A1C1C] transition-colors border-t border-[#E8E8E5] scroll-mt-20">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 lg:mb-18">
          <span className="font-['JetBrains_Mono',monospace] text-[11px] leading-[16px] font-semibold text-[#1A5CFF] uppercase tracking-[0.08em] block mb-3">
            HOW IT WORKS
          </span>
          <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl lg:text-[46px] lg:leading-[54px] font-bold tracking-tight text-[#1A1C1C] mb-4">
            A straightforward process from kickoff to launch
          </h2>
          <p className="font-['Inter',sans-serif] text-base lg:text-[18px] leading-[28px] text-[#444748]">
            Clear milestones, predictable delivery, and regular updates at every stage.
            No confusing back-and-forth or surprises.
          </p>
        </div>

        {/* 4 Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => {
            const isActive = activeStep === item.step;

            return (
              <div
                key={item.step}
                onMouseEnter={() => setActiveStep(item.step)}
                onClick={() => setActiveStep(item.step)}
                className={`p-8 rounded-2xl bg-white border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? 'border-[#1A5CFF] shadow-md -translate-y-1'
                    : 'border-[#E8E8E5] hover:border-neutral-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`text-3xl font-bold font-['Space_Grotesk',sans-serif] ${
                        isActive ? 'text-[#1A5CFF]' : 'text-neutral-400'
                      }`}
                    >
                      {item.num}
                    </span>
                    <span className="text-xs font-mono text-neutral-500 bg-[#F4F4F1] px-2.5 py-1 rounded-md">
                      {item.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-['Space_Grotesk',sans-serif] text-[#1A1C1C] mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm font-['Inter',sans-serif] text-[#555859] leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-[#E8E8E5]">
                    {item.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2 text-xs text-[#2D3133]">
                        <CheckCircle2 size={13} className="text-[#1A5CFF] shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E8E8E5] flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-neutral-500">
                    Step {item.step} of 4
                  </span>
                  <ArrowRight
                    size={14}
                    className={`transition-transform ${isActive ? 'text-[#1A5CFF] translate-x-1' : 'text-neutral-400'}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
