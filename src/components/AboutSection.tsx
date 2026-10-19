/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — About Section
 * Grounded destination using verified Australian company information:
 * - Australian web development partner based in Australia.
 * - Servicing businesses & design studios across Sydney, Melbourne, Brisbane, and Perth.
 * - Straightforward engineering ethos with transparent communication.
 */

import React from 'react';
import { MapPin, Mail, ShieldCheck, Users, CheckCircle2 } from 'lucide-react';
import { AGENCY_CONFIG } from '../config/agencyConfig';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="w-full py-20 lg:py-28 bg-[#FFFFFF] text-[#1A1C1C] transition-colors border-t border-[#E8E8E5] scroll-mt-20">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & About Story */}
          <div className="lg:col-span-7 space-y-6">
            <span className="font-['JetBrains_Mono',monospace] text-[11px] leading-[16px] font-semibold text-[#1A5CFF] uppercase tracking-[0.08em] block">
              ABOUT NEXSITE
            </span>

            <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl lg:text-[46px] lg:leading-[54px] font-bold tracking-tight text-[#1A1C1C]">
              Australian web development built on transparency and precision
            </h2>

            <div className="space-y-4 text-base lg:text-[17px] leading-[28px] text-[#444748] font-['Inter',sans-serif]">
              <p>
                NexSite is an Australian web design and development team. We build high-performance,
                conversion-focused websites for Australian business owners, and provide dependable
                development support for creative agencies.
              </p>
              <p>
                We believe websites should be built cleanly without unnecessary software bloat, obscure technical
                jargon, or artificial delays. When you collaborate with us, you work directly with experienced developers
                in your timezone who understand your commercial goals.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#E8E8E5]">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#1A5CFF] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#1A1C1C]">Direct Collaboration</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">Communicate directly with senior developers without middle-management friction.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#1A5CFF] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#1A1C1C]">Full Code Ownership</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">You own 100% of your source code, design assets, and content from day one.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#1A5CFF] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#1A1C1C]">Australian Timezone (AEST)</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">Seamless live communication during your regular working business hours.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#1A5CFF] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#1A1C1C]">Contractual Timelines</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">Fixed milestones and dependable delivery dates you can count on.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Company Snapshot Card */}
          <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-[#F8F8F6] border border-[#E8E8E5] space-y-6">
            <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-bold text-[#1A1C1C]">
              Company Snapshot
            </h3>

            <div className="space-y-4 text-sm text-[#444748] font-['Inter',sans-serif]">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#1A5CFF] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1A1C1C] text-xs font-mono uppercase">Location</strong>
                  <span>Australia Wide — Servicing clients in Sydney, Melbourne, Brisbane, Perth &amp; Adelaide.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={18} className="text-[#1A5CFF] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1A1C1C] text-xs font-mono uppercase">Primary Contact</strong>
                  <a href={`mailto:${AGENCY_CONFIG.brand.contactEmail}`} className="text-[#1A5CFF] hover:underline">
                    {AGENCY_CONFIG.brand.contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users size={18} className="text-[#1A5CFF] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1A1C1C] text-xs font-mono uppercase">Audience Focus</strong>
                  <span>Australian business owners, professional service firms, and design agency partners.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck size={18} className="text-[#1A5CFF] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1A1C1C] text-xs font-mono uppercase">Commitment</strong>
                  <span>Transparent scoping, dedicated delivery timelines, and post-launch technical care.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
