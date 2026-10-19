/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — 01 // How We Work (Large Interactive Benefits Panel)
 * Replaces narrow 4-card grid with a unified showcase inspired by Comettech.
 * Features:
 * - 4 Authentic Topics: Dedicated Communication, Fast Turnaround, Scalable Support, White-Label Ready.
 * - Left side: Clean bespoke vector illustration for each topic.
 * - Right side: Large number, benefit title, descriptive copy, and CTA.
 * - Bottom: 4 selectable topic buttons with active indicator and Prev/Next controls.
 * - Stable height, smooth crossfade, keyboard accessibility (ArrowLeft/ArrowRight).
 */

import React, { useState } from 'react';
import { SectionHeader } from './SectionHeader';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Zap, MessageSquare, Layers } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollReveal';

interface HowWeWorkProps {
  onExplorePackages?: () => void;
}

interface BenefitTopic {
  id: string;
  number: string;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  icon: React.ReactNode;
}

const BENEFIT_TOPICS: BenefitTopic[] = [
  {
    id: 'communication',
    number: '01',
    label: 'Dedicated Communication',
    title: 'Direct technical communication with zero middleman overhead',
    subtitle: 'Clear, asynchronous updates directly from senior engineers',
    description:
      'We keep communication clear, consistent, and easy to follow so you always know what is happening. No chasing updates or confusion — everything is shared through structured channels and asynchronous video walkthroughs that fit your workflow.',
    points: [
      'Direct contact with senior architects and developers',
      'Structured sprint updates via Loom & dedicated Slack channel',
      'No junior account manager games or communication bottlenecks',
    ],
    icon: <MessageSquare size={20} className="text-[#1A5CFF]" />,
  },
  {
    id: 'turnaround',
    number: '02',
    label: 'Fast Turnaround',
    title: 'Predictable delivery schedules built around your agency deadlines',
    subtitle: 'High-velocity sprint execution without cutting technical corners',
    description:
      'We work with your deadlines in mind because your delivery directly impacts your reputation. Projects are handled efficiently without compromising code quality, accessibility, or performance, helping you meet client launch dates with confidence.',
    points: [
      'Guaranteed 10-day and 2–3 week sprint commitments',
      'Daily staging links for continuous transparent review',
      'Accelerated 5-day rush delivery options when required',
    ],
    icon: <Zap size={20} className="text-[#1A5CFF]" />,
  },
  {
    id: 'scalable-support',
    number: '03',
    label: 'Scalable Support',
    title: 'Elastic dev capacity that flexes with your agency pipeline',
    subtitle: 'Scale client throughput without hiring overhead or resource strain',
    description:
      'Whether it is a single boutique website build or multiple ongoing partner retainers, we adjust based on your current workload. This allows your agency to pitch and win bigger contracts without worrying about internal staffing limitations.',
    points: [
      'Flexible queue management for active projects',
      'Seamless transition from project launch to care retainer',
      'Zero recruiter fees, payroll taxes, or bench overhead',
    ],
    icon: <Layers size={20} className="text-[#1A5CFF]" />,
  },
  {
    id: 'white-label',
    number: '04',
    label: 'White-Label Ready',
    title: 'Complete confidentiality protecting your agency client relationships',
    subtitle: 'Silent commits and clean attribution under your master brand',
    description:
      'We work behind the scenes as a seamless extension of your team, maintaining strict confidentiality. Your clients only see your brand and your standards, while we handle technical execution, infrastructure, and bug fixing in the background.',
    points: [
      'Enforceable mutual NDA and IP ownership transfer',
      'Ghost Git commits under your agency repositories',
      'Client-facing documentation branded to your firm',
    ],
    icon: <ShieldCheck size={20} className="text-[#1A5CFF]" />,
  },
];

export const HowWeWork: React.FC<HowWeWorkProps> = ({ onExplorePackages }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTopic = BENEFIT_TOPICS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? BENEFIT_TOPICS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === BENEFIT_TOPICS.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  };

  return (
    <section
      id="how-we-work"
      className="w-full py-20 lg:py-24 bg-[#F8F8F6] text-[#1A1C1C] transition-colors border-t border-[#E8E8E5]"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <SectionHeader
          showDot={false}
          label="01 // HOW WE WORK"
          title="Built to support how agencies actually work"
          description="We partner with design studios and agencies to handle development behind the scenes, ensuring projects are delivered on time and to an exceptional technical standard."
        />

        {/* Large Interactive Benefits Panel */}
        <ScrollReveal delay={100} distance={24}>
          <div
            className="rounded-[28px] sm:rounded-[32px] bg-white border border-[#E8E8E5] p-6 sm:p-10 lg:p-12 shadow-sm flex flex-col justify-between focus:outline-none"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            role="region"
            aria-label="How We Work Interactive Showcase"
          >
            {/* Top Stage: Illustration (Left) + Content (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[420px] lg:min-h-[440px]">
              {/* Left Side: Bespoke Vector Graphic */}
              <div className="lg:col-span-5 w-full flex items-center justify-center">
                <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl bg-[#F8F9FC] border border-[#E5E9F2] p-6 flex flex-col justify-between relative overflow-hidden shadow-inner">
                  {/* Visual Background Accent */}
                  <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#1A5CFF]/[0.06] rounded-full blur-2xl pointer-events-none" />

                  {/* Render Visual based on Active Topic */}
                  {activeIndex === 0 && (
                    <div className="h-full flex flex-col justify-between py-2 animate-fadeIn">
                      <div className="flex items-center justify-between border-b border-[#E5E9F2] pb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-[#1A1C1C]">#partner-sprint-room</span>
                        </div>
                        <span className="font-mono text-[10px] text-neutral-400">Direct SLA</span>
                      </div>
                      <div className="space-y-3 my-auto">
                        <div className="p-3 rounded-xl bg-white border border-[#E5E9F2] shadow-xs text-xs">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-[#1A1C1C]">Lead Architect</span>
                            <span className="text-[10px] font-mono text-neutral-400">10:14 AM</span>
                          </div>
                          <p className="text-neutral-600 leading-snug">
                            Staging environment v2.4 deployed. Figma tokens mapped with 100% precision.
                          </p>
                        </div>
                        <div className="p-3 rounded-xl bg-[#EBF2FF] border border-[#1A5CFF]/20 shadow-xs text-xs ml-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-[#1A5CFF]">Agency Partner</span>
                            <span className="text-[10px] font-mono text-[#1A5CFF]/70">10:18 AM</span>
                          </div>
                          <p className="text-[#1A1C1C] leading-snug font-medium">
                            Reviewed on iPhone 15 & Chrome. Animations feel incredible. Client approved!
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-[#E5E9F2] text-[11px] font-mono text-neutral-500">
                        <span>Response Time: &lt; 2 hrs</span>
                        <span className="text-[#1A5CFF] font-semibold">Zero Middlemen</span>
                      </div>
                    </div>
                  )}

                  {activeIndex === 1 && (
                    <div className="h-full flex flex-col justify-between py-2 animate-fadeIn">
                      <div className="flex items-center justify-between border-b border-[#E5E9F2] pb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-[#1A1C1C]">Sprint Velocity Engine</span>
                        </div>
                        <span className="font-mono text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">ON SCHEDULE</span>
                      </div>
                      <div className="space-y-2.5 my-auto">
                        <div className="p-2.5 rounded-lg bg-white border border-[#E5E9F2] flex items-center justify-between text-xs">
                          <span className="font-medium text-neutral-800">Day 01–03: Architecture & Schema</span>
                          <span className="font-mono text-emerald-600 font-bold">100%</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white border border-[#E5E9F2] flex items-center justify-between text-xs">
                          <span className="font-medium text-neutral-800">Day 04–08: Production Component Build</span>
                          <span className="font-mono text-[#1A5CFF] font-bold">Ready</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white border border-[#E5E9F2] flex items-center justify-between text-xs">
                          <span className="font-medium text-neutral-800">Day 09–10: QA, Speed & DNS Launch</span>
                          <span className="font-mono text-neutral-400 font-bold">Locked</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-[#E5E9F2] text-[11px] font-mono text-neutral-500">
                        <span>Lighthouse Score: 98+</span>
                        <span className="text-[#1A5CFF] font-semibold">Contractual Guarantee</span>
                      </div>
                    </div>
                  )}

                  {activeIndex === 2 && (
                    <div className="h-full flex flex-col justify-between py-2 animate-fadeIn">
                      <div className="flex items-center justify-between border-b border-[#E5E9F2] pb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-[#1A1C1C]">Bandwidth Allocation</span>
                        </div>
                        <span className="font-mono text-[10px] text-[#1A5CFF] font-bold bg-[#EBF2FF] px-2 py-0.5 rounded">ACTIVE POD</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2.5 my-auto">
                        <div className="p-3 rounded-xl bg-white border border-[#E5E9F2] text-center">
                          <span className="text-xl font-bold font-['Space_Grotesk'] text-[#1A1C1C] block">1 to 10+</span>
                          <span className="text-[11px] font-mono text-neutral-500">Active Sprints</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white border border-[#E5E9F2] text-center">
                          <span className="text-xl font-bold font-['Space_Grotesk'] text-[#1A5CFF] block">0 Hours</span>
                          <span className="text-[11px] font-mono text-neutral-500">Hiring Lag</span>
                        </div>
                        <div className="col-span-2 p-2.5 rounded-xl bg-[#EBF2FF] border border-[#1A5CFF]/20 text-xs text-center text-[#1A1C1C] font-medium">
                          Queue-managed tasks scale up or down every 30 days
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-[#E5E9F2] text-[11px] font-mono text-neutral-500">
                        <span>Resource Availability</span>
                        <span className="text-emerald-600 font-semibold">Immediate</span>
                      </div>
                    </div>
                  )}

                  {activeIndex === 3 && (
                    <div className="h-full flex flex-col justify-between py-2 animate-fadeIn">
                      <div className="flex items-center justify-between border-b border-[#E5E9F2] pb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-[#1A1C1C]">White-Label Shield</span>
                        </div>
                        <span className="font-mono text-[10px] text-neutral-700 font-bold bg-neutral-100 px-2 py-0.5 rounded">NDA PROTECTED</span>
                      </div>
                      <div className="space-y-2.5 my-auto text-xs">
                        <div className="p-2.5 rounded-xl bg-white border border-[#E5E9F2] flex items-center gap-3">
                          <ShieldCheck size={18} className="text-[#1A5CFF] shrink-0" />
                          <div>
                            <span className="font-bold text-[#1A1C1C] block">Client-Facing: Your Agency</span>
                            <span className="text-[11px] text-neutral-500">Zero NexSite branding or backlink mentions</span>
                          </div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white border border-[#E5E9F2] flex items-center gap-3">
                          <Layers size={18} className="text-[#1A5CFF] shrink-0" />
                          <div>
                            <span className="font-bold text-[#1A1C1C] block">Silent Commits &amp; Transfers</span>
                            <span className="text-[11px] text-neutral-500">100% intellectual property transferred to you</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-[#E5E9F2] text-[11px] font-mono text-neutral-500">
                        <span>Agency Status</span>
                        <span className="text-[#1A5CFF] font-semibold">Confidential Partner</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side: Content Details */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs font-bold text-[#1A5CFF] bg-[#EBF2FF] px-2.5 py-1 rounded-md">
                    BENEFIT // {activeTopic.number}
                  </span>
                  <span className="font-mono text-xs text-neutral-400">
                    Step {activeIndex + 1} of {BENEFIT_TOPICS.length}
                  </span>
                </div>

                <h3 className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl lg:text-[34px] lg:leading-[40px] font-bold text-[#1A1C1C] mb-3">
                  {activeTopic.title}
                </h3>

                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-6 font-['Inter',sans-serif]">
                  {activeTopic.description}
                </p>

                {/* Key Bullet Checklist */}
                <div className="space-y-2.5 mb-8">
                  {activeTopic.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700">
                      <span className="text-[#1A5CFF] font-semibold select-none shrink-0">&mdash;</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                {onExplorePackages && (
                  <div>
                    <button
                      onClick={onExplorePackages}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A5CFF] hover:text-[#0B3CC1] cursor-pointer group transition-colors"
                    >
                      <span>Explore Agency Partner Packages</span>
                      <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Controls: 4 Selectable Tabs + Prev/Next Buttons */}
            <div className="mt-8 pt-6 border-t border-[#E8E8E5] flex flex-col md:flex-row items-center justify-between gap-4">
              {/* 4 Topic Selectors */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full md:w-auto"
                role="tablist"
                aria-label="How We Work Topics"
              >
                {BENEFIT_TOPICS.map((topic, tIdx) => {
                  const isActive = tIdx === activeIndex;
                  return (
                    <button
                      key={topic.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveIndex(tIdx)}
                      className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A5CFF] ${
                        isActive
                          ? 'bg-[#1A5CFF] text-white shadow-sm font-semibold'
                          : 'bg-[#F8F8F6] hover:bg-[#EEEEEE] text-neutral-700 border border-[#E8E8E5]'
                      }`}
                    >
                      <span className="truncate">{topic.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-xl border border-[#E8E8E5] bg-white hover:bg-[#F8F8F6] text-neutral-700 flex items-center justify-center transition-colors cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A5CFF]"
                  aria-label="Previous Benefit"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-xl border border-[#E8E8E5] bg-white hover:bg-[#F8F8F6] text-neutral-700 flex items-center justify-center transition-colors cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A5CFF]"
                  aria-label="Next Benefit"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
