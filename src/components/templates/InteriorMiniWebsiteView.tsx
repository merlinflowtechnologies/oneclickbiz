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
  ShieldCheck, 
  Sparkles, 
  ChevronRight, 
  Calendar, 
  ArrowRight, 
  Share2, 
  Download, 
  QrCode, 
  Film, 
  RotateCcw, 
  Zap, 
  Check, 
  BadgeCheck, 
  PhoneCall, 
  Menu, 
  X, 
  Play, 
  Eye, 
  ExternalLink, 
  Star, 
  Quote, 
  MessageCircle, 
  Ruler, 
  Layers, 
  Home, 
  Info, 
  Hammer, 
  Compass, 
  Palette,
  SlidersHorizontal,
  Clock,
  Wrench,
  CheckCircle
} from 'lucide-react';
import { DigitalProfile, VideoItem } from '@/lib/types';
import ShareCardModal from '@/components/common/ShareCardModal';

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
  roomType: string;
  style: string;
  location: string;
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
  // Extract user's location & city
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

  // Active filter tab for Room Type
  const [activeTab, setActiveTab] = useState<string>('all');

  // Interactive Before/After slider position (0 - 100 percentage)
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  // Cost Estimator state
  const [selectedHomeType, setSelectedHomeType] = useState<'1bhk' | '2bhk' | '3bhk' | '4bhk' | 'villa'>('3bhk');
  const [selectedFinishTier, setSelectedFinishTier] = useState<'essential' | 'premium' | 'luxury'>('premium');

  // Consultation Form state
  const [consultName, setConsultName] = useState('');
  const [consultPhone, setConsultPhone] = useState('');
  const [consultHomeType, setConsultHomeType] = useState('3 BHK Apartment');
  const [consultDate, setConsultDate] = useState('');
  const [consultNotes, setConsultNotes] = useState('');
  const [consultSuccess, setConsultSuccess] = useState(false);

  // Number Cleaners
  const cleanPhone = useMemo(() => {
    if (getCleanWhatsAppNumber) return getCleanWhatsAppNumber(profile);
    const raw = profile.whatsapp || profile.phone || '';
    return raw.replace(/[^0-9]/g, '');
  }, [profile, getCleanWhatsAppNumber]);
  const cleanCallNumber = useMemo(() => {
    const raw = profile.phone || '';
    return raw.replace(/[^0-9+]/g, '');
  }, [profile.phone]);

  // Social Links
  const instagramLink = useMemo(() => {
    const item = profile.sectionData?.socials?.items?.find(s => s.platform === 'instagram');
    const raw = item?.url || (profile as any).socialLinks?.instagram || (profile as any).instagram || '';
    if (!raw) return 'https://instagram.com';
    if (raw.startsWith('http')) return raw;
    const cleanUser = raw.replace('@', '').trim();
    return `https://instagram.com/${cleanUser}`;
  }, [profile]);

  const facebookLink = useMemo(() => {
    const item = profile.sectionData?.socials?.items?.find(s => s.platform === 'facebook');
    const raw = item?.url || (profile as any).socialLinks?.facebook || (profile as any).facebook || '';
    if (!raw) return 'https://facebook.com';
    if (raw.startsWith('http')) return raw;
    return `https://facebook.com/${raw.replace('@', '').trim()}`;
  }, [profile]);

  // Curated Interior Projects (Dynamic from profile products/services or curated fallbacks)
  const interiorProjects: InteriorProject[] = useMemo(() => {
    const existingProducts = profile.sectionData?.products?.items || [];
    if (existingProducts.length > 0) {
      return existingProducts.map((p, idx) => ({
        id: p.id || `proj-${idx}`,
        title: p.name || 'Signature Luxury Residence',
        roomType: p.category || (idx % 3 === 0 ? 'Living Room' : idx % 3 === 1 ? 'Modular Kitchen' : 'Master Suite'),
        style: idx % 2 === 0 ? 'Modern Japandi' : 'Contemporary Luxury',
        location: profile.address || `${userCity}, India`,
        carpetArea: '1,850 - 2,400 Sq.Ft',
        duration: '42 Days Turnkey',
        budgetRange: p.price ? `₹ ${(p.price / 100000).toFixed(2)} Lakhs` : '₹ 12 - 18 Lakhs',
        coverImage: p.imageUrl || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80',
        galleryImages: [
          p.imageUrl || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80',
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
        ],
        description: p.description || 'Complete turnkey architectural interior design featuring German hardware, custom modular woodwork, ambient acoustic lighting, and Italian marble finishes.',
        keyFeatures: [
          'Century Club Prime BWP Marine Plywood (IS:710)',
          'Hafele Soft-Close Silent Hardware & Organizers',
          'Concealed Warm COB Architectural Lighting',
          '10-Year Complete Replacement Warranty'
        ]
      }));
    }

    // Default High-End Curated Projects
    return [
      {
        id: 'int-1',
        title: 'The Sky Penthouse — Minimalist Sanctuary',
        roomType: 'Living & Dining',
        style: 'Minimalist Japandi',
        location: `Jubilee Hills, ${userCity}`,
        carpetArea: '3,200 Sq.Ft',
        duration: '45 Days Handover',
        budgetRange: '₹ 22 - 28 Lakhs',
        coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80',
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80'
        ],
        description: 'Bespoke living and dining transformation with natural fluted oak paneling, integrated acoustic false ceiling, and seamless micro-cement media wall.',
        keyFeatures: ['Natural European Oak Fluted Panels', 'Custom Floating Marble Console', 'Hafele Loox 12V Ambient Dimming', 'Zero VOC Asian Paints Royale Finish']
      },
      {
        id: 'int-2',
        title: 'German Modular Island Kitchen & Pantry',
        roomType: 'Modular Kitchen',
        style: 'Modern Contemporary',
        location: `Financial District, ${userCity}`,
        carpetArea: '450 Sq.Ft Kitchen Space',
        duration: '21 Days Handover',
        budgetRange: '₹ 7.5 - 11 Lakhs',
        coverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=80',
          'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80'
        ],
        description: 'High-performance modular island kitchen featuring anti-scratch acrylic shutters, Blum Servo-Drive motorized lifts, and quartz waterfall countertop.',
        keyFeatures: ['BWP Boiling Waterproof Marine Ply', 'Blum Servo-Drive Electronic Lift-Up', 'Anti-Fingerprint Super Matte Acrylic', 'Integrated Cutlery & Pantry Pullouts']
      },
      {
        id: 'int-3',
        title: 'Royal Master Suite & Walk-In Wardrobe',
        roomType: 'Master Suite',
        style: 'Neo-Classical Luxury',
        location: `Banjara Hills, ${userCity}`,
        carpetArea: '680 Sq.Ft Master Suite',
        duration: '28 Days Handover',
        budgetRange: '₹ 8.5 - 12 Lakhs',
        coverImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=80',
          'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
        ],
        description: 'Opulent master bedroom with custom velvet upholstered headboard, tinted glass fluted wardrobe with motion-sensor lighting, and study nook.',
        keyFeatures: ['Tinted Toughened Glass Wardrobe Profiles', 'Sensor-Activated Warm Strip Lighting', 'Custom Headboard Wall Cushioning', 'Silent Soft-Close Sliding Track Systems']
      },
      {
        id: 'int-4',
        title: 'Boutique Creative Workspace & Studio',
        roomType: 'Commercial',
        style: 'Industrial Luxe',
        location: `Madhapur IT Corridor, ${userCity}`,
        carpetArea: '1,500 Sq.Ft Commercial',
        duration: '35 Days Handover',
        budgetRange: '₹ 14 - 18 Lakhs',
        coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80'
        ],
        description: 'Modern executive office suite with acoustic wood slat ceilings, ergonomic collaborative workstations, and bespoke conference center.',
        keyFeatures: ['Acoustic NRC 0.8 Wood Slat Ceilings', 'Modular Cable-Managed Work Desks', 'Soundproof Double Glazed Partitions', 'Biophilic Indoor Planter Integration']
      }
    ];
  }, [profile.sectionData?.products, profile.address, userCity]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (activeTab === 'all') return interiorProjects;
    return interiorProjects.filter(p => p.roomType.toLowerCase().includes(activeTab.toLowerCase()));
  }, [interiorProjects, activeTab]);

  // Cost Estimator Calculations
  const estimateData = useMemo(() => {
    const areas = {
      '1bhk': { sqft: 650, label: '1 BHK Apartment' },
      '2bhk': { sqft: 1150, label: '2 BHK Apartment' },
      '3bhk': { sqft: 1650, label: '3 BHK Apartment' },
      '4bhk': { sqft: 2450, label: '4 BHK Luxury Apartment' },
      'villa': { sqft: 3600, label: 'Independent Luxury Villa' }
    };
    const rates = {
      essential: { rate: 1100, label: 'Essential Elegance', warranty: '5-Year Warranty', materials: 'ISI Grade Commercial Ply + 0.8mm Mica Laminate + Standard Soft-Close' },
      premium: { rate: 1650, label: 'Premium Signature', warranty: '10-Year Warranty', materials: 'Century BWP Marine Plywood + 1mm Acrylic/PU Finish + Hafele German Hardware' },
      luxury: { rate: 2400, label: 'Ultra-Luxury Italian', warranty: '15-Year Flat Warranty', materials: 'Imported Birch Ply + Italian Polyurethane High-Gloss + Blum Motorized Systems' }
    };

    const area = areas[selectedHomeType];
    const tier = rates[selectedFinishTier];
    const totalEst = area.sqft * tier.rate;

    return {
      homeLabel: area.label,
      sqft: area.sqft,
      tierLabel: tier.label,
      ratePerSqft: tier.rate,
      totalMinLakhs: (totalEst * 0.95 / 100000).toFixed(2),
      totalMaxLakhs: (totalEst * 1.05 / 100000).toFixed(2),
      woodworkEst: ((totalEst * 0.65) / 100000).toFixed(2),
      ceilingLightingEst: ((totalEst * 0.20) / 100000).toFixed(2),
      paintDecorEst: ((totalEst * 0.15) / 100000).toFixed(2),
      timelineDays: selectedHomeType === '1bhk' ? 30 : selectedHomeType === '2bhk' ? 38 : selectedHomeType === '3bhk' ? 45 : 60,
      warranty: tier.warranty,
      materials: tier.materials
    };
  }, [selectedHomeType, selectedFinishTier]);

  // Handle WhatsApp estimate send
  const handleSendEstimateWhatsApp = () => {
    trackAction('interior_estimate_whatsapp_click');
    const msg = `Hi ${profile.name || profile.company || 'Team'}, I calculated an interior estimate on your portal:
*Home Type:* ${estimateData.homeLabel} (${estimateData.sqft} Sq.Ft)
*Finish Tier:* ${estimateData.tierLabel} (₹${estimateData.ratePerSqft}/sft)
*Estimated Budget:* ₹${estimateData.totalMinLakhs} - ${estimateData.totalMaxLakhs} Lakhs
*Expected Delivery:* ${estimateData.timelineDays} Days
Please share your full catalogue & 3D floor plan layout.`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Handle Consultation form submission
  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackAction('interior_consult_submit');
    setConsultSuccess(true);
    const msg = `Hi ${profile.name || profile.company || 'Architect'}, I would like to book a Free 3D Design Consultation:
*Name:* ${consultName}
*Phone:* ${consultPhone}
*Property:* ${consultHomeType}
*Preferred Date:* ${consultDate || 'Next Available'}
*Requirements:* ${consultNotes || 'Turnkey Interior Design'}`;
    setTimeout(() => {
      window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
      setIsConsultModalOpen(false);
      setConsultSuccess(false);
      setConsultName('');
      setConsultPhone('');
      setConsultNotes('');
    }, 1000);
  };

  // Handle VCF Download
  const handleVcfDownload = () => {
    trackAction('interior_vcard_download');
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${profile.name || 'Lead Architect'}
ORG:${profile.company || 'Interior Architecture Studio'}
TITLE:${profile.designation || 'Principal Interior Designer'}
TEL;TYPE=CELL:${profile.phone || ''}
EMAIL;TYPE=WORK:${profile.email || ''}
ADR;TYPE=WORK:;;${profile.address || userCity};;;;
URL:${typeof window !== 'undefined' ? window.location.href : 'https://oneclickbiz.in'}
NOTE:IIID Certified Turnkey Interior Architect & Decorator
END:VCARD`;
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${(profile.name || 'Architect').replace(/\s+/g, '_')}_Interior_Studio.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 font-sans selection:bg-[#C5A880]/20 selection:text-[#8C6D46] relative overflow-x-hidden">
      
      {/* ─────────────────────────────────────────────────────────────
          1. TOP CREDIBILITY & WARRANTY STRIP
      ───────────────────────────────────────────────────────────── */}
      <div 
        style={{ backgroundColor: '#18181B', color: '#F4F4F5' }}
        className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-2 text-[11px] font-semibold border-b border-zinc-800 shadow-xs"
      >
        <div className="max-w-[1600px] mx-auto w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
            </span>
            <span className="font-extrabold uppercase tracking-wider text-amber-300 shrink-0">
              IIID Certified Studio
            </span>
            <span className="hidden sm:inline text-zinc-300 text-[11px] truncate">
              • 10-Year Flat Replacement Warranty • 45-Day Move-In Guarantee • {userCity}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3 sm:gap-4 text-[11px] shrink-0">
            <button
              onClick={() => setIsQrModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-amber-300 transition cursor-pointer font-bold"
              title="Scan QR Code to open studio profile on mobile"
            >
              <QrCode className="w-3.5 h-3.5 text-amber-400" />
              <span>QR Scanner</span>
            </button>
            <button
              onClick={handleVcfDownload}
              className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-emerald-400 transition cursor-pointer font-bold"
              title="Save Studio Contact (.vcf)"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Save vCard</span>
            </button>
            <a
              href={`https://wa.me/${cleanPhone}?text=Hi%20${encodeURIComponent(profile.name || profile.company || 'Architect')}%2C%20I%20am%20inquiring%20about%20interior%20design%20services.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-emerald-400 transition cursor-pointer"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp Desk</span>
            </a>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-amber-300 transition cursor-pointer"
            >
              <Share2 className="w-3 h-3 text-amber-400" />
              <span>Share Studio</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. LUXURY STICKY HEADER & NAVBAR
      ───────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all duration-300">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
            
            {/* Studio Brand Logo & Details */}
            <a href="#home" className="flex items-center gap-3 shrink-0 min-w-0 group select-none">
              <div className="relative shrink-0">
                {profile.avatarUrl ? (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden border border-stone-300 shadow-xs bg-stone-100 group-hover:border-[#C5A880] transition">
                    <img
                      src={profile.avatarUrl}
                      alt={profile.company || profile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#18181B] to-[#27272A] flex items-center justify-center text-amber-300 shadow-xs border border-amber-500/20">
                    <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-xs">
                  <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                </div>
              </div>
              
              <div className="flex flex-col min-w-0 max-w-[140px] xs:max-w-[180px] sm:max-w-[280px] xl:max-w-xs">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="text-xs sm:text-base font-black text-stone-900 leading-tight truncate tracking-tight">
                    {profile.company || profile.name || 'Studio Luxe Interiors'}
                  </span>
                  <BadgeCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A880] shrink-0" />
                </div>
                <span className="text-[10px] sm:text-[11px] text-stone-500 font-medium truncate">
                  {profile.name} • {profile.designation || 'Principal Architect & Interior Designer'}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links (Only shown on xl+ so header never overflows on laptops) */}
            <nav className="hidden xl:flex items-center gap-1 2xl:gap-2 text-xs font-bold text-stone-700 shrink-0">
              <a href="#portfolio" className="px-2.5 py-1.5 rounded-lg hover:text-[#8C6D46] hover:bg-stone-100 transition whitespace-nowrap">
                Portfolio
              </a>
              <a href="#before-after" className="px-2.5 py-1.5 rounded-lg hover:text-[#8C6D46] hover:bg-stone-100 transition whitespace-nowrap flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Before &amp; After</span>
              </a>
              <a href="#estimator" className="px-2.5 py-1.5 rounded-lg hover:text-[#8C6D46] hover:bg-stone-100 transition whitespace-nowrap flex items-center gap-1">
                <Ruler className="w-3.5 h-3.5 text-indigo-600" />
                <span>Cost Estimator</span>
              </a>
              <a href="#process" className="px-2.5 py-1.5 rounded-lg hover:text-[#8C6D46] hover:bg-stone-100 transition whitespace-nowrap">
                Turnkey Process
              </a>
              <a href="#materials" className="px-2.5 py-1.5 rounded-lg hover:text-[#8C6D46] hover:bg-stone-100 transition whitespace-nowrap">
                Materials
              </a>
              <a href="#reviews" className="px-2.5 py-1.5 rounded-lg hover:text-[#8C6D46] hover:bg-stone-100 transition whitespace-nowrap">
                Reviews
              </a>
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 ml-auto">
              {showViewToggle && setViewMode && (
                <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-stone-100 border border-stone-200 shadow-2xs shrink-0">
                  <button
                    type="button"
                    onClick={() => setViewMode('website')}
                    className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-bold transition cursor-pointer ${
                      viewMode === 'website' ? 'bg-[#18181B] text-white shadow-xs' : 'text-stone-600 hover:text-black'
                    }`}
                  >
                    💻 Website
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('mobile')}
                    className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-bold transition cursor-pointer ${
                      viewMode === 'mobile' ? 'bg-[#18181B] text-white shadow-xs' : 'text-stone-600 hover:text-black'
                    }`}
                  >
                    📱 Mobile Card
                  </button>
                </div>
              )}

              {/* Primary Consultation Button - Always 100% visible and never clipped */}
              <button
                type="button"
                onClick={() => setIsConsultModalOpen(true)}
                style={{ backgroundColor: '#18181B', color: '#ffffff' }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 active:scale-95 cursor-pointer hover:bg-stone-900 whitespace-nowrap shrink-0"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-white font-bold whitespace-nowrap">Book 3D Consult</span>
              </button>

              {/* Mobile Quick Consult Button */}
              <button
                type="button"
                onClick={() => setIsConsultModalOpen(true)}
                className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs bg-stone-900 text-white shadow-xs active:scale-95 transition shrink-0 whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Book 3D</span>
              </button>

              {/* Mobile/Tablet Menu Hamburger */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl bg-stone-100 border border-stone-200 text-stone-700 hover:text-black transition cursor-pointer shrink-0"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="xl:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="px-3 py-2 rounded-lg bg-stone-100 border border-stone-200 text-xs text-stone-800 font-semibold flex items-center gap-2">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>10-Year Warranty • 45-Day Handover Guaranteed</span>
            </div>

            {/* Mobile View Switcher (Mini-Website vs Mobile Card) */}
            {showViewToggle && setViewMode && (
              <div className="flex items-center gap-1 p-1 rounded-full bg-stone-100 border border-stone-200">
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('website');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex-1 py-1.5 rounded-full text-xs font-bold transition text-center cursor-pointer ${
                    viewMode === 'website' ? 'bg-[#18181B] text-white shadow-xs' : 'text-stone-600'
                  }`}
                >
                  💻 Mini-Website
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('mobile');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex-1 py-1.5 rounded-full text-xs font-bold transition text-center cursor-pointer ${
                    viewMode === 'mobile' ? 'bg-[#18181B] text-white shadow-xs' : 'text-stone-600'
                  }`}
                >
                  📱 Mobile Card
                </button>
              </div>
            )}

            <nav className="grid grid-cols-2 gap-2 text-xs font-bold text-stone-700 pt-1">
              <a href="#portfolio" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 transition">
                Portfolio Showcase
              </a>
              <a href="#before-after" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 transition">
                Before &amp; After Slider
              </a>
              <a href="#estimator" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 transition">
                Cost Estimator
              </a>
              <a href="#process" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 transition">
                Turnkey Process
              </a>
              <a href="#materials" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 transition">
                Hardware Brands
              </a>
              <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 transition">
                Client Reviews
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* ─────────────────────────────────────────────────────────────
          3. HERO SECTION WITH EXACT 9 CONTACT SQUIRCLES
      ───────────────────────────────────────────────────────────── */}
      <section id="home" className="relative pt-4 sm:pt-10 pb-10 sm:pb-16 overflow-hidden bg-gradient-to-b from-[#FAF9F6] via-white to-[#F5F2EB]">
        {/* Soft Ambient Background Circles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-40">
          <div className="absolute -top-24 right-10 w-[550px] h-[550px] bg-[#C5A880]/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-[500px] h-[400px] bg-amber-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto space-y-2.5 sm:space-y-4">
            
            {/* Studio Avatar / Logo */}
            <div className="flex justify-center pt-0.5 sm:pt-1">
              {profile.avatarUrl ? (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white flex items-center justify-center p-0.5">
                  <img 
                    src={profile.avatarUrl} 
                    alt={profile.company || profile.name} 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white shadow-xl bg-gradient-to-tr from-[#18181B] to-[#3F3F46] text-amber-300 flex items-center justify-center font-black text-xl tracking-wider">
                  {(profile.company || profile.name || 'SL').slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            {/* Top Verification Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 rounded-full bg-white border border-[#C5A880]/40 text-[#8C6D46] text-[11px] sm:text-xs font-bold shadow-xs max-w-[94vw]">
              <Award className="w-3.5 h-3.5 text-[#8C6D46] shrink-0" />
              <span className="truncate">IIID Registered Interior Architect • 12+ Years Experience</span>
            </div>

            {/* Main Architectural Headline */}
            <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-stone-900 tracking-tight leading-[1.18]">
              Crafting Timeless Living Spaces With{' '}
              <span className="text-[#8C6D46] block sm:inline font-bold">
                Turnkey Precision.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="font-sans text-xs xs:text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed px-2">
              {profile.company || profile.name || 'Studio Luxe Interiors'} crafts award-winning residential &amp; commercial interiors in {userCity} with 100% factory-built precision, German hardware fittings, transparent BOQ pricing, and flat 10-year warranty.
            </p>

            {/* Studio Location Strip */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-white border border-stone-200 text-stone-700 text-xs sm:text-sm font-semibold shadow-xs max-w-[94vw]">
                <MapPin className="w-3.5 h-3.5 text-[#8C6D46] shrink-0" />
                <span className="truncate">{profile.address || `Design Experience Centre, ${userCity}, India`}</span>
              </div>
            </div>

            {/* ─────────────────────────────────────────────────────────────
                HERO APP-STYLE CONTACT SQUIRCLES (All 9 In 1 Single Clean Line)
            ───────────────────────────────────────────────────────────── */}
            <div className="pt-2 sm:pt-4 pb-3 w-full max-w-full overflow-x-auto no-scrollbar scroll-smooth">
              <div className="flex flex-nowrap items-center justify-start lg:justify-center gap-3 sm:gap-4 w-max lg:w-auto px-4 lg:px-0 lg:mx-auto">
                
                {/* 1. CALL */}
                <a
                  href={`tel:${cleanCallNumber || '+919876543210'}`}
                  onClick={() => trackAction('call_hero_click')}
                  className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-[68px] lg:h-[68px] rounded-[18px] sm:rounded-[22px] bg-[#10B981] flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 transition-transform group-hover:scale-105 group-hover:-translate-y-1">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-white" viewBox="0 0 24 24">
                      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </div>
                  <span className="font-serif text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-900 group-hover:text-[#8C6D46] transition-colors whitespace-nowrap">
                    CALL
                  </span>
                </a>

                {/* 2. WHATSAPP */}
                <a
                  href={`https://wa.me/${cleanPhone || '919876543210'}?text=${encodeURIComponent(`Hi ${profile.name || profile.company || 'Architect'}, I would like to inquire about turnkey interior design for my property.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackAction('whatsapp_hero_click')}
                  className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-[68px] lg:h-[68px] rounded-[18px] sm:rounded-[22px] bg-[#25D366] flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 transition-transform group-hover:scale-105 group-hover:-translate-y-1">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-white" viewBox="0 0 24 24">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15ZM16.57 14.37C16.32 14.24 15.1 13.64 14.87 13.56C14.64 13.48 14.48 13.44 14.31 13.69C14.15 13.94 13.68 14.49 13.54 14.65C13.4 14.81 13.26 14.83 13.01 14.71C12.76 14.59 11.96 14.33 11.01 13.48C10.27 12.82 9.77 12 9.63 11.75C9.49 11.5 9.62 11.37 9.74 11.25C9.85 11.14 9.99 10.96 10.11 10.82C10.23 10.68 10.27 10.58 10.35 10.42C10.43 10.26 10.39 10.12 10.33 10C10.27 9.88 9.77 8.66 9.57 8.16C9.37 7.68 9.17 7.74 9.02 7.73C8.88 7.72 8.71 7.72 8.55 7.72C8.38 7.72 8.12 7.78 7.89 8.03C7.66 8.28 7.02 8.88 7.02 10.1C7.02 11.32 7.91 12.5 8.03 12.66C8.15 12.82 9.78 15.33 12.28 16.41C12.87 16.67 13.33 16.82 13.69 16.94C14.29 17.13 14.83 17.1 15.26 17.04C15.74 16.97 16.74 16.44 16.95 15.85C17.16 15.26 17.16 14.76 17.09 14.65C17.03 14.54 16.82 14.49 16.57 14.37Z" />
                    </svg>
                  </div>
                  <span className="font-serif text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-900 group-hover:text-[#8C6D46] transition-colors whitespace-nowrap">
                    WHATSAPP
                  </span>
                </a>

                {/* 3. INSTAGRAM */}
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackAction('instagram_hero_click')}
                  className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-[68px] lg:h-[68px] rounded-[18px] sm:rounded-[22px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-lg shadow-pink-500/30 transition-transform group-hover:scale-105 group-hover:-translate-y-1">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-white" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <span className="font-serif text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-900 group-hover:text-[#8C6D46] transition-colors whitespace-nowrap">
                    INSTAGRAM
                  </span>
                </a>

                {/* 4. FACEBOOK */}
                <a
                  href={facebookLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackAction('facebook_hero_click')}
                  className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-[68px] lg:h-[68px] rounded-[18px] sm:rounded-[22px] bg-[#1877F2] flex items-center justify-center text-white shadow-lg shadow-blue-500/30 transition-transform group-hover:scale-105 group-hover:-translate-y-1">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-white" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <span className="font-serif text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-900 group-hover:text-[#8C6D46] transition-colors whitespace-nowrap">
                    FACEBOOK
                  </span>
                </a>

                {/* 5. 3D LOOKBOOK */}
                <a
                  href="#portfolio"
                  onClick={() => trackAction('lookbook_hero_click')}
                  className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-[68px] lg:h-[68px] rounded-[18px] sm:rounded-[22px] bg-[#8B5CF6] flex items-center justify-center text-white shadow-lg shadow-purple-500/30 transition-transform group-hover:scale-105 group-hover:-translate-y-1">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                      <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                  </div>
                  <span className="font-serif text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-900 group-hover:text-[#8C6D46] transition-colors whitespace-nowrap">
                    3D LOOKBOOK
                  </span>
                </a>

                {/* 6. DIRECTIONS TO STUDIO */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profile.address || `${profile.company || profile.name} Interior Studio ${userCity}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackAction('directions_hero_click')}
                  className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-[68px] lg:h-[68px] rounded-[18px] sm:rounded-[22px] bg-[#2563EB] flex items-center justify-center text-white shadow-lg shadow-blue-500/25 transition-transform group-hover:scale-105 group-hover:-translate-y-1">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-white" viewBox="0 0 24 24">
                      <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                    </svg>
                  </div>
                  <span className="font-serif text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-900 group-hover:text-[#8C6D46] transition-colors whitespace-nowrap">
                    DIRECTIONS
                  </span>
                </a>

                {/* 7. EMAIL */}
                <a
                  href={`mailto:${profile.email || 'interiors@oneclickbiz.in'}`}
                  onClick={() => trackAction('email_hero_click')}
                  className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-[68px] lg:h-[68px] rounded-[18px] sm:rounded-[22px] bg-[#EF4444] flex items-center justify-center text-white shadow-lg shadow-red-500/25 transition-transform group-hover:scale-105 group-hover:-translate-y-1">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-white" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <span className="font-serif text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-900 group-hover:text-[#8C6D46] transition-colors whitespace-nowrap">
                    EMAIL
                  </span>
                </a>

                {/* 8. SAVE VCARD */}
                <button
                  type="button"
                  onClick={handleVcfDownload}
                  className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
                  title="Save Studio Contact to Phonebook"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-[68px] lg:h-[68px] rounded-[18px] sm:rounded-[22px] bg-[#F59E0B] flex items-center justify-center text-white shadow-lg shadow-amber-500/30 transition-transform group-hover:scale-105 group-hover:-translate-y-1">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-white" viewBox="0 0 24 24">
                      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                    </svg>
                  </div>
                  <span className="font-serif text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-900 group-hover:text-[#8C6D46] transition-colors whitespace-nowrap">
                    SAVE VCARD
                  </span>
                </button>

                {/* 9. SCAN QR */}
                <button
                  type="button"
                  onClick={() => setIsQrModalOpen(true)}
                  className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
                  title="Scan QR Code to open on phone"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-[68px] lg:h-[68px] rounded-[18px] sm:rounded-[22px] bg-stone-900 border border-stone-700 flex items-center justify-center text-white shadow-lg shadow-stone-900/30 transition-transform group-hover:scale-105 group-hover:-translate-y-1">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" rx="1.5" />
                      <rect x="14" y="3" width="7" height="7" rx="1.5" />
                      <rect x="14" y="14" width="7" height="7" rx="1.5" />
                      <rect x="3" y="14" width="7" height="7" rx="1.5" />
                      <rect x="6" y="6" width="1.5" height="1.5" fill="white" stroke="none" />
                      <rect x="17" y="6" width="1.5" height="1.5" fill="white" stroke="none" />
                      <rect x="6" y="17" width="1.5" height="1.5" fill="white" stroke="none" />
                      <rect x="16" y="16" width="2" height="2" fill="white" stroke="none" />
                    </svg>
                  </div>
                  <span className="font-serif text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-900 group-hover:text-[#8C6D46] transition-colors whitespace-nowrap">
                    SCAN QR
                  </span>
                </button>

              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-3">
              <a
                href="#portfolio"
                style={{ backgroundColor: '#18181B', color: '#ffffff' }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-2xl text-white font-bold text-sm sm:text-base shadow-lg hover:bg-stone-900 transition-transform active:scale-98 cursor-pointer"
              >
                <span>Explore Design Portfolio</span>
                <ChevronRight className="w-4 h-4 text-amber-400" />
              </a>

              <a
                href="#estimator"
                style={{ backgroundColor: '#ffffff', color: '#1c1917', borderColor: '#d6d3d1' }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-2xl bg-white hover:bg-stone-50 border border-stone-300 hover:border-[#C5A880] text-stone-900 font-bold text-sm sm:text-base shadow-xs transition cursor-pointer"
              >
                <Ruler className="w-4.5 h-4.5 text-[#8C6D46]" />
                <span>Calculate Cost Estimate</span>
              </a>
            </div>

            {/* 4 Minimal Trust Counters */}
            <div className="pt-8 sm:pt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-left">
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex items-center gap-3.5 hover:border-[#C5A880] transition">
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-[#8C6D46] flex items-center justify-center font-bold shrink-0">
                  <CheckCircle2 className="w-5.5 h-5.5" />
                </div>
                <div>
                  <div className="font-serif font-bold text-xl sm:text-2xl text-stone-900">350+</div>
                  <div className="text-[11px] text-stone-500 font-medium">Delivered Homes</div>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex items-center gap-3.5 hover:border-[#C5A880] transition">
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-[#8C6D46] flex items-center justify-center font-bold shrink-0">
                  <Clock className="w-5.5 h-5.5" />
                </div>
                <div>
                  <div className="font-serif font-bold text-xl sm:text-2xl text-stone-900">45 Days</div>
                  <div className="text-[11px] text-stone-500 font-medium">Turnkey Handover</div>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex items-center gap-3.5 hover:border-emerald-500/50 transition">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                  <ShieldCheck className="w-5.5 h-5.5" />
                </div>
                <div>
                  <div className="font-serif font-bold text-xl sm:text-2xl text-emerald-700">10-Year</div>
                  <div className="text-[11px] text-stone-500 font-medium">Flat Warranty</div>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex items-center gap-3.5 hover:border-amber-500/50 transition">
                <div className="w-11 h-11 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center font-bold shrink-0">
                  <Hammer className="w-5.5 h-5.5" />
                </div>
                <div>
                  <div className="font-serif font-bold text-xl sm:text-2xl text-stone-900">100%</div>
                  <div className="text-[11px] text-stone-500 font-medium">In-House Factory</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. CURATED PORTFOLIO & ROOM FILTER (Minimal & Clean)
      ───────────────────────────────────────────────────────────── */}
      <section id="portfolio" className="py-14 sm:py-20 bg-stone-50/70 border-y border-stone-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200/80 text-stone-800 text-xs font-bold uppercase tracking-wider">
              <Palette className="w-3.5 h-3.5 text-[#8C6D46]" />
              <span>Curated Portfolio</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Signature Interior Transformations
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              Explore bespoke residential living spaces and modular architectural installations crafted across {userCity}.
            </p>
          </div>

          {/* Minimal Room Category Tabs */}
          <div className="flex justify-center flex-wrap gap-2 pb-8">
            {['all', 'Living', 'Kitchen', 'Master Suite', 'Commercial'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                style={{
                  backgroundColor: activeTab === cat ? '#18181B' : '#ffffff',
                  color: activeTab === cat ? '#ffffff' : '#44403c'
                }}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer shadow-xs border ${
                  activeTab === cat ? 'border-stone-900 shadow-md' : 'border-stone-200 hover:border-stone-400'
                }`}
              >
                {cat === 'all' ? 'All Spaces' : cat === 'Living' ? 'Living & Dining' : cat === 'Kitchen' ? 'Modular Kitchens' : cat === 'Master Suite' ? 'Master Bedrooms' : 'Commercial & Offices'}
              </button>
            ))}
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-3xl bg-white border border-stone-200/90 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Project Image & Floating Tags */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md text-white text-[11px] font-bold">
                      {project.style}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#C5A880]/90 backdrop-blur-md text-stone-950 text-[11px] font-extrabold">
                      {project.duration}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveProject(project);
                        setIsProjectModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md hover:bg-white text-stone-900 text-xs font-bold shadow-md flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#8C6D46]" />
                      <span>View Gallery</span>
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-stone-500 font-semibold mb-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#8C6D46]" />
                        {project.location}
                      </span>
                      <span>{project.carpetArea}</span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 group-hover:text-[#8C6D46] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 mt-1.5 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Highlights & WhatsApp Action */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider text-stone-400">Estimated Budget</div>
                      <div className="text-sm sm:text-base font-bold text-stone-900">{project.budgetRange}</div>
                    </div>

                    <a
                      href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi ${profile.name || profile.company}, I love the project "${project.title}". Can you share full budget details and similar layout ideas?`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-xs transition active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Get Similar Quote</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. INTERACTIVE BEFORE & AFTER SLIDER (Showstopper Minimal Feature)
      ───────────────────────────────────────────────────────────── */}
      <section id="before-after" className="py-14 sm:py-20 bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#8C6D46] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Transformation Showcase</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Drag to Witness The Transformation
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              See how our architectural design team turns a bare-shell concrete handover into a warm, finished luxury living room.
            </p>
          </div>

          {/* Draggable Slider Container */}
          <div className="relative aspect-[4/3] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-stone-100 select-none touch-none">
            
            {/* "After" Image (Full Width background) */}
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85"
              alt="After Furnished Luxury Interior"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-emerald-600/90 text-white text-[11px] sm:text-xs font-bold shadow-md pointer-events-none">
              AFTER: Turnkey Handover ✨
            </div>

            {/* "Before" Image (Clipped smoothly using CSS clipPath so the image is NEVER squished or scaled) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ clipPath: `inset(0 calc(100% - ${sliderPosition}%) 0 0)` }}
            >
              <img
                src="https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1600&q=85"
                alt="Before Raw Concrete Handover"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-20 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-stone-900/85 text-white text-[11px] sm:text-xs font-bold shadow-md pointer-events-none">
                BEFORE: Bare Shell Concrete 🏗️
              </div>
            </div>

            {/* Draggable Divider Bar */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-30 pointer-events-none flex items-center justify-center -translate-x-1/2"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-stone-900 shadow-2xl border-2 border-[#C5A880] flex items-center justify-center font-bold text-xs select-none">
                ◀ ▶
              </div>
            </div>

            {/* Range Input for accessibility and smooth touch dragging */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 z-40 cursor-ew-resize touch-none"
              aria-label="Before and after transformation slider"
            />
          </div>

          <div className="text-center pt-4 text-xs text-stone-500 font-medium">
            💡 Drag slider left or right to compare raw civil site with finished interior.
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. INSTANT INTERIOR COST ESTIMATOR (Interactive Tool)
      ───────────────────────────────────────────────────────────── */}
      <section id="estimator" className="py-14 sm:py-20 bg-stone-100/70 border-b border-stone-200 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200 text-stone-800 text-xs font-bold uppercase tracking-wider">
              <Ruler className="w-3.5 h-3.5 text-indigo-600" />
              <span>Instant Budget Estimator</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Calculate Your Home Interior Cost
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              Get an instant, transparent estimate based on your floor plan size and preferred material grade.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-stone-300/80 shadow-xl p-6 sm:p-10 space-y-8">
            
            {/* Step 1: Select Home Size */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                1. Select Property Configuration
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
                {[
                  { key: '1bhk', label: '1 BHK', sqft: '650 Sft' },
                  { key: '2bhk', label: '2 BHK', sqft: '1,150 Sft' },
                  { key: '3bhk', label: '3 BHK', sqft: '1,650 Sft' },
                  { key: '4bhk', label: '4 BHK', sqft: '2,450 Sft' },
                  { key: 'villa', label: 'Villa', sqft: '3,600+ Sft' }
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setSelectedHomeType(item.key as any)}
                    style={{
                      borderColor: selectedHomeType === item.key ? '#18181B' : '#e7e5e4',
                      backgroundColor: selectedHomeType === item.key ? '#18181B' : '#ffffff',
                      color: selectedHomeType === item.key ? '#ffffff' : '#1c1917'
                    }}
                    className="p-3 sm:p-3.5 rounded-2xl border-2 text-center transition cursor-pointer flex flex-col items-center justify-center shadow-2xs last:col-span-2 sm:last:col-span-1"
                  >
                    <span className="font-bold text-sm sm:text-base">{item.label}</span>
                    <span className={`text-[11px] ${selectedHomeType === item.key ? 'text-amber-300' : 'text-stone-500'}`}>
                      {item.sqft}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Finish Tier */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                2. Select Material &amp; Finish Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { key: 'essential', label: 'Essential Elegance', rate: '₹ 1,100 / Sft', desc: 'Commercial ISI Ply + 0.8mm Laminate' },
                  { key: 'premium', label: 'Premium Signature', rate: '₹ 1,650 / Sft', desc: 'BWP Marine Ply + 1mm Acrylic + Hafele' },
                  { key: 'luxury', label: 'Italian Ultra-Luxury', rate: '₹ 2,400 / Sft', desc: 'Imported Birch Ply + PU Gloss + Blum' }
                ].map((tier) => (
                  <button
                    key={tier.key}
                    type="button"
                    onClick={() => setSelectedFinishTier(tier.key as any)}
                    style={{
                      borderColor: selectedFinishTier === tier.key ? '#8C6D46' : '#e7e5e4',
                      backgroundColor: selectedFinishTier === tier.key ? '#FAF6F0' : '#ffffff'
                    }}
                    className="p-4 rounded-2xl border-2 text-left transition cursor-pointer space-y-1 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm sm:text-base text-stone-900">{tier.label}</span>
                      <span className="text-xs font-bold text-[#8C6D46]">{tier.rate}</span>
                    </div>
                    <p className="text-xs text-stone-500">{tier.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculation Result Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-stone-900 text-white space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Estimated Investment Range ({estimateData.homeLabel})
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
                    ₹ {estimateData.totalMinLakhs} – {estimateData.totalMaxLakhs} Lakhs
                  </div>
                  <div className="text-xs text-stone-400 mt-1">
                    Estimated turn-around: <strong>{estimateData.timelineDays} Days</strong> • {estimateData.warranty}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSendEstimateWhatsApp}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-extrabold text-sm flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer shadow-lg"
                >
                  <MessageCircle className="w-4.5 h-4.5" />
                  <span>Send BOQ to WhatsApp</span>
                </button>
              </div>

              {/* Breakdown Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-300">
                <div className="p-3 rounded-xl bg-stone-800/60 border border-stone-700/60 space-y-1">
                  <div className="text-stone-400">Modular Woodwork &amp; Storage</div>
                  <div className="font-bold text-white text-sm">~ ₹ {estimateData.woodworkEst} Lakhs</div>
                </div>
                <div className="p-3 rounded-xl bg-stone-800/60 border border-stone-700/60 space-y-1">
                  <div className="text-stone-400">False Ceiling &amp; Warm Lighting</div>
                  <div className="font-bold text-white text-sm">~ ₹ {estimateData.ceilingLightingEst} Lakhs</div>
                </div>
                <div className="p-3 rounded-xl bg-stone-800/60 border border-stone-700/60 space-y-1">
                  <div className="text-stone-400">Paint, Wall Finishes &amp; Decor</div>
                  <div className="font-bold text-white text-sm">~ ₹ {estimateData.paintDecorEst} Lakhs</div>
                </div>
              </div>

              <div className="text-[11px] text-stone-400">
                *Includes 100% factory pre-lamination, delivery, assembly, and on-site supervisor. Transparent itemized BOQ provided post site audit.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. 4-STEP TURNKEY PROCESS
      ───────────────────────────────────────────────────────────── */}
      <section id="process" className="py-14 sm:py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-bold uppercase tracking-wider">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>How It Works</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Our 4-Step Seamless Handover
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              Zero hassle, zero hidden surprises. From initial moodboard to moving into your furnished home.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Free Site Audit & 3D Moodboard',
                desc: 'Our lead architect visits your flat, takes laser measurements, and prepares a custom 3D moodboard aligned with your style.'
              },
              {
                step: '02',
                title: '3D VR Renders & Itemized BOQ',
                desc: 'Experience your apartment in virtual reality. Finalize materials, colors, and an exact transparent BOQ with zero hidden costs.'
              },
              {
                step: '03',
                title: 'German Factory Pre-Fabrication',
                desc: 'Modular units are pre-drilled and edge-banded on German CNC machinery in our in-house facility with millimeter accuracy.'
              },
              {
                step: '04',
                title: '45-Day On-Site Handover',
                desc: 'Clean, dust-free modular assembly on site, final quality audit across 146 checkpoints, and key handover with 10-year warranty.'
              }
            ].map((s) => (
              <div
                key={s.step}
                className="p-6 rounded-3xl bg-stone-50 border border-stone-200/90 space-y-3 relative group hover:border-[#C5A880] transition"
              >
                <div className="font-serif font-black text-3xl text-stone-300 group-hover:text-[#8C6D46] transition-colors">
                  {s.step}
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900">{s.title}</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. CERTIFIED MATERIALS & HARDWARE PARTNERS
      ───────────────────────────────────────────────────────────── */}
      <section id="materials" className="py-12 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
            Certified Quality Guarantee • Zero Compromise
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Built With World-Class Materials &amp; Fittings
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4 text-xs font-semibold text-stone-300">
            <div className="p-4 rounded-2xl bg-stone-800/70 border border-stone-700/80">
              <div className="text-amber-400 font-bold text-sm mb-1">Century / Greenply</div>
              <div>BWP Marine Plywood IS:710</div>
            </div>
            <div className="p-4 rounded-2xl bg-stone-800/70 border border-stone-700/80">
              <div className="text-amber-400 font-bold text-sm mb-1">Hafele &amp; Blum</div>
              <div>German Soft-Close Systems</div>
            </div>
            <div className="p-4 rounded-2xl bg-stone-800/70 border border-stone-700/80">
              <div className="text-amber-400 font-bold text-sm mb-1">Asian Paints Royale</div>
              <div>Zero VOC Luxury Emulsion</div>
            </div>
            <div className="p-4 rounded-2xl bg-stone-800/70 border border-stone-700/80">
              <div className="text-amber-400 font-bold text-sm mb-1">Saint-Gobain</div>
              <div>Toughened Float Glass</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. CLIENT REVIEWS
      ───────────────────────────────────────────────────────────── */}
      <section id="reviews" className="py-14 sm:py-20 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>4.9 / 5.0 Homeowner Rating</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Loved By 350+ Happy Families
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Vikram & Sneha R.',
                home: '3 BHK at My Home Bhooja, Hyderabad',
                text: 'The best interior decision we made. The 3D render was 100% matched in reality. The modular kitchen and fluted TV unit were delivered right on day 43 with zero delay.',
                rating: 5
              },
              {
                name: 'Dr. Aditya Sharma',
                home: '4 BHK Duplex Villa, Gachibowli',
                text: 'Extremely professional team. Transparent BOQ with zero extra charges later. The in-house factory finish on the walk-in wardrobes is genuinely European quality.',
                rating: 5
              },
              {
                name: 'Kavitha Reddy',
                home: 'Penthouse, Jubilee Hills',
                text: 'Flawless execution. Their lead designer understood our Japandi vision and executed custom oak paneling and hidden door frames with perfection.',
                rating: 5
              }
            ].map((rev, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <div className="font-bold text-stone-900 text-sm">{rev.name}</div>
                  <div className="text-[11px] text-stone-500">{rev.home}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          10. MINIMAL FOOTER
      ───────────────────────────────────────────────────────────── */}
      <footer className="bg-stone-950 text-stone-400 py-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-stone-800">
            <div>
              <div className="font-serif font-bold text-xl text-white">
                {profile.company || profile.name || 'Studio Luxe Interiors'}
              </div>
              <div className="text-xs text-stone-500 mt-1">
                IIID Certified Turnkey Architectural Interiors &amp; Luxury Decor
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setIsConsultModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition active:scale-95 cursor-pointer shadow-md"
              >
                Book Free Consultation
              </button>
              <button
                type="button"
                onClick={handleVcfDownload}
                className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs transition active:scale-95 cursor-pointer"
              >
                Save Contact (.VCF)
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
            <p>© {new Date().getFullYear()} {profile.company || 'Studio Luxe Interiors'}. All rights reserved.</p>
            <p>Powered by <Link href="/" className="text-amber-400 hover:underline">OneClickBiz Digital Platform</Link></p>
          </div>
        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          MODAL: BOOK FREE 3D CONSULTATION
      ───────────────────────────────────────────────────────────── */}
      {isConsultModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in"
          onClick={() => setIsConsultModalOpen(false)}
        >
          <div 
            className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsConsultModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-[#8C6D46] text-xs font-bold">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>Zero Obligation 3D Session</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Book Free 3D Design Consultation
              </h3>
              <p className="text-xs text-stone-500">
                Meet our lead architect at our experience centre or schedule a site visit for laser measurement.
              </p>
            </div>

            <form onSubmit={handleConsultSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={consultName}
                  onChange={(e) => setConsultName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-stone-50 text-sm focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Phone Number (for WhatsApp BOQ)</label>
                <input
                  type="tel"
                  required
                  value={consultPhone}
                  onChange={(e) => setConsultPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-stone-50 text-sm focus:outline-none focus:border-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Home Type</label>
                  <select
                    value={consultHomeType}
                    onChange={(e) => setConsultHomeType(e.target.value)}
                    className="w-full px-3 py-3 rounded-xl border border-stone-300 bg-stone-50 text-xs sm:text-sm focus:outline-none focus:border-stone-900"
                  >
                    <option value="2 BHK Apartment">2 BHK Flat</option>
                    <option value="3 BHK Apartment">3 BHK Flat</option>
                    <option value="4 BHK Apartment">4 BHK Flat</option>
                    <option value="Independent Villa">Villa / Duplex</option>
                    <option value="Commercial Office">Commercial Space</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={consultDate}
                    onChange={(e) => setConsultDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs sm:text-sm focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Specific Requirements (Optional)</label>
                <textarea
                  rows={2}
                  value={consultNotes}
                  onChange={(e) => setConsultNotes(e.target.value)}
                  placeholder="e.g. Modular kitchen & master wardrobe needed by next month..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-sm focus:outline-none focus:border-stone-900"
                />
              </div>

              <button
                type="submit"
                disabled={consultSuccess}
                className="w-full py-3.5 rounded-xl bg-stone-950 hover:bg-stone-900 text-white font-bold text-sm shadow-lg transition active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                {consultSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Connecting via WhatsApp...</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Confirm Free Consultation</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: PROJECT GALLERY SHOWCASE
      ───────────────────────────────────────────────────────────── */}
      {isProjectModalOpen && activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/85 backdrop-blur-md animate-in fade-in"
          onClick={() => setIsProjectModalOpen(false)}
        >
          <div
            className="w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 relative animate-in zoom-in-95 max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] bg-stone-100 shrink-0">
              <img
                src={activeProject.coverImage}
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-950/70 hover:bg-stone-950 text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-4 overflow-y-auto">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-50 text-[#8C6D46] text-xs font-bold">
                  {activeProject.style} • {activeProject.duration}
                </span>
                <span className="text-sm font-bold text-stone-900">{activeProject.budgetRange}</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-stone-900">{activeProject.title}</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{activeProject.description}</p>

              <div className="space-y-2 pt-2 border-t border-stone-100">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500">Key Specifications</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                  {activeProject.keyFeatures.map((kf, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{kf}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-bold text-xs"
                >
                  Close
                </button>
                <a
                  href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi, I am inquiring about the project "${activeProject.title}". Please send more photos and price quote.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {isShareModalOpen && (
        <ShareCardModal
          profile={profile}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}

      {/* QR Code Modal */}
      {isQrModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in"
          onClick={() => setIsQrModalOpen(false)}
        >
          <div 
            className="w-full max-w-sm bg-white rounded-3xl p-6 text-center space-y-4 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-stone-100 text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="font-serif font-bold text-lg text-stone-900">Scan Studio QR Code</div>
            <div className="w-56 h-56 mx-auto rounded-2xl bg-stone-100 p-3 border-2 border-stone-200 flex items-center justify-center shadow-inner">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : 'https://oneclickbiz.in')}`}
                alt="Studio QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs text-stone-500">Scan with any smartphone camera to open this digital interior website.</p>
          </div>
        </div>
      )}

    </div>
  );
}
