'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  ShoppingBag, 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  ExternalLink, 
  QrCode, 
  Share2, 
  Download, 
  Layers, 
  Film, 
  BookOpen, 
  ChevronDown, 
  ChevronUp,
  Plus, 
  Minus, 
  X, 
  Send, 
  Smartphone, 
  Globe, 
  Maximize2, 
  MessageCircle,
  ShieldCheck,
  TrendingUp,
  Zap,
  Users,
  Award
} from 'lucide-react';
import { DigitalProfile, ServiceItem, ProductItem, VideoItem, GalleryItem, BlogPostItem } from '@/lib/types';
import SocialIcon, { getSocialBrandColor } from '@/components/common/SocialIcon';
import { downloadVcfFile } from '@/lib/vcf';

export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED';

interface MBLMiniWebsiteViewProps {
  profile: DigitalProfile;
  cart: { product: ProductItem; quantity: number }[];
  addToCart: (product: ProductItem) => void;
  updateQuantity: (productId: string, delta: number) => void;
  setIsCartOpen: (open: boolean) => void;
  selectedCurrency: CurrencyCode;
  setSelectedCurrency: (c: CurrencyCode) => void;
  formatPrice: (inrPrice: number, curr: CurrencyCode) => string;
  totalConvertedPrice: string | number;
  setIsUPIModalOpen: (open: boolean) => void;
  setBookingService: (srv: ServiceItem | null) => void;
  setBookingSuccess: (s: boolean) => void;
  quoteServices: ServiceItem[];
  toggleQuoteService: (srv: ServiceItem) => void;
  sendWhatsAppQuotation: () => void;
  leadName: string;
  setLeadName: (v: string) => void;
  leadEmail: string;
  setLeadEmail: (v: string) => void;
  leadPhone: string;
  setLeadPhone: (v: string) => void;
  leadMessage: string;
  setLeadMessage: (v: string) => void;
  handleLeadSubmit: (e: React.FormEvent) => void;
  leadSuccess: boolean;
  trackAction: (action: string) => void;
  getCleanWhatsAppNumber: (p: DigitalProfile) => string;
  getEmbedUrl: (v: VideoItem) => string;
  viewMode: 'mobile' | 'website';
  setViewMode: (m: 'mobile' | 'website') => void;
  showViewToggle?: boolean;
  setIsReviewModalOpen: (open: boolean) => void;
  dynamicTestimonials?: any[];
}

export default function MBLMiniWebsiteView({
  profile,
  cart,
  addToCart,
  updateQuantity,
  setIsCartOpen,
  selectedCurrency,
  setSelectedCurrency,
  formatPrice,
  totalConvertedPrice,
  setIsUPIModalOpen,
  setBookingService,
  setBookingSuccess,
  quoteServices,
  toggleQuoteService,
  sendWhatsAppQuotation,
  leadName,
  setLeadName,
  leadEmail,
  setLeadEmail,
  leadPhone,
  setLeadPhone,
  leadMessage,
  setLeadMessage,
  handleLeadSubmit,
  leadSuccess,
  trackAction,
  getCleanWhatsAppNumber,
  getEmbedUrl,
  viewMode,
  setViewMode,
  showViewToggle,
  setIsReviewModalOpen,
  dynamicTestimonials
}: MBLMiniWebsiteViewProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [galleryFilter, setGalleryFilter] = useState('All');
  const [activeLightboxImg, setActiveLightboxImg] = useState<GalleryItem | null>(null);

  const waNumber = getCleanWhatsAppNumber(profile);
  const cleanPhone = profile.phone ? profile.phone.replace(/[^\d+]/g, '') : '+919876543210';

  const services = profile.sectionData?.services?.items || [];
  const products = profile.sectionData?.products?.items || [];
  const videos = profile.sectionData?.videos?.items || [];
  const gallery = profile.sectionData?.gallery?.items || [];
  const testimonials = dynamicTestimonials || profile.sectionData?.testimonials?.items || [];
  const socials = profile.sectionData?.socials?.items || [];

  const categories = Array.from(new Set(gallery.map(g => g.category).filter(Boolean))) as string[];
  const filteredGallery = galleryFilter === 'All' ? gallery : gallery.filter(g => g.category === galleryFilter);

  // MBL Signature FAQs tailored to the profile's business
  const faqs = [
    {
      q: 'How does working with ' + (profile.company || profile.name) + ' start?',
      a: 'We begin with an introductory discovery consultation via WhatsApp or direct call. We analyze your requirements, provide transparent scope and timelines, and outline actionable deliverables.'
    },
    {
      q: 'Do you offer online / remote services across India and internationally?',
      a: 'Yes, absolutely. All digital reality solutions, performance campaigns, design funnels, and consultation sessions are delivered seamlessly online via Google Meet, Zoom, and dedicated client WhatsApp groups.'
    },
    {
      q: 'What are the payment options and turnaround times?',
      a: 'We accept direct 0% fee instant UPI payments (GPay, PhonePe, Paytm), net banking, and card transfers. Project kickoffs typically occur within 24 to 48 hours with milestone-based delivery.'
    },
    {
      q: 'Can I book an appointment or request a custom quotation directly?',
      a: 'Yes! Select any service above to book a scheduled slot or click "Add Quote" on multiple packages to receive an instant itemized estimate directly on WhatsApp.'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] text-[#111111] font-sans selection:bg-[#FFE500] selection:text-black">
      
      {/* 1. TOP STICKY WEBSITE NAVIGATION (MBL STYLE) */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-black/5 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Name */}
          <a href="#top" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-black/10 bg-slate-100 shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 group-hover:text-black">
                  {profile.company || profile.name}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" title="Active Online" />
              </div>
              <p className="text-[11px] text-slate-500 font-medium truncate max-w-[200px] sm:max-w-xs">
                {profile.designation || 'Verified Business Partner'}
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-700">
            <a href="#about" className="hover:text-black hover:underline underline-offset-8 transition-colors">About</a>
            {services.length > 0 && <a href="#services" className="hover:text-black hover:underline underline-offset-8 transition-colors">Services</a>}
            {products.length > 0 && <a href="#store" className="hover:text-black hover:underline underline-offset-8 transition-colors">Store</a>}
            {videos.length > 0 && <a href="#videos" className="hover:text-black hover:underline underline-offset-8 transition-colors">Videos</a>}
            {gallery.length > 0 && <a href="#portfolio" className="hover:text-black hover:underline underline-offset-8 transition-colors">Portfolio</a>}
            {testimonials.length > 0 && <a href="#reviews" className="hover:text-black hover:underline underline-offset-8 transition-colors">Reviews</a>}
            <a href="#faq" className="hover:text-black hover:underline underline-offset-8 transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-black hover:underline underline-offset-8 transition-colors">Contact</a>
          </nav>

          {/* Action Header CTAs & View Switcher */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {showViewToggle && (
              <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-slate-100 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setViewMode('website')}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition ${
                    viewMode === 'website' ? 'bg-black text-white shadow-xs' : 'text-slate-600 hover:text-black'
                  }`}
                >
                  💻 Website
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('mobile')}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition ${
                    viewMode === 'mobile' ? 'bg-black text-white shadow-xs' : 'text-slate-600 hover:text-black'
                  }`}
                >
                  📱 Mobile Card
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                trackAction('contact_download');
                downloadVcfFile(profile);
              }}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-bold transition active:scale-95 shadow-xs"
              title="Save Contact to Phone"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save Contact</span>
            </button>

            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ${profile.name}, I am exploring your mini-website and would like to connect.`)}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackAction('whatsapp_header_click')}
              className="px-4 py-2 rounded-full bg-[#FFE500] hover:bg-[#FADB00] text-black font-extrabold text-xs flex items-center gap-1.5 shadow-sm hover:shadow transition-all active:scale-95"
            >
              <SocialIcon platform="whatsapp" size={15} colored={false} className="text-black" />
              <span>WhatsApp Us</span>
            </a>

            {cart.length > 0 && (
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full bg-black text-white hover:bg-slate-800 transition"
                title="View WhatsApp Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FFE500] text-black text-[9px] font-black flex items-center justify-center">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* 2. HERO SECTION (MBL SIGNATURE LOOK) */}
      <section id="top" className="py-14 sm:py-20 lg:py-24 border-b border-black/5 bg-gradient-to-b from-white via-white to-[#F8F9FA] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Kicker Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE500]/30 border border-[#FFE500] text-black text-xs font-extrabold tracking-wide uppercase shadow-xs">
                <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                <span>Learn. Connect. Grow.</span>
              </div>

              {/* Massive Editorial Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tight text-slate-900 leading-[1.08]">
                BUILD YOUR DIGITAL{' '}
                <span className="px-3 sm:px-4 py-0.5 rounded-xl bg-[#FFE500] text-black inline-block shadow-sm">
                  FUTURE.
                </span>
              </h1>

              {/* Founder Bio / Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
                {profile.bio || 'Empowering clients, real estate leaders, and enterprises with practical digital execution, bespoke campaigns, and automated growth funnels.'}
              </p>

              {/* Primary Dual Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ${profile.name}, I reached out from your website and would like to get started.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackAction('whatsapp_hero_click')}
                  className="px-6 py-3.5 rounded-full bg-black hover:bg-slate-800 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all active:scale-95"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 text-[#FFE500]" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    trackAction('contact_download');
                    downloadVcfFile(profile);
                  }}
                  className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 border-2 border-slate-300 font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95 shadow-xs"
                >
                  <Download className="w-4 h-4 text-slate-700" />
                  <span>Save Contact (VCF)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsUPIModalOpen(true)}
                  className="px-5 py-3.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition active:scale-95"
                >
                  <QrCode className="w-4 h-4 text-emerald-600" />
                  <span>Pay via UPI (0% Fee)</span>
                </button>
              </div>

              {/* Trust Ratings & Badges */}
              <div className="flex flex-wrap items-center gap-4 pt-3 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-1">
                  <div className="flex text-amber-500">
                    {'★★★★★'}
                  </div>
                  <span className="font-bold text-slate-900">4.9/5 Rating</span>
                  <span className="text-slate-400">• 120+ Verified Reviews</span>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Business Profile</span>
                </div>
              </div>

            </div>

            {/* Right Asymmetric Hero Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                
                {/* Background Shadow Box */}
                <div className="absolute inset-0 bg-[#FFE500] rounded-3xl transform rotate-3 scale-[1.02] shadow-xl -z-10" />

                {/* Main Card */}
                <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-7 shadow-2xl relative space-y-5">
                  
                  {/* Avatar & Floating Badges */}
                  <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Top Floating Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-extrabold uppercase tracking-wider text-[#FFE500] border border-white/10 shadow-xs">
                      Practical • Personal • Real
                    </div>

                    {/* Bottom Info on Image */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-xl font-black">{profile.name}</h3>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                      </div>
                      <p className="text-xs text-slate-300 font-medium">{profile.designation}</p>
                      <p className="text-[11px] text-amber-300 font-bold mt-0.5">{profile.company}</p>
                    </div>
                  </div>

                  {/* Quick Channels & Google Review Button */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={`tel:${cleanPhone}`}
                      className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold flex items-center gap-2 text-slate-800 transition"
                    >
                      <Phone className="w-4 h-4 text-slate-700 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-[10px] text-slate-500 font-normal">Call Now</div>
                        <div className="truncate text-xs">{profile.phone}</div>
                      </div>
                    </a>

                    <a
                      href={profile.googleReviewUrl || `https://www.google.com/search?q=${encodeURIComponent(`${profile.company || profile.name} reviews`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-amber-50/70 hover:bg-amber-100 border border-amber-200 text-xs font-bold flex items-center gap-2 text-amber-900 transition"
                    >
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                      <div>
                        <div className="text-[10px] text-amber-700 font-normal">Google Reviews</div>
                        <div className="text-xs font-extrabold">Rate 5 Stars</div>
                      </div>
                    </a>
                  </div>

                  {/* Social Badges Pill Bar */}
                  {socials.length > 0 && (
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Social Channels:</span>
                      <div className="flex items-center gap-1.5">
                        {socials.slice(0, 5).map(s => (
                          <a
                            key={s.id}
                            href={s.url}
                            target="_blank"
                            rel="noreferrer"
                            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition"
                            title={s.label || s.platform}
                          >
                            <SocialIcon platform={s.platform} size={15} />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FOUR-METRIC COUNTER BAR (MBL STYLE) */}
      <section className="py-8 bg-white border-b border-black/5 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100 text-center">
            
            <div className="pt-2 md:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">12+</div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">Years of Leadership</div>
            </div>

            <div className="pt-2 md:pt-0 md:pl-6">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">500+</div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">Projects Delivered</div>
            </div>

            <div className="pt-2 md:pt-0 md:pl-6">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">99.8%</div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">Client Satisfaction</div>
            </div>

            <div className="pt-2 md:pt-0 md:pl-6">
              <div className="text-3xl sm:text-4xl font-black text-emerald-600 tracking-tight">15 Mins</div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">Fast WhatsApp Turnaround</div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. THE APPROACH & BENTO GRID ("Meet Your Mentor & Approach") */}
      <section id="about" className="py-20 bg-[#F8F9FA] border-b border-black/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-2 max-w-3xl">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">— THE APPROACH</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 leading-tight">
              SKILLS FOR THE WORK YOU WANT TO DO.
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Marketing and business scale is built through practice and execution. Learn how campaigns, immersive 3D technology, and high-conversion buyer funnels work together.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Deep Charcoal Card */}
            <div className="lg:col-span-5 rounded-3xl bg-[#18181B] text-white p-8 sm:p-10 flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="space-y-5 relative z-10">
                <span className="px-3 py-1 rounded-full bg-[#FFE500] text-black text-[10px] font-black uppercase tracking-wider">
                  Meet Your Expert
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  {profile.name}
                </h3>
                <p className="text-xs font-bold text-[#FFE500] tracking-wider uppercase">
                  {profile.designation} • {profile.company}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {profile.sectionData?.about?.content || profile.bio || 'Understand the strategic thinking behind a multi-crore campaign. Then turn the lesson into results for your enterprise.'}
                </p>

                <div className="space-y-2 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FFE500]" />
                    <span>Based in Hyderabad &amp; operating Pan-India</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FFE500]" />
                    <span>Direct personal guidance &amp; campaign roadmaps</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 relative z-10">
                <a
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ${profile.name}, I would like to schedule a strategy consultation.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-full bg-[#FFE500] hover:bg-[#FADB00] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect With {profile.name.split(' ')[0]}</span>
                </a>
              </div>
            </div>

            {/* Right 3 Stacked Feature Cards */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-4">
              
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-black/5 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFE500]/30 border border-[#FFE500] flex items-center justify-center text-black font-black text-lg shrink-0">
                    01
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base sm:text-lg font-black uppercase tracking-tight text-slate-900">
                      Live Execution &amp; Practical Projects
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Connect classroom and conceptual strategy to real market campaigns. Build authentic assets, 3D interactive virtual tours, and automated buyer inquiry funnels.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-black/5 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFE500]/30 border border-[#FFE500] flex items-center justify-center text-black font-black text-lg shrink-0">
                    02
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base sm:text-lg font-black uppercase tracking-tight text-slate-900">
                      Personal Founder Guidance &amp; Audits
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Ask questions, get transparent feedback, and understand exact campaign economics. No generic theories—only data-driven execution.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-black/5 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFE500]/30 border border-[#FFE500] flex items-center justify-center text-black font-black text-lg shrink-0">
                    03
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base sm:text-lg font-black uppercase tracking-tight text-slate-900">
                      Career, Enterprise &amp; Commercial Support
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Prepare for real estate property launches, commercial sales pitches, enterprise buyer acquisitions, and high-ticket freelance growth.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. SERVICES & LIVE SCHEDULING (01, 02, 03, 04 MBL STYLE) */}
      {services.length > 0 && (
        <section id="services" className="py-20 bg-white border-b border-black/5 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">— OUR SERVICES &amp; PACKAGES</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900">
                  A COMPLETE FOUNDATION.
                </h2>
                <p className="text-sm text-slate-600">
                  Select any service package below to book a live slot or add to quotation for direct WhatsApp confirmation.
                </p>
              </div>

              {quoteServices.length > 0 && (
                <button
                  type="button"
                  onClick={sendWhatsAppQuotation}
                  className="px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition active:scale-95"
                >
                  <SocialIcon platform="whatsapp" size={15} colored={false} className="text-white" />
                  <span>Send Quote ({quoteServices.length} Items)</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((srv, idx) => (
                <div
                  key={srv.id}
                  className="p-7 rounded-3xl bg-[#F8F9FA] border border-black/5 hover:border-black/20 flex flex-col justify-between space-y-6 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-400 group-hover:text-black transition-colors">
                        0{idx + 1} / PACKAGE
                      </span>
                      <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {srv.durationMinutes} Mins
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-black leading-snug">
                      {srv.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {srv.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">Standard Investment:</span>
                      <span className="text-base sm:text-lg font-black text-slate-900">{srv.currency}{srv.price.toLocaleString()}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => toggleQuoteService(srv)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition active:scale-95 flex items-center justify-center gap-1 ${
                          quoteServices.some(s => s.id === srv.id)
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-400'
                            : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {quoteServices.some(s => s.id === srv.id) ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>In Quote</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Quote</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setBookingService(srv);
                          setBookingSuccess(false);
                        }}
                        className="py-2 px-3 rounded-xl bg-black hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1 transition active:scale-95 shadow-sm"
                      >
                        <span>Book Slot</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#FFE500]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 6. WHATSAPP STORE & CATALOG (MULTI-CURRENCY SWITCHER) */}
      {products.length > 0 && (
        <section id="store" className="py-20 bg-[#F8F9FA] border-b border-black/5 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">— ONLINE STORE &amp; ASSETS</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900">
                  WHATSAPP CATALOG STORE.
                </h2>
                <p className="text-sm text-slate-600">
                  Browse commercial products, templates, and digital assets. Instant 1-click WhatsApp order processing.
                </p>
              </div>

              {/* Currency Selector */}
              <div className="flex items-center gap-2 self-start sm:self-auto bg-white p-1 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-500 px-2">Currency:</span>
                {(['INR', 'USD', 'EUR', 'AED'] as CurrencyCode[]).map(curr => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => setSelectedCurrency(curr)}
                    className={`px-3 py-1 rounded-xl text-xs font-black transition ${
                      selectedCurrency === curr ? 'bg-[#FFE500] text-black shadow-xs' : 'text-slate-600 hover:text-black'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map(prod => (
                <div
                  key={prod.id}
                  className="rounded-3xl bg-white border border-black/5 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="h-52 w-full overflow-hidden bg-slate-100 relative">
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/85 backdrop-blur-md text-xs font-black text-[#FFE500] shadow-sm">
                      {formatPrice(prod.price, selectedCurrency)}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{prod.category}</span>
                      <h4 className="text-sm sm:text-base font-black text-slate-900 line-clamp-2 leading-tight">
                        {prod.name}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {prod.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => addToCart(prod)}
                      className="w-full py-3 rounded-2xl bg-black hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#FFE500]" />
                      <span>Add to WhatsApp Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 7. HIGH-CONTRAST DARK VIDEO DEMOS & REELS (MBL "STUDENT VOICES" STYLE) */}
      {videos.length > 0 && (
        <section id="videos" className="py-20 bg-[#111111] text-white border-b border-white/10 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-black uppercase tracking-widest text-[#FFE500]">— VIDEO SHOWCASES</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
                HEAR IT FROM THEM.
              </h2>
              <p className="text-sm text-slate-400">
                Real client walkthroughs, 3D interactive virtual site tours, and feature demonstrations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videos.map(vid => {
                const embedSrc = getEmbedUrl(vid);
                const isYouTube = vid.type === 'youtube' || embedSrc.includes('youtube.com/embed') || (vid.url && (vid.url.includes('youtu.be') || vid.url.includes('youtube')));
                const isInstagram = vid.type === 'instagram' || embedSrc.includes('instagram.com') || (vid.url && vid.url.includes('instagram.com'));

                return (
                  <div
                    key={vid.id}
                    className="rounded-3xl bg-[#1E1E1E] border border-white/10 overflow-hidden flex flex-col justify-between shadow-2xl group"
                  >
                    {isYouTube && (
                      <div className="relative w-full aspect-video bg-black">
                        <iframe
                          src={embedSrc}
                          title={vid.title}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}

                    {!isYouTube && isInstagram && (
                      <div className="relative w-full bg-black flex flex-col items-center">
                        <div className="w-full aspect-[9/16] max-h-[460px] bg-black overflow-hidden relative">
                          <iframe
                            src={embedSrc}
                            title={vid.title}
                            className="w-full h-full border-0"
                            allowFullScreen
                            loading="lazy"
                          />
                        </div>
                        <div className="w-full p-3 bg-white/5 border-t border-white/10 flex items-center justify-between px-4">
                          <span className="text-xs text-[#FFE500] font-bold flex items-center gap-1.5">
                            <Film className="w-3.5 h-3.5" /> Instagram Reel
                          </span>
                          <a
                            href={vid.url}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1 rounded-full bg-[#FFE500] text-black font-extrabold text-[11px] flex items-center gap-1"
                          >
                            <span>Watch on IG</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    )}

                    {!isYouTube && !isInstagram && (
                      <div className="relative w-full aspect-video bg-black">
                        <video src={vid.url} controls playsInline className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="p-6 space-y-2">
                      <h4 className="text-base sm:text-lg font-black text-white">{vid.title}</h4>
                      {vid.caption && (
                        <p className="text-xs text-slate-400 leading-relaxed font-normal">{vid.caption}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>
      )}

      {/* 8. PORTFOLIO & WORK GALLERY */}
      {gallery.length > 0 && (
        <section id="portfolio" className="py-20 bg-white border-b border-black/5 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">— WORK &amp; PORTFOLIO</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900">
                  PROJECTS WE ARE PROUD OF.
                </h2>
                <p className="text-sm text-slate-600">
                  Explore our recent architectural renders, luxury property funnels, and enterprise deliverables.
                </p>
              </div>

              {categories.length > 1 && (
                <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-[#F8F9FA] rounded-2xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setGalleryFilter('All')}
                    className={`px-3 py-1 rounded-xl text-xs font-black transition ${
                      galleryFilter === 'All' ? 'bg-black text-white' : 'text-slate-600 hover:text-black'
                    }`}
                  >
                    All ({gallery.length})
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setGalleryFilter(cat)}
                      className={`px-3 py-1 rounded-xl text-xs font-black transition ${
                        galleryFilter === cat ? 'bg-black text-white' : 'text-slate-600 hover:text-black'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredGallery.map(img => (
                <div
                  key={img.id}
                  onClick={() => setActiveLightboxImg(img)}
                  className="rounded-3xl overflow-hidden bg-slate-100 aspect-square relative cursor-pointer group shadow-sm hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    src={img.imageUrl}
                    alt={img.title || 'Portfolio Item'}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity p-4 flex flex-col justify-end text-white">
                    {img.category && (
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#FFE500]">
                        {img.category}
                      </span>
                    )}
                    <h5 className="text-xs sm:text-sm font-black line-clamp-1">{img.title || 'View Showcase'}</h5>
                  </div>
                  <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 9. CLIENT REVIEWS & TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section id="reviews" className="py-20 bg-[#F8F9FA] border-b border-black/5 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">— CLIENT VOICES</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900">
                  REAL LEARNERS. REAL CLIENTS.
                </h2>
                <p className="text-sm text-slate-600">
                  Verified feedback from developers, enterprise partners, and entrepreneurs.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsReviewModalOpen(true)}
                className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 transition active:scale-95 shadow-xs self-start sm:self-auto"
              >
                <Plus className="w-4 h-4 text-[#FFE500]" />
                <span>Write Review</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map(t => (
                <div
                  key={t.id}
                  className="p-7 rounded-3xl bg-white border border-black/5 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-amber-500 text-sm tracking-tight">
                        {'★'.repeat(t.rating || 5)}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Verified
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                      &ldquo;{t.content}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                    {t.clientAvatar ? (
                      <img src={t.clientAvatar} alt={t.clientName} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-black text-[#FFE500] font-black text-sm flex items-center justify-center">
                        {t.clientName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h5 className="font-extrabold text-sm text-slate-900">{t.clientName}</h5>
                      <p className="text-[11px] text-slate-500">{t.clientRole} {t.clientCompany ? `• ${t.clientCompany}` : ''}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 10. GOOD QUESTIONS / FAQ ACCORDION (MBL STYLE) */}
      <section id="faq" className="py-20 bg-white border-b border-black/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Header */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-slate-500">— GOOD QUESTIONS</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 leading-tight">
                A FEW THINGS TO KNOW.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Everything you need to know about our services, booking process, WhatsApp store delivery, and consultation timelines.
              </p>
              
              <div className="pt-4">
                <a
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ${profile.name}, I have a question regarding your services.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black hover:underline underline-offset-4"
                >
                  <span>Have another question? Ask on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </a>
              </div>
            </div>

            {/* Right Accordion List */}
            <div className="lg:col-span-7 space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200 overflow-hidden bg-[#F8F9FA] transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-black text-sm sm:text-base text-slate-900"
                    >
                      <span>{faq.q}</span>
                      <div className={`w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0 border border-slate-200 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                        <ChevronDown className="w-4 h-4 text-slate-600" />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal border-t border-slate-200/60 pt-3">
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

      {/* 11. SIGNATURE ELECTRIC YELLOW CTA BANNER (MBL STYLE) */}
      <section id="contact" className="py-20 bg-[#F8F9FA] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl sm:rounded-[36px] bg-[#FFE500] text-black p-8 sm:p-14 lg:p-16 shadow-2xl relative overflow-hidden space-y-10">
            
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-black/75">
                YOUR NEXT CHAPTER STARTS HERE
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight">
                LET&apos;S GET YOU STARTED.
              </h2>
              <p className="text-base sm:text-lg text-black/80 font-medium">
                Start with a conversation. The {profile.company || profile.name} team can help with project scoping, quotation, and direct WhatsApp support.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
              
              {/* Direct Buttons */}
              <div className="lg:col-span-6 flex flex-wrap items-center gap-3">
                <a
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ${profile.name}, I am ready to get started. Let's discuss!`)}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackAction('whatsapp_banner_click')}
                  className="px-8 py-4 rounded-full bg-black hover:bg-slate-900 text-white font-black text-sm uppercase tracking-wider flex items-center gap-2 shadow-2xl transition active:scale-95"
                >
                  <SocialIcon platform="whatsapp" size={18} colored={false} className="text-[#FFE500]" />
                  <span>Start WhatsApp Chat</span>
                  <ArrowRight className="w-4 h-4 text-[#FFE500]" />
                </a>

                <a
                  href={`tel:${cleanPhone}`}
                  onClick={() => trackAction('call_banner_click')}
                  className="px-6 py-4 rounded-full bg-white hover:bg-black hover:text-white text-black font-black text-sm uppercase tracking-wider flex items-center gap-2 shadow-md transition active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  <span>{profile.phone}</span>
                </a>
              </div>

              {/* Direct Info Card */}
              <div className="lg:col-span-6 rounded-2xl bg-black/90 backdrop-blur-md text-white p-6 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#FFE500]">Direct Connect Hub</span>
                  <span className="text-emerald-400 font-bold">24/7 Available</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Email Us</span>
                    <a href={`mailto:${profile.email}`} className="font-bold text-white hover:text-[#FFE500] truncate block">
                      {profile.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Location</span>
                    <span className="font-bold text-white truncate block">
                      {profile.address || 'Hyderabad, Telangana'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setIsUPIModalOpen(true)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Pay via UPI (GPay • PhonePe • Paytm)</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 12. CLEAN MINIMAL WEBSITE FOOTER (MBL STYLE) */}
      <footer className="bg-white border-t border-black/5 py-12 text-slate-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
                <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-black text-base text-slate-900">{profile.company || profile.name}</h4>
                <p className="text-[11px] text-slate-500">{profile.designation}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs font-extrabold uppercase tracking-wider text-slate-700">
              <a href="#about" className="hover:text-black">About</a>
              <a href="#services" className="hover:text-black">Services</a>
              <a href="#store" className="hover:text-black">Store</a>
              <a href="#videos" className="hover:text-black">Videos</a>
              <a href="#portfolio" className="hover:text-black">Portfolio</a>
              <a href="#reviews" className="hover:text-black">Reviews</a>
              <a href="#faq" className="hover:text-black">FAQ</a>
              <a href="#contact" className="hover:text-black">Contact</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-medium">
            <p>© 2026 {profile.company || profile.name}. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span>Powered by</span>
              <a href="https://oneclickbiz.in" target="_blank" rel="noreferrer" className="font-extrabold text-black hover:underline">
                OneClickBiz Mini-Website Engine
              </a>
              <span>•</span>
              <span>Merlinflow Technologies</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Lightbox Modal for Portfolio Gallery */}
      {activeLightboxImg && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <button
              onClick={() => setActiveLightboxImg(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black transition"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={activeLightboxImg.imageUrl} alt={activeLightboxImg.title} className="w-full max-h-[75vh] object-contain" />
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-[#FFE500]">{activeLightboxImg.category}</span>
                <h4 className="font-bold text-sm">{activeLightboxImg.title}</h4>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
