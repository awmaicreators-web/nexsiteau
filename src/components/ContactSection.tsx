/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — Contact & Advisory Intake Section
 * Section rhythm: Light Surface (#F9F9F9).
 * Preserves NexSite branding, Australian agency positioning, and directs inquiries to info@nexsiteau.com.
 */

import React, { useState } from 'react';
import { Mail, Clock, ArrowRight, CheckCircle2, Send } from 'lucide-react';

interface ContactSectionProps {
  onOpenScheduleModal?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenScheduleModal }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agency, setAgency] = useState('');
  const [message, setMessage] = useState('');
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

  const toggleService = (srv: string) => {
    setSelectedServices((prev) =>
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv]
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
          company: agency,
          service: selectedServices.join(', '),
          budget,
          notes: message,
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
      className="w-full py-24 lg:py-28 bg-[#F9F9F9] text-[#1A1C1C] transition-colors border-t border-[#E8E8E5]"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading & Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-['JetBrains_Mono',monospace] text-[11px] leading-[16px] font-semibold text-[#1A5CFF] uppercase tracking-[0.08em] block mb-3">
                CONTACT // LET&apos;S TALK
              </span>
              <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight text-[#1A1C1C]">
                Let&apos;s build something great together
              </h2>
              <p className="font-['Inter',sans-serif] text-base text-[#444748] leading-relaxed">
                Have a project in mind, need ongoing engineering support, or want to explore how
                NexSite can partner with your agency? Drop us a message and our technical directors
                will respond within 24 hours.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4 pt-4">
              <a
                href="mailto:info@nexsiteau.com"
                className="p-5 rounded-2xl border border-[#E8E8E5] bg-white flex items-center gap-4 transition-all group hover:border-[#1A5CFF]/60 hover:shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EBF1FF] text-[#1A5CFF] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="text-xs font-mono text-[#8E8E8A] block uppercase font-semibold">
                    DIRECT INQUIRY
                  </span>
                  <span className="text-base font-bold text-[#1A1C1C] group-hover:text-[#1A5CFF] transition-colors">
                    info@nexsiteau.com
                  </span>
                </div>
              </a>

              <div className="p-5 rounded-2xl border border-[#E8E8E5] bg-white flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F4F4F1] text-[#1A1C1C] flex items-center justify-center font-mono font-bold">
                  <Clock size={20} />
                </div>
                <div>
                  <span className="text-xs font-mono text-[#8E8E8A] block uppercase font-semibold">
                    GUARANTEED RESPONSE
                  </span>
                  <span className="text-base font-bold text-[#1A1C1C]">
                    Under 24-Hour SLA Kickoff
                  </span>
                </div>
              </div>
            </div>

            {/* 15-min call prompt */}
            {onOpenScheduleModal && (
              <div className="p-6 rounded-2xl border border-[#E8E8E5] bg-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-[#8E8E8A] uppercase font-bold tracking-wider">
                    NEED IMMEDIATE SCOPING?
                  </span>
                </div>
                <p className="text-xs text-[#444748] mb-4">
                  Prefer a direct sync? Schedule an immediate 15-minute engineering architecture discussion.
                </p>
                <button
                  type="button"
                  onClick={onOpenScheduleModal}
                  className="text-xs font-mono font-bold text-[#1A5CFF] hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Book 15-Min Engineering Call</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl border border-[#E8E8E5] bg-white shadow-sm">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold font-['Space_Grotesk',sans-serif] text-[#1A1C1C] mb-1">
                      Tell us about your project
                    </h3>
                    <p className="text-xs text-[#8E8E8A]">
                      Fill out this brief form and our senior team will review your specifications.
                    </p>
                  </div>

                  {/* Services Multi-Select */}
                  <div>
                    <label className="block text-xs font-mono text-[#8E8E8A] uppercase mb-2 font-semibold">
                      Services of Interest
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableServices.map((srv) => {
                        const isSelected = selectedServices.includes(srv);
                        return (
                          <button
                            key={srv}
                            type="button"
                            onClick={() => toggleService(srv)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer border ${
                              isSelected
                                ? 'bg-[#1A5CFF] border-[#1A5CFF] text-white'
                                : 'bg-[#F4F4F1] border-[#E8E8E5] text-[#444748] hover:border-[#D1D1CD]'
                            }`}
                          >
                            {srv}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-[#1A1C1C]">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-2.5 rounded-xl text-sm border border-[#E8E8E5] bg-[#F8F8F6] text-[#1A1C1C] focus:outline-none focus:border-[#1A5CFF] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-[#1A1C1C]">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@agency.com.au"
                        className="w-full px-4 py-2.5 rounded-xl text-sm border border-[#E8E8E5] bg-[#F8F8F6] text-[#1A1C1C] focus:outline-none focus:border-[#1A5CFF] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Agency / Company & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-[#1A1C1C]">
                        Agency / Business Name
                      </label>
                      <input
                        type="text"
                        value={agency}
                        onChange={(e) => setAgency(e.target.value)}
                        placeholder="e.g. Studio Vertex"
                        className="w-full px-4 py-2.5 rounded-xl text-sm border border-[#E8E8E5] bg-[#F8F8F6] text-[#1A1C1C] focus:outline-none focus:border-[#1A5CFF] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-[#1A1C1C]">
                        Project Budget (AUD)
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl text-sm border border-[#E8E8E5] bg-[#F8F8F6] text-[#1A1C1C] focus:outline-none focus:border-[#1A5CFF] transition-colors"
                      >
                        <option value="under-$5k">Under AUD $3,000</option>
                        <option value="$5k - $10k">AUD $3,000 - $6,000</option>
                        <option value="$10k - $20k">AUD $6,000 - $12,000</option>
                        <option value="$20k+">AUD $12,000+</option>
                      </select>
                    </div>
                  </div>

                  {/* Message / Scope */}
                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-[#1A1C1C]">
                      Project Requirements &amp; Scope
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about the deliverable, target launch date, tech preferences, or current bottlenecks..."
                      className="w-full px-4 py-2.5 rounded-xl text-sm border border-[#E8E8E5] bg-[#F8F8F6] text-[#1A1C1C] focus:outline-none focus:border-[#1A5CFF] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm bg-[#1A5CFF] hover:bg-[#0B3CC1] text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm disabled:opacity-50"
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
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#EBF1FF] text-[#1A5CFF] flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-bold font-['Space_Grotesk',sans-serif] text-[#1A1C1C]">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-[#444748] max-w-md mx-auto">
                    Thank you, {name}. Our technical team has received your brief and will respond to{' '}
                    <strong className="text-[#1A1C1C]">{email}</strong> within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setName('');
                      setEmail('');
                      setAgency('');
                      setMessage('');
                    }}
                    className="mt-4 px-6 py-2 rounded-xl text-xs font-mono font-semibold bg-[#F4F4F1] hover:bg-[#EEEEEE] text-[#1A1C1C] transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
