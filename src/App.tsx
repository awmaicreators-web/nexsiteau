/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NexSite — Official Application Engine (Exact Original NexSite Structure)
 */

import React, { useState, useEffect } from 'react';
import { PackageTierId, CaseStudy } from './types';

// Global Universal Header
import { GlobalHeader } from './components/GlobalHeader';

// Original Homepage Sections
import { HeroSection } from './components/HeroSection';
import { HowWeWork } from './components/HowWeWork';
import { CoreServices } from './components/CoreServices';
import { WordMarquee } from './components/WordMarquee';
import { CaseStudies } from './components/CaseStudies';
import { PlatformSteps } from './components/PlatformSteps';
import { ProductionRigor } from './components/ProductionRigor';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Packages & Checkout View (PRESERVED UNCHANGED)
import { InstantCheckoutPage } from './components/InstantCheckoutPage';
import { CheckoutFaqs } from './components/CheckoutFaqs';

// Modals
import { ScheduleConsultationModal } from './components/ScheduleConsultationModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { TermsOfServiceModal } from './components/TermsOfServiceModal';

// NexSite AI Advisor Chatbot
import { ChatBot } from './components/ChatBot';

// Customer Landing Page Route (/website-design)
import { CustomerLandingPage } from './components/CustomerLandingPage';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'packages' | 'landing'>('home');
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
      } else if (path.startsWith('/website-design') || path.startsWith('/landing')) {
        setCurrentView('landing');
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
    view: 'home' | 'packages' | 'services' | 'work' | 'contact' | 'landing',
    sectionId?: string
  ) => {
    if (view === 'packages') {
      setCurrentView('packages');
      window.history.pushState({}, '', '/packages');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'landing') {
      setCurrentView('landing');
      window.history.pushState({}, '', '/website-design');
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
      {currentView === 'landing' ? (
        <CustomerLandingPage
          onBackToHome={() => handleNavigate('home')}
          onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
          onOpenTerms={() => setIsTermsModalOpen(true)}
        />
      ) : (
        <>
          {/* Universal Header across Home and Packages */}
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
              /* REFINED HOMEPAGE FLOW — COMETTECH-INSPIRED COMPOSITION */
              <div className="animate-fadeIn">
                {/* 1. Hero Section: Refined typography & dark atmospheric space backdrop */}
                <HeroSection
                  onStartClick={() => handleStartCheckout('high-growth')}
                  onExploreWorkClick={() => handleNavigate('home', 'how-we-work')}
                />

                {/* 2. 01 // How We Work: Large interactive benefits panel */}
                <HowWeWork
                  onExplorePackages={() => handleStartCheckout('high-growth')}
                />

                {/* 3. 02 // Core Services: Interactive service explorer with mobile accordion */}
                <CoreServices
                  onSelectService={(_serviceName) => {
                    handleStartCheckout('high-growth');
                  }}
                />

                {/* 4. Word Marquee: Controlled, slim transition strip */}
                <WordMarquee />

                {/* 5. 03 // Case Studies: Image-led portfolio (1 Featured + 2 Supporting) */}
                <CaseStudies
                  onSelectCase={(_study: CaseStudy) => {}}
                />

                {/* 6. 04 // Our Process: Vertical timeline */}
                <PlatformSteps
                  onStartProject={() => handleStartCheckout('high-growth')}
                />

                {/* 7. The NexSite Standard: Spacious 3-column quality section */}
                <ProductionRigor />

                {/* 8. 05 // Testimonials: Varied cards with subtle desktop offsets */}
                <Testimonials />

                {/* 9. 06 // Contact & Advisory: Two-column brief submission */}
                <ContactSection
                  onOpenScheduleModal={() => setIsScheduleModalOpen(true)}
                />
              </div>
            )}
          </main>

          {/* Footer Component */}
          <Footer
            onNavigate={(view, id) => {
              if (view.includes('packages')) handleNavigate('packages');
              else if (view.includes('website-design') || view.includes('landing')) handleNavigate('landing');
              else handleNavigate('home', id);
            }}
            onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
            onOpenTerms={() => setIsTermsModalOpen(true)}
            onOpenContact={() => setIsScheduleModalOpen(true)}
          />

          {/* Modals & Chatbot (Home & Packages) */}
          <ScheduleConsultationModal
            isOpen={isScheduleModalOpen}
            onClose={() => setIsScheduleModalOpen(false)}
          />
          <ChatBot
            onNavigate={(view, id) => {
              if (view.includes('packages')) handleNavigate('packages');
              else if (view.includes('website-design') || view.includes('landing')) handleNavigate('landing');
              else handleNavigate('home', id);
            }}
            onOpenContact={() => setIsScheduleModalOpen(true)}
          />
        </>
      )}

      {/* Global Modals for All Views (Including /website-design) */}
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
      <TermsOfServiceModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
    </div>
  );
}
