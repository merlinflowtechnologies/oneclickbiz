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
  Briefcase,
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
  Wifi,
  RefreshCw,
  X,
  Lock,
  Quote,
  Lightbulb,
  Building2,
  Store,
  FileText,
  Edit3,
  Image as ImageIcon
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
      accentGradient: 'from-indigo-500 via-purple-500 to-pink-500',
      textColor: 'text-indigo-400',
      btnPrimary: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-500/25',
      btnSecondary: 'bg-slate-800 text-slate-200 border-slate-700',
      dotColor: 'bg-indigo-400',
      borderHover: 'group-hover:border-indigo-500/50'
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

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
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

      {/* Hero Section with Vibrant Light Ambient Aurora Mesh */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden bg-gradient-to-b from-indigo-100/95 via-purple-100/70 to-sky-100/90 border-b border-indigo-200/80">
        
        {/* Multi-layered Vibrant Ambient Pastel Glows */}
        <div className="absolute top-5 left-1/4 w-[750px] h-[500px] bg-gradient-to-tr from-indigo-400/45 via-purple-400/40 to-pink-400/35 blur-[130px] -z-10 pointer-events-none" />
        <div className="absolute top-1/3 right-5 w-[650px] h-[450px] bg-gradient-to-br from-sky-400/40 via-cyan-300/40 to-emerald-300/35 blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute -bottom-10 left-1/3 w-[600px] h-[400px] bg-gradient-to-r from-pink-400/35 to-amber-300/40 blur-[110px] -z-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-indigo-50/90 border border-indigo-200/80 text-indigo-700 text-xs font-bold uppercase tracking-wider shadow-xs backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                <span>Connect &bull; Build &bull; Share</span>
              </div>

              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-6xl 2xl:text-7xl font-bold font-serif tracking-tight text-slate-900 leading-[1.18] lg:leading-[1.15]">
                Your Complete <span className="italic font-serif bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Business Identity</span> In One Click.
              </h1>

              <p className="text-sm sm:text-base lg:text-base xl:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal mx-auto lg:mx-0">
                Replace outdated paper business cards with turnkey mini-websites, smart digital visiting cards, 1-click WhatsApp stores, and appointment booking calendars.
              </p>

              {/* Live URL Alias Claimer */}
              <div className="max-w-md mx-auto lg:mx-0">
                <form onSubmit={handleCheckAlias} className="p-1.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-300/80 shadow-xl shadow-slate-200/60 flex items-center focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                  <div className="pl-3 pr-1 text-slate-500 font-mono text-xs hidden sm:block font-medium">
                    oneclickbiz.in/v/
                  </div>
                  <input 
                    type="text" 
                    placeholder="your-name"
                    value={aliasSearch}
                    onChange={e => {
                      setAliasSearch(e.target.value);
                      setAliasStatus('idle');
                    }}
                    className="flex-1 bg-transparent px-2 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none font-semibold"
                    required
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white text-xs font-bold transition-all shadow-md shadow-indigo-500/20 shrink-0 hover:scale-[1.02] active:scale-95 cursor-pointer"
                  >
                    Check Handle
                  </button>
                </form>

                {aliasStatus === 'available' && (
                  <div className="mt-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center justify-between animate-in fade-in shadow-xs">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <strong>oneclickbiz.in/v/{aliasSearch.toLowerCase()}</strong> is available!
                    </span>
                    <Link href={`/signup?slug=${aliasSearch.toLowerCase()}&intent=build_card`} className="underline font-bold text-emerald-900 hover:text-emerald-950">
                      Claim Now →
                    </Link>
                  </div>
                )}
                {aliasStatus === 'taken' && (
                  <p className="mt-2 text-xs text-rose-600 font-medium">
                    This alias is reserved or taken. Please try another one!
                  </p>
                )}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2">

                <a 
                  href="#demo"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/90 hover:bg-slate-50 text-slate-800 border border-slate-300/80 font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow"
                >
                  <span>Explore Live Card Demo ↓</span>
                </a>
              </div>

              {/* Social Proof Badges */}
              <div className="pt-2 sm:pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold shadow-xs">
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Unlimited Real-Time Edits (Edit N Times)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium">1-Click Contact Save</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium">WhatsApp Orders</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium">No App Required</span>
                </div>
              </div>

            </div>

            {/* Right Hero Content: Point-by-Point Services We Offer */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center w-full mt-8 lg:mt-0">
              <div className="p-5 sm:p-6 lg:p-7 rounded-3xl bg-white/95 backdrop-blur-xl border border-indigo-200/80 shadow-2xl shadow-indigo-500/10 space-y-4 relative overflow-hidden">
                
                {/* Subtle Decorative Ambient Glow */}
                <div className="absolute -top-16 -right-16 w-52 h-52 bg-gradient-to-br from-emerald-500/15 via-indigo-500/15 to-purple-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Section Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold uppercase tracking-wider mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Services We Offer</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 tracking-tight">
                      Create your business website
                    </h3>
                  </div>
                  <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-bold shrink-0">
                    6-in-1 Platform
                  </span>
                </div>

                {/* Point-by-Point Service List */}
                <div className="space-y-2 sm:space-y-2.5">
                  
                  {/* Point 1: Mini Websites & Business Profiles */}
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50/90 hover:bg-emerald-50/40 border border-slate-200/80 hover:border-emerald-300 transition-all flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/25 group-hover:scale-105 transition-transform">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          Mini Websites &amp; Business Profiles
                        </h4>
                        <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md shrink-0">
                          93+ Templates
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        Turnkey websites across 13 business niches with custom domain support
                      </p>
                    </div>
                  </div>

                  {/* Point 2: Digital Visiting Cards */}
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50/90 hover:bg-emerald-50/40 border border-slate-200/80 hover:border-emerald-300 transition-all flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/25 group-hover:scale-105 transition-transform">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          Digital Visiting Cards
                        </h4>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md shrink-0">
                          1-Click Save
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        Instant dynamic QR, custom link &amp; 1-click address book save (.vcf)
                      </p>
                    </div>
                  </div>

                  {/* Point 3: WhatsApp Store & E-commerce */}
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50/90 hover:bg-emerald-50/40 border border-slate-200/80 hover:border-emerald-300 transition-all flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/25 group-hover:scale-105 transition-transform">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          WhatsApp Store &amp; E-commerce
                        </h4>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md shrink-0">
                          0% Fee
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        Interactive catalog, live shopping cart &amp; 1-tap WhatsApp direct checkout
                      </p>
                    </div>
                  </div>

                  {/* Point 4: Showcase Products & Services */}
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50/90 hover:bg-emerald-50/40 border border-slate-200/80 hover:border-emerald-300 transition-all flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/25 group-hover:scale-105 transition-transform">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          Showcase Products &amp; Services
                        </h4>
                        <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-md shrink-0">
                          Rich Media
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        High-res photo lookbooks, menus, pricing cards &amp; portfolio reels
                      </p>
                    </div>
                  </div>

                  {/* Point 5: QR Codes & Landing Pages */}
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50/90 hover:bg-emerald-50/40 border border-slate-200/80 hover:border-emerald-300 transition-all flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/25 group-hover:scale-105 transition-transform">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          QR Codes &amp; Landing Pages
                        </h4>
                        <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md shrink-0">
                          Instant Load
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        Permanent dynamic QR codes, fast-loading SEO pages &amp; lead capture
                      </p>
                    </div>
                  </div>

                  {/* Point 6: Promote Your Business with One Smart Link */}
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50/90 hover:bg-emerald-50/40 border border-slate-200/80 hover:border-emerald-300 transition-all flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/25 group-hover:scale-105 transition-transform">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          Promote Your Business with One Smart Link
                        </h4>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md shrink-0">
                          One Smart Link
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        <code className="text-indigo-600 bg-indigo-50 px-1 rounded font-semibold break-all">oneclickbiz.in/v/your-name</code> — share across Instagram bio, WhatsApp &amp; ads
                      </p>
                    </div>
                  </div>

                </div>

                {/* Footer Navigation within Services Panel */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <a href="#demo" className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors">
                    <span>Try Interactive Demo Below</span>
                    <ArrowRight className="w-3.5 h-3.5 animate-bounce" />
                  </a>
                  <a href="#services" className="text-slate-500 hover:text-slate-800 font-medium transition-colors">
                    View Full Services Suite →
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* LIVE INTERACTIVE DEMO SECTION (Shifted Below Hero Section) */}
      <section id="demo" className="py-20 lg:py-24 bg-gradient-to-b from-sky-50/95 via-white to-indigo-50/70 border-b border-indigo-200/80 relative overflow-hidden scroll-mt-20">
        
        {/* Soft Ambient Background Highlights */}
        <div className="absolute top-10 left-1/4 w-[650px] h-[380px] bg-indigo-300/25 blur-[130px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-1/4 w-[550px] h-[320px] bg-purple-300/20 blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50/90 border border-indigo-200/80 text-indigo-700 text-xs font-bold uppercase tracking-wider shadow-xs backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
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
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25'
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
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25'
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
            <div className="w-full max-w-4xl xl:max-w-5xl mx-auto rounded-2xl sm:rounded-3xl bg-white border border-slate-300 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.25)] overflow-hidden transition-all duration-300">
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
                <a
                  href="/v/kishore"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] sm:text-xs font-bold text-indigo-300 hover:text-white flex items-center gap-1 sm:gap-1.5 transition px-2.5 sm:px-3 py-1 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700/50 shrink-0 ml-1.5"
                >
                  <span className="hidden xs:inline">Full Screen View</span>
                  <span className="xs:hidden">Full Screen</span>
                  <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </a>
              </div>
              {/* Inner Scrollable Website Content */}
              <div className="h-[600px] xs:h-[660px] sm:h-[720px] lg:h-[780px] overflow-y-auto scrollbar-none bg-slate-50 relative">
                <ProfileCardView profile={demoProfile} isMockup={true} initialViewMode="website" showViewToggle={false} />
                {/* Floating Bottom Scroll Hint for Mobile Users */}
                <div className="sticky bottom-2 inset-x-0 flex justify-center pointer-events-none pb-1 sm:hidden z-30">
                  <div className="px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-bold shadow-lg border border-white/20 flex items-center gap-1.5 animate-pulse">
                    <span>Scroll inside window to explore projects ↓</span>
                  </div>
                </div>
              </div>
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
              <div className="w-full max-w-[285px] xs:max-w-[320px] sm:max-w-[360px] rounded-[40px] sm:rounded-[48px] p-2.5 sm:p-3 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border-4 border-slate-700/80 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.35)] relative ring-1 ring-slate-800 transition-all duration-300">
                {/* Dynamic Island Speaker Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-950 rounded-full z-30 flex items-center justify-end pr-2.5 shadow-xs border border-slate-800/80 pointer-events-none">
                  <div className="w-2 h-2 rounded-full bg-slate-800" />
                </div>
                <div className="rounded-[32px] sm:rounded-[38px] overflow-hidden bg-white h-[580px] xs:h-[620px] sm:h-[660px] overflow-y-auto scrollbar-none border border-slate-200/80 shadow-inner">
                  <ProfileCardView profile={demoProfile} isMockup={true} initialViewMode="mobile" showViewToggle={false} />
                </div>
              </div>

              {/* Right Companion Highlights */}
              <div className="hidden lg:flex flex-col gap-4 w-72">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-md space-y-1">
                  <div className="flex items-center gap-2 text-purple-600 font-bold text-xs uppercase">
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
                  <div className="flex items-center gap-2 text-pink-600 font-bold text-xs uppercase">
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
              <span>Browse 93+ Live Templates ↓</span>
            </a>
          </div>

        </div>
      </section>

      {/* VCARD TEMPLATES SHOWCASE SECTION with Ambient Lavender-Sky Tint */}
      <section id="templates" className="py-20 bg-gradient-to-b from-sky-100/90 via-indigo-100/80 to-purple-100/90 backdrop-blur-xl border-b border-indigo-200/80 relative overflow-hidden scroll-mt-20">
        {/* Colorful Glow Background Accents */}
        <div className="absolute top-1/2 left-1/4 w-[700px] h-[400px] bg-gradient-to-r from-sky-400/35 via-indigo-400/40 to-purple-400/35 blur-[130px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-[600px] h-[350px] bg-gradient-to-l from-pink-400/35 to-purple-400/30 blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
              Business Templates
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Select from {VCARD_TEMPLATES_CATALOG.length}+ professional digital business cards engineered across 13 major industries for rapid networking, instant 1-click contact downloads, and integrated WhatsApp orders.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {[
              { id: 'all', label: `All (${VCARD_TEMPLATES_CATALOG.length})`, icon: '✨' },
              { id: 'Real Estate', label: 'Real Estate', icon: '🏠' },
              { id: 'Fashion & Clothing', label: 'Fashion', icon: '👗' },
              { id: 'Beauty & Personal Care', label: 'Beauty', icon: '💄' },
              { id: 'Food Business', label: 'Food', icon: '🍽️' },
              { id: 'Healthcare', label: 'Healthcare', icon: '🏥' },
              { id: 'Education', label: 'Education', icon: '🎓' },
              { id: 'Home & Professional Services', label: 'Home Services', icon: '🛠️' },
              { id: 'Automobile', label: 'Automobile', icon: '🚗' },
              { id: 'Events & Creative', label: 'Events', icon: '📸' },
              { id: 'Professional Services', label: 'Professional', icon: '💼' },
              { id: 'Retail & Local Shops', label: 'Retail', icon: '🛍️' },
              { id: 'Travel & Hospitality', label: 'Travel', icon: '✈️' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setTemplateFilter(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs backdrop-blur-md ${
                  templateFilter === cat.id
                    ? 'bg-gradient-to-r from-indigo-600 to-pink-600 text-white shadow-md shadow-indigo-500/30 scale-105'
                    : 'bg-white/80 text-slate-700 hover:text-indigo-600 hover:bg-white border border-slate-200/80 shadow-xs'
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
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 border border-slate-200/80 text-slate-700 shadow-xl items-center justify-center hover:bg-indigo-600 hover:text-white transition-all hover:scale-110 active:scale-95 backdrop-blur-md"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Scroll Arrow */}
            <button
              onClick={() => scrollSlider('right')}
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 border border-slate-200/80 text-slate-700 shadow-xl items-center justify-center hover:bg-indigo-600 hover:text-white transition-all hover:scale-110 active:scale-95 backdrop-blur-md"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Scrollable Templates Track */}
            <div
              ref={sliderRef}
              className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto scrollbar-none scroll-smooth py-4 px-2 select-none"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {VCARD_TEMPLATES_CATALOG
                .filter((t) => templateFilter === 'all' || t.category === templateFilter)
                .map((template) => {
                  return (
                    <div
                      key={template.id}
                      style={{ scrollSnapAlign: 'start' }}
                      className="w-[180px] xs:w-[195px] sm:w-[220px] md:w-[230px] shrink-0 rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white/95 backdrop-blur-xl hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group/card shadow-[0_6px_25px_rgb(0,0,0,0.06)] hover:shadow-[0_15px_35px_rgb(0,0,0,0.12)] hover:-translate-y-1 relative"
                    >
                      {/* Ribbon or Badge */}
                      {template.badge && (
                        <div className="absolute top-2.5 right-2.5 z-20">
                          <span className="px-2 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-wide bg-gradient-to-r from-indigo-600 to-pink-500 text-white shadow-md">
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
                            className="w-full py-2 px-3 rounded-xl text-center text-[11px] font-bold text-white bg-gradient-to-r from-indigo-600 to-pink-500 hover:opacity-95 shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-1 transition-all"
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
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover/card:text-indigo-600 transition-colors truncate">
                            {template.name}
                          </h3>
                        </div>

                        <div className="flex items-center gap-1.5 pt-0.5">
                          <Link
                            href={`/signup?intent=build_card&template=${template.id}`}
                            className="flex-1 py-1.5 px-2 rounded-lg text-center text-[10px] sm:text-[11px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-xs"
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
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 shadow-xl shadow-indigo-500/25 transition-all duration-300 hover:scale-105 font-bold text-sm tracking-wide group"
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
      <section id="about" className="py-24 bg-gradient-to-b from-amber-100/75 via-indigo-100/80 to-purple-100/75 border-y border-indigo-200/80 relative overflow-hidden scroll-mt-24">
        
        {/* Glow Background Accent */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[650px] bg-gradient-to-r from-amber-300/30 via-indigo-400/30 to-purple-400/30 blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">

          {/* Section Header */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-indigo-200 shadow-sm text-indigo-700 text-xs font-bold uppercase tracking-wider">
              <Quote className="w-3.5 h-3.5 text-indigo-600" /> Founder Story
            </div>
            
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Why <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">OneClickBiz?</span>
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
          <div className="p-6 sm:p-8 md:p-12 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 text-white shadow-2xl border border-indigo-800/80 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-500/20 to-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-wider shadow-sm">
                <Layers className="w-3.5 h-3.5 text-purple-600" /> Unified Business Ecosystem
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
                { title: 'Digital Visiting Cards, Flyers & Brochures', icon: CreditCard, color: 'text-purple-600 bg-purple-50 border-purple-200' },
                { title: 'Lead Extraction Tools', icon: Target, color: 'text-amber-600 bg-amber-50 border-amber-200' },
                { title: 'Custom Domains & Landing Pages', icon: Monitor, color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
                { title: 'Customer Reviews & Ratings', icon: Star, color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
                { title: 'Image Gallery & Product Space', icon: ImageIcon, color: 'text-rose-600 bg-rose-50 border-rose-200' },
                { title: 'Articles & Blogs', icon: FileText, color: 'text-blue-600 bg-blue-50 border-blue-200' },
                { title: 'Products & Services Showcase', icon: Layers, color: 'text-violet-600 bg-violet-50 border-violet-200' },
                { title: 'Customizable Templates', icon: Palette, color: 'text-pink-600 bg-pink-50 border-pink-200' },
                { title: 'Easy Website Designing & Multiple Edits', icon: Edit3, color: 'text-teal-600 bg-teal-50 border-teal-200' },
                { title: 'Customized QR Codes', icon: QrCode, color: 'text-slate-700 bg-slate-100 border-slate-300' },
                { title: 'Payment Gateway Integration', icon: ShieldCheck, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
                { title: 'Canva & Adobe Integration, where supported', icon: Zap, color: 'text-orange-600 bg-orange-50 border-orange-200' },
                { title: 'Email Signature Generator', icon: Mail, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
                { title: 'PDF Report Generation', icon: Download, color: 'text-blue-600 bg-blue-50 border-blue-200' },
                { title: 'Commercial Usage & Business Scaling', icon: TrendingUp, color: 'text-green-600 bg-green-50 border-green-200' },
                { title: 'Installable App-like Experience with a Direct Installation Prompt, where supported', icon: Rocket, color: 'text-purple-600 bg-purple-50 border-purple-200' },
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
          <div className="p-5 sm:p-8 md:p-12 rounded-3xl bg-gradient-to-r from-indigo-50/90 via-purple-50/90 to-pink-50/90 border border-indigo-200 shadow-sm backdrop-blur-md space-y-6">
            <h3 className="text-xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Your Business. Your Website. <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Your Control.</span>
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
              <div className="pt-2 text-xs sm:text-sm md:text-base font-bold text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text">
                OneClickBiz — One Platform. Every Business. Your Control.
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center items-stretch lg:items-end">
              <Link
                href="/signup"
                className="w-full px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-400 hover:to-pink-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all text-center"
              >
                <span>Explore: oneclickbiz.in</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </section>

      {/* SERVICES OFFERED SECTION with Soft Sky-Teal-Indigo Gradient */}
      <section id="services" className="py-24 bg-gradient-to-b from-sky-100/90 via-teal-100/75 to-indigo-100/85 backdrop-blur-xl border-y border-sky-200/80 relative scroll-mt-24 overflow-hidden">
        {/* Floating Glowing Mesh Orbs */}
        <div className="absolute top-10 right-10 w-[650px] h-[400px] bg-gradient-to-l from-sky-400/35 via-teal-300/30 to-indigo-300/35 blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-10 w-[600px] h-[350px] bg-gradient-to-r from-indigo-400/30 via-purple-300/30 to-pink-300/30 blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" /> What Services We Offer
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Full-Service Solutions for High-Impact Networking &amp; Growth
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              From bespoke digital smart cards to multi-team cards and WhatsApp commerce onboarding, here is how our team empowers your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Service 1: Turnkey Mini Websites & Business Profiles */}
            <div className="p-7 rounded-3xl bg-white/85 backdrop-blur-xl border border-slate-200/80 hover:border-indigo-400/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform border border-indigo-200">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Web &amp; Digital Presence</span>
                  <h3 className="text-base font-bold text-slate-900">Mini Websites &amp; Business Profiles</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Launch a turnkey, mobile-optimized business mini-website in under 2 minutes. Showcase your story, services, photo lookbooks, client testimonials, and connect your custom domain.
                </p>
                <ul className="space-y-1.5 text-[11px] text-slate-700 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" /> 93+ Ready industry niche templates</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" /> Custom domain &amp; white-label support</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" /> 100% cloud-hosted — zero coding or apps</li>
                </ul>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-indigo-700 flex items-center gap-1.5">
                  <BadgeCheck className="w-3.5 h-3.5 text-indigo-600" /> Instant Cloud Deployment
                </span>
              </div>
            </div>

            {/* Service 2: Smart Visiting Card Studio */}
            <div className="p-7 rounded-3xl bg-white/85 backdrop-blur-xl border border-slate-200/80 hover:border-sky-400/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-110 transition-transform border border-sky-200">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">Graphic &amp; Print Design</span>
                  <h3 className="text-base font-bold text-slate-900">Visiting Card Studio &amp; 300 DPI PDF</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Design luxury business cards with real-time 3D interactive flip view, custom finishes (Gold, Matte, Neo-Glass), and download vector print-ready front &amp; back PDFs.
                </p>
                <ul className="space-y-1.5 text-[11px] text-slate-700 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" /> 6 Luxury print presets &amp; themes</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" /> 300 DPI CMYK commercial print ready</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" /> Dual-sided interactive 3D preview</li>
                </ul>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-sky-700 flex items-center gap-1.5">
                  <BadgeCheck className="w-3.5 h-3.5 text-sky-600" /> High-Resolution Vector Export
                </span>
              </div>
            </div>

            {/* Service 3: WhatsApp Store Onboarding */}
            <div className="p-7 rounded-3xl bg-white/85 backdrop-blur-xl border border-slate-200/80 hover:border-emerald-400/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform border border-emerald-200">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Conversational Commerce</span>
                  <h3 className="text-base font-bold text-slate-900">WhatsApp Store Onboarding</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our e-commerce team formats your product catalogs, configures tiered pricing, formats high-res images, and connects direct in-card WhatsApp cart checkout.
                </p>
                <ul className="space-y-1.5 text-[11px] text-slate-700 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /> High-res product photo formatting</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /> Pre-filled structured WhatsApp orders</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /> In-card checkout cart integration</li>
                </ul>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1.5">
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" /> Ready-to-Sell Catalog Setup
                </span>
              </div>
            </div>

            {/* Service 4: Appointment & Booking */}
            <div className="p-7 rounded-3xl bg-white/85 backdrop-blur-xl border border-slate-200/80 hover:border-purple-400/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform border border-purple-200">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">Scheduling Engine</span>
                  <h3 className="text-base font-bold text-slate-900">Appointment &amp; Booking Setup</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Set up consultation booking slots with automated calendar sync, buffer times, custom appointment durations, and automated client notifications.
                </p>
                <ul className="space-y-1.5 text-[11px] text-slate-700 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" /> Time slot availability matrix</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" /> Double-booking protection engine</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" /> Instant WhatsApp &amp; Email alerts</li>
                </ul>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-purple-700 flex items-center gap-1.5">
                  <BadgeCheck className="w-3.5 h-3.5 text-purple-600" /> Zero Double-Bookings Guaranteed
                </span>
              </div>
            </div>

            {/* Service 5: Blog & Brochure Studio */}
            <div className="p-7 rounded-3xl bg-white/85 backdrop-blur-xl border border-slate-200/80 hover:border-cyan-400/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform border border-cyan-200">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600">Publishing &amp; Collateral</span>
                  <h3 className="text-base font-bold text-slate-900">SEO Blog &amp; Brochure Studios</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Author search-optimized blog posts with custom categories and featured covers. Automatically generate multi-page business brochures with PDF download suites.
                </p>
                <ul className="space-y-1.5 text-[11px] text-slate-700 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" /> Rich blog post editor with tags</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" /> 300 DPI print-ready PDF export</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" /> 1-Click WhatsApp &amp; social sharing</li>
                </ul>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-cyan-700 flex items-center gap-1.5">
                  <BadgeCheck className="w-3.5 h-3.5 text-cyan-600" /> Full Content Publishing
                </span>
              </div>
            </div>

            {/* Service 6: Direct 0% Fee UPI QR Payments */}
            <div className="p-7 rounded-3xl bg-white/85 backdrop-blur-xl border border-slate-200/80 hover:border-amber-400/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform border border-amber-200">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Digital Payments</span>
                  <h3 className="text-base font-bold text-slate-900">Direct UPI QR &amp; Instant Pay</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Integrated dynamic QR code and 1-tap payment buttons for GPay, PhonePe, Paytm, and BHIM UPI. Money deposits directly into your bank account with zero gateway fee deductions.
                </p>
                <ul className="space-y-1.5 text-[11px] text-slate-700 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /> 0% commission on all UPI transactions</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /> Instant GPay, PhonePe &amp; Paytm links</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /> Direct bank account instant settlement</li>
                </ul>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-amber-700 flex items-center gap-1.5">
                  <BadgeCheck className="w-3.5 h-3.5 text-amber-600" /> 100% Software • 0% Gateway Cuts
                </span>
              </div>
            </div>

            {/* Service 7: Dynamic QR Engine */}
            <div className="p-7 rounded-3xl bg-white/85 backdrop-blur-xl border border-slate-200/80 hover:border-pink-400/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform border border-pink-200">
                  <QrCode className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600">QR Engineering</span>
                  <h3 className="text-base font-bold text-slate-900">Dynamic Branded QR Systems</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Generate high-contrast vector QR codes with your company logo embedded. Change redirect URLs and campaign targets anytime in the cloud without reprinting materials.
                </p>
                <ul className="space-y-1.5 text-[11px] text-slate-700 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-pink-500 flex-shrink-0" /> High-res SVG &amp; PNG vector export</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-pink-500 flex-shrink-0" /> Real-time cloud target redirecting</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-pink-500 flex-shrink-0" /> Custom logo centering &amp; color tuning</li>
                </ul>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-pink-700 flex items-center gap-1.5">
                  <BadgeCheck className="w-3.5 h-3.5 text-pink-600" /> Zero Reprinting Required
                </span>
              </div>
            </div>

            {/* Service 8: Real-Time Event & Lead Analytics */}
            <div className="p-7 rounded-3xl bg-white/85 backdrop-blur-xl border border-slate-200/80 hover:border-violet-400/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform border border-violet-200">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600">Business Intelligence</span>
                  <h3 className="text-base font-bold text-slate-900">Lead Capture &amp; Live Analytics</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Real-time conversion tracking for dynamic QR scans, unique profile visitors, phone calls, WhatsApp inquiries, and 1-click contact save conversion rates.
                </p>
                <ul className="space-y-1.5 text-[11px] text-slate-700 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-violet-500 flex-shrink-0" /> Real-time scan &amp; click telemetry</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-violet-500 flex-shrink-0" /> 1-Click contact save rate tracking</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-violet-500 flex-shrink-0" /> Exportable CSV &amp; PDF lead summaries</li>
                </ul>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-violet-700 flex items-center gap-1.5">
                  <BadgeCheck className="w-3.5 h-3.5 text-violet-600" /> Live Data Insights
                </span>
              </div>
            </div>

          </div>

          {/* Service Consultation CTA Strip */}
          <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 border border-indigo-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-white">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
                <span>Need a Custom Solution for Your Team or Brand?</span>
              </h4>
              <p className="text-xs text-slate-300">
                Talk with our digital identity specialists to get custom team volume setups, custom domain pairing, or personalized onboarding.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/916304989071?text=Hi%20OneClickBiz%2C%20I%20would%20like%20to%20inquire%20about%20your%20software%20plans%20and%20services."
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <Link
                href="/signup?intent=build_card"
                className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 backdrop-blur-md shadow-sm flex items-center gap-2 transition-all"
              >
                <span>Try Card Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>


      {/* Head-to-Head Comparison & Differentiation Section */}
      <section className="py-24 bg-white border-t border-slate-200/80 relative overflow-hidden">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold shadow-xs">
              <Zap className="w-4 h-4 text-indigo-600" />
              <span>Built Different For Indian Commerce</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Why OneClickBiz vs. Generic Digital Cards
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Most digital cards are just a flat list of web links. OneClickBiz combines 1-click address book downloads with native WhatsApp micro-stores, direct UPI payments, and high-resolution corporate print studios.
            </p>
          </div>

          {/* Mobile Swipe Notice */}
          <div className="flex items-center justify-center gap-1.5 mb-3 sm:hidden text-[11px] font-semibold text-indigo-700 bg-indigo-50/90 px-3.5 py-1.5 rounded-full border border-indigo-200/90 w-fit mx-auto shadow-xs">
            <span>👈 Swipe horizontally to view full comparison 👉</span>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto pb-4 -mx-2 px-2 sm:mx-0 sm:px-0 scrollbar-none">
            <div className="min-w-[720px] xs:min-w-[760px] rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
              <div className="grid grid-cols-12 bg-slate-50/90 border-b border-slate-200 text-xs font-bold text-slate-700">
                <div className="col-span-4 p-5 text-slate-500 uppercase tracking-wider text-[11px]">
                  Capability / Feature
                </div>
                <div className="col-span-2.5 p-5 text-center text-slate-500">
                  Generic Link-in-Bio
                  <span className="block text-[10px] font-normal text-slate-400 mt-0.5">(Linktree, Carrd)</span>
                </div>
                <div className="col-span-2.5 p-5 text-center text-slate-500">
                  Traditional Digital Cards
                  <span className="block text-[10px] font-normal text-slate-400 mt-0.5">(Popl, Blinq, HiHello)</span>
                </div>
                <div className="col-span-3 p-5 text-center bg-indigo-600 text-white rounded-t-2xl shadow-md">
                  <div className="inline-flex items-center gap-1.5 font-extrabold">
                    <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                    <span>OneClickBiz</span>
                  </div>
                  <span className="block text-[10px] font-medium text-indigo-100 mt-0.5">Engineered for Indian Commerce</span>
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
                  className={`grid grid-cols-12 text-xs border-b border-slate-100 last:border-0 items-center ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                  }`}
                >
                  <div className="col-span-4 p-4 sm:p-5">
                    <p className="font-bold text-slate-900">{row.feature}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{row.sub}</p>
                  </div>
                  <div className="col-span-2.5 p-4 sm:p-5 text-center text-slate-600 font-medium border-l border-slate-100">
                    {row.generic === false ? (
                      <span className="inline-flex items-center gap-1 text-slate-400 font-normal">
                        <X className="w-4 h-4 text-slate-300" /> None
                      </span>
                    ) : (
                      row.generic
                    )}
                  </div>
                  <div className="col-span-2.5 p-4 sm:p-5 text-center text-slate-600 font-medium border-l border-slate-100">
                    {row.western === false ? (
                      <span className="inline-flex items-center gap-1 text-slate-400 font-normal">
                        <X className="w-4 h-4 text-slate-300" /> None
                      </span>
                    ) : (
                      row.western
                    )}
                  </div>
                  <div className="col-span-3 p-4 sm:p-5 text-center font-bold text-indigo-950 bg-indigo-50/60 border-l border-indigo-100">
                    <span className="text-indigo-900">{row.oneclickbiz}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Consolidate & Save Banner */}
          <div className="mt-12 p-5 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-950 to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
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
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-400 hover:to-pink-400 text-white font-bold text-xs shrink-0 shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 text-center"
            >
              <span>Build Your Smart Card Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* Authentic Transparency & Risk-Free Guarantees Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 via-indigo-50/60 to-purple-50/50 border-t border-slate-200/80 relative overflow-hidden">
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
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center">
                  <Building className="w-6 h-6 text-purple-600" />
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
                className="text-xs font-bold text-purple-700 hover:text-purple-800 flex items-center gap-1.5 group pt-2"
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

      {/* Pricing Section with Soft Pastel Rose-Indigo Gradient */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-pink-100/85 via-indigo-100/90 to-purple-100/85 border-y border-indigo-200/80 relative scroll-mt-24 overflow-hidden">
        {/* Glowing Background Orbs */}
        <div className="absolute top-10 left-1/3 w-[750px] h-[500px] bg-gradient-to-r from-pink-400/35 via-purple-400/35 to-indigo-400/35 blur-[130px] pointer-events-none -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            Simple, Transparent Pricing
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Choose Your Smart Identity Plan
          </h3>
          <p className="text-sm text-slate-600">
            All plans include SSL security, unlimited QR code generation, dynamic URL aliases, mobile address book (.VCF) downloads, and <strong>100% free unlimited profile edits anytime</strong>.
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
          
          {/* Plan 1: Basic */}
          <div className="p-5 sm:p-8 rounded-3xl bg-white/85 backdrop-blur-xl border border-slate-200/90 flex flex-col justify-between space-y-6 hover:border-slate-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Solo Professionals</span>
                <h4 className="text-xl font-bold text-slate-900">Basic Plan</h4>
              </div>
              <p className="text-xs text-slate-600">Essential digital smart card for individual practitioners and consultants.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900">₹{pricing.basicPrice.toLocaleString()}</span>
                <span className="text-xs text-slate-500">/ year</span>
                <span className="ml-2 px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-[10px] font-bold text-indigo-700">Annual</span>
              </div>
              <ul className="space-y-2.5 pt-4 text-xs text-slate-700 border-t border-slate-100">
                <li className="flex items-center gap-2 text-emerald-800 font-semibold"><Check className="w-4 h-4 text-emerald-600" /> <strong>Unlimited 24x7 Card Edits (Edit N Times)</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600" /> <strong>1 Digital Card (/v/your-name)</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600" /> 1-Click .VCF Contact Downloader</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600" /> Dynamic Cloud QR Code (Editable)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600" /> Social Links &amp; Portfolio Showcase</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600" /> Inbound Lead Inquiry Capture Form</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600" /> Standard Visitor Analytics</li>
              </ul>
            </div>
            <Link href="/signup?plan=Basic&intent=select_plan" className="w-full py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs text-center border border-slate-200 transition-all shadow-xs">
              Select Basic Plan (₹{pricing.basicPrice.toLocaleString()})
            </Link>
          </div>

          {/* Plan 2: Pro (Highlighted) */}
          <div className="p-5 sm:p-8 rounded-3xl bg-gradient-to-b from-indigo-50/90 via-white to-white border-2 border-indigo-500 flex flex-col justify-between space-y-6 relative shadow-[0_20px_50px_rgba(99,102,241,0.15)]">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-bold text-[10px] uppercase tracking-wider shadow-lg shadow-indigo-500/25">
              ⭐ Most Popular
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Multi-service Professionals &amp; Agencies</span>
                <h4 className="text-xl font-bold text-slate-900">Pro Plan</h4>
              </div>
              <p className="text-xs text-slate-600">Complete suite for multi-service professionals, agencies, and side hustles.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">₹{pricing.proPrice.toLocaleString()}</span>
                <span className="text-xs text-slate-500">/ year</span>
                <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700">Annual</span>
              </div>
              <ul className="space-y-2.5 pt-4 text-xs text-slate-700 border-t border-slate-100">
                <li className="flex items-center gap-2 text-emerald-800 font-semibold"><Check className="w-4 h-4 text-emerald-600" /> <strong>Unlimited 24x7 Card Edits (Edit N Times)</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600" /> <strong>Up to 3 Digital Cards</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600" /> <strong>1 Custom Domain CNAME (White-Label)</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600" /> <strong>Unlimited WhatsApp Store Catalog</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600" /> <strong>Appointment &amp; Slot Booking Engine</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600" /> <strong>PDF Data Reporting &amp; Exporting Suite</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600" /> Leads CRM Pipeline Inbox with Exports</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600" /> Priority WhatsApp &amp; Email Support</li>
              </ul>
            </div>
            <Link href="/signup?plan=Pro&intent=select_plan" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white font-bold text-xs text-center shadow-lg shadow-indigo-500/30 transition-all active:scale-95">
              Get Started with Pro (₹{pricing.proPrice.toLocaleString()})
            </Link>
          </div>

          {/* Plan 3: Advanced */}
          <div className="p-5 sm:p-8 rounded-3xl bg-white/85 backdrop-blur-xl border border-slate-200/90 flex flex-col justify-between space-y-6 hover:border-slate-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">Growing Businesses &amp; Executives</span>
                <h4 className="text-xl font-bold text-slate-900">Advanced Plan</h4>
              </div>
              <p className="text-xs text-slate-600">For growing businesses and executives with multiple companies or team staff.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900">₹{pricing.advancedPrice.toLocaleString()}</span>
                <span className="text-xs text-slate-500">/ year</span>
                <span className="ml-2 px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-[10px] font-bold text-rose-700">Annual</span>
              </div>
              <ul className="space-y-2.5 pt-4 text-xs text-slate-700 border-t border-slate-100">
                <li className="flex items-center gap-2 text-emerald-800 font-semibold"><Check className="w-4 h-4 text-emerald-600" /> <strong>Unlimited 24x7 Card Edits (Edit N Times)</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-rose-600" /> <strong>Up to 5 Digital Cards &amp; Team Profiles</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-rose-600" /> <strong>5 White-Label Custom Domains</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-rose-600" /> <strong>Unlimited 4K Video Uploads &amp; CDN</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-rose-600" /> Blog Studio &amp; Unlimited Article Publishing</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-rose-600" /> 50+ Portfolio Case Studies with Zoom</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-rose-600" /> Dedicated Account Manager &amp; VIP SLA</li>
              </ul>
            </div>
            <Link href="/signup?plan=Advanced&intent=select_plan" className="w-full py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs text-center border border-slate-200 transition-all shadow-xs">
              Choose Advanced Plan (₹{pricing.advancedPrice.toLocaleString()})
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
          <Link href="/refund" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 shrink-0 flex items-center gap-1">
            <span>Refund Terms</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        </div>
      </section>

      {/* FAQ Accordion with Soft Lavender-Sky Background */}
      <section id="faq" className="py-24 bg-gradient-to-b from-purple-100/90 via-slate-100/90 to-sky-100/90 backdrop-blur-xl border-t border-indigo-200/80 scroll-mt-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-purple-300/40 to-sky-300/40 blur-[120px] pointer-events-none -z-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600">FAQ</h2>
            <h3 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs cursor-pointer transition-all hover:border-indigo-400/60 hover:shadow-sm"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-900">{faq.q}</h4>
                  <span className="text-indigo-600 font-bold text-base">
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

      {/* Contact Support Section with Sky-Indigo-Pink Light Background */}
      <section id="contact" className="py-24 bg-gradient-to-b from-sky-100/90 via-indigo-100/80 to-pink-100/80 border-t border-slate-300/80 relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-300/30 via-purple-200/25 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              <MessageCircle className="w-3.5 h-3.5 text-indigo-600" />
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
              <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/80 hover:border-indigo-400/60 shadow-xs hover:shadow-sm transition flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-200">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-sm font-bold text-slate-900">Email Support Desk</h3>
                  <p className="text-xs text-slate-600">Response guaranteed within 2-4 business hours.</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-1">
                    <a 
                      href="mailto:support@oneclickbiz.in" 
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition"
                    >
                      <span>support@oneclickbiz.in</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                    <a 
                      href="mailto:contact@oneclickbiz.in" 
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition"
                    >
                      <span>contact@oneclickbiz.in</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Office Location Card */}
              <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-200">
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
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200/90 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
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
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200/90 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
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
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200/90 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Inquiry Topic</label>
                      <select 
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200/90 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
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
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200/90 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmittingContact}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition active:scale-[0.99] disabled:opacity-50"
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

      <Footer />
    </div>
  );
}
