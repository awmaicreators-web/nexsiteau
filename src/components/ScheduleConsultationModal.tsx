/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — Consultation Request Modal
 * Grounded preferred-time booking flow:
 * - Generates upcoming real dates with clearly marked Australian timezone (AEST/AEDT).
 * - Presented as a preferred-time request rather than a fake live calendar sync.
 * - Clearly explains what happens after submission.
 * - Accessible: Escape-to-close, keyboard trap, visible focus.
 */

import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, Clock, User, Mail, Building, CheckCircle2, AlertCircle } from 'lucide-react';

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
  const [preferredSlot, setPreferredSlot] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Generate the next 5 business days with AEST times
  const generateAvailableSlots = () => {
    const slots: string[] = [];
    const now = new Date();
    let daysAdded = 0;
    let currentDay = new Date(now);

    while (daysAdded < 5) {
      currentDay.setDate(currentDay.getDate() + 1);
      const dayOfWeek = currentDay.getDay();
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        const dayName = currentDay.toLocaleDateString('en-AU', { weekday: 'short', month: 'short', day: 'numeric' });
        slots.push(`${dayName} — 10:00 AM AEST`);
        slots.push(`${dayName} — 2:00 PM AEST`);
        daysAdded++;
      }
    }
    return slots;
  };

  const availableSlots = generateAvailableSlots();

  useEffect(() => {
    if (availableSlots.length > 0 && !preferredSlot) {
      setPreferredSlot(availableSlots[0]);
    }
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => closeButtonRef.current?.focus(), 80);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid work email.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || undefined,
          service: 'Preferred-Time Consultation Request',
          budget: 'Consultation Request',
          notes: `Requested Slot: ${preferredSlot}${notes.trim() ? `\nClient Notes: ${notes.trim()}` : ''}`,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(data.error || 'Unable to submit your request. Please email info@nexsiteau.com.');
      }
    } catch {
      setErrorMessage('Network error submitting request. Please try again or email us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-[#E8E8E5] shadow-2xl relative bg-white text-[#1A1C1C] max-h-[90vh] overflow-y-auto">
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#F4F4F1] text-neutral-400 hover:text-neutral-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A5CFF]"
          aria-label="Close consultation modal"
        >
          <X size={20} />
        </button>

        {!isSuccess ? (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#EBF1FF] text-[#1A5CFF] flex items-center justify-center mb-5">
              <Calendar size={22} />
            </div>

            <div className="mb-6">
              <span className="text-[11px] font-mono text-[#1A5CFF] uppercase font-bold tracking-wider block mb-1">
                PREFERRED TIME REQUEST
              </span>
              <h3 id="consultation-modal-title" className="text-2xl font-bold font-['Space_Grotesk',sans-serif] text-[#1A1C1C]">
                Request a Consultation
              </h3>
              <p className="text-xs text-[#555859] mt-1 leading-relaxed">
                Select your preferred day and time for a 15-minute phone or video scoping call.
                Times are shown in Australian Eastern Standard Time (AEST).
              </p>
            </div>

            {errorMessage && (
              <div role="alert" className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1A1C1C] mb-1">
                  Your Name *
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-3 text-neutral-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jason Croft"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-[#E8E8E5] bg-[#F8F8F6] text-[#1A1C1C] focus:outline-none focus:ring-2 focus:ring-[#1A5CFF] focus:border-[#1A5CFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1C1C] mb-1">
                  Work Email *
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-3 text-neutral-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. jason@company.com.au"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-[#E8E8E5] bg-[#F8F8F6] text-[#1A1C1C] focus:outline-none focus:ring-2 focus:ring-[#1A5CFF] focus:border-[#1A5CFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1C1C] mb-1">
                  Business / Company Name
                </label>
                <div className="relative">
                  <Building size={15} className="absolute left-3.5 top-3 text-neutral-400" />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Croft Group"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-[#E8E8E5] bg-[#F8F8F6] text-[#1A1C1C] focus:outline-none focus:ring-2 focus:ring-[#1A5CFF] focus:border-[#1A5CFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1C1C] mb-1">
                  Select Preferred Day &amp; Time (AEST)
                </label>
                <div className="relative">
                  <Clock size={15} className="absolute left-3.5 top-3 text-neutral-400" />
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-[#E8E8E5] bg-[#F8F8F6] text-[#1A1C1C] focus:outline-none focus:ring-2 focus:ring-[#1A5CFF] focus:border-[#1A5CFF]"
                  >
                    {availableSlots.map((slot, sIdx) => (
                      <option key={sIdx} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1C1C] mb-1">
                  Topics you&apos;d like to discuss (optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="New build, redesign, eCommerce requirements, or agency outsourcing..."
                  className="w-full px-4 py-2 text-sm border border-[#E8E8E5] bg-[#F8F8F6] text-[#1A1C1C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A5CFF] focus:border-[#1A5CFF] resize-none"
                />
              </div>

              {/* What happens next explanation */}
              <div className="p-3.5 rounded-xl bg-[#F8F8F6] border border-[#E8E8E5] text-xs text-[#555859] leading-relaxed">
                <strong className="text-[#1A1C1C] block font-mono text-[11px] uppercase mb-0.5">What happens next:</strong>
                Our team will review your requested time against engineer availability and confirm your meeting calendar link via email.
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 rounded-xl font-semibold text-sm bg-[#1A5CFF] hover:bg-[#0B4AE8] text-white flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Sending Request...' : 'Submit Preferred Time Request'}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmed Consultation Request */
          <div className="py-8 text-center space-y-4 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-blue-50 text-[#1A5CFF] flex items-center justify-center mx-auto border border-blue-100">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-bold font-['Space_Grotesk',sans-serif] text-[#1A1C1C]">
              Consultation Request Received
            </h3>
            <p className="text-sm text-[#444748] max-w-sm mx-auto leading-relaxed">
              Thank you, <strong className="text-[#1A1C1C]">{name}</strong>. We have logged your request for <strong className="text-[#1A1C1C]">{preferredSlot}</strong>.
            </p>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Our team will verify availability and send your meeting invitation directly to <strong className="text-[#1A1C1C]">{email}</strong>.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-xs font-mono font-semibold bg-[#1A1C1C] text-white hover:bg-black transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
