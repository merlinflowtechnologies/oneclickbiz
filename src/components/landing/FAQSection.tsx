'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  q: string;
  a: string;
}

const FAQS_LEFT: FAQItem[] = [
  {
    id: 'faq-1',
    q: 'Do I need coding knowledge?',
    a: 'No coding knowledge is required at all. OneClickBiz features a visual drag-and-drop builder, pre-designed industry templates, and intuitive settings where you can update text, photos, services, and pricing in real time.'
  },
  {
    id: 'faq-2',
    q: 'Can I use my own domain name?',
    a: 'Yes! Pro and Advance plans include custom domain CNAME mapping with free automated SSL certificates. You can easily connect your own branded domain (e.g., yourcompany.com) with complete white-label branding.'
  },
  {
    id: 'faq-3',
    q: 'Can I create an online store?',
    a: 'Absolutely. You can showcase unlimited products with high-resolution photos, variants, inventory pricing, and take orders directly through WhatsApp or integrated online payment gateways.'
  },
  {
    id: 'faq-4',
    q: 'Does OneClickBiz support WhatsApp integration?',
    a: 'Yes, WhatsApp is deeply integrated across all templates. Customers can initiate 1-tap chats, send automated order summaries, request quotes, and book appointments directly to your registered WhatsApp number.'
  },
];

const FAQS_RIGHT: FAQItem[] = [
  {
    id: 'faq-5',
    q: 'Can I customize my website after publishing?',
    a: 'Yes, you have unlimited 24x7 editing access. Any updates you make to your profile, products, contact details, gallery photos, or links update immediately across your live website without needing to republish.'
  },
  {
    id: 'faq-6',
    q: 'Which payment gateways are supported?',
    a: 'We support major payment processors including Razorpay, Cashfree, Stripe, and direct UPI QR codes with 0% platform transaction fees on your incoming client payments.'
  },
  {
    id: 'faq-7',
    q: 'Can I upgrade or downgrade later?',
    a: 'Yes, you can upgrade your subscription at any time from your account dashboard. Prorated credits are automatically calculated so you only pay the difference when upgrading to higher tiers.'
  },
  {
    id: 'faq-8',
    q: 'What happens if I cancel my subscription?',
    a: 'If you choose not to renew, your website remains active until the end of your billing cycle. You can export all your leads, contacts, customer inquiries, and profile data at any time before expiration.'
  },
];

export default function FAQSection() {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-5': true
  });

  const toggleFAQ = (id: string) => {
    setOpenIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white border-b border-[#C7D7FE] relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#EDF3FF] text-[#174BFF] border border-[#C7D7FE] text-[11px] font-bold uppercase tracking-wider mb-2.5">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#10183F] tracking-tight leading-tight">
              Got Questions?{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#174BFF] via-[#3568FF] to-[#7547F5]">
                We've Got Answers.
              </span>
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#64718F] font-normal">
              Find quick answers to common questions about features, pricing, domains and setups.
            </p>
          </div>

          <Link
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#174BFF] bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200 transition-colors shrink-0"
          >
            <span>View All FAQs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 2-Column Accordion on Desktop, 1-Column on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start">
          
          {/* Column 1 */}
          <div className="space-y-3 sm:space-y-3.5">
            {FAQS_LEFT.map((faq) => {
              const isOpen = !!openIds[faq.id];
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-[#E2E9FA] overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-4 sm:p-4.5 flex items-center justify-between gap-3 text-left hover:bg-slate-50/60 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-xs sm:text-sm font-bold text-[#10183F] leading-snug">
                      {faq.q}
                    </span>
                    <span className={`w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#174BFF] border-blue-200 bg-blue-50' : ''}`}>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-4.5 sm:pb-4.5 text-xs text-[#64718F] leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Column 2 */}
          <div className="space-y-3 sm:space-y-3.5">
            {FAQS_RIGHT.map((faq) => {
              const isOpen = !!openIds[faq.id];
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-[#E2E9FA] overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-4 sm:p-4.5 flex items-center justify-between gap-3 text-left hover:bg-slate-50/60 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-xs sm:text-sm font-bold text-[#10183F] leading-snug">
                      {faq.q}
                    </span>
                    <span className={`w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#174BFF] border-blue-200 bg-blue-50' : ''}`}>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-4.5 sm:pb-4.5 text-xs text-[#64718F] leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
