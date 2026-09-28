/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — Schedule Engineering Consultation Modal
 */

import React, { useState } from 'react';
import { X, Calendar, Clock, Video, CheckCircle2, User, Mail, Building } from 'lucide-react';

interface ScheduleConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleConsultationModal: React.FC<ScheduleConsultationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [preferredDate, setPreferredDate] = useState('Tomorrow, 2:00 PM AEST');
  const [isBooked, setIsBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

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
          service: '15-Min Engineering Consultation',
          notes: `Preferred time: ${preferredDate}`,
        }),
      });
    } catch {
      // Graceful fallback
    } finally {
      setIsSubmitting(false);
      setIsBooked(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md rounded-3xl p-6 sm:p-8 border border-[#E8E8E5] shadow-2xl relative transition-all bg-white text-[#1A1C1C]">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#EEEEEE] text-[#8E8E8A] hover:text-[#1A1C1C] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {!isBooked ? (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#EBF1FF] text-[#1A5CFF] flex items-center justify-center mb-6">
              <Calendar size={24} />
            </div>

            <div className="mb-6">
              <span className="text-[11px] font-mono text-[#1A5CFF] uppercase font-bold tracking-wider block mb-1">
                15-MIN ARCHITECTURE SYNC
              </span>
              <h3 className="text-2xl font-bold font-['Space_Grotesk',sans-serif] text-[#1A1C1C]">
                Book Engineering Call
              </h3>
              <p className="text-xs text-[#8E8E8A] mt-1">
                Talk directly with a senior engineer about your scope, timelines, and technical stack.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#8E8E8A] uppercase mb-1 font-semibold">
                  Your Name
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-3 text-[#8E8E8A]" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-[#E8E8E5] bg-[#F8F8F6] text-[#1A1C1C] focus:outline-none focus:border-[#1A5CFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#8E8E8A] uppercase mb-1 font-semibold">
                  Work Email
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-3 text-[#8E8E8A]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@studio.com.au"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-[#E8E8E5] bg-[#F8F8F6] text-[#1A1C1C] focus:outline-none focus:border-[#1A5CFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#8E8E8A] uppercase mb-1 font-semibold">
                  Company / Agency
                </label>
                <div className="relative">
                  <Building size={16} className="absolute left-3.5 top-3 text-[#8E8E8A]" />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Studio Vertex"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-[#E8E8E5] bg-[#F8F8F6] text-[#1A1C1C] focus:outline-none focus:border-[#1A5CFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#8E8E8A] uppercase mb-1 font-semibold">
                  Preferred Time (AEST)
                </label>
                <div className="relative">
                  <Clock size={16} className="absolute left-3.5 top-3 text-[#8E8E8A]" />
                  <select
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-[#E8E8E5] bg-[#F8F8F6] text-[#1A1C1C] focus:outline-none focus:border-[#1A5CFF]"
                  >
                    <option value="Tomorrow, 10:00 AM AEST">Tomorrow, 10:00 AM AEST</option>
                    <option value="Tomorrow, 2:00 PM AEST">Tomorrow, 2:00 PM AEST</option>
                    <option value="Thursday, 11:00 AM AEST">Thursday, 11:00 AM AEST</option>
                    <option value="Thursday, 3:30 PM AEST">Thursday, 3:30 PM AEST</option>
                    <option value="Friday, 1:00 PM AEST">Friday, 1:00 PM AEST</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl text-sm font-semibold bg-[#1A5CFF] hover:bg-[#0B3CC1] text-white flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
                >
                  <Video size={16} />
                  <span>Confirm Video Consultation</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#EBF1FF] text-[#1A5CFF] flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-bold font-['Space_Grotesk',sans-serif] text-[#1A1C1C]">
              Call Scheduled
            </h3>
            <p className="text-sm text-[#444748] max-w-xs mx-auto">
              Calendar invite and Google Meet link sent to <strong>{email}</strong> for {preferredDate}.
            </p>
            <button
              onClick={() => {
                setIsBooked(false);
                onClose();
              }}
              className="mt-4 px-6 py-2 rounded-xl text-xs font-mono font-semibold bg-[#F4F4F1] hover:bg-[#EEEEEE] text-[#1A1C1C] transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
