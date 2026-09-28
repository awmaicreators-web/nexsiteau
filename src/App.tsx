/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — Official Application Engine
 * Strict compliance with the Master Specification:
 * - Single source of truth visual system: Black + White + Cream (#F8F8F6) + Electric Blue (#1A5CFF).
 * - Exact design-specified section background rhythm (Hero: Black, How We Work: Light, Services: Light,
 *   Case Studies: Cream, Platform: Black, Rigor: Cream, Testimonials: Cream, Contact: Light, Footer: Black).
 * - No arbitrary dark-mode toggle or generic AI UI slop.
 * - Universal GlobalHeader across all views.
 * - Secure PayPal & Card checkout with server-side validation and notification dispatch to info@nexsiteau.com.
 */

import React, { useState, useEffect } from 'react';
import { PackageTierId, CaseStudy } from './types';

// Global Universal Header
import { GlobalHeader } from './components/GlobalHeader';

// Approved Page Sections from Source-of-Truth
import { HeroSection } from './components/HeroSection';
import { InteractiveProcessTicker } from './components/InteractiveProcessTicker';
import { HowWeWork } from './components/HowWeWork';
import { CoreServices } from './components/CoreServices';
import { CaseStudies } from './components/CaseStudies';
import { PlatformSteps } from './components/PlatformSteps';
import { ProductionRigor } from './components/ProductionRigor';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Packages & Checkout View
import { InstantCheckoutPage } from './components/InstantCheckoutPage';
import { CheckoutFaqs } from './components/CheckoutFaqs';

// Legal & Advisory Modals
import { ScheduleConsultationModal } from './components/ScheduleConsultationModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { TermsOfServiceModal } from './components/TermsOfServiceModal';

// NexSite Gemini AI Advisor Chatbot
import { ChatBot } from './components/ChatBot';

export default function App() {
  // Navigation & View state: 'home' | 'packages'
  const [currentView, setCurrentView] = useState<'home' | 'packages'>('home');
  const [selectedPackageId, setSelectedPackageId] = useState<PackageTierId>('high-growth');

  // Modals state
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  // Handle URL path changes & browser popstate
  useEffect(() => {
    const syncRouteFromPath = () => {
      const path = window.location.pathname;
      if (path.startsWith('/packages') || path.startsWith('/checkout')) {
        setCurrentView('packages');
      } else {
        setCurrentView('home');
      }
    };

    syncRouteFromPath();
    window.addEventListener('popstate', syncRouteFromPath);
    return () => window.removeEventListener('popstate', syncRouteFromPath);
  }, []);

  // Universal Navigation router
  const handleNavigate = (
    view: 'home' | 'packages' | 'services' | 'work' | 'contact',
    sectionId?: string
  ) => {
    if (view === 'packages') {
      setCurrentView('packages');
      window.history.pushState({}, '', '/packages');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentView('home');
      window.history.pushState({}, '', '/');

      // Map view shortcuts to section anchors
      let targetId = sectionId;
      if (!targetId) {
        if (view === 'services') targetId = 'services';
        else if (view === 'work') targetId = 'case-studies';
        else if (view === 'contact') targetId = 'contact';
      }

      if (targetId) {
        setTimeout(() => {
          const el = document.getElementById(targetId!);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleStartCheckout = (tierId?: PackageTierId) => {
    if (tierId) {
      setSelectedPackageId(tierId);
    }
    handleNavigate('packages');
  };

  return (
    <div className="min-h-screen font-sans selection:bg-[#2563EB] selection:text-white bg-[#F9F9F9] text-[#1A1C1C]">
      {/* Universal GlobalHeader applied across the entire application */}
      <GlobalHeader
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      <main>
        {currentView === 'packages' ? (
          /* PACKAGES & DIRECT SECURE CHECKOUT VIEW */
          <div className="animate-fadeIn">
            <InstantCheckoutPage
              onBackToHome={() => handleNavigate('home')}
              onNavigateToSection={(id) => handleNavigate('home', id)}
              preselectedPackageId={selectedPackageId}
              onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
              onOpenTerms={() => setIsTermsModalOpen(true)}
              onOpenContact={() => setIsScheduleModalOpen(true)}
            />
            <CheckoutFaqs
              onScheduleCall={() => setIsScheduleModalOpen(true)}
            />
          </div>
        ) : (
          /* HOME PAGE VIEW WITH EXACT SECTION RHYTHM */
          <div className="animate-fadeIn">
            {/* 1. Hero Section (Black #000000) */}
            <HeroSection
              onStartClick={() => handleStartCheckout('high-growth')}
              onExploreWorkClick={() => handleNavigate('home', 'how-we-work')}
            />

            {/* 2. Interactive Process Ticker (Cream #F8F8F6 + Black Ticker #000000) */}
            <InteractiveProcessTicker />

            {/* 3. 01 // How We Work (Light Surface #F9F9F9) */}
            <HowWeWork
              onExplorePackages={() => handleStartCheckout('high-growth')}
            />

            {/* 4. 02 // Core Services (White #FFFFFF) */}
            <CoreServices
              onSelectService={() => {
                handleStartCheckout('high-growth');
              }}
            />

            {/* 5. 03 // Case Studies (Cream Canvas #F8F8F6) */}
            <CaseStudies
              onSelectCase={(_study: CaseStudy) => {}}
            />

            {/* 6. 04 // Our Platform (Black #000000) */}
            <PlatformSteps />

            {/* 7. The NexSite Standard // Production Rigor (Cream Canvas #F8F8F6) */}
            <ProductionRigor />

            {/* 8. 05 // Client Testimonials (Cream Canvas #F8F8F6) */}
            <Testimonials />

            {/* 9. Contact Section (Light Surface #F9F9F9) */}
            <ContactSection
              onOpenScheduleModal={() => setIsScheduleModalOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Footer (Black #000000) */}
      <Footer
        onNavigate={(path, sectionId) => {
          if (path.includes('packages')) {
            handleNavigate('packages');
          } else {
            handleNavigate('home', sectionId);
          }
        }}
        onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
        onOpenTerms={() => setIsTermsModalOpen(true)}
        onOpenContact={() => setIsScheduleModalOpen(true)}
      />

      {/* Modals */}
      <ScheduleConsultationModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />

      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      <TermsOfServiceModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />

      {/* Multi-turn Gemini AI Advisor Chatbot */}
      <ChatBot
        onNavigate={(path, sectionId) => {
          if (path.includes('packages')) {
            handleNavigate('packages');
          } else {
            handleNavigate('home', sectionId);
          }
        }}
        onOpenContact={() => setIsScheduleModalOpen(true)}
      />
    </div>
  );
}
