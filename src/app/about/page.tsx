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
  Mail, 
  MapPin, 
  Heart, 
  Zap, 
  CheckCircle2, 
  Globe2, 
  Quote,
  Building2,
  Compass,
  Rocket,
  Lightbulb,
  Check
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
          <p className="text-sm sm:text-base text-[#64718F] leading-relaxed max-w-2xl mx-auto">
            OneClickBiz was created with a clear purpose: empower every entrepreneur, retail shop owner, doctor, consultant, and enterprise to connect, showcase, and transact in one click—without expensive agencies or technical complexity.
          </p>
        </div>

        {/* FOUNDER STORY SPOTLIGHT CARD */}
        <section className="mb-20">
          <div className="rounded-3xl bg-gradient-to-br from-white via-[#F8FAFD] to-white border border-[#C7D7FE] shadow-xl shadow-blue-500/5 p-6 sm:p-10 lg:p-12 relative overflow-hidden">
            
            {/* Background Decorative Radial */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
              
              {/* Founder Image & Personal Badge (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col items-center text-center lg:sticky lg:top-28">
                <div className="relative group">
                  <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-tr from-slate-100 to-slate-200">
                    <img 
                      src="/kishore-profile-v2.png" 
                      alt="Adduri Sai Kishore - Founder of OneClickBiz" 
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Verified Founder Badge */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-3.5 py-1 rounded-full border border-emerald-200 shadow-md flex items-center gap-1.5 text-xs font-bold text-[#059669] whitespace-nowrap">
                    <ShieldCheck className="w-4 h-4 text-[#059669]" />
                    <span>Verified Founder &amp; Architect</span>
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

                {/* Founder Commitment Pill */}
                <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 max-w-xs text-left leading-relaxed">
                  <span className="font-semibold text-slate-800 block mb-0.5">My Personal Promise:</span>
                  Every business on OneClickBiz gets direct support, 0% platform commission on orders, and enterprise-grade reliability from day one.
                </div>
              </div>

              {/* Founder Story Narrative (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF4FF] border border-[#C7D7FE] text-[#174BFF] text-xs font-bold uppercase tracking-wider">
                  <Quote className="w-3.5 h-3.5" />
                  <span>The Founder&apos;s Journey</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#10183F] tracking-tight leading-snug">
                  &ldquo;I saw brilliant businesses held back by paper cards and overpriced agencies. I decided to fix it.&rdquo;
                </h3>

                <div className="space-y-4 text-xs sm:text-sm text-[#475569] leading-relaxed">
                  <p>
                    Over the past several years, I had the privilege of meeting hundreds of ambitious business owners across Hyderabad and diverse parts of India—retailers, doctors, chartered accountants, real estate developers, coaching institute founders, and home-grown entrepreneurs.
                  </p>
                  
                  <p>
                    Regardless of their industry or how incredible their products were, I noticed the exact same heartbreaking cycle at every exhibition, clinic lobby, and business meeting:
                  </p>

                  <div className="space-y-2.5 my-3 pl-2 border-l-2 border-blue-200">
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                      <p className="text-xs text-slate-700">
                        <strong>Paper Cards Get Discarded:</strong> Business owners print boxes of visiting cards. Yet within 48 hours, over 88% end up crumpled in pockets, misplaced in drawers, or thrown away.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                      <p className="text-xs text-slate-700">
                        <strong>The Typing Friction:</strong> When someone genuinely wants to save a contact, manually copying 10-digit numbers, spelling email addresses, and typing website URLs creates friction. Most clients give up halfway.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                      <p className="text-xs text-slate-700">
                        <strong>The Agency Trap &amp; Commission Tax:</strong> Web agencies routinely quote ₹30,000 to ₹50,000 for slow, static websites that break on phones, while marketplace platforms charge 5% to 15% commissions on hard-earned sales.
                      </p>
                    </div>
                  </div>

                  <p>
                    In India, modern commerce doesn&apos;t happen on heavy corporate websites. <strong>It happens directly on WhatsApp and UPI.</strong> Customers want to glance at a verified catalog, tap once to save full contact details into their phonebook, and send an order directly to WhatsApp.
                  </p>

                  <p>
                    <strong>That is why I created OneClickBiz.</strong>
                  </p>

                  <p>
                    Under <strong>Merlinflow Technologies</strong>, our vision was simple: engineer an ultra-fast, intuitive SaaS platform where any professional—without writing a single line of code—can create a stunning commercial business mini-website, dynamic vector QR code, appointment booking portal, and WhatsApp store in less than 2 minutes.
                  </p>
                </div>

                {/* Key Milestones in Our Vision */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-[#E2E9FA] space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#10183F] flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-[#174BFF]" />
                    <span>How We Engineered the Solution:</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>1-Click Contact Save (.VCF to Phonebook)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>WhatsApp Mini-Store with 0% Fees</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>Dynamic Vector QR for Displays &amp; Desks</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>Full Custom Domain &amp; Sub-Second Speed</span>
                    </li>
                  </ul>
                </div>

                {/* Founder Quote Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-white to-indigo-50 border-l-4 border-l-[#174BFF] border-y border-r border-[#E2E9FA] shadow-xs">
                  <p className="text-xs sm:text-sm text-[#10183F] font-semibold italic leading-relaxed">
                    &ldquo;Our vision is not just replacing paper with screens. It is giving every hardworking entrepreneur—from a local salon in Nagole to a nationwide real estate firm—a digital presence that commands immediate trust and closes sales with zero friction.&rdquo;
                  </p>
                  <p className="mt-2 text-xs text-[#174BFF] font-bold">
                    — Adduri Sai Kishore, Founder &amp; Chief Product Architect
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
                Hosted on enterprise edge cloud CDNs with automated 256-bit TLS/SSL encryption and white-label custom domain routing. Your commercial mini-website opens in under 0.8 seconds anywhere in the world.
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
              Join thousands of doctors, realtors, consultants, and retail stores who have transformed how they network and sell. It takes less than 2 minutes to create your commercial mini-website.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link 
              href="/signup?intent=get_started"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-blue-50 text-[#174BFF] font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Create Your Mini-Website Now</span>
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
