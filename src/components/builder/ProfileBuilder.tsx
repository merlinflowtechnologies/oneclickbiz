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
  RefreshCw,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DigitalProfile, ThemeType, SectionType, VideoItem, GalleryItem, BlogPostItem } from '@/lib/types';
import { VCARD_TEMPLATES_CATALOG, VCardTemplateItem } from '@/data/vcardTemplates';
import { getTemplateProfile } from '@/data/templatePresets';
import { getProfileBySlug } from '@/lib/data-store';
import ProfileCardView from '../templates/ProfileCardView';
import SocialIcon, { getSocialBrandColor } from '@/components/common/SocialIcon';
import ShareCardModal from '@/components/common/ShareCardModal';
import { getCurrentUserPlan } from '@/lib/plan-guards';

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

  // Template browser state
  const [templateSearch, setTemplateSearch] = useState('');
  const [templateCategory, setTemplateCategory] = useState('all');

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
              title: initialProfile.name ? `${initialProfile.name}'s vCard` : 'Primary Business Card',
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
      return `Your Basic Plan allows 1 digital business card (${userCards.length}/1 used). Upgrade to the Pro Plan (₹1,599/yr) for up to 3 cards, or the Advanced Plan (₹2,199/yr) for up to 5 cards with multi-staff & custom domain support.`;
    }
    if (userPlan === 'Pro') {
      return `You have created all 3 digital business cards included in your Pro Plan (${userCards.length}/3 used). Upgrade to the Advanced Plan (₹2,199/yr) to add up to 5 cards, team profiles, and white-label custom domains.`;
    }
    return `You have reached the maximum quota of 5 digital business cards on your Advanced Plan (${userCards.length}/5 used). For custom enterprise team fleets or additional cards, please contact support or manage subscriptions in the Billing Desk.`;
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

    // Build new profile from chosen template
    const basePreset = getTemplateProfile(newCardTemplateId);
    const newProfile: DigitalProfile = {
      ...basePreset,
      id: `prof_${cleanSlug}_${Date.now()}`,
      slug: cleanSlug,
      name: newCardName.trim() || profile.name || basePreset.name,
      company: newCardCompany.trim() || profile.company || basePreset.company,
      designation: newCardDesignation.trim() || profile.designation || basePreset.designation,
      phone: profile.phone || basePreset.phone,
      whatsapp: profile.whatsapp || profile.phone || basePreset.whatsapp,
      email: profile.email || basePreset.email,
    };

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
      alert('You must have at least one active digital card.');
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
    const preset = getTemplateProfile(templateId);
    const templateMeta = VCARD_TEMPLATES_CATALOG.find(t => t.id === templateId);

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
          slug: prev.slug || preset.slug,
          name: (prev.name && prev.name !== 'Kishore Patel') ? prev.name : preset.name,
          company: (prev.company && prev.company !== 'Himastech Digital Reality') ? prev.company : preset.company,
          designation: prev.designation || preset.designation,
          bio: prev.bio || preset.bio,
          phone: prev.phone || preset.phone,
          whatsapp: prev.whatsapp || (cleanWa ? cleanWa : preset.whatsapp),
          email: prev.email || preset.email,
          sectionData: {
            ...preset.sectionData,
            about: { content: prev.bio || preset.bio },
            socials: { items: updatedSocials },
            gallery: hasCustomGallery ? prev.sectionData.gallery : preset.sectionData.gallery,
            videos: hasCustomVideos ? prev.sectionData.videos : preset.sectionData.videos,
          }
        };
      });
    } else {
      setProfile(prev => ({
        ...prev,
        theme: preset.theme,
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
    if (onSave) {
      onSave(profile);
    }
    
    // Sync to local storage & trigger storage update across all components
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`oneclickbiz_custom_profile_${profile.slug}`, JSON.stringify(profile));
        localStorage.setItem('oneclickbiz_active_profile', JSON.stringify(profile));
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new CustomEvent('oneclickbiz_profile_updated', { detail: profile }));
      } catch (e) {
        console.error('Save to localStorage error:', e);
      }
    }

    // Persist to Server Database API
    try {
      const res = await fetch(`/api/profiles/${profile.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      if (res.ok) {
        const data = await res.json();
        console.log('Profile saved & published successfully:', data);
      }
    } catch (e) {
      console.error('Save profile to API error:', e);
    } finally {
      setIsSaving(false);
    }

    setIsSaved(true);
    setSaveSuccessMsg(`Card published live at oneclickbiz.in/v/${profile.slug}`);
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
    <div className="flex flex-col md:flex-row flex-1 h-full min-h-0 overflow-hidden bg-slate-950 text-slate-100">
      
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
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Your Digital Cards ({userCards.length})</span>
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

          <div className="flex items-center space-x-2">
            <button
              onClick={handleOpenAddCardModal}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-500/20 active:scale-95 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Card ({userCards.length}/{MAX_CARDS})</span>
            </button>
            <button 
              onClick={() => setIsShareModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-all border border-slate-700"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Link</span>
            </button>
            <a 
              href={`/v/${profile.slug}`} 
              target="_blank"
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-indigo-300 hover:text-white flex items-center gap-1.5 transition-all border border-slate-700"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </a>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-75 text-xs font-semibold text-white flex items-center gap-1.5 shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              {isSaving ? (
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isSaved ? (
                <Check className="w-3.5 h-3.5 text-emerald-300" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              {isSaving ? 'Publishing...' : isSaved ? 'Saved & Live!' : 'Save & Publish'}
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center overflow-x-auto px-4 py-2 border-b border-slate-800 bg-slate-950/40 gap-1 scrollbar-none shrink-0">
          <button 
            onClick={() => setActiveTab('cards')}
            className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all shrink-0 ${
              activeTab === 'cards' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" /> My Cards ({userCards.length})
          </button>
          <button 
            onClick={() => setActiveTab('info')}
            className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all shrink-0 ${
              activeTab === 'info' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <User className="w-3.5 h-3.5" /> Basic Info
          </button>
          <button 
            onClick={() => setActiveTab('socials')}
            className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all shrink-0 ${
              activeTab === 'socials' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Share2 className="w-3.5 h-3.5 text-purple-400" /> Social Channels ({profile.sectionData?.socials?.items?.length || 0})
          </button>
          <button 
            onClick={() => setActiveTab('templates')}
            className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all shrink-0 ${
              activeTab === 'templates' ? 'bg-gradient-to-r from-indigo-600 to-pink-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Templates ({VCARD_TEMPLATES_CATALOG.length})
          </button>
          <button 
            onClick={() => setActiveTab('theme')}
            className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all shrink-0 ${
              activeTab === 'theme' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Palette className="w-3.5 h-3.5" /> Themes & Style
          </button>
          <button 
            onClick={() => setActiveTab('sections')}
            className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all shrink-0 ${
              activeTab === 'sections' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Section Order
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all shrink-0 ${
              activeTab === 'services' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" /> Services
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all shrink-0 ${
              activeTab === 'products' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" /> WhatsApp Store
          </button>
          <button 
            onClick={() => setActiveTab('videos')}
            className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all shrink-0 ${
              activeTab === 'videos' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Film className="w-3.5 h-3.5" /> Videos & Reels
          </button>
          <button 
            onClick={() => setActiveTab('blogs')}
            className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all shrink-0 ${
              activeTab === 'blogs' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Articles & Blogs
          </button>
          <button 
            onClick={() => setActiveTab('gallery')}
            className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all shrink-0 ${
              activeTab === 'gallery' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" /> Portfolio Gallery
          </button>
          <button 
            onClick={() => setActiveTab('socials')}
            className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all shrink-0 ${
              activeTab === 'socials' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" /> Social Links
          </button>
        </div>

        {/* Tab Content Body with Smooth Custom Scrollbar & Bottom Padding */}
        <div className="flex-1 overflow-y-auto overscroll-y-contain p-4 sm:p-6 space-y-6 min-h-0 pb-40 sm:pb-52 custom-builder-scroll">
          
          {/* TAB 0: MY DIGITAL CARDS (MULTI-CARD MANAGER) */}
          {activeTab === 'cards' && (
            <div className="space-y-6 max-w-3xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">My Digital Business Cards</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {userCards.length} / {MAX_CARDS} Cards Used ({userPlan} Plan)
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Manage multiple digital identity profiles, niche marketing vCards, or staff cards under your business entity.
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
                            <p className="text-xs text-slate-400 mt-0.5">{card.designation || 'Business Card'} • {card.company || 'Enterprise'}</p>
                          </div>
                        </div>

                        {!isActive && userCards.length > 1 && (
                          <button
                            onClick={(e) => handleDeleteCard(card.slug, e)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition"
                            title="Delete Card"
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
                            title="Open Live Card"
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
                            <CreditCard className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Switch &amp; Edit This Card</span>
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
                    + Add New Digital Card ({userCards.length}/{MAX_CARDS})
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">
                    Choose from 28 industry presets to build a tailored vCard with custom services and store.
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
                          Shown at top of your digital card, vCard, QR code & email signature.
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

          {/* TAB: VCARD TEMPLATES LIBRARY */}
          {activeTab === 'templates' && (
            <div className="space-y-5 max-w-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">vCard Templates Library</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {VCARD_TEMPLATES_CATALOG.length} Templates
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Select any industry template to instantly switch your layout, colors, services, and WhatsApp store.
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
                  placeholder={`Search ${VCARD_TEMPLATES_CATALOG.length} templates (e.g. Boutique, Doctor, Saree, Real Estate, Hotel)...`}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />

                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { id: 'all', label: `All (${VCARD_TEMPLATES_CATALOG.length})`, icon: '✨' },
                    { id: 'Real Estate', label: 'Real Estate', icon: '🏠' },
                    { id: 'Fashion & Clothing', label: 'Fashion', icon: '👗' },
                    { id: 'Beauty & Personal Care', label: 'Beauty', icon: '💄' },
                    { id: 'Food Business', label: 'Food', icon: '🍽️' },
                    { id: 'Healthcare', label: 'Health', icon: '🏥' },
                    { id: 'Education', label: 'Education', icon: '🎓' },
                    { id: 'Home & Professional Services', label: 'Home Services', icon: '🛠️' },
                    { id: 'Automobile', label: 'Auto', icon: '🚗' },
                    { id: 'Events & Creative', label: 'Events', icon: '📸' },
                    { id: 'Professional Services', label: 'Professional', icon: '💼' },
                    { id: 'Retail & Local Shops', label: 'Retail', icon: '🛍️' },
                    { id: 'Travel & Hospitality', label: 'Travel', icon: '✈️' },
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setTemplateCategory(cat.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1 ${
                        templateCategory === cat.id
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of Templates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 max-h-[580px] overflow-y-auto pr-1">
                {VCARD_TEMPLATES_CATALOG
                  .filter(t => {
                    const matchCat = templateCategory === 'all' || t.category === templateCategory;
                    const q = templateSearch.toLowerCase();
                    const matchSearch = t.name.toLowerCase().includes(q) ||
                      t.tagline.toLowerCase().includes(q) ||
                      (t.subCategory && t.subCategory.toLowerCase().includes(q)) ||
                      t.features.some(f => f.toLowerCase().includes(q));
                    return matchCat && matchSearch;
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
                          className="vcard-template-img"
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
                      Browse 28 Industry vCard Templates
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

          {/* TAB 4: SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Bookable Services</h3>
                  <p className="text-xs text-slate-400">Services clients can choose from to book appointments on your calendar.</p>
                </div>
                <button
                  onClick={() => {
                    const newService = {
                      id: `svc_${Date.now()}`,
                      title: 'New Service',
                      description: 'Describe this service offering...',
                      price: 999,
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
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center gap-1.5 transition-all shadow"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Service
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
          )}

          {/* TAB 5: WHATSAPP STORE PRODUCTS */}
          {activeTab === 'products' && (
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">WhatsApp Store Catalog</h3>
                  <p className="text-xs text-slate-400">Products or packages customers can add to their cart and order directly on WhatsApp.</p>
                </div>
                <button
                  onClick={() => {
                    const newProd = {
                      id: `prod_${Date.now()}`,
                      name: 'New Product / Service Package',
                      description: 'High quality deliverable or service package.',
                      price: 1999,
                      currency: '₹',
                      imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
                      category: 'Services',
                      isAvailable: true
                    };
                    const updated = [...(profile.sectionData.products?.items || []), newProd];
                    setProfile(prev => ({
                      ...prev,
                      sectionData: { ...prev.sectionData, products: { items: updated } }
                    }));
                  }}
                  className="px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-xs font-semibold text-white flex items-center gap-1.5 transition-all shadow"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Product
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
                        <span className="text-xs font-bold text-white">Videos &amp; Storage Quotas</span>
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

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
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
                      title: '4K Brand Video Showcase',
                      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                      type: 'youtube',
                      caption: 'Watch our story in Full 4K Ultra-HD.'
                    };
                    const updated = [...(profile.sectionData.videos?.items || []), newVideo];
                    setProfile(prev => ({
                      ...prev,
                      sectionData: { ...prev.sectionData, videos: { items: updated } }
                    }));
                  }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-xs font-bold text-white flex items-center gap-1.5 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" /> Add 4K Video Link (YouTube / Vimeo / Reels)
                </button>

                <button
                  onClick={() => {
                    const directCount = (profile.sectionData.videos?.items || []).filter(v => v.type === 'direct').length;

                    if (userPlan === 'Basic' || MAX_DIRECT_VIDEOS === 0) {
                      setUpgradeReason({
                        title: 'Direct Video Uploads Require Pro Plan',
                        desc: 'Direct video file uploads from your device are available on the Pro Plan (up to 3 direct videos) and Advanced Plan (up to 5 direct videos). Upgrade your plan now, or paste free unlimited YouTube, Vimeo, or Reels links!'
                      });
                      setUpgradeModalOpen(true);
                      return;
                    }

                    if (userPlan === 'Pro' && directCount >= 3) {
                      setUpgradeReason({
                        title: 'Pro Plan Direct Video Limit Reached (3/3)',
                        desc: 'You have reached the limit of 3 direct video uploads for the Pro Plan. Upgrade to the Advanced Plan (₹2,199/yr) for up to 5 direct videos, or paste free YouTube/Vimeo video links!'
                      });
                      setUpgradeModalOpen(true);
                      return;
                    }

                    if (userPlan === 'Advanced' && directCount >= 5) {
                      setUpgradeReason({
                        title: 'Advanced Plan Direct Video Limit Reached (5/5)',
                        desc: 'You have reached the maximum quota of 5 direct video uploads for the Advanced Plan. You can add additional videos by pasting free YouTube, Vimeo, Loom, or Instagram Reels links!'
                      });
                      setUpgradeModalOpen(true);
                      return;
                    }

                    videoFileInputRef.current?.click();
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-all"
                >
                  <Upload className="w-3.5 h-3.5" /> Upload File ({userPlan === 'Basic' ? 'Pro Plan Only' : `${(profile.sectionData.videos?.items || []).filter(v => v.type === 'direct').length}/${MAX_DIRECT_VIDEOS} Max 20MB`})
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
                          <option value="youtube">YouTube Video</option>
                          <option value="instagram">Instagram Reel</option>
                          <option value="direct">Direct / Local Video</option>
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
                          {vid.type === 'direct' ? 'Direct Video URL or Local File' : 'Video Web Link (YouTube / Vimeo / Reels)'}
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
                  <p className="text-xs text-slate-400">Manage articles showcased on your digital profile & vCard.</p>
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
                    <span className="text-xs font-bold text-white">Portfolio Gallery &amp; Photos Quota</span>
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

              {/* Quick Category Tagger for Photography & Creatives */}
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Batch Upload Category:
                  </span>
                  <span className="text-[10px] text-slate-400">Tagged automatically on upload</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {['Weddings', 'Portraits', 'Fashion', 'Pre-Wedding', 'Events', 'Commercial', 'Architecture', 'Products', 'Food & Dining', 'Landscape'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setGalleryUploadTag(cat)}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all ${
                        galleryUploadTag === cat
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 ring-1 ring-indigo-400'
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
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-xs font-bold text-white flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                >
                  <Upload className="w-4 h-4" /> Batch Upload Photos (Multi-Select)
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
                      title: 'New Client Showcase',
                      category: galleryUploadTag || 'Portfolio',
                      description: 'Complete project photoshoot and visual showcase.',
                      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
                    };
                    const updated = [...(profile.sectionData.gallery?.items || []), newGalleryItem];
                    setProfile(prev => ({
                      ...prev,
                      sectionData: { ...prev.sectionData, gallery: { items: updated } }
                    }));
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Photo via Web Link
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

      {/* Right Real-Time Mobile Device Mockup View */}
      <div className="w-full md:w-[350px] lg:w-[390px] xl:w-[430px] p-3 sm:p-4 md:p-5 bg-slate-950 flex flex-col items-center justify-center h-full min-h-0 overflow-hidden shrink-0 border-t md:border-t-0 md:border-l border-slate-800">
        <div className="flex items-center gap-2 mb-2.5 shrink-0">
          <Smartphone className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Live Mobile Card Preview</span>
        </div>

        {/* Device Frame */}
        <div className="w-full max-w-[320px] sm:max-w-[340px] lg:max-w-[360px] xl:max-w-[375px] rounded-[44px] p-2.5 sm:p-3 bg-slate-900 border-4 border-slate-700 shadow-2xl ring-1 ring-white/10 relative shrink-0">
          
          {/* Top Speaker / Camera Notch */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-3.5 bg-slate-950 rounded-full z-30 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 mr-2" />
            <div className="w-7 h-1 rounded-full bg-slate-900" />
          </div>

          {/* Screen Content */}
          <div className="rounded-[36px] overflow-hidden bg-slate-950 h-[520px] sm:h-[560px] md:h-[calc(100vh-170px)] max-h-[640px] min-h-[420px] overflow-y-auto scrollbar-none border border-slate-800">
            <ProfileCardView profile={profile} isMockup={true} />
          </div>
        </div>
      </div>

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
                      <span><strong>Up to 3 Digital Cards</strong> (/v/your-slug)</span>
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
                    <span><strong>Up to 5 Digital Cards</strong> &amp; Team Profiles</span>
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
                  <h3 className="text-base font-bold text-white">Create New Digital Card</h3>
                  <p className="text-xs text-slate-400">Launch a new vCard profile with custom catalog &amp; slug</p>
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
                Select Business Entity / Industry
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {[
                  { id: 'vcard34', title: 'Photography & Studio', icon: '📸', slug: 'photography-studio', name: 'Aarav Mehta', company: 'Lumière Visual Studio', desig: 'Lead Photographer & Cinematographer' },
                  { id: 'vcard35', title: 'Real Estate & Property', icon: '🏢', slug: 'prime-estates', name: 'David Sterling', company: 'Sterling Global Estates', desig: 'Principal Property Broker' },
                  { id: 'vcard13', title: 'Doctor & Healthcare', icon: '🏥', slug: 'dr-consultation', name: 'Dr. Alistair Chen', company: 'Apex Medical Center', desig: 'Consultant Specialist' },
                  { id: 'vcard37', title: 'Florist & Decorator', icon: '🌸', slug: 'luxury-florals', name: 'Bella Fiore', company: 'Bella Flora Luxury Studio', desig: 'Botanical Designer' },
                  { id: 'vcard38', title: 'Architecture & Design', icon: '📐', slug: 'vance-design', name: 'Marcus Vance', company: 'Vance Architecture', desig: 'Principal Architect' },
                  { id: 'vcard12', title: 'Fitness & Gym Coach', icon: '🏋️', slug: 'ironpeak-fit', name: 'Alex Thorne', company: 'IronPeak Performance', desig: 'Elite Strength Coach' },
                  { id: 'vcard16', title: 'Legal & Advocate', icon: '⚖️', slug: 'legal-counsel', name: 'Harrison Reed', company: 'Reed & Chambers Law', desig: 'Corporate Legal Advocate' },
                  { id: 'vcard39', title: 'Media & Creator', icon: '🎙️', slug: 'media-press', name: 'Richard Madden', company: 'Global Press Bureau', desig: 'Senior Media Correspondent' },
                ].map((ent) => (
                  <button
                    key={ent.id}
                    type="button"
                    onClick={() => {
                      setNewCardTemplateId(ent.id);
                      setNewCardTitle(ent.title);
                      setNewCardSlug(ent.slug);
                      setNewCardName(ent.name);
                      setNewCardCompany(ent.company);
                      setNewCardDesignation(ent.desig);
                    }}
                    className={`p-2 rounded-xl text-left border transition-all flex flex-col justify-between ${
                      newCardTemplateId === ent.id
                        ? 'bg-indigo-600/25 border-indigo-500 text-white shadow-md ring-1 ring-indigo-500/40'
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
                  placeholder="e.g. Sales vCard, Real Estate Portfolio, Speaker Pass"
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
                  Select Base Industry Template (28 Presets)
                </label>
                <div className="mt-1.5 grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-44 overflow-y-auto pr-1">
                  {VCARD_TEMPLATES_CATALOG.map(tpl => (
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
                        <p className="text-[9px] text-slate-400 truncate">{tpl.category}</p>
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

