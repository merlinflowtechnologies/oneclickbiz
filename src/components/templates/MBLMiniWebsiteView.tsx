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

export function getWebsiteThemeTokens(themeName?: string) {
  switch (themeName) {
    case 'dark-onyx':
      return {
        canvasBg: 'bg-[#FAFAFA]',
        canvasText: 'text-[#111111]',
        selection: 'selection:bg-black selection:text-white',
        accentPill: 'bg-black text-white shadow-xs',
        accentDot: 'bg-black',
        accentText: 'text-black',
        accentLightBg: 'bg-slate-100 border-slate-300 text-slate-900',
        accentLightBorder: 'border-slate-300',
        headerCtaBtn: 'bg-black hover:bg-slate-800 text-white',
        headerCtaIcon: 'text-white',
        heroShadowBox: 'bg-slate-900',
        numberBadge: 'bg-slate-100 text-slate-900 border-slate-300',
        currencyActivePill: 'bg-black text-white',
        darkSectionAccent: 'text-white',
        darkSectionBtn: 'bg-white hover:bg-slate-100 text-black font-extrabold',
        ctaBanner: {
          bg: 'bg-black text-white border border-white/10',
          kicker: 'bg-white/10 text-white border-white/20',
          heading: 'text-white',
          subtext: 'text-slate-400',
          primaryBtn: 'bg-white hover:bg-slate-100 text-black font-extrabold shadow-lg',
          contactBoxBg: 'bg-slate-900/90',
          contactBoxBorder: 'border-white/10',
          contactAccentText: 'text-white hover:text-slate-200',
          upiBtn: 'bg-white hover:bg-slate-100 text-black font-extrabold'
        }
      };

    case 'emerald-pro':
      return {
        canvasBg: 'bg-[#F7FAF8]',
        canvasText: 'text-[#111111]',
        selection: 'selection:bg-emerald-500 selection:text-white',
        accentPill: 'bg-emerald-600 text-white shadow-xs',
        accentDot: 'bg-emerald-500',
        accentText: 'text-emerald-600',
        accentLightBg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
        accentLightBorder: 'border-emerald-300',
        headerCtaBtn: 'bg-emerald-600 hover:bg-emerald-500 text-white',
        headerCtaIcon: 'text-white',
        heroShadowBox: 'bg-emerald-600',
        numberBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        currencyActivePill: 'bg-emerald-600 text-white',
        darkSectionAccent: 'text-emerald-400',
        darkSectionBtn: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold',
        ctaBanner: {
          bg: 'bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white border border-emerald-500/30',
          kicker: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          heading: 'text-white',
          subtext: 'text-slate-300',
          primaryBtn: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black shadow-lg shadow-emerald-500/20',
          contactBoxBg: 'bg-slate-900/90',
          contactBoxBorder: 'border-emerald-500/20',
          contactAccentText: 'text-emerald-400 hover:text-emerald-300',
          upiBtn: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black'
        }
      };

    case 'obsidian-gold':
      return {
        canvasBg: 'bg-[#FAF9F6]',
        canvasText: 'text-stone-900',
        selection: 'selection:bg-amber-400 selection:text-stone-950',
        accentPill: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950 shadow-xs font-black',
        accentDot: 'bg-amber-400',
        accentText: 'text-amber-600',
        accentLightBg: 'bg-amber-50 border-amber-200 text-amber-900',
        accentLightBorder: 'border-amber-300',
        headerCtaBtn: 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:opacity-90 text-stone-950 font-black',
        headerCtaIcon: 'text-stone-950',
        heroShadowBox: 'bg-amber-400',
        numberBadge: 'bg-amber-50 text-amber-800 border-amber-200',
        currencyActivePill: 'bg-stone-950 text-amber-400',
        darkSectionAccent: 'text-amber-400',
        darkSectionBtn: 'bg-amber-400 hover:bg-amber-300 text-stone-950 font-black',
        ctaBanner: {
          bg: 'bg-gradient-to-br from-stone-950 via-zinc-950 to-amber-950/60 text-white border border-amber-500/30',
          kicker: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          heading: 'text-white',
          subtext: 'text-stone-300',
          primaryBtn: 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-stone-950 font-black shadow-lg shadow-amber-500/20',
          contactBoxBg: 'bg-stone-900/90',
          contactBoxBorder: 'border-amber-500/20',
          contactAccentText: 'text-amber-400 hover:text-amber-300',
          upiBtn: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950 font-black'
        }
      };

    case 'royal-navy':
      return {
        canvasBg: 'bg-[#F8FAFC]',
        canvasText: 'text-slate-900',
        selection: 'selection:bg-blue-600 selection:text-white',
        accentPill: 'bg-blue-600 text-white shadow-xs',
        accentDot: 'bg-blue-500',
        accentText: 'text-blue-600',
        accentLightBg: 'bg-blue-50 border-blue-200 text-blue-900',
        accentLightBorder: 'border-blue-300',
        headerCtaBtn: 'bg-blue-600 hover:bg-blue-700 text-white',
        headerCtaIcon: 'text-white',
        heroShadowBox: 'bg-blue-600',
        numberBadge: 'bg-blue-50 text-blue-700 border-blue-200',
        currencyActivePill: 'bg-blue-600 text-white',
        darkSectionAccent: 'text-sky-400',
        darkSectionBtn: 'bg-blue-500 hover:bg-blue-400 text-white font-bold',
        ctaBanner: {
          bg: 'bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white border border-blue-500/30',
          kicker: 'bg-blue-500/20 text-sky-300 border-blue-500/30',
          heading: 'text-white',
          subtext: 'text-slate-300',
          primaryBtn: 'bg-blue-500 hover:bg-blue-400 text-white font-extrabold shadow-lg shadow-blue-500/20',
          contactBoxBg: 'bg-slate-900/90',
          contactBoxBorder: 'border-blue-500/20',
          contactAccentText: 'text-sky-400 hover:text-sky-300',
          upiBtn: 'bg-blue-500 hover:bg-blue-400 text-white font-extrabold'
        }
      };

    case 'sunset-gold':
      return {
        canvasBg: 'bg-[#FFFBF8]',
        canvasText: 'text-stone-900',
        selection: 'selection:bg-rose-500 selection:text-white',
        accentPill: 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-xs',
        accentDot: 'bg-rose-500',
        accentText: 'text-rose-600',
        accentLightBg: 'bg-rose-50 border-rose-200 text-rose-900',
        accentLightBorder: 'border-rose-300',
        headerCtaBtn: 'bg-gradient-to-r from-rose-500 to-orange-500 hover:opacity-90 text-white',
        headerCtaIcon: 'text-white',
        heroShadowBox: 'bg-rose-500',
        numberBadge: 'bg-rose-50 text-rose-700 border-rose-200',
        currencyActivePill: 'bg-rose-600 text-white',
        darkSectionAccent: 'text-rose-400',
        darkSectionBtn: 'bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold',
        ctaBanner: {
          bg: 'bg-gradient-to-br from-slate-950 via-stone-950 to-rose-950/70 text-white border border-rose-500/30',
          kicker: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
          heading: 'text-white',
          subtext: 'text-stone-300',
          primaryBtn: 'bg-gradient-to-r from-rose-500 to-orange-500 text-white font-extrabold shadow-lg shadow-rose-500/20',
          contactBoxBg: 'bg-stone-900/90',
          contactBoxBorder: 'border-rose-500/20',
          contactAccentText: 'text-rose-400 hover:text-rose-300',
          upiBtn: 'bg-gradient-to-r from-rose-500 to-amber-500 text-white font-extrabold'
        }
      };

    case 'cyber-neon':
      return {
        canvasBg: 'bg-[#F8F9FA]',
        canvasText: 'text-[#111111]',
        selection: 'selection:bg-[#FFE500] selection:text-black',
        accentPill: 'bg-[#FFE500] text-black shadow-xs',
        accentDot: 'bg-[#FFE500]',
        accentText: 'text-yellow-600',
        accentLightBg: 'bg-[#FFE500]/20 border-[#FFE500]/40 text-black',
        accentLightBorder: 'border-[#FFE500]/60',
        headerCtaBtn: 'bg-[#FFE500] hover:bg-[#FADB00] text-black font-extrabold',
        headerCtaIcon: 'text-black',
        heroShadowBox: 'bg-[#FFE500]',
        numberBadge: 'bg-[#FFE500]/20 text-black border-[#FFE500]/40',
        currencyActivePill: 'bg-[#FFE500] text-black',
        darkSectionAccent: 'text-[#FFE500]',
        darkSectionBtn: 'bg-[#FFE500] hover:bg-[#FADB00] text-black font-extrabold',
        ctaBanner: {
          bg: 'bg-[#FFE500] text-black border border-black/10',
          kicker: 'bg-black/10 text-black border-black/20',
          heading: 'text-black',
          subtext: 'text-slate-800',
          primaryBtn: 'bg-black hover:bg-slate-800 text-white font-extrabold shadow-lg',
          contactBoxBg: 'bg-black text-white',
          contactBoxBorder: 'border-white/10',
          contactAccentText: 'text-[#FFE500] hover:underline',
          upiBtn: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black'
        }
      };

    case 'glassmorphic':
      return {
        canvasBg: 'bg-[#F9FBFC]',
        canvasText: 'text-slate-900',
        selection: 'selection:bg-cyan-500 selection:text-black',
        accentPill: 'bg-cyan-500 text-slate-950 shadow-xs font-bold',
        accentDot: 'bg-cyan-400',
        accentText: 'text-cyan-600',
        accentLightBg: 'bg-cyan-50 border-cyan-200 text-cyan-900',
        accentLightBorder: 'border-cyan-300',
        headerCtaBtn: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold',
        headerCtaIcon: 'text-slate-950',
        heroShadowBox: 'bg-cyan-400',
        numberBadge: 'bg-cyan-50 text-cyan-800 border-cyan-200',
        currencyActivePill: 'bg-cyan-500 text-slate-950 font-bold',
        darkSectionAccent: 'text-cyan-400',
        darkSectionBtn: 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold',
        ctaBanner: {
          bg: 'bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white border border-cyan-500/30',
          kicker: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
          heading: 'text-white',
          subtext: 'text-slate-300',
          primaryBtn: 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold shadow-lg shadow-cyan-500/20',
          contactBoxBg: 'bg-slate-900/90',
          contactBoxBorder: 'border-cyan-500/20',
          contactAccentText: 'text-cyan-400 hover:text-cyan-300',
          upiBtn: 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold'
        }
      };

    case 'modern-indigo':
    default:
      return {
        canvasBg: 'bg-[#FAFAFB]',
        canvasText: 'text-slate-900',
        selection: 'selection:bg-indigo-600 selection:text-white',
        accentPill: 'bg-slate-900 text-white shadow-xs',
        accentDot: 'bg-indigo-500',
        accentText: 'text-indigo-600',
        accentLightBg: 'bg-indigo-50 border-indigo-200 text-indigo-900',
        accentLightBorder: 'border-indigo-300',
        headerCtaBtn: 'bg-slate-900 hover:bg-black text-white font-bold',
        headerCtaIcon: 'text-indigo-400',
        heroShadowBox: 'bg-indigo-600/30 border-2 border-indigo-500/40',
        numberBadge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        currencyActivePill: 'bg-slate-900 text-white',
        darkSectionAccent: 'text-indigo-400',
        darkSectionBtn: 'bg-indigo-500 hover:bg-indigo-400 text-white font-bold',
        ctaBanner: {
          bg: 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white border border-indigo-500/30',
          kicker: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
          heading: 'text-white',
          subtext: 'text-slate-300',
          primaryBtn: 'bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold shadow-lg shadow-indigo-500/25',
          contactBoxBg: 'bg-slate-900/90',
          contactBoxBorder: 'border-indigo-500/20',
          contactAccentText: 'text-indigo-400 hover:text-indigo-300',
          upiBtn: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black'
        }
      };
  }
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

  const t = getWebsiteThemeTokens(profile.theme);

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

  // FAQs tailored to profile business
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
    <div className={`w-full min-h-screen ${t.canvasBg} ${t.canvasText} !font-sans ${t.selection} [&_h1]:!font-sans [&_h2]:!font-sans [&_h3]:!font-sans [&_h4]:!font-sans [&_h5]:!font-sans [&_h6]:!font-sans`}>
      
      {/* 1. TOP STICKY WEBSITE NAVIGATION (MINIMAL & REFINED) */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-black/5 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Name */}
          <a href="#top" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-black/10 bg-slate-100 shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover object-top" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm sm:text-base tracking-tight text-slate-950 group-hover:text-black !font-sans">
                  {profile.company || profile.name}
                </span>
                <span className={`w-2 h-2 rounded-full ${t.accentDot} inline-block animate-pulse`} title="Active Online" />
              </div>
              <p className="text-[11px] text-slate-500 font-semibold truncate max-w-[200px] sm:max-w-xs !font-sans">
                {profile.designation || 'Verified Business Partner'}
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-black uppercase tracking-wider text-slate-700 !font-sans">
            <a href="#about" className="hover:text-black transition-colors">About</a>
            {services.length > 0 && <a href="#services" className="hover:text-black transition-colors">Services</a>}
            {products.length > 0 && <a href="#store" className="hover:text-black transition-colors">Store</a>}
            {testimonials.length > 0 && <a href="#reviews" className="hover:text-black transition-colors">Reviews</a>}
            <a href="#faq" className="hover:text-black transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-black transition-colors">Contact</a>
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
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ${profile.name}, I am exploring your website and would like to connect.`)}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackAction('whatsapp_header_click')}
              className={`px-4 py-2 rounded-full ${t.headerCtaBtn} text-xs font-bold flex items-center gap-1.5 shadow-sm hover:shadow transition-all active:scale-95`}
            >
              <SocialIcon platform="whatsapp" size={15} colored={false} className={t.headerCtaIcon} />
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
                <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${t.accentPill} text-[9px] font-black flex items-center justify-center`}>
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* 2. HERO SECTION (EDITORIAL MINIMAL LOOK WITH MBL AESTHETICS) */}
      <section id="top" className="py-14 sm:py-20 lg:py-24 border-b border-black/5 bg-gradient-to-b from-white via-white to-slate-50/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Hero Content: Bold 3-line Stacked Headline */}
            <div className="lg:col-span-7 space-y-7 text-left">
              
              {/* Kicker Pill */}
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ${t.accentLightBg} ${t.accentLightBorder} text-xs font-black tracking-wider uppercase shadow-xs`}>
                <span className={`w-2 h-2 rounded-full ${t.accentDot}`} />
                <span>Learn. Connect. Grow.</span>
              </div>

              {/* Massive 3-Line MBL Grotesque Headline */}
              <h1 className="!font-sans text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-slate-950 leading-[0.92]">
                Build Your<br />
                <span className={`inline-block px-4 sm:px-6 py-1 sm:py-2 rounded-2xl ${t.accentPill} my-1.5 shadow-sm transform -rotate-1`}>
                  Digital
                </span><br />
                Future<span className={`inline-block w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 rounded-full ${t.accentDot} ml-2 mb-1 sm:mb-2 align-baseline`} />
              </h1>

              {/* Founder Bio / Subtitle */}
              <p className="!font-sans text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-normal">
                {profile.bio || 'Empowering clients, real estate leaders, and enterprises with practical digital execution, bespoke campaigns, and automated growth funnels.'}
              </p>

              {/* Primary Dual Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ${profile.name}, I reached out from your website and would like to get started.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackAction('whatsapp_hero_click')}
                  className="px-7 py-4 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all active:scale-95"
                >
                  <SocialIcon platform="whatsapp" size={17} colored={false} className="text-white" />
                  <span>Chat on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    trackAction('contact_download');
                    downloadVcfFile(profile);
                  }}
                  className="px-6 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 hover:border-slate-400 font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95 shadow-xs"
                >
                  <Download className="w-4 h-4 text-slate-700" />
                  <span>Save Contact (VCF)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsUPIModalOpen(true)}
                  className="px-5 py-4 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition active:scale-95"
                >
                  <QrCode className="w-4 h-4 text-emerald-600" />
                  <span>Pay via UPI (0% Fee)</span>
                </button>
              </div>

              {/* Trust Ratings & Badges */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500 text-sm">
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

            {/* Right MBL Organic Floating Portrait Showcase */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-full max-w-sm sm:max-w-md">
                
                {/* 1. Organic Ambient Aura Glow (Behind Portrait) */}
                <div className={`absolute -inset-4 sm:-inset-6 ${t.heroShadowBox} rounded-[3.5rem] blur-2xl opacity-70 -z-10`} />

                {/* 2. Floating Badge: Top Left (Rating & Reviews) */}
                <div className="absolute -left-3 sm:-left-6 top-8 z-20 px-3.5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-slate-200/80 flex items-center gap-2.5 animate-bounce-subtle">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 shrink-0">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                  <div>
                    <span className="font-black text-xs text-slate-900 block leading-tight">4.9 / 5.0</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">120+ Reviews</span>
                  </div>
                </div>

                {/* 3. Floating Badge: Top Right (Verified Executive) */}
                <div className="absolute -right-2 sm:-right-4 top-4 z-20 px-3 py-1.5 rounded-full bg-slate-950/90 backdrop-blur-md text-white border border-white/20 shadow-xl flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Verified Executive</span>
                </div>

                {/* 4. Floating Badge: Bottom Right (Experience & Deliverables) */}
                <div className="absolute -right-3 sm:-right-6 bottom-24 z-20 px-3.5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-slate-200/80 flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl ${t.accentLightBg} ${t.accentLightBorder} flex items-center justify-center shrink-0`}>
                    <Award className="w-4 h-4 text-slate-900" />
                  </div>
                  <div>
                    <span className="font-black text-xs text-slate-900 block leading-tight">12+ Yrs</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">500+ Projects</span>
                  </div>
                </div>

                {/* 5. Main Hero Portrait Frame - Aspect 3/4 with object-top guarantees head is completely visible! */}
                <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden bg-slate-100 border-4 border-white shadow-2xl group">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle Bottom Fade */}
                  <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                  {/* Clean Bottom Overlay Card */}
                  <div className="absolute bottom-4 inset-x-4 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-white/50 shadow-lg flex items-center justify-between text-slate-900">
                    <div className="min-w-0 pr-2">
                      <p className="font-black text-xs sm:text-sm text-slate-900 truncate">{profile.name}</p>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 font-semibold truncate">{profile.designation}</p>
                    </div>
                    <span className="shrink-0 flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Available
                    </span>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. METRIC COUNTER BAR (4 COLUMNS) */}
      <section className="py-12 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left">
            
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                12+
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wide">
                Years of Strategic Leadership
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                500+
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wide">
                High-Impact Projects
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                99.8%
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wide">
                Client Satisfaction Rate
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                15 Mins
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wide">
                Average WhatsApp Response
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. "THE APPROACH" / ABOUT BENTO GRID */}
      <section id="about" className="py-20 bg-[#F8F9FA] border-b border-black/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">— THE APPROACH</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900">
              WE TEACH HOW WORK ACTUALLY GETS DONE.
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              {profile.company || profile.name} bridges high-level commercial vision with boots-on-the-ground execution.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Deep Charcoal Card */}
            <div className="lg:col-span-5 rounded-3xl bg-[#18181B] text-white p-8 sm:p-10 flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="space-y-5 relative z-10">
                <span className={`px-3 py-1 rounded-full ${t.accentPill} text-[10px] font-black uppercase tracking-wider`}>
                  Meet Your Expert
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  {profile.name}
                </h3>
                <p className={`text-xs font-bold ${t.darkSectionAccent} tracking-wider uppercase`}>
                  {profile.designation} • {profile.company}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {profile.sectionData?.about?.content || profile.bio || 'Understand the strategic thinking behind a multi-crore campaign. Then turn the lesson into results for your enterprise.'}
                </p>

                <div className="space-y-2 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Check className={`w-4 h-4 ${t.darkSectionAccent}`} />
                    <span>Based in {profile.address ? profile.address.split(',')[0] : 'India'} &amp; operating Pan-India</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className={`w-4 h-4 ${t.darkSectionAccent}`} />
                    <span>Direct personal guidance &amp; project roadmaps</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 relative z-10">
                <a
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ${profile.name}, I would like to schedule a strategy consultation.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-3.5 rounded-full ${t.ctaBanner.primaryBtn} text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition active:scale-95`}
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
                  <div className={`w-12 h-12 rounded-2xl ${t.numberBadge} flex items-center justify-center font-black text-lg shrink-0`}>
                    01
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base sm:text-lg font-black uppercase tracking-tight text-slate-900">
                      Live Execution &amp; Practical Projects
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Connect conceptual strategy to real market campaigns. Build authentic assets, 3D interactive virtual tours, and automated buyer inquiry funnels.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-black/5 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${t.numberBadge} flex items-center justify-center font-black text-lg shrink-0`}>
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
                  <div className={`w-12 h-12 rounded-2xl ${t.numberBadge} flex items-center justify-center font-black text-lg shrink-0`}>
                    03
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base sm:text-lg font-black uppercase tracking-tight text-slate-900">
                      Career, Enterprise &amp; Commercial Support
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Equipping developers, agency owners, and executive leaders with the commercial frameworks to win high-value deals and retain clients.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. SERVICES & PACKAGES (NUMBERED 01-04 MBL STYLE) */}
      {services.length > 0 && (
        <section id="services" className="py-20 bg-white border-b border-black/5 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">— WHAT WE DELIVER</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900">
                  PACKAGES DESIGNED FOR OUTCOMES.
                </h2>
                <p className="text-sm sm:text-base text-slate-600">
                  Select a bespoke service package below to book a live appointment slot or add multiple packages to your quotation estimate.
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
                      <span className={`px-2.5 py-1 rounded-lg ${t.numberBadge} text-[11px] font-black uppercase tracking-wider`}>
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
                        <ArrowRight className={`w-3.5 h-3.5 ${t.darkSectionAccent}`} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 6. WHATSAPP STORE CATALOG WITH CURRENCY CONVERTER */}
      {products.length > 0 && (
        <section id="store" className="py-20 bg-[#F8F9FA] border-b border-black/5 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">— STORE &amp; DELIVERABLES</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900">
                  INSTANT WHATSAPP CATALOG.
                </h2>
                <p className="text-sm sm:text-base text-slate-600">
                  Explore available products, digital blueprints, and enterprise toolkits. Add items to your bag and order directly on WhatsApp.
                </p>
              </div>

              {/* Multi-Currency Converter */}
              <div className="flex items-center gap-2 self-start sm:self-auto bg-white p-1 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-500 px-2">Currency:</span>
                {(['INR', 'USD', 'EUR', 'AED'] as CurrencyCode[]).map(curr => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => setSelectedCurrency(curr)}
                    className={`px-3 py-1 rounded-xl text-xs font-black transition ${
                      selectedCurrency === curr ? `${t.currencyActivePill} shadow-xs` : 'text-slate-600 hover:text-black'
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
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/85 backdrop-blur-md text-xs font-black text-white shadow-sm flex items-center gap-1">
                      <span className={t.darkSectionAccent}>{formatPrice(prod.price, selectedCurrency)}</span>
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
                      <ShoppingBag className={`w-4 h-4 ${t.darkSectionAccent}`} />
                      <span>Add to WhatsApp Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 7. HIGH-CONTRAST DARK VIDEO DEMOS & REELS */}
      {videos.length > 0 && (
        <section id="videos" className="py-20 bg-[#111111] text-white border-b border-white/10 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="space-y-2 max-w-2xl">
              <span className={`text-xs font-black uppercase tracking-widest ${t.darkSectionAccent}`}>— VIDEO SHOWCASES</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
                HEAR IT FROM THEM.
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                Live client walkthroughs, reel breakdowns, and masterclasses demonstrating real outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map(vid => {
                const embedUrl = getEmbedUrl(vid);
                const isYouTube = embedUrl.includes('youtube.com') || embedUrl.includes('youtu.be');
                const isInstagram = vid.url.includes('instagram.com');

                return (
                  <div
                    key={vid.id}
                    className="rounded-3xl bg-[#1C1C1E] border border-white/10 overflow-hidden shadow-2xl flex flex-col justify-between"
                  >
                    {isYouTube && (
                      <div className="relative w-full aspect-video bg-black">
                        <iframe
                          src={embedUrl}
                          title={vid.title}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                    )}

                    {isInstagram && (
                      <div className="relative w-full flex flex-col items-center bg-black/40">
                        <div className="w-full aspect-[9/12] max-h-[380px] overflow-hidden">
                          <iframe
                            src={embedUrl}
                            title={vid.title}
                            className="w-full h-full border-0"
                            allowFullScreen
                            loading="lazy"
                          />
                        </div>
                        <div className="w-full p-3 bg-white/5 border-t border-white/10 flex items-center justify-between px-4">
                          <span className={`text-xs ${t.darkSectionAccent} font-bold flex items-center gap-1.5`}>
                            <Film className="w-3.5 h-3.5" /> Instagram Reel
                          </span>
                          <a
                            href={vid.url}
                            target="_blank"
                            rel="noreferrer"
                            className={`px-3 py-1 rounded-full ${t.darkSectionBtn} text-[11px] flex items-center gap-1`}
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
                      galleryFilter === 'All' ? `${t.currencyActivePill}` : 'text-slate-600 hover:text-black'
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
                        galleryFilter === cat ? `${t.currencyActivePill}` : 'text-slate-600 hover:text-black'
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
                      <span className={`text-[10px] font-black uppercase tracking-wider ${t.darkSectionAccent}`}>
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
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">— SOCIAL PROOF</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900">
                  REAL STORIES. REAL RESULTS.
                </h2>
                <p className="text-sm sm:text-base text-slate-600">
                  Verified testimonials and ratings from directors, enterprise builders, and consulting clients.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsReviewModalOpen(true)}
                className="px-5 py-3 rounded-full bg-black hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm active:scale-95 transition"
              >
                <Plus className={`w-4 h-4 ${t.darkSectionAccent}`} />
                <span>Write a Review</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((test, idx) => (
                <div
                  key={test.id || idx}
                  className="p-7 rounded-3xl bg-white border border-black/5 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex text-amber-400">
                        {Array.from({ length: test.rating || 5 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        {test.date || 'Verified Review'}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal italic">
                      &ldquo;{test.feedback}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <h5 className="font-black text-sm text-slate-900">{test.clientName}</h5>
                      <p className="text-[11px] text-slate-500">{test.company || test.designation || 'Client Partner'}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-black text-sm flex items-center justify-center">
                      <span className={t.darkSectionAccent}>“</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 10. FAQ ACCORDION (MBL STYLE) */}
      <section id="faq" className="py-20 bg-white border-b border-black/5 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-2 text-center">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">— A FEW THINGS TO KNOW</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900">
              GOOD QUESTIONS.
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Everything you need to know about partnering with {profile.company || profile.name}.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 overflow-hidden bg-[#F8F9FA] transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-black text-sm sm:text-base text-slate-900 hover:text-black transition"
                  >
                    <span>{faq.q}</span>
                    <div className={`p-1.5 rounded-full bg-white border border-slate-200 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
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
      </section>

      {/* 11. SIGNATURE CTA BANNER (DYNAMIC TEMPLATE PALETTE) */}
      <section id="contact" className="py-20 bg-[#F8F9FA] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`rounded-3xl sm:rounded-[36px] ${t.ctaBanner.bg} p-8 sm:p-14 lg:p-16 shadow-2xl relative overflow-hidden space-y-10`}>
            
            <div className="max-w-3xl space-y-3">
              <span className={`text-xs font-black uppercase tracking-widest ${t.ctaBanner.kicker} px-3 py-1 rounded-full inline-block`}>
                YOUR NEXT CHAPTER STARTS HERE
              </span>
              <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight ${t.ctaBanner.heading}`}>
                LET&apos;S GET YOU STARTED.
              </h2>
              <p className={`text-base sm:text-lg ${t.ctaBanner.subtext} font-medium`}>
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
                  className={`px-8 py-4 rounded-full ${t.ctaBanner.primaryBtn} text-sm uppercase tracking-wider flex items-center gap-2 shadow-2xl transition active:scale-95`}
                >
                  <SocialIcon platform="whatsapp" size={18} colored={false} />
                  <span>Start WhatsApp Chat</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={`tel:${cleanPhone}`}
                  onClick={() => trackAction('call_banner_click')}
                  className="px-6 py-4 rounded-full bg-white/90 hover:bg-white text-slate-900 border border-slate-300/80 font-black text-sm uppercase tracking-wider flex items-center gap-2 shadow-md transition active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  <span>{profile.phone}</span>
                </a>
              </div>

              {/* Direct Info Card */}
              <div className={`lg:col-span-6 rounded-2xl ${t.ctaBanner.contactBoxBg} ${t.ctaBanner.contactBoxBorder} text-white p-6 space-y-3 text-xs`}>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className={`text-[10px] font-black uppercase tracking-wider ${t.darkSectionAccent}`}>Direct Connect Hub</span>
                  <span className="text-emerald-400 font-bold">24/7 Available</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Email Us</span>
                    <a href={`mailto:${profile.email}`} className={`font-bold text-white ${t.ctaBanner.contactAccentText} truncate block`}>
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
                    className={`w-full py-2.5 rounded-xl ${t.ctaBanner.upiBtn} text-xs flex items-center justify-center gap-2 transition hover:opacity-90`}
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

      {/* 12. CLEAN MINIMAL WEBSITE FOOTER */}
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
                <span className={`text-[10px] font-black uppercase ${t.darkSectionAccent}`}>{activeLightboxImg.category}</span>
                <h4 className="font-bold text-sm">{activeLightboxImg.title}</h4>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
