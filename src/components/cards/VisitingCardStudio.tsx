'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Download, 
  RotateCw, 
  Palette, 
  Type, 
  Image as ImageIcon, 
  Check, 
  QrCode, 
  Wifi, 
  CreditCard, 
  Printer, 
  ExternalLink, 
  Layers, 
  Maximize2,
  Upload,
  RefreshCw,
  Phone,
  Mail,
  Globe,
  MapPin,
  Share2,
  Sliders,
  CheckCircle2,
  Crown,
  Trash2,
  Eye,
  Hexagon,
  Shield,
  Feather,
  Gem,
  Compass,
  Zap,
  BookOpen,
  X,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import { savePDF, exportVisitingCardPDF } from '@/lib/pdf-export';
import { downloadDataUrl, downloadUrl, downloadBlob } from '@/lib/download-utils';
import CanvaAdobeStudioModal, { CanvaAdobeArtworkConfig } from './CanvaAdobeStudioModal';

export type CardTemplateId = 
  | 'matte-onyx'
  | 'minimal-white'
  | 'indigo-cyber'
  | 'royal-navy'
  | 'emerald-sage'
  | 'sunset-velvet'
  | 'obsidian-gold'
  | 'frosted-glass'
  | 'tokyo-neon'
  | 'monaco-emerald'
  | 'champagne-silk'
  | 'swiss-minimalist'
  | 'custom-canva';

export type CardOrientation = 'horizontal' | 'vertical';
export type CardFinish = 'matte-black' | 'glossy-uv' | 'gold-foil' | 'frosted-acrylic' | 'carbon-fiber';
export type LogoShape = 'square' | 'rounded' | 'circle' | 'transparent';
export type LogoSize = 'small' | 'medium' | 'large';
export type LogoPlacement = 'top-left' | 'top-right' | 'center' | 'both';

interface CardData {
  fullName: string;
  designation: string;
  companyName: string;
  tagline: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  slug: string;
  avatarUrl: string;
  logoUrl: string;
  logoShape: LogoShape;
  logoSize: LogoSize;
  logoPlacement: LogoPlacement;
  showLogo: boolean;
  accentColor: string;
  showNfcIcon: boolean;
  showQrCode: boolean;
  qrColor: string;
  orientation: CardOrientation;
  finish: CardFinish;
}

// Preset Luxury Badges for instant logo selection
const PRESET_LOGOS = [
  {
    id: 'crest-crown',
    name: 'Imperial Crown',
    icon: Crown,
    bg: 'from-amber-400 to-amber-600',
    color: 'text-slate-950',
    svg: 'crown'
  },
  {
    id: 'cyber-hex',
    name: 'Cyber Hexagon',
    icon: Hexagon,
    bg: 'from-cyan-400 to-indigo-600',
    color: 'text-white',
    svg: 'hex'
  },
  {
    id: 'royal-shield',
    name: 'Executive Shield',
    icon: Shield,
    bg: 'from-sky-400 to-blue-700',
    color: 'text-white',
    svg: 'shield'
  },
  {
    id: 'luxury-gem',
    name: 'Diamond Crest',
    icon: Gem,
    bg: 'from-rose-400 to-amber-500',
    color: 'text-slate-950',
    svg: 'gem'
  },
  {
    id: 'studio-feather',
    name: 'Artisan Feather',
    icon: Feather,
    bg: 'from-emerald-400 to-teal-700',
    color: 'text-slate-950',
    svg: 'feather'
  },
  {
    id: 'compass-apex',
    name: 'Apex Compass',
    icon: Compass,
    bg: 'from-purple-400 to-pink-600',
    color: 'text-white',
    svg: 'compass'
  }
];

export default function VisitingCardStudio() {
  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');
  const [selectedTemplate, setSelectedTemplate] = useState<CardTemplateId>('matte-onyx');
  const [activeTab, setActiveTab] = useState<'template' | 'canva' | 'logo' | 'details' | 'finish' | 'qr'>('template');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [customLogoPreset, setCustomLogoPreset] = useState<string>('crest-crown');
  const [pdfPreviewModal, setPdfPreviewModal] = useState<{ isOpen: boolean; url: string; filename: string } | null>(null);
  const [lastExportedFile, setLastExportedFile] = useState<{ url: string; filename: string; fileType: 'PDF' | 'PNG' } | null>(null);
  const [isCanvaModalOpen, setIsCanvaModalOpen] = useState(false);

  // Canva / Adobe Express Artwork State
  const [canvaArtworkConfig, setCanvaArtworkConfig] = useState<CanvaAdobeArtworkConfig>({
    frontArtworkUrl: '',
    backArtworkUrl: '',
    isCustomArtworkActive: false,
    qrPosition: 'bottom-right',
    qrSize: 'medium',
    showNfcBadge: true,
    artworkSource: 'canva'
  });

  // Card Content State
  const [cardData, setCardData] = useState<CardData>({
    fullName: 'Kishore Patel',
    designation: 'Founder & Managing Director',
    companyName: 'Himastech Digital Reality',
    tagline: 'Immersive 3D Tours • Performance Marketing',
    phone: '+91 98765 43210',
    email: 'kishore@himastech.com',
    website: 'himastech.com',
    address: 'Jubilee Hills, Hyderabad, India',
    slug: 'kishore',
    avatarUrl: '/kishore-profile-v2.png',
    logoUrl: '',
    logoShape: 'rounded',
    logoSize: 'medium',
    logoPlacement: 'top-left',
    showLogo: true,
    accentColor: '#eab308',
    showNfcIcon: true,
    showQrCode: true,
    qrColor: '#000000',
    orientation: 'horizontal',
    finish: 'matte-black'
  });

  const logoFileInputRef = useRef<HTMLInputElement | null>(null);
  const frontCardExportRef = useRef<HTMLDivElement | null>(null);
  const backCardExportRef = useRef<HTMLDivElement | null>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  // Generate crisp local QR code dataURL to avoid CORS/network issues during canvas export
  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://oneclickbiz.in';
    const targetUrl = `${origin}/v/${cardData.slug || 'card'}`;
    QRCode.toDataURL(targetUrl, {
      width: 320,
      margin: 1,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    }).then(setQrCodeDataUrl).catch(err => {
      console.error('QR code generation error:', err);
    });
  }, [cardData.slug]);

  // Load from session & local storage if exists
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const session = localStorage.getItem('oneclickbiz_user_session');
        if (session) {
          const parsed = JSON.parse(session);
          setCardData(prev => ({
            ...prev,
            fullName: parsed.fullName || prev.fullName,
            companyName: parsed.businessName || prev.companyName,
            designation: parsed.designation || prev.designation,
            phone: parsed.phone || prev.phone,
            email: parsed.email || prev.email,
            slug: parsed.slug || prev.slug,
            logoUrl: parsed.logoUrl || prev.logoUrl,
          }));
        }
        const savedArtwork = localStorage.getItem('oneclickbiz_custom_artwork');
        if (savedArtwork) {
          const parsedArt = JSON.parse(savedArtwork);
          setCanvaArtworkConfig(prev => ({ ...prev, ...parsedArt }));
          if (parsedArt.isCustomArtworkActive) {
            setSelectedTemplate('custom-canva');
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const handleUpdateArtworkConfig = (newCfg: Partial<CanvaAdobeArtworkConfig>) => {
    setCanvaArtworkConfig(prev => {
      const updated = { ...prev, ...newCfg };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('oneclickbiz_custom_artwork', JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
      }
      if (updated.isCustomArtworkActive) {
        setSelectedTemplate('custom-canva');
      }
      return updated;
    });
  };

  // Sync logo changes to local session
  const updateLogoUrl = (url: string) => {
    setCardData(prev => {
      const updated = { ...prev, logoUrl: url, showLogo: true };
      if (typeof window !== 'undefined') {
        try {
          const session = localStorage.getItem('oneclickbiz_user_session');
          const parsed = session ? JSON.parse(session) : {};
          parsed.logoUrl = url;
          localStorage.setItem('oneclickbiz_user_session', JSON.stringify(parsed));
        } catch (e) {
          console.error(e);
        }
      }
      return updated;
    });
  };

  // Handle local logo upload via file input
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, SVG, JPG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        updateLogoUrl(event.target.result as string);
        confetti({
          particleCount: 40,
          spread: 45,
          origin: { y: 0.7 }
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const templates: {
    id: CardTemplateId;
    name: string;
    description: string;
    previewGradient: string;
    bgFront: string;
    bgBack: string;
    textPrimary: string;
    textSecondary: string;
    accent: string;
    border: string;
    isPro?: boolean;
  }[] = [
    {
      id: 'custom-canva',
      name: '🎨 Canva & Adobe Artwork',
      description: 'Upload custom 1050x600px front & back artwork from Canva or Adobe Express.',
      previewGradient: 'from-cyan-500 via-purple-600 to-pink-500',
      bgFront: 'bg-slate-950',
      bgBack: 'bg-slate-950',
      textPrimary: 'text-white font-bold',
      textSecondary: 'text-slate-300',
      accent: 'border-cyan-500/40 text-cyan-400',
      border: 'border-cyan-500/40 ring-2 ring-cyan-500/30',
      isPro: true
    },
    {
      id: 'matte-onyx',
      name: 'Matte Onyx & Gold',
      description: 'Executive dark metallic finish with luxury gold foil typography.',
      previewGradient: 'from-zinc-950 via-zinc-900 to-amber-950',
      bgFront: 'bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950',
      bgBack: 'bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900',
      textPrimary: 'text-amber-300 font-semibold',
      textSecondary: 'text-zinc-400',
      accent: 'border-amber-500/40 text-amber-400',
      border: 'border-amber-500/25 ring-1 ring-amber-500/20'
    },
    {
      id: 'obsidian-gold',
      name: 'Obsidian & 24K Gold',
      description: 'Deep black marble texture with gilded gold border accents & micro-sheen.',
      previewGradient: 'from-slate-950 via-amber-950/80 to-slate-950',
      bgFront: 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-950/40 via-zinc-950 to-slate-950',
      bgBack: 'bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-zinc-950 via-amber-950/30 to-zinc-950',
      textPrimary: 'text-amber-200 font-bold tracking-wide',
      textSecondary: 'text-amber-100/70',
      accent: 'border-amber-400/50 text-amber-300',
      border: 'border-amber-400/40 shadow-amber-500/10'
    },
    {
      id: 'minimal-white',
      name: 'Silicon Valley White',
      description: 'Ultra-crisp Swiss minimalist styling with high-contrast monochrome branding.',
      previewGradient: 'from-slate-100 via-white to-slate-200',
      bgFront: 'bg-gradient-to-br from-slate-50 via-white to-slate-100',
      bgBack: 'bg-gradient-to-br from-white via-slate-50 to-slate-100',
      textPrimary: 'text-slate-900 font-bold',
      textSecondary: 'text-slate-500',
      accent: 'border-slate-300 text-slate-800',
      border: 'border-slate-300 shadow-xl'
    },
    {
      id: 'frosted-glass',
      name: 'Frosted Titanium Glass',
      description: 'Futuristic glassmorphism with subtle blur, cyber borders & glowing badges.',
      previewGradient: 'from-slate-800/80 via-slate-900/90 to-indigo-950',
      bgFront: 'bg-gradient-to-br from-slate-900/90 via-slate-950 to-indigo-950/80 backdrop-blur-xl',
      bgBack: 'bg-gradient-to-br from-indigo-950/80 via-slate-950 to-slate-900/90 backdrop-blur-xl',
      textPrimary: 'text-white font-extrabold',
      textSecondary: 'text-slate-300/80',
      accent: 'border-indigo-400/40 text-indigo-300',
      border: 'border-white/20 shadow-2xl ring-1 ring-white/10'
    },
    {
      id: 'indigo-cyber',
      name: 'Indigo Cyber Glow',
      description: 'Modern tech gradient with glassmorphism badge and vibrant cyber neon accents.',
      previewGradient: 'from-indigo-900 via-purple-900 to-pink-900',
      bgFront: 'bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950',
      bgBack: 'bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950',
      textPrimary: 'text-indigo-200 font-bold',
      textSecondary: 'text-indigo-300/70',
      accent: 'border-indigo-500/40 text-indigo-400',
      border: 'border-indigo-500/30 ring-1 ring-purple-500/20 shadow-indigo-500/10'
    },
    {
      id: 'tokyo-neon',
      name: 'Tokyo Cyberpunk',
      description: 'High-energy ultraviolet & electric cyan highlights for next-gen founders.',
      previewGradient: 'from-fuchsia-950 via-purple-950 to-cyan-950',
      bgFront: 'bg-gradient-to-tr from-slate-950 via-purple-950 to-slate-950',
      bgBack: 'bg-gradient-to-bl from-slate-950 via-cyan-950/80 to-slate-950',
      textPrimary: 'text-cyan-300 font-black',
      textSecondary: 'text-fuchsia-300/80',
      accent: 'border-cyan-400/50 text-cyan-400',
      border: 'border-cyan-400/30 ring-1 ring-fuchsia-500/30'
    },
    {
      id: 'royal-navy',
      name: 'Royal Navy & Silver',
      description: 'Authoritative deep navy corporate aesthetic with silver geometric accents.',
      previewGradient: 'from-sky-950 via-blue-950 to-slate-900',
      bgFront: 'bg-gradient-to-br from-blue-950 via-slate-950 to-sky-950',
      bgBack: 'bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950',
      textPrimary: 'text-sky-200 font-bold',
      textSecondary: 'text-sky-300/70',
      accent: 'border-sky-500/40 text-sky-400',
      border: 'border-sky-500/30'
    },
    {
      id: 'monaco-emerald',
      name: 'Monaco Emerald & Brass',
      description: 'Prestigious deep emerald marble look with brushed brass typography.',
      previewGradient: 'from-emerald-950 via-teal-950 to-amber-950',
      bgFront: 'bg-gradient-to-br from-emerald-950 via-zinc-950 to-teal-950',
      bgBack: 'bg-gradient-to-br from-zinc-950 via-emerald-950 to-amber-950/40',
      textPrimary: 'text-emerald-200 font-bold',
      textSecondary: 'text-emerald-300/70',
      accent: 'border-emerald-400/40 text-emerald-300',
      border: 'border-emerald-500/30'
    },
    {
      id: 'emerald-sage',
      name: 'Emerald Botanical',
      description: 'Earthy organic dark emerald for sustainability, wellness, and boutique studios.',
      previewGradient: 'from-emerald-950 via-teal-950 to-zinc-900',
      bgFront: 'bg-gradient-to-br from-emerald-950 via-zinc-950 to-teal-950',
      bgBack: 'bg-gradient-to-br from-zinc-950 via-emerald-950 to-zinc-950',
      textPrimary: 'text-emerald-300 font-semibold',
      textSecondary: 'text-emerald-400/60',
      accent: 'border-emerald-500/40 text-emerald-400',
      border: 'border-emerald-500/30'
    },
    {
      id: 'champagne-silk',
      name: 'Champagne Rose Silk',
      description: 'Glamorous rose gold and warm velvet cream for luxury beauty, fashion & salons.',
      previewGradient: 'from-rose-950 via-stone-900 to-amber-950',
      bgFront: 'bg-gradient-to-br from-rose-950 via-stone-950 to-amber-950/60',
      bgBack: 'bg-gradient-to-br from-stone-950 via-rose-950/80 to-stone-950',
      textPrimary: 'text-rose-200 font-bold',
      textSecondary: 'text-amber-100/70',
      accent: 'border-rose-400/40 text-rose-300',
      border: 'border-rose-400/30'
    },
    {
      id: 'sunset-velvet',
      name: 'Sunset Velvet Ruby',
      description: 'Warm creative agency aesthetic with rose-gold gradients and subtle glows.',
      previewGradient: 'from-rose-950 via-orange-950 to-slate-950',
      bgFront: 'bg-gradient-to-br from-rose-950 via-slate-950 to-amber-950',
      bgBack: 'bg-gradient-to-br from-slate-950 via-rose-950 to-slate-950',
      textPrimary: 'text-rose-200 font-bold',
      textSecondary: 'text-rose-300/70',
      accent: 'border-rose-500/40 text-rose-400',
      border: 'border-rose-500/30'
    },
    {
      id: 'swiss-minimalist',
      name: 'Zurich Swiss Monochrome',
      description: 'Hyper-structured Swiss grid layout with stark black & white contrast.',
      previewGradient: 'from-zinc-900 via-black to-zinc-900',
      bgFront: 'bg-black',
      bgBack: 'bg-zinc-950',
      textPrimary: 'text-white font-mono font-bold tracking-tight',
      textSecondary: 'text-zinc-400 font-mono',
      accent: 'border-white text-white',
      border: 'border-zinc-700 shadow-2xl'
    }
  ];

  const currentTemplate = templates.find(t => t.id === selectedTemplate) || templates[0];
  const isLight = selectedTemplate === 'minimal-white';
  const isCustomArtwork = selectedTemplate === 'custom-canva' || canvaArtworkConfig.isCustomArtworkActive;

  /**
   * Captures a DOM element to a PNG data URL safe against modern CSS color parse errors
   */
  const captureToPng = async (el: HTMLElement): Promise<string> => {
    const sanitizeColorString = (val: string): string => {
      if (!val || (!val.includes('lab(') && !val.includes('oklch('))) return val;
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        if (!ctx) return val;
        return val.replace(/(?:lab|oklch)\([^)]+\)/g, (match) => {
          try {
            ctx.clearRect(0, 0, 1, 1);
            ctx.fillStyle = match;
            ctx.fillRect(0, 0, 1, 1);
            const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
            return `rgba(${r}, ${g}, ${b}, ${(a / 255).toFixed(2)})`;
          } catch {
            return match;
          }
        });
      } catch {
        return val;
      }
    };

    const allEls = [el, ...Array.from(el.querySelectorAll('*'))] as HTMLElement[];
    const COLOR_PROPS: (keyof CSSStyleDeclaration)[] = [
      'color', 'backgroundColor', 'borderColor', 'borderTopColor',
      'borderRightColor', 'borderBottomColor', 'borderLeftColor',
      'outlineColor', 'textDecorationColor', 'fill', 'stroke'
    ];
    const saved: Array<{ el: HTMLElement; prop: keyof CSSStyleDeclaration; prev: string }> = [];
    allEls.forEach(node => {
      const cs = window.getComputedStyle(node);
      COLOR_PROPS.forEach(prop => {
        const resolved = cs[prop] as string;
        if (resolved && resolved !== '') {
          saved.push({ el: node, prop, prev: (node.style as any)[prop] ?? '' });
          (node.style as any)[prop] = sanitizeColorString(resolved);
        }
      });
      const bgImg = cs.backgroundImage;
      if (bgImg && bgImg !== 'none') {
        saved.push({ el: node, prop: 'backgroundImage', prev: node.style.backgroundImage });
        node.style.backgroundImage = sanitizeColorString(bgImg);
      }
    });
    try {
      return await toPng(el, { pixelRatio: 2, cacheBust: true, skipFonts: true });
    } finally {
      saved.forEach(({ el: node, prop, prev }) => {
        (node.style as any)[prop] = prev;
      });
    }
  };

  const handlePreview = async () => {
    setIsExporting(true);
    try {
      const frontRef = frontCardExportRef.current;
      const backRef = backCardExportRef.current;
      if (!frontRef || !backRef) throw new Error('Card export references not ready');

      const frontDataUrl = await captureToPng(frontRef);
      const backDataUrl = await captureToPng(backRef);

      const isHorizontal = cardData.orientation !== 'vertical';
      const width = isHorizontal ? 252 : 144;
      const height = isHorizontal ? 144 : 252;

      const doc = new jsPDF({
        orientation: isHorizontal ? 'landscape' : 'portrait',
        unit: 'pt',
        format: [width, height]
      });

      doc.addImage(frontDataUrl, 'PNG', 0, 0, width, height);
      doc.addPage([width, height], isHorizontal ? 'landscape' : 'portrait');
      doc.addImage(backDataUrl, 'PNG', 0, 0, width, height);

      const filename = `oneclickbiz-visiting-card-${(cardData.slug || 'card').toLowerCase()}.pdf`;
      const blob = doc.output('blob');
      const blobUrl = URL.createObjectURL(blob);
      setPdfPreviewModal({ isOpen: true, url: blobUrl, filename });
    } catch (err) {
      console.error('Visiting card preview error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExport = async (type: 'pdf' | 'png-front' | 'png-back') => {
    setIsExporting(true);
    try {
      if (type === 'png-front' || type === 'png-back') {
        const ref = type === 'png-front' ? frontCardExportRef.current : backCardExportRef.current;
        if (!ref) throw new Error('Card export ref not initialized');
        const dataUrl = await captureToPng(ref);
        const filename = `oneclickbiz-visiting-card-${type === 'png-front' ? 'front' : 'back'}-${(cardData.slug || 'card').toLowerCase()}.png`;
        const blobUrl = downloadDataUrl(dataUrl, filename);
        setLastExportedFile({ url: blobUrl || dataUrl, filename, fileType: 'PNG' });
      } else if (type === 'pdf') {
        const frontRef = frontCardExportRef.current;
        const backRef = backCardExportRef.current;
        if (!frontRef || !backRef) throw new Error('Card export references not ready');

        const frontDataUrl = await captureToPng(frontRef);
        const backDataUrl = await captureToPng(backRef);

        const isHorizontal = cardData.orientation !== 'vertical';
        const width = isHorizontal ? 252 : 144;
        const height = isHorizontal ? 144 : 252;

        const doc = new jsPDF({
          orientation: isHorizontal ? 'landscape' : 'portrait',
          unit: 'pt',
          format: [width, height]
        });

        doc.addImage(frontDataUrl, 'PNG', 0, 0, width, height);
        doc.addPage([width, height], isHorizontal ? 'landscape' : 'portrait');
        doc.addImage(backDataUrl, 'PNG', 0, 0, width, height);

        const filename = `oneclickbiz-visiting-card-${(cardData.slug || 'card').toLowerCase()}.pdf`;
        const res = savePDF(doc, filename);
        if (res && res.blobUrl) {
          setLastExportedFile({ url: res.blobUrl, filename: res.filename, fileType: 'PDF' });
          setPdfPreviewModal({ isOpen: true, url: res.blobUrl, filename: res.filename });
        } else {
          throw new Error('PDF generation returned no file');
        }
      }

      setExportSuccess(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => setExportSuccess(false), 7000);
    } catch (err) {
      console.error('Visiting card export error:', err);
      alert(`Download failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsExporting(false);
    }
  };

  // Helper to render the logo badge / custom image
  const renderLogoElement = (isBack: boolean = false) => {
    if (!cardData.showLogo) return null;

    const sizeClasses = {
      small: 'w-7 h-7',
      medium: 'w-9 h-9 sm:w-10 sm:h-10',
      large: 'w-12 h-12 sm:w-14 sm:h-14'
    }[cardData.logoSize];

    const shapeClasses = {
      square: 'rounded-none',
      rounded: 'rounded-xl',
      circle: 'rounded-full',
      transparent: 'rounded-none bg-transparent shadow-none border-0'
    }[cardData.logoShape];

    if (cardData.logoUrl) {
      return (
        <div 
          onClick={() => {
            setActiveTab('logo');
            logoFileInputRef.current?.click();
          }}
          title="Click to change logo"
          className={`
            ${sizeClasses} ${shapeClasses} relative overflow-hidden flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 group border
            ${cardData.logoShape === 'transparent' ? 'border-transparent' : (isLight ? 'border-slate-300 bg-white shadow-md' : 'border-white/20 bg-slate-900/80 shadow-lg')}
          `}
        >
          <img 
            src={cardData.logoUrl} 
            alt="Business Logo" 
            className="w-full h-full object-contain p-1"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <Upload className="w-3 h-3 text-white" />
          </div>
        </div>
      );
    }

    const preset = PRESET_LOGOS.find(p => p.id === customLogoPreset) || PRESET_LOGOS[0];
    const IconComp = preset.icon;

    return (
      <div 
        onClick={() => setActiveTab('logo')}
        title="Click to customize brand logo"
        className={`
          ${sizeClasses} ${shapeClasses} flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 shadow-md border
          ${isLight ? 'bg-slate-900 text-white border-slate-700' : `bg-gradient-to-tr ${preset.bg} ${preset.color} border-white/20`}
        `}
      >
        <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
    );
  };

  // Helper for QR Overlay Position in custom artwork mode
  const getQrPositionClasses = () => {
    switch (canvaArtworkConfig.qrPosition) {
      case 'center':
        return 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20';
      case 'top-right':
        return 'absolute top-4 right-4 z-20';
      case 'bottom-left':
        return 'absolute bottom-4 left-4 z-20';
      case 'none':
        return 'hidden';
      case 'bottom-right':
      default:
        return 'absolute bottom-4 right-4 z-20';
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Hidden File Input for Logo */}
      <input 
        ref={logoFileInputRef}
        type="file" 
        accept="image/png, image/jpeg, image/svg+xml, image/webp" 
        onChange={handleLogoUpload}
        className="hidden" 
      />

      {/* Canva / Adobe Studio Modal */}
      <CanvaAdobeStudioModal
        isOpen={isCanvaModalOpen}
        onClose={() => setIsCanvaModalOpen(false)}
        config={canvaArtworkConfig}
        onUpdateConfig={handleUpdateArtworkConfig}
        cardSlug={cardData.slug}
        companyName={cardData.companyName}
      />

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900 border border-indigo-500/20 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Smart Business Card Studio
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Design &amp; Print Smart Visiting Cards
          </h1>
          <p className="text-xs text-slate-400">
            Import custom Canva/Adobe Express artwork or customize luxury 300 DPI vector templates with dynamic QR codes.
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          
          {/* Canva & Adobe Express Launcher Button */}
          <button
            onClick={() => setIsCanvaModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:opacity-90 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Canva &amp; Adobe Import</span>
          </button>

          <button
            onClick={() => handleExport('pdf')}
            disabled={isExporting}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            {isExporting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            <span>{isExporting ? 'Generating...' : 'Download Print PDF (300 DPI)'}</span>
          </button>

          <button
            onClick={handlePreview}
            disabled={isExporting}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-emerald-400 flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview PDF</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive 3D Card Preview & Controls */}
        <div className="lg:col-span-7 flex flex-col items-center space-y-6">
          
          {/* Card Side Toggle & Flip Bar */}
          <div className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveSide('front')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeSide === 'front'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Front View
              </button>
              <button
                onClick={() => setActiveSide('back')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeSide === 'back'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Back View (Dynamic QR)
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCanvaModalOpen(true)}
                className="px-2.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 border border-cyan-500/30 transition-all"
              >
                <Palette className="w-3.5 h-3.5 text-cyan-400" />
                <span>Canva Artwork</span>
              </button>

              <button
                onClick={() => setActiveSide(prev => prev === 'front' ? 'back' : 'front')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-xs font-medium text-indigo-300 hover:text-white flex items-center gap-1.5 border border-slate-700 transition-all active:scale-95"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Flip Card</span>
              </button>
            </div>
          </div>

          {/* Realistic Visiting Card Preview Frame */}
          <div className="w-full p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 flex flex-col items-center justify-center relative min-h-[380px] shadow-2xl overflow-hidden">
            
            {/* Ambient Shadow Glow */}
            <div className={`absolute w-72 h-44 blur-3xl opacity-20 pointer-events-none rounded-full ${
              selectedTemplate === 'matte-onyx' || selectedTemplate === 'obsidian-gold' ? 'bg-amber-500' :
              selectedTemplate === 'indigo-cyber' || selectedTemplate === 'frosted-glass' ? 'bg-indigo-500' :
              selectedTemplate === 'royal-navy' ? 'bg-sky-500' :
              selectedTemplate === 'emerald-sage' || selectedTemplate === 'monaco-emerald' ? 'bg-emerald-500' :
              selectedTemplate === 'tokyo-neon' ? 'bg-fuchsia-500' :
              selectedTemplate === 'champagne-silk' || selectedTemplate === 'sunset-velvet' ? 'bg-rose-500' : 'bg-slate-400'
            }`} />

            {/* CARD CANVAS (3.5in x 2in Proportion: 560px x 320px) */}
            <div 
              className={`
                w-full max-w-[480px] sm:max-w-[520px] aspect-[1.75/1] rounded-2xl relative transition-all duration-500 transform hover:scale-[1.02] shadow-2xl overflow-hidden flex flex-col justify-between select-none
                ${isCustomArtwork ? 'bg-slate-950 border border-slate-700' : (activeSide === 'front' ? currentTemplate.bgFront : currentTemplate.bgBack)}
                ${!isCustomArtwork ? currentTemplate.border : ''}
              `}
            >
              
              {/* Finish Overlay Accents (Metallic / Glossy effect) */}
              {cardData.finish === 'matte-black' && (
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/5 pointer-events-none z-10" />
              )}
              {cardData.finish === 'gold-foil' && (
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-amber-400/15 via-yellow-200/10 to-transparent rounded-full blur-xl pointer-events-none z-10" />
              )}

              {/* ===================== MODE 1: CUSTOM CANVA / ADOBE ARTWORK ===================== */}
              {isCustomArtwork && (
                <div className="w-full h-full relative">
                  {/* Front Side Custom Artwork */}
                  {activeSide === 'front' && (
                    <div className="w-full h-full relative">
                      {canvaArtworkConfig.frontArtworkUrl ? (
                        <img 
                          src={canvaArtworkConfig.frontArtworkUrl} 
                          alt="Custom Front Artwork"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div 
                          onClick={() => setIsCanvaModalOpen(true)}
                          className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer bg-gradient-to-br from-slate-900 to-indigo-950/60 hover:bg-slate-900/90 transition-colors"
                        >
                          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-2">
                            <Upload className="w-6 h-6" />
                          </div>
                          <h4 className="text-sm font-bold text-white">Upload Front Card Artwork</h4>
                          <p className="text-xs text-slate-400 mt-1">Click to upload your 1050x600px Canva design</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Back Side Custom Artwork */}
                  {activeSide === 'back' && (
                    <div className="w-full h-full relative">
                      {canvaArtworkConfig.backArtworkUrl ? (
                        <img 
                          src={canvaArtworkConfig.backArtworkUrl} 
                          alt="Custom Back Artwork"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div 
                          onClick={() => setIsCanvaModalOpen(true)}
                          className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer bg-gradient-to-br from-slate-900 to-purple-950/60 hover:bg-slate-900/90 transition-colors"
                        >
                          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-2">
                            <Upload className="w-6 h-6" />
                          </div>
                          <h4 className="text-sm font-bold text-white">Upload Back Card Artwork</h4>
                          <p className="text-xs text-slate-400 mt-1">Click to upload your 1050x600px Canva back design</p>
                        </div>
                      )}

                      {/* Smart Dynamic QR Code Overlay on Back */}
                      {canvaArtworkConfig.qrPosition !== 'none' && (
                        <div className={getQrPositionClasses()}>
                          <div className={`p-1.5 rounded-xl bg-white shadow-2xl border border-slate-200 ${
                            canvaArtworkConfig.qrSize === 'small' ? 'w-16 h-16' :
                            canvaArtworkConfig.qrSize === 'large' ? 'w-24 h-24' : 'w-20 h-20'
                          }`}>
                            <img 
                              src={qrCodeDataUrl || `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(typeof window !== 'undefined' ? `${window.location.origin}/v/${cardData.slug}` : `https://oneclickbiz.in/v/${cardData.slug}`)}&color=0f172a`} 
                              alt="Card QR"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      )}

                      {/* QR Badge Overlay */}
                      {canvaArtworkConfig.showNfcBadge && (
                        <div className="absolute top-3 right-3 z-20 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 flex items-center gap-1.5 text-amber-300">
                          <QrCode className="w-3.5 h-3.5" />
                          <span className="text-[9px] font-mono font-bold tracking-wider uppercase">QR</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ===================== MODE 2: BUILT-IN TEMPLATES ===================== */}
              {!isCustomArtwork && (
                <div className="w-full h-full p-6 sm:p-7 flex flex-col justify-between relative z-10">
                  
                  {/* FRONT SIDE */}
                  {activeSide === 'front' && (
                    <div className="h-full flex flex-col justify-between">
                      {/* Top Header: Business Logo + Company Brand */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          {renderLogoElement(false)}
                          <div>
                            <h4 className={`text-sm sm:text-base font-extrabold tracking-tight ${isLight ? 'text-slate-950' : 'text-white'}`}>
                              {cardData.companyName}
                            </h4>
                            <p className={`text-[10px] uppercase tracking-widest ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                              {cardData.tagline}
                            </p>
                          </div>
                        </div>

                        {cardData.showNfcIcon && (
                          <div className="flex items-center space-x-1 opacity-75">
                            <QrCode className={`w-3.5 h-3.5 ${isLight ? 'text-slate-600' : 'text-amber-400'}`} />
                            <span className={`text-[9px] font-mono uppercase tracking-wider font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                              Smart QR
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Middle Identity */}
                      <div className="my-auto space-y-1">
                        <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${
                          isLight ? 'text-slate-950' : currentTemplate.textPrimary
                        }`}>
                          {cardData.fullName}
                        </h2>
                        <p className={`text-xs font-semibold uppercase tracking-wider ${
                          isLight ? 'text-indigo-600' : 'text-slate-300'
                        }`}>
                          {cardData.designation}
                        </p>
                      </div>

                      {/* Bottom Footer Info */}
                      <div className="flex items-center justify-between border-t pt-2.5 border-white/10 text-[10px] gap-2 overflow-hidden">
                        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1 overflow-hidden">
                          <span className={`whitespace-nowrap font-medium shrink-0 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                            {cardData.phone}
                          </span>
                          {cardData.email && (
                            <>
                              <span className="opacity-40 shrink-0">•</span>
                              <span className={`truncate ${isLight ? 'text-slate-700 font-medium' : 'text-slate-300 font-medium'}`}>
                                {cardData.email}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* BACK SIDE */}
                  {activeSide === 'back' && (
                    <div className="h-full flex flex-col justify-between">
                      {/* Top Bar */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <div className="flex items-center gap-2">
                          {cardData.showLogo && (
                            <div className="w-5 h-5 rounded-md overflow-hidden flex items-center justify-center">
                              {cardData.logoUrl ? (
                                <img src={cardData.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                              ) : (
                                <div className="w-full h-full bg-amber-500 rounded flex items-center justify-center text-[9px] font-black text-slate-950">
                                  {cardData.companyName.charAt(0)}
                                </div>
                              )}
                            </div>
                          )}
                          <span className={`text-[10px] font-bold uppercase tracking-widest ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                            {cardData.companyName}
                          </span>
                        </div>
                        <span className={`text-[10px] font-mono ${isLight ? 'text-indigo-600 font-bold' : 'text-amber-400'}`}>
                          cards.oneclickbiz.in/v/{cardData.slug}
                        </span>
                      </div>

                      {/* Center Content: QR Code + Full Contact Info */}
                      <div className="grid grid-cols-12 gap-3 items-center my-auto">
                        <div className="col-span-5 flex flex-col items-center">
                          <div className="p-2 rounded-xl bg-white shadow-xl">
                            <img 
                              src={qrCodeDataUrl || `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(typeof window !== 'undefined' ? `${window.location.origin}/v/${cardData.slug}` : `https://oneclickbiz.in/v/${cardData.slug}`)}&color=0f172a`} 
                              alt="Card QR"
                              className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                            />
                          </div>
                          <p className={`text-[8px] uppercase tracking-wider font-bold mt-1.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                            Scan with Camera
                          </p>
                        </div>

                        <div className="col-span-7 space-y-2 text-[10px]">
                          <div className="flex items-center gap-2">
                            <Phone className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-indigo-600' : 'text-amber-400'}`} />
                            <span className={`truncate ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{cardData.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-indigo-600' : 'text-amber-400'}`} />
                            <span className={`truncate ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{cardData.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-indigo-600' : 'text-amber-400'}`} />
                            <span className={`truncate ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{cardData.website}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-indigo-600' : 'text-amber-400'}`} />
                            <span className={`truncate ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{cardData.address}</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Footer */}
                      <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[9px]">
                        <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>
                          Scan QR code with smartphone camera for instant contact save
                        </span>
                        <span className={`font-bold uppercase ${isLight ? 'text-slate-950' : 'text-white'}`}>
                          Scan to Connect
                        </span>
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>

            {/* Scale & Dimensions indicator */}
            <div className="flex items-center gap-3 mt-4 text-[11px] text-slate-500 font-mono">
              <span>Standard ISO Size: 3.5&quot; × 2.0&quot; (89mm × 51mm)</span>
              <span>•</span>
              <span className="text-indigo-400 font-semibold">300 DPI Print Ready</span>
            </div>

          </div>

          {/* Quick Download Buttons */}
          <div className="w-full flex items-center justify-center gap-3">
            <button
              onClick={() => handleExport('png-front')}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Front PNG</span>
            </button>
            <button
              onClick={() => handleExport('png-back')}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Back PNG</span>
            </button>
          </div>

        </div>

        {/* Right Column: Customization Tabs */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          
          {/* Customization Navigation Tabs */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 overflow-x-auto gap-2">
            <button
              onClick={() => setActiveTab('template')}
              className={`text-xs font-bold pb-2 transition-all border-b-2 flex items-center gap-1.5 shrink-0 ${
                activeTab === 'template'
                  ? 'text-indigo-400 border-indigo-500'
                  : 'text-slate-400 border-transparent hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5" /> Templates
            </button>

            <button
              onClick={() => setIsCanvaModalOpen(true)}
              className="text-xs font-bold pb-2 transition-all border-b-2 border-transparent text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Canva / Adobe
            </button>

            <button
              onClick={() => setActiveTab('logo')}
              className={`text-xs font-bold pb-2 transition-all border-b-2 flex items-center gap-1.5 shrink-0 ${
                activeTab === 'logo'
                  ? 'text-amber-400 border-amber-500'
                  : 'text-slate-400 border-transparent hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" /> Logo
            </button>

            <button
              onClick={() => setActiveTab('details')}
              className={`text-xs font-bold pb-2 transition-all border-b-2 flex items-center gap-1.5 shrink-0 ${
                activeTab === 'details'
                  ? 'text-indigo-400 border-indigo-500'
                  : 'text-slate-400 border-transparent hover:text-white'
              }`}
            >
              <Type className="w-3.5 h-3.5" /> Info
            </button>

            <button
              onClick={() => setActiveTab('finish')}
              className={`text-xs font-bold pb-2 transition-all border-b-2 flex items-center gap-1.5 shrink-0 ${
                activeTab === 'finish'
                  ? 'text-indigo-400 border-indigo-500'
                  : 'text-slate-400 border-transparent hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Finish
            </button>

            <button
              onClick={() => setActiveTab('qr')}
              className={`text-xs font-bold pb-2 transition-all border-b-2 flex items-center gap-1.5 shrink-0 ${
                activeTab === 'qr'
                  ? 'text-indigo-400 border-indigo-500'
                  : 'text-slate-400 border-transparent hover:text-white'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" /> Dynamic QR
            </button>
          </div>

          {/* TAB 1: TEMPLATE SELECTOR */}
          {activeTab === 'template' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">Choose a Luxury Print Template</h3>
                <p className="text-xs text-slate-400">Select a layout designed specifically for modern founders, creative studios, and executives.</p>
              </div>

              {/* CANVA BANNER CARD */}
              <div 
                onClick={() => setIsCanvaModalOpen(true)}
                className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-purple-950/40 to-slate-900 border border-cyan-500/40 hover:border-cyan-400 cursor-pointer transition-all shadow-lg flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                    <Palette className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-2">
                      <span>Import Canva / Adobe Artwork</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">100% Custom</span>
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Upload front &amp; back images with dynamic QR overlay</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 max-h-[460px] overflow-y-auto pr-1">
                {templates.map(tmpl => (
                  <div
                    key={tmpl.id}
                    onClick={() => {
                      if (tmpl.id === 'custom-canva') {
                        setIsCanvaModalOpen(true);
                      } else {
                        setSelectedTemplate(tmpl.id);
                        if (canvaArtworkConfig.isCustomArtworkActive) {
                          handleUpdateArtworkConfig({ isCustomArtworkActive: false });
                        }
                      }
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 relative space-y-2 ${
                      selectedTemplate === tmpl.id
                        ? 'bg-indigo-950/40 border-indigo-500 ring-2 ring-indigo-500/30 shadow-lg'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-full h-14 rounded-xl bg-gradient-to-r ${tmpl.previewGradient} shadow-inner border border-white/10 flex items-center justify-center`}>
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider drop-shadow text-center px-2">
                        {tmpl.name}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white">{tmpl.name}</h4>
                        {selectedTemplate === tmpl.id && (
                          <Check className="w-3.5 h-3.5 text-indigo-400" />
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5">{tmpl.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: BRAND LOGO MANAGEMENT */}
          {activeTab === 'logo' && (
            <div className="space-y-5">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-amber-400" /> Business Logo Management
                  </h3>
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] text-slate-400">Show Logo</label>
                    <button
                      onClick={() => setCardData(prev => ({ ...prev, showLogo: !prev.showLogo }))}
                      className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
                        cardData.showLogo ? 'bg-amber-500' : 'bg-slate-800'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        cardData.showLogo ? 'translate-x-4' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-400">Upload your official high-resolution logo or choose a luxury monogram emblem.</p>
              </div>

              {/* Upload Dropzone Box */}
              <div className="p-5 rounded-2xl bg-slate-950 border-2 border-dashed border-slate-700 hover:border-amber-500/50 transition-all flex flex-col items-center justify-center text-center space-y-3">
                {cardData.logoUrl ? (
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 p-2 flex items-center justify-center shrink-0">
                      <img src={cardData.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 text-left space-y-1">
                      <p className="text-xs font-bold text-white">Custom Business Logo Uploaded</p>
                      <p className="text-[10px] text-slate-400">Ready for front &amp; back card integration.</p>
                      <button
                        onClick={() => logoFileInputRef.current?.click()}
                        className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold"
                      >
                        Replace Image
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Upload Your Business Logo</p>
                      <p className="text-[10px] text-slate-400">PNG, SVG, JPG or WebP (Transparent recommended)</p>
                    </div>
                    <button
                      onClick={() => logoFileInputRef.current?.click()}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md transition-all active:scale-95"
                    >
                      Browse Image
                    </button>
                  </>
                )}
              </div>

              {/* Logo Presets */}
              <div className="space-y-2 pt-2">
                <label className="text-[11px] font-semibold text-slate-300">Or Select a Luxury Monogram Emblem</label>
                <div className="grid grid-cols-3 gap-2">
                  {PRESET_LOGOS.map(p => {
                    const IconC = p.icon;
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          setCustomLogoPreset(p.id);
                          setCardData(prev => ({ ...prev, logoUrl: '', showLogo: true }));
                        }}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                          !cardData.logoUrl && customLogoPreset === p.id
                            ? 'bg-amber-500/10 border-amber-500/50 text-amber-300'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${p.bg} ${p.color} flex items-center justify-center shrink-0`}>
                          <IconC className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-semibold truncate">{p.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Logo Options */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Logo Shape</label>
                  <select
                    value={cardData.logoShape}
                    onChange={e => setCardData(prev => ({ ...prev, logoShape: e.target.value as LogoShape }))}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  >
                    <option value="rounded">Rounded Box</option>
                    <option value="circle">Circular Emblem</option>
                    <option value="transparent">Transparent / Direct</option>
                    <option value="square">Square</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Display Size</label>
                  <select
                    value={cardData.logoSize}
                    onChange={e => setCardData(prev => ({ ...prev, logoSize: e.target.value as LogoSize }))}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  >
                    <option value="small">Compact (Small)</option>
                    <option value="medium">Standard (Medium)</option>
                    <option value="large">Prominent (Large)</option>
                  </select>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: CARD DETAILS */}
          {activeTab === 'details' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">Card Typography &amp; Details</h3>
                <p className="text-xs text-slate-400">Personalize your name, designation, company, and contact channels.</p>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">Full Name</label>
                    <input
                      type="text"
                      value={cardData.fullName}
                      onChange={e => setCardData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">Designation / Title</label>
                    <input
                      type="text"
                      value={cardData.designation}
                      onChange={e => setCardData(prev => ({ ...prev, designation: e.target.value }))}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">Company / Brand Name</label>
                    <input
                      type="text"
                      value={cardData.companyName}
                      onChange={e => setCardData(prev => ({ ...prev, companyName: e.target.value }))}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">Brand Tagline</label>
                    <input
                      type="text"
                      value={cardData.tagline}
                      onChange={e => setCardData(prev => ({ ...prev, tagline: e.target.value }))}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">Phone Number</label>
                    <input
                      type="text"
                      value={cardData.phone}
                      onChange={e => setCardData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">Email Address</label>
                    <input
                      type="email"
                      value={cardData.email}
                      onChange={e => setCardData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">Website</label>
                    <input
                      type="text"
                      value={cardData.website}
                      onChange={e => setCardData(prev => ({ ...prev, website: e.target.value }))}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">Location / City</label>
                    <input
                      type="text"
                      value={cardData.address}
                      onChange={e => setCardData(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FINISH & TEXTURE */}
          {activeTab === 'finish' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">Physical Card Finish &amp; Materials</h3>
                <p className="text-xs text-slate-400">Choose luxury print coatings applied during production.</p>
              </div>

              <div className="space-y-3 pt-2">
                {[
                  { id: 'matte-black', name: 'Laser-Engraved Matte Black', desc: 'Soft-touch velvet finish with high scratch resistance.' },
                  { id: 'gold-foil', name: 'Metallic Gold Foil Stamp', desc: 'Reflective gold metallic foil stamped on text & logo.' },
                  { id: 'glossy-uv', name: 'Spot Gloss UV Texture', desc: 'Elevated glossy UV coating over typography for tactile feel.' },
                  { id: 'frosted-acrylic', name: 'Frosted Translucent Acrylic', desc: 'Semi-transparent frosted PVC card with waterproof finish.' },
                  { id: 'carbon-fiber', name: 'Carbon Fiber Weave Texture', desc: 'Ultra-modern textured weave for automotive & tech executives.' }
                ].map(f => (
                  <div
                    key={f.id}
                    onClick={() => setCardData(prev => ({ ...prev, finish: f.id as CardFinish }))}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      cardData.finish === f.id
                        ? 'bg-indigo-950/40 border-indigo-500'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white">{f.name}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{f.desc}</p>
                    </div>
                    {cardData.finish === f.id && (
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: QR & PROFILE CONTROLS */}
          {activeTab === 'qr' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">Dynamic QR Code Configuration</h3>
                <p className="text-xs text-slate-400">Configure how clients connect when scanning your card.</p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Dynamic Target Profile URL</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Auto-Tracked</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="px-3 py-2 bg-slate-900 border border-r-0 border-slate-700 rounded-l-xl text-xs text-slate-400 font-mono">
                      /v/
                    </span>
                    <input
                      type="text"
                      value={cardData.slug}
                      onChange={e => setCardData(prev => ({ ...prev, slug: e.target.value }))}
                      className="w-full px-3 py-2 rounded-r-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400">
                    QR code instantly downloads your contact card (.VCF) and opens your WhatsApp storefront.
                  </p>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <div>
                    <h4 className="text-xs font-bold text-white">Show Smart QR Badge</h4>
                    <p className="text-[10px] text-slate-400">Displays digital badge on front of card</p>
                  </div>
                  <button
                    onClick={() => setCardData(prev => ({ ...prev, showNfcIcon: !prev.showNfcIcon }))}
                    className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                      cardData.showNfcIcon ? 'bg-indigo-600' : 'bg-slate-800'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      cardData.showNfcIcon ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* PDF PREVIEW & VIEWER MODAL */}
      {pdfPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="w-full max-w-5xl h-[88vh] bg-slate-900 border border-slate-700 rounded-3xl flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Visiting Card PDF Preview</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold">300 DPI Print Ready (Front &amp; Back)</span>
                  </h3>
                  <p className="text-xs text-slate-400">{pdfPreviewModal.filename}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={pdfPreviewModal.url}
                  download={pdfPreviewModal.filename}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow active:scale-95 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download / Save File</span>
                </a>
                <button
                  onClick={() => setPdfPreviewModal(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PDF Object/Iframe Viewer */}
            <div className="flex-1 bg-slate-950 p-2 overflow-hidden flex flex-col">
              <object
                data={pdfPreviewModal.url}
                type="application/pdf"
                className="w-full h-full rounded-2xl border-0 bg-white"
              >
                <iframe
                  src={pdfPreviewModal.url}
                  className="w-full h-full rounded-2xl border-0 bg-white"
                  title="Visiting Card PDF Preview"
                >
                  <div className="flex flex-col items-center justify-center h-full text-slate-400 p-6 text-center">
                    <p className="mb-4">Inline PDF display not supported on this browser window.</p>
                    <a
                      href={pdfPreviewModal.url}
                      download={pdfPreviewModal.filename}
                      className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold"
                    >
                      Download PDF to View
                    </a>
                  </div>
                </iframe>
              </object>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING SUCCESS & QUICK OPEN TOAST BAR */}
      {exportSuccess && lastExportedFile && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-900/95 border border-emerald-500/50 shadow-2xl backdrop-blur-md text-white">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Visiting Card {lastExportedFile.fileType} Ready!</p>
              <p className="text-[11px] text-slate-300">File: <span className="text-emerald-400 font-mono font-medium">{lastExportedFile.filename}</span></p>
            </div>
            <a
              href={lastExportedFile.url}
              download={lastExportedFile.filename}
              className="ml-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-xs font-extrabold shadow-lg active:scale-95 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>Save to Downloads</span>
            </a>
            {lastExportedFile.fileType === 'PDF' && (
              <button
                onClick={() => setPdfPreviewModal({ isOpen: true, url: lastExportedFile.url, filename: lastExportedFile.filename })}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition border border-slate-700 active:scale-95 flex items-center gap-1.5 whitespace-nowrap"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Open Preview</span>
              </button>
            )}
            <button
              onClick={() => setExportSuccess(false)}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* DEDICATED OFF-SCREEN HIGH-RESOLUTION EXPORT STAGE FOR HTML2CANVAS & PDF */}
      <div 
        style={{ 
          position: 'fixed', 
          left: '-9999px', 
          top: 0, 
          width: '1200px',
          pointerEvents: 'none', 
          zIndex: -9999,
          opacity: 1
        }}
      >
        {/* FRONT CARD EXPORT STAGE */}
        <div
          ref={frontCardExportRef}
          style={{ 
            width: cardData.orientation === 'vertical' ? '600px' : '1050px', 
            height: cardData.orientation === 'vertical' ? '1050px' : '600px' 
          }}
          className={`rounded-none p-12 relative overflow-hidden flex flex-col justify-between select-none shadow-none ${isCustomArtwork ? 'bg-slate-950 p-0' : `${currentTemplate.bgFront} ${currentTemplate.border}`}`}
        >
          {isCustomArtwork && canvaArtworkConfig.frontArtworkUrl ? (
            <img 
              src={canvaArtworkConfig.frontArtworkUrl} 
              alt="Front Graphic" 
              className="w-full h-full object-cover" 
            />
          ) : (
            <>
              {/* Finish overlays */}
              {cardData.finish === 'matte-black' && (
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/5 pointer-events-none" />
              )}
              {cardData.finish === 'gold-foil' && (
                <div className="absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br from-amber-400/20 via-yellow-200/10 to-transparent rounded-full blur-2xl pointer-events-none" />
              )}

              {/* Top Header */}
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center space-x-5">
                  {cardData.showLogo && (
                    <div className={`w-20 h-20 rounded-2xl overflow-hidden flex items-center justify-center border shadow-xl ${
                      cardData.logoShape === 'transparent' ? 'border-transparent' : (isLight ? 'border-slate-300 bg-white' : 'border-white/20 bg-slate-900/80')
                    }`}>
                      {cardData.logoUrl ? (
                        <img src={cardData.logoUrl} alt="Logo" className="w-full h-full object-contain p-2" />
                      ) : (() => {
                        const preset = PRESET_LOGOS.find(p => p.id === customLogoPreset) || PRESET_LOGOS[0];
                        const IconComp = preset.icon;
                        return (
                          <div className={`w-full h-full ${isLight ? 'bg-slate-900 text-white' : `bg-gradient-to-tr ${preset.bg} ${preset.color}`} flex items-center justify-center`}>
                            <IconComp className="w-10 h-10" />
                          </div>
                        );
                      })()}
                    </div>
                  )}
                  <div>
                    <h4 className={`text-2xl font-extrabold tracking-tight ${isLight ? 'text-slate-950' : 'text-white'}`}>
                      {cardData.companyName}
                    </h4>
                    <p className={`text-sm uppercase tracking-widest ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      {cardData.tagline}
                    </p>
                  </div>
                </div>

                {cardData.showNfcIcon && (
                  <div className="flex items-center space-x-2 opacity-85">
                    <QrCode className={`w-6 h-6 ${isLight ? 'text-slate-600' : 'text-amber-400'}`} />
                    <span className={`text-sm font-mono uppercase tracking-wider font-bold ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      Smart QR
                    </span>
                  </div>
                )}
              </div>

              {/* Center Identity */}
              <div className="my-auto space-y-2 relative z-10">
                <h2 className={`text-4xl font-black tracking-tight ${isLight ? 'text-slate-950' : currentTemplate.textPrimary}`}>
                  {cardData.fullName}
                </h2>
                <p className={`text-lg font-semibold uppercase tracking-wider ${isLight ? 'text-indigo-600' : 'text-slate-300'}`}>
                  {cardData.designation}
                </p>
              </div>

              {/* Bottom Footer */}
              <div className="flex items-center justify-between border-t pt-5 border-white/10 text-base relative z-10 gap-4 overflow-hidden">
                <div className="flex items-center gap-4 min-w-0 flex-1 overflow-hidden">
                  <span className={`whitespace-nowrap font-medium shrink-0 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>{cardData.phone}</span>
                  {cardData.email && (
                    <>
                      <span className="opacity-40 shrink-0">•</span>
                      <span className={`truncate ${isLight ? 'text-slate-700 font-medium' : 'text-slate-300 font-medium'}`}>{cardData.email}</span>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* BACK CARD EXPORT STAGE */}
        <div
          ref={backCardExportRef}
          style={{ 
            width: cardData.orientation === 'vertical' ? '600px' : '1050px', 
            height: cardData.orientation === 'vertical' ? '1050px' : '600px',
            marginTop: '40px'
          }}
          className={`rounded-none p-12 relative overflow-hidden flex flex-col justify-between select-none shadow-none ${isCustomArtwork ? 'bg-slate-950 p-0' : `${currentTemplate.bgBack} ${currentTemplate.border}`}`}
        >
          {isCustomArtwork && canvaArtworkConfig.backArtworkUrl ? (
            <div className="w-full h-full relative">
              <img 
                src={canvaArtworkConfig.backArtworkUrl} 
                alt="Back Graphic" 
                className="w-full h-full object-cover" 
              />
              {canvaArtworkConfig.qrPosition !== 'none' && (
                <div className={`absolute ${
                  canvaArtworkConfig.qrPosition === 'center' ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' :
                  canvaArtworkConfig.qrPosition === 'top-right' ? 'top-10 right-10' :
                  canvaArtworkConfig.qrPosition === 'bottom-left' ? 'bottom-10 left-10' : 'bottom-10 right-10'
                } z-20`}>
                  <div className="p-3 bg-white rounded-2xl shadow-2xl">
                    <img 
                      src={qrCodeDataUrl || `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(typeof window !== 'undefined' ? `${window.location.origin}/v/${cardData.slug}` : `https://oneclickbiz.in/v/${cardData.slug}`)}&color=0f172a`} 
                      alt="Card QR"
                      className="w-36 h-36 object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Finish overlays */}
              {cardData.finish === 'matte-black' && (
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/5 pointer-events-none" />
              )}
              {cardData.finish === 'gold-foil' && (
                <div className="absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br from-amber-400/20 via-yellow-200/10 to-transparent rounded-full blur-2xl pointer-events-none" />
              )}

              {/* Top Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
                <div className="flex items-center gap-3">
                  {cardData.showLogo && (
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center">
                      {cardData.logoUrl ? (
                        <img src={cardData.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                      ) : (() => {
                        const preset = PRESET_LOGOS.find(p => p.id === customLogoPreset) || PRESET_LOGOS[0];
                        const IconComp = preset.icon;
                        return (
                          <div className={`w-full h-full ${isLight ? 'bg-slate-900 text-white' : `bg-gradient-to-tr ${preset.bg} ${preset.color}`} flex items-center justify-center`}>
                            <IconComp className="w-6 h-6" />
                          </div>
                        );
                      })()}
                    </div>
                  )}
                  <span className={`text-base font-bold uppercase tracking-widest ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    {cardData.companyName}
                  </span>
                </div>
                <span className={`text-base font-mono ${isLight ? 'text-indigo-600 font-bold' : 'text-amber-400'}`}>
                  cards.oneclickbiz.in/v/{cardData.slug}
                </span>
              </div>

              {/* Center: QR and Details */}
              <div className="grid grid-cols-12 gap-8 items-center my-auto relative z-10">
                <div className="col-span-5 flex flex-col items-center">
                  <div className="p-4 rounded-2xl bg-white shadow-2xl">
                    <img 
                      src={qrCodeDataUrl || `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(typeof window !== 'undefined' ? `${window.location.origin}/v/${cardData.slug}` : `https://oneclickbiz.in/v/${cardData.slug}`)}&color=0f172a`} 
                      alt="Card QR"
                      className="w-44 h-44 object-contain"
                    />
                  </div>
                  <p className={`text-xs uppercase tracking-wider font-bold mt-3 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Scan with Camera
                  </p>
                </div>

                <div className="col-span-7 space-y-4 text-base">
                  <div className="flex items-center gap-3">
                    <Phone className={`w-6 h-6 shrink-0 ${isLight ? 'text-indigo-600' : 'text-amber-400'}`} />
                    <span className={`truncate font-medium ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{cardData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className={`w-6 h-6 shrink-0 ${isLight ? 'text-indigo-600' : 'text-amber-400'}`} />
                    <span className={`truncate font-medium ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{cardData.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className={`w-6 h-6 shrink-0 ${isLight ? 'text-indigo-600' : 'text-amber-400'}`} />
                    <span className={`truncate font-medium ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{cardData.website}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className={`w-6 h-6 shrink-0 ${isLight ? 'text-indigo-600' : 'text-amber-400'}`} />
                    <span className={`truncate font-medium ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{cardData.address}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs relative z-10">
                <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>
                  Scan QR code with smartphone camera for instant contact save
                </span>
                <span className={`font-bold uppercase ${isLight ? 'text-slate-950' : 'text-white'}`}>
                  Scan to Connect
                </span>
              </div>
            </>
          )}
        </div>
      </div>

    </div>
  );
}
