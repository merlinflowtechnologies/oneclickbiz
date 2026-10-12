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
  Compass, 
  Plane, 
  Calendar, 
  ShieldCheck, 
  Award, 
  Star, 
  Clock, 
  X, 
  Send, 
  CheckCircle, 
  Palmtree, 
  Luggage, 
  Hotel, 
  Sparkles,
  Users,
  MessageCircle,
  FileText
} from 'lucide-react';
import ShareCardModal from '@/components/common/ShareCardModal';

interface TravelMiniWebsiteViewProps {
  profile: DigitalProfile;
  getEmbedUrl?: (item: any) => string;
}

export default function TravelMiniWebsiteView({ profile, getEmbedUrl }: TravelMiniWebsiteViewProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'packages' | 'services' | 'destinations' | 'reviews'>('all');
  const [selectedPackage, setSelectedPackage] = useState<ProductItem | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isTripModalOpen, setIsTripModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [tripFormData, setTripFormData] = useState({
    name: '',
    phone: '',
    destination: 'Bali & Southeast Asia',
    travelMonth: '',
    durationDays: '5 - 7 Days',
    travelers: 'Couple (2 Adults)',
    budgetRange: '₹50,000 - ₹1,00,000 per person',
    notes: ''
  });
  const [tripSubmitted, setTripSubmitted] = useState(false);

  // Trust Config
  const travelConfig = profile.sectionData?.travel || {};
  const registration = travelConfig.agencyRegistration || 'IATA Accredited & Ministry of Tourism Recognized';
  const destinationsCovered = travelConfig.destinationsCovered || '75+ Domestic & Global Gateways';
  const happyTravelers = travelConfig.happyTravelers || '25,000+ Happy Explorers';
  const supportHours = travelConfig.supportHours || '24/7 Dedicated Ground Concierge';
  const customizationPolicy = travelConfig.customizationPolicy || '100% Tailored Private Itineraries';

  // Packages (Tour Itineraries)
  const packages: ProductItem[] = profile.sectionData?.products?.items || [
    {
      id: 'trv_pkg_1',
      name: 'Bali Private Pool Villa & Island Escape (6D/5N)',
      description: 'Seminyak private luxury pool villa, Ubud sacred monkey forest, Nusa Penida island speedboat cruise, sunset beach dinners & daily breakfast.',
      price: 48999,
      currency: '₹',
      imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      category: 'International Escape',
      isAvailable: true
    },
    {
      id: 'trv_pkg_2',
      name: 'Kashmir Paradise Valley & Deluxe Houseboat (5D/4N)',
      description: 'Srinagar Dal Lake heritage houseboat, Gulmarg Gondola phase 1 & 2 pass, Pahalgam betaab valley excursion & private cab chauffeur throughout.',
      price: 29500,
      currency: '₹',
      imageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
      category: 'Domestic Holiday',
      isAvailable: true
    },
    {
      id: 'trv_pkg_3',
      name: 'Dubai & Abu Dhabi Sky & Desert Safari (5D/4N)',
      description: '4-star city stay, Burj Khalifa 124th floor tickets, Red Dune desert safari with BBQ dinner & belly dance, Ferrari World & Dubai Marina yacht cruise.',
      price: 42500,
      currency: '₹',
      imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      category: 'Luxury City',
      isAvailable: true
    },
    {
      id: 'trv_pkg_4',
      name: 'Kerala Backwaters & Munnar Tea Mist (4D/3N)',
      description: 'Munnar mist tea garden resort, Alleppey private AC deluxe houseboat stay with traditional Kerala meals, sunset cruise & private sedan pickup.',
      price: 19999,
      currency: '₹',
      imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
      category: 'Backwater Retreat',
      isAvailable: true
    }
  ];

  // Travel Services
  const services: ServiceItem[] = profile.sectionData?.services?.items || [
    {
      id: 'trv_svc_1',
      title: 'Bespoke Honeymoon & Private Tour Curating',
      category: 'Custom Itinerary',
      description: '1-on-1 itinerary planning, candle-light dinners, private transfers, visa assistance & 24/7 dedicated trip concierge.',
      price: 0,
      currency: '₹',
      durationMinutes: 45,
      isAvailable: true
    },
    {
      id: 'trv_svc_2',
      title: 'Hassle-Free Tourist Visa & Documentation Desk',
      category: 'Visa Concierge',
      description: 'End-to-end visa filing for Schengen, UK, US, Dubai, Singapore, Thailand & Vietnam with high approval rate.',
      price: 1999,
      currency: '₹',
      durationMinutes: 30,
      isAvailable: true
    },
    {
      id: 'trv_svc_3',
      title: 'Corporate Offsites, MICE & Group Bookings',
      category: 'Corporate & MICE',
      description: 'Team bonding getaways, conference hall bookings, charter flights, banquet staging and team excursions.',
      price: 0,
      currency: '₹',
      durationMinutes: 60,
      isAvailable: true
    },
    {
      id: 'trv_svc_4',
      title: 'Luxury Car Rentals & Airport Chauffeur',
      category: 'Fleet & Transfers',
      description: 'Doorstep AC sedan, Innova Crysta & luxury tempo traveler rentals with verified polite chauffeurs.',
      price: 3500,
      currency: '₹',
      durationMinutes: 480,
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
      url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      caption: 'Bali Private Pool Villa'
    },
    {
      id: 'gal_2',
      url: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
      caption: 'Kashmir Snow Mountains'
    },
    {
      id: 'gal_3',
      url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      caption: 'Dubai Sky & Desert Safari'
    },
    {
      id: 'gal_4',
      url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
      caption: 'Kerala Backwaters Houseboat'
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
      name: 'Karthik & Sneha Reddy',
      role: 'Bali Honeymoon Travelers',
      comment: 'From the private pool villa to our candlelit beach dinner in Jimbaran, our Bali trip was seamless. Their 24/7 WhatsApp concierge was always one text away!',
      rating: 5
    },
    {
      id: 't_2',
      name: 'Sunil Verma',
      role: 'Family Vacation in Kashmir',
      comment: 'Best travel agency experience! The houseboat in Dal Lake was breathtaking and the driver in Gulmarg was extremely helpful. Highly recommend their personalized itineraries.',
      rating: 5
    }
  ];

  const handleTripSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTripSubmitted(true);
    const whatsappText = encodeURIComponent(
      `✈️ *New Holiday Inquiry - ${profile.name || 'Travel Agency'}*\n` +
      `👤 *Traveler:* ${tripFormData.name}\n` +
      `📞 *Phone:* ${tripFormData.phone}\n` +
      `🌴 *Destination:* ${tripFormData.destination}\n` +
      `📅 *Travel Month:* ${tripFormData.travelMonth || 'Flexible'}\n` +
      `⏳ *Duration:* ${tripFormData.durationDays}\n` +
      `👥 *Travelers:* ${tripFormData.travelers}\n` +
      `💰 *Budget Range:* ${tripFormData.budgetRange}\n` +
      `📝 *Preferences:* ${tripFormData.notes || 'None'}`
    );
    const phone = (profile.whatsapp || profile.phone || '').replace(/[^0-9]/g, '');
    if (phone) {
      window.open(`https://wa.me/${phone}?text=${whatsappText}`, '_blank');
    }
    setTimeout(() => {
      setTripSubmitted(false);
      setIsTripModalOpen(false);
    }, 2000);
  };

  const handleDownloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${profile.name || 'Travel Advisor'}
ORG:${profile.company || 'Travel & Holidays Agency'}
TITLE:${profile.designation || 'Holiday Specialist'}
TEL:${profile.phone || ''}
EMAIL:${profile.email || ''}
URL:${typeof window !== 'undefined' ? window.location.href : ''}
NOTE:${profile.bio || registration}
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${(profile.name || 'travel').replace(/\s+/g, '_')}_holidays.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#050D18] text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-white pb-24">
      {/* 1. TOP AGENCY TRUST STRIP */}
      <div className="bg-gradient-to-r from-cyan-950/90 via-sky-900/60 to-cyan-950/90 border-b border-cyan-800/30 text-xs py-2 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 text-cyan-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-semibold text-white tracking-wide">{registration}</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-medium text-cyan-300">
            <span className="hidden sm:inline-flex items-center gap-1">
              <Luggage className="w-3.5 h-3.5 text-amber-400" />
              {destinationsCovered}
            </span>
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-300" />
              {supportHours}
            </span>
          </div>
        </div>
      </div>

      {/* 2. HERO HEADER SECTION */}
      <header className="relative overflow-hidden pt-8 pb-12 px-4 border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left">
            {/* Avatar / Agency Crest */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl p-1 bg-gradient-to-tr from-cyan-500 via-teal-400 to-amber-400 shadow-2xl shadow-cyan-500/20">
                <img 
                  src={profile.avatarUrl || 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80'} 
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-[22px]"
                />
              </div>
              <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-cyan-600 border border-cyan-400 text-[10px] font-bold text-white shadow-lg flex items-center gap-1">
                <Compass className="w-3 h-3 text-white" />
                Verified
              </span>
            </div>

            {/* Agency Info */}
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1">
                  <Plane className="w-3.5 h-3.5 text-cyan-400" />
                  {customizationPolicy}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  4.97 Star Agency
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  🌍 {happyTravelers}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {profile.name || 'Wanderlust Luxury Holidays'}
              </h1>
              
              <p className="text-sm sm:text-base font-medium text-cyan-300">
                {profile.designation || 'Senior Holiday Director & Destination Planner'}
                {profile.company ? ` • ${profile.company}` : ''}
              </p>

              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                {profile.bio || 'Crafting unforgettable global vacations, romantic honeymoon escapes, and family holidays with handcrafted itineraries, verified 4-star & 5-star resorts, and 24/7 ground support.'}
              </p>

              {/* Quick Action CTA Buttons */}
              <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <button
                  onClick={() => setIsTripModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-amber-500 hover:from-cyan-400 hover:to-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/30 flex items-center gap-2 transition cursor-pointer"
                >
                  <Plane className="w-4 h-4" />
                  Plan My Dream Vacation
                </button>

                {profile.phone && (
                  <a
                    href={`tel:${profile.phone}`}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition"
                  >
                    <Phone className="w-4 h-4 text-cyan-400" />
                    Call Travel Desk
                  </a>
                )}

                <button
                  onClick={handleDownloadVCard}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  Save vCard
                </button>

                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
                  title="Share Agency"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 4. NAVIGATION TABS */}
      <nav className="sticky top-0 z-30 bg-[#050D18]/90 backdrop-blur-md border-b border-slate-800/80 py-3 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-start sm:justify-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: 'Overview' },
            { id: 'packages', label: 'Holiday Itineraries' },
            { id: 'services', label: 'Travel Services' },
            { id: 'destinations', label: 'Photo Moments' },
            { id: 'reviews', label: 'Traveler Reviews' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-12">
        {/* SECTION: HOLIDAY PACKAGES */}
        {(activeTab === 'all' || activeTab === 'packages') && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest">Handcrafted Gateways</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">Popular Holiday Packages</h2>
              </div>
              <p className="text-xs text-slate-400 max-w-sm">
                Complete packages with curated stays, breakfast, airport transfers &amp; guided sightseeing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {packages.map((pkg) => (
                <div 
                  key={pkg.id}
                  className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden flex flex-col hover:border-cyan-500/50 transition group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={pkg.imageUrl || 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'} 
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-cyan-600/90 backdrop-blur-md text-[10px] font-bold text-white">
                      {pkg.category || 'Holiday'}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition">{pkg.name}</h3>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                        {pkg.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Starting Per Person</span>
                        <span className="text-base font-black text-amber-400 font-mono">
                          ₹{pkg.price?.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedPackage(pkg);
                          setIsTripModalOpen(true);
                        }}
                        className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition cursor-pointer"
                      >
                        Inquire Itinerary →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION: TRAVEL SERVICES */}
        {(activeTab === 'all' || activeTab === 'services') && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-[11px] font-bold text-teal-400 uppercase tracking-widest">Travel Concierge</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">Comprehensive Travel Assistance</h2>
              </div>
              <p className="text-xs text-slate-400 max-w-sm">
                From emergency visa paperwork to corporate charter bookings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((svc) => (
                <div 
                  key={svc.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition group space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0">
                        {svc.category?.toLowerCase().includes('visa') ? <FileText className="w-5 h-5" /> :
                         svc.category?.toLowerCase().includes('fleet') ? <Luggage className="w-5 h-5" /> :
                         <Plane className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition">{svc.title}</h3>
                        <span className="text-[11px] text-cyan-400 font-medium">{svc.category}</span>
                      </div>
                    </div>
                    {svc.price !== undefined && (
                      <span className="text-sm font-bold text-amber-400 font-mono">
                        {svc.price === 0 ? 'Complimentary' : `₹${svc.price.toLocaleString('en-IN')}`}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {svc.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-800/60 text-xs">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      {svc.durationMinutes ? `${svc.durationMinutes} Mins Consult` : 'Instant Concierge'}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedService(svc);
                        setIsTripModalOpen(true);
                      }}
                      className="px-3 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 font-semibold text-xs border border-cyan-500/30 transition cursor-pointer"
                    >
                      Book Service →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION: DESTINATIONS & LOOKBOOK */}
        {(activeTab === 'all' || activeTab === 'destinations') && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">Moments Captured</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">Destination Highlights</h2>
              </div>
              <p className="text-xs text-slate-400 max-w-sm">
                Scenic glimpses from recent vacations planned for our valued travelers.
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
                    alt={item.caption || 'Destination highlight'}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-3 flex items-end">
                    <span className="text-xs font-semibold text-white drop-shadow-md">
                      {item.caption || 'Gateway Snapshot'}
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
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">Traveler Stories</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">Memories Shared by Clients</h2>
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

        {/* 5. CONTACT & BOOKING DESK */}
        <section className="p-6 rounded-3xl bg-gradient-to-br from-cyan-950/50 via-slate-900 to-slate-950 border border-cyan-800/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Direct Consultation</span>
              <h3 className="text-lg font-bold text-white mt-0.5">Speak with a Senior Holiday Specialist</h3>
              <p className="text-xs text-slate-400">Customized quote within 60 minutes with flight comparisons &amp; resort choices.</p>
            </div>
            <button
              onClick={() => setIsTripModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/30 transition shrink-0 cursor-pointer"
            >
              Plan Vacation on WhatsApp →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80 text-xs">
            {profile.phone && (
              <a href={`tel:${profile.phone}`} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-300 transition">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>{profile.phone}</span>
              </a>
            )}
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-300 transition">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span className="truncate">{profile.email}</span>
              </a>
            )}
            {profile.address && (
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="truncate">{profile.address}</span>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* 6. MODAL: PLAN TRIP & INQUIRE */}
      {isTripModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-cyan-500/40 p-6 shadow-2xl relative">
            <button 
              onClick={() => setIsTripModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
                <Plane className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {selectedPackage ? `Inquire: ${selectedPackage.name}` : selectedService ? `Book: ${selectedService.title}` : 'Plan Your Custom Vacation'}
                </h3>
                <p className="text-xs text-slate-400">We will craft a personalized itinerary with best rates.</p>
              </div>
            </div>

            {tripSubmitted ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Connecting with Holiday Specialist...</h4>
                <p className="text-xs text-slate-400">Opening WhatsApp with your trip details pre-filled.</p>
              </div>
            ) : (
              <form onSubmit={handleTripSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">Your Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={tripFormData.name}
                      onChange={e => setTripFormData({...tripFormData, name: e.target.value})}
                      placeholder="e.g. Priya Nair"
                      className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">WhatsApp Number *</label>
                    <input 
                      type="tel" 
                      required
                      value={tripFormData.phone}
                      onChange={e => setTripFormData({...tripFormData, phone: e.target.value})}
                      placeholder="e.g. +91 98765 43210"
                      className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">Desired Destination</label>
                    <select
                      value={tripFormData.destination}
                      onChange={e => setTripFormData({...tripFormData, destination: e.target.value})}
                      className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Bali & Southeast Asia">Bali &amp; Southeast Asia</option>
                      <option value="Kashmir / Himachal / Ladakh">Kashmir / Himachal / Ladakh</option>
                      <option value="Dubai & Abu Dhabi">Dubai &amp; Abu Dhabi</option>
                      <option value="Kerala Backwaters & Munnar">Kerala Backwaters &amp; Munnar</option>
                      <option value="Europe / Schengen Tour">Europe / Schengen Tour</option>
                      <option value="Maldives Private Water Villa">Maldives Private Water Villa</option>
                      <option value="Other / Flexible">Other / Customized Gateway</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">Approx. Travel Month</label>
                    <input 
                      type="month"
                      value={tripFormData.travelMonth}
                      onChange={e => setTripFormData({...tripFormData, travelMonth: e.target.value})}
                      className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">Trip Duration</label>
                    <select
                      value={tripFormData.durationDays}
                      onChange={e => setTripFormData({...tripFormData, durationDays: e.target.value})}
                      className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="3 - 4 Days (Short Getaway)">3 - 4 Days (Short Getaway)</option>
                      <option value="5 - 7 Days (Popular)">5 - 7 Days (Popular)</option>
                      <option value="8 - 12 Days (Grand Tour)">8 - 12 Days (Grand Tour)</option>
                      <option value="12+ Days (Extended Exploration)">12+ Days (Extended Exploration)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">Travelers Configuration</label>
                    <select
                      value={tripFormData.travelers}
                      onChange={e => setTripFormData({...tripFormData, travelers: e.target.value})}
                      className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Couple (Honeymoon / Romantic)">Couple (Honeymoon / Romantic)</option>
                      <option value="Family with Kids (3-5 Members)">Family with Kids (3-5 Members)</option>
                      <option value="Group of Friends (4-8+ Members)">Group of Friends (4-8+ Members)</option>
                      <option value="Solo Explorer">Solo Explorer</option>
                      <option value="Corporate Offsite (10+ Members)">Corporate Offsite (10+ Members)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Special Preferences / Stay Style</label>
                  <textarea 
                    rows={2}
                    value={tripFormData.notes}
                    onChange={e => setTripFormData({...tripFormData, notes: e.target.value})}
                    placeholder="e.g. Prefer 5-star private pool villa, pure vegetarian meals, and airport pickup."
                    className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/30 transition cursor-pointer"
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
