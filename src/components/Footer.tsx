/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — Footer Component
 * Section 23: Dark footer with brand mark, navigation, services list,
 * Australian location, contact email, and legal links.
 */

import React from 'react';
import { NexSiteLogo } from './NexSiteLogo';
import { AGENCY_CONFIG } from '../config/agencyConfig';
import { Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string, sectionId?: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPrivacy,
  onOpenTerms,
  onOpenContact,
}) => {
  return (
    <footer className="bg-[#0A0A0A] text-neutral-300 pt-20 pb-12 border-t border-[#1C1C1C]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#1C1C1C]">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <div className="mb-4">
              <NexSiteLogo size="md" themeVariant="dark" />
            </div>
            <p className="text-sm text-[#8E8E8E] max-w-[340px] mb-6 leading-relaxed">
              Modern website development for Australian businesses.
            </p>

            <div className="space-y-2 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#1A5CFF]" />
                <span>Australia Wide (Sydney • Melbourne • Brisbane • Perth)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#1A5CFF]" />
                <a
                  href={`mailto:${AGENCY_CONFIG.brand.contactEmail}`}
                  className="hover:text-white transition-colors"
                >
                  {AGENCY_CONFIG.brand.contactEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#8E8E8E]">
              <li>
                <button
                  onClick={() => onNavigate('/', 'top')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/services', 'services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/packages', 'packages')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/work', 'work')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/process', 'process')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about', 'about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/faq', 'faqs')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-[#8E8E8E]">
              <li>
                <button
                  onClick={() => onNavigate('/services', 'services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Website Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/services', 'services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  eCommerce Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/services', 'services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  WordPress Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/services', 'services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  UI/UX Design
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/services', 'services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Website Redesign
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/services', 'services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Performance Optimization
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/services', 'services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Website Maintenance
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © 2026 NexSite. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={onOpenTerms}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
