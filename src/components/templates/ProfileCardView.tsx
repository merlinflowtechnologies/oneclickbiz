'use client';

import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  MessageCircle, 
  Download, 
  Share2, 
  QrCode, 
  ShoppingBag, 
  Calendar, 
  Star, 
  ExternalLink, 
  Check, 
  X, 
  Send,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  Play,
  Film,
  Video,
  Maximize2,
  Eye,
  Layers,
  Tv,
  BookOpen,
  Clock,
  PenTool,
  CreditCard,
  Smartphone,
  Gift
} from 'lucide-react';
import { DigitalProfile, ProductItem, ServiceItem, OrderCartItem, VideoItem, GalleryItem, BlogPostItem, TestimonialItem } from '@/lib/types';
import { downloadVcfFile } from '@/lib/vcf';
import SocialIcon, { getSocialBrandColor } from '@/components/common/SocialIcon';
import TestimonialSubmitModal from '@/components/cards/TestimonialSubmitModal';
import ShareCardModal from '@/components/common/ShareCardModal';
import PWAInstallPrompt from '@/components/common/PWAInstallPrompt';
import DirectUPIPaymentModal from '@/components/common/DirectUPIPaymentModal';

type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED';
const CURRENCY_CONFIG: Record<CurrencyCode, { symbol: string; rate: number; label: string }> = {
  INR: { symbol: '₹', rate: 1, label: 'INR (₹)' },
  USD: { symbol: '$', rate: 0.012, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.011, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.0095, label: 'GBP (£)' },
  AED: { symbol: 'AED ', rate: 0.044, label: 'AED' }
};

export function getEmbedUrl(item: VideoItem | { url?: string; embedUrl?: string }): string {
  if (item.embedUrl && item.embedUrl.includes('embed')) return item.embedUrl;
  const url = (item.url || '').trim();
  if (!url) return '';
  
  // YouTube Regex Match (supports watch, shorts, live, embed, youtu.be, m.youtube, timestamps)
  const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0`;
  }
  
  // Vimeo
  if (url.includes('vimeo.com/')) {
    const v = url.split('vimeo.com/')[1]?.split('?')[0]?.replace(/\D/g, '');
    if (v) return `https://player.vimeo.com/video/${v}`;
  }
  // Loom
  if (url.includes('loom.com/share/')) {
    const v = url.split('loom.com/share/')[1]?.split('?')[0];
    if (v) return `https://www.loom.com/embed/${v}`;
  }
  // Instagram Reels / Posts
  if (url.includes('instagram.com/reel/') || url.includes('instagram.com/p/')) {
    const cleanReel = url.split('instagram.com/reel/')[1]?.split('/')[0]?.split('?')[0] || 
                      url.split('instagram.com/p/')[1]?.split('/')[0]?.split('?')[0];
    if (cleanReel) return `https://www.instagram.com/reel/${cleanReel}/embed`;
  }
  // Google Drive
  if (url.includes('drive.google.com/file/d/')) {
    const v = url.split('/d/')[1]?.split('/')[0];
    if (v) return `https://drive.google.com/file/d/${v}/preview`;
  }
  return url;
}

interface ProfileCardViewProps {
  profile: DigitalProfile;
  isMockup?: boolean;
  onLeadSubmit?: (name: string, email: string, phone: string, message: string) => void;
  onBookingSubmit?: (service: ServiceItem, date: string, time: string, name: string, email: string, phone: string) => void;
}

export default function ProfileCardView({
  profile: propProfile,
  isMockup = false,
  onLeadSubmit,
  onBookingSubmit
}: ProfileCardViewProps) {
  const [customProfile, setCustomProfile] = useState<DigitalProfile | null>(null);

  React.useEffect(() => {
    const loadCustom = () => {
      if (typeof window !== 'undefined' && !isMockup && propProfile?.slug) {
        const custom = localStorage.getItem(`oneclickbiz_custom_profile_${propProfile.slug}`);
        if (custom) {
          try {
            const parsed = JSON.parse(custom);
            setCustomProfile(parsed);
          } catch (e) {}
        }
      }
    };

    loadCustom();

    if (typeof window !== 'undefined' && !isMockup) {
      const handleStorage = () => loadCustom();
      window.addEventListener('storage', handleStorage);
      window.addEventListener('oneclickbiz_profile_updated', handleStorage as EventListener);
      return () => {
        window.removeEventListener('storage', handleStorage);
        window.removeEventListener('oneclickbiz_profile_updated', handleStorage as EventListener);
      };
    }
  }, [propProfile?.slug, isMockup]);

  const profile = (!isMockup && customProfile) 
    ? { ...propProfile, ...customProfile, ...(propProfile.avatarUrl ? { avatarUrl: propProfile.avatarUrl } : {}) } 
    : propProfile;

  // Cart & Modals State
  const [cart, setCart] = useState<OrderCartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('INR');
  const [dynamicTestimonials, setDynamicTestimonials] = useState<TestimonialItem[] | null>(null);
  const [activeGalleryItem, setActiveGalleryItem] = useState<GalleryItem | null>(null);
  const [cardGalleryFilter, setCardGalleryFilter] = useState<string>('All');
  const [activeBlogPost, setActiveBlogPost] = useState<BlogPostItem | null>(null);
  const [isUPIModalOpen, setIsUPIModalOpen] = useState(false);
  const [quoteServices, setQuoteServices] = useState<ServiceItem[]>([]);
  const [bookingService, setBookingService] = useState<ServiceItem | null>(null);

  // Booking Form State
  const [bookingDate, setBookingDate] = useState('2026-09-15');
  const [bookingTime, setBookingTime] = useState('14:00');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [confirmedBookingData, setConfirmedBookingData] = useState<{
    service: ServiceItem;
    date: string;
    time: string;
    name: string;
    email: string;
    phone: string;
  } | null>(null);

  // Lead Form State
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadMessage, setLeadMessage] = useState('');
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!profile) return null;

  // If card's annual subscription is unpaid, expired, cancelled, or unpublished, show the Inactive/Expired Screen
  if (!isMockup && (profile.isExpired || profile.subscriptionStatus === 'EXPIRED' || profile.subscriptionStatus === 'CANCELLED' || profile.subscriptionStatus === 'UNPAID' || profile.isPublished === false)) {
    const isUnpaid = profile.subscriptionStatus === 'UNPAID' || profile.isPublished === false;

    return (
      <div className="w-full max-w-md mx-auto p-6 rounded-3xl bg-slate-900/95 border border-rose-500/30 shadow-2xl backdrop-blur-xl text-center space-y-6 animate-in fade-in duration-300">
        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-rose-500/40 shadow-lg relative">
          <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover grayscale" />
          <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
            <Clock className="w-8 h-8 text-rose-400 animate-pulse" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider">
            {isUnpaid ? 'Card Inactive • Plan Payment Required' : 'Card Inactive • Annual Cycle Ended'}
          </div>
          <h2 className="text-xl font-extrabold text-white">{profile.name}</h2>
          <p className="text-xs text-slate-400 font-medium">{profile.designation} • {profile.company}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2 text-left">
          <p className="font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
            {isUnpaid ? 'Annual Plan Activation Required' : '1-Year Subscription Concluded'}
          </p>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            {isUnpaid
              ? 'This digital business card has not been activated. A verified annual plan payment processed via Cashfree is strictly required before this profile, WhatsApp store, and NFC links can go live.'
              : 'This digital business card has completed its annual cycle. All profile interactions, lead capture, and NFC links are temporarily paused until renewed.'}
          </p>
        </div>

        {/* Card Owner Action */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-indigo-950/40 to-slate-950 border border-indigo-500/30 space-y-3">
          <span className="text-xs font-bold text-indigo-300 block">Are you the card owner?</span>
          <p className="text-[11px] text-slate-400">
            {isUnpaid
              ? 'Sign in to your account and select your preferred plan (Basic, Pro, Advanced) to complete payment via Cashfree for immediate card publishing.'
              : 'Log in to your dashboard to renew your 1-Year subscription via our secure online payment gateway for immediate reactivation.'}
          </p>
          <a
            href={isUnpaid ? '/login?redirect=/dashboard/settings?checkout=true' : '/dashboard'}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-rose-600/25 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <CreditCard className="w-4 h-4" />
            <span>{isUnpaid ? 'Activate Plan Online' : 'Renew Subscription Online'}</span>
          </a>
        </div>

        <p className="text-[10px] text-slate-500">
          Strict Online Payment Policy: All annual plans and renewals must be processed directly on oneclickbiz.in. Offline and direct payments are strictly prohibited.
        </p>
      </div>
    );
  }

  // Cart operations
  const addToCart = (product: ProductItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as OrderCartItem[];
    });
  };

  const formatPrice = (inrPrice: number, curr: CurrencyCode = selectedCurrency) => {
    const conf = CURRENCY_CONFIG[curr] || CURRENCY_CONFIG.INR;
    if (curr === 'INR') return `${conf.symbol}${inrPrice}`;
    const converted = Math.max(1, Math.round(inrPrice * conf.rate));
    return `${conf.symbol}${converted}`;
  };

  const totalConvertedPrice = cart.reduce((sum, item) => {
    const conf = CURRENCY_CONFIG[selectedCurrency] || CURRENCY_CONFIG.INR;
    const singlePrice = selectedCurrency === 'INR' ? item.product.price : Math.max(1, Math.round(item.product.price * conf.rate));
    return sum + singlePrice * item.quantity;
  }, 0);

  const getCleanWhatsAppNumber = (p: DigitalProfile) => {
    let raw = (p.whatsapp || '').trim();
    // If whatsapp is empty or equals default placeholder, prioritize custom phone
    if (!raw || raw === '916304989071' || raw === '919876543210' || raw === '+91 63049 89071') {
      if (p.phone && p.phone.trim() && p.phone !== '+91 63049 89071' && p.phone !== '+91 98765 43210') {
        raw = p.phone.trim();
      }
    }
    // If still empty or default, check socials
    if ((!raw || raw === '916304989071' || raw === '919876543210') && p.sectionData?.socials?.items) {
      const waSoc = p.sectionData.socials.items.find(s => s.platform === 'whatsapp');
      if (waSoc?.url && !waSoc.url.includes('916304989071') && !waSoc.url.includes('919876543210')) {
        const match = waSoc.url.match(/\d+/g);
        if (match) raw = match.join('');
      }
    }
    let digits = (raw || p.whatsapp || p.phone || '916304989071').replace(/\D/g, '');
    if (digits.length === 10) {
      digits = `91${digits}`;
    } else if (digits.length === 11 && digits.startsWith('0')) {
      digits = `91${digits.slice(1)}`;
    }
    return digits || '916304989071';
  };

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    const currSymbol = CURRENCY_CONFIG[selectedCurrency].symbol;
    const itemsList = cart.map(item => {
      const singlePrice = formatPrice(item.product.price, selectedCurrency);
      return `• ${item.product.name} (x${item.quantity}) - ${singlePrice}`;
    }).join('\n');
    const message = `Hello ${profile.name}! 👋\n\nI would like to place an order from your OneClickBiz digital store:\n\n${itemsList}\n\n*Total Amount:* ${currSymbol}${totalConvertedPrice}\n*Currency:* ${selectedCurrency}\n\nPlease confirm availability and payment details. Thank you!`;
    const encoded = encodeURIComponent(message);
    const whatsappNum = getCleanWhatsAppNumber(profile);
    window.open(`https://wa.me/${whatsappNum}?text=${encoded}`, '_blank');
  };

  const toggleQuoteService = (srv: ServiceItem) => {
    setQuoteServices(prev => {
      const exists = prev.some(s => s.id === srv.id);
      if (exists) {
        return prev.filter(s => s.id !== srv.id);
      } else {
        return [...prev, srv];
      }
    });
  };

  const sendWhatsAppQuotation = () => {
    if (quoteServices.length === 0) return;
    const itemsList = quoteServices.map(s => `• ${s.title} - ${s.currency || '₹'}${s.price.toLocaleString()}`).join('\n');
    const total = quoteServices.reduce((sum, s) => sum + (s.price || 0), 0);
    const msg = `Hello ${profile.name}! 👋\n\nI would like an official quotation / estimate for the following services from your OneClickBiz smart profile:\n\n${itemsList}\n\n*Estimated Total:* ₹${total.toLocaleString()}\n\nPlease share detailed package scope, availability, and next steps. Thank you!`;
    const encoded = encodeURIComponent(msg);
    const whatsappNum = getCleanWhatsAppNumber(profile);
    window.open(`https://wa.me/${whatsappNum}?text=${encoded}`, '_blank');
  };

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const trackAction = (eventType: string) => {
    if (profile.slug && !isMockup && typeof window !== 'undefined') {
      try {
        fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug: profile.slug, eventType })
        }).catch(() => {});
      } catch {}
    }
  };

  const handleBookingConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingService) return;
    
    // Save to local storage for dashboard sync
    try {
      const stored = localStorage.getItem('oneclickbiz_user_bookings');
      const existing = stored ? JSON.parse(stored) : [];
      const newBooking = {
        id: `bk_${Date.now()}`,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        customerPhone: customerPhone.trim(),
        serviceId: bookingService.id,
        serviceTitle: bookingService.title,
        date: bookingDate,
        time: bookingTime,
        status: 'PENDING',
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('oneclickbiz_user_bookings', JSON.stringify([newBooking, ...existing]));
    } catch (err) {
      console.error('Error saving booking to localStorage:', err);
    }

    if (onBookingSubmit) {
      onBookingSubmit(bookingService, bookingDate, bookingTime, customerName, customerEmail, customerPhone);
    }

    setConfirmedBookingData({
      service: bookingService,
      date: bookingDate,
      time: bookingTime,
      name: customerName,
      email: customerEmail,
      phone: customerPhone
    });
    setBookingSuccess(true);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLeadSubmit) {
      onLeadSubmit(leadName, leadEmail, leadPhone, leadMessage);
    }
    setLeadSuccess(true);
    setLeadName('');
    setLeadEmail('');
    setLeadPhone('');
    setLeadMessage('');
    setTimeout(() => setLeadSuccess(false), 3000);
  };

  // Theme Styles Selector
  const getThemeStyles = () => {
    switch (profile.theme) {
      case 'obsidian-gold':
      case 'dark-onyx':
        return {
          bg: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black text-white',
          card: 'bg-zinc-900/95 backdrop-blur-xl border border-amber-500/30 text-zinc-100 shadow-2xl shadow-amber-500/5',
          accent: 'from-amber-400 via-yellow-500 to-amber-600',
          accentText: 'text-amber-300 font-semibold',
          buttonPrimary: 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/20 hover:from-amber-300 hover:to-amber-500 hover:scale-[1.02] active:scale-95 transition-all',
          buttonSecondary: 'bg-zinc-850 border border-amber-500/20 text-zinc-200 hover:bg-zinc-800 hover:text-white',
          badge: 'bg-gradient-to-r from-amber-500/15 to-yellow-500/10 text-amber-300 border border-amber-500/30 shadow-sm font-semibold',
          border: 'border-amber-500/25',
          avatarRing: 'ring-4 ring-amber-400/40 shadow-amber-500/20'
        };
      case 'emerald-pro':
        return {
          bg: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/80 via-slate-950 to-zinc-950 text-white',
          card: 'bg-slate-900/95 backdrop-blur-xl border border-emerald-500/30 text-slate-100 shadow-2xl shadow-emerald-500/5',
          accent: 'from-emerald-400 via-teal-500 to-emerald-600',
          accentText: 'text-emerald-300 font-semibold',
          buttonPrimary: 'bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 hover:from-emerald-300 hover:to-emerald-500 hover:scale-[1.02] active:scale-95 transition-all',
          buttonSecondary: 'bg-slate-850 border border-emerald-500/20 text-slate-200 hover:bg-slate-800 hover:text-white',
          badge: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm font-semibold',
          border: 'border-emerald-500/25',
          avatarRing: 'ring-4 ring-emerald-400/40 shadow-emerald-500/20'
        };
      case 'sunset-gold':
        return {
          bg: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-950/70 via-stone-950 to-black text-white',
          card: 'bg-stone-900/95 backdrop-blur-xl border border-rose-500/30 text-stone-100 shadow-2xl shadow-rose-500/5',
          accent: 'from-rose-400 via-orange-500 to-amber-500',
          accentText: 'text-rose-300 font-semibold',
          buttonPrimary: 'bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 text-white font-bold shadow-lg shadow-rose-500/25 hover:opacity-95 hover:scale-[1.02] active:scale-95 transition-all',
          buttonSecondary: 'bg-stone-850 border border-rose-500/20 text-stone-200 hover:bg-stone-800 hover:text-white',
          badge: 'bg-rose-500/15 text-rose-300 border border-rose-500/30 shadow-sm font-semibold',
          border: 'border-rose-500/25',
          avatarRing: 'ring-4 ring-rose-400/40 shadow-rose-500/20'
        };
      case 'royal-navy':
        return {
          bg: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950 via-slate-950 to-black text-white',
          card: 'bg-slate-900/95 backdrop-blur-xl border border-sky-500/30 text-slate-100 shadow-2xl shadow-sky-500/5',
          accent: 'from-sky-400 via-blue-500 to-indigo-600',
          accentText: 'text-sky-300 font-semibold',
          buttonPrimary: 'bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-white font-bold shadow-lg shadow-sky-500/20 hover:opacity-95 hover:scale-[1.02] active:scale-95 transition-all',
          buttonSecondary: 'bg-slate-850 border border-sky-500/20 text-slate-200 hover:bg-slate-800 hover:text-white',
          badge: 'bg-sky-500/15 text-sky-300 border border-sky-500/30 shadow-sm font-semibold',
          border: 'border-sky-500/25',
          avatarRing: 'ring-4 ring-sky-400/40 shadow-sky-500/20'
        };
      case 'cyber-neon':
        return {
          bg: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fuchsia-950/70 via-slate-950 to-black text-white',
          card: 'bg-slate-900/95 backdrop-blur-xl border border-cyan-500/40 text-slate-100 shadow-2xl shadow-cyan-500/10',
          accent: 'from-cyan-400 via-fuchsia-500 to-pink-500',
          accentText: 'text-cyan-300 font-bold',
          buttonPrimary: 'bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-pink-500 text-slate-950 font-black shadow-lg shadow-cyan-500/25 hover:opacity-95 hover:scale-[1.02] active:scale-95 transition-all',
          buttonSecondary: 'bg-slate-850 border border-cyan-500/20 text-cyan-200 hover:bg-slate-800 hover:text-white',
          badge: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm font-semibold',
          border: 'border-cyan-500/30',
          avatarRing: 'ring-4 ring-cyan-400/50 shadow-cyan-500/30'
        };
      case 'glassmorphic':
        return {
          bg: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/90 via-slate-950 to-purple-950 text-white',
          card: 'bg-white/10 backdrop-blur-2xl border border-white/25 text-white shadow-2xl shadow-indigo-500/10',
          accent: 'from-cyan-300 via-indigo-400 to-pink-400',
          accentText: 'text-cyan-300 font-bold',
          buttonPrimary: 'bg-gradient-to-r from-cyan-400 via-indigo-500 to-pink-500 text-slate-950 font-extrabold shadow-xl hover:opacity-95 hover:scale-[1.02] active:scale-95 transition-all',
          buttonSecondary: 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/15',
          badge: 'bg-white/15 text-cyan-200 border border-white/25 shadow-sm font-semibold backdrop-blur-md',
          border: 'border-white/20',
          avatarRing: 'ring-4 ring-white/40 shadow-indigo-500/30'
        };
      case 'modern-indigo':
      default:
        return {
          bg: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/80 via-slate-900 to-slate-950 text-slate-100',
          card: 'bg-slate-850/95 backdrop-blur-xl border border-indigo-500/30 text-white shadow-2xl shadow-indigo-500/10',
          accent: 'from-indigo-400 via-purple-500 to-pink-500',
          accentText: 'text-indigo-300 font-semibold',
          buttonPrimary: 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold shadow-lg shadow-indigo-500/25 hover:opacity-95 hover:scale-[1.02] active:scale-95 transition-all',
          buttonSecondary: 'bg-slate-750/90 border border-indigo-500/20 text-slate-200 hover:bg-slate-700 hover:text-white',
          badge: 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 shadow-sm font-semibold',
          border: 'border-indigo-500/25',
          avatarRing: 'ring-4 ring-indigo-400/40 shadow-indigo-500/20'
        };
    }
  };

  const theme = getThemeStyles();
  const sortedSections = [...(profile.sections || [])].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className={`w-full max-w-md mx-auto ${theme.bg} min-h-screen relative font-sans transition-all duration-300 pb-20 shadow-2xl ${isMockup ? 'rounded-[36px] overflow-hidden' : ''}`}>
      
      {/* Top Cover Image */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-800">
        <img 
          src={profile.coverUrl} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
        
        {/* Floating Quick Action Bar */}
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <button 
            onClick={() => setIsQrOpen(true)}
            className="p-2.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-all border border-white/20 shadow-lg"
            title="Scan QR Code"
          >
            <QrCode className="w-4 h-4" />
          </button>
          <button 
            onClick={handleShare}
            className="p-2.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-all border border-white/20 shadow-lg"
            title="Share Profile"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Profile Info Container */}
      <div className="px-5 -mt-16 relative z-10 space-y-6">
        
        {/* Avatar & Header */}
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className={`w-28 h-28 rounded-full overflow-hidden border-4 border-slate-900 shadow-2xl ${theme.avatarRing || 'ring-2 ring-indigo-500/50'}`}>
              <img 
                src={profile.avatarUrl} 
                alt={profile.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-white flex items-center gap-1.5">
            {profile.name}
          </h1>
          <p className="text-sm font-medium text-slate-300 mt-0.5">{profile.designation}</p>
          {profile.company && (
            <p className={`text-xs font-semibold ${theme.accentText} mt-0.5`}>{profile.company}</p>
          )}

          {/* Action CTA Buttons: Save Contact & WhatsApp */}
          <div className="grid grid-cols-2 gap-2.5 w-full mt-5">
            <button 
              onClick={() => {
                trackAction('contact_download');
                downloadVcfFile(profile);
              }}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl ${theme.buttonPrimary} shadow-lg font-medium text-xs transition-all active:scale-95`}
            >
              <Download className="w-4 h-4" />
              Save Contact
            </button>
            <a 
              href={`https://wa.me/${getCleanWhatsAppNumber(profile)}?text=Hi%20${encodeURIComponent(profile.name)},%20I%20came%20across%20your%20OneClickBiz%20profile!`}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackAction('whatsapp_click')}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg font-medium text-xs transition-all active:scale-95"
            >
              <SocialIcon platform="whatsapp" size={16} colored={false} className="text-white" />
              WhatsApp
            </a>
          </div>

          {/* Quick Contact Chips */}
          <div className="grid grid-cols-4 gap-2 w-full mt-3">
            {profile.phone && (
              <a 
                href={`tel:${profile.phone}`} 
                onClick={() => trackAction('phone_click')}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl ${theme.card} hover:scale-105 transition-all text-xs text-slate-300`}
              >
                <Phone className="w-4 h-4 mb-1 text-sky-400" />
                <span className="text-[10px]">Call</span>
              </a>
            )}
            {profile.email && (
              <a href={`mailto:${profile.email}`} className={`flex flex-col items-center justify-center p-2.5 rounded-xl ${theme.card} hover:scale-105 transition-all text-xs text-slate-300`}>
                <Mail className="w-4 h-4 mb-1 text-rose-400" />
                <span className="text-[10px]">Email</span>
              </a>
            )}
            {profile.website && (
              <a 
                href={profile.website} 
                target="_blank" 
                rel="noreferrer" 
                onClick={() => trackAction('website_click')}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl ${theme.card} hover:scale-105 transition-all text-xs text-slate-300`}
              >
                <Globe className="w-4 h-4 mb-1 text-emerald-400" />
                <span className="text-[10px]">Web</span>
              </a>
            )}
            {profile.address && (
              <a href={`https://maps.google.com/?q=${encodeURIComponent(profile.address)}`} target="_blank" rel="noreferrer" className={`flex flex-col items-center justify-center p-2.5 rounded-xl ${theme.card} hover:scale-105 transition-all text-xs text-slate-300`}>
                <MapPin className="w-4 h-4 mb-1 text-amber-400" />
                <span className="text-[10px]">Map</span>
              </a>
            )}
          </div>

          {/* Instant UPI Payment & Google 5-Star Review Booster */}
          <div className="grid grid-cols-2 gap-2 w-full mt-3">
            <button
              type="button"
              onClick={() => {
                trackAction('upi_pay_click');
                setIsUPIModalOpen(true);
              }}
              className="p-3 rounded-2xl bg-gradient-to-tr from-emerald-950/70 via-slate-900 to-slate-950 border border-emerald-500/40 hover:border-emerald-400 text-left transition-all active:scale-95 shadow-lg group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  0% Fee UPI
                </span>
                <Smartphone className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition" />
              </div>
              <div className="text-xs font-bold text-white flex items-center gap-1">
                <span>⚡ Pay via UPI</span>
              </div>
              <p className="text-[9px] text-slate-400 mt-0.5">GPay • PhonePe • Paytm</p>
            </button>

            <a
              href={profile.googleReviewUrl || `https://www.google.com/search?q=${encodeURIComponent(`${profile.company || profile.name} reviews`)}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackAction('google_review_click')}
              className="p-3 rounded-2xl bg-gradient-to-tr from-amber-950/60 via-slate-900 to-slate-950 border border-amber-500/40 hover:border-amber-400 text-left transition-all active:scale-95 shadow-lg group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-0.5 text-amber-400 text-[10px] tracking-tighter">
                  {'★★★★★'}
                </div>
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 group-hover:scale-110 transition" />
              </div>
              <div className="text-xs font-bold text-white flex items-center gap-1">
                <span>⭐ 5-Star Review</span>
              </div>
              <p className="text-[9px] text-slate-400 mt-0.5">Rate us on Google</p>
            </a>
          </div>
        </div>

        {/* Dynamic Profile Sections */}
        {sortedSections.map(sec => {
          if (!sec.isVisible) return null;

          switch (sec.type) {
            case 'about':
              return profile.sectionData.about?.content ? (
                <div key={sec.id} className={`p-4 rounded-2xl ${theme.card}`}>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    {sec.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-200">
                    {profile.sectionData.about.content}
                  </p>
                </div>
              ) : null;

            case 'socials':
              return profile.sectionData.socials?.items?.length ? (
                <div key={sec.id} className={`p-4 rounded-2xl ${theme.card}`}>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                    <span>Connect With Me</span>
                    <span className="text-[10px] text-slate-500 font-normal">Social Channels</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {profile.sectionData.socials.items.map(s => {
                      const brand = getSocialBrandColor(s.platform, s.url);
                      return (
                        <a 
                          key={s.id}
                          href={
                            s.platform === 'whatsapp'
                              ? `https://wa.me/${getCleanWhatsAppNumber(profile)}`
                              : s.platform === 'phone'
                              ? `tel:${profile.phone ? profile.phone.replace(/[^\d+]/g, '') : '+916304989071'}`
                              : s.url
                          }
                          target="_blank"
                          rel="noreferrer"
                          className={`px-3 py-2.5 rounded-xl ${brand.bg} ${brand.border} border text-xs font-semibold flex items-center justify-between gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-sm ${brand.glow} group`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <SocialIcon platform={s.platform} url={s.url} size={17} />
                            <span className="text-white text-xs font-medium truncate group-hover:text-white transition-colors">
                              {s.label || s.platform}
                            </span>
                          </div>
                          <ExternalLink className="w-3 h-3 text-slate-400 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              ) : null;

            case 'services':
            case 'booking':
              return profile.sectionData.services?.items?.length ? (
                <div key={sec.id} className={`p-4 rounded-2xl ${theme.card}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" />
                      {sec.title || 'Book an Appointment'}
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      Live Scheduling
                    </span>
                  </div>
                  <div className="space-y-3">
                    {profile.sectionData.services.items.map(srv => (
                      <div key={srv.id} className="p-3 rounded-xl bg-slate-950/40 border border-slate-700/50 flex flex-col justify-between hover:border-purple-500/30 transition">
                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-semibold text-white">{srv.title}</h4>
                            <span className="text-xs font-bold text-emerald-400">{srv.currency}{srv.price}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1">{srv.description}</p>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800 gap-2">
                          <span className="text-[10px] text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-purple-400" />
                            {srv.durationMinutes} Mins
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => toggleQuoteService(srv)}
                              className={`px-2.5 py-1.5 rounded-lg text-[10px] font-semibold flex items-center gap-1 border transition active:scale-95 ${
                                quoteServices.some(s => s.id === srv.id)
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
                              }`}
                            >
                              {quoteServices.some(s => s.id === srv.id) ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span>In Quote</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3 h-3" />
                                  <span>Add Quote</span>
                                </>
                              )}
                            </button>
                            <button 
                              onClick={() => {
                                setBookingService(srv);
                                setBookingSuccess(false);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white text-[10px] font-semibold flex items-center gap-1 shadow transition active:scale-95"
                            >
                              <span>Book Slot</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null;

            case 'products':
              return profile.sectionData.products?.items?.length ? (
                <div key={sec.id} className={`p-4 rounded-2xl ${theme.card}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-pink-400" />
                      <span>{sec.title}</span>
                    </h3>

                    {/* Multi-Currency Selector */}
                    <div className="flex items-center gap-1 bg-slate-950/80 p-0.5 rounded-lg border border-slate-800">
                      {(['INR', 'USD', 'EUR', 'AED'] as CurrencyCode[]).map(curr => (
                        <button
                          key={curr}
                          onClick={() => setSelectedCurrency(curr)}
                          className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition ${
                            selectedCurrency === curr
                              ? 'bg-emerald-600 text-white shadow'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {curr}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {profile.sectionData.products.items.map(prod => (
                      <div key={prod.id} className="rounded-xl overflow-hidden bg-slate-950/50 border border-slate-700/50 flex flex-col">
                        <div className="h-28 w-full overflow-hidden bg-slate-800 relative">
                          <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" />
                          <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-bold text-emerald-300 border border-emerald-500/20">
                            {formatPrice(prod.price, selectedCurrency)}
                          </span>
                        </div>
                        <div className="p-2.5 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-[11px] font-semibold text-white line-clamp-1">{prod.name}</h4>
                            <p className="text-[9px] text-slate-400 line-clamp-2 mt-0.5">{prod.description}</p>
                          </div>
                          <button 
                            onClick={() => addToCart(prod)}
                            className="mt-2 w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-medium flex items-center justify-center gap-1 active:scale-95 transition-all"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add • {formatPrice(prod.price, selectedCurrency)}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null;

            case 'videos':
              return profile.sectionData.videos?.items?.length ? (
                <div key={sec.id} className={`p-4 rounded-2xl ${theme.card} space-y-3`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Film className="w-3.5 h-3.5 text-indigo-400" />
                      {sec.title}
                    </h3>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {profile.sectionData.videos.items.length} {profile.sectionData.videos.items.length === 1 ? 'Video' : 'Videos'}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {profile.sectionData.videos.items.map((vid) => {
                      const embedSrc = getEmbedUrl(vid);
                      const isYouTube = vid.type === 'youtube' || embedSrc.includes('youtube.com/embed') || (vid.url && (vid.url.includes('youtu.be') || vid.url.includes('youtube')));
                      const isInstagram = vid.type === 'instagram' || embedSrc.includes('instagram.com') || (vid.url && vid.url.includes('instagram.com'));

                      return (
                        <div key={vid.id} className="rounded-2xl overflow-hidden bg-slate-950/80 border border-slate-800 shadow-md">
                          {/* Video Player Render */}
                          {isYouTube && (
                            <div className="relative w-full aspect-video bg-slate-950">
                              <iframe
                                src={embedSrc}
                                title={vid.title || 'YouTube Video'}
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          )}

                          {!isYouTube && isInstagram && (
                            <div className="relative w-full bg-slate-950 flex flex-col items-center">
                              {embedSrc.includes('instagram.com') ? (
                                <div className="w-full aspect-[9/16] max-h-[460px] bg-slate-950 overflow-hidden relative">
                                  <iframe
                                    src={embedSrc}
                                    title={vid.title || 'Instagram Reel'}
                                    className="w-full h-full border-0"
                                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                                    allowFullScreen
                                    loading="lazy"
                                  />
                                </div>
                              ) : null}
                              <div className="w-full p-3 bg-gradient-to-r from-purple-950/40 via-pink-950/30 to-slate-950 border-t border-slate-800 flex items-center justify-between px-4">
                                <span className="text-xs text-pink-300 font-semibold flex items-center gap-1.5">
                                  <Film className="w-3.5 h-3.5 text-pink-400" />
                                  Instagram Reel
                                </span>
                                <a 
                                  href={vid.url} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-[11px] font-semibold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                                >
                                  <span>Watch on Instagram</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                          )}

                          {!isYouTube && !isInstagram && (
                            <div className="relative w-full bg-slate-950">
                              <video 
                                src={vid.url} 
                                controls 
                                playsInline 
                                preload="metadata" 
                                className="w-full max-h-72 object-cover"
                              />
                            </div>
                          )}

                          {/* Video Info Footer */}
                          <div className="p-3 space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="text-xs font-bold text-white line-clamp-1">{vid.title}</h4>
                              <span className={`text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded ${
                                isYouTube ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                isInstagram ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' :
                                'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                              }`}>
                                {isYouTube ? 'YouTube' : isInstagram ? 'Instagram' : 'MP4 Video'}
                              </span>
                            </div>
                            {vid.caption && (
                              <p className="text-[11px] text-slate-400 leading-relaxed">{vid.caption}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null;

            case 'blogs':
              return profile.sectionData.blogs?.items?.length ? (
                <div key={sec.id} className={`p-4 rounded-2xl ${theme.card} space-y-3`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                      {sec.title}
                    </h3>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {profile.sectionData.blogs.items.length} {profile.sectionData.blogs.items.length === 1 ? 'Article' : 'Articles'}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {profile.sectionData.blogs.items.filter(b => b.isPublished !== false).map((blog) => (
                      <div 
                        key={blog.id} 
                        onClick={() => setActiveBlogPost(blog)}
                        className="group p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-indigo-500/50 transition-all cursor-pointer space-y-2 shadow-md hover:-translate-y-0.5 duration-200"
                      >
                        {blog.coverImage && (
                          <div className="w-full h-32 rounded-xl overflow-hidden relative shadow">
                            <img 
                              src={blog.coverImage} 
                              alt={blog.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-2 left-2">
                              <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[9px] font-bold text-amber-300 border border-white/10">
                                {blog.category}
                              </span>
                            </div>
                            <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-[9px] text-slate-300 flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5 text-indigo-400" />
                              <span>{blog.readTimeMinutes} min</span>
                            </div>
                          </div>
                        )}

                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[10px] text-slate-400">
                            <span>{blog.publishedAt}</span>
                            <span>{blog.authorName || profile.name}</span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                            {blog.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                            {blog.excerpt}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-1 text-[11px] font-semibold text-indigo-400">
                          <span className="flex items-center gap-1">
                            <span>Read Article</span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null;

            case 'gallery': {
              const galleryItems = profile.sectionData.gallery?.items || [];
              if (!galleryItems.length) return null;

              const categories = Array.from(new Set(galleryItems.map(g => g.category).filter(Boolean))) as string[];
              const filteredGallery = cardGalleryFilter === 'All' 
                ? galleryItems 
                : galleryItems.filter(g => g.category === cardGalleryFilter);

              return (
                <div key={sec.id} className={`p-4 rounded-2xl ${theme.card} space-y-3`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-indigo-400" />
                      {sec.title}
                    </h3>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {filteredGallery.length} / {galleryItems.length} {galleryItems.length === 1 ? 'Photo' : 'Photos'}
                    </span>
                  </div>

                  {/* Interactive Category Filter Pills */}
                  {categories.length > 1 && (
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      <button
                        type="button"
                        onClick={() => setCardGalleryFilter('All')}
                        className={`px-2.5 py-1 rounded-xl text-[10px] font-bold shrink-0 transition-all ${
                          cardGalleryFilter === 'All'
                            ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-400'
                            : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        All ({galleryItems.length})
                      </button>
                      {categories.map((cat) => {
                        const count = galleryItems.filter(g => g.category === cat).length;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setCardGalleryFilter(cat)}
                            className={`px-2.5 py-1 rounded-xl text-[10px] font-bold shrink-0 transition-all ${
                              cardGalleryFilter === cat
                                ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-400'
                                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                            }`}
                          >
                            {cat} ({count})
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2.5">
                    {filteredGallery.map((img) => (
                      <div 
                        key={img.id} 
                        onClick={() => setActiveGalleryItem(img)}
                        className="group relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 cursor-pointer aspect-square shadow-md hover:border-indigo-500/50 transition-all duration-300"
                      >
                        <img 
                          src={img.imageUrl} 
                          alt={img.title || 'Portfolio Showcase'} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" 
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity p-2.5 flex flex-col justify-end">
                          {img.category && (
                            <span className="text-[9px] font-bold text-indigo-300 uppercase tracking-wider">
                              {img.category}
                            </span>
                          )}
                          <p className="text-xs font-bold text-white line-clamp-1 group-hover:text-indigo-200 transition-colors">
                            {img.title || 'View Project'}
                          </p>
                        </div>
                        <div className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-950/70 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                          <Maximize2 className="w-3 h-3" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            case 'testimonials': {
              const activeList = dynamicTestimonials || profile.sectionData.testimonials?.items || [];
              return (
                <div key={sec.id} className={`p-4 rounded-2xl ${theme.card} space-y-3`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{sec.title}</span>
                    </h3>
                    <button
                      onClick={() => setIsReviewModalOpen(true)}
                      className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-[10px] font-bold border border-indigo-500/30 transition flex items-center gap-1"
                    >
                      <Plus className="w-2.5 h-2.5" />
                      <span>Write Review</span>
                    </button>
                  </div>
                  <div className="space-y-2.5">
                    {activeList.map(t => (
                      <div key={t.id} className="p-3 rounded-xl bg-slate-950/40 border border-slate-800">
                        <div className="flex items-center gap-2 mb-1.5">
                          {t.clientAvatar && (
                            <img src={t.clientAvatar} alt={t.clientName} className="w-6 h-6 rounded-full object-cover" />
                          )}
                          <div>
                            <p className="text-[11px] font-semibold text-white">{t.clientName}</p>
                            <p className="text-[9px] text-slate-400">{t.clientRole} {t.clientCompany ? `• ${t.clientCompany}` : ''}</p>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-300 italic">&ldquo;{t.content}&rdquo;</p>
                        <div className="flex items-center gap-0.5 mt-1.5">
                          {[...Array(t.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            case 'customLinks':
              return profile.sectionData.customLinks?.items?.length ? (
                <div key={sec.id} className={`p-4 rounded-2xl ${theme.card}`}>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    {sec.title}
                  </h3>
                  <div className="space-y-2">
                    {profile.sectionData.customLinks.items.map(link => (
                      <a 
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`w-full p-3 rounded-xl flex items-center justify-between text-xs font-medium transition-all ${
                          link.highlight 
                            ? `${theme.buttonPrimary} shadow-md` 
                            : `${theme.buttonSecondary}`
                        }`}
                      >
                        <span>{link.title}</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                      </a>
                    ))}
                  </div>
                </div>
              ) : null;

            case 'contact':
              return (
                <div key={sec.id} className={`p-4 rounded-2xl ${theme.card}`}>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Send a Message
                  </h3>
                  {leadSuccess ? (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs text-center flex items-center justify-center gap-1.5">
                      <Check className="w-4 h-4" /> Message sent successfully!
                    </div>
                  ) : (
                    <form onSubmit={handleLeadSubmit} className="space-y-2.5">
                      <input 
                        type="text" 
                        placeholder="Your Name" 
                        required
                        value={leadName}
                        onChange={e => setLeadName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        required
                        value={leadEmail}
                        onChange={e => setLeadEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                      <input 
                        type="tel" 
                        placeholder="Phone Number (Optional)" 
                        value={leadPhone}
                        onChange={e => setLeadPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                      <textarea 
                        rows={2} 
                        placeholder="Your inquiry message..." 
                        required
                        value={leadMessage}
                        onChange={e => setLeadMessage(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                      />
                      <button 
                        type="submit"
                        className={`w-full py-2.5 rounded-lg ${theme.buttonPrimary} text-xs font-semibold flex items-center justify-center gap-1.5 transition-all`}
                      >
                        <Send className="w-3 h-3" />
                        Send Direct Inquiry
                      </button>
                    </form>
                  )}
                </div>
              );

            default:
              return null;
          }
        })}

        {/* Footer Branding */}
        <div className="text-center pt-5 pb-3 px-4 space-y-1">
          <p className="text-[10px] text-slate-400 font-medium">
            © 2026 himastech. All rights reserved.
          </p>
          <p className="text-[9px] text-slate-500">
            Developed & Maintained by <span className="text-slate-400 font-semibold">Merlinflow Technologies Pvt Ltd</span>
          </p>
        </div>
      </div>

      {/* Floating Cart Button (when items exist in cart) */}
      {cart.length > 0 && (
        <button 
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-emerald-600 text-white shadow-2xl flex items-center gap-2.5 animate-bounce hover:bg-emerald-500 transition-all font-semibold text-xs border border-emerald-400/40"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{cart.reduce((s, i) => s + i.quantity, 0)} Items</span>
          <span className="font-bold bg-emerald-700 px-2 py-0.5 rounded-full text-[10px]">{CURRENCY_CONFIG[selectedCurrency].symbol}{totalConvertedPrice}</span>
        </button>
      )}

      {/* Slide-out WhatsApp Store Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl p-5 text-white shadow-2xl max-h-[85vh] flex flex-col animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm">Your WhatsApp Order</h3>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-1 rounded-full hover:bg-slate-800 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {cart.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-8">Your cart is currently empty.</p>
              ) : (
                cart.map(item => (
                  <div key={item.product.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <img src={item.product.imageUrl} alt={item.product.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <h4 className="text-xs font-semibold text-white line-clamp-1">{item.product.name}</h4>
                        <p className="text-[10px] text-emerald-400">{formatPrice(item.product.price * item.quantity, selectedCurrency)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.product.id, -1)} className="w-6 h-6 rounded-md bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-xs">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, 1)} className="w-6 h-6 rounded-md bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-xs">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-3 border-t border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Estimated Total:</span>
                  <span className="text-sm font-bold text-emerald-400">{CURRENCY_CONFIG[selectedCurrency].symbol}{totalConvertedPrice}</span>
                </div>
                <button 
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Order via WhatsApp Direct
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Appointment Booking Modal */}
      {bookingService && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl p-5 text-white shadow-2xl animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-sm">Book Appointment</h3>
              </div>
              <button onClick={() => setBookingService(null)} className="p-1 rounded-full hover:bg-slate-800 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            {bookingSuccess && confirmedBookingData ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto ring-4 ring-emerald-500/10">
                  <Check className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-white">Appointment Confirmed!</h4>
                  <p className="text-xs text-slate-300">
                    Slot for <strong className="text-white">{confirmedBookingData.service.title}</strong> booked for:
                  </p>
                  <p className="text-xs font-mono text-purple-300 font-semibold">
                    📅 {confirmedBookingData.date} at ⏰ {confirmedBookingData.time}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-left text-[11px] text-slate-400 space-y-1">
                  <p>👤 <strong>Client:</strong> {confirmedBookingData.name}</p>
                  <p>📞 <strong>Phone:</strong> {confirmedBookingData.phone}</p>
                  <p>✉️ <strong>Email:</strong> {confirmedBookingData.email}</p>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href={`https://wa.me/${getCleanWhatsAppNumber(profile)}?text=${encodeURIComponent(
                      `Hello ${profile.name}! 👋\n\nI just scheduled an appointment via your digital card:\n\n• *Service:* ${confirmedBookingData.service.title}\n• *Date & Time:* ${confirmedBookingData.date} at ${confirmedBookingData.time}\n• *Name:* ${confirmedBookingData.name}\n• *Phone:* ${confirmedBookingData.phone}\n• *Email:* ${confirmedBookingData.email}\n\nPlease confirm availability. Thank you!`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Confirmation via WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setBookingSuccess(false);
                      setBookingService(null);
                      setConfirmedBookingData(null);
                    }}
                    className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                  >
                    Done & Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingConfirm} className="py-4 space-y-3">
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <p className="text-xs font-semibold text-white">{bookingService.title}</p>
                  <p className="text-[10px] text-slate-400">{bookingService.durationMinutes} mins • {bookingService.currency}{bookingService.price}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400">Select Date</label>
                    <input 
                      type="date" 
                      value={bookingDate}
                      onChange={e => setBookingDate(e.target.value)}
                      required
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400">Select Slot</label>
                    <select 
                      value={bookingTime}
                      onChange={e => setBookingTime(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                    >
                      <option value="10:00">10:00 AM</option>
                      <option value="11:30">11:30 AM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:30">03:30 PM</option>
                      <option value="17:00">05:00 PM</option>
                    </select>
                  </div>
                </div>

                <input 
                  type="text" 
                  placeholder="Your Full Name" 
                  required
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-700 text-xs text-white"
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  required
                  value={customerEmail}
                  onChange={e => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-700 text-xs text-white"
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  required
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-700 text-xs text-white"
                />

                <button 
                  type="submit"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-lg mt-2"
                >
                  Confirm Appointment
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* QR Code Modal Popup */}
      {isQrOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xs bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white text-center shadow-2xl relative">
            <button onClick={() => setIsQrOpen(false)} className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-500 mx-auto mb-2 bg-slate-800 shadow-md">
              {profile.avatarUrl ? (
                <img 
                  src={profile.avatarUrl} 
                  alt={profile.name} 
                  key={profile.avatarUrl}
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-indigo-400 font-bold text-lg">
                  {profile.name?.charAt(0) || 'U'}
                </div>
              )}
            </div>
            <h3 className="font-bold text-sm">{profile.name}</h3>
            <p className="text-[10px] text-slate-400 mb-4">{profile.designation}</p>

            <div className="bg-white p-4 rounded-2xl mx-auto w-48 h-48 flex items-center justify-center shadow-inner relative">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(typeof window !== 'undefined' ? `${window.location.origin}/v/${profile.slug}` : `https://oneclickbiz.in/v/${profile.slug}`)}&color=0f172a`} 
                alt="QR Code" 
                className="w-full h-full"
              />
              {profile.avatarUrl && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white">
                    <img 
                      src={profile.avatarUrl} 
                      alt={profile.name} 
                      key={profile.avatarUrl}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
              )}
            </div>
            <p className="text-[10px] text-slate-400 mt-3">Scan to instantly open profile & save contact</p>
          </div>
        </div>
      )}

      {/* Portfolio Showcase Lightbox Modal */}
      {activeGalleryItem && (
        <div 
          onClick={() => setActiveGalleryItem(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden text-white shadow-2xl relative animate-in zoom-in-95 duration-200"
          >
            <button 
              onClick={() => setActiveGalleryItem(null)} 
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/80 text-white hover:bg-slate-800 transition-all border border-slate-700"
            >
              <X className="w-4 h-4" />
            </button>

            {/* High-res Image */}
            <div className="relative w-full aspect-[4/3] bg-slate-950 max-h-[380px] overflow-hidden">
              <img 
                src={activeGalleryItem.imageUrl} 
                alt={activeGalleryItem.title || 'Portfolio Item'} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Details */}
            <div className="p-5 space-y-2">
              <div className="flex items-center justify-between gap-2">
                {activeGalleryItem.category && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {activeGalleryItem.category}
                  </span>
                )}
                {activeGalleryItem.linkUrl && (
                  <a 
                    href={activeGalleryItem.linkUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium underline"
                  >
                    <span>View Live Project</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <h3 className="text-base font-bold text-white">{activeGalleryItem.title || 'Project Showcase'}</h3>
              {activeGalleryItem.description && (
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  {activeGalleryItem.description}
                </p>
              )}

              {(profile.whatsapp || profile.phone) && (
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${getCleanWhatsAppNumber(profile)}?text=${encodeURIComponent(`Hi ${profile.name}, I was viewing your portfolio project "${activeGalleryItem.title || 'Showcase'}" on your digital card. Could you please share photoshoot packages, pricing, and availability?`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire About This Project on WhatsApp</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Full Article Reader Modal for Profile Visitors */}
      {activeBlogPost && (
        <div 
          onClick={() => setActiveBlogPost(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden text-white shadow-2xl relative max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-200 p-6 sm:p-7 space-y-5"
          >
            <button 
              onClick={() => setActiveBlogPost(null)} 
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/80 text-white hover:bg-slate-800 transition-all border border-slate-700"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Category & Read Time */}
            <div className="flex items-center gap-2 pt-1">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                {activeBlogPost.category}
              </span>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                {activeBlogPost.readTimeMinutes} min read
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-black text-white leading-snug">
              {activeBlogPost.title}
            </h2>

            <div className="flex items-center justify-between border-y border-slate-800 py-2.5 text-xs text-slate-400">
              <span>Published {activeBlogPost.publishedAt}</span>
              <span>By {activeBlogPost.authorName || profile.name}</span>
            </div>

            {/* Cover Image */}
            {activeBlogPost.coverImage && (
              <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden shadow">
                <img src={activeBlogPost.coverImage} alt={activeBlogPost.title} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Excerpt */}
            <div className="p-3.5 rounded-xl bg-indigo-950/40 border-l-4 border-indigo-500 text-xs text-indigo-200 italic leading-relaxed">
              &ldquo;{activeBlogPost.excerpt}&rdquo;
            </div>

            {/* Body */}
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-3 font-sans">
              {activeBlogPost.content}
            </div>

            {/* WhatsApp Contact CTA */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 flex items-center justify-between gap-3 pt-3">
              <div className="text-[11px]">
                <p className="font-bold text-white">Want to discuss this topic?</p>
                <p className="text-slate-400">Message {profile.name} directly</p>
              </div>
              <a 
                href={`https://wa.me/${getCleanWhatsAppNumber(profile)}?text=${encodeURIComponent(`Hi ${profile.name}, I read your article "${activeBlogPost.title}" on your digital card.`)}`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Testimonial Submission Modal */}
      {isReviewModalOpen && (
        <TestimonialSubmitModal
          profileSlug={profile.slug}
          onClose={() => setIsReviewModalOpen(false)}
          onTestimonialAdded={(newReview) => {
            setDynamicTestimonials(prev => [newReview, ...(prev || profile.sectionData?.testimonials?.items || [])]);
          }}
        />
      )}

      {/* Multi-Channel Share Card Modal */}
      {isShareModalOpen && (
        <ShareCardModal
          profile={profile}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}

      {/* Sticky Bottom Multi-Service WhatsApp Quotation Drawer */}
      {quoteServices.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-sm px-3 animate-in slide-in-from-bottom-5 duration-300">
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border border-emerald-500/50 shadow-2xl backdrop-blur-xl flex items-center justify-between gap-3 text-white">
            <div className="space-y-0.5 overflow-hidden">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-black text-emerald-400">
                  {quoteServices.length} {quoteServices.length === 1 ? 'Service' : 'Services'} Selected
                </span>
              </div>
              <p className="text-[11px] font-bold text-white truncate">
                Total Estimate: ₹{quoteServices.reduce((acc, s) => acc + (s.price || 0), 0).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setQuoteServices([])}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800"
                title="Clear estimate"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={sendWhatsAppQuotation}
                className="px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs flex items-center gap-1 shadow-lg shadow-emerald-500/20 active:scale-95 transition"
              >
                <SocialIcon platform="whatsapp" size={14} colored={false} className="text-slate-950" />
                <span>Get Quote</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Direct 0% Fee Instant UPI Payment Modal */}
      <DirectUPIPaymentModal
        isOpen={isUPIModalOpen}
        onClose={() => setIsUPIModalOpen(false)}
        payeeName={profile.name}
        payeeVpa={profile.upiId || `${profile.whatsapp.replace(/\D/g, '') || 'merchant'}@upi`}
        businessName={profile.company || profile.name}
        defaultAmount={500}
      />

      {/* PWA "Add to Home Screen" Install Banner for Mobile Visitors */}
      {!isMockup && (
        <PWAInstallPrompt cardName={profile.name} avatarUrl={profile.avatarUrl} />
      )}
    </div>
  );
}

