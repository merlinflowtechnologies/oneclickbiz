'use client';

import React from 'react';
import Link from 'next/link';
import { UserCheck, Sliders, Rocket, ArrowRight } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      num: 1,
      title: 'Create Your Profile',
      desc: 'Add business details, contact information, services, photos, and location.',
      icon: UserCheck,
      color: 'bg-blue-50 text-[#174BFF] border-blue-200',
    },
    {
      num: 2,
      title: 'Choose & Customize',
      desc: 'Select a template and customize its content, colors, images, and layout.',
      icon: Sliders,
      color: 'bg-purple-50 text-[#7547F5] border-purple-200',
    },
    {
      num: 3,
      title: 'Publish & Grow',
      desc: 'Publish your website, share it with potential customers and grow your business.',
      icon: Rocket,
      color: 'bg-emerald-50 text-[#16B981] border-emerald-200',
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#F8FAFF] border-b border-[#E2E9FA]/60 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-[#EDF3FF] text-[#174BFF] border border-[#C7D7FE] text-[11px] font-bold uppercase tracking-wider mb-2.5">
            SIMPLE PROCESS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#10183F] tracking-tight leading-tight">
            Get Your Business Online in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#174BFF] via-[#3568FF] to-[#7547F5]">
              3 Simple Steps.
            </span>
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[#64718F] font-normal">
            Follow our intuitive guided setup and launch your high-converting online presence in minutes.
          </p>
        </div>

        {/* Two-Column Layout: Left Steps + Right Visual Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: 3 Steps */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div 
                  key={step.num}
                  className="bg-white rounded-2xl border border-[#E2E9FA] p-4 sm:p-5 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-300 flex items-start gap-4 sm:gap-5 group"
                >
                  {/* Step Number Circle */}
                  <div className="w-8 h-8 rounded-full bg-[#174BFF] text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    {step.num}
                  </div>

                  {/* Step Icon */}
                  <div className={`w-11 h-11 rounded-xl ${step.color} border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                    <IconComp className="w-5 h-5" />
                  </div>

                  {/* Step Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-[#10183F] group-hover:text-[#174BFF] transition-colors leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#64718F] mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full max-w-[440px] rounded-2xl overflow-hidden border border-[#E2E9FA] shadow-xl bg-white p-3 hover:scale-[1.01] transition-transform">
              <img
                src="/landing/how-it-works-visual@2x.png"
                alt="OneClickBiz 1-Click Website Publishing Screen"
                className="w-full h-auto object-cover rounded-xl block"
                loading="lazy"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
