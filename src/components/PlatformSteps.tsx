/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — 04 // Our Platform (Process Explanation)
 * Section rhythm: Black (#000000) with white text and restrained electric-blue accents.
 * Strictly complies with Master Instruction:
 * - NO fake status lights, live indicators, system logs, terminal windows, or blinking dots.
 * - Restrained step progress indicator.
 * - Dark neutral backgrounds with thin border and clean active blue states.
 */

import React, { useState } from 'react';
import { PLATFORM_STEPS } from '../data/agencyData';

export const PlatformSteps: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section
      id="platform"
      className="w-full py-24 lg:py-28 bg-[#000000] text-white relative overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <span className="font-['JetBrains_Mono',monospace] text-[11px] leading-[16px] font-semibold text-[#1A5CFF] uppercase tracking-[0.08em] block mb-3">
            04 // OUR PLATFORM
          </span>
          <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl lg:text-[48px] lg:leading-[56px] font-bold tracking-tight mb-4 text-white">
            Simple process, no unnecessary steps
          </h2>
          <p className="font-['Inter',sans-serif] text-base text-[#8E8E8A] leading-relaxed">
            Every step is intentional. No clutter, no confusion — just a clear path from idea to
            execution.
          </p>

          {/* Restrained Step Progress Bar */}
          <div className="w-full max-w-xs mx-auto mt-8 bg-[#1A1C1C] rounded-full h-1 overflow-hidden">
            <div
              className="h-full bg-[#1A5CFF] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${activeStep * 25}%` }}
            />
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLATFORM_STEPS.map((step) => {
            const isActive = activeStep === step.step;

            return (
              <div
                key={step.step}
                onMouseEnter={() => setActiveStep(step.step)}
                onClick={() => setActiveStep(step.step)}
                className={`p-8 rounded-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer border ${
                  isActive
                    ? 'bg-[#111111] border-[#1A5CFF]'
                    : 'bg-[#0A0A0A] border-[#1A1C1C] hover:border-[#333333]'
                }`}
              >
                <div>
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base mb-6 font-mono transition-colors ${
                      isActive
                        ? 'bg-[#1A5CFF] text-white'
                        : 'bg-[#1A1C1C] text-[#8E8E8A]'
                    }`}
                  >
                    {step.step}
                  </div>

                  <h3 className="text-xl font-bold font-['Space_Grotesk',sans-serif] text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm font-['Inter',sans-serif] text-[#8E8E8A] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#1A1C1C]">
                  <span
                    className={`text-xs font-mono font-semibold uppercase ${
                      isActive ? 'text-[#1A5CFF]' : 'text-[#747878]'
                    }`}
                  >
                    {step.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
