'use client';

import React, { useState, useMemo, useRef } from 'react';
import { 
  Building2, 
  Building,
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Download, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Star, 
  ArrowRight, 
  Maximize2, 
  Share2, 
  ExternalLink, 
  Layers, 
  Search, 
  Calculator, 
  Clock, 
  Check, 
  Award, 
  Home, 
  FileText, 
  Menu,
  X, 
  Navigation,
  Play,
  Pause,
  Volume2,
  VolumeX,
  BadgeCheck,
  ChevronRight,
  QrCode,
  Film,
  Copy,
  Globe,
  SlidersHorizontal,
  ChevronDown,
  RotateCcw,
  IndianRupee,
  Compass,
  ArrowUpRight,
  BedDouble,
  Bath,
  Eye,
  FileDown
} from 'lucide-react';
import { DigitalProfile, VideoItem } from '@/lib/types';
import ShareCardModal from '@/components/common/ShareCardModal';
import { downloadVcfFile } from '@/lib/vcf';

interface RealEstateMiniWebsiteViewProps {
  profile: DigitalProfile;
  trackAction?: (action: string) => void;
  getCleanWhatsAppNumber?: (p: DigitalProfile) => string;
  getEmbedUrl?: (v: VideoItem) => string;
  viewMode?: 'mobile' | 'website';
  setViewMode?: (m: 'mobile' | 'website') => void;
  showViewToggle?: boolean;
  isMockup?: boolean;
}

export interface RealEstateFloorPlan {
  id: string;
  title: string;
  bhk: string;
  category: 'Master Layout' | '1 BHK' | '2 BHK' | '3 BHK' | '4 BHK';
  superArea: string;
  carpetArea: string;
  efficiency?: string;
  balconyArea?: string;
  bedrooms?: number | string;
  bathrooms?: number | string;
  facing: string;
  price: string;
  priceNum?: number;
  estEmi?: string;
  imageUrl: string;
  view3dUrl?: string;
  tag?: string;
  roomSpecs?: { name: string; size: string }[];
}

export interface RealEstateAmenity {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tag?: string;
}

export interface RealEstateInteriorRoom {
  id: string;
  name: string;
  subtitle: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  posterUrl?: string;
}

export interface RealEstateNearbyLandmark {
  id: string;
  title: string;
  distance: string;
  category: string;
}

export function getYoutubeVideoId(url?: string): string {
  if (!url) return '';
  const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/);
  return (match && match[2].length === 11) ? match[2] : '';
}

export function getYoutubeEmbedUrl(url?: string): string {
  if (!url) return '';
  if (url.includes('youtube.com/embed/')) return url;
  const id = getYoutubeVideoId(url);
  return id 
    ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1` 
    : url;
}

export function getInstagramEmbedUrl(url?: string): string {
  if (!url) return '';
  const match = url.match(/instagram\.com\/(?:reel|p|tv)\/([^/?#&]+)/i);
  return match 
    ? `https://www.instagram.com/reel/${match[1]}/embed` 
    : url;
}

export const DEFAULT_REAL_ESTATE_VIDEOS = [
  {
    id: 'vid-yt-1',
    title: 'Skyline Imperia — 4K Aerial Drone Layout Tour & Surroundings',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    type: 'youtube' as const,
    caption: '4K aerial drone flight showcasing 100ft arterial roads, upcoming metro line, and clubhouse elevation.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'vid-yt-2',
    title: 'Model 4 BHK Sky Residence — Complete Architectural Walkthrough',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    type: 'youtube' as const,
    caption: 'Walkthrough of master suite, panoramic deck balcony, Italian marble foyer, and smart home automation.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'vid-ig-1',
    title: 'Skyline Aeropolis — Rapid Site Progression & Blacktop Roads',
    url: 'https://www.instagram.com/reel/C3M8W98oG12/',
    type: 'instagram' as const,
    caption: 'Latest on-site reel: Underground cabling, street illumination, and demarcated boundary stones.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'vid-ig-2',
    title: 'Skyline Grandeur Triplex Villas — Clubhouse & Pool Reel Tour',
    url: 'https://www.instagram.com/reel/C2X4Z81oH34/',
    type: 'instagram' as const,
    caption: 'Exclusive reel walkthrough of private plunge pool, double-height living room, and landscaped lawns.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'vid-yt-3',
    title: 'Skyline Business Hub — Grade-A Corporate IT Park Overview',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    type: 'youtube' as const,
    caption: 'Grade-A LEED Platinum certified office campus, double glazed glass facade & 8.4% gross rental yield.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'vid-ig-3',
    title: 'Key Handover Ceremony & Happy Homeowners Celebration',
    url: 'https://www.instagram.com/reel/C1k8P98oY99/',
    type: 'instagram' as const,
    caption: 'Welcoming 45 happy families to their dream home with on-time registration and champagne handover.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'
  }
];

export default function RealEstateMiniWebsiteView({
  profile,
  trackAction = () => {},
  getCleanWhatsAppNumber,
  getEmbedUrl,
  viewMode = 'website',
  setViewMode,
  showViewToggle = false,
  isMockup = false
}: RealEstateMiniWebsiteViewProps) {
  // State for interactive modals and drawer
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSiteVisitModalOpen, setIsSiteVisitModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [isEmiModalOpen, setIsEmiModalOpen] = useState(false);

  // Advanced Floor Plan States (Filtering, 2D/3D Switcher, Specs Drawer)
  const [activePlanTab, setActivePlanTab] = useState<string>('All');
  const [cardViewModes, setCardViewModes] = useState<Record<string, '2d' | '3d'>>({});
  const [selectedPlanDetails, setSelectedPlanDetails] = useState<RealEstateFloorPlan | null>(null);
  
  // Lightbox Media Preview Modal (Exact FlagUp feature)
  const [previewMedia, setPreviewMedia] = useState<{
    url: string;
    type: 'image' | 'video';
    title: string;
    subtitle?: string;
  } | null>(null);

  // Video Section Player State
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Inline Video & Instagram Reels State (Plays right in place - no redirects)
  const [activeVideoFilter, setActiveVideoFilter] = useState<'all' | 'youtube' | 'instagram'>('all');
  const [activeInlineVideoId, setActiveInlineVideoId] = useState<string | null>(null);

  const allProjectVideos: VideoItem[] = useMemo(() => {
    const customVideos = profile.sectionData?.videos?.items || [];
    if (customVideos.length > 0) return customVideos;
    return DEFAULT_REAL_ESTATE_VIDEOS;
  }, [profile.sectionData?.videos?.items]);

  const filteredProjectVideos = useMemo(() => {
    if (activeVideoFilter === 'youtube') {
      return allProjectVideos.filter(v => v.type === 'youtube' || v.url.includes('youtube.com') || v.url.includes('youtu.be'));
    }
    if (activeVideoFilter === 'instagram') {
      return allProjectVideos.filter(v => v.type === 'instagram' || v.url.includes('instagram.com'));
    }
    return allProjectVideos;
  }, [allProjectVideos, activeVideoFilter]);

  const youtubeVideosCount = useMemo(() => {
    return allProjectVideos.filter(v => v.type === 'youtube' || v.url.includes('youtube.com') || v.url.includes('youtu.be')).length;
  }, [allProjectVideos]);

  const instagramVideosCount = useMemo(() => {
    return allProjectVideos.filter(v => v.type === 'instagram' || v.url.includes('instagram.com')).length;
  }, [allProjectVideos]);

  // Background Audio Control State
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Form states
  const [siteVisitForm, setSiteVisitForm] = useState({
    name: '',
    phone: '',
    date: '',
    timeSlot: '11:00 AM - 01:00 PM',
    bhkPreference: '3 BHK Luxury Suite',
    pickupRequired: true
  });
  const [siteVisitSuccess, setSiteVisitSuccess] = useState(false);

  const [brochureForm, setBrochureForm] = useState({
    name: '',
    phone: '',
    email: '',
    project: ''
  });
  const [brochureSuccess, setBrochureSuccess] = useState(false);

  // EMI Calculator State
  const [emiPropertyCost, setEmiPropertyCost] = useState<number>(8500000);
  const [emiDownPaymentPct, setEmiDownPaymentPct] = useState<number>(20);
  const [emiInterestRate, setEmiInterestRate] = useState<number>(8.5);
  const [emiTenureYears, setEmiTenureYears] = useState<number>(20);

  // User details & fallback resolution
  const projectName = useMemo(() => {
    return profile.company || profile.name || 'THE MILLENNIAL TOWERS';
  }, [profile.company, profile.name]);

  const projectTagline = useMemo(() => {
    return (profile.sectionData?.realEstate as any)?.tagline || 
      (profile as any).tagline || 
      profile.designation ||
      'LIVE THE MILLENNIAL HIGH LIFE • LUXURIOUS COMMUNITY';
  }, [profile.sectionData?.realEstate, (profile as any).tagline, profile.designation]);

  const userCity = useMemo(() => {
    if (profile.sectionData?.realEstate?.city) {
      return profile.sectionData.realEstate.city.split('•')[0].trim();
    }
    if (!profile.address) return 'Financial District';
    const parts = profile.address.split(',').map(s => s.trim());
    return parts[parts.length - 2] || parts[parts.length - 1] || parts[0] || 'Financial District';
  }, [profile.address, profile.sectionData?.realEstate?.city]);

  const displayRera = useMemo(() => {
    return profile.sectionData?.realEstate?.reraId || 'TS-RERA/P02400008921';
  }, [profile.sectionData?.realEstate?.reraId]);

  const cleanPhone = useMemo(() => {
    if (getCleanWhatsAppNumber) return getCleanWhatsAppNumber(profile);
    return profile.whatsapp ? profile.whatsapp.replace(/[^0-9]/g, '') : (profile.phone ? profile.phone.replace(/[^0-9]/g, '') : '917439084592');
  }, [profile, getCleanWhatsAppNumber]);

  const cleanCallNumber = useMemo(() => {
    const raw = profile.phone || profile.whatsapp || '+917439084592';
    return raw.replace(/[^0-9+]/g, '');
  }, [profile.phone, profile.whatsapp]);

  const displayEmail = useMemo(() => {
    return profile.email || 'info@luxurydevelopments.com';
  }, [profile.email]);

  const displayAddress = useMemo(() => {
    return profile.sectionData?.realEstate?.mapAddress || 
      profile.address || 
      `Sector 45, Near Metro Station, ${userCity}`;
  }, [profile.sectionData?.realEstate?.mapAddress, profile.address, userCity]);

  // Showcase Video Source resolution (supports custom MP4 or YouTube)
  const showcaseVideoSrc = useMemo(() => {
    if (profile.sectionData?.realEstate?.videoUrl) {
      return profile.sectionData.realEstate.videoUrl;
    }
    const firstCustomVideo = (profile.sectionData?.videos?.items || [])[0];
    if (firstCustomVideo?.url) {
      return firstCustomVideo.url;
    }
    return 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-architecture-walkthrough-40995-large.mp4';
  }, [profile.sectionData?.realEstate?.videoUrl, profile.sectionData?.videos?.items]);

  const isYouTubeVideo = useMemo(() => {
    return showcaseVideoSrc.includes('youtube.com') || showcaseVideoSrc.includes('youtu.be');
  }, [showcaseVideoSrc]);

  const youTubeEmbedUrl = useMemo(() => {
    if (!isYouTubeVideo) return '';
    const match = showcaseVideoSrc.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    return match && match[1] ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0` : '';
  }, [showcaseVideoSrc, isYouTubeVideo]);

  // Social Links
  const socialItems = useMemo(() => {
    return profile.sectionData?.socials?.items || (profile as any).socialLinks || [];
  }, [profile]);

  const getSocialLink = (platform: string, fallback: string) => {
    const found = socialItems.find((s: any) => s.platform?.toLowerCase() === platform.toLowerCase());
    return found?.url || fallback;
  };

  const facebookUrl = getSocialLink('facebook', 'https://facebook.com/');
  const instagramUrl = getSocialLink('instagram', 'https://instagram.com/');
  const youtubeUrl = getSocialLink('youtube', 'https://youtube.com/');

  // Advanced Floor plans (FlagUp Layout Plans upgraded with 2D/3D & Specs)
  const layoutPlans: RealEstateFloorPlan[] = useMemo(() => {
    const rawProducts = profile.sectionData?.products?.items || [];
    if (rawProducts.length > 0) {
      return rawProducts.map((p, idx) => {
        const isBhk1 = p.name.includes('1') && p.name.includes('BHK');
        const isBhk2 = p.name.includes('2') && p.name.includes('BHK');
        const isBhk3 = p.name.includes('3') && p.name.includes('BHK');
        const isBhk4 = (p.name.includes('4') || p.name.includes('5')) && p.name.includes('BHK');
        let cat: 'Master Layout' | '1 BHK' | '2 BHK' | '3 BHK' | '4 BHK' = '3 BHK';
        if (isBhk1) cat = '1 BHK';
        else if (isBhk2) cat = '2 BHK';
        else if (isBhk4) cat = '4 BHK';
        else if (idx === 0 && !p.name.includes('BHK')) cat = 'Master Layout';

        const priceVal = p.price || (4500000 + idx * 3500000);
        return {
          id: p.id || `plan_${idx}`,
          title: p.name || `Architectural Unit #${idx + 1}`,
          category: cat,
          bhk: p.name.includes('BHK') ? p.name : `${(idx % 3) + 1} BHK Luxury Suite`,
          superArea: `${1150 + idx * 350} Sq.Ft`,
          carpetArea: `${850 + idx * 280} Sq.Ft`,
          efficiency: '78% RERA Usable Ratio',
          balconyArea: `${95 + idx * 25} Sq.Ft Deck`,
          bedrooms: (idx % 3) + 1,
          bathrooms: (idx % 3) + 1,
          facing: idx % 2 === 0 ? 'East Facing (100% Vastu)' : 'North-East Corner Facing',
          price: p.price ? `₹ ${p.price.toLocaleString('en-IN')}` : `₹ ${(priceVal / 100000).toFixed(1)} Lakhs*`,
          priceNum: priceVal,
          estEmi: `₹ ${Math.round((priceVal * 0.8 * 0.085 / 12) * 1.5).toLocaleString('en-IN')}/mo*`,
          imageUrl: p.imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          view3dUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
          tag: idx === 0 ? 'Tower Floor Plate' : (idx === 2 ? 'High Demand' : 'Few Units Left'),
          roomSpecs: [
            { name: 'Living & Dining Foyer', size: `${18 + idx}'0" x ${12 + idx}'6"` },
            { name: 'Master Suite Bedroom', size: `${14 + idx}'0" x ${12}'0"` },
            { name: 'Designer Modular Kitchen', size: "11'0\" x 9'6\"" },
            { name: 'Panoramic Balcony Deck', size: `${12 + idx}'0" x 5'6"` }
          ]
        };
      });
    }
    return [
      {
        id: 'plan_master',
        title: 'Master Tower Cluster Layout (G+22)',
        category: 'Master Layout',
        bhk: 'All Towers Core & Wing Plate',
        superArea: 'Floor Plate: 9,850 Sq.Ft',
        carpetArea: 'Optimal Core & Lift Lobby',
        efficiency: '84% Structural Usability',
        balconyArea: 'Wrap-around Corner Terraces',
        bedrooms: 'N/A',
        bathrooms: 'Common Core',
        facing: 'East / West Dual Core Orientation',
        price: 'All Units Approved',
        priceNum: 5500000,
        estEmi: 'Varying by Unit',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        view3dUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        tag: 'Master Blueprint',
        roomSpecs: [
          { name: 'High-Speed Lift Core', size: '4 Passenger Lifts + 1 Service Lift' },
          { name: 'Fire Escape Staircases', size: 'Dual Pressurized Exits' },
          { name: 'Corridor Width', size: '6 Feet Ventilated Lobby' },
          { name: 'Refuge Terrace Areas', size: 'Located on 8th, 14th & 20th Floors' }
        ]
      },
      {
        id: 'plan_1bhk',
        title: '1 BHK Smart Executive Suite',
        category: '1 BHK',
        bhk: '1 BHK + 1 Bath + Private Balcony',
        superArea: '685 Sq.Ft',
        carpetArea: '520 Sq.Ft',
        efficiency: '76% Usable Carpet Ratio',
        balconyArea: '65 Sq.Ft Sit-out',
        bedrooms: 1,
        bathrooms: 1,
        facing: 'East Facing (100% Vastu)',
        price: '₹ 42.5 Lakhs*',
        priceNum: 4250000,
        estEmi: '₹ 28,200/mo*',
        imageUrl: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80',
        view3dUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        tag: 'High Rental Yield',
        roomSpecs: [
          { name: 'Drawing & Dining Lounge', size: "15'6\" x 10'6\"" },
          { name: 'Master Bedroom', size: "12'0\" x 11'0\"" },
          { name: 'Modular Kitchen & Utility', size: "8'6\" x 7'0\"" },
          { name: 'Balcony Deck', size: "10'6\" x 4'6\"" }
        ]
      },
      {
        id: 'plan_2bhk',
        title: '2 BHK Grand Premium Residence',
        category: '2 BHK',
        bhk: '2 BHK + 2 Baths + Double Balcony',
        superArea: '1,180 Sq.Ft',
        carpetArea: '890 Sq.Ft',
        efficiency: '78% Usable Carpet Ratio',
        balconyArea: '110 Sq.Ft Double Balconies',
        bedrooms: 2,
        bathrooms: 2,
        facing: 'North-East Corner Facing',
        price: '₹ 78.9 Lakhs*',
        priceNum: 7890000,
        estEmi: '₹ 52,400/mo*',
        imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        view3dUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
        tag: 'Most Popular',
        roomSpecs: [
          { name: 'Living Room Foyer', size: "17'6\" x 12'0\"" },
          { name: 'Master Suite Bedroom', size: "14'0\" x 12'0\"" },
          { name: 'Children / Guest Bed', size: "12'0\" x 11'0\"" },
          { name: 'Modular European Kitchen', size: "10'0\" x 8'6\"" },
          { name: 'Scenic Balcony', size: "12'0\" x 5'0\"" }
        ]
      },
      {
        id: 'plan_3bhk',
        title: '3 BHK Sky Palace Villa',
        category: '3 BHK',
        bhk: '3 BHK + 3 Baths + Wrap-around Balcony',
        superArea: '1,750 Sq.Ft',
        carpetArea: '1,380 Sq.Ft',
        efficiency: '79% Usable Carpet Ratio',
        balconyArea: '160 Sq.Ft Wrap-around Terrace',
        bedrooms: 3,
        bathrooms: 3,
        facing: 'East Facing with Sunrise View',
        price: '₹ 1.25 Crore*',
        priceNum: 12500000,
        estEmi: '₹ 82,900/mo*',
        imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
        view3dUrl: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
        tag: 'Luxury Signature',
        roomSpecs: [
          { name: 'Grand Living & Dining Hall', size: "22'0\" x 14'6\"" },
          { name: 'King Master Suite with Walk-in', size: "16'0\" x 13'6\"" },
          { name: 'Bedroom 2 (Attached Bath)', size: "14'0\" x 12'0\"" },
          { name: 'Bedroom 3 / Home Office', size: "12'6\" x 11'6\"" },
          { name: 'Gourmet Kitchen + Dry Balcony', size: "12'0\" x 9'6\"" },
          { name: 'Wrap-around Skyline Deck', size: "18'0\" x 6'0\"" }
        ]
      },
      {
        id: 'plan_4bhk',
        title: '4 BHK Royal Duplex Penthouse',
        category: '4 BHK',
        bhk: '4 BHK Duplex + Private Plunge Pool & Deck',
        superArea: '2,650 Sq.Ft',
        carpetArea: '2,080 Sq.Ft',
        efficiency: '78.5% Usable Carpet Ratio',
        balconyArea: '320 Sq.Ft Rooftop Terrace Garden',
        bedrooms: 4,
        bathrooms: 5,
        facing: '100% Vastu Compliant (North-East)',
        price: '₹ 1.89 Crore*',
        priceNum: 18900000,
        estEmi: '₹ 1,25,000/mo*',
        imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        view3dUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
        tag: 'Ultra HNW Penthouse',
        roomSpecs: [
          { name: 'Double-Height Living Salon', size: "26'0\" x 16'0\"" },
          { name: 'Presidential Master Suite', size: "18'6\" x 15'0\"" },
          { name: 'Private Plunge Pool & Sky Deck', size: "20'0\" x 12'0\"" },
          { name: 'Family Lounge (Upper Tier)', size: "16'0\" x 13'0\"" },
          { name: 'Chef Kitchen & Butler Pantry', size: "14'0\" x 10'0\"" }
        ]
      }
    ];
  }, [profile.sectionData?.products?.items]);

  // Plan Category Tabs
  const planCategories = useMemo(() => {
    const defaultTabs = ['All', 'Master Layout', '1 BHK', '2 BHK', '3 BHK', '4 BHK'];
    return defaultTabs.filter(cat => cat === 'All' || layoutPlans.some(p => p.category === cat || p.bhk.includes(cat)));
  }, [layoutPlans]);

  // Filtered Plans based on active tab
  const filteredPlans = useMemo(() => {
    if (activePlanTab === 'All') return layoutPlans;
    return layoutPlans.filter(p => p.category === activePlanTab || p.bhk.includes(activePlanTab));
  }, [layoutPlans, activePlanTab]);

  // Project Amenities matching FlagUp's exact visual cards
  const projectAmenities: RealEstateAmenity[] = useMemo(() => {
    return [
      {
        id: 'am_1',
        title: 'Swimming Pool & Sun Deck',
        description: 'Temperature-controlled lap pool with poolside cabanas',
        imageUrl: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
        tag: 'Leisure'
      },
      {
        id: 'am_2',
        title: 'Grand Lifestyle Clubhouse',
        description: 'Multi-level clubhouse with private screening theater & banquet',
        imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        tag: 'Community'
      },
      {
        id: 'am_3',
        title: 'Fully Equipped Gymnasium',
        description: 'World-class fitness center with cardio and strength zones',
        imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
        tag: 'Wellness'
      },
      {
        id: 'am_4',
        title: 'Landscaped Aroma Gardens',
        description: 'Botanical walkways, meditation gazebos, and water fountains',
        imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
        tag: 'Nature'
      },
      {
        id: 'am_5',
        title: 'Kids Adventure Play Arena',
        description: 'Safe rubberized flooring, swings, slides & interactive play zones',
        imageUrl: 'https://images.unsplash.com/photo-1596464716127-f2a829822301?auto=format&fit=crop&w=800&q=80',
        tag: 'Kids'
      },
      {
        id: 'am_6',
        title: '24/7 Security & High-Res CCTV',
        description: '3-tier security shield with RFID boom barriers and smart surveillance',
        imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
        tag: 'Safety'
      },
      {
        id: 'am_7',
        title: '100% DG Power Backup',
        description: 'Uninterrupted power support for all apartments and common areas',
        imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
        tag: 'Utility'
      },
      {
        id: 'am_8',
        title: 'EV Smart Charging Stations',
        description: 'Dedicated high-speed electric vehicle charging docks in basement',
        imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
        tag: 'Eco'
      },
      {
        id: 'am_9',
        title: 'Indoor Sports & Badminton Arena',
        description: 'High-ceiling wooden indoor badminton court & table tennis hall',
        imageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80',
        tag: 'Sports'
      },
      {
        id: 'am_10',
        title: 'Jogging & Cycling Track',
        description: 'Dedicated reflexology path and tree-lined cycling avenue',
        imageUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80',
        tag: 'Fitness'
      },
      {
        id: 'am_11',
        title: 'Rooftop Sky Lounge',
        description: 'Panoramic skyline viewing deck with stargazing telescope',
        imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        tag: 'Luxury'
      },
      {
        id: 'am_12',
        title: 'Yoga & Meditation Pavilion',
        description: 'Open-air peaceful pavilion surrounded by tranquil water features',
        imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
        tag: 'Zen'
      }
    ];
  }, []);

  // Interior Room Walkthroughs (FlagUp Interior section)
  const interiorRooms: RealEstateInteriorRoom[] = useMemo(() => {
    return [
      {
        id: 'int_1',
        name: 'Drawing Room & Foyer',
        subtitle: 'Double-height Italian marble living lounge with panoramic deck',
        mediaType: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'int_2',
        name: 'Master Suite Bedroom',
        subtitle: 'Hardwood acoustic flooring with walk-in wardrobe and balcony',
        mediaType: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'int_3',
        name: 'Designer Modular Kitchen',
        subtitle: 'European acrylic cabinetry, quartz countertop & breakfast bar',
        mediaType: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'int_4',
        name: 'Luxury Spa Bath Room',
        subtitle: 'Grohe & Kohler sanitary fittings with frameless glass shower cubicle',
        mediaType: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'int_5',
        name: 'Open Air Balcony Lounge',
        subtitle: 'Wide wrap-around sit-out deck with garden view & evening breeze',
        mediaType: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'int_6',
        name: 'Kids Play & Study Suite',
        subtitle: 'Ergonomic study nook with ample natural lighting and storage',
        mediaType: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
      }
    ];
  }, []);

  // Near By Locations (FlagUp Near By Locations section with emerald background & gold borders)
  const nearbyLandmarks: RealEstateNearbyLandmark[] = useMemo(() => {
    return [
      { id: 'nb_1', title: 'Metro Station', distance: '5 Mins', category: 'Transit' },
      { id: 'nb_2', title: 'National Highway NH48', distance: '2 Mins', category: 'Expressway' },
      { id: 'nb_3', title: 'International Airport', distance: '25 Mins', category: 'Flight' },
      { id: 'nb_4', title: 'Top International Schools', distance: '8 Mins', category: 'Education' },
      { id: 'nb_5', title: 'IT Parks & Financial Hub', distance: '15 Mins', category: 'Business' },
      { id: 'nb_6', title: 'Super Specialty Hospital', distance: '6 Mins', category: 'Healthcare' },
      { id: 'nb_7', title: 'Central Mall & Multiplex', distance: '10 Mins', category: 'Retail' },
      { id: 'nb_8', title: 'Championship Golf Club', distance: '12 Mins', category: 'Recreation' }
    ];
  }, []);

  // Project Gallery (FlagUp Gallery section)
  const galleryImages = useMemo(() => {
    const custom = (profile.sectionData?.gallery?.items || []).map(g => g.imageUrl);
    if (custom.length > 0) return custom;
    return [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80'
    ];
  }, [profile.sectionData?.gallery?.items]);

  // Video Section Highlights (Numbered circles in #F8CD71)
  const videoFeatureList = useMemo(() => {
    return [
      {
        num: 1,
        title: 'Lifestyle Amenities On The 3rd Floor',
        desc: 'Dedicated recreational deck featuring infinity pool, yoga lawn, and clubhouse lounge.'
      },
      {
        num: 2,
        title: 'Branded Finishes & High-End Fixtures',
        desc: 'Imported marble, engineered hardwood, and world-class bathroom sanitary fittings.'
      },
      {
        num: 3,
        title: 'Panoramic Balcony Views & Wrap-Around Terraces',
        desc: 'Unobstructed scenic vistas, cross ventilation, and generous natural daylight.'
      },
      {
        num: 4,
        title: '100% Vastu Compliant Architecture & High-Speed Lifts',
        desc: 'Scientifically oriented unit entrances and Otis/Schindler biometric access elevators.'
      },
      {
        num: 5,
        title: 'Prime Location with Metro & Expressway Connectivity',
        desc: 'Direct signal-free connectivity to major commercial, airport, and IT hubs.'
      }
    ];
  }, []);

  // WhatsApp click handler
  const handleWhatsAppChat = (subject: string, messageText?: string) => {
    trackAction(`whatsapp_${subject}`);
    const defaultMsg = messageText || `Hello ${projectName}, I saw your Real Estate Smart Link showcase. Please share floor plans, pricing details, and schedule a site visit.`;
    const encoded = encodeURIComponent(defaultMsg);
    window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, '_blank');
  };

  // Site Visit Form Submit
  const handleSiteVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackAction('site_visit_booked');
    setSiteVisitSuccess(true);
    const msg = `*New Site Visit Scheduled!*%0A%0A*Name:* ${siteVisitForm.name}%0A*Phone:* ${siteVisitForm.phone}%0A*Date:* ${siteVisitForm.date}%0A*Slot:* ${siteVisitForm.timeSlot}%0A*Unit:* ${siteVisitForm.bhkPreference}%0A*Chauffeur Required:* ${siteVisitForm.pickupRequired ? 'YES' : 'NO'}`;
    setTimeout(() => {
      window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
      setIsSiteVisitModalOpen(false);
      setSiteVisitSuccess(false);
    }, 1200);
  };

  // Brochure Download Submit
  const handleBrochureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackAction('brochure_downloaded');
    setBrochureSuccess(true);
    const msg = `*Brochure Request for ${projectName}*%0A%0A*Name:* ${brochureForm.name}%0A*Phone:* ${brochureForm.phone}%0A*Email:* ${brochureForm.email}`;
    setTimeout(() => {
      window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
      setIsBrochureModalOpen(false);
      setBrochureSuccess(false);
    }, 1200);
  };

  // Save VCF Contact
  const handleVcfDownload = () => {
    trackAction('download_vcf');
    downloadVcfFile(profile);
  };

  // EMI Calculator Calculation
  const emiCalculation = useMemo(() => {
    const loanAmount = emiPropertyCost * (1 - emiDownPaymentPct / 100);
    const monthlyRate = emiInterestRate / 12 / 100;
    const months = emiTenureYears * 12;
    if (monthlyRate === 0) {
      return {
        loanAmount,
        monthlyEmi: loanAmount / months,
        totalInterest: 0,
        totalPayment: loanAmount
      };
    }
    const factor = Math.pow(1 + monthlyRate, months);
    const monthlyEmi = (loanAmount * monthlyRate * factor) / (factor - 1);
    const totalPayment = monthlyEmi * months;
    const totalInterest = totalPayment - loanAmount;
    return {
      loanAmount: Math.round(loanAmount),
      monthlyEmi: Math.round(monthlyEmi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment)
    };
  }, [emiPropertyCost, emiDownPaymentPct, emiInterestRate, emiTenureYears]);

  // Video play toggle
  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#111827] font-sans selection:bg-[#F8CD71]/30 selection:text-[#0B0F19] relative overflow-x-hidden antialiased">

      {/* ============================================================== */}
      {/* 1. TOP NAVBAR (FlagUp Exact Signature Dark Header)              */}
      {/* ============================================================== */}
      <nav className="bg-[#0B0F19] sticky top-0 z-50 py-3 sm:py-4 shadow-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Logo / Project Name (Uppercase with Sleek Border) */}
          <a href="#home" className="flex items-center gap-3 group select-none">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={projectName}
                className="h-9 sm:h-11 w-auto max-w-[160px] sm:max-w-[200px] object-contain rounded"
              />
            ) : (
              <div className="border border-white/20 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-base sm:text-xl font-extrabold text-white tracking-widest uppercase hover:border-[#F8CD71] transition-colors">
                {projectName}
              </div>
            )}
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-300">
            <a href="#home" className="hover:text-[#F8CD71] transition-colors">Home</a>
            <a href="#video" className="hover:text-[#F8CD71] transition-colors">Video</a>
            <a href="#plans" className="hover:text-[#F8CD71] transition-colors">LayOut Plans</a>
            <a href="#portfolio" className="hover:text-[#F8CD71] transition-colors">Projects</a>
            <a href="#videos" className="hover:text-[#F8CD71] transition-colors">Videos &amp; Reels</a>
            <a href="#amenities" className="hover:text-[#F8CD71] transition-colors">Amenities</a>
            <a href="#interior" className="hover:text-[#F8CD71] transition-colors">Interior</a>
            <a href="#location" className="hover:text-[#F8CD71] transition-colors">Google Location</a>
            <a href="#nearby" className="hover:text-[#F8CD71] transition-colors">Near By</a>
            <a href="#gallery" className="hover:text-[#F8CD71] transition-colors">Gallery</a>
            <a href="#contact" className="hover:text-[#F8CD71] transition-colors">Contact</a>
          </div>

          {/* Right Action Icons: FlagUp Signature Yellow Squares & Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* View Mode Toggle (If in preview/studio) */}
            {showViewToggle && setViewMode && (
              <div className="hidden md:flex items-center gap-1 p-0.5 rounded-lg bg-gray-900 border border-gray-800 mr-2">
                <button
                  type="button"
                  onClick={() => setViewMode('website')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition cursor-pointer ${
                    viewMode === 'website' ? 'bg-[#F8CD71] text-[#0B0F19]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  💻 Mini-Website
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('mobile')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition cursor-pointer ${
                    viewMode === 'mobile' ? 'bg-[#F8CD71] text-[#0B0F19]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  📱 Mobile Card
                </button>
              </div>
            )}

            {/* Phone Call (Yellow Square) */}
            <a
              href={`tel:${cleanCallNumber}`}
              aria-label="Call Developer"
              className="bg-[#F8CD71] text-[#0B0F19] w-9 h-9 sm:w-10 sm:h-10 rounded-md flex items-center justify-center hover:bg-yellow-500 transition shadow-lg shrink-0 cursor-pointer"
              title="Call Now"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B0F19] fill-current" />
            </a>

            {/* WhatsApp (Yellow Square) */}
            <button
              type="button"
              onClick={() => handleWhatsAppChat('Navbar_WhatsApp')}
              aria-label="WhatsApp"
              className="bg-[#F8CD71] text-[#0B0F19] w-9 h-9 sm:w-10 sm:h-10 rounded-md flex items-center justify-center hover:bg-yellow-500 transition shadow-lg shrink-0 cursor-pointer"
              title="WhatsApp Chat"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B0F19] fill-current" />
            </button>

            {/* Instagram (Yellow Square) */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hidden sm:flex bg-[#F8CD71] text-[#0B0F19] w-9 h-9 sm:w-10 sm:h-10 rounded-md items-center justify-center hover:bg-yellow-500 transition shadow-lg shrink-0 cursor-pointer"
            >
              <span className="font-black text-xs">IG</span>
            </a>

            {/* YouTube (Yellow Square) */}
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hidden sm:flex bg-[#F8CD71] text-[#0B0F19] w-9 h-9 sm:w-10 sm:h-10 rounded-md items-center justify-center hover:bg-yellow-500 transition shadow-lg shrink-0 cursor-pointer"
            >
              <Play className="w-4 h-4 text-[#0B0F19] fill-current" />
            </a>

            {/* Share Modal Button */}
            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              aria-label="Share"
              className="hidden md:flex bg-[#1C2434] text-white border border-gray-700 w-9 h-9 sm:w-10 sm:h-10 rounded-md items-center justify-center hover:bg-gray-800 transition shrink-0 cursor-pointer"
              title="Share Page"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Hamburger for Mobile */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden bg-[#1C2434] text-white border border-gray-700 w-9 h-9 sm:w-10 sm:h-10 rounded-md flex items-center justify-center hover:bg-gray-800 transition shrink-0 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-800 bg-[#0B0F19] px-4 pt-4 pb-6 space-y-3 animate-in slide-in-from-top-2">
            <div className="grid grid-cols-2 gap-2 text-sm font-semibold text-gray-300">
              <a
                href="#home"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-gray-900 hover:text-[#F8CD71] hover:bg-gray-800 transition"
              >
                Home
              </a>
              <a
                href="#video"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-gray-900 hover:text-[#F8CD71] hover:bg-gray-800 transition"
              >
                Video Tour
              </a>
              <a
                href="#plans"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-gray-900 hover:text-[#F8CD71] hover:bg-gray-800 transition"
              >
                LayOut Plans
              </a>
              <a
                href="#amenities"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-gray-900 hover:text-[#F8CD71] hover:bg-gray-800 transition"
              >
                Amenities
              </a>
              <a
                href="#interior"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-gray-900 hover:text-[#F8CD71] hover:bg-gray-800 transition"
              >
                Interior
              </a>
              <a
                href="#location"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-gray-900 hover:text-[#F8CD71] hover:bg-gray-800 transition"
              >
                Google Location
              </a>
              <a
                href="#nearby"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-gray-900 hover:text-[#F8CD71] hover:bg-gray-800 transition"
              >
                Near By
              </a>
              <a
                href="#gallery"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-gray-900 hover:text-[#F8CD71] hover:bg-gray-800 transition"
              >
                Gallery
              </a>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSiteVisitModalOpen(true);
                }}
                className="w-full py-2.5 rounded-lg bg-[#F8CD71] text-[#0B0F19] font-black text-sm text-center shadow-md"
              >
                Book Guided Site Visit
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsBrochureModalOpen(true);
                }}
                className="w-full py-2.5 rounded-lg bg-gray-800 text-white font-bold text-sm text-center border border-gray-700"
              >
                Download PDF Brochure
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ============================================================== */}
      {/* 2. HERO SECTION (Aspect-Video Full-Width Luxury Showcase)       */}
      {/* ============================================================== */}
      <section 
        id="home" 
        className="aspect-video min-h-[420px] sm:min-h-[540px] md:min-h-[640px] w-full bg-cover bg-center relative overflow-hidden flex items-center justify-center"
        style={{
          backgroundImage: `url('${galleryImages[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1800&q=85'}')`
        }}
      >
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/55 to-[#0B0F19]/40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center py-10 sm:py-16">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            
            {/* RERA & Title Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#0B0F19]/80 backdrop-blur-md border border-[#F8CD71]/40 text-[#F8CD71] text-xs sm:text-sm font-extrabold shadow-lg">
              <ShieldCheck className="w-4 h-4 text-[#F8CD71]" />
              <span className="uppercase tracking-wider">{displayRera}</span>
              <span className="text-gray-400">•</span>
              <span className="text-emerald-400 font-bold">100% Clear Title</span>
            </div>

            {/* Big Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-widest uppercase drop-shadow-2xl">
              {projectName}
            </h1>

            {/* Tagline */}
            <p className="text-base sm:text-xl md:text-2xl font-medium text-gray-200 tracking-wide max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              {projectTagline}
            </p>

            {/* Key Specs Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2 text-xs sm:text-sm font-semibold text-gray-200">
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                📍 {userCity}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                🏢 G+22 Luxury Towers
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                ✨ 1, 2 & 3 BHK Suites
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 backdrop-blur-sm border border-emerald-500/40">
                ⚡ Ready for Construction
              </span>
            </div>

            {/* Dual CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4 sm:pt-6">
              <button
                type="button"
                onClick={() => handleWhatsAppChat('Hero_CTA')}
                className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-[#F8CD71] text-[#0B0F19] font-black text-sm sm:text-base hover:bg-yellow-500 transition-all shadow-xl hover:shadow-yellow-500/20 transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Chat on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => setIsSiteVisitModalOpen(true)}
                className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-[#1C2434]/90 hover:bg-[#1C2434] text-white border border-gray-600 font-bold text-sm sm:text-base transition-all shadow-xl transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-5 h-5 text-[#F8CD71]" />
                <span>Book Site Visit</span>
              </button>

              <button
                type="button"
                onClick={handleVcfDownload}
                className="px-4 py-3 sm:py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm transition-all cursor-pointer flex items-center gap-1.5"
                title="Save Developer Contact (.vcf)"
              >
                <Download className="w-4 h-4 text-[#F8CD71]" />
                <span className="hidden sm:inline">Save Contact</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. SIGNATURE VIDEO & HIGHLIGHTS SECTION (`#video`)              */}
      {/* ============================================================== */}
      <section id="video" className="py-12 sm:py-16 bg-[#0B0F19] text-white border-t border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Numbered Highlight Badges (#F8CD71) */}
            <div className="lg:col-span-5 min-w-0">
              <span className="text-xs font-black uppercase tracking-widest text-[#F8CD71]">
                Signature Architectural Highlights
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 mb-2 tracking-tight">
                {projectName}
              </h2>
              <p className="text-sm sm:text-base text-gray-400 mb-6">
                {projectTagline}
              </p>

              {/* Numbered Feature Rows */}
              <div className="space-y-4 sm:space-y-5">
                {videoFeatureList.map((f) => (
                  <div key={f.num} className="flex items-start gap-3.5 sm:gap-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F8CD71] text-[#0B0F19] font-black text-sm sm:text-base flex items-center justify-center shrink-0 shadow-md">
                      {f.num}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm sm:text-base text-white">
                        {f.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 mt-0.5 leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp Action Button */}
              <div className="mt-8 pt-4 border-t border-gray-800/80">
                <button
                  type="button"
                  onClick={() => handleWhatsAppChat('Video_Section_Chat')}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#F8CD71] text-[#0B0F19] font-black text-sm hover:bg-yellow-500 transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp for Project Details</span>
                </button>
              </div>
            </div>

            {/* Right Column: Project Video Player */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl aspect-video group">
                {isYouTubeVideo ? (
                  <iframe
                    src={youTubeEmbedUrl}
                    title={`${projectName} Video Tour`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      id="brand-video"
                      poster={galleryImages[1] || galleryImages[0]}
                      controls={isVideoPlaying}
                      playsInline
                      className="w-full h-full object-cover"
                      onPlay={() => setIsVideoPlaying(true)}
                      onPause={() => setIsVideoPlaying(false)}
                    >
                      <source
                        src={showcaseVideoSrc}
                        type="video/mp4"
                      />
                      Your browser does not support video playback.
                    </video>

                    {/* Big Custom Play Button Overlay */}
                    {!isVideoPlaying && (
                      <button
                        type="button"
                        onClick={toggleVideoPlay}
                        aria-label="Play Walkthrough Video"
                        className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition-all cursor-pointer"
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F8CD71] text-[#0B0F19] flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-current" />
                        </div>
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Video Caption & Walkthrough Badge */}
              <div className="mt-3 flex items-center justify-between text-xs text-gray-400 px-1">
                <span className="flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-[#F8CD71]" />
                  <span>4K Aerial Drone &amp; Architectural Video Tour</span>
                </span>
                <button
                  type="button"
                  onClick={() => setPreviewMedia({
                    url: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-architecture-walkthrough-40995-large.mp4',
                    type: 'video',
                    title: `${projectName} - 4K Architectural Walkthrough`
                  })}
                  className="text-[#F8CD71] hover:underline font-bold flex items-center gap-1"
                >
                  <span>Full Screen</span>
                  <Maximize2 className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. ADVANCED LAYOUT PLANS SECTION (`#plans`)                    */}
      {/* FlagUp UI Upgraded with BHK Filtering, 2D/3D & Specs           */}
      {/* ============================================================== */}
      <section id="plans" className="bg-[#F4F7FE] py-10 sm:py-16 border-b border-gray-200">
        
        {/* FlagUp Signature Forest Green Header Banner */}
        <div className="mx-auto mb-6 sm:mb-10 w-full max-w-full bg-[#1f3b2f] px-3 py-4 text-center sm:px-5 sm:py-5 shadow-sm">
          <div className="flex flex-col items-center justify-center">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#F8CD71] mb-1">
              Architectural CAD Blueprints &amp; 3D Furnished Layouts
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
              LayOut Plans
            </h2>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Advanced Unit Configuration Filter Tabs */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 overflow-x-auto pb-4 pt-1 mb-8 scrollbar-none">
            {planCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActivePlanTab(cat)}
                className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all shrink-0 cursor-pointer ${
                  activePlanTab === cat
                    ? 'bg-[#F8CD71] text-[#0B0F19] shadow-md shadow-yellow-500/20 scale-105 ring-2 ring-[#0B0F19]'
                    : 'bg-white text-gray-700 hover:text-black border border-gray-200/90 hover:border-gray-300 shadow-2xs'
                }`}
              >
                {cat}
                {cat === 'All' && ` (${layoutPlans.length})`}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 items-stretch">
            {filteredPlans.map((plan) => {
              const currentMode = cardViewModes[plan.id] || '2d';
              const activeImage = currentMode === '3d' && plan.view3dUrl ? plan.view3dUrl : plan.imageUrl;

              return (
                <div
                  key={plan.id}
                  className="floor-image-card group bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Card Bar: Tags & 2D/3D Switcher */}
                    <div className="p-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#1f3b2f] text-white">
                          {plan.category}
                        </span>
                        {plan.tag && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#F8CD71]/25 text-[#bd8a2d] border border-[#F8CD71]/40">
                            {plan.tag}
                          </span>
                        )}
                      </div>

                      {/* 2D CAD vs 3D Furnished Pill Switcher */}
                      {plan.view3dUrl && (
                        <div className="flex items-center p-0.5 rounded-lg bg-white border border-gray-200 shadow-2xs">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCardViewModes(prev => ({ ...prev, [plan.id]: '2d' }));
                            }}
                            className={`px-2 py-0.5 rounded text-[10px] font-extrabold transition cursor-pointer ${
                              currentMode === '2d'
                                ? 'bg-[#1f3b2f] text-white'
                                : 'text-gray-500 hover:text-gray-900'
                            }`}
                          >
                            2D
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCardViewModes(prev => ({ ...prev, [plan.id]: '3d' }));
                            }}
                            className={`px-2 py-0.5 rounded text-[10px] font-extrabold transition cursor-pointer ${
                              currentMode === '3d'
                                ? 'bg-[#F8CD71] text-[#0B0F19]'
                                : 'text-gray-500 hover:text-gray-900'
                            }`}
                          >
                            3D
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Image Container with Zoom Lightbox Trigger */}
                    <div
                      onClick={() => setPreviewMedia({
                        url: activeImage,
                        type: 'image',
                        title: plan.title,
                        subtitle: `${plan.bhk} • Carpet Area: ${plan.carpetArea} • ${plan.facing}`
                      })}
                      className="relative aspect-[4/3] bg-gray-100 overflow-hidden p-3 flex items-center justify-center cursor-pointer group-hover:bg-gray-50 transition-colors"
                    >
                      <img
                        src={activeImage}
                        alt={plan.title}
                        loading="lazy"
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                        <Maximize2 className="w-2.5 h-2.5 text-[#F8CD71]" />
                        <span>Zoom</span>
                      </div>
                      <div className="absolute top-2 left-2 bg-black/60 text-white text-[9px] font-bold px-2 py-0.5 rounded">
                        {currentMode === '3d' ? '3D Furnished Model' : 'Architectural CAD Blueprint'}
                      </div>
                    </div>

                    {/* Unit Details & Specs */}
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-extrabold text-sm sm:text-base text-[#111827] group-hover:text-[#bd8a2d] transition-colors line-clamp-1">
                          {plan.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                          {plan.bhk}
                        </p>
                      </div>

                      {/* Area Specs Table Box */}
                      <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-xs space-y-1.5">
                        <div className="flex items-center justify-between text-gray-600">
                          <span>Super Built-up:</span>
                          <strong className="text-gray-900 font-bold">{plan.superArea}</strong>
                        </div>
                        <div className="flex items-center justify-between text-gray-600">
                          <span>RERA Carpet Area:</span>
                          <strong className="text-gray-900 font-bold">{plan.carpetArea}</strong>
                        </div>
                        {plan.efficiency && (
                          <div className="flex items-center justify-between text-[11px] text-emerald-700 font-bold">
                            <span>Usable Efficiency:</span>
                            <span>{plan.efficiency}</span>
                          </div>
                        )}
                        <div className="pt-1 border-t border-gray-200/80 flex items-center justify-between text-[11px] text-gray-500">
                          <span>Orientation:</span>
                          <span className="font-semibold text-gray-800 truncate max-w-[150px]">{plan.facing}</span>
                        </div>
                      </div>

                      {/* Price & Estimated EMI */}
                      <div className="flex items-baseline justify-between pt-1">
                        <div>
                          <span className="text-[10px] text-gray-400 font-semibold block uppercase">Starting Price</span>
                          <span className="text-sm sm:text-base font-black text-[#111827]">
                            {plan.price}
                          </span>
                        </div>
                        {plan.estEmi && (
                          <div className="text-right">
                            <span className="text-[10px] text-gray-400 font-semibold block uppercase">Est. Monthly EMI</span>
                            <span className="text-xs font-bold text-emerald-700 font-mono">
                              {plan.estEmi}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="p-4 pt-0 space-y-2">
                    <button
                      type="button"
                      onClick={() => setSelectedPlanDetails(plan)}
                      className="w-full py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition flex items-center justify-center gap-1.5 border border-gray-200 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#1f3b2f]" />
                      <span>View Room Dimensions &amp; Specs</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        handleWhatsAppChat(
                          'FloorPlan_Inquiry',
                          `Hello, I am interested in ${plan.title} (${plan.bhk}) with Carpet Area ${plan.carpetArea}. Please share the complete price sheet, payment schedule, and available floor units.`
                        );
                      }}
                      className="w-full py-2.5 rounded-xl bg-[#F8CD71] hover:bg-yellow-500 text-[#0B0F19] text-xs font-black transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Inquire Unit on WhatsApp</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Dual Conversion Bar */}
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setIsBrochureModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl bg-[#1f3b2f] text-white hover:bg-[#162a22] font-black text-xs sm:text-sm shadow-md transition cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#F8CD71]" />
              <span>Download Master Layout Blueprint (PDF)</span>
            </button>

            <button
              type="button"
              onClick={() => setIsEmiModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-[#0B0F19] border border-gray-300 font-black text-xs sm:text-sm shadow-xs transition cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>Calculate Home Loan EMI for Units</span>
            </button>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 4.5 MADE FOR EVERY REAL ESTATE (Portfolio Showcase Section)      */}
      {/* ============================================================== */}
      <section id="portfolio" className="py-14 sm:py-20 bg-white border-b border-gray-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#0B0F19] leading-tight">
              Made for{' '}
              <span className="bg-gradient-to-r from-[#f97316] via-[#ec4899] to-[#db2777] bg-clip-text text-transparent">
                Every Real Estate
              </span>
            </h2>
          </div>

          {/* 4 Category Phone Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 xl:gap-8 items-start">
            
            {/* 1. APARTMENT CARD */}
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center mb-6 group cursor-default">
                <div className="w-14 h-14 rounded-full bg-[#f97316] text-white flex items-center justify-center shadow-lg shadow-orange-500/25 transition-transform duration-300 group-hover:scale-110">
                  <Building2 className="w-7 h-7" />
                </div>
                <span className="mt-3 text-xs sm:text-sm font-extrabold tracking-wider text-slate-900 uppercase">
                  APARTMENT
                </span>
              </div>

              {/* Phone Mockup Frame */}
              <div className="relative w-full max-w-[280px] sm:max-w-[290px] mx-auto group">
                <div className="relative rounded-[44px] border-[10px] border-[#c25e2e] shadow-[0_22px_50px_rgba(194,94,46,0.28)] bg-[#0B0F19] p-0.5 transition-transform duration-300 group-hover:-translate-y-1.5">
                  
                  {/* Side Buttons */}
                  <div className="absolute top-16 -left-[13px] w-[3px] h-6 bg-slate-600 rounded-l" />
                  <div className="absolute top-26 -left-[13px] w-[3px] h-10 bg-slate-600 rounded-l" />
                  <div className="absolute top-40 -left-[13px] w-[3px] h-10 bg-slate-600 rounded-l" />
                  <div className="absolute top-24 -right-[13px] w-[3px] h-12 bg-slate-600 rounded-r" />

                  {/* Inner Phone Screen */}
                  <div className="relative rounded-[34px] overflow-hidden bg-[#0B0F19] text-white flex flex-col h-[520px] shadow-inner select-none">
                    
                    {/* Dynamic Island */}
                    <div className="w-full pt-2.5 pb-1.5 px-4 flex items-center justify-between z-30 bg-[#0B0F19]">
                      <span className="text-[10px] font-semibold text-slate-400">9:41</span>
                      <div className="w-20 h-4 bg-black rounded-full flex items-center justify-end px-2 border border-white/10 shadow-inner">
                        <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700/80" />
                      </div>
                      <span className="text-[9px] text-slate-400 font-semibold">5G</span>
                    </div>

                    {/* Scrollable Screen Content */}
                    <div className="relative flex-1 overflow-y-auto overflow-x-hidden scrollbar-none text-left flex flex-col bg-[#0B0F19]">
                      {/* Top Bar with Logo & Social Badges */}
                      <div className="px-3 py-1.5 flex items-center justify-between bg-white text-slate-900 border-b border-gray-200">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded bg-red-600 flex items-center justify-center text-white text-[8px] font-black">
                            SSK
                          </div>
                          <span className="text-[9px] font-black tracking-tight text-slate-900">MILLENNIAL</span>
                        </div>
                        <div className="flex items-center gap-1 text-[8px]">
                          <span className="w-4 h-4 rounded bg-amber-400 text-slate-950 font-bold flex items-center justify-center">f</span>
                          <span className="w-4 h-4 rounded bg-amber-400 text-slate-950 font-bold flex items-center justify-center">ig</span>
                          <span className="w-4 h-4 rounded bg-amber-400 text-slate-950 font-bold flex items-center justify-center">▶</span>
                        </div>
                      </div>

                      {/* Hero Image */}
                      <div className="relative h-44 w-full overflow-hidden shrink-0">
                        <img 
                          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80" 
                          alt="Millennial Towers" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-black/35 to-transparent" />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-orange-600/90 text-white text-[8px] font-bold uppercase tracking-wider">
                          RERA Approved
                        </span>
                        <div className="absolute bottom-2 left-2.5 right-2.5">
                          <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest block">
                            MILLENNIAL TOWERS
                          </span>
                          <p className="text-xs font-black text-white leading-tight">
                            Live The Millennial High Life
                          </p>
                        </div>
                      </div>

                      {/* Walkthrough Video Card */}
                      <div className="mx-2.5 my-2 p-2 rounded-xl bg-[#111827] border border-amber-500/30 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-md">
                            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                          </div>
                          <div>
                            <div className="text-[9px] font-black text-white">SAHIBOLE REAL ESTATE</div>
                            <div className="text-[7px] text-amber-400">Official Walkthrough Video</div>
                          </div>
                        </div>
                        <div className="text-right border-l border-white/10 pl-2">
                          <div className="text-[8px] font-bold text-slate-200">Kaustubh</div>
                          <div className="text-[7px] text-slate-400">9930279990</div>
                        </div>
                      </div>

                      {/* White Floor Plans Card */}
                      <div className="mx-2.5 mb-2.5 p-2.5 rounded-xl bg-white text-slate-900 shadow-md">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-black text-slate-900">Floor Plans</span>
                          <span className="text-[8px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">
                            2 & 3 BHK
                          </span>
                        </div>
                        <p className="text-[7.5px] text-slate-600 leading-tight mb-2">
                          We provide a seamless and transparent property buying experience backed by years of market expertise.
                        </p>
                        <div className="space-y-1 text-[7.5px]">
                          <div className="flex items-center gap-1.5 text-slate-800">
                            <span className="w-3.5 h-3.5 rounded-full bg-amber-400 text-black text-[7px] font-bold flex items-center justify-center shrink-0">1</span>
                            <span>Transparent Communication</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-800">
                            <span className="w-3.5 h-3.5 rounded-full bg-amber-400 text-black text-[7px] font-bold flex items-center justify-center shrink-0">2</span>
                            <span>Market Knowledge & Trends</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-800">
                            <span className="w-3.5 h-3.5 rounded-full bg-amber-400 text-black text-[7px] font-bold flex items-center justify-center shrink-0">3</span>
                            <span>Strong Negotiation for Buyers</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="py-2 flex items-center justify-center bg-[#0B0F19]">
                      <div className="w-20 h-1 bg-white/30 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <a
                href="/v/re-builders#plans"
                className="mt-5 inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-full bg-[#0B0F19] text-white text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-md group"
              >
                <span>VISIT NOW</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* 2. VILLA CARD */}
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center mb-6 group cursor-default">
                <div className="w-14 h-14 rounded-full bg-[#16a34a] text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 transition-transform duration-300 group-hover:scale-110">
                  <Home className="w-7 h-7" />
                </div>
                <span className="mt-3 text-xs sm:text-sm font-extrabold tracking-wider text-slate-900 uppercase">
                  VILLA
                </span>
              </div>

              {/* Phone Mockup Frame */}
              <div className="relative w-full max-w-[280px] sm:max-w-[290px] mx-auto group">
                <div className="relative rounded-[44px] border-[10px] border-[#3b5998] shadow-[0_22px_50px_rgba(59,89,152,0.28)] bg-[#0B0F19] p-0.5 transition-transform duration-300 group-hover:-translate-y-1.5">
                  
                  {/* Side Buttons */}
                  <div className="absolute top-16 -left-[13px] w-[3px] h-6 bg-slate-600 rounded-l" />
                  <div className="absolute top-26 -left-[13px] w-[3px] h-10 bg-slate-600 rounded-l" />
                  <div className="absolute top-40 -left-[13px] w-[3px] h-10 bg-slate-600 rounded-l" />
                  <div className="absolute top-24 -right-[13px] w-[3px] h-12 bg-slate-600 rounded-r" />

                  {/* Inner Phone Screen */}
                  <div className="relative rounded-[34px] overflow-hidden bg-[#0B0F19] text-white flex flex-col h-[520px] shadow-inner select-none">
                    
                    {/* Dynamic Island */}
                    <div className="w-full pt-2.5 pb-1.5 px-4 flex items-center justify-between z-30 bg-[#0B0F19]">
                      <span className="text-[10px] font-semibold text-slate-400">9:41</span>
                      <div className="w-20 h-4 bg-black rounded-full flex items-center justify-end px-2 border border-white/10 shadow-inner">
                        <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700/80" />
                      </div>
                      <span className="text-[9px] text-slate-400 font-semibold">5G</span>
                    </div>

                    {/* Scrollable Screen Content */}
                    <div className="relative flex-1 overflow-y-auto overflow-x-hidden scrollbar-none text-left flex flex-col bg-[#0B0F19]">
                      {/* Top Bar */}
                      <div className="px-3 py-1.5 flex items-center justify-between bg-[#0f172a] border-b border-white/10">
                        <div className="text-[9px] font-black tracking-tight text-white flex items-center gap-1">
                          <span className="text-emerald-400">GREENVILLE</span> AT PRARAMBH
                        </div>
                        <div className="flex items-center gap-1 text-[8px]">
                          <span className="w-4 h-4 rounded bg-amber-400 text-slate-950 font-bold flex items-center justify-center">f</span>
                          <span className="w-4 h-4 rounded bg-amber-400 text-slate-950 font-bold flex items-center justify-center">ig</span>
                          <span className="w-4 h-4 rounded bg-amber-400 text-slate-950 font-bold flex items-center justify-center">▶</span>
                        </div>
                      </div>

                      {/* Hero Image (Greece-Themed White & Blue Architecture) */}
                      <div className="relative h-44 w-full overflow-hidden shrink-0">
                        <img 
                          src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80" 
                          alt="Greenville Villas" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-black/35 to-transparent" />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-blue-600/90 text-white text-[8px] font-bold uppercase tracking-wider">
                          Greece-Themed
                        </span>
                        <div className="absolute bottom-2 left-2.5 right-2.5">
                          <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest block">
                            GREENVILLE AT PRARAMBH
                          </span>
                          <p className="text-xs font-black text-white leading-tight">
                            This is Greenville By Prarambh!
                          </p>
                        </div>
                      </div>

                      {/* Luxurious Villa Community Details */}
                      <div className="mx-2.5 my-2 p-2.5 rounded-xl bg-[#111827] border border-blue-500/20 text-slate-200">
                        <span className="text-[10px] font-black text-white block mb-0.5">
                          Luxurious Villa Community
                        </span>
                        <p className="text-[7.5px] text-slate-400 mb-2 leading-tight">
                          A Vacation Lifestyle With Greece Themed White & Blue Architecture
                        </p>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-amber-400 text-black text-[8px] font-black flex items-center justify-center shrink-0">1</span>
                            <span className="text-[8px] font-bold text-white">A Holiday Life</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-amber-400 text-black text-[8px] font-black flex items-center justify-center shrink-0">2</span>
                            <span className="text-[8px] font-bold text-white">A Vacation Lifestyle</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-amber-400 text-black text-[8px] font-black flex items-center justify-center shrink-0">3</span>
                            <span className="text-[8px] font-bold text-white">Greece Themed</span>
                          </div>
                        </div>
                      </div>

                      {/* Villa Project Bottom Banner */}
                      <div className="mx-2.5 mb-2.5 relative h-20 rounded-xl overflow-hidden border border-white/10">
                        <img 
                          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80" 
                          alt="Greenville Aerial" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="text-[9px] font-bold text-white uppercase tracking-wider">
                            GREENVILLE BY PRARAMBH
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="py-2 flex items-center justify-center bg-[#0B0F19]">
                      <div className="w-20 h-1 bg-white/30 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <a
                href="/v/re-villas"
                className="mt-5 inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-full bg-[#0B0F19] text-white text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-md group"
              >
                <span>VISIT NOW</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* 3. PLOTTING CARD */}
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center mb-6 group cursor-default">
                <div className="w-14 h-14 rounded-full bg-[#2563eb] text-white flex items-center justify-center shadow-lg shadow-blue-500/25 transition-transform duration-300 group-hover:scale-110">
                  <MapPin className="w-7 h-7" />
                </div>
                <span className="mt-3 text-xs sm:text-sm font-extrabold tracking-wider text-slate-900 uppercase">
                  PLOTTING
                </span>
              </div>

              {/* Phone Mockup Frame */}
              <div className="relative w-full max-w-[280px] sm:max-w-[290px] mx-auto group">
                <div className="relative rounded-[44px] border-[10px] border-[#701a35] shadow-[0_22px_50px_rgba(112,26,53,0.28)] bg-[#0B0F19] p-0.5 transition-transform duration-300 group-hover:-translate-y-1.5">
                  
                  {/* Side Buttons */}
                  <div className="absolute top-16 -left-[13px] w-[3px] h-6 bg-slate-600 rounded-l" />
                  <div className="absolute top-26 -left-[13px] w-[3px] h-10 bg-slate-600 rounded-l" />
                  <div className="absolute top-40 -left-[13px] w-[3px] h-10 bg-slate-600 rounded-l" />
                  <div className="absolute top-24 -right-[13px] w-[3px] h-12 bg-slate-600 rounded-r" />

                  {/* Inner Phone Screen */}
                  <div className="relative rounded-[34px] overflow-hidden bg-[#0B0F19] text-white flex flex-col h-[520px] shadow-inner select-none">
                    
                    {/* Dynamic Island */}
                    <div className="w-full pt-2.5 pb-1.5 px-4 flex items-center justify-between z-30 bg-[#0B0F19]">
                      <span className="text-[10px] font-semibold text-slate-400">9:41</span>
                      <div className="w-20 h-4 bg-black rounded-full flex items-center justify-end px-2 border border-white/10 shadow-inner">
                        <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700/80" />
                      </div>
                      <span className="text-[9px] text-slate-400 font-semibold">5G</span>
                    </div>

                    {/* Scrollable Screen Content */}
                    <div className="relative flex-1 overflow-y-auto overflow-x-hidden scrollbar-none text-left flex flex-col bg-[#0B0F19]">
                      {/* Top Bar with WhatsApp Badge */}
                      <div className="px-3 py-1.5 flex items-center justify-between bg-[#111827] border-b border-white/10">
                        <div className="flex items-center gap-1 text-[8px]">
                          <span className="w-3.5 h-3.5 rounded bg-amber-400 text-slate-950 font-bold flex items-center justify-center">f</span>
                          <span className="w-3.5 h-3.5 rounded bg-amber-400 text-slate-950 font-bold flex items-center justify-center">ig</span>
                          <span className="w-3.5 h-3.5 rounded bg-amber-400 text-slate-950 font-bold flex items-center justify-center">▶</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-black text-[7.5px] font-black flex items-center gap-1">
                          <MessageCircle className="w-2.5 h-2.5 fill-current" />
                          WhatsApp
                        </span>
                      </div>

                      {/* HK FARMS Nature & Investment Strip */}
                      <div className="bg-[#1e293b] text-slate-200 px-2.5 py-1 text-[7px] font-bold tracking-wider border-b border-white/10 flex items-center justify-between">
                        <span>NATURE • PEACE • FUTURE</span>
                        <span className="text-amber-400">30 FT ROADS</span>
                      </div>

                      {/* Header Taglines */}
                      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 px-2 py-1 text-center font-black text-[8px] uppercase tracking-wide shadow-sm">
                        INVEST TODAY, ENJOY TOMORROW!
                      </div>
                      <div className="bg-slate-900 text-center py-0.5 text-[7px] font-bold text-amber-300 uppercase tracking-widest border-b border-white/5">
                        READY FOR REGISTRATION
                      </div>

                      {/* Master Layout Plan Visual */}
                      <div className="mx-2.5 my-2 p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                        <div className="flex items-center justify-between mb-1.5 text-[7px]">
                          <span className="text-emerald-400 font-bold uppercase tracking-wider">HK FARMS LAYOUT</span>
                          <span className="text-amber-300 font-bold">11K FARES / 299</span>
                        </div>

                        {/* Numbered Plot Map Grid */}
                        <div className="grid grid-cols-4 gap-1 p-1 bg-slate-900/90 rounded-lg text-center border border-white/10">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((num) => (
                            <div 
                              key={num} 
                              className={`py-0.5 rounded text-[6.5px] font-black border ${
                                [2, 5, 9, 14].includes(num)
                                  ? 'bg-rose-950/60 text-rose-300 border-rose-500/40'
                                  : 'bg-emerald-900/60 text-emerald-200 border-emerald-500/40'
                              }`}
                            >
                              #{num}
                              <span className="block text-[5px] font-normal opacity-80">
                                {[2, 5, 9, 14].includes(num) ? 'BOOKED' : '200 Yd'}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* 30 FT Road Strip */}
                        <div className="mt-1 py-0.5 bg-slate-800 text-slate-300 text-[6px] font-bold text-center uppercase tracking-widest rounded border border-dashed border-slate-600">
                          --- 30 FT CENTRAL BLACKTOP ROAD ---
                        </div>
                      </div>

                      {/* Amenities Row */}
                      <div className="mx-2.5 p-1.5 rounded-xl bg-[#111827] border border-white/5 flex items-center justify-around text-center text-[6.5px] text-slate-300">
                        <div>
                          <div className="w-5 h-5 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-0.5">🛡️</div>
                          <span>24x7 Security</span>
                        </div>
                        <div>
                          <div className="w-5 h-5 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-0.5">💡</div>
                          <span>Solar Street</span>
                        </div>
                        <div>
                          <div className="w-5 h-5 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-0.5">💧</div>
                          <span>Water Pipe</span>
                        </div>
                        <div>
                          <div className="w-5 h-5 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-0.5">🌳</div>
                          <span>Avenue Plant</span>
                        </div>
                      </div>

                      {/* Download Brochure & View Plot Options CTA */}
                      <div className="mx-2.5 my-2 grid grid-cols-2 gap-1.5">
                        <div className="py-1.5 rounded-lg bg-amber-400 text-slate-950 font-black text-[7.5px] text-center shadow-sm">
                          Download Brochure
                        </div>
                        <div className="py-1.5 rounded-lg bg-blue-600 text-white font-bold text-[7.5px] text-center shadow-sm">
                          View Plot Options
                        </div>
                      </div>
                    </div>

                    <div className="py-2 flex items-center justify-center bg-[#0B0F19]">
                      <div className="w-20 h-1 bg-white/30 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <a
                href="/v/re-plots"
                className="mt-5 inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-full bg-[#0B0F19] text-white text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-md group"
              >
                <span>VISIT NOW</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* 4. BUILDING CARD */}
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center mb-6 group cursor-default">
                <div className="w-14 h-14 rounded-full bg-[#7c3aed] text-white flex items-center justify-center shadow-lg shadow-purple-500/25 transition-transform duration-300 group-hover:scale-110">
                  <Building className="w-7 h-7" />
                </div>
                <span className="mt-3 text-xs sm:text-sm font-extrabold tracking-wider text-slate-900 uppercase">
                  BUILDING
                </span>
              </div>

              {/* Phone Mockup Frame */}
              <div className="relative w-full max-w-[280px] sm:max-w-[290px] mx-auto group">
                <div className="relative rounded-[44px] border-[10px] border-[#22252a] shadow-[0_22px_50px_rgba(0,0,0,0.35)] bg-[#0B0F19] p-0.5 transition-transform duration-300 group-hover:-translate-y-1.5">
                  
                  {/* Side Buttons */}
                  <div className="absolute top-16 -left-[13px] w-[3px] h-6 bg-slate-600 rounded-l" />
                  <div className="absolute top-26 -left-[13px] w-[3px] h-10 bg-slate-600 rounded-l" />
                  <div className="absolute top-40 -left-[13px] w-[3px] h-10 bg-slate-600 rounded-l" />
                  <div className="absolute top-24 -right-[13px] w-[3px] h-12 bg-slate-600 rounded-r" />

                  {/* Inner Phone Screen */}
                  <div className="relative rounded-[34px] overflow-hidden bg-[#0B0F19] text-white flex flex-col h-[520px] shadow-inner select-none">
                    
                    {/* Dynamic Island */}
                    <div className="w-full pt-2.5 pb-1.5 px-4 flex items-center justify-between z-30 bg-[#0B0F19]">
                      <span className="text-[10px] font-semibold text-slate-400">9:41</span>
                      <div className="w-20 h-4 bg-black rounded-full flex items-center justify-end px-2 border border-white/10 shadow-inner">
                        <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700/80" />
                      </div>
                      <span className="text-[9px] text-slate-400 font-semibold">5G</span>
                    </div>

                    {/* Scrollable Screen Content */}
                    <div className="relative flex-1 overflow-y-auto overflow-x-hidden scrollbar-none text-left flex flex-col bg-[#0B0F19]">
                      {/* Top Bar with Kaustubh Logo */}
                      <div className="px-3 py-1.5 flex items-center justify-between bg-[#111827] border-b border-white/10">
                        <span className="px-1.5 py-0.5 rounded bg-white text-slate-950 font-black text-[8px] tracking-tight">
                          Kaustubh
                        </span>
                        <div className="flex items-center gap-1 text-[8px]">
                          <span className="w-4 h-4 rounded bg-amber-400 text-slate-950 font-bold flex items-center justify-center">f</span>
                          <span className="w-4 h-4 rounded bg-amber-400 text-slate-950 font-bold flex items-center justify-center">ig</span>
                          <span className="w-4 h-4 rounded bg-amber-400 text-slate-950 font-bold flex items-center justify-center">▶</span>
                        </div>
                      </div>

                      {/* Hero Image (Night Rendered Landmark Tower) */}
                      <div className="relative h-44 w-full overflow-hidden shrink-0">
                        <img 
                          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" 
                          alt="Kaustubh Landmark Tower" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-black/40 to-transparent" />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-purple-600/90 text-white text-[8px] font-bold uppercase tracking-wider">
                          Grade-A Commercial Tower
                        </span>
                        <div className="absolute bottom-2 left-2.5 right-2.5">
                          <span className="text-[8px] font-bold text-amber-400 uppercase tracking-widest block">
                            KAUSTUBH
                          </span>
                          <p className="text-xs font-black text-white leading-tight">
                            The New Landmark Residential & Commercial Tower
                          </p>
                        </div>
                      </div>

                      {/* Floor Plans Card */}
                      <div className="mx-2.5 my-2 p-2.5 rounded-xl bg-[#111827] border border-white/10 text-slate-200">
                        <span className="text-[10px] font-black text-white block mb-0.5">
                          Floor Plans
                        </span>
                        <p className="text-[7.5px] text-slate-400 mb-2 leading-tight">
                          We provide a seamless and transparent property buying experience backed by years of market expertise.
                        </p>
                        <div className="space-y-1.5">
                          <div className="flex items-start gap-1.5">
                            <span className="w-3.5 h-3.5 rounded-full bg-amber-400 text-black text-[7.5px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                            <div>
                              <span className="text-[8px] font-bold text-white block">Transparent Communication</span>
                              <span className="text-[6.5px] text-slate-400">Clear guidelines and real-time updates at every step.</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-1.5">
                            <span className="w-3.5 h-3.5 rounded-full bg-amber-400 text-black text-[7.5px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                            <div>
                              <span className="text-[8px] font-bold text-white block">Market Knowledge</span>
                              <span className="text-[6.5px] text-slate-400">In-depth insights into local real estate trends.</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-1.5">
                            <span className="w-3.5 h-3.5 rounded-full bg-amber-400 text-black text-[7.5px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                            <div>
                              <span className="text-[8px] font-bold text-white block">Strong Negotiation</span>
                              <span className="text-[6.5px] text-slate-400">Dedicated agent expertise to secure the best value.</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Banner Preview */}
                      <div className="mx-2.5 mb-2.5 relative h-16 rounded-xl overflow-hidden border border-white/10">
                        <img 
                          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80" 
                          alt="Kaustubh View" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="text-[8px] font-bold text-white uppercase tracking-wider">
                            KAUSTUBH RESIDENCY
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="py-2 flex items-center justify-center bg-[#0B0F19]">
                      <div className="w-20 h-1 bg-white/30 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <a
                href="/v/re-consultants"
                className="mt-5 inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-full bg-[#0B0F19] text-white text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-md group"
              >
                <span>VISIT NOW</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>

          {/* ========================================================== */}
          {/* FLAGUP SIGNATURE STRIP: Everything Your Customer Needs    */}
          {/* ========================================================== */}
          <div className="mt-16 sm:mt-20 p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0B0F19] via-[#111827] to-[#1C2434] text-white border border-gray-800 shadow-2xl">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                Everything Your Customer Needs,{' '}
                <span className="text-[#F8CD71]">In One Smart Link.</span>
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-400">
                With OneClickBiz Real Estate Smart Link, buyers get all this in one tap — no PDF downloads or slow websites required.
              </p>
            </div>

            {/* 8 Feature Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 text-center">
              {[
                { icon: '🎬', label: 'Brand Video', desc: '4K Aerial Tour' },
                { icon: '📐', label: 'Layout Plans', desc: '2D CAD & 3D' },
                { icon: '🖼️', label: 'Photo Gallery', desc: 'Interior & Exterior' },
                { icon: '📍', label: 'Location', desc: 'Google Maps' },
                { icon: '💬', label: 'WhatsApp', desc: 'Instant Inquiries' },
                { icon: '📞', label: 'Call Button', desc: 'One-Tap Dial' },
                { icon: '🔗', label: 'Social Media', desc: 'FB, IG, YouTube' },
                { icon: '🛣️', label: 'Connectivity', desc: 'Highway & Metro' },
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#F8CD71]/50 hover:bg-white/10 transition-all duration-200 flex flex-col items-center justify-center group"
                >
                  <span className="text-2xl sm:text-3xl mb-1.5 transition-transform duration-200 group-hover:scale-110">
                    {item.icon}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
                    {item.label}
                  </span>
                  <span className="text-[10px] text-gray-400 mt-0.5">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Instant CTAs inside strip */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-amber-300/90 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#F8CD71]" />
                <span>Verified RERA Compliant Digital Property Brochure</span>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => handleWhatsAppChat('FeatureStrip_Booking')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#25d366] hover:bg-green-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Book Site Visit on WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEmiModalOpen(true)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-[#F8CD71]" />
                  <span>Calculate EMI</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 4.8 PROJECT VIDEOS & INSTAGRAM REELS (Play Inline - No Escape) */}
      {/* ============================================================== */}
      <section id="videos" className="py-10 sm:py-14 bg-[#0B0F19] text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#F8CD71] text-[11px] font-bold uppercase tracking-wider mb-2.5 shadow-2xs">
              <Film className="w-3.5 h-3.5 text-[#F8CD71]" />
              <span>CINEMATIC WALKTHROUGHS &amp; REELS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Project Videos &amp; <span className="text-[#F8CD71]">Instagram Reels</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-400 font-medium max-w-2xl mx-auto">
              Watch 4K aerial drone tours, model flat walkthroughs, and verified construction reels right here — they play directly on this page without leaving the website.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
              {[
                { id: 'all', label: `All Videos (${allProjectVideos.length})` },
                { id: 'youtube', label: `▶ YouTube 4K Tours (${youtubeVideosCount})` },
                { id: 'instagram', label: `📸 Instagram Reels (${instagramVideosCount})` },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveVideoFilter(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    activeVideoFilter === tab.id
                      ? 'bg-[#F8CD71] text-[#0B0F19] shadow-md shadow-amber-500/20'
                      : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Videos Grid - Compact Sleek 4-column cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredProjectVideos.map((video) => {
              const isPlaying = activeInlineVideoId === video.id;
              const isYt = video.type === 'youtube' || video.url.includes('youtube.com') || video.url.includes('youtu.be');
              const isIg = video.type === 'instagram' || video.url.includes('instagram.com');
              const ytId = getYoutubeVideoId(video.url);

              return (
                <div 
                  key={video.id}
                  className="bg-[#111827] rounded-xl border border-gray-800/90 overflow-hidden shadow-lg hover:border-amber-500/40 hover:shadow-amber-500/10 transition-all flex flex-col group"
                >
                  {/* Video Player or Thumbnail Container */}
                  <div className="relative w-full h-44 sm:h-48 bg-black overflow-hidden">
                    {isPlaying ? (
                      isYt ? (
                        <iframe
                          src={getYoutubeEmbedUrl(video.url)}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="w-full h-full border-0"
                        />
                      ) : isIg ? (
                        <iframe
                          src={getInstagramEmbedUrl(video.url)}
                          title={video.title}
                          allowFullScreen
                          className="w-full h-full border-0"
                        />
                      ) : (
                        <video
                          src={video.url}
                          controls
                          autoPlay
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      )
                    ) : (
                      /* Click to play inline thumbnail */
                      <div 
                        onClick={() => setActiveInlineVideoId(video.id)}
                        className="relative w-full h-full cursor-pointer group/thumb select-none"
                      >
                        <img 
                          src={video.thumbnailUrl || (isYt && ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80')} 
                          alt={video.title}
                          className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                        
                        {/* Compact Platform Badge */}
                        <div className="absolute top-2 left-2 flex items-center gap-1">
                          {isYt ? (
                            <span className="px-2 py-0.5 rounded-full bg-red-600 text-white font-extrabold text-[9px] flex items-center gap-1 shadow-sm">
                              <span>▶</span> YouTube 4K
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-extrabold text-[9px] flex items-center gap-1 shadow-sm">
                              <span>📸</span> Reel
                            </span>
                          )}
                        </div>

                        {/* Compact Circular Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-[#F8CD71] text-[#0B0F19] flex items-center justify-center shadow-xl group-hover/thumb:scale-110 transition-transform">
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          </div>
                        </div>

                        <div className="absolute bottom-2 right-2 text-[9px] bg-black/80 backdrop-blur-xs px-1.5 py-0.5 rounded text-gray-300 font-semibold flex items-center gap-1">
                          <Play className="w-2.5 h-2.5 fill-current text-amber-400" />
                          <span>Play Inline</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Info & Actions */}
                  <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2 group-hover:text-[#F8CD71] transition-colors" title={video.title}>
                        {video.title}
                      </h4>
                      {video.caption && (
                        <p className="mt-1 text-[11px] text-gray-400 line-clamp-1">
                          {video.caption}
                        </p>
                      )}
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-gray-800/80 flex items-center justify-between gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          if (isPlaying) {
                            setActiveInlineVideoId(null);
                          } else {
                            setActiveInlineVideoId(video.id);
                          }
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
                      >
                        {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
                        <span>{isPlaying ? 'Pause' : 'Play Here'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPreviewMedia({
                          url: video.url,
                          type: 'video',
                          title: video.title,
                          subtitle: video.caption
                        })}
                        className="px-2 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
                        title="Theater Mode (Full Screen on Page)"
                      >
                        <Maximize2 className="w-3 h-3" />
                        <span>Theater</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. PROJECT AMENITIES SECTION (`#amenities`)                     */}
      {/* ============================================================== */}
      <section id="amenities" className="relative overflow-hidden bg-[#F4F7FE] py-10 sm:py-16 border-b border-gray-200">
        
        {/* Top Gold Gradient Line */}
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#F8CD71]/70 to-transparent"></div>

        {/* FlagUp Forest Green Header Banner */}
        <div className="mx-auto mb-8 sm:mb-12 w-full max-w-full bg-[#1f3b2f] px-3 py-4 text-center sm:px-5 sm:py-5 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
            Project Amenities
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Amenity Cards Grid (Exact FlagUp rounded-[22px] with aspect-square media) */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {projectAmenities.map((amenity) => (
              <article
                key={amenity.id}
                onClick={() => setPreviewMedia({
                  url: amenity.imageUrl,
                  type: 'image',
                  title: amenity.title,
                  subtitle: amenity.description
                })}
                className="group relative overflow-hidden rounded-[22px] border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#F8CD71]/60 hover:shadow-2xl cursor-pointer flex flex-col"
              >
                {/* Aspect-Square Image Container */}
                <div className="relative aspect-square w-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src={amenity.imageUrl}
                    alt={amenity.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  
                  {amenity.tag && (
                    <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-sm text-[#F8CD71] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                      {amenity.tag}
                    </span>
                  )}
                </div>

                {/* Title Below Media */}
                <div className="px-2 py-3 sm:px-4 sm:py-4 text-center flex-1 flex flex-col justify-center">
                  <h3 className="w-full text-xs sm:text-sm lg:text-base font-extrabold leading-snug text-[#111827] group-hover:text-[#bd8a2d] transition-colors truncate">
                    {amenity.title}
                  </h3>
                  <p className="hidden sm:block text-[11px] text-gray-500 mt-1 line-clamp-1">
                    {amenity.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. INTERIOR WALKTHROUGH SECTION (`#interior`)                   */}
      {/* ============================================================== */}
      <section id="interior" className="py-10 sm:py-16 bg-[#F4F7FE] border-b border-gray-200">
        
        {/* FlagUp Forest Green Header Banner */}
        <div className="mx-auto mb-8 sm:mb-12 w-full max-w-full bg-[#1f3b2f] px-3 py-4 text-center sm:px-5 sm:py-5 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
            Interior
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {interiorRooms.map((room) => (
              <div
                key={room.id}
                onClick={() => setPreviewMedia({
                  url: room.mediaUrl,
                  type: 'image',
                  title: room.name,
                  subtitle: room.subtitle
                })}
                className="bg-white rounded-2xl shadow-sm border border-gray-200/90 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
              >
                {/* 5/3 Aspect Media Container */}
                <div className="relative w-full aspect-[5/3] bg-gray-100 overflow-hidden">
                  <img
                    src={room.mediaUrl}
                    alt={room.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-sm text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Maximize2 className="w-3 h-3 text-[#F8CD71]" />
                    <span>View Room</span>
                  </div>
                </div>

                {/* Description */}
                <div className="p-4 sm:p-5">
                  <h3 className="font-bold text-base sm:text-lg text-[#111827] group-hover:text-[#bd8a2d] transition-colors truncate">
                    {room.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {room.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. GOOGLE MAP LOCATION SECTION (`#location`)                    */}
      {/* ============================================================== */}
      <section id="location" className="py-10 sm:py-16 bg-[#F4F7FE] border-b border-gray-200">
        
        {/* FlagUp Forest Green Header Banner */}
        <div className="mx-auto mb-8 sm:mb-12 w-full max-w-full bg-[#1f3b2f] px-3 py-4 text-center sm:px-5 sm:py-5 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
            Google Location
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-200/90">
            {/* Interactive Map Embed (Safe, responsive 500px height) */}
            <div className="relative w-full h-[400px] sm:h-[520px]">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(displayAddress)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                title={`Google Map showing ${projectName} location`}
              />
            </div>

            {/* Location Banner Bar */}
            <div className="p-4 sm:p-6 bg-white border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1f3b2f] text-[#F8CD71] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-[#111827]">
                    {projectName} Experience Center &amp; Site Address
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {displayAddress}
                  </p>
                </div>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(displayAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#1f3b2f] text-white hover:bg-[#162a22] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition"
              >
                <Navigation className="w-4 h-4 text-[#F8CD71]" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. NEAR BY LOCATIONS SECTION (`#nearby`)                        */}
      {/* FlagUp Signature Forest Green Background with Gold Borders     */}
      {/* ============================================================== */}
      <section id="nearby" className="py-14 sm:py-20 bg-[#1f3b2f] text-white border-b border-gray-800">
        
        {/* Header Banner */}
        <div className="mx-auto mb-8 sm:mb-12 w-full max-w-full bg-[#1f3b2f] px-3 py-4 text-center sm:px-5 sm:py-5">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-wide">
            Near By Locations
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid matching FlagUp's exact cards: border-3 border-[#bd8a2d] and big gold pin */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 max-w-6xl mx-auto">
            {nearbyLandmarks.map((loc) => (
              <div
                key={loc.id}
                className="bg-[#1f3b2f] min-h-[180px] sm:min-h-[210px] p-4 sm:p-5 rounded-2xl shadow-xl text-center border-2 sm:border-3 border-[#bd8a2d] flex flex-col items-center justify-center hover:scale-105 transition-all duration-300"
              >
                <MapPin className="w-12 h-12 sm:w-16 sm:h-16 text-[#bd8a2d] stroke-[1.5] mb-2 sm:mb-3" />
                <h3 className="font-extrabold text-sm sm:text-base text-white my-1 sm:my-2 leading-snug">
                  {loc.title}
                </h3>
                <span className="mt-1 px-3 py-0.5 rounded-full text-xs font-black bg-[#bd8a2d]/25 text-[#F8CD71] border border-[#bd8a2d]/40">
                  {loc.distance} Drive
                </span>
              </div>
            ))}
          </div>

          {/* Site Visit Driver Booking Callout */}
          <div className="mt-12 text-center max-w-2xl mx-auto bg-black/25 rounded-2xl p-6 border border-[#bd8a2d]/30">
            <h4 className="text-lg font-bold text-[#F8CD71] mb-1">
              Complimentary Chauffeur Site Inspection Available
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 mb-4">
              We provide free doorstep pickup &amp; drop service across the city for family site inspections.
            </p>
            <button
              type="button"
              onClick={() => setIsSiteVisitModalOpen(true)}
              className="px-6 py-2.5 rounded-xl bg-[#F8CD71] text-[#0B0F19] font-black text-sm hover:bg-yellow-500 transition shadow-lg cursor-pointer"
            >
              Book Chauffeur Site Visit
            </button>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. PHOTO GALLERY SECTION (`#gallery`)                           */}
      {/* ============================================================== */}
      <section id="gallery" className="py-14 sm:py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827]">
              Gallery
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Explore high-resolution elevation renders, landscape gardens, and project progress.
            </p>
          </div>

          {/* Grid of Six/Nine Gallery Images */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
            {galleryImages.map((imgUrl, idx) => (
              <div
                key={idx}
                onClick={() => setPreviewMedia({
                  url: imgUrl,
                  type: 'image',
                  title: `${projectName} - Photo #${idx + 1}`
                })}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group bg-gray-100"
              >
                <img
                  src={imgUrl}
                  alt={`${projectName} photo ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                <div className="absolute bottom-2.5 right-2.5 bg-black/70 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Maximize2 className="w-3 h-3 text-[#F8CD71]" />
                  <span>Enlarge</span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive EMI Calculator Button */}
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setIsEmiModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white hover:bg-black font-bold text-sm shadow-md transition cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-[#F8CD71]" />
              <span>Calculate Home Loan EMI</span>
            </button>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 10. SIGNATURE DARK FOOTER (`#contact`)                          */}
      {/* FlagUp Exact Footer Structure with Original OneClickBizz credit*/}
      {/* ============================================================== */}
      <footer id="contact" className="bg-[#0B0F19] text-gray-400 pt-16 pb-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-gray-800">

            {/* Col 1 & 2: Project / Developer Name in Boxed Uppercase */}
            <div className="lg:col-span-2 space-y-4">
              <a
                href="#home"
                className="inline-block border border-white/20 rounded-lg px-4 py-3 text-xl sm:text-2xl font-extrabold text-white tracking-widest uppercase hover:border-[#F8CD71] transition-colors"
              >
                {projectName}
              </a>
              <p className="text-sm text-gray-400 leading-relaxed max-w-sm mt-4">
                {projectTagline}
              </p>
              <div className="pt-2 text-xs text-gray-500 space-y-1">
                <p>Statutory Sanction: <strong className="text-gray-300">{displayRera}</strong></p>
                <p>Clear Title Guarantee &amp; Spot Registration Desk</p>
              </div>
            </div>

            {/* Col 3: Near By Locations List */}
            <div>
              <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-widest">
                Near By Location
              </h4>
              <ul className="space-y-2.5 text-sm">
                {nearbyLandmarks.slice(0, 5).map(loc => (
                  <li key={loc.id}>
                    <a href="#nearby" className="hover:text-white transition-colors flex items-center justify-between">
                      <span>{loc.title}</span>
                      <span className="text-xs text-[#F8CD71] font-mono">{loc.distance}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Quick Navigation */}
            <div>
              <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-widest">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#plans" className="hover:text-white transition-colors">LayOut Plans</a></li>
                <li><a href="#amenities" className="hover:text-white transition-colors">Project Amenities</a></li>
                <li><a href="#interior" className="hover:text-white transition-colors">Interior Walkthrough</a></li>
                <li><a href="#location" className="hover:text-white transition-colors">Google Location Map</a></li>
                <li>
                  <button
                    type="button"
                    onClick={() => setIsBrochureModalOpen(true)}
                    className="text-[#F8CD71] hover:underline font-bold"
                  >
                    Download Brochure
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 5: Contact Info */}
            <div>
              <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-widest">
                Contact Info
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#F8CD71] shrink-0 mt-0.5" />
                  <span className="truncate">{displayAddress}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#F8CD71] shrink-0" />
                  <a href={`mailto:${displayEmail}`} className="hover:text-white transition truncate">
                    {displayEmail}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#F8CD71] shrink-0" />
                  <a href={`tel:${cleanCallNumber}`} className="hover:text-white transition">
                    {cleanCallNumber}
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar with OneClickBizz Original Branding */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            
            <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
              &copy; {new Date().getFullYear()} {projectName}. All rights reserved.
            </p>

            {/* Powered by OneClickBizz (Original, No Copyright) */}
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>Powered by</span>
              <a 
                href="https://oneclickbiz.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white font-extrabold hover:text-[#F8CD71] transition"
              >
                OneClickBizz
              </a>
              <span className="text-gray-600">•</span>
              <a href={`tel:${cleanCallNumber}`} className="hover:text-white transition font-mono">
                {cleanCallNumber}
              </a>
            </div>

            {/* Social Icons in FlagUp Signature Yellow Squares */}
            <div className="flex items-center gap-2">
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="bg-[#F8CD71] text-[#0B0F19] w-9 h-9 rounded-md flex items-center justify-center hover:bg-yellow-500 transition shadow-lg shrink-0 cursor-pointer"
              >
                <span className="font-black text-xs">FB</span>
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="bg-[#F8CD71] text-[#0B0F19] w-9 h-9 rounded-md flex items-center justify-center hover:bg-yellow-500 transition shadow-lg shrink-0 cursor-pointer"
              >
                <span className="font-black text-xs">IG</span>
              </a>

              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="bg-[#F8CD71] text-[#0B0F19] w-9 h-9 rounded-md flex items-center justify-center hover:bg-yellow-500 transition shadow-lg shrink-0 cursor-pointer"
              >
                <Play className="w-4 h-4 text-[#0B0F19] fill-current" />
              </a>

              <button
                type="button"
                onClick={() => handleWhatsAppChat('Footer_WhatsApp')}
                aria-label="WhatsApp"
                className="bg-[#F8CD71] text-[#0B0F19] w-9 h-9 rounded-md flex items-center justify-center hover:bg-yellow-500 transition shadow-lg shrink-0 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#0B0F19] fill-current" />
              </button>
            </div>

          </div>

        </div>
      </footer>

      {/* ============================================================== */}
      {/* 11. FLOATING CONTACT STACK (Exact FlagUp Pinned Bottom-Right)  */}
      {/* ============================================================== */}
      {/* FlagUp Signature Ambient Background Audio Control */}
      <div className="fixed top-1/2 -translate-y-1/2 right-4 sm:right-6 z-40">
        <audio
          ref={audioRef}
          loop
          src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
          preload="none"
        />
        <button
          type="button"
          onClick={() => {
            if (!audioRef.current) return;
            if (audioRef.current.paused) {
              audioRef.current.play().then(() => setIsAudioPlaying(true)).catch(() => {});
            } else {
              audioRef.current.pause();
              setIsAudioPlaying(false);
            }
          }}
          aria-label={isAudioPlaying ? "Mute Background Music" : "Play Ambient Background Music"}
          title={isAudioPlaying ? "Mute Ambient Music" : "Play Ambient Music"}
          className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 cursor-pointer ${
            isAudioPlaying 
              ? 'bg-[#0B0F19] text-[#F8CD71] ring-2 ring-[#F8CD71]/70' 
              : 'bg-[#111827]/90 text-gray-300 hover:text-white'
          }`}
        >
          {isAudioPlaying ? (
            <>
              <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F8CD71]/30"></span>
            </>
          ) : (
            <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </button>
      </div>

      <div 
        className="fixed bottom-6 right-6 z-40 flex flex-col md:flex-col sm:flex-row gap-3.5 select-none"
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
      >
        {/* Call Button (Blue #007bff) */}
        <a
          href={`tel:${cleanCallNumber}`}
          aria-label="Call Us"
          className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#007bff] hover:bg-blue-600 text-white flex items-center justify-center shadow-2xl transition-all duration-200 transform hover:-translate-y-1 hover:scale-105"
        >
          <Phone className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
          <span className="hidden md:group-hover:block absolute right-16 bg-[#212529] text-white text-xs font-semibold px-3 py-1.5 rounded-md whitespace-nowrap shadow-lg">
            Call Us
          </span>
        </a>

        {/* Email Button (Gray #6c757d) */}
        <a
          href={`mailto:${displayEmail}`}
          aria-label="Email Us"
          className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#6c757d] hover:bg-gray-600 text-white flex items-center justify-center shadow-2xl transition-all duration-200 transform hover:-translate-y-1 hover:scale-105"
        >
          <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="hidden md:group-hover:block absolute right-16 bg-[#212529] text-white text-xs font-semibold px-3 py-1.5 rounded-md whitespace-nowrap shadow-lg">
            Email Us
          </span>
        </a>

        {/* WhatsApp Button (Green #25d366 with pulse) */}
        <button
          type="button"
          onClick={() => handleWhatsAppChat('Floating_WhatsApp')}
          aria-label="Chat on WhatsApp"
          className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25d366] hover:bg-green-600 text-white flex items-center justify-center shadow-2xl transition-all duration-200 transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
        >
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-30"></span>
          <span className="hidden md:group-hover:block absolute right-16 bg-[#212529] text-white text-xs font-semibold px-3 py-1.5 rounded-md whitespace-nowrap shadow-lg">
            WhatsApp
          </span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* 12. FULL-SCREEN LIGHTBOX MEDIA PREVIEW MODAL                    */}
      {/* ============================================================== */}
      {previewMedia && (
        <div 
          onClick={() => setPreviewMedia(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-[#0B0F19] rounded-2xl sm:rounded-3xl border border-gray-800 overflow-hidden shadow-2xl text-white flex flex-col max-h-[90vh]"
          >
            {/* Top Bar with Title and Close Button */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-gray-800 bg-[#0B0F19]">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-white truncate max-w-lg">
                  {previewMedia.title}
                </h3>
                {previewMedia.subtitle && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    {previewMedia.subtitle}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setPreviewMedia(null)}
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 flex items-center justify-center transition"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Body */}
            <div className="flex-1 bg-black flex items-center justify-center overflow-hidden p-2 sm:p-4">
              {previewMedia.type === 'video' ? (
                previewMedia.url.includes('youtube.com') || previewMedia.url.includes('youtu.be') ? (
                  <iframe
                    src={getYoutubeEmbedUrl(previewMedia.url)}
                    title={previewMedia.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full aspect-video max-h-[70vh] rounded-xl border-0"
                  />
                ) : previewMedia.url.includes('instagram.com') ? (
                  <iframe
                    src={getInstagramEmbedUrl(previewMedia.url)}
                    title={previewMedia.title}
                    allowFullScreen
                    className="w-full max-w-sm aspect-[9/15] max-h-[70vh] rounded-xl border-0 bg-black"
                  />
                ) : (
                  <video
                    src={previewMedia.url}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[65vh] w-auto max-w-full rounded-lg object-contain"
                  />
                )
              ) : (
                <img
                  src={previewMedia.url}
                  alt={previewMedia.title}
                  className="max-h-[65vh] w-auto max-w-full rounded-lg object-contain"
                />
              )}
            </div>

            {/* Footer with WhatsApp Inquire CTA */}
            <div className="p-3 sm:p-4 bg-[#0B0F19] border-t border-gray-800 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                {projectName} Digital Showcase
              </span>
              <button
                type="button"
                onClick={() => handleWhatsAppChat('Lightbox_Inquiry', `Hello, I am interested in: ${previewMedia.title}`)}
                className="px-4 py-2 rounded-xl bg-[#F8CD71] text-[#0B0F19] font-black text-xs flex items-center gap-1.5 shadow-md hover:bg-yellow-500 transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Inquire on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 12B. ADVANCED UNIT SPECIFICATIONS & DIMENSIONS MODAL           */}
      {/* ============================================================== */}
      {selectedPlanDetails && (
        <div 
          onClick={() => setSelectedPlanDetails(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-2xl text-[#111827] flex flex-col max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-6 bg-[#0B0F19] text-white flex items-center justify-between border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F8CD71] text-[#0B0F19] flex items-center justify-center font-black text-sm shrink-0">
                  {selectedPlanDetails.category.slice(0, 3)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-xl font-extrabold text-white truncate">
                      {selectedPlanDetails.title}
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1f3b2f] text-[#F8CD71] border border-[#bd8a2d]/40">
                      100% Vastu
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {selectedPlanDetails.bhk} • {selectedPlanDetails.superArea} Super Area ({selectedPlanDetails.carpetArea} RERA Carpet)
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPlanDetails(null)}
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 flex items-center justify-center transition cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Two Columns (Image Preview & Specs Breakdown) */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left: Interactive Layout Visual with 2D/3D Switcher */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-center justify-between bg-gray-100 p-1.5 rounded-xl">
                    <span className="text-xs font-bold text-gray-600 px-2">
                      Viewing: {cardViewModes[selectedPlanDetails.id] === '3d' ? '3D Furnished Model' : '2D Technical CAD Blueprint'}
                    </span>
                    {selectedPlanDetails.view3dUrl && (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setCardViewModes(prev => ({ ...prev, [selectedPlanDetails.id]: '2d' }))}
                          className={`px-3 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                            (cardViewModes[selectedPlanDetails.id] || '2d') === '2d'
                              ? 'bg-[#1f3b2f] text-white shadow-xs'
                              : 'bg-white text-gray-600 hover:text-black'
                          }`}
                        >
                          📐 2D CAD
                        </button>
                        <button
                          type="button"
                          onClick={() => setCardViewModes(prev => ({ ...prev, [selectedPlanDetails.id]: '3d' }))}
                          className={`px-3 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                            cardViewModes[selectedPlanDetails.id] === '3d'
                              ? 'bg-[#F8CD71] text-[#0B0F19] shadow-xs'
                              : 'bg-white text-gray-600 hover:text-black'
                          }`}
                        >
                          🏠 3D Model
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Visual Container */}
                  <div 
                    onClick={() => setPreviewMedia({
                      url: cardViewModes[selectedPlanDetails.id] === '3d' && selectedPlanDetails.view3dUrl ? selectedPlanDetails.view3dUrl : selectedPlanDetails.imageUrl,
                      type: 'image',
                      title: selectedPlanDetails.title,
                      subtitle: `${selectedPlanDetails.bhk} • Carpet: ${selectedPlanDetails.carpetArea} • ${selectedPlanDetails.facing}`
                    })}
                    className="relative aspect-[4/3] bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden flex items-center justify-center p-3 cursor-zoom-in group"
                  >
                    <img
                      src={cardViewModes[selectedPlanDetails.id] === '3d' && selectedPlanDetails.view3dUrl ? selectedPlanDetails.view3dUrl : selectedPlanDetails.imageUrl}
                      alt={selectedPlanDetails.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute bottom-3 right-3 bg-black/75 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                      <Maximize2 className="w-3.5 h-3.5 text-[#F8CD71]" />
                      <span>Tap to Enlarge</span>
                    </div>
                  </div>
                </div>

                {/* Right: Technical Room Dimensions & Specs Table */}
                <div className="lg:col-span-5 space-y-4">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                      Key Area Breakdown
                    </h4>
                    <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200/90 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Super Built-up Area:</span>
                        <strong className="text-gray-900 font-bold">{selectedPlanDetails.superArea}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">RERA Carpet Area:</span>
                        <strong className="text-gray-900 font-bold">{selectedPlanDetails.carpetArea}</strong>
                      </div>
                      {selectedPlanDetails.efficiency && (
                        <div className="flex items-center justify-between text-emerald-700 font-bold">
                          <span>Efficiency Ratio:</span>
                          <span>{selectedPlanDetails.efficiency}</span>
                        </div>
                      )}
                      {selectedPlanDetails.balconyArea && (
                        <div className="flex items-center justify-between text-gray-600">
                          <span>Balcony / Sit-out:</span>
                          <span className="font-semibold text-gray-800">{selectedPlanDetails.balconyArea}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-gray-600">
                        <span>Vastu Orientation:</span>
                        <span className="font-semibold text-emerald-800">{selectedPlanDetails.facing}</span>
                      </div>
                    </div>
                  </div>

                  {/* Room Dimension Table */}
                  {selectedPlanDetails.roomSpecs && selectedPlanDetails.roomSpecs.length > 0 && (
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                        Architectural Room Dimensions
                      </h4>
                      <div className="rounded-xl border border-gray-200 overflow-hidden divide-y divide-gray-100 text-xs">
                        {selectedPlanDetails.roomSpecs.map((room, rIdx) => (
                          <div key={rIdx} className="px-3.5 py-2 flex items-center justify-between bg-white hover:bg-gray-50">
                            <span className="font-medium text-gray-700">{room.name}</span>
                            <span className="font-mono font-bold text-gray-900">{room.size}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price Box */}
                  <div className="p-3.5 rounded-2xl bg-[#0B0F19] text-white flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-semibold block">Starting Price</span>
                      <span className="text-lg font-black text-[#F8CD71]">
                        {selectedPlanDetails.price}
                      </span>
                    </div>
                    {selectedPlanDetails.estEmi && (
                      <div className="text-right">
                        <span className="text-[10px] text-gray-400 uppercase font-semibold block">Estimated EMI</span>
                        <span className="text-xs font-bold text-emerald-400 font-mono">
                          {selectedPlanDetails.estEmi}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Footer CTAs */}
            <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  if (selectedPlanDetails.priceNum) {
                    setEmiPropertyCost(selectedPlanDetails.priceNum);
                  }
                  setSelectedPlanDetails(null);
                  setIsEmiModalOpen(true);
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-gray-100 text-[#0B0F19] border border-gray-300 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-emerald-600" />
                <span>Calculate EMI for this Unit</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPlanDetails(null);
                    setIsBrochureModalOpen(true);
                  }}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Blueprint</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleWhatsAppChat(
                      'Unit_Modal_Inquiry',
                      `Hello, I reviewed the detailed room specifications for ${selectedPlanDetails.title} (${selectedPlanDetails.bhk}). Please send me the complete payment milestone sheet and book a site visit.`
                    );
                  }}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#F8CD71] hover:bg-yellow-500 text-[#0B0F19] font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Lock Price on WhatsApp</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 13. SITE VISIT BOOKING MODAL                                   */}
      {/* ============================================================== */}
      {isSiteVisitModalOpen && (
        <div 
          onClick={() => setIsSiteVisitModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-lg w-full bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden text-[#111827]"
          >
            {/* Header */}
            <div className="p-6 bg-[#0B0F19] text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#F8CD71] uppercase tracking-wider">
                  Complimentary Chauffeur
                </span>
                <h3 className="text-xl font-extrabold text-white">
                  Schedule Site Inspection
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSiteVisitModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-800 text-gray-300 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSiteVisitSubmit} className="p-6 space-y-4">
              {siteVisitSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Site Visit Registered!</h4>
                  <p className="text-xs text-gray-500">Redirecting to WhatsApp for instant relationship manager confirmation...</p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={siteVisitForm.name}
                      onChange={(e) => setSiteVisitForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#F8CD71]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp / Mobile Number</label>
                    <input
                      type="tel"
                      required
                      value={siteVisitForm.phone}
                      onChange={(e) => setSiteVisitForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#F8CD71]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Preferred Date</label>
                      <input
                        type="date"
                        required
                        value={siteVisitForm.date}
                        onChange={(e) => setSiteVisitForm(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#F8CD71]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Time Window</label>
                      <select
                        value={siteVisitForm.timeSlot}
                        onChange={(e) => setSiteVisitForm(prev => ({ ...prev, timeSlot: e.target.value }))}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#F8CD71]"
                      >
                        <option>10:00 AM - 12:00 PM</option>
                        <option>12:00 PM - 02:00 PM</option>
                        <option>02:00 PM - 04:00 PM</option>
                        <option>04:00 PM - 06:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Unit Configuration</label>
                    <select
                      value={siteVisitForm.bhkPreference}
                      onChange={(e) => setSiteVisitForm(prev => ({ ...prev, bhkPreference: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#F8CD71]"
                    >
                      <option>1 BHK Compact Luxury</option>
                      <option>2 BHK Executive Suite</option>
                      <option>3 BHK Sky Villa</option>
                      <option>Gated Villa Plot</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="pickupCheck"
                      checked={siteVisitForm.pickupRequired}
                      onChange={(e) => setSiteVisitForm(prev => ({ ...prev, pickupRequired: e.target.checked }))}
                      className="rounded text-[#0B0F19] focus:ring-[#F8CD71]"
                    />
                    <label htmlFor="pickupCheck" className="text-xs font-semibold text-gray-700">
                      Request complimentary chauffeured car pickup &amp; drop
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 py-3 rounded-xl bg-[#0B0F19] text-[#F8CD71] font-black text-sm hover:bg-black transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Confirm &amp; Notify via WhatsApp</span>
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 14. BROCHURE DOWNLOAD MODAL                                    */}
      {/* ============================================================== */}
      {isBrochureModalOpen && (
        <div 
          onClick={() => setIsBrochureModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden text-[#111827]"
          >
            <div className="p-6 bg-[#1f3b2f] text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#F8CD71] uppercase tracking-wider">
                  Instant PDF Access
                </span>
                <h3 className="text-xl font-extrabold text-white">
                  Download Project Brochure
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsBrochureModalOpen(false)}
                className="w-8 h-8 rounded-full bg-black/40 text-gray-300 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleBrochureSubmit} className="p-6 space-y-4">
              {brochureSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Brochure Sent to WhatsApp!</h4>
                  <p className="text-xs text-gray-500">Opening WhatsApp with direct PDF brochure download link...</p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={brochureForm.name}
                      onChange={(e) => setBrochureForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Anand Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#F8CD71]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      value={brochureForm.phone}
                      onChange={(e) => setBrochureForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#F8CD71]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={brochureForm.email}
                      onChange={(e) => setBrochureForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="e.g. anand@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#F8CD71]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 py-3 rounded-xl bg-[#1f3b2f] text-white font-black text-sm hover:bg-[#162a22] transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#F8CD71]" />
                    <span>Send Brochure on WhatsApp</span>
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 15. EMI CALCULATOR MODAL                                       */}
      {/* ============================================================== */}
      {isEmiModalOpen && (
        <div 
          onClick={() => setIsEmiModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-xl w-full bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden text-[#111827]"
          >
            <div className="p-6 bg-[#0B0F19] text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#F8CD71] uppercase tracking-wider">
                  Financial Planning
                </span>
                <h3 className="text-xl font-extrabold text-white">
                  Home Loan EMI Calculator
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEmiModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-800 text-gray-300 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Sliders */}
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                  <span>Property Cost:</span>
                  <span className="text-[#0B0F19] font-black">₹ {(emiPropertyCost / 100000).toFixed(1)} Lakhs</span>
                </div>
                <input
                  type="range"
                  min={2500000}
                  max={30000000}
                  step={500000}
                  value={emiPropertyCost}
                  onChange={(e) => setEmiPropertyCost(Number(e.target.value))}
                  className="w-full accent-[#0B0F19]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                  <span>Down Payment ({emiDownPaymentPct}%):</span>
                  <span className="text-[#0B0F19] font-black">₹ {((emiPropertyCost * emiDownPaymentPct / 100) / 100000).toFixed(1)} Lakhs</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={50}
                  step={5}
                  value={emiDownPaymentPct}
                  onChange={(e) => setEmiDownPaymentPct(Number(e.target.value))}
                  className="w-full accent-[#0B0F19]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={emiInterestRate}
                    onChange={(e) => setEmiInterestRate(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Tenure (Years)</label>
                  <input
                    type="number"
                    value={emiTenureYears}
                    onChange={(e) => setEmiTenureYears(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-bold"
                  />
                </div>
              </div>

              {/* Calculated EMI Display Box */}
              <div className="p-4 rounded-2xl bg-[#0B0F19] text-white flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400">Estimated Monthly EMI</span>
                  <h4 className="text-2xl font-black text-[#F8CD71]">
                    ₹ {emiCalculation.monthlyEmi.toLocaleString('en-IN')}
                    <span className="text-xs font-normal text-gray-300"> / month</span>
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => handleWhatsAppChat('Bank_Loan_Assistance', `Hello, I calculated an EMI of ₹${emiCalculation.monthlyEmi.toLocaleString('en-IN')}/month for property cost ₹${(emiPropertyCost/100000).toFixed(1)} Lakhs. Please assist with bank loan approvals.`)}
                  className="px-4 py-2 rounded-xl bg-[#F8CD71] text-[#0B0F19] font-black text-xs hover:bg-yellow-500 transition shadow-md"
                >
                  Apply Bank Loan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 16. SHARE PROFILE MODAL                                        */}
      {/* ============================================================== */}
      <ShareCardModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        profile={profile}
      />

    </div>
  );
}
