'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
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
  Layers, 
  Calculator, 
  Clock, 
  Home, 
  Menu,
  X, 
  Navigation,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Film,
  Compass,
  Eye,
  TrendingUp,
  Car,
  Lock,
  PhoneCall
} from 'lucide-react';
import { DigitalProfile, VideoItem } from '@/lib/types';
import ShareCardModal from '@/components/common/ShareCardModal';
import { downloadVcfFile } from '@/lib/vcf';

function NativeModalDialog({
  isOpen,
  onClose,
  labelledBy,
  maxWidthClass = 'max-w-lg',
  children
}: {
  isOpen: boolean;
  onClose: () => void;
  labelledBy?: string;
  maxWidthClass?: string;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const pressedOutsideRef = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      if (!dialog.open) {
        try {
          dialog.showModal();
        } catch {
          // Fallback if dialog is detached mid-render
        }
      }
    } else if (dialog.open) {
      dialog.returnValue = '';
      dialog.close();
    }
  }, [isOpen]);

  const isOutsideDialog = (e: React.PointerEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return false;
    const rect = dialog.getBoundingClientRect();
    return (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    );
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      {...({ closedby: 'any' } as any)}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClose={() => {
        if (dialogRef.current) dialogRef.current.returnValue = '';
      }}
      onPointerDown={(e) => {
        pressedOutsideRef.current = isOutsideDialog(e);
      }}
      onPointerUp={(e) => {
        if (pressedOutsideRef.current && isOutsideDialog(e)) {
          onClose();
        }
        pressedOutsideRef.current = false;
      }}
      className={`w-[calc(100dvw-1.5rem)] ${maxWidthClass} rounded-2xl sm:rounded-3xl bg-transparent p-0 border-0 shadow-2xl overflow-visible backdrop:bg-black/85 backdrop:backdrop-blur-md`}
    >
      {children}
    </dialog>
  );
}

function formatINRCompact(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2).replace(/\.00$/, '')} Cr*`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1).replace(/\.0$/, '')} Lakhs*`;
  }
  return `₹${amount.toLocaleString('en-IN')}*`;
}

function calculateMonthlyEmi(loanAmount: number, annualRatePct = 8.4, tenureYears = 20): number {
  const monthlyRate = annualRatePct / 12 / 100;
  const months = tenureYears * 12;
  if (monthlyRate === 0) return Math.round(loanAmount / months);
  const factor = Math.pow(1 + monthlyRate, months);
  return Math.round((loanAmount * monthlyRate * factor) / (factor - 1));
}

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
  category: 'Master Layout' | 'Apartments' | 'Villas' | 'Commercial' | 'Plots & Estates' | '1 BHK' | '2 BHK' | '3 BHK' | '4 BHK';
  superArea: string;
  carpetArea: string;
  areaMetricLabel?: string;
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
  availabilityTag?: string;
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
    title: 'Skyline Imperia — 4K Aerial Drone & Elevation Tour',
    url: 'https://www.youtube.com/watch?v=y9j-BL5ocW8',
    type: 'youtube' as const,
    caption: '4K aerial architectural tour showcasing tower facades, podium greens & clubhouse.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'vid-yt-2',
    title: 'Model 4 BHK Sky Residence — Luxury Interior Walkthrough',
    url: 'https://www.youtube.com/watch?v=zumJJUL_ruM',
    type: 'youtube' as const,
    caption: 'Walkthrough of double-height foyer, Italian marble flooring & smart modular kitchen.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'vid-yt-3',
    title: 'Skyline Waterfront Penthouse & Sunset Sky Deck Tour',
    url: 'https://www.youtube.com/watch?v=jPkBJY1KI_Q',
    type: 'youtube' as const,
    caption: 'Panoramic 270-degree views, plunge pool terrace & 5-star sky lounge deck.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'vid-ig-1',
    title: 'Skyline Grandeur Triplex Villas — Poolside & Clubhouse Reel',
    url: 'https://www.instagram.com/reel/Dboeh4BTscY/',
    type: 'instagram' as const,
    caption: 'Exclusive on-site reel: temperature-controlled pool, manicured lawns & private villas.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'vid-yt-4',
    title: 'Skyline Business Hub — Grade-A Commercial Campus Tour',
    url: 'https://www.youtube.com/watch?v=y9j-BL5ocW8',
    type: 'youtube' as const,
    caption: 'LEED-certified office suites with double-glazed facade & 8.4% lease yield potential.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'vid-ig-2',
    title: 'Key Handover & Homeowner Celebration Ceremony Reel',
    url: 'https://www.instagram.com/reel/DbNGzEmRwlb/',
    type: 'instagram' as const,
    caption: 'Welcoming families to completed towers with spot RERA documentation & celebration.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&q=80'
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
  const [hasStartedShowcaseVideo, setHasStartedShowcaseVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Cost Sheet Configurator inside Unit Modal
  const [selectedFloorTier, setSelectedFloorTier] = useState<'podium' | 'sky' | 'penthouse'>('sky');
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState<'subvention' | 'clp' | 'outright'>('subvention');

  // Inline Quick Priority Callback Form State
  const [callbackForm, setCallbackForm] = useState({ name: '', phone: '', unitInterest: '3 & 4 BHK Sky Residences' });
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

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

  // EMI Calculator State (Default ₹1.85 Cr flagship unit @ 8.40% pre-approved APF rate)
  const [emiPropertyCost, setEmiPropertyCost] = useState<number>(18500000);
  const [emiDownPaymentPct, setEmiDownPaymentPct] = useState<number>(20);
  const [emiInterestRate, setEmiInterestRate] = useState<number>(8.4);
  const [emiTenureYears, setEmiTenureYears] = useState<number>(20);

  // User details & fallback resolution
  const projectName = useMemo(() => {
    return profile.company || profile.name || 'THE MILLENNIAL TOWERS';
  }, [profile.company, profile.name]);

  const userCity = useMemo(() => {
    if (profile.sectionData?.realEstate?.city) {
      return profile.sectionData.realEstate.city.split('•')[0].trim();
    }
    if (!profile.address) return 'Financial District';
    const parts = profile.address.split(',').map(s => s.trim());
    return parts[parts.length - 2] || parts[parts.length - 1] || parts[0] || 'Financial District';
  }, [profile.address, profile.sectionData]);

  // Never show an executive job title (e.g. "Managing Director") as the property buyer hero subtitle
  const rawProfileTagline = (profile as { tagline?: string }).tagline;
  const projectTagline = useMemo(() => {
    const explicitTagline = (profile.sectionData?.realEstate as { tagline?: string } | undefined)?.tagline || rawProfileTagline;
    if (explicitTagline) return explicitTagline;
    const desig = profile.designation || '';
    const looksLikeJobTitle = /(director|founder|partner|ceo|officer|manager|advisor|consultant)/i.test(desig);
    if (!looksLikeJobTitle && desig.trim().length > 0) return desig;
    return `RERA-Verified Luxury Sky Residences, Triplex Villas & High-Appreciation Enclaves in ${userCity}`;
  }, [profile.sectionData, rawProfileTagline, profile.designation, userCity]);

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

  // Showcase Video Source resolution (verified 4K luxury walkthrough or custom MP4/YouTube)
  const showcaseVideoSrc = useMemo(() => {
    if (profile.sectionData?.realEstate?.videoUrl) {
      return profile.sectionData.realEstate.videoUrl;
    }
    const firstCustomVideo = (profile.sectionData?.videos?.items || []).find(
      v => v.type === 'youtube' || v.url.includes('youtube.com') || v.url.includes('youtu.be') || v.url.endsWith('.mp4')
    );
    if (firstCustomVideo?.url) {
      return firstCustomVideo.url;
    }
    return 'https://www.youtube.com/watch?v=y9j-BL5ocW8';
  }, [profile.sectionData?.realEstate?.videoUrl, profile.sectionData?.videos?.items]);

  const isYouTubeVideo = useMemo(() => {
    return showcaseVideoSrc.includes('youtube.com') || showcaseVideoSrc.includes('youtu.be');
  }, [showcaseVideoSrc]);

  const youTubeEmbedUrl = useMemo(() => {
    if (!isYouTubeVideo) return '';
    const match = showcaseVideoSrc.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    return match && match[1] ? `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1&rel=0&modestbranding=1` : '';
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

  // Advanced Floor & Portfolio Plans (Accurate multi-asset types + real compounding EMI math)
  const layoutPlans: RealEstateFloorPlan[] = useMemo(() => {
    const rawProducts = profile.sectionData?.products?.items || [];
    if (rawProducts.length > 0) {
      const altImages = [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      ];
      return rawProducts.map((p, idx) => {
        const lower = `${p.name} ${p.category || ''} ${p.description || ''}`.toLowerCase();
        const isPlotOrFarm = lower.includes('plot') || lower.includes('farm') || lower.includes('acre') || lower.includes('sq.yd');
        const isFarm = lower.includes('farm') || lower.includes('acre');
        const isCommercial = lower.includes('commercial') || lower.includes('business') || lower.includes('office') || lower.includes('retail') || lower.includes('it park');
        const isVilla = lower.includes('villa') || lower.includes('triplex') || lower.includes('mansion');

        let cat: RealEstateFloorPlan['category'] = 'Apartments';
        if (isPlotOrFarm) cat = 'Plots & Estates';
        else if (isCommercial) cat = 'Commercial';
        else if (isVilla) cat = 'Villas';
        else if (p.name.includes('1 BHK')) cat = '1 BHK';
        else if (p.name.includes('2 BHK')) cat = '2 BHK';
        else if (p.name.includes('3 BHK')) cat = '3 BHK';
        else if (p.name.includes('4 BHK')) cat = '4 BHK';

        const priceVal = p.price || (9500000 + idx * 3500000);
        const monthlyEmiNum = calculateMonthlyEmi(priceVal * 0.8, 8.4, 20);
        const subtitle = isFarm
          ? '1 & 2 Acre Managed Farm Estates • Ready Registry'
          : isPlotOrFarm
          ? '150–350 Sq.Yds • 40ft BT Roads • HMDA & RERA'
          : isCommercial
          ? 'Grade-A Tech Suites • 8.4% Lease Yield Potential'
          : isVilla
          ? '4 & 5 BHK Triplex Villa + Private Plunge Pool'
          : p.name.includes('BHK')
          ? `${p.name.match(/[1-5](\s*&\s*[1-5])?\s*BHK/i)?.[0] || '3 & 4 BHK'} Luxury Residence • Sky Deck`
          : 'Ultra-Luxury Sky Residence • 100% Vastu';

        const superAreaVal = isFarm
          ? '1 – 2 Acres'
          : isPlotOrFarm
          ? '150 – 350 Sq.Yds'
          : isCommercial
          ? '1,250 – 4,500 Sq.Ft'
          : isVilla
          ? '3,850 Sq.Ft'
          : `${1850 + idx * 320} Sq.Ft`;

        const carpetAreaVal = isFarm
          ? '100% Fenced Free-Hold'
          : isPlotOrFarm
          ? 'Spot Registration Ready'
          : isCommercial
          ? '82% Net Leasable Area'
          : isVilla
          ? '3,120 Sq.Ft + Lawn'
          : `${1440 + idx * 240} Sq.Ft`;

        const roomSpecsList = isPlotOrFarm
          ? [
              { name: 'Plot Dimensions / Extent', size: isFarm ? '1 Acre & 2 Acre Gated' : '150 – 350 Sq.Yds' },
              { name: 'Internal Road Infrastructure', size: '40ft & 60ft CC Blacktop' },
              { name: 'Utilities & Boundary', size: 'Underground Power & Water' },
              { name: 'Approval & Registration', size: 'RERA / HMDA • Spot Registry' }
            ]
          : isCommercial
          ? [
              { name: 'Configurable Workfloor', size: '1,250 – 4,500 Sq.Ft' },
              { name: 'Floor-to-Ceiling Height', size: '12.5 Feet Double Glazed' },
              { name: 'Power & Lift Core', size: '100% DG + 6 High-Speed Lifts' },
              { name: 'Leasing & Rental Yield', size: 'Est. 8.4% Gross Annual Yield' }
            ]
          : [
              { name: 'Grand Living & Dining Foyer', size: `${19 + (idx % 4)}'0" x ${13 + (idx % 3)}'6"` },
              { name: 'Presidential Master Suite', size: `${15 + (idx % 3)}'6" x 13'0"` },
              { name: 'European Modular Kitchen', size: "12'0\" x 9'6\"" },
              { name: 'Panoramic Balcony / Deck', size: `${14 + (idx % 4)}'0" x 6'0"` }
            ];

        return {
          id: p.id || `plan_${idx}`,
          title: p.name || `Signature Unit #${idx + 1}`,
          category: cat,
          bhk: subtitle,
          superArea: superAreaVal,
          carpetArea: carpetAreaVal,
          areaMetricLabel: isPlotOrFarm ? 'Development Status' : isCommercial ? 'Leasable Efficiency' : 'RERA Carpet Area',
          efficiency: isPlotOrFarm ? '100% Clear Link Title' : isCommercial ? '82% Office Floorplate' : '78% Usable Carpet Ratio',
          balconyArea: isPlotOrFarm ? 'Clubhouse & Avenue Trees' : `${110 + idx * 25} Sq.Ft Sky Deck`,
          bedrooms: isPlotOrFarm || isCommercial ? 'N/A' : isVilla ? 4 : 3,
          bathrooms: isPlotOrFarm || isCommercial ? 'Custom' : 3,
          facing: isPlotOrFarm ? 'East / North-East Corner Plots' : idx % 2 === 0 ? 'East Facing (100% Vastu)' : 'North-East Corner Panoramic',
          price: formatINRCompact(priceVal),
          priceNum: priceVal,
          estEmi: `₹ ${monthlyEmiNum.toLocaleString('en-IN')}/mo*`,
          imageUrl: p.imageUrl || altImages[idx % altImages.length],
          view3dUrl: altImages[(idx + 2) % altImages.length],
          tag: idx === 0 ? 'Flagship Tower' : idx === 2 ? 'Few Left' : isPlotOrFarm ? 'Spot Registry' : 'High Yield',
          availabilityTag: idx === 0 ? '8 Corner Units Left' : idx === 2 ? 'Phase-1 Selling Fast' : 'Available Now',
          roomSpecs: roomSpecsList
        };
      });
    }
    return [
      {
        id: 'plan_master',
        title: 'Master Tower Cluster Layout (G+28)',
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
        price: '₹42.5 Lakhs*',
        priceNum: 4250000,
        estEmi: `₹ ${calculateMonthlyEmi(4250000 * 0.8, 8.4, 20).toLocaleString('en-IN')}/mo*`,
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
        price: '₹78.9 Lakhs*',
        priceNum: 7890000,
        estEmi: `₹ ${calculateMonthlyEmi(7890000 * 0.8, 8.4, 20).toLocaleString('en-IN')}/mo*`,
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
        price: '₹1.25 Cr*',
        priceNum: 12500000,
        estEmi: `₹ ${calculateMonthlyEmi(12500000 * 0.8, 8.4, 20).toLocaleString('en-IN')}/mo*`,
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
        price: '₹1.89 Cr*',
        priceNum: 18900000,
        estEmi: `₹ ${calculateMonthlyEmi(18900000 * 0.8, 8.4, 20).toLocaleString('en-IN')}/mo*`,
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

  // Dynamic Plan Category Tabs built cleanly from actual portfolio items
  const planCategories = useMemo(() => {
    const uniqueCats = Array.from(new Set(layoutPlans.map(p => p.category)));
    return ['All', ...uniqueCats];
  }, [layoutPlans]);

  // Consistent summary metrics used across Hero, Sticky Bar & Calculator presets
  const startingPortfolioStats = useMemo(() => {
    const priced = layoutPlans.filter(p => (p.priceNum || 0) > 0);
    const minUnit = priced.reduce((min, cur) => ((cur.priceNum || 0) < (min.priceNum || 0) ? cur : min), priced[0] || { priceNum: 9500000 });
    const minBuilt = priced.filter(p => p.category !== 'Plots & Estates').reduce((min, cur) => ((cur.priceNum || 0) < (min.priceNum || 0) ? cur : min), priced[0] || { priceNum: 9500000 });
    const minPriceNum = minBuilt?.priceNum || minUnit?.priceNum || 9500000;
    const minPlotPrice = priced.find(p => p.category === 'Plots & Estates')?.priceNum;
    return {
      startingPriceLabel: formatINRCompact(minPriceNum),
      minPlotLabel: minPlotPrice ? formatINRCompact(minPlotPrice) : null,
      startingEmi: `₹${calculateMonthlyEmi(minPriceNum * 0.8, 8.4, 20).toLocaleString('en-IN')}/Mo*`
    };
  }, [layoutPlans]);

  // Filtered Plans based on active tab
  const filteredPlans = useMemo(() => {
    if (activePlanTab === 'All') return layoutPlans;
    return layoutPlans.filter(p => p.category === activePlanTab || p.bhk.includes(activePlanTab));
  }, [layoutPlans, activePlanTab]);

  // Verified Testimonials (uses profile data cleanly with luxury defaults)
  const verifiedTestimonials = useMemo(() => {
    const custom = profile.sectionData?.testimonials?.items || [];
    if (custom.length >= 2) return custom.slice(0, 3);
    return [
      {
        id: 'rev_1',
        clientName: 'Rajesh & Sunita K.',
        clientRole: 'Director, Deloitte • 3 BHK Sky Residence',
        content: 'We visited 8 high-rise developments across the Financial District, but the floor plan layout, 82% open space, and private sky deck made it an instant decision for our family.',
        rating: 5,
        clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
      },
      {
        id: 'rev_2',
        clientName: 'Anand Verma',
        clientRole: 'VP Engineering, Amazon • 4 BHK Penthouse',
        content: 'The transparent RERA milestone tracking, zero pre-EMI offer, and penalty-backed handover agreement gave me 100% peace of mind. Exceptional appreciation value.',
        rating: 5,
        clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
      },
      {
        id: 'rev_3',
        clientName: 'Dr. Meenakshi & Sridhar',
        clientRole: 'Senior Consultants • 3 BHK Luxury Suite',
        content: 'Being 5 minutes from top international schools and leading hospitals makes daily life effortless. The 50,000 sq.ft clubhouse truly feels like a 5-star resort.',
        rating: 5,
        clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      }
    ];
  }, [profile.sectionData?.testimonials?.items]);

  // Project Amenities matching FlagUp's exact visual cards (100% verified 200 OK photos)
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
        imageUrl: 'https://images.unsplash.com/photo-1566454825481-4e48f80aa4d7?auto=format&fit=crop&w=800&q=80',
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

  // Non-blocking CRM lead save
  const submitLeadRecord = (payload: { name: string; phone: string; email?: string; message: string }) => {
    if (!profile.slug) return;
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profileSlug: profile.slug,
        name: payload.name,
        phone: payload.phone,
        email: payload.email || displayEmail || `${payload.phone}@whatsapp.lead`,
        message: payload.message
      })
    }).catch(() => {});
  };

  // Site Visit Form Submit
  const handleSiteVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackAction('site_visit_booked');
    setSiteVisitSuccess(true);
    const msgText = `VIP Cab Site Visit | Unit: ${siteVisitForm.bhkPreference} | Date: ${siteVisitForm.date} (${siteVisitForm.timeSlot}) | Chauffeur: ${siteVisitForm.pickupRequired ? 'Yes' : 'No'}`;
    submitLeadRecord({ name: siteVisitForm.name, phone: siteVisitForm.phone, message: msgText });
    const msg = `*New VIP Site Visit Scheduled!*%0A%0A*Name:* ${siteVisitForm.name}%0A*Phone:* ${siteVisitForm.phone}%0A*Date:* ${siteVisitForm.date}%0A*Slot:* ${siteVisitForm.timeSlot}%0A*Unit:* ${siteVisitForm.bhkPreference}%0A*Chauffeur Pickup:* ${siteVisitForm.pickupRequired ? 'YES (Free AC Cab)' : 'NO'}`;
    setTimeout(() => {
      window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
      setIsSiteVisitModalOpen(false);
      setSiteVisitSuccess(false);
    }, 1000);
  };

  // Brochure Download Submit
  const handleBrochureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackAction('brochure_downloaded');
    setBrochureSuccess(true);
    submitLeadRecord({
      name: brochureForm.name,
      phone: brochureForm.phone,
      email: brochureForm.email,
      message: `4K Brochure & Floor Price Sheet requested for ${projectName}`
    });
    const msg = `*VIP Brochure & Cost Sheet Request (${projectName})*%0A%0A*Name:* ${brochureForm.name}%0A*Phone:* ${brochureForm.phone}%0A*Email:* ${brochureForm.email}`;
    setTimeout(() => {
      window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
      setIsBrochureModalOpen(false);
      setBrochureSuccess(false);
    }, 1000);
  };

  // Instant 15-Min VIP Priority Callback Submit
  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackAction('vip_callback_requested');
    submitLeadRecord({
      name: callbackForm.name,
      phone: callbackForm.phone,
      message: `Instant 15-Min Priority Callback for ${callbackForm.unitInterest}`
    });
    setCallbackSubmitted(true);
    const msg = `*VIP Priority Callback Request (${projectName})*%0A%0A*Name:* ${callbackForm.name}%0A*Phone:* ${callbackForm.phone}%0A*Looking For:* ${callbackForm.unitInterest}%0APlease share floor availability & cost sheet.`;
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
    setTimeout(() => setCallbackSubmitted(false), 4500);
  };

  // Save VCF Contact
  const handleVcfDownload = () => {
    trackAction('download_vcf');
    downloadVcfFile(profile);
  };

  // EMI Calculator Calculation
  const emiCalculation = useMemo(() => {
    const loanAmount = Math.round(emiPropertyCost * (1 - emiDownPaymentPct / 100));
    const monthlyEmi = calculateMonthlyEmi(loanAmount, emiInterestRate, emiTenureYears);
    const totalPayment = monthlyEmi * emiTenureYears * 12;
    const totalInterest = Math.max(0, totalPayment - loanAmount);
    return {
      loanAmount,
      monthlyEmi,
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
    <div className="min-h-screen bg-white text-[#111827] font-sans selection:bg-[#F8CD71]/30 selection:text-[#0B0F19] relative overflow-x-clip antialiased">

      {/* ============================================================== */}
      {/* 1. TOP NAVBAR (FlagUp Signature Dark Header + Brand Wordmark)  */}
      {/* ============================================================== */}
      <nav aria-label="Primary navigation" className="bg-[#0B0F19]/95 backdrop-blur-md sticky top-0 z-50 py-3 sm:py-3.5 shadow-lg border-b border-gray-800/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-3">
          
          {/* Logo / Developer Lockup */}
          <a href="#home" className="flex items-center gap-2.5 group select-none min-w-0">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name || projectName}
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover border-2 border-[#F8CD71] shrink-0 shadow-md"
              />
            ) : (
              <div className="h-9 w-9 rounded-full bg-[#F8CD71] text-[#0B0F19] font-black text-sm flex items-center justify-center shrink-0">
                {projectName.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div className="min-w-0 text-left">
              <div className="text-xs sm:text-sm font-black text-white tracking-wider uppercase truncate max-w-[155px] sm:max-w-[220px] group-hover:text-[#F8CD71] transition-colors">
                {projectName}
              </div>
              <div className="hidden xs:flex items-center gap-1.5 text-[10px] font-bold text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="truncate">{displayRera}</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-5 text-xs xl:text-sm font-semibold text-gray-300">
            <a href="#home" className="hover:text-[#F8CD71] transition-colors whitespace-nowrap">Overview</a>
            <a href="#video" className="hover:text-[#F8CD71] transition-colors whitespace-nowrap">Walkthrough</a>
            <a href="#plans" className="hover:text-[#F8CD71] transition-colors whitespace-nowrap">Floor Plans</a>
            <a href="#calculator" className="hover:text-[#F8CD71] transition-colors whitespace-nowrap">EMI &amp; ROI</a>
            <a href="#amenities" className="hover:text-[#F8CD71] transition-colors whitespace-nowrap">Amenities</a>
            <a href="#gallery" className="hover:text-[#F8CD71] transition-colors whitespace-nowrap">Gallery</a>
            <a href="#contact" className="hover:text-[#F8CD71] transition-colors whitespace-nowrap">VIP Desk</a>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 shrink-0">
            {/* View Mode Toggle (If in preview/studio) */}
            {showViewToggle && setViewMode && (
              <div className="hidden xl:flex items-center gap-1 p-0.5 rounded-lg bg-gray-900 border border-gray-800 mr-1">
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
              className="bg-[#F8CD71] text-[#0B0F19] w-10 h-10 rounded-lg flex items-center justify-center hover:bg-yellow-500 transition shadow-lg shrink-0 cursor-pointer"
              title="Call Sales Desk"
            >
              <Phone className="w-4 h-4 text-[#0B0F19] fill-current" />
            </a>

            {/* WhatsApp (Yellow Square) */}
            <button
              type="button"
              onClick={() => handleWhatsAppChat('Navbar_WhatsApp')}
              aria-label="WhatsApp Concierge"
              className="bg-[#F8CD71] text-[#0B0F19] w-10 h-10 rounded-lg flex items-center justify-center hover:bg-yellow-500 transition shadow-lg shrink-0 cursor-pointer"
              title="Instant WhatsApp Floor Plans"
            >
              <MessageCircle className="w-4 h-4 text-[#0B0F19] fill-current" />
            </button>

            {/* Instagram (Yellow Square) */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hidden sm:flex bg-[#F8CD71] text-[#0B0F19] w-10 h-10 rounded-lg items-center justify-center hover:bg-yellow-500 transition shadow-lg shrink-0 cursor-pointer"
            >
              <span className="font-black text-xs">IG</span>
            </a>

            {/* YouTube (Yellow Square) */}
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hidden sm:flex bg-[#F8CD71] text-[#0B0F19] w-10 h-10 rounded-lg items-center justify-center hover:bg-yellow-500 transition shadow-lg shrink-0 cursor-pointer"
            >
              <Play className="w-4 h-4 text-[#0B0F19] fill-current" />
            </a>

            {/* Share Modal Button */}
            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              aria-label="Share"
              className="hidden md:flex bg-[#1C2434] text-white border border-gray-700 w-10 h-10 rounded-lg items-center justify-center hover:bg-gray-800 transition shrink-0 cursor-pointer"
              title="Share Project Link"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Hamburger for Mobile */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden bg-[#1C2434] text-white border border-gray-700 w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-800 transition shrink-0 cursor-pointer"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
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
                className="p-3 rounded-lg bg-gray-900 hover:text-[#F8CD71] hover:bg-gray-800 transition min-h-[44px] flex items-center"
              >
                Overview
              </a>
              <a
                href="#video"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-lg bg-gray-900 hover:text-[#F8CD71] hover:bg-gray-800 transition min-h-[44px] flex items-center"
              >
                4K Walkthrough
              </a>
              <a
                href="#plans"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-lg bg-gray-900 hover:text-[#F8CD71] hover:bg-gray-800 transition min-h-[44px] flex items-center"
              >
                Floor Plans &amp; Price
              </a>
              <a
                href="#calculator"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-lg bg-gray-900 hover:text-[#F8CD71] hover:bg-gray-800 transition min-h-[44px] flex items-center"
              >
                EMI &amp; ROI Calc
              </a>
              <a
                href="#amenities"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-lg bg-gray-900 hover:text-[#F8CD71] hover:bg-gray-800 transition min-h-[44px] flex items-center"
              >
                Amenities
              </a>
              <a
                href="#interior"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-lg bg-gray-900 hover:text-[#F8CD71] hover:bg-gray-800 transition min-h-[44px] flex items-center"
              >
                Show Flat Interiors
              </a>
              <a
                href="#location"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-lg bg-gray-900 hover:text-[#F8CD71] hover:bg-gray-800 transition min-h-[44px] flex items-center"
              >
                Google Location
              </a>
              <a
                href="#gallery"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-lg bg-gray-900 hover:text-[#F8CD71] hover:bg-gray-800 transition min-h-[44px] flex items-center"
              >
                Photo Gallery
              </a>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSiteVisitModalOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-[#F8CD71] text-[#0B0F19] font-black text-sm text-center shadow-md min-h-[44px]"
              >
                Book Free VIP Cab Site Visit
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsBrochureModalOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-gray-800 text-white font-bold text-sm text-center border border-gray-700 min-h-[44px]"
              >
                Download 4K Brochure &amp; Cost Sheet
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ============================================================== */}
      {/* 2. ULTRA-LUXURY HIGH-CONVERTING HERO SHOWCASE (`#home`)        */}
      {/* ============================================================== */}
      <section 
        id="home" 
        className="min-h-[82dvh] sm:min-h-[680px] w-full bg-cover bg-center relative overflow-hidden flex items-center justify-center"
        style={{
          backgroundImage: `url('${galleryImages[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1800&q=85'}')`
        }}
      >
        {/* Multi-layer Cinematic Contrast Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/65 to-[#0B0F19]/50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center py-10 sm:py-16">
          <div className="max-w-5xl mx-auto space-y-5 sm:space-y-6">
            
            {/* RERA + Zero Pre-EMI Urgency Strip */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#0B0F19]/90 backdrop-blur-md border border-[#F8CD71]/45 text-[#F8CD71] text-xs font-extrabold shadow-lg">
                <ShieldCheck className="w-4 h-4 text-[#F8CD71] shrink-0" />
                <span className="uppercase tracking-wider">{displayRera}</span>
                <span className="text-gray-500">•</span>
                <span className="text-emerald-400 font-bold">100% Clear Title</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/50 text-emerald-200 text-xs font-black shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 motion-safe:animate-pulse shrink-0" />
                <span>PAY JUST 10% NOW • ZERO PRE-EMI TILL DEC 2026</span>
              </div>
            </div>

            {/* Aspirational Headline */}
            <div className="space-y-2.5 sm:space-y-3">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-wide uppercase drop-shadow-2xl text-balance leading-[1.08]">
                {projectName}
              </h1>
              <p className="text-sm sm:text-lg md:text-xl font-medium text-gray-100 max-w-3xl mx-auto leading-relaxed drop-shadow-md text-pretty">
                {projectTagline}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-amber-300/95 tracking-wide">
                Presented by <span className="font-extrabold text-white">{profile.name}</span> • 2.5M+ Sq.Ft Delivered • 1,400+ Happy Families
              </p>
            </div>

            {/* High-Impact Luxury Financial & Handover Command Bar (Single Clean Grid, No Wrapping) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-[#0B0F19]/80 backdrop-blur-xl border border-white/15 max-w-4xl mx-auto shadow-2xl text-left">
              <div className="space-y-0.5">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Residences &amp; Suites</span>
                <span className="text-base sm:text-xl font-black text-[#F8CD71] whitespace-nowrap block">
                  From {startingPortfolioStats.startingPriceLabel}
                </span>
                {startingPortfolioStats.minPlotLabel && (
                  <span className="text-[11px] text-emerald-300 font-semibold block">Plots from {startingPortfolioStats.minPlotLabel}</span>
                )}
              </div>

              <div className="space-y-0.5 lg:border-l lg:border-white/15 lg:pl-4">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Easy Bank Ownership</span>
                <span className="text-base sm:text-xl font-black text-white whitespace-nowrap block">
                  {startingPortfolioStats.startingEmi}
                </span>
                <span className="text-[11px] text-gray-400 font-medium block">8.40% Pre-Approved Loan</span>
              </div>

              <div className="space-y-0.5 lg:border-l lg:border-white/15 lg:pl-4">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">RERA Delivery Pledge</span>
                <span className="text-base sm:text-xl font-black text-emerald-300 whitespace-nowrap block">
                  Dec 2026
                </span>
                <span className="text-[11px] text-gray-300 font-medium block">Penalty-Backed Schedule</span>
              </div>

              <div className="space-y-1 lg:border-l lg:border-white/15 lg:pl-4">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  <span>Phase 1 Demand</span>
                  <span>86% Sold</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/15 overflow-hidden">
                  <div className="h-full w-[86%] bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full" />
                </div>
                <span className="text-[11px] text-white font-bold block">Only 14 Corner Units Left</span>
              </div>
            </div>

            {/* Key Project Highlights */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-xs font-semibold text-gray-100">
              <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                📍 {userCity}
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                🏢 G+28 Sky Towers &amp; Villas
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                🌿 82% Open Green Space
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                ⭐ 4.9/5 Verified Buyer Rating
              </span>
            </div>

            {/* Primary High-Conversion Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => setIsSiteVisitModalOpen(true)}
                className="px-6 sm:px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-[#F8CD71] to-yellow-500 text-[#0B0F19] font-black text-sm sm:text-base hover:brightness-110 transition-all shadow-xl hover:shadow-yellow-500/30 transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2 min-h-[48px]"
              >
                <Car className="w-5 h-5" />
                <span>Book Free VIP Cab Site Visit</span>
              </button>

              <button
                type="button"
                onClick={() => handleWhatsAppChat('Hero_Price_Sheet', `Hello ${projectName}, please share your exclusive pre-launch price sheet, live unit availability & floor plans.`)}
                className="px-5 sm:px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-sm sm:text-base transition-all shadow-xl transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2 min-h-[48px]"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Get VIP Price Sheet on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => setIsBrochureModalOpen(true)}
                className="px-5 py-3.5 rounded-xl bg-[#1C2434]/95 hover:bg-[#253045] text-white border border-gray-600 font-bold text-sm transition-all shadow-xl transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2 min-h-[48px]"
              >
                <Download className="w-4 h-4 text-[#F8CD71]" />
                <span>4K Brochure PDF</span>
              </button>

              <button
                type="button"
                onClick={handleVcfDownload}
                className="px-4 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm transition-all cursor-pointer flex items-center gap-1.5 min-h-[48px]"
                title="Save Developer Direct Contact (.vcf)"
              >
                <Download className="w-4 h-4 text-[#F8CD71]" />
                <span className="hidden md:inline">Save Contact</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. SIGNATURE ARCHITECTURAL FILM & RERA CONSTRUCTION TRACKER    */}
      {/* ============================================================== */}
      <section id="video" className="py-12 sm:py-16 bg-[#0B0F19] text-white border-t border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Numbered Architectural Highlights */}
            <div className="lg:col-span-5 min-w-0">
              <span className="text-xs font-black uppercase tracking-widest text-[#F8CD71]">
                Signature Architectural Highlights
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1.5 mb-2 tracking-tight text-balance">
                Designed to Appreciate Every Single Year
              </h2>
              <p className="text-sm text-gray-400 mb-6 text-pretty">
                Step inside model sky suites, rooftop leisure clubs, and verified on-site engineering quality before locking your unit.
              </p>

              {/* Numbered Feature Rows */}
              <div className="space-y-4">
                {videoFeatureList.map((f) => (
                  <div key={f.num} className="flex items-start gap-3.5 sm:gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#F8CD71] text-[#0B0F19] font-black text-sm flex items-center justify-center shrink-0 shadow-md">
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

              {/* Action Buttons */}
              <div className="mt-7 pt-4 border-t border-gray-800/80 flex flex-wrap gap-3">
                <a
                  href="#plans"
                  className="px-5 py-3 rounded-xl bg-[#F8CD71] text-[#0B0F19] font-black text-sm hover:bg-yellow-500 transition shadow-lg inline-flex items-center gap-2 min-h-[44px]"
                >
                  <span>Explore Floor Plans &amp; Prices</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => handleWhatsAppChat('Video_Section_Chat')}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 font-bold text-sm transition flex items-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Ask Architect Team</span>
                </button>
              </div>
            </div>

            {/* Right Column: Clean Luxury Video Showcase Facade + Inline Player */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl aspect-video group">
                {isYouTubeVideo ? (
                  hasStartedShowcaseVideo ? (
                    <iframe
                      src={youTubeEmbedUrl}
                      title={`${projectName} 4K Walkthrough Film`}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setHasStartedShowcaseVideo(true)}
                      aria-label="Watch 4K Architectural Film Walkthrough"
                      className="relative w-full h-full text-left cursor-pointer group/poster focus-visible:outline-2 focus-visible:outline-[#F8CD71]"
                    >
                      <img
                        src={galleryImages[1] || galleryImages[0]}
                        alt={`${projectName} 4K Walkthrough Film`}
                        className="w-full h-full object-cover group-hover/poster:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#F8CD71]/40 text-[#F8CD71] text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5">
                        <Film className="w-3.5 h-3.5" />
                        <span>4K Architectural Film • 02:45</span>
                      </div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F8CD71] text-[#0B0F19] flex items-center justify-center shadow-[0_0_40px_rgba(248,205,113,0.5)] transform group-hover/poster:scale-110 transition-transform">
                          <Play className="w-8 h-8 sm:w-9 sm:h-9 ml-1 fill-current" />
                        </div>
                        <span className="mt-3 text-sm sm:text-base font-extrabold text-white drop-shadow">
                          Play Sky Tower &amp; Club Walkthrough
                        </span>
                        <span className="text-xs text-gray-300 mt-0.5">
                          Plays inline with zero redirect
                        </span>
                      </div>
                    </button>
                  )
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

              {/* Video Caption & Theater Fullscreen */}
              <div className="mt-3 flex items-center justify-between text-xs text-gray-400 px-1">
                <span className="flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-[#F8CD71]" />
                  <span>4K Architectural Film &amp; Clubhouse Tour</span>
                </span>
                <button
                  type="button"
                  onClick={() => setPreviewMedia({
                    url: showcaseVideoSrc,
                    type: 'video',
                    title: `${projectName} — 4K Architectural Walkthrough`
                  })}
                  className="text-[#F8CD71] hover:underline font-bold flex items-center gap-1 cursor-pointer min-h-[32px]"
                >
                  <span>Theater View</span>
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Live RERA Construction Milestone & Handover Progress Strip */}
          <div className="mt-10 sm:mt-12 p-5 sm:p-6 rounded-2xl bg-[#111827] border border-gray-800 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <h3 className="text-sm sm:text-base font-black text-white">
                  Verified On-Site Construction Progress • Zero Delay Track Record
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-bold border border-emerald-500/30 w-fit">
                Overall Readiness: 78% Complete • Handover Dec 2026
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4">
              {[
                { stage: '1. Land & RERA Sanction', status: '100% Complete', pct: '100%', done: true },
                { stage: '2. Triple Basement Podium', status: '100% Complete', pct: '100%', done: true },
                { stage: '3. Superstructure (22/28 Flr)', status: 'Active Pouring', pct: '78%', done: false },
                { stage: '4. Club & Handover Readiness', status: 'Target Dec 2026', pct: '35%', done: false },
              ].map((m) => (
                <div key={m.stage} className="p-3 rounded-xl bg-[#0B0F19] border border-gray-800/90 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-gray-200">{m.stage}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-gray-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${m.done ? 'bg-emerald-400' : 'bg-[#F8CD71]'}`}
                      style={{ width: m.pct }}
                    />
                  </div>
                  <div className={`text-[11px] font-bold flex items-center gap-1 ${m.done ? 'text-emerald-400' : 'text-amber-300'}`}>
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{m.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3.5 WHY DISCERNING BUYERS CHOOSE THIS PROJECT                  */}
      {/* High-Impact Value & ROI Conversion Pillars                      */}
      {/* ============================================================== */}
      <section className="py-12 sm:py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>THE SMART INVESTOR &amp; HOMEOWNER EDGE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B0F19] tracking-tight">
              Why Discerning Buyers Choose <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-pink-600 bg-clip-text text-transparent">{projectName}</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-500 font-medium">
              Designed not just as a residence, but as an appreciating generational asset in {userCity}&apos;s highest-demand growth corridor.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {/* Card 1: Rental Yield */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-amber-400/50 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-black text-xl mb-4 group-hover:scale-110 transition-transform">
                  📈
                </div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-amber-600 mb-1">
                  High ROI Potential
                </div>
                <h3 className="text-lg font-black text-gray-900 leading-tight">
                  8.4% Rental Yield &amp; 2.1x Capital Gain
                </h3>
                <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                  Surrounded by 1.2 Lakh IT executives from Google, Microsoft, and Amazon seeking prime luxury rentals.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center text-xs font-bold text-amber-700">
                <span>Fast Rental Absorption</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: 82% Open Greenery */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-50/50 to-white border border-emerald-100 shadow-sm hover:shadow-xl hover:border-emerald-400/50 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-black text-xl mb-4 group-hover:scale-110 transition-transform">
                  🌿
                </div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 mb-1">
                  Pure Living
                </div>
                <h3 className="text-lg font-black text-gray-900 leading-tight">
                  82% Open Space &amp; 100% Vastu
                </h3>
                <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                  Zero ground vehicle movement, Miyawaki urban forest, 1.5km reflexology trail, and 100% East/West grand doors.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center text-xs font-bold text-emerald-700">
                <span>IGBC Platinum Pre-Certified</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3: 50,000 Sq.Ft Clubhouse */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-50/50 to-white border border-blue-100 shadow-sm hover:shadow-xl hover:border-blue-400/50 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-black text-xl mb-4 group-hover:scale-110 transition-transform">
                  🏰
                </div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-blue-600 mb-1">
                  Resort Lifestyle
                </div>
                <h3 className="text-lg font-black text-gray-900 leading-tight">
                  50,000 Sq.Ft 5-Star Club &amp; Sky Lounge
                </h3>
                <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                  Temperature-controlled pool, bowling alley, badminton &amp; squash courts, wellness spa, and sky terrace.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center text-xs font-bold text-blue-700">
                <span>40+ Resort Amenities</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 4: 100% RERA & Penalty Delivery */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-purple-50/50 to-white border border-purple-100 shadow-sm hover:shadow-xl hover:border-purple-400/50 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-black text-xl mb-4 group-hover:scale-110 transition-transform">
                  🛡️
                </div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-purple-600 mb-1">
                  Guaranteed Safety
                </div>
                <h3 className="text-lg font-black text-gray-900 leading-tight">
                  100% RERA &amp; Penalty-Backed Handover
                </h3>
                <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                  Clear title verified by High Court Senior Advocates, 0% brokerage direct from developer, with strict penalty clauses for any handover delay.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center text-xs font-bold text-purple-700">
                <span>Pre-Approved by Top 5 Banks</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. ADVANCED LAYOUT PLANS SECTION (`#plans`)                    */}
      {/* High-Converting Inventory, 2D/3D Views, & Cost Sheet Estimator */}
      {/* ============================================================== */}
      <section id="plans" className="bg-[#F4F7FE] py-10 sm:py-16 border-b border-gray-200">
        
        {/* Signature Forest Green Header Banner */}
        <div className="mx-auto mb-6 sm:mb-10 w-full max-w-full bg-[#1f3b2f] px-3 py-4 text-center sm:px-5 sm:py-6 shadow-sm">
          <div className="flex flex-col items-center justify-center">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#F8CD71] mb-1">
              RERA Carpet Breakdown • 2D CAD &amp; 3D Furnished Views
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide text-balance">
              Floor Plans &amp; Portfolio Inventory
            </h2>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Unit Configuration Filter Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 pt-1 mb-8 scrollbar-none">
            {planCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActivePlanTab(cat)}
                className={`px-4 sm:px-5 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-black transition-all shrink-0 cursor-pointer ${
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
            {filteredPlans.map((plan) => {
              const currentMode = cardViewModes[plan.id] || '2d';
              const activeImage = currentMode === '3d' && plan.view3dUrl ? plan.view3dUrl : plan.imageUrl;

              return (
                <div
                  key={plan.id}
                  className="floor-image-card group bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Card Bar: Category, Availability & 2D/3D Switcher */}
                    <div className="p-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#1f3b2f] text-white">
                          {plan.category}
                        </span>
                        {(plan.availabilityTag || plan.tag) && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300/60">
                            {plan.availabilityTag || plan.tag}
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
                            className={`px-2.5 py-1 rounded text-[10px] font-extrabold transition cursor-pointer ${
                              currentMode === '2d'
                                ? 'bg-[#1f3b2f] text-white'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            Exterior
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCardViewModes(prev => ({ ...prev, [plan.id]: '3d' }));
                            }}
                            className={`px-2.5 py-1 rounded text-[10px] font-extrabold transition cursor-pointer ${
                              currentMode === '3d'
                                ? 'bg-[#F8CD71] text-[#0B0F19]'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            3D Interior
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Image Container with Zoom Lightbox Trigger */}
                    <button
                      type="button"
                      onClick={() => setPreviewMedia({
                        url: activeImage,
                        type: 'image',
                        title: plan.title,
                        subtitle: `${plan.bhk} • ${plan.carpetArea} • ${plan.facing}`
                      })}
                      aria-label={`Enlarge ${plan.title}`}
                      className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden block cursor-pointer"
                    >
                      <img
                        src={activeImage}
                        alt={plan.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15" />
                      <div className="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                        <Maximize2 className="w-2.5 h-2.5 text-[#F8CD71]" />
                        <span>Zoom</span>
                      </div>
                      <div className="absolute top-2.5 left-2.5 bg-black/70 text-white text-[9px] font-bold px-2 py-0.5 rounded">
                        {currentMode === '3d' ? 'Interior Model Preview' : 'Architectural Elevation'}
                      </div>
                    </button>

                    {/* Unit Details & Specs */}
                    <div className="p-4 sm:p-5 space-y-3">
                      <div>
                        <h3 className="font-extrabold text-base text-[#111827] group-hover:text-[#bd8a2d] transition-colors line-clamp-2 text-balance">
                          {plan.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2 text-pretty">
                          {plan.bhk}
                        </p>
                      </div>

                      {/* Area Specs Table Box */}
                      <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs space-y-1.5">
                        <div className="flex items-center justify-between text-gray-600 gap-2">
                          <span>Extent / Size:</span>
                          <strong className="text-gray-900 font-bold text-right">{plan.superArea}</strong>
                        </div>
                        <div className="flex items-center justify-between text-gray-600 gap-2">
                          <span>{plan.areaMetricLabel || 'RERA Carpet Area'}:</span>
                          <strong className="text-gray-900 font-bold text-right">{plan.carpetArea}</strong>
                        </div>
                        {plan.efficiency && (
                          <div className="flex items-center justify-between text-[11px] text-emerald-700 font-bold gap-2">
                            <span>Usability &amp; Title:</span>
                            <span className="text-right">{plan.efficiency}</span>
                          </div>
                        )}
                        <div className="pt-1.5 border-t border-gray-200/80 flex items-center justify-between text-[11px] text-gray-500 gap-2">
                          <span>Facing:</span>
                          <span className="font-semibold text-gray-800 text-right">{plan.facing}</span>
                        </div>
                      </div>

                      {/* Price & Estimated EMI */}
                      <div className="flex items-baseline justify-between pt-1">
                        <div>
                          <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Launch Price</span>
                          <span className="text-lg font-black text-[#111827]">
                            {plan.price}
                          </span>
                        </div>
                        {plan.estEmi && (
                          <div className="text-right">
                            <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Est. Bank EMI</span>
                            <span className="text-xs sm:text-sm font-black text-emerald-700 font-mono">
                              {plan.estEmi}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="p-4 sm:p-5 pt-0 space-y-2">
                    <button
                      type="button"
                      onClick={() => setSelectedPlanDetails(plan)}
                      className="w-full py-2.5 min-h-[42px] rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs font-extrabold transition flex items-center justify-center gap-1.5 border border-gray-200 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#1f3b2f]" />
                      <span>Cost Sheet &amp; Room Dimensions</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        handleWhatsAppChat(
                          'FloorPlan_Inquiry',
                          `Hello, I am interested in ${plan.title} (${plan.bhk}) priced at ${plan.price}. Please share the complete floor-rise cost sheet, RERA carpet plan, and available units.`
                        );
                      }}
                      className="w-full py-2.5 min-h-[44px] rounded-xl bg-[#F8CD71] hover:bg-yellow-500 text-[#0B0F19] text-xs font-black transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Lock Pre-Launch Price on WhatsApp</span>
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 min-h-[48px] rounded-xl bg-[#1f3b2f] text-white hover:bg-[#162a22] font-black text-xs sm:text-sm shadow-md transition cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#F8CD71]" />
              <span>Download Master Blueprint &amp; Cost Sheet (PDF)</span>
            </button>

            <button
              type="button"
              onClick={() => setIsSiteVisitModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 min-h-[48px] rounded-xl bg-white hover:bg-gray-50 text-[#0B0F19] border border-gray-300 font-black text-xs sm:text-sm shadow-xs transition cursor-pointer"
            >
              <Car className="w-4 h-4 text-amber-600" />
              <span>Book Free VIP Cab Sample Flat Tour</span>
            </button>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 4.2 IN-PAGE INTERACTIVE SMART EMI & WEALTH CALCULATOR           */}
      {/* ============================================================== */}
      <section id="calculator" className="py-12 sm:py-16 bg-[#0B0F19] text-white border-b border-gray-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#F8CD71] text-xs font-bold uppercase tracking-wider mb-2.5">
              <Calculator className="w-3.5 h-3.5 text-[#F8CD71]" />
              <span>TRANSPARENT FINANCIAL PLANNING</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight text-balance">
              Smart EMI &amp; <span className="text-[#F8CD71]">5-Year Wealth ROI Calculator</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-400 text-pretty">
              Select a configuration or slide your budget to see exact bank EMI and projected appreciation in {userCity}.
            </p>

            {/* Quick Unit Preset Pills matching actual inventory */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
              {[
                { label: 'Plots • ₹36.5L', value: 3650000 },
                { label: 'Commercial • ₹95L', value: 9500000 },
                { label: 'Imperia 3 BHK • ₹1.85 Cr', value: 18500000 },
                { label: 'Triplex Villa • ₹2.75 Cr', value: 27500000 },
                { label: 'Waterfront 4 BHK • ₹3.25 Cr', value: 32500000 },
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setEmiPropertyCost(preset.value)}
                  className={`px-3 py-1.5 min-h-[36px] rounded-full text-xs font-bold transition cursor-pointer ${
                    emiPropertyCost === preset.value
                      ? 'bg-[#F8CD71] text-[#0B0F19] shadow-md'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#111827] rounded-3xl p-6 sm:p-10 border border-gray-800 shadow-2xl">
            
            {/* Left 7 Cols: Interactive Sliders */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Slider 1: Property Cost */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-gray-300 mb-2">
                  <span>Selected Property Cost:</span>
                  <span className="text-lg sm:text-xl font-black text-[#F8CD71]">
                    {formatINRCompact(emiPropertyCost)}
                  </span>
                </div>
                <input
                  type="range"
                  aria-label="Property Cost"
                  min={2500000}
                  max={35000000}
                  step={250000}
                  value={emiPropertyCost}
                  onChange={(e) => setEmiPropertyCost(Number(e.target.value))}
                  className="w-full accent-[#F8CD71] cursor-pointer h-2 bg-gray-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-semibold">
                  <span>₹25 Lakhs</span>
                  <span>₹1.85 Cr</span>
                  <span>₹3.50 Cr</span>
                </div>
              </div>

              {/* Slider 2: Down Payment */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-gray-300 mb-2">
                  <span>Down Payment ({emiDownPaymentPct}%):</span>
                  <span className="text-sm sm:text-base font-bold text-white">
                    {formatINRCompact(Math.round((emiPropertyCost * emiDownPaymentPct) / 100))}
                  </span>
                </div>
                <input
                  type="range"
                  aria-label="Down Payment Percentage"
                  min={10}
                  max={50}
                  step={5}
                  value={emiDownPaymentPct}
                  onChange={(e) => setEmiDownPaymentPct(Number(e.target.value))}
                  className="w-full accent-[#F8CD71] cursor-pointer h-2 bg-gray-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-semibold">
                  <span>10% Booking Booking Slot</span>
                  <span>20% Standard</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Slider 3: Loan Tenure & Rate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-300 mb-1.5">
                    <span>Loan Tenure:</span>
                    <span className="text-[#F8CD71] font-bold">{emiTenureYears} Years</span>
                  </div>
                  <input
                    type="range"
                    aria-label="Loan Tenure in Years"
                    min={5}
                    max={30}
                    step={1}
                    value={emiTenureYears}
                    onChange={(e) => setEmiTenureYears(Number(e.target.value))}
                    className="w-full accent-[#F8CD71] cursor-pointer h-2 bg-gray-800 rounded-lg"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-300 mb-1.5">
                    <span>Bank APF Rate:</span>
                    <span className="text-emerald-400 font-bold">{emiInterestRate}% P.A.*</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {[8.4, 8.5, 8.65].map(rate => (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => setEmiInterestRate(rate)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer ${
                          emiInterestRate === rate
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                            : 'bg-[#0B0F19] border-gray-700 text-gray-400 hover:text-white'
                        }`}
                      >
                        {rate}%
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pre-Approved Bank Badges */}
              <div className="pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                  Instant Sanction Desk Available With:
                </span>
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                  {['SBI Home Loans', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Bank of Baroda'].map((bank) => (
                    <span key={bank} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300 text-[11px]">
                      ✓ {bank}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right 5 Cols: Output Breakdown & Direct Booking CTA */}
            <div className="lg:col-span-5 bg-[#0B0F19] rounded-2xl p-6 border border-gray-800 flex flex-col justify-between space-y-5">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-gray-400">
                  Estimated Monthly EMI Commitment
                </span>
                <div className="text-3xl sm:text-4xl font-black text-[#F8CD71] mt-1">
                  ₹ {emiCalculation.monthlyEmi.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-gray-400"> / month*</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  *Calculated at {emiInterestRate}% p.a. over {emiTenureYears} yrs • 0 Pre-EMI till Dec 2026
                </p>
              </div>

              {/* Visual Principal vs Interest Bar */}
              <div>
                <div className="flex justify-between text-[10px] font-bold mb-1">
                  <span className="text-amber-300">Principal ({Math.round((emiCalculation.loanAmount / Math.max(1, emiCalculation.totalPayment)) * 100)}%)</span>
                  <span className="text-blue-300">Interest ({Math.round((emiCalculation.totalInterest / Math.max(1, emiCalculation.totalPayment)) * 100)}%)</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-gray-800 overflow-hidden flex">
                  <div
                    className="h-full bg-[#F8CD71]"
                    style={{ width: `${Math.round((emiCalculation.loanAmount / Math.max(1, emiCalculation.totalPayment)) * 100)}%` }}
                  />
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${Math.round((emiCalculation.totalInterest / Math.max(1, emiCalculation.totalPayment)) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Breakdown Grid */}
              <div className="space-y-2 text-xs border-t border-b border-gray-800 py-3">
                <div className="flex items-center justify-between text-gray-400">
                  <span>Loan Principal Amount:</span>
                  <span className="text-white font-bold">{formatINRCompact(emiCalculation.loanAmount)}</span>
                </div>
                <div className="flex items-center justify-between text-gray-400">
                  <span>Total Interest Payable:</span>
                  <span className="text-white font-bold">{formatINRCompact(emiCalculation.totalInterest)}</span>
                </div>
                <div className="flex items-center justify-between text-gray-400">
                  <span>Est. 5-Yr Value (+42% Corridor Growth):</span>
                  <span className="text-emerald-400 font-black">{formatINRCompact(Math.round(emiPropertyCost * 1.42))}</span>
                </div>
              </div>

              {/* Dynamic Wealth Builder Callout */}
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-200 leading-relaxed">
                <span className="font-bold text-white flex items-center gap-1.5 mb-0.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  5-Year Projected Wealth Upside:
                </span>
                At Financial District&apos;s historical ~7.3% CAGR, a <strong className="text-white">{formatINRCompact(emiPropertyCost)}</strong> asset is projected to grow by <strong className="text-emerald-300">+{formatINRCompact(Math.round(emiPropertyCost * 0.42))}</strong> by year 5.
              </div>

              {/* Direct WhatsApp Pre-Approval Button */}
              <button
                type="button"
                onClick={() => handleWhatsAppChat(
                  `EMI_PreApproval`,
                  `Hello ${projectName}, I checked the Smart EMI calculator for a ${formatINRCompact(emiPropertyCost)} unit (${emiDownPaymentPct}% down, Est. EMI ₹${emiCalculation.monthlyEmi.toLocaleString('en-IN')}/mo). Please share bank pre-approval options & cost sheet.`
                )}
                className="w-full py-3.5 min-h-[48px] rounded-xl bg-gradient-to-r from-amber-400 to-[#F8CD71] text-[#0B0F19] font-black text-sm hover:brightness-110 transition shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Get Bank Pre-Approval on WhatsApp</span>
              </button>
            </div>

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
                            <div className="text-[9px] font-black text-white">SKYLINE TOWERS</div>
                            <div className="text-[7px] text-amber-400">4K Architectural Tour</div>
                          </div>
                        </div>
                        <div className="text-right border-l border-white/10 pl-2">
                          <div className="text-[8px] font-bold text-slate-200">RERA Verified</div>
                          <div className="text-[7px] text-emerald-400 font-bold">0% Brokerage</div>
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
              <Link
                href="/v/re-builders#plans"
                className="mt-5 inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-full bg-[#0B0F19] text-white text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-md group"
              >
                <span>VISIT NOW</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
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
              <Link
                href="/v/re-villas"
                className="mt-5 inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-full bg-[#0B0F19] text-white text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-md group"
              >
                <span>VISIT NOW</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
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
                          <span className="text-emerald-400 font-bold uppercase tracking-wider">AEROPOLIS PLOTS</span>
                          <span className="text-amber-300 font-bold">RERA • PHASE 2</span>
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
              <Link
                href="/v/re-plots"
                className="mt-5 inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-full bg-[#0B0F19] text-white text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-md group"
              >
                <span>VISIT NOW</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
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
              <Link
                href="/v/re-consultants"
                className="mt-5 inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-full bg-[#0B0F19] text-white text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-md group"
              >
                <span>VISIT NOW</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
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
                <div className="px-3 py-3 sm:px-4 sm:py-4 text-center flex-1 flex flex-col justify-center">
                  <h3 className="w-full text-xs sm:text-sm lg:text-base font-extrabold leading-snug text-[#111827] group-hover:text-[#bd8a2d] transition-colors line-clamp-2 text-balance">
                    {amenity.title}
                  </h3>
                  <p className="hidden sm:block text-[11px] text-gray-500 mt-1 line-clamp-2 text-pretty">
                    {amenity.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. INTERIOR WALKTHROUGH SECTION (`#interior`) - Dark Luxury     */}
      {/* ============================================================== */}
      <section id="interior" className="py-12 sm:py-16 bg-[#0B0F19] text-white border-b border-gray-800">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-[#F8CD71] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sample Flat Craftsmanship</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
              Show Flat &amp; Model Residence Interiors
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-400">
              Bookmarked with Italian marble foyers, European kitchens &amp; Kohler spa fittings.
            </p>
          </div>

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
                className="bg-[#111827] rounded-2xl shadow-lg border border-gray-800 overflow-hidden hover:border-amber-400/50 hover:shadow-amber-500/10 transition-all cursor-pointer group"
              >
                {/* 5/3 Aspect Media Container */}
                <div className="relative w-full aspect-[5/3] bg-gray-900 overflow-hidden">
                  <img
                    src={room.mediaUrl}
                    alt={room.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Maximize2 className="w-3 h-3 text-[#F8CD71]" />
                    <span>Inspect Room</span>
                  </div>
                </div>

                {/* Description */}
                <div className="p-4 sm:p-5">
                  <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-[#F8CD71] transition-colors line-clamp-2 text-balance">
                    {room.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1.5 line-clamp-2 leading-relaxed text-pretty">
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

          {/* Direct Cost Sheet & Priority Inventory CTA */}
          <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0B0F19] via-[#111827] to-[#1f3b2f] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="text-center sm:text-left">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#F8CD71] block">
                Phase 1 Inventory Alert
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
                Get Today&apos;s Exact Tower &amp; Floor Availability Sheet
              </h3>
              <p className="text-xs text-gray-300 mt-1">
                See facing orientation, floor rise charges &amp; inaugural zero-EMI payment schedule.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto justify-center">
              <button
                type="button"
                onClick={() => setIsBrochureModalOpen(true)}
                className="px-5 py-3 min-h-[44px] rounded-xl bg-[#F8CD71] text-[#0B0F19] hover:bg-yellow-500 font-black text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Get Cost Sheet</span>
              </button>
              <button
                type="button"
                onClick={() => setIsSiteVisitModalOpen(true)}
                className="px-5 py-3 min-h-[44px] rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer"
              >
                <Car className="w-4 h-4 text-[#F8CD71]" />
                <span>Free Site Cab</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 9.5 VERIFIED HOMEOWNER TESTIMONIALS & BANK TRUST SHIELD        */}
      {/* ============================================================== */}
      <section className="py-14 sm:py-20 bg-[#F4F7FE] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section 1: Verified Buyer Testimonials */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2.5">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>CONFIRMED HOMEOWNER STORIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B0F19] tracking-tight text-balance">
              Trusted by Executives, NRIs &amp; Families
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-500">
              Join 1,400+ verified homeowners and investors across {projectName} developments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {verifiedTestimonials.map((rev) => (
              <div key={rev.id} className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-amber-400" />
                      ))}
                      <span className="text-xs font-bold text-gray-700 ml-1.5">5.0</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                      ✓ Verified Buyer
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic text-pretty">
                    &ldquo;{rev.content}&rdquo;
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-3">
                  {rev.clientAvatar ? (
                    <img
                      src={rev.clientAvatar}
                      alt={rev.clientName}
                      loading="lazy"
                      className="w-10 h-10 rounded-full object-cover border border-amber-200 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-white font-black flex items-center justify-center text-sm shadow-sm shrink-0">
                      {rev.clientName.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900">{rev.clientName}</h4>
                    <p className="text-[11px] text-gray-500 truncate">{rev.clientRole}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section 2: 100% Bank Approvals & Legal Trust Shield */}
          <div className="p-6 sm:p-10 rounded-3xl bg-[#0B0F19] text-white border border-gray-800 shadow-xl mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-5 space-y-3 text-center lg:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Legal &amp; Bank Approved</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white text-balance">
                  Pre-Approved by India&apos;s Leading Financial Institutions
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed text-pretty">
                  Fast-track your home loan with exclusive pre-approved rates (8.40% P.A.) and zero processing fees. 100% clear legal title verified by Senior Advocates.
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: 'State Bank of India', code: 'APF: SBI/2024/8892', rate: '8.40%*' },
                  { name: 'HDFC Bank', code: 'APF: HDFC/2024/7719', rate: '8.45%*' },
                  { name: 'ICICI Bank', code: 'APF: ICICI/2024/9912', rate: '8.45%*' },
                  { name: 'Axis Bank', code: 'APF: AXIS/2024/5521', rate: '8.50%*' },
                  { name: 'Bank of Baroda', code: 'APF: BOB/2024/6620', rate: '8.40%*' },
                  { name: 'Direct Developer', code: '0% Brokerage Guarantee', rate: 'Best Price' },
                ].map((item) => (
                  <div key={item.name} className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition">
                    <span className="text-xs font-black text-white block">{item.name}</span>
                    <span className="text-[10px] text-gray-400 block mt-0.5">{item.code}</span>
                    <span className="mt-2 inline-block px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-black">
                      {item.rate}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Section 3: Direct-From-Developer VIP Concierge & Instant 15-Min Callback Card */}
          <div className="p-6 sm:p-10 rounded-3xl bg-white border border-gray-200 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left 6 Cols: Leadership Trust Profile */}
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-extrabold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Direct Developer Desk • 0% Brokerage</span>
                </div>

                <div className="flex items-center gap-4">
                  {profile.avatarUrl && (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#F8CD71] shadow-md shrink-0"
                    />
                  )}
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-gray-900">
                      {profile.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-[#1f3b2f]">
                      {profile.designation || 'Managing Director'} • {projectName}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Direct developer allotment with spot legal title inspection &amp; RERA price-protection guarantee.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                  <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-sm sm:text-base font-black text-[#0B0F19] block">2.5M+</span>
                    <span className="text-[10px] font-semibold text-gray-500">Sq.Ft Delivered</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-sm sm:text-base font-black text-emerald-700 block">100%</span>
                    <span className="text-[10px] font-semibold text-gray-500">Clear RERA Title</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-sm sm:text-base font-black text-amber-600 block">0%</span>
                    <span className="text-[10px] font-semibold text-gray-500">Broker Commission</span>
                  </div>
                </div>
              </div>

              {/* Right 6 Cols: Instant 15-Min VIP Priority Callback Form */}
              <div className="lg:col-span-6 bg-[#F4F7FE] rounded-2xl p-5 sm:p-6 border border-gray-200">
                <h4 className="text-base sm:text-lg font-black text-gray-900 mb-1 flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-emerald-600" />
                  <span>Request Instant 15-Min Callback &amp; Floor Availability</span>
                </h4>
                <p className="text-xs text-gray-500 mb-4">
                  Get unpublished corner unit availability &amp; pre-launch floor-rise waiver directly on WhatsApp.
                </p>

                {callbackSubmitted ? (
                  <div className="py-6 text-center space-y-2 bg-white rounded-xl border border-emerald-200 p-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <p className="text-sm font-black text-gray-900">Priority Request Sent!</p>
                    <p className="text-xs text-gray-500">Our Senior Director Desk is connecting with you on WhatsApp shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleCallbackSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        aria-label="Full Name"
                        value={callbackForm.name}
                        onChange={(e) => setCallbackForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Your Full Name"
                        className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-white border border-gray-300 text-sm focus:outline-none focus:border-[#1f3b2f]"
                      />
                      <input
                        type="tel"
                        required
                        aria-label="WhatsApp Phone Number"
                        value={callbackForm.phone}
                        onChange={(e) => setCallbackForm(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="WhatsApp / Mobile Number"
                        className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-white border border-gray-300 text-sm focus:outline-none focus:border-[#1f3b2f]"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <select
                        aria-label="Preferred Property Type"
                        value={callbackForm.unitInterest}
                        onChange={(e) => setCallbackForm(prev => ({ ...prev, unitInterest: e.target.value }))}
                        className="flex-1 px-3.5 py-2.5 min-h-[44px] rounded-xl bg-white border border-gray-300 text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none focus:border-[#1f3b2f]"
                      >
                        <option>3 &amp; 4 BHK Sky Residences (Imperia)</option>
                        <option>4 &amp; 5 BHK Triplex Villas (Grandeur)</option>
                        <option>Grade-A Commercial Office Suites</option>
                        <option>HMDA / TS-RERA Open Villa Plots</option>
                        <option>Lakeview 4 BHK Penthouse</option>
                      </select>
                      <button
                        type="submit"
                        className="px-6 py-2.5 min-h-[44px] rounded-xl bg-[#0B0F19] hover:bg-black text-[#F8CD71] font-black text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Unlock Best Quote</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 10. SIGNATURE DARK FOOTER (`#contact`)                          */}
      {/* Safe bottom clearance so footer stays 100% clear of sticky dock */}
      {/* ============================================================== */}
      <footer id="contact" className="bg-[#0B0F19] text-gray-400 pt-16 pb-28 sm:pb-24 border-t border-gray-800">
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
                <li><a href="#plans" className="hover:text-white transition-colors">Floor Plans &amp; Prices</a></li>
                <li><a href="#calculator" className="hover:text-white transition-colors">EMI &amp; ROI Calculator</a></li>
                <li><a href="#amenities" className="hover:text-white transition-colors">Project Amenities</a></li>
                <li><a href="#interior" className="hover:text-white transition-colors">Show Flat Interiors</a></li>
                <li><a href="#location" className="hover:text-white transition-colors">Google Location Map</a></li>
                <li>
                  <button
                    type="button"
                    onClick={() => setIsBrochureModalOpen(true)}
                    className="text-[#F8CD71] hover:underline font-bold cursor-pointer"
                  >
                    Download Brochure PDF
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
      {/* 11. FLOATING CONTACT STACK & AMBIENT AUDIO CONTROLS            */}
      {/* Positioned cleanly so nothing collides on desktop or mobile   */}
      {/* ============================================================== */}
      <div className="fixed top-20 right-3 sm:top-24 sm:right-6 z-30">
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
          className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-xl border backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer ${
            isAudioPlaying 
              ? 'bg-[#0B0F19]/90 text-[#F8CD71] border-[#F8CD71]/60' 
              : 'bg-[#111827]/75 text-gray-300 hover:text-white border-white/15'
          }`}
        >
          {isAudioPlaying ? (
            <>
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F8CD71]/25"></span>
            </>
          ) : (
            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>
      </div>

      <div 
        className="fixed bottom-20 sm:bottom-22 right-3 sm:right-6 z-40 flex flex-col gap-2.5 select-none"
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
      >
        {/* Call Button */}
        <a
          href={`tel:${cleanCallNumber}`}
          aria-label="Call Sales Team"
          className="group relative w-11 h-11 rounded-full bg-[#007bff] hover:bg-blue-600 text-white flex items-center justify-center shadow-2xl transition-all duration-200 hover:-translate-y-0.5 hover:scale-105"
        >
          <Phone className="w-4 h-4 fill-current" />
          <span className="hidden md:group-hover:block absolute right-14 bg-[#212529] text-white text-xs font-semibold px-3 py-1.5 rounded-md whitespace-nowrap shadow-lg">
            Call Sales
          </span>
        </a>

        {/* Email Button */}
        <a
          href={`mailto:${displayEmail}`}
          aria-label="Email Sales Team"
          className="group relative w-11 h-11 rounded-full bg-[#475569] hover:bg-slate-600 text-white flex items-center justify-center shadow-2xl transition-all duration-200 hover:-translate-y-0.5 hover:scale-105"
        >
          <Mail className="w-4 h-4" />
          <span className="hidden md:group-hover:block absolute right-14 bg-[#212529] text-white text-xs font-semibold px-3 py-1.5 rounded-md whitespace-nowrap shadow-lg">
            Email Us
          </span>
        </a>

        {/* WhatsApp Button */}
        <button
          type="button"
          onClick={() => handleWhatsAppChat('Floating_WhatsApp')}
          aria-label="Chat on WhatsApp"
          className="group relative w-11 h-11 rounded-full bg-[#25d366] hover:bg-green-600 text-white flex items-center justify-center shadow-2xl transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-30"></span>
          <span className="hidden md:group-hover:block absolute right-14 bg-[#212529] text-white text-xs font-semibold px-3 py-1.5 rounded-md whitespace-nowrap shadow-lg">
            WhatsApp Concierge
          </span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* 11.5 STICKY LUXURY VIP CONVERSION BAR (BOTTOM DOCK)            */}
      {/* Clear of Share bar (left) and FABs (above); safe-area padded   */}
      {/* ============================================================== */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#0B0F19]/95 backdrop-blur-md border-t border-gray-800/90 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom,0px))] px-3 sm:px-6 shadow-[0_-10px_30px_rgba(0,0,0,0.6)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Left: Consistent Project & Pricing Info */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black text-white truncate">
                {projectName}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold shrink-0">
                <ShieldCheck className="w-3 h-3" />
                RERA Approved
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] sm:text-xs">
              <span className="text-[#F8CD71] font-black whitespace-nowrap">From {startingPortfolioStats.startingPriceLabel}</span>
              <span className="text-gray-400 hidden sm:inline">•</span>
              <span className="text-gray-300 hidden sm:inline whitespace-nowrap">EMI: {startingPortfolioStats.startingEmi}</span>
              <span className="text-emerald-400 font-bold hidden md:inline whitespace-nowrap">• Zero Pre-EMI Till Dec 2026</span>
            </div>
          </div>

          {/* Right: Quick Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`tel:${cleanCallNumber}`}
              className="px-3 sm:px-4 py-2 min-h-[40px] rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">Call Sales</span>
            </a>

            <button
              type="button"
              onClick={() => setIsSiteVisitModalOpen(true)}
              className="px-3.5 sm:px-5 py-2 min-h-[40px] rounded-xl bg-gradient-to-r from-amber-400 via-[#F8CD71] to-yellow-500 text-[#0B0F19] font-black text-xs sm:text-sm hover:brightness-110 shadow-lg shadow-amber-500/20 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Car className="w-4 h-4" />
              <span>Book Free VIP Cab Visit</span>
            </button>
          </div>

        </div>
      </div>

      {/* ============================================================== */}
      {/* 12. FULL-SCREEN LIGHTBOX MEDIA PREVIEW MODAL (Native Dialog)   */}
      {/* ============================================================== */}
      <NativeModalDialog
        isOpen={Boolean(previewMedia)}
        onClose={() => setPreviewMedia(null)}
        labelledBy="preview-media-title"
        maxWidthClass="max-w-5xl"
      >
        {previewMedia && (
          <div className="w-full bg-[#0B0F19] rounded-2xl sm:rounded-3xl border border-gray-800 overflow-hidden shadow-2xl text-white flex flex-col max-h-[88dvh]">
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-gray-800 bg-[#0B0F19] gap-3">
              <div className="min-w-0">
                <h1 id="preview-media-title" className="text-base sm:text-lg font-extrabold text-white truncate">
                  {previewMedia.title}
                </h1>
                {previewMedia.subtitle && (
                  <p className="text-xs text-gray-400 mt-0.5 truncate">
                    {previewMedia.subtitle}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setPreviewMedia(null)}
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 flex items-center justify-center transition cursor-pointer shrink-0"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 bg-black flex items-center justify-center overflow-hidden p-2 sm:p-4">
              {previewMedia.type === 'video' ? (
                previewMedia.url.includes('youtube.com') || previewMedia.url.includes('youtu.be') ? (
                  <iframe
                    src={getYoutubeEmbedUrl(previewMedia.url)}
                    title={previewMedia.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full aspect-video max-h-[68dvh] rounded-xl border-0"
                  />
                ) : previewMedia.url.includes('instagram.com') ? (
                  <iframe
                    src={getInstagramEmbedUrl(previewMedia.url)}
                    title={previewMedia.title}
                    allowFullScreen
                    className="w-full max-w-sm aspect-[9/15] max-h-[68dvh] rounded-xl border-0 bg-black"
                  />
                ) : (
                  <video
                    src={previewMedia.url}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[65dvh] w-auto max-w-full rounded-lg object-contain"
                  />
                )
              ) : (
                <img
                  src={previewMedia.url}
                  alt={previewMedia.title}
                  className="max-h-[65dvh] w-auto max-w-full rounded-lg object-contain"
                />
              )}
            </div>

            <div className="p-3 sm:p-4 bg-[#0B0F19] border-t border-gray-800 flex items-center justify-between gap-3">
              <span className="text-xs text-gray-400 truncate">
                {projectName} Digital Showcase
              </span>
              <button
                type="button"
                onClick={() => handleWhatsAppChat('Lightbox_Inquiry', `Hello, I am interested in: ${previewMedia.title}`)}
                className="px-4 py-2 min-h-[40px] rounded-xl bg-[#F8CD71] text-[#0B0F19] font-black text-xs flex items-center gap-1.5 shadow-md hover:bg-yellow-500 transition cursor-pointer shrink-0"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Inquire on WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </NativeModalDialog>

      {/* ============================================================== */}
      {/* 12B. INTERACTIVE COST SHEET & UNIT SPECIFICATIONS DIALOG       */}
      {/* ============================================================== */}
      <NativeModalDialog
        isOpen={Boolean(selectedPlanDetails)}
        onClose={() => setSelectedPlanDetails(null)}
        labelledBy="unit-specs-modal-title"
        maxWidthClass="max-w-4xl"
      >
        {selectedPlanDetails && (() => {
          const basePrice = selectedPlanDetails.priceNum || 12500000;
          const tierPremium = selectedFloorTier === 'podium' ? 0 : selectedFloorTier === 'sky' ? Math.round(basePrice * 0.03) : Math.round(basePrice * 0.06);
          const clubInfraCharge = selectedPlanDetails.category === 'Plots & Estates' ? 150000 : 450000;
          const outrightDiscount = selectedPaymentPlan === 'outright' ? Math.round(basePrice * 0.05) : 0;
          const allInPrice = basePrice + tierPremium + clubInfraCharge - outrightDiscount;
          const bookingToken = Math.round(allInPrice * 0.1);

          return (
            <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-gray-200 overflow-hidden shadow-2xl text-[#111827] flex flex-col max-h-[88dvh]">
              {/* Modal Header */}
              <div className="p-4 sm:p-6 bg-[#0B0F19] text-white flex items-center justify-between border-b border-gray-800 gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#F8CD71] text-[#0B0F19] flex items-center justify-center font-black text-xs shrink-0">
                    {selectedPlanDetails.category.slice(0, 4).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 id="unit-specs-modal-title" className="text-base sm:text-xl font-extrabold text-white text-balance">
                        {selectedPlanDetails.title}
                      </h1>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1f3b2f] text-[#F8CD71] border border-[#bd8a2d]/40">
                        100% Vastu
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">
                      {selectedPlanDetails.bhk} • {selectedPlanDetails.superArea} ({selectedPlanDetails.carpetArea})
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPlanDetails(null)}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 flex items-center justify-center transition cursor-pointer shrink-0"
                  aria-label="Close specifications"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left: Visual Preview + Room Dimensions */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex items-center justify-between bg-gray-100 p-1.5 rounded-xl">
                      <span className="text-xs font-bold text-gray-600 px-2">
                        {cardViewModes[selectedPlanDetails.id] === '3d' ? 'Interior Preview' : 'Architectural View'}
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
                            Elevation
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
                            3D Interior
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="relative aspect-[16/10] bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden">
                      <img
                        src={cardViewModes[selectedPlanDetails.id] === '3d' && selectedPlanDetails.view3dUrl ? selectedPlanDetails.view3dUrl : selectedPlanDetails.imageUrl}
                        alt={selectedPlanDetails.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {selectedPlanDetails.roomSpecs && selectedPlanDetails.roomSpecs.length > 0 && (
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                          Dimensions &amp; Infrastructure
                        </h4>
                        <div className="rounded-xl border border-gray-200 overflow-hidden divide-y divide-gray-100 text-xs">
                          {selectedPlanDetails.roomSpecs.map((room, rIdx) => (
                            <div key={rIdx} className="px-3.5 py-2 flex items-center justify-between bg-white">
                              <span className="font-medium text-gray-700">{room.name}</span>
                              <span className="font-mono font-bold text-gray-900">{room.size}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Live All-Inclusive Cost Sheet Configurator */}
                  <div className="lg:col-span-6 space-y-4">
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                        1. Select Preference / Floor Tier
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'podium', label: 'Garden / Base', sub: 'Standard' },
                          { id: 'sky', label: 'Mid Sky View', sub: '+3% Rise' },
                          { id: 'penthouse', label: 'Top Panoramic', sub: '+6% Rise' },
                        ].map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setSelectedFloorTier(t.id as any)}
                            className={`p-2 rounded-xl border text-left transition cursor-pointer ${
                              selectedFloorTier === t.id
                                ? 'bg-[#0B0F19] text-white border-[#0B0F19]'
                                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                            }`}
                          >
                            <span className="text-xs font-black block">{t.label}</span>
                            <span className={`text-[10px] font-bold ${selectedFloorTier === t.id ? 'text-[#F8CD71]' : 'text-gray-500'}`}>
                              {t.sub}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                        2. Choose Payment Advantage
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'subvention', label: 'Zero Pre-EMI', sub: 'Pay 10% Now' },
                          { id: 'clp', label: 'Stage Linked', sub: 'As Built' },
                          { id: 'outright', label: 'Down Pay', sub: 'Save 5%' },
                        ].map((pPlan) => (
                          <button
                            key={pPlan.id}
                            type="button"
                            onClick={() => setSelectedPaymentPlan(pPlan.id as any)}
                            className={`p-2 rounded-xl border text-left transition cursor-pointer ${
                              selectedPaymentPlan === pPlan.id
                                ? 'bg-[#1f3b2f] text-white border-[#1f3b2f]'
                                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                            }`}
                          >
                            <span className="text-xs font-black block">{pPlan.label}</span>
                            <span className={`text-[10px] font-bold ${selectedPaymentPlan === pPlan.id ? 'text-[#F8CD71]' : 'text-emerald-700'}`}>
                              {pPlan.sub}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Transparent All-Inclusive Breakdown */}
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-2">
                      <div className="flex justify-between text-gray-600">
                        <span>Basic Unit Consideration:</span>
                        <strong className="text-gray-900">₹ {basePrice.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Preferred View / Floor Rise:</span>
                        <strong className="text-gray-900">+ ₹ {tierPremium.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Clubhouse, EV &amp; Corpus Amenities:</span>
                        <strong className="text-gray-900">+ ₹ {clubInfraCharge.toLocaleString('en-IN')}</strong>
                      </div>
                      {outrightDiscount > 0 && (
                        <div className="flex justify-between text-emerald-700 font-bold">
                          <span>5% Early Bird Outright Savings:</span>
                          <span>- ₹ {outrightDiscount.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-emerald-700 font-bold">
                        <span>Brokerage Commission:</span>
                        <span>₹ 0 (Direct Developer)</span>
                      </div>
                      <div className="pt-2 border-t border-gray-300 flex items-center justify-between">
                        <span className="font-black text-sm text-[#0B0F19]">All-Inclusive Quote*:</span>
                        <span className="font-black text-base text-[#0B0F19]">₹ {allInPrice.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#0B0F19] text-white flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-semibold block">10% Token Allotment</span>
                        <span className="text-base font-black text-[#F8CD71]">
                          {formatINRCompact(bookingToken)}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-gray-400 uppercase font-semibold block">Est. Bank EMI</span>
                        <span className="text-xs font-bold text-emerald-400 font-mono">
                          ₹ {calculateMonthlyEmi(allInPrice * 0.8, 8.4, 20).toLocaleString('en-IN')}/mo*
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Modal Footer CTAs */}
              <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEmiPropertyCost(allInPrice);
                    setSelectedPlanDetails(null);
                    setIsEmiModalOpen(true);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 min-h-[44px] rounded-xl bg-white hover:bg-gray-100 text-[#0B0F19] border border-gray-300 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-emerald-600" />
                  <span>Open Full EMI Simulator</span>
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPlanDetails(null);
                      setIsBrochureModalOpen(true);
                    }}
                    className="flex-1 sm:flex-none px-4 py-2.5 min-h-[44px] rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF Cost Sheet</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleWhatsAppChat(
                        'Unit_CostSheet_Lock',
                        `Hello, I configured a Custom Cost Sheet for ${selectedPlanDetails.title} (Preference: ${selectedFloorTier}, Plan: ${selectedPaymentPlan}). All-Inclusive Estimate: ₹${allInPrice.toLocaleString('en-IN')}. Please lock pre-launch availability and schedule a site visit.`
                      );
                    }}
                    className="flex-1 sm:flex-none px-5 py-2.5 min-h-[44px] rounded-xl bg-[#F8CD71] hover:bg-yellow-500 text-[#0B0F19] font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Lock Cost Sheet on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </NativeModalDialog>

      {/* ============================================================== */}
      {/* 13. SITE VISIT BOOKING MODAL (Native Accessible Dialog)        */}
      {/* ============================================================== */}
      <NativeModalDialog
        isOpen={isSiteVisitModalOpen}
        onClose={() => setIsSiteVisitModalOpen(false)}
        labelledBy="site-visit-modal-title"
        maxWidthClass="max-w-lg"
      >
        <div className="w-full bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden text-[#111827] max-h-[88dvh] flex flex-col">
          <div className="p-6 bg-[#0B0F19] text-white flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-[#F8CD71] uppercase tracking-wider">
                Complimentary AC Chauffeur Pickup
              </span>
              <h1 id="site-visit-modal-title" className="text-xl font-extrabold text-white">
                Schedule VIP Site Inspection
              </h1>
            </div>
            <button
              type="button"
              onClick={() => setIsSiteVisitModalOpen(false)}
              className="w-10 h-10 rounded-full bg-gray-800 text-gray-300 hover:text-white flex items-center justify-center cursor-pointer shrink-0"
              aria-label="Close Site Visit Form"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSiteVisitSubmit} className="p-6 space-y-4 overflow-y-auto">
            {siteVisitSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">VIP Cab Site Visit Confirmed!</h4>
                <p className="text-xs text-gray-500">Connecting with your Senior Relationship Manager on WhatsApp...</p>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    autoFocus
                    value={siteVisitForm.name}
                    onChange={(e) => setSiteVisitForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#0B0F19]"
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
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#0B0F19]"
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
                      className="w-full px-3.5 py-2 min-h-[44px] rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#0B0F19]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Time Window</label>
                    <select
                      value={siteVisitForm.timeSlot}
                      onChange={(e) => setSiteVisitForm(prev => ({ ...prev, timeSlot: e.target.value }))}
                      className="w-full px-3.5 py-2 min-h-[44px] rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#0B0F19]"
                    >
                      <option>10:00 AM - 12:00 PM</option>
                      <option>12:00 PM - 02:00 PM</option>
                      <option>02:00 PM - 04:00 PM</option>
                      <option>04:00 PM - 06:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Preferred Property Configuration</label>
                  <select
                    value={siteVisitForm.bhkPreference}
                    onChange={(e) => setSiteVisitForm(prev => ({ ...prev, bhkPreference: e.target.value }))}
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#0B0F19]"
                  >
                    <option>3 &amp; 4 BHK Sky Residences (Imperia)</option>
                    <option>4 &amp; 5 BHK Triplex Villas (Grandeur)</option>
                    <option>Grade-A Commercial Suites</option>
                    <option>HMDA / TS-RERA Open Plots</option>
                    <option>Waterfront 4 BHK Penthouse</option>
                  </select>
                </div>

                <label className="flex items-center gap-2.5 pt-1 min-h-[44px] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={siteVisitForm.pickupRequired}
                    onChange={(e) => setSiteVisitForm(prev => ({ ...prev, pickupRequired: e.target.checked }))}
                    className="w-4 h-4 rounded text-[#0B0F19] focus:ring-[#F8CD71]"
                  />
                  <span className="text-xs font-semibold text-gray-700">
                    Include complimentary chauffeured AC car pickup &amp; drop
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 min-h-[48px] rounded-xl bg-[#0B0F19] text-[#F8CD71] font-black text-sm hover:bg-black transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Confirm VIP Visit via WhatsApp</span>
                </button>
              </>
            )}
          </form>
        </div>
      </NativeModalDialog>

      {/* ============================================================== */}
      {/* 14. BROCHURE DOWNLOAD MODAL (Native Accessible Dialog)         */}
      {/* ============================================================== */}
      <NativeModalDialog
        isOpen={isBrochureModalOpen}
        onClose={() => setIsBrochureModalOpen(false)}
        labelledBy="brochure-modal-title"
        maxWidthClass="max-w-md"
      >
        <div className="w-full bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden text-[#111827] max-h-[88dvh] flex flex-col">
          <div className="p-6 bg-[#1f3b2f] text-white flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-[#F8CD71] uppercase tracking-wider">
                Instant 4K PDF + Floor Price Sheet
              </span>
              <h1 id="brochure-modal-title" className="text-xl font-extrabold text-white">
                Download Project Brochure
              </h1>
            </div>
            <button
              type="button"
              onClick={() => setIsBrochureModalOpen(false)}
              className="w-10 h-10 rounded-full bg-black/40 text-gray-300 hover:text-white flex items-center justify-center cursor-pointer shrink-0"
              aria-label="Close Brochure Form"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleBrochureSubmit} className="p-6 space-y-4 overflow-y-auto">
            {brochureSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">Brochure Request Dispatched!</h4>
                <p className="text-xs text-gray-500">Opening WhatsApp with direct 4K Brochure &amp; Floor Cost Sheet...</p>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    autoFocus
                    value={brochureForm.name}
                    onChange={(e) => setBrochureForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Anand Sharma"
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#1f3b2f]"
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
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#1f3b2f]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={brochureForm.email}
                    onChange={(e) => setBrochureForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="e.g. anand@gmail.com"
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#1f3b2f]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 min-h-[48px] rounded-xl bg-[#1f3b2f] text-white font-black text-sm hover:bg-[#162a22] transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#F8CD71]" />
                  <span>Send 4K Brochure on WhatsApp</span>
                </button>
              </>
            )}
          </form>
        </div>
      </NativeModalDialog>

      {/* ============================================================== */}
      {/* 15. EMI CALCULATOR MODAL (Native Accessible Dialog)            */}
      {/* ============================================================== */}
      <NativeModalDialog
        isOpen={isEmiModalOpen}
        onClose={() => setIsEmiModalOpen(false)}
        labelledBy="emi-modal-title"
        maxWidthClass="max-w-xl"
      >
        <div className="w-full bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden text-[#111827] max-h-[88dvh] flex flex-col">
          <div className="p-6 bg-[#0B0F19] text-white flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-[#F8CD71] uppercase tracking-wider">
                Financial Planning
              </span>
              <h1 id="emi-modal-title" className="text-xl font-extrabold text-white">
                Home Loan EMI Calculator
              </h1>
            </div>
            <button
              type="button"
              onClick={() => setIsEmiModalOpen(false)}
              className="w-10 h-10 rounded-full bg-gray-800 text-gray-300 hover:text-white flex items-center justify-center cursor-pointer shrink-0"
              aria-label="Close EMI Calculator"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-5 overflow-y-auto">
            <div>
              <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                <span>Property Cost:</span>
                <span className="text-[#0B0F19] font-black">{formatINRCompact(emiPropertyCost)}</span>
              </div>
              <input
                type="range"
                aria-label="Property Cost Slider"
                min={2500000}
                max={35000000}
                step={250000}
                value={emiPropertyCost}
                onChange={(e) => setEmiPropertyCost(Number(e.target.value))}
                className="w-full accent-[#0B0F19] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                <span>Down Payment ({emiDownPaymentPct}%):</span>
                <span className="text-[#0B0F19] font-black">{formatINRCompact(Math.round((emiPropertyCost * emiDownPaymentPct) / 100))}</span>
              </div>
              <input
                type="range"
                aria-label="Down Payment Percentage Slider"
                min={10}
                max={50}
                step={5}
                value={emiDownPaymentPct}
                onChange={(e) => setEmiDownPaymentPct(Number(e.target.value))}
                className="w-full accent-[#0B0F19] cursor-pointer"
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
                  className="w-full px-3 py-2 min-h-[44px] rounded-xl border border-gray-300 text-sm font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Tenure (Years)</label>
                <input
                  type="number"
                  value={emiTenureYears}
                  onChange={(e) => setEmiTenureYears(Number(e.target.value))}
                  className="w-full px-3 py-2 min-h-[44px] rounded-xl border border-gray-300 text-sm font-bold"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0B0F19] text-white flex items-center justify-between gap-3">
              <div>
                <span className="text-xs text-gray-400">Estimated Monthly EMI</span>
                <h4 className="text-2xl font-black text-[#F8CD71]">
                  ₹ {emiCalculation.monthlyEmi.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-gray-300"> / month</span>
                </h4>
              </div>
              <button
                type="button"
                onClick={() => handleWhatsAppChat('Bank_Loan_Assistance', `Hello, I calculated an EMI of ₹${emiCalculation.monthlyEmi.toLocaleString('en-IN')}/month for property cost ${formatINRCompact(emiPropertyCost)}. Please assist with bank loan pre-approval.`)}
                className="px-4 py-2.5 min-h-[44px] rounded-xl bg-[#F8CD71] text-[#0B0F19] font-black text-xs hover:bg-yellow-500 transition shadow-md cursor-pointer shrink-0"
              >
                Apply Bank Loan
              </button>
            </div>
          </div>
        </div>
      </NativeModalDialog>

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
