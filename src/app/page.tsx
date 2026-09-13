'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Smartphone, 
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
  Package,
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
  ChevronRight
} from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import ProfileCardView from '@/components/templates/ProfileCardView';
import DemoVideoSection from '@/components/home/DemoVideoSection';
import { INITIAL_PROFILES } from '@/lib/data-store';
import { VCARD_TEMPLATES_CATALOG } from '@/data/vcardTemplates';

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
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
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
      'Dynamic QR Code & NFC Hardware Compatible'
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
      'Pairs with Matte Black & Bamboo NFC Smart Cards'
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
    coverUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop',
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
    coverUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop',
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
    coverUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop',
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
  const [selectedDemoTheme, setSelectedDemoTheme] = useState<'modern-indigo' | 'dark-onyx' | 'glassmorphic' | 'emerald-pro' | 'sunset-gold'>('modern-indigo');
  const [templateFilter, setTemplateFilter] = useState<string>('all');
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
    theme: selectedDemoTheme
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
      q: 'Does it support one-click contact saving to iPhone and Android?',
      a: 'Yes! When someone clicks the "Save Contact" button on your card, an industry-standard .vcf file is downloaded and directly prompts them to save your full name, phone numbers, email, company, address, and profile photo directly to their phone address book.'
    },
    {
      q: 'Can I publish blogs and download PDF brochures?',
      a: 'Yes! OneClickBiz includes full Blog Publishing and Brochure Design Studios. You can write articles, design multi-page company brochures, and export 300 DPI print-ready PDFs directly from your dashboard.'
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
        {/* Glow Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] dark:bg-gradient-to-tr dark:from-indigo-600/20 dark:via-purple-600/20 dark:to-pink-600/10 bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/5 blur-[130px] -z-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full dark:bg-indigo-500/10 bg-indigo-50 dark:border-indigo-500/20 border-indigo-200 dark:text-indigo-400 text-indigo-700 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Smart Identity & Commerce SaaS</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight dark:text-white text-slate-900 leading-[1.15]">
                Your Complete <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Digital Identity</span> In One Click.
              </h1>

              <p className="text-base sm:text-lg dark:text-slate-300 text-slate-600 max-w-2xl leading-relaxed">
                Replace outdated paper business cards with dynamic vCards, 1-click WhatsApp mini-stores, appointment booking calendars, and blog publishing studios.
              </p>

              {/* Live URL Alias Claimer */}
              <div className="max-w-md mx-auto lg:mx-0">
                <form onSubmit={handleCheckAlias} className="p-1.5 rounded-2xl dark:bg-slate-900 bg-white dark:border-slate-700/80 border-slate-300 shadow-2xl flex items-center focus-within:border-indigo-500 transition-all">
                  <div className="pl-3 pr-1 dark:text-slate-400 text-slate-500 font-mono text-xs hidden sm:block">
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
                    className="flex-1 bg-transparent px-2 py-2 text-xs dark:text-white text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
                    required
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white text-xs font-bold transition-all shadow-md shrink-0"
                  >
                    Check Handle
                  </button>
                </form>

                {aliasStatus === 'available' && (
                  <div className="mt-2.5 p-3 rounded-xl dark:bg-emerald-500/10 bg-emerald-50 dark:border-emerald-500/30 border-emerald-200 dark:text-emerald-400 text-emerald-700 text-xs flex items-center justify-between animate-in fade-in">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <strong>oneclickbiz.in/v/{aliasSearch.toLowerCase()}</strong> is available!
                    </span>
                    <Link href={`/signup?slug=${aliasSearch.toLowerCase()}&intent=build_card`} className="underline font-bold dark:text-white text-indigo-600">
                      Claim Now →
                    </Link>
                  </div>
                )}
                {aliasStatus === 'taken' && (
                  <p className="mt-2 text-xs text-rose-500 font-medium">
                    This alias is reserved or taken. Please try another one!
                  </p>
                )}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link 
                  href="/signup?intent=build_card"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <span>Build Your Smart Card</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="/v/alex-rivera"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200 bg-white hover:bg-slate-100 text-slate-800 border dark:border-slate-700 border-slate-300 font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <span>Explore Live Card Demo</span>
                </Link>
              </div>

              {/* Social Proof Badges */}
              <div className="pt-4 flex items-center justify-center lg:justify-start space-x-6 text-xs dark:text-slate-400 text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>1-Click Contact Save</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>WhatsApp Orders</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>No App Required</span>
                </div>
              </div>

            </div>

            {/* Right Hero Visual: Real-Time Interactive Card Preview */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              
              {/* Theme Switcher Chips */}
              <div className="flex items-center gap-1.5 p-1 rounded-full dark:bg-slate-900 bg-white dark:border-slate-800 border-slate-200 mb-4 shadow-xl">
                {(['modern-indigo', 'dark-onyx', 'glassmorphic', 'emerald-pro', 'sunset-gold'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setSelectedDemoTheme(t)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all ${
                      selectedDemoTheme === t 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-900'
                    }`}
                  >
                    {t.split('-')[0].toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Phone Mockup Frame */}
              <div className="w-full max-w-[340px] rounded-[44px] p-2.5 dark:bg-slate-900 bg-slate-200/90 border-4 dark:border-slate-700/80 border-slate-300 shadow-2xl relative">
                <div className="rounded-[36px] overflow-hidden dark:bg-slate-950 bg-slate-900 max-h-[580px] overflow-y-auto scrollbar-none border dark:border-slate-800 border-slate-700">
                  <ProfileCardView profile={demoProfile} isMockup={true} />
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* VCARD TEMPLATES SHOWCASE SECTION */}
      <section id="templates" className="py-20 dark:bg-slate-950/80 bg-slate-100/70 border-b dark:border-slate-800/80 border-slate-200/80 relative overflow-hidden scroll-mt-20">
        {/* Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[350px] bg-gradient-to-r from-primary-500/15 via-accent-500/15 to-teal-500/10 blur-[160px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-tight">
              vCard Templates
            </h2>
            <p className="text-sm sm:text-base dark:text-slate-400 text-slate-600">
              Select from 28+ professional digital business cards engineered for rapid networking, instant 1-click contact downloads, and integrated WhatsApp orders.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {['all', 'Creative', 'Corporate', 'Services', 'Healthcare', 'Real Estate', 'Tech'].map((cat) => (
              <button
                key={cat}
                onClick={() => setTemplateFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  templateFilter === cat
                    ? 'bg-gradient-to-r from-indigo-600 to-pink-500 text-white shadow-lg shadow-indigo-500/25 scale-105'
                    : 'dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 dark:border-slate-800 bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-200 shadow-sm'
                }`}
              >
                {cat === 'all' ? `All Templates (${VCARD_TEMPLATES_CATALOG.length})` : cat}
              </button>
            ))}
          </div>

          {/* Slider Container with Navigation Controls */}
          <div className="relative group px-2 sm:px-6">
            {/* Left Scroll Arrow */}
            <button
              onClick={() => scrollSlider('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full dark:bg-slate-900/95 bg-white/95 dark:border-slate-700 border-slate-200 dark:text-white text-slate-800 shadow-2xl flex items-center justify-center hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-all hover:scale-110 active:scale-95 backdrop-blur-md"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Scroll Arrow */}
            <button
              onClick={() => scrollSlider('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full dark:bg-slate-900/95 bg-white/95 dark:border-slate-700 border-slate-200 dark:text-white text-slate-800 shadow-2xl flex items-center justify-center hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-all hover:scale-110 active:scale-95 backdrop-blur-md"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Scrollable Templates Track */}
            <div
              ref={sliderRef}
              className="flex items-stretch gap-6 overflow-x-auto scrollbar-none scroll-smooth py-4 px-2 select-none"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {VCARD_TEMPLATES_CATALOG
                .filter((t) => templateFilter === 'all' || t.category === templateFilter)
                .map((template) => {
                  return (
                    <div
                      key={template.id}
                      style={{ scrollSnapAlign: 'start' }}
                      className="w-[280px] sm:w-[320px] shrink-0 rounded-3xl dark:border-slate-800 border-slate-200 dark:bg-slate-900/80 bg-white hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group/card shadow-xl hover:shadow-2xl hover:-translate-y-1 relative"
                    >
                      {/* Ribbon or Badge */}
                      {template.badge && (
                        <div className="absolute top-3.5 right-3.5 z-20">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-gradient-to-r from-indigo-600 to-pink-500 text-white shadow-md">
                            {template.badge}
                          </span>
                        </div>
                      )}

                      {/* Card Preview Image */}
                      <div className="relative h-[380px] w-full bg-slate-900 overflow-hidden cursor-pointer group/img flex items-center justify-center">
                        <img
                          src={template.imgUrl}
                          alt={template.name}
                          className="vcard-template-img w-full h-full object-cover object-top transition-transform duration-500 group-hover/card:scale-105"
                          loading="lazy"
                        />

                        <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-slate-950/70 to-transparent pointer-events-none" />
                        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

                        {/* Hover action overlay */}
                        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] opacity-0 group-hover/card:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2.5 p-4">
                          <Link
                            href={`/signup?intent=build_card&template=${template.id}`}
                            className="w-full py-2.5 px-4 rounded-xl text-center text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-pink-500 hover:opacity-95 shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-1.5 transition-all"
                          >
                            <span>Use This Template</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            href="/vcard-templates"
                            className="w-full py-2 px-4 rounded-xl text-center text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-700 transition-all flex items-center justify-center gap-1.5"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Quick Preview</span>
                          </Link>
                        </div>
                      </div>

                      {/* Card Body Footer */}
                      <div className="p-5 border-t dark:border-slate-800/80 border-slate-100 dark:bg-slate-950/50 bg-slate-50/90 space-y-3">
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-base font-bold dark:text-white text-slate-900 group-hover/card:text-indigo-600 dark:group-hover/card:text-indigo-400 transition-colors truncate">
                              {template.name}
                            </h3>
                            <span className="text-[10px] font-semibold dark:text-slate-400 text-slate-600 px-2 py-0.5 rounded dark:bg-slate-800 bg-slate-200">
                              {template.category}
                            </span>
                          </div>
                          <p className="text-xs dark:text-slate-400 text-slate-600 mt-1 line-clamp-1">
                            {template.tagline}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <Link
                            href={`/signup?intent=build_card&template=${template.id}`}
                            className="flex-1 py-2 px-3 rounded-lg text-center text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all"
                          >
                            Select
                          </Link>
                          <Link
                            href="/vcard-templates"
                            className="py-2 px-3 rounded-lg text-xs font-semibold dark:text-slate-400 text-slate-700 dark:hover:text-white hover:text-slate-950 dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 dark:hover:bg-slate-800 hover:bg-slate-100 transition-all"
                          >
                            Details
                          </Link>
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

      {/* Bento Grid Feature Matrix */}
      <section id="features" className="py-24 dark:bg-slate-900/40 bg-white border-y dark:border-slate-800/80 border-slate-200/80 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Complete Feature Suite
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold dark:text-white text-slate-900 tracking-tight">
              Everything Your Brand Needs to Network & Close Deals
            </h3>
            <p className="text-sm dark:text-slate-400 text-slate-600">
              Engineered for founders, agencies, consultants, doctors, real estate brokers, and modern sales teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bento Card 1: 1-Click VCF */}
            <div className="p-8 rounded-3xl dark:bg-slate-900/80 bg-slate-50 border dark:border-slate-800 border-slate-200/90 hover:border-indigo-500/40 shadow-sm hover:shadow-xl transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Download className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold dark:text-white text-slate-900">1-Click VCF Contact Saving</h4>
              <p className="text-xs leading-relaxed dark:text-slate-400 text-slate-600">
                Instantly saves your phone, email, job title, company, profile photo, and website directly into the client&apos;s phone contacts with zero typing.
              </p>
            </div>

            {/* Bento Card 2: WhatsApp Mini Store */}
            <div className="p-8 rounded-3xl dark:bg-slate-900/80 bg-slate-50 border dark:border-slate-800 border-slate-200/90 hover:border-emerald-500/40 shadow-sm hover:shadow-xl transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold dark:text-white text-slate-900">WhatsApp Mini Store</h4>
              <p className="text-xs leading-relaxed dark:text-slate-400 text-slate-600">
                Showcase products or service packages. Customers add items to their cart and checkout with a pre-formatted order directly on your WhatsApp.
              </p>
            </div>

            {/* Bento Card 3: Appointment Booking */}
            <div className="p-8 rounded-3xl dark:bg-slate-900/80 bg-slate-50 border dark:border-slate-800 border-slate-200/90 hover:border-purple-500/40 shadow-sm hover:shadow-xl transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold dark:text-white text-slate-900">Integrated Slot Booking</h4>
              <p className="text-xs leading-relaxed dark:text-slate-400 text-slate-600">
                Publish available consultation slots with duration and price. Clients book directly on your card without back-and-forth messaging.
              </p>
            </div>

            {/* Bento Card 4: Dynamic QR */}
            <div className="p-8 rounded-3xl dark:bg-slate-900/80 bg-slate-50 border dark:border-slate-800 border-slate-200/90 hover:border-pink-500/40 shadow-sm hover:shadow-xl transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center">
                <QrCode className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold dark:text-white text-slate-900">Dynamic Branded QR Codes</h4>
              <p className="text-xs leading-relaxed dark:text-slate-400 text-slate-600">
                Generate high-resolution PNG/SVG vector QR codes with your brand logo. Change target URLs anytime without re-printing.
              </p>
            </div>

            {/* Bento Card 5: Blog & Brochure Studio */}
            <div className="p-8 rounded-3xl dark:bg-slate-900/80 bg-slate-50 border dark:border-slate-800 border-slate-200/90 hover:border-amber-500/40 shadow-sm hover:shadow-xl transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold dark:text-white text-slate-900">Blog & Brochure Studio</h4>
              <p className="text-xs leading-relaxed dark:text-slate-400 text-slate-600">
                Publish rich SEO articles, design luxury digital visiting cards, and download print-ready 300 DPI PDF brochures instantly.
              </p>
            </div>

            {/* Bento Card 6: Analytics */}
            <div className="p-8 rounded-3xl dark:bg-slate-900/80 bg-slate-50 border dark:border-slate-800 border-slate-200/90 hover:border-sky-500/40 shadow-sm hover:shadow-xl transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold dark:text-white text-slate-900">Event-Driven Analytics</h4>
              <p className="text-xs leading-relaxed dark:text-slate-400 text-slate-600">
                Track dynamic QR scans, unique visitors, WhatsApp clicks, call buttons, and contact download conversions in real time.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* DETAILED ABOUT ONECLICKBIZ SECTION */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden scroll-mt-24">
        
        {/* Glow Background Accent */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-r from-indigo-600/15 via-purple-600/15 to-pink-600/10 blur-[150px] pointer-events-none -z-10" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full dark:bg-indigo-500/10 bg-indigo-50 dark:border-indigo-500/20 border-indigo-200 dark:text-indigo-400 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> About OneClickBiz
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black dark:text-white text-slate-900 tracking-tight leading-tight">
            Your Business. <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">One Smart Identity.</span>
          </h2>

          <p className="text-base sm:text-lg dark:text-slate-300 text-slate-600 leading-relaxed font-normal">
            OneClickBiz is a smart digital business platform built to help professionals, entrepreneurs, and businesses create a powerful digital presence and connect with customers effortlessly.
          </p>
        </div>

        {/* Core Narrative Feature Box */}
        <div className="p-8 sm:p-12 rounded-3xl dark:bg-slate-900/90 bg-white dark:border-slate-800/80 border-slate-200/90 shadow-2xl mb-12 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <p className="text-sm sm:text-base dark:text-slate-300 text-slate-700 leading-relaxed">
                We bring your essential business information, contact details, social links, services, products, bookings, and customer interactions together in one easy-to-share digital profile.
              </p>
              
              <p className="text-sm sm:text-base dark:text-slate-300 text-slate-700 leading-relaxed">
                With a personalized digital business card, dynamic QR code, and WhatsApp mini-store, you can share your business with anyone, anywhere—without relying on traditional paper cards.
              </p>

              <div className="p-4 rounded-2xl dark:bg-indigo-950/40 bg-indigo-50 dark:border-indigo-500/20 border-indigo-200 dark:text-indigo-200 text-indigo-900 text-xs sm:text-sm font-medium">
                ✨ <strong>More than just a digital card:</strong> OneClickBiz is a complete networking and business engagement platform designed to turn every connection into an opportunity.
              </div>

              <p className="text-sm dark:text-slate-400 text-slate-600 leading-relaxed">
                Whether you’re meeting a new client, attending an event, promoting your services, or growing your business online, OneClickBiz gives you one smart identity to represent your brand, engage with customers, and grow.
              </p>
            </div>

            <div className="lg:col-span-4 dark:bg-slate-950/80 bg-slate-50 p-6 rounded-2xl dark:border-slate-800 border-slate-200 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white mx-auto shadow-lg shadow-indigo-500/25">
                <Rocket className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold dark:text-white text-slate-900">Ready to Elevate Your Brand?</h3>
              <p className="text-xs dark:text-slate-400 text-slate-600">Join thousands of businesses scaling their professional identity today.</p>
              <Link 
                href="/signup?intent=build_card" 
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>Create Your Smart Card</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>

        {/* 4 Pillars: Connect • Share • Engage • Grow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          <div className="p-6 rounded-3xl dark:bg-slate-900/70 bg-white dark:border-slate-800 border-slate-200 space-y-3 hover:border-indigo-500/40 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-extrabold text-sm">
              01
            </div>
            <h4 className="text-base font-bold dark:text-white text-slate-900">Connect</h4>
            <p className="text-xs dark:text-slate-400 text-slate-600 leading-relaxed">
              Instantly share via dynamic QR codes, personalized URL aliases, or direct WhatsApp links.
            </p>
          </div>

          <div className="p-6 rounded-3xl dark:bg-slate-900/70 bg-white dark:border-slate-800 border-slate-200 space-y-3 hover:border-purple-500/40 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-extrabold text-sm">
              02
            </div>
            <h4 className="text-base font-bold dark:text-white text-slate-900">Share</h4>
            <p className="text-xs dark:text-slate-400 text-slate-600 leading-relaxed">
              Distribute contact numbers, emails, social media, portfolios, and downloadable .VCF address book files in 1 click.
            </p>
          </div>

          <div className="p-6 rounded-3xl dark:bg-slate-900/70 bg-white dark:border-slate-800 border-slate-200 space-y-3 hover:border-emerald-500/40 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-extrabold text-sm">
              03
            </div>
            <h4 className="text-base font-bold dark:text-white text-slate-900">Engage</h4>
            <p className="text-xs dark:text-slate-400 text-slate-600 leading-relaxed">
              Showcase products, receive structured WhatsApp orders, and let clients schedule consultation meetings directly.
            </p>
          </div>

          <div className="p-6 rounded-3xl dark:bg-slate-900/70 bg-white dark:border-slate-800 border-slate-200 space-y-3 hover:border-pink-500/40 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center font-extrabold text-sm">
              04
            </div>
            <h4 className="text-base font-bold dark:text-white text-slate-900">Grow</h4>
            <p className="text-xs dark:text-slate-400 text-slate-600 leading-relaxed">
              Gain actionable insights with real-time tap/scan analytics, manage client leads, and scale team enterprise accounts.
            </p>
          </div>

        </div>

        {/* Closing Motto Banner */}
        <div className="text-center p-8 rounded-3xl dark:bg-gradient-to-r dark:from-indigo-900/40 dark:via-purple-900/30 dark:to-pink-900/30 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:border-indigo-500/20 border-indigo-200 shadow-sm">
          <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Connect. Share. Engage. Grow — with OneClickBiz.
          </p>
        </div>

      </section>

      {/* SERVICES OFFERED SECTION */}
      <section id="services" className="py-24 dark:bg-slate-900/60 bg-slate-100/70 border-y dark:border-slate-800 border-slate-200 relative scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 text-sky-700 dark:text-sky-400 text-xs font-bold uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" /> What Services We Offer
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold dark:text-white text-slate-900 tracking-tight leading-tight">
              Full-Service Solutions for High-Impact Networking & Growth
            </h2>
            <p className="text-sm sm:text-base dark:text-slate-400 text-slate-600">
              From bespoke digital smart cards to full-scale enterprise white-labeling and WhatsApp commerce onboarding, here is how our team empowers your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Service 1: Blog & Brochure Studio */}
            <div className="p-7 rounded-3xl dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200/90 hover:border-sky-500/40 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">Publishing & Content</span>
                  <h3 className="text-base font-bold dark:text-white text-slate-900">Blog & Brochure Studios</h3>
                </div>
                <p className="text-xs dark:text-slate-400 text-slate-600 leading-relaxed">
                  Author search-optimized blog posts with custom categories and featured covers. Generate multi-page business brochures with PDF download suites.
                </p>
                <ul className="space-y-1.5 text-[11px] dark:text-slate-300 text-slate-700 pt-2 border-t dark:border-slate-800 border-slate-200">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" /> Rich blog post editor with tags</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" /> 300 DPI print-ready PDF export</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" /> 1-Click WhatsApp & social sharing</li>
                </ul>
              </div>
              <div className="pt-2 border-t dark:border-slate-800/80 border-slate-200">
                <span className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                  <BadgeCheck className="w-3.5 h-3.5" /> Full Studio Publishing
                </span>
              </div>
            </div>

            {/* Service 2: White Label Setup */}
            <div className="p-7 rounded-3xl dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200/90 hover:border-indigo-500/40 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Globe2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Enterprise Infrastructure</span>
                  <h3 className="text-base font-bold dark:text-white text-slate-900">Enterprise White-Label Setup</h3>
                </div>
                <p className="text-xs dark:text-slate-400 text-slate-600 leading-relaxed">
                  Connect your company’s custom domain (e.g., <code className="text-indigo-600 dark:text-indigo-300 font-mono text-[10px]">cards.yourbrand.com</code>), remove all OneClickBiz badges, and manage hundreds of employee smart cards under unified admin controls.
                </p>
                <ul className="space-y-1.5 text-[11px] dark:text-slate-300 text-slate-700 pt-2 border-t dark:border-slate-800 border-slate-200">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" /> Custom CNAME & auto SSL</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" /> 100% 0-badge white labeling</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" /> Centralized team permissions</li>
                </ul>
              </div>
              <div className="pt-2 border-t dark:border-slate-800/80 border-slate-200">
                <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                  <BadgeCheck className="w-3.5 h-3.5" /> Automated DNS & SSL Config
                </span>
              </div>
            </div>

            {/* Service 3: WhatsApp Store Onboarding */}
            <div className="p-7 rounded-3xl dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200/90 hover:border-emerald-500/40 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Conversational Commerce</span>
                  <h3 className="text-base font-bold dark:text-white text-slate-900">WhatsApp Store Onboarding</h3>
                </div>
                <p className="text-xs dark:text-slate-400 text-slate-600 leading-relaxed">
                  Our e-commerce experts format your product catalogs, set up tiered pricing, configure inventory, and connect direct WhatsApp cart routing so your business is ready to take orders instantly.
                </p>
                <ul className="space-y-1.5 text-[11px] dark:text-slate-300 text-slate-700 pt-2 border-t dark:border-slate-800 border-slate-200">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /> High-res product photo formatting</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /> Pre-filled structured order messages</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /> In-card checkout cart integration</li>
                </ul>
              </div>
              <div className="pt-2 border-t dark:border-slate-800/80 border-slate-200">
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <BadgeCheck className="w-3.5 h-3.5" /> Ready-to-Sell Catalog Setup
                </span>
              </div>
            </div>

            {/* Service 4: Appointment & Booking */}
            <div className="p-7 rounded-3xl dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200/90 hover:border-purple-500/40 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Scheduling Engine</span>
                  <h3 className="text-base font-bold dark:text-white text-slate-900">Appointment & Booking Automation</h3>
                </div>
                <p className="text-xs dark:text-slate-400 text-slate-600 leading-relaxed">
                  Set up consultation booking slots with automated calendar sync, buffer times, custom appointment durations, and automated client notifications for doctors, lawyers, and agencies.
                </p>
                <ul className="space-y-1.5 text-[11px] dark:text-slate-300 text-slate-700 pt-2 border-t dark:border-slate-800 border-slate-200">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" /> Time slot availability matrix</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" /> Double-booking protection engine</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" /> Instant WhatsApp & Email alerts</li>
                </ul>
              </div>
              <div className="pt-2 border-t dark:border-slate-800/80 border-slate-200">
                <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                  <BadgeCheck className="w-3.5 h-3.5" /> Zero Double-Bookings Guaranteed
                </span>
              </div>
            </div>

          </div>

          {/* Service Consultation CTA Strip */}
          <div className="mt-14 p-8 rounded-3xl dark:bg-gradient-to-r dark:from-sky-950/60 dark:via-slate-900 dark:to-indigo-950/60 bg-gradient-to-r from-sky-50 via-white to-indigo-50 border dark:border-sky-500/20 border-sky-200 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="text-lg font-bold dark:text-white text-slate-900 flex items-center justify-center md:justify-start gap-2">
                <span>Need a Custom Solution for Your Team or Enterprise?</span>
              </h4>
              <p className="text-xs dark:text-slate-300 text-slate-600">
                Talk with our digital identity specialists to get custom enterprise volume licensing, custom domain setups, or white-label onboarding.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/916304989071?text=Hi%20OneClickBiz%2C%20I%20would%20like%20to%20inquire%20about%20your%20services%20and%20hardware."
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <Link
                href="/signup?intent=build_card"
                className="px-6 py-3 rounded-2xl dark:bg-slate-800 dark:hover:bg-slate-700 bg-white hover:bg-slate-100 dark:text-white text-slate-800 font-semibold text-xs border dark:border-slate-700 border-slate-300 shadow-sm flex items-center gap-2 transition-all"
              >
                <span>Try Card Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* PRODUCTS & SOLUTIONS SHOWCASE SECTION */}
      <section id="products" className="py-24 dark:bg-slate-900/40 bg-white border-b dark:border-slate-800/80 border-slate-200/80 relative scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full dark:bg-indigo-500/10 bg-indigo-50 dark:border-indigo-500/20 border-indigo-200 dark:text-indigo-400 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              <Package className="w-3.5 h-3.5" /> What OneClickBiz Does
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold dark:text-white text-slate-900 tracking-tight">
              Explore Our Product Ecosystem
            </h2>
            <p className="text-sm sm:text-base dark:text-slate-400 text-slate-600">
              Powerful, modular tools engineered to transform personal branding, digital sales, and enterprise networking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Product 1: Digital Smart vCards */}
            <div className="p-8 rounded-3xl dark:bg-slate-900/90 bg-slate-50 border dark:border-slate-800 border-slate-200 hover:border-indigo-500/50 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Digital Identity</span>
                  <h3 className="text-xl font-bold dark:text-white text-slate-900">Smart vCard Profiles</h3>
                </div>
                <p className="text-xs dark:text-slate-300 text-slate-600 leading-relaxed">
                  Interactive digital business cards with custom URL slugs, 5 curated visual themes, photo/video portfolios, social links, and 1-click .VCF contact address book downloads.
                </p>
                <ul className="space-y-2 text-xs dark:text-slate-400 text-slate-600 pt-2">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-500" /> Instant iOS & Android .VCF Saving</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-500" /> Dynamic Links & Embeds (YouTube, Portfolio)</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-500" /> WhatsApp Direct Chat Action</li>
                </ul>
              </div>
              <Link href="/signup?intent=build_card" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                <span>Build a Smart vCard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Product 2: Blog & Brochure Studios */}
            <div className="p-8 rounded-3xl dark:bg-slate-900/90 bg-slate-50 border dark:border-slate-800 border-slate-200 hover:border-amber-500/50 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6 group scroll-mt-24" id="blogs">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Publishing Suite</span>
                  <h3 className="text-xl font-bold dark:text-white text-slate-900">Blog & Brochure Studios</h3>
                </div>
                <p className="text-xs dark:text-slate-300 text-slate-600 leading-relaxed">
                  Craft SEO articles with custom categories and featured covers. Build luxury visiting cards and multi-page printable brochures.
                </p>
                <ul className="space-y-2 text-xs dark:text-slate-400 text-slate-600 pt-2">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-500" /> Rich Blog Article Publishing Studio</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-500" /> Multi-Page PDF Brochure Creator</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-500" /> 300 DPI Print-Ready PDF Generation</li>
                </ul>
              </div>
              <Link href="/dashboard/blogs" className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                <span>Explore Blog Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Product 3: WhatsApp Mini Store */}
            <div className="p-8 rounded-3xl dark:bg-slate-900/90 bg-slate-50 border dark:border-slate-800 border-slate-200 hover:border-emerald-500/50 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6 group scroll-mt-24" id="whatsapp-store">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">E-Commerce & Orders</span>
                  <h3 className="text-xl font-bold dark:text-white text-slate-900">WhatsApp Mini Store</h3>
                </div>
                <p className="text-xs dark:text-slate-300 text-slate-600 leading-relaxed">
                  Turn your business card into a digital shop. Display products, services, or packages with prices and allow customers to place structured orders directly via WhatsApp.
                </p>
                <ul className="space-y-2 text-xs dark:text-slate-400 text-slate-600 pt-2">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> In-Card Shopping Cart & Quantity Controls</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> 1-Click WhatsApp Formatted Order Generation</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Categories, SKUs, and Price Customization</li>
                </ul>
              </div>
              <Link href="/dashboard/store" className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                <span>Launch WhatsApp Store</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Product 4: Slot Booking Engine */}
            <div className="p-8 rounded-3xl dark:bg-slate-900/90 bg-slate-50 border dark:border-slate-800 border-slate-200 hover:border-purple-500/50 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6 group scroll-mt-24" id="booking">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Scheduling</span>
                  <h3 className="text-xl font-bold dark:text-white text-slate-900">Appointment Booking</h3>
                </div>
                <p className="text-xs dark:text-slate-300 text-slate-600 leading-relaxed">
                  Let clients book consultations, doctor visits, agency discovery calls, or client meetings directly on your card with automated time slots and zero friction.
                </p>
                <ul className="space-y-2 text-xs dark:text-slate-400 text-slate-600 pt-2">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-500" /> Custom Duration & Consultation Fees</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-500" /> Date & Time Slot Concurrency Locking</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-500" /> Client Details & Confirmation Alerts</li>
                </ul>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="/v/alex-rivera" target="_blank" className="px-3.5 py-2 rounded-xl bg-purple-50 dark:bg-purple-600/20 border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-semibold hover:bg-purple-100 dark:hover:bg-purple-600/30 flex items-center gap-1.5 transition">
                  <span>Try Live Card Booking</span>
                  <ExternalLink className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                </Link>
                <Link href="/signup?intent=booking" className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  <span>Enable Slot Booking</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Product 5: Dynamic QR & Virtual Backgrounds */}
            <div className="p-8 rounded-3xl dark:bg-slate-900/90 bg-slate-50 border dark:border-slate-800 border-slate-200 hover:border-pink-500/50 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <QrCode className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">Smart QR & Media</span>
                  <h3 className="text-xl font-bold dark:text-white text-slate-900">Dynamic QR & Backgrounds</h3>
                </div>
                <p className="text-xs dark:text-slate-300 text-slate-600 leading-relaxed">
                  Generate high-resolution branded vector QR codes with your company logo, plus download personalized Zoom, Teams, and Google Meet virtual backgrounds.
                </p>
                <ul className="space-y-2 text-xs dark:text-slate-400 text-slate-600 pt-2">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-pink-500" /> High-Resolution PNG & SVG Downloads</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-pink-500" /> Custom Colors & Logo Center Placement</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-pink-500" /> Virtual Video Meeting Backgrounds</li>
                </ul>
              </div>
              <Link href="/signup?intent=build_card" className="text-xs font-bold text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                <span>Customize QR Codes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Product 6: Lead CRM & Analytics */}
            <div className="p-8 rounded-3xl dark:bg-slate-900/90 bg-slate-50 border dark:border-slate-800 border-slate-200 hover:border-sky-500/50 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">Growth & CRM</span>
                  <h3 className="text-xl font-bold dark:text-white text-slate-900">Lead Capture & Analytics</h3>
                </div>
                <p className="text-xs dark:text-slate-300 text-slate-600 leading-relaxed">
                  Capture inbound leads directly through your card&apos;s inquiry form, track engagement events, and manage pipeline statuses (*New, Qualified, Contacted, Converted*).
                </p>
                <ul className="space-y-2 text-xs dark:text-slate-400 text-slate-600 pt-2">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-sky-500" /> Real-time Profile Views & QR Scan Tracking</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-sky-500" /> CRM Pipeline Inbox with 1-Click Reply</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-sky-500" /> White-Label Custom Domain Support</li>
                </ul>
              </div>
              <Link href="/dashboard/leads" className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                <span>Open Leads Pipeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Simple, Transparent Pricing
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold dark:text-white text-slate-900 tracking-tight">
            Choose Your Smart Identity Plan
          </h3>
          <p className="text-sm dark:text-slate-400 text-slate-600">
            All plans include SSL security, unlimited QR code generation, dynamic URL aliases, and mobile address book (.VCF) downloads.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Plan 1: Basic */}
          <div className="p-8 rounded-3xl dark:bg-slate-900/80 bg-white border dark:border-slate-800 border-slate-200/90 flex flex-col justify-between space-y-6 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm hover:shadow-xl transition-all">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider dark:text-slate-400 text-slate-500">Solo Professionals</span>
                <h4 className="text-xl font-bold dark:text-white text-slate-900">Basic Plan</h4>
              </div>
              <p className="text-xs dark:text-slate-400 text-slate-600">Essential digital smart card for individual practitioners and consultants.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold dark:text-white text-slate-900">₹{pricing.basicPrice.toLocaleString()}</span>
                <span className="text-xs dark:text-slate-400 text-slate-500">/ year</span>
                <span className="ml-2 px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/20 text-[10px] font-bold text-indigo-700 dark:text-indigo-300">Annual</span>
              </div>
              <ul className="space-y-2.5 pt-4 text-xs dark:text-slate-300 text-slate-600 border-t dark:border-slate-800 border-slate-200">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> <strong>1 Digital Card (/v/your-name)</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> 1-Click .VCF Contact Downloader</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Dynamic Cloud QR Code (Editable)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Social Links &amp; Portfolio Showcase</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Inbound Lead Inquiry Capture Form</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Standard Visitor Analytics</li>
              </ul>
            </div>
            <Link href="/signup?plan=Basic&intent=select_plan" className="w-full py-3.5 rounded-xl dark:bg-slate-800 dark:hover:bg-slate-700 bg-slate-100 hover:bg-slate-200 dark:text-white text-slate-900 font-bold text-xs text-center border dark:border-slate-700 border-slate-300 transition-all">
              Select Basic Plan (₹{pricing.basicPrice.toLocaleString()})
            </Link>
          </div>

          {/* Plan 2: Pro (Highlighted) */}
          <div className="p-8 rounded-3xl dark:bg-gradient-to-b dark:from-indigo-950/70 dark:via-slate-900 dark:to-slate-900 bg-gradient-to-b from-indigo-50/70 via-white to-white border-2 border-indigo-500 flex flex-col justify-between space-y-6 relative shadow-2xl">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold text-[10px] uppercase tracking-wider shadow-lg shadow-indigo-500/25">
              ⭐ Most Popular
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Multi-service Professionals &amp; Agencies</span>
                <h4 className="text-xl font-bold dark:text-white text-slate-900">Pro Plan</h4>
              </div>
              <p className="text-xs dark:text-slate-300 text-slate-600">Complete suite for multi-service professionals, agencies, and side hustles.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black dark:text-white text-slate-900">₹{pricing.proPrice.toLocaleString()}</span>
                <span className="text-xs dark:text-slate-400 text-slate-500">/ year</span>
                <span className="ml-2 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/20 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">Annual</span>
              </div>
              <ul className="space-y-2.5 pt-4 text-xs dark:text-slate-200 text-slate-700 border-t dark:border-slate-800 border-slate-200">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> <strong>Up to 3 Digital Cards</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> <strong>1 Custom Domain CNAME (White-Label)</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> <strong>Unlimited WhatsApp Store Catalog</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> <strong>Appointment &amp; Slot Booking Engine</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> <strong>PDF Data Reporting &amp; Exporting Suite</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Leads CRM Pipeline Inbox with Exports</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Priority WhatsApp &amp; Email Support</li>
              </ul>
            </div>
            <Link href="/signup?plan=Pro&intent=select_plan" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white font-bold text-xs text-center shadow-lg shadow-indigo-500/30 transition-all active:scale-95">
              Get Started with Pro (₹{pricing.proPrice.toLocaleString()})
            </Link>
          </div>

          {/* Plan 3: Advanced */}
          <div className="p-8 rounded-3xl dark:bg-slate-900/80 bg-white border dark:border-slate-800 border-slate-200/90 flex flex-col justify-between space-y-6 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm hover:shadow-xl transition-all">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">Growing Businesses &amp; Executives</span>
                <h4 className="text-xl font-bold dark:text-white text-slate-900">Advanced Plan</h4>
              </div>
              <p className="text-xs dark:text-slate-400 text-slate-600">For growing businesses and executives with multiple companies or team staff.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold dark:text-white text-slate-900">₹{pricing.advancedPrice.toLocaleString()}</span>
                <span className="text-xs dark:text-slate-400 text-slate-500">/ year</span>
                <span className="ml-2 px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-500/20 text-[10px] font-bold text-rose-700 dark:text-rose-300">Annual</span>
              </div>
              <ul className="space-y-2.5 pt-4 text-xs dark:text-slate-300 text-slate-600 border-t dark:border-slate-800 border-slate-200">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-rose-600 dark:text-rose-400" /> <strong>Up to 5 Digital Cards &amp; Team Profiles</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-rose-600 dark:text-rose-400" /> <strong>5 White-Label Custom Domains</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-rose-600 dark:text-rose-400" /> <strong>Unlimited 4K Video Uploads &amp; CDN</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-rose-600 dark:text-rose-400" /> Blog Studio &amp; Unlimited Article Publishing</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-rose-600 dark:text-rose-400" /> 50+ Portfolio Case Studies with Zoom</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-rose-600 dark:text-rose-400" /> Dedicated Account Manager &amp; VIP SLA</li>
              </ul>
            </div>
            <Link href="/signup?plan=Advanced&intent=select_plan" className="w-full py-3.5 rounded-xl dark:bg-slate-800 dark:hover:bg-slate-700 bg-slate-100 hover:bg-slate-200 dark:text-white text-slate-900 font-bold text-xs text-center border dark:border-slate-700 border-slate-300 transition-all">
              Choose Advanced Plan (₹{pricing.advancedPrice.toLocaleString()})
            </Link>
          </div>

        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="py-24 dark:bg-slate-900/30 bg-slate-50 border-t dark:border-slate-800 border-slate-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">FAQ</h2>
            <h3 className="text-3xl font-bold dark:text-white text-slate-900">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-2xl dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200/90 shadow-sm cursor-pointer transition-all hover:border-indigo-500/40"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold dark:text-white text-slate-900">{faq.q}</h4>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                    {openFaq === idx ? '−' : '+'}
                  </span>
                </div>
                {openFaq === idx && (
                  <p className="mt-3 text-xs leading-relaxed dark:text-slate-300 text-slate-600 pt-3 border-t dark:border-slate-800/80 border-slate-100">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support Section under FAQ */}
      <section id="contact" className="py-24 dark:bg-slate-950 bg-white border-t dark:border-slate-800 border-slate-200 relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 bg-gradient-to-b dark:from-indigo-950/10 dark:via-transparent dark:to-slate-950/80 from-indigo-50/50 via-transparent to-slate-50/80 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Get In Touch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold dark:text-white text-slate-900 tracking-tight">
              Connect With Our Support & Engineering Team
            </h2>
            <p className="text-xs sm:text-sm dark:text-slate-400 text-slate-600">
              Have questions about smart profiles, custom onboarding, or need enterprise assistance? We are here to help 24/7.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Col: Contact Information Cards */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Contact Person & WhatsApp Card */}
              <div className="p-5 rounded-2xl dark:bg-slate-900/80 bg-slate-50 border dark:border-slate-800 border-slate-200 hover:border-emerald-500/40 transition flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="space-y-1 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Primary Contact</span>
                  <h3 className="text-sm font-bold dark:text-white text-slate-900">Adduri Sai Kishore</h3>
                  <p className="text-xs dark:text-slate-400 text-slate-600">Direct WhatsApp & Mobile Support for smart business card inquiries.</p>
                  <a 
                    href="https://wa.me/916304989071?text=Hi%20Adduri%20Sai%20Kishore%2C%20I%20have%20an%20inquiry%20regarding%20OneClickBiz%20smart%20business%20cards." 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 pt-1 transition"
                  >
                    <span>+91 63049 89071</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-5 rounded-2xl dark:bg-slate-900/80 bg-slate-50 border dark:border-slate-800 border-slate-200 hover:border-indigo-500/40 transition flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-sm font-bold dark:text-white text-slate-900">Email Support Desk</h3>
                  <p className="text-xs dark:text-slate-400 text-slate-600">Response guaranteed within 2-4 business hours.</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-1">
                    <a 
                      href="mailto:support@oneclickbiz.in" 
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition"
                    >
                      <span>support@oneclickbiz.in</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                    <a 
                      href="mailto:contact@oneclickbiz.in" 
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition"
                    >
                      <span>contact@oneclickbiz.in</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Office Location Card */}
              <div className="p-5 rounded-2xl dark:bg-slate-900/80 bg-slate-50 border dark:border-slate-800 border-slate-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold dark:text-white text-slate-900">Office Location</h3>
                  <p className="text-xs dark:text-slate-300 text-slate-700 font-medium">
                    Nagole, Hyderabad, Telangana, India
                  </p>
                </div>
              </div>

            </div>

            {/* Right Col: Interactive Inquiry Form */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl dark:bg-slate-900/90 bg-slate-50 border dark:border-slate-800 border-slate-200/90 shadow-xl relative">
              <div className="space-y-2 mb-6">
                <h3 className="text-lg font-bold dark:text-white text-slate-900">Send Us a Direct Message</h3>
                <p className="text-xs dark:text-slate-400 text-slate-600">
                  Fill in your details below and our team will reach out with solutions tailored to your business.
                </p>
              </div>

              {contactSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-center space-y-3 animate-in fade-in zoom-in-95">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold dark:text-white text-slate-900">Message Received Successfully!</h4>
                  <p className="text-xs dark:text-slate-300 text-slate-600 max-w-md mx-auto">
                    Thank you for reaching out. A representative from our Hyderabad engineering & support team will contact you shortly.
                  </p>
                  <button 
                    onClick={() => setContactSubmitted(false)}
                    className="mt-3 px-4 py-2 rounded-xl dark:bg-slate-800 dark:hover:bg-slate-700 bg-white hover:bg-slate-100 border dark:border-slate-700 border-slate-300 text-xs font-semibold dark:text-slate-200 text-slate-800 transition shadow-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold dark:text-slate-300 text-slate-700">Your Full Name *</label>
                      <input 
                        type="text" 
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="e.g. Alex Rivera"
                        className="w-full px-4 py-2.5 rounded-xl dark:bg-slate-950 bg-white border dark:border-slate-800 border-slate-300 dark:text-white text-slate-900 placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold dark:text-slate-300 text-slate-700">Official Work Email *</label>
                      <input 
                        type="email" 
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-2.5 rounded-xl dark:bg-slate-950 bg-white border dark:border-slate-800 border-slate-300 dark:text-white text-slate-900 placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold dark:text-slate-300 text-slate-700">Mobile / WhatsApp Number *</label>
                      <input 
                        type="tel" 
                        required
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="+91 63049 89071"
                        className="w-full px-4 py-2.5 rounded-xl dark:bg-slate-950 bg-white border dark:border-slate-800 border-slate-300 dark:text-white text-slate-900 placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold dark:text-slate-300 text-slate-700">Inquiry Topic</label>
                      <select 
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl dark:bg-slate-950 bg-white border dark:border-slate-800 border-slate-300 dark:text-white text-slate-900 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                      >
                        <option value="General Inquiry">General Product Inquiry</option>
                        <option value="Enterprise Onboarding">Enterprise / Multi-User Card Setup</option>
                        <option value="WhatsApp Store Integration">WhatsApp Mini Store Assistance</option>
                        <option value="Billing & Invoicing">Billing & Tax GST Invoicing</option>
                        <option value="Technical Support">Technical & Domain Support</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold dark:text-slate-300 text-slate-700">How Can We Help You? *</label>
                    <textarea 
                      rows={4}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Tell us about your business goals or any questions you have..."
                      className="w-full px-4 py-2.5 rounded-xl dark:bg-slate-950 bg-white border dark:border-slate-800 border-slate-300 dark:text-white text-slate-900 placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmittingContact}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 hover:opacity-90 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition active:scale-[0.99] disabled:opacity-50"
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

      <Footer />
    </div>
  );
}
