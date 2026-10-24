'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Phone } from 'lucide-react';

interface ExampleItem {
  id: string;
  name: string;
  desc: string;
  image: string;
  btnText: string;
  isPhone?: boolean;
  link: string;
}

const EXAMPLES_DATA: ExampleItem[] = [
  {
    id: 'restaurant-live',
    name: 'Restaurant & Dining Website',
    desc: 'Interactive digital menu with direct food ordering & table booking.',
    image: '/landing/template_restaurant.png',
    btnText: 'View Live Website',
    link: '/v/restaurant-menu',
  },
  {
    id: 'salon-live',
    name: 'Salon & Beauty Website',
    desc: 'Luxury hair & salon studio with slot booking & price catalog.',
    image: '/landing/template_salon.png',
    btnText: 'View Live Website',
    link: '/v/beauty-salon',
  },
  {
    id: 'clinic-live',
    name: 'Hospital & Clinic Website',
    desc: 'Specialist doctors, OPD appointment slots & emergency hotline.',
    image: '/landing/template_hospital.png',
    btnText: 'View Live Website',
    link: '/v/health-doctor',
  },
  {
    id: 'education-live',
    name: 'Coaching Institute Website',
    desc: 'IIT/NEET courses, syllabus download & student admission inquiries.',
    image: '/landing/template_education.png',
    btnText: 'View Live Website',
    link: '/v/edu-coaching',
  },
];

export default function LiveExamplesSection() {
  return (
    <section id="examples" className="py-12 sm:py-16 lg:py-20 bg-[#F8FAFF] border-b border-[#E2E9FA]/60 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#EDF3FF] text-[#174BFF] border border-[#C7D7FE] text-[11px] font-bold uppercase tracking-wider mb-2.5">
              LIVE EXAMPLES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#10183F] tracking-tight leading-tight">
              See What You{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#174BFF] via-[#3568FF] to-[#7547F5]">
                Can Create.
              </span>
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#64718F] font-normal">
              Explore real live websites built with OneClickBiz.
            </p>
          </div>

          <Link
            href="#templates"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#174BFF] bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200 transition-colors shrink-0"
          >
            <span>View All Templates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Live Example Horizontal Cards matching reference layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {EXAMPLES_DATA.map((ex) => (
            <div
              key={ex.id}
              className="group bg-white rounded-2xl border border-[#E2E9FA] hover:border-blue-300 p-3 sm:p-3.5 flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_rgba(23,75,255,0.08)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-3">
                {/* Website Thumbnail */}
                <div className="relative w-20 h-16 sm:w-22 sm:h-18 rounded-xl overflow-hidden bg-slate-100 border border-slate-100 shrink-0 shadow-2xs">
                  <img
                    src={ex.image}
                    alt={ex.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Name & Description */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-[#10183F] group-hover:text-[#174BFF] transition-colors leading-snug truncate">
                    {ex.name}
                  </h3>
                  <p className="text-[11px] text-[#64718F] leading-tight mt-1 line-clamp-2">
                    {ex.desc}
                  </p>
                </div>
              </div>

              {/* Action Button: Opens Live Website */}
              <div className="mt-3 pt-2 border-t border-slate-50">
                <a
                  href={ex.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-1.5 px-3 rounded-xl text-xs font-bold text-[#174BFF] bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="w-3 h-3 text-[#174BFF]" />
                  <span className="truncate">{ex.btnText}</span>
                  <ArrowRight className="w-3 h-3 shrink-0" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
