/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — Privacy Policy Modal
 */

import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
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
          <ShieldCheck size={16} />
          <span>AUSTRALIAN PRIVACY PRINCIPLES COMPLIANCE</span>
        </div>

        <h3 className="text-2xl font-bold font-['Space_Grotesk',sans-serif] text-[#1A1C1C] mb-1">
          Privacy Policy
        </h3>
        <p className="text-xs text-[#8E8E8A] font-mono mb-6">
          Entity: NexSite Digital Agency Pty Ltd (ABN 82 910 248 193) // Last updated: January 2026
        </p>

        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-[#444748]">
          <div>
            <h4 className="font-bold text-[#1A1C1C] mb-1">1. Australian Privacy Act 1988 Commitment</h4>
            <p>
              NexSite adheres strictly to the Australian Privacy Principles (APPs) contained in the Privacy Act 1988 (Cth). We collect personal and enterprise information exclusively to provide digital engineering, architecture delivery, sprint communication, and invoicing services.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#1A1C1C] mb-1">2. Information We Collect</h4>
            <p>
              When requesting quotes or purchasing packages, we collect your name, business email, organization name, phone/WhatsApp number, project briefs, and repository/design links. We do not sell, rent, or monetize partner information under any circumstances.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#1A1C1C] mb-1">3. Payment &amp; Card Data Security</h4>
            <p>
              NexSite does not store credit card credentials, CVVs, or full payment secrets on our web servers. Payments are processed through PCI-DSS Tier-1 certified gateways (Melio Payments &amp; PayPal) with 256-bit TLS encryption.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#1A1C1C] mb-1">4. Confidentiality &amp; Client Data Retention</h4>
            <p>
              All Figma files, code repositories, API tokens, and business models shared during your sprint are protected under strict confidentiality. Client sprint assets are archived securely or purged upon request following sprint handover.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#1A1C1C] mb-1">5. Contact Our Privacy Officer</h4>
            <p>
              Inquiries regarding privacy compliance or data access requests should be directed to{' '}
              <a href="mailto:info@nexsiteau.com" className="text-[#1A5CFF] underline">
                info@nexsiteau.com
              </a>
              .
            </p>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-[#E8E8E5] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-xs font-mono font-bold bg-[#1A1C1C] hover:bg-black text-white transition-colors cursor-pointer"
          >
            Close Policy
          </button>
        </div>
      </div>
    </div>
  );
};
