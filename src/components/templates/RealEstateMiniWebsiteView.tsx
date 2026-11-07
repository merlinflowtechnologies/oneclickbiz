'use client';

import React, { useState, useMemo, useRef } from 'react';
import { 
  Building2, 
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
  ArrowUpRight
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
  superArea: string;
  carpetArea: string;
  facing: string;
  price: string;
  imageUrl: string;
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

  // Floor plans (FlagUp Layout Plans)
  const layoutPlans: RealEstateFloorPlan[] = useMemo(() => {
    const rawProducts = profile.sectionData?.products?.items || [];
    if (rawProducts.length > 0) {
      return rawProducts.map((p, idx) => ({
        id: p.id || `plan_${idx}`,
        title: p.name || `Architecture Plan ${idx + 1}`,
        bhk: p.name.includes('BHK') ? p.name : `${(idx % 3) + 1} BHK Premium`,
        superArea: `${1150 + idx * 350} Sq.Ft`,
        carpetArea: `${850 + idx * 280} Sq.Ft`,
        facing: idx % 2 === 0 ? 'East Facing (100% Vastu)' : 'North Facing (100% Vastu)',
        price: p.price ? `₹ ${p.price.toLocaleString('en-IN')}` : 'Price on Request',
        imageUrl: p.imageUrl || `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80`
      }));
    }
    return [
      {
        id: 'plan_1',
        title: 'Typical Floor Plan (G+22)',
        bhk: 'Master Architectural Layout',
        superArea: 'Tower Cluster Layout',
        carpetArea: 'Optimal Core & Lift Lobby',
        facing: 'East / West Dual Facing',
        price: 'All Units Approved',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'plan_2',
        title: '1 BHK Smart Residence',
        bhk: '1 BHK Compact Luxury',
        superArea: '685 Sq.Ft',
        carpetArea: '520 Sq.Ft',
        facing: 'East Facing Vastu',
        price: '₹ 42.5 Lakhs*',
        imageUrl: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'plan_3',
        title: '2 BHK Grand Suite',
        bhk: '2 BHK Executive Suite',
        superArea: '1,180 Sq.Ft',
        carpetArea: '890 Sq.Ft',
        facing: 'North-East Corner Facing',
        price: '₹ 78.9 Lakhs*',
        imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'plan_4',
        title: '3 BHK Sky Palace Villa',
        bhk: '3 BHK Sky Villa',
        superArea: '1,750 Sq.Ft',
        carpetArea: '1,380 Sq.Ft',
        facing: 'East Facing with Balcony',
        price: '₹ 1.25 Crore*',
        imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
      }
    ];
  }, [profile.sectionData?.products?.items]);

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
      {/* 4. LAYOUT PLANS SECTION (`#plans`)                              */}
      {/* ============================================================== */}
      <section id="plans" className="bg-[#F4F7FE] py-10 sm:py-16 border-b border-gray-200">
        
        {/* FlagUp Signature Forest Green Header Banner */}
        <div className="mx-auto mb-8 sm:mb-12 w-full max-w-full bg-[#1f3b2f] px-3 py-4 text-center sm:px-5 sm:py-5 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
            LayOut Plans
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
            {layoutPlans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setPreviewMedia({
                  url: plan.imageUrl,
                  type: 'image',
                  title: plan.title,
                  subtitle: `${plan.bhk} • Carpet Area: ${plan.carpetArea} • ${plan.facing}`
                })}
                className="floor-image-card group bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col"
              >
                {/* Blueprint Image Preview Container */}
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden p-3 flex items-center justify-center">
                  <img
                    src={plan.imageUrl}
                    alt={plan.title}
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Maximize2 className="w-2.5 h-2.5" />
                    <span>Zoom</span>
                  </div>
                </div>

                {/* Plan Meta Details */}
                <div className="p-4 flex-1 flex flex-col justify-between border-t border-gray-100">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-[#111827] group-hover:text-[#bd8a2d] transition-colors truncate">
                      {plan.title}
                    </h3>
                    <div className="mt-1.5 space-y-1 text-xs text-gray-500">
                      <p className="flex items-center justify-between">
                        <span>Super Area:</span>
                        <strong className="text-gray-800">{plan.superArea}</strong>
                      </p>
                      <p className="flex items-center justify-between">
                        <span>Carpet Area:</span>
                        <strong className="text-gray-800">{plan.carpetArea}</strong>
                      </p>
                      <p className="text-[11px] text-emerald-700 font-semibold truncate">
                        {plan.facing}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWhatsAppChat('FloorPlan_Inquiry', `Hello, I would like to inquire about the ${plan.title} (${plan.bhk}) for ${projectName}.`);
                    }}
                    className="mt-3.5 w-full py-2 rounded-xl bg-gray-50 group-hover:bg-[#F8CD71] text-[#111827] text-xs font-bold transition flex items-center justify-center gap-1.5 border border-gray-200"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>Inquire on WhatsApp</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Download Master Brochure Button */}
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setIsBrochureModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1f3b2f] text-white hover:bg-[#162a22] font-bold text-sm shadow-md transition cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#F8CD71]" />
              <span>Download Master Layout Blueprint (PDF)</span>
            </button>
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
                <video
                  src={previewMedia.url}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[65vh] w-auto max-w-full rounded-lg object-contain"
                />
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
