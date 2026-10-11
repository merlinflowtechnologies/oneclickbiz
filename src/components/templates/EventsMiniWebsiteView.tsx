'use strict';
'use client';

import React, { useState } from 'react';
import { 
  DigitalProfile, 
  ServiceItem, 
  ProductItem, 
  GalleryItem, 
  TestimonialItem,
  VideoItem 
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
  MessageCircle
} from 'lucide-react';
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
              <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 hover:from-violet-500 hover:to-amber-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-violet-600/30 flex items-center gap-2 transition cursor-pointer"
                >
                  <PartyPopper className="w-4 h-4" />
                  Check Dates &amp; Get Quote
                </button>

                {profile.phone && (
                  <a
                    href={`tel:${profile.phone}`}
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
            </div>
          </div>
        </div>
      </header>

      {/* 3. KEY METRICS STRIP */}
      <section className="border-b border-slate-800/80 bg-slate-950/60 py-6 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-xl sm:text-2xl font-black text-violet-400">350+</span>
            <p className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">Weddings &amp; Galas</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-xl sm:text-2xl font-black text-fuchsia-400">4K Drones</span>
            <p className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">In-House Cinema Rig</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-xl sm:text-2xl font-black text-amber-400">100%</span>
            <p className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">Turnkey Production</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-xl sm:text-2xl font-black text-emerald-400">4.9 / 5</span>
            <p className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">Client Reviews</p>
          </div>
        </div>
      </section>

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

        {/* 5. CONTACT & VENUE DESK */}
        <section className="p-6 rounded-3xl bg-gradient-to-br from-violet-950/50 via-slate-900 to-slate-950 border border-violet-800/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-violet-400">Direct Connect</span>
              <h3 className="text-lg font-bold text-white mt-0.5">Speak with our Lead Event Director</h3>
              <p className="text-xs text-slate-400">Available for studio visits, in-person consultations, and date block bookings.</p>
            </div>
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-lg shadow-violet-600/30 transition shrink-0 cursor-pointer"
            >
              Request Quote on WhatsApp →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80 text-xs">
            {profile.phone && (
              <a href={`tel:${profile.phone}`} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-300 transition">
                <Phone className="w-4 h-4 text-violet-400" />
                <span>{profile.phone}</span>
              </a>
            )}
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-300 transition">
                <Mail className="w-4 h-4 text-violet-400" />
                <span className="truncate">{profile.email}</span>
              </a>
            )}
            {profile.address && (
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300">
                <MapPin className="w-4 h-4 text-violet-400 shrink-0" />
                <span className="truncate">{profile.address}</span>
              </div>
            )}
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
    </div>
  );
}
