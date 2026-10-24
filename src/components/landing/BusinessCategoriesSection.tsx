'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  image: string;
  desc: string;
  link: string;
}

const CATEGORIES_DATA: CategoryItem[] = [
  { id: 'restaurants', name: 'Restaurants & Cafés', image: '/landing/category_0.png', desc: 'Menus & food orders', link: '#templates' },
  { id: 'salons', name: 'Salons & Beauty', image: '/landing/category_1.png', desc: 'Appointments & style', link: '#templates' },
  { id: 'hospitals', name: 'Hospitals & Clinics', image: '/landing/category_2.png', desc: 'Doctor bookings', link: '#templates' },
  { id: 'education', name: 'Education & Coaching', image: '/landing/category_3.png', desc: 'Courses & batches', link: '#templates' },
  { id: 'real-estate', name: 'Real Estate', image: '/landing/category_4.png', desc: 'Property showcases', link: '#templates' },
  { id: 'retail', name: 'Retail Stores', image: '/landing/category_5.png', desc: 'Catalog & products', link: '#templates' },
  { id: 'gyms', name: 'Gyms & Fitness', image: '/landing/category_6.png', desc: 'Plans & trainer slots', link: '#templates' },
  { id: 'consultants', name: 'Consultants & Freelancers', image: '/landing/category_7.png', desc: 'Portfolio & booking', link: '#templates' },
  { id: 'services', name: 'Service Businesses', image: '/landing/category_8.png', desc: 'Leads & quotes', link: '#templates' },
  { id: 'other', name: 'Other Businesses', image: '/landing/category_9.png', desc: 'Custom enterprise', link: '#templates' },
];

export default function BusinessCategoriesSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#F8FAFF] border-b border-[#E2E9FA]/60 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#EDF3FF] text-[#174BFF] border border-[#C7D7FE] text-[11px] font-bold uppercase tracking-wider mb-2.5">
              BUSINESS CATEGORIES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#10183F] tracking-tight leading-tight">
              Built for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#174BFF] via-[#3568FF] to-[#7547F5]">
                Every Business.
              </span>
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#64718F] font-normal">
              Choose your industry and get started with the right website experience.
            </p>
          </div>

          <Link
            href="#templates"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#174BFF] bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200 transition-colors shrink-0"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 10 Categories Grid: 10 cols on wide desktop, 5 on tablet, 2 on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5 sm:gap-3">
          {CATEGORIES_DATA.map((cat) => (
            <Link
              key={cat.id}
              href={cat.link}
              className="group bg-white rounded-2xl border border-[#E2E9FA] hover:border-blue-300 p-2 sm:p-2.5 flex flex-col items-center text-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(23,75,255,0.08)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {/* Category Image */}
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-slate-100 mb-2 shadow-2xs">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  loading="lazy"
                />
              </div>

              {/* Title */}
              <h3 className="text-[11px] sm:text-xs font-bold text-[#10183F] group-hover:text-[#174BFF] transition-colors leading-tight line-clamp-2 min-h-[28px] flex items-center justify-center">
                {cat.name}
              </h3>

              {/* Arrow circle */}
              <div className="mt-1.5 w-5 h-5 rounded-full border border-[#E2E9FA] bg-[#F8FAFF] group-hover:bg-[#EDF3FF] group-hover:border-blue-300 group-hover:text-[#174BFF] flex items-center justify-center text-slate-400 transition-all">
                <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
