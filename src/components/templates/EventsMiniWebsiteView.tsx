'use strict';
'use client';

import React, { useState, useMemo } from 'react';
import { 
  DigitalProfile, 
  ServiceItem, 
  ProductItem, 
  GalleryItem, 
  TestimonialItem,
  VideoItem,
  SocialLinkItem
} from '@/lib/types';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Share2, 
  Download, 
  Sparkles, 
  Calendar, 
  Camera, 
  Music, 
  Award, 
  CheckCircle, 
  Star, 
  Clock, 
  X, 
  Send, 
  ChevronRight, 
  Eye, 
  PartyPopper, 
  Video, 
  ShieldCheck,
  Heart,
  MessageCircle,
  ExternalLink,
  ArrowRight,
  Compass
} from 'lucide-react';
import SocialIcon, { getSocialBrandColor } from '@/components/common/SocialIcon';
import ShareCardModal from '@/components/common/ShareCardModal';

interface EventsMiniWebsiteViewProps {
  profile: DigitalProfile;
  getEmbedUrl?: (item: any) => string;
}

export default function EventsMiniWebsiteView({ profile, getEmbedUrl }: EventsMiniWebsiteViewProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'services' | 'packages' | 'gallery' | 'reviews'>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<ProductItem | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [quoteFormData, setQuoteFormData] = useState({
    name: '',
    phone: '',
    eventType: 'Wedding & Reception',
    eventDate: '',
    guestCount: '200 - 500 Guests',
    venueCity: '',
    notes: ''
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  // Trust Config
  const eventsConfig = profile.sectionData?.events || {};
  const specialization = eventsConfig.eventSpecialization || 'Destination Weddings & Luxury Celebrations';
  const eventsExecuted = eventsConfig.eventsExecuted || '350+ Celebrations Executed';
  const experienceYears = eventsConfig.experienceYears || '12+ Years';
  const productionCapability = eventsConfig.productionCapability || 'In-House Sound, 4K Drones & Stage Decor';
  const serviceLocations = eventsConfig.serviceLocations || 'Pan-India & Destination Weddings';

  // Clean phone and slug computation
  const cleanPhone = useMemo(() => {
    return (profile.whatsapp || profile.phone || '').replace(/[^0-9]/g, '');
  }, [profile.whatsapp, profile.phone]);

  const brandSlug = useMemo(() => {
    return (profile.name || 'events').toLowerCase().replace(/[^a-z0-9]/g, '');
  }, [profile.name]);

  // Socials from profile sectionData
  const userSocialItems: SocialLinkItem[] = useMemo(() => {
    return profile.sectionData?.socials?.items || [];
  }, [profile.sectionData?.socials?.items]);

  const getPlatformUrl = (platform: string, fallbackUrl?: string) => {
    const item = userSocialItems.find(s => s.platform.toLowerCase() === platform.toLowerCase());
    return item?.url || fallbackUrl || '';
  };

  // WhatsApp link (direct with pre-filled consultation request)
  const whatsappUrl = useMemo(() => {
    const custom = userSocialItems.find(s => s.platform.toLowerCase() === 'whatsapp');
    if (custom?.url) return custom.url;
    if (!cleanPhone) return '';
    const text = encodeURIComponent(
      `Hello ${profile.name || 'Events Team'}! I came across your Events Portfolio on OneClickBiz and would like to inquire about dates, availability, and event packages.`
    );
    return `https://wa.me/${cleanPhone}?text=${text}`;
  }, [userSocialItems, cleanPhone, profile.name]);

  // Instagram profile / reels link
  const instagramUrl = useMemo(() => {
    return getPlatformUrl('instagram', `https://instagram.com/${brandSlug}`);
  }, [userSocialItems, brandSlug]);

  // Facebook page link
  const facebookUrl = useMemo(() => {
    return getPlatformUrl('facebook', `https://facebook.com/${brandSlug}`);
  }, [userSocialItems, brandSlug]);

  // YouTube channel link
  const youtubeUrl = useMemo(() => {
    return getPlatformUrl('youtube', `https://youtube.com/@${brandSlug}`);
  }, [userSocialItems, brandSlug]);

  // Website link
  const websiteUrl = useMemo(() => {
    return profile.website || getPlatformUrl('website', '');
  }, [profile.website, userSocialItems]);

  // Phone call link
  const phoneUrl = useMemo(() => {
    return profile.phone ? `tel:${profile.phone}` : cleanPhone ? `tel:+${cleanPhone}` : '';
  }, [profile.phone, cleanPhone]);

  // Email link
  const emailUrl = useMemo(() => {
    if (!profile.email) return '';
    const subject = encodeURIComponent(`Event Inquiry - ${profile.name || 'Celebrations'}`);
    return `mailto:${profile.email}?subject=${subject}`;
  }, [profile.email, profile.name]);

  // Google Maps address link
  const mapsUrl = useMemo(() => {
    if (!profile.address) return '';
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profile.address)}`;
  }, [profile.address]);

  // Services & Packages
  const services: ServiceItem[] = profile.sectionData?.services?.items || [
    {
      id: 'evt_1',
      title: 'Complete Wedding Planning & Directing',
      category: 'Wedding Management',
      description: 'End-to-end wedding choreography, vendor coordination, hospitality, guest concierge & ritual planning.',
      price: 150000,
      currency: '₹',
      durationMinutes: 1440,
      isAvailable: true
    },
    {
      id: 'evt_2',
      title: 'Cinematic 4K Wedding Film & Candid Shoot',
      category: 'Photography & Films',
      description: 'Dual-camera candid photography, 4K aerial drone coverage, teaser film & hardcover coffee-table album.',
      price: 95000,
      currency: '₹',
      durationMinutes: 720,
      isAvailable: true
    },
    {
      id: 'evt_3',
      title: 'Luxury Stage, Mandap & Floral Decor',
      category: 'Theme Production',
      description: 'Bespoke floral mandap architecture, LED tunnel pathway, ambient stage lighting & fragrance staging.',
      price: 120000,
      currency: '₹',
      durationMinutes: 480,
      isAvailable: true
    },
    {
      id: 'evt_4',
      title: 'Sangeet Production & Celebrity DJ Sound',
      category: 'Entertainment & Audio',
      description: 'Concert-grade line array audio system, moving beam sharpies, cold pyros, dry ice & live percussionists.',
      price: 75000,
      currency: '₹',
      durationMinutes: 360,
      isAvailable: true
    }
  ];

  const packages: ProductItem[] = profile.sectionData?.products?.items || [
    {
      id: 'pkg_1',
      name: 'Grand Royal 3-Day Destination Wedding Package',
      description: 'Full decor & production for Mehendi, Sangeet, Muhurtham & Reception. 6-member cinematic crew, celebrity DJ setup & hospitality desk.',
      price: 499999,
      currency: '₹',
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      category: 'Complete Wedding',
      isAvailable: true
    },
    {
      id: 'pkg_2',
      name: 'Signature Candid & Cinematic Film Package',
      description: 'Pre-wedding couple shoot at exotic location, full wedding ceremony candid captures, drone aerials & 5-minute 4K cinematic highlight reel.',
      price: 149999,
      currency: '₹',
      imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      category: 'Photography',
      isAvailable: true
    },
    {
      id: 'pkg_3',
      name: 'Corporate Gala & Product Launch Set',
      description: 'High-impact curved LED backdrop screen, synchronized lighting, keynote presentation audio & VIP lounge setup.',
      price: 185000,
      currency: '₹',
      imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      category: 'Corporate',
      isAvailable: true
    }
  ];

  const galleryItems = (profile.sectionData?.gallery?.items || []).map(g => ({
    id: g.id,
    url: g.imageUrl || (g as any).url || '',
    caption: g.title || (g as any).caption || ''
  }));
  const displayGallery = galleryItems.length > 0 ? galleryItems : [
    {
      id: 'gal_1',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      caption: 'Royal Mandap & Floral Decor'
    },
    {
      id: 'gal_2',
      url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
      caption: 'Candid Moments & Vows'
    },
    {
      id: 'gal_3',
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
      caption: 'Sangeet Stage & Intelligent Lighting'
    },
    {
      id: 'gal_4',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      caption: 'Cinematic Pre-Wedding Sunset Shoot'
    }
  ];

  const testimonialItems = (profile.sectionData?.testimonials?.items || []).map(t => ({
    id: t.id,
    name: t.clientName || (t as any).name || '',
    role: t.clientRole || (t as any).role || '',
    comment: t.content || (t as any).comment || '',
    rating: t.rating || 5
  }));
  const displayTestimonials = testimonialItems.length > 0 ? testimonialItems : [
    {
      id: 't_1',
      name: 'Aditi & Rohan Sharma',
      role: 'Destination Wedding in Udaipur',
      comment: 'They turned our dream wedding into an absolute fairytale. From the royal palace lighting to the heartfelt candid film, every guest was left in awe!',
      rating: 5
    },
    {
      id: 't_2',
      name: 'Vikram Malhotra',
      role: 'VP Marketing, TechCorp Global',
      comment: 'Flawless execution for our annual leadership summit. The audiovisual production and stage management were world-class and punctual to the second.',
      rating: 5
    }
  ];

  const videos: VideoItem[] = profile.sectionData?.videos?.items || [];

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
    const whatsappText = encodeURIComponent(
      `🎉 *New Event Inquiry - ${profile.name || 'Studio'}*\n` +
      `👤 *Client:* ${quoteFormData.name}\n` +
      `📞 *Phone:* ${quoteFormData.phone}\n` +
      `💍 *Event Type:* ${quoteFormData.eventType}\n` +
      `📅 *Proposed Date:* ${quoteFormData.eventDate || 'Flexible'}\n` +
      `👥 *Estimated Guests:* ${quoteFormData.guestCount}\n` +
      `📍 *City/Venue:* ${quoteFormData.venueCity || 'Not specified'}\n` +
      `📝 *Notes:* ${quoteFormData.notes || 'None'}`
    );
    const phone = (profile.whatsapp || profile.phone || '').replace(/[^0-9]/g, '');
    if (phone) {
      window.open(`https://wa.me/${phone}?text=${whatsappText}`, '_blank');
    }
    setTimeout(() => {
      setQuoteSubmitted(false);
      setIsQuoteModalOpen(false);
    }, 2000);
  };

  const handleDownloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${profile.name || 'Event Specialist'}
ORG:${profile.company || 'Events & Creative Studio'}
TITLE:${profile.designation || 'Event Director'}
TEL:${profile.phone || ''}
EMAIL:${profile.email || ''}
URL:${typeof window !== 'undefined' ? window.location.href : ''}
NOTE:${profile.bio || specialization}
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${(profile.name || 'contact').replace(/\s+/g, '_')}_events.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#07060A] text-slate-100 font-sans antialiased selection:bg-violet-500 selection:text-white pb-24">
      {/* 1. TOP PRODUCTION TRUST STRIP */}
      <div className="bg-gradient-to-r from-violet-950/80 via-purple-900/60 to-violet-950/80 border-b border-violet-800/30 text-xs py-2 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 text-violet-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="font-semibold text-white tracking-wide">{specialization}</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-medium text-violet-300">
            <span className="hidden sm:inline-flex items-center gap-1">
              <PartyPopper className="w-3.5 h-3.5 text-amber-400" />
              {eventsExecuted}
            </span>
            <span className="inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-violet-300" />
              {productionCapability}
            </span>
          </div>
        </div>
      </div>

      {/* 2. HERO HEADER SECTION */}
      <header className="relative overflow-hidden pt-8 pb-12 px-4 border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left">
            {/* Avatar / Brand Crest */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl p-1 bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-amber-400 shadow-2xl shadow-violet-500/20">
                <img 
                  src={profile.avatarUrl || 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80'} 
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-[22px]"
                />
              </div>
              <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-violet-600 border border-violet-400 text-[10px] font-bold text-white shadow-lg flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                Featured
              </span>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/40">
                  {experienceYears} of Celebrations
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  4.95 Star Rated
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  📍 {serviceLocations}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {profile.name || 'Grand Celebrations Studio'}
              </h1>
              
              <p className="text-sm sm:text-base font-medium text-violet-300">
                {profile.designation || 'Lead Event Producer & Creative Director'}
                {profile.company ? ` • ${profile.company}` : ''}
              </p>

              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                {profile.bio || 'Curating transcendent celebrations, grand destination weddings, high-energy sangeet productions, and award-winning candid cinema.'}
              </p>

              {/* Quick Action CTA Buttons */}
              <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 hover:from-violet-500 hover:to-amber-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-violet-600/30 flex items-center gap-2 transition hover:scale-[1.02] cursor-pointer"
                >
                  <PartyPopper className="w-4 h-4" />
                  Check Dates &amp; Get Quote
                </button>

                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition hover:scale-[1.02]"
                  >
                    <SocialIcon platform="whatsapp" size={16} colored={false} className="text-white" />
                    WhatsApp
                  </a>
                )}

                {phoneUrl && (
                  <a
                    href={phoneUrl}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition"
                  >
                    <Phone className="w-4 h-4 text-violet-400" />
                    Call Studio
                  </a>
                )}

                <button
                  onClick={handleDownloadVCard}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Download className="w-4 h-4 text-violet-400" />
                  Save vCard
                </button>

                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
                  title="Share Portfolio"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Omnichannel Quick Connect Badges */}
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Connect:</span>
                
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="WhatsApp Direct Consultation"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 hover:border-[#25D366]/60 text-slate-200 text-xs transition group"
                  >
                    <SocialIcon platform="whatsapp" size={14} colored={true} />
                    <span className="font-medium group-hover:text-white">WhatsApp</span>
                  </a>
                )}

                {instagramUrl && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="Instagram Reels & Behind-the-Scenes"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E1306C]/10 hover:bg-[#E1306C]/20 border border-[#E1306C]/30 hover:border-[#E1306C]/60 text-slate-200 text-xs transition group"
                  >
                    <SocialIcon platform="instagram" size={14} colored={true} />
                    <span className="font-medium group-hover:text-white">Instagram</span>
                  </a>
                )}

                {facebookUrl && (
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="Facebook Page & Albums"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/30 hover:border-[#1877F2]/60 text-slate-200 text-xs transition group"
                  >
                    <SocialIcon platform="facebook" size={14} colored={true} />
                    <span className="font-medium group-hover:text-white">Facebook</span>
                  </a>
                )}

                {youtubeUrl && (
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="YouTube 4K Cinematic Films"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF0000]/10 hover:bg-[#FF0000]/20 border border-[#FF0000]/30 hover:border-[#FF0000]/60 text-slate-200 text-xs transition group"
                  >
                    <SocialIcon platform="youtube" size={14} colored={true} />
                    <span className="font-medium group-hover:text-white">YouTube</span>
                  </a>
                )}

                {emailUrl && (
                  <a
                    href={emailUrl}
                    title="Official Email Inquiries"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 hover:border-sky-500/60 text-slate-200 text-xs transition group"
                  >
                    <Mail className="w-3.5 h-3.5 text-sky-400" />
                    <span className="font-medium group-hover:text-white">Email</span>
                  </a>
                )}

                {websiteUrl && (
                  <a
                    href={websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    title="Official Studio Website"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/60 text-slate-200 text-xs transition group"
                  >
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-medium group-hover:text-white">Website</span>
                  </a>
                )}

                {mapsUrl && (
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="Google Maps Studio Directions"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-500/60 text-slate-200 text-xs transition group"
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-medium group-hover:text-white">Location</span>
                  </a>
                )}

                {/* Additional user-configured socials */}
                {userSocialItems
                  .filter(s => !['whatsapp', 'instagram', 'facebook', 'youtube', 'website', 'phone', 'mail', 'email'].includes(s.platform.toLowerCase()))
                  .map(s => {
                    const brand = getSocialBrandColor(s.platform);
                    return (
                      <a
                        key={s.id}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        title={s.label || s.platform}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${brand.bg} ${brand.border} border text-slate-200 text-xs transition group`}
                      >
                        <SocialIcon platform={s.platform} url={s.url} size={14} colored={true} />
                        <span className="font-medium capitalize group-hover:text-white">{s.label || s.platform}</span>
                      </a>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 4. NAVIGATION TABS */}
      <nav className="sticky top-0 z-30 bg-[#07060A]/90 backdrop-blur-md border-b border-slate-800/80 py-3 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-start sm:justify-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: 'Overview' },
            { id: 'services', label: 'Event Services' },
            { id: 'packages', label: 'Signature Packages' },
            { id: 'gallery', label: 'Lookbook & Visuals' },
            { id: 'reviews', label: 'Love & Reviews' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-12">
        {/* SECTION: SERVICES */}
        {(activeTab === 'all' || activeTab === 'services') && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-[11px] font-bold text-violet-400 uppercase tracking-widest">Tailored Production</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">Event Execution &amp; Services</h2>
              </div>
              <p className="text-xs text-slate-400 max-w-sm">
                From intimate sangeet nights to 1000-guest luxury destination ceremonies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((svc) => (
                <div 
                  key={svc.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-violet-500/40 transition group space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-400 border border-violet-500/30 flex items-center justify-center shrink-0">
                        {svc.category?.toLowerCase().includes('photo') ? <Camera className="w-5 h-5" /> :
                         svc.category?.toLowerCase().includes('music') || svc.category?.toLowerCase().includes('sound') ? <Music className="w-5 h-5" /> :
                         <Sparkles className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white group-hover:text-violet-300 transition">{svc.title}</h3>
                        <span className="text-[11px] text-violet-400 font-medium">{svc.category}</span>
                      </div>
                    </div>
                    {svc.price !== undefined && (
                      <span className="text-sm font-bold text-amber-400 font-mono">
                        {svc.price === 0 ? 'Custom Quote' : `₹${svc.price.toLocaleString('en-IN')}`}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {svc.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-800/60 text-xs">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-violet-400" />
                      {svc.durationMinutes ? `${Math.round(svc.durationMinutes / 60)} Hours Coverage` : 'Full Event Coverage'}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedService(svc);
                        setIsQuoteModalOpen(true);
                      }}
                      className="px-3 py-1 rounded-lg bg-violet-600/30 hover:bg-violet-600 text-violet-200 hover:text-white font-semibold text-xs border border-violet-500/30 transition cursor-pointer"
                    >
                      Inquire Service →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION: SIGNATURE PACKAGES */}
        {(activeTab === 'all' || activeTab === 'packages') && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-[11px] font-bold text-fuchsia-400 uppercase tracking-widest">Curated Offerings</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">Signature Event Packages</h2>
              </div>
              <p className="text-xs text-slate-400 max-w-sm">
                Transparent complete packages covering decor, audio, staging and 4K media capture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div 
                  key={pkg.id}
                  className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden flex flex-col hover:border-violet-500/50 transition group"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img 
                      src={pkg.imageUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80'} 
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-violet-600/90 backdrop-blur-md text-[10px] font-bold text-white">
                      {pkg.category || 'Package'}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-violet-300 transition">{pkg.name}</h3>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-3">
                        {pkg.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Starting From</span>
                        <span className="text-sm font-black text-amber-400 font-mono">
                          ₹{pkg.price?.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedPackage(pkg);
                          setIsQuoteModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-md transition cursor-pointer"
                      >
                        Book Package
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION: GALLERY / LOOKBOOK */}
        {(activeTab === 'all' || activeTab === 'gallery') && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">Visual Portfolio</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">Celebrations Lookbook &amp; Decor</h2>
              </div>
              <p className="text-xs text-slate-400 max-w-sm">
                A glimpse into our recent mandap setups, candid frames, and intelligent stage productions.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {displayGallery.map((item, idx) => (
                <div 
                  key={item.id || idx}
                  className="group relative rounded-2xl overflow-hidden aspect-square border border-slate-800 bg-slate-900"
                >
                  <img 
                    src={item.url} 
                    alt={item.caption || 'Event lookbook'}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-3 flex items-end">
                    <span className="text-xs font-semibold text-white drop-shadow-md">
                      {item.caption || 'Celebration Frame'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION: REVIEWS */}
        {(activeTab === 'all' || activeTab === 'reviews') && displayTestimonials.length > 0 && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">Client Testimonials</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">Words from Couples &amp; Planners</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayTestimonials.map((test) => (
                <div 
                  key={test.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3"
                >
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(test.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "{test.comment}"
                  </p>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{test.name}</span>
                    <span className="text-slate-400 text-[11px]">{test.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. CONTACT & OMNICHANNEL VENUE DESK */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-violet-950/60 via-slate-900 to-slate-950 border border-violet-800/40 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-violet-400">Omnichannel Connect &amp; Studio Desk</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">Connect Directly Across All Channels</h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl mt-0.5">
                Chat on WhatsApp, explore our latest reels on Instagram, connect on Facebook, watch 4K wedding films on YouTube, or call our studio.
              </p>
            </div>
            
            <div className="flex items-center gap-2.5 shrink-0">
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition hover:scale-[1.02]"
                >
                  <SocialIcon platform="whatsapp" size={16} colored={false} className="text-white" />
                  Chat on WhatsApp
                </a>
              )}
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-lg shadow-violet-600/30 transition hover:scale-[1.02] cursor-pointer"
              >
                Request Quote →
              </button>
            </div>
          </div>

          {/* Omnichannel Contact Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* 1. WhatsApp Card */}
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="group relative p-4 rounded-2xl bg-gradient-to-b from-[#25D366]/10 to-slate-900/90 border border-[#25D366]/30 hover:border-[#25D366]/70 shadow-lg hover:shadow-[#25D366]/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                      <SocialIcon platform="whatsapp" size={20} colored={true} />
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[10px] font-bold text-emerald-300">
                      Instant Chat
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition">WhatsApp Direct</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Check event dates, get transparent pricing, and receive customized digital brochures directly.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Start WhatsApp Chat</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            )}

            {/* 2. Instagram Card */}
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="group relative p-4 rounded-2xl bg-gradient-to-b from-[#E1306C]/10 to-slate-900/90 border border-[#E1306C]/30 hover:border-[#E1306C]/70 shadow-lg hover:shadow-[#E1306C]/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E1306C]/20 border border-[#E1306C]/40 flex items-center justify-center text-[#E1306C]">
                      <SocialIcon platform="instagram" size={20} colored={true} />
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#E1306C]/20 border border-[#E1306C]/40 text-[10px] font-bold text-pink-300">
                      Reels &amp; Stories
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-pink-300 transition">Instagram Portfolio</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Explore mandap decor reveals, candid couple portraits, backstage drone reels, and daily wedding stories.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-pink-400 group-hover:translate-x-1 transition-transform">
                  <span>Follow @{brandSlug}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            )}

            {/* 3. Facebook Card */}
            {facebookUrl && (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="group relative p-4 rounded-2xl bg-gradient-to-b from-[#1877F2]/10 to-slate-900/90 border border-[#1877F2]/30 hover:border-[#1877F2]/70 shadow-lg hover:shadow-[#1877F2]/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1877F2]/20 border border-[#1877F2]/40 flex items-center justify-center text-[#1877F2]">
                      <SocialIcon platform="facebook" size={20} colored={true} />
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#1877F2]/20 border border-[#1877F2]/40 text-[10px] font-bold text-blue-300">
                      Community
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition">Facebook Official</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Browse full wedding albums, client testimonials, community updates, and ceremony celebrations.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition-transform">
                  <span>Connect on Facebook</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            )}

            {/* 4. YouTube Card */}
            {youtubeUrl && (
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="group relative p-4 rounded-2xl bg-gradient-to-b from-[#FF0000]/10 to-slate-900/90 border border-[#FF0000]/30 hover:border-[#FF0000]/70 shadow-lg hover:shadow-[#FF0000]/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FF0000]/20 border border-[#FF0000]/40 flex items-center justify-center text-[#FF0000]">
                      <SocialIcon platform="youtube" size={20} colored={true} />
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#FF0000]/20 border border-[#FF0000]/40 text-[10px] font-bold text-red-300">
                      4K Cinema
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-red-300 transition">YouTube Channel</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Stream full-length 4K candid wedding teasers, drone aerials, and musical event choreography.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-red-400 group-hover:translate-x-1 transition-transform">
                  <span>Watch 4K Teasers</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            )}

            {/* 5. Phone Studio Desk */}
            {phoneUrl && (
              <a
                href={phoneUrl}
                className="group relative p-4 rounded-2xl bg-gradient-to-b from-violet-600/10 to-slate-900/90 border border-violet-500/30 hover:border-violet-500/70 shadow-lg hover:shadow-violet-500/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-violet-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-violet-600/20 border border-violet-500/40 text-[10px] font-bold text-violet-300">
                      10 AM - 9 PM
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-violet-300 transition">Studio Voice Hotline</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Direct line for calendar reservations, urgent event questions, and vendor collaborations.
                  </p>
                  <p className="text-xs font-semibold text-violet-300 mt-2">
                    {profile.phone || '+91 Direct Line'}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-violet-400 group-hover:translate-x-1 transition-transform">
                  <span>Call Studio Desk</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            )}

            {/* 6. Email Desk */}
            {emailUrl && (
              <a
                href={emailUrl}
                className="group relative p-4 rounded-2xl bg-gradient-to-b from-sky-500/10 to-slate-900/90 border border-sky-500/30 hover:border-sky-500/70 shadow-lg hover:shadow-sky-500/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-sky-500/20 border border-sky-500/40 text-[10px] font-bold text-sky-300">
                      Formal RFPs
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition">Official Mail Desk</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Send tender documents, corporate event briefs, or formal destination wedding RFPs.
                  </p>
                  <p className="text-xs font-semibold text-sky-300 mt-2 truncate">
                    {profile.email || 'events@studio.com'}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-sky-400 group-hover:translate-x-1 transition-transform">
                  <span>Send Email Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            )}

            {/* 7. Experience Studio & Venue Directions */}
            {mapsUrl && (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="group relative p-4 rounded-2xl bg-gradient-to-b from-amber-500/10 to-slate-900/90 border border-amber-500/30 hover:border-amber-500/70 shadow-lg hover:shadow-amber-500/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[10px] font-bold text-amber-300">
                      By Appointment
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition">Experience Studio &amp; Venue</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Visit our creative studio for fabric sampling, floral moodboards, and 3D stage layout demos.
                  </p>
                  <p className="text-xs font-semibold text-amber-300 mt-2 line-clamp-1">
                    {profile.address || 'Studio Address'}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>Get Directions on Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            )}

            {/* 8. Official Website / Web Hub */}
            {websiteUrl && (
              <a
                href={websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`}
                target="_blank"
                rel="noreferrer"
                className="group relative p-4 rounded-2xl bg-gradient-to-b from-emerald-500/10 to-slate-900/90 border border-emerald-500/30 hover:border-emerald-500/70 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <Globe className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-bold text-emerald-300">
                      Full Showcase
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition">Official Website</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Discover our full production archive, national awards, and comprehensive digital client stories.
                  </p>
                  <p className="text-xs font-semibold text-emerald-300 mt-2 truncate">
                    {websiteUrl.replace(/^https?:\/\//, '')}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Visit Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            )}

            {/* Any extra user-configured socials */}
            {userSocialItems
              .filter(s => !['whatsapp', 'instagram', 'facebook', 'youtube', 'website', 'phone', 'mail', 'email'].includes(s.platform.toLowerCase()))
              .map(s => {
                const brand = getSocialBrandColor(s.platform);
                return (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`group relative p-4 rounded-2xl ${brand.bg} border ${brand.border} shadow-lg transition-all duration-300 flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-900/60 border border-slate-700/50 flex items-center justify-center">
                          <SocialIcon platform={s.platform} url={s.url} size={20} colored={true} />
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-300 capitalize">
                          {s.platform}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white capitalize">{s.label || s.platform}</h4>
                      <p className="text-xs text-slate-400 mt-1 truncate">
                        {s.url.replace(/^https?:\/\//, '')}
                      </p>
                    </div>
                    <div className={`pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold ${brand.text} group-hover:translate-x-1 transition-transform`}>
                      <span>Connect</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </a>
                );
              })}
          </div>
        </section>
      </main>

      {/* 6. MODAL: DATE AVAILABILITY & QUOTE */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-violet-500/40 p-6 shadow-2xl relative">
            <button 
              onClick={() => setIsQuoteModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/40 text-violet-400 flex items-center justify-center">
                <PartyPopper className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {selectedPackage ? `Book ${selectedPackage.name}` : selectedService ? `Inquire: ${selectedService.title}` : 'Check Dates & Request Event Quote'}
                </h3>
                <p className="text-xs text-slate-400">Direct response from our event director within 30 minutes.</p>
              </div>
            </div>

            {quoteSubmitted ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Opening WhatsApp Inquiry...</h4>
                <p className="text-xs text-slate-400">We've pre-filled your event details for instant consultation.</p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">Your Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={quoteFormData.name}
                      onChange={e => setQuoteFormData({...quoteFormData, name: e.target.value})}
                      placeholder="e.g. Rahul Sharma"
                      className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">WhatsApp Number *</label>
                    <input 
                      type="tel" 
                      required
                      value={quoteFormData.phone}
                      onChange={e => setQuoteFormData({...quoteFormData, phone: e.target.value})}
                      placeholder="e.g. +91 98765 43210"
                      className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">Event Celebration Type</label>
                    <select
                      value={quoteFormData.eventType}
                      onChange={e => setQuoteFormData({...quoteFormData, eventType: e.target.value})}
                      className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-violet-500"
                    >
                      <option value="Wedding & Reception">Wedding &amp; Reception</option>
                      <option value="Destination 3-Day Wedding">Destination 3-Day Wedding</option>
                      <option value="Sangeet & Cocktail Night">Sangeet &amp; Cocktail Night</option>
                      <option value="Pre-Wedding Shoot & Candid Film">Pre-Wedding Shoot &amp; Candid Film</option>
                      <option value="Corporate Gala / Annual Event">Corporate Gala / Annual Event</option>
                      <option value="Birthday / Anniversary Milestone">Milestone Birthday / Anniversary</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">Proposed Event Date</label>
                    <input 
                      type="date"
                      value={quoteFormData.eventDate}
                      onChange={e => setQuoteFormData({...quoteFormData, eventDate: e.target.value})}
                      className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">Estimated Guest Count</label>
                    <select
                      value={quoteFormData.guestCount}
                      onChange={e => setQuoteFormData({...quoteFormData, guestCount: e.target.value})}
                      className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-violet-500"
                    >
                      <option value="50 - 150 Guests (Intimate)">50 - 150 Guests (Intimate)</option>
                      <option value="150 - 350 Guests">150 - 350 Guests</option>
                      <option value="350 - 750 Guests (Grand)">350 - 750 Guests (Grand)</option>
                      <option value="750 - 1500+ Guests (Royal)">750 - 1500+ Guests (Royal)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">Venue / City Location</label>
                    <input 
                      type="text" 
                      value={quoteFormData.venueCity}
                      onChange={e => setQuoteFormData({...quoteFormData, venueCity: e.target.value})}
                      placeholder="e.g. Hyderabad / Udaipur / Goa"
                      className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Special Requirements / Theme Preferences</label>
                  <textarea 
                    rows={2}
                    value={quoteFormData.notes}
                    onChange={e => setQuoteFormData({...quoteFormData, notes: e.target.value})}
                    placeholder="e.g. Looking for royal pastel floral theme, drone aerials and DJ line-array setup."
                    className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-violet-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-violet-600/30 transition cursor-pointer"
                >
                  Send Inquiry on WhatsApp →
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 7. SHARE CARD MODAL */}
      {isShareModalOpen && (
        <ShareCardModal
          onClose={() => setIsShareModalOpen(false)}
          profile={profile}
        />
      )}

      {/* 8. FLOATING WHATSAPP BUTTON */}
      {whatsappUrl && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2.5 pl-3.5 pr-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all group cursor-pointer"
        >
          <div className="relative">
            <SocialIcon platform="whatsapp" size={22} colored={false} className="text-white" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-white animate-ping" />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100 leading-tight">Direct Connect</span>
            <span className="text-xs font-extrabold leading-tight">Chat on WhatsApp</span>
          </div>
        </a>
      )}

      {/* 9. STICKY MOBILE ACTION BAR */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07060A]/95 backdrop-blur-lg border-t border-slate-800/90 px-3 py-2 flex items-center justify-between gap-1 shadow-2xl">
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-emerald-300 hover:text-white text-[10px] font-bold transition active:scale-95"
          >
            <SocialIcon platform="whatsapp" size={17} colored={true} />
            <span className="mt-0.5">WhatsApp</span>
          </a>
        )}

        {phoneUrl && (
          <a
            href={phoneUrl}
            className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-violet-600/15 border border-violet-500/30 text-violet-300 hover:text-white text-[10px] font-bold transition active:scale-95"
          >
            <Phone className="w-4 h-4 text-violet-400" />
            <span className="mt-0.5">Call</span>
          </a>
        )}

        {instagramUrl && (
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-[#E1306C]/15 border border-[#E1306C]/30 text-pink-300 hover:text-white text-[10px] font-bold transition active:scale-95"
          >
            <SocialIcon platform="instagram" size={17} colored={true} />
            <span className="mt-0.5">Instagram</span>
          </a>
        )}

        {facebookUrl && (
          <a
            href={facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-[#1877F2]/15 border border-[#1877F2]/30 text-blue-300 hover:text-white text-[10px] font-bold transition active:scale-95"
          >
            <SocialIcon platform="facebook" size={17} colored={true} />
            <span className="mt-0.5">Facebook</span>
          </a>
        )}

        <button
          onClick={() => setIsQuoteModalOpen(true)}
          className="flex-1.2 flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-[10px] font-bold shadow-lg shadow-violet-600/30 transition active:scale-95 cursor-pointer"
        >
          <PartyPopper className="w-4 h-4" />
          <span className="mt-0.5">Get Quote</span>
        </button>
      </div>
    </div>
  );
}
