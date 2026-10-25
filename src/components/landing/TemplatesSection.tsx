'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Eye, Check, X, ExternalLink } from 'lucide-react';

interface TemplateItem {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  image: string;
  liveUrl: string;
  features: string[];
}

const TEMPLATES_DATA: TemplateItem[] = [
  {
    id: 'restaurant-menu',
    name: 'Interactive Restaurant & Cafe Digital Dining',
    category: 'restaurants',
    categoryLabel: 'Restaurants & Cafés',
    image: '/landing/template_restaurant.png',
    liveUrl: '/v/restaurant-menu',
    features: ['Interactive Digital Menu', 'WhatsApp Table Booking', 'Direct Food Ordering', 'Google Reviews Sync']
  },
  {
    id: 'beauty-salon',
    name: 'Luxury Hair & Beauty Salon',
    category: 'salons',
    categoryLabel: 'Salons & Beauty',
    image: '/landing/template_salon.png',
    liveUrl: '/v/beauty-salon',
    features: ['Stylist Slot Booking', 'Service Price Catalog', 'Instagram Portfolio Sync', '1-Tap WhatsApp Inquiries']
  },
  {
    id: 'fash-boutique',
    name: 'Grand Fashion & Clothing Mall',
    category: 'fashion',
    categoryLabel: 'Fashion & Clothing',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&h=500&q=85',
    liveUrl: '/v/fash-boutique',
    features: ['Catalog Lookbook & Collections', 'WhatsApp Order & Size Inquiries', 'Seasonal Discount Banners', 'Store Directions & Timings']
  },
  {
    id: 're-builders',
    name: 'Real Estate Master & High-Rise Developers',
    category: 'real-estate',
    categoryLabel: 'Real Estate & Builders',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&h=500&q=85',
    liveUrl: '/v/re-builders',
    features: ['Dynamic Floor Plans & Pricing', 'Integrated 3D Virtual Walkthroughs', '1-Click WhatsApp Site Visits', 'Lead Generation Callback Modal']
  },
  {
    id: 'events-planner',
    name: 'Luxury Events & Wedding Planner',
    category: 'events',
    categoryLabel: 'Events & Wedding Planning',
    image: 'https://images.unsplash.com/photo-1610173827043-9db50e0d8ef9?auto=format&fit=crop&w=800&h=500&q=85',
    liveUrl: '/v/events-planner',
    features: ['Wedding & Event Showcase Gallery', 'Package Quotation Calculator', 'Vendor Coordination Form', 'Direct WhatsApp Event Hotline']
  },
  {
    id: 'prof-insurance',
    name: 'Insurance Agents & Policy Advisors',
    category: 'insurance',
    categoryLabel: 'Insurance & Advisory',
    image: '/landing/template_insurance.png',
    liveUrl: '/v/prof-insurance',
    features: ['Instant Health & Term Insurance Quotes', 'Direct 1-Click WhatsApp Claim Desk', 'Policy Comparison & Premium Calculator', 'Tax Saving (80C / 80D) Advisory']
  },
  {
    id: 'travel-tour',
    name: 'Tours & Travel Agency',
    category: 'travel',
    categoryLabel: 'Travel & Hospitality',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&h=500&q=85',
    liveUrl: '/v/travel-tour',
    features: ['Custom Holiday Package Planner', 'Direct 1-Click WhatsApp Travel Desk', 'Visa Guidance & Flight Bookings', 'Customer Travel Review Highlights']
  },
  {
    id: 'health-doctor',
    name: 'Doctor & Specialist Clinic',
    category: 'hospitals',
    categoryLabel: 'Hospitals & Healthcare',
    image: '/landing/template_hospital.png',
    liveUrl: '/v/health-doctor',
    features: ['Doctor Profiles & Slots', 'Emergency WhatsApp Hotline', 'Patient Appointment Form', 'Location & Timings Map']
  },
  {
    id: 'home-interior',
    name: 'Interior Designer & Modular Kitchens Mini-Website',
    category: 'interior-design',
    categoryLabel: 'Interior Design & Decor',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&h=500&q=85',
    liveUrl: '/v/home-interior',
    features: ['Room-by-Room Portfolio Gallery', 'Instant Design Consultation Form', 'Direct WhatsApp Designer Chat', 'Client Testimonial Slider']
  },
  {
    id: 'edu-coaching',
    name: 'Coaching Institute (IIT/NEET/UPSC)',
    category: 'education',
    categoryLabel: 'Education & Coaching',
    image: '/landing/template_education.png',
    liveUrl: '/v/edu-coaching',
    features: ['Course Syllabus Download', 'Student Admission Form', 'Teacher Bios & Demo Videos', 'Batch Timetable Display']
  },
  {
    id: 'retail-jewellery',
    name: 'Gold & Diamond Jewellery',
    category: 'retail',
    categoryLabel: 'Retail & Jewellery',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&h=500&q=85',
    liveUrl: '/v/retail-jewellery',
    features: ['Gold & Diamond Catalog Display', 'Live Daily Gold Rate Ticker', 'Video Call Jewellery Viewing', 'Store Location & Certificate Verification']
  },
  {
    id: 'home-electrician',
    name: 'Certified Electrician & Home Services',
    category: 'services',
    categoryLabel: 'Home & Professional Services',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&h=500&q=85',
    liveUrl: '/v/home-electrician',
    features: ['Emergency Repair Request Hotline', 'Transparent Service Rate Card', 'Technician Safety Badges & Warranty', '1-Tap WhatsApp Location Sharing']
  },
];

const FILTER_TABS = [
  { id: 'all', label: 'All Templates (12)' },
  { id: 'restaurants', label: 'Restaurants' },
  { id: 'salons', label: 'Salons & Beauty' },
  { id: 'fashion', label: 'Fashion & Boutique' },
  { id: 'real-estate', label: 'Real Estate' },
  { id: 'events', label: 'Events & Wedding' },
  { id: 'insurance', label: 'Insurance Agents' },
  { id: 'travel', label: 'Tours & Travel' },
  { id: 'hospitals', label: 'Hospitals' },
  { id: 'interior-design', label: 'Interior Design' },
  { id: 'education', label: 'Education' },
  { id: 'retail', label: 'Retail & Jewellery' },
  { id: 'services', label: 'Home Services' },
];

export default function TemplatesSection() {
  const [activeTab, setActiveTab] = useState('all');
  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPreviewTemplate(null);
      }
    };
    if (previewTemplate) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [previewTemplate]);

  const filteredTemplates = activeTab === 'all' 
    ? TEMPLATES_DATA 
    : TEMPLATES_DATA.filter(t => t.category === activeTab);

  return (
    <section id="templates" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-[#C7D7FE] relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#EDF3FF] text-[#174BFF] border border-[#C7D7FE] text-[11px] font-bold uppercase tracking-wider mb-2.5">
              WEBSITE TEMPLATES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#10183F] tracking-tight leading-tight">
              Beautiful Templates for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#174BFF] via-[#3568FF] to-[#7547F5]">
                Every Business.
              </span>
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#64718F] font-normal">
              Choose from 12 modern, professional and fully customizable templates with live websites.
            </p>
          </div>

          <Link
            href="/vcard-templates"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#174BFF] bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200 transition-colors shrink-0"
          >
            <span>View All Templates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Filter Pills Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 sm:mb-8 no-scrollbar">
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive 
                    ? 'bg-[#174BFF] text-white shadow-sm shadow-blue-500/25' 
                    : 'bg-[#F8FAFF] text-[#64718F] hover:text-[#174BFF] hover:bg-[#EDF3FF] border border-[#E2E9FA]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 12 Template Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className="group bg-white rounded-2xl border border-[#E2E9FA] hover:border-blue-300 p-3 sm:p-3.5 flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_rgba(23,75,255,0.08)] transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Website Preview Image */}
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 mb-3 border border-slate-100 shadow-2xs">
                  <img
                    src={tpl.image}
                    alt={tpl.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                    <a
                      href={tpl.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-white/95 text-xs font-bold text-[#10183F] shadow-sm hover:bg-white flex items-center gap-1 cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#174BFF]" />
                      <span>Live Demo</span>
                    </a>
                    <button
                      onClick={() => setPreviewTemplate(tpl)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600/90 text-xs font-bold text-white shadow-sm hover:bg-blue-600 flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-white" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Template Name */}
                <h3 className="text-sm font-bold text-[#10183F] group-hover:text-[#174BFF] transition-colors leading-snug mb-1 line-clamp-1">
                  {tpl.name}
                </h3>
                <span className="inline-block text-[11px] font-semibold text-[#64718F] mb-3">
                  {tpl.categoryLabel}
                </span>
              </div>

              {/* Action Buttons: Live Preview & Use Template */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <a
                  href={tpl.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-2.5 rounded-xl text-xs font-bold text-[#10183F] bg-slate-50 hover:bg-[#EDF3FF] hover:text-[#174BFF] border border-[#E2E9FA] transition-colors text-center cursor-pointer flex items-center justify-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5 text-[#174BFF]" />
                  <span>Preview</span>
                </a>
                <Link
                  href={`/signup?intent=template&tpl=${tpl.id}`}
                  className="w-full py-2 px-2.5 rounded-xl text-xs font-bold text-white bg-[#174BFF] hover:bg-[#133FDF] transition-colors text-center shadow-xs cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>Use Template</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Template Preview Modal */}
      {previewTemplate && (
        <div 
          onClick={() => setPreviewTemplate(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E2E9FA] animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-[#10183F]">{previewTemplate.name}</h3>
                <p className="text-xs text-[#64718F]">{previewTemplate.categoryLabel}</p>
              </div>
              <button 
                onClick={() => setPreviewTemplate(null)}
                aria-label="Close modal"
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="rounded-xl overflow-hidden border border-slate-200 aspect-[16/10] mb-4 bg-slate-100">
                <img src={previewTemplate.image} alt={previewTemplate.name} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-2 mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Included Features:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {previewTemplate.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-[#16B981] shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <a
                  href={previewTemplate.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-[#174BFF] bg-blue-50 hover:bg-blue-100 border border-blue-200 text-center flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Live Website</span>
                </a>
                <Link
                  href={`/signup?intent=template&tpl=${previewTemplate.id}`}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-[#174BFF] hover:bg-[#133FDF] text-center shadow-sm cursor-pointer"
                >
                  Use Template Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
