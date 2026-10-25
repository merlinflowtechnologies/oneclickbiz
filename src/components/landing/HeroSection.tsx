'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Play, 
  CheckCircle2
} from 'lucide-react';

interface HeroSectionProps {
  onWatchDemo?: () => void;
}

const HERO_CATEGORIES = [
  { id: 'real-estate', name: 'Real Estate', image: '/landing/category_4.png', link: '/v/re-builders' },
  { id: 'restaurants', name: 'Restaurants & Cafés', image: '/landing/category_0.png', link: '/v/restaurant-menu' },
  { id: 'salons', name: 'Salon & Beauty', image: '/landing/category_1.png', link: '/v/beauty-salon' },
  { id: 'hospitals', name: 'Hospitals & Clinics', image: '/landing/category_2.png', link: '/v/health-doctor' },
  { id: 'education', name: 'Education & Coaching', image: '/landing/category_3.png', link: '/v/edu-coaching' },
  { id: 'retail', name: 'Retail Stores', image: '/landing/category_5.png', link: '/vcard-templates' },
  { id: 'gyms', name: 'Gyms & Fitness', image: '/landing/category_6.png', link: '/vcard-templates' },
  { id: 'services', name: 'Consultants & Freelancers', image: '/landing/category_8.png', link: '/vcard-templates' },
  { id: 'tech', name: 'IT & Tech', image: '/landing/category_9.png', link: '/vcard-templates' },
  { id: 'auto', name: 'Automobile', image: '/landing/category_7.png', link: '/vcard-templates' },
];

export default function HeroSection({ onWatchDemo }: HeroSectionProps) {
  const handleScrollToDemo = () => {
    if (onWatchDemo) {
      onWatchDemo();
    } else {
      const demoEl = document.getElementById('demo') || document.getElementById('templates');
      if (demoEl) demoEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-8 pb-10 sm:pt-12 sm:pb-14 lg:pt-14 lg:pb-16 bg-gradient-to-b from-[#EDF4FF] via-[#F8FAFF] to-white overflow-hidden border-b border-[#C7D7FE]">
      
      {/* Background Soft Ambient Light Blurs */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[350px] bg-blue-100/40 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[350px] bg-purple-100/30 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-6 xl:col-span-6 text-center lg:text-left space-y-5 sm:space-y-6">
            
            {/* Top Pill Badge matching reference */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDF3FF] border border-[#C7D7FE] text-[#174BFF] text-xs font-bold uppercase tracking-wider shadow-2xs">
              <span className="text-sm">🚀</span>
              <span>ONE PLATFORM, ENDLESS POSSIBILITIES</span>
            </div>

            {/* Main Headline matching reference */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-[#10183F] tracking-tight leading-[1.12]">
              Create. Manage.{' '}
              <br className="hidden sm:inline" />
              Grow Your Business{' '}
              <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#174BFF] via-[#3568FF] to-[#7547F5]">
                in One Place.
              </span>
            </h1>

            {/* Description matching reference */}
            <p className="text-sm sm:text-base lg:text-[17px] text-[#64718F] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Build a professional business profile, mini website, WhatsApp store, online store, bookings, leads, and more. Get discovered by customers and grow your business with OneClickBiz.
            </p>

            {/* CTAs: Primary + Secondary */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
              <Link
                href="/signup?intent=create_website"
                className="w-full sm:w-auto px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl text-sm sm:text-base font-bold text-white bg-[#174BFF] hover:bg-[#133FDF] flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all active:scale-95 group shrink-0 cursor-pointer"
              >
                <span>Create Your Free Website</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={handleScrollToDemo}
                className="w-full sm:w-auto px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl text-sm sm:text-base font-bold text-[#10183F] bg-white hover:bg-slate-50 border border-[#E2E9FA] flex items-center justify-center gap-2 shadow-2xs transition-all active:scale-95 cursor-pointer shrink-0"
              >
                <span className="w-5 h-5 rounded-full bg-blue-50 text-[#174BFF] flex items-center justify-center shrink-0">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </span>
                <span>Watch Demo</span>
              </button>
            </div>

            {/* 4 Benefit Indicators */}
            <div className="pt-3 sm:pt-4 border-t border-[#E2E9FA]/70">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-left">
                {[
                  'No coding required',
                  'Easy to use',
                  'Professional templates',
                  'Works on all devices',
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs text-[#64718F]">
                    <CheckCircle2 className="w-4 h-4 text-[#16B981] shrink-0 stroke-[2.5]" />
                    <span className="font-medium text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Product Ecosystem 3D Visual */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center pt-2 sm:pt-4 lg:pt-0 w-full">
            <div className="relative w-full max-w-[620px] mx-auto select-none group">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(23,75,255,0.10)] transition-transform duration-300 group-hover:scale-[1.01] bg-white border border-[#C7D7FE]/80">
                <img
                  src="/landing/hero-visual-4k.png?v=6"
                  alt="OneClickBiz Multi-Device Business Website & WhatsApp Store Ecosystem"
                  className="w-full h-auto object-contain block"
                  loading="eager"
                />
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM READY TEMPLATES STRIP */}
        <div className="mt-8 sm:mt-10 lg:mt-12">
          <div className="bg-gradient-to-r from-blue-50/50 via-white to-blue-50/30 rounded-2xl border border-[#E2E9FA] p-3.5 sm:p-4.5 shadow-[0_2px_12px_rgba(23,75,255,0.03)] flex flex-col xl:flex-row xl:items-center gap-4 overflow-hidden">
            
            {/* Left Header Box */}
            <div className="xl:w-64 shrink-0 pr-3 border-b xl:border-b-0 xl:border-r border-[#E2E9FA] pb-3 xl:pb-0">
              <span className="text-[11px] font-bold text-[#174BFF] uppercase tracking-wider block mb-0.5">
                READY TEMPLATES
              </span>
              <h3 className="text-sm sm:text-base font-extrabold text-[#10183F] leading-tight">
                FOR EVERY BUSINESS
              </h3>
              <p className="text-[11px] text-[#64718F] mt-1 line-clamp-2">
                Choose a template and launch your business in minutes.
              </p>
            </div>

            {/* Auto-scrolling Template Showcase Track */}
            <div className="relative overflow-hidden flex-1 py-1">
              {/* Left & Right Gradient Fade Masks */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-12 z-10 bg-gradient-to-r from-white via-white/60 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-12 z-10 bg-gradient-to-l from-white via-white/60 to-transparent" />

              {/* Infinite Continuous Marquee Track */}
              <div className="flex items-center animate-continuous-marquee hover:[animation-play-state:paused]">
                {/* First Set of Items */}
                <div className="flex items-center gap-2.5 sm:gap-3 pr-2.5 sm:pr-3 shrink-0">
                  {HERO_CATEGORIES.map((cat) => (
                    <Link
                      key={`set1-${cat.id}`}
                      href={cat.link}
                      className="group/card bg-white rounded-xl border border-[#E2E9FA] hover:border-blue-400 p-2 flex flex-col items-center shrink-0 w-[105px] sm:w-[110px] shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all text-center cursor-pointer"
                    >
                      <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 mb-1.5 border border-slate-100">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-200"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-[#10183F] group-hover/card:text-[#174BFF] transition-colors leading-tight line-clamp-2 min-h-[26px] flex items-center justify-center">
                        {cat.name}
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Second Duplicate Set for 100% Seamless Infinite Loop */}
                <div className="flex items-center gap-2.5 sm:gap-3 pr-2.5 sm:pr-3 shrink-0" aria-hidden="true">
                  {HERO_CATEGORIES.map((cat) => (
                    <Link
                      key={`set2-${cat.id}`}
                      href={cat.link}
                      tabIndex={-1}
                      className="group/card bg-white rounded-xl border border-[#E2E9FA] hover:border-blue-400 p-2 flex flex-col items-center shrink-0 w-[105px] sm:w-[110px] shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all text-center cursor-pointer"
                    >
                      <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 mb-1.5 border border-slate-100">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-200"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-[#10183F] group-hover/card:text-[#174BFF] transition-colors leading-tight line-clamp-2 min-h-[26px] flex items-center justify-center">
                        {cat.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
