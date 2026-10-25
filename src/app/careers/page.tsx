import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { Briefcase, ArrowLeft, Sparkles, MapPin, Clock, ArrowRight, CheckCircle2, MessageCircle, Mail } from 'lucide-react';

export const metadata = {
  title: 'Careers | OneClickBiz',
  description: 'Join the OneClickBiz team. Help us reinvent digital business identity, contactless networking, and WhatsApp commerce for millions of professionals.',
};

export default function CareersPage() {
  const openRoles = [
    {
      title: 'Full-Stack TypeScript / Next.js Engineer',
      department: 'Engineering',
      location: 'Bengaluru / Remote',
      type: 'Full-Time',
      description: 'Build hyper-responsive client interfaces, real-time profile customizers, and high-throughput serverless microservices for dynamic digital business cards and WhatsApp stores.',
      requirements: ['3+ years in React / Next.js, TypeScript, Tailwind CSS', 'Experience with PostgreSQL, Prisma ORM, and Edge Caching', 'Strong intuition for UI/UX micro-interactions']
    },
    {
      title: 'Growth Marketing & Social Media Lead',
      department: 'Marketing & Community',
      location: 'Hyderabad / Remote',
      type: 'Full-Time',
      description: 'Scale creator acquisition, forge B2B enterprise partnerships, and lead community viral loops for smart digital business profiles.',
      requirements: ['Proven track record scaling SaaS / consumer tech products', 'Deep understanding of WhatsApp marketing funnels & Instagram reels', 'Data-driven mindset with analytics proficiency']
    },
    {
      title: 'Customer Success & Enterprise Onboarding Specialist',
      department: 'Support & Operations',
      location: 'Hybrid / Remote',
      type: 'Full-Time',
      description: 'Guide enterprise clients through bulk employee card provisioning, branded digital templates, and WhatsApp catalog setups.',
      requirements: ['Excellent written and verbal communication skills', 'High customer empathy with quick problem-solving agility', 'Comfortable assisting users over WhatsApp Live Chat and phone']
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFD] text-[#10183F] flex flex-col selection:bg-[#174BFF] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20 w-full">
        {/* Navigation & Header */}
        <div className="mb-12">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#174BFF] hover:text-[#103ED8] transition group mb-4"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF4FF] border border-[#C7D7FE] text-[#174BFF] text-xs font-bold w-fit mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>WE ARE HIRING</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#10183F] tracking-tight">
            Build the Future of <span className="bg-gradient-to-r from-[#174BFF] via-[#103ED8] to-[#174BFF] bg-clip-text text-transparent">Digital Identity</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#64718F] max-w-2xl leading-relaxed">
            At OneClickBiz, we are building the fastest, smartest digital business card, interactive WhatsApp mini store, and appointment engine for millions of modern creators and businesses.
          </p>
        </div>

        {/* Culture / Perks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-white border border-[#E2E9FA] shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#174BFF] flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#10183F]">Fast-Paced Innovation</h3>
            <p className="text-xs text-[#64718F] leading-relaxed">
              We ship quickly, iterate with actual customer feedback daily, and take tremendous pride in product design elegance.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E2E9FA] shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#10183F]">Remote-Friendly Flexibility</h3>
            <p className="text-xs text-[#64718F] leading-relaxed">
              Work from where you are most productive. We care about high-impact output and thoughtful results over fixed desk hours.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E2E9FA] shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#10183F]">Ownership &amp; Growth</h3>
            <p className="text-xs text-[#64718F] leading-relaxed">
              Every team member owns core features end-to-end with competitive compensation, bonuses, and room to grow into leadership.
            </p>
          </div>
        </div>

        {/* Open Positions List */}
        <div className="space-y-6 mb-16">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-[#10183F]">Open Roles</h2>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EEF4FF] border border-[#C7D7FE] text-[#174BFF]">
              {openRoles.length} Active Openings
            </span>
          </div>

          <div className="space-y-4">
            {openRoles.map((role, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-2xl bg-white border border-[#E2E9FA] hover:border-[#174BFF] transition duration-200 space-y-4 group shadow-xs hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold text-[#174BFF] uppercase tracking-wider">{role.department}</span>
                    <h3 className="text-lg font-bold text-[#10183F] group-hover:text-[#174BFF] transition-colors">{role.title}</h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#64718F]">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#94A3B8]" /> {role.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#94A3B8]" /> {role.type}</span>
                  </div>
                </div>

                <p className="text-xs text-[#64718F] leading-relaxed">{role.description}</p>

                <div className="pt-3 border-t border-[#E2E9FA] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold text-[#10183F]">Key Requirements:</p>
                    <ul className="text-[11px] text-[#64718F] list-disc list-inside space-y-0.5">
                      {role.requirements.map((req, rIdx) => (
                        <li key={rIdx}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <a 
                    href={`mailto:contact@oneclickbiz.in?subject=Application for ${encodeURIComponent(role.title)}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#174BFF] hover:bg-[#103ED8] text-white text-xs font-bold transition shadow-sm shrink-0 self-start sm:self-center cursor-pointer"
                  >
                    <span>Apply for Role</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* General Application Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#174BFF] via-[#103ED8] to-[#174BFF] text-white shadow-xl shadow-blue-500/10 border border-blue-400/30 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">Don&apos;t see your specific role?</h3>
            <p className="text-xs text-blue-100 max-w-xl">
              We are constantly seeking ambitious engineers, designers, and growth hackers. Send your portfolio and resume to our talent inbox.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a 
              href="mailto:contact@oneclickbiz.in?subject=General%20Careers%20Inquiry%20-%20OneClickBiz"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#174BFF] hover:bg-blue-50 text-xs font-bold transition shadow-sm"
            >
              <Mail className="w-4 h-4" />
              <span>Email Resume</span>
            </a>
            <a 
              href="https://wa.me/916304989071?text=Hi%20OneClickBiz%20Team%2C%20I%20am%20interested%20in%20career%20opportunities."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Message HR</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
