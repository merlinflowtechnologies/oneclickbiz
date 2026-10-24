'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Play, CheckCircle2, Globe, MessageCircle, Monitor, Store, Star, BarChart3 } from 'lucide-react';

interface HeroSectionProps {
  onWatchDemo?: () => void;
}

export default function HeroSection({ onWatchDemo }: HeroSectionProps) {
  const handleScrollToDemo = () => {
    if (onWatchDemo) {
      onWatchDemo();
    } else {
      const demoEl = document.getElementById('demo') || document.getElementById('examples');
      if (demoEl) demoEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 bg-gradient-to-b from-[#F8FAFF] via-white to-white overflow-hidden border-b border-[#E2E9FA]/60">
      
      {/* Background Soft Ambient Light Blurs */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[350px] bg-blue-100/40 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[350px] bg-purple-100/30 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-6 xl:col-span-6 text-center lg:text-left space-y-5 sm:space-y-6">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDF3FF] border border-[#C7D7FE] text-[#174BFF] text-xs font-bold uppercase tracking-wider shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#174BFF] animate-pulse" />
              <span>One Platform, Endless Possibilities</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-[#10183F] tracking-tight leading-[1.12]">
              Everything your{' '}
              <br className="hidden sm:inline" />
              business needs{' '}
              <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#174BFF] via-[#3568FF] to-[#7547F5]">
                in one place.
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-[17px] text-[#64718F] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Create a professional business profile, mini website, WhatsApp store, and more. Get discovered by customers and grow your business with OneClickBiz.
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

          {/* Right Product Ecosystem Visual */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center pt-2 sm:pt-4 lg:pt-0 w-full">
            <div className="relative w-full max-w-[560px] lg:max-w-[620px] mx-auto select-none group">
              
              {/* Product Ecosystem Mockup Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(23,75,255,0.12)] transition-transform duration-300 group-hover:scale-[1.01] bg-gradient-to-b from-[#F0F5FF] to-[#E8F0FE] border border-[#C7D7FE]/80">
                <img
                  src="/landing/hero-visual-4k.png?v=4"
                  alt="OneClickBiz Multi-Device Business Website & WhatsApp Store Ecosystem"
                  className="w-full h-auto object-cover block"
                  loading="eager"
                />
              </div>

              {/* Floating Badges matching reference mockup with crisp typography & icons */}
              <div className="hidden sm:flex absolute -top-3.5 -left-2.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#C7D7FE] shadow-lg items-center gap-2 text-xs font-bold text-[#10183F] hover:-translate-y-0.5 transition-transform">
                <Store className="w-4 h-4 text-[#174BFF]" />
                <span>Custom Store</span>
              </div>

              <div className="hidden sm:flex absolute -top-3.5 right-1/4 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#C7D7FE] shadow-lg items-center gap-2 text-xs font-bold text-[#10183F] hover:-translate-y-0.5 transition-transform">
                <Monitor className="w-4 h-4 text-[#7547F5]" />
                <span>Mini Website</span>
              </div>

              <div className="hidden sm:flex absolute top-5 -right-3.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#C7D7FE] shadow-lg items-center gap-2 text-xs font-bold text-[#10183F] hover:-translate-y-0.5 transition-transform">
                <MessageCircle className="w-4 h-4 text-[#16B981]" />
                <span>WhatsApp Store</span>
              </div>

              <div className="hidden sm:flex absolute -bottom-3 left-6 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#C7D7FE] shadow-lg items-center gap-2 text-xs font-bold text-[#10183F] hover:-translate-y-0.5 transition-transform">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                <span>Reviews & Ratings</span>
              </div>

              <div className="hidden sm:flex absolute -bottom-3 right-8 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#C7D7FE] shadow-lg items-center gap-2 text-xs font-bold text-[#10183F] hover:-translate-y-0.5 transition-transform">
                <BarChart3 className="w-4 h-4 text-[#174BFF]" />
                <span>Analytics</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
