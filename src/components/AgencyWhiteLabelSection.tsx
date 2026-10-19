/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — Agency & White-Label Development Section
 * Dedicated destination for digital agencies seeking reliable engineering capacity:
 * - Clear white-label partnership terms (strict NDA, silent Git commits, agency brand protected).
 * - Transparent sprint capacity to help agencies scale without hiring overhead.
 */

import React from 'react';
import { ShieldCheck, EyeOff, Zap, Users, ArrowRight } from 'lucide-react';

interface AgencyWhiteLabelSectionProps {
  onAgencyEnquiry?: () => void;
}

export const AgencyWhiteLabelSection: React.FC<AgencyWhiteLabelSectionProps> = ({ onAgencyEnquiry }) => {
  return (
    <section id="for-agencies" className="w-full py-20 lg:py-28 bg-[#F8F8F6] text-[#1A1C1C] transition-colors border-t border-[#E8E8E5] scroll-mt-20">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 lg:mb-18">
          <span className="font-['JetBrains_Mono',monospace] text-[11px] leading-[16px] font-semibold text-[#1A5CFF] uppercase tracking-[0.08em] block mb-3">
            AGENCY PARTNERSHIPS
          </span>
          <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl lg:text-[46px] lg:leading-[54px] font-bold tracking-tight text-[#1A1C1C] mb-4">
            Reliable white-label development for design studios &amp; agencies
          </h2>
          <p className="font-['Inter',sans-serif] text-base lg:text-[18px] leading-[28px] text-[#444748]">
            Do you run a design studio or creative agency with more web projects than internal capacity?
            We operate behind the scenes as your trusted engineering arm so you can scale client volume with confidence.
          </p>
        </div>

        {/* 4 Agency Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="p-8 rounded-2xl bg-white border border-[#E8E8E5] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#EBF1FF] text-[#1A5CFF] flex items-center justify-center mb-5">
                <EyeOff size={20} />
              </div>
              <h3 className="text-xl font-bold font-['Space_Grotesk',sans-serif] text-[#1A1C1C] mb-2">
                100% White-Label
              </h3>
              <p className="text-sm font-['Inter',sans-serif] text-[#555859] leading-relaxed">
                We work silently in the background. Deliverables are packaged under your brand, and all source code is transferred clean.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E8E8E5] text-xs font-mono text-neutral-500">
              Mutual NDA Enforced
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-[#E8E8E5] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#EBF1FF] text-[#1A5CFF] flex items-center justify-center mb-5">
                <Zap size={20} />
              </div>
              <h3 className="text-xl font-bold font-['Space_Grotesk',sans-serif] text-[#1A1C1C] mb-2">
                Dependable Sprints
              </h3>
              <p className="text-sm font-['Inter',sans-serif] text-[#555859] leading-relaxed">
                Fixed turnarounds that safeguard your agency’s delivery reputation. We hit the deadlines we commit to.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E8E8E5] text-xs font-mono text-neutral-500">
              Strict Milestone SLA
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-[#E8E8E5] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#EBF1FF] text-[#1A5CFF] flex items-center justify-center mb-5">
                <Users size={20} />
              </div>
              <h3 className="text-xl font-bold font-['Space_Grotesk',sans-serif] text-[#1A1C1C] mb-2">
                Flexible Scaling
              </h3>
              <p className="text-sm font-['Inter',sans-serif] text-[#555859] leading-relaxed">
                Take on larger client briefs without the overhead of full-time developer salaries. Scale up or down as project volume dictates.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E8E8E5] text-xs font-mono text-neutral-500">
              Zero Hiring Overhead
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-[#E8E8E5] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#EBF1FF] text-[#1A5CFF] flex items-center justify-center mb-5">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-xl font-bold font-['Space_Grotesk',sans-serif] text-[#1A1C1C] mb-2">
                Pixel-Perfect Figma
              </h3>
              <p className="text-sm font-['Inter',sans-serif] text-[#555859] leading-relaxed">
                We respect your design team’s craft. We translate Figma, Webflow, or Adobe XD components into clean, responsive code without shortcuts.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E8E8E5] text-xs font-mono text-neutral-500">
              Design Integrity Preserved
            </div>
          </div>
        </div>

        {/* Agency Action Callout */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E8E8E5] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h4 className="font-['Space_Grotesk',sans-serif] text-xl font-bold text-[#1A1C1C] mb-1">
              Need a development partner for your next client brief?
            </h4>
            <p className="text-sm text-[#444748]">
              Reach out to discuss white-label terms, upcoming project scoping, or ongoing development capacity.
            </p>
          </div>

          <div>
            <button
              onClick={onAgencyEnquiry}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1A1C1C] hover:bg-[#1A5CFF] text-white font-semibold text-sm transition-colors cursor-pointer shrink-0"
            >
              <span>Discuss Agency Partnership</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
