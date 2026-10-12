'use client';

import React, { useState, useEffect } from 'react';
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
  Award,
  Home,
  GraduationCap,
  Briefcase,
  Play,
  Menu,
  Grid,
  FileText,
  HelpCircle,
  PhoneCall
} from 'lucide-react';
import { DigitalProfile, ServiceItem, ProductItem, VideoItem, GalleryItem, BlogPostItem } from '@/lib/types';
import SocialIcon, { getSocialBrandColor } from '@/components/common/SocialIcon';
import ShareCardModal from '@/components/common/ShareCardModal';
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
        mobileDock: {
          dockBg: 'bg-black/95 text-white backdrop-blur-xl border border-white/15 shadow-2xl',
          activeItem: 'bg-white text-black font-black shadow-md',
          inactiveItem: 'text-slate-400 hover:text-white',
          badgeBg: 'bg-white text-black font-black'
        },
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
        mobileDock: {
          dockBg: 'bg-slate-950/95 text-white backdrop-blur-xl border border-emerald-500/30 shadow-2xl',
          activeItem: 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/30',
          inactiveItem: 'text-slate-300 hover:text-emerald-400',
          badgeBg: 'bg-emerald-500 text-slate-950 font-black'
        },
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
        mobileDock: {
          dockBg: 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-stone-950 border border-amber-500/50 shadow-2xl shadow-amber-500/30',
          activeItem: 'bg-stone-950 text-amber-400 font-black shadow-md',
          inactiveItem: 'text-stone-950/80 font-bold hover:text-stone-950',
          badgeBg: 'bg-stone-950 text-amber-400 font-black'
        },
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
        mobileDock: {
          dockBg: 'bg-slate-950/95 text-white backdrop-blur-xl border border-blue-500/30 shadow-2xl',
          activeItem: 'bg-blue-600 text-white font-black shadow-md shadow-blue-500/30',
          inactiveItem: 'text-slate-300 hover:text-blue-400',
          badgeBg: 'bg-blue-600 text-white font-black'
        },
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
        mobileDock: {
          dockBg: 'bg-stone-950/95 text-white backdrop-blur-xl border border-rose-500/30 shadow-2xl',
          activeItem: 'bg-gradient-to-r from-rose-500 to-orange-500 text-white font-black shadow-md shadow-rose-500/30',
          inactiveItem: 'text-stone-300 hover:text-rose-400',
          badgeBg: 'bg-rose-500 text-white font-black'
        },
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
        mobileDock: {
          dockBg: 'bg-[#FFE500] text-black border border-black/20 shadow-2xl shadow-yellow-500/30',
          activeItem: 'bg-slate-950 text-[#FFE500] font-black shadow-md',
          inactiveItem: 'text-slate-950/80 font-bold hover:text-black',
          badgeBg: 'bg-slate-950 text-[#FFE500] font-black'
        },
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
        mobileDock: {
          dockBg: 'bg-slate-900/90 text-white backdrop-blur-xl border border-cyan-500/30 shadow-2xl',
          activeItem: 'bg-cyan-400 text-slate-950 font-black shadow-md shadow-cyan-500/30',
          inactiveItem: 'text-slate-300 hover:text-cyan-400',
          badgeBg: 'bg-cyan-400 text-slate-950 font-black'
        },
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
        mobileDock: {
          dockBg: 'bg-slate-950/95 text-white backdrop-blur-xl border border-indigo-500/30 shadow-2xl',
          activeItem: 'bg-indigo-600 text-white font-black shadow-md shadow-indigo-500/30',
          inactiveItem: 'text-slate-300 hover:text-indigo-400',
          badgeBg: 'bg-indigo-600 text-white font-black'
        },
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
  const [activeNavTab, setActiveNavTab] = useState<'home' | 'courses' | 'mentor' | 'stories' | 'menu'>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const t = getWebsiteThemeTokens(profile.theme);

  const waNumber = getCleanWhatsAppNumber(profile);
  const cleanPhone = profile.phone ? profile.phone.replace(/[^\d+]/g, '') : '+919876543210';

  const services = profile.sectionData?.services?.items || [];
  const products = profile.sectionData?.products?.items || [];
  const videos = profile.sectionData?.videos?.items || [];
  const gallery = profile.sectionData?.gallery?.items || [];
  const testimonials = dynamicTestimonials || profile.sectionData?.testimonials?.items || [];
  const socials = profile.sectionData?.socials?.items || [];

  // Scroll spy to update activeNavTab
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const sections: { id: string; tab: 'home' | 'courses' | 'mentor' | 'stories' }[] = [
        { id: 'reviews', tab: 'stories' },
        { id: 'about', tab: 'mentor' },
        { id: 'services', tab: 'courses' },
        { id: 'top', tab: 'home' }
      ];

      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= scrollPos) {
          if (!isMobileMenuOpen) {
            setActiveNavTab(s.tab);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent, id: string, tab: 'home' | 'courses' | 'mentor' | 'stories') => {
    e.preventDefault();
    setActiveNavTab(tab);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
    <div className={`w-full max-w-full overflow-x-hidden min-h-screen ${t.canvasBg} ${t.canvasText} !font-sans ${t.selection} pb-28 sm:pb-32 [&_h1]:!font-sans [&_h2]:!font-sans [&_h3]:!font-sans [&_h4]:!font-sans [&_h5]:!font-sans [&_h6]:!font-sans`}>
      
      {/* 1. TOP STICKY WEBSITE NAVIGATION (MINIMAL & REFINED) */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-black/5 shadow-xs transition-all w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Logo & Name */}
          <a href="#top" className="flex items-center gap-2.5 sm:gap-3 group shrink min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-black/10 bg-slate-100 shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover object-top" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-black text-xs sm:text-base tracking-tight text-slate-950 group-hover:text-black !font-sans truncate block max-w-[120px] xs:max-w-[170px] sm:max-w-xs">
                  {profile.company || profile.name}
                </span>
                <span className={`w-2 h-2 rounded-full ${t.accentDot} inline-block animate-pulse shrink-0`} title="Active Online" />
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-semibold truncate max-w-[120px] xs:max-w-[170px] sm:max-w-xs !font-sans">
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
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
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
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-bold transition active:scale-95 shadow-xs shrink-0"
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
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full ${t.headerCtaBtn} text-xs font-bold flex items-center gap-1.5 shadow-sm hover:shadow transition-all active:scale-95 shrink-0`}
            >
              <SocialIcon platform="whatsapp" size={15} colored={false} className={t.headerCtaIcon} />
              <span className="hidden xs:inline">WhatsApp Us</span>
              <span className="xs:hidden">WhatsApp</span>
            </a>

            {cart.length > 0 && (
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full bg-black text-white hover:bg-slate-800 transition shrink-0"
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
      <section id="top" className="py-10 sm:py-20 lg:py-24 border-b border-black/5 bg-gradient-to-b from-white via-white to-slate-50/50 relative overflow-hidden w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Hero Content: Bold 3-line Stacked Headline */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-7 text-left">
              
              {/* Kicker Pill */}
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ${t.accentLightBg} ${t.accentLightBorder} text-xs font-black tracking-wider uppercase shadow-xs max-w-full`}>
                <span className={`w-2 h-2 rounded-full ${t.accentDot} shrink-0`} />
                <span className="truncate">
                  {profile.designation 
                    ? profile.designation.toUpperCase() 
                    : (profile.company ? `${profile.company.toUpperCase()} HUB` : 'VERIFIED BUSINESS PROFILE')}
                </span>
              </div>

              {/* Responsive 3-Line MBL Grotesque Headline */}
              <h1 className="!font-sans text-2xl xs:text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tight text-slate-950 leading-[1.1] break-words">
                {(() => {
                  const companyName = profile.company?.trim();
                  if (companyName) {
                    const words = companyName.split(/\s+/);
                    if (words.length === 1) {
                      return (
                        <>
                          {words[0]}<br />
                          <span className={`inline-block max-w-full px-2.5 sm:px-4 py-0.5 sm:py-1 rounded-xl ${t.accentPill} my-1 text-xl xs:text-2xl sm:text-4xl lg:text-4xl font-black shadow-xs transform -rotate-1 break-words`}>
                            {profile.designation ? profile.designation.split(/\s+/)[0] : 'OFFICIAL'}
                          </span><br />
                          {profile.designation && profile.designation.split(/\s+/).length > 1 
                            ? profile.designation.split(/\s+/).slice(1).join(' ') 
                            : 'HUB'}
                          <span className={`inline-block w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-full ${t.accentDot} ml-1.5 sm:ml-2 align-baseline`} />
                        </>
                      );
                    } else if (words.length === 2) {
                      return (
                        <>
                          {words[0]}<br />
                          <span className={`inline-block max-w-full px-2.5 sm:px-4 py-0.5 sm:py-1 rounded-xl ${t.accentPill} my-1 text-xl xs:text-2xl sm:text-4xl lg:text-4xl font-black shadow-xs transform -rotate-1 break-words`}>
                            {words[1]}
                          </span><br />
                          {profile.designation || 'ENTERPRISE'}
                          <span className={`inline-block w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-full ${t.accentDot} ml-1.5 sm:ml-2 align-baseline`} />
                        </>
                      );
                    } else {
                      return (
                        <>
                          {words[0]}<br />
                          <span className={`inline-block max-w-full px-2.5 sm:px-4 py-0.5 sm:py-1 rounded-xl ${t.accentPill} my-1 text-xl xs:text-2xl sm:text-4xl lg:text-4xl font-black shadow-xs transform -rotate-1 break-words`}>
                            {words[1]}
                          </span><br />
                          {words.slice(2).join(' ')}
                          <span className={`inline-block w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-full ${t.accentDot} ml-1.5 sm:ml-2 align-baseline`} />
                        </>
                      );
                    }
                  } else {
                    const words = (profile.name || 'Business').trim().split(/\s+/);
                    return (
                      <>
                        {words[0]}<br />
                        <span className={`inline-block max-w-full px-2.5 sm:px-4 py-0.5 sm:py-1 rounded-xl ${t.accentPill} my-1 text-xl xs:text-2xl sm:text-4xl lg:text-4xl font-black shadow-xs transform -rotate-1 break-words`}>
                          {words.slice(1).join(' ') || (profile.designation ? profile.designation.split(/\s+/)[0] : 'OFFICIAL')}
                        </span><br />
                        {profile.designation || 'SERVICES'}
                        <span className={`inline-block w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-full ${t.accentDot} ml-1.5 sm:ml-2 align-baseline`} />
                      </>
                    );
                  }
                })()}
              </h1>

              {/* Founder Bio / Subtitle */}
              <p className="!font-sans text-sm sm:text-lg text-slate-600 max-w-xl leading-relaxed font-normal">
                {profile.bio || `Welcome to ${profile.company || profile.name}. Explore our specialized services, connect directly on WhatsApp, or book a consultation.`}
              </p>

              {/* Primary Dual Actions */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2 w-full">
                <a
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ${profile.name}, I reached out from your website and would like to connect.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackAction('whatsapp_hero_click')}
                  className="w-full sm:w-auto justify-center px-7 py-3.5 sm:py-4 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all active:scale-95"
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
                  className="w-full sm:w-auto justify-center px-6 py-3.5 sm:py-4 rounded-full bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 hover:border-slate-400 font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95 shadow-xs"
                >
                  <Download className="w-4 h-4 text-slate-700" />
                  <span>Save Contact (VCF)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsUPIModalOpen(true)}
                  className="w-full sm:w-auto justify-center px-5 py-3.5 sm:py-4 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition active:scale-95"
                >
                  <QrCode className="w-4 h-4 text-emerald-600" />
                  <span>Pay via UPI (0% Fee)</span>
                </button>
              </div>

              {/* Trust Ratings & Badges */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex text-amber-500 text-sm">
                    {'★★★★★'}
                  </div>
                  <span className="font-bold text-slate-900">
                    {testimonials.length > 0 ? (testimonials.reduce((s, x) => s + (x.rating || 5), 0) / testimonials.length).toFixed(1) : '4.9'}/5.0 Rating
                  </span>
                  <span className="text-slate-400">
                    • {testimonials.length > 0 ? `${testimonials.length}+ Reviews` : 'Verified Feedback'}
                  </span>
                </div>
                <span className="hidden sm:inline text-slate-300">|</span>
                <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified Business Profile</span>
                </div>
              </div>

            </div>

            {/* Right MBL Organic Floating Portrait Showcase */}
            <div className="lg:col-span-5 flex justify-center relative w-full overflow-visible">
              <div className="relative w-full max-w-sm sm:max-w-md mx-auto">
                
                {/* 1. Organic Ambient Aura Glow (Behind Portrait) */}
                <div className={`absolute inset-0 sm:-inset-6 ${t.heroShadowBox} rounded-[2.5rem] sm:rounded-[3.5rem] blur-2xl opacity-70 -z-10`} />

                {/* 2. Floating Badge: Top Left (Rating & Reviews) */}
                <div className="absolute left-1 sm:-left-2 top-4 sm:top-8 z-20 px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-slate-200/80 flex items-center gap-2 sm:gap-2.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 shrink-0">
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                  </div>
                  <div>
                    <span className="font-black text-[11px] sm:text-xs text-slate-900 block leading-tight">
                      {testimonials.length > 0 ? (testimonials.reduce((s, x) => s + (x.rating || 5), 0) / testimonials.length).toFixed(1) : '4.9'} / 5.0
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      {testimonials.length > 0 ? `${testimonials.length}+ Reviews` : 'Verified Partner'}
                    </span>
                  </div>
                </div>

                {/* 3. Floating Badge: Top Right (Verified Executive) */}
                <div className="absolute right-1 sm:-right-4 top-3 sm:top-4 z-20 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-slate-950/90 backdrop-blur-md text-white border border-white/20 shadow-xl flex items-center gap-1.5 text-[9px] sm:text-[10px] font-black uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="truncate max-w-[110px] sm:max-w-[140px]">{profile.designation || 'Verified Partner'}</span>
                </div>

                {/* 4. Floating Badge: Bottom Right (Deliverables) */}
                <div className="absolute right-1 sm:-right-6 bottom-20 sm:bottom-24 z-20 px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-slate-200/80 flex items-center gap-2 sm:gap-2.5">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl ${t.accentLightBg} ${t.accentLightBorder} flex items-center justify-center shrink-0`}>
                    <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-900" />
                  </div>
                  <div>
                    <span className="font-black text-[11px] sm:text-xs text-slate-900 block leading-tight">
                      {services.length > 0 ? `${services.length}+ Offerings` : 'Professional'}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider block truncate max-w-[90px] sm:max-w-[110px]">
                      {profile.company || 'Enterprise Solutions'}
                    </span>
                  </div>
                </div>

                {/* 5. Main Hero Portrait Frame - Aspect 3/4 with object-top guarantees head is completely visible! */}
                <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-[2rem] sm:rounded-[3rem] overflow-hidden bg-slate-100 border-4 border-white shadow-2xl group">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle Bottom Fade */}
                  <div className="absolute inset-x-0 bottom-0 h-32 sm:h-36 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                  {/* Clean Bottom Overlay Card */}
                  <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 p-2.5 sm:p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-white/50 shadow-lg flex items-center justify-between text-slate-900">
                    <div className="min-w-0 pr-2">
                      <p className="font-black text-xs sm:text-sm text-slate-900 truncate">{profile.name}</p>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 font-semibold truncate">{profile.designation}</p>
                    </div>
                    <span className="shrink-0 flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 sm:px-2.5 py-1 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Available
                    </span>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 4. "THE APPROACH" / ABOUT BENTO GRID */}
      <section id="about" className="py-12 sm:py-20 bg-[#F8F9FA] border-b border-black/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">— THE APPROACH</span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900">
              COMMITTED TO EXCELLENCE &amp; REAL RESULTS.
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              {profile.company || profile.name} bridges strategic planning with high-impact execution and dedicated support.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            
            {/* Left Deep Charcoal Card */}
            <div className="lg:col-span-5 rounded-2xl sm:rounded-3xl bg-[#18181B] text-white p-6 sm:p-10 flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="space-y-4 sm:space-y-5 relative z-10">
                <span className={`px-3 py-1 rounded-full ${t.accentPill} text-[10px] font-black uppercase tracking-wider inline-block`}>
                  Meet Your Expert
                </span>
                
                <h3 className="text-xl sm:text-3xl font-black tracking-tight text-white">
                  {profile.name}
                </h3>
                <p className={`text-xs font-bold ${t.darkSectionAccent} tracking-wider uppercase`}>
                  {profile.designation} {profile.company ? `• ${profile.company}` : ''}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {profile.sectionData?.about?.content || profile.bio || 'Dedicated to delivering measurable outcomes, high-standard execution, and reliable client satisfaction across every project.'}
                </p>

                <div className="space-y-2 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Check className={`w-4 h-4 ${t.darkSectionAccent} shrink-0`} />
                    <span>Based in {profile.address || 'India'} &amp; available worldwide</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className={`w-4 h-4 ${t.darkSectionAccent} shrink-0`} />
                    <span>Direct personal guidance &amp; prompt response</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 sm:pt-8 relative z-10">
                <a
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ${profile.name}, I would like to discuss a project consultation.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-3 sm:py-3.5 rounded-full ${t.ctaBanner.primaryBtn} text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition active:scale-95`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect With {profile.name.split(' ')[0]}</span>
                </a>
              </div>
            </div>

            {/* Right Dynamic Capabilities Cards */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-3.5 sm:gap-4">
              {services.length > 0 ? (
                services.slice(0, 3).map((srv, idx) => (
                  <div key={srv.id || idx} className="p-4 sm:p-7 rounded-2xl bg-white border border-black/5 shadow-xs hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3.5 sm:gap-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl ${t.numberBadge} flex items-center justify-center font-black text-base sm:text-lg shrink-0`}>
                        0{idx + 1}
                      </div>
                      <div className="space-y-1 min-w-0">
                        <h4 className="text-sm sm:text-lg font-black uppercase tracking-tight text-slate-900 break-words">
                          {srv.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {srv.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="p-4 sm:p-7 rounded-2xl bg-white border border-black/5 shadow-xs hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3.5 sm:gap-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl ${t.numberBadge} flex items-center justify-center font-black text-base sm:text-lg shrink-0`}>
                        01
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm sm:text-lg font-black uppercase tracking-tight text-slate-900">
                          Dedicated Project Execution
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          Tailored service delivery with actionable milestones, transparent communications, and consistent results.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-7 rounded-2xl bg-white border border-black/5 shadow-xs hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3.5 sm:gap-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl ${t.numberBadge} flex items-center justify-center font-black text-base sm:text-lg shrink-0`}>
                        02
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm sm:text-lg font-black uppercase tracking-tight text-slate-900">
                          Transparent Client Consultation
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          Direct personal guidance and clarity on scope, schedules, and deliverables for peace of mind.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-7 rounded-2xl bg-white border border-black/5 shadow-xs hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3.5 sm:gap-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl ${t.numberBadge} flex items-center justify-center font-black text-base sm:text-lg shrink-0`}>
                        03
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm sm:text-lg font-black uppercase tracking-tight text-slate-900">
                          Continuous Support &amp; Partnership
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          Long-term value creation, responsive communication on WhatsApp, and dependable follow-through.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 5. SERVICES & PACKAGES (DYNAMIC FROM USER PROFILE) */}
      {services.length > 0 && (
        <section id="services" className="py-12 sm:py-20 bg-white border-b border-black/5 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">— SERVICES &amp; SOLUTIONS</span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900">
                  SERVICES TAILORED FOR YOU.
                </h2>
                <p className="text-sm sm:text-base text-slate-600">
                  Select a bespoke service below to book a live appointment slot or add multiple items to your custom quotation estimate.
                </p>
              </div>

              {quoteServices.length > 0 && (
                <button
                  type="button"
                  onClick={sendWhatsAppQuotation}
                  className="w-full sm:w-auto justify-center px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition active:scale-95"
                >
                  <SocialIcon platform="whatsapp" size={15} colored={false} className="text-white" />
                  <span>Send Quote ({quoteServices.length} Items)</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {services.map((srv, idx) => (
                <div
                  key={srv.id || idx}
                  className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#F8F9FA] border border-black/5 hover:border-black/20 flex flex-col justify-between space-y-5 sm:space-y-6 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-1 rounded-lg ${t.numberBadge} text-[10px] sm:text-[11px] font-black uppercase tracking-wider`}>
                        0{idx + 1} / SERVICE
                      </span>
                      {srv.durationMinutes > 0 && (
                        <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {srv.durationMinutes} Mins
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-xl font-black text-slate-900 group-hover:text-black leading-snug break-words">
                      {srv.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {srv.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">Pricing / Investment:</span>
                      <span className="text-base sm:text-lg font-black text-slate-900">
                        {selectedCurrency !== 'INR' ? formatPrice(srv.price, selectedCurrency) : `${srv.currency || '₹'}${srv.price.toLocaleString()}`}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => toggleQuoteService(srv)}
                        className={`py-2 px-2.5 sm:px-3 rounded-xl text-xs font-bold border transition active:scale-95 flex items-center justify-center gap-1 ${
                          quoteServices.some(s => s.id === srv.id)
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-400'
                            : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {quoteServices.some(s => s.id === srv.id) ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>In Quote</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 shrink-0" />
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
                        className="py-2 px-2.5 sm:px-3 rounded-xl bg-black hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1 transition active:scale-95 shadow-sm"
                      >
                        <span>Book Slot</span>
                        <ArrowRight className={`w-3.5 h-3.5 ${t.darkSectionAccent} shrink-0`} />
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
        <section id="store" className="py-12 sm:py-20 bg-[#F8F9FA] border-b border-black/5 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">— STORE &amp; DELIVERABLES</span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900">
                  INSTANT WHATSAPP CATALOG.
                </h2>
                <p className="text-sm sm:text-base text-slate-600">
                  Explore available products, digital blueprints, and enterprise toolkits. Add items to your bag and order directly on WhatsApp.
                </p>
              </div>

              {/* Multi-Currency Converter */}
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-full self-start sm:self-auto bg-white p-1 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-500 px-2 shrink-0">Currency:</span>
                {(['INR', 'USD', 'EUR', 'AED'] as CurrencyCode[]).map(curr => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => setSelectedCurrency(curr)}
                    className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs font-black transition shrink-0 ${
                      selectedCurrency === curr ? `${t.currencyActivePill} shadow-xs` : 'text-slate-600 hover:text-black'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map(prod => (
                <div
                  key={prod.id}
                  className="rounded-2xl sm:rounded-3xl bg-white border border-black/5 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="h-48 sm:h-52 w-full overflow-hidden bg-slate-100 relative">
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/85 backdrop-blur-md text-xs font-black text-white shadow-sm flex items-center gap-1">
                      <span className={t.darkSectionAccent}>{formatPrice(prod.price, selectedCurrency)}</span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
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
        <section id="videos" className="py-12 sm:py-20 bg-[#111111] text-white border-b border-white/10 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
            
            <div className="space-y-2 max-w-2xl">
              <span className={`text-xs font-black uppercase tracking-widest ${t.darkSectionAccent}`}>— VIDEO SHOWCASES</span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
                HEAR IT FROM THEM.
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                Live client walkthroughs, reel breakdowns, and masterclasses demonstrating real outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {videos.map(vid => {
                const embedUrl = getEmbedUrl(vid);
                const isYouTube = embedUrl.includes('youtube.com') || embedUrl.includes('youtu.be');
                const isInstagram = vid.url.includes('instagram.com');

                return (
                  <div
                    key={vid.id}
                    className="rounded-2xl sm:rounded-3xl bg-[#1C1C1E] border border-white/10 overflow-hidden shadow-2xl flex flex-col justify-between"
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

                    <div className="p-4 sm:p-6 space-y-1.5 sm:space-y-2">
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
        <section id="portfolio" className="py-12 sm:py-20 bg-white border-b border-black/5 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">— WORK &amp; PORTFOLIO</span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900">
                  PROJECTS WE ARE PROUD OF.
                </h2>
                <p className="text-sm text-slate-600">
                  Explore our recent architectural renders, luxury property funnels, and enterprise deliverables.
                </p>
              </div>

              {categories.length > 1 && (
                <div className="flex items-center gap-1.5 overflow-x-auto max-w-full p-1 bg-[#F8F9FA] rounded-2xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setGalleryFilter('All')}
                    className={`px-3 py-1 rounded-xl text-xs font-black transition shrink-0 ${
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
                      className={`px-3 py-1 rounded-xl text-xs font-black transition shrink-0 ${
                        galleryFilter === cat ? `${t.currencyActivePill}` : 'text-slate-600 hover:text-black'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {filteredGallery.map(img => (
                <div
                  key={img.id}
                  onClick={() => setActiveLightboxImg(img)}
                  className="rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 aspect-square relative cursor-pointer group shadow-sm hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    src={img.imageUrl}
                    alt={img.title || 'Portfolio Item'}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity p-3 sm:p-4 flex flex-col justify-end text-white">
                    {img.category && (
                      <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-wider ${t.darkSectionAccent}`}>
                        {img.category}
                      </span>
                    )}
                    <h5 className="text-xs sm:text-sm font-black line-clamp-1">{img.title || 'View Showcase'}</h5>
                  </div>
                  <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 9. CLIENT REVIEWS & TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section id="reviews" className="py-12 sm:py-20 bg-[#F8F9FA] border-b border-black/5 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">— SOCIAL PROOF</span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900">
                  REAL STORIES. REAL RESULTS.
                </h2>
                <p className="text-sm sm:text-base text-slate-600">
                  Verified testimonials and ratings from directors, enterprise builders, and consulting clients.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsReviewModalOpen(true)}
                className="w-full sm:w-auto justify-center px-5 py-3 rounded-full bg-black hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm active:scale-95 transition"
              >
                <Plus className={`w-4 h-4 ${t.darkSectionAccent}`} />
                <span>Write a Review</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {testimonials.map((test, idx) => (
                <div
                  key={test.id || idx}
                  className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-black/5 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 sm:space-y-6"
                >
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex text-amber-400">
                        {Array.from({ length: test.rating || 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
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
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900 text-white font-black text-sm flex items-center justify-center shrink-0">
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
      <section id="faq" className="py-12 sm:py-20 bg-white border-b border-black/5 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          
          <div className="space-y-2 text-center">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">— A FEW THINGS TO KNOW</span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900">
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
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 sm:gap-4 font-black text-xs sm:text-base text-slate-900 hover:text-black transition"
                  >
                    <span>{faq.q}</span>
                    <div className={`p-1.5 rounded-full bg-white border border-slate-200 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-4 h-4 text-slate-600" />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal border-t border-slate-200/60 pt-3">
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
      <section id="contact" className="py-12 sm:py-20 bg-[#F8F9FA] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`rounded-2xl sm:rounded-[36px] ${t.ctaBanner.bg} p-6 sm:p-14 lg:p-16 shadow-2xl relative overflow-hidden space-y-6 sm:space-y-10`}>
            
            <div className="max-w-3xl space-y-3">
              <span className={`text-xs font-black uppercase tracking-widest ${t.ctaBanner.kicker} px-3 py-1 rounded-full inline-block`}>
                YOUR NEXT CHAPTER STARTS HERE
              </span>
              <h2 className={`text-2xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight ${t.ctaBanner.heading}`}>
                LET&apos;S GET YOU STARTED.
              </h2>
              <p className={`text-sm sm:text-lg ${t.ctaBanner.subtext} font-medium`}>
                Start with a conversation. The {profile.company || profile.name} team can help with project scoping, quotation, and direct WhatsApp support.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center pt-2">
              
              {/* Direct Buttons */}
              <div className="lg:col-span-6 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 w-full">
                <a
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ${profile.name}, I am ready to get started. Let's discuss!`)}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackAction('whatsapp_banner_click')}
                  className={`w-full sm:w-auto justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-full ${t.ctaBanner.primaryBtn} text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-2xl transition active:scale-95 text-center`}
                >
                  <SocialIcon platform="whatsapp" size={18} colored={false} />
                  <span>Start WhatsApp Chat</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={`tel:${cleanPhone}`}
                  onClick={() => trackAction('call_banner_click')}
                  className="w-full sm:w-auto justify-center px-6 py-3.5 sm:py-4 rounded-full bg-white/90 hover:bg-white text-slate-900 border border-slate-300/80 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-md transition active:scale-95 text-center"
                >
                  <Phone className="w-4 h-4" />
                  <span>{profile.phone}</span>
                </a>
              </div>

              {/* Direct Info Card */}
              <div className={`lg:col-span-6 rounded-2xl ${t.ctaBanner.contactBoxBg} ${t.ctaBanner.contactBoxBorder} text-white p-4 sm:p-6 space-y-3 text-xs`}>
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

      {/* 12. COMPREHENSIVE MINI-WEBSITE FOOTER */}
      <footer className="bg-slate-950 text-white border-t border-white/10 pt-12 sm:pt-16 pb-28 sm:pb-32 lg:pb-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          
          {/* Top 4-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8">
            
            {/* Column 1: Brand & Executive Bio (Col span 4) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 shadow-md shrink-0">
                  <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-base text-white">{profile.company || profile.name}</h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-xs text-slate-400 font-semibold">{profile.designation}</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {profile.bio || `${profile.name} provides high-impact services, commercial leadership, and bespoke client solutions.`}
              </p>

              {/* Social Channels */}
              {socials.length > 0 && (
                <div className="pt-2 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                    Follow &amp; Connect
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {socials.map((s, idx) => (
                      <a
                        key={idx}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackAction(`footer_social_${s.platform}`)}
                        className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition flex items-center justify-center hover:scale-105 active:scale-95"
                        title={s.platform}
                      >
                        <SocialIcon platform={s.platform} size={15} colored={false} className="text-white" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Column 2: Quick Links Directory (Col span 3) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-200 border-b border-white/10 pb-2">
                Quick Navigation
              </h4>
              <ul className="space-y-2.5 font-bold text-slate-300">
                <li>
                  <a href="#top" className="hover:text-white flex items-center gap-2 transition">
                    <span className="text-slate-500">›</span> Home
                  </a>
                </li>
                {services.length > 0 && (
                  <li>
                    <a href="#services" className="hover:text-white flex items-center gap-2 transition">
                      <span className="text-slate-500">›</span> Services ({services.length})
                    </a>
                  </li>
                )}
                {products.length > 0 && (
                  <li>
                    <a href="#store" className="hover:text-white flex items-center gap-2 transition">
                      <span className="text-slate-500">›</span> Digital Store ({products.length})
                    </a>
                  </li>
                )}
                <li>
                  <a href="#about" className="hover:text-white flex items-center gap-2 transition">
                    <span className="text-slate-500">›</span> About &amp; Approach
                  </a>
                </li>
                {gallery.length > 0 && (
                  <li>
                    <a href="#portfolio" className="hover:text-white flex items-center gap-2 transition">
                      <span className="text-slate-500">›</span> Portfolio Gallery
                    </a>
                  </li>
                )}
                {videos.length > 0 && (
                  <li>
                    <a href="#videos" className="hover:text-white flex items-center gap-2 transition">
                      <span className="text-slate-500">›</span> Video Showcase
                    </a>
                  </li>
                )}
                {testimonials.length > 0 && (
                  <li>
                    <a href="#reviews" className="hover:text-white flex items-center gap-2 transition">
                      <span className="text-slate-500">›</span> Client Reviews &amp; Ratings
                    </a>
                  </li>
                )}
                <li>
                  <a href="#faq" className="hover:text-white flex items-center gap-2 transition">
                    <span className="text-slate-500">›</span> FAQ &amp; Help
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white flex items-center gap-2 transition">
                    <span className="text-slate-500">›</span> Contact Hub
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact & Office Location (Col span 3) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-200 border-b border-white/10 pb-2">
                Office &amp; Direct Contact
              </h4>
              <div className="space-y-3.5 text-xs text-slate-300">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/10 text-white shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Email Address</span>
                    <a href={`mailto:${profile.email}`} className="font-bold text-white hover:underline break-all">
                      {profile.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/10 text-white shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Phone / Mobile</span>
                    <a href={`tel:${cleanPhone}`} className="font-bold text-white hover:underline">
                      {profile.phone}
                    </a>
                  </div>
                </div>

                {/* Office Location */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/10 text-white shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Office Location</span>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(profile.address || profile.company || profile.name)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-white hover:underline block leading-relaxed"
                    >
                      {profile.address || 'Hyderabad, Telangana, India'}
                    </a>
                  </div>
                </div>

                {/* WhatsApp Status */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                    <SocialIcon platform="whatsapp" size={16} colored={false} className="text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">WhatsApp Desk</span>
                    <a
                      href={`https://wa.me/${waNumber}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-emerald-400 hover:underline"
                    >
                      Online • Instant Reply
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 4: Quick Actions & Trust (Col span 2) */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-200 border-b border-white/10 pb-2">
                Quick Actions
              </h4>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    trackAction('footer_vcf_download');
                    downloadVcfFile(profile);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Save VCF Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsUPIModalOpen(true)}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition active:scale-95"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Pay via UPI (0% Fee)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsShareModalOpen(true)}
                  className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Profile</span>
                </button>
              </div>

              <div className="pt-2">
                <span className="text-[10px] font-bold text-slate-400 block">Working Hours</span>
                <p className="text-[11px] font-bold text-white mt-0.5">Mon – Sat: 9:00 AM – 7:30 PM IST</p>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Attribution Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-medium text-center sm:text-left">
            <p>© 2026 {profile.company || profile.name}. All rights reserved.</p>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span>Powered by</span>
              <a href="https://oneclickbiz.in" target="_blank" rel="noreferrer" className="font-extrabold text-white hover:underline">
                OneClickBiz Mini-Website Engine
              </a>
              <span>•</span>
              <span>Merlinflow Technologies</span>
            </div>
            <a href="#top" className="text-slate-400 hover:text-white flex items-center gap-1 font-bold">
              <span>Back to Top</span>
              <span>↑</span>
            </a>
          </div>

        </div>
      </footer>

      {/* Lightbox Modal for Portfolio Gallery */}
      {activeLightboxImg && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <button
              onClick={() => setActiveLightboxImg(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black transition"
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

      {/* 13. FLOATING MOBILE/TABLET BOTTOM NAVIGATION DOCK (MBL NATIVE EXPERIENCE) */}
      <nav 
        aria-label="Bottom Navigation Dock"
        className="lg:hidden fixed bottom-3 inset-x-2.5 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-[460px] z-40 pointer-events-auto pb-[env(safe-area-inset-bottom,0px)]"
      >
        <div className={`w-full ${t.mobileDock.dockBg} rounded-full p-1 sm:p-1.5 flex items-center justify-between shadow-2xl backdrop-blur-xl transition-all duration-300`}>
          
          {/* 1. Home */}
          <a
            href="#top"
            onClick={(e) => scrollToSection(e, 'top', 'home')}
            className={`flex-1 py-1.5 px-0.5 sm:px-2 rounded-full flex flex-col items-center justify-center gap-0.5 text-center transition-all duration-200 ${
              activeNavTab === 'home' && !isMobileMenuOpen 
                ? `${t.mobileDock.activeItem} scale-105 shadow-sm` 
                : t.mobileDock.inactiveItem
            }`}
          >
            <Home className="w-4 h-4 shrink-0" />
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-tight leading-none truncate max-w-full">Home</span>
          </a>

          {/* 2. Courses / Services */}
          <a
            href="#services"
            onClick={(e) => scrollToSection(e, 'services', 'courses')}
            className={`flex-1 py-1.5 px-0.5 sm:px-2 rounded-full flex flex-col items-center justify-center gap-0.5 text-center transition-all duration-200 ${
              activeNavTab === 'courses' && !isMobileMenuOpen 
                ? `${t.mobileDock.activeItem} scale-105 shadow-sm` 
                : t.mobileDock.inactiveItem
            }`}
          >
            <GraduationCap className="w-4 h-4 shrink-0" />
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-tight leading-none truncate max-w-full">
              {profile.company?.toLowerCase().includes('academy') ? 'Courses' : 'Services'}
            </span>
          </a>

          {/* 3. Mentor / About */}
          <a
            href="#about"
            onClick={(e) => scrollToSection(e, 'about', 'mentor')}
            className={`flex-1 py-1.5 px-0.5 sm:px-2 rounded-full flex flex-col items-center justify-center gap-0.5 text-center transition-all duration-200 ${
              activeNavTab === 'mentor' && !isMobileMenuOpen 
                ? `${t.mobileDock.activeItem} scale-105 shadow-sm` 
                : t.mobileDock.inactiveItem
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-tight leading-none truncate max-w-full">
              {profile.company?.toLowerCase().includes('academy') ? 'Mentor' : 'About'}
            </span>
          </a>

          {/* 4. Stories / Reviews */}
          <a
            href="#reviews"
            onClick={(e) => scrollToSection(e, 'reviews', 'stories')}
            className={`flex-1 py-1.5 px-0.5 sm:px-2 rounded-full flex flex-col items-center justify-center gap-0.5 text-center transition-all duration-200 ${
              activeNavTab === 'stories' && !isMobileMenuOpen 
                ? `${t.mobileDock.activeItem} scale-105 shadow-sm` 
                : t.mobileDock.inactiveItem
            }`}
          >
            <Star className="w-4 h-4 shrink-0" />
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-tight leading-none truncate max-w-full">Stories</span>
          </a>

          {/* 5. Menu / All Actions */}
          <button
            type="button"
            onClick={() => {
              setActiveNavTab('menu');
              setIsMobileMenuOpen(true);
            }}
            className={`flex-1 py-1.5 px-0.5 sm:px-2 rounded-full flex flex-col items-center justify-center gap-0.5 text-center transition-all duration-200 ${
              isMobileMenuOpen 
                ? `${t.mobileDock.activeItem} scale-105 shadow-sm` 
                : t.mobileDock.inactiveItem
            }`}
          >
            <Menu className="w-4 h-4 shrink-0" />
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-tight leading-none truncate max-w-full">Menu</span>
          </button>

        </div>
      </nav>

      {/* 14. SLIDE-UP DRAWER / ACTION SHEET */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-end sm:justify-center sm:items-center sm:p-4 animate-fade-in">
          
          {/* Backdrop dismiss */}
          <div 
            className="flex-1 w-full"
            onClick={() => setIsMobileMenuOpen(false)} 
          />

          {/* Slide-up Container */}
          <div className="w-full sm:max-w-xl max-h-[85vh] bg-white rounded-t-[28px] sm:rounded-3xl border border-slate-200 shadow-2xl p-4 sm:p-6 overflow-y-auto space-y-5 animate-slide-up relative z-10 pb-8">
            
            {/* Sheet Handle */}
            <div className="w-12 h-1.5 rounded-full bg-slate-300 mx-auto -mt-1 sm:hidden" />

            {/* Profile Header in Sheet */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-slate-200 shrink-0">
                  <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-black text-sm text-slate-950 truncate">{profile.company || profile.name}</h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  </div>
                  <p className="text-xs text-slate-500 font-semibold truncate">{profile.designation || 'Executive Profile'}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Matrix */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ${profile.name}, I reached out from your website.`)}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  trackAction('whatsapp_drawer_click');
                  setIsMobileMenuOpen(false);
                }}
                className="p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-950 flex items-center gap-2 sm:gap-2.5 font-bold text-xs transition active:scale-95"
              >
                <SocialIcon platform="whatsapp" size={18} colored={true} />
                <span className="truncate">WhatsApp Chat</span>
              </a>

              <a
                href={`tel:${cleanPhone}`}
                onClick={() => {
                  trackAction('call_drawer_click');
                  setIsMobileMenuOpen(false);
                }}
                className="p-3 rounded-2xl bg-slate-900 hover:bg-black text-white flex items-center gap-2 sm:gap-2.5 font-bold text-xs transition active:scale-95"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">Call Directly</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsUPIModalOpen(true);
                }}
                className="p-3 rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-950 flex items-center gap-2 sm:gap-2.5 font-bold text-xs transition active:scale-95"
              >
                <QrCode className="w-4 h-4 text-purple-600 shrink-0" />
                <span className="truncate">Pay via UPI (0% Fee)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  trackAction('contact_download_drawer');
                  downloadVcfFile(profile);
                  setIsMobileMenuOpen(false);
                }}
                className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-900 flex items-center gap-2 sm:gap-2.5 font-bold text-xs transition active:scale-95"
              >
                <Download className="w-4 h-4 text-slate-700 shrink-0" />
                <span className="truncate">Save Contact (VCF)</span>
              </button>
            </div>

            {/* View Switcher in Drawer */}
            {showViewToggle && (
              <div className="p-3 rounded-2xl bg-slate-100 border border-slate-200/80 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-700">Display Layout</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode('website');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                      viewMode === 'website' ? 'bg-black text-white shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    💻 Website
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode('mobile');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                      viewMode === 'mobile' ? 'bg-black text-white shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    📱 Card
                  </button>
                </div>
              </div>
            )}

            {/* Jump Navigation Directory */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">
                Website Directory
              </span>

              <div className="grid grid-cols-2 gap-1.5 text-xs font-bold text-slate-800">
                <a
                  href="#top"
                  onClick={(e) => scrollToSection(e, 'top', 'home')}
                  className="p-2.5 rounded-xl hover:bg-slate-100 flex items-center gap-2 transition"
                >
                  <Home className="w-4 h-4 text-slate-500" />
                  <span>Home</span>
                </a>

                {services.length > 0 && (
                  <a
                    href="#services"
                    onClick={(e) => scrollToSection(e, 'services', 'courses')}
                    className="p-2.5 rounded-xl hover:bg-slate-100 flex items-center gap-2 transition"
                  >
                    <GraduationCap className="w-4 h-4 text-slate-500" />
                    <span>{profile.company?.toLowerCase().includes('academy') ? 'Courses' : 'Services'}</span>
                  </a>
                )}

                {products.length > 0 && (
                  <a
                    href="#store"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      document.getElementById('store')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-100 flex items-center gap-2 transition"
                  >
                    <ShoppingBag className="w-4 h-4 text-slate-500" />
                    <span>Store ({products.length})</span>
                  </a>
                )}

                <a
                  href="#about"
                  onClick={(e) => scrollToSection(e, 'about', 'mentor')}
                  className="p-2.5 rounded-xl hover:bg-slate-100 flex items-center gap-2 transition"
                >
                  <Users className="w-4 h-4 text-slate-500" />
                  <span>About Mentor</span>
                </a>

                {gallery.length > 0 && (
                  <a
                    href="#portfolio"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-100 flex items-center gap-2 transition"
                  >
                    <Layers className="w-4 h-4 text-slate-500" />
                    <span>Portfolio</span>
                  </a>
                )}

                {videos.length > 0 && (
                  <a
                    href="#videos"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-100 flex items-center gap-2 transition"
                  >
                    <Film className="w-4 h-4 text-slate-500" />
                    <span>Videos</span>
                  </a>
                )}

                {testimonials.length > 0 && (
                  <a
                    href="#reviews"
                    onClick={(e) => scrollToSection(e, 'reviews', 'stories')}
                    className="p-2.5 rounded-xl hover:bg-slate-100 flex items-center gap-2 transition"
                  >
                    <Star className="w-4 h-4 text-amber-500" />
                    <span>Reviews & Stories</span>
                  </a>
                )}

                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="p-2.5 rounded-xl hover:bg-slate-100 flex items-center gap-2 transition"
                >
                  <HelpCircle className="w-4 h-4 text-slate-500" />
                  <span>FAQ</span>
                </a>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="p-2.5 rounded-xl hover:bg-slate-100 flex items-center gap-2 transition"
                >
                  <Send className="w-4 h-4 text-slate-500" />
                  <span>Contact Hub</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsShareModalOpen(true);
                  }}
                  className="p-2.5 rounded-xl hover:bg-slate-100 flex items-center gap-2 text-left transition"
                >
                  <Share2 className="w-4 h-4 text-slate-500" />
                  <span>Share QR Card</span>
                </button>
              </div>
            </div>

            {/* Social Icons Row */}
            {socials.length > 0 && (
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">
                  Connect on Socials
                </span>
                <div className="flex flex-wrap gap-2">
                  {socials.map((s, idx) => (
                    <a
                      key={idx}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackAction(`social_${s.platform}`)}
                      className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center gap-2 text-xs font-bold text-slate-800 transition active:scale-95"
                    >
                      <SocialIcon platform={s.platform} size={16} colored={true} />
                      <span className="capitalize">{s.platform}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Share Card Modal */}
      {isShareModalOpen && (
        <ShareCardModal profile={profile} onClose={() => setIsShareModalOpen(false)} />
      )}

    </div>
  );
}
