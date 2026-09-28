/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — Terms of Service & SLA Modal
 */

import React from 'react';
import { X, Scale } from 'lucide-react';

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsOfServiceModal: React.FC<TermsOfServiceModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border border-[#E8E8E5] shadow-2xl relative transition-all bg-white text-[#1A1C1C]">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#EEEEEE] text-[#8E8E8A] hover:text-[#1A1C1C] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 mb-2 text-[#1A5CFF] text-xs font-mono font-bold">
          <Scale size={16} />
          <span>AGENCY SLA &amp; INTELLECTUAL PROPERTY</span>
        </div>

        <h3 className="text-2xl font-bold font-['Space_Grotesk',sans-serif] text-[#1A1C1C] mb-1">
          Terms of Service &amp; Mutual NDA
        </h3>
        <p className="text-xs text-[#8E8E8A] font-mono mb-6">
          Contracting with: NexSite Digital Agency Pty Ltd (ABN 82 910 248 193)
        </p>

        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-[#444748]">
          <div>
            <h4 className="font-bold text-[#1A1C1C] mb-1">1. 100% Code &amp; IP Ownership</h4>
            <p>
              Upon settlement of sprint invoices, all bespoke source code, UI/UX design deliverables, custom components, database schemas, and documentation are transferred 100% to the client. NexSite retains zero proprietary hold or licensing encumbrance on client deliverables.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#1A1C1C] mb-1">2. White-Label &amp; Non-Disclosure Protocol</h4>
            <p>
              NexSite operates under strict mutual non-disclosure by default. We will never publish client projects, mention partner brand names, or publicly showcase white-label agency work without explicit prior written authorization.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#1A1C1C] mb-1">3. Sprint Timelines &amp; Delivery SLA</h4>
            <p>
              Sprint durations begin once initial intake assets and design sign-offs are deposited in our shared workspace. If NexSite breaches an agreed sprint milestone without mutually documented scope adjustments, clients are protected under our On-Time SLA Guarantee.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#1A1C1C] mb-1">4. Payment Schedules &amp; Invoicing</h4>
            <p>
              Fixed package sprints require either a 50% kickoff deposit with the balance due upon staging approval, or upfront payment receiving a 5% prepayment incentive. All pricing is quoted in Australian Dollars (AUD) and includes Australian Goods &amp; Services Tax (GST).
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#1A1C1C] mb-1">5. Governing Law</h4>
            <p>
              These terms are governed by and construed in accordance with the laws of Victoria and the Commonwealth of Australia. Inquiries: <a href="mailto:info@nexsiteau.com" className="text-[#1A5CFF] underline">info@nexsiteau.com</a>.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-[#E8E8E5] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-xs font-mono font-bold bg-[#1A1C1C] hover:bg-black text-white transition-colors cursor-pointer"
          >
            Acknowledge &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
