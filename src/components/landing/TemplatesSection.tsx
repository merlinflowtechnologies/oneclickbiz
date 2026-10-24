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
  features: string[];
}

const TEMPLATES_DATA: TemplateItem[] = [
  {
    id: 'restaurant-modern',
    name: 'Restaurant Template',
    category: 'restaurants',
    categoryLabel: 'Restaurants & Cafés',
    image: '/landing/template_restaurant.png',
    features: ['Interactive Digital Menu', 'WhatsApp Table Booking', 'Direct Food Ordering', 'Google Reviews Sync']
  },
  {
    id: 'salon-beauty',
    name: 'Salon & Beauty Template',
    category: 'salons',
    categoryLabel: 'Salons & Beauty',
    image: '/landing/template_salon.png',
    features: ['Stylist Slot Booking', 'Service Price Catalog', 'Instagram Portfolio Sync', '1-Tap WhatsApp Inquiries']
  },
  {
    id: 'hospital-clinic',
    name: 'Hospital & Clinic Template',
    category: 'hospitals',
    categoryLabel: 'Hospitals & Clinics',
    image: '/landing/template_hospital.png',
    features: ['Doctor Profiles & Slots', 'Emergency WhatsApp Hotline', 'Patient Appointment Form', 'Location & Timings Map']
  },
  {
    id: 'education-coaching',
    name: 'Education Template',
    category: 'education',
    categoryLabel: 'Education & Coaching',
    image: '/landing/template_education.png',
    features: ['Course Syllabus Download', 'Student Admission Form', 'Teacher Bios & Demo Videos', 'Batch Timetable Display']
  },
];

const FILTER_TABS = [
  { id: 'all', label: 'All Templates' },
  { id: 'restaurants', label: 'Restaurants' },
  { id: 'salons', label: 'Salons & Beauty' },
  { id: 'hospitals', label: 'Hospitals' },
  { id: 'education', label: 'Education' },
  { id: 'real-estate', label: 'Real Estate' },
  { id: 'retail', label: 'Retail' },
  { id: 'gyms', label: 'Gyms & Fitness' },
  { id: 'consultants', label: 'Consultants' },
  { id: 'services', label: 'Service Business' },
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
    : TEMPLATES_DATA.filter(t => t.category === activeTab || activeTab === 'all');

  return (
    <section id="templates" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-[#E2E9FA]/60 relative">
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
              Choose from modern, professional and fully customizable templates.
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

        {/* 4 Featured Template Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {(filteredTemplates.length > 0 ? filteredTemplates : TEMPLATES_DATA).map((tpl) => (
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                    <button
                      onClick={() => setPreviewTemplate(tpl)}
                      className="px-3 py-1.5 rounded-lg bg-white/95 text-xs font-bold text-[#10183F] shadow-sm hover:bg-white flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#174BFF]" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Template Name */}
                <h3 className="text-sm font-bold text-[#10183F] group-hover:text-[#174BFF] transition-colors leading-snug mb-1">
                  {tpl.name}
                </h3>
                <span className="inline-block text-[11px] font-semibold text-[#64718F] mb-3">
                  {tpl.categoryLabel}
                </span>
              </div>

              {/* Action Buttons: Preview & Use Template */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => setPreviewTemplate(tpl)}
                  className="w-full py-2 px-2.5 rounded-xl text-xs font-bold text-[#10183F] bg-slate-50 hover:bg-[#EDF3FF] hover:text-[#174BFF] border border-[#E2E9FA] transition-colors text-center cursor-pointer"
                >
                  Preview
                </button>
                <Link
                  href={`/signup?intent=template&tpl=${tpl.id}`}
                  className="w-full py-2 px-2.5 rounded-xl text-xs font-bold text-white bg-[#174BFF] hover:bg-[#133FDF] transition-colors text-center shadow-xs cursor-pointer"
                >
                  Use Template
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
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer"
                >
                  Close
                </button>
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
