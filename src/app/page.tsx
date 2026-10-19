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
    <div className="min-h-screen bg-white text-[#1A1A2E] font-sans selection:bg-[#0066FF] selection:text-white relative overflow-x-clip overflow-x-hidden w-full max-w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <Navbar />

      {/* Hero Section — Clean, Solid, Corporate */}
      <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 overflow-hidden bg-white border-b border-slate-200">
        
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          
          {/* Main Top Grid: Headline/Copy on Left + 3D Device Showcase on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-14 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-5 xl:col-span-5 space-y-6 text-center lg:text-left">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0066FF]/5 border border-[#0066FF]/20 text-[#0066FF] text-sm font-bold">
                <Zap className="w-4 h-4" />
                <span>Trusted by 500+ businesses</span>
              </div>

              {/* Authoritative Headline */}
              <h1 className="text-4xl xs:text-5xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-[#1B2A4A] leading-[1.08]">
                Turn your business into <br className="hidden sm:inline" />
                a smarter digital presence.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed font-normal max-w-xl mx-auto lg:mx-0">
                Create a polished digital card, WhatsApp storefront, and lead capture system in minutes — without needing technical skills.
              </p>

              {/* Clean Trust Strip */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#00875A]" />2-minute setup</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#00875A]" />No code needed</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#00875A]" />Built for growth</span>
              </div>

              {/* Action Buttons: Clean Dual CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
                <Link
                  href="/signup?intent=get_started"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-base flex items-center justify-center gap-2 transition-colors active:scale-95 shrink-0"
                >
                  <span>Start free</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a 
                  href="#demo"
                  className="inline-flex items-center gap-3 px-5 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-[#1B2A4A] group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#0066FF]/10 flex items-center justify-center text-[#0066FF] group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-bold text-[#1B2A4A] block">See live demo</span>
                    <span className="text-xs text-slate-500 block">How it works</span>
                  </div>
                </a>
              </div>

              {/* Live URL Alias Claimer Bar */}
              <div className="pt-2 max-w-md mx-auto lg:mx-0">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-center lg:justify-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Claim your business link</span>
                </div>
                <form onSubmit={handleCheckAlias} className="p-1 rounded-lg bg-white border border-slate-200 flex items-center focus-within:border-[#0066FF] focus-within:ring-2 focus-within:ring-[#0066FF]/10 transition-all">
                  <div className="pl-3 pr-1 text-slate-400 font-mono text-sm hidden sm:block">
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
                    className="flex-1 bg-transparent px-2 py-2 text-sm text-[#1A1A2E] placeholder-slate-400 focus:outline-none font-semibold font-mono"
                    required
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2 rounded-md bg-[#1B2A4A] hover:bg-[#0066FF] text-white text-sm font-bold transition-colors shrink-0 cursor-pointer"
                  >
                    Check
                  </button>
                </form>

                {aliasStatus === 'available' && (
                  <div className="mt-2 p-3 rounded-lg bg-[#00875A]/5 border border-[#00875A]/20 text-[#00875A] text-sm flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span><strong>oneclickbiz.in/v/{aliasSearch.toLowerCase()}</strong> is available!</span>
                    </span>
                    <Link href={`/signup?slug=${aliasSearch.toLowerCase()}&intent=build_card`} className="underline font-bold">
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
                
                {/* Corporate Container */}
                <div className="relative rounded-xl overflow-hidden shadow-lg border border-slate-200 bg-white p-1.5 sm:p-2">
                  <img
                    src="/hero-showcase-retina.png"
                    alt="OneClickBiz Multi-Device Dashboard, WhatsApp Store, Mobile Site & Digital Cards Showcase"
                    className="w-full h-auto object-contain rounded-lg block"
                    loading="eager"
                  />
                </div>

              </div>
            </div>

          </div>

          {/* Feature Strip */}
          <div className="mt-10 sm:mt-14 max-w-6xl mx-auto relative rounded-xl bg-white border border-slate-200 shadow-sm p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2 px-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <div className="flex items-center gap-1.5 text-[#0066FF] font-extrabold">
                <span>Everything your business needs</span>
              </div>
              <span className="hidden sm:inline-block text-xs text-slate-400 font-medium normal-case">
                built in one place
              </span>
            </div>

            <div className="relative overflow-hidden py-1 rounded-lg">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-white to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-white to-transparent z-10" />

              <div className="flex overflow-hidden">
                <div className="animate-continuous-marquee flex items-center gap-3 shrink-0 py-0.5">
                  <a href="#features" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#0066FF]/30 transition-all cursor-pointer group shrink-0">
                    <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-blue-700 transition-colors">Digital card</span>
                  </a>

                  <a href="#features" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-emerald-50/60 border border-slate-200/90 shadow-sm hover:border-emerald-300 transition-all cursor-pointer group shrink-0">
                    <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">WhatsApp store</span>
                  </a>

                  <a href="#features" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-orange-50/60 border border-slate-200/90 shadow-sm hover:border-orange-300 transition-all cursor-pointer group shrink-0">
                    <div className="w-7 h-7 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-orange-700 transition-colors">Bookings</span>
                  </a>

                  <a href="#features" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-cyan-50/60 border border-slate-200/90 shadow-sm hover:border-cyan-300 transition-all cursor-pointer group shrink-0">
                    <div className="w-7 h-7 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <QrCode className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-cyan-700 transition-colors">QR access</span>
                  </a>

                  <a href="#features" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-violet-50/60 border border-slate-200/90 shadow-sm hover:border-violet-300 transition-all cursor-pointer group shrink-0">
                    <div className="w-7 h-7 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Edit3 className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-violet-700 transition-colors">Blog studio</span>
                  </a>

                  <a href="#features" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#0066FF]/30 transition-all cursor-pointer group shrink-0">
                    <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-blue-700 transition-colors">Digital card</span>
                  </a>

                  <a href="#features" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-emerald-50/60 border border-slate-200/90 shadow-sm hover:border-emerald-300 transition-all cursor-pointer group shrink-0">
                    <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">WhatsApp store</span>
                  </a>

                  <a href="#features" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-orange-50/60 border border-slate-200/90 shadow-sm hover:border-orange-300 transition-all cursor-pointer group shrink-0">
                    <div className="w-7 h-7 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-orange-700 transition-colors">Bookings</span>
                  </a>

                  <a href="#features" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-cyan-50/60 border border-slate-200/90 shadow-sm hover:border-cyan-300 transition-all cursor-pointer group shrink-0">
                    <div className="w-7 h-7 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <QrCode className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-cyan-700 transition-colors">QR access</span>
                  </a>

                  <a href="#features" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-violet-50/60 border border-slate-200/90 shadow-sm hover:border-violet-300 transition-all cursor-pointer group shrink-0">
                    <div className="w-7 h-7 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Edit3 className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-violet-700 transition-colors">Blog studio</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* High-Converting Social Proof Strip */}
          <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-[#0066FF] text-white flex items-center justify-center shrink-0">
                <Rocket className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h5 className="text-lg font-extrabold text-[#1B2A4A] leading-none">500+</h5>
                <p className="text-sm text-slate-500 mt-1">Happy Businesses</p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-[#00875A] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h5 className="text-lg font-extrabold text-[#1B2A4A] leading-none">100%</h5>
                <p className="text-sm text-slate-500 mt-1">Secure &amp; Reliable</p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-[#1B2A4A] text-white flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h5 className="text-lg font-extrabold text-[#1B2A4A] leading-none">Dedicated</h5>
                <p className="text-sm text-slate-500 mt-1">Customer Support</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* LIVE INTERACTIVE DEMO SECTION */}
      <section id="demo" className="py-20 lg:py-28 bg-[#F5F7FA] border-b border-slate-200 relative overflow-hidden scroll-mt-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="inline-block px-3 py-1 rounded-lg bg-[#0066FF]/10 text-[#0066FF] text-xs font-bold uppercase tracking-wider">
              Interactive Mini-Website Studio
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B2A4A] tracking-tight leading-tight">
              Why Every Business Needs a OneClickBiz Mini-Website
            </h2>

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Skip weeks of expensive web design and costly maintenance. Launch an interactive, high-converting digital storefront that turns casual visitors into booked clients and direct WhatsApp orders in seconds.
            </p>
          </div>

          {/* Two-Column Side-by-Side Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
            
            {/* LEFT COLUMN: The Matter - How OneClickBiz Helps & Why It's Useful */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
              
              <div className="space-y-3">
                
                {/* Point 1: Launch Fast & No Coding */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-[#0066FF] transition-all group">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
                      <Rocket className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#1B2A4A] group-hover:text-[#0066FF] transition-colors">
                        Launch in 5 Minutes — Zero Coding
                      </h4>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        Choose from 29+ industry-curated templates. Add your services, photos, pricing, and links with no web hosting, domain setups, or developers needed.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Point 2: 1-Click Save to Phonebook */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-[#0066FF] transition-all group">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
                      <Download className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#1B2A4A] group-hover:text-[#0066FF] transition-colors">
                        1-Click Contact Save to Phonebook (.VCF)
                      </h4>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        Clients save your phone, WhatsApp, email, designation, and company address directly into their mobile contacts with a single tap.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Point 3: Direct WhatsApp Store */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-[#0066FF] transition-all group">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#00875A] flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#1B2A4A] group-hover:text-[#00875A] transition-colors">
                        Direct WhatsApp Orders &amp; Inquiries
                      </h4>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        Pre-filled WhatsApp messages let clients book appointments, request quotes, or order products straight into your chat with 0 friction.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Point 4: 0% Fee Instant UPI Payments */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-[#0066FF] transition-all group">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#1B2A4A] group-hover:text-amber-600 transition-colors">
                        Direct 0% Commission UPI Payments
                      </h4>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        Receive instant payments directly to your Google Pay, PhonePe, or Paytm with zero intermediary gateway cuts or monthly fees.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Point 5: Dynamic QR & Real-Time Analytics */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-[#0066FF] transition-all group">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
                      <QrCode className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#1B2A4A] group-hover:text-[#0066FF] transition-colors">
                        Dynamic QR Studio &amp; Real-Time Analytics
                      </h4>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        Update your website anytime without re-printing QR codes. Track visitor counts, scan geography, and top-clicked links in real-time.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Buttons & Trust Strip */}
              <div className="pt-2 space-y-3.5">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <Link
                    href="/signup?intent=mini_website"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm text-center flex items-center justify-center gap-2 transition-colors active:scale-95"
                  >
                    <span>Create Your Mini-Website Free</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="#templates"
                    className="w-full sm:w-auto px-5 py-3.5 rounded-lg bg-white hover:bg-slate-50 text-[#1B2A4A] hover:text-[#0066FF] border border-slate-200 font-bold text-sm text-center transition-colors shadow-sm"
                  >
                    Browse 29+ Templates
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00875A] shrink-0" /> Free Plan Available
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00875A] shrink-0" /> No Hosting Needed
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00875A] shrink-0" /> Live in 5 Mins
                  </span>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: The Interactive Mini-Website Preview Mockup */}
            <div className="lg:col-span-7 flex flex-col space-y-3">
              
              {/* Controls Bar for Live Preview */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-white border border-slate-200 shadow-sm">
                
                {/* View Mode Switcher */}
                <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setHeroDemoMode('website')}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      heroDemoMode === 'website'
                        ? 'bg-[#0066FF] text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Mini-Website</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroDemoMode('mobile')}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      heroDemoMode === 'mobile'
                        ? 'bg-[#0066FF] text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile Card</span>
                  </button>
                </div>

                {/* Theme Switcher Chips */}
                <div className="flex items-center gap-1">
                  {(['modern-indigo', 'dark-onyx', 'glassmorphic', 'emerald-pro', 'sunset-gold'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setSelectedDemoTheme(t)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                        selectedDemoTheme === t 
                          ? 'bg-[#1B2A4A] text-white' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {t === 'modern-indigo' ? 'LIGHT' : t.split('-')[0].toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Direct Open Link */}
                <a
                  href="/v/kishore"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#1B2A4A] hover:bg-[#0066FF] text-white text-xs font-bold flex items-center gap-1 transition-colors shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Open Live</span>
                </a>
              </div>

              {/* Interactive Frame Rendering */}
              {heroDemoMode === 'website' ? (
                /* Desktop Browser Shell Frame Mockup */
                <div 
                  onMouseLeave={() => setIsDemoInteractive(false)}
                  className="w-full rounded-2xl sm:rounded-3xl bg-white border border-slate-300 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)] overflow-hidden transition-all duration-300 relative"
                >
                  {/* Browser Chrome Window Bar */}
                  <div className="bg-slate-900 px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between border-b border-slate-800">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block shrink-0" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shrink-0" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shrink-0" />
                      <div className="flex items-center gap-1 ml-1 sm:ml-2 px-2 py-0.5 rounded-md bg-slate-950 text-[10px] text-slate-300 font-mono border border-slate-800 truncate">
                        <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                        <span className="text-emerald-400 hidden xs:inline">https://</span>
                        <span className="truncate">oneclickbiz.in/v/kishore</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {isDemoInteractive ? (
                        <button
                          type="button"
                          onClick={() => setIsDemoInteractive(false)}
                          className="text-[10px] sm:text-xs font-bold text-white flex items-center gap-1 transition px-2 py-0.5 rounded-md bg-blue-600 hover:bg-blue-700 shadow-sm shrink-0 cursor-pointer"
                          title="Lock inner demo scroll to freely scroll the webpage"
                        >
                          <Lock className="w-2.5 h-2.5 text-white" />
                          <span>Lock Scroll</span>
                        </button>
                      ) : null}

                      <a
                        href="/v/kishore"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] sm:text-xs font-bold text-blue-200 hover:text-white flex items-center gap-1 transition px-2 py-0.5 rounded-md bg-blue-950/90 hover:bg-blue-900 border border-blue-700/60 shrink-0"
                      >
                        <span>Full Screen</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Inner Website Content with Scroll Hijacking Prevention */}
                  <div 
                    className={`h-[560px] xs:h-[600px] sm:h-[640px] lg:h-[680px] scrollbar-none bg-slate-50 relative ${
                      isDemoInteractive ? 'overflow-y-auto pointer-events-auto' : 'overflow-hidden pointer-events-none'
                    }`}
                    style={{ maxHeight: '680px', contain: 'paint' }}
                  >
                    <ProfileCardView profile={demoProfile} isMockup={true} initialViewMode="website" showViewToggle={false} />
                  </div>

                  {/* Click to Interact Overlay when not actively scrolling demo */}
                  {!isDemoInteractive && (
                    <div 
                      onClick={() => setIsDemoInteractive(true)}
                      className="absolute inset-x-0 bottom-0 top-[40px] z-20 flex items-end justify-center pb-5 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent cursor-pointer group"
                    >
                      <div className="px-4 py-2 rounded-full bg-slate-900/95 hover:bg-blue-600 text-white text-xs font-bold shadow-xl border border-white/20 flex items-center gap-1.5 group-hover:scale-105 transition-all backdrop-blur-md">
                        <MousePointerClick className="w-3.5 h-3.5 text-sky-400 group-hover:text-white" />
                        <span>Click to Scroll &amp; Test Live</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Mobile Phone Mockup Frame Centered in Right Column */
                <div className="flex justify-center items-center py-4">
                  <div 
                    onMouseLeave={() => setIsDemoInteractive(false)}
                    className="w-full max-w-[285px] xs:max-w-[320px] sm:max-w-[340px] rounded-[40px] sm:rounded-[44px] p-2.5 sm:p-3 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border-4 border-slate-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] relative ring-1 ring-slate-800 transition-all duration-300"
                  >
                    {/* Dynamic Island Speaker Notch */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-950 rounded-full z-30 flex items-center justify-end pr-2.5 shadow-xs border border-slate-800/80 pointer-events-none">
                      <div className="w-2 h-2 rounded-full bg-slate-800" />
                    </div>
                    <div className={`rounded-[32px] sm:rounded-[36px] overflow-hidden bg-white h-[540px] xs:h-[580px] sm:h-[620px] scrollbar-none border border-slate-200/80 shadow-inner relative ${
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
                          <span>Lock Scroll</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* VCARD TEMPLATES SHOWCASE SECTION */}
      <section id="templates" className="py-20 lg:py-28 bg-white border-b border-slate-200 relative overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="inline-block px-3 py-1 rounded-lg bg-[#0066FF]/10 text-[#0066FF] text-xs font-bold uppercase tracking-wider">
              Curated Industry Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B2A4A] tracking-tight">
              Templates Built for Every Industry
            </h2>
            <p className="text-base text-slate-600 font-normal">
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
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                  templateFilter === cat.id
                    ? 'bg-[#0066FF] text-white border-[#0066FF]'
                    : 'bg-white text-slate-700 hover:text-[#0066FF] hover:border-[#0066FF] border-slate-200 shadow-sm'
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
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-md items-center justify-center hover:bg-[#0066FF] hover:text-white hover:border-[#0066FF] transition-all cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Scroll Arrow */}
            <button
              onClick={() => scrollSlider('right')}
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-md items-center justify-center hover:bg-[#0066FF] hover:text-white hover:border-[#0066FF] transition-all cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
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
                      className="w-[180px] xs:w-[195px] sm:w-[220px] md:w-[230px] shrink-0 rounded-xl border border-slate-200 bg-white hover:border-[#0066FF] transition-all duration-200 flex flex-col justify-between overflow-hidden group/card shadow-sm hover:shadow-md hover:-translate-y-1 relative"
                    >
                      {/* Ribbon or Badge */}
                      {template.badge && (
                        <div className="absolute top-2.5 right-2.5 z-20">
                          <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wide bg-[#0066FF] text-white">
                            {template.badge}
                          </span>
                        </div>
                      )}

                      {/* Card Preview Image */}
                      <div 
                        onClick={() => window.open(`/v/${template.id}`, '_blank', 'noopener,noreferrer')}
                        className="relative h-[240px] sm:h-[265px] w-full bg-slate-900 overflow-hidden cursor-pointer group/img flex items-center justify-center"
                        title="Click to preview live mini-website"
                      >
                        <img
                          src={template.imgUrl}
                          alt={template.name}
                          className="vcard-template-img w-full h-full object-cover object-center transition-transform duration-500 group-hover/card:scale-105"
                          loading="lazy"
                        />

                        {/* Top Gradient Overlay with Title & Subtitle */}
                        <div className="absolute top-0 inset-x-0 p-3 pt-2.5 bg-gradient-to-b from-slate-950/80 via-slate-950/30 to-transparent pointer-events-none z-10">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-white truncate">
                            {template.category}
                          </h4>
                          <p className="text-[11px] text-blue-200 font-medium truncate mt-0.5">
                            {template.actionSubtitle || template.subCategory || 'Explore Portfolio'}
                          </p>
                        </div>

                        {/* Bottom Overlay */}
                        <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none flex items-end p-3 z-10">
                          <div className="flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-md bg-[#00875A] text-white flex items-center justify-center">
                              <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                            <span className="text-xs font-bold text-white">
                              Explore
                            </span>
                          </div>
                        </div>

                        {/* Hover action overlay */}
                        <div className="absolute inset-0 bg-[#1B2A4A]/80 opacity-0 group-hover/card:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3 z-20">
                          <Link
                            href={`/signup?intent=build_card&template=${template.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full py-2 px-3 rounded-lg text-center text-xs font-bold text-white bg-[#0066FF] hover:bg-[#0052CC] flex items-center justify-center gap-1 transition-colors"
                          >
                            <span>Use Template</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          <a
                            href={`/v/${template.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-full py-1.5 px-3 rounded-lg text-center text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview</span>
                          </a>
                        </div>
                      </div>

                      {/* Card Body Footer */}
                      <div className="p-3 border-t border-slate-100 bg-white space-y-2">
                        <div>
                          <h3 className="text-sm font-bold text-[#1B2A4A] group-hover/card:text-[#0066FF] transition-colors truncate">
                            {template.name}
                          </h3>
                        </div>

                        <div className="flex items-center gap-1.5 pt-0.5">
                          <Link
                            href={`/signup?intent=build_card&template=${template.id}`}
                            className="flex-1 py-1.5 px-2 rounded-lg text-center text-xs font-bold text-white bg-[#0066FF] hover:bg-[#0052CC] transition-colors"
                          >
                            Use Free
                          </Link>
                          <a
                            href={`/v/${template.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-1.5 px-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1 cursor-pointer shrink-0"
                            title="Preview live mini-website"
                          >
                            <Eye className="w-3.5 h-3.5 text-slate-500" />
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
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-white bg-[#0066FF] hover:bg-[#0052CC] font-bold text-sm tracking-wide transition-colors"
            >
              <span>See More Templates ({VCARD_TEMPLATES_CATALOG.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-28 bg-[#F5F7FA] border-b border-slate-200 relative scroll-mt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="inline-block px-3 py-1 rounded-lg bg-[#0066FF]/10 text-[#0066FF] text-xs font-bold uppercase tracking-wider">
              Simple &amp; Transparent Pricing
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B2A4A] tracking-tight">
              Choose Your Perfect Plan
            </h3>
            <p className="text-sm font-medium text-slate-600">
              No Hidden Charges &nbsp;|&nbsp; One Time Payment &nbsp;|&nbsp; Annual Plan
            </p>
          </div>

        {/* Highlight Banner: Edit Details N Number of Times */}
        <div className="mb-8 max-w-3xl mx-auto p-5 rounded-xl bg-white border border-slate-200 shadow-sm text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#00875A]/10 text-[#00875A] font-bold text-xs uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            100% Free Unlimited Updates
          </div>
          <h4 className="text-base sm:text-lg font-bold text-[#1B2A4A]">
            Edit Your Details N Number of Times — ZERO Extra Fees
          </h4>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl mx-auto leading-relaxed">
            Update your phone, WhatsApp, email, social links, photos, services, pricing, or templates whenever your business evolves. You never need an extra recharge or special plan to make changes.
          </p>
        </div>

        {/* Free Tier Callout */}
        <div className="mb-10 max-w-4xl mx-auto p-5 sm:p-6 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-lg bg-[#00875A]/10 text-[#00875A] flex items-center justify-center shrink-0">
              <BadgeCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-[#1B2A4A]">Try 100% Free First</span>
                <span className="px-2 py-0.5 rounded-md bg-[#00875A]/10 text-[#00875A] text-xs font-bold">₹0 Upfront</span>
              </div>
              <p className="text-sm text-slate-600 mt-0.5">Create, customize, and test your live card on your phone before spending a single rupee. No credit card required.</p>
            </div>
          </div>
          <Link href="/signup?intent=build_card" className="px-6 py-2.5 rounded-lg bg-[#00875A] hover:bg-[#007048] text-white text-sm font-bold shrink-0 transition-colors active:scale-95">
            Start Free Card
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          
          {/* Plan 1: Basic */}
          <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Solo Professionals</span>
                <h4 className="text-2xl font-bold text-[#1B2A4A]">Basic</h4>
              </div>
              <p className="text-sm text-slate-600">Essential digital smart card for individual practitioners and consultants.</p>
              <div className="flex items-baseline gap-1 py-2 border-y border-slate-100">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#1B2A4A]">₹{pricing.basicPrice.toLocaleString()}/-</span>
                <span className="text-sm text-slate-500 font-semibold ml-1">Per Year</span>
              </div>
              <ul className="space-y-2.5 pt-2 text-sm text-slate-600">
                <li className="flex items-center gap-2 text-[#00875A] font-semibold"><Check className="w-4 h-4 text-[#00875A] shrink-0" /> <span>Unlimited 24x7 Card Edits</span></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0066FF] shrink-0" /> <strong>1 Digital Card (/v/your-name)</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0066FF] shrink-0" /> 1-Click .VCF Contact Downloader</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0066FF] shrink-0" /> Dynamic Cloud QR Code (Editable)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0066FF] shrink-0" /> Social Links &amp; Portfolio Showcase</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0066FF] shrink-0" /> Inbound Lead Inquiry Capture Form</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0066FF] shrink-0" /> Standard Visitor Analytics</li>
              </ul>
            </div>
            <Link href="/signup?plan=Basic&intent=select_plan" className="w-full py-3 rounded-lg bg-[#1B2A4A] hover:bg-[#0066FF] text-white font-bold text-sm text-center transition-colors">
              Select Basic Plan (₹{pricing.basicPrice.toLocaleString()})
            </Link>
          </div>

          {/* Plan 2: Pro (Most Popular) */}
          <div className="p-6 sm:p-8 rounded-xl bg-white border-2 border-[#0066FF] flex flex-col justify-between space-y-6 relative shadow-md">
            <div className="absolute top-0 right-0 px-3.5 py-1 rounded-bl-lg bg-[#0066FF] text-white font-bold text-xs tracking-wider uppercase">
              Most Popular
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF]">Multi-service &amp; Agencies</span>
                <h4 className="text-2xl font-bold text-[#1B2A4A]">Pro</h4>
              </div>
              <p className="text-sm text-slate-600">Complete suite for multi-service professionals, agencies, and growing businesses.</p>
              <div className="flex items-baseline gap-1 py-2 border-y border-slate-100">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#0066FF]">₹{pricing.proPrice.toLocaleString()}/-</span>
                <span className="text-sm text-slate-500 font-semibold ml-1">Per Year</span>
              </div>
              <ul className="space-y-2.5 pt-2 text-sm text-slate-700">
                <li className="flex items-center gap-2 text-[#00875A] font-bold"><Check className="w-4 h-4 text-[#00875A] shrink-0" /> <span>Unlimited 24x7 Card Edits</span></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0066FF] shrink-0" /> <strong>Up to 3 Digital Cards</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0066FF] shrink-0" /> <strong>1 Custom Domain CNAME (White-Label)</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0066FF] shrink-0" /> <strong>Unlimited WhatsApp Store Catalog</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0066FF] shrink-0" /> <strong>Appointment &amp; Slot Booking Engine</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0066FF] shrink-0" /> <strong>PDF Data Reporting &amp; Exporting Suite</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0066FF] shrink-0" /> Leads CRM Pipeline Inbox with Exports</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0066FF] shrink-0" /> Priority WhatsApp &amp; Email Support</li>
              </ul>
            </div>
            <Link href="/signup?plan=Pro&intent=select_plan" className="w-full py-3 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm text-center transition-colors shadow-sm active:scale-95">
              Get Started with Pro (₹{pricing.proPrice.toLocaleString()})
            </Link>
          </div>

          {/* Plan 3: Advance */}
          <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Enterprises &amp; Executives</span>
                <h4 className="text-2xl font-bold text-[#1B2A4A]">Advance</h4>
              </div>
              <p className="text-sm text-slate-600">For growing businesses and executives with multiple companies or team staff.</p>
              <div className="flex items-baseline gap-1 py-2 border-y border-slate-100">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#1B2A4A]">₹{pricing.advancedPrice.toLocaleString()}/-</span>
                <span className="text-sm text-slate-500 font-semibold ml-1">Per Year</span>
              </div>
              <ul className="space-y-2.5 pt-2 text-sm text-slate-600">
                <li className="flex items-center gap-2 text-[#00875A] font-semibold"><Check className="w-4 h-4 text-[#00875A] shrink-0" /> <span>Unlimited 24x7 Card Edits</span></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0066FF] shrink-0" /> <strong>Up to 5 Digital Cards &amp; Team Profiles</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0066FF] shrink-0" /> <strong>5 White-Label Custom Domains</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0066FF] shrink-0" /> <strong>Unlimited 4K Video Uploads &amp; CDN</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0066FF] shrink-0" /> Blog Studio &amp; Unlimited Article Publishing</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0066FF] shrink-0" /> 50+ Portfolio Case Studies with Zoom</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0066FF] shrink-0" /> Dedicated Account Manager &amp; VIP SLA</li>
              </ul>
            </div>
            <Link href="/signup?plan=Advanced&intent=select_plan" className="w-full py-3 rounded-lg bg-[#1B2A4A] hover:bg-[#0066FF] text-white font-bold text-sm text-center transition-colors">
              Choose Advance Plan (₹{pricing.advancedPrice.toLocaleString()})
            </Link>
          </div>

        </div>

        {/* 7-Day Money Back Guarantee Strip */}
        <div className="mt-10 max-w-3xl mx-auto p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#00875A]/10 text-[#00875A] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1B2A4A]">100% Risk-Free Guarantee</p>
              <p className="text-xs text-slate-600">Try any paid plan for 7 days. If you aren&apos;t completely delighted, WhatsApp or email us for an instant, no-questions-asked refund.</p>
            </div>
          </div>
          <Link href="/refund" className="text-xs font-bold text-[#0066FF] hover:underline shrink-0 flex items-center gap-1">
            <span>Refund Terms</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        </div>
      </section>

      {/* Head-to-Head Comparison & Differentiation Section */}
      <section id="about" className="py-20 lg:py-28 bg-[#1B2A4A] border-y border-slate-700 relative overflow-hidden text-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="inline-block px-3 py-1 rounded-lg bg-white/10 text-white text-xs font-bold uppercase tracking-wider">
              Built Different For Indian Commerce
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Why OneClickBiz vs. Generic Digital Cards
            </h2>
            <p className="text-base text-slate-300 leading-relaxed font-normal">
              Most digital cards are just a flat list of web links. OneClickBiz combines 1-click address book downloads with native WhatsApp micro-stores, direct UPI payments, and high-resolution corporate print studios.
            </p>
          </div>

          {/* Mobile Swipe Notice */}
          <div className="flex items-center justify-center gap-1.5 mb-3 sm:hidden text-xs font-semibold text-blue-200 bg-white/10 px-3.5 py-1.5 rounded-lg border border-white/10 w-fit mx-auto">
            <span>👈 Swipe horizontally to view full comparison 👉</span>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto pb-4 -mx-2 px-2 sm:mx-0 sm:px-0 scrollbar-none">
            <div className="min-w-[720px] xs:min-w-[760px] rounded-xl bg-[#142238] border border-white/10 shadow-lg overflow-hidden">
              <div className="grid grid-cols-12 bg-[#0E1726] border-b border-white/10 text-xs font-bold text-slate-300">
                <div className="col-span-4 p-5 text-slate-400 uppercase tracking-wider text-xs">
                  Capability / Feature
                </div>
                <div className="col-span-2.5 p-5 text-center text-slate-400">
                  Generic Link-in-Bio
                  <span className="block text-[11px] font-normal text-slate-500 mt-0.5">(Linktree, Carrd)</span>
                </div>
                <div className="col-span-2.5 p-5 text-center text-slate-400">
                  Traditional Digital Cards
                  <span className="block text-[11px] font-normal text-slate-500 mt-0.5">(Popl, Blinq, HiHello)</span>
                </div>
                <div className="col-span-3 p-5 text-center bg-[#0066FF] text-white rounded-t-lg shadow-md border-t border-x border-[#0066FF]">
                  <div className="inline-flex items-center gap-1.5 font-bold text-sm">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>OneClickBiz</span>
                  </div>
                  <span className="block text-[11px] font-medium text-blue-100 mt-0.5">Engineered for Indian Commerce</span>
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
          <div className="mt-12 p-6 sm:p-8 rounded-xl bg-white/5 border border-white/10 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="px-2.5 py-0.5 rounded-md bg-[#00875A]/20 text-[#00875A] text-xs font-bold border border-[#00875A]/30">
                COST CONSOLIDATION
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Replace 4 Disjointed Subscriptions with 1 Smart Identity
              </h3>
              <p className="text-sm text-slate-300 max-w-xl">
                Save ₹25,000+/year by replacing Linktree (₹5,000/yr), Calendly (₹12,000/yr), Shopify Lite (₹8,000/yr), and PDF tools with OneClickBiz.
              </p>
            </div>
            <Link
              href="/signup?intent=build_card"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm shrink-0 transition-colors active:scale-95 flex items-center justify-center gap-2 text-center"
            >
              <span>Build Your Smart Card Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Authentic Transparency & Risk-Free Guarantees Section */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="inline-block px-3 py-1 rounded-lg bg-[#00875A]/10 text-[#00875A] text-xs font-bold uppercase tracking-wider">
              Honest Business Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B2A4A] tracking-tight">
              Transparent Company. Zero Financial Risk.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              We know trust is earned. You never need to pay upfront deposits or take risks on unverified claims. Experience the full platform risk-free before spending a single rupee.
            </p>
          </div>

          {/* 4 Core Trust Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            
            {/* Pillar 1: ₹0 Upfront */}
            <div className="p-6 rounded-xl bg-[#F5F7FA] border border-slate-200 shadow-sm hover:border-[#0066FF] transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-lg bg-[#00875A]/10 text-[#00875A] flex items-center justify-center font-bold text-lg">
                  ₹0
                </div>
                <h3 className="text-base font-bold text-[#1B2A4A]">Try 100% Free First</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Build your card, customize colors, upload your products, and live-preview it on your phone for free. No credit card or upfront deposit required.
                </p>
              </div>
              <Link href="/signup?intent=build_card" className="text-sm font-bold text-[#00875A] hover:underline flex items-center gap-1.5 pt-2">
                <span>Start Free Card</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 2: 7-Day Money Back */}
            <div className="p-6 rounded-xl bg-[#F5F7FA] border border-slate-200 shadow-sm hover:border-[#0066FF] transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-lg bg-[#0066FF]/10 text-[#0066FF] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#1B2A4A]">7-Day Money-Back Guarantee</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  If you choose to upgrade to Pro and are not 100% satisfied with the results, simply ping us within 7 days for an instant, full refund. Zero hassle.
                </p>
              </div>
              <Link href="/refund" className="text-sm font-bold text-[#0066FF] hover:underline flex items-center gap-1.5 pt-2">
                <span>Read Refund Policy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 3: 100% Data Ownership & Privacy */}
            <div className="p-6 rounded-xl bg-[#F5F7FA] border border-slate-200 shadow-sm hover:border-[#0066FF] transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#1B2A4A]">100% Data Ownership</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  You own all captured leads, appointments, and contact lists. We never sell or broker your data to advertisers. Export to CSV anytime with 1 click.
                </p>
              </div>
              <Link href="/privacy" className="text-sm font-bold text-teal-700 hover:underline flex items-center gap-1.5 pt-2">
                <span>Read Privacy Terms</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 4: Corporate Transparency & Support */}
            <div className="p-6 rounded-xl bg-[#F5F7FA] border border-slate-200 shadow-sm hover:border-[#0066FF] transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-lg bg-[#1B2A4A]/10 text-[#1B2A4A] flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#1B2A4A]">Registered Corporate Entity</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Engineered &amp; operated by <strong>Merlinflow Technologies Pvt. Ltd.</strong>, headquartered in Hyderabad, India. Direct human WhatsApp &amp; phone support.
                </p>
              </div>
              <a 
                href="https://wa.me/916304989071?text=Hi%20OneClickBiz%20Team%2C%20I%20have%20a%20question%20before%20signing%20up." 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-bold text-[#0066FF] hover:underline flex items-center gap-1.5 pt-2"
              >
                <span>Chat With Our Team</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Zero Vendor Lock-In & Physical Print Longevity Guarantee Banner */}
          <div className="p-6 sm:p-8 rounded-xl bg-[#F5F7FA] border border-slate-200 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span>Physical Print &amp; QR Longevity Protection</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1B2A4A] tracking-tight">
                  Printing 1,000+ Physical Cards? You Are 100% Protected From Lock-In.
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Never worry about wasted printing costs or broken links. With <strong>White-Label Custom Domains (e.g., cards.yourbrand.com)</strong>, the QR code printed on your physical cards and marketing materials points to <strong>your own company domain</strong>—you own the URL forever. Even if you migrate platforms in 10 years, your printed cards never expire.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                  <div className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-1">
                    <p className="text-sm font-bold text-[#1B2A4A] flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#00875A]" /> Custom CNAME Domains
                    </p>
                    <p className="text-xs text-slate-500">Your brand, your URL. Zero platform lock-in.</p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-1">
                    <p className="text-sm font-bold text-[#1B2A4A] flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#00875A]" /> Dynamic Cloud Redirects
                    </p>
                    <p className="text-xs text-slate-500">Update the destination anytime with 0 reprints.</p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-1">
                    <p className="text-sm font-bold text-[#1B2A4A] flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#00875A]" /> 1-Click Data Portability
                    </p>
                    <p className="text-xs text-slate-500">Export leads, products &amp; contacts to CSV anytime.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 shrink-0">
                <Link
                  href="/terms"
                  className="px-5 py-2.5 rounded-lg bg-[#1B2A4A] hover:bg-[#0066FF] text-white font-bold text-sm text-center transition-colors"
                >
                  Read Longevity Terms
                </Link>
                <Link
                  href="/signup?plan=Pro&intent=custom_domain"
                  className="px-5 py-2.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-[#1B2A4A] font-bold text-sm text-center transition-colors"
                >
                  Pair Custom Domain
                </Link>
              </div>
            </div>
          </div>


        </div>
      </section>



      {/* FAQ Accordion */}
      <section id="faq" className="py-20 lg:py-28 bg-[#F5F7FA] border-t border-slate-200 scroll-mt-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <span className="inline-block px-3 py-1 rounded-lg bg-[#0066FF]/10 text-[#0066FF] text-xs font-bold uppercase tracking-wider">
              FAQ
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-[#1B2A4A]">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm cursor-pointer transition-all hover:border-[#0066FF]"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-semibold text-[#1B2A4A]">{faq.q}</h4>
                  <span className="text-[#0066FF] font-bold text-lg ml-3">
                    {openFaq === idx ? '−' : '+'}
                  </span>
                </div>
                {openFaq === idx && (
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 pt-3 border-t border-slate-100">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section id="contact" className="py-20 lg:py-28 bg-white border-t border-slate-200 relative overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="inline-block px-3 py-1 rounded-lg bg-[#0066FF]/10 text-[#0066FF] text-xs font-bold uppercase tracking-wider">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1B2A4A] tracking-tight">
              Connect With Our Support &amp; Engineering Team
            </h2>
            <p className="text-base text-slate-600">
              Have questions about smart profiles, custom onboarding, or need enterprise assistance? We are here to help 24/7.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Col: Contact Information Cards */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Contact Person & WhatsApp Card */}
              <div className="p-5 rounded-xl bg-[#F5F7FA] border border-slate-200 hover:border-[#00875A] shadow-sm transition-all flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#00875A]/10 text-[#00875A] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="space-y-1 flex-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#00875A]">Primary Contact</span>
                  <h3 className="text-base font-bold text-[#1B2A4A]">Adduri Sai Kishore</h3>
                  <p className="text-sm text-slate-600">Direct WhatsApp &amp; Mobile Support for smart business card inquiries.</p>
                  <a 
                    href="https://wa.me/916304989071?text=Hi%20Adduri%20Sai%20Kishore%2C%20I%20have%20an%20inquiry%20regarding%20OneClickBiz%20smart%20business%20cards." 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00875A] hover:underline pt-1 transition-colors"
                  >
                    <span>+91 63049 89071</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-5 rounded-xl bg-[#F5F7FA] border border-slate-200 hover:border-[#0066FF] shadow-sm transition-all flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#0066FF]/10 text-[#0066FF] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-base font-bold text-[#1B2A4A]">Email Support Desk</h3>
                  <p className="text-sm text-slate-600">Response guaranteed within 2-4 business hours.</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-1">
                    <a 
                      href="mailto:support@oneclickbiz.in" 
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0066FF] hover:underline transition-colors"
                    >
                      <span>support@oneclickbiz.in</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                    <a 
                      href="mailto:contact@oneclickbiz.in" 
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0066FF] hover:underline transition-colors"
                    >
                      <span>contact@oneclickbiz.in</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Office Location Card */}
              <div className="p-5 rounded-xl bg-[#F5F7FA] border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#1B2A4A]">Office Location</h3>
                  <p className="text-sm text-slate-600 font-medium">
                    Nagole, Hyderabad, Telangana, India
                  </p>
                </div>
              </div>

            </div>

            {/* Right Col: Interactive Inquiry Form */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-sm relative">
              <div className="space-y-2 mb-6">
                <h3 className="text-xl font-bold text-[#1B2A4A]">Send Us a Direct Message</h3>
                <p className="text-sm text-slate-600">
                  Fill in your details below and our team will reach out with solutions tailored to your business.
                </p>
              </div>

              {contactSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#00875A] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#1B2A4A]">Message Received Successfully!</h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you for reaching out. A representative from our Hyderabad engineering &amp; support team will contact you shortly.
                  </p>
                  <button 
                    onClick={() => setContactSubmitted(false)}
                    className="mt-3 px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-[#1B2A4A]">Your Full Name *</label>
                      <input 
                        type="text" 
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="e.g. Kishore Patel"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-[#1A1A2E] placeholder-slate-400 text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-[#1B2A4A]">Official Work Email *</label>
                      <input 
                        type="email" 
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="kishore@himastech.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-[#1A1A2E] placeholder-slate-400 text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-[#1B2A4A]">Mobile / WhatsApp Number *</label>
                      <input 
                        type="tel" 
                        required
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="+91 63049 89071"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-[#1A1A2E] placeholder-slate-400 text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-[#1B2A4A]">Inquiry Topic</label>
                      <select 
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-[#1A1A2E] text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-colors"
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
                    <label className="text-sm font-semibold text-[#1B2A4A]">How Can We Help You? *</label>
                    <textarea 
                      rows={4}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Tell us about your business goals or any questions you have..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-[#1A1A2E] placeholder-slate-400 text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-colors resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmittingContact}
                    className="w-full py-3 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmittingContact ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
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

      {/* Sticky Mobile Bottom Navigation Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 py-2 px-3 shadow-md flex items-center justify-around">
        <Link href="/" className="flex flex-col items-center gap-0.5 text-[#0066FF] font-bold">
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </Link>
        <a href="#features" className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-[#0066FF] font-medium transition-colors">
          <Grid className="w-5 h-5" />
          <span className="text-[10px]">Features</span>
        </a>
        <a href="#pricing" className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-[#0066FF] font-medium transition-colors">
          <Tag className="w-5 h-5" />
          <span className="text-[10px]">Pricing</span>
        </a>
        <a href="#about" className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-[#0066FF] font-medium transition-colors">
          <Users className="w-5 h-5" />
          <span className="text-[10px]">About Us</span>
        </a>
        <a href="#contact" className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-[#0066FF] font-medium transition-colors">
          <Phone className="w-5 h-5" />
          <span className="text-[10px]">Contact</span>
        </a>
      </div>

      <Footer />
    </div>
  );
}
