'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Eye, 
  Palette, 
  Layers, 
  User, 
  Share2, 
  Sparkles, 
  ShoppingBag, 
  Briefcase, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Save, 
  Smartphone, 
  Monitor,
  Globe,
  Check, 
  ExternalLink,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Film,
  Video,
  Play,
  Maximize2,
  Upload,
  HardDrive,
  Crown,
  AlertTriangle,
  X,
  Zap,
  FileVideo,
  Lock,
  BookOpen,
  Clock,
  PenTool,
  CreditCard,
  Copy,
  QrCode,
  Camera,
  Sliders,
  CheckCircle2,
  Building2,
  MapPin,
  Calendar,
  ShieldCheck,
  FileText,
  Compass,
  Award,
  Download,
  PanelRightClose,
  PanelRightOpen,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Car,
  Shirt,
  Activity,
  GraduationCap,
  Scissors,
  PartyPopper,
  Plane,
  Scale,
  Wrench,
  Store,
  Utensils,
  UtensilsCrossed
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DigitalProfile, ThemeType, SectionType, VideoItem, GalleryItem, BlogPostItem, ProductItem, ServiceItem } from '@/lib/types';
import { 
  VCARD_TEMPLATES_CATALOG, 
  VCardTemplateItem, 
  VCardCategory, 
  normalizeCategory, 
  isTemplateAllowedForCategory, 
  CATEGORY_LOCK_CONFIG, 
  CATEGORY_QUICK_PRESETS 
} from '@/data/vcardTemplates';
import { getTemplateProfile } from '@/data/templatePresets';
import { getProfileBySlug } from '@/lib/data-store';
import ProfileCardView from '../templates/ProfileCardView';
import SocialIcon, { getSocialBrandColor } from '@/components/common/SocialIcon';
import ShareCardModal from '@/components/common/ShareCardModal';
import { getCurrentUserPlan } from '@/lib/plan-guards';
import { downloadVcfFile } from '@/lib/vcf';
import { COMBO_DEALS, ComboDeal } from '@/components/templates/RestaurantTemplateView';

// Helper to permanently convert and compress image files to lightweight base64 data URLs
export const readFileAsDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (typeof window !== 'undefined' && file.type.startsWith('image/')) {
        const img = new Image();
        img.onload = () => {
          const maxDim = 800;
          let width = img.width;
          let height = img.height;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.75));
            return;
          }
          resolve(result);
        };
        img.onerror = () => resolve(result);
        img.src = result;
      } else {
        resolve(result);
      }
    };
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
};

// Helper to compress any existing large data URL
export const compressDataUrl = (dataUrl: string, maxDim = 800, quality = 0.75): Promise<string> => {
  if (typeof window === 'undefined' || !dataUrl || !dataUrl.startsWith('data:image/') || dataUrl.length < 150000) {
    return Promise.resolve(dataUrl);
  }
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
        return;
      }
      resolve(dataUrl);
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
};

// Helper to auto-detect video type and extract proper embed URL
export const normalizeVideoUrl = (rawUrl: string): { url: string; type: 'youtube' | 'instagram' | 'direct'; embedUrl?: string } => {
  const url = (rawUrl || '').trim();
  if (!url) return { url: '', type: 'youtube' };

  // YouTube match
  const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (ytMatch && ytMatch[1]) {
    return {
      url,
      type: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0`
    };
  }

  // Instagram Reels or Posts
  if (url.includes('instagram.com/reel/') || url.includes('instagram.com/p/')) {
    const cleanReel = url.split('instagram.com/reel/')[1]?.split('/')[0]?.split('?')[0] || 
                      url.split('instagram.com/p/')[1]?.split('/')[0]?.split('?')[0];
    return {
      url,
      type: 'instagram',
      embedUrl: cleanReel ? `https://www.instagram.com/reel/${cleanReel}/embed` : url
    };
  }

  // Direct video file extension
  if (url.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i)) {
    return {
      url,
      type: 'direct'
    };
  }

  return {
    url,
    type: url.includes('youtube') || url.includes('youtu.be') ? 'youtube' : 'direct'
  };
};

export const AVATAR_PRESETS = [
  { id: 'av1', label: 'Executive Leader', url: '/kishore-profile-v2.png' },
  { id: 'av2', label: 'Tech Founder (F)', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
  { id: 'av3', label: 'Creative Designer', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
  { id: 'av4', label: 'Strategy Consultant', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
  { id: 'av5', label: 'Corporate VP (F)', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
  { id: 'av6', label: 'Startup CEO', url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80' },
  { id: 'av7', label: 'Medical / Health', url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80' },
  { id: 'av8', label: 'Agency Director', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80' }
];

export const COVER_PRESETS = [
  { id: 'cov1', label: 'Modern Geometric Dark', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80' },
  { id: 'cov2', label: 'Abstract Blue Gradient', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80' },
  { id: 'cov3', label: 'Cyber Neon Tech', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80' },
  { id: 'cov4', label: 'Minimalist Charcoal', url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80' },
  { id: 'cov5', label: 'Luxury Marble Slate', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80' }
];

export interface UserCardSummary {
  id: string;
  slug: string;
  title: string;
  name: string;
  company: string;
  designation: string;
  templateId: string;
  theme: ThemeType;
  avatarUrl: string;
  createdAt: string;
}

interface ProfileBuilderProps {
  initialProfile: DigitalProfile;
  onSave?: (updatedProfile: DigitalProfile) => void;
}

export default function ProfileBuilder({ initialProfile, onSave }: ProfileBuilderProps) {
  const router = useRouter();
  const [profile, setProfile] = useState<DigitalProfile>(initialProfile);
  const isRestaurant = Boolean(
    profile.templateId === 'food-restaurant' ||
    profile.templateId?.startsWith('food-') ||
    profile.templateId?.startsWith('rest-') ||
    profile.id === 'food-restaurant' ||
    profile.id === 'restaurant-menu' ||
    profile.id === 'food-home' ||
    profile.slug === 'food-restaurant' ||
    profile.slug === 'restaurant-menu' ||
    profile.templateId?.includes('pickle') ||
    profile.slug?.includes('cafe') ||
    profile.slug?.includes('restaurant') ||
    profile.slug?.includes('dining') ||
    profile.category === 'Food Business' ||
    profile.category === 'Restaurants & Dining' ||
    profile.category === 'Restaurant' ||
    profile.category === 'Restaurants & Lounges' ||
    profile.category === 'Smart Dining & Digital Menus' ||
    profile.designation?.toLowerCase().includes('chef') ||
    profile.designation?.toLowerCase().includes('restaurant') ||
    profile.designation?.toLowerCase().includes('cafe') ||
    profile.designation?.toLowerCase().includes('bakery') ||
    profile.company?.toLowerCase().includes('restaurant') ||
    profile.company?.toLowerCase().includes('cafe') ||
    profile.company?.toLowerCase().includes('kitchen') ||
    profile.company?.toLowerCase().includes('diner') ||
    profile.company?.toLowerCase().includes('bistro') ||
    profile.company?.toLowerCase().includes('dhaba') ||
    profile.company?.toLowerCase().includes('bakery') ||
    Boolean(profile.sectionData?.restaurant)
  );
  const isRealEstate = !isRestaurant && Boolean(
    profile.templateId?.startsWith('re-') || 
    profile.id?.startsWith('re-') || 
    profile.slug?.startsWith('re-') ||
    profile.category === 'Real Estate' ||
    profile.templateId === 're-builders' ||
    profile.templateId === 're-plots' ||
    profile.templateId === 're-agents' ||
    profile.templateId === 're-villas' ||
    profile.templateId === 're-consultants' ||
    profile.templateId === 'vcard35' ||
    profile.designation?.toLowerCase().includes('realtor') ||
    profile.designation?.toLowerCase().includes('builder') ||
    profile.designation?.toLowerCase().includes('broker') ||
    profile.designation?.toLowerCase().includes('infrastructure') ||
    profile.company?.toLowerCase().includes('builder') ||
    profile.company?.toLowerCase().includes('developer') ||
    profile.company?.toLowerCase().includes('realty') ||
    profile.company?.toLowerCase().includes('real estate') ||
    profile.company?.toLowerCase().includes('infra') ||
    profile.company?.toLowerCase().includes('properties') ||
    profile.company?.toLowerCase().includes('constructions') ||
    profile.company?.toLowerCase().includes('estates') ||
    profile.bio?.toLowerCase().includes('real estate') ||
    Boolean(profile.sectionData?.realEstate)
  );
  const [showPreview, setShowPreview] = useState(true);
  const isInterior = !isRestaurant && Boolean(
    profile.templateId === 'home-interior' ||
    profile.templateId === 'interior' ||
    profile.templateId === 'vcard36' ||
    profile.templateId === 'vcard38' ||
    profile.templateId?.startsWith('interior') ||
    profile.id === 'home-interior' ||
    profile.id === 'interior' ||
    profile.id?.startsWith('interior') ||
    profile.slug === 'home-interior' ||
    profile.slug === 'interior' ||
    profile.slug?.startsWith('home-interior') ||
    profile.slug?.startsWith('interior-') ||
    profile.category === 'Interior Design' ||
    profile.category === 'Architecture' ||
    profile.designation?.toLowerCase().includes('interior') ||
    profile.designation?.toLowerCase().includes('architect') ||
    profile.company?.toLowerCase().includes('interior') ||
    profile.bio?.toLowerCase().includes('interior')
  );

  const isHealthcare = Boolean(
    profile.templateId?.startsWith('med-') ||
    profile.templateId?.startsWith('health-') ||
    profile.templateId === 'vcard5' ||
    profile.templateId === 'vcard45' ||
    profile.templateId === 'vcard46' ||
    profile.category === 'Healthcare & Clinics' ||
    profile.category === 'Healthcare' ||
    profile.category === 'Medical & Healthcare' ||
    profile.category === 'Doctor' ||
    profile.designation?.toLowerCase().includes('doctor') ||
    profile.designation?.toLowerCase().includes('physician') ||
    profile.designation?.toLowerCase().includes('surgeon') ||
    profile.designation?.toLowerCase().includes('dentist') ||
    profile.designation?.toLowerCase().includes('clinic') ||
    profile.company?.toLowerCase().includes('hospital') ||
    profile.company?.toLowerCase().includes('clinic') ||
    profile.company?.toLowerCase().includes('healthcare') ||
    profile.company?.toLowerCase().includes('dental') ||
    Boolean(profile.sectionData?.healthcare)
  );

  const isAutomobile = Boolean(
    profile.templateId?.startsWith('auto-') ||
    profile.templateId?.startsWith('car-') ||
    profile.templateId === 'vcard12' ||
    profile.templateId === 'vcard13' ||
    profile.category === 'Automobile & Showrooms' ||
    profile.category === 'Automobile' ||
    profile.category === 'Automotive' ||
    profile.designation?.toLowerCase().includes('auto') ||
    profile.designation?.toLowerCase().includes('motor') ||
    profile.designation?.toLowerCase().includes('car') ||
    profile.designation?.toLowerCase().includes('showroom') ||
    profile.company?.toLowerCase().includes('auto') ||
    profile.company?.toLowerCase().includes('motors') ||
    profile.company?.toLowerCase().includes('cars') ||
    profile.company?.toLowerCase().includes('dealership') ||
    Boolean(profile.sectionData?.automobile)
  );

  const isFashion = Boolean(
    profile.templateId?.startsWith('fashion-') ||
    profile.templateId?.startsWith('boutique-') ||
    profile.templateId === 'vcard7' ||
    profile.templateId === 'vcard8' ||
    profile.templateId === 'vcard47' ||
    profile.category === 'Fashion & Boutiques' ||
    profile.category === 'Fashion & Lifestyle' ||
    profile.category === 'Fashion' ||
    profile.category === 'Boutique' ||
    profile.designation?.toLowerCase().includes('designer') ||
    profile.designation?.toLowerCase().includes('couturier') ||
    profile.designation?.toLowerCase().includes('stylist') ||
    profile.company?.toLowerCase().includes('boutique') ||
    profile.company?.toLowerCase().includes('fashion') ||
    profile.company?.toLowerCase().includes('couture') ||
    profile.company?.toLowerCase().includes('silks') ||
    Boolean(profile.sectionData?.fashion)
  );

  const isEducation = Boolean(
    profile.templateId?.startsWith('edu-') ||
    profile.templateId?.startsWith('school-') ||
    profile.templateId === 'vcard9' ||
    profile.templateId === 'vcard10' ||
    profile.category === 'Education' ||
    profile.designation?.toLowerCase().includes('teacher') ||
    profile.designation?.toLowerCase().includes('professor') ||
    profile.designation?.toLowerCase().includes('faculty') ||
    profile.designation?.toLowerCase().includes('tutor') ||
    profile.company?.toLowerCase().includes('academy') ||
    profile.company?.toLowerCase().includes('school') ||
    profile.company?.toLowerCase().includes('classes') ||
    profile.company?.toLowerCase().includes('institute') ||
    profile.company?.toLowerCase().includes('education') ||
    Boolean(profile.sectionData?.education)
  );

  const isBeauty = Boolean(
    profile.templateId?.startsWith('beauty-') ||
    profile.templateId?.startsWith('salon-') ||
    profile.templateId?.startsWith('spa-') ||
    profile.templateId === 'vcard3' ||
    profile.templateId === 'vcard4' ||
    profile.category === 'Beauty & Personal Care' ||
    profile.designation?.toLowerCase().includes('beautician') ||
    profile.designation?.toLowerCase().includes('makeup') ||
    profile.designation?.toLowerCase().includes('esthetician') ||
    profile.company?.toLowerCase().includes('salon') ||
    profile.company?.toLowerCase().includes('spa') ||
    profile.company?.toLowerCase().includes('parlour') ||
    profile.company?.toLowerCase().includes('makeover') ||
    Boolean(profile.sectionData?.beauty)
  );

  const isEvents = Boolean(
    profile.templateId?.startsWith('event-') ||
    profile.templateId?.startsWith('photo-') ||
    profile.templateId?.startsWith('wedding-') ||
    profile.category === 'Events & Creative' ||
    profile.designation?.toLowerCase().includes('photographer') ||
    profile.designation?.toLowerCase().includes('event planner') ||
    profile.company?.toLowerCase().includes('events') ||
    profile.company?.toLowerCase().includes('wedding') ||
    profile.company?.toLowerCase().includes('production') ||
    Boolean(profile.sectionData?.events)
  );

  const isTravel = Boolean(
    profile.templateId?.startsWith('travel-') ||
    profile.templateId?.startsWith('tour-') ||
    profile.templateId?.startsWith('holiday-') ||
    profile.category === 'Travel & Hospitality' ||
    profile.designation?.toLowerCase().includes('travel') ||
    profile.designation?.toLowerCase().includes('holiday') ||
    profile.company?.toLowerCase().includes('travels') ||
    profile.company?.toLowerCase().includes('tours') ||
    profile.company?.toLowerCase().includes('holidays') ||
    profile.company?.toLowerCase().includes('resort') ||
    Boolean(profile.sectionData?.travel)
  );

  const isProfessional = Boolean(
    profile.templateId?.startsWith('prof-') ||
    profile.templateId?.startsWith('legal-') ||
    profile.templateId?.startsWith('tax-') ||
    profile.templateId?.startsWith('ca-') ||
    profile.templateId?.startsWith('consult-') ||
    profile.category === 'Professional Services' ||
    profile.designation?.toLowerCase().includes('advocate') ||
    profile.designation?.toLowerCase().includes('lawyer') ||
    profile.designation?.toLowerCase().includes('chartered accountant') ||
    profile.designation?.toLowerCase().includes('consultant') ||
    profile.company?.toLowerCase().includes('legal') ||
    profile.company?.toLowerCase().includes('associates') ||
    profile.company?.toLowerCase().includes('consulting') ||
    profile.company?.toLowerCase().includes('tax') ||
    Boolean(profile.sectionData?.professional)
  );

  const isHomeServices = Boolean(
    profile.templateId?.startsWith('home-') ||
    profile.templateId?.startsWith('repair-') ||
    profile.templateId?.startsWith('clean-') ||
    profile.templateId?.startsWith('plumb-') ||
    profile.templateId?.startsWith('electric-') ||
    profile.templateId?.startsWith('hvac-') ||
    profile.templateId?.startsWith('pest-') ||
    profile.category === 'Home & Professional Services' ||
    profile.designation?.toLowerCase().includes('technician') ||
    profile.designation?.toLowerCase().includes('plumber') ||
    profile.designation?.toLowerCase().includes('electrician') ||
    profile.designation?.toLowerCase().includes('cleaning') ||
    profile.company?.toLowerCase().includes('services') ||
    profile.company?.toLowerCase().includes('repairs') ||
    profile.company?.toLowerCase().includes('pest') ||
    Boolean(profile.sectionData?.homeServices)
  );

  const isRetail = Boolean(
    profile.templateId?.startsWith('retail-') ||
    profile.templateId?.startsWith('shop-') ||
    profile.templateId?.startsWith('store-') ||
    profile.templateId?.startsWith('jewel-') ||
    profile.templateId?.startsWith('supermarket-') ||
    profile.category === 'Retail & Local Shops' ||
    profile.designation?.toLowerCase().includes('proprietor') ||
    profile.designation?.toLowerCase().includes('store manager') ||
    profile.designation?.toLowerCase().includes('merchant') ||
    profile.company?.toLowerCase().includes('store') ||
    profile.company?.toLowerCase().includes('shop') ||
    profile.company?.toLowerCase().includes('mart') ||
    profile.company?.toLowerCase().includes('jewellers') ||
    Boolean(profile.sectionData?.retail)
  );

  const activeCategory: VCardCategory = React.useMemo(() => {
    if (profile.category) return normalizeCategory(profile.category, profile.templateId);
    if (isRealEstate) return 'Real Estate';
    if (isInterior) return 'Interior Design';
    if (isRestaurant) return 'Food Business';
    if (isHealthcare) return 'Healthcare';
    if (isAutomobile) return 'Automobile';
    if (isFashion) return 'Fashion & Clothing';
    if (isEducation) return 'Education';
    if (isBeauty) return 'Beauty & Personal Care';
    if (isEvents) return 'Events & Creative';
    if (isTravel) return 'Travel & Hospitality';
    if (isProfessional) return 'Professional Services';
    if (isHomeServices) return 'Home & Professional Services';
    if (isRetail) return 'Retail & Local Shops';
    return normalizeCategory(null, profile.templateId);
  }, [profile.category, profile.templateId, isRealEstate, isInterior, isRestaurant, isHealthcare, isAutomobile, isFashion, isEducation, isBeauty, isEvents, isTravel, isProfessional, isHomeServices, isRetail]);

  const lockConfig = CATEGORY_LOCK_CONFIG[activeCategory] || CATEGORY_LOCK_CONFIG['Professional Services'];

  const categoryTemplates = React.useMemo(() => {
    return VCARD_TEMPLATES_CATALOG.filter(t => isTemplateAllowedForCategory(t.id, activeCategory));
  }, [activeCategory]);

  const availableSubCategories = React.useMemo(() => {
    const list: string[] = [];
    categoryTemplates.forEach(t => {
      if (t.subCategory && !list.includes(t.subCategory)) {
        list.push(t.subCategory);
      }
    });
    return list;
  }, [categoryTemplates]);

  const [activeTab, setActiveTab] = useState<'cards' | 'info' | 'templates' | 'theme' | 'sections' | 'services' | 'products' | 'videos' | 'blogs' | 'gallery' | 'socials'>('info');
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [appliedTemplateName, setAppliedTemplateName] = useState<string | null>(null);

  // Multi-Card Management State
  const [userCards, setUserCards] = useState<UserCardSummary[]>([]);
  const [cardDropdownOpen, setCardDropdownOpen] = useState(false);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);

  // Add Card Form State
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardSlug, setNewCardSlug] = useState('');
  const [newCardTemplateId, setNewCardTemplateId] = useState('vcard39');
  const [newCardName, setNewCardName] = useState(initialProfile.name || '');
  const [newCardCompany, setNewCardCompany] = useState(initialProfile.company || '');
  const [newCardDesignation, setNewCardDesignation] = useState(initialProfile.designation || '');
  const [cardCreateError, setCardCreateError] = useState('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [studioWebsitePreviewOpen, setStudioWebsitePreviewOpen] = useState(false);
  const [studioPreviewDevice, setStudioPreviewDevice] = useState<'mobile' | 'website'>('mobile');
  const [isStudioQrModalOpen, setIsStudioQrModalOpen] = useState(false);
  const [studioQrCopied, setStudioQrCopied] = useState(false);

  // Template browser state
  const [templateSearch, setTemplateSearch] = useState('');
  const [templateCategory, setTemplateCategory] = useState('all');
  const [restaurantMenuSubTab, setRestaurantMenuSubTab] = useState<'dishes' | 'combos'>('dishes');

  // User plan & storage limits
  const [userPlan, setUserPlan] = useState<'Basic' | 'Pro' | 'Advanced'>('Pro');
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState<{ title: string; desc: string }>({
    title: 'Video Storage Limit Reached',
    desc: 'You have reached the 3-video limit on your current plan.'
  });

  const videoFileInputRef = useRef<HTMLInputElement | null>(null);
  const galleryFileInputRef = useRef<HTMLInputElement | null>(null);
  const avatarFileInputRef = useRef<HTMLInputElement | null>(null);
  const logoFileInputRef = useRef<HTMLInputElement | null>(null);
  const coverFileInputRef = useRef<HTMLInputElement | null>(null);
  const tabsRef = useRef<HTMLDivElement | null>(null);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: direction === 'left' ? -220 : 220, behavior: 'smooth' });
    }
  };

  // Visual Branding Customizer State
  const [showAvatarPresets, setShowAvatarPresets] = useState(false);
  const [avatarUrlOpen, setAvatarUrlOpen] = useState(false);
  const [showCoverPresets, setShowCoverPresets] = useState(false);
  const [coverUrlOpen, setCoverUrlOpen] = useState(false);
  const [logoUrlOpen, setLogoUrlOpen] = useState(false);
  const [photoUploadSuccess, setPhotoUploadSuccess] = useState<string | null>(null);
  const [galleryUploadTag, setGalleryUploadTag] = useState<string>('Weddings');
  const [galleryFilterTag, setGalleryFilterTag] = useState<string>('All');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const detected = getCurrentUserPlan();
        if (detected === 'BASIC') setUserPlan('Basic');
        else if (detected === 'ADVANCED') setUserPlan('Advanced');
        else setUserPlan('Pro');

        const saved = localStorage.getItem('oneclickbiz_user_session');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.plan && !localStorage.getItem('oneclickbiz_user_plan')) {
            if (parsed.plan.toUpperCase() === 'BASIC') setUserPlan('Basic');
            else if (parsed.plan.toUpperCase() === 'ADVANCED') setUserPlan('Advanced');
            else setUserPlan('Pro');
          }
        }

        // Initialize user cards
        const storedCards = localStorage.getItem('oneclickbiz_user_cards');
        if (storedCards) {
          setUserCards(JSON.parse(storedCards));
        } else {
          const defaultList: UserCardSummary[] = [
            {
              id: `card_${initialProfile.slug || 'primary'}`,
              slug: initialProfile.slug || 'kishore',
              title: initialProfile.name ? `${initialProfile.name}'s Card` : 'Primary Business Card',
              name: initialProfile.name || 'Kishore Patel',
              company: initialProfile.company || 'Himastech Digital Reality',
              designation: initialProfile.designation || 'Founder & Managing Director',
              templateId: 'vcard39',
              theme: initialProfile.theme || 'modern-indigo',
              avatarUrl: initialProfile.avatarUrl,
              createdAt: new Date().toISOString()
            }
          ];
          setUserCards(defaultList);
          localStorage.setItem('oneclickbiz_user_cards', JSON.stringify(defaultList));
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, [initialProfile]);

  const MAX_CARDS = userPlan === 'Advanced' ? 5 : userPlan === 'Pro' ? 3 : 1;
  const MAX_VIDEOS = userPlan === 'Advanced' ? 25 : userPlan === 'Pro' ? 10 : 3;
  const MAX_DIRECT_VIDEOS = userPlan === 'Advanced' ? 5 : userPlan === 'Pro' ? 3 : 0;
  const MAX_GALLERY = userPlan === 'Advanced' ? 50 : userPlan === 'Pro' ? 25 : 5;

  const getCardLimitTitle = () => {
    if (userPlan === 'Basic') {
      return 'Upgrade to Pro to Create Additional Cards';
    }
    if (userPlan === 'Pro') {
      return `Pro Plan Card Limit Reached (${userCards.length}/3 Cards)`;
    }
    return `Advanced Plan Card Limit Reached (${userCards.length}/5 Cards)`;
  };

  const getCardLimitDesc = () => {
    if (userPlan === 'Basic') {
      return `Your Basic Plan allows 1 commercial mini-website (${userCards.length}/1 used). Upgrade to the Pro Plan (₹1,599/yr) for up to 3 websites, or the Advanced Plan (₹2,199/yr) for up to 5 websites with multi-branch & custom domain support.`;
    }
    if (userPlan === 'Pro') {
      return `You have created all 3 commercial mini-websites included in your Pro Plan (${userCards.length}/3 used). Upgrade to the Advanced Plan (₹2,199/yr) to add up to 5 websites, branch profiles, and white-label custom domains.`;
    }
    return `You have reached the maximum quota of 5 commercial mini-websites on your Advanced Plan (${userCards.length}/5 used). For custom enterprise team fleets or additional websites, please contact support or manage subscriptions in the Billing Desk.`;
  };

  const handleOpenAddCardModal = () => {
    if (userCards.length >= MAX_CARDS) {
      setUpgradeReason({
        title: getCardLimitTitle(),
        desc: getCardLimitDesc()
      });
      setUpgradeModalOpen(true);
      return;
    }
    setNewCardName(profile.name);
    setNewCardCompany(profile.company);
    setNewCardDesignation(profile.designation);
    const defaultTpl = categoryTemplates[0]?.id || (activeCategory === 'Real Estate' ? 're-builders' : 'vcard39');
    setNewCardTemplateId(defaultTpl);
    setNewCardTitle(`${profile.company || profile.name} ${activeCategory} Card`);
    setNewCardSlug(`${(profile.slug || 'card').replace(/-card-\d+$/, '')}-card-${userCards.length + 1}`);
    setCardCreateError('');
    setIsAddCardModalOpen(true);
  };

  // Multi-card Handlers
  const handleCreateCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (userCards.length >= MAX_CARDS) {
      setUpgradeReason({
        title: getCardLimitTitle(),
        desc: getCardLimitDesc()
      });
      setIsAddCardModalOpen(false);
      setUpgradeModalOpen(true);
      return;
    }

    if (!newCardTitle.trim()) {
      setCardCreateError('Please enter a title or purpose for this card.');
      return;
    }

    const cleanSlug = (newCardSlug || newCardTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')).toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (!cleanSlug) {
      setCardCreateError('Please specify a valid URL slug.');
      return;
    }

    // Check if slug already exists in cards
    if (userCards.some(c => c.slug === cleanSlug)) {
      setCardCreateError(`Card handle "/v/${cleanSlug}" is already in use. Choose a different handle.`);
      return;
    }

    // Universal Entity Guard for activeCategory
    const isTargetAllowed = isTemplateAllowedForCategory(newCardTemplateId, activeCategory);
    if (!isTargetAllowed) {
      setCardCreateError(`Your account is registered under ${lockConfig.label}. You can only create cards using your respective ${activeCategory} templates.`);
      return;
    }

    // Build new profile from chosen template
    const basePreset = getTemplateProfile(newCardTemplateId);
    const newProfile: DigitalProfile = {
      ...basePreset,
      id: `prof_${cleanSlug}_${Date.now()}`,
      slug: cleanSlug,
      name: newCardName.trim() || profile.name || basePreset.name,
      company: newCardCompany.trim() || profile.company || basePreset.company,
      designation: newCardDesignation.trim() || profile.designation || basePreset.designation,
      category: activeCategory,
      phone: profile.phone || basePreset.phone,
      whatsapp: profile.whatsapp || profile.phone || basePreset.whatsapp,
      email: profile.email || basePreset.email,
    };

    if (activeCategory === 'Real Estate' && !newProfile.sectionData?.realEstate) {
      newProfile.sectionData = {
        ...(newProfile.sectionData || {}),
        realEstate: getTemplateProfile('re-builders').sectionData.realEstate
      };
    } else if (activeCategory === 'Interior Design' && !newProfile.sectionData?.interior) {
      newProfile.sectionData = {
        ...(newProfile.sectionData || {}),
        interior: getTemplateProfile('home-interior').sectionData.interior
      };
    } else if (activeCategory === 'Healthcare' && !newProfile.sectionData?.healthcare) {
      newProfile.sectionData = {
        ...(newProfile.sectionData || {}),
        healthcare: {
          regNumber: 'TSMC/DOC/2018/8892',
          degrees: 'MBBS, MD, FACC (USA)',
          specialization: 'Senior Interventional Cardiologist',
          opdTimings: 'Mon - Sat: 10:00 AM - 02:00 PM',
          consultationFee: '₹800',
          hospitalAffiliation: 'Apollo Hospitals & Heart Clinic',
          emergencyPhone: '+91 98765 00108'
        }
      };
    } else if (activeCategory === 'Automobile' && !newProfile.sectionData?.automobile) {
      newProfile.sectionData = {
        ...(newProfile.sectionData || {}),
        automobile: {
          brandAuthorized: 'Certified Multi-Brand & Pre-Owned Arena',
          inspectionCertification: '150-Point Certified Quality Inspection',
          testDriveTimings: 'Mon - Sun: 09:30 AM - 08:00 PM',
          financePartners: 'HDFC Bank, SBI Auto, ICICI Bank, Kotak Prime',
          warrantyCoverage: '3 Years Comprehensive + Roadside Assistance'
        }
      };
    } else if (activeCategory === 'Fashion & Clothing' && !newProfile.sectionData?.fashion) {
      newProfile.sectionData = {
        ...(newProfile.sectionData || {}),
        fashion: {
          certification: '100% Pure Silk Mark & Handloom Certified',
          coutureSpecialization: 'Bridal Kanjeevarams & Haute Couture',
          consultationTimings: 'By Appointment: 11:00 AM - 07:30 PM',
          shippingCoverage: 'Pan-India Free Express + DHL Worldwide',
          exchangePolicy: '7-Day Hassle-Free Exchange Guarantee'
        }
      };
    } else if (activeCategory === 'Education' && !newProfile.sectionData?.education) {
      newProfile.sectionData = {
        ...(newProfile.sectionData || {}),
        education: {
          boardAffiliation: 'Central Board & State Council Accredited',
          accreditation: 'ISO 9001:2015 & Govt. Recognized',
          establishedYear: '2012',
          totalStudentsTrained: '12,500+',
          placementRate: '96.8% Success Rate',
          demoTimings: 'Mon - Sat: 09:00 AM - 07:00 PM'
        }
      };
    } else if (activeCategory === 'Beauty & Personal Care' && !newProfile.sectionData?.beauty) {
      newProfile.sectionData = {
        ...(newProfile.sectionData || {}),
        beauty: {
          stylistCertification: 'CIDESCO & L’Oréal Certified Master Stylists',
          hygieneProtocol: '100% Autoclaved Tools & Single-Use Linens',
          operatingHours: '10:00 AM - 08:30 PM (Daily)',
          bridalSlotsNotice: 'Advance Booking Required for Wedding Dates',
          productBrandsUsed: 'Dyson, Kérastase, Olaplex & Charlotte Tilbury'
        }
      };
    } else if (activeCategory === 'Events & Creative' && !newProfile.sectionData?.events) {
      newProfile.sectionData = {
        ...(newProfile.sectionData || {}),
        events: {
          eventSpecialization: 'Destination Weddings & Luxury Celebrations',
          eventsExecuted: '350+ Celebrations Executed',
          experienceYears: '12+ Years',
          productionCapability: 'In-House Sound, 4K Drones & Stage Decor',
          serviceLocations: 'Pan-India & Destination Weddings'
        }
      };
    } else if (activeCategory === 'Travel & Hospitality' && !newProfile.sectionData?.travel) {
      newProfile.sectionData = {
        ...(newProfile.sectionData || {}),
        travel: {
          agencyRegistration: 'IATA Accredited & Ministry of Tourism Recognized',
          destinationsCovered: '75+ Domestic & Global Gateways',
          happyTravelers: '25,000+ Happy Explorers',
          supportHours: '24/7 Dedicated Ground Concierge',
          customizationPolicy: '100% Tailored Private Itineraries'
        }
      };
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(`oneclickbiz_custom_profile_${cleanSlug}`, JSON.stringify(newProfile));
      localStorage.setItem('oneclickbiz_active_profile', JSON.stringify(newProfile));

      const newCardSummary: UserCardSummary = {
        id: `card_${cleanSlug}_${Date.now()}`,
        slug: cleanSlug,
        title: newCardTitle.trim(),
        name: newProfile.name,
        company: newProfile.company,
        designation: newProfile.designation,
        templateId: newCardTemplateId,
        theme: newProfile.theme,
        avatarUrl: newProfile.avatarUrl,
        createdAt: new Date().toISOString()
      };

      const updatedCards = [...userCards, newCardSummary];
      setUserCards(updatedCards);
      localStorage.setItem('oneclickbiz_user_cards', JSON.stringify(updatedCards));
      window.history.pushState({}, '', `/dashboard/builder?slug=${cleanSlug}`);
    }

    setProfile(newProfile);
    setIsAddCardModalOpen(false);
    setNewCardTitle('');
    setNewCardSlug('');
    setCardCreateError('');
    setAppliedTemplateName(`New Card: ${newCardTitle}`);
    setActiveTab('info');

    confetti({
      particleCount: 110,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const handleSwitchCard = (targetSlug: string) => {
    if (typeof window !== 'undefined') {
      const custom = localStorage.getItem(`oneclickbiz_custom_profile_${targetSlug}`);
      let targetProfile: DigitalProfile;
      if (custom) {
        try {
          targetProfile = JSON.parse(custom);
        } catch {
          targetProfile = getProfileBySlug(targetSlug);
        }
      } else {
        targetProfile = getProfileBySlug(targetSlug);
      }
      setProfile(targetProfile);
      localStorage.setItem('oneclickbiz_active_profile', JSON.stringify(targetProfile));
      window.history.pushState({}, '', `/dashboard/builder?slug=${targetSlug}`);
    }
    setCardDropdownOpen(false);
    setAppliedTemplateName(`Switched to /v/${targetSlug}`);
    setTimeout(() => setAppliedTemplateName(null), 2500);
  };

  const handleDeleteCard = (slugToDelete: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (userCards.length <= 1) {
      alert('You must have at least one active commercial mini-website.');
      return;
    }
    if (!confirm(`Are you sure you want to delete card "/v/${slugToDelete}"?`)) return;

    const updated = userCards.filter(c => c.slug !== slugToDelete);
    setUserCards(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('oneclickbiz_user_cards', JSON.stringify(updated));
      localStorage.removeItem(`oneclickbiz_custom_profile_${slugToDelete}`);
    }
    if (profile.slug === slugToDelete && updated[0]) {
      handleSwitchCard(updated[0].slug);
    }
  };

  // Helper to quickly update or create social channel URLs (LinkedIn, Instagram, etc.)
  const updateQuickSocial = (platform: string, url: string, label: string) => {
    setProfile(prev => {
      const items = [...(prev.sectionData?.socials?.items || [])];
      const idx = items.findIndex(s => s.platform === platform || (platform === 'twitter' && s.platform === 'x'));
      if (idx >= 0) {
        items[idx] = { ...items[idx], url: url.trim() };
      } else if (url.trim()) {
        items.push({
          id: `s_${platform}_${Date.now()}`,
          platform: platform as any,
          label,
          url: url.trim()
        });
      }
      return {
        ...prev,
        sectionData: {
          ...prev.sectionData,
          socials: { items }
        }
      };
    });
  };

  // Auto-sync profile changes to localStorage & live event listeners
  useEffect(() => {
    if (typeof window !== 'undefined' && profile?.slug) {
      try {
        localStorage.setItem(`oneclickbiz_custom_profile_${profile.slug}`, JSON.stringify(profile));
        localStorage.setItem('oneclickbiz_active_profile', JSON.stringify(profile));
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new CustomEvent('oneclickbiz_profile_updated', { detail: profile }));
      } catch (err) {
        console.error('Auto-sync profile error:', err);
      }
    }
  }, [profile]);

  // Field updates with card & session sync
  const handleFieldChange = (field: keyof DigitalProfile, value: any) => {
    setProfile(prev => {
      const updated = { ...prev, [field]: value };
      
      // If updating bio, also sync to sectionData.about.content
      if (field === 'bio') {
        updated.sectionData = {
          ...updated.sectionData,
          about: {
            ...updated.sectionData?.about,
            content: value
          }
        };
      }

      // If updating phone, also sync whatsapp if it was empty, previously matched phone, or was default preset
      if (field === 'phone') {
        const isPresetWa = !prev.whatsapp || prev.whatsapp === '916304989071' || prev.whatsapp === '+91 63049 89071' || prev.whatsapp === prev.phone;
        if (isPresetWa) {
          updated.whatsapp = value;
        }
      }

      // Automatically sync WhatsApp and Phone in social links
      if (field === 'whatsapp' || field === 'phone') {
        const targetWa = (field === 'whatsapp' ? value : updated.whatsapp || value || '').replace(/\D/g, '');
        const cleanWa = targetWa.length === 10 ? `91${targetWa}` : targetWa;
        if (updated.sectionData?.socials?.items) {
          updated.sectionData = {
            ...updated.sectionData,
            socials: {
              ...updated.sectionData.socials,
              items: updated.sectionData.socials.items.map((soc: any) => {
                if (soc.platform === 'whatsapp' && cleanWa) {
                  return { ...soc, url: `https://wa.me/${cleanWa}` };
                }
                if (soc.platform === 'phone' && field === 'phone' && value) {
                  return { ...soc, url: `tel:${value}` };
                }
                return soc;
              })
            }
          };
        }
      }

      // Automatically sync Email in social links
      if (field === 'email') {
        if (updated.sectionData?.socials?.items) {
          updated.sectionData = {
            ...updated.sectionData,
            socials: {
              ...updated.sectionData.socials,
              items: updated.sectionData.socials.items.map((soc: any) => {
                if (soc.platform === 'email' || soc.url?.startsWith('mailto:')) {
                  return { ...soc, url: `mailto:${value}` };
                }
                return soc;
              })
            }
          };
        }
      }

      // If updating avatar, name, company, designation, or slug, sync to userCards list immediately
      if (field === 'avatarUrl' || field === 'name' || field === 'company' || field === 'designation' || field === 'slug') {
        setUserCards(cards => {
          const newCards = cards.map(c => c.slug === prev.slug ? {
            ...c,
            slug: field === 'slug' ? value : c.slug,
            avatarUrl: field === 'avatarUrl' ? value : c.avatarUrl,
            name: field === 'name' ? value : c.name,
            company: field === 'company' ? value : c.company,
            designation: field === 'designation' ? value : c.designation,
          } : c);
          if (typeof window !== 'undefined') {
            try {
              localStorage.setItem('oneclickbiz_user_cards', JSON.stringify(newCards));
            } catch (e) {
              console.error(e);
            }
          }
          return newCards;
        });
      }

      // If slug changed, update URL without reload and migrate old storage key
      if (field === 'slug' && prev.slug !== value && typeof window !== 'undefined') {
        try {
          localStorage.removeItem(`oneclickbiz_custom_profile_${prev.slug}`);
          window.history.replaceState({}, '', `/dashboard/builder?slug=${value}`);
        } catch (e) {}
      }

      // If updating avatarUrl, show confirmation
      if (field === 'avatarUrl') {
        setPhotoUploadSuccess('Profile photo updated successfully!');
        setTimeout(() => setPhotoUploadSuccess(null), 3000);
      }

      return updated;
    });
  };

  // Apply full template preset or theme only
  const handleApplyTemplate = (templateId: string, fullPreset: boolean = true) => {
    const templateMeta = VCARD_TEMPLATES_CATALOG.find(t => t.id === templateId);
    const isAllowed = isTemplateAllowedForCategory(templateId, activeCategory);

    if (!isAllowed) {
      alert(`🔒 ${lockConfig.label} Lock\n\nYour account is registered under ${lockConfig.label}. You can only apply templates from your respective ${activeCategory} business suite.`);
      return;
    }

    const preset = getTemplateProfile(templateId);

    if (fullPreset) {
      setProfile(prev => {
        const hasCustomGallery = prev.sectionData.gallery?.items && prev.sectionData.gallery.items.length > 0;
        const hasCustomVideos = prev.sectionData.videos?.items && prev.sectionData.videos.items.length > 0;
        const userWa = (prev.whatsapp || prev.phone || '').replace(/\D/g, '');
        const cleanWa = userWa.length === 10 ? `91${userWa}` : userWa;

        const updatedSocials = (preset.sectionData.socials?.items || []).map((soc: any) => {
          if (soc.platform === 'whatsapp' && cleanWa) {
            return { ...soc, url: `https://wa.me/${cleanWa}` };
          }
          if (soc.platform === 'phone' && prev.phone) {
            return { ...soc, url: `tel:${prev.phone}` };
          }
          return soc;
        });

        return {
          ...preset,
          category: activeCategory,
          templateId: templateId,
          slug: prev.slug || preset.slug,
          name: prev.name || preset.name,
          company: prev.company || preset.company,
          designation: prev.designation || preset.designation,
          bio: prev.bio !== undefined ? prev.bio : preset.bio,
          phone: prev.phone || preset.phone,
          whatsapp: prev.whatsapp || (cleanWa ? cleanWa : preset.whatsapp),
          email: prev.email || preset.email,
          address: prev.address || preset.address,
          sectionData: {
            ...preset.sectionData,
            about: { content: prev.bio || preset.bio },
            socials: { items: updatedSocials },
            gallery: hasCustomGallery ? prev.sectionData.gallery : preset.sectionData.gallery,
            videos: hasCustomVideos ? prev.sectionData.videos : preset.sectionData.videos,
            products: (prev.sectionData?.products?.items && prev.sectionData.products.items.length > 0)
              ? prev.sectionData.products
              : preset.sectionData.products,
            realEstate: activeCategory === 'Real Estate' 
              ? (prev.sectionData?.realEstate || preset.sectionData?.realEstate || getTemplateProfile('re-builders').sectionData?.realEstate) 
              : preset.sectionData?.realEstate,
            interior: activeCategory === 'Interior Design' 
              ? (prev.sectionData?.interior || preset.sectionData?.interior || getTemplateProfile('home-interior').sectionData?.interior) 
              : preset.sectionData?.interior,
            healthcare: (activeCategory === 'Healthcare' || isHealthcare) ? (preset.sectionData?.healthcare || prev.sectionData?.healthcare || {
              regNumber: 'TSMC/DOC/2018/8892',
              degrees: 'MBBS, MD, FACC (USA)',
              specialization: 'Senior Interventional Cardiologist',
              opdTimings: 'Mon - Sat: 10:00 AM - 02:00 PM',
              consultationFee: '₹800',
              hospitalAffiliation: 'Apollo Hospitals & Heart Clinic',
              emergencyPhone: '+91 98765 00108'
            }) : preset.sectionData?.healthcare,
            automobile: (activeCategory === 'Automobile' || isAutomobile) ? (preset.sectionData?.automobile || prev.sectionData?.automobile || {
              brandAuthorized: 'Certified Multi-Brand & Pre-Owned Arena',
              inspectionCertification: '150-Point Certified Quality Inspection',
              testDriveTimings: 'Mon - Sun: 09:30 AM - 08:00 PM',
              financePartners: 'HDFC Bank, SBI Auto, ICICI Bank, Kotak Prime',
              warrantyCoverage: '3 Years Comprehensive + Roadside Assistance'
            }) : preset.sectionData?.automobile,
            fashion: (activeCategory === 'Fashion & Clothing' || isFashion) ? (preset.sectionData?.fashion || prev.sectionData?.fashion || {
              certification: '100% Pure Silk Mark & Handloom Certified',
              coutureSpecialization: 'Bridal Kanjeevarams & Haute Couture',
              consultationTimings: 'By Appointment: 11:00 AM - 07:30 PM',
              shippingCoverage: 'Pan-India Free Express + DHL Worldwide',
              exchangePolicy: '7-Day Hassle-Free Exchange Guarantee'
            }) : preset.sectionData?.fashion,
            education: (activeCategory === 'Education' || isEducation) ? (preset.sectionData?.education || prev.sectionData?.education || {
              boardAffiliation: 'Central Board & State Council Accredited',
              accreditation: 'ISO 9001:2015 & Govt. Recognized',
              establishedYear: '2012',
              totalStudentsTrained: '12,500+',
              placementRate: '96.8% Success Rate',
              demoTimings: 'Mon - Sat: 09:00 AM - 07:00 PM'
            }) : preset.sectionData?.education,
            beauty: (activeCategory === 'Beauty & Personal Care' || isBeauty) ? (preset.sectionData?.beauty || prev.sectionData?.beauty || {
              stylistCertification: 'CIDESCO & L’Oréal Certified Master Stylists',
              hygieneProtocol: '100% Autoclaved Tools & Single-Use Linens',
              operatingHours: '10:00 AM - 08:30 PM (Daily)',
              bridalSlotsNotice: 'Advance Booking Required for Wedding Dates',
              productBrandsUsed: 'Dyson, Kérastase, Olaplex & Charlotte Tilbury'
            }) : preset.sectionData?.beauty,
            events: (activeCategory === 'Events & Creative' || isEvents) ? (preset.sectionData?.events || prev.sectionData?.events || {
              eventSpecialization: 'Destination Weddings & Luxury Celebrations',
              eventsExecuted: '350+ Celebrations Executed',
              experienceYears: '12+ Years',
              productionCapability: 'In-House Sound, 4K Drones & Stage Decor',
              serviceLocations: 'Pan-India & Destination Weddings'
            }) : preset.sectionData?.events,
            travel: (activeCategory === 'Travel & Hospitality' || isTravel) ? (preset.sectionData?.travel || prev.sectionData?.travel || {
              agencyRegistration: 'IATA Accredited & Ministry of Tourism Recognized',
              destinationsCovered: '75+ Domestic & Global Gateways',
              happyTravelers: '25,000+ Happy Explorers',
              supportHours: '24/7 Dedicated Ground Concierge',
              customizationPolicy: '100% Tailored Private Itineraries'
            }) : preset.sectionData?.travel,
            professional: (activeCategory === 'Professional Services' || isProfessional) ? (preset.sectionData?.professional || prev.sectionData?.professional || {
              barCouncilOrIcaId: 'Bar Council / ICAI Enrolled • High Court Practice',
              practiceYears: '15+ Years Industry Experience',
              casesOrClientsCount: '1,200+ Corporate & Individual Matters Handled',
              consultationMode: 'In-Chamber & Secure Virtual Advisory Desk',
              confidentialityPolicy: '100% Strict Attorney-Client Privilege & NDA'
            }) : preset.sectionData?.professional,
            homeServices: (activeCategory === 'Home & Professional Services' || isHomeServices) ? (preset.sectionData?.homeServices || prev.sectionData?.homeServices || {
              serviceWarrantyDays: '30-Day Workmanship Warranty',
              verifiedTechniciansCount: '100% Police & Background Verified Crew',
              responseTime: 'Within 45-60 Mins On-Site Arrival',
              pricingStandard: 'Standard Upfront Rate Card • No Hidden Charges',
              emergencyAvailability: '24/7 Rapid Emergency Dispatch'
            }) : preset.sectionData?.homeServices,
            retail: (activeCategory === 'Retail & Local Shops' || isRetail) ? (preset.sectionData?.retail || prev.sectionData?.retail || {
              storeType: '100% Genuine Authorized Dealer & Brand Stock',
              returnExchangePolicy: '7-Day Easy Store Exchange Policy',
              deliveryRadius: 'Same-Day Express Local Delivery',
              billingGst: 'Official GST Invoice with Full Brand Warranty',
              loyaltyPerks: 'Instant Member Discounts & Cashback Points'
            }) : preset.sectionData?.retail,
            restaurant: (activeCategory === 'Food Business' || isRestaurant) ? (preset.sectionData?.restaurant || prev.sectionData?.restaurant || {
              fssaiNumber: 'FSSAI Lic. No. 13624014000892',
              cuisineType: 'Hyderabadi Dum Biryani, Tandoor & North Indian Delicacies',
              diningTimings: '11:30 AM – 11:30 PM (All 7 Days)',
              seatingCapacity: '120 Pax (AC Family Hall & Open Rooftop)',
              reservationPolicy: 'Table hold for 15 mins. Prior booking advised on weekends.',
              deliveryRadius: 'Up to 12 km via WhatsApp Direct & Swiggy/Zomato',
              dietaryHighlights: 'Pure Desi Ghee • Halal Certified • Jain Options Available'
            }) : preset.sectionData?.restaurant,
          }
        };
      });
    } else {
      setProfile(prev => ({
        ...prev,
        theme: preset.theme,
        templateId: templateId,
        category: activeCategory,
        avatarUrl: preset.avatarUrl,
        coverUrl: preset.coverUrl
      }));
    }

    setAppliedTemplateName(templateMeta?.name || templateId);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    setTimeout(() => setAppliedTemplateName(null), 3500);
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Auto-compress any large base64 images in gallery, avatar, cover
    let cleanProfile = { ...profile };
    try {
      if (cleanProfile.avatarUrl && cleanProfile.avatarUrl.startsWith('data:image/')) {
        cleanProfile.avatarUrl = await compressDataUrl(cleanProfile.avatarUrl);
      }
      if (cleanProfile.coverUrl && cleanProfile.coverUrl.startsWith('data:image/')) {
        cleanProfile.coverUrl = await compressDataUrl(cleanProfile.coverUrl);
      }
      if (cleanProfile.sectionData?.gallery?.items) {
        const compressedGallery = await Promise.all(
          cleanProfile.sectionData.gallery.items.map(async item => {
            if (item.imageUrl && item.imageUrl.startsWith('data:image/')) {
              const compressedUrl = await compressDataUrl(item.imageUrl);
              return { ...item, imageUrl: compressedUrl };
            }
            return item;
          })
        );
        cleanProfile = {
          ...cleanProfile,
          sectionData: {
            ...cleanProfile.sectionData,
            gallery: { ...cleanProfile.sectionData.gallery, items: compressedGallery }
          }
        };
      }
    } catch (compErr) {
      console.warn('Compression error before save:', compErr);
    }

    setProfile(cleanProfile);

    if (onSave) {
      onSave(cleanProfile);
    }
    
    // Sync to local storage & trigger storage update across all components
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`oneclickbiz_custom_profile_${cleanProfile.slug}`, JSON.stringify(cleanProfile));
        localStorage.setItem('oneclickbiz_active_profile', JSON.stringify(cleanProfile));
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new CustomEvent('oneclickbiz_profile_updated', { detail: cleanProfile }));
      } catch (e) {
        console.error('Save to localStorage error:', e);
      }
    }

    // Persist to Server Database API
    try {
      const res = await fetch(`/api/profiles/${cleanProfile.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanProfile)
      });
      if (res.ok) {
        const data = await res.json();
        console.log('Profile saved & published successfully:', data);
      } else {
        const errData = await res.json().catch(() => ({}));
        console.error('Save profile API failed with status:', res.status, errData);
      }
    } catch (e) {
      console.error('Save profile to API error:', e);
    } finally {
      setIsSaving(false);
    }

    setIsSaved(true);
    setSaveSuccessMsg(`Card published live at oneclickbiz.in/v/${cleanProfile.slug}`);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setIsSaved(false);
      setSaveSuccessMsg(null);
    }, 4000);
  };

  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}/v/${profile.slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Section reordering & toggling
  const toggleSectionVisibility = (sectionId: string) => {
    setProfile(prev => ({
      ...prev,
      sections: prev.sections.map(s => 
        s.id === sectionId ? { ...s, isVisible: !s.isVisible } : s
      )
    }));
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...profile.sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    // re-assign order numbers
    newSections.forEach((s, idx) => { s.order = idx + 1; });
    setProfile(prev => ({ ...prev, sections: newSections }));
  };

  const themes: { id: ThemeType; name: string; gradient: string }[] = [
    { id: 'modern-indigo', name: 'Modern Indigo', gradient: 'from-indigo-600 to-purple-600' },
    { id: 'dark-onyx', name: 'Dark Onyx (Luxury)', gradient: 'from-zinc-900 to-amber-600' },
    { id: 'glassmorphic', name: 'Frost Glass', gradient: 'from-cyan-500 to-indigo-600' },
    { id: 'emerald-pro', name: 'Emerald Tech', gradient: 'from-emerald-600 to-teal-600' },
    { id: 'sunset-gold', name: 'Sunset Rose', gradient: 'from-orange-500 to-rose-600' },
  ];

  return (
    <div className="flex flex-col lg:flex-row flex-1 h-full min-h-0 overflow-hidden bg-slate-950 text-slate-100">
      
      {/* Left Control & Editor Panel */}
      <div className="flex-1 min-w-0 flex flex-col h-full min-h-0 bg-slate-900/50 overflow-hidden">
        
        {/* Builder Navigation Bar */}
        <div className="p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-900 shrink-0">
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Profile Studio
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-xs text-slate-400">Live URL:</p>
                <a 
                  href={`/v/${profile.slug}`} 
                  target="_blank"
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-mono flex items-center gap-1 underline underline-offset-2"
                >
                  /v/{profile.slug}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Card Switcher Dropdown */}
            <div className="relative ml-1">
              <button
                onClick={() => setCardDropdownOpen(!cardDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-white shadow-sm transition group"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <CreditCard className="w-3.5 h-3.5 text-indigo-400" />
                <span className="truncate max-w-[120px] sm:max-w-[150px] font-bold">{profile.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">/v/{profile.slug}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition" />
              </button>

              {cardDropdownOpen && (
                <div 
                  className="absolute left-0 top-full mt-2 w-72 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Your Mini-Websites ({userCards.length})</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">{userPlan} Plan</span>
                  </div>

                  <div className="max-h-60 overflow-y-auto py-1 space-y-1">
                    {userCards.map(card => {
                      const isActive = card.slug === profile.slug;
                      return (
                        <div
                          key={card.id || card.slug}
                          onClick={() => handleSwitchCard(card.slug)}
                          className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-2 ${
                            isActive 
                              ? 'bg-indigo-600/20 border border-indigo-500/40 text-white' 
                              : 'hover:bg-slate-800 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                              <CreditCard className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                            </div>
                            <div className="truncate text-left">
                              <p className="text-xs font-bold truncate">{card.title || card.name}</p>
                              <p className="text-[10px] text-indigo-300 font-mono">/v/{card.slug}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {isActive ? (
                              <span className="text-[10px] font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/20">
                                Active
                              </span>
                            ) : (
                              <button
                                onClick={(e) => handleDeleteCard(card.slug, e)}
                                className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-slate-750 transition"
                                title="Delete card"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <button
                      onClick={() => {
                        setCardDropdownOpen(false);
                        handleOpenAddCardModal();
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Create New Card ({userCards.length}/{MAX_CARDS})</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Top Action Buttons Group */}
          <div className="flex items-center gap-1.5 shrink-0 ml-auto py-0.5">
            {/* Primary Action: Save & Publish (Never truncated, high contrast) */}
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-75 text-xs font-bold text-white flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all active:scale-95 cursor-pointer shrink-0 whitespace-nowrap min-w-fit"
              title="Save all changes and publish digital profile"
            >
              {isSaving ? (
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isSaved ? (
                <Check className="w-3.5 h-3.5 text-emerald-300" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              <span>{isSaving ? 'Saving...' : isSaved ? 'Saved!' : 'Save & Publish'}</span>
            </button>

            {/* Toggle Preview Mockup */}
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-all border border-slate-700 cursor-pointer shadow-xs shrink-0 whitespace-nowrap"
              title={showPreview ? 'Hide phone preview to maximize editor space' : 'Show live phone mockup preview'}
            >
              {showPreview ? (
                <>
                  <PanelRightClose className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="hidden sm:inline">Hide Mockup</span>
                </>
              ) : (
                <>
                  <PanelRightOpen className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Show Mockup</span>
                </>
              )}
            </button>

            {/* Desktop Mini-Website Preview */}
            <button 
              type="button"
              onClick={() => setStudioWebsitePreviewOpen(true)}
              className="px-2.5 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-xs font-semibold text-indigo-300 hover:text-white flex items-center gap-1.5 transition-all border border-indigo-500/40 shadow-sm active:scale-95 cursor-pointer shrink-0 whitespace-nowrap"
              title="Preview full desktop website"
            >
              <Monitor className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden md:inline">Mini-Website</span>
            </button>

            {/* Add Card Button */}
            <button
              onClick={handleOpenAddCardModal}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-1.5 border border-slate-700 active:scale-95 transition shrink-0 whitespace-nowrap"
              title={`Add New Card (${userCards.length}/${MAX_CARDS})`}
            >
              <Plus className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Add Card</span>
              <span className="text-[10px] text-slate-400">({userCards.length}/{MAX_CARDS})</span>
            </button>

            {/* Quick Actions Toolbar with compact icons on laptop viewports */}
            <div className="flex items-center gap-0.5 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/80 shrink-0">
              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="p-1.5 rounded-md hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                title="Share digital profile link"
              >
                <Share2 className="w-3.5 h-3.5 text-purple-400" />
              </button>

              <a 
                href={`/v/${profile.slug}`} 
                target="_blank"
                className="p-1.5 rounded-md hover:bg-slate-700 text-slate-300 hover:text-white transition"
                title={`Open live card: /v/${profile.slug}`}
              >
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              </a>

              <button
                type="button"
                onClick={() => setIsStudioQrModalOpen(true)}
                className="p-1.5 rounded-md hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                title="Scan QR Code"
              >
                <QrCode className="w-3.5 h-3.5 text-indigo-400" />
              </button>

              <button
                type="button"
                onClick={() => downloadVcfFile(profile)}
                className="p-1.5 rounded-md hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                title="Download Contact (.vcf)"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Tabs with smooth Left/Right scroll buttons */}
        <div className="relative flex items-center border-b border-slate-800 bg-slate-950/60 shrink-0 px-1">
          <button 
            type="button"
            onClick={() => scrollTabs('left')}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition shrink-0 z-10 cursor-pointer"
            title="Scroll tabs left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div 
            ref={tabsRef}
            className="flex items-center overflow-x-auto py-2 px-1 gap-1.5 scrollbar-none scroll-smooth shrink w-full"
          >
            <button 
              onClick={() => setActiveTab('cards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 whitespace-nowrap cursor-pointer ${
                activeTab === 'cards' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" /> My Cards ({userCards.length})
            </button>
            <button 
              onClick={() => setActiveTab('info')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 whitespace-nowrap cursor-pointer ${
                activeTab === 'info' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5" /> {isRealEstate ? 'Developer Info' : isInterior ? 'Architect & Studio' : isRestaurant ? 'Restaurant & Dining Info' : isHealthcare ? 'Doctor & Clinic' : isAutomobile ? 'Dealership Info' : isFashion ? 'Boutique & Atelier' : isEducation ? 'Academy & Affiliation' : isBeauty ? 'Salon & Studio' : isEvents ? 'Studio & Production' : isTravel ? 'Agency & Gateways' : isProfessional ? 'Counsel & Firm Info' : isHomeServices ? 'Agency & Dispatch Info' : isRetail ? 'Storefront & Hub Info' : 'Basic Info'}
            </button>
            <button 
              onClick={() => setActiveTab('products')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 whitespace-nowrap cursor-pointer ${
                activeTab === 'products' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {isRestaurant ? (
                <>
                  <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
                  <span>Digital Dining Menu ({profile.sectionData?.products?.items?.length || 0})</span>
                </>
              ) : isRealEstate ? (
                <>
                  <Building2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Projects &amp; Layouts ({profile.sectionData?.products?.items?.length || 0})</span>
                </>
              ) : isInterior ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Spaces &amp; Projects ({profile.sectionData?.products?.items?.length || 0})</span>
                </>
              ) : isRestaurant ? (
                <>
                  <Utensils className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dining Menu ({profile.sectionData?.products?.items?.length || 0})</span>
                </>
              ) : isHealthcare ? (
                <>
                  <Activity className="w-3.5 h-3.5 text-teal-400" />
                  <span>Health Packages ({profile.sectionData?.products?.items?.length || 0})</span>
                </>
              ) : isAutomobile ? (
                <>
                  <Car className="w-3.5 h-3.5 text-blue-400" />
                  <span>Vehicle Fleet ({profile.sectionData?.products?.items?.length || 0})</span>
                </>
              ) : isFashion ? (
                <>
                  <Shirt className="w-3.5 h-3.5 text-rose-400" />
                  <span>Couture Lookbook ({profile.sectionData?.products?.items?.length || 0})</span>
                </>
              ) : isEducation ? (
                <>
                  <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                  <span>Courses &amp; Batches ({profile.sectionData?.products?.items?.length || 0})</span>
                </>
              ) : isBeauty ? (
                <>
                  <Crown className="w-3.5 h-3.5 text-rose-400" />
                  <span>Bridal Packages ({profile.sectionData?.products?.items?.length || 0})</span>
                </>
              ) : isEvents ? (
                <>
                  <PartyPopper className="w-3.5 h-3.5 text-amber-400" />
                  <span>Event Packages ({profile.sectionData?.products?.items?.length || 0})</span>
                </>
              ) : isTravel ? (
                <>
                  <Plane className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Holiday Itineraries ({profile.sectionData?.products?.items?.length || 0})</span>
                </>
              ) : isProfessional ? (
                <>
                  <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                  <span>Retainers &amp; Advisory ({profile.sectionData?.products?.items?.length || 0})</span>
                </>
              ) : isHomeServices ? (
                <>
                  <Wrench className="w-3.5 h-3.5 text-amber-400" />
                  <span>Annual AMCs &amp; Packages ({profile.sectionData?.products?.items?.length || 0})</span>
                </>
              ) : isRetail ? (
                <>
                  <Store className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Store Inventory ({profile.sectionData?.products?.items?.length || 0})</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-pink-400" />
                  <span>WhatsApp Store</span>
                </>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('services')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 whitespace-nowrap cursor-pointer ${
                activeTab === 'services' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {isRestaurant ? (
                <>
                  <Calendar className="w-3.5 h-3.5 text-orange-400" />
                  <span>Table Reservations &amp; Dining ({profile.sectionData?.services?.items?.length || 0})</span>
                </>
              ) : isRealEstate ? (
                <>
                  <Calendar className="w-3.5 h-3.5 text-sky-400" />
                  <span>Site Visits &amp; Advisory</span>
                </>
              ) : isInterior ? (
                <>
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>Consultation &amp; Packages</span>
                </>
              ) : isRestaurant ? (
                <>
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Table Booking &amp; Catering</span>
                </>
              ) : isHealthcare ? (
                <>
                  <Stethoscope className="w-3.5 h-3.5 text-teal-400" />
                  <span>Treatments &amp; OPD</span>
                </>
              ) : isAutomobile ? (
                <>
                  <Car className="w-3.5 h-3.5 text-sky-400" />
                  <span>VIP Test Drives</span>
                </>
              ) : isFashion ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                  <span>Bespoke Fitting</span>
                </>
              ) : isEducation ? (
                <>
                  <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                  <span>Mentorship &amp; Demos</span>
                </>
              ) : isBeauty ? (
                <>
                  <Scissors className="w-3.5 h-3.5 text-rose-400" />
                  <span>Services &amp; Hair Menu</span>
                </>
              ) : isEvents ? (
                <>
                  <Camera className="w-3.5 h-3.5 text-violet-400" />
                  <span>Production &amp; Shoots</span>
                </>
              ) : isTravel ? (
                <>
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Travel Services</span>
                </>
              ) : isProfessional ? (
                <>
                  <Scale className="w-3.5 h-3.5 text-amber-400" />
                  <span>Practice Areas &amp; Consult</span>
                </>
              ) : isHomeServices ? (
                <>
                  <Wrench className="w-3.5 h-3.5 text-amber-400" />
                  <span>On-Demand Repairs &amp; Services</span>
                </>
              ) : isRetail ? (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Store Services &amp; Delivery</span>
                </>
              ) : (
                <>
                  <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                  <span>Services &amp; Packages</span>
                </>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('gallery')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 whitespace-nowrap cursor-pointer ${
                activeTab === 'gallery' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {isRestaurant ? (
                <>
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>Food &amp; Dining Photos</span>
                </>
              ) : isRealEstate ? (
                <>
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Blueprints &amp; Photos</span>
                </>
              ) : isInterior ? (
                <>
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Lookbooks &amp; 3D</span>
                </>
              ) : isRestaurant ? (
                <>
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ambiance &amp; Dishes</span>
                </>
              ) : isHealthcare ? (
                <>
                  <ImageIcon className="w-3.5 h-3.5 text-teal-400" />
                  <span>Clinic &amp; Facilities</span>
                </>
              ) : isAutomobile ? (
                <>
                  <ImageIcon className="w-3.5 h-3.5 text-sky-400" />
                  <span>Showroom &amp; Fleet</span>
                </>
              ) : isFashion ? (
                <>
                  <ImageIcon className="w-3.5 h-3.5 text-pink-400" />
                  <span>Couture Gallery</span>
                </>
              ) : isEducation ? (
                <>
                  <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span>Campus &amp; Labs</span>
                </>
              ) : isBeauty ? (
                <>
                  <ImageIcon className="w-3.5 h-3.5 text-rose-400" />
                  <span>Salon &amp; Lookbook</span>
                </>
              ) : isEvents ? (
                <>
                  <ImageIcon className="w-3.5 h-3.5 text-violet-400" />
                  <span>Celebration Lookbook</span>
                </>
              ) : isTravel ? (
                <>
                  <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Destinations &amp; Moments</span>
                </>
              ) : isProfessional ? (
                <>
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>Chambers &amp; Credentials</span>
                </>
              ) : isHomeServices ? (
                <>
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>On-Site Work &amp; Equipment</span>
                </>
              ) : isRetail ? (
                <>
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Storefront &amp; Showroom</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Portfolio Gallery</span>
                </>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('videos')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 whitespace-nowrap cursor-pointer ${
                activeTab === 'videos' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-rose-400" /> {isRestaurant ? 'Kitchen Reels & Ambience' : isRealEstate ? 'Drone & Walkthroughs' : isInterior ? '3D Tours & Reels' : 'Videos & Reels'}
            </button>
            <button 
              onClick={() => setActiveTab('socials')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 whitespace-nowrap cursor-pointer ${
                activeTab === 'socials' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Share2 className="w-3.5 h-3.5 text-purple-400" /> {isInterior ? 'Desk & Socials' : 'Channels & Socials'}
            </button>
            <button 
              onClick={() => setActiveTab('templates')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 whitespace-nowrap cursor-pointer ${
                activeTab === 'templates' ? 'bg-gradient-to-r from-indigo-600 to-pink-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Templates ({categoryTemplates.length})
            </button>
            <button 
              onClick={() => setActiveTab('theme')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 whitespace-nowrap cursor-pointer ${
                activeTab === 'theme' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Palette className="w-3.5 h-3.5" /> Themes &amp; Style
            </button>
            <button 
              onClick={() => setActiveTab('sections')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 whitespace-nowrap cursor-pointer ${
                activeTab === 'sections' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Section Order
            </button>
            <button 
              onClick={() => setActiveTab('blogs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 whitespace-nowrap cursor-pointer ${
                activeTab === 'blogs' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Articles &amp; Insights
            </button>
          </div>

          <button 
            type="button"
            onClick={() => scrollTabs('right')}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition shrink-0 z-10 cursor-pointer"
            title="Scroll tabs right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Content Body with Smooth Custom Scrollbar & Bottom Padding */}
        <div className="flex-1 overflow-y-auto overscroll-y-contain p-4 sm:p-6 space-y-6 min-h-0 pb-40 sm:pb-52 custom-builder-scroll">
          
          {/* TAB 0: MY MINI-WEBSITES (MULTI-STORE MANAGER) */}
          {activeTab === 'cards' && (
            <div className="space-y-6 max-w-3xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">My Commercial Mini-Websites</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {userCards.length} / {MAX_CARDS} Websites Used ({userPlan} Plan)
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Manage multiple commercial business mini-websites, niche marketing stores, or staff profiles under your business entity.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddCardModal}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 active:scale-95 transition shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Card ({userCards.length}/{MAX_CARDS})</span>
                </button>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userCards.map((card) => {
                  const isActive = card.slug === profile.slug;
                  return (
                    <div
                      key={card.id || card.slug}
                      className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                        isActive
                          ? 'bg-gradient-to-b from-indigo-950/40 to-slate-900 border-indigo-500/60 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-500/30'
                          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center shrink-0">
                            {card.avatarUrl ? (
                              <img src={card.avatarUrl} alt={card.name} className="w-full h-full object-cover" />
                            ) : (
                              <CreditCard className="w-6 h-6 text-indigo-400" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-white">{card.title || card.name}</h4>
                              {isActive && (
                                <span className="text-[10px] font-extrabold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                                  CURRENT ACTIVE
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">{card.designation || 'Business Profile'} • {card.company || 'Enterprise'}</p>
                          </div>
                        </div>

                        {!isActive && userCards.length > 1 && (
                          <button
                            onClick={(e) => handleDeleteCard(card.slug, e)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition"
                            title="Delete Website"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-xs text-indigo-300 font-mono truncate">
                          <span>/v/{card.slug}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(`${window.location.origin}/v/${card.slug}`);
                              setCopiedLink(true);
                              setTimeout(() => setCopiedLink(false), 2000);
                            }}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition text-[11px] flex items-center gap-1 border border-slate-800"
                            title="Copy Link"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <a
                            href={`/v/${card.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-indigo-400 hover:text-indigo-300 transition text-[11px] flex items-center gap-1 border border-slate-800"
                            title="Open Live Website"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>

                      <div className="pt-1 flex items-center gap-2">
                        {isActive ? (
                          <button
                            onClick={() => setActiveTab('info')}
                            className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow flex items-center justify-center gap-1.5"
                          >
                            <PenTool className="w-3.5 h-3.5" />
                            <span>Edit in Profile Studio</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              handleSwitchCard(card.slug);
                              setActiveTab('info');
                            }}
                            className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition flex items-center justify-center gap-1.5"
                          >
                            <Globe className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Switch &amp; Edit This Website</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Create Card Action Card */}
                <div
                  onClick={handleOpenAddCardModal}
                  className="p-6 rounded-2xl border-2 border-dashed border-slate-800 hover:border-indigo-500/60 bg-slate-900/30 hover:bg-slate-900/60 transition-all flex flex-col items-center justify-center text-center cursor-pointer group min-h-[190px]"
                >
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all flex items-center justify-center mb-3 shadow-md">
                    <Plus className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                    + Add New Mini-Website ({userCards.length}/{MAX_CARDS})
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">
                    Choose from 28 industry presets to build a tailored commercial mini-website with custom services and store.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: BASIC INFO & VISUAL IDENTITY */}
          {activeTab === 'info' && (
            <div className="space-y-6 max-w-2xl">
              
              {/* Photo Update Success Toast */}
              {photoUploadSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{photoUploadSuccess}</span>
                </div>
              )}

              {/* 1. VISUAL BRANDING & PROFILE PHOTO SUITE */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-indigo-950/40 border border-indigo-500/30 shadow-xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center">
                      <Camera className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Profile Photo & Visual Branding</h3>
                      <p className="text-[11px] text-slate-400">Upload your headshot, business logo, and background banner</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-medium">
                    Live Sync
                  </span>
                </div>

                {/* Primary Profile Avatar Section */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* Avatar Preview with Hover Camera Trigger */}
                      <div 
                        onClick={() => avatarFileInputRef.current?.click()}
                        className="relative w-20 h-20 rounded-full ring-4 ring-indigo-500/30 overflow-hidden cursor-pointer group bg-slate-800 shrink-0 shadow-lg"
                        title="Click to change profile photo"
                      >
                        {profile.avatarUrl ? (
                          <img 
                            src={profile.avatarUrl} 
                            alt={profile.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xl">
                            {profile.name?.charAt(0) || 'U'}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-semibold gap-0.5">
                          <Camera className="w-4 h-4" />
                          <span>Change</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-white">Profile Headshot / Avatar</h4>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">Recommended</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Shown at top of your mini-website, QR code & email signature.
                        </p>
                        <p className="text-[10px] text-slate-500 mt-1 font-mono">
                          PNG, JPG, WEBP • Max 10MB
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                      <input
                        type="file"
                        ref={avatarFileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              if (ev.target?.result) {
                                handleFieldChange('avatarUrl', ev.target.result as string);
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => avatarFileInputRef.current?.click()}
                        className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all active:scale-95"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAvatarPresets(!showAvatarPresets)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                          showAvatarPresets 
                            ? 'bg-indigo-950/80 border-indigo-500 text-indigo-300' 
                            : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Presets</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setAvatarUrlOpen(!avatarUrlOpen)}
                        className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition"
                        title="Paste image link URL"
                      >
                        <LinkIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Direct Avatar URL Input Drawer */}
                  {avatarUrlOpen && (
                    <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 animate-in fade-in">
                      <input
                        type="url"
                        value={profile.avatarUrl}
                        placeholder="Paste image URL (e.g. https://example.com/photo.jpg)"
                        onChange={e => handleFieldChange('avatarUrl', e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                      {profile.avatarUrl && (
                        <button
                          type="button"
                          onClick={() => handleFieldChange('avatarUrl', '')}
                          className="px-2.5 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-medium transition"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  )}

                  {/* Preset Avatar Selection Grid */}
                  {showAvatarPresets && (
                    <div className="pt-3 border-t border-slate-800/80 space-y-2 animate-in fade-in">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-indigo-300">Choose a Professional Avatar Preset:</span>
                        <button 
                          type="button" 
                          onClick={() => setShowAvatarPresets(false)}
                          className="text-[10px] text-slate-400 hover:text-white"
                        >
                          Close
                        </button>
                      </div>
                      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                        {AVATAR_PRESETS.map((preset) => (
                          <div
                            key={preset.id}
                            onClick={() => {
                              handleFieldChange('avatarUrl', preset.url);
                              setShowAvatarPresets(false);
                            }}
                            className={`group relative rounded-xl overflow-hidden aspect-square cursor-pointer border-2 transition-all ${
                              profile.avatarUrl === preset.url
                                ? 'border-indigo-500 ring-2 ring-indigo-500/40 scale-105 shadow-md'
                                : 'border-slate-800 hover:border-indigo-400/60 hover:scale-105'
                            }`}
                            title={preset.label}
                          >
                            <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                            {profile.avatarUrl === preset.url && (
                              <div className="absolute inset-0 bg-indigo-600/30 flex items-center justify-center">
                                <Check className="w-4 h-4 text-white drop-shadow-md" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Company Logo & Cover Banner in 2 Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Business Logo Box */}
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center">
                          <Briefcase className="w-3 h-3" />
                        </div>
                        <label className="text-xs font-bold text-white">Business Logo</label>
                      </div>
                      <span className="text-[9px] text-slate-500">Optional</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div 
                        onClick={() => logoFileInputRef.current?.click()}
                        className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden cursor-pointer hover:border-amber-500 transition shrink-0"
                      >
                        {(profile as any).logoUrl ? (
                          <img src={(profile as any).logoUrl} alt="Logo" className="w-full h-full object-contain p-1" />
                        ) : (
                          <Upload className="w-4 h-4 text-slate-500" />
                        )}
                      </div>

                      <div className="flex-1 space-y-1.5">
                        <input
                          type="file"
                          ref={logoFileInputRef}
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                if (ev.target?.result) {
                                  const val = ev.target.result as string;
                                  handleFieldChange('logoUrl' as any, val);
                                  try {
                                    const session = localStorage.getItem('oneclickbiz_user_session');
                                    const parsed = session ? JSON.parse(session) : {};
                                    parsed.logoUrl = val;
                                    localStorage.setItem('oneclickbiz_user_session', JSON.stringify(parsed));
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => logoFileInputRef.current?.click()}
                            className="px-2.5 py-1.5 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 text-[11px] font-semibold flex items-center gap-1 transition"
                          >
                            <Upload className="w-3 h-3" />
                            <span>Upload Logo</span>
                          </button>
                          {(profile as any).logoUrl && (
                            <button
                              type="button"
                              onClick={() => handleFieldChange('logoUrl' as any, '')}
                              className="px-2 py-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-rose-400 text-[11px] transition"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Header Cover Banner Box */}
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-purple-500/20 text-purple-400 flex items-center justify-center">
                          <ImageIcon className="w-3 h-3" />
                        </div>
                        <label className="text-xs font-bold text-white">Header Cover Banner</label>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowCoverPresets(!showCoverPresets)}
                        className="text-[10px] text-indigo-400 hover:text-indigo-300 font-medium"
                      >
                        {showCoverPresets ? 'Hide Presets' : 'Presets'}
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <div 
                        onClick={() => coverFileInputRef.current?.click()}
                        className="w-16 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden cursor-pointer hover:border-purple-500 transition shrink-0"
                      >
                        {profile.coverUrl ? (
                          <img src={profile.coverUrl} alt="Cover" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-slate-500" />
                        )}
                      </div>

                      <div className="flex-1 space-y-1.5">
                        <input
                          type="file"
                          ref={coverFileInputRef}
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                if (ev.target?.result) {
                                  handleFieldChange('coverUrl', ev.target.result as string);
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => coverFileInputRef.current?.click()}
                            className="px-2.5 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-[11px] font-semibold flex items-center gap-1 transition"
                          >
                            <Upload className="w-3 h-3" />
                            <span>Upload Banner</span>
                          </button>
                          {profile.coverUrl && (
                            <button
                              type="button"
                              onClick={() => handleFieldChange('coverUrl', '')}
                              className="px-2 py-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-rose-400 text-[11px] transition"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Cover Presets */}
                    {showCoverPresets && (
                      <div className="grid grid-cols-5 gap-1.5 pt-2 border-t border-slate-800/80 animate-in fade-in">
                        {COVER_PRESETS.map(c => (
                          <div
                            key={c.id}
                            onClick={() => {
                              handleFieldChange('coverUrl', c.url);
                              setShowCoverPresets(false);
                            }}
                            className={`h-7 rounded-md overflow-hidden cursor-pointer border transition-all ${
                              profile.coverUrl === c.url ? 'border-purple-400 ring-2 ring-purple-500/40' : 'border-slate-800 hover:border-purple-500/60'
                            }`}
                            title={c.label}
                          >
                            <img src={c.url} alt={c.label} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </div>

              {/* 2. CORE IDENTITY & CONTACT FIELDS */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Profile Details & Contact Info
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300">Full Name</label>
                    <input 
                      type="text" 
                      value={profile.name}
                      placeholder="e.g. Kishore Patel"
                      onChange={e => handleFieldChange('name', e.target.value)}
                      className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300">Designation / Professional Title</label>
                    <input 
                      type="text" 
                      value={profile.designation}
                      placeholder="e.g. Founder & Managing Director"
                      onChange={e => handleFieldChange('designation', e.target.value)}
                      className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 shadow-inner"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300">Company / Brand Name</label>
                    <input 
                      type="text" 
                      value={profile.company}
                      placeholder="e.g. Himastech Digital Reality"
                      onChange={e => handleFieldChange('company', e.target.value)}
                      className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300">Custom Profile Slug</label>
                    <div className="flex items-center mt-1">
                      <span className="px-2.5 py-2 bg-slate-800 border border-r-0 border-slate-700 rounded-l-lg text-[11px] text-slate-400 font-mono">/v/</span>
                      <input 
                        type="text" 
                        value={profile.slug}
                        onChange={e => handleFieldChange('slug', e.target.value)}
                        className="w-full px-3 py-2 rounded-r-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-indigo-500 shadow-inner"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Bio Summary</label>
                  <textarea 
                    rows={3}
                    value={profile.bio}
                    placeholder="Briefly describe what you or your business does..."
                    onChange={e => handleFieldChange('bio', e.target.value)}
                    className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 shadow-inner resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300">WhatsApp Number</label>
                    <input 
                      type="text" 
                      value={profile.whatsapp}
                      placeholder="+91 63049 89071"
                      onChange={e => handleFieldChange('whatsapp', e.target.value)}
                      className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300">Phone Number</label>
                    <input 
                      type="text" 
                      value={profile.phone}
                      placeholder="+91 63049 89071"
                      onChange={e => handleFieldChange('phone', e.target.value)}
                      className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 shadow-inner"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300">Email Address</label>
                    <input 
                      type="email" 
                      value={profile.email}
                      placeholder="alex@apexstudio.design"
                      onChange={e => handleFieldChange('email', e.target.value)}
                      className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300">Website URL</label>
                    <input 
                      type="url" 
                      value={profile.website}
                      placeholder="https://apexstudio.design"
                      onChange={e => handleFieldChange('website', e.target.value)}
                      className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Office / Location Address</label>
                  <input 
                    type="text" 
                    value={profile.address}
                    placeholder="Suite 400, Innovation Tower, Cyber City"
                    onChange={e => handleFieldChange('address', e.target.value)}
                    className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 shadow-inner"
                  />
                </div>

                {/* Direct UPI Payment VPA & Google Review Booster Configuration */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/50 border border-indigo-500/30 space-y-3 pt-3 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Smart Conversions &amp; Payment Settings</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                          <span>⚡ Direct UPI ID (VPA)</span>
                        </label>
                        <span className="text-[10px] text-emerald-400/80 font-mono">0% Fee</span>
                      </div>
                      <input 
                        type="text" 
                        value={profile.upiId || ''}
                        placeholder="e.g. 9876543210@paytm or business@okhdfcbank"
                        onChange={e => handleFieldChange('upiId', e.target.value)}
                        className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-950 border border-emerald-500/40 text-xs text-white font-mono focus:outline-none focus:border-emerald-400 shadow-inner"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">
                        Powers the ⚡ Pay via UPI button and dynamic QR code on your live card.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                          <span>⭐ Google 5-Star Review URL</span>
                        </label>
                        <span className="text-[10px] text-amber-400/80 font-mono">SEO Booster</span>
                      </div>
                      <input 
                        type="url" 
                        value={profile.googleReviewUrl || ''}
                        placeholder="https://g.page/r/YOUR_ID/review"
                        onChange={e => handleFieldChange('googleReviewUrl', e.target.value)}
                        className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-950 border border-amber-500/40 text-xs text-white font-mono focus:outline-none focus:border-amber-400 shadow-inner"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">
                        Deep-links visitors directly to submit a 5-star review on Google Maps.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. REAL ESTATE TS-RERA & LEGAL DILIGENCE PROFILE */}
                {isRealEstate && (
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0A192F]/80 to-slate-900 border border-amber-500/40 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                            TS-RERA &amp; Legal Trust Credentials
                          </h4>
                          <p className="text-[11px] text-slate-400">
                            Displayed on your top trust strip, hero badge, and live certificate stamps.
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30">
                        100% Verified
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>TS-RERA Sanction / Registration ID</span>
                        </label>
                        <input 
                          type="text"
                          value={profile.sectionData?.realEstate?.reraId ?? ''}
                          placeholder="e.g. TS-RERA/P02400008921"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                realEstate: {
                                  ...(prev.sectionData?.realEstate || {}),
                                  reraId: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-amber-300 font-mono focus:outline-none focus:border-amber-500 shadow-inner"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-sky-400" />
                          <span>Primary City &amp; Corridor</span>
                        </label>
                        <input 
                          type="text"
                          value={profile.sectionData?.realEstate?.city ?? ''}
                          placeholder="e.g. Hyderabad • Future City Corridor"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                realEstate: {
                                  ...(prev.sectionData?.realEstate || {}),
                                  city: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-sky-500 shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Legal Track Record</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.realEstate?.trackRecordYears ?? ''}
                          placeholder="e.g. 18+ Years"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                realEstate: {
                                  ...(prev.sectionData?.realEstate || {}),
                                  trackRecordYears: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Delivered Projects</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.realEstate?.deliveredProjects ?? ''}
                          placeholder="e.g. 18+"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                realEstate: {
                                  ...(prev.sectionData?.realEstate || {}),
                                  deliveredProjects: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Developed Acres</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.realEstate?.developedAcres ?? ''}
                          placeholder="e.g. 450+"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                realEstate: {
                                  ...(prev.sectionData?.realEstate || {}),
                                  developedAcres: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Happy Families</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.realEstate?.happyFamilies ?? ''}
                          placeholder="e.g. 2,400+"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                realEstate: {
                                  ...(prev.sectionData?.realEstate || {}),
                                  happyFamilies: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="text-[11px] font-semibold text-slate-400">Clear Title Rating / Guarantee</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.realEstate?.clearTitleRating ?? ''}
                          placeholder="e.g. 100% Clear Title Guaranteed"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                realEstate: {
                                  ...(prev.sectionData?.realEstate || {}),
                                  clearTitleRating: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. INTERIOR DESIGN & IIID CREDENTIALS */}
                {isInterior && (
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-stone-900 to-amber-950/40 border border-amber-500/40 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                            IIID Certification &amp; Studio Warranties
                          </h4>
                          <p className="text-[11px] text-slate-400">
                            Displayed on your top warranty ribbon, trust badges, and handover certificates.
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30">
                        Turnkey Verified
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                          <span>IIID Studio Registration / License No.</span>
                        </label>
                        <input 
                          type="text"
                          value={profile.sectionData?.interior?.iiidId ?? 'IIID/TS/ARCH-2024-884'}
                          placeholder="e.g. IIID/TS/ARCH-2024-884"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                interior: {
                                  ...(prev.sectionData?.interior || {}),
                                  iiidId: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-amber-300 font-mono focus:outline-none focus:border-amber-500 shadow-inner"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-rose-400" />
                          <span>Studio &amp; Experience Center Address</span>
                        </label>
                        <input 
                          type="text"
                          value={profile.sectionData?.interior?.city ?? 'Road No. 36, Jubilee Hills, Hyderabad'}
                          placeholder="e.g. Jubilee Hills, Hyderabad"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                interior: {
                                  ...(prev.sectionData?.interior || {}),
                                  city: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500 shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Flat Replacement Warranty</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.interior?.warrantyYears ?? '10-Year'}
                          placeholder="e.g. 10-Year"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                interior: {
                                  ...(prev.sectionData?.interior || {}),
                                  warrantyYears: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Handover Guarantee</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.interior?.turnkeyGuaranteeDays ?? '45 Days'}
                          placeholder="e.g. 45 Days"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                interior: {
                                  ...(prev.sectionData?.interior || {}),
                                  turnkeyGuaranteeDays: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Delivered Homes</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.interior?.completedHomes ?? '350+'}
                          placeholder="e.g. 350+"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                interior: {
                                  ...(prev.sectionData?.interior || {}),
                                  completedHomes: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Happy Homeowners</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.interior?.happyClients ?? '350+'}
                          placeholder="e.g. 350+"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                interior: {
                                  ...(prev.sectionData?.interior || {}),
                                  happyClients: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. HEALTHCARE & MEDICAL COUNCIL REGISTRATION CREDENTIALS */}
                {isHealthcare && (
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-teal-950/40 to-slate-900 border border-teal-500/40 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center">
                          <Stethoscope className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-teal-300">
                            MCI / NMC Medical Council Registration &amp; Clinic Credentials
                          </h4>
                          <p className="text-[11px] text-slate-400">
                            Displayed on your doctor badge, trust verification ribbon, and appointment desk.
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-300 font-bold border border-teal-500/30">
                        Doctor Verified
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                          <span>Medical Council Reg. ID / License</span>
                        </label>
                        <input 
                          type="text"
                          value={profile.sectionData?.healthcare?.regNumber ?? 'TSMC/DOC/2018/8892'}
                          placeholder="e.g. TSMC/DOC/2018/8892"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                healthcare: {
                                  ...(prev.sectionData?.healthcare || {}),
                                  regNumber: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-teal-300 font-mono focus:outline-none focus:border-teal-500 shadow-inner"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-amber-400" />
                          <span>Degrees, Qualifications &amp; Fellowships</span>
                        </label>
                        <input 
                          type="text"
                          value={profile.sectionData?.healthcare?.degrees ?? 'MBBS, MD, FACC (USA)'}
                          placeholder="e.g. MBBS, MD, DM Cardiology"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                healthcare: {
                                  ...(prev.sectionData?.healthcare || {}),
                                  degrees: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-teal-500 shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Clinical Specialization / Department</span>
                        </label>
                        <input 
                          type="text"
                          value={profile.sectionData?.healthcare?.specialization ?? 'Senior Interventional Cardiologist'}
                          placeholder="e.g. Senior Interventional Cardiologist"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                healthcare: {
                                  ...(prev.sectionData?.healthcare || {}),
                                  specialization: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-teal-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-sky-400" />
                          <span>Hospital / Clinic Affiliation</span>
                        </label>
                        <input 
                          type="text"
                          value={profile.sectionData?.healthcare?.hospitalAffiliation ?? 'Apollo Hospitals & Heart Clinic'}
                          placeholder="e.g. Apollo Hospitals & Heart Clinic"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                healthcare: {
                                  ...(prev.sectionData?.healthcare || {}),
                                  hospitalAffiliation: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">OPD Timings</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.healthcare?.opdTimings ?? 'Mon - Sat: 10:00 AM - 02:00 PM'}
                          placeholder="e.g. Mon - Sat: 10:00 AM - 02:00 PM"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                healthcare: {
                                  ...(prev.sectionData?.healthcare || {}),
                                  opdTimings: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Consultation Fee</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.healthcare?.consultationFee ?? '₹800'}
                          placeholder="e.g. ₹800"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                healthcare: {
                                  ...(prev.sectionData?.healthcare || {}),
                                  consultationFee: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">24/7 Emergency Helpline</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.healthcare?.emergencyPhone ?? '+91 98765 00108'}
                          placeholder="e.g. +91 98765 00108"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                healthcare: {
                                  ...(prev.sectionData?.healthcare || {}),
                                  emergencyPhone: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-teal-300 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. AUTOMOBILE DEALERSHIP & 150-POINT INSPECTION CREDENTIALS */}
                {isAutomobile && (
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/40 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-400 flex items-center justify-center">
                          <Car className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-sky-300">
                            Dealership Authorization &amp; Quality Inspection Standards
                          </h4>
                          <p className="text-[11px] text-slate-400">
                            Displayed on your showroom trust banner, vehicle warranty ribbon, and test drive scheduler.
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-300 font-bold border border-sky-500/30">
                        150-Pt Inspected
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-sky-400" />
                          <span>Authorized Brand / Dealership Category</span>
                        </label>
                        <input 
                          type="text"
                          value={profile.sectionData?.automobile?.brandAuthorized ?? 'Certified Multi-Brand & Pre-Owned Arena'}
                          placeholder="e.g. Maruti Suzuki Arena / Hyundai Signature"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                automobile: {
                                  ...(prev.sectionData?.automobile || {}),
                                  brandAuthorized: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-sky-300 focus:outline-none focus:border-sky-500 shadow-inner"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Quality Guarantee / Inspection Seal</span>
                        </label>
                        <input 
                          type="text"
                          value={profile.sectionData?.automobile?.inspectionCertification ?? '150-Point Certified Quality Inspection'}
                          placeholder="e.g. 150-Point Certified Quality Inspection"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                automobile: {
                                  ...(prev.sectionData?.automobile || {}),
                                  inspectionCertification: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-sky-500 shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">VIP Test Drive Hours</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.automobile?.testDriveTimings ?? 'Mon - Sun: 09:30 AM - 08:00 PM'}
                          placeholder="e.g. Mon - Sun: 09:30 AM - 08:00 PM"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                automobile: {
                                  ...(prev.sectionData?.automobile || {}),
                                  testDriveTimings: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Warranty Coverage</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.automobile?.warrantyCoverage ?? '3 Years Comprehensive + RSA'}
                          placeholder="e.g. 3 Years Comprehensive"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                automobile: {
                                  ...(prev.sectionData?.automobile || {}),
                                  warrantyCoverage: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Finance &amp; EMI Partners</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.automobile?.financePartners ?? 'HDFC Bank, SBI Auto, ICICI Bank'}
                          placeholder="e.g. HDFC, SBI Auto, ICICI"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                automobile: {
                                  ...(prev.sectionData?.automobile || {}),
                                  financePartners: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. FASHION & COUTURE ATELIER CREDENTIALS */}
                {isFashion && (
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-rose-950/40 to-slate-900 border border-rose-500/40 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center">
                          <Shirt className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300">
                            Boutique Verification &amp; Couture Standards
                          </h4>
                          <p className="text-[11px] text-slate-400">
                            Displayed on your silk mark trust banner, bridal consultation desk, and shipping guarantee.
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-300 font-bold border border-rose-500/30">
                        Silk Mark Verified
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-amber-400" />
                          <span>Certification / Handloom Registration</span>
                        </label>
                        <input 
                          type="text"
                          value={profile.sectionData?.fashion?.certification ?? '100% Pure Silk Mark & Handloom Certified'}
                          placeholder="e.g. 100% Pure Silk Mark Certified"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                fashion: {
                                  ...(prev.sectionData?.fashion || {}),
                                  certification: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-rose-300 focus:outline-none focus:border-rose-500 shadow-inner"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                          <span>Couture Specialization</span>
                        </label>
                        <input 
                          type="text"
                          value={profile.sectionData?.fashion?.coutureSpecialization ?? 'Bridal Kanjeevarams & Haute Couture'}
                          placeholder="e.g. Bridal Kanjeevarams & Designer Lehengas"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                fashion: {
                                  ...(prev.sectionData?.fashion || {}),
                                  coutureSpecialization: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-rose-500 shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Bridal Fitting Hours</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.fashion?.consultationTimings ?? 'By Appointment: 11:00 AM - 07:30 PM'}
                          placeholder="e.g. By Appointment: 11:00 AM - 07:30 PM"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                fashion: {
                                  ...(prev.sectionData?.fashion || {}),
                                  consultationTimings: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Shipping Scope</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.fashion?.shippingCoverage ?? 'Pan-India Free Express + DHL Worldwide'}
                          placeholder="e.g. Pan-India Express + DHL Worldwide"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                fashion: {
                                  ...(prev.sectionData?.fashion || {}),
                                  shippingCoverage: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Exchange Guarantee</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.fashion?.exchangePolicy ?? '7-Day Hassle-Free Exchange Guarantee'}
                          placeholder="e.g. 7-Day Hassle-Free Exchange"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                fashion: {
                                  ...(prev.sectionData?.fashion || {}),
                                  exchangePolicy: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 8. EDUCATION ACADEMY & ACCREDITATION STANDARDS */}
                {isEducation && (
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/40 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300">
                            Academic Accreditation &amp; Board Affiliation
                          </h4>
                          <p className="text-[11px] text-slate-400">
                            Displayed on your campus trust banner, student admission desk, and rankers strip.
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 font-bold border border-blue-500/30">
                        Govt. Accredited
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                          <span>Board / Council Affiliation</span>
                        </label>
                        <input 
                          type="text"
                          value={profile.sectionData?.education?.boardAffiliation ?? 'Central Board & State Council Accredited'}
                          placeholder="e.g. CBSE / State Council Accredited"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                education: {
                                  ...(prev.sectionData?.education || {}),
                                  boardAffiliation: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-blue-300 focus:outline-none focus:border-blue-500 shadow-inner"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-amber-400" />
                          <span>Accreditation / ISO Standard</span>
                        </label>
                        <input 
                          type="text"
                          value={profile.sectionData?.education?.accreditation ?? 'ISO 9001:2015 & Govt. Recognized'}
                          placeholder="e.g. ISO 9001:2015 Certified"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                education: {
                                  ...(prev.sectionData?.education || {}),
                                  accreditation: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500 shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Total Students Mentored</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.education?.totalStudentsTrained ?? '12,500+'}
                          placeholder="e.g. 12,500+"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                education: {
                                  ...(prev.sectionData?.education || {}),
                                  totalStudentsTrained: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Placement / Selection Rate</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.education?.placementRate ?? '96.8% Success Rate'}
                          placeholder="e.g. 96.8% Success Rate"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                education: {
                                  ...(prev.sectionData?.education || {}),
                                  placementRate: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Demo &amp; Counseling Hours</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.education?.demoTimings ?? 'Mon - Sat: 09:00 AM - 07:00 PM'}
                          placeholder="e.g. Mon - Sat: 09:00 AM - 07:00 PM"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                education: {
                                  ...(prev.sectionData?.education || {}),
                                  demoTimings: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 9. BEAUTY & LUXURY SALON CERTIFICATIONS */}
                {isBeauty && (
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0C0A09] via-rose-950/40 to-[#0C0A09] border border-rose-500/40 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center">
                          <Scissors className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300">
                            Stylist Certifications &amp; Hygiene Standards
                          </h4>
                          <p className="text-[11px] text-stone-400">
                            Displayed on your salon trust strip, service menu, and appointment scheduler.
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-300 font-bold border border-rose-500/30">
                        Luxury Certified
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                          <span>Stylist &amp; Aesthetician Certification</span>
                        </label>
                        <input 
                          type="text"
                          value={profile.sectionData?.beauty?.stylistCertification ?? 'CIDESCO & L’Oréal Certified Master Stylists'}
                          placeholder="e.g. CIDESCO / L'Oréal Certified"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                beauty: {
                                  ...(prev.sectionData?.beauty || {}),
                                  stylistCertification: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-rose-300 focus:outline-none focus:border-rose-500 shadow-inner"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-amber-400" />
                          <span>Hygiene Protocol &amp; Sterilization</span>
                        </label>
                        <input 
                          type="text"
                          value={profile.sectionData?.beauty?.hygieneProtocol ?? '100% Autoclaved Tools & Single-Use Linens'}
                          placeholder="e.g. 100% Autoclaved Tools"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                beauty: {
                                  ...(prev.sectionData?.beauty || {}),
                                  hygieneProtocol: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-rose-500 shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      <div>
                        <label className="text-[11px] font-semibold text-stone-400">Salon Operating Hours</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.beauty?.operatingHours ?? '10:00 AM - 08:30 PM (Daily)'}
                          placeholder="e.g. 10:00 AM - 08:30 PM"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                beauty: {
                                  ...(prev.sectionData?.beauty || {}),
                                  operatingHours: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-stone-950 border border-stone-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-stone-400">Luxury Product Brands</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.beauty?.productBrandsUsed ?? 'Dyson, Kérastase, Olaplex & Charlotte Tilbury'}
                          placeholder="e.g. Dyson, Kérastase, Olaplex"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                beauty: {
                                  ...(prev.sectionData?.beauty || {}),
                                  productBrandsUsed: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-stone-950 border border-stone-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-stone-400">Bridal Advance Notice</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.beauty?.bridalSlotsNotice ?? 'Advance Booking Required for Wedding Dates'}
                          placeholder="e.g. Advance Booking Required"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                beauty: {
                                  ...(prev.sectionData?.beauty || {}),
                                  bridalSlotsNotice: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-stone-950 border border-stone-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 10. EVENTS & CREATIVE PRODUCTION STANDARDS */}
                {isEvents && (
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-violet-950/40 to-slate-900 border border-violet-500/40 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-violet-500/20 border border-violet-500/40 text-violet-400 flex items-center justify-center">
                          <PartyPopper className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-violet-300">
                            Event Specialization &amp; Production Standards
                          </h4>
                          <p className="text-[11px] text-slate-400">
                            Displayed on your event trust banner, package cards, and date check scheduler.
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-300 font-bold border border-violet-500/30">
                        Lead Producer
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
                          <span>Event Specialization</span>
                        </label>
                        <input 
                          type="text"
                          value={profile.sectionData?.events?.eventSpecialization ?? 'Destination Weddings & Luxury Celebrations'}
                          placeholder="e.g. Destination Weddings & Luxury Celebrations"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                events: {
                                  ...(prev.sectionData?.events || {}),
                                  eventSpecialization: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-violet-300 focus:outline-none focus:border-violet-500 shadow-inner"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-amber-400" />
                          <span>In-House Production Capability</span>
                        </label>
                        <input 
                          type="text"
                          value={profile.sectionData?.events?.productionCapability ?? 'In-House Sound, 4K Drones & Stage Decor'}
                          placeholder="e.g. In-House Sound, 4K Drones & Stage Decor"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                events: {
                                  ...(prev.sectionData?.events || {}),
                                  productionCapability: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-violet-500 shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Events Executed</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.events?.eventsExecuted ?? '350+ Celebrations Executed'}
                          placeholder="e.g. 350+ Celebrations"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                events: {
                                  ...(prev.sectionData?.events || {}),
                                  eventsExecuted: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Experience in Years</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.events?.experienceYears ?? '12+ Years'}
                          placeholder="e.g. 12+ Years"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                events: {
                                  ...(prev.sectionData?.events || {}),
                                  experienceYears: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Locations Covered</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.events?.serviceLocations ?? 'Pan-India & Destination Weddings'}
                          placeholder="e.g. Pan-India & Destination Weddings"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                events: {
                                  ...(prev.sectionData?.events || {}),
                                  serviceLocations: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 11. TRAVEL & HOSPITALITY AGENCY CREDENTIALS */}
                {isTravel && (
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/40 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
                          <Plane className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                            Agency Accreditation &amp; Travel Concierge
                          </h4>
                          <p className="text-[11px] text-slate-400">
                            Displayed on your agency trust banner, itinerary cards, and trip planner desk.
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 font-bold border border-cyan-500/30">
                        IATA Partner
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Agency Accreditation / Registration</span>
                        </label>
                        <input 
                          type="text"
                          value={profile.sectionData?.travel?.agencyRegistration ?? 'IATA Accredited & Ministry of Tourism Recognized'}
                          placeholder="e.g. IATA Accredited"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                travel: {
                                  ...(prev.sectionData?.travel || {}),
                                  agencyRegistration: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-cyan-300 focus:outline-none focus:border-cyan-500 shadow-inner"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-amber-400" />
                          <span>Customization Policy</span>
                        </label>
                        <input 
                          type="text"
                          value={profile.sectionData?.travel?.customizationPolicy ?? '100% Tailored Private Itineraries'}
                          placeholder="e.g. 100% Tailored Private Itineraries"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                travel: {
                                  ...(prev.sectionData?.travel || {}),
                                  customizationPolicy: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500 shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Gateways &amp; Destinations</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.travel?.destinationsCovered ?? '75+ Domestic & Global Gateways'}
                          placeholder="e.g. 75+ Gateways"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                travel: {
                                  ...(prev.sectionData?.travel || {}),
                                  destinationsCovered: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Happy Explorers</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.travel?.happyTravelers ?? '25,000+ Happy Explorers'}
                          placeholder="e.g. 25,000+ Happy Explorers"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                travel: {
                                  ...(prev.sectionData?.travel || {}),
                                  happyTravelers: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Concierge Support Hours</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.travel?.supportHours ?? '24/7 Dedicated Ground Concierge'}
                          placeholder="e.g. 24/7 Dedicated Ground Concierge"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                travel: {
                                  ...(prev.sectionData?.travel || {}),
                                  supportHours: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 12. PROFESSIONAL SERVICES (LEGAL, CA, CONSULTANTS) CREDENTIALS */}
                {isProfessional && (
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/40 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
                          <Scale className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                            Professional Bar / ICAI Accreditation &amp; Chambers
                          </h4>
                          <p className="text-[11px] text-slate-400">
                            Displayed on your advisory trust strip, consultation desk, and practice credentials.
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30">
                        Senior Counsel
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                          <span>Bar Council / ICAI / Council Reg No.</span>
                        </label>
                        <input 
                          type="text"
                          value={profile.sectionData?.professional?.barCouncilOrIcaId ?? 'Bar Council / ICAI Enrolled • High Court Practice'}
                          placeholder="e.g. Bar Council Enrolled"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                professional: {
                                  ...(prev.sectionData?.professional || {}),
                                  barCouncilOrIcaId: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-amber-300 focus:outline-none focus:border-amber-500 shadow-inner"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-yellow-400" />
                          <span>Confidentiality &amp; NDA Policy</span>
                        </label>
                        <input 
                          type="text"
                          value={profile.sectionData?.professional?.confidentialityPolicy ?? '100% Strict Attorney-Client Privilege & NDA'}
                          placeholder="e.g. 100% Strict Attorney-Client Privilege"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                professional: {
                                  ...(prev.sectionData?.professional || {}),
                                  confidentialityPolicy: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500 shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Years in Practice</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.professional?.practiceYears ?? '15+ Years Industry Experience'}
                          placeholder="e.g. 15+ Years"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                professional: {
                                  ...(prev.sectionData?.professional || {}),
                                  practiceYears: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Cases / Matters Handled</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.professional?.casesOrClientsCount ?? '1,200+ Corporate & Individual Matters Handled'}
                          placeholder="e.g. 1,200+ Matters"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                professional: {
                                  ...(prev.sectionData?.professional || {}),
                                  casesOrClientsCount: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Consultation Format</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.professional?.consultationMode ?? 'In-Chamber & Secure Virtual Advisory Desk'}
                          placeholder="e.g. In-Chamber & Virtual"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                professional: {
                                  ...(prev.sectionData?.professional || {}),
                                  consultationMode: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 13. HOME & PROFESSIONAL SERVICES (PLUMBING, ELECTRICAL, HVAC, PEST, CLEANING) */}
                {isHomeServices && (
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/40 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center">
                          <Wrench className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300">
                            Service Fleet Standards &amp; Workmanship Guarantee
                          </h4>
                          <p className="text-[11px] text-slate-400">
                            Displayed on your emergency top banner, technician badges, and rate card.
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30">
                        Rapid Dispatch
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                          <span>Service Warranty Duration</span>
                        </label>
                        <input 
                          type="text"
                          value={profile.sectionData?.homeServices?.serviceWarrantyDays ?? '30-Day Workmanship Warranty'}
                          placeholder="e.g. 30-Day Workmanship Warranty"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                homeServices: {
                                  ...(prev.sectionData?.homeServices || {}),
                                  serviceWarrantyDays: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-blue-300 focus:outline-none focus:border-blue-500 shadow-inner"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          <span>Arrival Window / Response Time</span>
                        </label>
                        <input 
                          type="text"
                          value={profile.sectionData?.homeServices?.responseTime ?? 'Within 45-60 Mins On-Site Arrival'}
                          placeholder="e.g. Within 45-60 Mins"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                homeServices: {
                                  ...(prev.sectionData?.homeServices || {}),
                                  responseTime: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500 shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Crew Background Checks</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.homeServices?.verifiedTechniciansCount ?? '100% Police & Background Verified Crew'}
                          placeholder="e.g. 100% Background Verified"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                homeServices: {
                                  ...(prev.sectionData?.homeServices || {}),
                                  verifiedTechniciansCount: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Pricing Transparency</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.homeServices?.pricingStandard ?? 'Standard Upfront Rate Card • No Hidden Charges'}
                          placeholder="e.g. Transparent Rate Card"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                homeServices: {
                                  ...(prev.sectionData?.homeServices || {}),
                                  pricingStandard: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Emergency Availability</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.homeServices?.emergencyAvailability ?? '24/7 Rapid Emergency Dispatch'}
                          placeholder="e.g. 24/7 Rapid Dispatch"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                homeServices: {
                                  ...(prev.sectionData?.homeServices || {}),
                                  emergencyAvailability: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 14. RETAIL & LOCAL SHOPS CREDENTIALS */}
                {isRetail && (
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/40 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                          <Store className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                            Store Authenticity &amp; Retail Fulfillment
                          </h4>
                          <p className="text-[11px] text-slate-400">
                            Displayed on your store header, product cards, and WhatsApp checkout desk.
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 font-bold border border-emerald-500/30">
                        Authorized Dealer
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Storefront / Stock Authenticity</span>
                        </label>
                        <input 
                          type="text"
                          value={profile.sectionData?.retail?.storeType ?? '100% Genuine Authorized Dealer & Brand Stock'}
                          placeholder="e.g. 100% Genuine Authorized Dealer"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                retail: {
                                  ...(prev.sectionData?.retail || {}),
                                  storeType: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-emerald-300 focus:outline-none focus:border-emerald-500 shadow-inner"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-amber-400" />
                          <span>Return &amp; Exchange Policy</span>
                        </label>
                        <input 
                          type="text"
                          value={profile.sectionData?.retail?.returnExchangePolicy ?? '7-Day Easy Store Exchange Policy'}
                          placeholder="e.g. 7-Day Easy Store Exchange"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                retail: {
                                  ...(prev.sectionData?.retail || {}),
                                  returnExchangePolicy: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500 shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Local Delivery Radius</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.retail?.deliveryRadius ?? 'Same-Day Express Local Delivery'}
                          placeholder="e.g. Same-Day Express Delivery"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                retail: {
                                  ...(prev.sectionData?.retail || {}),
                                  deliveryRadius: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Tax Invoice &amp; Warranty</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.retail?.billingGst ?? 'Official GST Invoice with Full Brand Warranty'}
                          placeholder="e.g. Official GST Invoice"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                retail: {
                                  ...(prev.sectionData?.retail || {}),
                                  billingGst: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">VIP Loyalty Perks</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.retail?.loyaltyPerks ?? 'Instant Member Discounts & Cashback Points'}
                          placeholder="e.g. Instant Member Discounts"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                retail: {
                                  ...(prev.sectionData?.retail || {}),
                                  loyaltyPerks: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 15. FOOD BUSINESS & RESTAURANT TRUST & CREDENTIALS */}
                {isRestaurant && (
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-stone-900 to-amber-950/40 border border-amber-500/40 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
                          <UtensilsCrossed className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                            Restaurant Trust, Dining &amp; FSSAI Standards
                          </h4>
                          <p className="text-[11px] text-slate-400">
                            Displayed on your digital menu header, table booking desk, and WhatsApp order cart.
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30">
                        FSSAI Verified
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>FSSAI License / Registration No.</span>
                        </label>
                        <input 
                          type="text"
                          value={profile.sectionData?.restaurant?.fssaiNumber ?? 'FSSAI Lic. No. 13624014000892'}
                          placeholder="e.g. FSSAI Lic. No. 13624014000892"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                restaurant: {
                                  ...(prev.sectionData?.restaurant || {}),
                                  fssaiNumber: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-amber-300 font-mono focus:outline-none focus:border-amber-500 shadow-inner"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-rose-400" />
                          <span>Landmark &amp; Dining Locality</span>
                        </label>
                        <input 
                          type="text"
                          value={profile.sectionData?.restaurant?.landmark ?? 'Opp. Inorbit Mall, Madhapur, Hyderabad'}
                          placeholder="e.g. Opp. City Center, Hyderabad"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                restaurant: {
                                  ...(prev.sectionData?.restaurant || {}),
                                  landmark: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500 shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Cuisine Style</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.restaurant?.cuisineType ?? 'Awadhi & Mughlai Dum Biryani'}
                          placeholder="e.g. North Indian & Tandoor"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                restaurant: {
                                  ...(prev.sectionData?.restaurant || {}),
                                  cuisineType: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Dining &amp; Kitchen Timings</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.restaurant?.diningTimings ?? profile.sectionData?.restaurant?.operatingHours ?? '11:30 AM – 11:30 PM (All 7 Days)'}
                          placeholder="e.g. 11:30 AM – 11:30 PM"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                restaurant: {
                                  ...(prev.sectionData?.restaurant || {}),
                                  diningTimings: val,
                                  operatingHours: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Avg. Prep Time</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.restaurant?.avgPrepTime ?? '20-25 Mins'}
                          placeholder="e.g. 20-25 Mins"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                restaurant: {
                                  ...(prev.sectionData?.restaurant || {}),
                                  avgPrepTime: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Dine-in Seating Capacity</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.restaurant?.seatingCapacity ?? '120 Pax (AC Family Hall & Open Rooftop)'}
                          placeholder="e.g. 120 Pax (AC & Rooftop)"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                restaurant: {
                                  ...(prev.sectionData?.restaurant || {}),
                                  seatingCapacity: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Delivery Radius / Partners</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.restaurant?.deliveryRadius ?? 'Up to 12 km via WhatsApp Direct & Swiggy/Zomato'}
                          placeholder="e.g. Up to 12 km Delivery"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                restaurant: {
                                  ...(prev.sectionData?.restaurant || {}),
                                  deliveryRadius: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Table Reservation Policy</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.restaurant?.reservationPolicy ?? 'Table hold for 15 mins. Prior booking advised on weekends.'}
                          placeholder="e.g. Table hold for 15 mins"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                restaurant: {
                                  ...(prev.sectionData?.restaurant || {}),
                                  reservationPolicy: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Dietary &amp; Hygiene Badges</label>
                        <input 
                          type="text"
                          value={profile.sectionData?.restaurant?.dietaryHighlights ?? 'Pure Desi Ghee • Halal Certified • Jain Options Available'}
                          placeholder="e.g. Pure Desi Ghee • Halal / Jain Available"
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: {
                                ...prev.sectionData,
                                restaurant: {
                                  ...(prev.sectionData?.restaurant || {}),
                                  dietaryHighlights: val
                                }
                              }
                            }));
                          }}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Social Media & Networks (LinkedIn, Instagram, Twitter/X, YouTube, Facebook, Telegram) */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-purple-950/40 border border-purple-500/30 space-y-3 pt-3 mt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-200">Social Media Channels</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('socials')}
                      className="text-[11px] text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <span>Manage All ({profile.sectionData?.socials?.items?.length || 0})</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    Add your profile links to activate the 1-tap connection buttons on your live card.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                    {/* LinkedIn */}
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                        <SocialIcon platform="linkedin" size={13} />
                        <span>LinkedIn Profile URL</span>
                      </label>
                      <input 
                        type="url" 
                        value={profile.sectionData?.socials?.items?.find(s => s.platform === 'linkedin')?.url || ''}
                        placeholder="https://linkedin.com/in/username"
                        onChange={e => updateQuickSocial('linkedin', e.target.value, 'LinkedIn')}
                        className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 shadow-inner"
                      />
                    </div>

                    {/* Instagram */}
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                        <SocialIcon platform="instagram" size={13} />
                        <span>Instagram Profile URL</span>
                      </label>
                      <input 
                        type="url" 
                        value={profile.sectionData?.socials?.items?.find(s => s.platform === 'instagram')?.url || ''}
                        placeholder="https://instagram.com/username"
                        onChange={e => updateQuickSocial('instagram', e.target.value, 'Instagram')}
                        className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 shadow-inner"
                      />
                    </div>

                    {/* Twitter / X */}
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                        <SocialIcon platform="twitter" size={13} />
                        <span>Twitter / X URL</span>
                      </label>
                      <input 
                        type="url" 
                        value={profile.sectionData?.socials?.items?.find(s => s.platform === 'twitter' || s.platform === 'x')?.url || ''}
                        placeholder="https://x.com/username"
                        onChange={e => updateQuickSocial('twitter', e.target.value, 'Twitter / X')}
                        className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 shadow-inner"
                      />
                    </div>

                    {/* YouTube */}
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                        <SocialIcon platform="youtube" size={13} />
                        <span>YouTube Channel URL</span>
                      </label>
                      <input 
                        type="url" 
                        value={profile.sectionData?.socials?.items?.find(s => s.platform === 'youtube')?.url || ''}
                        placeholder="https://youtube.com/@channel"
                        onChange={e => updateQuickSocial('youtube', e.target.value, 'YouTube')}
                        className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 shadow-inner"
                      />
                    </div>

                    {/* Facebook */}
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                        <SocialIcon platform="facebook" size={13} />
                        <span>Facebook Page URL</span>
                      </label>
                      <input 
                        type="url" 
                        value={profile.sectionData?.socials?.items?.find(s => s.platform === 'facebook')?.url || ''}
                        placeholder="https://facebook.com/page"
                        onChange={e => updateQuickSocial('facebook', e.target.value, 'Facebook')}
                        className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 shadow-inner"
                      />
                    </div>

                    {/* Telegram */}
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                        <SocialIcon platform="telegram" size={13} />
                        <span>Telegram Channel / User</span>
                      </label>
                      <input 
                        type="url" 
                        value={profile.sectionData?.socials?.items?.find(s => s.platform === 'telegram')?.url || ''}
                        placeholder="https://t.me/username"
                        onChange={e => updateQuickSocial('telegram', e.target.value, 'Telegram')}
                        className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 shadow-inner"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: BUSINESS TEMPLATES LIBRARY */}
          {activeTab === 'templates' && (
            <div className="space-y-5 max-w-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">Business Templates Library</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {categoryTemplates.length} Templates
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {lockConfig.label}: Switch between your tailored business templates, layouts, and WhatsApp store designs.
                  </p>
                </div>
              </div>

              {/* Universal Entity Lock Badge Banner */}
              <div className={`p-3.5 rounded-2xl bg-gradient-to-r ${lockConfig.bannerGradient} border ${lockConfig.badgeBorder} text-xs flex items-start gap-3 shadow-sm`}>
                <div className={`w-8 h-8 rounded-xl ${lockConfig.badgeBg} ${lockConfig.badgeText} border ${lockConfig.badgeBorder} flex items-center justify-center shrink-0 mt-0.5`}>
                  <Lock className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                      <span>{lockConfig.icon}</span>
                      <span>{lockConfig.label} (Industry Locked)</span>
                    </h4>
                    <span className={`text-[10px] font-bold ${lockConfig.badgeBg} ${lockConfig.badgeText} px-2 py-0.5 rounded-full border ${lockConfig.badgeBorder}`}>
                      Entity: {activeCategory}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {lockConfig.description}
                  </p>
                </div>
              </div>

              {/* Toast confirmation */}
              {appliedTemplateName && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center gap-2 font-medium">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Applied <strong>{appliedTemplateName}</strong> template successfully!</span>
                  </div>
                  <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Active</span>
                </div>
              )}

              {/* Search & Category filter */}
              <div className="space-y-3">
                <input 
                  type="text"
                  value={templateSearch}
                  onChange={e => setTemplateSearch(e.target.value)}
                  placeholder={`Search ${activeCategory} templates (e.g. ${categoryTemplates.slice(0, 3).map(t => t.name.split(' ')[0]).join(', ')})...`}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />

                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => setTemplateCategory('all')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1 ${
                      templateCategory === 'all'
                        ? `${lockConfig.badgeBg} ${lockConfig.badgeText} border ${lockConfig.badgeBorder} shadow-sm ring-1 ring-white/10`
                        : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    <span>{lockConfig.icon}</span>
                    <span>All {activeCategory} ({categoryTemplates.length})</span>
                  </button>
                  {availableSubCategories.map(sub => (
                    <button
                      key={sub}
                      onClick={() => setTemplateCategory(sub)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1 ${
                        templateCategory === sub
                          ? `${lockConfig.badgeBg} ${lockConfig.badgeText} border ${lockConfig.badgeBorder} shadow-sm ring-1 ring-white/10`
                          : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      <span>🏷️</span>
                      <span>{sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of Templates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 max-h-[580px] overflow-y-auto pr-1">
                {categoryTemplates
                  .filter(t => {
                    const matchSub = templateCategory === 'all' || t.subCategory === templateCategory || t.category === templateCategory;
                    const q = templateSearch.toLowerCase();
                    const matchSearch = !q || t.name.toLowerCase().includes(q) ||
                      t.tagline.toLowerCase().includes(q) ||
                      (t.subCategory && t.subCategory.toLowerCase().includes(q)) ||
                      t.features.some(f => f.toLowerCase().includes(q));
                    return matchSub && matchSearch;
                  })
                  .map(tpl => (
                    <div 
                      key={tpl.id}
                      className="group rounded-2xl border border-slate-800 bg-slate-900/90 hover:border-indigo-500/50 transition-all flex flex-col overflow-hidden shadow-lg"
                    >
                      {/* Thumbnail with hover-scroll */}
                      <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                        <img 
                          src={tpl.imgUrl} 
                          alt={tpl.name}
                          className="business-template-img"
                          loading="lazy"
                        />
                        {tpl.badge && (
                          <div className="absolute top-2 right-2 z-10">
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow">
                              {tpl.badge}
                            </span>
                          </div>
                        )}
                        <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-slate-950/90 to-transparent pointer-events-none" />
                      </div>

                      {/* Info & Apply buttons */}
                      <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors truncate">
                              {tpl.name}
                            </h4>
                            <span className="text-[10px] text-slate-400 px-1.5 py-0.5 rounded bg-slate-800 shrink-0">
                              {tpl.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{tpl.tagline}</p>
                        </div>

                        <div className="space-y-1.5 pt-1">
                          <button
                            onClick={() => handleApplyTemplate(tpl.id, true)}
                            className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-[11px] shadow-sm flex items-center justify-center gap-1.5 transition active:scale-95"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>Load Template &amp; Starter Data</span>
                          </button>
                          
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleApplyTemplate(tpl.id, false)}
                              className="flex-1 py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] font-semibold border border-slate-700 transition"
                              title="Only change colors and styling without replacing your bio/services"
                            >
                              Theme Only
                            </button>
                            <a
                              href={`/v/${tpl.id}`}
                              target="_blank"
                              rel="noreferrer"
                              className="py-1.5 px-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-indigo-400 hover:text-indigo-300 text-[10px] font-semibold border border-slate-800 transition flex items-center gap-1"
                            >
                              <Eye className="w-3 h-3" />
                              <span>Live</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 2: THEME SELECTOR */}
          {activeTab === 'theme' && (
            <div className="space-y-4 max-w-xl">
              <div>
                <h3 className="text-sm font-bold text-white">Choose a Visual Theme</h3>
                <p className="text-xs text-slate-400">Themes change color palettes, cards, and typography without modifying your data.</p>
              </div>

              {/* Quick shortcut to 28 templates */}
              <div 
                onClick={() => setActiveTab('templates')}
                className="p-3.5 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-purple-950/40 border border-indigo-500/30 hover:border-indigo-500/60 cursor-pointer transition-all flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white shrink-0 shadow-md">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                      Browse 28 Industry Business Templates
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Doctor, Lawyer, Reporter, Architecture, Gym, Flower Garden &amp; more with pre-filled catalogs.
                    </p>
                  </div>
                </div>
                <button className="px-3 py-1.5 rounded-lg bg-indigo-600 group-hover:bg-indigo-500 text-white text-xs font-bold shrink-0 transition">
                  Browse →
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                {themes.map(t => (
                  <div 
                    key={t.id}
                    onClick={() => handleFieldChange('theme', t.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      profile.theme === t.id 
                        ? 'border-indigo-500 bg-indigo-500/10 shadow-lg ring-2 ring-indigo-500/30' 
                        : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                    }`}
                  >
                    <div className={`h-16 w-full rounded-xl bg-gradient-to-br ${t.gradient} mb-3 shadow-inner flex items-center justify-center`}>
                      {profile.theme === t.id && (
                        <div className="w-7 h-7 rounded-full bg-white text-indigo-600 flex items-center justify-center shadow-lg">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs font-bold text-white">{t.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SECTION ORDER & TOGGLES */}
          {activeTab === 'sections' && (
            <div className="space-y-3 max-w-xl">
              <div>
                <h3 className="text-sm font-bold text-white">Manage & Reorder Sections</h3>
                <p className="text-xs text-slate-400">Drag or use arrows to reposition sections. Click the eye icon to hide/show sections on your live card.</p>
              </div>

              <div className="space-y-2 pt-2">
                {profile.sections.map((sec, idx) => (
                  <div 
                    key={sec.id}
                    className={`flex items-center justify-between p-3 rounded-xl border ${
                      sec.isVisible ? 'bg-slate-900 border-slate-700' : 'bg-slate-950/60 border-slate-800 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-slate-500 w-4">{idx + 1}</span>
                      <span className="text-xs font-semibold text-white">{sec.title}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => moveSection(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => moveSection(idx, 'down')}
                        disabled={idx === profile.sections.length - 1}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => toggleSectionVisibility(sec.id)}
                        className={`ml-2 px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 ${
                          sec.isVisible ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        {sec.isVisible ? 'Visible' : 'Hidden'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES (OR REAL ESTATE SITE VISITS & ADVISORY) */}
          {activeTab === 'services' && (
            isRestaurant ? (
              <div className="space-y-5 max-w-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-orange-400" />
                        <span>Table Reservations &amp; Dining Packages</span>
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-500/20 text-orange-300 border border-orange-500/30">
                        {profile.sectionData.services?.items?.length || 0} Packages
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Configure candlelight dinner arrangements, rooftop tables, private dining rooms, and pre-booked celebration packages.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newService = {
                        id: `svc_${Date.now()}`,
                        title: 'Candlelight Dinner Romantic Table Setup',
                        category: 'Candlelight & Romantic Seating',
                        description: 'Reserved floral center table with candles, 2 complimentary mocktails, signature appetizer platter, and priority chef service.',
                        price: 1499,
                        currency: '₹',
                        durationMinutes: 120,
                        isAvailable: true
                      };
                      const updated = [...(profile.sectionData.services?.items || []), newService];
                      setProfile(prev => ({
                        ...prev,
                        sectionData: { ...prev.sectionData, services: { items: updated } }
                      }));
                    }}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-xs font-bold text-white flex items-center gap-1.5 transition-all shadow-md cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" /> Add Dining Package
                  </button>
                </div>

                {/* Quick Dining Service Presets Strip */}
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Quick Dining &amp; Table Booking Presets:
                    </span>
                    <span className="text-[10px] text-slate-400">Click to instantly add package</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const s = {
                          id: `svc_${Date.now()}_1`,
                          title: 'Romantic Candlelight Dinner Table (for 2)',
                          category: 'Candlelight & Romantic Seating',
                          description: 'Decorated candle table, fresh rose petals, 2 complimentary royal mocktails, chef appetizer platter & romantic music ambience.',
                          price: 1499,
                          currency: '₹',
                          durationMinutes: 120,
                          isAvailable: true
                        };
                        setProfile(prev => ({
                          ...prev,
                          sectionData: { ...prev.sectionData, services: { items: [...(prev.sectionData.services?.items || []), s] } }
                        }));
                      }}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-medium bg-slate-950 hover:bg-amber-950/40 text-slate-300 hover:text-amber-300 border border-slate-800 hover:border-amber-500/40 transition"
                    >
                      + Candlelight Table (₹1,499)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const s = {
                          id: `svc_${Date.now()}_2`,
                          title: 'Rooftop VIP Family Lounge (Up to 8 Guests)',
                          category: 'Rooftop / Terrace Seating',
                          description: 'Open-air panoramic rooftop lounge sofa booth with dedicated steward, customized multi-course tasting menu, and beverage bucket.',
                          price: 2499,
                          currency: '₹',
                          durationMinutes: 150,
                          isAvailable: true
                        };
                        setProfile(prev => ({
                          ...prev,
                          sectionData: { ...prev.sectionData, services: { items: [...(prev.sectionData.services?.items || []), s] } }
                        }));
                      }}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-medium bg-slate-950 hover:bg-amber-950/40 text-slate-300 hover:text-amber-300 border border-slate-800 hover:border-amber-500/40 transition"
                    >
                      + Rooftop VIP Lounge (₹2,499)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const s = {
                          id: `svc_${Date.now()}_3`,
                          title: 'Birthday & Anniversary Celebration Hall',
                          category: 'Birthday & Anniversary Celebration',
                          description: 'Thematic balloon styling, complimentary 1kg artisanal chef cake, sparkle candle presentation, party music & dedicated servers.',
                          price: 4999,
                          currency: '₹',
                          durationMinutes: 180,
                          isAvailable: true
                        };
                        setProfile(prev => ({
                          ...prev,
                          sectionData: { ...prev.sectionData, services: { items: [...(prev.sectionData.services?.items || []), s] } }
                        }));
                      }}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-medium bg-slate-950 hover:bg-amber-950/40 text-slate-300 hover:text-amber-300 border border-slate-800 hover:border-amber-500/40 transition"
                    >
                      + Birthday Celebration Hall (₹4,999)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const s = {
                          id: `svc_${Date.now()}_4`,
                          title: 'Complimentary Table Reservation (Standard Dining)',
                          category: 'Standard Table Reservation',
                          description: 'Guaranteed reserved table seating with zero wait-time during peak rush hours. Dedicated table assignment upon arrival.',
                          price: 0,
                          currency: '₹',
                          durationMinutes: 90,
                          isAvailable: true
                        };
                        setProfile(prev => ({
                          ...prev,
                          sectionData: { ...prev.sectionData, services: { items: [...(prev.sectionData.services?.items || []), s] } }
                        }));
                      }}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-medium bg-slate-950 hover:bg-emerald-950/40 text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/40 transition"
                    >
                      + Priority Table Booking (Free)
                    </button>
                  </div>
                </div>

                {/* List of Dining Packages */}
                <div className="space-y-4">
                  {profile.sectionData.services?.items?.map((srv, idx) => (
                    <div 
                      key={srv.id} 
                      className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-[#1F1208]/60 border border-slate-700 hover:border-orange-500/40 transition-all space-y-4 relative shadow-lg"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 font-black text-xs flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-white truncate max-w-[200px] sm:max-w-xs">
                            {srv.title || `Dining Package #${idx + 1}`}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...(profile.sectionData.services?.items || [])];
                              updated[idx].isAvailable = !updated[idx].isAvailable;
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, services: { items: updated } }
                              }));
                            }}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition ${
                              srv.isAvailable !== false
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                : 'bg-red-500/10 text-red-400 border-red-500/30'
                            }`}
                          >
                            {srv.isAvailable !== false ? '● Active' : '○ Booked Out'}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (profile.sectionData.services?.items || []).filter((_, i) => i !== idx);
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, services: { items: updated } }
                              }));
                            }}
                            className="text-slate-500 hover:text-red-400 p-1 rounded-lg hover:bg-slate-800 transition"
                            title="Delete Package"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2 space-y-1">
                          <label className="text-[11px] font-medium text-slate-400">Package Title / Dining Experience</label>
                          <input 
                            type="text" 
                            value={srv.title}
                            placeholder="e.g. Romantic Candlelight Dinner Table Setup"
                            onChange={e => {
                              const updated = [...(profile.sectionData.services?.items || [])];
                              updated[idx].title = e.target.value;
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, services: { items: updated } }
                              }));
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-slate-400">Seating / Dining Type</label>
                          <select
                            value={srv.category || 'Candlelight & Romantic Seating'}
                            onChange={e => {
                              const updated = [...(profile.sectionData.services?.items || [])];
                              updated[idx].category = e.target.value;
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, services: { items: updated } }
                              }));
                            }}
                            className="w-full px-2.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-orange-500 transition"
                          >
                            <option value="Candlelight & Romantic Seating">Candlelight &amp; Romantic Seating</option>
                            <option value="Rooftop / Terrace Seating">Rooftop / Terrace Seating</option>
                            <option value="Family Dining & Banquet">Family Dining &amp; Banquet</option>
                            <option value="Private Dining Room (PDR)">Private Dining Room (PDR)</option>
                            <option value="Birthday & Anniversary Celebration">Birthday &amp; Celebration</option>
                            <option value="Chef's Special Tasting Table">Chef's Tasting Table</option>
                            <option value="Standard Table Reservation">Standard Table Reservation</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="text-[11px] font-medium text-slate-400">Reservation / Cover Charge (₹)</label>
                            <span className="text-[10px] text-amber-400 font-bold">
                              {srv.price === 0 ? 'Complimentary' : `₹${srv.price}`}
                            </span>
                          </div>
                          <input 
                            type="number" 
                            value={srv.price}
                            placeholder="0"
                            onChange={e => {
                              const updated = [...(profile.sectionData.services?.items || [])];
                              updated[idx].price = Number(e.target.value);
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, services: { items: updated } }
                              }));
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-slate-400">Dining Duration (Minutes)</label>
                          <input 
                            type="number" 
                            value={srv.durationMinutes || 90}
                            placeholder="90"
                            onChange={e => {
                              const updated = [...(profile.sectionData.services?.items || [])];
                              updated[idx].durationMinutes = Number(e.target.value);
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, services: { items: updated } }
                              }));
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-slate-400">Package Inclusions &amp; Setup Details</label>
                        <textarea 
                          rows={2}
                          value={srv.description || ''}
                          placeholder="e.g. Reserved floral center table with candles, 2 complimentary mocktails, signature appetizer platter..."
                          onChange={e => {
                            const updated = [...(profile.sectionData.services?.items || [])];
                            updated[idx].description = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: { ...prev.sectionData, services: { items: updated } }
                            }));
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition resize-none"
                        />
                      </div>
                    </div>
                  ))}

                  {(!profile.sectionData.services?.items || profile.sectionData.services.items.length === 0) && (
                    <div className="p-8 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/50">
                      <Calendar className="w-8 h-8 text-orange-400 mx-auto mb-2 opacity-50" />
                      <p className="text-xs font-semibold text-slate-300">No dining reservation packages configured yet</p>
                      <p className="text-[11px] text-slate-500 mt-1 max-w-sm mx-auto">
                        Add table booking packages or click a preset above to enable instant reservations on your restaurant card.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : isRealEstate ? (
              <div className="space-y-5 max-w-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-emerald-400" />
                        <span>Guided Site Visits &amp; Advisory Packages</span>
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {profile.sectionData.services?.items?.length || 0} Packages
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Configure scheduled physical site visits, chauffeur pickups, master layout consultations, and TS-RERA legal verification desks.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newService = {
                        id: `svc_${Date.now()}`,
                        title: 'Free Chauffeur Gated Layout Site Visit',
                        category: 'Site Inspection / Pickup',
                        description: 'Complimentary doorstep AC cab pickup & drop with senior project counselor. Full venture walkthrough, layout brochure kit & refreshments included.',
                        price: 0,
                        currency: '₹',
                        durationMinutes: 180,
                        isAvailable: true
                      };
                      const updated = [...(profile.sectionData.services?.items || []), newService];
                      setProfile(prev => ({
                        ...prev,
                        sectionData: { ...prev.sectionData, services: { items: updated } }
                      }));
                    }}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-xs font-bold text-white flex items-center gap-1.5 transition-all shadow-md cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" /> Add Inspection Package
                  </button>
                </div>

                {/* Quick Presets Strip */}
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      Quick Real Estate Service Presets:
                    </span>
                    <span className="text-[10px] text-slate-400">Click to instantly add to card</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const s = {
                          id: `svc_${Date.now()}_1`,
                          title: 'VIP Chauffeur Site Inspection (Doorstep Pickup & Drop)',
                          category: 'Doorstep Chauffeur Pickup',
                          description: 'Luxury AC vehicle pickup from your doorstep in Hyderabad. Dedicated senior manager escorted walkthrough of gated venture, physical boundary demarcation & refreshments.',
                          price: 0,
                          currency: '₹',
                          durationMinutes: 180,
                          isAvailable: true
                        };
                        setProfile(prev => ({
                          ...prev,
                          sectionData: { ...prev.sectionData, services: { items: [...(prev.sectionData.services?.items || []), s] } }
                        }));
                      }}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-medium bg-slate-950 hover:bg-emerald-950/40 text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/40 transition"
                    >
                      + Chauffeur Site Visit (Free)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const s = {
                          id: `svc_${Date.now()}_2`,
                          title: 'Master Layout Blueprint & Vastu Walkthrough',
                          category: 'Master Layout & Vastu Consult',
                          description: 'One-on-one session with our senior layout architect. Detailed zoning, 40ft road connectivity, East/West facing plot demarcation & Vastu compliance review.',
                          price: 0,
                          currency: '₹',
                          durationMinutes: 60,
                          isAvailable: true
                        };
                        setProfile(prev => ({
                          ...prev,
                          sectionData: { ...prev.sectionData, services: { items: [...(prev.sectionData.services?.items || []), s] } }
                        }));
                      }}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-medium bg-slate-950 hover:bg-emerald-950/40 text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/40 transition"
                    >
                      + Blueprint &amp; Vastu Consult
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const s = {
                          id: `svc_${Date.now()}_3`,
                          title: 'TS-RERA Legal Docket & Bank Pre-Approval Desk',
                          category: 'Legal Documents & RERA Desk',
                          description: 'Comprehensive review of 30-year title link documents, Encumbrance Certificate (EC), TS-RERA approval certificates, and instant spot home loan eligibility check.',
                          price: 0,
                          currency: '₹',
                          durationMinutes: 45,
                          isAvailable: true
                        };
                        setProfile(prev => ({
                          ...prev,
                          sectionData: { ...prev.sectionData, services: { items: [...(prev.sectionData.services?.items || []), s] } }
                        }));
                      }}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-medium bg-slate-950 hover:bg-emerald-950/40 text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/40 transition"
                    >
                      + TS-RERA Legal &amp; Loan Desk
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const s = {
                          id: `svc_${Date.now()}_4`,
                          title: 'NRI High-Res 360° Live Drone Walkthrough (Video Call)',
                          category: 'NRI Virtual 360 Walkthrough',
                          description: 'Private 1-on-1 video call session for NRIs & overseas investors. Live HD drone stream of current venture progression, road infrastructure & neighborhood survey.',
                          price: 0,
                          currency: '₹',
                          durationMinutes: 45,
                          isAvailable: true
                        };
                        setProfile(prev => ({
                          ...prev,
                          sectionData: { ...prev.sectionData, services: { items: [...(prev.sectionData.services?.items || []), s] } }
                        }));
                      }}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-medium bg-slate-950 hover:bg-emerald-950/40 text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/40 transition"
                    >
                      + NRI 360° Drone Video Call
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {profile.sectionData.services?.items?.map((srv, idx) => (
                    <div 
                      key={srv.id} 
                      className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/20 border border-slate-700 hover:border-emerald-500/40 transition-all space-y-3.5 relative shadow-lg"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-white truncate max-w-[220px] sm:max-w-xs">
                            {srv.title || `Service Package #${idx + 1}`}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (profile.sectionData.services?.items || []).filter((_, i) => i !== idx);
                            setProfile(prev => ({
                              ...prev,
                              sectionData: { ...prev.sectionData, services: { items: updated } }
                            }));
                          }}
                          className="text-slate-500 hover:text-red-400 p-1 rounded-lg hover:bg-slate-800 transition"
                          title="Delete Package"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2 space-y-1">
                          <label className="text-[11px] font-medium text-slate-400">Package Title / Service Name</label>
                          <input 
                            type="text" 
                            value={srv.title}
                            placeholder="e.g. Free Chauffeur Site Inspection (Pickup & Drop)"
                            onChange={e => {
                              const updated = [...(profile.sectionData.services?.items || [])];
                              updated[idx].title = e.target.value;
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, services: { items: updated } }
                              }));
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-slate-400">Category Tag</label>
                          <select
                            value={srv.category || 'Site Inspection / Pickup'}
                            onChange={e => {
                              const updated = [...(profile.sectionData.services?.items || [])];
                              updated[idx].category = e.target.value;
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, services: { items: updated } }
                              }));
                            }}
                            className="w-full px-2.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500 transition"
                          >
                            <option value="Site Inspection / Pickup">Site Inspection / Pickup</option>
                            <option value="Doorstep Chauffeur Pickup">Doorstep Chauffeur Pickup</option>
                            <option value="Master Layout & Vastu Consult">Master Layout &amp; Vastu Consult</option>
                            <option value="Legal Documents & RERA Desk">Legal Documents &amp; RERA Desk</option>
                            <option value="NRI Virtual 360 Walkthrough">NRI Virtual 360 Walkthrough</option>
                            <option value="Bank Loan Pre-Approval Desk">Bank Loan Desk</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="text-[11px] font-medium text-slate-400">Booking / Inspection Fee (₹)</label>
                            <span className="text-[10px] text-emerald-400 font-bold">
                              {srv.price === 0 ? 'Complimentary' : `₹${srv.price}`}
                            </span>
                          </div>
                          <input 
                            type="number" 
                            value={srv.price}
                            placeholder="0 for Complimentary"
                            onChange={e => {
                              const updated = [...(profile.sectionData.services?.items || [])];
                              updated[idx].price = Number(e.target.value);
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, services: { items: updated } }
                              }));
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500 transition font-mono"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="text-[11px] font-medium text-slate-400">Duration (Minutes)</label>
                            <span className="text-[10px] text-slate-400">
                              {srv.durationMinutes >= 60 ? `${(srv.durationMinutes / 60).toFixed(1)} hrs` : `${srv.durationMinutes} mins`}
                            </span>
                          </div>
                          <input 
                            type="number" 
                            value={srv.durationMinutes}
                            placeholder="180"
                            onChange={e => {
                              const updated = [...(profile.sectionData.services?.items || [])];
                              updated[idx].durationMinutes = Number(e.target.value);
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, services: { items: updated } }
                              }));
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500 transition font-mono"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-slate-400">Inclusions &amp; Experience Details</label>
                        <textarea 
                          rows={2}
                          value={srv.description}
                          placeholder="e.g. Complimentary doorstep AC cab pickup with senior counselor. Physical boundary walk, legal documents kit, and tea/refreshments included."
                          onChange={e => {
                            const updated = [...(profile.sectionData.services?.items || [])];
                            updated[idx].description = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: { ...prev.sectionData, services: { items: updated } }
                            }));
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition resize-none"
                        />
                      </div>
                    </div>
                  ))}

                  {(!profile.sectionData.services?.items || profile.sectionData.services.items.length === 0) && (
                    <div className="p-8 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/50">
                      <Calendar className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-50" />
                      <p className="text-xs font-semibold text-slate-300">No inspection packages configured yet</p>
                      <p className="text-[11px] text-slate-500 mt-1 max-w-sm mx-auto">
                        Add complimentary site visit packages or click a preset above to enable instant inspection bookings on your website.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : isInterior ? (
              <div className="space-y-5 max-w-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <Compass className="w-4 h-4 text-amber-400" />
                        <span>Interior Consultation &amp; Execution Services</span>
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {profile.sectionData.services?.items?.length || 0} Packages
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Configure 3D design consultations, site visits, modular woodwork audits, and full turnkey execution packages.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newService = {
                        id: `svc_${Date.now()}`,
                        title: 'Free 3D Architectural Consultation',
                        category: '3D Consultation',
                        description: 'Personalized site visit, floor plan review, material finishes selection, and 3D space visualizer.',
                        price: 0,
                        currency: '₹',
                        durationMinutes: 60,
                        isAvailable: true
                      };
                      const updated = [...(profile.sectionData.services?.items || []), newService];
                      setProfile(prev => ({
                        ...prev,
                        sectionData: { ...prev.sectionData, services: { items: updated } }
                      }));
                    }}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-xs font-bold text-stone-950 flex items-center gap-1.5 transition-all shadow-md cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" /> Add Design Service
                  </button>
                </div>

                {/* Quick Presets Strip */}
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Quick Architecture &amp; Interior Presets:
                    </span>
                    <span className="text-[10px] text-slate-400">Click to instantly add to card</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const s = {
                          id: `svc_${Date.now()}_1`,
                          title: 'Free 3D Architectural Consultation',
                          category: '3D Consultation',
                          description: '1-on-1 session with principal architect, 3D space modeling, floor plan review, and transparent material BOQ breakdown.',
                          price: 0,
                          currency: '₹',
                          durationMinutes: 60,
                          isAvailable: true
                        };
                        setProfile(prev => ({
                          ...prev,
                          sectionData: { ...prev.sectionData, services: { items: [...(prev.sectionData.services?.items || []), s] } }
                        }));
                      }}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-medium bg-slate-950 hover:bg-amber-950/40 text-slate-300 hover:text-amber-300 border border-slate-800 hover:border-amber-500/40 transition"
                    >
                      + Free 3D Consultation
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const s = {
                          id: `svc_${Date.now()}_2`,
                          title: 'Full Turnkey Residential Execution',
                          category: 'Turnkey Contract',
                          description: 'Complete false ceiling, modular woodwork, concealed lighting, civil modifications, and turnkey decor with 10-Year Warranty.',
                          price: 50000,
                          currency: '₹',
                          durationMinutes: 90,
                          isAvailable: true
                        };
                        setProfile(prev => ({
                          ...prev,
                          sectionData: { ...prev.sectionData, services: { items: [...(prev.sectionData.services?.items || []), s] } }
                        }));
                      }}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-medium bg-slate-950 hover:bg-amber-950/40 text-slate-300 hover:text-amber-300 border border-slate-800 hover:border-amber-500/40 transition"
                    >
                      + Turnkey Execution (₹50k Token)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const s = {
                          id: `svc_${Date.now()}_3`,
                          title: 'Modular German Kitchen &amp; Wardrobes',
                          category: 'Modular Woodwork',
                          description: 'Factory-made BWP Marine Ply cabinets with Hafele &amp; Blum soft-close fittings and 45-day guaranteed handover.',
                          price: 25000,
                          currency: '₹',
                          durationMinutes: 45,
                          isAvailable: true
                        };
                        setProfile(prev => ({
                          ...prev,
                          sectionData: { ...prev.sectionData, services: { items: [...(prev.sectionData.services?.items || []), s] } }
                        }));
                      }}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-medium bg-slate-950 hover:bg-amber-950/40 text-slate-300 hover:text-amber-300 border border-slate-800 hover:border-amber-500/40 transition"
                    >
                      + Modular Kitchen &amp; Wardrobes
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {profile.sectionData.services?.items?.map((srv, idx) => (
                    <div key={srv.id} className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative group hover:border-amber-500/40 transition shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-white uppercase tracking-wider">{srv.category || 'Interior Package'}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = profile.sectionData.services?.items?.filter((_, i) => i !== idx) || [];
                            setProfile(prev => ({
                              ...prev,
                              sectionData: { ...prev.sectionData, services: { items: updated } }
                            }));
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-400">Package / Service Title</label>
                          <input 
                            type="text"
                            value={srv.title}
                            placeholder="e.g. Free 3D Architectural Consultation"
                            onChange={e => {
                              const updated = [...(profile.sectionData.services?.items || [])];
                              updated[idx].title = e.target.value;
                              setProfile(prev => ({ ...prev, sectionData: { ...prev.sectionData, services: { items: updated } } }));
                            }}
                            className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-slate-400">Category / Type</label>
                          <input 
                            type="text"
                            value={srv.category || ''}
                            placeholder="e.g. Turnkey Contract / 3D Consultation"
                            onChange={e => {
                              const updated = [...(profile.sectionData.services?.items || [])];
                              updated[idx].category = e.target.value;
                              setProfile(prev => ({ ...prev, sectionData: { ...prev.sectionData, services: { items: updated } } }));
                            }}
                            className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-400">Consultation Fee (₹)</label>
                          <input 
                            type="number"
                            value={srv.price}
                            placeholder="0 for Complimentary"
                            onChange={e => {
                              const updated = [...(profile.sectionData.services?.items || [])];
                              updated[idx].price = Number(e.target.value);
                              setProfile(prev => ({ ...prev, sectionData: { ...prev.sectionData, services: { items: updated } } }));
                            }}
                            className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-slate-400">Session Duration (Mins)</label>
                          <input 
                            type="number"
                            value={srv.durationMinutes}
                            placeholder="60"
                            onChange={e => {
                              const updated = [...(profile.sectionData.services?.items || [])];
                              updated[idx].durationMinutes = Number(e.target.value);
                              setProfile(prev => ({ ...prev, sectionData: { ...prev.sectionData, services: { items: updated } } }));
                            }}
                            className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Inclusions &amp; Deliverables</label>
                        <textarea 
                          rows={2}
                          value={srv.description}
                          placeholder="e.g. Site visit, layout blueprint review, and material finishes selection."
                          onChange={e => {
                            const updated = [...(profile.sectionData.services?.items || [])];
                            updated[idx].description = e.target.value;
                            setProfile(prev => ({ ...prev, sectionData: { ...prev.sectionData, services: { items: updated } } }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-w-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {isRestaurant ? 'Table Reservations & Outdoor Catering' : isHealthcare ? 'Clinical Treatments & OPD Consultations' : isAutomobile ? 'VIP Test Drives & Services' : isFashion ? 'Bridal Styling & Custom Stitching' : isEducation ? 'Academic Counseling & Demo Classes' : isBeauty ? 'Salon Treatments & Beauty Services' : isEvents ? 'Event Production & Creative Services' : isTravel ? 'Custom Travel & Concierge Services' : isProfessional ? 'Legal & Advisory Practice Areas' : isHomeServices ? 'On-Demand Repairs & Maintenance Fleet' : isRetail ? 'Storefront Services & Value-Adds' : 'Bookable Services'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {isRestaurant ? 'Configure priority dining tables, candlelight dinners, banquet halls, and live party catering buffets.' : isHealthcare ? 'Configure diagnostic consultations, health checkups, and doctor appointment slots.' : isAutomobile ? 'Configure vehicle test drives, doorstep evaluations, and periodic service checkups.' : isFashion ? 'Configure bespoke bridal consultations, couture measurements, and styling sessions.' : isEducation ? 'Configure 1-on-1 career guidance, batch counseling, and free trial demo sessions.' : isBeauty ? 'Configure luxury haircuts, skin treatments, bridal makeovers, and spa bookings.' : isEvents ? 'Configure wedding planning, candid shoot sessions, intelligent stage lighting, and sound rigs.' : isTravel ? 'Configure honeymoon itineraries, express visa filing, private cab transfers, and tour consultation.' : isProfessional ? 'Configure chamber consultations, corporate contract vetting, tax retainers, and litigation briefs.' : isHomeServices ? 'Configure plumbing, AC power jet cleaning, electrical repairs, and pest control appointments.' : isRetail ? 'Configure same-day express delivery, WhatsApp live shopping tours, and demo appointments.' : 'Services clients can choose from to book appointments on your calendar.'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newService = {
                        id: `svc_${Date.now()}`,
                        title: isRestaurant ? 'Candlelight Dinner & Rooftop Table Reservation' : isHealthcare ? 'Specialist Clinical Consultation' : isAutomobile ? 'VIP Showroom Test Drive Session' : isFashion ? 'Bespoke Bridal Fitting & Styling' : isEducation ? 'Academic Counseling & Free Demo Class' : isBeauty ? 'Signature Hair & Facial Spa Treatment' : isEvents ? 'Complete Wedding Planning & Directing' : isTravel ? 'Bespoke Honeymoon & Private Tour Curating' : isProfessional ? 'Corporate Advisory & Contract Review' : isHomeServices ? 'Emergency Plumbing & Leakage Repair' : isRetail ? 'Same-Day Express Doorstep Delivery' : 'New Service',
                        description: isRestaurant ? 'Priority reserved table on open-air rooftop, chef welcome mocktail, and dedicated server.' : isHealthcare ? 'Comprehensive clinical examination, vitals check, and prescription advisory.' : isAutomobile ? 'Complimentary 45-min test drive with technical product specialist and route demo.' : isFashion ? '1-on-1 private bridal consultation, silhouette selection, and fabric customization.' : isEducation ? 'Interactive 1-on-1 career guidance, batch counseling, and syllabus walkthrough.' : isBeauty ? 'Deluxe haircut, scalp rejuvenating treatment, and professional styling session.' : isEvents ? 'End-to-end wedding choreography, vendor coordination, hospitality, guest concierge & ritual planning.' : isTravel ? '1-on-1 itinerary planning, candle-light dinners, private transfers, visa assistance & 24/7 dedicated trip concierge.' : isProfessional ? 'Thorough review of NDA/MOU agreements, legal risk analysis, and drafting advisory.' : isHomeServices ? 'Immediate dispatch of certified plumber for burst pipes, tap leaks, and drain blockages.' : isRetail ? 'Doorstep express delivery within city limits with package verification and live tracking.' : 'Describe this service offering...',
                        price: isRestaurant ? 499 : isHealthcare ? 800 : isAutomobile ? 0 : isFashion ? 1500 : isEducation ? 0 : isBeauty ? 1200 : isEvents ? 150000 : isTravel ? 0 : isProfessional ? 2500 : isHomeServices ? 299 : isRetail ? 0 : 999,
                        currency: '₹',
                        durationMinutes: isRestaurant ? 90 : isHealthcare ? 30 : isAutomobile ? 45 : isFashion ? 60 : isEducation ? 45 : isBeauty ? 60 : isEvents ? 1440 : isTravel ? 45 : isProfessional ? 60 : isHomeServices ? 45 : isRetail ? 30 : 45,
                        isAvailable: true
                      };
                      const updated = [...(profile.sectionData.services?.items || []), newService];
                      setProfile(prev => ({
                        ...prev,
                        sectionData: { ...prev.sectionData, services: { items: updated } }
                      }));
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5 transition-all shadow shrink-0 ${
                      isRestaurant ? 'bg-amber-600 hover:bg-amber-500' : isHealthcare ? 'bg-teal-600 hover:bg-teal-500' : isAutomobile ? 'bg-blue-600 hover:bg-blue-500' : isFashion ? 'bg-rose-600 hover:bg-rose-500' : isEducation ? 'bg-blue-600 hover:bg-blue-500' : isBeauty ? 'bg-rose-600 hover:bg-rose-500' : isEvents ? 'bg-violet-600 hover:bg-violet-500' : isTravel ? 'bg-cyan-600 hover:bg-cyan-500' : isProfessional ? 'bg-amber-600 hover:bg-amber-500' : isHomeServices ? 'bg-amber-600 hover:bg-amber-500' : isRetail ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-indigo-600 hover:bg-indigo-500'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" /> {isRestaurant ? 'Add Table / Catering Service' : isHealthcare ? 'Add Clinical Slot' : isAutomobile ? 'Add Test Drive' : isFashion ? 'Add Styling Service' : isEducation ? 'Add Demo / Counseling Slot' : isBeauty ? 'Add Salon Service' : isEvents ? 'Add Event Service' : isTravel ? 'Add Travel Service' : isProfessional ? 'Add Practice Area' : isHomeServices ? 'Add Repair Service' : isRetail ? 'Add Store Service' : 'Add Service'}
                  </button>
                </div>

                <div className="space-y-3">
                  {profile.sectionData.services?.items?.map((srv, idx) => (
                    <div key={srv.id} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-indigo-400">Service #{idx + 1}</span>
                      </div>
                      <input 
                        type="text" 
                        value={srv.title}
                        placeholder="Service Title"
                        onChange={e => {
                          const updated = [...(profile.sectionData.services?.items || [])];
                          updated[idx].title = e.target.value;
                          setProfile(prev => ({
                            ...prev,
                            sectionData: { ...prev.sectionData, services: { items: updated } }
                          }));
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input 
                          type="number" 
                          value={srv.price}
                          placeholder="Price"
                          onChange={e => {
                            const updated = [...(profile.sectionData.services?.items || [])];
                            updated[idx].price = Number(e.target.value);
                            setProfile(prev => ({
                              ...prev,
                              sectionData: { ...prev.sectionData, services: { items: updated } }
                            }));
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                        <input 
                          type="number" 
                          value={srv.durationMinutes}
                          placeholder="Duration (Minutes)"
                          onChange={e => {
                            const updated = [...(profile.sectionData.services?.items || [])];
                            updated[idx].durationMinutes = Number(e.target.value);
                            setProfile(prev => ({
                              ...prev,
                              sectionData: { ...prev.sectionData, services: { items: updated } }
                            }));
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}

          {/* TAB 5: PRODUCTS (OR REAL ESTATE VENTURES) */}
          {activeTab === 'products' && (
            isRestaurant ? (
              <div className="space-y-5 max-w-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <UtensilsCrossed className="w-4 h-4 text-amber-400" />
                        <span>Digital Dining Menu &amp; Chef Specials</span>
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {profile.sectionData.products?.items?.length || 0} Menu Items
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Manage your appetizers, royal biryanis, tandoor specials, gravies, desserts, pricing, and live dietary indicators.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newDish: ProductItem = {
                        id: `dish_${Date.now()}`,
                        name: 'New Signature Dish',
                        description: 'Slow-cooked with pure spices, aromatic herbs, and authentic house recipes.',
                        price: 349,
                        originalPrice: 399,
                        currency: '₹',
                        category: 'Biryani & Rice',
                        imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
                        isVeg: false,
                        spiceLevel: 'medium',
                        prepTime: '20-25 Mins',
                        ingredients: ['Aged Basmati Rice', 'Pure Desi Ghee', 'Saffron', 'Whole Spices'],
                        course: 'main',
                        chefNote: 'House specialty prepared fresh on order.',
                        isSpecial: true,
                        isAvailable: true
                      };
                      const updated = [...(profile.sectionData.products?.items || []), newDish];
                      setProfile(prev => ({
                        ...prev,
                        sectionData: { ...prev.sectionData, products: { items: updated } }
                      }));
                    }}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-xs font-bold text-slate-950 flex items-center gap-1.5 transition-all shadow-md cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4 text-slate-950 stroke-[3]" /> Add New Dish / Item
                  </button>
                </div>

                {/* Quick Dish Presets Strip */}
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Popular Menu Presets (Click to Add):
                    </span>
                    <span className="text-[10px] text-slate-400">Instantly populates item &amp; photo</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const d: ProductItem = {
                          id: `dish_${Date.now()}_1`,
                          name: 'Hyderabadi Shahi Mutton Dum Biryani',
                          description: 'Tender baby mutton marinated in brown onions, yoghurt and mint, sealed in handi with aged saffron basmati rice.',
                          price: 420,
                          originalPrice: 480,
                          currency: '₹',
                          category: 'Biryani & Rice',
                          imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
                          isVeg: false,
                          spiceLevel: 'spicy',
                          prepTime: '25 Mins',
                          ingredients: ['Tender Baby Mutton', '2-Year Aged Basmati', 'Pure Desi Ghee', 'Kesar Saffron', 'Fried Onions (Birista)'],
                          course: 'main',
                          chefNote: 'Slow charcoal dum-cooked in clay pots for 4 hours.',
                          isSpecial: true,
                          isAvailable: true
                        };
                        setProfile(prev => ({
                          ...prev,
                          sectionData: { ...prev.sectionData, products: { items: [...(prev.sectionData.products?.items || []), d] } }
                        }));
                      }}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-medium bg-slate-950 hover:bg-amber-950/40 text-slate-300 hover:text-amber-300 border border-slate-800 hover:border-amber-500/40 transition"
                    >
                      + Dum Biryani (₹420)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const d: ProductItem = {
                          id: `dish_${Date.now()}_2`,
                          name: 'Paneer Tikka Angaara Charcoal Roast',
                          description: 'Succulent malai cottage cheese cubes infused with Kashmiri deghi mirch, spiced hung curd, and roasted on iron skewers.',
                          price: 290,
                          originalPrice: 340,
                          currency: '₹',
                          category: 'Starters & Tandoor',
                          imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80',
                          isVeg: true,
                          spiceLevel: 'medium',
                          prepTime: '15 Mins',
                          ingredients: ['Fresh Malai Paneer', 'Hung Curd', 'Kashmiri Degi Mirch', 'Bell Peppers', 'Mint Chutney'],
                          course: 'starter',
                          chefNote: 'Charred over burning charcoal for authentic smokiness.',
                          isSpecial: true,
                          isAvailable: true
                        };
                        setProfile(prev => ({
                          ...prev,
                          sectionData: { ...prev.sectionData, products: { items: [...(prev.sectionData.products?.items || []), d] } }
                        }));
                      }}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-medium bg-slate-950 hover:bg-emerald-950/40 text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/40 transition"
                    >
                      + Paneer Tikka (₹290)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const d: ProductItem = {
                          id: `dish_${Date.now()}_3`,
                          name: 'Dal Makhani Slow-Simmered Overnight',
                          description: 'Whole black lentils and kidney beans simmered for 18 hours on slow embers with churned butter and fresh cream.',
                          price: 260,
                          originalPrice: 299,
                          currency: '₹',
                          category: 'Main Course Gravies',
                          imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
                          isVeg: true,
                          spiceLevel: 'mild',
                          prepTime: '15 Mins',
                          ingredients: ['Black Urad Dal', 'Rajma Beans', 'Fresh White Butter', 'Dairy Cream', 'Kasuri Methi'],
                          course: 'main',
                          chefNote: 'Pairs heavenly with Tandoori Garlic Naan.',
                          isSpecial: false,
                          isAvailable: true
                        };
                        setProfile(prev => ({
                          ...prev,
                          sectionData: { ...prev.sectionData, products: { items: [...(prev.sectionData.products?.items || []), d] } }
                        }));
                      }}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-medium bg-slate-950 hover:bg-emerald-950/40 text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/40 transition"
                    >
                      + Dal Makhani (₹260)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const d: ProductItem = {
                          id: `dish_${Date.now()}_4`,
                          name: 'Clay Oven Butter Garlic Naan (2 Pcs)',
                          description: 'Pillowy charred flatbread baked in the intense heat of clay tandoor, brushed with roasted garlic butter.',
                          price: 75,
                          currency: '₹',
                          category: 'Breads & Tandoor',
                          imageUrl: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80',
                          isVeg: true,
                          spiceLevel: 'mild',
                          prepTime: '8 Mins',
                          ingredients: ['Refined Flour', 'Minced Garlic', 'Salted Butter', 'Fresh Cilantro', 'Nigella Seeds'],
                          course: 'bread',
                          chefNote: 'Served smoking hot right off the tandoor walls.',
                          isSpecial: false,
                          isAvailable: true
                        };
                        setProfile(prev => ({
                          ...prev,
                          sectionData: { ...prev.sectionData, products: { items: [...(prev.sectionData.products?.items || []), d] } }
                        }));
                      }}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-medium bg-slate-950 hover:bg-amber-950/40 text-slate-300 hover:text-amber-300 border border-slate-800 hover:border-amber-500/40 transition"
                    >
                      + Garlic Naan (₹75)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const d: ProductItem = {
                          id: `dish_${Date.now()}_5`,
                          name: 'Warm Gulab Jamun with Chilled Rabdi',
                          description: 'Golden fried khoya milk dumplings soaked in cardamom sugar syrup, rested atop thick slow-reduced lachha rabdi.',
                          price: 150,
                          originalPrice: 180,
                          currency: '₹',
                          category: 'Desserts & Sweets',
                          imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
                          isVeg: true,
                          spiceLevel: 'mild',
                          prepTime: '5 Mins',
                          ingredients: ['Fresh Khoya (Mawa)', 'Chilled Lachha Rabdi', 'Cardamom & Rose Water', 'Silver Leaf', 'Pistachios'],
                          course: 'dessert',
                          chefNote: 'The sublime contrast of hot jamun and ice-cold rabdi.',
                          isSpecial: true,
                          isAvailable: true
                        };
                        setProfile(prev => ({
                          ...prev,
                          sectionData: { ...prev.sectionData, products: { items: [...(prev.sectionData.products?.items || []), d] } }
                        }));
                      }}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-medium bg-slate-950 hover:bg-pink-950/40 text-slate-300 hover:text-pink-300 border border-slate-800 hover:border-pink-500/40 transition"
                    >
                      + Rabdi Jamun (₹150)
                    </button>
                  </div>
                </div>

                {/* List of Dishes */}
                <div className="space-y-4">
                  {profile.sectionData.products?.items?.map((prod, idx) => (
                    <div 
                      key={prod.id} 
                      className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-[#1F1208]/60 border border-slate-700 hover:border-amber-500/40 transition-all space-y-4 relative shadow-lg"
                    >
                      {/* Top Header of Dish Card */}
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 font-black text-xs flex items-center justify-center">
                            {idx + 1}
                          </span>
                          {/* Veg / Non-Veg indicator icon */}
                          <span 
                            className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                              prod.isVeg ? 'border-emerald-500 bg-emerald-950/40' : 'border-rose-600 bg-rose-950/40'
                            }`}
                            title={prod.isVeg ? 'Vegetarian Dish' : 'Non-Vegetarian Dish'}
                          >
                            <span className={`w-2 h-2 rounded-full ${prod.isVeg ? 'bg-emerald-400' : 'bg-rose-500'}`} />
                          </span>
                          <span className="text-xs font-bold text-white truncate max-w-[180px] sm:max-w-xs">
                            {prod.name || `Dish #${idx + 1}`}
                          </span>
                          {prod.isSpecial && (
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20">
                              ★ Chef Special
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...(profile.sectionData.products?.items || [])];
                              updated[idx].isAvailable = !updated[idx].isAvailable;
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, products: { items: updated } }
                              }));
                            }}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition ${
                              prod.isAvailable !== false
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                : 'bg-red-500/10 text-red-400 border-red-500/30'
                            }`}
                          >
                            {prod.isAvailable !== false ? '● In Stock' : '○ Sold Out (86)'}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (profile.sectionData.products?.items || []).filter((_, i) => i !== idx);
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, products: { items: updated } }
                              }));
                            }}
                            className="text-slate-500 hover:text-red-400 p-1 rounded-lg hover:bg-slate-800 transition"
                            title="Delete Dish"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Line 1: Name, Category, Veg/Non-Veg Toggle */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        <div className="sm:col-span-6 space-y-1">
                          <label className="text-[11px] font-medium text-slate-400">Dish Name</label>
                          <input 
                            type="text" 
                            value={prod.name}
                            placeholder="e.g. Hyderabadi Dum Biryani"
                            onChange={e => {
                              const updated = [...(profile.sectionData.products?.items || [])];
                              updated[idx].name = e.target.value;
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, products: { items: updated } }
                              }));
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
                          />
                        </div>

                        <div className="sm:col-span-3 space-y-1">
                          <label className="text-[11px] font-medium text-slate-400">Course / Category</label>
                          <select
                            value={prod.category || 'Biryani & Rice'}
                            onChange={e => {
                              const updated = [...(profile.sectionData.products?.items || [])];
                              updated[idx].category = e.target.value;
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, products: { items: updated } }
                              }));
                            }}
                            className="w-full px-2.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500 transition"
                          >
                            <option value="Starters & Tandoor">Starters &amp; Tandoor</option>
                            <option value="Biryani & Rice">Biryani &amp; Rice</option>
                            <option value="Main Course Gravies">Main Course Gravies</option>
                            <option value="Breads & Tandoor">Breads &amp; Tandoor</option>
                            <option value="Desserts & Sweets">Desserts &amp; Sweets</option>
                            <option value="Beverages & Mocktails">Beverages &amp; Mocktails</option>
                            <option value="Banquet Platters">Banquet Platters</option>
                          </select>
                        </div>

                        <div className="sm:col-span-3 space-y-1">
                          <label className="text-[11px] font-medium text-slate-400">Dietary Type</label>
                          <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...(profile.sectionData.products?.items || [])];
                                updated[idx].isVeg = true;
                                setProfile(prev => ({
                                  ...prev,
                                  sectionData: { ...prev.sectionData, products: { items: updated } }
                                }));
                              }}
                              className={`py-1.5 rounded-lg text-xs font-bold border flex items-center justify-center gap-1 transition ${
                                prod.isVeg 
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm'
                                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                              }`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Veg
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...(profile.sectionData.products?.items || [])];
                                updated[idx].isVeg = false;
                                setProfile(prev => ({
                                  ...prev,
                                  sectionData: { ...prev.sectionData, products: { items: updated } }
                                }));
                              }}
                              className={`py-1.5 rounded-lg text-xs font-bold border flex items-center justify-center gap-1 transition ${
                                !prod.isVeg 
                                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-sm'
                                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                              }`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Non-Veg
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Line 2: Price, Original Price, Spice Level, Prep Time */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-slate-400">Selling Price (₹)</label>
                          <input 
                            type="number" 
                            value={prod.price}
                            placeholder="349"
                            onChange={e => {
                              const updated = [...(profile.sectionData.products?.items || [])];
                              updated[idx].price = Number(e.target.value);
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, products: { items: updated } }
                              }));
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-500 transition"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-slate-400">Strike Price (₹ optional)</label>
                          <input 
                            type="number" 
                            value={prod.originalPrice || ''}
                            placeholder="e.g. 399"
                            onChange={e => {
                              const updated = [...(profile.sectionData.products?.items || [])];
                              updated[idx].originalPrice = e.target.value ? Number(e.target.value) : undefined;
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, products: { items: updated } }
                              }));
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-400 focus:outline-none focus:border-amber-500 transition"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-slate-400">Spice Heat Level</label>
                          <select
                            value={prod.spiceLevel || 'medium'}
                            onChange={e => {
                              const updated = [...(profile.sectionData.products?.items || [])];
                              updated[idx].spiceLevel = e.target.value as any;
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, products: { items: updated } }
                              }));
                            }}
                            className="w-full px-2.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500 transition"
                          >
                            <option value="mild">Mild 🌶️</option>
                            <option value="medium">Medium 🌶️🌶️</option>
                            <option value="spicy">Spicy 🌶️🌶️🌶️</option>
                            <option value="extra-hot">Extra Hot 🔥</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-slate-400">Kitchen Prep Time</label>
                          <input 
                            type="text" 
                            value={prod.prepTime || '20 Mins'}
                            placeholder="e.g. 20 Mins"
                            onChange={e => {
                              const updated = [...(profile.sectionData.products?.items || [])];
                              updated[idx].prepTime = e.target.value;
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, products: { items: updated } }
                              }));
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500 transition"
                          />
                        </div>
                      </div>

                      {/* Line 3: Image URL and Ingredients */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-slate-400">Dish Photo URL</label>
                          <div className="flex gap-2">
                            {prod.imageUrl && (
                              <img 
                                src={prod.imageUrl} 
                                alt={prod.name} 
                                className="w-10 h-10 rounded-xl object-cover border border-slate-700 shrink-0" 
                              />
                            )}
                            <input 
                              type="text" 
                              value={prod.imageUrl || ''}
                              placeholder="https://images.unsplash.com/..."
                              onChange={e => {
                                const updated = [...(profile.sectionData.products?.items || [])];
                                updated[idx].imageUrl = e.target.value;
                                setProfile(prev => ({
                                  ...prev,
                                  sectionData: { ...prev.sectionData, products: { items: updated } }
                                }));
                              }}
                              className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500 transition"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-slate-400">Key Ingredients (Comma Separated)</label>
                          <input 
                            type="text" 
                            value={Array.isArray(prod.ingredients) ? prod.ingredients.join(', ') : (prod.ingredients || '')}
                            placeholder="e.g. Malai Paneer, Kashmiri Mirch, Desi Ghee"
                            onChange={e => {
                              const updated = [...(profile.sectionData.products?.items || [])];
                              updated[idx].ingredients = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, products: { items: updated } }
                              }));
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500 transition"
                          />
                        </div>
                      </div>

                      {/* Line 4: Description & Chef Note */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-slate-400">Dish Description &amp; Taste Profile</label>
                          <textarea 
                            rows={2}
                            value={prod.description || ''}
                            placeholder="A velvety smooth reduction of ripe plum tomatoes, cashew butter, and aromatic whole spices..."
                            onChange={e => {
                              const updated = [...(profile.sectionData.products?.items || [])];
                              updated[idx].description = e.target.value;
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, products: { items: updated } }
                              }));
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition resize-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-slate-400 flex items-center justify-between">
                            <span>Chef Pairing Note (Optional)</span>
                            <label className="text-[10px] text-amber-400 font-bold flex items-center gap-1 cursor-pointer">
                              <input 
                                type="checkbox"
                                checked={Boolean(prod.isSpecial)}
                                onChange={e => {
                                  const updated = [...(profile.sectionData.products?.items || [])];
                                  updated[idx].isSpecial = e.target.checked;
                                  setProfile(prev => ({
                                    ...prev,
                                    sectionData: { ...prev.sectionData, products: { items: updated } }
                                  }));
                                }}
                                className="rounded text-amber-500"
                              />
                              Feature as Bestseller
                            </label>
                          </label>
                          <textarea 
                            rows={2}
                            value={prod.chefNote || ''}
                            placeholder="e.g. Cooked on open charcoal flames. Pairs best with Butter Garlic Naan."
                            onChange={e => {
                              const updated = [...(profile.sectionData.products?.items || [])];
                              updated[idx].chefNote = e.target.value;
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, products: { items: updated } }
                              }));
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {(!profile.sectionData.products?.items || profile.sectionData.products.items.length === 0) && (
                    <div className="p-8 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/50">
                      <UtensilsCrossed className="w-8 h-8 text-amber-400 mx-auto mb-2 opacity-50" />
                      <p className="text-xs font-semibold text-slate-300">No dishes in your digital menu yet</p>
                      <p className="text-[11px] text-slate-500 mt-1 max-w-sm mx-auto">
                        Add signature dishes or click any preset above to launch your digital WhatsApp dining menu.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : isRealEstate ? (
              <div className="space-y-5 max-w-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-amber-400" />
                        <span>Real Estate Ventures &amp; Projects</span>
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {profile.sectionData.products?.items?.length || 0} Ventures
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Manage your RERA-approved gated layouts, luxury residences, open plots, and commercial ventures.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newProject: ProductItem = {
                        id: `proj_${Date.now()}`,
                        name: 'New Prime Gated Layout / Project',
                        description: 'TS-RERA & DTCP approved gated layout with 40ft CC roads, security arch, underground drainage, and spot registration.',
                        price: 16499,
                        priceLabel: '₹16,499 / Sq. Yd.',
                        currency: '₹',
                        imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
                        category: 'DTCP & HMDA Open Plots',
                        approvalType: 'TS-RERA & DTCP Approved',
                        reraId: 'TS-RERA/P02400008921',
                        corridor: 'Kadthal',
                        dimensions: '150, 200, 300 Sq. Yds',
                        status: 'Ready for Construction',
                        brochureUrl: '',
                        amenities: ['40ft CC Roads', 'Grand Entrance Arch', 'Underground Drainage', '24/7 Water', 'Clear Title'],
                        isAvailable: true
                      };
                      const updated = [...(profile.sectionData.products?.items || []), newProject];
                      setProfile(prev => ({
                        ...prev,
                        sectionData: { ...prev.sectionData, products: { items: updated } }
                      }));
                    }}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-xs font-bold text-slate-950 flex items-center gap-1.5 transition-all shadow-md cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4 text-slate-950 stroke-[3]" /> Add New Project / Venture
                  </button>
                </div>

                <div className="space-y-4">
                  {profile.sectionData.products?.items?.map((prod, idx) => (
                    <div 
                      key={prod.id} 
                      className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-[#0A192F]/60 border border-slate-700 hover:border-amber-500/40 transition-all space-y-4 relative shadow-lg"
                    >
                      {/* Top Header of Card */}
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 font-black text-xs flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-white truncate max-w-[220px] sm:max-w-xs">
                            {prod.name || `Project #${idx + 1}`}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                            {prod.approvalType || 'TS-RERA Sanctioned'}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            const updated = (profile.sectionData.products?.items || []).filter((_, i) => i !== idx);
                            setProfile(prev => ({
                              ...prev,
                              sectionData: { ...prev.sectionData, products: { items: updated } }
                            }));
                          }}
                          className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition"
                          title="Remove Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Project Name */}
                      <div>
                        <label className="text-xs font-semibold text-slate-300">Project / Venture Title</label>
                        <input 
                          type="text" 
                          value={prod.name}
                          placeholder="e.g. Project Pearl City (Kadthal Future City)"
                          onChange={e => {
                            const updated = [...(profile.sectionData.products?.items || [])];
                            updated[idx].name = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: { ...prev.sectionData, products: { items: updated } }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      {/* Category & Approval Type */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-400">Property Category</label>
                          <select
                            value={prod.category || 'DTCP & HMDA Open Plots'}
                            onChange={e => {
                              const updated = [...(profile.sectionData.products?.items || [])];
                              updated[idx].category = e.target.value;
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, products: { items: updated } }
                              }));
                            }}
                            className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                          >
                            <option value="DTCP & HMDA Open Plots">DTCP &amp; HMDA Open Plots</option>
                            <option value="Luxury Apartments">Luxury High-Rise Apartments</option>
                            <option value="Gated Villas">Luxury Gated Villas</option>
                            <option value="Managed Farmlands">Managed Farm Estates</option>
                            <option value="Commercial Plots">Commercial Hub / Retail</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-slate-400">Approval Authority &amp; Badge</label>
                          <input 
                            type="text"
                            value={prod.approvalType || 'TS-RERA & DTCP Approved'}
                            placeholder="e.g. TS-RERA & DTCP Approved"
                            onChange={e => {
                              const updated = [...(profile.sectionData.products?.items || [])];
                              updated[idx].approvalType = e.target.value;
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, products: { items: updated } }
                              }));
                            }}
                            className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>

                      {/* Price, Price Label, and Growth Corridor */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-400">Numerical Price (₹)</label>
                          <input 
                            type="number" 
                            value={prod.price}
                            placeholder="16499"
                            onChange={e => {
                              const updated = [...(profile.sectionData.products?.items || [])];
                              updated[idx].price = Number(e.target.value);
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, products: { items: updated } }
                              }));
                            }}
                            className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-slate-400">Price Display Label</label>
                          <input 
                            type="text" 
                            value={prod.priceLabel || (prod.price ? `₹${prod.price.toLocaleString('en-IN')}` : '')}
                            placeholder="e.g. ₹16,499 / Sq. Yd."
                            onChange={e => {
                              const updated = [...(profile.sectionData.products?.items || [])];
                              updated[idx].priceLabel = e.target.value;
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, products: { items: updated } }
                              }));
                            }}
                            className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-slate-400">Growth Corridor</label>
                          <select
                            value={prod.corridor || 'Kadthal'}
                            onChange={e => {
                              const updated = [...(profile.sectionData.products?.items || [])];
                              updated[idx].corridor = e.target.value;
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, products: { items: updated } }
                              }));
                            }}
                            className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                          >
                            <option value="Kadthal">Srisailam Highway (Kadthal Future City)</option>
                            <option value="Kokapet">Kokapet Financial District</option>
                            <option value="Shamshabad">Shamshabad Airport (NH-44)</option>
                            <option value="Sadashivpet">Mumbai Highway (Sadashivpet)</option>
                            <option value="Shankarpally">Shankarpally - Mokila</option>
                            <option value="Chevella">Chevella - Vikarabad</option>
                            <option value="Yadagirigutta">Yadagirigutta (NH-163)</option>
                            <option value="Ghatkesar">Ghatkesar - Warangal Highway</option>
                          </select>
                        </div>
                      </div>

                      {/* Status & Available Dimensions */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-400">Construction / Handover Status</label>
                          <select
                            value={prod.status || 'Ready for Construction'}
                            onChange={e => {
                              const updated = [...(profile.sectionData.products?.items || [])];
                              updated[idx].status = e.target.value;
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, products: { items: updated } }
                              }));
                            }}
                            className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                          >
                            <option value="Ready for Construction">Ready for Construction</option>
                            <option value="Under Construction">Under Construction</option>
                            <option value="Upcoming Pre-Launch">Upcoming Pre-Launch / EOI</option>
                            <option value="Ready for Handover">Ready for Handover</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-slate-400">Available Plot / Unit Dimensions</label>
                          <input 
                            type="text" 
                            value={prod.dimensions || '150, 200, 300 Sq. Yds'}
                            placeholder="e.g. 150, 200, 300 Sq. Yds (or 3 & 4 BHK)"
                            onChange={e => {
                              const updated = [...(profile.sectionData.products?.items || [])];
                              updated[idx].dimensions = e.target.value;
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, products: { items: updated } }
                              }));
                            }}
                            className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                          />
                        </div>
                      </div>

                      {/* Image Upload / URL & Brochure PDF */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-400">Elevation / Layout Blueprint Image</label>
                          <div className="mt-1 flex gap-2">
                            <input 
                              type="text" 
                              value={prod.imageUrl}
                              placeholder="Image URL or upload"
                              onChange={e => {
                                const updated = [...(profile.sectionData.products?.items || [])];
                                updated[idx].imageUrl = e.target.value;
                                setProfile(prev => ({
                                  ...prev,
                                  sectionData: { ...prev.sectionData, products: { items: updated } }
                                }));
                              }}
                              className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                            />
                            <label className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold cursor-pointer border border-slate-700 flex items-center gap-1 shrink-0">
                              <Upload className="w-3.5 h-3.5 text-amber-400" />
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={e => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (ev) => {
                                      if (ev.target?.result) {
                                        const updated = [...(profile.sectionData.products?.items || [])];
                                        updated[idx].imageUrl = ev.target.result as string;
                                        setProfile(prev => ({
                                          ...prev,
                                          sectionData: { ...prev.sectionData, products: { items: updated } }
                                        }));
                                      }
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-slate-400">Project Brochure PDF URL</label>
                          <div className="mt-1 flex items-center rounded-xl bg-slate-950 border border-slate-700 px-3 py-2">
                            <FileText className="w-3.5 h-3.5 text-amber-400 mr-2 shrink-0" />
                            <input 
                              type="url" 
                              value={prod.brochureUrl || ''}
                              placeholder="https://.../brochure.pdf"
                              onChange={e => {
                                const updated = [...(profile.sectionData.products?.items || [])];
                                updated[idx].brochureUrl = e.target.value;
                                setProfile(prev => ({
                                  ...prev,
                                  sectionData: { ...prev.sectionData, products: { items: updated } }
                                }));
                              }}
                              className="w-full bg-transparent text-xs text-white focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Project Description &amp; Highlights</label>
                        <textarea 
                          rows={2}
                          value={prod.description || ''}
                          placeholder="Key venture specifications, location advantages, and title clearances..."
                          onChange={e => {
                            const updated = [...(profile.sectionData.products?.items || [])];
                            updated[idx].description = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: { ...prev.sectionData, products: { items: updated } }
                            }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : isInterior ? (
              <div className="space-y-5 max-w-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>Signature Interior Transformations &amp; Spaces</span>
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {profile.sectionData.products?.items?.length || 0} Spaces
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Showcase bespoke residential living spaces, modular kitchens, master suites, budgets, and 3D lookbooks.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newSpace: ProductItem = {
                        id: `space_${Date.now()}`,
                        name: 'Signature Luxury Living Room',
                        description: 'Italian statuario marble flooring, custom fluted acoustic veneer paneling, ambient magnetic track lighting.',
                        price: 1850000,
                        currency: '₹',
                        imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
                        category: 'Living Room',
                        isAvailable: true
                      };
                      const updated = [...(profile.sectionData.products?.items || []), newSpace];
                      setProfile(prev => ({
                        ...prev,
                        sectionData: { ...prev.sectionData, products: { items: updated } }
                      }));
                    }}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-xs font-bold text-stone-950 flex items-center gap-1.5 transition-all shadow-md cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" /> Add Interior Project
                  </button>
                </div>

                {/* Quick Presets Strip */}
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Quick Interior Space Presets:
                    </span>
                    <span className="text-[10px] text-slate-400">Click to instantly add to card</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const p: ProductItem = {
                          id: `p_int_${Date.now()}_1`,
                          name: 'The Sovereign Living & Dining Lounge',
                          category: 'Living Room',
                          description: 'Italian statuario marble flooring, custom fluted acoustic veneer paneling, ambient magnetic track lighting.',
                          price: 1850000,
                          currency: '₹',
                          imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
                          isAvailable: true
                        };
                        setProfile(prev => ({
                          ...prev,
                          sectionData: { ...prev.sectionData, products: { items: [...(prev.sectionData.products?.items || []), p] } }
                        }));
                      }}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-medium bg-slate-950 hover:bg-amber-950/40 text-slate-300 hover:text-amber-300 border border-slate-800 hover:border-amber-500/40 transition"
                    >
                      + Living &amp; Dining (₹18.5L)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const p: ProductItem = {
                          id: `p_int_${Date.now()}_2`,
                          name: 'Minimalist Matte Charcoal Modular Kitchen',
                          category: 'Modular Kitchen',
                          description: 'Century Club Prime BWP plywood, quartz stone countertop, Hafele lift-up fittings, Blum soft-close tandem boxes.',
                          price: 1250000,
                          currency: '₹',
                          imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
                          isAvailable: true
                        };
                        setProfile(prev => ({
                          ...prev,
                          sectionData: { ...prev.sectionData, products: { items: [...(prev.sectionData.products?.items || []), p] } }
                        }));
                      }}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-medium bg-slate-950 hover:bg-amber-950/40 text-slate-300 hover:text-amber-300 border border-slate-800 hover:border-amber-500/40 transition"
                    >
                      + Modular Kitchen (₹12.5L)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const p: ProductItem = {
                          id: `p_int_${Date.now()}_3`,
                          name: 'The Zen Master Suite & Walk-In Wardrobe',
                          category: 'Master Suite',
                          description: 'Warm teak fluted headboard, acoustic upholstered panels, tinted bronze glass wardrobes with sensor LED lighting.',
                          price: 1450000,
                          currency: '₹',
                          imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
                          isAvailable: true
                        };
                        setProfile(prev => ({
                          ...prev,
                          sectionData: { ...prev.sectionData, products: { items: [...(prev.sectionData.products?.items || []), p] } }
                        }));
                      }}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-medium bg-slate-950 hover:bg-amber-950/40 text-slate-300 hover:text-amber-300 border border-slate-800 hover:border-amber-500/40 transition"
                    >
                      + Master Suite (₹14.5L)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const p: ProductItem = {
                          id: `p_int_${Date.now()}_4`,
                          name: 'Boutique Creative Workspace & Studio',
                          category: 'Commercial',
                          description: 'Acoustic NRC 0.8 wood slat ceilings, modular cable-managed desks, and double-glazed private conference cabins.',
                          price: 1600000,
                          currency: '₹',
                          imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
                          isAvailable: true
                        };
                        setProfile(prev => ({
                          ...prev,
                          sectionData: { ...prev.sectionData, products: { items: [...(prev.sectionData.products?.items || []), p] } }
                        }));
                      }}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-medium bg-slate-950 hover:bg-amber-950/40 text-slate-300 hover:text-amber-300 border border-slate-800 hover:border-amber-500/40 transition"
                    >
                      + Commercial Studio (₹16.0L)
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {profile.sectionData.products?.items?.map((space, idx) => (
                    <div key={space.id} className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative group hover:border-amber-500/40 transition shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-white uppercase tracking-wider">{space.category || 'Interior Space'}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = profile.sectionData.products?.items?.filter((_, i) => i !== idx) || [];
                            setProfile(prev => ({
                              ...prev,
                              sectionData: { ...prev.sectionData, products: { items: updated } }
                            }));
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-400">Space / Project Title</label>
                          <input 
                            type="text"
                            value={space.name}
                            placeholder="e.g. The Sovereign Living & Dining Lounge"
                            onChange={e => {
                              const updated = [...(profile.sectionData.products?.items || [])];
                              updated[idx].name = e.target.value;
                              setProfile(prev => ({ ...prev, sectionData: { ...prev.sectionData, products: { items: updated } } }));
                            }}
                            className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-slate-400">Room Category / Type</label>
                          <input 
                            type="text"
                            value={space.category || ''}
                            placeholder="e.g. Living Room / Modular Kitchen / Master Suite"
                            onChange={e => {
                              const updated = [...(profile.sectionData.products?.items || [])];
                              updated[idx].category = e.target.value;
                              setProfile(prev => ({ ...prev, sectionData: { ...prev.sectionData, products: { items: updated } } }));
                            }}
                            className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-400">Estimated Budget (₹)</label>
                          <input 
                            type="number"
                            value={space.price}
                            placeholder="1850000"
                            onChange={e => {
                              const updated = [...(profile.sectionData.products?.items || [])];
                              updated[idx].price = Number(e.target.value);
                              setProfile(prev => ({ ...prev, sectionData: { ...prev.sectionData, products: { items: updated } } }));
                            }}
                            className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-amber-300 font-mono focus:outline-none focus:border-amber-500"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-slate-400">Project Photo URL</label>
                          <input 
                            type="url"
                            value={space.imageUrl || ''}
                            placeholder="https://images.unsplash.com/photo-..."
                            onChange={e => {
                              const updated = [...(profile.sectionData.products?.items || [])];
                              updated[idx].imageUrl = e.target.value;
                              setProfile(prev => ({ ...prev, sectionData: { ...prev.sectionData, products: { items: updated } } }));
                            }}
                            className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Material Specs &amp; Finish Details</label>
                        <textarea 
                          rows={2}
                          value={space.description || ''}
                          placeholder="e.g. Italian statuario marble flooring, custom fluted acoustic veneer paneling, ambient magnetic track lighting."
                          onChange={e => {
                            const updated = [...(profile.sectionData.products?.items || [])];
                            updated[idx].description = e.target.value;
                            setProfile(prev => ({ ...prev, sectionData: { ...prev.sectionData, products: { items: updated } } }));
                          }}
                          className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-w-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {isRestaurant ? 'Digital Food & Dining Menu' : isHealthcare ? 'Health Packages & Wellness Checkups' : isAutomobile ? 'Vehicle Showroom Fleet & Inventory' : isFashion ? 'Couture Collections & Saree Lookbook' : isEducation ? 'Course Programs & Certifications' : isBeauty ? 'Bridal & Luxury Spa Packages' : isEvents ? 'Signature Event Packages & Rigs' : isTravel ? 'Curated Holiday Itineraries & Gateways' : isProfessional ? 'Advisory Retainers & Legal Frameworks' : isHomeServices ? 'Deep Cleaning & Facility Packages' : isRetail ? 'Store Inventory & Featured Products' : 'WhatsApp Store Catalog'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {isRestaurant ? 'Showcase signature clay-pot dum biryanis, tandoori starters, curries, and beverages with live prices and 1-tap WhatsApp cart.' : isHealthcare ? 'Offer comprehensive medical checkup packages, full body screening, and diagnostic profiles.' : isAutomobile ? 'Showcase verified vehicles with pricing, mileage, fuel type, transmission, and instant WhatsApp booking.' : isFashion ? 'Showcase pure silk sarees, designer gowns, lehengas with live pricing and direct WhatsApp checkout.' : isEducation ? 'Showcase specialized courses, diploma batches, and certification roadmaps with instant inquiry.' : isBeauty ? 'Showcase complete bridal makeovers, hydra facials, and wellness combos with direct reservation.' : isEvents ? 'Showcase complete royal wedding packages, 2-day candid photo cinema sets, and sangeet stage rigs with pricing.' : isTravel ? 'Showcase international escapes, domestic honeymoon retreats, and custom tour packages with transparent pricing.' : isProfessional ? 'Showcase startup legal packages, monthly retainer plans, trademark filings, and compliance audits.' : isHomeServices ? 'Showcase complete 2BHK/3BHK deep cleaning, anti-termite structural warranty, and annual maintenance plans.' : isRetail ? 'Showcase in-store inventory, latest arrivals, hallmark jewelry, and gadgets with instant WhatsApp checkout.' : 'Products or packages customers can add to their cart and order directly on WhatsApp.'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newProd = {
                        id: `prod_${Date.now()}`,
                        name: isRestaurant ? 'Royal Special Hyderabadi Mutton Dum Biryani' : isHealthcare ? 'Executive Master Health Checkup' : isAutomobile ? '2023 Certified Automatic Sedan' : isFashion ? 'Pure Kanjeevaram Bridal Silk Saree' : isEducation ? 'Full Stack Web Development & AI Masterclass' : isBeauty ? 'Royal Bridal Glow & Pre-Wedding Rituals' : isEvents ? 'Grand Royal 3-Day Destination Wedding Package' : isTravel ? 'Bali Private Pool Villa & Island Escape (6D/5N)' : isProfessional ? 'Annual Startup Corporate Legal Retainer' : isHomeServices ? 'Complete 3BHK Deep Cleaning Package' : isRetail ? 'Flagship Premium Wireless Audio Headset' : 'New Product / Service Package',
                        description: isRestaurant ? 'Slow-cooked succulent tender goat meat with long-grain basmati, served with Mirchi ka Salan & Raita.' : isHealthcare ? '85+ blood tests, cardiac echo, liver profile, kidney panel & senior physician review.' : isAutomobile ? 'Single owner, 24,000 km, 150-point inspection certified with 1-year comprehensive warranty.' : isFashion ? 'Pure mulberry silk with real gold zari border, contrast pallu and unstitched blouse piece.' : isEducation ? '6-month intensive diploma with live real-world projects, mentor feedback, and 100% placement support.' : isBeauty ? '24k gold hydra-glow facial, premium bridal hairstyling, mineral airbrush HD makeup, and nail art.' : isEvents ? 'Full decor & production for Mehendi, Sangeet, Muhurtham & Reception. 6-member cinematic crew, celebrity DJ setup & hospitality desk.' : isTravel ? 'Seminyak private luxury pool villa, Ubud sacred monkey forest, Nusa Penida island speedboat cruise, sunset beach dinners & daily breakfast.' : isProfessional ? 'Monthly contract vetting, Board advisory minutes, founder equity governance, IP filings & unlimited routine legal queries.' : isHomeServices ? 'Exhaustive machine scrubbing of tiles, grout steam disinfection, chimney degreasing, sofa shampooing & window pane polishing.' : isRetail ? 'Active noise cancellation, 40-hour battery life, lossless spatial audio with official 1-year brand warranty card.' : 'High quality deliverable or service package.',
                        price: isRestaurant ? 420 : isHealthcare ? 2999 : isAutomobile ? 1250000 : isFashion ? 18500 : isEducation ? 34999 : isBeauty ? 14999 : isEvents ? 499999 : isTravel ? 48999 : isProfessional ? 24999 : isHomeServices ? 3499 : isRetail ? 4999 : 1999,
                        currency: '₹',
                        imageUrl: isRestaurant ? 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80' : isHealthcare ? 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80' : isAutomobile ? 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80' : isFashion ? 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80' : isEducation ? 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80' : isBeauty ? 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80' : isEvents ? 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80' : isTravel ? 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80' : isProfessional ? 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80' : isHomeServices ? 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80' : isRetail ? 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80' : 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
                        category: isRestaurant ? 'Signature Biryanis' : isHealthcare ? 'Health Checkup' : isAutomobile ? 'Showroom Fleet' : isFashion ? 'Bridal Couture' : isEducation ? 'Certified Course' : isBeauty ? 'Bridal Package' : isEvents ? 'Complete Wedding' : isTravel ? 'International Escape' : isProfessional ? 'Legal Retainer' : isHomeServices ? 'Cleaning Package' : isRetail ? 'Electronics & Audio' : 'Services',
                        isAvailable: true
                      };
                      const updated = [...(profile.sectionData.products?.items || []), newProd];
                      setProfile(prev => ({
                        ...prev,
                        sectionData: { ...prev.sectionData, products: { items: updated } }
                      }));
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5 transition-all shadow shrink-0 ${
                      isRestaurant ? 'bg-amber-600 hover:bg-amber-500' : isHealthcare ? 'bg-teal-600 hover:bg-teal-500' : isAutomobile ? 'bg-blue-600 hover:bg-blue-500' : isFashion ? 'bg-rose-600 hover:bg-rose-500' : isEducation ? 'bg-blue-600 hover:bg-blue-500' : isBeauty ? 'bg-rose-600 hover:bg-rose-500' : isEvents ? 'bg-violet-600 hover:bg-violet-500' : isTravel ? 'bg-cyan-600 hover:bg-cyan-500' : isProfessional ? 'bg-amber-600 hover:bg-amber-500' : isHomeServices ? 'bg-amber-600 hover:bg-amber-500' : isRetail ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-pink-600 hover:bg-pink-500'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" /> {isRestaurant ? 'Add Menu Dish' : isHealthcare ? 'Add Health Package' : isAutomobile ? 'Add Vehicle' : isFashion ? 'Add Couture Piece' : isEducation ? 'Add Course Program' : isBeauty ? 'Add Bridal Package' : isEvents ? 'Add Event Package' : isTravel ? 'Add Holiday Package' : isProfessional ? 'Add Retainer Plan' : isHomeServices ? 'Add Service Package' : isRetail ? 'Add Product' : 'Add Product'}
                  </button>
                </div>

                <div className="space-y-3">
                  {profile.sectionData.products?.items?.map((prod, idx) => (
                    <div key={prod.id} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-2 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-pink-400">Product #{idx + 1}</span>
                        <button
                          onClick={() => {
                            const updated = (profile.sectionData.products?.items || []).filter((_, i) => i !== idx);
                            setProfile(prev => ({
                              ...prev,
                              sectionData: { ...prev.sectionData, products: { items: updated } }
                            }));
                          }}
                          className="text-slate-500 hover:text-red-400 p-1 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input 
                        type="text" 
                        value={prod.name}
                        placeholder="Product Name"
                        onChange={e => {
                          const updated = [...(profile.sectionData.products?.items || [])];
                          updated[idx].name = e.target.value;
                          setProfile(prev => ({
                            ...prev,
                            sectionData: { ...prev.sectionData, products: { items: updated } }
                          }));
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <input 
                          type="number" 
                          value={prod.price}
                          placeholder="Price (₹)"
                          onChange={e => {
                            const updated = [...(profile.sectionData.products?.items || [])];
                            updated[idx].price = Number(e.target.value);
                            setProfile(prev => ({
                              ...prev,
                              sectionData: { ...prev.sectionData, products: { items: updated } }
                            }));
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                        <input 
                          type="text" 
                          value={prod.category || ''}
                          placeholder="Category (e.g. Footwear, Art...)"
                          onChange={e => {
                            const updated = [...(profile.sectionData.products?.items || [])];
                            updated[idx].category = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: { ...prev.sectionData, products: { items: updated } }
                            }));
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                        <div className="flex gap-1.5">
                          <input 
                            type="text" 
                            value={prod.imageUrl}
                            placeholder="Image URL or upload"
                            onChange={e => {
                              const updated = [...(profile.sectionData.products?.items || [])];
                              updated[idx].imageUrl = e.target.value;
                              setProfile(prev => ({
                                ...prev,
                                sectionData: { ...prev.sectionData, products: { items: updated } }
                              }));
                            }}
                            className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                          />
                          <label className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold cursor-pointer border border-slate-700 flex items-center gap-1 shrink-0" title="Upload from gallery">
                            <Upload className="w-3.5 h-3.5 text-pink-400" />
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={e => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (ev) => {
                                    if (ev.target?.result) {
                                      const updated = [...(profile.sectionData.products?.items || [])];
                                      updated[idx].imageUrl = ev.target.result as string;
                                      setProfile(prev => ({
                                        ...prev,
                                        sectionData: { ...prev.sectionData, products: { items: updated } }
                                      }));
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                      <textarea 
                        rows={2}
                        value={prod.description || ''}
                        placeholder="Product features, sizes, specs, or deliverables..."
                        onChange={e => {
                          const updated = [...(profile.sectionData.products?.items || [])];
                          updated[idx].description = e.target.value;
                          setProfile(prev => ({
                            ...prev,
                            sectionData: { ...prev.sectionData, products: { items: updated } }
                          }));
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )
          )}

          {/* TAB: VIDEOS & REELS */}
          {activeTab === 'videos' && (
            <div className="space-y-4 max-w-xl">
              {/* Hidden Local Video File Input */}
              <input
                ref={videoFileInputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  
                  // Strict 20MB Direct File Limit Protection
                  if (file.size > 20 * 1024 * 1024) {
                    alert(`Direct video upload size is capped at 20MB (selected file: ${(file.size / (1024 * 1024)).toFixed(1)}MB).\n\nTo embed full 4K Ultra-HD videos with zero buffering and unlimited length, please paste your YouTube, Vimeo, or Instagram link.`);
                    e.target.value = '';
                    return;
                  }

                  if (userPlan === 'Basic' || MAX_DIRECT_VIDEOS === 0) {
                    setUpgradeReason({
                      title: 'Direct Video Uploads Require Pro Plan',
                      desc: 'Direct video file uploads from your device gallery are available on the Pro Plan (up to 3 direct videos) and Advanced Plan (up to 5 direct videos). Upgrade your plan now, or embed unlimited free YouTube, Vimeo, or Reels links!'
                    });
                    setUpgradeModalOpen(true);
                    e.target.value = '';
                    return;
                  }

                  const currentDirectCount = (profile.sectionData.videos?.items || []).filter(v => v.type === 'direct').length;
                  if (currentDirectCount >= MAX_DIRECT_VIDEOS) {
                    if (userPlan === 'Pro') {
                      setUpgradeReason({
                        title: 'Pro Plan Direct Video Limit Reached (3/3)',
                        desc: 'You have reached the limit of 3 direct video uploads for the Pro Plan. Upgrade to the Advanced Plan (₹2,199/yr) for up to 5 direct videos, or paste free YouTube/Vimeo video links!'
                      });
                    } else {
                      setUpgradeReason({
                        title: 'Advanced Plan Direct Video Limit Reached (5/5)',
                        desc: 'You have reached the maximum quota of 5 direct video uploads for the Advanced Plan. You can add additional videos by pasting free YouTube, Vimeo, Loom, or Instagram Reels links!'
                      });
                    }
                    setUpgradeModalOpen(true);
                    e.target.value = '';
                    return;
                  }

                  const localUrl = URL.createObjectURL(file);
                  const newVideo: VideoItem = {
                    id: `vid_${Date.now()}`,
                    title: file.name.replace(/\.[^/.]+$/, "") || 'Local Video Upload',
                    url: localUrl,
                    type: 'direct',
                    caption: `Direct video (${(file.size / (1024 * 1024)).toFixed(1)} MB)`
                  };
                  const updated = [...(profile.sectionData.videos?.items || []), newVideo];
                  setProfile(prev => ({
                    ...prev,
                    sectionData: { ...prev.sectionData, videos: { items: updated } }
                  }));
                  e.target.value = '';
                }}
              />

              {/* Storage Quota Header */}
              {(() => {
                const totalVideos = profile.sectionData.videos?.items?.length || 0;
                const directCount = (profile.sectionData.videos?.items || []).filter(v => v.type === 'direct').length;
                const cloudCount = totalVideos - directCount;

                return (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-slate-700 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-4 h-4 text-indigo-400" />
                        <span className="text-xs font-bold text-white">
                          {isRestaurant ? 'Kitchen Reels & Ambience Videos' : isRealEstate ? 'Drone Surveys & Walkthrough Videos' : 'Videos & Storage Quotas'}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setUpgradeReason({
                            title: 'Upgrade Video Quotas',
                            desc: 'Upgrade your plan to unlock more direct video file uploads (Pro: 3 videos, Advanced: 5 videos) and expanded cloud streaming slots.'
                          });
                          setUpgradeModalOpen(true);
                        }}
                        className="text-[11px] text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
                      >
                        <Crown className="w-3.5 h-3.5 text-amber-400" />
                        <span>Upgrade Quota</span>
                      </button>
                    </div>

                    {/* Stats Breakdown */}
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                        <div className="text-slate-400 text-[10px] font-medium">Direct File Uploads (Max 20MB)</div>
                        <div className="font-bold text-indigo-400 mt-1 flex items-center justify-between">
                          <span>{directCount} / {MAX_DIRECT_VIDEOS} Used</span>
                          {userPlan === 'Basic' ? (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">Pro &amp; Adv Only</span>
                          ) : (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">{userPlan} Plan</span>
                          )}
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                        <div className="text-slate-400 text-[10px] font-medium">Cloud Links (YouTube/Vimeo)</div>
                        <div className="font-bold text-emerald-400 mt-1 flex items-center justify-between">
                          <span>{cloudCount} / {MAX_VIDEOS} Links</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">4K Zero-Lag</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] text-indigo-200 bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-500/20 space-y-1">
                      <p className="font-semibold text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Direct Upload Quotas by Plan:</span>
                      </p>
                      <p className="text-slate-400 text-[10.5px] leading-relaxed">
                        • <strong>Basic Plan:</strong> 0 direct uploads (YouTube &amp; Vimeo embeds supported)<br/>
                        • <strong>Pro Plan:</strong> Up to 3 direct video files (20MB max per file)<br/>
                        • <strong>Advanced Plan:</strong> Up to 5 direct video files (20MB max per file)
                      </p>
                    </div>
                  </div>
                );
              })()}

              {/* Informational banner on YouTube/Instagram vs Direct File limits */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>YouTube &amp; Instagram Videos:</strong> Added via web links only (zero file quota used).</span>
                </div>
                <div className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/25 text-indigo-300">
                  Direct Files: {userPlan === 'Basic' ? '0 allowed (Pro Plan Only)' : `${(profile.sectionData.videos?.items || []).filter(v => v.type === 'direct').length}/${MAX_DIRECT_VIDEOS} max 20MB`}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const currentCount = profile.sectionData.videos?.items?.length || 0;
                    if (currentCount >= MAX_VIDEOS) {
                      setUpgradeReason({
                        title: 'Video Storage Limit Reached',
                        desc: `Your current ${userPlan} Plan allows up to ${MAX_VIDEOS} videos. Upgrade to the Advanced Plan (₹2199/yr) for 25+ videos.`
                      });
                      setUpgradeModalOpen(true);
                      return;
                    }
                    const newVideo: VideoItem = {
                      id: `vid_${Date.now()}`,
                      title: isRealEstate 
                        ? '4K Aerial Drone Layout Survey & Walkthrough' 
                        : isInterior 
                        ? '4K Ultra-HD Home Interior Walkthrough Tour' 
                        : '4K YouTube Video Showcase',
                      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                      type: 'youtube',
                      caption: isRealEstate 
                        ? 'Watch 4K aerial layout progression, road connectivity & master arch.' 
                        : isInterior 
                        ? 'Complete 3D walkthrough, Italian marble finish, and modular lighting tour.' 
                        : 'Watch our story in Full 4K Ultra-HD.'
                    };
                    const updated = [...(profile.sectionData.videos?.items || []), newVideo];
                    setProfile(prev => ({
                      ...prev,
                      sectionData: { ...prev.sectionData, videos: { items: updated } }
                    }));
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 transition-all shadow-md active:scale-95 bg-red-600 hover:bg-red-500 shadow-red-500/20 cursor-pointer"
                >
                  <SocialIcon platform="youtube" size={15} /> 
                  <span>{isRestaurant ? 'Add Kitchen Prep 4K Link' : isRealEstate ? 'Add YouTube 4K Link' : isInterior ? 'Add 4K Tour Link' : 'Add YouTube Link'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const currentCount = profile.sectionData.videos?.items?.length || 0;
                    if (currentCount >= MAX_VIDEOS) {
                      setUpgradeReason({
                        title: 'Video Storage Limit Reached',
                        desc: `Your current ${userPlan} Plan allows up to ${MAX_VIDEOS} videos. Upgrade to the Advanced Plan (₹2199/yr) for 25+ videos.`
                      });
                      setUpgradeModalOpen(true);
                      return;
                    }
                    const newVideo: VideoItem = {
                      id: `vid_${Date.now()}`,
                      title: isRestaurant
                        ? 'Clay-Pot Dum Biryani Handi Open Reel'
                        : isRealEstate 
                        ? 'On-Site Ground Progression & Master Arch Reel' 
                        : isInterior 
                        ? 'Before & After Turnkey Handover Reel' 
                        : 'Instagram Brand Reel Tour',
                      url: 'https://www.instagram.com/reel/C3M8W98oG12/',
                      type: 'instagram',
                      caption: isRestaurant
                        ? 'Live kitchen prep, charcoal tandoor sizzle, and customer dining ambience.'
                        : isRealEstate 
                        ? 'Live on-site footage, finished CC roads, and street lighting illumination.' 
                        : isInterior 
                        ? 'Live 45-day turnkey progress, modular factory installation, and client reaction.' 
                        : 'Watch on-the-go updates on Instagram.'
                    };
                    const updated = [...(profile.sectionData.videos?.items || []), newVideo];
                    setProfile(prev => ({
                      ...prev,
                      sectionData: { ...prev.sectionData, videos: { items: updated } }
                    }));
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 transition-all shadow-md active:scale-95 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 shadow-pink-500/20 cursor-pointer"
                >
                  <SocialIcon platform="instagram" size={15} /> 
                  <span>{isRealEstate ? 'Add Instagram Reel Link' : 'Add Instagram Reel Link'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const directCount = (profile.sectionData.videos?.items || []).filter(v => v.type === 'direct').length;

                    if (userPlan === 'Basic' || MAX_DIRECT_VIDEOS === 0) {
                      setUpgradeReason({
                        title: 'Direct Video File Uploads Require Pro Plan',
                        desc: 'Direct video file uploads (.mp4/.mov from device) are available on the Pro Plan (up to 3 files) and Advanced Plan (up to 5 files). You can paste unlimited YouTube and Instagram links for free on all plans!'
                      });
                      setUpgradeModalOpen(true);
                      return;
                    }

                    if (userPlan === 'Pro' && directCount >= 3) {
                      setUpgradeReason({
                        title: 'Pro Plan Direct Video Limit Reached (3/3)',
                        desc: 'You have reached the limit of 3 direct video uploads for the Pro Plan. Upgrade to the Advanced Plan (₹2,199/yr) for up to 5 direct videos, or paste free YouTube/Instagram video links!'
                      });
                      setUpgradeModalOpen(true);
                      return;
                    }

                    if (userPlan === 'Advanced' && directCount >= 5) {
                      setUpgradeReason({
                        title: 'Advanced Plan Direct Video Limit Reached (5/5)',
                        desc: 'You have reached the maximum quota of 5 direct video uploads for the Advanced Plan. You can add additional videos by pasting free YouTube or Instagram links!'
                      });
                      setUpgradeModalOpen(true);
                      return;
                    }

                    videoFileInputRef.current?.click();
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Upload Direct File ({userPlan === 'Basic' ? 'Pro Plan Only' : `${(profile.sectionData.videos?.items || []).filter(v => v.type === 'direct').length}/${MAX_DIRECT_VIDEOS}`})</span>
                </button>
              </div>

              {/* Videos List */}
              <div className="space-y-4">
                {profile.sectionData.videos?.items?.map((vid, idx) => (
                  <div key={vid.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-700 space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-indigo-400">Video #{idx + 1}</span>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          vid.type === 'youtube' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                          vid.type === 'instagram' ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' :
                          'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                        }`}>
                          {vid.type === 'youtube' ? 'YouTube' : vid.type === 'instagram' ? 'Instagram Reel' : 'Direct / Local Video'}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          const updated = (profile.sectionData.videos?.items || []).filter((_, i) => i !== idx);
                          setProfile(prev => ({
                            ...prev,
                            sectionData: { ...prev.sectionData, videos: { items: updated } }
                          }));
                        }}
                        className="text-slate-500 hover:text-red-400 p-1 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-1">
                        <label className="text-[11px] font-medium text-slate-400">Video Type</label>
                        <select
                          value={vid.type}
                          onChange={e => {
                            const newType = e.target.value as 'youtube' | 'instagram' | 'direct';
                            if (newType === 'direct') {
                              const directCount = (profile.sectionData.videos?.items || []).filter(v => v.type === 'direct' && v.id !== vid.id).length;
                              if (userPlan === 'Basic' || MAX_DIRECT_VIDEOS === 0) {
                                setUpgradeReason({
                                  title: 'Direct Video File Uploads Require Pro Plan',
                                  desc: 'Direct video file uploads (.mp4/.mov) require the Pro Plan (up to 3 files) or Advanced Plan (up to 5 files). You can embed unlimited YouTube and Instagram videos for free via web links on all plans!'
                                });
                                setUpgradeModalOpen(true);
                                return;
                              }
                              if (userPlan === 'Pro' && directCount >= 3) {
                                setUpgradeReason({
                                  title: 'Pro Plan Direct Video Limit Reached (3/3)',
                                  desc: 'You have reached the limit of 3 direct video uploads for the Pro Plan. Upgrade to Advanced Plan (₹2199/yr) for up to 5 direct videos, or paste free YouTube/Instagram links.'
                                });
                                setUpgradeModalOpen(true);
                                return;
                              }
                              if (userPlan === 'Advanced' && directCount >= 5) {
                                setUpgradeReason({
                                  title: 'Advanced Plan Direct Video Limit Reached (5/5)',
                                  desc: 'You have reached the maximum quota of 5 direct video uploads for the Advanced Plan. You can add additional videos by pasting free YouTube or Instagram links.'
                                });
                                setUpgradeModalOpen(true);
                                return;
                              }
                            }
                            const updated = [...(profile.sectionData.videos?.items || [])];
                            updated[idx] = {
                              ...updated[idx],
                              type: newType
                            };
                            setProfile(prev => ({
                              ...prev,
                              sectionData: { ...prev.sectionData, videos: { items: updated } }
                            }));
                          }}
                          className="w-full mt-1 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        >
                          <option value="youtube">YouTube (Link Only)</option>
                          <option value="instagram">Instagram Reel (Link Only)</option>
                          <option value="direct">Direct Video File {userPlan === 'Basic' ? '(Pro Plan Only)' : ''}</option>
                        </select>
                      </div>

                      <div className="col-span-2">
                        <label className="text-[11px] font-medium text-slate-400">Video Title</label>
                        <input
                          type="text"
                          value={vid.title}
                          placeholder="e.g. Agency Reel / Product Demo"
                          onChange={e => {
                            const updated = [...(profile.sectionData.videos?.items || [])];
                            updated[idx].title = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: { ...prev.sectionData, videos: { items: updated } }
                            }));
                          }}
                          className="w-full mt-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-medium text-slate-400">
                          {vid.type === 'youtube' ? 'YouTube Web Link (Paste URL Only)' :
                           vid.type === 'instagram' ? 'Instagram Reel Link (Paste URL Only)' :
                           'Direct Video URL or Local MP4 File'}
                        </label>
                        {vid.type === 'direct' && (
                          <label className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer flex items-center gap-1">
                            <Upload className="w-3 h-3" />
                            <span>Choose Video File</span>
                            <input
                              type="file"
                              accept="video/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;

                                const directCount = (profile.sectionData.videos?.items || []).filter(v => v.type === 'direct' && v.id !== vid.id).length;
                                if (userPlan === 'Basic' || MAX_DIRECT_VIDEOS === 0) {
                                  setUpgradeReason({
                                    title: 'Direct Video File Uploads Require Pro Plan',
                                    desc: 'Direct video file uploads (.mp4/.mov) require the Pro or Advanced plan. Paste YouTube or Instagram links for free!'
                                  });
                                  setUpgradeModalOpen(true);
                                  return;
                                }
                                if (userPlan === 'Pro' && directCount >= 3) {
                                  setUpgradeReason({
                                    title: 'Pro Plan Direct Video Limit Reached (3/3)',
                                    desc: 'You have reached the limit of 3 direct videos on the Pro Plan. Upgrade to Advanced Plan or paste free YouTube/Instagram links.'
                                  });
                                  setUpgradeModalOpen(true);
                                  return;
                                }
                                if (file.size > 20 * 1024 * 1024) {
                                  alert(`Selected video is ${(file.size / (1024 * 1024)).toFixed(1)}MB. Direct upload limit is 20MB. Please paste a YouTube or Instagram link for unlimited HD videos.`);
                                  return;
                                }

                                const dataUrl = await readFileAsDataUrl(file);
                                const updated = [...(profile.sectionData.videos?.items || [])];
                                updated[idx].url = dataUrl;
                                updated[idx].type = 'direct';
                                updated[idx].caption = `Video: ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)`;
                                setProfile(prev => ({
                                  ...prev,
                                  sectionData: { ...prev.sectionData, videos: { items: updated } }
                                }));
                              }}
                            />
                          </label>
                        )}
                      </div>
                      <input
                        type="url"
                        value={vid.url}
                        placeholder={
                          vid.type === 'youtube' ? 'https://www.youtube.com/watch?v=... or https://youtu.be/...' :
                          vid.type === 'instagram' ? 'https://www.instagram.com/reel/...' :
                          'https://example.com/video.mp4'
                        }
                        onChange={e => {
                          const rawVal = e.target.value;
                          const normalized = normalizeVideoUrl(rawVal);
                          const updated = [...(profile.sectionData.videos?.items || [])];
                          updated[idx] = {
                            ...updated[idx],
                            url: rawVal,
                            type: normalized.type,
                            embedUrl: normalized.embedUrl
                          };
                          setProfile(prev => ({
                            ...prev,
                            sectionData: { ...prev.sectionData, videos: { items: updated } }
                          }));
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                      />
                      {vid.type === 'youtube' && vid.url && (
                        <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Auto-configured for 4K streaming embed player</span>
                        </p>
                      )}
                      {vid.type === 'instagram' && vid.url && (
                        <p className="text-[10px] text-pink-400 mt-1 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Auto-configured for Instagram Reel vertical embed player</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-slate-400">Caption / Summary</label>
                      <textarea
                        rows={2}
                        value={vid.caption || ''}
                        placeholder="Brief summary or description about this video..."
                        onChange={e => {
                          const updated = [...(profile.sectionData.videos?.items || [])];
                          updated[idx].caption = e.target.value;
                          setProfile(prev => ({
                            ...prev,
                            sectionData: { ...prev.sectionData, videos: { items: updated } }
                          }));
                        }}
                        className="w-full mt-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ARTICLES & BLOGS */}
          {activeTab === 'blogs' && (
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-indigo-400" /> Articles & Thought Leadership
                  </h3>
                  <p className="text-xs text-slate-400">Manage articles showcased on your digital profile.</p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/dashboard/blogs"
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow"
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    <span>Open Blog Studio</span>
                  </Link>

                  <button
                    onClick={() => {
                      const newBlog: BlogPostItem = {
                        id: `blog_${Date.now()}`,
                        title: 'New Industry Insight',
                        slug: `new-article-${Date.now()}`,
                        excerpt: 'Summary of the key insights and actionable takeaways...',
                        content: 'Write the comprehensive article details and guidelines here...',
                        coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
                        category: 'Strategy',
                        readTimeMinutes: 3,
                        publishedAt: new Date().toISOString().split('T')[0],
                        authorName: profile.name,
                        isPublished: true,
                        tags: ['Strategy', 'Growth'],
                        viewsCount: 0
                      };
                      const updated = [newBlog, ...(profile.sectionData.blogs?.items || [])];
                      setProfile(prev => ({
                        ...prev,
                        sectionData: { ...prev.sectionData, blogs: { items: updated } }
                      }));
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 border border-slate-700"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Quick Add</span>
                  </button>
                </div>
              </div>

              {/* Articles List */}
              <div className="space-y-3">
                {(profile.sectionData.blogs?.items || []).map((b, idx) => (
                  <div key={b.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-400">Article #{idx + 1}</span>
                      <button
                        onClick={() => {
                          const updated = (profile.sectionData.blogs?.items || []).filter(item => item.id !== b.id);
                          setProfile(prev => ({
                            ...prev,
                            sectionData: { ...prev.sectionData, blogs: { items: updated } }
                          }));
                        }}
                        className="p-1 rounded-lg text-rose-400 hover:bg-rose-500/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-slate-400">Title</label>
                      <input
                        type="text"
                        value={b.title}
                        onChange={e => {
                          const updated = [...(profile.sectionData.blogs?.items || [])];
                          updated[idx].title = e.target.value;
                          setProfile(prev => ({
                            ...prev,
                            sectionData: { ...prev.sectionData, blogs: { items: updated } }
                          }));
                        }}
                        className="w-full mt-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] font-medium text-slate-400">Category</label>
                        <input
                          type="text"
                          value={b.category}
                          onChange={e => {
                            const updated = [...(profile.sectionData.blogs?.items || [])];
                            updated[idx].category = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: { ...prev.sectionData, blogs: { items: updated } }
                            }));
                          }}
                          className="w-full mt-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-medium text-slate-400">Read Time (mins)</label>
                        <input
                          type="number"
                          value={b.readTimeMinutes}
                          onChange={e => {
                            const updated = [...(profile.sectionData.blogs?.items || [])];
                            updated[idx].readTimeMinutes = parseInt(e.target.value) || 3;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: { ...prev.sectionData, blogs: { items: updated } }
                            }));
                          }}
                          className="w-full mt-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-slate-400">Short Summary</label>
                      <textarea
                        rows={2}
                        value={b.excerpt}
                        onChange={e => {
                          const updated = [...(profile.sectionData.blogs?.items || [])];
                          updated[idx].excerpt = e.target.value;
                          setProfile(prev => ({
                            ...prev,
                            sectionData: { ...prev.sectionData, blogs: { items: updated } }
                          }));
                        }}
                        className="w-full mt-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PORTFOLIO GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-4 max-w-xl">
              {/* Hidden Local Gallery Image Input (Supports Multi-Image Batch Selection) */}
              <input
                ref={galleryFileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={async (e) => {
                  const files = Array.from(e.target.files || []);
                  if (!files.length) return;

                  const currentItems = profile.sectionData.gallery?.items || [];
                  const remainingQuota = MAX_GALLERY - currentItems.length;

                  if (remainingQuota <= 0) {
                    setUpgradeReason({
                      title: 'Portfolio Gallery Limit Reached',
                      desc: `Your current ${userPlan} Plan allows up to ${MAX_GALLERY} portfolio photos. Upgrade to the Advanced Plan (₹2,199/yr) for up to 50+ high-resolution portfolio photos & client showcase galleries.`
                    });
                    setUpgradeModalOpen(true);
                    e.target.value = '';
                    return;
                  }

                  const filesToUpload = files.slice(0, remainingQuota);
                  const dataUrls = await Promise.all(filesToUpload.map(f => readFileAsDataUrl(f)));

                  const newGalleryItems: GalleryItem[] = filesToUpload.map((file, i) => ({
                    id: `gal_${Date.now()}_${i}`,
                    title: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ") || 'Showcase Photograph',
                    category: galleryUploadTag || 'Portfolio',
                    description: `High-resolution showcase photograph under ${galleryUploadTag || 'Portfolio'}.`,
                    imageUrl: dataUrls[i]
                  }));

                  const updated = [...currentItems, ...newGalleryItems];
                  setProfile(prev => ({
                    ...prev,
                    sectionData: { ...prev.sectionData, gallery: { items: updated } }
                  }));

                  if (files.length > remainingQuota) {
                    setUpgradeReason({
                      title: 'Some Photos Exceeded Plan Quota',
                      desc: `Uploaded ${filesToUpload.length} photos (${updated.length}/${MAX_GALLERY} used). Upgrade to the Advanced Plan (₹2,199/yr) to store up to 50+ high-res portfolio showcases.`
                    });
                    setUpgradeModalOpen(true);
                  }

                  e.target.value = '';
                }}
              />

              {/* Gallery Quota Header */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-slate-700 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-bold text-white">
                      {isRestaurant ? 'Food, Dining Ambience & Kitchen Photo Gallery' : isRealEstate ? 'Blueprints, Elevations & Site Progress Photos' : 'Portfolio Gallery & Photos Quota'}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      (profile.sectionData.gallery?.items?.length || 0) >= MAX_GALLERY
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {profile.sectionData.gallery?.items?.length || 0} / {MAX_GALLERY} Photos Used ({userPlan} Plan)
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setUpgradeReason({
                        title: 'Extend Portfolio Gallery Storage',
                        desc: 'Upgrade to the Advanced Plan (₹2,199/yr) to showcase up to 50 high-resolution case studies, custom client galleries, and full-screen lightbox zoom.'
                      });
                      setUpgradeModalOpen(true);
                    }}
                    className="text-[11px] text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
                  >
                    <Crown className="w-3.5 h-3.5 text-amber-400" />
                    <span>Upgrade Storage</span>
                  </button>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                    style={{ width: `${Math.min(100, (((profile.sectionData.gallery?.items?.length || 0) / MAX_GALLERY) * 100))}%` }}
                  />
                </div>
              </div>

              {/* Quick Category Tagger for Real Estate or Photography & Creatives */}
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    {isRestaurant ? 'Food & Ambience Category:' : isRealEstate ? 'Blueprint & Photo Category:' : 'Batch Upload Category:'}
                  </span>
                  <span className="text-[10px] text-slate-400">Tagged automatically on upload</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {(isRestaurant
                    ? ['Dining Ambience', 'Signature Dishes', 'Tandoor & Starters', 'Biryani & Main Course', 'Desserts & Sweets', 'Bar & Mocktails', 'Kitchen Hygiene & Crew', 'VIP & Family Seating']
                    : isRealEstate 
                    ? ['Master Layout Blueprint', '3D Architectural Elevation', 'Villa / Flat Interiors', 'Clubhouse & Amenities', 'Actual Site Progress', 'Aerial Drone Survey', 'Open Plots Demarcation', 'Venture Entrance Arch']
                    : isInterior
                    ? ['Living & Dining', 'Modular Kitchens', 'Master Bedrooms', 'Commercial & Offices', '3D Lookbooks & Renders', 'False Ceiling & Lighting', 'Wardrobes & Woodwork', 'Before & After Transformations']
                    : ['Weddings', 'Portraits', 'Fashion', 'Pre-Wedding', 'Events', 'Commercial', 'Architecture', 'Products', 'Food & Dining', 'Landscape']
                  ).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setGalleryUploadTag(cat)}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all ${
                        galleryUploadTag === cat
                          ? isRealEstate || isInterior
                            ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20 ring-1 ring-amber-400'
                            : 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 ring-1 ring-indigo-400'
                          : 'bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => galleryFileInputRef.current?.click()}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95 ${
                    isRealEstate
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-amber-500/20'
                      : isRestaurant
                      ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:from-orange-400 hover:to-amber-500 shadow-orange-500/20'
                      : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white shadow-indigo-500/20'
                  }`}
                >
                  <Upload className={`w-4 h-4 ${isRealEstate ? 'text-slate-950 stroke-[2.5]' : 'text-white'}`} /> 
                  <span>{isRestaurant ? 'Batch Upload Food & Dining Photos' : isRealEstate ? 'Batch Upload Layouts & Photos' : 'Batch Upload Photos (Multi-Select)'}</span>
                </button>

                <button
                  onClick={() => {
                    const currentCount = profile.sectionData.gallery?.items?.length || 0;
                    if (currentCount >= MAX_GALLERY) {
                      setUpgradeReason({
                        title: 'Portfolio Gallery Limit Reached',
                        desc: `Your current ${userPlan} Plan allows up to ${MAX_GALLERY} portfolio projects. Upgrade to the Advanced Plan (₹2,199/yr) for 50+ high-resolution portfolio projects & unlimited client showcase galleries.`
                      });
                      setUpgradeModalOpen(true);
                      return;
                    }
                    const newGalleryItem: GalleryItem = {
                      id: `gal_${Date.now()}`,
                      title: isRestaurant 
                        ? 'Dining Ambience & Kitchen Showcase'
                        : isRealEstate 
                        ? 'Master Layout Demarcation Blueprint' 
                        : 'New Client Showcase',
                      category: galleryUploadTag || (isRestaurant ? 'Dining Ambience' : isRealEstate ? 'Master Layout Blueprint' : 'Portfolio'),
                      description: isRestaurant
                        ? 'High-resolution photo of dining seating, kitchen plating, and restaurant interior.'
                        : isRealEstate 
                        ? 'High-resolution HMDA/DTCP master zoning layout and demarcation blueprint.'
                        : 'Complete project photoshoot and visual showcase.',
                      imageUrl: isRestaurant
                        ? 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
                        : isRealEstate
                        ? 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'
                        : 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
                    };
                    const updated = [...(profile.sectionData.gallery?.items || []), newGalleryItem];
                    setProfile(prev => ({
                      ...prev,
                      sectionData: { ...prev.sectionData, gallery: { items: updated } }
                    }));
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" /> {isRestaurant ? 'Add Photo via Web Link' : isRealEstate ? 'Add Blueprint via Web Link' : 'Add Photo via Web Link'}
                </button>
              </div>

              {/* Projects List */}
              <div className="space-y-4">
                {profile.sectionData.gallery?.items?.map((item, idx) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-700 space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-indigo-400">Project #{idx + 1}</span>
                        {item.category && (
                          <span className="text-[10px] font-bold text-indigo-300 uppercase px-2 py-0.5 rounded-full bg-indigo-500/20">
                            {item.category}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          const updated = (profile.sectionData.gallery?.items || []).filter((_, i) => i !== idx);
                          setProfile(prev => ({
                            ...prev,
                            sectionData: { ...prev.sectionData, gallery: { items: updated } }
                          }));
                        }}
                        className="text-slate-500 hover:text-red-400 p-1 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex gap-4 items-start">
                      <label 
                        className="w-20 h-20 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0 shadow cursor-pointer relative group"
                        title="Click to upload photo from your device gallery"
                      >
                        <img 
                          src={item.imageUrl} 
                          alt={item.title || 'Preview'} 
                          className="w-full h-full object-cover group-hover:opacity-75 transition-opacity" 
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-1 text-center">
                          <Upload className="w-4 h-4 text-white" />
                          <span className="text-[8px] font-bold text-white mt-0.5 leading-tight">Upload</span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const dataUrl = await readFileAsDataUrl(file);
                            const updated = [...(profile.sectionData.gallery?.items || [])];
                            updated[idx].imageUrl = dataUrl;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: { ...prev.sectionData, gallery: { items: updated } }
                            }));
                          }}
                        />
                      </label>

                      <div className="flex-1 space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-slate-400 font-semibold">Project Title</label>
                            <input
                              type="text"
                              value={item.title || ''}
                              placeholder="Project Name"
                              onChange={e => {
                                const updated = [...(profile.sectionData.gallery?.items || [])];
                                updated[idx].title = e.target.value;
                                setProfile(prev => ({
                                  ...prev,
                                  sectionData: { ...prev.sectionData, gallery: { items: updated } }
                                }));
                              }}
                              className="w-full mt-0.5 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-400 font-semibold">Category</label>
                            <input
                              type="text"
                              value={item.category || ''}
                              placeholder="e.g. UI/UX Design, Mobile App"
                              onChange={e => {
                                const updated = [...(profile.sectionData.gallery?.items || [])];
                                updated[idx].category = e.target.value;
                                setProfile(prev => ({
                                  ...prev,
                                  sectionData: { ...prev.sectionData, gallery: { items: updated } }
                                }));
                              }}
                              className="w-full mt-0.5 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[10px] text-slate-400 font-semibold">
                              Image (Web Link or Gallery Upload)
                            </label>
                            <label className="px-2.5 py-0.5 rounded-md bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 hover:text-white border border-indigo-500/30 text-[10px] font-bold cursor-pointer flex items-center gap-1 transition active:scale-95 shadow-sm">
                              <Upload className="w-3 h-3 text-indigo-400" />
                              <span>Upload from Gallery</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;
                                  const dataUrl = await readFileAsDataUrl(file);
                                  const updated = [...(profile.sectionData.gallery?.items || [])];
                                  updated[idx].imageUrl = dataUrl;
                                  setProfile(prev => ({
                                    ...prev,
                                    sectionData: { ...prev.sectionData, gallery: { items: updated } }
                                  }));
                                }}
                              />
                            </label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={item.imageUrl.startsWith('data:') ? '[Uploaded Image File from Gallery]' : item.imageUrl}
                              placeholder="https://images.unsplash.com/... or click Upload"
                              onChange={e => {
                                const val = e.target.value;
                                const updated = [...(profile.sectionData.gallery?.items || [])];
                                updated[idx].imageUrl = val;
                                setProfile(prev => ({
                                  ...prev,
                                  sectionData: { ...prev.sectionData, gallery: { items: updated } }
                                }));
                              }}
                              className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                            />
                            <label className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer border border-slate-700 flex items-center gap-1.5 shrink-0 transition active:scale-95">
                              <Upload className="w-3.5 h-3.5 text-indigo-400" />
                              <span>Choose Photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;
                                  const dataUrl = await readFileAsDataUrl(file);
                                  const updated = [...(profile.sectionData.gallery?.items || [])];
                                  updated[idx].imageUrl = dataUrl;
                                  setProfile(prev => ({
                                    ...prev,
                                    sectionData: { ...prev.sectionData, gallery: { items: updated } }
                                  }));
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 font-semibold">Project Description (Shown in Lightbox Zoom)</label>
                      <textarea
                        rows={2}
                        value={item.description || ''}
                        placeholder="Key results, technologies used, or client feedback..."
                        onChange={e => {
                          const updated = [...(profile.sectionData.gallery?.items || [])];
                          updated[idx].description = e.target.value;
                          setProfile(prev => ({
                            ...prev,
                            sectionData: { ...prev.sectionData, gallery: { items: updated } }
                          }));
                        }}
                        className="w-full mt-0.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SOCIAL LINKS */}
          {activeTab === 'socials' && (
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Social Profiles & Messengers</h3>
                  <p className="text-xs text-slate-400">Link your active digital profiles for 1-tap visitor connections.</p>
                </div>

                {/* Add Custom Social Button */}
                <button
                  onClick={() => {
                    const newSoc = {
                      id: `soc_${Date.now()}`,
                      platform: 'custom',
                      label: 'My Portfolio',
                      url: 'https://'
                    };
                    const updated = [...(profile.sectionData.socials?.items || []), newSoc];
                    setProfile(prev => ({
                      ...prev,
                      sectionData: { ...prev.sectionData, socials: { items: updated } }
                    }));
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Link</span>
                </button>
              </div>

              {/* Quick Add Preset Channels */}
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-[11px] font-semibold text-slate-400">Quick-Add Popular Channels:</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    { platform: 'whatsapp', label: 'WhatsApp', defaultUrl: 'https://wa.me/' },
                    { platform: 'linkedin', label: 'LinkedIn', defaultUrl: 'https://linkedin.com/in/' },
                    { platform: 'instagram', label: 'Instagram', defaultUrl: 'https://instagram.com/' },
                    { platform: 'twitter', label: 'X (Twitter)', defaultUrl: 'https://x.com/' },
                    { platform: 'youtube', label: 'YouTube', defaultUrl: 'https://youtube.com/@' },
                    { platform: 'github', label: 'GitHub', defaultUrl: 'https://github.com/' },
                    { platform: 'telegram', label: 'Telegram', defaultUrl: 'https://t.me/' },
                    { platform: 'discord', label: 'Discord', defaultUrl: 'https://discord.gg/' },
                    { platform: 'facebook', label: 'Facebook', defaultUrl: 'https://facebook.com/' },
                    { platform: 'threads', label: 'Threads', defaultUrl: 'https://threads.net/@' },
                  ].map((preset) => (
                    <button
                      key={preset.platform}
                      type="button"
                      onClick={() => {
                        const existing = (profile.sectionData.socials?.items || []).find(
                          s => s.platform.toLowerCase() === preset.platform.toLowerCase()
                        );
                        if (!existing) {
                          const newSoc = {
                            id: `soc_${Date.now()}`,
                            platform: preset.platform,
                            label: preset.label,
                            url: preset.defaultUrl
                          };
                          const updated = [...(profile.sectionData.socials?.items || []), newSoc];
                          setProfile(prev => ({
                            ...prev,
                            sectionData: { ...prev.sectionData, socials: { items: updated } }
                          }));
                        }
                      }}
                      className="px-2.5 py-1 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700/80 text-[11px] font-semibold text-slate-200 flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
                    >
                      <SocialIcon platform={preset.platform} size={14} />
                      <span>{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Socials List */}
              <div className="space-y-3">
                {profile.sectionData.socials?.items?.map((soc, idx) => (
                  <div key={soc.id} className="p-3.5 rounded-2xl bg-slate-900 border border-slate-700/80 space-y-2 relative shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center">
                          <SocialIcon platform={soc.platform} url={soc.url} size={16} />
                        </div>
                        <input
                          type="text"
                          value={soc.label || soc.platform}
                          placeholder="Platform / Label"
                          onChange={e => {
                            const updated = [...(profile.sectionData.socials?.items || [])];
                            updated[idx].label = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              sectionData: { ...prev.sectionData, socials: { items: updated } }
                            }));
                          }}
                          className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-xs font-bold text-white w-36"
                        />
                      </div>

                      <button
                        onClick={() => {
                          const updated = (profile.sectionData.socials?.items || []).filter((_, i) => i !== idx);
                          setProfile(prev => ({
                            ...prev,
                            sectionData: { ...prev.sectionData, socials: { items: updated } }
                          }));
                        }}
                        className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
                        title="Remove link"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <input 
                      type="url" 
                      value={soc.url}
                      placeholder="https://..."
                      onChange={e => {
                        const updated = [...(profile.sectionData.socials?.items || [])];
                        updated[idx].url = e.target.value;
                        setProfile(prev => ({
                          ...prev,
                          sectionData: { ...prev.sectionData, socials: { items: updated } }
                        }));
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Right Real-Time Dual Device Mockup & Mini-Website Preview View */}
      {showPreview && (
        <div className={`w-full ${studioPreviewDevice === 'website' ? 'lg:w-[500px] xl:w-[620px] 2xl:w-[720px]' : 'lg:w-[320px] xl:w-[350px] 2xl:w-[390px]'} p-2 sm:p-2.5 lg:p-3 bg-slate-950 flex flex-col items-center justify-start h-full min-h-0 overflow-y-auto scrollbar-none shrink-0 border-t lg:border-t-0 lg:border-l border-slate-800 transition-all duration-200 animate-in fade-in`}>
          <div className="flex items-center justify-between w-full mb-2 px-1 shrink-0">
            {/* Viewport Mode Switcher: Mobile Card vs Desktop Mini Website */}
            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-900 border border-slate-800">
              <button
                type="button"
                onClick={() => setStudioPreviewDevice('mobile')}
                className={`px-2 py-1 rounded-md text-[11px] font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  studioPreviewDevice === 'mobile'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Live Mobile Card View"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile View</span>
              </button>
              <button
                type="button"
                onClick={() => setStudioPreviewDevice('website')}
                className={`px-2 py-1 rounded-md text-[11px] font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  studioPreviewDevice === 'website'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Live Mini Website Desktop View"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Mini Website</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setStudioWebsitePreviewOpen(true)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                title="Fullscreen Preview Modal"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              <a
                href={`/v/${profile.slug}`}
                target="_blank"
                rel="noreferrer"
                className="p-1 rounded-lg text-cyan-400 hover:text-cyan-300 hover:bg-slate-800 transition"
                title={`Open live card: /v/${profile.slug}`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                title="Collapse preview panel for full editor width"
              >
                <PanelRightClose className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Conditional Preview Rendering: Mobile Frame vs Mini-Website Window */}
          {studioPreviewDevice === 'mobile' ? (
            <div className="w-full max-w-[280px] sm:max-w-[295px] lg:max-w-[315px] xl:max-w-[335px] rounded-[36px] p-2 bg-slate-900 border-4 border-slate-700 shadow-2xl ring-1 ring-white/10 relative shrink-0 transition-transform origin-top scale-[0.84] sm:scale-[0.88] md:scale-[0.90] lg:scale-[0.95] xl:scale-100 my-auto">
              {/* Top Speaker / Camera Notch */}
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-16 h-2.5 bg-slate-950 rounded-full z-30 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-900 mr-1.5" />
                <div className="w-5 h-1 rounded-full bg-slate-900" />
              </div>

              {/* Screen Content */}
              <div className="rounded-[28px] overflow-hidden bg-slate-950 h-[440px] sm:h-[480px] md:h-[calc(100vh-230px)] max-h-[550px] min-h-[350px] overflow-y-auto scrollbar-none border border-slate-800">
                <ProfileCardView 
                  profile={profile} 
                  isMockup={true} 
                  initialViewMode="mobile" 
                />
              </div>
            </div>
          ) : (
            <div className="w-full flex-1 flex flex-col rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden min-h-[460px] h-[calc(100vh-170px)]">
              {/* Browser Window Chrome Top Bar */}
              <div className="bg-slate-950 px-3 py-2 border-b border-slate-800 flex items-center justify-between gap-2 shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                </div>
                <div className="flex-1 max-w-xs mx-auto px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] text-slate-400 font-mono text-center truncate">
                  🔒 oneclickbiz.in/v/{profile.slug}
                </div>
                <div className="w-10" />
              </div>

              {/* Live Mini-Website Frame */}
              <div className="flex-1 overflow-y-auto bg-slate-100 dark:bg-slate-950 scrollbar-thin">
                <ProfileCardView 
                  profile={profile} 
                  isMockup={true} 
                  initialViewMode="website" 
                  showViewToggle={true} 
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mini-Website Desktop Browser Preview Modal */}
      {studioWebsitePreviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200">
          <div className="w-full max-w-6xl h-[92vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Browser Window Chrome Top Bar */}
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                </div>
                <div className="hidden sm:flex items-center gap-1.5 ml-3 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono">
                  <span className="text-emerald-400">🔒 https://</span>
                  <span>oneclickbiz.in/v/{profile.slug || 'live'}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`/v/${profile.slug || 'kishore'}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-sm"
                >
                  <span>Open Live URL</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setStudioWebsitePreviewOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                  title="Close Preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Browser Content Frame */}
            <div className="flex-1 overflow-y-auto bg-slate-100 dark:bg-slate-950 p-2 sm:p-6">
              <div className="w-full max-w-5xl mx-auto">
                <ProfileCardView profile={profile} isMockup={false} initialViewMode="website" showViewToggle={true} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UPGRADE PLAN & STORAGE MODAL */}
      {upgradeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950/90 border border-indigo-500/30 rounded-3xl p-6 text-white shadow-2xl relative space-y-5 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setUpgradeModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-amber-500/20 shrink-0">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                  <Zap className="w-3 h-3" /> Plan Upgrade &amp; Billing
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">{upgradeReason.title}</h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
              {upgradeReason.desc}
            </p>

            {userPlan === 'Basic' && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-300">Pro Plan (₹1,599 / yr)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold">Recommended</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-200">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span><strong>Up to 3 Mini-Websites</strong> (/v/your-slug)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span><strong>3 Direct Videos (20MB)</strong> &amp; 10 Cloud Video Links</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span><strong>WhatsApp Catalog Store</strong> + Appointments</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {(userPlan === 'Pro' || userPlan === 'Basic') && (
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-300">Advanced Plan (₹2,199 / yr)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold">Max Power</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span><strong>Up to 5 Mini-Websites</strong> &amp; Team Outlets</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span><strong>5 Direct Videos (20MB)</strong> &amp; 25+ 4K Cloud Video Links</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span><strong>5 White-Label Custom Domains</strong> (CNAME)</span>
                  </li>
                </ul>
              </div>
            )}

            {userPlan === 'Advanced' && (
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 text-center">
                <p className="text-xs font-semibold text-emerald-400">✨ You are on the top-tier Advanced Plan.</p>
                <p className="text-[11px] text-slate-400">Manage your subscription, review GST invoices, or request custom enterprise expansion in the Billing Desk.</p>
              </div>
            )}

            <div className="space-y-2 pt-1">
              {userPlan === 'Basic' ? (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setUpgradeModalOpen(false);
                      router.push('/dashboard/settings?checkout=true&plan=PRO');
                    }}
                    className="py-3 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-1.5 active:scale-95 text-center"
                  >
                    <CreditCard className="w-3.5 h-3.5 shrink-0" />
                    <span>Pro (₹1,599)</span>
                  </button>
                  <button
                    onClick={() => {
                      setUpgradeModalOpen(false);
                      router.push('/dashboard/settings?checkout=true&plan=ADVANCED');
                    }}
                    className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all border border-slate-700 flex items-center justify-center gap-1.5 active:scale-95 text-center"
                  >
                    <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Advanced (₹2,199)</span>
                  </button>
                </div>
              ) : userPlan === 'Pro' ? (
                <button
                  onClick={() => {
                    setUpgradeModalOpen(false);
                    router.push('/dashboard/settings?checkout=true&plan=ADVANCED');
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-indigo-600 to-pink-600 hover:opacity-95 text-white font-bold text-xs transition-all shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 active:scale-95"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Proceed to Billing Desk • Upgrade to Advanced (₹2,199)</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setUpgradeModalOpen(false);
                    router.push('/dashboard/settings?checkout=true&plan=ADVANCED');
                  }}
                  className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all border border-slate-700 flex items-center justify-center gap-2 active:scale-95"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Open Billing &amp; Invoices Desk</span>
                </button>
              )}

              <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1 pt-1">
                <span>🔒 Secure 256-bit Checkout • UPI QR • Card • Net Banking • GST Invoices</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ADD CARD MODAL */}
      {isAddCardModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsAddCardModalOpen(false)}
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Create New Mini-Website</h3>
                  <p className="text-xs text-slate-400">Launch a new website profile with custom catalog &amp; slug</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAddCardModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {cardCreateError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{cardCreateError}</span>
              </div>
            )}

            {/* Quick Business Entity Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {lockConfig.icon} Select {activeCategory} Business Preset ({lockConfig.label})
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {(CATEGORY_QUICK_PRESETS[activeCategory] || CATEGORY_QUICK_PRESETS['Professional Services']).map((ent) => (
                  <button
                    key={ent.id}
                    type="button"
                    onClick={() => {
                      setNewCardTemplateId(ent.id);
                      setNewCardTitle(ent.title);
                      setNewCardSlug(`${(profile.slug || 'card').replace(/-card-\d+$/, '')}-${ent.slug}`);
                      setNewCardName(profile.name || ent.name);
                      setNewCardCompany(profile.company || ent.company);
                      setNewCardDesignation(ent.desig);
                    }}
                    className={`p-2 rounded-xl text-left border transition-all flex flex-col justify-between ${
                      newCardTemplateId === ent.id
                        ? `${lockConfig.badgeBg} border-indigo-500 text-white shadow-md ring-1 ring-indigo-500/40`
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <span className="text-base mb-1">{ent.icon}</span>
                    <span className="text-[11px] font-bold line-clamp-1">{ent.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleCreateCard} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300">
                  Card Name / Purpose <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newCardTitle}
                  placeholder={`e.g. ${profile.company || profile.name || 'My Brand'} ${activeCategory} Card`}
                  onChange={e => {
                    setNewCardTitle(e.target.value);
                    if (!newCardSlug) {
                      setNewCardSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 24));
                    }
                  }}
                  className="mt-1 w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">
                  Unique Card Handle / URL <span className="text-rose-400">*</span>
                </label>
                <div className="mt-1 flex items-center rounded-xl bg-slate-950 border border-slate-700 overflow-hidden focus-within:border-indigo-500">
                  <span className="px-3 text-xs text-slate-500 font-mono select-none">
                    oneclickbiz.com/v/
                  </span>
                  <input
                    type="text"
                    required
                    value={newCardSlug}
                    placeholder="my-new-card"
                    onChange={e => setNewCardSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    className="w-full py-2.5 pr-3 bg-transparent text-xs text-indigo-300 font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">
                  Select {activeCategory} Template ({categoryTemplates.length} Available)
                </label>
                <div className="mt-1.5 grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-44 overflow-y-auto pr-1">
                  {categoryTemplates.map(tpl => (
                    <div
                      key={tpl.id}
                      onClick={() => setNewCardTemplateId(tpl.id)}
                      className={`p-2 rounded-xl border cursor-pointer transition flex items-center gap-2 ${
                        newCardTemplateId === tpl.id
                          ? 'border-indigo-500 bg-indigo-500/20 text-white shadow ring-1 ring-indigo-500/40'
                          : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                        <img src={tpl.imgUrl} alt={tpl.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="truncate text-left">
                        <p className="text-[11px] font-bold truncate">{tpl.name}</p>
                        <p className="text-[9px] text-slate-400 truncate">{tpl.subCategory || tpl.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Your Full Name</label>
                  <input
                    type="text"
                    value={newCardName}
                    onChange={e => setNewCardName(e.target.value)}
                    placeholder="Kishore Patel"
                    className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300">Designation / Role</label>
                  <input
                    type="text"
                    value={newCardDesignation}
                    onChange={e => setNewCardDesignation(e.target.value)}
                    placeholder="e.g. Managing Director"
                    className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Company / Brand Name</label>
                <input
                  type="text"
                  value={newCardCompany}
                  onChange={e => setNewCardCompany(e.target.value)}
                  placeholder="Himastech Digital Reality"
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddCardModalOpen(false)}
                  className="w-1/3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 active:scale-95 transition flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create &amp; Launch Card</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Multi-Channel Share Card Modal */}
      {isShareModalOpen && (
        <ShareCardModal
          profile={profile}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}

      {/* Studio Live QR Code & Mini-Website Modal */}
      {isStudioQrModalOpen && (
        <div 
          onClick={() => setIsStudioQrModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white text-center shadow-2xl relative animate-in zoom-in-95 duration-200 space-y-4"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsStudioQrModalOpen(false)} 
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
              aria-label="Close QR Modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Profile Header */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-indigo-500 bg-slate-800 shadow-lg relative">
                {profile.avatarUrl ? (
                  <img 
                    src={profile.avatarUrl} 
                    alt={profile.name} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-indigo-600 text-white font-black text-xl">
                    {profile.name?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
              <div className="space-y-0.5">
                <h4 className="font-black text-base text-white">{profile.company || profile.name}</h4>
                <p className="text-xs text-slate-400">{profile.name} • {profile.designation || 'Business Profile'}</p>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold mt-1">
                  <CheckCircle2 className="w-3 h-3 text-indigo-400" />
                  <span>Verified Live Mini-Website</span>
                </div>
              </div>
            </div>

            {/* High-Resolution QR Code */}
            <div className="bg-white p-4 rounded-2xl mx-auto w-56 h-56 flex items-center justify-center shadow-inner relative">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(typeof window !== 'undefined' ? `${window.location.origin}/v/${profile.slug}` : `https://oneclickbiz.in/v/${profile.slug}`)}&color=0f172a&bgcolor=ffffff&margin=1`} 
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
              Scan with any mobile camera or Google Lens to instantly open your published commercial business mini-website.
            </p>

            {/* Quick URL Box & Copy */}
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 text-left">
              <span className="text-[11px] text-slate-400 truncate flex-1 font-mono">
                {typeof window !== 'undefined' ? `${window.location.origin}/v/${profile.slug}` : `https://oneclickbiz.in/v/${profile.slug}`}
              </span>
              <button
                type="button"
                onClick={() => {
                  const targetUrl = typeof window !== 'undefined' ? `${window.location.origin}/v/${profile.slug}` : `https://oneclickbiz.in/v/${profile.slug}`;
                  if (typeof navigator !== 'undefined' && navigator.clipboard) {
                    navigator.clipboard.writeText(targetUrl);
                    setStudioQrCopied(true);
                    setTimeout(() => setStudioQrCopied(false), 2000);
                  }
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-white flex items-center gap-1 transition shrink-0 cursor-pointer"
              >
                {studioQrCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{studioQrCopied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => downloadVcfFile(profile)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4 text-white" />
                <span>Save Contact to Phone (.VCF)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const targetUrl = typeof window !== 'undefined' ? `${window.location.origin}/v/${profile.slug}` : `https://oneclickbiz.in/v/${profile.slug}`;
                  const text = encodeURIComponent(`Check out my digital business profile & mini-website: ${targetUrl}`);
                  window.open(`https://wa.me/?text=${text}`, '_blank');
                }}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Share Profile on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Save & Publish Live Success Banner */}
      {saveSuccessMsg && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900 border border-emerald-500/40 text-white shadow-2xl shadow-emerald-500/20 backdrop-blur-xl">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-white">Card Published Successfully!</p>
              <p className="text-slate-300 text-[11px] font-mono mt-0.5">/v/{profile.slug}</p>
            </div>
            <a
              href={`/v/${profile.slug}`}
              target="_blank"
              rel="noreferrer"
              className="ml-2 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition"
            >
              <span>View Live</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

    </div>
  );
}

