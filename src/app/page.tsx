'use client';

import React, { useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import ServicesSection from '@/components/landing/ServicesSection';
import BusinessCategoriesSection from '@/components/landing/BusinessCategoriesSection';
import TemplatesSection from '@/components/landing/TemplatesSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import PlatformFeaturesSection from '@/components/landing/PlatformFeaturesSection';
import PricingSection from '@/components/landing/PricingSection';
import FAQSection from '@/components/landing/FAQSection';
import FinalCTASection from '@/components/landing/FinalCTASection';
import ContactSupportSection from '@/components/landing/ContactSupportSection';
import Footer from '@/components/landing/Footer';
import DemoVideoSection from '@/components/home/DemoVideoSection';
import { X } from 'lucide-react';

export default function LandingPage() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-[#10183F] font-sans selection:bg-[#174BFF] selection:text-white antialiased">
      
      {/* SECTION 1 — NAVIGATION BAR */}
      <Navbar />

      <main>
        {/* SECTION 2 — HERO SECTION */}
        <HeroSection onWatchDemo={() => setDemoModalOpen(true)} />

        {/* SECTION 3 — SERVICES OVERVIEW */}
        <ServicesSection />

        {/* SECTION 4 — BUSINESS CATEGORIES */}
        <BusinessCategoriesSection />

        {/* SECTION 5 — WEBSITE TEMPLATES */}
        <TemplatesSection />

        {/* SECTION 6 — HOW IT WORKS */}
        <HowItWorksSection />

        {/* SECTION 7 — PLATFORM FEATURES */}
        <PlatformFeaturesSection />

        {/* SECTION 8 — PRICING PLANS */}
        <PricingSection />

        {/* SECTION 10 — FREQUENTLY ASKED QUESTIONS */}
        <FAQSection />

        {/* SECTION 11 — FINAL CALL TO ACTION */}
        <FinalCTASection onWatchHowItWorks={() => setDemoModalOpen(true)} />

        {/* SECTION 12 — CONTACT & SUPPORT */}
        <ContactSupportSection />
      </main>

      {/* SECTION 13 — FOOTER */}
      <Footer />

      {/* Interactive Watch Demo Modal */}
      {demoModalOpen && (
        <div 
          onClick={() => setDemoModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative bg-slate-900 border border-slate-800 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <h3 className="text-base sm:text-lg font-bold text-white">OneClickBiz Interactive Demo</h3>
              <button
                onClick={() => setDemoModalOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition cursor-pointer"
                aria-label="Close Demo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <DemoVideoSection />
          </div>
        </div>
      )}

    </div>
  );
}
