/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — Scroll Motion & Reveal System (Comettech Inspiration)
 * Restrained, high-performance scroll interactions using IntersectionObserver:
 * - Subtle upward translation (16–28px) and opacity fade.
 * - Consistent duration (600–800ms) with smooth ease-out (cubic-bezier(0.16, 1, 0.3, 1)).
 * - Staggered card reveals with capped delays.
 * - Triggered once per page visit (no repeat hiding on backscroll).
 * - Full prefers-reduced-motion & mobile awareness.
 * - Pure transform & opacity (GPU-accelerated, zero layout shifts).
 */

import React, { useEffect, useRef, useState } from 'react';

export interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
}

/**
 * Custom hook to detect when an element enters the viewport.
 * Triggers once per page visit and cleans up observer immediately.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
): [React.RefObject<T | null>, boolean] {
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px', delay = 0 } = options;
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
    if (!('IntersectionObserver' in window)) return true;
    return false;
  });

  useEffect(() => {
    if (isVisible) return;
    const element = ref.current;
    if (!element) return;

    let timeoutId: number | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          if (delay > 0) {
            timeoutId = window.setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(true);
          }
          observer.unobserve(element);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [delay, threshold, rootMargin, isVisible]);

  return [ref, isVisible];
}

/**
 * Custom hook for desktop-only, subtle hero background scroll parallax.
 * Moves the background ~20–32px down over the hero scroll range.
 * Disabled on mobile and when prefers-reduced-motion is active.
 */
export function useHeroParallax(maxOffset: number = 28): number {
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isMobile = window.innerWidth < 768;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || prefersReduced) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (scrollY <= 900) {
            const progress = Math.min(1, Math.max(0, scrollY / 700));
            // Subtle, restrained vertical shift (0 -> maxOffset px)
            setOffset(progress * maxOffset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [maxOffset]);

  return offset;
}

export interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: 'up' | 'none';
  className?: string;
  style?: React.CSSProperties;
  scale?: boolean; // Subtle scale entrance from 1.025 to 1
  threshold?: number;
  rootMargin?: string;
  as?: React.ElementType;
}

/**
 * Declarative component for wrapping section elements, cards, and headings.
 * Isolates scroll entrance from hover transforms.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  duration = 700,
  distance = 22,
  direction = 'up',
  className = '',
  style = {},
  scale = false,
  threshold = 0.15,
  rootMargin = '0px 0px -40px 0px',
  as: Component = 'div',
}) => {
  const [ref, isVisible] = useScrollReveal<HTMLElement>({
    threshold,
    rootMargin,
    delay,
  });

  const getTransform = () => {
    if (isVisible) {
      return scale ? 'scale(1)' : 'translateY(0)';
    }
    if (scale) {
      return 'scale(1.025)';
    }
    if (direction === 'up') {
      return `translateY(${distance}px)`;
    }
    return 'none';
  };

  const dynamicStyle: React.CSSProperties = {
    ...style,
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
    willChange: isVisible ? 'auto' : 'opacity, transform',
  };

  return (
    <Component ref={ref} className={className} style={dynamicStyle}>
      {children}
    </Component>
  );
};
