'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Heart, 
  Zap, 
  CheckCircle2, 
  Layers, 
  Globe2, 
  Quote,
  Building2,
  Users,
  Target,
  Award
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFD] text-[#10183F] font-sans flex flex-col selection:bg-[#174BFF] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-20 w-full">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#174BFF] hover:text-[#103ED8] transition group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="space-y-4 mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDF3FF] border border-[#C7D7FE] text-[#174BFF] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Origin &amp; Mission</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#10183F] tracking-tight leading-tight">
            Building India&apos;s Most Accessible <span className="bg-gradient-to-r from-[#174BFF] to-[#4F46E5] bg-clip-text text-transparent">Digital Identity</span> Platform.
          </h1>
          <p className="text-sm sm:text-base text-[#64718F] leading-relaxed">
            OneClickBiz was created with a clear purpose: empower every entrepreneur, retail shop, doctor, consultant, and enterprise to connect, showcase, and transact in one click—without expensive agencies or technical complexity.
          </p>

          {/* Quick Stats Metrics Row */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-white border border-[#E2E9FA] shadow-xs">
              <p className="text-2xl font-black text-[#174BFF]">15,000+</p>
              <p className="text-xs text-[#64718F] font-medium">Profiles Created</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#E2E9FA] shadow-xs">
              <p className="text-2xl font-black text-[#059669]">0%</p>
              <p className="text-xs text-[#64718F] font-medium">Platform Fees</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#E2E9FA] shadow-xs">
              <p className="text-2xl font-black text-[#7547F5]">0 to 60s</p>
              <p className="text-xs text-[#64718F] font-medium">Cloud Provisioning</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#E2E9FA] shadow-xs">
              <p className="text-2xl font-black text-[#10183F]">99.9%</p>
              <p className="text-xs text-[#64718F] font-medium">Global Uptime</p>
            </div>
          </div>
        </div>

        {/* FOUNDER STORY SPOTLIGHT CARD */}
        <section className="mb-20">
          <div className="rounded-3xl bg-gradient-to-br from-white via-[#F8FAFD] to-white border border-[#C7D7FE] shadow-xl shadow-blue-500/5 p-6 sm:p-10 lg:p-12 relative overflow-hidden">
            
            {/* Background Decorative Radial */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              
              {/* Founder Image & Personal Badge (4 Cols) */}
              <div className="lg:col-span-5 flex flex-col items-center text-center">
                <div className="relative group">
                  <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-tr from-slate-100 to-slate-200">
                    <img 
                      src="/kishore-profile-v2.png" 
                      alt="Adduri Sai Kishore - Founder of OneClickBiz" 
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Verified Founder Badge */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-3.5 py-1 rounded-full border border-emerald-200 shadow-md flex items-center gap-1.5 text-xs font-bold text-[#059669]">
                    <ShieldCheck className="w-4 h-4 text-[#059669]" />
                    <span>Verified Founder</span>
                  </div>
                </div>

                <div className="mt-6 space-y-1">
                  <h2 className="text-xl font-extrabold text-[#10183F] tracking-tight">
                    Adduri Sai Kishore
                  </h2>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#174BFF]">
                    Founder &amp; Chief Product Architect
                  </p>
                  <p className="text-xs text-[#64718F]">
                    Merlinflow Technologies Private Limited
                  </p>
                </div>

                {/* Direct Connect Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
                  <a 
                    href="https://wa.me/916304989071?text=Hi%20Sai%20Kishore%2C%20I%20read%20your%20story%20on%20OneClickBiz%20and%20would%20love%20to%20connect."
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#059669] text-xs font-bold transition shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Chat on WhatsApp</span>
                  </a>
                  <a 
                    href="mailto:contact@oneclickbiz.in?subject=Connecting%20with%20OneClickBiz%20Founder"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#174BFF] text-xs font-bold transition shadow-xs"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Direct</span>
                  </a>
                </div>

                <div className="pt-3 flex items-center gap-1.5 text-xs text-[#64718F]">
                  <MapPin className="w-3.5 h-3.5 text-[#174BFF]" />
                  <span>Nagole, Hyderabad, Telangana, India</span>
                </div>
              </div>

              {/* Founder Story Narrative (7 Cols) */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF4FF] border border-[#C7D7FE] text-[#174BFF] text-xs font-bold uppercase tracking-wider">
                  <Quote className="w-3.5 h-3.5" />
                  <span>The Founder&apos;s Journey</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#10183F] tracking-tight leading-snug">
                  &ldquo;Why I Built OneClickBiz: Eliminating Friction for Millions of Business Owners.&rdquo;
                </h3>

                <div className="space-y-4 text-xs sm:text-sm text-[#475569] leading-relaxed">
                  <p>
                    For years while collaborating with retail shop owners, doctors, builders, freelance consultants, and enterprise sales teams across India, I repeatedly witnessed the same frustrating problem: <strong>business identity was fundamentally broken</strong>.
                  </p>
                  <p>
                    Entrepreneurs would spend thousands of rupees printing paper visiting cards. Yet within 48 hours, over <strong>88% of paper cards end up in a drawer or dustbin</strong>. When a client finally wanted to make contact or order, phone numbers were misdialed, addresses had changed, or the business website was too slow to load on a smartphone.
                  </p>
                  <p>
                    Meanwhile, modern Indian commerce doesn&apos;t happen on heavy corporate websites—it happens directly on <strong>WhatsApp and UPI</strong>. But small business owners were forced to either pay ₹30,000 to ₹50,000 to digital agencies for static websites, or surrender 2% to 5% commission fees on e-commerce aggregator platforms.
                  </p>
                  <p>
                    <strong>I knew there had to be a better way.</strong> We engineered OneClickBiz under Merlinflow Technologies to bridge this gap completely: a single, high-speed cloud platform where any professional can set up a modern smart digital card, dynamic vector QR code, catalog showcase, and WhatsApp mini-store in less than 2 minutes.
                  </p>
                </div>

                {/* Founder Quote Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-white to-indigo-50 border-l-4 border-l-[#174BFF] border-y border-r border-[#E2E9FA] shadow-xs">
                  <p className="text-xs sm:text-sm text-[#10183F] font-semibold italic leading-relaxed">
                    &ldquo;Our vision is not just replacing paper with screens. It is giving every hardworking entrepreneur—from a local salon in Nagole to a nationwide real estate advisory—a digital presence that commands immediate trust and closes sales with 0% friction.&rdquo;
                  </p>
                  <p className="mt-2 text-xs text-[#174BFF] font-bold">
                    — Adduri Sai Kishore, Founder
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* CORE VALUES & WHAT WE STAND FOR */}
        <section className="mb-20 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#174BFF]">
              Engineered For Real Business
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10183F] tracking-tight">
              The Principles That Drive OneClickBiz
            </h2>
            <p className="text-xs sm:text-sm text-[#64718F]">
              Every single line of code and feature we build is guided by four foundational commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Pillar 1 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E2E9FA] shadow-xs space-y-3 hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#174BFF] flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#10183F]">1-Click Frictionless Action</h3>
              <p className="text-xs text-[#64718F] leading-relaxed">
                No typing phone numbers manually. Visitors click one button to save your full contact details (.VCF) straight into their iOS or Android address book, complete with profile photo, website, and office address.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E2E9FA] shadow-xs space-y-3 hover:border-emerald-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#10183F]">Direct WhatsApp Commerce</h3>
              <p className="text-xs text-[#64718F] leading-relaxed">
                Customers can browse your product catalogs, select items, and send pre-formatted order summaries directly to your WhatsApp. You collect payments via UPI with 0% platform transaction fees.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E2E9FA] shadow-xs space-y-3 hover:border-purple-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#10183F]">Privacy First &amp; Zero Ad Brokers</h3>
              <p className="text-xs text-[#64718F] leading-relaxed">
                We strictly adhere to India&apos;s Digital Personal Data Protection Act, 2023 (DPDP Act). We do not run intrusive third-party ads or sell your client lead lists to data brokers. Your business data belongs to you.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E2E9FA] shadow-xs space-y-3 hover:border-sky-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Globe2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#10183F]">Sub-Second Global Edge Speed</h3>
              <p className="text-xs text-[#64718F] leading-relaxed">
                Hosted on enterprise edge cloud CDNs with automated 256-bit TLS/SSL encryption and white-label custom domain routing. Your smart card opens in under 0.8 seconds anywhere in the world.
              </p>
            </div>

          </div>
        </section>

        {/* COMPANY OPERATING PROFILE */}
        <section className="mb-20 p-6 sm:p-8 rounded-3xl bg-white border border-[#E2E9FA] shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[#E2E9FA]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#174BFF]" />
                <h3 className="text-lg font-bold text-[#10183F]">Corporate Information</h3>
              </div>
              <p className="text-xs text-[#64718F]">
                OneClickBiz is engineered and operated by Merlinflow Technologies Private Limited.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-[#174BFF] border border-blue-200 text-xs font-bold">
              Registered in Hyderabad, India
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-xs">
            <div className="space-y-1">
              <span className="text-[#64718F] font-medium">Platform Brand:</span>
              <p className="font-bold text-[#10183F] text-sm">OneClickBiz</p>
              <p className="text-[#64718F]">Connect | Build | Share</p>
            </div>
            <div className="space-y-1">
              <span className="text-[#64718F] font-medium">Parent Corporate Entity:</span>
              <p className="font-bold text-[#10183F] text-sm">Merlinflow Technologies Private Limited</p>
              <p className="text-[#64718F]">CIN Registered Enterprise</p>
            </div>
            <div className="space-y-1">
              <span className="text-[#64718F] font-medium">Headquarters &amp; Tech Hub:</span>
              <p className="font-bold text-[#10183F] text-sm">Nagole, Hyderabad</p>
              <p className="text-[#64718F]">Telangana 500068, India</p>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA BANNER */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#174BFF] via-[#103ED8] to-[#174BFF] text-white shadow-xl shadow-blue-500/10 border border-blue-400/30 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to Modernize Your Business Identity?
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Join thousands of doctors, realtors, consultants, and retail stores who have transformed how they network and sell. It takes less than 2 minutes to create your first smart card.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link 
              href="/signup?intent=get_started"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-blue-50 text-[#174BFF] font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Create Your Free Card Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="https://wa.me/916304989071?text=Hi%20Adduri%20Sai%20Kishore%2C%20I%20have%20questions%20about%20OneClickBiz."
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/15 hover:bg-white/20 border border-white/30 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300" />
              <span>Speak with Sai Kishore</span>
            </a>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-blue-100">
            <span className="flex items-center gap-1 font-semibold text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> Free Starter Tier Included
            </span>
            <span>•</span>
            <span>Zero credit card required</span>
            <span>•</span>
            <span>Instant live URL</span>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
