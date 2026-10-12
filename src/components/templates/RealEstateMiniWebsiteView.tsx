'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
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
  Eye, 
  ArrowRight, 
  ChevronRight, 
  Maximize2, 
  Share2, 
  ExternalLink, 
  Layers, 
  Search, 
  Filter, 
  Calculator, 
  Car, 
  Clock, 
  Check, 
  Award, 
  Compass, 
  Home, 
  Key, 
  FileText, 
  PhoneCall, 
  Menu,
  X, 
  Plus, 
  Minus,
  Navigation,
  BedDouble,
  Bath,
  Maximize,
  Trees,
  Waves,
  Dumbbell,
  Shield,
  Zap,
  Play,
  Quote,
  SlidersHorizontal,
  RotateCcw,
  IndianRupee,
  BadgeCheck,
  ChevronDown,
  Plane,
  GraduationCap,
  TrendingUp,
  Building,
  Route,
  ArrowUpRight,
  Info,
  QrCode,
  Film,
  UserCheck,
  Copy,
  Globe
} from 'lucide-react';
import { DigitalProfile, VideoItem } from '@/lib/types';
import ShareCardModal from '@/components/common/ShareCardModal';
import { downloadVcfFile } from '@/lib/vcf';
import SocialIcon from '@/components/common/SocialIcon';

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

export interface RealEstateProject {
  id: string;
  title: string;
  developer: string;
  location: string;
  microMarket: string;
  priceDisplay: string;
  pricePerSqFt: string;
  bhkTypes: string[];
  propertyType: 'Open Plots' | 'Villas' | 'Apartments' | 'Commercial' | 'Farmlands';
  status: 'Ready for Construction' | 'Under Construction' | 'Ready to Move' | 'Pre-Launch';
  reraId: string;
  possessionDate: string;
  carpetAreaRange: string;
  imageUrl: string;
  galleryUrls: string[];
  featuredTags: string[];
  description: string;
  highlights: string[];
  floorPlans: {
    bhk: string;
    superArea: string;
    carpetArea: string;
    price: string;
    facing: string;
    imageUrl: string;
  }[];
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
  // Extract user's location & city
  const userCity = useMemo(() => {
    if (profile.sectionData?.realEstate?.city) {
      return profile.sectionData.realEstate.city.split('•')[0].trim();
    }
    if (!profile.address) return 'Hyderabad';
    const parts = profile.address.split(',').map(s => s.trim());
    return parts[parts.length - 2] || parts[parts.length - 1] || parts[0] || 'Hyderabad';
  }, [profile.address, profile.sectionData?.realEstate?.city]);

  // Real estate statutory RERA ID
  const displayRera = useMemo(() => {
    return profile.sectionData?.realEstate?.reraId || 'TS-RERA Sanctioned';
  }, [profile.sectionData?.realEstate?.reraId]);

  // Clean WhatsApp phone
  const cleanPhone = useMemo(() => {
    if (getCleanWhatsAppNumber) return getCleanWhatsAppNumber(profile);
    return profile.whatsapp ? profile.whatsapp.replace(/[^0-9]/g, '') : (profile.phone ? profile.phone.replace(/[^0-9]/g, '') : '');
  }, [profile, getCleanWhatsAppNumber]);

  // Clean Call phone
  const cleanCallNumber = useMemo(() => {
    const raw = profile.phone || profile.whatsapp || '+919876543210';
    return raw.replace(/[^0-9+]/g, '');
  }, [profile.phone, profile.whatsapp]);

  // Social link resolvers
  const socialItems = useMemo(() => {
    return profile.sectionData?.socials?.items || (profile as any).socialLinks || [];
  }, [profile]);

  const instagramLink = useMemo(() => {
    const found = socialItems.find((s: any) => s.platform === 'instagram');
    return found?.url || 'https://instagram.com/';
  }, [socialItems]);

  const facebookLink = useMemo(() => {
    const found = socialItems.find((s: any) => s.platform === 'facebook');
    return found?.url || 'https://facebook.com/';
  }, [socialItems]);

  // Dynamic projects derived from user's custom products or default templates
  const userProjects: RealEstateProject[] = useMemo(() => {
    const rawProducts = profile.sectionData?.products?.items || [];
    
    // Only map custom products if they are genuinely real estate items (ignore software/retail/apparel)
    const isRealEstateItem = (prod: any) => {
      const text = `${prod.name || ''} ${prod.category || ''} ${prod.description || ''}`.toLowerCase();
      const isNotProperty = /(?:funnel|landing\s*page|software|crm|vcard|visiting\s*card|master\s*kit|digital\s*good|course|ebook|marketing\s*demo)/i.test(text);
      if (isNotProperty) return false;
      const hasRE = /(?:plot|villa|apartment|residence|flat|tower|bhk|sq\.?\s*yd|acre|farm|gated|commercial|rera|layout|corridor|housing|building|infra|property|floor|penthouse|suite|township)/i.test(text);
      const isRetail = /(?:suit|blazer|sherwani|apparel|clothing|shirt|pant|tailor|textile|fashion|kurta|fabric|wear)/i.test(text);
      return hasRE && !isRetail;
    };

    const customProducts = rawProducts.filter(isRealEstateItem);
    if (customProducts.length > 0) {
      return customProducts.map((prod, index) => {
        const bhkMatches = prod.name.match(/\d+\s*(?:BHK|Sq\.?Yards?|Acres?)/gi) || prod.description.match(/\d+\s*(?:BHK|Sq\.?Yards?|Acres?)/gi) || ['150, 200, 300 Sq. Yds'];
        const isPlot = prod.name.toLowerCase().includes('plot') || prod.category?.toLowerCase().includes('plot') || prod.description.toLowerCase().includes('plot');
        const isVilla = prod.name.toLowerCase().includes('villa') || prod.category?.toLowerCase().includes('villa') || prod.description.toLowerCase().includes('villa');
        const isFarm = prod.name.toLowerCase().includes('farm') || prod.category?.toLowerCase().includes('farm') || prod.description.toLowerCase().includes('farm');
        const isCommercial = prod.name.toLowerCase().includes('commercial') || prod.category?.toLowerCase().includes('commercial') || prod.description.toLowerCase().includes('commercial');
        
        let propType: 'Open Plots' | 'Villas' | 'Apartments' | 'Commercial' | 'Farmlands' = 'Apartments';
        if (isPlot) propType = 'Open Plots';
        else if (isVilla) propType = 'Villas';
        else if (isFarm) propType = 'Farmlands';
        else if (isCommercial) propType = 'Commercial';
        else propType = 'Apartments';

        const locationMatch = prod.description.match(/(?:at|in|near|corridor:)\s+([A-Za-z\s]+?)(?:[.,;]|$)/i);
        const prodCorridor = (prod as any).corridor || (prod as any).location;
        const projectLoc = prodCorridor || (locationMatch ? locationMatch[1].trim() : (profile.address ? profile.address.split(',')[0].trim() : `${userCity} Growth Corridor`));

        let priceDisp = (prod as any).priceLabel || '₹ 24.7 Lakhs - ₹ 49.5 Lakhs';
        let pricePerUnit = '₹ 16,499 / Sq. Yd';
        if (prod.price > 0 && !(prod as any).priceLabel) {
          if (prod.price >= 10000000) {
            priceDisp = `₹ ${(prod.price / 10000000).toFixed(2)} Cr`;
          } else if (prod.price >= 100000) {
            priceDisp = `₹ ${(prod.price / 100000).toFixed(2)} Lakhs`;
          } else {
            priceDisp = `₹ ${prod.price.toLocaleString('en-IN')}`;
          }
          pricePerUnit = isPlot ? `₹ ${Math.round(prod.price / 200).toLocaleString('en-IN')} / Sq. Yd` : `₹ ${Math.round(prod.price / 1800).toLocaleString('en-IN')} / sq.ft`;
        }

        const prodRera = (prod as any).reraId || profile.sectionData?.realEstate?.reraId;
        const prodDimensions = (prod as any).dimensions;
        const prodStatus = (prod as any).status;
        const prodApproval = (prod as any).approvalType;
        const prodAmenities = (prod as any).amenities;

        // Tailored high-resolution gallery visuals and architectural floor plans for each property category
        const typeMedia = {
          'Open Plots': {
            gallery: [
              prod.imageUrl,
              'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
            ].filter(Boolean),
            plans: [
              {
                bhk: prodDimensions || bhkMatches[0] || '150 Sq. Yds (33ft × 41ft)',
                superArea: '1,350 sq.ft',
                carpetArea: '1,350 sq.ft',
                price: priceDisp,
                facing: 'East Facing (100% Vastu)',
                imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'
              },
              {
                bhk: '200 Sq. Yds (36ft × 50ft)',
                superArea: '1,800 sq.ft',
                carpetArea: '1,800 sq.ft',
                price: priceDisp,
                facing: 'North-East Corner Plot',
                imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
              },
              {
                bhk: '300 Sq. Yds (45ft × 60ft)',
                superArea: '2,700 sq.ft',
                carpetArea: '2,700 sq.ft',
                price: priceDisp,
                facing: 'Main Boulevard Facing',
                imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
              }
            ]
          },
          'Villas': {
            gallery: [
              prod.imageUrl,
              'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
            ].filter(Boolean),
            plans: [
              {
                bhk: prodDimensions || bhkMatches[0] || '4 BHK Triplex Luxury Villa',
                superArea: '3,850 sq.ft',
                carpetArea: '3,100 sq.ft',
                price: priceDisp,
                facing: 'East Facing Private Lawn',
                imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80'
              },
              {
                bhk: '5 BHK Grand Presidential Villa',
                superArea: '5,200 sq.ft',
                carpetArea: '4,450 sq.ft',
                price: priceDisp,
                facing: 'North-East Corner with Plunge Pool',
                imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
              }
            ]
          },
          'Commercial': {
            gallery: [
              prod.imageUrl,
              'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80'
            ].filter(Boolean),
            plans: [
              {
                bhk: prodDimensions || 'Grade-A Executive Office Suite',
                superArea: '1,250 sq.ft',
                carpetArea: '1,020 sq.ft',
                price: priceDisp,
                facing: 'Panoramic City View',
                imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
              },
              {
                bhk: 'Corporate Floor Plate',
                superArea: '3,500 sq.ft',
                carpetArea: '2,900 sq.ft',
                price: priceDisp,
                facing: 'High-Visibility Arterial View',
                imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
              }
            ]
          },
          'Farmlands': {
            gallery: [
              prod.imageUrl,
              'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'
            ].filter(Boolean),
            plans: [
              {
                bhk: prodDimensions || '0.5 Acre Weekend Farm Plot',
                superArea: '2,420 Sq. Yds',
                carpetArea: '2,420 Sq. Yds',
                price: priceDisp,
                facing: 'Drip Irrigated Organic Unit',
                imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'
              },
              {
                bhk: '1.0 Acre Gated Estate Farmland',
                superArea: '4,840 Sq. Yds',
                carpetArea: '4,840 Sq. Yds',
                price: priceDisp,
                facing: 'Perimeter Fenced with Cottage Setup',
                imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
              }
            ]
          },
          'Apartments': {
            gallery: [
              prod.imageUrl,
              'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
            ].filter(Boolean),
            plans: [
              {
                bhk: prodDimensions || bhkMatches[0] || '3 BHK Luxury Sky Suite',
                superArea: '2,450 sq.ft',
                carpetArea: '1,890 sq.ft',
                price: priceDisp,
                facing: 'East Facing (100% Vastu)',
                imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
              },
              {
                bhk: bhkMatches[1] || '4 BHK Grand Panoramic Suite',
                superArea: '3,450 sq.ft',
                carpetArea: '2,750 sq.ft',
                price: priceDisp,
                facing: 'North-East Lake View',
                imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
              }
            ]
          }
        };

        const currentTypeMedia = typeMedia[propType] || typeMedia['Apartments'];
        const extraProfileGallery = (profile.sectionData?.gallery?.items || [])
          .map(g => g.imageUrl)
          .filter(u => u && !currentTypeMedia.gallery.includes(u));

        return {
          id: prod.id || `proj_${index}`,
          title: prod.name,
          developer: profile.company || profile.name,
          location: projectLoc,
          microMarket: prodCorridor ? `${prodCorridor}, ${userCity}` : (profile.address || projectLoc),
          priceDisplay: priceDisp,
          pricePerSqFt: pricePerUnit,
          bhkTypes: prodDimensions ? [prodDimensions] : bhkMatches,
          propertyType: propType,
          status: prodStatus || (isPlot ? 'Ready for Construction' : (isVilla ? 'Ready to Move' : 'Under Construction')),
          reraId: prodRera || `TS-RERA/P0240000${8920 + index * 11}`,
          possessionDate: prodStatus || (isPlot ? 'Immediate Spot Registration' : (isVilla ? 'Ready for Possession' : 'December 2026')),
          carpetAreaRange: prodDimensions || (isPlot ? '150, 200, 300 Sq. Yds' : (isVilla ? '3,200 - 5,500 sq.ft' : (isCommercial ? '1,000 - 4,000 sq.ft' : '1,250 - 3,450 sq.ft'))),
          imageUrl: prod.imageUrl || currentTypeMedia.gallery[0] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
          galleryUrls: currentTypeMedia.gallery.concat(extraProfileGallery.slice(0, 2)),
          featuredTags: prodApproval
            ? [prodApproval, prodDimensions || '100% Clear Title', 'Spot Registration']
            : (isPlot
            ? ['HMDA & DTCP Approved', '100% Clear Title', 'Gated Plotted Layout', 'Spot Registration']
            : isVilla
            ? ['Ultra Luxury Villas', 'Private Pool Deck', '100% Vastu Compliant', 'Gated Community']
            : isCommercial
            ? ['Grade-A IT Hub', 'High Rental Yield', '100% DG Backup', 'Instant Metro Connect']
            : ['RERA Approved High-Rise', 'Sky Deck Clubhouse', '100% Vastu Compliant', 'Lake View Balconies']),
          description: prod.description || `${prod.name} in ${projectLoc} featuring premium specifications, verified statutory approvals, and high ROI appreciation.`,
          highlights: Array.isArray(prodAmenities) && prodAmenities.length > 0
            ? prodAmenities
            : (isPlot
            ? [
                '100% Clear Legal Title with 30-Year Forensic Link Audit',
                'Heavy-Duty Concrete CC Roads with Kerb Markings & Footpaths',
                'Underground Drainage, Water Lines & Energized Street Lighting',
                'Precast Boundary Compound Wall & Grand Entrance Arch'
              ]
            : isVilla
            ? [
                'Triplex Villa Community with Private Landscaped Lawn & Garden',
                'European Architectural Specifications with Imported Italian Marble',
                'Exclusive 25,000 sq.ft 5-Star Resident Clubhouse & Sports Arena',
                '24/7 Multi-Tier Smart Security with Perimeter Solar Fencing'
              ]
            : isCommercial
            ? [
                'Grade-A Certified Energy-Efficient Sustainable IT Infrastructure',
                'High-Speed Destination-Controlled Elevators & Grand Double-Height Atrium',
                '100% Uninterrupted Power Backup with Dedicated Substation Lines',
                'Surrounded by Premier Corporate Campuses & Rapid Metro Access'
              ]
            : [
                'TS-RERA Sanctioned High-Rise Gated Residential Community',
                'Expansive 40,000+ sq.ft Lifestyle Clubhouse & Infinity Pool Deck',
                '100% Vastu Compliant Homes with Panoramic Unobstructed Views',
                'Pre-Approved Home Loan Facilities by SBI, HDFC & ICICI Bank'
              ]),
          floorPlans: currentTypeMedia.plans
        };
      });
    }

    // Default dynamic properties if profile has no custom products
    const devName = profile.company || profile.name || 'Skyline Landmark Developers';
    return [
      {
        id: 'proj_luxury_residences',
        title: `${devName} Imperia Luxury Residences`,
        developer: devName,
        location: profile.sectionData?.realEstate?.city || `Kokapet Financial District, ${userCity}`,
        microMarket: profile.address || `Golden Mile Road, Near Outer Ring Road Exit 1`,
        priceDisplay: '₹ 1.85 Cr - ₹ 3.45 Cr',
        pricePerSqFt: '₹ 8,999 / sq.ft',
        bhkTypes: ['3 & 4 BHK Sky Residences (2,450 - 3,850 sq.ft)'],
        propertyType: 'Apartments',
        status: 'Under Construction',
        reraId: displayRera !== 'TS-RERA Sanctioned' ? displayRera : 'TS-RERA/P02400008921',
        possessionDate: 'December 2026',
        carpetAreaRange: '2,450 - 3,850 sq.ft Super Built-up Area',
        imageUrl: profile.coverUrl || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        galleryUrls: (profile.sectionData?.gallery?.items || []).map(g => g.imageUrl).length > 0
          ? (profile.sectionData?.gallery?.items || []).map(g => g.imageUrl)
          : [
              'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
              'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
              'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
            ],
        featuredTags: ['RERA Approved High-Rise', '50,000 Sq.Ft Sky Clubhouse', '100% Vastu Compliant', 'Lake View Balconies'],
        description: `Ultra-luxury high-rise residential towers nestled in the heart of Kokapet Financial District. Featuring private elevator lobbies, temperature-controlled swimming pool, 3-tier smart security, and high-ceiling Italian marble living suites.`,
        highlights: [
          'TS-RERA Sanctioned Grade-A High-Rise Township',
          'Only 5 Minutes from Continental Hospital & Wipro Circle',
          '50,000 sq.ft Multi-Level Lifestyle Clubhouse & Sky Deck',
          'Pre-Approved Home Loans by SBI, HDFC & ICICI Bank',
          'Triple Height Designer Entrance Lobby with 24/7 Concierge'
        ],
        floorPlans: [
          {
            bhk: '3 BHK Luxury Sky Suite',
            superArea: '2,450 sq.ft',
            carpetArea: '1,890 sq.ft',
            price: '₹ 1.85 Cr*',
            facing: 'East Facing (100% Vastu)',
            imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
          },
          {
            bhk: '4 BHK Grand Presidential Suite',
            superArea: '3,850 sq.ft',
            carpetArea: '2,980 sq.ft',
            price: '₹ 2.95 Cr*',
            facing: 'North-East Corner View',
            imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
          }
        ]
      },
      {
        id: 'proj_gated_villas',
        title: `${devName} Grandeur Triplex Gated Villas`,
        developer: devName,
        location: `Tellapur - Mokila Green Belt, ${userCity}`,
        microMarket: `Near Neopolis Corridor & Shankarpally Road`,
        priceDisplay: '₹ 2.65 Cr - ₹ 4.25 Cr',
        pricePerSqFt: '₹ 7,850 / sq.ft',
        bhkTypes: ['4 & 5 BHK Triplex Villas (3,800 - 5,400 sq.ft)'],
        propertyType: 'Villas',
        status: 'Ready to Move',
        reraId: 'TS-RERA/P02400009412',
        possessionDate: 'Ready for Fit-outs',
        carpetAreaRange: '3,800 - 5,400 sq.ft Private Villa Plot',
        imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
        galleryUrls: [
          'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80'
        ],
        featuredTags: ['22-Acre Gated Villa Community', 'Private Plunge Pool Option', 'Solar Powered Homes'],
        description: `Exclusive 22-acre gated villa sanctuary featuring European-style triplex villas with private landscaped lawns, home theater lounges, solar rooftop generation, and a private plunge pool.`,
        highlights: [
          'HMDA & TS-RERA Sanctioned Gated Villa Development',
          '10 Minutes Signal-Free Drive from Neopolis Kokapet',
          'Private 3-Car Covered Parking & Solar Rooftop Array',
          'State-of-the-Art Clubhouse with Tennis, Squash & Cafe'
        ],
        floorPlans: [
          {
            bhk: '4 BHK Triplex Luxury Villa',
            superArea: '3,800 sq.ft',
            carpetArea: '3,100 sq.ft',
            price: '₹ 2.65 Cr*',
            facing: 'East Facing Courtyard',
            imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80'
          }
        ]
      },
      {
        id: 'proj_commercial_suites',
        title: `${devName} Business Hub Grade-A Tech Suites`,
        developer: devName,
        location: `Hitec City IT Corridor, ${userCity}`,
        microMarket: `Near Cyber Towers & Raidurg Metro Station`,
        priceDisplay: '₹ 95.0 Lakhs - ₹ 3.80 Cr',
        pricePerSqFt: '₹ 9,500 / sq.ft',
        bhkTypes: ['Grade-A Office Suites (1,000 - 4,000 sq.ft)'],
        propertyType: 'Commercial',
        status: 'Under Construction',
        reraId: 'TS-RERA/P02400007819',
        possessionDate: 'June 2026',
        carpetAreaRange: '1,000 - 4,000 sq.ft Commercial Suites',
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        galleryUrls: [
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80'
        ],
        featuredTags: ['Grade-A IT Park', 'High Rental Yield 8%+', '100% DG Power Backup', 'Metro Station Adjacent'],
        description: `Next-generation commercial office suites engineered for high-growth tech firms, family offices, and retail enterprises with high rental demand and long-term lease contracts.`,
        highlights: [
          'Direct Skywalk Access to Metro Station',
          'High-Speed Destination Controlled Elevators',
          'LEED Gold Certified Sustainable Green Architecture',
          'Pre-Leased Commercial Units with 8.4% Net Rental Yield'
        ],
        floorPlans: [
          {
            bhk: 'Grade-A Executive Office Suite',
            superArea: '1,250 sq.ft',
            carpetArea: '1,020 sq.ft',
            price: '₹ 1.18 Cr*',
            facing: 'City Skyline View',
            imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
          }
        ]
      },
      {
        id: 'proj_aeropolis_plots',
        title: `${devName} Aeropolis Gated Township Plots`,
        developer: devName,
        location: `Shamshabad Airport & ORR Corridor, ${userCity}`,
        microMarket: `Near ORR Exit 14 & Bangalore Highway NH-44`,
        priceDisplay: '₹ 36.5 Lakhs - ₹ 85.0 Lakhs',
        pricePerSqFt: '₹ 24,333 / Sq. Yd',
        bhkTypes: ['150, 200, 300 & 500 Sq. Yds Villa Plots'],
        propertyType: 'Open Plots',
        status: 'Ready for Construction',
        reraId: 'TS-RERA/P02400006734',
        possessionDate: 'Immediate Spot Registration',
        carpetAreaRange: '35-Acre Gated Masterplanned Community',
        imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
        galleryUrls: [
          'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80'
        ],
        featuredTags: ['HMDA & RERA Approved', '100% Clear Title', 'Spot Registration', '40ft BT Roads'],
        description: `Premium 35-acre gated plotted township with underground drainage, 24/7 security arch, landscaped avenue trees, and spot registration near Rajiv Gandhi International Airport.`,
        highlights: [
          'HMDA & TS-RERA Sanctioned Gated Master Community',
          '15-Minute Drive to RGIA Airport Terminal',
          'Underground Electrical Cabling & 24/7 Water Pipeline',
          'Bank Loans Up to 75% Pre-Sanctioned by SBI & HDFC'
        ],
        floorPlans: [
          {
            bhk: '200 Sq. Yds Premium Villa Plot (36x50)',
            superArea: '1,800 sq.ft',
            carpetArea: '1,800 sq.ft',
            price: '₹ 48.6 Lakhs*',
            facing: 'East Facing Main Avenue',
            imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'
          }
        ]
      }
    ];
  }, [profile, userCity]);

  // Unique Localities derived from projects & profile
  const uniqueLocalities = useMemo(() => {
    const set = new Set<string>();
    userProjects.forEach(p => {
      if (p.location) set.add(p.location);
    });
    if (profile.address) {
      set.add(profile.address.split(',')[0].trim());
    }
    return Array.from(set).filter(Boolean);
  }, [userProjects, profile.address]);

  // Filter States
  const [selectedCorridor, setSelectedCorridor] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBudget, setSelectedBudget] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<string>('all');

  // Interactive Modals & Active Selections
  const [activeProject, setActiveProject] = useState<RealEstateProject | null>(null);
  const [isFloorPlanModalOpen, setIsFloorPlanModalOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [isSiteVisitModalOpen, setIsSiteVisitModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [modalTab, setModalTab] = useState<'gallery' | 'plans' | 'highlights' | 'location'>('gallery');
  const [activeGalleryImageIndex, setActiveGalleryImageIndex] = useState<number>(0);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; desc?: string } | null>(null);

  // Site Visit Form State
  const [siteVisitForm, setSiteVisitForm] = useState({
    name: '',
    phone: '',
    email: '',
    preferredDate: '',
    project: userProjects[0]?.title || 'Signature Project',
    transportMode: 'Self Visit' as 'Self Visit' | 'Request Free Cab Pick-up'
  });
  const [siteVisitSubmitted, setSiteVisitSubmitted] = useState(false);

  // EMI / Plot Cost Calculator States
  const [plotSizeSqYds, setPlotSizeSqYds] = useState<number>(200);
  const [pricePerSqYd, setPricePerSqYd] = useState<number>(16499);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(25);
  const [loanTenureYears, setLoanTenureYears] = useState<number>(15);
  const [interestRate, setInterestRate] = useState<number>(8.5);

  // Calculate Plot & EMI Cost
  const plotFinance = useMemo(() => {
    const totalCost = plotSizeSqYds * pricePerSqYd;
    const downPayment = Math.round((totalCost * downPaymentPercent) / 100);
    const loanAmount = totalCost - downPayment;
    const r = interestRate / 12 / 100;
    const n = loanTenureYears * 12;
    const emi = Math.round((loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    return {
      totalCost,
      downPayment,
      loanAmount,
      monthlyEmi: emi
    };
  }, [plotSizeSqYds, pricePerSqYd, downPaymentPercent, loanTenureYears, interestRate]);

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    return userProjects.filter((p) => {
      if (activeTab !== 'all' && p.propertyType !== activeTab) return false;
      if (selectedCategory !== 'all' && p.propertyType !== selectedCategory) return false;
      if (selectedCorridor !== 'all' && !p.location.toLowerCase().includes(selectedCorridor.toLowerCase())) return false;
      if (selectedStatus !== 'all' && p.status !== selectedStatus) return false;
      return true;
    });
  }, [userProjects, activeTab, selectedCategory, selectedCorridor, selectedStatus]);

  const handleWhatsAppInquiry = (projectName: string, context = 'General Inquiry') => {
    trackAction(`whatsapp_realestate_${projectName}`);
    const text = encodeURIComponent(
      `Hi ${profile.name}! I am interested in *${projectName}* listed on ${profile.company || `${profile.name} Developers`}.\n\nContext: ${context}\nPlease share the brochure, price list, and layout plan.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  const handleSiteVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackAction('site_visit_scheduled');
    setSiteVisitSubmitted(true);

    const text = encodeURIComponent(
      `*🚗 NEW SITE VISIT BOOKING REQUEST*\n\n` +
      `*Developer:* ${profile.company || profile.name}\n` +
      `*Customer Name:* ${siteVisitForm.name}\n` +
      `*WhatsApp / Mobile:* ${siteVisitForm.phone}\n` +
      `*Email:* ${siteVisitForm.email || 'N/A'}\n` +
      `*Selected Project:* ${siteVisitForm.project}\n` +
      `*Preferred Date:* ${siteVisitForm.preferredDate || 'Earliest Slot'}\n` +
      `*Transport Assistance:* ${siteVisitForm.transportMode}\n\n` +
      `Please confirm the visit slot and driver pickup details.`
    );
    setTimeout(() => {
      window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
    }, 400);
  };

  const handleVcfDownload = () => {
    trackAction('vcf_download_realestate');
    downloadVcfFile(profile);
  };

  // QR Code & vCard Modal States
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [videoFilter, setVideoFilter] = useState<'all' | 'youtube' | 'instagram'>('all');

  const liveUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/v/${profile.slug}`
    : `https://oneclickbiz.in/v/${profile.slug}`;

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(liveUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Clean real estate designation (guards against clothing/apparel terms)
  const displayDesignation = useMemo(() => {
    const des = (profile.designation || '').trim();
    if (!des || /(?:suit|blazer|sherwani|apparel|clothing|fashion|tailor|wear|ethnic)/i.test(des)) {
      return 'Managing Director • Real Estate Developer';
    }
    return des;
  }, [profile.designation]);

  const featuredProject = useMemo(() => {
    return userProjects[0] || null;
  }, [userProjects]);

  const featuredProjectTitle = useMemo(() => {
    const t = featuredProject?.title || '';
    if (!t || /(?:suit|blazer|sherwani|apparel|clothing|fashion|tailor|wear)/i.test(t)) {
      return `${profile.company || profile.name || 'Skyline'} Landmark Residences & Plots`;
    }
    return t;
  }, [featuredProject, profile.company, profile.name]);

  const featuredPropertyType = useMemo(() => {
    return featuredProject?.propertyType || 'Luxury Residences & Plots';
  }, [featuredProject]);

  const featuredLocation = useMemo(() => {
    return featuredProject?.location || profile.address || `${userCity} Growth Corridor`;
  }, [featuredProject, profile.address, userCity]);

  // Clean real estate services (filters out custom tailoring / retail services)
  const servicesList = useMemo(() => {
    const raw = profile.sectionData?.services?.items || [];
    return raw.filter(srv => {
      const text = `${srv.title || ''} ${srv.category || ''} ${srv.description || ''}`.toLowerCase();
      const isRetail = /(?:suit|blazer|sherwani|apparel|clothing|shirt|pant|tailor|textile|fashion|kurta|fabric|wear)/i.test(text);
      return !isRetail;
    });
  }, [profile.sectionData?.services?.items]);

  const testimonialsList = useMemo(() => {
    const raw = profile.sectionData?.testimonials?.items || [];
    return raw.filter(t => {
      const text = `${t.content || ''} ${t.clientRole || ''}`.toLowerCase();
      const isRetail = /(?:suit|blazer|sherwani|apparel|clothing|tailor)/i.test(text);
      return !isRetail;
    });
  }, [profile.sectionData?.testimonials?.items]);

  const videosList = profile.sectionData?.videos?.items || [];
  const galleryList = profile.sectionData?.gallery?.items || [];

  const effectiveGallery = useMemo(() => {
    if (galleryList.length > 0) {
      return galleryList.map((g, idx) => ({
        title: g.title || `Site View #${idx + 1}`,
        desc: g.description || `On-site development progression photo for ${profile.company || profile.name}.`,
        img: g.imageUrl,
        tag: g.category || 'Site Photo',
        status: 'Verified'
      }));
    }
    return [
      {
        title: 'Grand Designer Entrance Arch — Clear Daylight View',
        desc: 'Monumental pergola entrance archway with paved approach avenue, 24/7 security cabin, and 100ft road access.',
        img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
        tag: 'Entrance Arch',
        status: 'HMDA Approved'
      },
      {
        title: 'Blacktop Avenue with Checkered Footpaths & Palm Trees',
        desc: 'Smooth blacktop roads, red-and-white checkered pedestrian footpaths, yellow-black kerbs, and palm tree avenues.',
        img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        tag: 'Blacktop Avenue',
        status: '100% Finished'
      },
      {
        title: 'Full Layout Illumination with High-Mast LED Street Lights',
        desc: 'Fully energized electrification grid with glowing street lights, demarcated avenue kerbs, and secure night ambiance.',
        img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        tag: 'Night Illumination',
        status: 'Energized Grid'
      },
      {
        title: 'Demarcated Individual Plot with Precast Boundary Wall & Gate',
        desc: 'Clearly demarcated individual plots with precast boundary walls, painted kerbs, dedicated gate access, and avenue trees.',
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        tag: 'Demarcated Plot',
        status: 'Spot Registration'
      },
      {
        title: 'Main Layout Avenue Perspective with Boundary Fencing',
        desc: 'Scenic perspective down the primary layout avenue flanked by palm trees, demarcated plots, and perimeter fencing.',
        img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
        tag: 'Avenue View',
        status: '10.2 Acres HMDA'
      },
      {
        title: 'Nature Farm Plot with Grand Shade Tree & Fertile Soil',
        desc: 'Scenic leveled farmland unit with mature shade tree, ideal for weekend cottages, organic fruit plantations, and family getaways.',
        img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        tag: 'Farm Plot',
        status: 'Verified Layout'
      }
    ];
  }, [galleryList, profile.company, profile.name]);

  // Default rich real estate drone walkthroughs and reels if user has not yet added custom videos
  const defaultRealEstateVideos: VideoItem[] = useMemo(() => [
    {
      id: 'v_bld_1',
      title: `${userProjects[0]?.title || 'Skyline Imperia'} — 4K Aerial Drone Layout Tour & Surroundings`,
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      type: 'youtube',
      caption: 'Comprehensive high-resolution aerial flight covering master approach avenues, 100ft road connectivity, and upcoming metro line.'
    },
    {
      id: 'v_bld_2',
      title: `Model ${userProjects[0]?.bhkTypes[0] || '4 BHK'} Sky Residence — Complete Architectural Walkthrough`,
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      type: 'youtube',
      caption: 'Experience the double-height ceilings, Italian marble flooring, wrap-around balcony, and master bedroom layout in 4K.'
    },
    {
      id: 'v_bld_3',
      title: `${userProjects[3]?.title || 'Plotted Township'} — On-Site Ground Progression & Blacktop Roads`,
      url: 'https://www.instagram.com/reel/C3M8W98oG12/',
      type: 'instagram',
      caption: 'Quick reel breakdown: 40ft finished blacktop roads, underground cabling, street illumination, and demarcated boundary stones.'
    },
    {
      id: 'v_bld_4',
      title: `${userProjects[2]?.title || 'Gated Villas'} — 40,000 Sq.Ft Clubhouse & Plunge Pool Reel Tour`,
      url: 'https://www.instagram.com/reel/C2X4Z81oH34/',
      type: 'instagram',
      caption: 'Exclusive reel walkthrough of private plunge pool, double-height living room, infinity pool, and landscaped lawns.'
    }
  ], [userProjects]);

  const effectiveVideos = useMemo(() => {
    return videosList.length > 0 ? videosList : defaultRealEstateVideos;
  }, [videosList, defaultRealEstateVideos]);

  const resolveEmbedUrl = (vid: VideoItem): string => {
    if (getEmbedUrl) {
      const res = getEmbedUrl(vid);
      if (res) return res;
    }
    const url = (vid.url || '').trim();
    if (!url) return '';
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0`;
    }
    if (url.includes('instagram.com/reel/') || url.includes('instagram.com/p/')) {
      const cleanReel = url.split('instagram.com/reel/')[1]?.split('/')[0]?.split('?')[0] || 
                        url.split('instagram.com/p/')[1]?.split('/')[0]?.split('?')[0];
      if (cleanReel) return `https://www.instagram.com/reel/${cleanReel}/embed`;
    }
    return url;
  };

  // Dynamic Buyer Reviews tailored to profile and projects
  const defaultReviews = testimonialsList.length > 0
    ? testimonialsList.map((t, ti) => ({
        name: t.clientName,
        role: t.clientRole || 'Verified Buyer',
        project: userProjects[ti % userProjects.length]?.title || userProjects[0]?.title,
        content: t.content,
        rating: t.rating || 5
      }))
    : [
        {
          name: 'Dr. Srinivas Rao',
          role: 'Chief Neurosurgeon & Property Investor',
          project: userProjects[0]?.title || 'Prime Real Estate Residency',
          content: `We booked our property in ${userProjects[0]?.title || 'this project'}. The construction quality, prompt legal documentation by ${profile.company || profile.name}, and timely milestone delivery made it completely seamless.`,
          rating: 5
        },
        {
          name: 'Pooja & Harish Nair',
          role: 'Tech VP, Google Hyderabad',
          project: userProjects[1]?.title || userProjects[0]?.title,
          content: `${profile.company || profile.name} delivered our asset right on time with verified RERA certificates. Their team is exceptionally transparent and professional with bank loan coordination.`,
          rating: 5
        },
        {
          name: 'K. Venkat Reddy',
          role: 'NRI Investor (San Jose, California)',
          project: userProjects[2]?.title || userProjects[0]?.title,
          content: `Being based in the US, I relied on ${profile.company || profile.name} for our property acquisition. From forensic 30-year title search to registration, the legal transparency was 100%.`,
          rating: 5
        }
      ];

  // Dynamic FAQs tailored to profile and projects
  const faqs = [
    {
      q: `What is the exact location and connectivity of ${userProjects[0]?.title}?`,
      a: `${userProjects[0]?.title} is strategically situated at ${userProjects[0]?.location || profile.address || 'the growth corridor'}. It enjoys signal-free connectivity to major arterial expressways, Outer Ring Road (ORR), Rajiv Gandhi International Airport, and major IT/commercial business hubs.`
    },
    {
      q: `Is ${userProjects[0]?.title} RERA approved and legally clear?`,
      a: `Yes, 100%. ${userProjects[0]?.title} has received official statutory sanctions and TS-RERA registration. Every property comes with 100% clear unencumbered title deeds, 30-year forensic legal search report, and complete revenue documentation.`
    },
    {
      q: `What are the pricing options and unit configurations available?`,
      a: `Pricing for ${userProjects[0]?.title} starts from ${userProjects[0]?.priceDisplay || 'attractive launch rates'}. Available configurations include ${userProjects[0]?.bhkTypes.join(', ')} with customized floor plan choices.`
    },
    {
      q: `Can I get a bank loan for purchasing with ${profile.company || profile.name}?`,
      a: `Yes, all our projects are pre-approved by leading nationalized and private financial institutions including State Bank of India (SBI), HDFC Bank, ICICI Bank, and LIC Housing Finance with up to 75% to 80% funding.`
    },
    {
      q: `What is the registration and handover timeline?`,
      a: `We ensure instant spot registration at the Sub-Registrar Office upon final settlement. Buyers receive the registered sale deed document along with electronic passbook records and mutation entries with zero hassle.`
    },
    {
      q: `Do you provide guided on-site visits with chauffeur assistance?`,
      a: `Yes! We provide complimentary guided site inspections with dedicated relationship managers and optional chauffeured car pickup & drop service from anywhere in the city.`
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#005DAA]/20 selection:text-[#005DAA] relative overflow-x-hidden">
      
      {/* ─────────────────────────────────────────────────────────────
          1. TOP RERA & TRUST STRIP (Hidden in phone mockup, clean single-line on mobile)
      ───────────────────────────────────────────────────────────── */}
      {!isMockup && (
        <div 
          style={{ backgroundColor: '#0A192F', color: '#ffffff' }}
          className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-2 text-[11px] font-semibold border-b border-[#1E293B] shadow-xs"
        >
          <div className="max-w-[1600px] mx-auto w-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 truncate">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="font-extrabold uppercase tracking-wider text-amber-300 shrink-0">
                {displayRera}
              </span>
              <span className="hidden sm:inline text-slate-300 text-[11px] truncate">
                • 100% Clear Title Guarantee &amp; Spot Registration • {profile.sectionData?.realEstate?.city || userCity}
              </span>
            </div>

            <div className="hidden md:flex items-center gap-3 sm:gap-4 text-[11px] shrink-0">
              <button
                onClick={() => setIsQrModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-amber-300 transition cursor-pointer font-bold"
                title="Scan QR Code to open profile on phone"
              >
                <QrCode className="w-3.5 h-3.5 text-amber-400" />
                <span>QR Scanner</span>
              </button>
              <button
                onClick={handleVcfDownload}
                className="hidden md:inline-flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition cursor-pointer font-bold"
                title="Save Developer Contact to Phone (.vcf)"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Save vCard</span>
              </button>
              <button
                onClick={() => handleWhatsAppInquiry('Direct Inquiry', 'Connecting from verified digital profile')}
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition cursor-pointer"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-3 h-3 text-emerald-400" />
                <span className="hidden sm:inline">WhatsApp</span>
              </button>
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-amber-300 transition cursor-pointer"
                title="Share Digital Profile"
              >
                <Share2 className="w-3 h-3 text-amber-400" />
                <span className="hidden sm:inline">Share Profile</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. LUXURY STICKY HEADER & NAVIGATION
      ───────────────────────────────────────────────────────────── */}
      <header className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all duration-300`}>
        <div className={`max-w-[1600px] mx-auto ${isMockup ? 'px-3' : 'px-4 sm:px-6 lg:px-8 xl:px-12'}`}>
          <div className={`flex items-center justify-between ${isMockup ? 'h-13' : 'h-15 sm:h-20'} gap-2 sm:gap-6`}>
            
            {/* Brand Logo & Details */}
            <a href="#home" className="flex items-center gap-2.5 sm:gap-3 shrink-0 min-w-0 group select-none">
              <div className="relative shrink-0">
                {profile.avatarUrl ? (
                  <div className={`${isMockup ? 'w-8 h-8' : 'w-9 h-9 sm:w-12 sm:h-12'} rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-slate-100 group-hover:border-[#005DAA]/50 transition`}>
                    <img
                      src={profile.avatarUrl}
                      alt={profile.company || profile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className={`${isMockup ? 'w-8 h-8' : 'w-9 h-9 sm:w-12 sm:h-12'} rounded-xl bg-gradient-to-br from-[#005DAA] to-[#003B6B] flex items-center justify-center text-white shadow-xs`}>
                    <Building2 className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-xs">
                  <Check className="w-2 h-2 text-white stroke-[3]" />
                </div>
              </div>
              
              <div className="flex flex-col min-w-0 max-w-[125px] xs:max-w-[170px] sm:max-w-[240px] xl:max-w-xs">
                <div className="flex items-center gap-1">
                  <span className={`${isMockup ? 'text-xs' : 'text-xs sm:text-base'} font-black text-slate-900 leading-tight truncate`}>
                    {profile.company || profile.name || 'Premium Developers'}
                  </span>
                  <BadgeCheck className="w-3.5 h-3.5 text-[#005DAA] shrink-0" />
                </div>
                <span className="text-[10px] text-slate-500 font-medium truncate">
                  {profile.name} • {displayDesignation}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links (Compact & Responsive) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-bold text-slate-700 shrink min-w-0">
              <a 
                href="#projects" 
                className="px-2.5 py-1.5 rounded-lg hover:text-[#005DAA] hover:bg-[#005DAA]/5 transition whitespace-nowrap flex items-center gap-1"
              >
                <span>Projects</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#005DAA]/10 text-[#004580] font-extrabold">
                  {userProjects.length}
                </span>
              </a>
              <a 
                href="#site-gallery" 
                className="px-2.5 py-1.5 rounded-lg hover:text-[#005DAA] hover:bg-[#005DAA]/5 transition whitespace-nowrap"
              >
                Gallery
              </a>
              <a 
                href="#videos" 
                className="px-2.5 py-1.5 rounded-lg hover:text-[#005DAA] hover:bg-[#005DAA]/5 transition whitespace-nowrap flex items-center gap-1"
              >
                <Film className="w-3.5 h-3.5 text-rose-500" />
                <span>Walkthroughs</span>
              </a>
              <a 
                href="#reviews" 
                className="hidden 2xl:inline-block px-2.5 py-1.5 rounded-lg hover:text-[#005DAA] hover:bg-[#005DAA]/5 transition whitespace-nowrap"
              >
                Reviews
              </a>
              <a 
                href="#tools" 
                className="hidden xl:inline-block px-2.5 py-1.5 rounded-lg hover:text-[#005DAA] hover:bg-[#005DAA]/5 transition whitespace-nowrap"
              >
                EMI Calc
              </a>
              <a 
                href="#about" 
                className="hidden 2xl:inline-block px-2.5 py-1.5 rounded-lg hover:text-[#005DAA] hover:bg-[#005DAA]/5 transition whitespace-nowrap"
              >
                About
              </a>
              <a 
                href="#contact" 
                className="px-2.5 py-1.5 rounded-lg hover:text-[#005DAA] hover:bg-[#005DAA]/5 transition whitespace-nowrap"
              >
                Contact
              </a>
            </nav>

            {/* Header Right Action Area */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-auto">
              {showViewToggle && setViewMode && (
                <div className="hidden xl:flex items-center gap-1 p-1 rounded-full bg-slate-100 border border-slate-200 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setViewMode('website')}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition cursor-pointer ${
                      viewMode === 'website' ? 'bg-[#005DAA] text-white shadow-xs' : 'text-slate-600 hover:text-black'
                    }`}
                  >
                    💻 Website
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('mobile')}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition cursor-pointer ${
                      viewMode === 'mobile' ? 'bg-[#005DAA] text-white shadow-xs' : 'text-slate-600 hover:text-black'
                    }`}
                  >
                    📱 Card
                  </button>
                </div>
              )}

              {/* QR Code Quick Button */}
              <button
                type="button"
                onClick={() => setIsQrModalOpen(true)}
                className="hidden 2xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:py-2 rounded-xl bg-slate-100 hover:bg-[#005DAA]/10 border border-slate-200 hover:border-[#005DAA]/30 text-slate-700 hover:text-[#005DAA] text-xs font-bold transition shadow-2xs cursor-pointer"
                title="Scan QR Code / Open Mobile Profile"
              >
                <QrCode className="w-3.5 h-3.5 text-[#005DAA]" />
                <span>QR Code</span>
              </button>

              {/* Save vCard Contact Button */}
              <button
                type="button"
                onClick={handleVcfDownload}
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
                title="Save Developer Contact to Phone"
              >
                <Download className="w-3.5 h-3.5 text-slate-600" />
                <span>Save Contact</span>
              </button>

              {/* Primary Schedule Site Visit Button */}
              <button
                type="button"
                onClick={() => setIsSiteVisitModalOpen(true)}
                style={{ backgroundColor: '#005DAA', color: '#ffffff' }}
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl font-bold text-[11px] sm:text-xs tracking-wide shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 active:scale-95 cursor-pointer hover:bg-[#004580] whitespace-nowrap shrink-0"
              >
                <Calendar className="w-3.5 h-3.5 text-white shrink-0" />
                <span className="hidden xs:inline text-white font-bold whitespace-nowrap">Schedule </span>
                <span className="text-white font-bold whitespace-nowrap">Visit</span>
              </button>

              {/* Mobile Menu Button (Hamburger) */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-1.5 sm:p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-[#005DAA] hover:bg-slate-200 transition cursor-pointer shrink-0"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="px-3 py-2 rounded-lg bg-[#005DAA]/5 border border-[#005DAA]/20 text-xs text-[#004580] font-semibold flex items-center gap-2">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="truncate">{userProjects[0]?.reraId || 'TS-RERA Sanctioned Layouts'}</span>
            </div>

            {showViewToggle && setViewMode && (
              <div className="flex items-center gap-1 p-1 rounded-full bg-slate-100 border border-slate-200 mb-2">
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('website');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex-1 py-1.5 rounded-full text-xs font-bold transition text-center cursor-pointer ${
                    viewMode === 'website' ? 'bg-[#005DAA] text-white shadow-xs' : 'text-slate-600'
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
                    viewMode === 'mobile' ? 'bg-[#005DAA] text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  📱 Mobile Card (vCard)
                </button>
              </div>
            )}
            <nav className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
              <a 
                href="#home" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-[#005DAA]/10 hover:text-[#005DAA] transition flex items-center gap-1.5"
              >
                <span>Home</span>
              </a>
              <a 
                href="#projects" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-[#005DAA]/10 hover:text-[#005DAA] transition flex items-center justify-between"
              >
                <span>Projects</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#005DAA]/10 text-[#004580]">
                  {userProjects.length}
                </span>
              </a>
              <a 
                href="#site-gallery" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-[#005DAA]/10 hover:text-[#005DAA] transition flex items-center gap-1.5"
              >
                <span>Site Gallery</span>
              </a>
              <a 
                href="#videos" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-[#005DAA]/10 hover:text-[#005DAA] transition flex items-center gap-1.5"
              >
                <Film className="w-3.5 h-3.5 text-rose-500" />
                <span>Drone &amp; Reels</span>
              </a>
              <a 
                href="#tools" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-[#005DAA]/10 hover:text-[#005DAA] transition flex items-center gap-1.5"
              >
                <span>EMI &amp; Tools</span>
              </a>
              <a 
                href="#why-us" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-[#005DAA]/10 hover:text-[#005DAA] transition flex items-center gap-1.5"
              >
                <span>Why Us</span>
              </a>
              <a 
                href="#reviews" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-[#005DAA]/10 hover:text-[#005DAA] transition flex items-center gap-1.5"
              >
                <span>Reviews</span>
              </a>
              <a 
                href="#about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-[#005DAA]/10 hover:text-[#005DAA] transition flex items-center gap-1.5"
              >
                <span>About</span>
              </a>
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-[#005DAA]/10 hover:text-[#005DAA] transition flex items-center gap-1.5"
              >
                <span>Contact</span>
              </a>
            </nav>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsQrModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  <QrCode className="w-3.5 h-3.5 text-amber-400" />
                  <span>Scan QR Code</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleVcfDownload();
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-white" />
                  <span>Save vCard</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSiteVisitModalOpen(true);
                }}
                style={{ backgroundColor: '#005DAA', color: '#ffffff' }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs text-white shadow-xs cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-white" />
                <span>Schedule Site Visit</span>
              </button>
              {profile.phone && (
                <a
                  href={`tel:${profile.phone}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#005DAA]" />
                  <span>Call {profile.phone}</span>
                </a>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ─────────────────────────────────────────────────────────────
          3. HERO SECTION (Nest Infra Signature Headline & Backdrop)
      ───────────────────────────────────────────────────────────── */}
      <section id="home" className={`relative ${isMockup ? 'pt-3 sm:pt-6 pb-5 sm:pb-8' : 'pt-10 sm:pt-20 pb-14 sm:pb-24'} overflow-hidden bg-gradient-to-b from-[#EBF4FA] via-white to-slate-50 border-b border-slate-200`}>
        
        {/* Ambient Real Estate Backdrop */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 right-1/4 w-[700px] h-[500px] bg-[#005DAA]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-[500px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl" />
        </div>

        <div className={`max-w-7xl mx-auto ${isMockup ? 'px-2' : 'px-4 sm:px-6 lg:px-8'} relative z-10`}>
          <div className={`text-center max-w-5xl mx-auto ${isMockup ? 'space-y-2 sm:space-y-3' : 'space-y-4 sm:space-y-6'}`}>
            
            {/* Unified Luxury Real Estate Developer Trust Badge */}
            <div className="flex items-center justify-center pt-0.5 sm:pt-1">
              <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-white/95 border border-[#005DAA]/25 shadow-md backdrop-blur-md max-w-full">
                <div className="relative w-7 h-7 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-[#005DAA]/30 shrink-0 bg-slate-100 shadow-2xs">
                  {profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.company || profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-[#005DAA] to-sky-500 text-white flex items-center justify-center font-bold text-xs">
                      {(profile.company || profile.name || 'RE').slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <span className="absolute bottom-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 border border-white" />
                </div>
                <div className="text-left flex flex-col justify-center min-w-0">
                  <div className="flex items-center gap-1 min-w-0">
                    <span className="text-[11px] sm:text-sm font-extrabold text-slate-900 tracking-tight leading-none truncate">
                      {profile.company || profile.name || 'Skyline Builders & Developers'}
                    </span>
                    <BadgeCheck className="w-3.5 h-3.5 text-[#005DAA] shrink-0" />
                  </div>
                  <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5 text-[9px] sm:text-[11px] font-bold text-[#005DAA]">
                    <ShieldCheck className="w-3 h-3 shrink-0" />
                    <span className="truncate">{displayRera}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-emerald-700 font-semibold truncate">{profile.sectionData?.realEstate?.trackRecordYears || '18+ Years'} Legal Track Record</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="font-sans text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.18] px-1">
              Building Generational Wealth Through{' '}
              <span className="text-[#005DAA] block sm:inline font-black">
                Prime Real Estate.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="font-sans text-xs sm:text-base lg:text-lg leading-relaxed text-slate-600 max-w-3xl mx-auto px-1">
              {profile.company || profile.name || 'Premier Developers'} presenting{' '}
              <strong className="text-slate-900 font-bold">{featuredProjectTitle}</strong> —{' '}
              <strong className="text-slate-900 font-bold">{featuredPropertyType}</strong> in {featuredLocation} with 100% verified approvals, world-class amenities, and high capital appreciation.
            </p>

            {/* Location Address Strip */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold shadow-xs max-w-full">
                <MapPin className="w-3.5 h-3.5 text-[#005DAA] shrink-0" />
                <span className="truncate">{profile.address || `${userCity} Growth Corridor, Telangana`}</span>
              </div>
            </div>

            {/* ─────────────────────────────────────────────────────────────
                PREMIER ARCHITECTURAL SHOWCASE CARD (Hero Centerpiece)
            ───────────────────────────────────────────────────────────── */}
            <div className="pt-4 sm:pt-6 max-w-4xl mx-auto w-full">
              <div className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-2xl transition-all duration-300 hover:shadow-3xl">
                {/* Top Image Showcase with Gradient Overlays */}
                <div className={`relative ${isMockup ? 'h-52 sm:h-64' : 'h-64 sm:h-80 md:h-96'} w-full overflow-hidden bg-slate-900`}>
                  <img
                    src={userProjects[0]?.imageUrl || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'}
                    alt={featuredProjectTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 sm:top-4 inset-x-3 sm:inset-x-4 flex items-center justify-between gap-2 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md text-white border border-white/20 text-[11px] sm:text-xs font-bold shadow-lg">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{userProjects[0]?.reraId || displayRera}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-emerald-500 text-white text-[11px] sm:text-xs font-extrabold shadow-lg">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                      <span>{userProjects[0]?.status || 'Under Construction'}</span>
                    </span>
                  </div>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-6 text-left z-10 space-y-1 text-white">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#005DAA] text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider">
                        {featuredPropertyType}
                      </span>
                      <span className="text-[11px] sm:text-xs font-semibold text-slate-200 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#005DAA]" />
                        {featuredLocation}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-2xl md:text-3xl font-black text-white tracking-tight drop-shadow-md">
                      {featuredProjectTitle}
                    </h3>
                  </div>
                </div>

                {/* Card Bottom Highlights Bar */}
                <div className="p-3.5 sm:p-5 md:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 text-left">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Investment Range</span>
                      <span className="text-sm sm:text-base md:text-lg font-black text-[#005DAA]">{userProjects[0]?.priceDisplay || '₹ 1.85 Cr - ₹ 3.45 Cr'}</span>
                    </div>
                    <div className="h-8 w-px bg-slate-300 hidden sm:block" />
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Configurations</span>
                      <span className="text-xs sm:text-sm font-bold text-slate-800">{userProjects[0]?.bhkTypes?.[0] || '3 & 4 BHK Sky Residences'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsSiteVisitModalOpen(true)}
                      style={{ backgroundColor: '#005DAA', color: '#ffffff' }}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-white font-bold text-xs shadow-md hover:bg-[#004580] transition active:scale-95 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-white" />
                      <span>Book Site Visit</span>
                    </button>
                    <a
                      href={`https://wa.me/${cleanPhone || '919876543210'}?text=${encodeURIComponent(`Hi, please share the official brochure and floor plans for ${featuredProjectTitle}.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition active:scale-95 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-white" />
                      <span>Brochure &amp; Plans</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className={`flex ${isMockup ? 'flex-col sm:flex-row gap-2' : 'flex-col sm:flex-row gap-3'} items-center justify-center pt-4`}>
              <a
                href="#projects"
                style={{ backgroundColor: '#005DAA', color: '#ffffff' }}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 ${isMockup ? 'px-4 py-2.5 text-xs' : 'px-7 py-3.5 text-sm sm:text-base'} rounded-2xl text-white font-black shadow-lg hover:bg-[#004580] transition-transform active:scale-98 cursor-pointer`}
              >
                <span className="text-white font-extrabold">Explore All {userProjects.length > 0 ? userProjects.length : '4'} Projects</span>
                <ChevronRight className="w-4 h-4 text-white" />
              </a>

              <button
                onClick={() => setIsSiteVisitModalOpen(true)}
                style={{ backgroundColor: '#ffffff', color: '#0f172a', borderColor: '#cbd5e1' }}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 ${isMockup ? 'px-4 py-2.5 text-xs' : 'px-7 py-3.5 text-sm sm:text-base'} rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 hover:border-[#005DAA] text-slate-900 font-bold shadow-xs transition cursor-pointer`}
              >
                <Calendar className="w-4 h-4 text-[#005DAA]" />
                <span>Schedule VIP Site Tour</span>
              </button>

              <a
                href="#videos"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 ${isMockup ? 'px-4 py-2.5 text-xs' : 'px-6 py-3.5 text-sm sm:text-base'} rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold shadow-xs transition cursor-pointer`}
              >
                <Film className="w-4 h-4 text-rose-500" />
                <span>4K Drone Tours</span>
              </a>
            </div>

            {/* Developer Sales Desk & Direct Connect Bar */}
            <div className="pt-3 w-full max-w-4xl mx-auto">
              <div className="p-3 sm:p-4 rounded-2xl bg-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Developer Sales Desk</span>
                    <span className="text-xs sm:text-sm font-extrabold text-white">Direct Advisory &amp; RERA Booking Desk</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 w-full sm:w-auto">
                  <a
                    href={`tel:${cleanCallNumber || '+919876543210'}`}
                    onClick={() => trackAction('call_hero_click')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#10B981] hover:bg-emerald-600 text-white font-bold text-xs shadow transition active:scale-95 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Sales</span>
                  </a>
                  <a
                    href={`https://wa.me/${cleanPhone || '919876543210'}?text=${encodeURIComponent(`Hi ${profile.name || profile.company || 'Team'}, I am inquiring regarding your luxury properties.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackAction('whatsapp_hero_click')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#25D366] hover:bg-emerald-500 text-white font-bold text-xs shadow transition active:scale-95 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profile.address || `${profile.company || profile.name} ${userCity}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackAction('directions_hero_click')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition active:scale-95 cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 text-sky-400" />
                    <span className="hidden xs:inline">Directions</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleVcfDownload}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition active:scale-95 cursor-pointer"
                    title="Save Developer Contact to Phone"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>Save Contact</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsQrModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition active:scale-95 cursor-pointer"
                    title="Scan QR Code"
                  >
                    <QrCode className="w-3.5 h-3.5 text-amber-400" />
                    <span>QR</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 4 Trust Counters Row (Developer Credentials) */}
            <div className="pt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-4 hover:border-[#005DAA]/40 transition">
                <div className="w-12 h-12 rounded-xl bg-[#005DAA]/10 text-[#005DAA] flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-black text-2xl sm:text-3xl text-slate-900">
                    {profile.sectionData?.realEstate?.deliveredProjects || '18+'}
                  </div>
                  <div className="text-xs text-slate-600 font-semibold">Delivered Projects</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-4 hover:border-[#005DAA]/40 transition">
                <div className="w-12 h-12 rounded-xl bg-[#005DAA]/10 text-[#005DAA] flex items-center justify-center font-bold">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-black text-2xl sm:text-3xl text-slate-900">
                    {profile.sectionData?.realEstate?.developedAcres || '450+'}
                  </div>
                  <div className="text-xs text-slate-600 font-semibold">Developed Acres</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-4 hover:border-emerald-500/40 transition">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-black text-2xl sm:text-3xl text-slate-900">
                    {profile.sectionData?.realEstate?.happyFamilies || '2,400+'}
                  </div>
                  <div className="text-xs text-slate-600 font-semibold">Happy Families</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-4 hover:border-emerald-500/40 transition">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-black text-2xl sm:text-3xl text-emerald-700">
                    {profile.sectionData?.realEstate?.clearTitleRating || '100%'}
                  </div>
                  <div className="text-xs text-slate-600 font-semibold">Clear Title Rating</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. QUICK PROPERTY FINDER & CORRIDOR FILTER
      ───────────────────────────────────────────────────────────── */}
      <section id="finder" className="py-10 bg-white border-b border-slate-200 relative -mt-8 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#005DAA]/20 shadow-xl space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#005DAA] animate-ping" />
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900">
                  Quick Property Finder &amp; Corridor Filter
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedCorridor('all');
                  setSelectedCategory('all');
                  setSelectedBudget('all');
                  setSelectedStatus('all');
                  setActiveTab('all');
                }}
                className="text-xs text-slate-500 hover:text-[#005DAA] font-bold flex items-center gap-1 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              
              {/* Field 1: Corridor */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#005DAA]" />
                  <span>Growth Corridor</span>
                </label>
                <select
                  value={selectedCorridor}
                  onChange={(e) => setSelectedCorridor(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:border-[#005DAA]"
                >
                  <option value="all">All Growth Corridors & Micro-Markets</option>
                  {Array.from(new Set(userProjects.map(p => p.location.split(',')[0].trim()).filter(Boolean))).map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                  <option value="Financial District">Financial District / Kokapet</option>
                  <option value="Hitec City">Hitec City / Madhapur</option>
                  <option value="Tellapur">Tellapur / Mokila Corridor</option>
                  <option value="Shamshabad">Shamshabad Airport Zone</option>
                </select>
              </div>

              {/* Field 2: Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-[#005DAA]" />
                  <span>Property Category</span>
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:border-[#005DAA]"
                >
                  <option value="all">All Property Types</option>
                  <option value="Apartments">Luxury High-Rise Apartments</option>
                  <option value="Open Plots">DTCP / HMDA Open Plots</option>
                  <option value="Villas">Luxury Gated Villas</option>
                  <option value="Farmlands">Managed Farm Estates</option>
                  <option value="Commercial">Commercial Retail / Hub</option>
                </select>
              </div>

              {/* Field 3: Budget */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <IndianRupee className="w-3.5 h-3.5 text-[#005DAA]" />
                  <span>Investment Budget</span>
                </label>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:border-[#005DAA]"
                >
                  <option value="all">Any Budget</option>
                  <option value="under-25">Under ₹25 Lakhs</option>
                  <option value="25-50">₹25 Lakhs - ₹50 Lakhs</option>
                  <option value="50-150">₹50 Lakhs - ₹1.5 Crore</option>
                  <option value="above-150">Above ₹1.5 Crore</option>
                </select>
              </div>

              {/* Field 4: Status */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#005DAA]" />
                  <span>Project Status</span>
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:border-[#005DAA]"
                >
                  <option value="all">Any Status</option>
                  <option value="Ready for Construction">Ready for Construction</option>
                  <option value="Under Construction">Under Construction</option>
                  <option value="Ready to Move">Ready for Handover</option>
                  <option value="Pre-Launch">Upcoming Pre-Launch</option>
                </select>
              </div>

              {/* Search Button */}
              <div>
                <a
                  href="#projects"
                  style={{ backgroundColor: '#005DAA', color: '#ffffff' }}
                  className="w-full py-3.5 px-4 rounded-xl text-white font-black text-xs sm:text-sm tracking-wide shadow-md hover:bg-[#004580] transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Search className="w-4 h-4 text-white" />
                  <span className="text-white font-bold">Search Layouts</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. CURATED PROJECTS SHOWCASE (Nest Infra Card Design)
      ───────────────────────────────────────────────────────────── */}
      <section id="projects" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#005DAA]/10 border border-[#005DAA]/30 text-[#004580] text-xs font-bold uppercase tracking-wider">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#005DAA]" />
              <span>Curated Real Estate Portfolio</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900">
              Prime Gated Townships &amp;{' '}
              <span style={{ color: '#005DAA' }} className="text-[#005DAA]">Approved Developments</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-600">
              Every project undergoes rigorous legal diligence with 100% clear titles, bank loan pre-approvals, and TS-RERA / HMDA / DTCP registrations.
            </p>
          </div>

          {/* Project Category Filter Pills */}
          <div className="flex justify-center flex-wrap gap-2 pb-10">
            {['all', ...Array.from(new Set(userProjects.map(p => p.propertyType).filter(Boolean)))].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                style={{
                  backgroundColor: activeTab === cat ? '#005DAA' : '#ffffff',
                  color: activeTab === cat ? '#ffffff' : '#334155'
                }}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer shadow-xs border ${
                  activeTab === cat
                    ? 'border-[#005DAA] shadow-md'
                    : 'border-slate-200 hover:text-[#005DAA] hover:border-[#005DAA]/40'
                }`}
              >
                {cat === 'all'
                  ? `All (${userProjects.length}) Projects`
                  : cat === 'Open Plots'
                  ? 'Gated Open Plots'
                  : cat === 'Apartments'
                  ? 'Luxury Apartments'
                  : cat === 'Villas'
                  ? 'Gated Villas'
                  : cat === 'Commercial'
                  ? 'Commercial Hubs'
                  : cat === 'Farmlands'
                  ? 'Managed Farmlands'
                  : cat}
              </button>
            ))}
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-[#005DAA]/60 transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Photo Banner with Tags */}
                  <div 
                    onClick={() => {
                      setActiveProject(project);
                      setActiveGalleryImageIndex(0);
                      setModalTab('gallery');
                      setIsFloorPlanModalOpen(true);
                    }}
                    className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900 cursor-pointer"
                  >
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/30" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide shadow-sm bg-[#005DAA] text-white">
                        {project.featuredTags[0] || (project.propertyType === 'Apartments' ? 'RERA Approved Residences' : project.propertyType === 'Villas' ? 'Gated Villa Sanctuary' : project.propertyType === 'Commercial' ? 'Grade-A Commercial Suites' : 'RERA Approved Layout')}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-white/20 text-[10px] font-medium text-white">
                        {project.carpetAreaRange}
                      </span>
                    </div>

                    {/* Photo count indicator */}
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveProject(project);
                        setActiveGalleryImageIndex(0);
                        setModalTab('gallery');
                        setIsFloorPlanModalOpen(true);
                      }}
                      className="absolute top-3 right-3 cursor-pointer"
                    >
                      <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-sm border border-[#005DAA]/40 text-[11px] font-bold text-slate-200 flex items-center gap-1 shadow-sm hover:bg-[#005DAA] transition-colors">
                        <span>📸</span>
                        <span>{project.galleryUrls.length} Photos</span>
                      </span>
                    </div>

                    {/* Bottom overlay title & price */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                      <div>
                        <div className="text-[10px] text-slate-200 uppercase font-semibold drop-shadow-sm">Starting From</div>
                        <div className="font-black text-base sm:text-xl text-white drop-shadow-md">
                          {project.priceDisplay}
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-900 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md shrink-0 shadow-sm">
                        {project.pricePerSqFt}
                      </span>
                    </div>
                  </div>

                  {/* Project Details Content */}
                  <div className="p-5 space-y-3.5">
                    <div>
                      <h3 className="font-bold text-xl text-slate-900 group-hover:text-[#005DAA] transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 line-clamp-1">
                        <MapPin className="w-3.5 h-3.5 text-[#005DAA] shrink-0" />
                        <span>{project.location}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Specifications row */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-600 font-medium">
                      <div className="flex items-center gap-1.5 truncate">
                        <Maximize2 className="w-3.5 h-3.5 text-[#005DAA] shrink-0" />
                        <span className="truncate">{project.bhkTypes.join(', ')}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <Route className="w-3.5 h-3.5 text-[#005DAA] shrink-0" />
                        <span className="truncate">Wide Finished CC Roads with Kerb Markings</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveProject(project);
                      setActiveGalleryImageIndex(0);
                      setModalTab('gallery');
                      setIsFloorPlanModalOpen(true);
                    }}
                    style={{ backgroundColor: '#EBF4FA', color: '#004580', borderColor: '#93c5fd' }}
                    className="w-full py-2.5 px-3 rounded-lg border font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer hover:bg-blue-100 active:scale-98"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#005DAA]" />
                    <span>Explore &amp; Gallery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWhatsAppInquiry(project.title, `Price: ${project.priceDisplay}`)}
                    style={{ backgroundColor: '#059669', color: '#ffffff' }}
                    className="w-full py-2.5 px-3 rounded-lg hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-white" />
                    <span className="text-white">WhatsApp Inquiry</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5B. GUIDED SITE VISITS & ADVISORY PACKAGES (From Profile Studio)
      ───────────────────────────────────────────────────────────── */}
      {servicesList.length > 0 && (
        <section id="advisory-services" className="py-20 bg-white border-b border-slate-200 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#005DAA]/10 text-[#004580] text-xs font-bold uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5 text-[#005DAA]" />
                <span>Site Inspections &amp; Advisory Services</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-slate-900">
                Scheduled Site Visits &amp; Investment Advisory
              </h3>
              <p className="text-sm text-slate-600">
                Experience our ventures in person with chauffeured pickup assistance, master layout reviews, and statutory title diligence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesList.map((srv, sIdx) => (
                <div
                  key={srv.id || sIdx}
                  className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-[#005DAA]/50 transition shadow-xs hover:shadow-lg flex flex-col justify-between"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#005DAA]/10 text-[#004580]">
                        {srv.category || 'Site Inspection'}
                      </span>
                      {srv.price === 0 ? (
                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-black uppercase border border-emerald-200">
                          Complimentary
                        </span>
                      ) : (
                        <span className="text-sm font-black text-slate-900">
                          ₹{srv.price.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">{srv.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{srv.description}</p>
                  </div>
                  <div className="pt-5 mt-5 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                      <span>⏱</span>
                      <span>{srv.durationMinutes || 60} Mins</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const msg = `Hi ${profile.name || profile.company || 'Team'}, I would like to book a site visit/session for "${srv.title}". Please confirm available slots.`;
                        window.open(`https://wa.me/${cleanPhone || '919876543210'}?text=${encodeURIComponent(msg)}`, '_blank');
                      }}
                      className="px-4 py-2 rounded-xl bg-[#005DAA] hover:bg-[#004580] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Car className="w-3.5 h-3.5" />
                      <span>Book on WhatsApp</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          6. BHARAT FUTURE CITY GROWTH ANALYSIS & INFRASTRUCTURE
      ───────────────────────────────────────────────────────────── */}
      <section id="future-city-hub" className="py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#005DAA]/10 border border-[#005DAA]/20 text-[#004580] text-xs font-black uppercase tracking-wider shadow-xs">
              <Sparkles className="w-4 h-4 text-[#005DAA]" />
              <span>Strategic Infrastructure &amp; Growth Analysis</span>
            </div>
            <h2 className="font-black text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
              Why {userProjects[0]?.location?.split(',')[0] || userCity || 'Prime Growth Corridor'} is {userCity || 'Hyderabad'}&apos;s{' '}
              <span style={{ color: '#005DAA' }} className="text-[#005DAA]">
                #1 Investment Destination
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover the high-growth infrastructure corridors, arterial expressways, and economic hubs accelerating real estate appreciation around our landmark projects.
            </p>
          </div>

          {/* 6 Infrastructure Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-[#005DAA]/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xs hover:shadow-xl flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-[#005DAA]/10 group-hover:border-[#005DAA]/30 transition shadow-xs">
                    <Route className="w-6 h-6 text-[#005DAA]" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-100 group-hover:bg-[#005DAA]/10 border border-slate-200 group-hover:border-[#005DAA]/30 text-[11px] font-bold text-slate-800 group-hover:text-[#004580] transition">
                    Rapid Transit
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#005DAA] transition">
                    High-Speed Arterial Expressways &amp; Radial Corridors
                  </h3>
                  <div className="text-xs font-semibold text-[#005DAA] mt-0.5">Signal-Free Urban Commute</div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                    Direct access to sanctioned wide expressways and master-plan radial corridors connecting key commercial clusters to outer transport rings within minutes.
                  </p>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-[#005DAA]">
                <span>Direct Site Advantage</span>
                <ArrowUpRight className="w-4 h-4 text-[#005DAA]" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-[#005DAA]/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xs hover:shadow-xl flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-emerald-50 group-hover:border-emerald-300 transition shadow-xs">
                    <Zap className="w-6 h-6 text-emerald-600" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-100 group-hover:bg-emerald-50 border border-slate-200 text-[11px] font-bold text-slate-800 transition">
                    High Growth
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-emerald-700 transition">
                    IT &amp; Innovation Hubs Ecosystem
                  </h3>
                  <div className="text-xs font-semibold text-[#005DAA] mt-0.5">High-Tech Employment Corridors</div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                    Proximity to premier technology parks, corporate offices, and AI data center clusters creating tens of thousands of high-paying jobs and strong rental yields.
                  </p>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-[#005DAA]">
                <span>Direct Site Advantage</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-[#005DAA]/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xs hover:shadow-xl flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-[#005DAA]/10 transition shadow-xs">
                    <GraduationCap className="w-6 h-6 text-[#005DAA]" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-800 transition">
                    Social Hub
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#005DAA] transition">
                    Premier Universities &amp; Healthcare Hubs
                  </h3>
                  <div className="text-xs font-semibold text-[#005DAA] mt-0.5">World-Class Social Infrastructure</div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                    Surrounded by top-tier international schools, multispecialty hospitals, and academic campuses offering superior family living convenience and high civic value.
                  </p>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-[#005DAA]">
                <span>Direct Site Advantage</span>
                <ArrowUpRight className="w-4 h-4 text-[#005DAA]" />
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-[#005DAA]/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xs hover:shadow-xl flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-indigo-50 transition shadow-xs">
                    <Plane className="w-6 h-6 text-indigo-600" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-800 transition">
                    Global Access
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-700 transition">
                    International Airport &amp; Transit Hubs
                  </h3>
                  <div className="text-xs font-semibold text-[#005DAA] mt-0.5">Fast Signal-Free Terminal Commute</div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                    Seamless highway commute to Rajiv Gandhi International Airport and major public transit interchanges, making this a top choice for NRIs and executives.
                  </p>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-[#005DAA]">
                <span>Direct Site Advantage</span>
                <ArrowUpRight className="w-4 h-4 text-indigo-600" />
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-[#005DAA]/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xs hover:shadow-xl flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-slate-100 transition shadow-xs">
                    <Building className="w-6 h-6 text-slate-700" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-800 transition">
                    Enterprise
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-slate-800 transition">
                    Industrial SEZs &amp; Manufacturing Belts
                  </h3>
                  <div className="text-xs font-semibold text-[#005DAA] mt-0.5">High-Growth Industrial Nodes</div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                    Operational industrial corridors featuring semiconductor units, electronics manufacturing, aerospace facilities, and clean logistics parks.
                  </p>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-[#005DAA]">
                <span>Direct Site Advantage</span>
                <ArrowUpRight className="w-4 h-4 text-slate-700" />
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-[#005DAA]/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xs hover:shadow-xl flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-emerald-50 transition shadow-xs">
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-800 transition">
                    Ring Expressways
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-emerald-700 transition">
                    Outer Ring &amp; Regional Ring Expressways
                  </h3>
                  <div className="text-xs font-semibold text-[#005DAA] mt-0.5">Mega Multi-Modal Transit Links</div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                    Direct interchange access to major orbital expressways and high-capacity corridors, unlocking exponential land value and commercial urbanization.
                  </p>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-[#005DAA]">
                <span>Direct Site Advantage</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
              </div>
            </div>

          </div>

          {/* Historical Land Appreciation Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 rounded-3xl p-6 sm:p-10 border border-[#005DAA]/40 text-white shadow-2xl space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-widest mb-1.5">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span>Historical Appreciation &amp; Future Projections</span>
                </div>
                <h3 className="font-black text-2xl sm:text-3xl text-white">
                  {userProjects[0]?.location?.split(',')[0] || 'Prime Real Estate'} Valuation Surge
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                  Track the proven capital appreciation of verified clear-title properties in {userProjects[0]?.location || userCity} backed by ongoing infrastructure and economic expansion.
                </p>
              </div>
              <div className="px-5 py-3 rounded-2xl bg-[#005DAA]/30 border border-[#005DAA]/50 text-white text-center shrink-0">
                <div className="text-xs uppercase font-bold text-slate-300">Expected 3-Yr ROI</div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400">75% - 95%</div>
              </div>
            </div>

            {/* 5 Year Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="p-4 sm:p-5 rounded-2xl border bg-white/5 border-white/10 text-slate-200">
                <div className="text-xs font-mono text-amber-300 font-bold">2020</div>
                <div className="font-black text-xl sm:text-2xl mt-1 text-white">Base Price<span className="text-[10px] font-normal text-slate-400 block sm:inline sm:ml-1">Early Entry</span></div>
                <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">Pre-infrastructure announcement phase</p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border bg-white/5 border-white/10 text-slate-200">
                <div className="text-xs font-mono text-amber-300 font-bold">2022</div>
                <div className="font-black text-xl sm:text-2xl mt-1 text-white">+40% Surge<span className="text-[10px] font-normal text-slate-400 block sm:inline sm:ml-1">Growth Wave</span></div>
                <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">Statutory sanctioning &amp; road widening</p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border bg-[#005DAA]/30 border-[#005DAA] text-white shadow-lg ring-2 ring-[#005DAA]/50">
                <div className="text-xs font-mono text-amber-300 font-bold">2024 - 2025</div>
                <div className="font-black text-xl sm:text-2xl mt-1 text-white">{userProjects[0]?.pricePerSqFt || '₹ 8,999/sq.ft'}<span className="text-[10px] font-normal text-slate-400 block sm:inline sm:ml-1">Current</span></div>
                <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">Current Launch Phase ({userProjects[0]?.title || 'Featured'})</p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border bg-white/5 border-white/10 text-slate-200">
                <div className="text-xs font-mono text-amber-300 font-bold">2026 (Est.)</div>
                <div className="font-black text-xl sm:text-2xl mt-1 text-white">+35% Est.<span className="text-[10px] font-normal text-slate-400 block sm:inline sm:ml-1">Handover</span></div>
                <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">Arterial expressway &amp; transit execution</p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border bg-white/5 border-white/10 text-slate-200">
                <div className="text-xs font-mono text-amber-300 font-bold">2028 (Est.)</div>
                <div className="font-black text-xl sm:text-2xl mt-1 text-white">+75% ROI<span className="text-[10px] font-normal text-slate-400 block sm:inline sm:ml-1">Maturity</span></div>
                <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">Full tech hub &amp; satellite city operations</p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Clear Legal Titles, RERA Approvals &amp; Documentation Handover</span>
              </div>
              <button
                onClick={() => handleWhatsAppInquiry('Property Valuation & ROI Report', 'Appreciation Forecast Sheet')}
                className="px-5 py-2.5 rounded-xl bg-[#005DAA] hover:bg-[#004580] text-white font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Download Valuation Report</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. SITE GALLERY (Nest Infra Exact On-Site Visuals)
      ───────────────────────────────────────────────────────────── */}
      <section id="site-gallery" className="py-20 bg-slate-950 text-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#005DAA]/30 text-amber-300 text-xs font-bold uppercase tracking-wider border border-[#005DAA]/50">
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Ground Reality &amp; Photo Showcase</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black text-white">
              On-Site Development &amp; Architectural Views
            </h3>
            <p className="text-sm text-slate-400">
              High-resolution photography capturing finished CC roads, entrance archways, perimeter walls, and night illumination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {effectiveGallery.map((galleryItem, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxImage({ url: galleryItem.img, title: galleryItem.title, desc: galleryItem.desc })}
                className="group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-[#005DAA] transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                    <img
                      src={galleryItem.img}
                      alt={galleryItem.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />
                    
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span className="px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md border border-[#005DAA]/40 text-[10px] font-bold text-amber-300 shadow-md">
                        {galleryItem.tag}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold shadow-md bg-emerald-600 text-white">
                        {galleryItem.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                      {galleryItem.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {galleryItem.desc}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-amber-400 font-bold group-hover:text-amber-300">
                  <span>View Full Photo &amp; Zoom</span>
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7B. 4K AERIAL DRONE SURVEYS, YOUTUBE WALKTHROUGHS & INSTAGRAM REELS
      ───────────────────────────────────────────────────────────── */}
      {effectiveVideos.length > 0 && (
        <section id="videos" className="py-20 bg-[#0B132B] text-white border-b border-slate-800 scroll-mt-20 relative overflow-hidden">
          {/* Ambient Lighting Gradients */}
          <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-[#005DAA]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-[500px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#005DAA]/30 text-amber-300 text-xs font-bold uppercase tracking-wider border border-[#005DAA]/50">
                <Film className="w-3.5 h-3.5 text-amber-400" />
                <span>4K Aerial Drone Surveys &amp; Video Walkthroughs</span>
              </div>
              <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Experience On-Site Drone Tours &amp; Reels
              </h3>
              <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
                Watch full 4K aerial drone flights, model residence architectural tours, and verified ground-level construction reels before booking your guided site visit.
              </p>
            </div>

            {/* Video Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setVideoFilter('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  videoFilter === 'all'
                    ? 'bg-[#005DAA] text-white shadow-md'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                All Videos ({effectiveVideos.length})
              </button>
              <button
                type="button"
                onClick={() => setVideoFilter('youtube')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  videoFilter === 'youtube'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <SocialIcon platform="youtube" size={14} className="text-red-400" />
                <span>YouTube 4K Tours ({effectiveVideos.filter(v => v.type === 'youtube' || (!v.type && v.url?.includes('youtu'))).length})</span>
              </button>
              <button
                type="button"
                onClick={() => setVideoFilter('instagram')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  videoFilter === 'instagram'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <SocialIcon platform="instagram" size={14} className="text-pink-400" />
                <span>Instagram Reels ({effectiveVideos.filter(v => v.type === 'instagram' || v.url?.includes('instagram')).length})</span>
              </button>
            </div>

            {/* Compact Video Display: Separated & Sized for YouTube and Instagram */}
            {(() => {
              const youtubeVideos = effectiveVideos.filter(v => v.type === 'youtube' || (!v.type && v.url?.includes('youtu')));
              const instagramVideos = effectiveVideos.filter(v => v.type === 'instagram' || v.url?.includes('instagram'));
              const directVideos = effectiveVideos.filter(v => v.type === 'direct' || (!v.type && !v.url?.includes('youtu') && !v.url?.includes('instagram')));

              const showYouTube = videoFilter === 'all' || videoFilter === 'youtube';
              const showInstagram = videoFilter === 'all' || videoFilter === 'instagram';

              return (
                <div className="space-y-10">
                  {/* 1. YouTube 4K Drone & Architectural Walkthroughs (Compact 3-Col Grid) */}
                  {showYouTube && youtubeVideos.length > 0 && (
                    <div className="space-y-4">
                      {videoFilter === 'all' && (
                        <div className="flex items-center gap-2 pb-1 border-b border-slate-800">
                          <SocialIcon platform="youtube" size={16} className="text-red-500" />
                          <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200">
                            4K Aerial Drone Tours &amp; Architectural Walkthroughs ({youtubeVideos.length})
                          </h4>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {youtubeVideos.map((vid, idx) => {
                          const embedUrl = resolveEmbedUrl(vid);
                          return (
                            <div
                              key={vid.id || `yt_${idx}`}
                              className="rounded-2xl bg-[#111A2E] border border-slate-800 overflow-hidden shadow-lg flex flex-col justify-between group hover:border-[#005DAA]/70 transition-all duration-300"
                            >
                              {/* 16:9 Compact Video Player */}
                              <div className="relative w-full aspect-video bg-black">
                                <iframe
                                  src={embedUrl}
                                  title={vid.title}
                                  className="w-full h-full border-0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  loading="lazy"
                                />
                              </div>

                              {/* Compact Card Content */}
                              <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                                <div className="space-y-1.5">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/30">
                                      4K Drone Walkthrough
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-mono">
                                      {userCity} Corridor
                                    </span>
                                  </div>
                                  <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                                    {vid.title}
                                  </h4>
                                  {vid.caption && (
                                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                                      {vid.caption}
                                    </p>
                                  )}
                                </div>

                                <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-2">
                                  <a
                                    href={vid.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 text-[11px] text-red-400 hover:text-red-300 font-bold transition"
                                  >
                                    <SocialIcon platform="youtube" size={12} className="text-red-400" />
                                    <span>Watch on YouTube</span>
                                    <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                  <button
                                    type="button"
                                    onClick={() => handleWhatsAppInquiry(vid.title, 'Inquiry from 4K Video Tour')}
                                    className="px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
                                  >
                                    <MessageCircle className="w-2.5 h-2.5" />
                                    <span>Inquire</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 2. Instagram Milestone Reels (Compact 4-Col Vertical Phone Grid) */}
                  {showInstagram && instagramVideos.length > 0 && (
                    <div className="space-y-4">
                      {videoFilter === 'all' && (
                        <div className="flex items-center gap-2 pb-1 border-b border-slate-800">
                          <SocialIcon platform="instagram" size={16} className="text-pink-500" />
                          <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200">
                            On-Site Milestone &amp; Construction Reels ({instagramVideos.length})
                          </h4>
                        </div>
                      )}

                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {instagramVideos.map((vid, idx) => (
                          <div
                            key={vid.id || `ig_${idx}`}
                            className="rounded-2xl bg-gradient-to-b from-[#1C1226]/90 via-[#0F1829]/95 to-[#080E1A] border border-pink-500/25 hover:border-pink-500/60 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between group hover:shadow-pink-500/10"
                          >
                            {/* Top Badge Strip */}
                            <div className="p-3 pb-2 flex items-center justify-between">
                              <span className="px-2 py-0.5 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-[10px] font-extrabold flex items-center gap-1">
                                <SocialIcon platform="instagram" size={11} className="text-pink-400" />
                                <span>Reel</span>
                              </span>
                              <span className="text-[10px] text-slate-500 font-mono">
                                Live On-Site
                              </span>
                            </div>

                            {/* Center Reel Preview Mockup */}
                            <a
                              href={vid.url}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-6 flex flex-col items-center justify-center text-center space-y-3 group/reel cursor-pointer"
                            >
                              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-pink-600/30 group-hover/reel:scale-110 group-hover/reel:rotate-6 transition-transform">
                                <Play className="w-5 h-5 ml-0.5 fill-white" />
                              </div>
                              <div>
                                <span className="text-[11px] font-bold text-slate-300 group-hover/reel:text-pink-300 transition block">
                                  Watch Reel on Instagram
                                </span>
                                <span className="text-[9.5px] text-slate-500 font-mono">
                                  Full HD Vertical 9:16
                                </span>
                              </div>
                            </a>

                            {/* Bottom Reel Info & Actions */}
                            <div className="p-3 pt-2 bg-slate-950/60 border-t border-slate-800/80 space-y-2">
                              <h5 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-tight">
                                {vid.title}
                              </h5>
                              {vid.caption && (
                                <p className="text-[10.5px] text-slate-400 line-clamp-1 leading-relaxed">
                                  {vid.caption}
                                </p>
                              )}
                              <div className="flex items-center gap-1.5 pt-1">
                                <a
                                  href={vid.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex-1 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-[10.5px] font-bold flex items-center justify-center gap-1 transition shadow-sm"
                                >
                                  <span>Watch Reel</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                                <button
                                  type="button"
                                  onClick={() => handleWhatsAppInquiry(vid.title, 'Inquiry from Instagram Reel')}
                                  title="WhatsApp Inquire"
                                  className="p-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 transition cursor-pointer"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3. Direct Video Files (if any) */}
                  {directVideos.length > 0 && videoFilter === 'all' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pb-1 border-b border-slate-800">
                        <Film className="w-4 h-4 text-indigo-400" />
                        <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200">
                          Direct Video Uploads ({directVideos.length})
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {directVideos.map((vid, idx) => (
                          <div
                            key={vid.id || `dir_${idx}`}
                            className="rounded-2xl bg-[#111A2E] border border-slate-800 overflow-hidden shadow-lg flex flex-col justify-between"
                          >
                            <div className="relative w-full aspect-video bg-black">
                              <video src={vid.url} controls className="w-full h-full object-cover" />
                            </div>
                            <div className="p-4 space-y-2">
                              <h4 className="text-sm font-bold text-white line-clamp-1">{vid.title}</h4>
                              {vid.caption && <p className="text-xs text-slate-400 line-clamp-2">{vid.caption}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Bottom Guided Site Visit Prompt */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#005DAA]/30 via-slate-900 to-indigo-950/40 border border-[#005DAA]/40 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center md:text-left">
                <h4 className="text-base sm:text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
                  <Car className="w-5 h-5 text-amber-400" />
                  <span>Inspect Layout Roads &amp; Dimensions In Person</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  We provide free guided site visits with chauffeured car pickup &amp; drop from your doorstep anywhere in {userCity}.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsSiteVisitModalOpen(true)}
                  style={{ backgroundColor: '#005DAA', color: '#ffffff' }}
                  className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white shadow-lg hover:bg-[#004580] transition transform hover:-translate-y-0.5 active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  Schedule Site Visit
                </button>
                <button
                  type="button"
                  onClick={() => handleWhatsAppInquiry('4K Drone Video Archives', 'Requesting HD drone footage links')}
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Videos</span>
                </button>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          8. VERIFIED BUYER REVIEWS & TESTIMONIALS (Nest Infra Style)
      ───────────────────────────────────────────────────────────── */}
      <section id="reviews" className="py-20 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#005DAA]/10 text-[#004580] text-xs font-bold uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 text-[#005DAA]" />
              <span>4.9 / 5.0 Rating • 380+ Verified Reviews</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900">
              Trusted by 2,400+ Families &amp; NRI Investors
            </h3>
            <p className="text-sm text-slate-600">
              Read authentic feedback from happy property buyers who experienced our transparent title verification and spot registration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(testimonialsList.length > 0 ? testimonialsList : defaultReviews).map((review, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-[#005DAA]/50 transition shadow-xs hover:shadow-md space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex text-amber-500 gap-1">
                    {Array.from({ length: 5 }).map((_, r) => (
                      <Star key={r} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    &quot;{review.content}&quot;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                  <div className="w-11 h-11 rounded-full overflow-hidden bg-[#005DAA]/15 border border-[#005DAA]/30 flex items-center justify-center font-bold text-[#005DAA] shrink-0">
                    {(review as any).clientAvatar ? (
                      <img src={(review as any).clientAvatar} alt={(review as any).clientName || (review as any).name} className="w-full h-full object-cover" />
                    ) : (
                      ((review as any).clientName || (review as any).name).charAt(0)
                    )}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">
                      {(review as any).clientName || (review as any).name}
                    </h5>
                    <p className="text-[10px] text-slate-500">
                      {(review as any).clientRole || (review as any).role}
                    </p>
                    <span className="text-[10px] font-semibold text-emerald-700 block">
                      ✓ Verified Buyer • {(review as any).project || userProjects[0]?.title || 'Signature Project'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. EMI & PLOT COST CALCULATOR (Nest Infra Tool)
      ───────────────────────────────────────────────────────────── */}
      <section id="tools" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#005DAA] uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5" />
              <span>Smart Financial Planning</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              Plot Cost &amp; Monthly Bank EMI Calculator
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Customize your plot dimensions, check loan eligibility, and estimate your monthly payment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-lg items-center">
            
            {/* Left Sliders */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Slider 1: Plot Size */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Plot Dimension:</span>
                  <span className="text-[#005DAA] text-sm font-mono">{plotSizeSqYds} Sq. Yards</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={600}
                  step={10}
                  value={plotSizeSqYds}
                  onChange={(e) => setPlotSizeSqYds(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#005DAA]"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>100 Sq. Yds</span>
                  <span>600 Sq. Yds</span>
                </div>
              </div>

              {/* Slider 2: Price per Sq Yd */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Rate per Sq. Yd:</span>
                  <span className="text-[#005DAA] text-sm font-mono">₹ {pricePerSqYd.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min={8000}
                  max={45000}
                  step={500}
                  value={pricePerSqYd}
                  onChange={(e) => setPricePerSqYd(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#005DAA]"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>₹ 8,000 / Yd</span>
                  <span>₹ 45,000 / Yd</span>
                </div>
              </div>

              {/* Slider 3: Down Payment */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Down Payment ({downPaymentPercent}%):</span>
                  <span className="text-[#005DAA] text-sm font-mono">₹ {plotFinance.downPayment.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={60}
                  step={5}
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#005DAA]"
                />
              </div>

              {/* Slider 4: Loan Tenure */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Loan Tenure:</span>
                  <span className="text-[#005DAA] text-sm font-mono">{loanTenureYears} Years</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={25}
                  step={1}
                  value={loanTenureYears}
                  onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#005DAA]"
                />
              </div>

            </div>

            {/* Right Output Box */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#004580] text-white text-center space-y-4 shadow-md">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                Estimated Total Plot Cost
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-white">
                ₹ {(plotFinance.totalCost / 100000).toFixed(2)} Lakhs
              </div>

              <div className="space-y-2 text-xs text-slate-200 border-y border-white/15 py-3">
                <div className="flex justify-between">
                  <span>Down Payment ({downPaymentPercent}%):</span>
                  <span className="font-bold text-amber-300">₹ {plotFinance.downPayment.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bank Loan (75%):</span>
                  <span className="font-bold">₹ {plotFinance.loanAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Bank EMI:</span>
                  <span className="font-black text-amber-300 font-mono">₹ {plotFinance.monthlyEmi.toLocaleString('en-IN')}/mo</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  const text = encodeURIComponent(
                    `Hi ${profile.name}! I calculated my plot cost on your portal.\nPlot Size: ${plotSizeSqYds} Sq.Yds\nTotal Cost: ₹${(plotFinance.totalCost / 100000).toFixed(2)} Lakhs\nExpected EMI: ₹${plotFinance.monthlyEmi.toLocaleString('en-IN')}/mo.\nPlease check my bank loan eligibility.`
                  );
                  window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
                }}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition shadow-sm cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Check Bank Loan on WhatsApp</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          10. WHY CHOOSE US (6 Value Pillars)
      ───────────────────────────────────────────────────────────── */}
      <section id="why-us" className="py-20 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#005DAA]/10 text-[#004580] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#005DAA]" />
              <span>Uncompromised Trust</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900">
              Why Investors Choose {profile.company || profile.name || 'Our Developments'}
            </h3>
            <p className="text-sm text-slate-600">
              Clear titles, strategic growth corridor locations, and hassle-free spot registration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: '100% Clear Legal Title', desc: 'Every layout comes with 30-year forensic legal audits and NALA land conversion certificates.' },
              { icon: FileText, title: 'Immediate Spot Registration', desc: 'Direct registration at the Sub-Registrar Office with Dharani e-passbook issued in your name.' },
              { icon: Building2, title: 'Bank Loan Approved', desc: 'Pre-approved home and plot loans up to 75% funding with SBI, HDFC, and leading national banks.' },
              { icon: MapPin, title: 'Strategic Growth Corridor', desc: 'Located near sanctioned 300ft expressways, regional ring roads, and rapid metro corridors.' },
              { icon: Shield, title: 'Gated 24/7 Security', desc: 'Full perimeter compound wall, grand entrance security archway, and continuous CCTV surveillance.' },
              { icon: Sparkles, title: 'High ROI Capital Growth', desc: 'Proven track record of high land appreciation delivering maximum wealth for your family.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#005DAA]/50 transition shadow-xs hover:shadow-md space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#005DAA]/10 text-[#005DAA] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          11. FOUNDER & ABOUT US SPOTLIGHT
      ───────────────────────────────────────────────────────────── */}
      <section id="about" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Founder Photo */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 sm:w-80 h-96 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-slate-200">
                <img
                  src={profile.avatarUrl || profile.coverUrl || '/kishore-profile-v2.png'}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white text-center">
                  <h4 className="text-lg font-black">{profile.name}</h4>
                  <p className="text-xs text-amber-300 font-medium">{profile.designation || 'Founder & Managing Director'}</p>
                </div>
              </div>
            </div>

            {/* Founder Message & Credentials */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#005DAA]/10 text-[#004580] text-xs font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-[#005DAA]" />
                <span>Leadership Message</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                Delivering Excellence in Real Estate for Over a Decade.
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {profile.bio || profile.sectionData?.about?.content || `At ${profile.company || profile.name}, our mission is to empower families with legally verified, high-appreciation open plots and gated residential communities. We believe every piece of land is an asset for generations.`}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <div className="font-black text-xl text-[#005DAA]">100% Legal</div>
                  <div className="text-xs text-slate-500">Forensic Due Diligence</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <div className="font-black text-xl text-[#005DAA]">0% Brokerage</div>
                  <div className="text-xs text-slate-500">Direct Developer Pricing</div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href={`https://wa.me/${cleanPhone}?text=Hi%20${encodeURIComponent(profile.name)}%2C%20I%20would%20like%20to%20connect%20regarding%20property%20investment.`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-xl bg-[#005DAA] hover:bg-[#004580] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect with Founder Desk</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          12. FREQUENTLY ASKED QUESTIONS (Accordion)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#005DAA] uppercase tracking-wider">
              <Info className="w-3.5 h-3.5" />
              <span>Buyer Clarity</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-bold text-sm text-slate-900 flex items-center justify-between gap-4 hover:text-[#005DAA]"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180 text-[#005DAA]' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          13. BOOK A FREE SITE VISIT (Complimentary Cab Form)
      ───────────────────────────────────────────────────────────── */}
      <section id="site-visit" className="py-20 bg-[#004580] text-white scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="p-8 sm:p-12 rounded-3xl bg-white text-slate-900 shadow-2xl border border-slate-200 relative">
            <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#005DAA]/10 text-[#004580] text-xs font-bold">
                <Car className="w-3.5 h-3.5 text-[#005DAA]" />
                <span>Complimentary Cab Assistance</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                Book a Free Guided Site Visit
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Inspect layout roads, plot dimensions, and nearby expressways in person with our senior project coordinator.
              </p>
            </div>

            {siteVisitSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-slate-900">Site Visit Request Received!</h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Our project coordinator will contact you on WhatsApp to confirm your vehicle timing and coordinates.
                </p>
                <button
                  onClick={() => setSiteVisitSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-[#005DAA] text-xs font-bold text-white hover:bg-[#004580]"
                >
                  Book Another Visit
                </button>
              </div>
            ) : (
              <form onSubmit={handleSiteVisitSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={siteVisitForm.name}
                      onChange={(e) => setSiteVisitForm({ ...siteVisitForm, name: e.target.value })}
                      placeholder="e.g. Vikramaditya Roy"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#005DAA]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">WhatsApp / Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={siteVisitForm.phone}
                      onChange={(e) => setSiteVisitForm({ ...siteVisitForm, phone: e.target.value })}
                      placeholder="+91 98765 44001"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#005DAA]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Select Preferred Layout</label>
                    <select
                      value={siteVisitForm.project}
                      onChange={(e) => setSiteVisitForm({ ...siteVisitForm, project: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#005DAA]"
                    >
                      {userProjects.map((p) => (
                        <option key={p.id} value={p.title}>{p.title} ({p.location})</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Transport Option</label>
                    <select
                      value={siteVisitForm.transportMode}
                      onChange={(e) => setSiteVisitForm({ ...siteVisitForm, transportMode: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#005DAA]"
                    >
                      <option value="Self Visit">Self Drive / Meet at site</option>
                      <option value="Request Free Cab Pick-up">Request Free Home Cab Pick-up &amp; Drop</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  style={{ backgroundColor: '#005DAA', color: '#ffffff' }}
                  className="w-full py-4 rounded-xl text-white font-black text-xs sm:text-sm shadow-xl shadow-[#005DAA]/20 flex items-center justify-center gap-2 hover:bg-[#004580] transition active:scale-98 cursor-pointer"
                >
                  <Car className="w-4 h-4 text-white" />
                  <span className="text-white font-bold">Confirm Free Site Visit on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </form>
            )}

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          14. EXACT NEST INFRA CORPORATE FOOTER
      ───────────────────────────────────────────────────────────── */}
      <footer id="contact" className="py-16 bg-slate-900 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
            
            {/* Column 1: Company Details & TS-RERA */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-white p-2 flex items-center justify-center border-2 border-[#005DAA]">
                  <img
                    src={profile.avatarUrl || '/kishore-profile-v2.png'}
                    alt={profile.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-base font-black text-white">{profile.company || `${profile.name} Developers`}</h4>
                  <p className="text-amber-400 text-xs font-semibold">{displayRera !== 'TS-RERA Sanctioned' ? `${displayRera}` : 'TS-RERA Regd. Developer'}</p>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                {profile.bio || profile.sectionData?.about?.content || 'Premier real estate developers offering RERA approved residential towers, luxury villas, and gated communities with 100% clear legal titles.'}
              </p>
              <div className="text-[11px] text-slate-400 space-y-1 pt-1">
                <div><strong>{profile.designation || 'Principal'}:</strong> {profile.name}</div>
                <div><strong>RERA Registration:</strong> {displayRera || userProjects[0]?.reraId || 'Verified & Approved'}</div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:col-span-3 space-y-3">
              <h5 className="text-sm font-bold text-white uppercase tracking-wider">Featured Projects</h5>
              <ul className="space-y-2 text-xs">
                <li><a href="#home" className="hover:text-[#005DAA] transition">Home</a></li>
                {userProjects.slice(0, 4).map(p => (
                  <li key={p.id}>
                    <a href="#projects" className="hover:text-[#005DAA] transition line-clamp-1">{p.title}</a>
                  </li>
                ))}
                <li><a href="#future-city-hub" className="hover:text-[#005DAA] transition">Growth Corridor Analysis</a></li>
                <li><a href="#reviews" className="hover:text-[#005DAA] transition">Buyer Reviews</a></li>
              </ul>
            </div>

            {/* Column 3: Corporate Office & Contact */}
            <div className="lg:col-span-4 space-y-3">
              <h5 className="text-sm font-bold text-white uppercase tracking-wider">Corporate Office</h5>
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#005DAA] shrink-0 mt-0.5" />
                  <span>{profile.address || `${userCity || 'Hyderabad'}, India`}</span>
                </div>
                {profile.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#005DAA] shrink-0" />
                    <a href={`tel:${profile.phone}`} className="hover:text-amber-300 font-semibold">{profile.phone}</a>
                  </div>
                )}
                {profile.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#005DAA] shrink-0" />
                    <a href={`mailto:${profile.email}`} className="hover:text-amber-300">{profile.email}</a>
                  </div>
                )}
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setIsQrModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
                  title="Scan Website QR Code"
                >
                  <QrCode className="w-3.5 h-3.5 text-amber-400" />
                  <span>View QR Code</span>
                </button>

                <button
                  onClick={handleVcfDownload}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Save .VCF</span>
                </button>

                <a
                  href={`https://wa.me/${cleanPhone}?text=Hi%20${encodeURIComponent(profile.name)}%2C%20I%20am%20inquiring%20about%20your%20open%20plots.`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Desk</span>
                </a>
              </div>
            </div>

          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} {profile.company || `${profile.name} Developers`}. All rights reserved.</p>
            <p>Powered by <Link href="/" className="text-amber-400 hover:underline">OneClickBiz Digital Platform</Link></p>
          </div>
        </div>
      </footer>

      {/* Share Modal */}
      {isShareModalOpen && (
        <ShareCardModal
          profile={profile}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}

      {/* ─────────────────────────────────────────────────────────────
          PROJECT EXPLORATION & GALLERY SHOWCASE MODAL
      ───────────────────────────────────────────────────────────── */}
      {isFloorPlanModalOpen && activeProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsFloorPlanModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl text-slate-900 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/70">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#005DAA]/10 text-[#004580]">
                    {activeProject.propertyType}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                    {activeProject.status}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {activeProject.reraId}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {activeProject.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-[#005DAA] shrink-0" />
                  <span>{activeProject.location}</span>
                  <span className="text-slate-300">•</span>
                  <span className="font-bold text-[#005DAA]">{activeProject.priceDisplay}</span>
                  <span className="text-slate-400 font-medium">({activeProject.pricePerSqFt})</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsFloorPlanModalOpen(false)}
                className="p-2.5 rounded-2xl bg-white hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors shadow-xs cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Interactive Tabs Header */}
            <div className="px-5 sm:px-6 pt-3 bg-white border-b border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
              <button
                type="button"
                onClick={() => setModalTab('gallery')}
                className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  modalTab === 'gallery'
                    ? 'border-[#005DAA] text-[#005DAA]'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>Photo Gallery ({activeProject.galleryUrls.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab('plans')}
                className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  modalTab === 'plans'
                    ? 'border-[#005DAA] text-[#005DAA]'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Floor Plans &amp; Dimensions ({activeProject.floorPlans.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab('highlights')}
                className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  modalTab === 'highlights'
                    ? 'border-[#005DAA] text-[#005DAA]'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Highlights &amp; Specs</span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab('location')}
                className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  modalTab === 'location'
                    ? 'border-[#005DAA] text-[#005DAA]'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Location Advantages</span>
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 overflow-y-auto max-h-[calc(92vh-220px)] space-y-6">
              
              {/* TAB 1: PHOTO GALLERY */}
              {modalTab === 'gallery' && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  {/* Active Featured Image with Lightbox Zoom Button */}
                  <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md group">
                    <img 
                      src={activeProject.galleryUrls[activeGalleryImageIndex] || activeProject.imageUrl} 
                      alt={activeProject.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <div className="text-white text-xs sm:text-sm font-bold drop-shadow-md">
                        <span>Photo {activeGalleryImageIndex + 1} of {activeProject.galleryUrls.length}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setLightboxImage({ 
                          url: activeProject.galleryUrls[activeGalleryImageIndex] || activeProject.imageUrl, 
                          title: activeProject.title,
                          desc: activeProject.description
                        })}
                        className="pointer-events-auto px-3.5 py-1.5 rounded-xl bg-white/90 hover:bg-white text-slate-900 text-xs font-bold shadow-lg flex items-center gap-1.5 transition active:scale-95 cursor-pointer backdrop-blur-md"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-[#005DAA]" />
                        <span>Fullscreen Zoom</span>
                      </button>
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  <div>
                    <div className="text-xs font-bold text-slate-500 mb-2.5">
                      Select photo to preview:
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                      {activeProject.galleryUrls.map((imgUrl, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveGalleryImageIndex(idx)}
                          className={`relative h-18 sm:h-22 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                            activeGalleryImageIndex === idx
                              ? 'border-[#005DAA] ring-2 ring-[#005DAA]/30 scale-102 shadow-md'
                              : 'border-slate-200 hover:border-slate-400 opacity-80 hover:opacity-100'
                          }`}
                        >
                          <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                          {activeGalleryImageIndex === idx && (
                            <div className="absolute inset-0 bg-[#005DAA]/15 flex items-center justify-center">
                              <CheckCircle2 className="w-4 h-4 text-white drop-shadow-md" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: FLOOR PLANS & LAYOUT BLUEPRINTS */}
              {modalTab === 'plans' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-xs text-[#004580] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#005DAA] shrink-0" />
                    <span>Statutory Sanctioned Architectural Blueprints &amp; Approved Plot Dimensions. Click any plan to zoom.</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeProject.floorPlans.map((fp, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 hover:border-[#005DAA]/40 transition shadow-xs flex flex-col justify-between">
                        <div className="space-y-2.5">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h5 className="text-sm font-black text-slate-900">{fp.bhk}</h5>
                              <span className="text-xs text-[#005DAA] font-extrabold">{fp.price}</span>
                            </div>
                            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#005DAA]/10 text-[#004580] font-bold">
                              {fp.facing}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100">
                            <div>
                              <span className="text-slate-400 block text-[10px] uppercase">Super Area</span>
                              <span className="font-bold text-slate-800">{fp.superArea}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px] uppercase">Carpet Area</span>
                              <span className="font-bold text-slate-800">{fp.carpetArea}</span>
                            </div>
                          </div>

                          <div 
                            className="relative h-44 w-full rounded-xl overflow-hidden bg-slate-900 cursor-pointer group"
                            onClick={() => setLightboxImage({ url: fp.imageUrl, title: `${activeProject.title} — ${fp.bhk}`, desc: `${fp.facing} | Super Area: ${fp.superArea}` })}
                          >
                            <img src={fp.imageUrl} alt={fp.bhk} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <span className="px-3 py-1.5 rounded-lg bg-white/90 text-slate-900 text-xs font-bold shadow-md flex items-center gap-1">
                                <Maximize2 className="w-3.5 h-3.5 text-[#005DAA]" />
                                <span>Click to Zoom Blueprint</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleWhatsAppInquiry(activeProject.title, `Unit: ${fp.bhk} (${fp.superArea}) - Price: ${fp.price}`)}
                          className="w-full py-2.5 rounded-xl bg-[#005DAA] hover:bg-[#004580] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Inquire Availability for {fp.bhk}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: HIGHLIGHTS & SPECIFICATIONS */}
              {modalTab === 'highlights' && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] uppercase text-slate-500 font-bold block">Status</span>
                      <span className="text-xs font-black text-slate-900">{activeProject.status}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] uppercase text-slate-500 font-bold block">Possession</span>
                      <span className="text-xs font-black text-slate-900">{activeProject.possessionDate}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] uppercase text-slate-500 font-bold block">Dimensions</span>
                      <span className="text-xs font-black text-slate-900">{activeProject.carpetAreaRange}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] uppercase text-slate-500 font-bold block">RERA Number</span>
                      <span className="text-xs font-black text-[#005DAA] truncate block">{activeProject.reraId}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-slate-900 mb-3">Project Specifications &amp; Amenities:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeProject.highlights.map((hl, hli) => (
                        <div key={hli} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-700 font-medium leading-relaxed">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-slate-900 mb-2.5">Verified Statutory Approvals:</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.featuredTags.map((tag, ti) => (
                        <span key={ti} className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: LOCATION ADVANTAGES */}
              {modalTab === 'location' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#005DAA]" />
                      <span>Prime Growth Corridor Location</span>
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {activeProject.location} — {activeProject.microMarket}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                    <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-900 block">🚗 Arterial Highway Access</span>
                      <p className="text-slate-500 text-[11px]">Seamless connection via 4-lane expressways, Outer Ring Road (ORR) junctions &amp; proposed Regional Ring Road (RRR).</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-900 block">✈️ Airport Proximity</span>
                      <p className="text-slate-500 text-[11px]">Direct signal-free corridor to Rajiv Gandhi International Airport and aerospace industrial parks.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-900 block">🏢 IT &amp; Commercial Hubs</span>
                      <p className="text-slate-500 text-[11px]">Quick transit to Financial District, Hitec City, Kokapet SEZ &amp; Pharma City corridors.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-900 block">🎓 Healthcare &amp; Universities</span>
                      <p className="text-slate-500 text-[11px]">Surrounded by multi-specialty hospitals, international schools &amp; prestigious university campuses.</p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Bottom Sticky Action Bar */}
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/90 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="hidden sm:block">
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Starting Price</span>
                <span className="text-base font-black text-slate-900">{activeProject.priceDisplay}</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    handleWhatsAppInquiry(activeProject.title, `Explore Gallery inquiry for ${activeProject.title} (${activeProject.priceDisplay})`);
                    setIsFloorPlanModalOpen(false);
                  }}
                  className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl bg-[#059669] hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span className="text-white">WhatsApp Inquiry</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsFloorPlanModalOpen(false);
                    setIsBrochureModalOpen(true);
                  }}
                  className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl bg-[#005DAA] hover:bg-[#004580] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition active:scale-95 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Brochure PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsFloorPlanModalOpen(false);
                    setIsSiteVisitModalOpen(true);
                  }}
                  className="flex-1 sm:flex-initial py-2.5 px-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
                >
                  <Car className="w-3.5 h-3.5 text-slate-700" />
                  <span>Site Visit</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Fullscreen High-Resolution Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition cursor-pointer"
              aria-label="Close fullscreen view"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-full max-h-[80vh] overflow-hidden rounded-2xl bg-black flex items-center justify-center shadow-2xl">
              <img 
                src={lightboxImage.url} 
                alt={lightboxImage.title} 
                className="max-h-[80vh] w-auto max-w-full object-contain rounded-2xl" 
              />
            </div>
            <div className="mt-3.5 text-center text-white space-y-1">
              <h4 className="text-sm sm:text-base font-bold">{lightboxImage.title}</h4>
              {lightboxImage.desc && <p className="text-xs text-slate-400 max-w-xl mx-auto">{lightboxImage.desc}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Brochure Request Modal */}
      {isBrochureModalOpen && activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 text-slate-900 shadow-2xl space-y-4 text-center">
            <button
              onClick={() => setIsBrochureModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-14 h-14 rounded-2xl bg-[#005DAA]/10 text-[#005DAA] flex items-center justify-center mx-auto">
              <Download className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-black text-slate-900">Download Layout Brochure &amp; Master Plan</h4>
            <p className="text-xs text-slate-600">
              Get the complete master plan, government approval copies, and pricing milestone schedule for <strong>{activeProject.title}</strong> directly on WhatsApp.
            </p>
            <button
              onClick={() => {
                handleWhatsAppInquiry(activeProject.title, 'Download Official Layout Brochure & Master Plan');
                setIsBrochureModalOpen(false);
              }}
              style={{ backgroundColor: '#005DAA', color: '#ffffff' }}
              className="w-full py-3 rounded-xl text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md hover:bg-[#004580] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span className="text-white font-bold">Receive Brochure on WhatsApp</span>
            </button>
          </div>
        </div>
      )}

      {/* Site Visit Modal */}
      {isSiteVisitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-5 sm:p-6 text-slate-900 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-[#005DAA]" />
                <h4 className="text-base font-black">Schedule Guided Site Visit</h4>
              </div>
              <button
                onClick={() => setIsSiteVisitModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSiteVisitSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-800 font-bold">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={siteVisitForm.name}
                  onChange={(e) => setSiteVisitForm({ ...siteVisitForm, name: e.target.value })}
                  placeholder="e.g. Vikramaditya Roy"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#005DAA]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-800 font-bold">WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  value={siteVisitForm.phone}
                  onChange={(e) => setSiteVisitForm({ ...siteVisitForm, phone: e.target.value })}
                  placeholder="+91 98765 44001"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#005DAA]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-800 font-bold">Select Project Layout</label>
                <select
                  value={siteVisitForm.project}
                  onChange={(e) => setSiteVisitForm({ ...siteVisitForm, project: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#005DAA]"
                >
                  {userProjects.map((p) => (
                    <option key={p.id} value={p.title}>{p.title} ({p.location})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-800 font-bold">Transport Assistance</label>
                <select
                  value={siteVisitForm.transportMode}
                  onChange={(e) => setSiteVisitForm({ ...siteVisitForm, transportMode: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#005DAA]"
                >
                  <option value="Self Visit">Self Drive / Meet at site</option>
                  <option value="Request Free Cab Pick-up">Request Free Home Cab Pick-up &amp; Drop</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#005DAA] hover:bg-[#004580] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md mt-2 cursor-pointer"
              >
                <Car className="w-4 h-4" />
                <span>Confirm Visit on WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          QR CODE SCANNER & DIGITAL VCARD MODAL
      ───────────────────────────────────────────────────────────── */}
      {isQrModalOpen && (
        <div 
          onClick={() => setIsQrModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white text-center shadow-2xl relative animate-in zoom-in-95 duration-200 space-y-4"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsQrModalOpen(false)} 
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
              aria-label="Close QR Modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Profile Header */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#005DAA] bg-slate-800 shadow-lg relative">
                {profile.avatarUrl ? (
                  <img 
                    src={profile.avatarUrl} 
                    alt={profile.name} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#005DAA] text-white font-black text-xl">
                    {profile.name?.charAt(0) || 'R'}
                  </div>
                )}
              </div>
              <div className="space-y-0.5">
                <h4 className="font-black text-base text-white">{profile.company || profile.name}</h4>
                <p className="text-xs text-slate-400">{profile.name} • {profile.designation || 'Real Estate Specialist'}</p>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold mt-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Verified TS-RERA Developer Profile</span>
                </div>
              </div>
            </div>

            {/* High-Resolution QR Code */}
            <div className="bg-white p-4 rounded-2xl mx-auto w-56 h-56 flex items-center justify-center shadow-inner relative">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(liveUrl)}&color=005DAA&bgcolor=ffffff&margin=1`} 
                alt="Mini-Website QR Code" 
                className="w-full h-full object-contain"
              />
              {profile.avatarUrl && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-lg bg-white">
                    <img 
                      src={profile.avatarUrl} 
                      alt={profile.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
              )}
            </div>

            <p className="text-[11px] text-slate-400 leading-snug px-2">
              Scan with your smartphone camera to instantly open this real estate mini-website on mobile.
            </p>

            {/* Quick URL Box & Copy */}
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 text-left">
              <span className="text-[11px] text-slate-400 truncate flex-1 font-mono">{liveUrl}</span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-white flex items-center gap-1 transition shrink-0 cursor-pointer"
              >
                {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleVcfDownload}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4 text-white" />
                <span>Save Contact to Phone (vCard / .VCF)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const text = encodeURIComponent(`Explore verified projects and master layouts by ${profile.company || profile.name}: ${liveUrl}`);
                  window.open(`https://wa.me/?text=${text}`, '_blank');
                }}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Share Profile on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
