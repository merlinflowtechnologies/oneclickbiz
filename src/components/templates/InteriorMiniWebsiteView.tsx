'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  ChevronLeft,
  ChevronRight, 
  Calendar, 
  ArrowRight, 
  Share2, 
  Download, 
  QrCode, 
  Menu, 
  X, 
  Eye, 
  Star, 
  Quote, 
  MessageCircle, 
  Ruler, 
  Store,
  Home as HomeIcon,
  Briefcase,
  Send,
  Check,
  CheckCircle,
  ExternalLink,
  ArrowUpRight,
  Camera,
  Video,
  Play
} from 'lucide-react';
import { DigitalProfile, VideoItem } from '@/lib/types';
import ShareCardModal from '@/components/common/ShareCardModal';

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const YoutubeIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);


interface InteriorMiniWebsiteViewProps {
  profile: DigitalProfile;
  trackAction: (act: string) => void;
  getCleanWhatsAppNumber?: (p: DigitalProfile) => string;
  getEmbedUrl: (item: VideoItem | { url?: string; embedUrl?: string }) => string;
  viewMode?: 'mobile' | 'website';
  setViewMode?: (m: 'mobile' | 'website') => void;
  showViewToggle?: boolean;
}

export interface InteriorProject {
  id: string;
  title: string;
  locationTag: string;
  category: 'corporate' | 'residential' | 'retail';
  sectorLabel: string;
  style: string;
  carpetArea: string;
  duration: string;
  budgetRange: string;
  coverImage: string;
  galleryImages: string[];
  description: string;
  keyFeatures: string[];
}

export default function InteriorMiniWebsiteView({
  profile,
  trackAction,
  getCleanWhatsAppNumber,
  getEmbedUrl,
  viewMode = 'website',
  setViewMode,
  showViewToggle = false
}: InteriorMiniWebsiteViewProps) {
  const userCity = useMemo(() => {
    if (!profile.address) return 'Hyderabad';
    const parts = profile.address.split(',');
    return parts[parts.length - 1]?.trim() || 'Hyderabad';
  }, [profile.address]);

  // Modals state
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<InteriorProject | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  // Hero slideshow state
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const heroSlides = useMemo(() => [
    {
      title: 'Novus Cloud Innovation Campus, Hyderabad',
      category: 'Corporate Workspace • 55,000 Sft',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1920&q=85',
      badge: 'Corporate Tech Wing'
    },
    {
      title: 'Villa Celeste Contemporary Luxury Residence, Jubilee Hills',
      category: 'Luxury Residential • 7,200 Sft',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=85',
      badge: 'Signature Residential'
    },
    {
      title: 'The Amber & Clove Restobar, Goa',
      category: 'Experiential Hospitality • 6,800 Sft',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=85',
      badge: 'Boutique Retail & Hospitality'
    }
  ], []);

  // Active filter tab for Portfolio
  const [portfolioFilter, setPortfolioFilter] = useState<'all' | 'corporate' | 'residential' | 'retail'>('all');

  // Active project index in each of the 3 sector columns
  const [activeResidentialIdx, setActiveResidentialIdx] = useState(0);
  const [activeRetailIdx, setActiveRetailIdx] = useState(0);
  const [activeCorporateIdx, setActiveCorporateIdx] = useState(0);

  // Interactive Before/After slider position (0 - 100 percentage)
  // Cost Estimator state
  const [selectedHomeType, setSelectedHomeType] = useState<'1bhk' | '2bhk' | '3bhk' | '4bhk' | 'villa' | 'office'>('3bhk');
  const [selectedFinishTier, setSelectedFinishTier] = useState<'essential' | 'premium' | 'luxury'>('premium');

  // Contact Form state (Aura Luxe style)
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadProjectType, setLeadProjectType] = useState('Residential Interior');
  const [leadMessage, setLeadMessage] = useState('');
  const [leadSuccess, setLeadSuccess] = useState(false);

  // Number Cleaners
  const cleanPhone = useMemo(() => {
    if (getCleanWhatsAppNumber) return getCleanWhatsAppNumber(profile);
    const raw = profile.whatsapp || profile.phone || '';
    return raw.replace(/[^0-9]/g, '') || '919876543210';
  }, [profile, getCleanWhatsAppNumber]);

  const cleanCallNumber = useMemo(() => {
    const raw = profile.phone || '';
    return raw.replace(/[^0-9+]/g, '') || '+919876543210';
  }, [profile.phone]);

  // Social Links
  const instagramLink = useMemo(() => {
    const item = profile.sectionData?.socials?.items?.find(s => s.platform === 'instagram');
    const raw = item?.url || (profile as any).socialLinks?.instagram || (profile as any).instagram || '';
    if (!raw) return 'https://instagram.com';
    if (raw.startsWith('http')) return raw;
    return `https://instagram.com/${raw.replace('@', '').trim()}`;
  }, [profile]);

  const facebookLink = useMemo(() => {
    const item = profile.sectionData?.socials?.items?.find(s => s.platform === 'facebook');
    const raw = item?.url || (profile as any).socialLinks?.facebook || (profile as any).facebook || '';
    if (!raw) return 'https://facebook.com';
    if (raw.startsWith('http')) return raw;
    return `https://facebook.com/${raw.replace('@', '').trim()}`;
  }, [profile]);

  // 1. Residential Sector Projects (Aura Luxe Bespoke Living)
  const residentialSectorProjects: InteriorProject[] = useMemo(() => [
    {
      id: 'proj-res-1',
      title: 'Elysian Heritage Farmhouse',
      locationTag: 'MEDIPALLY CORRIDOR',
      category: 'residential',
      sectorLabel: 'Luxury Farmhouse & Estate',
      style: 'Basalt Stone Heritage',
      carpetArea: '12,000 Sq.Ft Estate',
      duration: '75 Days Handover',
      budgetRange: '₹ 1.2 - 1.6 Crores',
      coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85'
      ],
      description: 'Sprawling private farmhouse estate integrating earthy basalt stone architecture, open-sky courtyards, landscaped pavilions, and infinity pool deck.',
      keyFeatures: [
        'Indoor Open-Sky Courtyard with Basalt Stone Masonry',
        'Temperature Controlled Underground Wine Cellar',
        'Burma Teak Sunken Gazebos & Firepit Lounge',
        'Lush Landscaped Infinity Plunge Pool'
      ]
    },
    {
      id: 'proj-res-2',
      title: 'Villa Celeste',
      locationTag: 'JUBILEE HILLS',
      category: 'residential',
      sectorLabel: 'Luxury Private Residence',
      style: 'Ultra-Luxury Contemporary',
      carpetArea: '7,200 Sq.Ft Gated Villa',
      duration: '65 Days Handover',
      budgetRange: '₹ 80 Lakhs - 1.2 Cr',
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=85'
      ],
      description: 'An elite residence on Road No. 36 in Jubilee Hills crafted with imported Italian travertine, custom temperature-controlled private wine cellars, and seamless indoor-outdoor courtyards.',
      keyFeatures: [
        'Seamless Honed Roman Travertine Flooring',
        'German Modular Island Kitchen with Blum Servo-Drive',
        'Custom Concealed Flush Door Frame Architecture',
        'Private Lounge with Micro-Cement Feature Wall'
      ]
    },
    {
      id: 'proj-res-3',
      title: 'Hallmark Grandeur Residence',
      locationTag: 'GACHIBOWLI HILLS',
      category: 'residential',
      sectorLabel: 'Model Luxury Residence',
      style: 'Contemporary Japandi',
      carpetArea: '5,400 Sq.Ft Model Home',
      duration: '45 Days Handover',
      budgetRange: '₹ 65 - 85 Lakhs',
      coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85'
      ],
      description: 'Sophisticated model residence showcasing Japandi minimalism with custom fluted timber accents, acoustic panelling, and integrated smart lighting.',
      keyFeatures: [
        'Natural White Oak Veneer Panelling',
        'Recessed Architectural Magnetic Track Illumination',
        'Master Suite with Walk-In Acoustic Wardrobe Foyer'
      ]
    },
    {
      id: 'proj-res-4',
      title: 'Bollineni Horizon Sky Club',
      locationTag: 'FINANCIAL DISTRICT',
      category: 'residential',
      sectorLabel: 'Premium Residential Clubhouse',
      style: 'Modern Hospitality Luxury',
      carpetArea: '18,500 Sq.Ft Clubhouse',
      duration: '90 Days Handover',
      budgetRange: '₹ 1.8 - 2.4 Crores',
      coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85'
      ],
      description: 'Multi-level clubhouse interior designed for high-density luxury gated community featuring banquet halls, spa suites, squash courts, and executive rooftop lounge.',
      keyFeatures: [
        'Double-Height Grand Lobby with Kinetic Chandelier',
        'Sound-Treated 40-Seater Dolby Atmos Private Theater',
        'Heated Indoor Poolside Lounge with Travertine Decks'
      ]
    },
    {
      id: 'proj-res-5',
      title: 'Serenity Courtyard Villa',
      locationTag: 'BANJARA HILLS',
      category: 'residential',
      sectorLabel: 'Bespoke Private Villa',
      style: 'Modern Industrial Warmth',
      carpetArea: '6,800 Sq.Ft Triplex Villa',
      duration: '60 Days Handover',
      budgetRange: '₹ 75 - 95 Lakhs',
      coverImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85'
      ],
      description: 'Triplex family villa built around a central skylight atrium, balancing warm teak tones with exposed raw concrete ceilings and bronze metal accents.',
      keyFeatures: [
        'Centred 3-Storey Skylit Light Shaft',
        'Floating Cantilevered Teak Staircase',
        'Automated Solar Shading & Climate Glass Walls'
      ]
    },
    {
      id: 'proj-res-6',
      title: 'The Glasshouse Penthouse Suite',
      locationTag: 'KOKAPET SKYLINE',
      category: 'residential',
      sectorLabel: 'High-Rise Sky Penthouse',
      style: 'Ultra-Modern Minimalist',
      carpetArea: '4,500 Sq.Ft Sky Duplex',
      duration: '50 Days Handover',
      budgetRange: '₹ 90 Lakhs - 1.3 Cr',
      coverImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85'
      ],
      description: 'Entertainment-centric sky lounge duplex with integrated cocktail bar, panoramic 270-degree city views, and micro-cement party terrace.',
      keyFeatures: [
        'Seamless Quartz Terrazzo Flooring',
        'Concealed Dolby Surround Architectural Acoustic Speakers',
        'Custom Onyx Backlit Wet Bar Island'
      ]
    },
    {
      id: 'proj-res-7',
      title: 'Myscape Serenity Residences',
      locationTag: 'HITEC CITY',
      category: 'residential',
      sectorLabel: 'Luxury High-Rise Residence',
      style: 'Warm Organic Modern',
      carpetArea: '3,800 Sq.Ft Luxury Flat',
      duration: '45 Days Handover',
      budgetRange: '₹ 55 - 75 Lakhs',
      coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'
      ],
      description: 'Sophisticated family apartment blending curved lime-wash partitions, European oak chevron floors, and concealed smart storage.',
      keyFeatures: [
        'Curved Plaster Wall Partitions',
        'European Oak Chevron Wood Parquet',
        'Custom Fluted Glass Kitchen Pocket Partitions'
      ]
    }
  ], []);

  // 2. Retail & Hospitality Sector Projects (Aura Luxe Experiential Spaces)
  const retailSectorProjects: InteriorProject[] = useMemo(() => [
    {
      id: 'proj-ret-1',
      title: 'The Amber & Clove Coastal Restobar',
      locationTag: 'GOA PROMENADE',
      category: 'retail',
      sectorLabel: 'Experiential Hospitality & Dining',
      style: 'Tropical Minimalist Restobar',
      carpetArea: '7,500 Sq.Ft Restobar',
      duration: '60 Days Handover',
      budgetRange: '₹ 95 Lakhs - 1.4 Cr',
      coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=85'
      ],
      description: 'Award-winning coastal bar and kitchen featuring curved terracotta brick arches, hand-cast terrazzo bar counters, and open-air botanical garden pergolas.',
      keyFeatures: [
        'Curved Exposed Terracotta Brick Vaulted Ceiling',
        'Hand-Poured Brass-Inlaid Terrazzo Bar Counter',
        'Biophilic Open-Air Pergola Seating'
      ]
    },
    {
      id: 'proj-ret-2',
      title: 'Velvet & Crumb Artisan Patisserie',
      locationTag: 'JUBILEE HILLS',
      category: 'retail',
      sectorLabel: 'Boutique Fine Dining Cafe',
      style: 'European Bistro Chic',
      carpetArea: '3,200 Sq.Ft Patisserie',
      duration: '40 Days Handover',
      budgetRange: '₹ 45 - 65 Lakhs',
      coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85'
      ],
      description: 'Bespoke European patisserie showcasing arched brass glass vitrines, fluted velvet booth seating, and custom terrazzo flooring.',
      keyFeatures: [
        'Precision Refrigerated Brass Glass Display Counters',
        'Fluted Blush Velvet Banquette Seating',
        'Acoustically Dampened Ceiling Plaster'
      ]
    },
    {
      id: 'proj-ret-3',
      title: 'Eden Botanica Lifestyle Lounge',
      locationTag: 'BANJARA HILLS',
      category: 'retail',
      sectorLabel: 'Children Edutainment & Cafe',
      style: 'Interactive Play & Organic Cafe',
      carpetArea: '6,400 Sq.Ft Experience Center',
      duration: '50 Days Handover',
      budgetRange: '₹ 70 - 90 Lakhs',
      coverImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85'
      ],
      description: 'Safe, sustainable, chemical-free interactive play space and cafe built with non-toxic certified birch plywood and soft curved geometry.',
      keyFeatures: [
        'Zero-VOC Certified Natural Water-Based Finishes',
        'FSC Certified Baltic Birch Play Structures',
        'Sound Dampening Felt Wall Paneling'
      ]
    },
    {
      id: 'proj-ret-4',
      title: 'Aura Experiential Bistro & Bar',
      locationTag: 'GACHIBOWLI',
      category: 'retail',
      sectorLabel: 'Coastal Heritage Dining',
      style: 'Earthy Coastal Rustic',
      carpetArea: '5,800 Sq.Ft Fine Dining',
      duration: '55 Days Handover',
      budgetRange: '₹ 80 Lakhs - 1.1 Cr',
      coverImage: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=85'
      ],
      description: 'Authentic coastal culinary restobar combining woven cane lighting installations, mud-rendered acoustic walls, and carved stone accents.',
      keyFeatures: [
        'Handcrafted Cane Chandelier Sculptures',
        'Natural Lime-Wash Earth Pigment Walls',
        'Custom Fluted Black Granite Wet Bar'
      ]
    },
    {
      id: 'proj-ret-5',
      title: 'Zennara Luxury Medispa & Wellness',
      locationTag: 'JUBILEE HILLS',
      category: 'retail',
      sectorLabel: 'Luxury Wellness & Clinical Spa',
      style: 'Serene Minimalist Clinical Luxury',
      carpetArea: '4,200 Sq.Ft Medispa Clinic',
      duration: '45 Days Handover',
      budgetRange: '₹ 60 - 85 Lakhs',
      coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85'
      ],
      description: 'High-end aesthetic dermatology clinic and medispa designed with soothing warm neutral tones, medical-grade hidden ducting, and private consult suites.',
      keyFeatures: [
        'Hospital-Grade Seamless Antibacterial Micro-Cement',
        'Acoustic Consultation Pods with Double Glazing',
        'Indirect Circadian Warm LED Lighting'
      ]
    },
    {
      id: 'proj-ret-6',
      title: 'Celeste Rooftop Social Lounge',
      locationTag: 'FINANCIAL DISTRICT',
      category: 'retail',
      sectorLabel: 'High-End Restobar & Lounge',
      style: 'Moody High-Gloss Architectural Luxury',
      carpetArea: '8,200 Sq.Ft Restobar',
      duration: '65 Days Handover',
      budgetRange: '₹ 1.1 - 1.5 Crores',
      coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85'
      ],
      description: 'Skyline restobar destination featuring custom liquid metal finishes, ambient illuminated bar displays, and indoor-outdoor glass pergolas.',
      keyFeatures: [
        'Gunmetal Liquid Metal Textured Partitions',
        'Backlit Translucent Quartz Bar Front',
        'Weatherproof Motorized Retractable Glass Roof'
      ]
    }
  ], []);

  // 3. Corporate Workplace Sector Projects (Aura Luxe Agile Workspaces)
  const corporateSectorProjects: InteriorProject[] = useMemo(() => [
    {
      id: 'proj-corp-1',
      title: 'Novus Cloud Global HQ',
      locationTag: 'FINANCIAL DISTRICT',
      category: 'corporate',
      sectorLabel: 'Global Tech Enterprise HQ',
      style: 'High-Tech Agile Workplace',
      carpetArea: '85,000 Sq.Ft Campus',
      duration: '90 Days Handover',
      budgetRange: '₹ 5.5 - 7.2 Crores',
      coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=85'
      ],
      description: 'Flagship enterprise facility housing 600+ engineers with activity-based seating, acoustic focus pods, soundproof boardrooms, and gaming breakout lounges.',
      keyFeatures: [
        'LEED Platinum Certified Energy-Saving LED Lighting',
        'STC-45 Acoustically Rated Glass Meeting Rooms',
        'Ergonomic Electric Height-Adjustable Workstations',
        'Smart IoT Room Booking Displays'
      ]
    },
    {
      id: 'proj-corp-2',
      title: 'Apex Capital Fintech Towers',
      locationTag: 'HITEC CITY',
      category: 'corporate',
      sectorLabel: 'Global Financial & AI Center',
      style: 'Corporate Modern Tech',
      carpetArea: '45,000 Sq.Ft Tech Center',
      duration: '75 Days Handover',
      budgetRange: '₹ 3.2 - 4.5 Crores',
      coverImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85'
      ],
      description: 'Collaborative development center designed for hybrid workforce with modular agile desks, town hall arena, and executive briefing center.',
      keyFeatures: [
        '120-Seater Townhall Stepped Arena with Video Wall',
        'Acoustic Felt Ceiling Baffles & Cloud Panels',
        'Integrated Biophilic Green Living Plant Walls'
      ]
    },
    {
      id: 'proj-corp-3',
      title: 'Vanguard Innovation Labs',
      locationTag: 'KNOWLEDGE CITY',
      category: 'corporate',
      sectorLabel: 'Creative Software & Cloud Labs',
      style: 'Industrial Loft Modern',
      carpetArea: '28,000 Sq.Ft Agile Office',
      duration: '50 Days Handover',
      budgetRange: '₹ 1.8 - 2.5 Crores',
      coverImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=85'
      ],
      description: 'Dynamic young startup headquarters celebrating exposed concrete columns, industrial cable trays, writable glass partitions, and beanbag brainstorm alcoves.',
      keyFeatures: [
        'Continuous Magnetic Floor-to-Ceiling Whiteboard Walls',
        'Custom Soundproof Telephone Booths',
        'Cafe-Style Casual Brainstorming Bar Counters'
      ]
    },
    {
      id: 'proj-corp-4',
      title: 'Insignia Enterprise Tech Hub',
      locationTag: 'GACHIBOWLI',
      category: 'corporate',
      sectorLabel: 'Global Innovation Incubator',
      style: 'Futuristic Minimalist',
      carpetArea: '65,000 Sq.Ft Innovation Center',
      duration: '80 Days Handover',
      budgetRange: '₹ 4.2 - 5.8 Crores',
      coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85'
      ],
      description: 'Government incubator and innovation facility accommodating 100+ high-growth startups with interchangeable modular workstation pods.',
      keyFeatures: [
        'Hot-Desking Zones with Digital Lockers',
        'Demo Day Amphitheater with 4K Stage Projection',
        'Dedicated Podcast and Content Creator Studio'
      ]
    },
    {
      id: 'proj-corp-5',
      title: 'Meridian Workspace Campus',
      locationTag: 'MADHAPUR',
      category: 'corporate',
      sectorLabel: 'Enterprise Consulting HQ',
      style: 'Sleek Corporate Minimalist',
      carpetArea: '32,000 Sq.Ft Regional HQ',
      duration: '60 Days Handover',
      budgetRange: '₹ 2.2 - 3.1 Crores',
      coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=85'
      ],
      description: 'Executive headquarters with timber acoustic slat paneling, marble reception desk, private video conference suites, and corporate dining lounge.',
      keyFeatures: [
        'Sculptural Fluted Oak Slat Acoustic Walls',
        'Italian Statuario Marble Reception Foyer',
        'Automated Crestron Boardroom Media Integration'
      ]
    },
    {
      id: 'proj-corp-6',
      title: 'Stratum Global Tech Park',
      locationTag: 'KOKAPET SEZ',
      category: 'corporate',
      sectorLabel: 'Enterprise Operations Campus',
      style: 'Modern Collaborative Workplace',
      carpetArea: '55,000 Sq.Ft Tech Facility',
      duration: '70 Days Handover',
      budgetRange: '₹ 3.8 - 4.9 Crores',
      coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85'
      ],
      description: 'High-density tech operations floor engineered for 24/7 reliability with circadian low-glare lighting and isolated acoustic focus pods.',
      keyFeatures: [
        'Circadian Low-Glare Illumination',
        'Micro-Zone HVAC Smart Controls',
        'Full Acoustic Isolation Meeting Pods'
      ]
    }
  ], []);

  // Combined Portfolio Projects (Aura Luxe Studios exact project names with high quality mock stock photos)
  const portfolioProjects: InteriorProject[] = useMemo(() => [
    ...residentialSectorProjects,
    ...retailSectorProjects,
    ...corporateSectorProjects
  ], [residentialSectorProjects, retailSectorProjects, corporateSectorProjects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (portfolioFilter === 'all') return portfolioProjects;
    return portfolioProjects.filter(p => p.category === portfolioFilter);
  }, [portfolioProjects, portfolioFilter]);

  // Cost Estimator Calculations
  const estimateData = useMemo(() => {
    const sftLookup = {
      '1bhk': { sft: 650, label: '1 BHK Apartment' },
      '2bhk': { sft: 1150, label: '2 BHK Apartment' },
      '3bhk': { sft: 1650, label: '3 BHK Apartment' },
      '4bhk': { sft: 2450, label: '4 BHK Luxury Flat' },
      'villa': { sft: 3800, label: 'Luxury Gated Villa' },
      'office': { sft: 2200, label: 'Corporate Office Suite' }
    };

    const rateLookup = {
      essential: { rate: 1250, label: 'Essential Elegance', warranty: '10-Year Warranty' },
      premium: { rate: 1750, label: 'Premium Signature', warranty: '10-Year Flat Replacement Warranty' },
      luxury: { rate: 2600, label: 'Italian Ultra-Luxury', warranty: 'Lifetime Hardware + 10-Year Comprehensive' }
    };

    const home = sftLookup[selectedHomeType];
    const finish = rateLookup[selectedFinishTier];

    const baseCost = home.sft * finish.rate;
    const minCost = Math.round(baseCost * 0.95);
    const maxCost = Math.round(baseCost * 1.12);

    return {
      homeLabel: home.label,
      sft: home.sft,
      finishLabel: finish.label,
      warranty: finish.warranty,
      totalMinLakhs: (minCost / 100000).toFixed(2),
      totalMaxLakhs: (maxCost / 100000).toFixed(2),
      timelineDays: selectedHomeType === '1bhk' ? '30' : selectedHomeType === '2bhk' ? '38' : selectedHomeType === '3bhk' ? '45' : selectedHomeType === '4bhk' ? '50' : selectedHomeType === 'office' ? '40' : '60',
      woodworkEst: ((baseCost * 0.52) / 100000).toFixed(2),
      ceilingLightingEst: ((baseCost * 0.22) / 100000).toFixed(2),
      paintDecorEst: ((baseCost * 0.26) / 100000).toFixed(2)
    };
  }, [selectedHomeType, selectedFinishTier]);

  const handleSendEstimateWhatsApp = () => {
    trackAction('interior_estimate_whatsapp');
    const msg = `Hello ${profile.name || 'Aura Luxe Studios'}! 👋
I calculated an interior estimate on your Aura Luxe Studios website:
*Property:* ${estimateData.homeLabel} (~${estimateData.sft} Sq.Ft)
*Grade:* ${estimateData.finishLabel}
*Estimated Budget:* ₹ ${estimateData.totalMinLakhs} – ${estimateData.totalMaxLakhs} Lakhs
*Expected Handover:* ~${estimateData.timelineDays} Days
*Modular Woodwork:* ~₹ ${estimateData.woodworkEst} Lakhs
*Ceiling & Lighting:* ~₹ ${estimateData.ceilingLightingEst} Lakhs
*Paint & Finishes:* ~₹ ${estimateData.paintDecorEst} Lakhs

Please connect me with your lead architect to review floor plans and discuss next steps.`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackAction('interior_lead_submit');
    setLeadSuccess(true);
    const msg = `Hello ${profile.name || 'Aura Luxe Studios'}! 👋
I would like to discuss a project inquiry:
*Name:* ${leadName}
*Phone:* ${leadPhone}
*Project Type:* ${leadProjectType}
*Message:* ${leadMessage || 'Turnkey Architecture & Interior Design'}

Please connect with me at your earliest convenience.`;

    setTimeout(() => {
      window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
      setLeadSuccess(false);
      setIsConsultModalOpen(false);
      setLeadName('');
      setLeadPhone('');
      setLeadMessage('');
    }, 1200);
  };

  const handleVcfDownload = () => {
    trackAction('interior_vcard_download');
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Aura Luxe Studios
ORG:Aura Luxe Studios Architecture & Interiors
TITLE:Principal Architect & Founder
TEL;TYPE=CELL:${cleanCallNumber}
EMAIL;TYPE=WORK:${profile.email || 'bdm@auraluxestudio.com'}
ADR;TYPE=WORK:;;Road No. 36, Jubilee Hills, Hyderabad;;;;
URL:${typeof window !== 'undefined' ? window.location.href : 'https://oneclickbiz.in'}
NOTE:Premium Architecture & Interior Design Studio
END:VCARD`;
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `W_Design_Studio_Contact.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white text-[#222222] font-sans selection:bg-[#B7977F]/30 selection:text-black relative overflow-x-hidden">
      
      {/* ─────────────────────────────────────────────────────────────
          1. TOP NOTIFICATION & CREDIBILITY STRIP
      ───────────────────────────────────────────────────────────── */}
      <div className="w-full bg-[#181818] text-stone-300 px-4 sm:px-8 py-2 text-[11px] font-medium border-b border-stone-800">
        <div className="max-w-[1500px] mx-auto w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-[#B7977F] animate-pulse shrink-0" />
            <span className="font-bold uppercase tracking-wider text-[#B7977F] shrink-0">
              IIID REGISTERED STUDIO
            </span>
            <span className="hidden sm:inline text-stone-400 truncate">
              • 10-Year Warranty Guarantee • 45-Day Handover • Jubilee Hills, Hyderabad
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px] shrink-0">
            <button
              onClick={() => setIsQrModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-stone-300 hover:text-[#B7977F] transition cursor-pointer font-bold"
            >
              <QrCode className="w-3.5 h-3.5 text-[#B7977F]" />
              <span>QR Scanner</span>
            </button>
            <button
              onClick={handleVcfDownload}
              className="inline-flex items-center gap-1.5 text-stone-300 hover:text-emerald-400 transition cursor-pointer font-bold"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Save vCard</span>
            </button>
            <a
              href={`https://wa.me/${cleanPhone}?text=Hi%20W%20Design%20Studio%2C%20I%20am%20inquiring%20about%20architectural%20interior%20design%20services.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-stone-300 hover:text-emerald-400 transition cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Desk</span>
            </a>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-stone-300 hover:text-[#B7977F] transition cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#B7977F]" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. CLEAN WHITE HEADER & NAVBAR (Exact Aura Luxe Navbar)
      ───────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-2xs transition-all">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Aura Luxe Studios Brand Logo */}
            <a href="#home" className="flex items-center gap-3 shrink-0 select-none">
              <div className="w-10 h-10 rounded-xl bg-[#111111] border border-[#B7977F]/40 flex items-center justify-center text-white font-serif font-black text-xl shadow-md">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base sm:text-xl tracking-tight text-[#111111] uppercase font-sans">
                  Aura Luxe Studios
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#B7977F] font-semibold -mt-1">
                  Architecture &amp; Interior Design
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links (Aura Luxe Structure) */}
            <nav className="hidden lg:flex items-center gap-6 text-[12px] font-bold text-[#333333] uppercase tracking-wider shrink-0">
              <a href="#services" className="hover:text-[#B7977F] transition">SERVICES</a>
              <a href="#clients" className="hover:text-[#B7977F] transition">CLIENTS</a>
              <a href="#sectors" className="hover:text-[#B7977F] transition">OUR PROJECTS</a>
              <a href="#portfolio" className="hover:text-[#B7977F] transition">PORTFOLIO</a>
              <a href="#social" className="hover:text-[#B7977F] transition">SOCIAL</a>
              <a href="#estimator" className="hover:text-[#B7977F] transition">ESTIMATE</a>
              <a href="#culture" className="hover:text-[#B7977F] transition">GROW WITH US</a>
              <a href="#reviews" className="hover:text-[#B7977F] transition">EXPERIENCES</a>
              <a href="#contact" className="hover:text-[#B7977F] transition">CONTACT US</a>
            </nav>

            {/* Header Right Action: "Enquire Now" */}
            <div className="flex items-center gap-3 shrink-0">
              {showViewToggle && setViewMode && (
                <div className="hidden sm:flex items-center gap-1 p-1 rounded-full bg-stone-100 border border-stone-200">
                  <button
                    type="button"
                    onClick={() => setViewMode('website')}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition cursor-pointer ${
                      viewMode === 'website' ? 'bg-[#111111] text-white' : 'text-stone-600'
                    }`}
                  >
                    💻 Website
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('mobile')}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition cursor-pointer ${
                      viewMode === 'mobile' ? 'bg-[#111111] text-white' : 'text-stone-600'
                    }`}
                  >
                    📱 Card
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => setIsConsultModalOpen(true)}
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#111111] hover:bg-[#B7977F] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
              >
                Enquire Now
              </button>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-stone-100 text-stone-800 hover:text-black transition cursor-pointer"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white px-6 py-5 space-y-3 shadow-xl">
            <nav className="grid grid-cols-2 gap-2 text-xs font-bold text-stone-800 uppercase tracking-wider">
              <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition">Services</a>
              <a href="#clients" onClick={() => setIsMobileMenuOpen(false)} className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition">Clients</a>
              <a href="#sectors" onClick={() => setIsMobileMenuOpen(false)} className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition">Projects</a>
              <a href="#portfolio" onClick={() => setIsMobileMenuOpen(false)} className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition">Portfolio</a>
              <a href="#social" onClick={() => setIsMobileMenuOpen(false)} className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition">Social Media</a>
              <a href="#estimator" onClick={() => setIsMobileMenuOpen(false)} className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition">Cost Estimator</a>
              <a href="#culture" onClick={() => setIsMobileMenuOpen(false)} className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition">Life at Aura</a>
              <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)} className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition">Reviews</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="col-span-2 p-3 rounded-xl bg-[#111111] text-white text-center hover:bg-[#B7977F] transition">Book Free Consultation</a>
            </nav>
          </div>
        )}
      </header>

      {/* ─────────────────────────────────────────────────────────────
          3. HERO SECTION (Exact Aura Luxe Studios Headline & Layout)
      ───────────────────────────────────────────────────────────── */}
      <section id="home" className="pt-14 sm:pt-20 pb-16 bg-white">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 text-center space-y-6">
          
          {/* Eyebrow / Tagline */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-100 text-[#B7977F] text-xs font-extrabold uppercase tracking-widest">
            <Award className="w-3.5 h-3.5 text-[#B7977F]" />
            <span>Award-Winning Architectural Studio</span>
          </div>

          {/* Headline (Aura Luxe Exact Copy) */}
          <h1 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-bold text-[#111111] tracking-tight max-w-5xl mx-auto leading-[1.12]">
            Premium architecture <br />
            &amp; interior design studio.
          </h1>

          {/* Paragraph (Aura Luxe Exact Copy) */}
          <p className="text-sm sm:text-lg text-[#555555] max-w-2xl mx-auto leading-relaxed">
            Aura Luxe works across all aspects of custom projects delivering the best. We are known to build great offices and design beautiful well-crafted homes.
          </p>

          {/* READ MORE CTA */}
          <div className="pt-2">
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-stone-300 text-xs font-extrabold uppercase tracking-wider text-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-300"
            >
              <span>READ MORE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 3 Metric Counters (Aura Luxe Exact Counters: SQFT Designed, Working Hours, Projects Done) */}
          <div className="grid grid-cols-3 gap-2 sm:gap-6 max-w-4xl mx-auto pt-4 sm:pt-8">
            <div className="p-3 sm:p-6 rounded-2xl bg-stone-50 border border-stone-200/80 text-center flex flex-col justify-center">
              <div className="font-serif text-xl sm:text-4xl lg:text-5xl font-bold text-[#111111]">4.2M+</div>
              <div className="text-[9px] sm:text-xs font-extrabold uppercase tracking-wider text-[#B7977F] mt-1 sm:mt-1.5 truncate">SQFT Designed</div>
            </div>
            <div className="p-3 sm:p-6 rounded-2xl bg-stone-50 border border-stone-200/80 text-center flex flex-col justify-center">
              <div className="font-serif text-xl sm:text-4xl lg:text-5xl font-bold text-[#111111]">250K+</div>
              <div className="text-[9px] sm:text-xs font-extrabold uppercase tracking-wider text-[#B7977F] mt-1 sm:mt-1.5 truncate">Working Hours</div>
            </div>
            <div className="p-3 sm:p-6 rounded-2xl bg-stone-50 border border-stone-200/80 text-center flex flex-col justify-center">
              <div className="font-serif text-xl sm:text-4xl lg:text-5xl font-bold text-[#111111]">150+</div>
              <div className="text-[9px] sm:text-xs font-extrabold uppercase tracking-wider text-[#B7977F] mt-1 sm:mt-1.5 truncate">Completed Projects</div>
            </div>
          </div>

          {/* 9 App-Style Action Squircles Dock */}
          <div className="pt-6 pb-2 w-full max-w-full overflow-x-auto no-scrollbar scroll-smooth">
            <div className="flex flex-nowrap items-center justify-start lg:justify-center gap-3 sm:gap-4 w-max lg:w-auto px-4 lg:px-0 lg:mx-auto">
              
              <a
                href={`tel:${cleanCallNumber}`}
                onClick={() => trackAction('call_hero_click')}
                className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#10B981] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-700 group-hover:text-[#B7977F] transition-colors whitespace-nowrap">
                  CALL
                </span>
              </a>

              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi Aura Luxe Studios, I would like to inquire about architecture and interior design services.`)}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackAction('whatsapp_hero_click')}
                className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#25D366] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-700 group-hover:text-[#B7977F] transition-colors whitespace-nowrap">
                  WHATSAPP
                </span>
              </a>

              <a
                href={instagramLink}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackAction('instagram_hero_click')}
                className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-white" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-700 group-hover:text-[#B7977F] transition-colors whitespace-nowrap">
                  INSTAGRAM
                </span>
              </a>

              <a
                href={facebookLink}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackAction('facebook_hero_click')}
                className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#1877F2] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-white" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-700 group-hover:text-[#B7977F] transition-colors whitespace-nowrap">
                  FACEBOOK
                </span>
              </a>

              <a
                href="#portfolio"
                className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#8B5CF6] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <Eye className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-700 group-hover:text-[#B7977F] transition-colors whitespace-nowrap">
                  LOOKBOOK
                </span>
              </a>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Road No. 36, Jubilee Hills, ${userCity}`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#2563EB] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <MapPin className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-700 group-hover:text-[#B7977F] transition-colors whitespace-nowrap">
                  DIRECTIONS
                </span>
              </a>

              <a
                href={`mailto:${profile.email || 'bdm@auraluxestudio.com'}`}
                className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#EF4444] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-700 group-hover:text-[#B7977F] transition-colors whitespace-nowrap">
                  EMAIL
                </span>
              </a>

              <button
                type="button"
                onClick={handleVcfDownload}
                className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#F59E0B] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <Download className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-700 group-hover:text-[#B7977F] transition-colors whitespace-nowrap">
                  SAVE VCARD
                </span>
              </button>

              <button
                type="button"
                onClick={() => setIsQrModalOpen(true)}
                className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#111111] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <QrCode className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-700 group-hover:text-[#B7977F] transition-colors whitespace-nowrap">
                  SCAN QR
                </span>
              </button>

            </div>
          </div>

          {/* Hero Cinematic Feature Image Banner with Interactive Slider */}
          <div className="pt-8">
            <div className="relative aspect-[4/3] sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-stone-200 group">
              <img
                src={heroSlides[activeHeroSlide].image}
                alt={heroSlides[activeHeroSlide].title}
                className="w-full h-full object-cover transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-16 sm:bottom-8 sm:left-8 sm:right-28 text-left text-white space-y-1 sm:space-y-1.5 max-w-xl">
                <span className="px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-[#B7977F] text-black text-[10px] sm:text-xs font-black uppercase tracking-wider inline-block">
                  {heroSlides[activeHeroSlide].badge}
                </span>
                <h3 className="font-serif text-base sm:text-2xl lg:text-4xl font-bold leading-tight drop-shadow-md">
                  {heroSlides[activeHeroSlide].title}
                </h3>
                <p className="text-[11px] sm:text-sm text-stone-300 font-medium tracking-wide">
                  {heroSlides[activeHeroSlide].category}
                </p>
              </div>

              {/* Slider Arrows */}
              <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 flex items-center gap-1.5 sm:gap-2 z-20">
                <button
                  type="button"
                  onClick={() => setActiveHeroSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-black backdrop-blur-md flex items-center justify-center transition active:scale-95 cursor-pointer shadow-lg border border-white/30"
                  aria-label="Previous Project"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveHeroSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-black backdrop-blur-md flex items-center justify-center transition active:scale-95 cursor-pointer shadow-lg border border-white/30"
                  aria-label="Next Project"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Slide Indicator Dots */}
              <div className="absolute top-6 right-6 flex items-center gap-1.5 z-20">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveHeroSlide(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeHeroSlide === idx ? 'w-8 bg-[#B7977F]' : 'w-2 bg-white/50 hover:bg-white'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. FEATURED IN (Exact Aura Luxe Press Quotes)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#F9F9F9] border-y border-stone-200">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8">
          
          <div className="text-center space-y-2 mb-12">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#B7977F]">
              FEATURED IN
            </h2>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-[#111111]">
              Recognized Across National Design Media
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between space-y-6 hover:shadow-lg transition">
              <Quote className="w-8 h-8 text-[#B7977F]" />
              <p className="font-serif text-base sm:text-lg text-[#333333] leading-relaxed italic">
                &ldquo;Aura Luxe Studios crafts India&apos;s most dynamic agile enterprise workplaces and landmark innovation campuses.&rdquo;
              </p>
              <div className="text-xs font-bold uppercase tracking-wider text-[#B7977F]">
                — Business Insider
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between space-y-6 hover:shadow-lg transition">
              <Quote className="w-8 h-8 text-[#B7977F]" />
              <p className="font-serif text-base sm:text-lg text-[#333333] leading-relaxed italic">
                &ldquo;Aura Luxe Studios sets a masterclass in light, basalt stone, and bespoke spatial minimalism across India.&rdquo;
              </p>
              <div className="text-xs font-bold uppercase tracking-wider text-[#B7977F]">
                — Architectural digest
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between space-y-6 hover:shadow-lg transition">
              <Quote className="w-8 h-8 text-[#B7977F]" />
              <p className="font-serif text-base sm:text-lg text-[#333333] leading-relaxed italic">
                &ldquo;Seamless turnkey execution delivering some of India&apos;s most breathtaking residential retreats and hospitality destinations.&rdquo;
              </p>
              <div className="text-xs font-bold uppercase tracking-wider text-[#B7977F]">
                — Curly tales
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4.5 CLIENTS (Exact Aura Luxe Corporate & Institutional Client Roster)
      ───────────────────────────────────────────────────────────── */}
      <section id="clients" className="py-16 sm:py-20 bg-white border-b border-stone-200 scroll-mt-20">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8">
          
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#B7977F]">
              CLIENTS
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#111111]">
              Trusted By Global Innovators &amp; Institutions
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-xl mx-auto">
              Proud to architect and design workspaces for Fortune 500 tech leaders, national startup incubators, and premier hospitality venues.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {[
              { name: 'Novus Cloud', sector: 'AI & Cloud Infrastructure' },
              { name: 'Apex Capital', sector: 'Global Fintech & Asset Mgmt' },
              { name: 'Vanguard Labs', sector: 'Software R&D Campus' },
              { name: 'Insignia Systems', sector: 'Enterprise SaaS' },
              { name: 'Meridian Tech', sector: 'Innovation Incubator' },
              { name: 'Stratum Global', sector: 'Banking & Securities' },
              { name: 'Zenith BioPark', sector: 'Life Sciences Campus' },
              { name: 'Aura Living', sector: 'Luxury Residences' },
              { name: 'Omni Media Hub', sector: 'Digital Creative Studios' },
              { name: 'Horizon Cloud', sector: 'Tier-4 Datacenters' },
              { name: 'Luminex Logistics', sector: 'Supply Chain Operations' },
              { name: 'Kore Workspace', sector: 'Agile Executive Suites' }
            ].map((cl, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/90 hover:border-[#B7977F] hover:bg-white transition-all duration-300 flex flex-col items-center justify-center text-center group shadow-2xs hover:shadow-md cursor-default"
              >
                <span className="font-sans font-black text-sm sm:text-base text-[#111111] tracking-wider uppercase group-hover:text-[#B7977F] transition-colors">
                  {cl.name}
                </span>
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">
                  {cl.sector}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. HERE YOU CAN SEE AND ESTIMATE — WHAT WE DO
      ───────────────────────────────────────────────────────────── */}
      <section id="services" className="py-20 sm:py-28 bg-[#F9F9F9] scroll-mt-20">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-16">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#B7977F]">
              HERE YOU CAN SEE AND ESTIMATE
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#111111] tracking-tight font-sans">
              WHAT WE DO
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* CORPORATE */}
            <div className="p-8 rounded-3xl bg-stone-50 border border-stone-200 flex flex-col justify-between space-y-6 hover:border-[#B7977F] transition group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#111111] text-white flex items-center justify-center">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#111111] group-hover:text-[#B7977F] transition">
                  CORPORATE
                </h3>
                <p className="text-sm text-[#555555] leading-relaxed font-normal">
                  The essence of commercial design is about good planning and precise execution to create interiors that are visually exciting and warmly welcoming.
                </p>
                <ul className="space-y-2 text-xs text-stone-700 pt-2 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#B7977F]" />
                    <span>Agile Workspaces &amp; Tech Incubators</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#B7977F]" />
                    <span>Acoustic Meeting Pods &amp; Boardrooms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#B7977F]" />
                    <span>Workplace Strategy &amp; Change Management</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-stone-200">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#111111] hover:text-[#B7977F] transition uppercase tracking-wider"
                >
                  <span>Enquire Corporate</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* RESIDENTIAL */}
            <div className="p-8 rounded-3xl bg-stone-50 border border-stone-200 flex flex-col justify-between space-y-6 hover:border-[#B7977F] transition group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#111111] text-white flex items-center justify-center">
                  <HomeIcon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#111111] group-hover:text-[#B7977F] transition">
                  RESIDENTIAL
                </h3>
                <p className="text-sm text-[#555555] leading-relaxed font-normal">
                  The space you live in truly reflects who you are. We create residences that effortlessly add luxury and character while beautifully enhancing the details.
                </p>
                <ul className="space-y-2 text-xs text-stone-700 pt-2 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#B7977F]" />
                    <span>Turnkey Luxury Villas &amp; Penthouses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#B7977F]" />
                    <span>German Modular Kitchens &amp; Wardrobe Suites</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#B7977F]" />
                    <span>10-Year Replacement Warranty Guarantee</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-stone-200">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#111111] hover:text-[#B7977F] transition uppercase tracking-wider"
                >
                  <span>Enquire Residential</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* RETAIL */}
            <div className="p-8 rounded-3xl bg-stone-50 border border-stone-200 flex flex-col justify-between space-y-6 hover:border-[#B7977F] transition group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#111111] text-white flex items-center justify-center">
                  <Store className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#111111] group-hover:text-[#B7977F] transition">
                  RETAIL
                </h3>
                <p className="text-sm text-[#555555] leading-relaxed font-normal">
                  Combining a range of creative and technical skills, we deliver visually pleasing interiors that blend with the brand’s identity.
                </p>
                <ul className="space-y-2 text-xs text-stone-700 pt-2 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#B7977F]" />
                    <span>Boutique Dining, Cafes &amp; Microbreweries</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#B7977F]" />
                    <span>Aesthetic Medispas &amp; Wellness Venues</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#B7977F]" />
                    <span>Airport Lounges &amp; Flagship Brand Stores</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-stone-200">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#111111] hover:text-[#B7977F] transition uppercase tracking-wider"
                >
                  <span>Enquire Retail</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. CHECK OUT OUR PORTFOLIO (Exact Aura Luxe Project Grid & Names)
      ───────────────────────────────────────────────────────────── */}
      <section id="portfolio" className="py-20 sm:py-28 bg-[#F9F9F9] border-y border-stone-200 scroll-mt-20">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8">
          
          <div className="text-center space-y-2 mb-12">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#B7977F]">
              CHECK OUT OUR
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#111111] tracking-tight font-sans">
              PORTFOLIO
            </h2>
          </div>

          {/* Minimal Filter Tabs */}
          <div className="flex justify-center flex-wrap gap-2.5 mb-12">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'corporate', label: 'Corporate' },
              { id: 'residential', label: 'Residential' },
              { id: 'retail', label: 'Retail & Hospitality' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setPortfolioFilter(tab.id as any)}
                className={`px-5 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                  portfolioFilter === tab.id
                    ? 'bg-[#111111] text-white shadow-sm'
                    : 'bg-white text-stone-600 hover:text-black border border-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Projects Grid (Aura Luxe Exact Showcase Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="group rounded-3xl bg-white border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-stone-100">
                  <img
                    src={proj.coverImage}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#111111] text-[11px] font-extrabold uppercase tracking-wider shadow-xs">
                      {proj.locationTag}
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-4">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveProject(proj);
                        setActiveGalleryIndex(0);
                        setIsProjectModalOpen(true);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-md hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-md"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#B7977F]" />
                      <span>{proj.galleryImages.length} Photos</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#B7977F]">
                      {proj.sectorLabel}
                    </span>
                    <h3 className="font-bold text-lg sm:text-xl text-[#111111] group-hover:text-[#B7977F] transition-colors mt-0.5">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 mt-1.5 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-stone-400 font-bold uppercase">Handover</div>
                      <div className="text-xs font-bold text-stone-800">{proj.duration}</div>
                    </div>
                    <a
                      href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi Aura Luxe Studios, I love the project "${proj.title}". Please share details and portfolio.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-full bg-stone-100 hover:bg-[#111111] hover:text-white text-[#111111] font-bold text-xs uppercase tracking-wider transition"
                    >
                      Inquire
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. TRANSFORMING SPACES ACROSS SECTORS (Aura Luxe Copy & Projects List)
      ───────────────────────────────────────────────────────────── */}
      <section id="sectors" className="py-20 sm:py-28 bg-white scroll-mt-20">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-[#111111] tracking-tight font-sans">
              Transforming Spaces Across Sectors
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              From luxury residences to innovative corporate and retail environments, each project reflects our commitment to timeless design and exceptional execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1: AGILE WORKING - RESIDENTIAL */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#FAF9F7] border border-stone-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#B7977F]">
                    AGILE WORKING
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-200/60 text-stone-600">
                    {residentialSectorProjects.length} Projects
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-5 font-sans">
                  RESIDENTIAL
                </h3>

                {/* Live Preview Photo Window */}
                {residentialSectorProjects[activeResidentialIdx] && (
                  <div
                    onClick={() => {
                      setActiveProject(residentialSectorProjects[activeResidentialIdx]);
                      setActiveGalleryIndex(0);
                      setIsProjectModalOpen(true);
                    }}
                    className="group/prev relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-md mb-5 cursor-pointer border border-stone-200/80 bg-stone-900"
                  >
                    <img
                      src={residentialSectorProjects[activeResidentialIdx].coverImage}
                      alt={residentialSectorProjects[activeResidentialIdx].title}
                      className="w-full h-full object-cover group-hover/prev:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white uppercase tracking-wider">
                        {residentialSectorProjects[activeResidentialIdx].locationTag}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-stone-900 shadow">
                        {residentialSectorProjects[activeResidentialIdx].carpetArea}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-[11px] text-[#B7977F] font-semibold truncate">
                        {residentialSectorProjects[activeResidentialIdx].sectorLabel}
                      </p>
                      <h4 className="text-sm sm:text-base font-bold truncate drop-shadow">
                        {residentialSectorProjects[activeResidentialIdx].title}
                      </h4>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProject(residentialSectorProjects[activeResidentialIdx]);
                          setActiveGalleryIndex(0);
                          setIsProjectModalOpen(true);
                        }}
                        className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 text-stone-900 text-xs font-bold transition active:scale-95 shadow cursor-pointer"
                      >
                        <Camera className="w-3.5 h-3.5 text-[#B7977F]" />
                        <span>View {residentialSectorProjects[activeResidentialIdx].galleryImages.length} Photos ↗</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Project Navigation Links with Photo Thumbnails */}
                <div className="space-y-2">
                  {residentialSectorProjects.map((proj, idx) => {
                    const isActive = activeResidentialIdx === idx;
                    return (
                      <div
                        key={proj.id}
                        onMouseEnter={() => setActiveResidentialIdx(idx)}
                        onClick={() => {
                          setActiveResidentialIdx(idx);
                          setActiveProject(proj);
                          setActiveGalleryIndex(0);
                          setIsProjectModalOpen(true);
                        }}
                        className={`group/row flex items-center gap-3 p-2.5 rounded-2xl transition-all duration-200 cursor-pointer border ${
                          isActive
                            ? 'bg-white shadow-md border-[#B7977F] ring-1 ring-[#B7977F]/40 scale-[1.01]'
                            : 'bg-white/60 hover:bg-white hover:shadow-sm border-stone-200/60 hover:border-stone-300'
                        }`}
                      >
                        {/* Thumbnail */}
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 border border-stone-200 shadow-sm bg-stone-100">
                          <img
                            src={proj.coverImage}
                            alt={proj.title}
                            className="w-full h-full object-cover group-hover/row:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                          {isActive && (
                            <div className="absolute inset-0 bg-[#B7977F]/20 ring-1 ring-inset ring-[#B7977F]" />
                          )}
                        </div>

                        {/* Title & Specs */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-extrabold text-[#B7977F] uppercase tracking-wider">
                              {proj.locationTag}
                            </span>
                            <span className="text-[10px] text-stone-400">•</span>
                            <span className="text-[10px] text-stone-500 font-medium truncate">
                              {proj.carpetArea}
                            </span>
                          </div>
                          <h4 className={`text-xs sm:text-sm font-bold truncate transition-colors ${
                            isActive ? 'text-[#B7977F]' : 'text-stone-900 group-hover/row:text-[#B7977F]'
                          }`}>
                            {proj.title}
                          </h4>
                          <p className="text-[10px] text-stone-500 truncate">
                            {proj.sectorLabel}
                          </p>
                        </div>

                        {/* Arrow Link Action */}
                        <div className="shrink-0 pr-1">
                          <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs transition duration-200 ${
                            isActive
                              ? 'bg-[#111111] text-white shadow'
                              : 'bg-stone-100 text-stone-500 group-hover/row:bg-[#B7977F] group-hover/row:text-white'
                          }`}>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Column 2: CHANGE MANAGEMENT - RETAIL */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#FAF9F7] border border-stone-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#B7977F]">
                    CHANGE MANAGEMENT
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-200/60 text-stone-600">
                    {retailSectorProjects.length} Projects
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-5 font-sans">
                  RETAIL
                </h3>

                {/* Live Preview Photo Window */}
                {retailSectorProjects[activeRetailIdx] && (
                  <div
                    onClick={() => {
                      setActiveProject(retailSectorProjects[activeRetailIdx]);
                      setActiveGalleryIndex(0);
                      setIsProjectModalOpen(true);
                    }}
                    className="group/prev relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-md mb-5 cursor-pointer border border-stone-200/80 bg-stone-900"
                  >
                    <img
                      src={retailSectorProjects[activeRetailIdx].coverImage}
                      alt={retailSectorProjects[activeRetailIdx].title}
                      className="w-full h-full object-cover group-hover/prev:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white uppercase tracking-wider">
                        {retailSectorProjects[activeRetailIdx].locationTag}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-stone-900 shadow">
                        {retailSectorProjects[activeRetailIdx].carpetArea}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-[11px] text-[#B7977F] font-semibold truncate">
                        {retailSectorProjects[activeRetailIdx].sectorLabel}
                      </p>
                      <h4 className="text-sm sm:text-base font-bold truncate drop-shadow">
                        {retailSectorProjects[activeRetailIdx].title}
                      </h4>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProject(retailSectorProjects[activeRetailIdx]);
                          setActiveGalleryIndex(0);
                          setIsProjectModalOpen(true);
                        }}
                        className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 text-stone-900 text-xs font-bold transition active:scale-95 shadow cursor-pointer"
                      >
                        <Camera className="w-3.5 h-3.5 text-[#B7977F]" />
                        <span>View {retailSectorProjects[activeRetailIdx].galleryImages.length} Photos ↗</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Project Navigation Links with Photo Thumbnails */}
                <div className="space-y-2">
                  {retailSectorProjects.map((proj, idx) => {
                    const isActive = activeRetailIdx === idx;
                    return (
                      <div
                        key={proj.id}
                        onMouseEnter={() => setActiveRetailIdx(idx)}
                        onClick={() => {
                          setActiveRetailIdx(idx);
                          setActiveProject(proj);
                          setActiveGalleryIndex(0);
                          setIsProjectModalOpen(true);
                        }}
                        className={`group/row flex items-center gap-3 p-2.5 rounded-2xl transition-all duration-200 cursor-pointer border ${
                          isActive
                            ? 'bg-white shadow-md border-[#B7977F] ring-1 ring-[#B7977F]/40 scale-[1.01]'
                            : 'bg-white/60 hover:bg-white hover:shadow-sm border-stone-200/60 hover:border-stone-300'
                        }`}
                      >
                        {/* Thumbnail */}
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 border border-stone-200 shadow-sm bg-stone-100">
                          <img
                            src={proj.coverImage}
                            alt={proj.title}
                            className="w-full h-full object-cover group-hover/row:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                          {isActive && (
                            <div className="absolute inset-0 bg-[#B7977F]/20 ring-1 ring-inset ring-[#B7977F]" />
                          )}
                        </div>

                        {/* Title & Specs */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-extrabold text-[#B7977F] uppercase tracking-wider">
                              {proj.locationTag}
                            </span>
                            <span className="text-[10px] text-stone-400">•</span>
                            <span className="text-[10px] text-stone-500 font-medium truncate">
                              {proj.carpetArea}
                            </span>
                          </div>
                          <h4 className={`text-xs sm:text-sm font-bold truncate transition-colors ${
                            isActive ? 'text-[#B7977F]' : 'text-stone-900 group-hover/row:text-[#B7977F]'
                          }`}>
                            {proj.title}
                          </h4>
                          <p className="text-[10px] text-stone-500 truncate">
                            {proj.sectorLabel}
                          </p>
                        </div>

                        {/* Arrow Link Action */}
                        <div className="shrink-0 pr-1">
                          <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs transition duration-200 ${
                            isActive
                              ? 'bg-[#111111] text-white shadow'
                              : 'bg-stone-100 text-stone-500 group-hover/row:bg-[#B7977F] group-hover/row:text-white'
                          }`}>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Column 3: Workplace Strategy - CORPORATE */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#FAF9F7] border border-stone-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#B7977F]">
                    Workplace Strategy
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-200/60 text-stone-600">
                    {corporateSectorProjects.length} Projects
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-5 font-sans">
                  CORPORATE
                </h3>

                {/* Live Preview Photo Window */}
                {corporateSectorProjects[activeCorporateIdx] && (
                  <div
                    onClick={() => {
                      setActiveProject(corporateSectorProjects[activeCorporateIdx]);
                      setActiveGalleryIndex(0);
                      setIsProjectModalOpen(true);
                    }}
                    className="group/prev relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-md mb-5 cursor-pointer border border-stone-200/80 bg-stone-900"
                  >
                    <img
                      src={corporateSectorProjects[activeCorporateIdx].coverImage}
                      alt={corporateSectorProjects[activeCorporateIdx].title}
                      className="w-full h-full object-cover group-hover/prev:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white uppercase tracking-wider">
                        {corporateSectorProjects[activeCorporateIdx].locationTag}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-stone-900 shadow">
                        {corporateSectorProjects[activeCorporateIdx].carpetArea}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-[11px] text-[#B7977F] font-semibold truncate">
                        {corporateSectorProjects[activeCorporateIdx].sectorLabel}
                      </p>
                      <h4 className="text-sm sm:text-base font-bold truncate drop-shadow">
                        {corporateSectorProjects[activeCorporateIdx].title}
                      </h4>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProject(corporateSectorProjects[activeCorporateIdx]);
                          setActiveGalleryIndex(0);
                          setIsProjectModalOpen(true);
                        }}
                        className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 text-stone-900 text-xs font-bold transition active:scale-95 shadow cursor-pointer"
                      >
                        <Camera className="w-3.5 h-3.5 text-[#B7977F]" />
                        <span>View {corporateSectorProjects[activeCorporateIdx].galleryImages.length} Photos ↗</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Project Navigation Links with Photo Thumbnails */}
                <div className="space-y-2">
                  {corporateSectorProjects.map((proj, idx) => {
                    const isActive = activeCorporateIdx === idx;
                    return (
                      <div
                        key={proj.id}
                        onMouseEnter={() => setActiveCorporateIdx(idx)}
                        onClick={() => {
                          setActiveCorporateIdx(idx);
                          setActiveProject(proj);
                          setActiveGalleryIndex(0);
                          setIsProjectModalOpen(true);
                        }}
                        className={`group/row flex items-center gap-3 p-2.5 rounded-2xl transition-all duration-200 cursor-pointer border ${
                          isActive
                            ? 'bg-white shadow-md border-[#B7977F] ring-1 ring-[#B7977F]/40 scale-[1.01]'
                            : 'bg-white/60 hover:bg-white hover:shadow-sm border-stone-200/60 hover:border-stone-300'
                        }`}
                      >
                        {/* Thumbnail */}
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 border border-stone-200 shadow-sm bg-stone-100">
                          <img
                            src={proj.coverImage}
                            alt={proj.title}
                            className="w-full h-full object-cover group-hover/row:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                          {isActive && (
                            <div className="absolute inset-0 bg-[#B7977F]/20 ring-1 ring-inset ring-[#B7977F]" />
                          )}
                        </div>

                        {/* Title & Specs */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-extrabold text-[#B7977F] uppercase tracking-wider">
                              {proj.locationTag}
                            </span>
                            <span className="text-[10px] text-stone-400">•</span>
                            <span className="text-[10px] text-stone-500 font-medium truncate">
                              {proj.carpetArea}
                            </span>
                          </div>
                          <h4 className={`text-xs sm:text-sm font-bold truncate transition-colors ${
                            isActive ? 'text-[#B7977F]' : 'text-stone-900 group-hover/row:text-[#B7977F]'
                          }`}>
                            {proj.title}
                          </h4>
                          <p className="text-[10px] text-stone-500 truncate">
                            {proj.sectorLabel}
                          </p>
                        </div>

                        {/* Arrow Link Action */}
                        <div className="shrink-0 pr-1">
                          <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs transition duration-200 ${
                            isActive
                              ? 'bg-[#111111] text-white shadow'
                              : 'bg-stone-100 text-stone-500 group-hover/row:bg-[#B7977F] group-hover/row:text-white'
                          }`}>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. SOCIAL MEDIA SHOWCASE (Instagram & YouTube Channel Feeds)
      ───────────────────────────────────────────────────────────── */}
      <section id="social" className="py-16 sm:py-24 bg-[#F9F9F9] border-y border-stone-200 scroll-mt-20">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B7977F]/15 border border-[#B7977F]/30 text-[#8c6b50] text-[11px] font-extrabold uppercase tracking-widest">
              <span>COMMUNITY &amp; SOCIAL SHOWCASE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#111111] tracking-tight font-sans">
              Watch Our Stories on Instagram &amp; YouTube
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
              Go behind the scenes of our luxury architectural site handovers, design breakdowns, material curation masterclasses, and client walkthroughs.
            </p>

            {/* Social CTA Action Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={instagramLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-bold text-xs shadow-md hover:opacity-95 transition active:scale-95"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Follow @auraluxestudio</span>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px]">48.5K</span>
              </a>

              <a
                href="https://youtube.com/@auraluxestudio"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF0000] text-white font-bold text-xs shadow-md hover:bg-red-700 transition active:scale-95"
              >
                <YoutubeIcon className="w-4 h-4" />
                <span>Subscribe on YouTube</span>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px]">24.2K</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: YouTube Video Tours (7 Columns) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                    <YoutubeIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-stone-900">
                      YouTube Architectural Video Tours
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      In-depth 4K property walkthroughs &amp; site fit-out documentaries
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-stone-400">
                  3 Featured Episodes
                </span>
              </div>

              {/* Featured Main Video Embed Player */}
              <div className="rounded-3xl overflow-hidden bg-black shadow-xl border border-stone-200">
                <div className="relative aspect-video w-full bg-stone-950">
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0"
                    title="Villa Celeste: 7,200 Sq.Ft Ultra-Luxury Residence Walkthrough"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <div className="p-4 sm:p-5 bg-white space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 text-[10px] font-extrabold uppercase">
                      4K Tour
                    </span>
                    <span className="text-[11px] text-stone-500 font-medium">8:45 Mins • 28.4K Views</span>
                    <span className="text-stone-300">•</span>
                    <span className="text-[11px] text-[#B7977F] font-bold">Jubilee Hills, Hyderabad</span>
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-stone-900">
                    Inside Villa Celeste: 7,200 Sq.Ft Ultra-Luxury Residence Walkthrough
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                    Complete architectural walkthrough of Italian travertine flooring, double-height living room foyer, custom German modular kitchen, and concealed flush door framing.
                  </p>
                </div>
              </div>

              {/* Secondary Video Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between space-y-3 hover:shadow-md transition">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-900">
                    <img
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
                      alt="Novus Cloud HQ Video Tour"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-lg">
                        <Play className="w-4 h-4 fill-stone-900 ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono">
                      12:10
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#B7977F] uppercase">Commercial Fit-Out</span>
                    <h5 className="font-bold text-xs sm:text-sm text-stone-900 line-clamp-2">
                      Novus Cloud HQ: Converting 25,000 Sq.Ft Bare Shell to Agile Workspace
                    </h5>
                    <p className="text-[11px] text-stone-500">
                      19.2K views • 2 weeks ago
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between space-y-3 hover:shadow-md transition">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-900">
                    <img
                      src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                      alt="Amber & Clove Restobar Architecture"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-lg">
                        <Play className="w-4 h-4 fill-stone-900 ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono">
                      06:40
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#B7977F] uppercase">Hospitality Masterclass</span>
                    <h5 className="font-bold text-xs sm:text-sm text-stone-900 line-clamp-2">
                      Amber &amp; Clove Restobar: Coastal Minimalist Hospitality Architecture
                    </h5>
                    <p className="text-[11px] text-stone-500">
                      34.1K views • 1 month ago
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Instagram Reels & Site Stories (5 Columns) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center">
                    <InstagramIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-stone-900">
                      Instagram Reels &amp; Stories
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      Daily on-site transformation clips &amp; finish details
                    </p>
                  </div>
                </div>
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-[#B7977F] hover:underline"
                >
                  View All Reels ↗
                </a>
              </div>

              {/* 4 Vertical Reels Grid */}
              <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
                {[
                  {
                    title: 'Raw Concrete to Italian Travertine Floor Polishing',
                    views: '45.2K',
                    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
                    tag: '#VillaCeleste'
                  },
                  {
                    title: 'Acoustic Fluted Teak Wall Paneling Installation',
                    views: '62.8K',
                    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
                    tag: '#Woodwork'
                  },
                  {
                    title: 'Concealed Magnetic Track Profile Lighting Test',
                    views: '38.1K',
                    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80',
                    tag: '#LightingDesign'
                  },
                  {
                    title: 'Curating Velvet Textures & Brass Bar Accents',
                    views: '51.9K',
                    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
                    tag: '#Restobar'
                  }
                ].map((reel, idx) => (
                  <a
                    key={idx}
                    href={instagramLink}
                    target="_blank"
                    rel="noreferrer"
                    className="group/reel relative aspect-[9/13] rounded-2xl overflow-hidden shadow-md bg-stone-900 cursor-pointer block border border-stone-200"
                  >
                    <img
                      src={reel.image}
                      alt={reel.title}
                      className="w-full h-full object-cover group-hover/reel:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    
                    {/* Top Instagram badge */}
                    <div className="absolute top-2.5 right-2.5">
                      <span className="w-6 h-6 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white">
                        <InstagramIcon className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    {/* Bottom reel info */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] text-amber-300 font-extrabold">
                        <Play className="w-3 h-3 fill-amber-300" />
                        <span>{reel.views} Views</span>
                      </div>
                      <p className="text-[11px] font-bold text-white line-clamp-2 leading-tight">
                        {reel.title}
                      </p>
                      <span className="text-[9px] text-stone-300 block truncate">
                        {reel.tag}
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Direct Follow Banner */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 flex items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-0.5 shrink-0">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <InstagramIcon className="w-5 h-5 text-pink-600" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                      @auraluxestudio
                    </h5>
                    <p className="text-[10px] text-stone-500 truncate">
                      Bespoke Architecture &amp; Interiors
                    </p>
                  </div>
                </div>

                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-1.5 rounded-full bg-[#111111] hover:bg-[#B7977F] text-white text-xs font-bold transition shrink-0"
                >
                  Follow
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. COST ESTIMATOR
      ───────────────────────────────────────────────────────────── */}
      <section id="estimator" className="py-20 sm:py-28 bg-white scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          
          <div className="text-center space-y-2 mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#B7977F]">
              TRANSPARENT BOQ ESTIMATE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111111]">
              Calculate Your Project Investment
            </h2>
          </div>

          <div className="bg-stone-50 rounded-3xl border border-stone-200 p-6 sm:p-10 space-y-8 shadow-xs">
            
            {/* Step 1: Property Type */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                1. Select Property Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {[
                  { key: '1bhk', label: '1 BHK', sqft: '650 Sft' },
                  { key: '2bhk', label: '2 BHK', sqft: '1,150 Sft' },
                  { key: '3bhk', label: '3 BHK', sqft: '1,650 Sft' },
                  { key: '4bhk', label: '4 BHK', sqft: '2,450 Sft' },
                  { key: 'villa', label: 'Villa', sqft: '3,800 Sft' },
                  { key: 'office', label: 'Office', sqft: '2,200 Sft' }
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setSelectedHomeType(item.key as any)}
                    className={`p-3 rounded-2xl border text-center transition cursor-pointer flex flex-col items-center justify-center ${
                      selectedHomeType === item.key
                        ? 'border-[#111111] bg-[#111111] text-white shadow-sm'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    <span className="font-bold text-sm">{item.label}</span>
                    <span className={`text-[10px] ${selectedHomeType === item.key ? 'text-[#B7977F]' : 'text-stone-400'}`}>
                      {item.sqft}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Material Tier */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                2. Select Finish &amp; Material Grade
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { key: 'essential', label: 'Essential Elegance', rate: '₹ 1,250 / Sft', desc: 'Commercial BWP Ply + 0.8mm Laminate' },
                  { key: 'premium', label: 'Premium Signature', rate: '₹ 1,750 / Sft', desc: 'Century Club Prime Marine Ply + Acrylic + Hafele' },
                  { key: 'luxury', label: 'Italian Ultra-Luxury', rate: '₹ 2,600 / Sft', desc: 'Birch Ply + PU Gloss / Statuario + Blum' }
                ].map((tier) => (
                  <button
                    key={tier.key}
                    type="button"
                    onClick={() => setSelectedFinishTier(tier.key as any)}
                    className={`p-4 rounded-2xl border text-left transition cursor-pointer space-y-1 ${
                      selectedFinishTier === tier.key
                        ? 'border-[#B7977F] bg-[#FAF8F5]'
                        : 'border-stone-200 bg-white hover:border-stone-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#111111]">{tier.label}</span>
                      <span className="text-xs font-bold text-[#B7977F]">{tier.rate}</span>
                    </div>
                    <p className="text-xs text-stone-500">{tier.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculation Result */}
            <div className="p-6 rounded-2xl bg-[#111111] text-white space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-stone-800">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#B7977F]">
                    Estimated Investment ({estimateData.homeLabel})
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
                    ₹ {estimateData.totalMinLakhs} – {estimateData.totalMaxLakhs} Lakhs
                  </div>
                  <div className="text-xs text-stone-400 mt-1">
                    Estimated Timeline: <strong>{estimateData.timelineDays} Days Handover</strong> • 10-Year Warranty
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSendEstimateWhatsApp}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send BOQ to WhatsApp</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-300">
                <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                  <div className="text-stone-400">Modular Woodwork</div>
                  <div className="font-bold text-white text-sm">~ ₹ {estimateData.woodworkEst} Lakhs</div>
                </div>
                <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                  <div className="text-stone-400">False Ceiling &amp; Lighting</div>
                  <div className="font-bold text-white text-sm">~ ₹ {estimateData.ceilingLightingEst} Lakhs</div>
                </div>
                <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                  <div className="text-stone-400">Paint, Stone &amp; Finishes</div>
                  <div className="font-bold text-white text-sm">~ ₹ {estimateData.paintDecorEst} Lakhs</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          10. GROW WITH US (Aura Luxe Culture Section)
      ───────────────────────────────────────────────────────────── */}
      <section id="culture" className="py-20 sm:py-24 bg-[#111111] text-white">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 text-center space-y-6">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#B7977F]">
            LIFE AT AURA LUXE
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Grow With Us
          </h2>
          <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
            We’re growing fast and always looking for talented people to build the future with us. We solve big problems, make an impact, laugh a lot, and move the world of architectural design forward.
          </p>
          <div className="pt-2">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#B7977F] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#c5a880] transition"
            >
              <span>Explore Current Opportunities</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          11. EXPERIENCES (Aura Luxe Testimonials Copy)
      ───────────────────────────────────────────────────────────── */}
      <section id="reviews" className="py-20 sm:py-28 bg-[#F9F9F9] border-t border-stone-200 scroll-mt-20">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8">
          
          <div className="text-center space-y-2 mb-16">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#B7977F]">
              OUR CLIENTS
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#111111] tracking-tight font-sans">
              EXPERIENCES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'ARJUN & MEERA SINGHANIA',
                quote: 'Aura Luxe Studios did an exceptional job designing our Jubilee Hills villa. The space feels breathtakingly luxurious yet intimately warm. Every detail from the honed travertine to the concealed acoustic doors reflects true architectural mastery.'
              },
              {
                name: 'DEVENDRA PATEL',
                quote: 'Managing Director, Novus Cloud: Aura Luxe turned our 25,000 sq.ft bare shell into an international-grade collaborative headquarters in record time. Their transparent BOQ and punctual 45-day execution saved us months of downtime.'
              },
              {
                name: 'RHEA KAPOOR & SIDDHARTH VARMA',
                quote: 'Co-Founders, Amber & Clove Restobar: Creating a coastal dining landmark in Goa required deep understanding of biophilic design and acoustic comfort. Aura Luxe exceeded our highest expectations from 3D blueprints to handover.'
              },
              {
                name: 'DR. SNEHA ROY',
                quote: 'Founder, Zennara Medispa: The patient feedback on our clinic ambience is overwhelmingly positive. The indirect circadian lighting and sound-isolated consultation suites make our guests feel pampered and relaxed.'
              }
            ].map((exp, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between space-y-6 hover:shadow-lg transition"
              >
                <div className="space-y-3">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                    &ldquo;{exp.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-100 font-bold text-sm text-[#111111] tracking-wide">
                  {exp.name}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          12. CONTACT US / LET'S DISCUSS YOUR PROJECT (Exact Aura Luxe Lead Form)
      ───────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-20 sm:py-28 bg-white border-t border-stone-200 scroll-mt-20">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Narrative (Aura Luxe Copy) */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#B7977F]">
                CONTACT US
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#111111] leading-tight">
                We&apos;d Love To <br />
                <span className="text-[#B7977F] italic font-normal">Hear From You</span>
              </h2>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Aura Luxe Studios is a premier Architecture &amp; Interior Design firm, renowned for designing landmark corporate tech headquarters, experiential retail destinations, and luxury private residences across India.
              </p>

              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 text-xs sm:text-sm text-stone-700">
                <div>
                  <strong className="text-black block font-bold mb-0.5">Experience Centre</strong>
                  <span>Road No. 36, Jubilee Hills, {userCity}, Telangana, India</span>
                </div>
                <div>
                  <strong className="text-black block font-bold mb-0.5">Business Queries</strong>
                  <a href={`tel:${cleanCallNumber}`} className="text-[#B7977F] font-bold hover:underline">
                    {cleanCallNumber}
                  </a>
                </div>
                <div>
                  <strong className="text-black block font-bold mb-0.5">Email Inquiries</strong>
                  <a href={`mailto:${profile.email || 'bdm@auraluxestudio.com'}`} className="text-stone-800 hover:underline">
                    {profile.email || 'bdm@auraluxestudio.com'}
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleVcfDownload}
                  className="px-5 py-2.5 rounded-full bg-[#111111] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#B7977F] transition cursor-pointer flex items-center gap-2 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-white" />
                  <span>Download vCard</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsQrModalOpen(true)}
                  className="px-5 py-2.5 rounded-full border border-stone-300 text-stone-800 font-bold text-xs uppercase tracking-wider hover:bg-stone-100 transition cursor-pointer flex items-center gap-2"
                >
                  <QrCode className="w-3.5 h-3.5 text-[#B7977F]" />
                  <span>QR Code</span>
                </button>
              </div>
            </div>

            {/* Right Form: "Let's Discuss Your Project" (Aura Luxe Exact Fields) */}
            <div className="lg:col-span-7 bg-stone-50 rounded-3xl border border-stone-200 p-8 sm:p-10 shadow-xs">
              <div className="mb-6 space-y-1">
                <h3 className="text-2xl font-bold text-[#111111] font-sans">
                  Let&apos;s Discuss Your Project
                </h3>
                <p className="text-xs text-stone-500">
                  Share your requirements and our principal architect will connect with you.
                </p>
              </div>

              {leadSuccess ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold text-stone-900">Inquiry Sent</h4>
                  <p className="text-xs text-stone-600">
                    Opening WhatsApp to connect directly with our architectural desk...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="e.g. Vikram Malhotra"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-stone-300 text-stone-900 text-xs sm:text-sm focus:border-[#B7977F] focus:outline-hidden transition shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-stone-300 text-stone-900 text-xs sm:text-sm focus:border-[#B7977F] focus:outline-hidden transition shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block mb-1">
                      Select Project Type *
                    </label>
                    <select
                      value={leadProjectType}
                      onChange={(e) => setLeadProjectType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-stone-300 text-stone-900 text-xs sm:text-sm focus:border-[#B7977F] focus:outline-hidden transition shadow-2xs"
                    >
                      <option value="Residential Interior">Residential Interior</option>
                      <option value="Commercial Interior">Commercial Interior</option>
                      <option value="Office Interior">Office Interior</option>
                      <option value="Architecture Design">Architecture Design</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block mb-1">
                      Project Scope &amp; Notes
                    </label>
                    <textarea
                      rows={3}
                      value={leadMessage}
                      onChange={(e) => setLeadMessage(e.target.value)}
                      placeholder="Share your property size, location, and targeted handover schedule..."
                      className="w-full px-4 py-3 rounded-xl bg-white border border-stone-300 text-stone-900 text-xs sm:text-sm focus:border-[#B7977F] focus:outline-hidden transition shadow-2xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#111111] hover:bg-[#B7977F] text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer shadow-md"
                  >
                    Submit
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          13. FOOTER (Exact Aura Luxe Footer Structure)
      ───────────────────────────────────────────────────────────── */}
      <footer className="bg-[#111111] text-stone-400 py-16 border-t border-stone-800">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-stone-800">
            <div className="space-y-1">
              <span className="font-bold text-xl text-white tracking-tight uppercase">
                AURA LUXE STUDIOS
              </span>
              <p className="text-xs text-stone-400">
                Premium Architecture &amp; Interior Design Studio • Jubilee Hills, Hyderabad
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-xs font-bold uppercase tracking-wider text-stone-300">
              <a href="#services" className="hover:text-[#B7977F] transition">ABOUT US</a>
              <a href="#services" className="hover:text-[#B7977F] transition">SERVICES</a>
              <a href="#portfolio" className="hover:text-[#B7977F] transition">CLIENTS</a>
              <a href="#culture" className="hover:text-[#B7977F] transition">LIFE AT W</a>
              <a href="#culture" className="hover:text-[#B7977F] transition">JOIN US</a>
              <a href="#contact" className="hover:text-[#B7977F] transition">CONTACT US</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <p>Copyright 2026 • Aura Luxe Studios • All Rights Reserved</p>
            <div className="flex gap-4 text-xs font-semibold text-stone-400">
              <a href={facebookLink} target="_blank" rel="noreferrer" className="hover:text-white transition">Facebook</a>
              <a href={instagramLink} target="_blank" rel="noreferrer" className="hover:text-white transition">Instagram</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition">Linkedin</a>
            </div>
          </div>

        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          MODAL 1: PROJECT DETAILS & GALLERY
      ───────────────────────────────────────────────────────────── */}
      {isProjectModalOpen && activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsProjectModalOpen(false)}
        >
          <div
            className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#B7977F]">
                  {activeProject.locationTag} • {activeProject.sectorLabel}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#111111]">
                  {activeProject.title}
                </h3>
              </div>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-100">
                <img
                  src={activeProject.galleryImages[activeGalleryIndex] || activeProject.coverImage}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                />

                {activeProject.galleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setActiveGalleryIndex((prev) => (prev === 0 ? activeProject.galleryImages.length - 1 : prev - 1))}
                      className="absolute top-1/2 left-3 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-[#B7977F] text-white transition active:scale-95 cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveGalleryIndex((prev) => (prev === activeProject.galleryImages.length - 1 ? 0 : prev + 1))}
                      className="absolute top-1/2 right-3 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-[#B7977F] text-white transition active:scale-95 cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 text-white text-xs font-bold">
                      {activeGalleryIndex + 1} / {activeProject.galleryImages.length}
                    </div>
                  </>
                )}
              </div>

              {activeProject.galleryImages.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar">
                  {activeProject.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveGalleryIndex(idx)}
                      className={`w-20 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                        activeGalleryIndex === idx ? 'border-[#B7977F] scale-105' : 'border-stone-200 opacity-60'
                      }`}
                    >
                      <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="space-y-4">
                <p className="text-sm text-stone-700 leading-relaxed">{activeProject.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-stone-400 uppercase text-[10px] block font-bold">Carpet Area</span>
                    <strong className="text-stone-900 text-sm">{activeProject.carpetArea}</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-stone-400 uppercase text-[10px] block font-bold">Handover</span>
                    <strong className="text-stone-900 text-sm">{activeProject.duration}</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-stone-400 uppercase text-[10px] block font-bold">Budget Spec</span>
                    <strong className="text-[#B7977F] text-sm">{activeProject.budgetRange}</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-stone-400 uppercase text-[10px] block font-bold">Style</span>
                    <strong className="text-stone-900 text-sm">{activeProject.style}</strong>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#B7977F] mb-2">Key Specifications</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                    {activeProject.keyFeatures.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#B7977F] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-4">
              <span className="text-xs text-stone-500 hidden sm:inline">
                Interested in building a similar space?
              </span>
              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi Aura Luxe Studios, I would like to inquire about design and pricing for a project similar to "${activeProject.title}".`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#111111] hover:bg-[#B7977F] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL 2: ENQUIRE NOW MODAL
      ───────────────────────────────────────────────────────────── */}
      {isConsultModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
          onClick={() => setIsConsultModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsConsultModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1 mb-6">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#B7977F]">
                AURA LUXE STUDIOS INQUIRY
              </span>
              <h3 className="text-2xl font-bold text-[#111111]">
                Enquire Now
              </h3>
              <p className="text-xs text-stone-500">
                Connect directly with our architectural and interior design consultants.
              </p>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="e.g. Vikram Malhotra"
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 text-stone-900 text-xs sm:text-sm focus:border-[#B7977F] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 text-stone-900 text-xs sm:text-sm focus:border-[#B7977F] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block mb-1">
                  Select Project Type *
                </label>
                <select
                  value={leadProjectType}
                  onChange={(e) => setLeadProjectType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 text-stone-900 text-xs sm:text-sm focus:border-[#B7977F] focus:outline-hidden"
                >
                  <option value="Residential Interior">Residential Interior</option>
                  <option value="Commercial Interior">Commercial Interior</option>
                  <option value="Office Interior">Office Interior</option>
                  <option value="Architecture Design">Architecture Design</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block mb-1">
                  Requirements
                </label>
                <textarea
                  rows={3}
                  value={leadMessage}
                  onChange={(e) => setLeadMessage(e.target.value)}
                  placeholder="Describe your property location, carpet area, and vision..."
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 text-stone-900 text-xs sm:text-sm focus:border-[#B7977F] focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#111111] hover:bg-[#B7977F] text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-md"
              >
                Submit Inquiry via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL 3: QR CODE SCANNER MODAL
      ───────────────────────────────────────────────────────────── */}
      {isQrModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
          onClick={() => setIsQrModalOpen(false)}
        >
          <div
            className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-stone-200 text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <span className="font-bold text-stone-900 text-sm uppercase">Aura Luxe Studios QR</span>
              <button onClick={() => setIsQrModalOpen(false)} className="p-1 rounded-full hover:bg-stone-100 text-stone-500">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : 'https://oneclickbiz.in/v/home-interior')}`}
                alt="Studio QR Code"
                className="w-48 h-48"
              />
            </div>

            <p className="text-xs text-stone-500 font-medium">
              Scan with your smartphone to explore the studio and save direct contact.
            </p>

            <button
              onClick={handleVcfDownload}
              className="w-full py-2.5 rounded-full bg-[#111111] text-white font-bold text-xs uppercase tracking-wider transition hover:bg-[#B7977F] cursor-pointer"
            >
              Download vCard (.VCF)
            </button>
          </div>
        </div>
      )}

      {/* Share Modal Integration */}
      {isShareModalOpen && (
        <ShareCardModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          profile={profile}
        />
      )}

      {/* ─────────────────────────────────────────────────────────────
          14. MOBILE STICKY QUICK-ACTION BAR (Phones only, safe bottom spacing)
      ───────────────────────────────────────────────────────────── */}
      <div id="mobile-bottom-bar" className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-3 py-2.5 flex items-center gap-2 shadow-2xl">
        <a
          href={`tel:${cleanCallNumber}`}
          onClick={() => trackAction('phone_click')}
          className="flex-1 py-2.5 px-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call Desk</span>
        </a>

        <a
          href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hi Aura Luxe Studios, I would like to schedule a free 3D architectural & interior consultation.")}`}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackAction('whatsapp_click')}
          className="flex-1 py-2.5 px-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition shadow-sm"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <a
          href="#contact"
          className="flex-1 py-2.5 px-2 rounded-xl bg-[#111111] hover:bg-[#B7977F] text-white text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition shadow-sm"
        >
          <span>Book Visit</span>
        </a>
      </div>

    </div>
  );
}
