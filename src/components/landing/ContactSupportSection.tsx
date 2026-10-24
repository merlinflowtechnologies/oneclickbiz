'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MessageCircle, HelpCircle, ArrowRight } from 'lucide-react';

export default function ContactSupportSection() {
  const contacts = [
    {
      id: 'phone',
      title: 'Call Us',
      subtitle: 'Mon-Sat 9AM-6PM',
      value: '+91 8374372733',
      link: 'tel:+918374372733',
      icon: Phone,
      iconBg: 'bg-blue-100 text-[#174BFF]',
    },
    {
      id: 'email',
      title: 'Email Us',
      subtitle: 'Fast email response',
      value: 'info@oneclickbiz.in',
      link: 'mailto:info@oneclickbiz.in',
      icon: Mail,
      iconBg: 'bg-purple-100 text-[#7547F5]',
    },
    {
      id: 'whatsapp',
      title: 'Chat on WhatsApp',
      subtitle: 'Instant priority support',
      value: '+91 8374372733',
      link: 'https://wa.me/918374372733',
      icon: MessageCircle,
      iconBg: 'bg-emerald-100 text-[#16B981]',
    },
    {
      id: 'help',
      title: 'Help Center',
      subtitle: 'Find answers anytime',
      value: 'Visit Help Center',
      link: '/contact',
      isAction: true,
      icon: HelpCircle,
      iconBg: 'bg-pink-100 text-pink-600',
    },
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 bg-[#F8FAFF] border-b border-[#E2E9FA]/60 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-[#EDF3FF] text-[#174BFF] border border-[#C7D7FE] text-[11px] font-bold uppercase tracking-wider mb-2.5">
            WE'RE HERE TO HELP
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#10183F] tracking-tight leading-tight">
            Need Help? Get in Touch.
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[#64718F] font-normal">
            Our team is always ready to help you get started and answer your questions.
          </p>
        </div>

        {/* 4 Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {contacts.map((c) => {
            const IconComp = c.icon;
            return (
              <a
                key={c.id}
                href={c.link}
                target={c.id === 'whatsapp' ? '_blank' : undefined}
                rel={c.id === 'whatsapp' ? 'noopener noreferrer' : undefined}
                className="group bg-white rounded-2xl border border-[#E2E9FA] hover:border-blue-300 p-4 sm:p-5 flex items-center gap-3.5 shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <div className={`w-11 h-11 rounded-full ${c.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-2xs`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-semibold text-[#64718F] block">
                    {c.title}
                  </span>
                  <div className="text-xs sm:text-sm font-bold text-[#10183F] group-hover:text-[#174BFF] transition-colors truncate flex items-center gap-1 mt-0.5">
                    <span>{c.value}</span>
                    {c.isAction && <ArrowRight className="w-3.5 h-3.5 shrink-0" />}
                  </div>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
