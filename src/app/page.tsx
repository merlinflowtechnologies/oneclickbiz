'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Smartphone, 
  Monitor,
  ShoppingBag, 
  Calendar, 
  CreditCard, 
  QrCode, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Zap, 
  MessageCircle, 
  Check, 
  Download, 
  Star,
  Layers,
  Leaf,
  Target,
  Globe2,
  Building,
  HeartHandshake,
  Share2,
  Rocket,
  Clock,
  Video,
  ExternalLink,
  Wrench,
  Cpu,
  BadgeCheck,
  Headphones,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Send,
  Palette,
  Eye,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Wifi,
  RefreshCw,
  X,
  Lock,
  Unlock,
  MousePointerClick,
  Quote,
  Lightbulb,
  Building2,
  Store,
  FileText,
  Edit3,
  Image as ImageIcon,
  Play,
  Bell,
  Search,
  Home,
  Armchair,
  Utensils,
  Coffee,
  Shirt,
  Flower2,
  Car,
  HeartPulse,
  Dumbbell,
  Grid,
  Package,
  Plus,
  Tag,
  Globe
} from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import ProfileCardView from '@/components/templates/ProfileCardView';
import TemplateQuickPreviewModal from '@/components/templates/TemplateQuickPreviewModal';
import DemoVideoSection from '@/components/home/DemoVideoSection';
import InteractiveFeaturesSection from '@/components/home/InteractiveFeaturesSection';
import { INITIAL_PROFILES } from '@/lib/data-store';
import { VCARD_TEMPLATES_CATALOG, VCardTemplateItem } from '@/data/vcardTemplates';

const VCARD_TEMPLATES = [
  {
    id: 'modern-indigo',
    name: 'Modern Indigo',
    category: 'tech',
    categoryLabel: 'Tech & SaaS',
    badge: '★ Most Popular',
    badgeStyle: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    tagline: 'Tech founders, software engineers & SaaS leaders',
    description: 'Electric violet and deep indigo neon glows with dark obsidian glass panels. Built to command respect at high-stakes investor pitches and tech summits.',
    coverUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    themeClass: {
      cardBg: 'bg-slate-900/90 border-slate-800',
      accentGradient: 'from-blue-600 via-indigo-600 to-teal-500',
      textColor: 'text-blue-400',
      btnPrimary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25',
      btnSecondary: 'bg-slate-800 text-slate-200 border-slate-700',
      dotColor: 'bg-blue-400',
      borderHover: 'group-hover:border-blue-500/50'
    },
    features: [
      '1-Click iOS & Android .VCF Address Book Download',
      'Interactive Pitch Video & Media Embed Player',
      'WhatsApp 1-Tap Direct Chat & Inquiry',
      'Dynamic QR Code & Instant Link Sharing'
    ]
  },
  {
    id: 'dark-onyx',
    name: 'Dark Onyx',
    category: 'executive',
    categoryLabel: 'Executive & Luxury',
    badge: '★ Executive Choice',
    badgeStyle: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    tagline: 'C-Suite, luxury real estate, partners & private equity',
    description: 'Obsidian black backdrop accented with burnished metallic gold and amber highlights. Designed for understated authority, discretion, and VIP connections.',
    coverUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop',
    themeClass: {
      cardBg: 'bg-zinc-950/90 border-zinc-800',
      accentGradient: 'from-amber-500 to-amber-600',
      textColor: 'text-amber-400',
      btnPrimary: 'bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-bold shadow-amber-500/25',
      btnSecondary: 'bg-zinc-900 text-zinc-200 border-zinc-800',
      dotColor: 'bg-amber-400',
      borderHover: 'group-hover:border-amber-500/50'
    },
    features: [
      'Discreet VIP Contact Download & VCF Sync',
      'Private Concierge Appointment Booking Form',
      'High-Resolution Luxury Asset & Property Showcase',
      'Works on all iPhone & Android browsers without any app'
    ]
  },
  {
    id: 'glassmorphic',
    name: 'Frost Glass',
    category: 'web3',
    categoryLabel: 'Web3 & Creators',
    badge: '★ Cyber Visionary',
    badgeStyle: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    tagline: 'Web3 builders, digital artists & design agencies',
    description: 'Translucent frosted glass with dynamic cyber-cyan borders and neon glows. Ideal for innovators, media personalities, and visual creators.',
    coverUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    themeClass: {
      cardBg: 'bg-slate-900/60 backdrop-blur-xl border-white/10',
      accentGradient: 'from-cyan-400 to-indigo-500',
      textColor: 'text-cyan-400',
      btnPrimary: 'bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-bold shadow-cyan-500/25',
      btnSecondary: 'bg-white/10 text-white border-white/10',
      dotColor: 'bg-cyan-400',
      borderHover: 'group-hover:border-cyan-500/50'
    },
    features: [
      'Multi-Layered Frosted Glass Panels & Ambient Glow',
      'Dynamic Social Matrix & Media Lookbook',
      'Instant Inbound Lead Capture & Inquiry Inbox',
      'Audio & Video Introduction Integrations'
    ]
  },
  {
    id: 'emerald-pro',
    name: 'Emerald Pro',
    category: 'fintech',
    categoryLabel: 'Fintech & Health',
    badge: '★ High Conversion',
    badgeStyle: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    tagline: 'Fintech founders, medical practitioners & green leaders',
    description: 'Deep forest slate illuminated by crisp emerald-to-teal gradients. Projects immediate medical, financial, and ecological trust and professionalism.',
    coverUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    themeClass: {
      cardBg: 'bg-slate-900/90 border-slate-800',
      accentGradient: 'from-emerald-500 to-teal-500',
      textColor: 'text-emerald-400',
      btnPrimary: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold shadow-emerald-500/25',
      btnSecondary: 'bg-slate-800 text-slate-200 border-slate-700',
      dotColor: 'bg-emerald-400',
      borderHover: 'group-hover:border-emerald-500/50'
    },
    features: [
      'Verified Professional & Medical Trust Badges',
      'WhatsApp Direct Consultation & Booking Trigger',
      'Integrated Secure Appointment Calendar',
      'Universal iOS / Android Address Book Saving'
    ]
  },
  {
    id: 'sunset-gold',
    name: 'Sunset Rose',
    category: 'creative',
    categoryLabel: 'Creative & Hospitality',
    badge: '★ Creative Pick',
    badgeStyle: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    tagline: 'Branding agencies, culinary chefs, event hosts & media',
    description: 'Radiant sunset coral, warm amber, and rose gradients. Generates an immediate emotional connection and inviting hospitality aesthetic.',
    coverUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    themeClass: {
      cardBg: 'bg-stone-900/90 border-stone-800',
      accentGradient: 'from-orange-500 via-rose-500 to-amber-500',
      textColor: 'text-rose-400',
      btnPrimary: 'bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold shadow-rose-500/25',
      btnSecondary: 'bg-stone-800 text-stone-200 border-stone-700',
      dotColor: 'bg-rose-400',
      borderHover: 'group-hover:border-rose-500/50'
    },
    features: [
      'WhatsApp Mini-Store & Product Showcase',
      'Event RSVP & Table Reservation Scheduler',
      'High-Resolution Lookbook & Portfolio Gallery',
      '1-Tap Direct Phone Call & SMS Contact'
    ]
  }
];



export default function LandingPage() {
  const [aliasSearch, setAliasSearch] = useState('');
  const [aliasStatus, setAliasStatus] = useState<'idle' | 'available' | 'taken'>('idle');
  const [heroDemoMode, setHeroDemoMode] = useState<'mobile' | 'website'>('website');
  const [isDemoInteractive, setIsDemoInteractive] = useState<boolean>(false);
  const [selectedDemoTheme, setSelectedDemoTheme] = useState<'modern-indigo' | 'dark-onyx' | 'glassmorphic' | 'emerald-pro' | 'sunset-gold'>('modern-indigo');
  const [templateFilter, setTemplateFilter] = useState<string>('all');
  const [previewTemplate, setPreviewTemplate] = useState<VCardTemplateItem | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [pricing, setPricing] = useState({
    basicPrice: 999,
    proPrice: 1599,
    advancedPrice: 2199
  });

  useEffect(() => {
    async function loadDynamicPricing() {
      try {
        const res = await fetch('/api/settings', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data.config) {
            setPricing({
              basicPrice: Number(data.config.basicPrice) || 999,
              proPrice: Number(data.config.proPrice) || 1599,
              advancedPrice: Number(data.config.advancedPrice) || 2199
            });
          }
        }
      } catch (err) {
        console.error('Failed to load dynamic pricing on homepage:', err);
      }
    }
    loadDynamicPricing();
  }, []);

  const [isTemplatesPaused, setIsTemplatesPaused] = useState(false);

  // Auto-scroll templates gallery
  useEffect(() => {
    if (isTemplatesPaused) return;

    const interval = setInterval(() => {
      if (sliderRef.current) {
        const slider = sliderRef.current;
        const maxScroll = slider.scrollWidth - slider.clientWidth;

        if (slider.scrollLeft >= maxScroll - 25) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          slider.scrollBy({ left: 240, behavior: 'smooth' });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isTemplatesPaused]);

  const scrollSlider = (direction: 'left' | 'right') => {
    setIsTemplatesPaused(true);
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
    const timer = setTimeout(() => setIsTemplatesPaused(false), 4000);
    return () => clearTimeout(timer);
  };

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingContact(true);
    setTimeout(() => {
      setIsSubmittingContact(false);
      setContactSubmitted(true);
      setContactForm({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 600);
  };

  const demoProfile = {
    ...INITIAL_PROFILES[0],
    theme: selectedDemoTheme,
    sectionData: {
      ...(INITIAL_PROFILES[0].sectionData || {}),
      about: {
        ...((INITIAL_PROFILES[0].sectionData?.about as any) || {}),
        content: INITIAL_PROFILES[0].bio || (INITIAL_PROFILES[0].sectionData?.about as any)?.content
      }
    }
  };

  const handleCheckAlias = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aliasSearch.trim()) return;
    const clean = aliasSearch.toLowerCase().replace(/[^a-z0-9-_]/g, '');
    if (['admin', 'login', 'dashboard', 'api', 'register', 'root'].includes(clean)) {
      setAliasStatus('taken');
    } else {
      setAliasStatus('available');
    }
  };

  const faqs = [
    {
      q: 'How do customers view my digital business card?',
      a: 'Anyone can view your profile instantly by scanning your dynamic QR code, or clicking your custom link (e.g. oneclickbiz.in/v/yourname). No app installation required!'
    },
    {
      q: 'How does the WhatsApp Store feature work?',
      a: 'You can list unlimited products, services, or packages with prices and images. Customers browse your catalog, add items to their shopping cart on your card, and click "Order via WhatsApp", which sends a pre-formatted invoice message directly to your WhatsApp.'
    },
    {
      q: 'Can I change my template, contact details, or services after sharing my card?',
      a: 'Yes! Your dynamic QR code uses a stable cloud redirect link. You can update your phone, email, products, photos, or design template anytime from your dashboard, and your link will instantly display the updated content.'
    },
    {
      q: 'How many times can I edit my contact details, services, or card information?',
      a: 'You can edit your details N number of times (100% unlimited updates 24x7) without any restrictions, edit fees, or special plans. Every time you change your phone, WhatsApp, email, social links, photos, prices, services, or templates from your dashboard, the changes go live instantly on your dynamic QR code and custom link.'
    },
    {
      q: 'Does it support one-click contact saving to iPhone and Android?',
      a: 'Yes! When someone clicks the "Save Contact" button on your card, an industry-standard .vcf file is downloaded and directly prompts them to save your full name, phone numbers, email, company, address, and profile photo directly to their phone address book.'
    },
    {
      q: 'Can I publish blogs and download PDF brochures?',
      a: 'Yes! OneClickBiz includes full Blog Publishing and Brochure Design Studios. You can write articles, design multi-page company brochures, and export 300 DPI print-ready PDFs directly from your dashboard.'
    },
    {
      q: 'Do I have to pay any large upfront fees, or can I try it for free?',
      a: 'You do not have to pay anything upfront! You can build, customize, and live-preview your complete digital business card on your own phone 100% free with zero credit card required. Only upgrade when you love how your card looks. All paid plans also include an unconditional 7-day money-back guarantee.'
    },
    {
      q: 'Who owns and operates OneClickBiz, and how can I verify legitimacy?',
      a: 'OneClickBiz is engineered and operated by Merlinflow Technologies Pvt. Ltd., an incorporated Indian software company headquartered in Hyderabad, Telangana. We provide direct human customer support on WhatsApp (+91 63049 89071), and all digital transactions are secured via RBI-compliant payment gateway partners.'
    },
    {
      q: 'Why should I choose OneClickBiz over a free Linktree or generic digital card?',
      a: 'Linktree and standard digital cards are simply flat link directories. They do not support native Indian commerce: 0% fee WhatsApp cart ordering, direct bank UPI QR codes, in-card appointment slot booking, or 300 DPI corporate print brochure generation. Additionally, international card platforms charge expensive recurring US dollar subscriptions ($8-$15/month). OneClickBiz delivers a full identity and micro-commerce ecosystem built specifically for Indian businesses at an affordable local price in ₹ INR.'
    },
    {
      q: 'What happens if I print 1,000 physical cards with my QR code? Am I locked in?',
      a: 'You are completely protected against vendor lock-in! First, OneClickBiz supports White-Label Custom Domains (e.g., cards.yourbrand.com). If you print your own custom domain on your cards, you own that link forever—even if you ever migrate to another platform in the future, your physical cards will never break. Second, all QR codes use dynamic cloud redirects, meaning you can update the destination URL anytime without reprinting. Third, you can export all your contacts, leads, and catalog data to open CSV/JSON formats with 1 click anytime.'
    },
    {
      q: 'Who owns the customer contacts and leads captured through my card? Does OneClickBiz sell user data?',
      a: 'You retain 100% exclusive legal ownership of all customer leads, phone numbers, appointments, and inquiries captured through your card. OneClickBiz acts strictly as your secure data processor. We enforce an absolute Zero Data Broker Selling policy: we never sell, monetize, rent, or share your customer data with advertisers or third parties. You can export all leads to CSV/Excel anytime with 1 click, and your data is protected under India\'s DPDP Act 2023.'
    }
  ];

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-indigo-500 selection:text-white relative overflow-x-clip overflow-x-hidden w-full max-w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <Navbar />

      {/* Hero Section with Clean Corporate SaaS Aesthetic */}
      <section className="relative pt-10 pb-16 sm:pt-14 sm:pb-22 lg:pt-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/40 to-sky-50/30 border-b border-slate-200/80">
        
        {/* Subtle Professional Grid Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none -z-10" />

        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-[650px] h-[400px] bg-gradient-to-r from-blue-400/20 via-sky-400/20 to-indigo-400/15 blur-[140px] -z-10 pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[550px] h-[350px] bg-gradient-to-r from-indigo-400/15 via-blue-400/15 to-cyan-300/15 blur-[140px] -z-10 pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          
          {/* Main Top Grid: Headline/Copy on Left + 3D Device Showcase on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-14 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-5 xl:col-span-5 space-y-6 text-center lg:text-left">
              
              {/* Prestigious Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/90 text-blue-700 text-xs font-bold shadow-xs">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>All-in-One Digital Business Platform</span>
              </div>

              {/* Authoritative Headline */}
              <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Build Your Business <br className="hidden sm:inline" />
                <span className="text-blue-600">Online</span> — Easily!
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal max-w-xl mx-auto lg:mx-0">
                Create your website, WhatsApp store, digital vCard, e-Commerce, videos, QR codes and more — all in one place.
              </p>

              {/* Clean Trust Strip */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 text-xs font-bold text-slate-700">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>No Technical Skills</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Easy to Use</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Affordable Plans</span>
                </div>
              </div>

              {/* Action Buttons: Clean Dual CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
                <Link
                  href="/signup?intent=get_started"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-95 shrink-0"
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a 
                  href="#demo"
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-full hover:bg-blue-50/70 transition-all text-slate-800 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-slate-900 block group-hover:text-blue-600 transition-colors">Watch Video</span>
                    <span className="text-[10px] text-slate-500 block">See How It Works</span>
                  </div>
                </a>
              </div>

              {/* Live URL Alias Claimer Bar */}
              <div className="pt-2 max-w-md mx-auto lg:mx-0">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-center lg:justify-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Claim your permanent business URL:</span>
                </div>
                <form onSubmit={handleCheckAlias} className="p-1 rounded-xl bg-white border border-slate-300/90 shadow-sm flex items-center focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                  <div className="pl-3 pr-1 text-slate-400 font-mono text-xs hidden sm:block font-medium">
                    oneclickbiz.in/v/
                  </div>
                  <input 
                    type="text" 
                    placeholder="your-business-name"
                    value={aliasSearch}
                    onChange={e => {
                      setAliasSearch(e.target.value);
                      setAliasStatus('idle');
                    }}
                    className="flex-1 bg-transparent px-2 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none font-semibold font-mono"
                    required
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
                  >
                    Check Handle
                  </button>
                </form>

                {aliasStatus === 'available' && (
                  <div className="mt-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center justify-between animate-in fade-in shadow-xs">
                    <span className="flex items-center gap-1.5 font-semibold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span><strong>oneclickbiz.in/v/{aliasSearch.toLowerCase()}</strong> is available!</span>
                    </span>
                    <Link href={`/signup?slug=${aliasSearch.toLowerCase()}&intent=build_card`} className="underline font-bold text-emerald-900 text-[11px]">
                      Claim Now →
                    </Link>
                  </div>
                )}
                {aliasStatus === 'taken' && (
                  <p className="mt-1.5 text-[11px] text-rose-600 font-medium">
                    This alias is reserved or taken. Please try another one!
                  </p>
                )}
              </div>

            </div>

            {/* Right Hero Visual: 3D High-Fidelity Device Showcase Banner */}
            <div className="lg:col-span-7 xl:col-span-7 relative flex items-center justify-center pt-6 lg:pt-0">
              <div className="relative w-full max-w-[720px] lg:max-w-[780px] xl:max-w-[860px] mx-auto select-none group">
                
                {/* Ambient Soft Glow Behind Graphic */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-transparent rounded-3xl blur-2xl -z-10" />
                
                {/* 3D Multi-Device & Cards Graphic with Crisp Corporate Container */}
                <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-slate-200 bg-white p-1.5 sm:p-2 transition-all duration-500 hover:shadow-[0_25px_60px_rgba(37,99,235,0.12)]">
                  <img
                    src="/hero-showcase-retina.png"
                    alt="OneClickBiz Multi-Device Dashboard, WhatsApp Store, Mobile Site & Digital Cards Showcase"
                    className="w-full h-auto object-contain rounded-xl block"
                    loading="eager"
                  />
                </div>

              </div>
            </div>

          </div>

          {/* Continuous Animated Feature Ribbon Marquee */}
          <div className="mt-10 sm:mt-14 max-w-6xl mx-auto relative rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.05)] p-3 sm:p-4">
            
            {/* Ribbon Caption Header */}
            <div className="flex items-center justify-between mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <div className="flex items-center gap-1.5 text-indigo-700 font-extrabold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                <span>All Capabilities Included in One Unified Platform</span>
              </div>
              <span className="hidden sm:inline-block text-[10px] text-slate-400 font-medium normal-case">
                (hover to pause • click to explore)
              </span>
            </div>

            {/* Seamless Infinite Marquee Track with Scoped Fades */}
            <div className="relative overflow-hidden py-1 rounded-xl">
              {/* Left & Right Soft Fade Masks (Strictly Scoped to Track, Matching White Background) */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

              <div className="flex overflow-hidden">
                <div className="animate-continuous-marquee flex items-center gap-3 shrink-0 py-0.5">
                
                {/* Feature 1 */}
                <a href="#features" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-blue-50/60 border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-blue-300 transition-all cursor-pointer group shrink-0">
                  <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Monitor className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-blue-700 transition-colors">Turnkey Mini-Websites</span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">12+ Flagship Themes</span>
                </a>

                {/* Feature 2 */}
                <a href="#features" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-emerald-50/60 border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-emerald-300 transition-all cursor-pointer group shrink-0">
                  <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">0% Fee WhatsApp Store</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">Direct Orders</span>
                </a>

                {/* Feature 3 */}
                <a href="#features" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-blue-50/60 border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-blue-300 transition-all cursor-pointer group shrink-0">
                  <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-blue-700 transition-colors">Smart Digital Cards</span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">1-Tap VCF</span>
                </a>

                {/* Feature 4 */}
                <a href="#features" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-orange-50/60 border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-orange-300 transition-all cursor-pointer group shrink-0">
                  <div className="w-7 h-7 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-orange-700 transition-colors">Appointment Booking</span>
                  <span className="text-[10px] font-bold text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">Auto-Sync</span>
                </a>

                {/* Feature 5 */}
                <a href="#features" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-rose-50/60 border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-rose-300 transition-all cursor-pointer group shrink-0">
                  <div className="w-7 h-7 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-rose-700 transition-colors">Flyers &amp; Brochures</span>
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">300 DPI Print</span>
                </a>

                {/* Feature 6 */}
                <a href="#features" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-cyan-50/60 border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-cyan-300 transition-all cursor-pointer group shrink-0">
                  <div className="w-7 h-7 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Edit3 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-cyan-700 transition-colors">SEO Blog Engine</span>
                  <span className="text-[10px] font-bold text-cyan-700 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded-full">Rank on Google</span>
                </a>

                {/* Feature 7 */}
                <a href="#features" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-indigo-50/60 border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-indigo-300 transition-all cursor-pointer group shrink-0">
                  <div className="w-7 h-7 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">Dynamic QR Engine</span>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">Custom Logo</span>
                </a>

                {/* Feature 8 */}
                <a href="#features" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-amber-50/60 border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-amber-300 transition-all cursor-pointer group shrink-0">
                  <div className="w-7 h-7 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Wifi className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-amber-700 transition-colors">Smart NFC Cards</span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">Tap &amp; Connect</span>
                </a>

                {/* Feature 9 */}
                <a href="#features" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-violet-50/60 border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-violet-300 transition-all cursor-pointer group shrink-0">
                  <div className="w-7 h-7 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-violet-700 transition-colors">Live Lead Analytics</span>
                  <span className="text-[10px] font-bold text-violet-700 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-full">Real-Time</span>
                </a>

                {/* DUPLICATE SET FOR SEAMLESS 100% INFINITE LOOP */}
                {/* Feature 1 */}
                <a href="#features" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-blue-50/60 border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-blue-300 transition-all cursor-pointer group shrink-0">
                  <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Monitor className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-blue-700 transition-colors">Turnkey Mini-Websites</span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">12+ Flagship Themes</span>
                </a>

                {/* Feature 2 */}
                <a href="#features" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-emerald-50/60 border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-emerald-300 transition-all cursor-pointer group shrink-0">
                  <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">0% Fee WhatsApp Store</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">Direct Orders</span>
                </a>

                {/* Feature 3 */}
                <a href="#features" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-blue-50/60 border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-blue-300 transition-all cursor-pointer group shrink-0">
                  <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-blue-700 transition-colors">Smart Digital Cards</span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">1-Tap VCF</span>
                </a>

                {/* Feature 4 */}
                <a href="#features" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-orange-50/60 border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-orange-300 transition-all cursor-pointer group shrink-0">
                  <div className="w-7 h-7 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-orange-700 transition-colors">Appointment Booking</span>
                  <span className="text-[10px] font-bold text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">Auto-Sync</span>
                </a>

                {/* Feature 5 */}
                <a href="#features" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-rose-50/60 border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-rose-300 transition-all cursor-pointer group shrink-0">
                  <div className="w-7 h-7 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-rose-700 transition-colors">Flyers &amp; Brochures</span>
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">300 DPI Print</span>
                </a>

                {/* Feature 6 */}
                <a href="#features" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-cyan-50/60 border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-cyan-300 transition-all cursor-pointer group shrink-0">
                  <div className="w-7 h-7 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Edit3 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-cyan-700 transition-colors">SEO Blog Engine</span>
                  <span className="text-[10px] font-bold text-cyan-700 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded-full">Rank on Google</span>
                </a>

                {/* Feature 7 */}
                <a href="#features" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-indigo-50/60 border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-indigo-300 transition-all cursor-pointer group shrink-0">
                  <div className="w-7 h-7 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">Dynamic QR Engine</span>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">Custom Logo</span>
                </a>

                {/* Feature 8 */}
                <a href="#features" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-amber-50/60 border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-amber-300 transition-all cursor-pointer group shrink-0">
                  <div className="w-7 h-7 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Wifi className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-amber-700 transition-colors">Smart NFC Cards</span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">Tap &amp; Connect</span>
                </a>

                {/* Feature 9 */}
                <a href="#features" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-violet-50/60 border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-violet-300 transition-all cursor-pointer group shrink-0">
                  <div className="w-7 h-7 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-violet-700 transition-colors">Live Lead Analytics</span>
                  <span className="text-[10px] font-bold text-violet-700 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-full">Real-Time</span>
                </a>

              </div>
            </div>
          </div>

        </div>

          {/* 10 All-in-One Capabilities Grid & Social Proof Badges (Matching Brand Design) */}
          <div className="mt-14 p-6 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-white/95 via-blue-50/50 to-slate-50/90 border border-blue-200/80 shadow-[0_12px_45px_rgba(37,99,235,0.08)] backdrop-blur-xl relative overflow-hidden">
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center max-w-2xl mx-auto mb-8 relative z-10 space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-[11px] font-bold uppercase tracking-wider shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" /> All-in-One Growth Engine
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Everything Your Business Needs Under One Brand
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Tap on any capability to see how OneClickBiz powers your operations from day one.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4 relative z-10">
              
              {/* 1. Website */}
              <a href="#features" className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/95 border border-slate-200/90 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/30 group-hover:scale-110 transition-transform mb-2.5">
                  <Globe className="w-6 h-6" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Website</h4>
                <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Your Online Storefront</p>
              </a>

              {/* 2. WhatsApp Store */}
              <a href="#features" className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/95 border border-slate-200/90 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-0.5 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/30 group-hover:scale-110 transition-transform mb-2.5">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">WhatsApp Store</h4>
                <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Sell on WhatsApp</p>
              </a>

              {/* 3. E-Commerce */}
              <a href="#features" className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/95 border border-slate-200/90 hover:border-rose-400 hover:shadow-lg hover:shadow-rose-500/10 hover:-translate-y-0.5 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-500/30 group-hover:scale-110 transition-transform mb-2.5">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors">E-Commerce</h4>
                <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Products &amp; Payments</p>
              </a>

              {/* 4. Videos */}
              <a href="#features" className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/95 border border-slate-200/90 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-0.5 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-500/30 group-hover:scale-110 transition-transform mb-2.5">
                  <Video className="w-6 h-6" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-purple-600 transition-colors">Videos</h4>
                <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Showcase Your Business</p>
              </a>

              {/* 5. Digital VCards */}
              <a href="#features" className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/95 border border-slate-200/90 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10 hover:-translate-y-0.5 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/30 group-hover:scale-110 transition-transform mb-2.5">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">Digital VCards</h4>
                <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Share Instantly</p>
              </a>

              {/* 6. Products & Services */}
              <a href="#features" className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/95 border border-slate-200/90 hover:border-teal-400 hover:shadow-lg hover:shadow-teal-500/10 hover:-translate-y-0.5 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-500/30 group-hover:scale-110 transition-transform mb-2.5">
                  <Package className="w-6 h-6" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-teal-600 transition-colors">Products &amp; Services</h4>
                <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Show What You Offer</p>
              </a>

              {/* 7. QR Codes */}
              <a href="#features" className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/95 border border-slate-200/90 hover:border-pink-400 hover:shadow-lg hover:shadow-pink-500/10 hover:-translate-y-0.5 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-pink-600 text-white flex items-center justify-center shadow-md shadow-pink-500/30 group-hover:scale-110 transition-transform mb-2.5">
                  <QrCode className="w-6 h-6" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-pink-600 transition-colors">QR Codes</h4>
                <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Scan &amp; Connect</p>
              </a>

              {/* 8. Social Media */}
              <a href="#features" className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/95 border border-slate-200/90 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-0.5 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/30 group-hover:scale-110 transition-transform mb-2.5">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Social Media</h4>
                <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Grow Your Audience</p>
              </a>

              {/* 9. & More */}
              <a href="#features" className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/95 border border-slate-200/90 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/10 hover:-translate-y-0.5 transition-all group col-span-2 sm:col-span-1">
                <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-md shadow-sky-500/30 group-hover:scale-110 transition-transform mb-2.5">
                  <Plus className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">&amp; More</h4>
                <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Everything You Need</p>
              </a>

            </div>

            {/* 3 Key Social Proof Cards with Rich Corporate Tinting */}
            <div className="mt-8 pt-7 border-t border-blue-200/70 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 max-w-4xl mx-auto relative z-10">
              <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200/90 shadow-sm flex items-center justify-center gap-3.5 hover:bg-blue-50 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/30">
                  <Rocket className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h5 className="text-base font-black text-slate-900 leading-none">500+</h5>
                  <p className="text-xs text-slate-600 font-semibold mt-1">Happy Businesses</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 shadow-sm flex items-center justify-center gap-3.5 hover:bg-emerald-50 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h5 className="text-base font-black text-slate-900 leading-none">100%</h5>
                  <p className="text-xs text-slate-600 font-semibold mt-1">Secure &amp; Reliable</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200/90 shadow-sm flex items-center justify-center gap-3.5 hover:bg-indigo-50 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/30">
                  <Headphones className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h5 className="text-base font-black text-slate-900 leading-none">Dedicated</h5>
                  <p className="text-xs text-slate-600 font-semibold mt-1">Customer Support</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Brand Dual Wave Accent (Royal Blue & Golden Amber) */}
        <div className="absolute -bottom-0.5 inset-x-0 w-full overflow-hidden pointer-events-none -z-10 leading-none">
          <svg className="w-full h-12 sm:h-20 lg:h-24 text-blue-600/10" viewBox="0 0 1440 90" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,20 C320,60 480,10 740,35 C1000,60 1200,15 1440,25 L1440,90 L0,90 Z" fill="#fef08a" fillOpacity="0.4" />
            <path d="M0,40 C300,10 480,70 780,40 C1080,10 1260,60 1440,30 L1440,90 L0,90 Z" fill="#2563eb" fillOpacity="0.08" />
          </svg>
        </div>
      </section>

      {/* LIVE INTERACTIVE DEMO SECTION (Shifted Below Hero Section) */}
      <section id="demo" className="py-20 lg:py-24 bg-gradient-to-b from-sky-50/90 via-blue-50/40 to-indigo-50/50 border-b border-blue-200/80 relative overflow-hidden scroll-mt-20">
        
        {/* Subtle Professional Grid Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none -z-10" />

        {/* Soft Ambient Background Highlights */}
        <div className="absolute top-10 left-1/4 w-[700px] h-[400px] bg-gradient-to-r from-blue-400/15 via-sky-300/15 to-indigo-300/15 blur-[140px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-1/4 w-[600px] h-[350px] bg-gradient-to-l from-sky-400/15 via-blue-300/15 to-cyan-200/15 blur-[130px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-900 text-xs font-bold uppercase tracking-wider shadow-xs backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Live Interactive Experience</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Experience Your Mini-Website in Action
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Toggle between the full desktop Mini-Website view and the pocket-sized Mobile Card. Switch themes in real-time to preview how your brand will impress customers.
            </p>
          </div>

          {/* Interactive Controls Bar: Dual View Mode Switcher + Theme Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
            
            {/* Dual View Mode Switcher */}
            <div className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-2xl bg-white border border-slate-200/90 shadow-md shadow-slate-200/60 max-w-full">
              <button
                type="button"
                onClick={() => setHeroDemoMode('website')}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
                  heroDemoMode === 'website'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Monitor className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="whitespace-nowrap">Mini-Website View</span>
              </button>
              <button
                type="button"
                onClick={() => setHeroDemoMode('mobile')}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
                  heroDemoMode === 'mobile'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="whitespace-nowrap">Mobile Card</span>
              </button>
            </div>

            {/* Theme Switcher Chips */}
            <div className="flex items-center justify-center gap-1 sm:gap-1.5 p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex-wrap">
              <span className="text-[11px] font-bold text-slate-400 px-2 uppercase hidden sm:inline">Theme:</span>
              {(['modern-indigo', 'dark-onyx', 'glassmorphic', 'emerald-pro', 'sunset-gold'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedDemoTheme(t)}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                    selectedDemoTheme === t 
                      ? 'bg-slate-900 text-white shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {t === 'modern-indigo' ? 'LIGHT' : t.split('-')[0].toUpperCase()}
                </button>
              ))}
            </div>

            {/* Direct Open Tab Link */}
            <a
              href="/v/kishore"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Interactive Frame Rendering */}
          {heroDemoMode === 'website' ? (
            /* Desktop Browser Shell Frame Mockup (Expanded Width) */
            <div 
              onMouseLeave={() => setIsDemoInteractive(false)}
              className="w-full max-w-4xl xl:max-w-5xl mx-auto rounded-2xl sm:rounded-3xl bg-white border border-slate-300 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.25)] overflow-hidden transition-all duration-300 relative"
            >
              {/* Browser Chrome Window Bar */}
              <div className="bg-slate-900 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 inline-block shrink-0" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500 inline-block shrink-0" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 inline-block shrink-0" />
                  <div className="flex items-center gap-1 sm:gap-1.5 ml-1 sm:ml-3 px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-slate-950 text-[10px] sm:text-xs text-slate-300 font-mono border border-slate-800 truncate">
                    <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400 shrink-0" />
                    <span className="text-emerald-400 hidden xs:inline">https://</span>
                    <span className="truncate">oneclickbiz.in/v/kishore</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isDemoInteractive ? (
                    <button
                      type="button"
                      onClick={() => setIsDemoInteractive(false)}
                      className="text-[11px] sm:text-xs font-bold text-white flex items-center gap-1 sm:gap-1.5 transition px-2.5 sm:px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 shadow-sm shrink-0 cursor-pointer"
                      title="Lock inner demo scroll to freely scroll the webpage"
                    >
                      <Lock className="w-3 h-3 text-white" />
                      <span>Lock Scroll (Scroll Page)</span>
                    </button>
                  ) : null}

                  <a
                    href="/v/kishore"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] sm:text-xs font-bold text-blue-200 hover:text-white flex items-center gap-1 sm:gap-1.5 transition px-2.5 sm:px-3 py-1 rounded-lg bg-blue-950/90 hover:bg-blue-900 border border-blue-700/60 shrink-0"
                  >
                    <span className="hidden xs:inline">Full Screen View</span>
                    <span className="xs:hidden">Full Screen</span>
                    <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </a>
                </div>
              </div>

              {/* Inner Website Content with Scroll Hijacking Prevention */}
              <div 
                className={`h-[600px] xs:h-[660px] sm:h-[720px] lg:h-[780px] scrollbar-none bg-slate-50 relative ${
                  isDemoInteractive ? 'overflow-y-auto pointer-events-auto' : 'overflow-hidden pointer-events-none'
                }`}
                style={{ maxHeight: '780px', contain: 'paint' }}
              >
                <ProfileCardView profile={demoProfile} isMockup={true} initialViewMode="website" showViewToggle={false} />
              </div>

              {/* Click to Interact Overlay when not actively scrolling demo */}
              {!isDemoInteractive && (
                <div 
                  onClick={() => setIsDemoInteractive(true)}
                  className="absolute inset-x-0 bottom-0 top-[48px] z-20 flex items-end justify-center pb-6 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent cursor-pointer group"
                >
                  <div className="px-5 py-2.5 rounded-full bg-slate-900/95 hover:bg-blue-600 text-white text-xs sm:text-sm font-bold shadow-2xl border border-white/20 flex items-center gap-2 group-hover:scale-105 transition-all backdrop-blur-md">
                    <MousePointerClick className="w-4 h-4 text-sky-400 group-hover:text-white" />
                    <span>Click / Tap to Scroll & Explore Demo</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Mobile Phone Mockup Frame with Companion Callouts */
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 max-w-5xl mx-auto">
              
              {/* Left Companion Highlights */}
              <div className="hidden lg:flex flex-col gap-4 w-72">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-md space-y-1">
                  <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase">
                    <Download className="w-4 h-4" /> 1-Click Contact Save
                  </div>
                  <p className="text-xs text-slate-600">Downloads complete .vcf contact card straight into phone address book.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-md space-y-1">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase">
                    <MessageCircle className="w-4 h-4" /> Direct WhatsApp Orders
                  </div>
                  <p className="text-xs text-slate-600">Instant customer messaging, pre-filled enquiries and WhatsApp orders.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-md space-y-1">
                  <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase">
                    <CreditCard className="w-4 h-4" /> 0% Fee UPI Pay
                  </div>
                  <p className="text-xs text-slate-600">Customers pay directly via GPay, PhonePe, Paytm with zero gateway cuts.</p>
                </div>
              </div>

              {/* Center Phone Mockup Frame */}
              <div 
                onMouseLeave={() => setIsDemoInteractive(false)}
                className="w-full max-w-[285px] xs:max-w-[320px] sm:max-w-[360px] rounded-[40px] sm:rounded-[48px] p-2.5 sm:p-3 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border-4 border-slate-700/80 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.35)] relative ring-1 ring-slate-800 transition-all duration-300"
              >
                {/* Dynamic Island Speaker Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-950 rounded-full z-30 flex items-center justify-end pr-2.5 shadow-xs border border-slate-800/80 pointer-events-none">
                  <div className="w-2 h-2 rounded-full bg-slate-800" />
                </div>
                <div className={`rounded-[32px] sm:rounded-[38px] overflow-hidden bg-white h-[580px] xs:h-[620px] sm:h-[660px] scrollbar-none border border-slate-200/80 shadow-inner relative ${
                  isDemoInteractive ? 'overflow-y-auto pointer-events-auto' : 'overflow-hidden pointer-events-none'
                }`}>
                  <ProfileCardView profile={demoProfile} isMockup={true} initialViewMode="mobile" showViewToggle={false} />
                </div>

                {/* Unlock / Relock controls for Mobile frame */}
                {!isDemoInteractive ? (
                  <div 
                    onClick={() => setIsDemoInteractive(true)}
                    className="absolute inset-x-3 bottom-5 z-20 flex items-end justify-center cursor-pointer group"
                  >
                    <div className="px-4 py-2 rounded-full bg-slate-900/95 hover:bg-blue-600 text-white text-xs font-bold shadow-xl border border-white/20 flex items-center gap-1.5 group-hover:scale-105 transition-all backdrop-blur-md">
                      <MousePointerClick className="w-3.5 h-3.5 text-sky-400 group-hover:text-white" />
                      <span>Tap to Scroll Demo</span>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-x-3 bottom-5 z-20 flex justify-center pointer-events-auto">
                    <button
                      type="button"
                      onClick={() => setIsDemoInteractive(false)}
                      className="px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xl flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Lock className="w-3 h-3" />
                      <span>Lock Scroll (Scroll Page)</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Right Companion Highlights */}
              <div className="hidden lg:flex flex-col gap-4 w-72">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-md space-y-1">
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase">
                    <Sparkles className="w-4 h-4" /> 100% Cloud Software
                  </div>
                  <p className="text-xs text-slate-600">Pure digital web software — zero hardware required, nothing to carry or lose.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-md space-y-1">
                  <div className="flex items-center gap-2 text-sky-600 font-bold text-xs uppercase">
                    <QrCode className="w-4 h-4" /> Permanent Dynamic QR
                  </div>
                  <p className="text-xs text-slate-600">Scan anywhere. Update your card profile anytime without changing the QR.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-md space-y-1">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase">
                    <Sparkles className="w-4 h-4" /> No App Needed
                  </div>
                  <p className="text-xs text-slate-600">Opens instantly in Safari, Chrome, and any browser on iOS &amp; Android.</p>
                </div>
              </div>

            </div>
          )}

          {/* Bottom CTAs inside Demo Section */}
          <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">

            <a
              href="#templates"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <span>Browse 12+ Live Templates ↓</span>
            </a>
          </div>

        </div>
      </section>

      {/* VCARD TEMPLATES SHOWCASE SECTION with Clean Corporate Tint */}
      <section id="templates" className="py-20 bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-100/70 border-b border-slate-200/80 relative overflow-hidden scroll-mt-20">
        {/* Subtle Professional Grid Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none -z-10" />

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-[700px] h-[400px] bg-gradient-to-r from-blue-400/15 via-indigo-300/15 to-sky-300/15 blur-[140px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[350px] bg-gradient-to-l from-sky-400/15 via-blue-300/15 to-purple-300/15 blur-[130px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-900 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Curated Industry Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
              Templates Built for Every Industry
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Choose from {VCARD_TEMPLATES_CATALOG.length}+ high-converting digital business cards across 12 major sectors — engineered for rapid networking, 1-click contact downloads, and instant WhatsApp orders.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {[
              { id: 'all', label: `All (${VCARD_TEMPLATES_CATALOG.length})`, icon: '✨' },
              { id: 'Real Estate', label: 'Real Estate', icon: '🏠' },
              { id: 'Interior Design', label: 'Interiors', icon: '🛋️' },
              { id: 'Healthcare', label: 'Healthcare', icon: '🏥' },
              { id: 'Food Business', label: 'Food', icon: '🍽️' },
              { id: 'Fashion & Clothing', label: 'Fashion', icon: '👗' },
              { id: 'Beauty & Personal Care', label: 'Beauty', icon: '💄' },
              { id: 'Professional Services', label: 'Professional', icon: '💼' },
              { id: 'Education', label: 'Education', icon: '🎓' },
              { id: 'Events & Creative', label: 'Events', icon: '📸' },
              { id: 'Automobile', label: 'Automobile', icon: '🚗' },
              { id: 'Retail & Local Shops', label: 'Retail', icon: '🛍️' },
              { id: 'Home & Professional Services', label: 'Home Services', icon: '🛠️' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setTemplateFilter(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs backdrop-blur-md ${
                  templateFilter === cat.id
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/30 scale-105'
                    : 'bg-white/80 text-slate-700 hover:text-blue-600 hover:bg-white border border-slate-200/80 shadow-xs'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Slider Container with Navigation Controls */}
          <div className="relative group px-2 sm:px-6">
            {/* Left Scroll Arrow */}
            <button
              onClick={() => scrollSlider('left')}
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 border border-slate-200/80 text-slate-700 shadow-xl items-center justify-center hover:bg-blue-600 hover:text-white transition-all hover:scale-110 active:scale-95 backdrop-blur-md"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Scroll Arrow */}
            <button
              onClick={() => scrollSlider('right')}
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 border border-slate-200/80 text-slate-700 shadow-xl items-center justify-center hover:bg-blue-600 hover:text-white transition-all hover:scale-110 active:scale-95 backdrop-blur-md"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Scrollable Templates Track with Auto-Scroll */}
            <div
              ref={sliderRef}
              onMouseEnter={() => setIsTemplatesPaused(true)}
              onMouseLeave={() => setIsTemplatesPaused(false)}
              onTouchStart={() => setIsTemplatesPaused(true)}
              onTouchEnd={() => setIsTemplatesPaused(false)}
              className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto scrollbar-none scroll-smooth py-4 px-2 select-none"
              style={{ scrollSnapType: 'x proximity' }}
            >
              {VCARD_TEMPLATES_CATALOG
                .filter((t) => templateFilter === 'all' || t.category === templateFilter)
                .map((template) => {
                  return (
                    <div
                      key={template.id}
                      style={{ scrollSnapAlign: 'start' }}
                      className="w-[180px] xs:w-[195px] sm:w-[220px] md:w-[230px] shrink-0 rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white/95 backdrop-blur-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group/card shadow-[0_6px_25px_rgb(0,0,0,0.06)] hover:shadow-[0_15px_35px_rgb(0,0,0,0.12)] hover:-translate-y-1 relative"
                    >
                      {/* Ribbon or Badge */}
                      {template.badge && (
                        <div className="absolute top-2.5 right-2.5 z-20">
                          <span className="px-2 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-wide bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
                            {template.badge}
                          </span>
                        </div>
                      )}

                      {/* Card Preview Image */}
                      <div 
                        onClick={() => window.open(`/v/${template.id}`, '_blank', 'noopener,noreferrer')}
                        className="relative h-[240px] sm:h-[265px] w-full bg-slate-950 overflow-hidden cursor-pointer group/img flex items-center justify-center"
                        title="Click to preview live mini-website"
                      >
                        <img
                          src={template.imgUrl}
                          alt={template.name}
                          className="vcard-template-img w-full h-full object-cover object-center transition-transform duration-500 group-hover/card:scale-105"
                          loading="lazy"
                        />

                        {/* Top Gradient Overlay with Justdial Title & Subtitle */}
                        <div className="absolute top-0 inset-x-0 p-3 sm:p-3.5 pt-2.5 sm:pt-3 bg-gradient-to-b from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none z-10">
                          <h4 className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-white drop-shadow-md truncate">
                            {template.category}
                          </h4>
                          <p className="text-[10px] sm:text-[11px] text-indigo-200 font-semibold drop-shadow-sm mt-0.5 truncate">
                            {template.actionSubtitle || template.subCategory || 'Explore Portfolio'}
                          </p>
                        </div>

                        {/* Bottom Gradient Overlay with Justdial signature arrow */}
                        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none flex items-end p-3 z-10">
                          <div className="flex items-center gap-1.5">
                            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/40 group-hover/card:scale-110 transition-transform">
                              <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                            </span>
                            <span className="text-[10px] font-bold text-white/90 drop-shadow-md group-hover/card:text-white transition-colors">
                              Explore
                            </span>
                          </div>
                        </div>

                        {/* Hover action overlay */}
                        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px] opacity-0 group-hover/card:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3 z-20">
                          <Link
                            href={`/signup?intent=build_card&template=${template.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full py-2 px-3 rounded-xl text-center text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30 flex items-center justify-center gap-1 transition-all"
                          >
                            <span>Use Template</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                          <a
                            href={`/v/${template.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-full py-1.5 px-3 rounded-xl text-center text-[10px] font-semibold text-slate-200 hover:text-white bg-white/20 hover:bg-white/30 border border-white/30 backdrop-blur-md transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3 h-3 text-indigo-300" />
                            <span>Preview</span>
                          </a>
                        </div>
                      </div>

                      {/* Card Body Footer */}
                      <div className="p-3 sm:p-3.5 border-t border-slate-100 bg-white space-y-2">
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover/card:text-blue-600 transition-colors truncate">
                            {template.name}
                          </h3>
                        </div>

                        <div className="flex items-center gap-1.5 pt-0.5">
                          <Link
                            href={`/signup?intent=build_card&template=${template.id}`}
                            className="flex-1 py-1.5 px-2 rounded-lg text-center text-[10px] sm:text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-xs"
                          >
                            Use Free
                          </Link>
                          <a
                            href={`/v/${template.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-1.5 px-2.5 rounded-lg text-[10px] sm:text-[11px] font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-all flex items-center justify-center gap-1 cursor-pointer shrink-0"
                            title="Preview live mini-website"
                          >
                            <Eye className="w-3 h-3 text-slate-500" />
                            <span>Preview</span>
                          </a>
                        </div>
                      </div>

                    </div>
                  );
                })}
            </div>
          </div>

          {/* See More Templates Button */}
          <div className="text-center mt-12">
            <Link
              href="/vcard-templates"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/30 transition-all duration-300 hover:scale-105 font-bold text-sm tracking-wide group"
            >
              <span>See More Templates ({VCARD_TEMPLATES_CATALOG.length})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* DEMO VIDEO & HOW TO USE WALKTHROUGH SECTION */}
      <DemoVideoSection />

      {/* INTERACTIVE BENTO GRID FEATURE MATRIX WITH SECTOR IMPACT DEEP-DIVE */}
      <InteractiveFeaturesSection />

      {/* DETAILED FOUNDER STORY SECTION: WHY ONECLICKBIZ? */}
      <section id="about" className="py-24 bg-gradient-to-b from-slate-50 via-blue-50/50 to-indigo-50/60 border-y border-slate-200/80 relative overflow-hidden scroll-mt-24">
        
        {/* Glow Background Accent */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[650px] bg-gradient-to-r from-blue-300/20 via-sky-300/20 to-indigo-300/20 blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">

          {/* Section Header */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-blue-200 shadow-sm text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Quote className="w-3.5 h-3.5 text-blue-600" /> Founder Story
            </div>
            
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Why <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">OneClickBiz?</span>
            </h2>

            <p className="text-base sm:text-xl lg:text-2xl font-bold text-slate-800 tracking-tight">
              One Platform. Every Business. Endless Possibilities.
            </p>
          </div>

          {/* Vision vs The Real Problem - 2 Side-by-Side Narrative Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Our Vision Card */}
            <div className="p-5 sm:p-8 md:p-10 rounded-3xl bg-white/90 backdrop-blur-xl border border-indigo-200/90 shadow-[0_12px_40px_rgb(0,0,0,0.05)] hover:shadow-xl transition-all space-y-4 sm:space-y-5 flex flex-col justify-between">
              <div className="space-y-3 sm:space-y-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
                  <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
                  Our Vision
                </h3>
                <p className="text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed">
                  In today’s digital world, every business needs an online presence. Whether it is real estate, interior design, food, fashion, beauty, insurance, banking, or any other industry, having a website is no longer just an option — it is an essential part of business growth.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Essential for Modern Business Growth
              </div>
            </div>

            {/* The Common Problem Card */}
            <div className="p-5 sm:p-8 md:p-10 rounded-3xl bg-white/90 backdrop-blur-xl border border-rose-200/90 shadow-[0_12px_40px_rgb(0,0,0,0.05)] hover:shadow-xl transition-all space-y-4 sm:space-y-5 flex flex-col justify-between">
              <div className="space-y-3 sm:space-y-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shadow-sm">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
                  But There is a Common Problem.
                </h3>
                <p className="text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed">
                  Businesses that already have websites often depend on developers even for small changes. Updating prices, changing photos, adding products, modifying services, or updating business information can become time-consuming and expensive. Small businesses deserve a simpler solution.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Eliminating Costly Developer Bottlenecks
              </div>
            </div>

          </div>

          {/* Breakthrough: That is why we created OneClickBiz */}
          <div className="p-6 sm:p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white shadow-2xl border border-indigo-800/80 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-4xl space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-[11px] sm:text-xs font-semibold tracking-wider uppercase">
                <Rocket className="w-3.5 h-3.5 text-indigo-400" /> The Turning Point
              </div>

              <h3 className="text-xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                That is why we created OneClickBiz.
              </h3>

              <p className="text-sm sm:text-lg md:text-xl text-indigo-100/90 leading-relaxed font-medium">
                Our vision is to make digital business tools simple, accessible, and affordable for everyone — even for people without technical knowledge.
              </p>

              <div className="p-4 sm:p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white shadow-inner">
                <p className="text-xs sm:text-base md:text-lg font-bold text-amber-200 leading-relaxed">
                  &ldquo;We believe every business owner should have the freedom to create, manage, edit, and grow their online presence independently.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Everything Your Business Needs. All in One Place. (19 Tools) */}
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider shadow-sm">
                <Layers className="w-3.5 h-3.5 text-blue-600" /> Unified Business Ecosystem
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Everything Your Business Needs. All in One Place.
              </h3>
              <p className="text-slate-600 text-sm sm:text-base">
                OneClickBiz brings together essential digital business tools on a single platform:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {[
                { title: 'Mini Website & Live Business Profile', icon: Globe2, color: 'text-sky-600 bg-sky-50 border-sky-200' },
                { title: 'Personal Profile', icon: Smartphone, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
                { title: 'WhatsApp Store & E-commerce', icon: ShoppingBag, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
                { title: 'Digital Visiting Cards, Flyers & Brochures', icon: CreditCard, color: 'text-blue-600 bg-blue-50 border-blue-200' },
                { title: 'Lead Extraction Tools', icon: Target, color: 'text-amber-600 bg-amber-50 border-amber-200' },
                { title: 'Custom Domains & Landing Pages', icon: Monitor, color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
                { title: 'Customer Reviews & Ratings', icon: Star, color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
                { title: 'Image Gallery & Product Space', icon: ImageIcon, color: 'text-rose-600 bg-rose-50 border-rose-200' },
                { title: 'Articles & Blogs', icon: FileText, color: 'text-blue-600 bg-blue-50 border-blue-200' },
                { title: 'Products & Services Showcase', icon: Layers, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
                { title: 'Customizable Templates', icon: Palette, color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
                { title: 'Easy Website Designing & Multiple Edits', icon: Edit3, color: 'text-teal-600 bg-teal-50 border-teal-200' },
                { title: 'Customized QR Codes', icon: QrCode, color: 'text-slate-700 bg-slate-100 border-slate-300' },
                { title: 'Payment Gateway Integration', icon: ShieldCheck, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
                { title: 'Canva & Adobe Integration, where supported', icon: Zap, color: 'text-orange-600 bg-orange-50 border-orange-200' },
                { title: 'Email Signature Generator', icon: Mail, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
                { title: 'PDF Report Generation', icon: Download, color: 'text-blue-600 bg-blue-50 border-blue-200' },
                { title: 'Commercial Usage & Business Scaling', icon: TrendingUp, color: 'text-green-600 bg-green-50 border-green-200' },
                { title: 'Installable App-like Experience with a Direct Installation Prompt, where supported', icon: Rocket, color: 'text-blue-600 bg-blue-50 border-blue-200' },
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div 
                    key={idx}
                    className={`p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md hover:border-indigo-300 transition-all flex items-start gap-3.5 group ${idx === 18 ? 'sm:col-span-2 lg:col-span-3 xl:col-span-2' : ''}`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-110 ${item.color}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-800 leading-snug group-hover:text-indigo-700 transition-colors">
                        {item.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Designed for Every Industry */}
          <div className="p-5 sm:p-8 md:p-12 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-[0_10px_35px_rgb(0,0,0,0.05)] space-y-6 sm:space-y-8">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5 text-amber-600" /> Broad Industry Reach
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Designed for Every Industry
              </h3>
              <p className="text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed">
                Whether you are a real estate developer, interior designer, restaurant owner, fashion retailer, beauty salon owner, insurance professional, banking service provider, or entrepreneur, OneClickBiz helps bring your digital business presence together.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3 pt-2">
              {[
                { name: 'Real Estate Developers', icon: Building2 },
                { name: 'Interior Designers', icon: Palette },
                { name: 'Restaurant & Food Owners', icon: Store },
                { name: 'Fashion Retailers', icon: ShoppingBag },
                { name: 'Beauty & Salon Owners', icon: Sparkles },
                { name: 'Insurance Professionals', icon: ShieldCheck },
                { name: 'Banking & Financial Services', icon: CreditCard },
                { name: 'Entrepreneurs & Creators', icon: Rocket }
              ].map((ind, idx) => {
                const IndIcon = ind.icon;
                return (
                  <span 
                    key={idx}
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-800 hover:text-indigo-700 text-xs sm:text-sm font-semibold transition-all shadow-sm"
                  >
                    <IndIcon className="w-3.5 h-3.5 text-indigo-600" />
                    {ind.name}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Your Business. Your Website. Your Control. */}
          <div className="p-5 sm:p-8 md:p-12 rounded-3xl bg-gradient-to-r from-blue-50/90 via-sky-50/90 to-indigo-50/90 border border-blue-200 shadow-sm backdrop-blur-md space-y-6">
            <h3 className="text-xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Your Business. Your Website. <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent">Your Control.</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-slate-700">
              <div className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-indigo-100 space-y-2">
                <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Zero Developer Hassle
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                  No unnecessary dependency on developers for every small update. No need to manage your entire digital presence through multiple disconnected tools when the required features are available in one place.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-indigo-100 space-y-2">
                <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> One Smart Link
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                  Create your business presence, update your information, showcase your products and services, connect with customers, and promote your business through one smart link.
                </p>
              </div>
            </div>
          </div>

          {/* Our Mission & Call to Action Footer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center p-5 sm:p-8 md:p-10 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                <Target className="w-3.5 h-3.5 text-indigo-400" /> Our Mission
              </div>
              <h4 className="text-lg sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                Empowering Independent Digital Growth
              </h4>
              <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl">
                To help every business build a stronger digital presence, simplify online business management, and make digital growth more accessible and affordable.
              </p>
              <div className="pt-2 text-xs sm:text-sm md:text-base font-bold text-transparent bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text">
                OneClickBiz — One Platform. Every Business. Your Control.
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center items-stretch lg:items-end">
              <Link
                href="/signup"
                className="w-full px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-all text-center"
              >
                <span>Explore: oneclickbiz.in</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </section>




      {/* Head-to-Head Comparison & Differentiation Section - Executive Dark Sapphire Theme */}
      <section className="py-24 bg-gradient-to-b from-[#061224] via-[#0a1e3f] to-[#050e1c] border-y border-blue-900/60 relative overflow-hidden text-white">
        {/* Subtle Professional Grid Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf820_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none -z-10" />

        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-cyan-500/15 blur-[160px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-200 text-xs font-semibold shadow-xs backdrop-blur-md">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Built Different For Indian Commerce</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Why OneClickBiz vs. Generic Digital Cards
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Most digital cards are just a flat list of web links. OneClickBiz combines 1-click address book downloads with native WhatsApp micro-stores, direct UPI payments, and high-resolution corporate print studios.
            </p>
          </div>

          {/* Mobile Swipe Notice */}
          <div className="flex items-center justify-center gap-1.5 mb-3 sm:hidden text-[11px] font-semibold text-blue-300 bg-blue-950/80 px-3.5 py-1.5 rounded-full border border-blue-800 w-fit mx-auto shadow-xs">
            <span>👈 Swipe horizontally to view full comparison 👉</span>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto pb-4 -mx-2 px-2 sm:mx-0 sm:px-0 scrollbar-none">
            <div className="min-w-[720px] xs:min-w-[760px] rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl overflow-hidden">
              <div className="grid grid-cols-12 bg-slate-950/90 border-b border-slate-800 text-xs font-bold text-slate-300">
                <div className="col-span-4 p-5 text-slate-400 uppercase tracking-wider text-[11px]">
                  Capability / Feature
                </div>
                <div className="col-span-2.5 p-5 text-center text-slate-400">
                  Generic Link-in-Bio
                  <span className="block text-[10px] font-normal text-slate-500 mt-0.5">(Linktree, Carrd)</span>
                </div>
                <div className="col-span-2.5 p-5 text-center text-slate-400">
                  Traditional Digital Cards
                  <span className="block text-[10px] font-normal text-slate-500 mt-0.5">(Popl, Blinq, HiHello)</span>
                </div>
                <div className="col-span-3 p-5 text-center bg-gradient-to-b from-blue-600 to-indigo-600 text-white rounded-t-2xl shadow-xl shadow-blue-500/30 border-t border-x border-blue-400/40">
                  <div className="inline-flex items-center gap-1.5 font-extrabold">
                    <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                    <span>OneClickBiz</span>
                  </div>
                  <span className="block text-[10px] font-medium text-blue-100 mt-0.5">Engineered for Indian Commerce</span>
                </div>
              </div>

              {/* Rows */}
              {[
                {
                  feature: 'Primary Function',
                  sub: 'What it actually does for your business',
                  generic: 'Basic list of outbound links',
                  western: 'Corporate networking profile',
                  oneclickbiz: 'Complete Commerce & Identity Engine',
                  highlight: true,
                },
                {
                  feature: 'WhatsApp Mini-Store & Direct Cart',
                  sub: 'Receive structured client orders on WhatsApp',
                  generic: false,
                  western: false,
                  oneclickbiz: '✅ 0% Fee In-Card WhatsApp Cart',
                  highlight: true,
                },
                {
                  feature: 'Direct Bank UPI Payments',
                  sub: 'Collect GPay / PhonePe / Paytm with 0% gateway cuts',
                  generic: false,
                  western: 'Stripe / Apple Pay only',
                  oneclickbiz: '✅ Instant Bank UPI QR Code (0% fees)',
                  highlight: true,
                },
                {
                  feature: 'Print Brochure & Card Studio',
                  sub: 'Design & export 300 DPI corporate PDF brochures',
                  generic: false,
                  western: false,
                  oneclickbiz: '✅ Built-in 300 DPI Multi-Page Studio',
                  highlight: true,
                },
                {
                  feature: 'Appointment Slot Booking',
                  sub: 'Let clients book appointments without Calendly fees',
                  generic: 'Needs $15/mo 3rd-party',
                  western: 'Needs Calendly subscription',
                  oneclickbiz: '✅ In-Card Concurrency Slot Booking',
                  highlight: true,
                },
                {
                  feature: 'Blog & Article Publishing Studio',
                  sub: 'Publish articles & rank in Google search',
                  generic: false,
                  western: false,
                  oneclickbiz: '✅ Built-in SEO Blog Studio',
                  highlight: true,
                },
                {
                  feature: '24x7 Unlimited Profile Updates',
                  sub: 'Edit phone, address, photo, or products anytime',
                  generic: 'Limited on free plans',
                  western: 'Paywalled behind upgrades',
                  oneclickbiz: '✅ 100% Free Unlimited Updates',
                  highlight: true,
                },
                {
                  feature: 'Annual Price in India',
                  sub: 'No expensive recurring US dollar surprises',
                  generic: '$60 - $120/yr (~₹5,000 - ₹10,000)',
                  western: '$96 - $180/yr (~₹8,000 - ₹15,000)',
                  oneclickbiz: '₹499 - ₹999/yr (Indian ₹ Pricing)',
                  highlight: true,
                }
              ].map((row, idx) => (
                <div 
                  key={idx} 
                  className={`grid grid-cols-12 text-xs border-b border-slate-800/80 last:border-0 items-center ${
                    idx % 2 === 0 ? 'bg-slate-900/60' : 'bg-slate-950/50'
                  }`}
                >
                  <div className="col-span-4 p-4 sm:p-5">
                    <p className="font-bold text-white">{row.feature}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{row.sub}</p>
                  </div>
                  <div className="col-span-2.5 p-4 sm:p-5 text-center text-slate-300 font-medium border-l border-slate-800/80">
                    {row.generic === false ? (
                      <span className="inline-flex items-center gap-1 text-slate-500 font-normal">
                        <X className="w-4 h-4 text-slate-500" /> None
                      </span>
                    ) : (
                      row.generic
                    )}
                  </div>
                  <div className="col-span-2.5 p-4 sm:p-5 text-center text-slate-300 font-medium border-l border-slate-800/80">
                    {row.western === false ? (
                      <span className="inline-flex items-center gap-1 text-slate-500 font-normal">
                        <X className="w-4 h-4 text-slate-500" /> None
                      </span>
                    ) : (
                      row.western
                    )}
                  </div>
                  <div className="col-span-3 p-4 sm:p-5 text-center font-bold text-blue-100 bg-blue-600/20 border-l border-blue-500/30">
                    <span className="text-blue-200">{row.oneclickbiz}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Consolidate & Save Banner */}
          <div className="mt-12 p-5 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/90 via-indigo-950/90 to-slate-900 text-white shadow-2xl border border-blue-800/70 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                COST CONSOLIDATION
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Replace 4 Disjointed Subscriptions with 1 Smart Identity
              </h3>
              <p className="text-xs text-slate-300 max-w-xl">
                Save ₹25,000+/year by replacing Linktree (₹5,000/yr), Calendly (₹12,000/yr), Shopify Lite (₹8,000/yr), and PDF tools with OneClickBiz.
              </p>
            </div>
            <Link
              href="/signup?intent=build_card"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0 shadow-lg shadow-blue-500/30 transition-all active:scale-95 flex items-center justify-center gap-2 text-center"
            >
              <span>Build Your Smart Card Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* Authentic Transparency & Risk-Free Guarantees Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 via-sky-50/50 to-blue-50/50 border-t border-slate-200/80 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[350px] bg-gradient-to-r from-emerald-400/20 via-indigo-400/20 to-sky-400/20 blur-[130px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/90 text-emerald-800 text-xs font-semibold shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Honest Business Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Transparent Company. Zero Financial Risk.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              We know trust is earned. You never need to pay upfront deposits or take risks on unverified claims. Experience the full platform risk-free before spending a single rupee.
            </p>
          </div>

          {/* 4 Core Trust Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            
            {/* Pillar 1: ₹0 Upfront */}
            <div className="p-7 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-bold text-lg">
                  ₹0
                </div>
                <h3 className="text-base font-bold text-slate-900">Try 100% Free First</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Build your card, customize colors, upload your products, and live-preview it on your phone for free. No credit card or upfront deposit required.
                </p>
              </div>
              <Link href="/signup?intent=build_card" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 group pt-2">
                <span>Start Free Card</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Pillar 2: 7-Day Money Back */}
            <div className="p-7 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900">7-Day Money-Back Guarantee</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If you choose to upgrade to Pro and are not 100% satisfied with the results, simply ping us within 7 days for an instant, full refund. Zero hassle.
                </p>
              </div>
              <Link href="/refund" className="text-xs font-bold text-indigo-700 hover:text-indigo-800 flex items-center gap-1.5 group pt-2">
                <span>Read Refund Policy</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Pillar 3: 100% Data Ownership & Privacy */}
            <div className="p-7 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 border border-teal-200 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900">100% Data Ownership</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You own all captured leads, appointments, and contact lists. We never sell or broker your data to advertisers. Export to CSV anytime with 1 click.
                </p>
              </div>
              <Link href="/privacy" className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1.5 group pt-2">
                <span>Read Privacy Terms</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Pillar 4: Corporate Transparency & Support */}
            <div className="p-7 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Registered Corporate Entity</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Engineered &amp; operated by <strong>Merlinflow Technologies Pvt. Ltd.</strong>, headquartered in Hyderabad, India. Direct human WhatsApp &amp; phone support.
                </p>
              </div>
              <a 
                href="https://wa.me/916304989071?text=Hi%20OneClickBiz%20Team%2C%20I%20have%20a%20question%20before%20signing%20up." 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1.5 group pt-2"
              >
                <span>Chat With Our Team</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>

          {/* Zero Vendor Lock-In & Physical Print Longevity Guarantee Banner */}
          <div className="mb-16 p-5 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-indigo-500/10 border-2 border-amber-500/30 backdrop-blur-md shadow-lg shadow-amber-500/5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span>Physical Print &amp; QR Longevity Protection</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Printing 1,000+ Physical Cards? You Are 100% Protected From Lock-In.
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  Never worry about wasted printing costs or broken links. With <strong>White-Label Custom Domains (e.g., cards.yourbrand.com)</strong>, the QR code printed on your physical cards and marketing materials points to <strong>your own company domain</strong>—you own the URL forever. Even if you migrate platforms in 10 years, your printed cards never expire.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                  <div className="p-3 rounded-xl bg-white/80 border border-amber-200/80 space-y-1">
                    <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> Custom CNAME Domains
                    </p>
                    <p className="text-[11px] text-slate-500">Your brand, your URL. Zero platform lock-in.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/80 border border-amber-200/80 space-y-1">
                    <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> Dynamic Cloud Redirects
                    </p>
                    <p className="text-[11px] text-slate-500">Update the destination anytime with 0 reprints.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/80 border border-amber-200/80 space-y-1">
                    <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> 1-Click Data Portability
                    </p>
                    <p className="text-[11px] text-slate-500">Export leads, products &amp; contacts to CSV anytime.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <Link
                  href="/terms"
                  className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center shadow-md transition"
                >
                  Read Longevity Terms
                </Link>
                <Link
                  href="/signup?plan=Pro&intent=custom_domain"
                  className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs text-center shadow-xs transition"
                >
                  Pair Custom Domain
                </Link>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* Pricing Section with Soft Brand Sky-Blue Background */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-slate-50 via-sky-50/60 to-blue-50/70 border-y border-slate-200/80 relative scroll-mt-24 overflow-hidden">
        {/* Glowing Background Orbs */}
        <div className="absolute top-10 left-1/3 w-[750px] h-[500px] bg-gradient-to-r from-sky-400/25 via-blue-400/25 to-indigo-400/20 blur-[130px] pointer-events-none -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/90 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
              <span>Simple &amp; Transparent Pricing</span>
            </div>
            <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Choose Your Perfect Plan
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-600">
              No Hidden Charges &nbsp;|&nbsp; One Time Payment &nbsp;|&nbsp; Annual Plan
            </p>
          </div>

        {/* Highlight Banner: Edit Details N Number of Times */}
        <div className="mb-12 max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-white/90 border-2 border-emerald-500/40 backdrop-blur-md shadow-lg shadow-emerald-500/10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-[10px] uppercase tracking-wider mb-2 shadow-xs">
            <RefreshCw className="w-3 h-3 animate-spin" />
            100% Free Unlimited Updates
          </div>
          <h4 className="text-base sm:text-lg font-black text-slate-900">
            Edit Your Details N Number of Times — ZERO Extra Fees
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-2xl mx-auto leading-relaxed">
            Update your phone, WhatsApp, email, social links, photos, services, pricing, or templates whenever your business evolves. You never need an extra recharge or special plan to make changes.
          </p>
        </div>

        {/* Free Tier Callout to eliminate any upfront payment hesitation */}
        <div className="mb-10 max-w-4xl mx-auto p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-indigo-500/15 border-2 border-emerald-500/30 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg shadow-emerald-500/5">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
              <BadgeCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-slate-900">Try 100% Free First</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200">₹0 Upfront</span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">Create, customize, and test your live card on your phone before spending a single rupee. No credit card required.</p>
            </div>
          </div>
          <Link href="/signup?intent=build_card" className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shrink-0 shadow-md transition-all active:scale-95">
            Start Free Card
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Plan 1: Basic (Soft Sky Blue) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#ebf4ff] border border-blue-200/90 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl transition-all">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Solo Professionals</span>
                <h4 className="text-2xl font-black text-blue-700">Basic</h4>
              </div>
              <p className="text-xs text-slate-600">Essential digital smart card for individual practitioners and consultants.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-slate-900">₹{pricing.basicPrice.toLocaleString()}/-</span>
                <span className="text-xs text-slate-600 font-semibold ml-1">Per Year</span>
              </div>
              <ul className="space-y-2.5 pt-4 text-xs text-slate-700 border-t border-blue-200/60">
                <li className="flex items-center gap-2 text-emerald-800 font-semibold"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> <strong>Unlimited 24x7 Card Edits (Edit N Times)</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600 shrink-0" /> <strong>1 Digital Card (/v/your-name)</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600 shrink-0" /> 1-Click .VCF Contact Downloader</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600 shrink-0" /> Dynamic Cloud QR Code (Editable)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600 shrink-0" /> Social Links &amp; Portfolio Showcase</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600 shrink-0" /> Inbound Lead Inquiry Capture Form</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600 shrink-0" /> Standard Visitor Analytics</li>
              </ul>
            </div>
            <Link href="/signup?plan=Basic&intent=select_plan" className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center shadow-md shadow-blue-500/25 transition-all">
              Select Basic Plan (₹{pricing.basicPrice.toLocaleString()})
            </Link>
          </div>

          {/* Plan 2: Pro (Fresh Mint Green - Most Popular) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#e6f9f0] border-2 border-emerald-500 flex flex-col justify-between space-y-6 relative shadow-xl shadow-emerald-500/15 overflow-hidden">
            <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl bg-emerald-600 text-white font-black text-[10px] tracking-wider uppercase shadow-xs">
              Most Popular
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Multi-service Professionals &amp; Agencies</span>
                <h4 className="text-2xl font-black text-emerald-700">Pro</h4>
              </div>
              <p className="text-xs text-slate-700">Complete suite for multi-service professionals, agencies, and growing businesses.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">₹{pricing.proPrice.toLocaleString()}/-</span>
                <span className="text-xs text-slate-700 font-semibold ml-1">Per Year</span>
              </div>
              <ul className="space-y-2.5 pt-4 text-xs text-slate-800 border-t border-emerald-200/80">
                <li className="flex items-center gap-2 text-emerald-900 font-semibold"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> <strong>Unlimited 24x7 Card Edits (Edit N Times)</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-700 shrink-0" /> <strong>Up to 3 Digital Cards</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-700 shrink-0" /> <strong>1 Custom Domain CNAME (White-Label)</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-700 shrink-0" /> <strong>Unlimited WhatsApp Store Catalog</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-700 shrink-0" /> <strong>Appointment &amp; Slot Booking Engine</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-700 shrink-0" /> <strong>PDF Data Reporting &amp; Exporting Suite</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-700 shrink-0" /> Leads CRM Pipeline Inbox with Exports</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-700 shrink-0" /> Priority WhatsApp &amp; Email Support</li>
              </ul>
            </div>
            <Link href="/signup?plan=Pro&intent=select_plan" className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center shadow-lg shadow-emerald-500/30 transition-all active:scale-95">
              Get Started with Pro (₹{pricing.proPrice.toLocaleString()})
            </Link>
          </div>

          {/* Plan 3: Advance (Soft Lavender) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#f5eefc] border border-purple-200/90 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl transition-all">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">Growing Businesses &amp; Executives</span>
                <h4 className="text-2xl font-black text-purple-700">Advance</h4>
              </div>
              <p className="text-xs text-slate-600">For growing businesses and executives with multiple companies or team staff.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-slate-900">₹{pricing.advancedPrice.toLocaleString()}/-</span>
                <span className="text-xs text-slate-600 font-semibold ml-1">Per Year</span>
              </div>
              <ul className="space-y-2.5 pt-4 text-xs text-slate-700 border-t border-purple-200/60">
                <li className="flex items-center gap-2 text-emerald-800 font-semibold"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> <strong>Unlimited 24x7 Card Edits (Edit N Times)</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600 shrink-0" /> <strong>Up to 5 Digital Cards &amp; Team Profiles</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600 shrink-0" /> <strong>5 White-Label Custom Domains</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600 shrink-0" /> <strong>Unlimited 4K Video Uploads &amp; CDN</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600 shrink-0" /> Blog Studio &amp; Unlimited Article Publishing</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600 shrink-0" /> 50+ Portfolio Case Studies with Zoom</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600 shrink-0" /> Dedicated Account Manager &amp; VIP SLA</li>
              </ul>
            </div>
            <Link href="/signup?plan=Advanced&intent=select_plan" className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs text-center shadow-md shadow-purple-500/25 transition-all">
              Choose Advance Plan (₹{pricing.advancedPrice.toLocaleString()})
            </Link>
          </div>

        </div>

        {/* 7-Day Money Back Guarantee Strip */}
        <div className="mt-12 max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-white/95 border border-slate-200/90 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">100% Risk-Free Guarantee</p>
              <p className="text-[11px] text-slate-600">Try any paid plan for 7 days. If you aren&apos;t completely delighted, WhatsApp or email us for an instant, no-questions-asked refund.</p>
            </div>
          </div>
          <Link href="/refund" className="text-xs font-bold text-blue-600 hover:text-blue-700 shrink-0 flex items-center gap-1">
            <span>Refund Terms</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        </div>
      </section>

      {/* FAQ Accordion with Soft Brand Blue Background */}
      <section id="faq" className="py-24 bg-gradient-to-b from-slate-50 via-sky-50/50 to-blue-50/60 backdrop-blur-xl border-t border-slate-200/80 scroll-mt-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-blue-300/20 to-sky-300/20 blur-[120px] pointer-events-none -z-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600">FAQ</h2>
            <h3 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs cursor-pointer transition-all hover:border-blue-400/60 hover:shadow-sm"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-900">{faq.q}</h4>
                  <span className="text-blue-600 font-bold text-base">
                    {openFaq === idx ? '−' : '+'}
                  </span>
                </div>
                {openFaq === idx && (
                  <p className="mt-3 text-xs leading-relaxed text-slate-600 pt-3 border-t border-slate-100">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support Section with Soft Sky-Blue Light Background */}
      <section id="contact" className="py-24 bg-gradient-to-b from-slate-50 via-sky-50/60 to-blue-50/70 border-t border-slate-200/80 relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-300/20 via-sky-200/15 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <MessageCircle className="w-3.5 h-3.5 text-blue-600" />
              <span>Get In Touch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Connect With Our Support &amp; Engineering Team
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Have questions about smart profiles, custom onboarding, or need enterprise assistance? We are here to help 24/7.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Col: Contact Information Cards */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Contact Person & WhatsApp Card */}
              <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/80 hover:border-emerald-400/60 shadow-xs hover:shadow-sm transition flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="space-y-1 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Primary Contact</span>
                  <h3 className="text-sm font-bold text-slate-900">Adduri Sai Kishore</h3>
                  <p className="text-xs text-slate-600">Direct WhatsApp &amp; Mobile Support for smart business card inquiries.</p>
                  <a 
                    href="https://wa.me/916304989071?text=Hi%20Adduri%20Sai%20Kishore%2C%20I%20have%20an%20inquiry%20regarding%20OneClickBiz%20smart%20business%20cards." 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 pt-1 transition"
                  >
                    <span>+91 63049 89071</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/80 hover:border-blue-400/60 shadow-xs hover:shadow-sm transition flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-sm font-bold text-slate-900">Email Support Desk</h3>
                  <p className="text-xs text-slate-600">Response guaranteed within 2-4 business hours.</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-1">
                    <a 
                      href="mailto:support@oneclickbiz.in" 
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
                    >
                      <span>support@oneclickbiz.in</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                    <a 
                      href="mailto:contact@oneclickbiz.in" 
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
                    >
                      <span>contact@oneclickbiz.in</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Office Location Card */}
              <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-900">Office Location</h3>
                  <p className="text-xs text-slate-600 font-medium">
                    Nagole, Hyderabad, Telangana, India
                  </p>
                </div>
              </div>

            </div>

            {/* Right Col: Interactive Inquiry Form */}
            <div className="lg:col-span-7 p-4 xs:p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl relative">
              <div className="space-y-2 mb-6">
                <h3 className="text-lg font-bold text-slate-900">Send Us a Direct Message</h3>
                <p className="text-xs text-slate-600">
                  Fill in your details below and our team will reach out with solutions tailored to your business.
                </p>
              </div>

              {contactSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-3 animate-in fade-in zoom-in-95">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Message Received Successfully!</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Thank you for reaching out. A representative from our Hyderabad engineering &amp; support team will contact you shortly.
                  </p>
                  <button 
                    onClick={() => setContactSubmitted(false)}
                    className="mt-3 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-800 transition shadow-xs"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Your Full Name *</label>
                      <input 
                        type="text" 
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="e.g. Kishore Patel"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200/90 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Official Work Email *</label>
                      <input 
                        type="email" 
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="kishore@himastech.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200/90 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Mobile / WhatsApp Number *</label>
                      <input 
                        type="tel" 
                        required
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="+91 63049 89071"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200/90 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Inquiry Topic</label>
                      <select 
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200/90 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      >
                        <option value="General Inquiry">General Product Inquiry</option>
                        <option value="Team Onboarding">Multi-User / Team Card Setup</option>
                        <option value="WhatsApp Store Integration">WhatsApp Mini Store Assistance</option>
                        <option value="Billing & Invoicing">Billing & Tax GST Invoicing</option>
                        <option value="Technical Support">Technical & Domain Support</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">How Can We Help You? *</label>
                    <textarea 
                      rows={4}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Tell us about your business goals or any questions you have..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200/90 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmittingContact}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmittingContact ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message to Support Team</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Live Interactive Template Demo Modal */}
      <TemplateQuickPreviewModal
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
      />

      {/* Sticky Mobile Bottom Navigation Bar (Matching App Mockup) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-2 px-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] flex items-center justify-around">
        <Link href="/" className="flex flex-col items-center gap-0.5 text-blue-600 font-bold">
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </Link>
        <a href="#features" className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-blue-600 font-medium transition-colors">
          <Grid className="w-5 h-5" />
          <span className="text-[10px]">Features</span>
        </a>
        <a href="#pricing" className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-blue-600 font-medium transition-colors">
          <Tag className="w-5 h-5" />
          <span className="text-[10px]">Pricing</span>
        </a>
        <a href="#about" className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-blue-600 font-medium transition-colors">
          <Users className="w-5 h-5" />
          <span className="text-[10px]">About Us</span>
        </a>
        <a href="#contact" className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-blue-600 font-medium transition-colors">
          <Phone className="w-5 h-5" />
          <span className="text-[10px]">Contact</span>
        </a>
      </div>

      <Footer />
    </div>
  );
}
