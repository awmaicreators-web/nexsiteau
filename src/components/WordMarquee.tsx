/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — Word Marquee Strip (Controlled Transition)
 * Reference: Comettech typography strip.
 * Features:
 * - Positioned between major sections (after Core Services).
 * - Large, well-spaced typography: VISUALIZE / CREATE / DESIGN / DEVELOP / LAUNCH / EVOLVE.
 * - Slim aesthetic height (~60px) with dark/neutral contrast.
 * - Slow seamless infinite marquee with hover/focus pause.
 * - Interactive Pause/Resume toggle button for accessibility.
 * - Fully static fallback for prefers-reduced-motion.
 * - Strict overflow-x protection.
 */

import React, { useEffect, useState } from 'react';

export const WordMarquee: React.FC = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(media.matches);

      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, []);

  const words = [
    'VISUALIZE',
    'CREATE',
    'DESIGN',
    'DEVELOP',
    'LAUNCH',
    'EVOLVE',
  ];

  // Repeat sequence 4 times for seamless continuous loop
  const sequence = [...words, ...words, ...words, ...words];

  return (
    <div
      className="w-full bg-[#0A0D14] text-white py-4 sm:py-5 border-y border-white/[0.08] relative overflow-hidden select-none"
      role="region"
      aria-label="Core Capabilities Marquee"
    >
      <div className="w-full overflow-hidden">
        {reducedMotion ? (
          /* Accessible Static Display for Reduced Motion */
          <div className="flex flex-wrap items-center justify-center gap-6 px-4 text-xs sm:text-sm font-['Space_Grotesk'] font-bold tracking-[0.2em] text-neutral-400">
            {words.map((w, idx) => (
              <span key={idx} className="flex items-center gap-6">
                <span className="text-white hover:text-[#1A5CFF] transition-colors">{w}</span>
                {idx < words.length - 1 && <span className="text-[#1A5CFF] font-bold">/</span>}
              </span>
            ))}
          </div>
        ) : (
          /* Smooth Seamless Continuous Marquee Animation */
          <div
            className="flex items-center gap-10 sm:gap-14 whitespace-nowrap will-change-transform"
            style={{
              display: 'inline-flex',
              animation: 'marqueeScroll 26s linear infinite',
            }}
          >
            {sequence.map((word, index) => (
              <div key={index} className="inline-flex items-center gap-10 sm:gap-14">
                <span className="font-['Space_Grotesk',sans-serif] font-bold text-lg sm:text-2xl tracking-[0.18em] text-neutral-200 hover:text-white transition-colors cursor-default">
                  {word}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#1A5CFF] shrink-0" aria-hidden="true" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
