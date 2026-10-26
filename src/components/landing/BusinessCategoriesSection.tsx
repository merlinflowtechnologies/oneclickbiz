'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  image: string;
  desc: string;
  link: string;
  servesMatter: string;
  features: string[];
}

const CATEGORIES_DATA: CategoryItem[] = [
  { 
    id: 'restaurants', 
    name: 'Restaurants & Cafés', 
    image: '/landing/category_0.png', 
    desc: 'Menus & food orders', 
    link: '#templates',
    servesMatter: 'Digital QR menus on tables, direct WhatsApp food ordering with zero aggregator commissions, table bookings & instant UPI settlements.',
    features: ['Digital QR Menus', '0% Commission WhatsApp Orders', 'Instant UPI Billing']
  },
  { 
    id: 'salons', 
    name: 'Salons & Beauty', 
    image: '/landing/category_1.png', 
    desc: 'Appointments & style', 
    link: '#templates',
    servesMatter: 'Real-time stylist & slot booking, interactive bridal & grooming rate cards, 4K portfolio lightbox, and WhatsApp appointment slips.',
    features: ['Slot & Chair Booking', 'Interactive Rate Cards', 'WhatsApp Confirmations']
  },
  { 
    id: 'hospitals', 
    name: 'Hospitals & Clinics', 
    image: '/landing/category_2.png', 
    desc: 'Doctor bookings', 
    link: '#templates',
    servesMatter: 'Doctor profile bios, clinic department rate cards, online OPD time-slot booking, and instant automated WhatsApp patient appointment tokens.',
    features: ['Doctor Profiles', 'OPD Slot Booking', 'Clinic Timing & Maps']
  },
  { 
    id: 'education', 
    name: 'Education & Coaching', 
    image: '/landing/category_3.png', 
    desc: 'Courses & batches', 
    link: '#templates',
    servesMatter: 'Batch schedules, student admission lead capture, course syllabus PDF downloads, demo class booking, and verified student reviews.',
    features: ['Course Showcase', 'Admission Leads Hub', 'Syllabus PDF Download']
  },
  { 
    id: 'real-estate', 
    name: 'Real Estate', 
    image: '/landing/category_4.png', 
    desc: 'Property showcases', 
    link: '#templates',
    servesMatter: 'High-resolution villa & apartment galleries, floor plan brochures, site-visit calendar booking, and 1-tap WhatsApp agent inquiries.',
    features: ['Property Showcase', 'Floor Plan PDF Downloads', 'Site Visit Scheduling']
  },
  { 
    id: 'retail', 
    name: 'Retail Stores', 
    image: '/landing/category_5.png', 
    desc: 'Catalog & products', 
    link: '#templates',
    servesMatter: 'Mobile-first e-commerce catalog with color/size variants, real-time stock indicators, 1-click WhatsApp cart checkout, and direct payments.',
    features: ['Mobile Product Catalog', 'WhatsApp Cart Checkout', 'Live Stock Status']
  },
  { 
    id: 'gyms', 
    name: 'Gyms & Fitness', 
    image: '/landing/category_6.png', 
    desc: 'Plans & trainer slots', 
    link: '#templates',
    servesMatter: 'Monthly & annual membership pricing tiers, personal trainer bios, free trial pass registrations, and workout & diet schedule downloads.',
    features: ['Membership Tiers', 'Trainer Profiles', 'Free Trial Passes']
  },
  { 
    id: 'insurance', 
    name: 'Insurance & Advisory', 
    image: '/landing/category_7.png', 
    desc: 'Policies & claims', 
    link: '#templates',
    servesMatter: 'Verified advisor vCard credentials, policy comparison breakdowns, instant WhatsApp claim guidance, and client consultation booking.',
    features: ['Verified Advisor vCard', 'Consultation Booking', 'Policy Claim Guidance']
  },
  { 
    id: 'services', 
    name: 'Service Businesses', 
    image: '/landing/category_8.png', 
    desc: 'Leads & quotes', 
    link: '#templates',
    servesMatter: 'Professional service portfolio, instant quotation request forms, Google 5-star review integration, and direct click-to-call / WhatsApp hub.',
    features: ['Instant Quote Forms', 'Project Portfolio', 'Google Review Booster']
  },
  { 
    id: 'other', 
    name: 'Other Businesses', 
    image: '/landing/category_9.png', 
    desc: 'Custom enterprise', 
    link: '#templates',
    servesMatter: 'Fully bespoke multi-page architecture with custom domain mapping, multi-staff access, CRM lead exports, and sub-100ms global cloud sync.',
    features: ['Custom Domain & SSL', 'Multi-Staff Access', 'CRM Lead Export']
  },
];

export default function BusinessCategoriesSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeItem = hoveredId ? CATEGORIES_DATA.find((c) => c.id === hoveredId) : null;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#EEF4FF] via-[#F5F8FE] to-[#EEF4FF] border-b border-[#C7D7FE] relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#EDF3FF] text-[#174BFF] border border-[#C7D7FE] text-[11px] font-bold uppercase tracking-wider mb-2.5">
            BUSINESS CATEGORIES
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#10183F] tracking-tight leading-tight">
            Built for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#174BFF] via-[#3568FF] to-[#7547F5]">
              Every Business.
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#64718F] font-normal">
            Choose your industry and get started with the right website experience.
          </p>
        </div>

        {/* 10 Categories Grid: Focus-Highlight on Hover & Dim Beside It */}
        <div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6"
          onMouseLeave={() => setHoveredId(null)}
        >
          {CATEGORIES_DATA.map((cat) => {
            const isHovered = hoveredId === cat.id;
            const isDimmed = hoveredId !== null && !isHovered;

            return (
              <Link
                key={cat.id}
                href={cat.link}
                onMouseEnter={() => setHoveredId(cat.id)}
                onClick={() => setHoveredId(cat.id)}
                className={`group relative bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 flex flex-col items-center text-center transition-all duration-300 cursor-pointer overflow-hidden ${
                  isHovered
                    ? 'border-2 border-[#174BFF] shadow-[0_20px_45px_rgba(23,75,255,0.22)] -translate-y-2 z-20 scale-[1.03] ring-4 ring-[#174BFF]/15'
                    : isDimmed
                    ? 'border border-[#E2E9FA]/60 opacity-35 grayscale-[25%] scale-[0.98]'
                    : 'border border-[#E2E9FA] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-[#174BFF]/50'
                }`}
              >
                {/* Category Image - Large & Crisp with Hover Reveal Overlay */}
                <div className="w-full aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 mb-3 sm:mb-3.5 shadow-xs relative">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      isHovered ? 'scale-108' : 'group-hover:scale-105'
                    }`} 
                    loading="lazy"
                  />

                  {/* Frosted Glass Floating 'How OneClickBiz Serves' Micro-Overlay */}
                  <div 
                    className={`absolute inset-x-0 bottom-0 p-2.5 sm:p-3 bg-gradient-to-t from-[#10183F]/95 via-[#10183F]/85 to-transparent backdrop-blur-xs text-white text-left transition-all duration-300 ${
                      isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
                    }`}
                  >
                    <div className="flex items-center gap-1 text-[10px] font-bold text-amber-300 uppercase tracking-wider mb-1">
                      <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
                      <span>How OneClickBiz Serves</span>
                    </div>
                    <p className="text-[11px] text-white/95 leading-snug line-clamp-3 font-normal drop-shadow-xs">
                      {cat.servesMatter}
                    </p>
                  </div>
                </div>

                {/* Title */}
                <h3 className={`text-sm sm:text-base font-bold transition-colors leading-snug line-clamp-1 ${
                  isHovered ? 'text-[#174BFF]' : 'text-[#10183F]'
                }`}>
                  {cat.name}
                </h3>

                {/* Description / Active Highlight Badge */}
                <p className={`mt-1 text-xs font-medium leading-normal line-clamp-1 transition-colors ${
                  isHovered ? 'text-[#174BFF] font-semibold' : 'text-[#64718F]'
                }`}>
                  {isHovered ? '✓ View Tailored Solution' : cat.desc}
                </p>

              </Link>
            );
          })}
        </div>

        {/* Dynamic Industry Highlight Bar: Updates Live on Hover */}
        <div 
          className={`mt-7 sm:mt-9 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
            activeItem
              ? 'bg-gradient-to-r from-blue-50/95 via-indigo-50/90 to-white border-2 border-[#174BFF]/50 shadow-[0_16px_36px_rgba(23,75,255,0.12)] -translate-y-0.5'
              : 'bg-white/90 border-[#C7D7FE]/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)]'
          }`}
        >
          {/* Left: Icon & Explanatory Matter */}
          <div className="flex items-start sm:items-center gap-3.5 flex-1">
            <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ${
              activeItem 
                ? 'bg-gradient-to-br from-[#174BFF] to-[#3B82F6] text-white shadow-md shadow-blue-500/25 scale-105' 
                : 'bg-blue-100 text-[#174BFF]'
            }`}>
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#174BFF]">
                  {activeItem ? `How OneClickBiz Serves ${activeItem.name}:` : 'Tailored Solutions for Over 25+ Business Verticals'}
                </span>
                {activeItem && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE WORKFLOW
                  </span>
                )}
              </div>

              <p className="mt-1 text-xs sm:text-sm text-[#10183F] font-medium leading-relaxed">
                {activeItem 
                  ? activeItem.servesMatter 
                  : 'Keep your cursor on any business category above to see how OneClickBiz powers it with tailored digital features, workflows, and zero-commission sales.'}
              </p>
            </div>
          </div>

          {/* Right: Key Feature Pills / Explore CTA */}
          <div className="flex items-center gap-2 flex-wrap md:justify-end shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-blue-100">
            {activeItem ? (
              activeItem.features.map((feat, fIdx) => (
                <span 
                  key={fIdx}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#C7D7FE] text-[#174BFF] text-xs font-bold shadow-2xs flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  {feat}
                </span>
              ))
            ) : (
              <>
                <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-[#174BFF] text-xs font-semibold border border-blue-200/60">
                  ✓ Instant Online Setup
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-[#174BFF] text-xs font-semibold border border-blue-200/60">
                  ✓ 0% WhatsApp Orders
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-[#174BFF] text-xs font-semibold border border-blue-200/60">
                  ✓ 100% Mobile & Desktop
                </span>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
