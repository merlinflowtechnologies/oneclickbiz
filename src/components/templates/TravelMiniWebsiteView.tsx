'use strict';
'use client';

import React, { useState, useMemo } from 'react';
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
  FileText,
  Play,
  PlayCircle,
  Film,
  ExternalLink,
  ChevronRight,
  Tv
} from 'lucide-react';
import ShareCardModal from '@/components/common/ShareCardModal';

interface TravelSocialMediaItem {
  id: string;
  type: 'youtube' | 'instagram';
  title: string;
  description: string;
  authorOrChannel: string;
  thumbnailUrl: string;
  embedUrl: string;
  durationOrType: string;
  views: string;
  likes: string;
  category: string;
}

const CURATED_TRAVEL_MEDIA: TravelSocialMediaItem[] = [
  {
    id: 'yt_swiss',
    type: 'youtube',
    title: 'Switzerland 4K Ultra HD Scenic Alps & Glacier Express Tour',
    description: 'Breathtaking 4K journey through Zermatt, Matterhorn, Lucerne Lake, and the world-famous Glacier Express panoramic train.',
    authorOrChannel: 'Wanderlust 4K Journeys',
    thumbnailUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    embedUrl: 'https://www.youtube.com/embed/XHTrh-Qz5tA?autoplay=1',
    durationOrType: '14:20 min',
    views: '840K views',
    likes: '42K likes',
    category: 'Europe Expeditions'
  },
  {
    id: 'yt_bali',
    type: 'youtube',
    title: 'Bali Indonesia Ultimate Paradise — Private Pool Villas & Nusa Penida',
    description: 'Explore tropical luxury in Seminyak, floating breakfasts in Ubud, sacred sea temples, and cliffside sunsets.',
    authorOrChannel: 'Island Escapes Official',
    thumbnailUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    embedUrl: 'https://www.youtube.com/embed/2b9txcAt4e0?autoplay=1',
    durationOrType: '11:45 min',
    views: '1.2M views',
    likes: '68K likes',
    category: 'Tropical Honeymoons'
  },
  {
    id: 'yt_dubai',
    type: 'youtube',
    title: 'Dubai Luxury Extravaganza — Burj Khalifa, Desert Dune Safari & Yachts',
    description: 'VIP guide to Dubai Marina stays, thrilling 4x4 desert dune bashing, VIP dinner cruises, and Fountain light shows.',
    authorOrChannel: 'Global City Escapes',
    thumbnailUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    embedUrl: 'https://www.youtube.com/embed/y04s_xXp_g8?autoplay=1',
    durationOrType: '09:30 min',
    views: '950K views',
    likes: '51K likes',
    category: 'Luxury City Escapes'
  },
  {
    id: 'yt_kashmir',
    type: 'youtube',
    title: 'Kashmir Paradise on Earth — Dal Lake Shikara & Gulmarg Gondola 4K',
    description: 'Experience winter snow wonderland in Gulmarg Phase 2, handcrafted wooden houseboats in Dal Lake, and saffron valleys.',
    authorOrChannel: 'Incredible Journeys India',
    thumbnailUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
    embedUrl: 'https://www.youtube.com/embed/9vM0U_B1p_Y?autoplay=1',
    durationOrType: '12:10 min',
    views: '710K views',
    likes: '39K likes',
    category: 'Domestic Escapes'
  },
  {
    id: 'ig_maldives',
    type: 'instagram',
    title: 'Maldives Private Overwater Villa Sunrise Walkthrough',
    description: 'Step directly from your bedroom into crystal turquoise lagoon with private infinity plunge pool and glass floor.',
    authorOrChannel: '@wanderlust_holidays',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
    embedUrl: 'https://www.youtube.com/embed/XHTrh-Qz5tA?autoplay=1',
    durationOrType: 'Reel (0:45)',
    views: '480K plays',
    likes: '48.2K likes',
    category: 'Trending Reel'
  },
  {
    id: 'ig_santorini',
    type: 'instagram',
    title: 'Santorini Caldera Sunset Sailing & Blue Dome Walk',
    description: 'Golden hour catamaran sailing around Oia cliffs and walking through white cobblestone Greek alleyways.',
    authorOrChannel: '@wanderlust_holidays',
    thumbnailUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
    embedUrl: 'https://www.youtube.com/embed/2b9txcAt4e0?autoplay=1',
    durationOrType: 'Reel (0:52)',
    views: '360K plays',
    likes: '36.9K likes',
    category: 'Trending Reel'
  },
  {
    id: 'ig_japan',
    type: 'instagram',
    title: 'Japan Sakura Cherry Blossom Express & Kyoto Bamboo Grove',
    description: 'Spring blossoms framing Mount Fuji, traditional tea houses in Gion, and Shinkansen bullet train journey.',
    authorOrChannel: '@wanderlust_holidays',
    thumbnailUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    embedUrl: 'https://www.youtube.com/embed/y04s_xXp_g8?autoplay=1',
    durationOrType: 'Reel (0:48)',
    views: '520K plays',
    likes: '52.1K likes',
    category: 'Trending Reel'
  }
];

interface TravelMiniWebsiteViewProps {
  profile: DigitalProfile;
  getEmbedUrl?: (item: any) => string;
  onBook?: () => void;
  onSaveContact?: () => void;
  onShare?: () => void;
}

export default function TravelMiniWebsiteView({ 
  profile, 
  getEmbedUrl,
  onBook,
  onSaveContact,
  onShare
}: TravelMiniWebsiteViewProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'packages' | 'services' | 'media' | 'destinations' | 'reviews'>('all');
  const [selectedPackage, setSelectedPackage] = useState<ProductItem | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isTripModalOpen, setIsTripModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  // Media Lounge State
  const [mediaTabFilter, setMediaTabFilter] = useState<'all' | 'youtube' | 'instagram'>('all');
  const [activeMediaItem, setActiveMediaItem] = useState<TravelSocialMediaItem>(CURATED_TRAVEL_MEDIA[0]);
  const [customMediaUrl, setCustomMediaUrl] = useState('');
  const [customMediaError, setCustomMediaError] = useState('');

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
  const rawPackages = profile.sectionData?.products?.items || [];
  const hasGenericPackage = rawPackages.length === 1 && rawPackages[0].name.includes('Consultation Package');
  const packages: ProductItem[] = (rawPackages.length > 0 && !hasGenericPackage) ? rawPackages : [
    {
      id: 'trv_pkg_1',
      name: 'Bali Private Pool Villa & Island Escape (6D/5N)',
      description: 'Seminyak private luxury pool villa, Ubud sacred monkey forest, Nusa Penida island speedboat cruise, sunset beach dinners & daily breakfast.',
      price: 48999,
      currency: '₹',
      imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      category: 'International Honeymoon',
      isAvailable: true
    },
    {
      id: 'trv_pkg_2',
      name: 'Dubai Luxury Extravaganza & Desert Camp (5D/4N)',
      description: '5-star Marina hotel, desert dune safari with BBQ dinner, Burj Khalifa At The Top tickets, Dubai Frame & luxury yacht cruise.',
      price: 44500,
      currency: '₹',
      imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      category: 'International Luxury',
      isAvailable: true
    },
    {
      id: 'trv_pkg_3',
      name: 'Swiss Alps & Scenic Glaciers Explorer (7D/6N)',
      description: 'Zurich, Lucerne, Interlaken, Mount Titlis cable car, Glacier 3000 ice walk, panoramic Swiss pass & lakeside luxury stays.',
      price: 145000,
      currency: '₹',
      imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
      category: 'Europe Grand Tour',
      isAvailable: true
    },
    {
      id: 'trv_pkg_4',
      name: 'Kashmir Paradise — Srinagar & Gulmarg Snow (6D/5N)',
      description: 'Heritage Dal Lake wooden houseboat, Shikara sunset cruise, Gulmarg Gondola ride, Pahalgam Betaab Valley & private chauffeured SUV.',
      price: 28999,
      currency: '₹',
      imageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
      category: 'Domestic Escapes',
      isAvailable: true
    },
    {
      id: 'trv_pkg_5',
      name: 'Kerala Backwaters Houseboat & Tea Hills (5D/4N)',
      description: 'Munnar mist tea plantations, Eravikulam National Park, private Alleppey air-conditioned houseboat cruise with traditional meals.',
      price: 21500,
      currency: '₹',
      imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
      category: 'Domestic Escapes',
      isAvailable: true
    },
    {
      id: 'trv_pkg_6',
      name: 'Goa Luxury Beachside Pool Villa Getaway (4D/3N)',
      description: 'Private 3BHK North Goa pool villa, private yacht sunset sail with wine, South Goa heritage churches & airport chauffeur transfers.',
      price: 16999,
      currency: '₹',
      imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
      category: 'Domestic Escapes',
      isAvailable: true
    }
  ];

  // Services
  const rawServices = profile.sectionData?.services?.items || [];
  const services: ServiceItem[] = rawServices.length > 0 ? rawServices : [
    {
      id: 'trv_svc_1',
      title: 'Bespoke International Holiday Itinerary Planning',
      category: 'Vacation Curation',
      description: 'Handcrafted day-by-day travel schedules with hotel bookings, flight route optimization, private transfers, and curated excursions.',
      price: 25000,
      currency: '₹',
      durationMinutes: 60,
      isAvailable: true
    },
    {
      id: 'trv_svc_2',
      title: 'Fast-Track Global Visa Assistance',
      category: 'Visa Concierge',
      description: 'Complete documentation filing, mock interview prep, and priority slot booking for US, UK, Schengen, Dubai & Singapore visas.',
      price: 6500,
      currency: '₹',
      durationMinutes: 45,
      isAvailable: true
    },
    {
      id: 'trv_svc_3',
      title: 'Corporate Offsites, MICE & Group Bookings',
      category: 'Corporate & MICE',
      description: 'Team bonding getaways, conference hall bookings, charter flights, banquet staging and team excursions.',
      price: 75000,
      currency: '₹',
      durationMinutes: 90,
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
  const hasGenericGallery = galleryItems.length === 1 && galleryItems[0].caption.includes('vCard Portfolio');
  const displayGallery = (galleryItems.length > 0 && !hasGenericGallery) ? galleryItems : [
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

  // Filtered Media
  const filteredMedia = useMemo(() => {
    if (mediaTabFilter === 'all') return CURATED_TRAVEL_MEDIA;
    return CURATED_TRAVEL_MEDIA.filter(m => m.type === mediaTabFilter);
  }, [mediaTabFilter]);

  // Custom Media Player Handler
  const handlePlayCustomMedia = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomMediaError('');
    if (!customMediaUrl.trim()) return;

    // Check YouTube
    const ytMatch = customMediaUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (ytMatch && ytMatch[1]) {
      const vidId = ytMatch[1];
      setActiveMediaItem({
        id: 'custom_yt_' + Date.now(),
        type: 'youtube',
        title: 'Custom YouTube Video (' + vidId + ')',
        description: 'Playing custom YouTube travel video directly inside the page without redirecting.',
        authorOrChannel: 'YouTube Stream',
        thumbnailUrl: `https://img.youtube.com/vi/${vidId}/hqdefault.jpg`,
        embedUrl: `https://www.youtube.com/embed/${vidId}?autoplay=1`,
        durationOrType: 'Custom Video',
        views: 'Live Stream',
        likes: 'Verified',
        category: 'Custom Media'
      });
      return;
    }

    // Check Instagram Reel
    if (customMediaUrl.includes('instagram.com/reel/') || customMediaUrl.includes('instagram.com/p/')) {
      const cleanReel = customMediaUrl.split('instagram.com/reel/')[1]?.split('/')[0] || 
                        customMediaUrl.split('instagram.com/p/')[1]?.split('/')[0] || 'reel';
      setActiveMediaItem({
        id: 'custom_ig_' + Date.now(),
        type: 'instagram',
        title: 'Custom Instagram Reel (@' + cleanReel + ')',
        description: 'Playing custom Instagram reel directly inside the page without redirecting.',
        authorOrChannel: '@instagram_creator',
        thumbnailUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
        embedUrl: `https://www.instagram.com/p/${cleanReel}/embed`,
        durationOrType: 'Reel Clip',
        views: 'Direct Play',
        likes: 'Verified',
        category: 'Instagram Reel'
      });
      return;
    }

    setCustomMediaError('Please enter a valid YouTube video (watch, youtu.be, shorts) or Instagram reel link.');
  };

  const handleTripSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTripSubmitted(true);
    const whatsappText = encodeURIComponent(
      `✈️ *New Holiday Inquiry - ${profile.name || 'Wanderlust International Travels'}*` + '\n' +
      `👤 *Traveler:* ${tripFormData.name}` + '\n' +
      `📞 *Phone:* ${tripFormData.phone}` + '\n' +
      `🌴 *Destination:* ${tripFormData.destination}` + '\n' +
      `📅 *Travel Month:* ${tripFormData.travelMonth || 'Flexible'}` + '\n' +
      `⏳ *Duration:* ${tripFormData.durationDays}` + '\n' +
      `👥 *Travelers:* ${tripFormData.travelers}` + '\n' +
      `💰 *Budget Range:* ${tripFormData.budgetRange}` + '\n' +
      `📝 *Preferences:* ${tripFormData.notes || 'None'}`
    );
    const phone = (profile.whatsapp || profile.phone || '919876544036').replace(/[^0-9]/g, '');
    if (phone) {
      window.open(`https://wa.me/${phone}?text=${whatsappText}`, '_blank');
    }
    setTimeout(() => {
      setTripSubmitted(false);
      setIsTripModalOpen(false);
    }, 2000);
  };

  const handleDownloadVCard = () => {
    if (onSaveContact) {
      onSaveContact();
      return;
    }
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${profile.name || 'Pankaj Malhotra'}
ORG:${profile.company || 'Wanderlust International Travels'}
TITLE:${profile.designation || 'Holiday Tour Operator'}
TEL:${profile.phone || '+91 98765 44036'}
EMAIL:${profile.email || 'concierge@wanderlust-international.com'}
URL:${typeof window !== 'undefined' ? window.location.href : 'https://www.oneclickbiz.in/v/travel-tour'}
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
      <header className="relative overflow-hidden pt-8 pb-10 px-4 border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left">
            {/* Avatar / Agency Crest */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl p-1 bg-gradient-to-tr from-cyan-500 via-teal-400 to-amber-400 shadow-2xl shadow-cyan-500/20">
                <img 
                  src={profile.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'} 
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
                {profile.name || 'Pankaj Malhotra'}
              </h1>
              
              <p className="text-sm sm:text-base font-medium text-cyan-300">
                {profile.designation || 'Holiday Tour Operator & Managing Partner'}
                {profile.company ? ` • ${profile.company}` : ' • Wanderlust International Travels'}
              </p>

              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                {profile.bio || 'Curating bespoke international travel itineraries, private chartered flights, luxury safari retreats, and 5-star honeymoon holidays worldwide.'}
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

                <button
                  onClick={() => {
                    const el = document.getElementById('travel-media-space');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-800/40 text-cyan-300 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <PlayCircle className="w-4 h-4 text-cyan-400" />
                  Watch 4K Films &amp; Reels
                </button>

                <button
                  onClick={handleDownloadVCard}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  Save vCard
                </button>

                <button
                  onClick={() => onShare ? onShare() : setIsShareModalOpen(true)}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
                  title="Share Agency"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* =========================================================================
              INSTANT CONTACT BAR WITH AUTHENTIC ORIGINAL BRAND LOGOS (HERO SECTION)
             ========================================================================= */}
          <div className="pt-3">
            <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-cyan-800/40 shadow-xl flex flex-wrap items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs font-black text-white uppercase tracking-wider">
                  Instant Travel Desk Connect:
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {/* Official WhatsApp Logo */}
                <a
                  href={`https://wa.me/${(profile.whatsapp || '919876544036').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi, I am interested in planning a customized holiday package.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-black flex items-center gap-2 shadow-xs transition transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <WhatsAppOriginalLogo className="w-4 h-4 shrink-0" />
                  <span>WhatsApp Concierge</span>
                </a>

                {/* Official Phone Call Logo */}
                <a
                  href={`tel:${profile.phone || '+919876544036'}`}
                  className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-black text-white text-xs font-black flex items-center gap-2 border border-slate-700 shadow-xs transition transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <PhoneCallOriginalLogo className="w-4 h-4 shrink-0" />
                  <span>Call Travel Desk</span>
                </a>

                {/* Official Instagram Gradient Logo */}
                <a
                  href="https://instagram.com/wanderlust_holidays"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-pink-950/40 text-slate-200 text-xs font-black flex items-center gap-2 border border-slate-700 hover:border-pink-500/50 transition transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <InstagramOriginalLogo className="w-4 h-4 shrink-0" />
                  <span>@wanderlust_holidays</span>
                </a>

                {/* Official YouTube Red Logo */}
                <a
                  href="#travel-media-space"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('travel-media-space');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-red-950/40 text-slate-200 text-xs font-black flex items-center gap-2 border border-slate-700 hover:border-red-500/50 transition transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <YouTubeOriginalLogo className="w-4 h-4 shrink-0" />
                  <span>YouTube 4K Films</span>
                </a>

                {/* Official Google Maps Logo */}
                <a
                  href="https://maps.google.com/?q=Aerocity+Worldmark+New+Delhi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 text-xs font-black flex items-center gap-2 border border-slate-700 transition transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <GoogleMapsOriginalLogo className="w-4 h-4 shrink-0" />
                  <span>Delhi &amp; Hyderabad Office</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. NAVIGATION TABS */}
      <nav className="sticky top-0 z-30 bg-[#050D18]/90 backdrop-blur-md border-b border-slate-800/80 py-3 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-start sm:justify-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: 'Overview' },
            { id: 'packages', label: 'Holiday Itineraries' },
            { id: 'services', label: 'Travel Services' },
            { id: 'media', label: '🎬 YouTube & Instagram Space' },
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
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest">Handcrafted Getaways</span>
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
                  className="rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition overflow-hidden group flex flex-col justify-between"
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <img 
                      src={pkg.imageUrl || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'} 
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900/90 text-cyan-300 border border-cyan-800/50 backdrop-blur-md">
                      {pkg.category || 'Holiday Package'}
                    </span>

                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <div className="text-white">
                        <span className="text-[10px] text-slate-300 block uppercase font-medium">Starting from</span>
                        <div className="text-xl font-black text-amber-400">
                          {pkg.currency || '₹'}{pkg.price.toLocaleString('en-IN')}
                          <span className="text-xs text-slate-400 font-normal ml-1">/ person</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                        {pkg.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-3">
                      <button
                        onClick={() => setSelectedPackage(pkg)}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition cursor-pointer"
                      >
                        View Itinerary
                      </button>

                      <button
                        onClick={() => {
                          setTripFormData(prev => ({
                            ...prev,
                            destination: pkg.name
                          }));
                          setIsTripModalOpen(true);
                        }}
                        className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20 flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Inquire on WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION: YOUTUBE & INSTAGRAM WATCH LOUNGE (PLAY RIGHT HERE ON PAGE)
           ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'media') && (
          <section id="travel-media-space" className="space-y-6 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-cyan-800/40 pb-4">
              <div>
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-cyan-400" />
                  Social Media Lounge • Play Here
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                  YouTube 4K Travel Vlogs &amp; Trending Instagram Reels
                </h2>
              </div>
              
              {/* Media Sub-tabs */}
              <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-2xl border border-slate-800 shrink-0">
                <button
                  onClick={() => setMediaTabFilter('all')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                    mediaTabFilter === 'all' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All ({CURATED_TRAVEL_MEDIA.length})
                </button>
                <button
                  onClick={() => setMediaTabFilter('youtube')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    mediaTabFilter === 'youtube' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <YouTubeOriginalLogo className="w-3.5 h-3.5" />
                  <span>YouTube 4K</span>
                </button>
                <button
                  onClick={() => setMediaTabFilter('instagram')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    mediaTabFilter === 'instagram' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <InstagramOriginalLogo className="w-3.5 h-3.5" />
                  <span>Instagram Reels</span>
                </button>
              </div>
            </div>

            {/* MAIN ACTIVE SCREEN (PLAY RIGHT HERE ON PAGE WITHOUT REDIRECTING) */}
            <div className="rounded-3xl bg-slate-900 border border-cyan-800/40 overflow-hidden shadow-2xl">
              <div className="relative aspect-video w-full bg-black">
                {activeMediaItem.type === 'youtube' ? (
                  <iframe
                    src={activeMediaItem.embedUrl}
                    title={activeMediaItem.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col sm:flex-row items-center justify-center p-6 bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950 gap-6">
                    <div className="relative w-48 h-80 rounded-2xl overflow-hidden border-2 border-pink-500/40 shadow-2xl shrink-0 group">
                      <img 
                        src={activeMediaItem.thumbnailUrl} 
                        alt={activeMediaItem.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="w-12 h-12 rounded-full bg-pink-600/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition">
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        </span>
                      </div>
                      <div className="absolute bottom-3 inset-x-3 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-pink-500 text-white text-[9px] font-black uppercase">
                          Instagram Reel
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 text-left max-w-md">
                      <div className="flex items-center gap-2">
                        <InstagramOriginalLogo className="w-5 h-5 shrink-0" />
                        <span className="text-xs font-bold text-pink-400">{activeMediaItem.authorOrChannel}</span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-400 font-medium">{activeMediaItem.views}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">{activeMediaItem.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{activeMediaItem.description}</p>
                      <div className="pt-2 flex items-center gap-3">
                        <a
                          href="https://instagram.com/wanderlust_holidays"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Watch on Instagram App
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Media Title & Description Strip */}
              <div className="p-4 sm:p-5 bg-slate-950/90 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      activeMediaItem.type === 'youtube' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                    }`}>
                      {activeMediaItem.category}
                    </span>
                    <span className="text-xs text-cyan-300 font-semibold">{activeMediaItem.authorOrChannel}</span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs text-slate-400">{activeMediaItem.views}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white">{activeMediaItem.title}</h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/40 px-3 py-1 rounded-xl">
                    ⭐ 100% In-Page HD Playback
                  </span>
                </div>
              </div>
            </div>

            {/* CURATED PLAYLIST THUMBNAILS CAROUSEL */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filteredMedia.map(item => {
                const isSelected = activeMediaItem.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveMediaItem(item)}
                    className={`rounded-2xl p-2.5 sm:p-3 transition cursor-pointer flex flex-col justify-between border text-left ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-400 ring-2 ring-cyan-500/30 shadow-lg'
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 mb-2">
                      <img 
                        src={item.thumbnailUrl} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                          item.type === 'youtube' ? 'bg-red-600 text-white' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        }`}>
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </span>
                      </div>
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-bold text-white">
                        {item.durationOrType}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        {item.type === 'youtube' ? (
                          <YouTubeOriginalLogo className="w-3.5 h-3.5 shrink-0" />
                        ) : (
                          <InstagramOriginalLogo className="w-3.5 h-3.5 shrink-0" />
                        )}
                        <span className="text-[10px] text-slate-400 truncate">{item.authorOrChannel}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* DYNAMIC CUSTOM LINK EMBEDDER (Let users paste ANY YouTube or Instagram link to play here) */}
            <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-800/40 p-5 sm:p-6 shadow-xl">
              <div className="max-w-2xl mx-auto space-y-4 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                  <Tv className="w-3.5 h-3.5" />
                  <span>Play Any Custom YouTube Video or Instagram Reel Here</span>
                </div>
                
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Paste Any Travel YouTube or Instagram Link to Stream In-Page
                </h3>
                
                <p className="text-xs text-slate-400">
                  Paste any YouTube URL (watch, youtu.be, shorts) or Instagram Reel link below to play directly on this website without navigating away.
                </p>

                <form onSubmit={handlePlayCustomMedia} className="flex flex-col sm:flex-row gap-2 pt-1 max-w-xl mx-auto">
                  <input 
                    type="url"
                    value={customMediaUrl}
                    onChange={(e) => setCustomMediaUrl(e.target.value)}
                    placeholder="Paste YouTube or Instagram link e.g. https://www.youtube.com/watch?v=XHTrh-Qz5tA"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-cyan-400 transition"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/30 flex items-center justify-center gap-1.5 transition cursor-pointer shrink-0"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Play Now</span>
                  </button>
                </form>

                {customMediaError && (
                  <p className="text-xs text-red-400 font-medium">{customMediaError}</p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* SECTION: TRAVEL SERVICES */}
        {(activeTab === 'all' || activeTab === 'services') && (
          <section className="space-y-6">
            <div className="border-b border-slate-800/80 pb-4">
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest">End-to-End Assistance</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">Comprehensive Travel Assistance</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((svc) => (
                <div 
                  key={svc.id}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {svc.category || 'Travel Support'}
                      </span>
                      {svc.price > 0 && (
                        <span className="text-xs font-bold text-amber-400">
                          {svc.currency || '₹'}{svc.price.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white">{svc.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{svc.description}</p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-800/60">
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {svc.durationMinutes || 60} mins consultation
                    </span>
                    <button
                      onClick={() => {
                        const whatsappText = encodeURIComponent(`Hi ${profile.name || 'Wanderlust Travels'}, I am inquiring about ${svc.title}.`);
                        const phone = (profile.whatsapp || profile.phone || '919876544036').replace(/[^0-9]/g, '');
                        window.open(`https://wa.me/${phone}?text=${whatsappText}`, '_blank');
                      }}
                      className="text-xs font-semibold text-cyan-300 hover:text-cyan-200 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Inquire</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION: DESTINATIONS GALLERY */}
        {(activeTab === 'all' || activeTab === 'destinations') && (
          <section className="space-y-6">
            <div className="border-b border-slate-800/80 pb-4">
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest">Travel In Pictures</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">Destination Highlights</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {displayGallery.map((item) => (
                <div 
                  key={item.id}
                  className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800"
                >
                  <img 
                    src={item.url} 
                    alt={item.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-100 transition" />
                  <span className="absolute bottom-3 left-3 right-3 text-xs font-bold text-white truncate">
                    {item.caption}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION: REVIEWS */}
        {(activeTab === 'all' || activeTab === 'reviews') && (
          <section className="space-y-6">
            <div className="border-b border-slate-800/80 pb-4">
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest">Verified Guest Feedback</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">Memories Shared by Clients</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayTestimonials.map((t) => (
                <div 
                  key={t.id}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3"
                >
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                    "{t.comment}"
                  </p>
                  <div>
                    <h4 className="text-xs font-bold text-white">{t.name}</h4>
                    <span className="text-[11px] text-cyan-400">{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. BOTTOM AGENCY CONTACT CARD */}
        <section className="p-6 rounded-3xl bg-gradient-to-br from-cyan-950/50 via-slate-900 to-slate-950 border border-cyan-800/30 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <h3 className="text-lg font-bold text-white">Need a Handcrafted Holiday Itinerary?</h3>
              <p className="text-xs text-slate-400">Customized quote within 60 minutes with flight comparisons &amp; resort choices.</p>
            </div>
            <button
              onClick={() => setIsTripModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              Get Free Trip Quote
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
            {profile.phone && (
              <a href={`tel:${profile.phone}`} className="flex items-center gap-2 hover:text-white transition">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>{profile.phone}</span>
              </a>
            )}
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="flex items-center gap-2 hover:text-white transition">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span className="truncate">{profile.email}</span>
              </a>
            )}
            {profile.address && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="truncate">{profile.address}</span>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* TRIP INQUIRY MODAL */}
      {isTripModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700 p-6 sm:p-8 space-y-6 shadow-2xl">
            <button 
              onClick={() => setIsTripModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Personal Concierge</span>
              <h3 className="text-xl font-bold text-white">Plan Your Next Vacation</h3>
              <p className="text-xs text-slate-400">Share your preferred destination and dates for a customized itinerary on WhatsApp.</p>
            </div>

            {tripSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-white">Inquiry Sent via WhatsApp!</h4>
                <p className="text-xs text-slate-400">Opening WhatsApp with your trip details pre-filled.</p>
              </div>
            ) : (
              <form onSubmit={handleTripSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">Your Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={tripFormData.name}
                      onChange={e => setTripFormData({...tripFormData, name: e.target.value})}
                      placeholder="e.g. Rahul Sharma"
                      className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">WhatsApp Mobile *</label>
                    <input 
                      type="tel" 
                      required
                      value={tripFormData.phone}
                      onChange={e => setTripFormData({...tripFormData, phone: e.target.value})}
                      placeholder="e.g. 9876543210"
                      className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Destination of Choice *</label>
                  <select
                    value={tripFormData.destination}
                    onChange={e => setTripFormData({...tripFormData, destination: e.target.value})}
                    className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-hidden focus:border-cyan-400"
                  >
                    <option value="Bali Private Pool Villa & Island Escape">Bali &amp; Southeast Asia</option>
                    <option value="Dubai Luxury Extravaganza & Desert Camp">Dubai Luxury &amp; Desert Safari</option>
                    <option value="Swiss Alps & Scenic Glaciers Explorer">Swiss Alps &amp; Europe Highlights</option>
                    <option value="Kashmir Paradise — Srinagar & Gulmarg Snow">Kashmir Valley &amp; Snow Gulmarg</option>
                    <option value="Kerala Backwaters Houseboat & Munnar">Kerala Backwaters &amp; Munnar</option>
                    <option value="Goa Luxury Beachside Pool Villa">Goa Beachfront Stays</option>
                    <option value="Custom International Destination">Other Custom International</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">Tentative Month</label>
                    <input 
                      type="text" 
                      value={tripFormData.travelMonth}
                      onChange={e => setTripFormData({...tripFormData, travelMonth: e.target.value})}
                      placeholder="e.g. November 2026"
                      className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">Trip Duration</label>
                    <select
                      value={tripFormData.durationDays}
                      onChange={e => setTripFormData({...tripFormData, durationDays: e.target.value})}
                      className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-hidden focus:border-cyan-400"
                    >
                      <option value="3 - 4 Days">Weekend Getaway (3 - 4 Days)</option>
                      <option value="5 - 7 Days">Standard Holiday (5 - 7 Days)</option>
                      <option value="8 - 12 Days">Grand Vacation (8 - 12 Days)</option>
                      <option value="14+ Days">Long Stay / Multi-Country (14+ Days)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Travel Party</label>
                  <select
                    value={tripFormData.travelers}
                    onChange={e => setTripFormData({...tripFormData, travelers: e.target.value})}
                    className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-hidden focus:border-cyan-400"
                  >
                    <option value="Couple (Honeymoon / Romantic)">Couple (Honeymoon / Romantic)</option>
                    <option value="Family with Kids (3 - 5 Pax)">Family with Kids (3 - 5 Pax)</option>
                    <option value="Friends Group (4 - 10 Pax)">Friends Group (4 - 10 Pax)</option>
                    <option value="Solo Traveler">Solo Traveler</option>
                    <option value="Corporate / MICE Group (10+ Pax)">Corporate / MICE Group (10+ Pax)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send WhatsApp Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ITINERARY DETAIL MODAL */}
      {selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700 p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedPackage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                {selectedPackage.category || 'Curated Itinerary'}
              </span>
              <h3 className="text-xl font-bold text-white">{selectedPackage.name}</h3>
              <div className="text-lg font-black text-amber-400">
                {selectedPackage.currency || '₹'}{selectedPackage.price.toLocaleString('en-IN')}
                <span className="text-xs text-slate-400 font-normal ml-1">/ person all-inclusive</span>
              </div>
            </div>

            <div className="h-48 rounded-2xl overflow-hidden">
              <img 
                src={selectedPackage.imageUrl || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'} 
                alt={selectedPackage.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <h4 className="font-bold text-white text-sm">Package Highlights &amp; Inclusions:</h4>
              <p>{selectedPackage.description}</p>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400 pt-1">
                <li>Daily luxury buffet breakfast &amp; welcome drink on arrival</li>
                <li>Private AC airport transfers &amp; guided day excursions</li>
                <li>Verified 4-star / 5-star resort accommodations</li>
                <li>24/7 dedicated on-ground WhatsApp trip concierge</li>
              </ul>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-800">
              <button
                onClick={() => setSelectedPackage(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const pkgName = selectedPackage.name;
                  setSelectedPackage(null);
                  setTripFormData(prev => ({ ...prev, destination: pkgName }));
                  setIsTripModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 flex items-center gap-1.5 transition cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Book via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SHARE MODAL */}
      {isShareModalOpen && (
        <ShareCardModal
          onClose={() => setIsShareModalOpen(false)}
          profile={profile}
        />
      )}
    </div>
  );
}

// ==========================================
// AUTHENTIC ORIGINAL BRAND SVG LOGOS
// ==========================================
function WhatsAppOriginalLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="12" fill="#25D366" />
      <path
        d="M17.5 14.3c-.2-.1-1.3-.6-1.5-.7-.2-.1-.4-.1-.5.1-.2.2-.6.7-.7.9-.1.1-.3.2-.5.1-.2-.1-.9-.3-1.7-1-.6-.6-1-1.2-1.1-1.4-.1-.2 0-.3.1-.4.1-.1.2-.2.3-.4.1-.1.1-.2.2-.3 0-.1 0-.2 0-.3s-.5-1.2-.7-1.6c-.2-.4-.4-.4-.5-.4h-.4c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.4 3.9 3.4.5.2 1 .4 1.3.5.6.2 1.1.2 1.5.1.5-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1z"
        fill="white"
      />
    </svg>
  );
}

function InstagramOriginalLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <defs>
        <radialGradient id="ig-grad-hero-travel" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6.5" fill="url(#ig-grad-hero-travel)" />
      <path
        d="M12 6.5A5.5 5.5 0 1 0 12 17.5 5.5 5.5 0 0 0 12 6.5zm0 9A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7zm5.2-9.2a1.3 1.3 0 1 1-2.6 0 1.3 1.3 0 0 1 2.6 0z"
        fill="white"
      />
    </svg>
  );
}

function YouTubeOriginalLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect width="24" height="24" rx="6" fill="#FF0000" />
      <path d="M9.5 8l6 4-6 4V8z" fill="white" />
    </svg>
  );
}

function GoogleMapsOriginalLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EA4335" />
      <circle cx="12" cy="9" r="3.2" fill="#FFFFFF" />
      <circle cx="12" cy="9" r="1.8" fill="#4285F4" />
    </svg>
  );
}

function PhoneCallOriginalLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="12" fill="#0F172A" />
      <path
        d="M7.5 9.5c.9 1.8 2.2 3.1 4 4l1.3-1.3c.2-.2.5-.2.7-.1.8.3 1.6.4 2.5.4.4 0 .7.3.7.7v2.3c0 .4-.3.7-.7.7C10.5 20.2 3.8 13.5 3.8 5.2c0-.4.3-.7.7-.7H6.8c.4 0 .7.3.7.7 0 .9.1 1.7.4 2.5.1.2.1.5-.1.7L7.5 9.5z"
        fill="#10B981"
      />
    </svg>
  );
}
