/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — 02 // Core Services
 * Section rhythm: Light Surface (#F9F9F9).
 * Monochrome icons (black / grey, electric blue on hover).
 * Scannable 8-card capability matrix.
 */

import React from 'react';
import { CORE_SERVICES } from '../data/agencyData';
import {
  Code,
  PenTool,
  Server,
  ShoppingBag,
  Wrench,
  Users,
  Gauge,
  Globe,
  ArrowRight,
} from 'lucide-react';

interface CoreServicesProps {
  onSelectService?: (serviceName: string) => void;
}

export const CoreServices: React.FC<CoreServicesProps> = ({ onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code size={20} />;
      case 'draw':
        return <PenTool size={20} />;
      case 'dns':
        return <Server size={20} />;
      case 'shopping_bag':
        return <ShoppingBag size={20} />;
      case 'build':
        return <Wrench size={20} />;
      case 'groups':
        return <Users size={20} />;
      case 'speed':
        return <Gauge size={20} />;
      case 'travel_explore':
        return <Globe size={20} />;
      default:
        return <Code size={20} />;
    }
  };

  return (
    <section
      id="services"
      className="w-full py-24 lg:py-28 bg-[#FFFFFF] text-[#1A1C1C] transition-colors border-t border-[#E8E8E5]"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <span className="font-['JetBrains_Mono',monospace] text-[11px] leading-[16px] font-semibold text-[#1A5CFF] uppercase tracking-[0.08em] block mb-3">
            02 // CORE SERVICES
          </span>
          <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl lg:text-[48px] lg:leading-[56px] font-bold tracking-tight text-[#1A1C1C] mb-4">
            Everything your agency needs to deliver better, faster
          </h2>
          <p className="font-['Inter',sans-serif] text-base lg:text-[18px] lg:leading-[28px] text-[#444748]">
            We follow a structured design and engineering approach that focuses on clarity,
            usability, and real user behavior. From defining user personas to mapping journeys and
            wireframing, every step is planned to ensure the final product is intuitive and aligned
            with business goals.
          </p>
        </div>

        {/* 8-Card Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_SERVICES.map((srv) => (
            <div
              key={srv.num}
              onClick={() => onSelectService?.(srv.title)}
              className="p-8 rounded-2xl bg-[#F8F8F6] border border-[#E8E8E5] transition-all duration-200 flex flex-col justify-between group hover:-translate-y-1 hover:border-[#1A5CFF] hover:bg-white hover:shadow-md cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] font-mono text-[#8E8E8A] group-hover:text-[#1A5CFF] transition-colors">
                    CAPABILITY // {srv.num}
                  </span>
                  <div className="text-[#444748] group-hover:text-[#1A5CFF] transition-colors">
                    {getIcon(srv.icon)}
                  </div>
                </div>

                <h3 className="text-lg font-bold font-['Inter',sans-serif] text-[#1A1C1C] mb-2 group-hover:text-[#1A5CFF] transition-colors">
                  {srv.title}
                </h3>
                <p className="text-sm font-['Inter',sans-serif] text-[#8E8E8A] leading-relaxed">
                  {srv.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 flex items-center justify-between border-t border-[#E8E8E5] group-hover:border-[#1A5CFF]/20 transition-colors">
                <span className="text-xs font-mono text-[#8E8E8A] group-hover:text-[#444748] transition-colors">
                  {srv.tag}
                </span>
                <ArrowRight
                  size={14}
                  className="text-[#1A5CFF] transform group-hover:translate-x-1 transition-transform"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
