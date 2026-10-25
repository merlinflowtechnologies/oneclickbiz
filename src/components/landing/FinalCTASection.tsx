'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Sparkles, ShoppingBag, BarChart3, Globe, MessageCircle } from 'lucide-react';

interface FinalCTASectionProps {
  onWatchHowItWorks?: () => void;
}

export default function FinalCTASection({ onWatchHowItWorks }: FinalCTASectionProps) {
  const handleWatch = () => {
    if (onWatchHowItWorks) {
      onWatchHowItWorks();
    } else {
      const demoEl = document.getElementById('demo') || document.getElementById('templates');
      if (demoEl) demoEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Curved Gradient Hero Card matching reference image */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#EDF3FF] via-[#F8FAFF] to-[#F1F4FF] border border-[#C7D7FE]/80 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-lg shadow-blue-500/5">
          
          {/* Subtle Ambient Backdrops */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-200/30 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-200/20 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-5">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-blue-200 text-[#174BFF] text-[11px] font-extrabold uppercase tracking-wider shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#174BFF]" />
                <span>Ready to Grow?</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-extrabold text-[#10183F] tracking-tight leading-[1.18]">
                Create Your Free Website Today and{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#174BFF] to-[#7547F5]">
                  Take Your Business Online.
                </span>
              </h2>

              <p className="text-xs sm:text-sm lg:text-base text-[#64718F] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Join OneClickBiz and get the tools you need to build, manage, and grow your online presence.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  href="/signup?intent=final_cta"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#174BFF] hover:bg-[#133FDF] flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 transition-all active:scale-95 group shrink-0 cursor-pointer"
                >
                  <span>Create Your Free Website</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  onClick={handleWatch}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-[#10183F] bg-white hover:bg-slate-50 border border-[#E2E9FA] flex items-center justify-center gap-2 shadow-2xs transition-all active:scale-95 cursor-pointer shrink-0"
                >
                  <Play className="w-3.5 h-3.5 fill-[#174BFF] text-[#174BFF]" />
                  <span>Watch How It Works</span>
                </button>
              </div>

            </div>

            {/* Right Device Visual */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-[480px] drop-shadow-2xl hover:scale-[1.01] transition-transform duration-300">
                <div className="relative rounded-2xl overflow-hidden border border-[#C7D7FE]/80 shadow-xl bg-white">
                  <img
                    src="/landing/final-cta-visual@2x.png"
                    alt="OneClickBiz Multi-Device Store & Profile Setup"
                    className="w-full h-auto object-cover block"
                    loading="lazy"
                  />
                </div>

                {/* Floating Glass Badges matching reference */}
                <div className="hidden sm:flex absolute -top-3.5 -left-3 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#C7D7FE] shadow-lg items-center gap-1.5 text-xs font-bold text-rose-600 hover:-translate-y-0.5 transition-transform">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Online Store</span>
                </div>

                <div className="hidden sm:flex absolute -top-3.5 right-6 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#C7D7FE] shadow-lg items-center gap-1.5 text-xs font-bold text-[#174BFF] hover:-translate-y-0.5 transition-transform">
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Growth Analytics</span>
                </div>

                <div className="hidden sm:flex absolute -bottom-3 left-4 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#C7D7FE] shadow-lg items-center gap-1.5 text-xs font-bold text-sky-600 hover:-translate-y-0.5 transition-transform">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Custom Domain</span>
                </div>

                <div className="hidden sm:flex absolute -bottom-3 right-4 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#C7D7FE] shadow-lg items-center gap-1.5 text-xs font-bold text-[#16B981] hover:-translate-y-0.5 transition-transform">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Store</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
