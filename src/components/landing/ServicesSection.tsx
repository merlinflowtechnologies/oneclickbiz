'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SERVICES_CATALOG_24 } from '@/data/servicesData';
import ServiceDetailSector from '@/components/landing/ServiceDetailSector';

interface ServiceItem {
  id: string;
  name: string;
  image: string;
  bgGrad: string;
  borderColor: string;
  link: string;
  planTier: 'basic' | 'pro' | 'advance';
  planLabel: string;
}

const ALL_SERVICES_24: ServiceItem[] = [
  // 11 Core Baseline Services (Included in Basic, Pro, Advance)
  { id: 'personal-profile', name: 'Personal Profile', image: '/services/personal-profile.png?v=7', bgGrad: 'from-blue-50 to-indigo-100/60', borderColor: 'border-blue-200/70', link: '#services', planTier: 'basic', planLabel: 'Basic' },
  { id: 'mini-website', name: 'Mini Website', image: '/services/mini-website.png?v=7', bgGrad: 'from-purple-50 to-violet-100/60', borderColor: 'border-purple-200/70', link: '#services', planTier: 'basic', planLabel: 'Basic' },
  { id: 'whatsapp-store', name: 'WhatsApp Store', image: '/services/whatsapp-store.png?v=7', bgGrad: 'from-emerald-50 to-green-100/60', borderColor: 'border-emerald-200/70', link: '#services', planTier: 'basic', planLabel: 'Basic' },
  { id: 'visiting-cards', name: 'Visiting Cards & Flyers', image: '/services/visiting-cards.png?v=7', bgGrad: 'from-amber-50 to-orange-100/60', borderColor: 'border-amber-200/70', link: '#services', planTier: 'basic', planLabel: 'Basic' },
  { id: 'custom-templates', name: 'Custom Templates', image: '/services/custom-templates.png?v=7', bgGrad: 'from-purple-50 to-fuchsia-100/60', borderColor: 'border-purple-200/70', link: '#services', planTier: 'basic', planLabel: 'Basic' },
  { id: 'easy-designing', name: 'Easy Designing', image: '/services/easy-designing.png?v=7', bgGrad: 'from-pink-50 to-rose-100/60', borderColor: 'border-pink-200/70', link: '#services', planTier: 'basic', planLabel: 'Basic' },
  { id: 'product-space', name: 'Product Space', image: '/services/product-space.png?v=7', bgGrad: 'from-amber-50 to-orange-100/60', borderColor: 'border-amber-200/70', link: '#services', planTier: 'basic', planLabel: 'Basic' },
  { id: 'customized-qr', name: 'Customized QR Code', image: '/services/customized-qr.png?v=7', bgGrad: 'from-purple-50 to-indigo-100/60', borderColor: 'border-purple-200/70', link: '#services', planTier: 'basic', planLabel: 'Basic' },
  { id: 'gallery-space', name: 'Gallery Space (15 Photos/1 Video)', image: '/services/gallery-space.png?v=7', bgGrad: 'from-teal-50 to-emerald-100/60', borderColor: 'border-teal-200/70', link: '#services', planTier: 'basic', planLabel: 'Basic' },
  { id: 'live-profile', name: 'Live Profile & Hosting', image: '/services/live-profile.png?v=7', bgGrad: 'from-red-50 to-rose-100/60', borderColor: 'border-red-200/70', link: '#services', planTier: 'basic', planLabel: 'Basic' },
  { id: 'direct-app', name: 'Direct App (PWA)', image: '/services/direct-app.png?v=7', bgGrad: 'from-emerald-50 to-teal-100/60', borderColor: 'border-emerald-200/70', link: '#services', planTier: 'basic', planLabel: 'Basic' },

  // 8 Commercial Growth Services (Unlocked in Pro & Advance)
  { id: 'custom-domain', name: 'Custom Domain & SSL', image: '/services/custom-domain.png?v=7', bgGrad: 'from-sky-50 to-blue-100/60', borderColor: 'border-sky-200/70', link: '#services', planTier: 'pro', planLabel: 'Pro' },
  { id: 'services-management', name: 'Slot & Appointment Booking', image: '/services/services-management.png?v=7', bgGrad: 'from-blue-50 to-cyan-100/60', borderColor: 'border-blue-200/70', link: '#services', planTier: 'pro', planLabel: 'Pro' },
  { id: 'payment-gateways', name: 'Payment Gateways & UPI', image: '/services/payment-gateways.png?v=7', bgGrad: 'from-sky-50 to-emerald-100/60', borderColor: 'border-sky-200/70', link: '#services', planTier: 'pro', planLabel: 'Pro' },
  { id: 'reviews-ratings', name: 'Google 5-Star Reviews', image: '/services/reviews-ratings.png?v=7', bgGrad: 'from-amber-50 to-yellow-100/60', borderColor: 'border-amber-200/70', link: '#services', planTier: 'pro', planLabel: 'Pro' },
  { id: 'lead-extractions', name: 'Lead CRM & Excel Export', image: '/services/lead-extractions.png?v=7', bgGrad: 'from-indigo-50 to-blue-100/60', borderColor: 'border-indigo-200/70', link: '#services', planTier: 'pro', planLabel: 'Pro' },
  { id: 'canva-adobe', name: 'Canva & Adobe Studio', image: '/services/canva-adobe.png?v=7', bgGrad: 'from-cyan-50 to-rose-100/60', borderColor: 'border-cyan-200/70', link: '#services', planTier: 'pro', planLabel: 'Pro' },
  { id: 'email-signature', name: 'HTML Email Signature', image: '/services/email-signature.png?v=7', bgGrad: 'from-cyan-50 to-teal-100/60', borderColor: 'border-cyan-200/70', link: '#services', planTier: 'pro', planLabel: 'Pro' },
  { id: 'e-commerce', name: 'E-commerce Cart & SKUs', image: '/services/e-commerce.png?v=7', bgGrad: 'from-rose-50 to-pink-100/60', borderColor: 'border-rose-200/70', link: '#services', planTier: 'pro', planLabel: 'Pro' },

  // 5 Enterprise & Multi-Branch Services (Exclusive to Advance)
  { id: 'commercial-usage', name: '100% White-Label Rights', image: '/services/commercial-usage.png?v=7', bgGrad: 'from-orange-50 to-amber-100/60', borderColor: 'border-orange-200/70', link: '#services', planTier: 'advance', planLabel: 'Advance' },
  { id: 'scaling-business', name: 'Multi-Branch Scaling', image: '/services/scaling-business.png?v=7', bgGrad: 'from-rose-50 to-red-100/60', borderColor: 'border-rose-200/70', link: '#services', planTier: 'advance', planLabel: 'Advance' },
  { id: 'articles-blogs', name: 'SEO Blog & Articles Studio', image: '/services/articles-blogs.png?v=7', bgGrad: 'from-blue-50 to-indigo-100/60', borderColor: 'border-blue-200/70', link: '#services', planTier: 'advance', planLabel: 'Advance' },
  { id: 'report-pdf', name: 'Report PDF & GST Invoicing', image: '/services/report-pdf.png?v=7', bgGrad: 'from-rose-50 to-red-100/60', borderColor: 'border-rose-200/70', link: '#services', planTier: 'advance', planLabel: 'Advance' },
  { id: 'business-tools', name: 'Operations Cockpit CRM', image: '/services/business-tools.png?v=7', bgGrad: 'from-indigo-50 to-slate-100/60', borderColor: 'border-indigo-200/70', link: '#services', planTier: 'advance', planLabel: 'Advance' },
];

export default function ServicesSection() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('whatsapp-store');
  const [planFilter, setPlanFilter] = useState<'all' | 'basic' | 'pro' | 'advance'>('all');

  const handleSelectService = (id: string) => {
    setSelectedServiceId(id);
    const detailElement = document.getElementById('service-detail-sector');
    if (detailElement) {
      detailElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const currentDetailService = SERVICES_CATALOG_24[selectedServiceId] || SERVICES_CATALOG_24['whatsapp-store'];

  // Filter services by plan
  const visibleServices = ALL_SERVICES_24.filter(s => {
    if (planFilter === 'all') return true;
    if (planFilter === 'basic') return s.planTier === 'basic';
    if (planFilter === 'pro') return s.planTier === 'basic' || s.planTier === 'pro';
    if (planFilter === 'advance') return true;
    return true;
  });

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-[#C7D7FE] relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#EDF3FF] text-[#174BFF] border border-[#C7D7FE] text-[11px] font-bold uppercase tracking-wider mb-2.5">
              OUR SERVICES &amp; PLANS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#10183F] tracking-tight leading-tight">
              All 24 tools to grow{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#174BFF] via-[#3568FF] to-[#7547F5]">
                your business website.
              </span>
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#64718F] font-normal">
              Explore our 24 pre-integrated services. Filter by subscription plan to see which tools are included in Basic, Pro, and Advance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#174BFF] bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl hidden sm:inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#174BFF]" />
              Tap any tool to open preview
            </span>
            <Link
              href="#pricing"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#174BFF] bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200 transition-colors shrink-0"
            >
              <span>View Pricing Plans</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* PLAN FILTER TABS */}
        <div className="flex items-center gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-none">
          <button
            type="button"
            onClick={() => setPlanFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              planFilter === 'all'
                ? 'bg-[#10183F] text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            All 24 Services (24)
          </button>
          <button
            type="button"
            onClick={() => setPlanFilter('basic')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              planFilter === 'basic'
                ? 'bg-[#174BFF] text-white shadow-sm'
                : 'bg-blue-50 hover:bg-blue-100 text-[#174BFF] border border-blue-200'
            }`}
          >
            <span>Basic Plan (11 Services)</span>
            <span className="text-[10px] opacity-80 font-mono">₹999</span>
          </button>
          <button
            type="button"
            onClick={() => setPlanFilter('pro')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              planFilter === 'pro'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
            }`}
          >
            <span>Pro Plan (19 Services)</span>
            <span className="text-[10px] opacity-80 font-mono">₹1,599</span>
          </button>
          <button
            type="button"
            onClick={() => setPlanFilter('advance')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              planFilter === 'advance'
                ? 'bg-[#7547F5] text-white shadow-sm'
                : 'bg-purple-50 hover:bg-purple-100 text-[#7547F5] border border-purple-200'
            }`}
          >
            <span>Advance Plan (All 24 Services)</span>
            <span className="text-[10px] opacity-80 font-mono">₹2,199</span>
          </button>
        </div>

        {/* Dynamic Plan Summary Legend */}
        <div className="mb-6 p-3.5 sm:p-4 rounded-2xl bg-[#F8FAFF] border border-[#C7D7FE] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs leading-relaxed">
          <div className="flex items-start sm:items-center gap-2.5">
            <span className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1 sm:mt-0 ${
              planFilter === 'basic' ? 'bg-[#174BFF]' : planFilter === 'pro' ? 'bg-emerald-500' : planFilter === 'advance' ? 'bg-[#7547F5]' : 'bg-[#10183F]'
            }`} />
            <p className="text-slate-700">
              {planFilter === 'all' && (
                <>
                  <span className="font-extrabold text-[#10183F]">Showing all 24 services</span> pre-integrated into OneClickBiz Commercial Mini-Websites. Click any plan tab to see exact inclusions.
                </>
              )}
              {planFilter === 'basic' && (
                <>
                  <span className="font-extrabold text-[#174BFF]">Basic Plan (₹999/yr) — 11 Services:</span> Verified Mini-Website, WhatsApp Store (0% commission), Personal Profile, Dynamic Cloud QR, Visiting Cards &amp; Flyers, Direct PWA App, 15 HD Photos &amp; 1 Local Video, Social Hub &amp; Video Player.
                </>
              )}
              {planFilter === 'pro' && (
                <>
                  <span className="font-extrabold text-emerald-700">Pro Plan (₹1,599/yr) — 19 Services Total (11 Basic + 8 Growth):</span> Adds Custom Domain &amp; Free SSL, Slot Bookings, Payment Gateways &amp; UPI, Google Reviews, Lead CRM &amp; Excel Export, Canva/Adobe Studio, HTML Email Signature, E-Commerce Cart &amp; 50 Photos/5 Videos.
                </>
              )}
              {planFilter === 'advance' && (
                <>
                  <span className="font-extrabold text-[#7547F5]">Advance Plan (₹2,199/yr) — All 24 Services Included:</span> Adds 100% White-Label Rights (Zero Branding), Multi-Branch Scaling, SEO Blog Studio, GST Invoices &amp; Reports, Operations Cockpit CRM, Unlimited Photos &amp; 15 Local 4K Videos, and Smart NFC Standee.
                </>
              )}
            </p>
          </div>
          <Link
            href="#pricing"
            className="text-xs font-bold text-[#174BFF] hover:underline shrink-0 whitespace-nowrap"
          >
            Compare All Plans &rarr;
          </Link>
        </div>

        {/* 24 Services Icon Grid: 8 columns on desktop, 4 on tablet, 2 on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-3.5">
          {visibleServices.map((service) => {
            const isSelected = selectedServiceId === service.id;

            return (
              <button
                key={service.id}
                type="button"
                onClick={() => handleSelectService(service.id)}
                className={`group rounded-2xl p-2.5 sm:p-3 flex flex-col items-center text-center transition-all duration-300 cursor-pointer relative text-left ${
                  isSelected
                    ? 'bg-blue-50/60 border-2 border-[#174BFF] ring-2 ring-[#174BFF]/20 shadow-[0_12px_28px_rgba(23,75,255,0.16)] -translate-y-1'
                    : 'bg-white border border-[#E2E9FA] hover:border-blue-300 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_rgba(23,75,255,0.09)] hover:-translate-y-1.5'
                }`}
              >
                {/* Active Indicator Pip */}
                {isSelected && (
                  <span className="absolute -top-1.5 right-2 px-1.5 py-0.5 rounded-full bg-[#174BFF] text-white text-[9px] font-black uppercase tracking-wider shadow-xs animate-bounce z-10">
                    Active
                  </span>
                )}

                {/* 3D Realistic Icon Squircle */}
                <div
                  className={`w-[78px] h-[78px] sm:w-[86px] sm:h-[86px] rounded-2xl bg-gradient-to-br ${service.bgGrad} border ${service.borderColor} flex items-center justify-center mb-2 transition-all duration-300 shadow-2xs p-1 ${
                    isSelected ? 'scale-105 shadow-md' : 'group-hover:scale-108 group-hover:shadow-md'
                  }`}
                >
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-16 h-16 sm:w-[72px] sm:h-[72px] object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_8px_16px_rgba(0,0,0,0.1)]"
                    loading="lazy"
                  />
                </div>

                {/* Plan Tier Pill Badge */}
                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider mb-1 ${
                  service.planTier === 'basic'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200/80'
                    : service.planTier === 'pro'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                    : 'bg-purple-50 text-[#7547F5] border border-purple-200/80'
                }`}>
                  {service.planLabel}
                </span>

                {/* Service Name */}
                <h3 className={`text-xs font-semibold leading-snug line-clamp-2 min-h-[30px] flex items-center justify-center transition-colors ${
                  isSelected ? 'text-[#174BFF] font-bold' : 'text-[#10183F] group-hover:text-[#174BFF]'
                }`}>
                  {service.name}
                </h3>
              </button>
            );
          })}
        </div>

        {/* DEEP DIVE SECTOR: Opens and displays rich matter, usage steps, and reference images */}
        {currentDetailService && (
          <ServiceDetailSector
            service={currentDetailService}
            allServiceIds={ALL_SERVICES_24.map((s) => s.id)}
            onSelectService={handleSelectService}
          />
        )}

      </div>
    </section>
  );
}

