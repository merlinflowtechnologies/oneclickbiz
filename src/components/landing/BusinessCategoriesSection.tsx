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
  { id: 'insurance', name: 'Insurance & Advisory', image: '/landing/category_7.png', desc: 'Policies & claims', link: '#templates' },
  { id: 'services', name: 'Service Businesses', image: '/landing/category_8.png', desc: 'Leads & quotes', link: '#templates' },
  { id: 'other', name: 'Other Businesses', image: '/landing/category_9.png', desc: 'Custom enterprise', link: '#templates' },
];

export default function BusinessCategoriesSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#F8FAFF] border-b border-[#E2E9FA]/60 relative">
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

        {/* 10 Categories Grid: 2 rows of 5 on desktop, 3 on tablet, 2 on mobile - Big Clear Images like Justdial */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
          {CATEGORIES_DATA.map((cat) => (
            <Link
              key={cat.id}
              href={cat.link}
              className="group bg-white rounded-2xl sm:rounded-3xl border border-[#E2E9FA] hover:border-[#174BFF]/50 p-3 sm:p-4 flex flex-col items-center text-center shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(23,75,255,0.12)] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
            >
              {/* Category Image - Large & Crisp */}
              <div className="w-full aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 mb-3 sm:mb-3.5 shadow-xs relative">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500" 
                  loading="lazy"
                />
              </div>

              {/* Title */}
              <h3 className="text-sm sm:text-base font-bold text-[#10183F] group-hover:text-[#174BFF] transition-colors leading-snug line-clamp-1">
                {cat.name}
              </h3>

              {/* Description */}
              <p className="mt-1 text-xs text-[#64718F] font-medium leading-normal line-clamp-1">
                {cat.desc}
              </p>

              {/* Interactive Explore Prompt */}
              <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#174BFF] group-hover:text-[#1034B5] transition-colors">
                <span>View Templates</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
