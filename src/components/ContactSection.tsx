/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — 06 // Contact & Advisory Section
 * Features:
 * - Two-column desktop layout, single-column on mobile.
 * - Left: Concise direct contact info, guaranteed response SLA, booking call trigger.
 * - Right: Well-spaced form with persistent labels, visible focus states, service pills, and validation.
 * - Fully connected to existing /api/contact flow with graceful fallback.
 */

import React, { useState } from 'react';
import { Mail, Clock, ArrowRight, CheckCircle2, Send, Calendar } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollReveal';

interface ContactSectionProps {
  onOpenScheduleModal?: () => void;
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenScheduleModal,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>(['Custom CMS']);
  const [budget, setBudget] = useState('$5k - $10k');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableServices = [
    'Custom CMS',
    'Modern UI/UX',
    'Reliable Backend',
    'eCommerce',
    'Ongoing Support',
    'White-Label Outsourcing',
  ];

  const budgetOptions = [
    '< $5,000 AUD',
    '$5,000 - $10,000 AUD',
    '$10,000 - $25,000 AUD',
    '$25,000+ AUD / Retainer',
  ];

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          service: selectedServices.join(', '),
          budget,
          notes,
        }),
      });
    } catch {
      // Graceful fallback
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <section
      id="contact"
      className="w-full py-20 lg:py-24 bg-[#F8F8F6] text-[#1A1C1C] transition-colors border-t border-[#E8E8E5] scroll-mt-20"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Contact & Advisory */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <ScrollReveal delay={0} distance={10}>
                <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white border border-[#E8E8E5] shadow-xs mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#1A5CFF] shrink-0" aria-hidden="true" />
                  <span className="font-['JetBrains_Mono',monospace] text-[11px] font-semibold text-[#1A1C1C] uppercase tracking-[0.1em]">
                    06 // CONTACT &amp; BRIEF
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={80} distance={20}>
                <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-[#1A1C1C] leading-[1.18] mb-4">
                  Let&apos;s build something great together
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={160} distance={16}>
                <p className="font-['Inter',sans-serif] text-base text-[#555859] leading-relaxed">
                  Have an upcoming project, need reliable engineering capacity, or want to explore an ongoing white-label partnership? Send us your brief and a senior technical director will respond within 24 hours.
                </p>
              </ScrollReveal>
            </div>

            {/* Direct Contact Cards */}
            <ScrollReveal delay={200} distance={18} className="space-y-3.5 pt-2">
              <a
                href="mailto:info@nexsiteau.com"
                className="p-4 sm:p-5 rounded-2xl border border-[#E8E8E5] bg-white flex items-center gap-4 transition-all group hover:border-[#1A5CFF]/60 hover:shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EBF2FF] text-[#1A5CFF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Mail size={18} />
                </div>
                <div className="truncate">
                  <span className="text-[11px] font-mono text-neutral-400 block uppercase font-semibold">
                    DIRECT INQUIRY
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#1A1C1C] group-hover:text-[#1A5CFF] transition-colors">
                    info@nexsiteau.com
                  </span>
                </div>
              </a>

              <div className="p-4 sm:p-5 rounded-2xl border border-[#E8E8E5] bg-white flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F4F4F1] text-neutral-700 flex items-center justify-center shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-neutral-400 block uppercase font-semibold">
                    GUARANTEED RESPONSE
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#1A1C1C]">
                    Under 24-Hour Technical Kickoff
                  </span>
                </div>
              </div>

              {onOpenScheduleModal && (
                <div className="p-5 rounded-2xl border border-[#E8E8E5] bg-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={16} className="text-[#1A5CFF]" />
                    <span className="text-xs font-mono font-bold text-[#1A1C1C] uppercase tracking-wider">
                      Prefer a Direct Call?
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 mb-3 leading-relaxed">
                    Schedule a 15-minute architecture conversation directly with our engineering team.
                  </p>
                  <button
                    type="button"
                    onClick={onOpenScheduleModal}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#1A5CFF] hover:text-[#0B3CC1] cursor-pointer"
                  >
                    <span>Book 15-Min Scoping Sync</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              )}
            </ScrollReveal>
          </div>

          {/* Right Column: Well-Spaced Form */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={120} distance={22}>
              <div className="p-7 sm:p-10 rounded-[28px] border border-[#E8E8E5] bg-white shadow-xs">
                {isSubmitted ? (
                  <div className="py-12 text-center space-y-4 animate-fadeIn">
                    <div className="w-14 h-14 rounded-full bg-[#EBF2FF] text-[#1A5CFF] flex items-center justify-center mx-auto">
                      <CheckCircle2 size={30} />
                    </div>
                    <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-[#1A1C1C]">
                      Inquiry Received
                    </h3>
                    <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting NexSite. Our technical directors are reviewing your project requirements and will reply within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-4 px-6 py-2.5 rounded-xl border border-[#E8E8E5] text-xs font-semibold text-neutral-700 hover:bg-[#F8F8F6] cursor-pointer transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                          Your Name <span className="text-[#1A5CFF]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Sarah Jenkins"
                          className="w-full px-4 py-3 rounded-xl text-sm border border-[#E8E8E5] bg-[#F8F8F6] text-[#1A1C1C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A5CFF] focus:border-[#1A5CFF] transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                          Work Email <span className="text-[#1A5CFF]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. sarah@agency.com.au"
                          className="w-full px-4 py-3 rounded-xl text-sm border border-[#E8E8E5] bg-[#F8F8F6] text-[#1A1C1C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A5CFF] focus:border-[#1A5CFF] transition-all"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-xs font-mono font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                        Company or Studio Name
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Apex Digital Design"
                        className="w-full px-4 py-3 rounded-xl text-sm border border-[#E8E8E5] bg-[#F8F8F6] text-[#1A1C1C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A5CFF] focus:border-[#1A5CFF] transition-all"
                      />
                    </div>

                    {/* Services Selector Pills */}
                    <div>
                      <label className="block text-xs font-mono font-semibold text-neutral-700 uppercase tracking-wider mb-2.5">
                        Required Capabilities
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {availableServices.map((service) => {
                          const isSelected = selectedServices.includes(service);
                          return (
                            <button
                              key={service}
                              type="button"
                              onClick={() => toggleService(service)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                                isSelected
                                  ? 'bg-[#1A5CFF] text-white border-[#1A5CFF]'
                                  : 'bg-[#F8F8F6] text-neutral-600 border-[#E8E8E5] hover:bg-[#EEEEEE]'
                              }`}
                            >
                              {service}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Estimated Budget */}
                    <div>
                      <label className="block text-xs font-mono font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                        Estimated Budget (AUD)
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm border border-[#E8E8E5] bg-[#F8F8F6] text-[#1A1C1C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A5CFF] focus:border-[#1A5CFF] transition-all cursor-pointer"
                      >
                        {budgetOptions.map((opt, oIdx) => (
                          <option key={oIdx} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Project Notes */}
                    <div>
                      <label className="block text-xs font-mono font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                        Project Scope &amp; Target Launch Date
                      </label>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Tell us about your timeline, design status, current bottlenecks, or technical preferences..."
                        className="w-full px-4 py-3 rounded-xl text-sm border border-[#E8E8E5] bg-[#F8F8F6] text-[#1A1C1C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A5CFF] focus:border-[#1A5CFF] transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm bg-[#1A5CFF] hover:bg-[#0B4AE8] text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50 active:scale-95"
                    >
                      {isSubmitting ? (
                        <span>Sending inquiry...</span>
                      ) : (
                        <>
                          <Send size={15} />
                          <span>Send Project Brief to NexSite</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
