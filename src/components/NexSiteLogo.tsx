/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite Official Logo Component
 * Pixel-perfect SVG reproduction of the uploaded NexSite brand mark
 * (blue rounded squircle with crisp 4-point white star + modern wordmark: 24px, 300 weight, #FFFFFF)
 */

import React from 'react';

interface NexSiteLogoProps {
  className?: string;
  themeVariant?: 'dark' | 'light' | 'auto';
  showWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const NexSiteLogo: React.FC<NexSiteLogoProps> = ({
  className = '',
  themeVariant = 'auto',
  showWordmark = true,
  size = 'md',
  onClick,
}) => {
  // Dimensions
  const iconSize = size === 'sm' ? 28 : size === 'lg' ? 40 : 32;

  // Wordmark color based on theme
  const wordmarkColorClass =
    themeVariant === 'dark'
      ? 'text-white'
      : themeVariant === 'light'
      ? 'text-[#0A0A0A]'
      : 'text-neutral-950 dark:text-white';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2 select-none transition-transform active:scale-98 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      role={onClick ? 'button' : 'banner'}
      aria-label="NexSite Logo"
    >
      {/* NexSite Brand Mark Icon: height 32px, width 32px */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="nexsiteBrandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A62FF" />
            <stop offset="100%" stopColor="#0E48D6" />
          </linearGradient>
          <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#0E48D6" floodOpacity="0.25" />
          </filter>
        </defs>
        
        {/* Blue Squircle */}
        <rect
          width="48"
          height="48"
          rx="13.5"
          fill="url(#nexsiteBrandGradient)"
          filter="url(#softGlow)"
        />
        
        {/* 4-Point White Sparkle Star */}
        <path
          d="M24 7.5 C24 16.3 31.7 24 40.5 24 C31.7 24 24 31.7 24 40.5 C24 31.7 16.3 24 7.5 24 C16.3 24 24 16.3 24 7.5 Z"
          fill="#FFFFFF"
        />
      </svg>

      {/* Typography: "Nexsite", 24px, font-weight 300, -0.01em tracking */}
      {showWordmark && (
        <span
          className={`font-['Inter','Avenir_Next',system-ui,sans-serif] text-[24px] font-[300] tracking-[-0.01em] leading-none ${wordmarkColorClass} transition-colors duration-200`}
        >
          Nexsite
        </span>
      )}
    </div>
  );
};
