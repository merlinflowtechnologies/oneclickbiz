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
  FileText, 
  Layers, 
  BookOpen,
  Printer, 
  ExternalLink, 
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
  Star,
  Plus,
  Briefcase,
  Award,
  Users,
  ShieldCheck,
  Zap,
  ArrowRight,
  Eye,
  LayoutTemplate,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import { savePDF, exportBrochurePDF } from '@/lib/pdf-export';
import { downloadDataUrl, downloadUrl, downloadBlob } from '@/lib/download-utils';
import { getCurrentUserPlan, PlanTierType } from '@/lib/plan-guards';
import PlanLockGate from '@/components/common/PlanLockGate';

export type BrochureFormat = 'tri-fold' | 'bi-fold' | 'flyer-a4';
export type BrochureThemeId = 
  | 'luxury-onyx'
  | 'corporate-navy'
  | 'modern-indigo'
  | 'wellness-emerald'
  | 'agency-ruby'
  | 'minimal-white';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: string;
}

interface BrochureData {
  format: BrochureFormat;
  theme: BrochureThemeId;
  companyName: string;
  tagline: string;
  headline: string;
  subheadline: string;
  aboutText: string;
  missionText: string;
  logoUrl: string;
  coverImageUrl: string;
  featureImageUrl: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  slug: string;
  stats: {
    stat1Number: string;
    stat1Label: string;
    stat2Number: string;
    stat2Label: string;
    stat3Number: string;
    stat3Label: string;
  };
  services: ServiceItem[];
  whyChooseUs: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
}

export default function BrochureStudio() {
  const [selectedFormat, setSelectedFormat] = useState<BrochureFormat>('tri-fold');
  const [selectedTheme, setSelectedTheme] = useState<BrochureThemeId>('luxury-onyx');
  const [activeSpread, setActiveSpread] = useState<'outer' | 'inner'>('outer');
  const [activeTab, setActiveTab] = useState<'templates' | 'brand' | 'content' | 'services' | 'qr'>('templates');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [pdfPreviewModal, setPdfPreviewModal] = useState<{ isOpen: boolean; url: string; filename: string } | null>(null);
  const [lastExportedFile, setLastExportedFile] = useState<{ url: string; filename: string; fileType: 'PDF' | 'PNG' } | null>(null);
  const [userPlanTier, setUserPlanTier] = useState<PlanTierType>('PRO');

  const logoFileRef = useRef<HTMLInputElement | null>(null);
  const coverImageFileRef = useRef<HTMLInputElement | null>(null);
  const featureImageFileRef = useRef<HTMLInputElement | null>(null);
  const outerSpreadExportRef = useRef<HTMLDivElement | null>(null);
  const innerSpreadExportRef = useRef<HTMLDivElement | null>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  // Brochure State
  const [data, setData] = useState<BrochureData>({
    format: 'tri-fold',
    theme: 'luxury-onyx',
    companyName: 'Himastech Digital Reality',
    tagline: 'Immersive 3D Tours • Real Estate Marketing',
    headline: 'Accelerating Property Sales Through Immersive Reality',
    subheadline: 'Photorealistic 3D Virtual Walkthroughs & High-ROI Real Estate Performance Marketing',
    aboutText: 'Himastech Digital Reality partners with visionary real estate developers and modern architectural builders to craft immersive digital sales experiences. We turn digital viewers into verified site-visit property buyers.',
    missionText: 'Our mission is to eliminate physical barriers in real estate buying through cutting-edge 3D interactive technology and data-driven marketing campaigns.',
    logoUrl: '',
    coverImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    featureImageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    phone: '+91 98765 43210',
    email: 'kishore@himastech.com',
    website: 'himastech.com',
    address: 'Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033',
    slug: 'kishore',
    stats: {
      stat1Number: '150+',
      stat1Label: 'Real Estate Projects',
      stat2Number: '99.6%',
      stat2Label: 'Client Satisfaction',
      stat3Number: '₹85Cr+',
      stat3Label: 'Property Value Marketed'
    },
    services: [
      {
        id: 's1',
        title: 'Real Estate Performance Ad Campaigns',
        description: 'Targeted high-intent home buyer generation across Meta, Google, and LinkedIn with CRM automation.',
        price: 'Starting ₹49,999'
      },
      {
        id: 's2',
        title: 'Photorealistic 3D Virtual Walkthroughs',
        description: 'Interactive architectural 3D site tours accessible seamlessly on smartphones and VR headsets.',
        price: 'Starting ₹34,999'
      },
      {
        id: 's3',
        title: 'Smart Digital Sales Enablement Suite',
        description: 'Dynamic digital business cards, instant WhatsApp catalog checkout, and lead tracking for sales reps.',
        price: 'Starting ₹19,999'
      }
    ],
    whyChooseUs: [
      'Verified High-Intent Buyer Lead Qualification',
      'Ultra-Realistic 3D Architectural Renders',
      'Instant 1-Click WhatsApp Lead Routing',
      'Proven 350% Surge in Site Visit Bookings'
    ],
    testimonial: {
      quote: 'Himastech Digital Reality transformed our real estate project launch. Qualified buyer site visits surged by 350% within 3 weeks of launching our 3D walkthrough.',
      author: 'Rajesh Varma',
      role: 'Managing Director, Prestige Urban Spaces'
    }
  });

  // Generate crisp local QR code dataURL for offline/reliable canvas export
  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://oneclickbiz.in';
    const targetUrl = `${origin}/v/${data.slug || 'alex'}`;
    QRCode.toDataURL(targetUrl, {
      width: 300,
      margin: 1,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    }).then(setQrCodeDataUrl).catch(err => {
      console.error('QR code generation error:', err);
    });
  }, [data.slug]);

  // Load Session Data
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const detectedPlan = getCurrentUserPlan();
        setUserPlanTier(detectedPlan);

        const session = localStorage.getItem('oneclickbiz_user_session');
        if (session) {
          const parsed = JSON.parse(session);
          setData(prev => ({
            ...prev,
            companyName: parsed.businessName || prev.companyName,
            phone: parsed.phone || prev.phone,
            email: parsed.email || prev.email,
            slug: parsed.slug || prev.slug,
            logoUrl: parsed.logoUrl || prev.logoUrl,
          }));
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const themes: {
    id: BrochureThemeId;
    name: string;
    description: string;
    bgPrimary: string;
    bgSecondary: string;
    cardBg: string;
    textPrimary: string;
    textSecondary: string;
    accentColor: string;
    accentBg: string;
    borderColor: string;
    gradientBadge: string;
  }[] = [
    {
      id: 'luxury-onyx',
      name: 'Matte Onyx & 24K Gold',
      description: 'Ultra-luxury dark slate backdrop with metallic amber & gold accents.',
      bgPrimary: 'bg-zinc-950',
      bgSecondary: 'bg-zinc-900',
      cardBg: 'bg-zinc-900/90 border border-amber-500/30',
      textPrimary: 'text-white',
      textSecondary: 'text-zinc-400',
      accentColor: 'text-amber-400',
      accentBg: 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950',
      borderColor: 'border-amber-500/25',
      gradientBadge: 'from-amber-400 to-amber-600 text-slate-950'
    },
    {
      id: 'corporate-navy',
      name: 'Royal Navy & Platinum',
      description: 'Prestigious corporate deep blue with platinum & ice blue styling.',
      bgPrimary: 'bg-slate-950',
      bgSecondary: 'bg-blue-950/60',
      cardBg: 'bg-blue-950/50 border border-sky-500/30',
      textPrimary: 'text-white',
      textSecondary: 'text-sky-200/70',
      accentColor: 'text-sky-400',
      accentBg: 'bg-gradient-to-r from-sky-500 to-blue-600 text-white',
      borderColor: 'border-sky-500/25',
      gradientBadge: 'from-sky-400 to-blue-600 text-white'
    },
    {
      id: 'modern-indigo',
      name: 'Cyber Indigo & Violet',
      description: 'Dynamic Silicon-Valley tech aesthetic with vibrant neon purples.',
      bgPrimary: 'bg-slate-950',
      bgSecondary: 'bg-indigo-950/60',
      cardBg: 'bg-indigo-950/40 border border-indigo-500/30',
      textPrimary: 'text-white',
      textSecondary: 'text-indigo-200/70',
      accentColor: 'text-indigo-400',
      accentBg: 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white',
      borderColor: 'border-indigo-500/25',
      gradientBadge: 'from-indigo-400 to-purple-600 text-white'
    },
    {
      id: 'wellness-emerald',
      name: 'Emerald Forest & Sage',
      description: 'Earthy luxury for wellness, healthcare, real estate, and sustainable brands.',
      bgPrimary: 'bg-zinc-950',
      bgSecondary: 'bg-emerald-950/60',
      cardBg: 'bg-emerald-950/40 border border-emerald-500/30',
      textPrimary: 'text-white',
      textSecondary: 'text-emerald-200/70',
      accentColor: 'text-emerald-400',
      accentBg: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950',
      borderColor: 'border-emerald-500/25',
      gradientBadge: 'from-emerald-400 to-teal-600 text-slate-950'
    },
    {
      id: 'agency-ruby',
      name: 'Sunset Ruby & Rose',
      description: 'Warm creative agency flair with rich crimson and rose-gold hues.',
      bgPrimary: 'bg-slate-950',
      bgSecondary: 'bg-rose-950/50',
      cardBg: 'bg-rose-950/40 border border-rose-500/30',
      textPrimary: 'text-white',
      textSecondary: 'text-rose-200/70',
      accentColor: 'text-rose-400',
      accentBg: 'bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950',
      borderColor: 'border-rose-500/25',
      gradientBadge: 'from-rose-400 to-amber-500 text-slate-950'
    },
    {
      id: 'minimal-white',
      name: 'Swiss Monochrome Minimal',
      description: 'Crisp high-contrast black & white publication layout for architectural clarity.',
      bgPrimary: 'bg-white',
      bgSecondary: 'bg-slate-100',
      cardBg: 'bg-white border border-slate-300 shadow-sm',
      textPrimary: 'text-slate-950',
      textSecondary: 'text-slate-600',
      accentColor: 'text-slate-900',
      accentBg: 'bg-slate-900 text-white',
      borderColor: 'border-slate-300',
      gradientBadge: 'from-slate-900 to-black text-white'
    }
  ];

  const currentTheme = themes.find(t => t.id === selectedTheme) || themes[0];
  const isLight = selectedTheme === 'minimal-white';

  /**
   * Flattens computed styles onto all descendant elements in a cloned DOM tree.
   * Prevents html-to-image from failing on Tailwind v4's oklch() / lab() CSS color functions.
   */
  const flattenStyles = (original: HTMLElement, clone: HTMLElement) => {
    const sourceEls = Array.from(original.querySelectorAll('*')) as HTMLElement[];
    const cloneEls = Array.from(clone.querySelectorAll('*')) as HTMLElement[];
    const props = [
      'color', 'background-color', 'border-color', 'border-top-color',
      'border-right-color', 'border-bottom-color', 'border-left-color',
      'outline-color', 'text-decoration-color', 'fill', 'stroke',
      'background', 'background-image',
    ];
    sourceEls.forEach((el, i) => {
      const computed = window.getComputedStyle(el);
      const target = cloneEls[i] as HTMLElement;
      if (!target) return;
      props.forEach(prop => {
        const val = computed.getPropertyValue(prop);
        if (val) {
          (target.style as any)[prop.replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase())] = val;
        }
      });
      const bg = computed.getPropertyValue('background-image');
      if (bg && bg !== 'none') target.style.backgroundImage = bg;
    });
    const rootComputed = window.getComputedStyle(original);
    props.forEach(prop => {
      const val = rootComputed.getPropertyValue(prop);
      if (val) {
        (clone.style as any)[prop.replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase())] = val;
      }
    });
  };

  /** Captures a DOM element to PNG, safe against oklch/lab color parse errors.
   * Pre-processes the element's computed styles inline so html-to-image doesn't
   * choke on Tailwind v4 oklch() / lab() color functions.
   */
  const captureToPng = async (el: HTMLElement): Promise<string> => {
    // Helper to sanitize any modern CSS color function (lab, oklch, etc.) into standard rgb/rgba
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
      // Use pure-jsPDF brochure export — no HTML rendering, no CSS color issues
      const res = await exportBrochurePDF({
        companyName: data.companyName,
        tagline: data.tagline,
        headline: data.headline,
        subheadline: data.subheadline,
        aboutText: data.aboutText,
        missionText: data.missionText,
        phone: data.phone,
        email: data.email,
        website: data.website,
        address: data.address,
        slug: data.slug,
        format: selectedFormat,
        stats: data.stats,
        services: data.services,
        whyChooseUs: data.whyChooseUs,
        testimonial: data.testimonial,
      }, { shouldDownload: false });
      if (res && res.blobUrl) {
        setPdfPreviewModal({ isOpen: true, url: res.blobUrl, filename: res.filename });
      }
    } catch (err) {
      console.error('Brochure preview error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExport = async (type: 'pdf' | 'png-outer' | 'png-inner') => {
    setIsExporting(true);
    try {
      if (type === 'png-outer') {
        if (!outerSpreadExportRef.current) throw new Error('Export reference not ready');
        const dataUrl = await captureToPng(outerSpreadExportRef.current);
        const filename = `oneclickbiz-brochure-outer-${selectedFormat}-${(data.slug || 'brochure').toLowerCase()}.png`;
        const blobUrl = downloadDataUrl(dataUrl, filename);
        setLastExportedFile({ url: blobUrl || dataUrl, filename, fileType: 'PNG' });
      } else if (type === 'png-inner') {
        if (!innerSpreadExportRef.current) throw new Error('Inner spread not available for flyer');
        const dataUrl = await captureToPng(innerSpreadExportRef.current);
        const filename = `oneclickbiz-brochure-inner-${selectedFormat}-${(data.slug || 'brochure').toLowerCase()}.png`;
        const blobUrl = downloadDataUrl(dataUrl, filename);
        setLastExportedFile({ url: blobUrl || dataUrl, filename, fileType: 'PNG' });
      } else if (type === 'pdf') {
        // Pure jsPDF export — no CSS color parsing, guaranteed to work
        const res = await exportBrochurePDF({
          companyName: data.companyName,
          tagline: data.tagline,
          headline: data.headline,
          subheadline: data.subheadline,
          aboutText: data.aboutText,
          missionText: data.missionText,
          phone: data.phone,
          email: data.email,
          website: data.website,
          address: data.address,
          slug: data.slug,
          format: selectedFormat,
          stats: data.stats,
          services: data.services,
          whyChooseUs: data.whyChooseUs,
          testimonial: data.testimonial,
          qrCodeDataUrl: qrCodeDataUrl || undefined,
        }, { shouldDownload: true });
        if (res && res.blobUrl) {
          setLastExportedFile({ url: res.blobUrl, filename: res.filename, fileType: 'PDF' });
        } else {
          throw new Error('Brochure PDF generation returned no file');
        }
      }

      setExportSuccess(true);
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => setExportSuccess(false), 7000);
    } catch (err) {
      console.error('Brochure export error:', err);
      alert(`Download failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImageUpload = (field: 'logoUrl' | 'coverImageUrl' | 'featureImageUrl', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setData(prev => ({ ...prev, [field]: ev.target?.result as string }));
        if (field === 'logoUrl' && typeof window !== 'undefined') {
          try {
            const session = localStorage.getItem('oneclickbiz_user_session');
            const parsed = session ? JSON.parse(session) : {};
            parsed.logoUrl = ev.target.result;
            localStorage.setItem('oneclickbiz_user_session', JSON.stringify(parsed));
          } catch (err) {
            console.error(err);
          }
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const addService = () => {
    setData(prev => ({
      ...prev,
      services: [
        ...prev.services,
        {
          id: `s_${Date.now()}`,
          title: 'New Signature Service',
          description: 'Custom tailored offering with specialized delivery & dedicated account manager.',
          price: 'Custom Quote'
        }
      ]
    }));
  };

  const removeService = (id: string) => {
    setData(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id)
    }));
  };

  // Strict Plan Gating: Basic Plan cannot access Brochure Studio
  if (userPlanTier === 'BASIC') {
    return (
      <PlanLockGate
        requiredPlan="PRO"
        currentPlan={userPlanTier}
        featureTitle="Marketing Brochure & Catalog Studio"
        featureDescription="Design luxury Tri-Fold, Bi-Fold Booklet, and Promo Flyer brochures with customized brand logos, service pricing matrices, dynamic QR codes, and 300 DPI vector PDF exports."
        benefits={[
          'Tri-Fold, Bi-Fold & Flyer marketing brochure formats',
          'Print-ready vector 300 DPI PDF generation & instant downloads',
          'Custom brand typography, color palettes & QR code embeds',
          '1 White-label custom domain CNAME support included',
          'Unlimited WhatsApp Store product catalog included'
        ]}
      />
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Hidden File Upload Inputs */}
      <input 
        ref={logoFileRef}
        type="file" 
        accept="image/*" 
        onChange={(e) => handleImageUpload('logoUrl', e)} 
        className="hidden" 
      />
      <input 
        ref={coverImageFileRef}
        type="file" 
        accept="image/*" 
        onChange={(e) => handleImageUpload('coverImageUrl', e)} 
        className="hidden" 
      />
      <input 
        ref={featureImageFileRef}
        type="file" 
        accept="image/*" 
        onChange={(e) => handleImageUpload('featureImageUrl', e)} 
        className="hidden" 
      />

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900 border border-indigo-500/20 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-semibold">
            <BookOpen className="w-3.5 h-3.5" /> Luxury Brochure & Catalog Studio
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Create Marketing Brochures & Catalogs
          </h1>
          <p className="text-xs text-slate-400">
            Switch seamlessly between Tri-Fold, Bi-Fold Booklet, and Promo Flyer formats with 300 DPI print export & dynamic QR.
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-2">
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
            <span>Preview &amp; Open PDF</span>
          </button>

          <Link
            href={`/v/${data.slug}`}
            target="_blank"
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-indigo-300 flex items-center gap-1.5 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
            <span>Digital Profile</span>
          </Link>
        </div>
      </div>

      {/* Format Selector Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
        <div className="flex items-center gap-2">
          <LayoutTemplate className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold text-white">Brochure Format:</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {[
            { id: 'tri-fold', name: 'Tri-Fold A4 (3 Panels)', icon: BookOpen },
            { id: 'bi-fold', name: 'Bi-Fold Booklet (4 Pages)', icon: Layers },
            { id: 'flyer-a4', name: 'Single Sheet Promo Flyer', icon: FileText }
          ].map(fmt => {
            const Icon = fmt.icon;
            const isSelected = selectedFormat === fmt.id;
            return (
              <button
                key={fmt.id}
                onClick={() => setSelectedFormat(fmt.id as BrochureFormat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-500/40'
                    : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{fmt.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Live Multi-Panel Brochure Canvas */}
        <div className="lg:col-span-8 flex flex-col items-center space-y-6">
          
          {/* Spread View Controls */}
          <div className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveSpread('outer')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeSpread === 'outer'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {selectedFormat === 'tri-fold' && 'Outer Spread (Cover • Back • Flap)'}
                {selectedFormat === 'bi-fold' && 'Outer Spread (Cover • Back)'}
                {selectedFormat === 'flyer-a4' && 'Front Showcase View'}
              </button>

              {selectedFormat !== 'flyer-a4' && (
                <button
                  onClick={() => setActiveSpread('inner')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeSpread === 'inner'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {selectedFormat === 'tri-fold' && 'Inner Spread (Services • Story • Showcase)'}
                  {selectedFormat === 'bi-fold' && 'Inner Spread (About • Offerings)'}
                </button>
              )}
            </div>

            {selectedFormat !== 'flyer-a4' && (
              <button
                onClick={() => setActiveSpread(prev => prev === 'outer' ? 'inner' : 'outer')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-xs font-medium text-indigo-300 hover:text-white flex items-center gap-1.5 border border-slate-700 transition-all active:scale-95"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Flip Spread</span>
              </button>
            )}
          </div>

          {/* ==================== BROCHURE CANVAS CONTAINER ==================== */}
          <div className="w-full p-4 sm:p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 flex flex-col items-center justify-center relative shadow-2xl overflow-x-auto">
            
            {/* Ambient Backlight */}
            <div className={`absolute w-96 h-60 blur-3xl opacity-15 pointer-events-none rounded-full ${
              selectedTheme === 'luxury-onyx' ? 'bg-amber-500' :
              selectedTheme === 'corporate-navy' ? 'bg-sky-500' :
              selectedTheme === 'modern-indigo' ? 'bg-indigo-500' :
              selectedTheme === 'wellness-emerald' ? 'bg-emerald-500' : 'bg-rose-500'
            }`} />

            {/* ============================================================== */}
            {/* FORMAT 1: TRI-FOLD BROCHURE (3 PANELS PER SPREAD)              */}
            {/* ============================================================== */}
            {selectedFormat === 'tri-fold' && (
              <div 
                className={`
                  w-full min-w-[700px] max-w-[900px] aspect-[16/9] sm:aspect-[1.9/1] rounded-2xl border-2 transition-all duration-300 shadow-2xl relative overflow-hidden select-none flex
                  ${currentTheme.bgPrimary} ${currentTheme.borderColor}
                `}
              >
                {/* OUTER SPREAD: [INSIDE FLAP] | [BACK CONTACT] | [FRONT COVER] */}
                {activeSpread === 'outer' && (
                  <div className="w-full h-full grid grid-cols-3 divide-x divide-white/10 relative z-10">
                    {/* PANEL 1 (OUTER LEFT): INSIDE FLAP */}
                    <div className={`p-4 sm:p-5 flex flex-col justify-between ${currentTheme.bgSecondary}`}>
                      <div className="space-y-3">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 text-[9px] font-bold uppercase tracking-wider text-slate-300">
                          <Award className="w-3 h-3 text-amber-400" /> Why Choose Us
                        </div>
                        <h3 className={`text-xs sm:text-sm font-extrabold leading-snug ${currentTheme.textPrimary}`}>
                          Built for Performance, Speed & Real Results
                        </h3>
                        <p className={`text-[9px] sm:text-[10px] leading-relaxed ${currentTheme.textSecondary}`}>
                          {data.aboutText.slice(0, 180)}...
                        </p>

                        <div className="space-y-1.5 pt-2">
                          {data.whyChooseUs.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="flex items-start gap-1.5 text-[9px] text-slate-300">
                              <CheckCircle2 className={`w-3 h-3 shrink-0 mt-0.5 ${currentTheme.accentColor}`} />
                              <span className="leading-tight">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Customer Review snippet */}
                      <div className={`p-2.5 rounded-xl ${currentTheme.cardBg} space-y-1`}>
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-amber-400" />
                          ))}
                        </div>
                        <p className={`text-[8px] italic line-clamp-2 ${currentTheme.textSecondary}`}>
                          &ldquo;{data.testimonial.quote}&rdquo;
                        </p>
                        <p className="text-[8px] font-bold text-white">
                          {data.testimonial.author} <span className="opacity-60">({data.testimonial.role.split(',')[0]})</span>
                        </p>
                      </div>
                    </div>

                    {/* PANEL 2 (OUTER CENTER): BACK COVER */}
                    <div className={`p-4 sm:p-5 flex flex-col justify-between items-center text-center ${currentTheme.bgPrimary}`}>
                      <div className="space-y-1.5 w-full flex flex-col items-center">
                        <span className={`text-[9px] font-bold uppercase tracking-widest ${currentTheme.accentColor}`}>
                          Connect With Us
                        </span>
                        <h4 className={`text-xs sm:text-sm font-extrabold ${currentTheme.textPrimary}`}>
                          {data.companyName}
                        </h4>
                        <p className={`text-[8px] ${currentTheme.textSecondary}`}>
                          Scan QR code to access our interactive digital vCard & start instant WhatsApp chat.
                        </p>
                      </div>

                      <div className="flex flex-col items-center my-auto">
                        <div className="p-2 rounded-xl bg-white shadow-xl">
                          <img 
                            src={qrCodeDataUrl || `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(`https://oneclickbiz.in/v/${data.slug}`)}&color=0f172a`} 
                            alt="Brochure QR"
                            className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                          />
                        </div>
                        <span className="text-[8px] font-mono font-bold text-indigo-400 mt-1.5">
                          oneclickbiz.in/v/{data.slug}
                        </span>
                      </div>

                      <div className="w-full space-y-1 text-[8px] sm:text-[9px] border-t border-white/10 pt-2">
                        <div className="flex items-center justify-center gap-1.5 text-slate-300">
                          <Phone className={`w-2.5 h-2.5 shrink-0 ${currentTheme.accentColor}`} />
                          <span>{data.phone}</span>
                        </div>
                        <div className="flex items-center justify-center gap-1.5 text-slate-300">
                          <Mail className={`w-2.5 h-2.5 shrink-0 ${currentTheme.accentColor}`} />
                          <span className="truncate">{data.email}</span>
                        </div>
                        <div className="flex items-center justify-center gap-1.5 text-slate-300">
                          <MapPin className={`w-2.5 h-2.5 shrink-0 ${currentTheme.accentColor}`} />
                          <span className="truncate max-w-[180px]">{data.address}</span>
                        </div>
                      </div>
                    </div>

                    {/* PANEL 3 (OUTER RIGHT): FRONT COVER */}
                    <div className={`p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden ${currentTheme.bgSecondary}`}>
                      <div 
                        className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none"
                        style={{ backgroundImage: `url(${data.coverImageUrl})` }}
                      />

                      <div className="relative z-10 flex items-center gap-2">
                        {data.logoUrl ? (
                          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/20 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow">
                            <img src={data.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${currentTheme.gradientBadge} flex items-center justify-center font-black text-xs shadow`}>
                            {data.companyName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <h4 className={`text-xs font-black tracking-tight ${currentTheme.textPrimary}`}>
                            {data.companyName}
                          </h4>
                          <p className={`text-[8px] uppercase tracking-wider ${currentTheme.textSecondary}`}>
                            {data.tagline}
                          </p>
                        </div>
                      </div>

                      <div className="relative z-10 space-y-2 my-auto">
                        <div className="w-6 h-0.5 bg-amber-400 rounded-full" />
                        <h2 className={`text-sm sm:text-base font-black leading-tight tracking-tight ${currentTheme.textPrimary}`}>
                          {data.headline}
                        </h2>
                        <p className={`text-[9px] line-clamp-3 leading-snug ${currentTheme.textSecondary}`}>
                          {data.subheadline}
                        </p>
                      </div>

                      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-2 text-[8px]">
                        <span className={`font-semibold uppercase tracking-wider ${currentTheme.accentColor}`}>
                          Tri-Fold Print Catalog
                        </span>
                        <span className="text-slate-400 font-mono">
                          {new Date().getFullYear()} Edition
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* INNER SPREAD */}
                {activeSpread === 'inner' && (
                  <div className="w-full h-full grid grid-cols-3 divide-x divide-white/10 relative z-10">
                    {/* INNER PANEL 1 */}
                    <div className={`p-4 sm:p-5 flex flex-col justify-between ${currentTheme.bgSecondary}`}>
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-1.5">
                          <Briefcase className={`w-3.5 h-3.5 ${currentTheme.accentColor}`} />
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${currentTheme.textPrimary}`}>
                            About Our Studio
                          </span>
                        </div>
                        <h3 className={`text-xs font-extrabold ${currentTheme.textPrimary}`}>
                          Driven by Innovation
                        </h3>
                        <p className={`text-[9px] leading-relaxed ${currentTheme.textSecondary}`}>
                          {data.aboutText}
                        </p>
                        <p className={`text-[9px] leading-relaxed italic ${currentTheme.textSecondary}`}>
                          &ldquo;{data.missionText}&rdquo;
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-white/10 text-center">
                        <div className={`p-1.5 rounded-lg ${currentTheme.cardBg}`}>
                          <p className={`text-xs font-black ${currentTheme.accentColor}`}>{data.stats.stat1Number}</p>
                          <p className="text-[7px] text-slate-400 truncate">{data.stats.stat1Label}</p>
                        </div>
                        <div className={`p-1.5 rounded-lg ${currentTheme.cardBg}`}>
                          <p className={`text-xs font-black ${currentTheme.accentColor}`}>{data.stats.stat2Number}</p>
                          <p className="text-[7px] text-slate-400 truncate">{data.stats.stat2Label}</p>
                        </div>
                        <div className={`p-1.5 rounded-lg ${currentTheme.cardBg}`}>
                          <p className={`text-xs font-black ${currentTheme.accentColor}`}>{data.stats.stat3Number}</p>
                          <p className="text-[7px] text-slate-400 truncate">{data.stats.stat3Label}</p>
                        </div>
                      </div>
                    </div>

                    {/* INNER PANEL 2 */}
                    <div className={`p-4 sm:p-5 flex flex-col justify-between ${currentTheme.bgPrimary}`}>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${currentTheme.accentColor}`}>
                            Services & Offerings
                          </span>
                          <span className="text-[8px] text-slate-400 font-medium">Bespoke</span>
                        </div>

                        <div className="space-y-2">
                          {data.services.slice(0, 3).map(srv => (
                            <div key={srv.id} className={`p-2.5 rounded-xl ${currentTheme.cardBg} space-y-1`}>
                              <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-bold text-white truncate max-w-[130px]">
                                  {srv.title}
                                </h4>
                                <span className={`text-[8px] font-bold font-mono px-1.5 py-0.5 rounded bg-amber-500/10 ${currentTheme.accentColor}`}>
                                  {srv.price}
                                </span>
                              </div>
                              <p className={`text-[8px] line-clamp-2 leading-tight ${currentTheme.textSecondary}`}>
                                {srv.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[8px] text-slate-400 border-t border-white/10 pt-2">
                        <span>Transparent Rates</span>
                        <span className={`font-semibold ${currentTheme.accentColor}`}>100% Guaranteed</span>
                      </div>
                    </div>

                    {/* INNER PANEL 3 */}
                    <div className={`p-4 sm:p-5 flex flex-col justify-between ${currentTheme.bgSecondary}`}>
                      <div className="space-y-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${currentTheme.textPrimary}`}>
                          Featured Portfolio
                        </span>

                        <div className="w-full h-24 rounded-xl overflow-hidden relative shadow-md">
                          <img 
                            src={data.featureImageUrl} 
                            alt="Portfolio Showcase" 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-2">
                            <p className="text-[8px] font-bold text-white">Award-Winning Digital Ecosystems</p>
                          </div>
                        </div>

                        <div className="space-y-1 pt-1">
                          {data.whyChooseUs.map((pt, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-[8px] text-slate-300">
                              <Zap className={`w-2.5 h-2.5 shrink-0 ${currentTheme.accentColor}`} />
                              <span className="truncate">{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className={`p-2 rounded-xl ${currentTheme.accentBg} flex items-center justify-between shadow`}>
                        <div className="leading-tight">
                          <p className="text-[9px] font-black">Ready to Start?</p>
                          <p className="text-[7px] opacity-80">30-Min Strategy Consultation</p>
                        </div>
                        <div className="px-2 py-1 rounded bg-black/20 text-[8px] font-bold">
                          WhatsApp Us
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================== */}
            {/* FORMAT 2: BI-FOLD BOOKLET (2 PAGES PER SPREAD)                 */}
            {/* ============================================================== */}
            {selectedFormat === 'bi-fold' && (
              <div 
                className={`
                  w-full min-w-[650px] max-w-[850px] aspect-[4/3] rounded-2xl border-2 transition-all duration-300 shadow-2xl relative overflow-hidden select-none flex
                  ${currentTheme.bgPrimary} ${currentTheme.borderColor}
                `}
              >
                {/* BI-FOLD OUTER SPREAD: [PAGE 4: BACK COVER] | [PAGE 1: FRONT COVER] */}
                {activeSpread === 'outer' && (
                  <div className="w-full h-full grid grid-cols-2 divide-x divide-white/10 relative z-10">
                    
                    {/* PAGE 4: BACK COVER (CONTACT & QR) */}
                    <div className={`p-6 sm:p-8 flex flex-col justify-between items-center text-center ${currentTheme.bgPrimary}`}>
                      <div className="space-y-2 w-full flex flex-col items-center">
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${currentTheme.accentColor}`}>
                          Corporate Headquarters
                        </span>
                        <h3 className={`text-base font-extrabold ${currentTheme.textPrimary}`}>
                          {data.companyName}
                        </h3>
                        <p className={`text-[10px] max-w-[220px] ${currentTheme.textSecondary}`}>
                          Scan QR Code to save full contact vCard & launch WhatsApp chat.
                        </p>
                      </div>

                      {/* Dynamic QR */}
                      <div className="flex flex-col items-center my-auto">
                        <div className="p-3 rounded-2xl bg-white shadow-2xl">
                          <img 
                            src={qrCodeDataUrl || `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(`https://oneclickbiz.in/v/${data.slug}`)}&color=0f172a`} 
                            alt="BiFold QR"
                            className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
                          />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-indigo-400 mt-2">
                          oneclickbiz.in/v/{data.slug}
                        </span>
                      </div>

                      {/* Detailed Contact info */}
                      <div className="w-full space-y-1.5 text-[10px] border-t border-white/10 pt-3">
                        <div className="flex items-center justify-center gap-2 text-slate-300">
                          <Phone className={`w-3.5 h-3.5 ${currentTheme.accentColor}`} />
                          <span>{data.phone}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-slate-300">
                          <Mail className={`w-3.5 h-3.5 ${currentTheme.accentColor}`} />
                          <span>{data.email}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-slate-300">
                          <MapPin className={`w-3.5 h-3.5 ${currentTheme.accentColor}`} />
                          <span className="truncate max-w-[240px]">{data.address}</span>
                        </div>
                      </div>
                    </div>

                    {/* PAGE 1: FRONT COVER */}
                    <div className={`p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden ${currentTheme.bgSecondary}`}>
                      <div 
                        className="absolute inset-0 opacity-25 bg-cover bg-center pointer-events-none"
                        style={{ backgroundImage: `url(${data.coverImageUrl})` }}
                      />

                      <div className="relative z-10 flex items-center gap-3">
                        {data.logoUrl ? (
                          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/20 p-1.5 flex items-center justify-center overflow-hidden shrink-0 shadow-lg">
                            <img src={data.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${currentTheme.gradientBadge} flex items-center justify-center font-black text-sm shadow-lg`}>
                            {data.companyName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <h3 className={`text-sm font-black tracking-tight ${currentTheme.textPrimary}`}>
                            {data.companyName}
                          </h3>
                          <p className={`text-[10px] uppercase tracking-wider ${currentTheme.textSecondary}`}>
                            {data.tagline}
                          </p>
                        </div>
                      </div>

                      <div className="relative z-10 space-y-3 my-auto">
                        <div className="w-10 h-1 bg-amber-400 rounded-full" />
                        <h1 className={`text-lg sm:text-2xl font-black leading-tight tracking-tight ${currentTheme.textPrimary}`}>
                          {data.headline}
                        </h1>
                        <p className={`text-xs line-clamp-4 leading-relaxed ${currentTheme.textSecondary}`}>
                          {data.subheadline}
                        </p>
                      </div>

                      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3 text-[10px]">
                        <span className={`font-bold uppercase tracking-wider ${currentTheme.accentColor}`}>
                          Bi-Fold Executive Pamphlet
                        </span>
                        <span className="text-slate-400 font-mono">
                          {new Date().getFullYear()} Edition
                        </span>
                      </div>
                    </div>

                  </div>
                )}

                {/* BI-FOLD INNER SPREAD: [PAGE 2: ABOUT & STATS] | [PAGE 3: SERVICES & CTA] */}
                {activeSpread === 'inner' && (
                  <div className="w-full h-full grid grid-cols-2 divide-x divide-white/10 relative z-10">
                    
                    {/* PAGE 2: ABOUT, MISSION & TRUST STATS */}
                    <div className={`p-6 sm:p-8 flex flex-col justify-between ${currentTheme.bgSecondary}`}>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Briefcase className={`w-4 h-4 ${currentTheme.accentColor}`} />
                          <span className={`text-xs font-bold uppercase tracking-wider ${currentTheme.textPrimary}`}>
                            Company Overview
                          </span>
                        </div>
                        <h3 className={`text-sm sm:text-base font-extrabold ${currentTheme.textPrimary}`}>
                          Leading Innovation & Digital Craftsmanship
                        </h3>
                        <p className={`text-xs leading-relaxed ${currentTheme.textSecondary}`}>
                          {data.aboutText}
                        </p>
                        <div className={`p-3 rounded-xl ${currentTheme.cardBg}`}>
                          <p className={`text-[11px] italic leading-snug ${currentTheme.textSecondary}`}>
                            &ldquo;{data.missionText}&rdquo;
                          </p>
                        </div>
                      </div>

                      {/* 3 Metric counters */}
                      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
                        <div className={`p-2 rounded-xl ${currentTheme.cardBg}`}>
                          <p className={`text-sm font-black ${currentTheme.accentColor}`}>{data.stats.stat1Number}</p>
                          <p className="text-[9px] text-slate-400 truncate">{data.stats.stat1Label}</p>
                        </div>
                        <div className={`p-2 rounded-xl ${currentTheme.cardBg}`}>
                          <p className={`text-sm font-black ${currentTheme.accentColor}`}>{data.stats.stat2Number}</p>
                          <p className="text-[9px] text-slate-400 truncate">{data.stats.stat2Label}</p>
                        </div>
                        <div className={`p-2 rounded-xl ${currentTheme.cardBg}`}>
                          <p className={`text-sm font-black ${currentTheme.accentColor}`}>{data.stats.stat3Number}</p>
                          <p className="text-[9px] text-slate-400 truncate">{data.stats.stat3Label}</p>
                        </div>
                      </div>
                    </div>

                    {/* PAGE 3: SERVICES & PORTFOLIO BANNER */}
                    <div className={`p-6 sm:p-8 flex flex-col justify-between ${currentTheme.bgPrimary}`}>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-bold uppercase tracking-wider ${currentTheme.accentColor}`}>
                            Core Services & Pricing
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">Custom Delivery</span>
                        </div>

                        <div className="space-y-2.5">
                          {data.services.map(srv => (
                            <div key={srv.id} className={`p-3 rounded-xl ${currentTheme.cardBg} space-y-1`}>
                              <div className="flex items-center justify-between">
                                <h4 className="text-xs font-bold text-white truncate max-w-[160px]">
                                  {srv.title}
                                </h4>
                                <span className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded bg-amber-500/10 ${currentTheme.accentColor}`}>
                                  {srv.price}
                                </span>
                              </div>
                              <p className={`text-[10px] leading-tight ${currentTheme.textSecondary}`}>
                                {srv.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Direct CTA */}
                      <div className={`p-3 rounded-2xl ${currentTheme.accentBg} flex items-center justify-between shadow-lg`}>
                        <div>
                          <p className="text-xs font-black">Ready to Elevate Your Brand?</p>
                          <p className="text-[9px] opacity-85">Connect for Instant Proposal</p>
                        </div>
                        <div className="px-3 py-1.5 rounded-lg bg-black/25 text-xs font-bold">
                          Chat on WhatsApp
                        </div>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            )}

            {/* ============================================================== */}
            {/* FORMAT 3: SINGLE SHEET PROMO FLYER (PORTRAIT A4)               */}
            {/* ============================================================== */}
            {selectedFormat === 'flyer-a4' && (
              <div 
                className={`
                  w-full max-w-[500px] aspect-[1/1.41] rounded-2xl border-2 transition-all duration-300 shadow-2xl relative overflow-hidden select-none p-6 sm:p-7 flex flex-col justify-between
                  ${currentTheme.bgPrimary} ${currentTheme.borderColor}
                `}
              >
                {/* TOP HEADER */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    {data.logoUrl ? (
                      <div className="w-9 h-9 rounded-xl bg-slate-900 border border-white/20 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow">
                        <img src={data.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${currentTheme.gradientBadge} flex items-center justify-center font-black text-xs shadow`}>
                        {data.companyName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className={`text-xs font-black tracking-tight ${currentTheme.textPrimary}`}>
                        {data.companyName}
                      </h3>
                      <p className={`text-[8px] uppercase tracking-wider ${currentTheme.textSecondary}`}>
                        {data.tagline}
                      </p>
                    </div>
                  </div>

                  <span className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded-full bg-white/10 ${currentTheme.accentColor}`}>
                    {data.phone}
                  </span>
                </div>

                {/* HERO SECTION WITH FEATURE BANNER */}
                <div className="space-y-2.5 my-2">
                  <div className="space-y-1">
                    <h1 className={`text-sm sm:text-base font-black tracking-tight leading-snug ${currentTheme.textPrimary}`}>
                      {data.headline}
                    </h1>
                    <p className={`text-[9px] leading-snug ${currentTheme.textSecondary}`}>
                      {data.subheadline}
                    </p>
                  </div>

                  {/* Feature Image */}
                  <div className="w-full h-28 rounded-xl overflow-hidden relative shadow-md">
                    <img 
                      src={data.coverImageUrl} 
                      alt="Hero" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-2.5">
                      <p className="text-[9px] font-bold text-white">Delivering World-Class Digital Solutions Across 80+ Brands</p>
                    </div>
                  </div>
                </div>

                {/* SERVICES GRID */}
                <div className="space-y-2">
                  <span className={`text-[9px] font-bold uppercase tracking-wider ${currentTheme.accentColor}`}>
                    Featured Services
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {data.services.slice(0, 3).map(srv => (
                      <div key={srv.id} className={`p-2 rounded-xl ${currentTheme.cardBg} space-y-0.5`}>
                        <h4 className="text-[9px] font-bold text-white truncate">{srv.title}</h4>
                        <p className={`text-[7px] line-clamp-2 leading-tight ${currentTheme.textSecondary}`}>{srv.description}</p>
                        <p className={`text-[8px] font-bold font-mono ${currentTheme.accentColor} pt-0.5`}>{srv.price}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* BOTTOM QR & FOOTER CONTACT */}
                <div className="flex items-center justify-between border-t border-white/10 pt-3">
                  <div className="space-y-1 text-[8px]">
                    <p className="font-bold text-white">{data.companyName}</p>
                    <p className={currentTheme.textSecondary}>{data.email} • {data.phone}</p>
                    <p className="text-slate-400 truncate max-w-[200px]">{data.address}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-lg bg-white shadow">
                      <img 
                        src={qrCodeDataUrl || `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(`https://oneclickbiz.in/v/${data.slug}`)}&color=0f172a`} 
                        alt="Flyer QR" 
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div className="text-left">
                      <p className="text-[8px] font-bold text-white">Scan for vCard</p>
                      <p className="text-[7px] text-indigo-400 font-mono">oneclickbiz.in/v/{data.slug}</p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Scale indicator */}
            <div className="flex items-center gap-3 mt-4 text-[11px] text-slate-500 font-mono">
              <span>
                {selectedFormat === 'tri-fold' && 'Format: Standard Tri-Fold A4 (297mm × 210mm)'}
                {selectedFormat === 'bi-fold' && 'Format: Bi-Fold 4-Page Booklet (A4 Folded)'}
                {selectedFormat === 'flyer-a4' && 'Format: Single Page Promo Flyer (210mm × 297mm)'}
              </span>
              <span>•</span>
              <span className="text-indigo-400 font-semibold">300 DPI High-Res Print Export</span>
            </div>

          </div>

          {/* Quick Export Controls */}
          <div className="w-full flex items-center justify-center gap-3">
            <button
              onClick={() => handleExport('png-outer')}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{selectedFormat === 'flyer-a4' ? 'Download Flyer PNG' : 'Download Outer Spread PNG'}</span>
            </button>
            {selectedFormat !== 'flyer-a4' && (
              <button
                onClick={() => handleExport('png-inner')}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Inner Spread PNG</span>
              </button>
            )}
          </div>

        </div>

        {/* Right Column: Customization Tabs */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          
          {/* Tabs */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 overflow-x-auto gap-2">
            <button
              onClick={() => setActiveTab('templates')}
              className={`text-xs font-bold pb-2 transition-all border-b-2 flex items-center gap-1 shrink-0 ${
                activeTab === 'templates'
                  ? 'text-indigo-400 border-indigo-500'
                  : 'text-slate-400 border-transparent hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5" /> Themes
            </button>
            <button
              onClick={() => setActiveTab('brand')}
              className={`text-xs font-bold pb-2 transition-all border-b-2 flex items-center gap-1 shrink-0 ${
                activeTab === 'brand'
                  ? 'text-amber-400 border-amber-500'
                  : 'text-slate-400 border-transparent hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" /> Images
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`text-xs font-bold pb-2 transition-all border-b-2 flex items-center gap-1 shrink-0 ${
                activeTab === 'content'
                  ? 'text-indigo-400 border-indigo-500'
                  : 'text-slate-400 border-transparent hover:text-white'
              }`}
            >
              <Type className="w-3.5 h-3.5" /> Text
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`text-xs font-bold pb-2 transition-all border-b-2 flex items-center gap-1 shrink-0 ${
                activeTab === 'services'
                  ? 'text-indigo-400 border-indigo-500'
                  : 'text-slate-400 border-transparent hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" /> Offerings
            </button>
            <button
              onClick={() => setActiveTab('qr')}
              className={`text-xs font-bold pb-2 transition-all border-b-2 flex items-center gap-1 shrink-0 ${
                activeTab === 'qr'
                  ? 'text-indigo-400 border-indigo-500'
                  : 'text-slate-400 border-transparent hover:text-white'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" /> QR Code
            </button>
          </div>

          {/* TAB 1: THEMES & FORMAT */}
          {activeTab === 'templates' && (
            <div className="space-y-5">
              
              {/* Format Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-white">Brochure Layout Format</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'tri-fold', name: 'Tri-Fold A4', desc: '3-Panel Fold' },
                    { id: 'bi-fold', name: 'Bi-Fold Pamphlet', desc: '4-Page Book' },
                    { id: 'flyer-a4', name: 'Promo Flyer', desc: 'Single Sheet' }
                  ].map(fmt => (
                    <button
                      key={fmt.id}
                      onClick={() => setSelectedFormat(fmt.id as BrochureFormat)}
                      className={`p-2 rounded-xl border text-left transition-all ${
                        selectedFormat === fmt.id
                          ? 'bg-indigo-950/60 border-indigo-500 ring-1 ring-indigo-500/30'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="text-[11px] font-bold block text-white">{fmt.name}</span>
                      <span className="text-[9px] text-slate-400">{fmt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Palette Cards */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-white">Luxury Color Themes</label>
                <div className="space-y-2.5">
                  {themes.map(th => (
                    <div
                      key={th.id}
                      onClick={() => setSelectedTheme(th.id)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        selectedTheme === th.id
                          ? 'bg-indigo-950/40 border-indigo-500 ring-1 ring-indigo-500/40'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl ${th.bgSecondary} border ${th.borderColor} flex items-center justify-center font-bold text-xs ${th.accentColor}`}>
                          Aa
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">{th.name}</h4>
                          <p className="text-[10px] text-slate-400">{th.description}</p>
                        </div>
                      </div>
                      {selectedTheme === th.id && (
                        <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: BRAND & IMAGES */}
          {activeTab === 'brand' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">Logo & Brochure Visuals</h3>
                <p className="text-xs text-slate-400">Upload official logo, cover artwork, and portfolio showcase images.</p>
              </div>

              {/* Logo Upload Box */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Business Logo</span>
                  {data.logoUrl && (
                    <button 
                      onClick={() => setData(prev => ({ ...prev, logoUrl: '' }))}
                      className="text-[10px] text-rose-400 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 p-1 flex items-center justify-center overflow-hidden shrink-0">
                    {data.logoUrl ? (
                      <img src={data.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-xs font-bold text-slate-500">Logo</span>
                    )}
                  </div>
                  <button
                    onClick={() => logoFileRef.current?.click()}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Logo Image</span>
                  </button>
                </div>
              </div>

              {/* Cover Artwork Image */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-white">Front Cover Hero Image</span>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-12 rounded-xl bg-slate-900 border border-slate-700 overflow-hidden shrink-0">
                    <img src={data.coverImageUrl} alt="Cover" className="w-full h-full object-cover" />
                  </div>
                  <button
                    onClick={() => coverImageFileRef.current?.click()}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-200 border border-slate-700 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Change Cover Image</span>
                  </button>
                </div>
              </div>

              {/* Portfolio Feature Image */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-white">Portfolio Feature Artwork</span>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-12 rounded-xl bg-slate-900 border border-slate-700 overflow-hidden shrink-0">
                    <img src={data.featureImageUrl} alt="Feature" className="w-full h-full object-cover" />
                  </div>
                  <button
                    onClick={() => featureImageFileRef.current?.click()}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-200 border border-slate-700 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Change Portfolio Image</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: CONTENT & TEXT */}
          {activeTab === 'content' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">Headlines & Company Story</h3>
                <p className="text-xs text-slate-400">Edit copy for front cover and inside panels.</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Company Name</label>
                  <input
                    type="text"
                    value={data.companyName}
                    onChange={e => setData(prev => ({ ...prev, companyName: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Brand Tagline</label>
                  <input
                    type="text"
                    value={data.tagline}
                    onChange={e => setData(prev => ({ ...prev, tagline: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Hero Main Headline</label>
                  <input
                    type="text"
                    value={data.headline}
                    onChange={e => setData(prev => ({ ...prev, headline: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Hero Subtitle</label>
                  <textarea
                    rows={2}
                    value={data.subheadline}
                    onChange={e => setData(prev => ({ ...prev, subheadline: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white resize-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300">About the Business</label>
                  <textarea
                    rows={3}
                    value={data.aboutText}
                    onChange={e => setData(prev => ({ ...prev, aboutText: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white resize-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Company Mission Statement</label>
                  <textarea
                    rows={2}
                    value={data.missionText}
                    onChange={e => setData(prev => ({ ...prev, missionText: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES & OFFERINGS */}
          {activeTab === 'services' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Services & Products</h3>
                  <p className="text-xs text-slate-400">Manage catalog cards shown on the inner spread.</p>
                </div>
                <button
                  onClick={addService}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>

              <div className="space-y-3">
                {data.services.map((srv, idx) => (
                  <div key={srv.id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Item #{idx + 1}</span>
                      {data.services.length > 1 && (
                        <button
                          onClick={() => removeService(srv.id)}
                          className="text-rose-400 hover:text-rose-300 p-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Service Title"
                      value={srv.title}
                      onChange={e => {
                        const newTitle = e.target.value;
                        setData(prev => ({
                          ...prev,
                          services: prev.services.map(s => s.id === srv.id ? { ...s, title: newTitle } : s)
                        }));
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Price / Rate"
                        value={srv.price}
                        onChange={e => {
                          const newPrice = e.target.value;
                          setData(prev => ({
                            ...prev,
                            services: prev.services.map(s => s.id === srv.id ? { ...s, price: newPrice } : s)
                          }));
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Short description"
                        value={srv.description}
                        onChange={e => {
                          const newDesc = e.target.value;
                          setData(prev => ({
                            ...prev,
                            services: prev.services.map(s => s.id === srv.id ? { ...s, description: newDesc } : s)
                          }));
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: QR & CONTACT */}
          {activeTab === 'qr' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">Dynamic QR Code & Back Cover</h3>
                <p className="text-xs text-slate-400">QR code points to your live digital storefront.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Target Digital Profile Slug</label>
                  <div className="flex items-center mt-1">
                    <span className="px-3 py-2 bg-slate-900 border border-r-0 border-slate-700 rounded-l-xl text-xs text-slate-400 font-mono">
                      /v/
                    </span>
                    <input
                      type="text"
                      value={data.slug}
                      onChange={e => setData(prev => ({ ...prev, slug: e.target.value }))}
                      className="w-full px-3 py-2 rounded-r-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Phone</label>
                  <input
                    type="text"
                    value={data.phone}
                    onChange={e => setData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Email</label>
                  <input
                    type="email"
                    value={data.email}
                    onChange={e => setData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Physical Office Address</label>
                  <input
                    type="text"
                    value={data.address}
                    onChange={e => setData(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
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
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>PDF Document Preview</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold">300 DPI Print Ready</span>
                  </h3>
                  <p className="text-xs text-slate-400">{pdfPreviewModal.filename}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const win = window.open('', '_blank');
                    if (win) {
                      win.document.write(`
                        <!DOCTYPE html>
                        <html>
                          <head>
                            <title>${pdfPreviewModal.filename}</title>
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <style>
                              body, html { margin:0; padding:0; height:100%; width:100%; overflow:hidden; background:#0f172a; display:flex; flex-direction:column; }
                              .header { background:#020617; color:#fff; padding:10px 20px; font-family:sans-serif; font-size:13px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #1e293b; }
                              .btn { background:#4f46e5; color:#fff; border:none; padding:6px 14px; border-radius:6px; font-size:12px; font-weight:bold; cursor:pointer; text-decoration:none; display:inline-block; }
                              .btn:hover { background:#4338ca; }
                              iframe { flex:1; width:100%; border:none; }
                            </style>
                          </head>
                          <body>
                            <div class="header">
                              <span><strong>OneClickBiz</strong> | ${pdfPreviewModal.filename}</span>
                              <a class="btn" href="${pdfPreviewModal.url}" download="${pdfPreviewModal.filename}">Download PDF</a>
                            </div>
                            <iframe src="${pdfPreviewModal.url}#toolbar=1" allow="fullscreen"></iframe>
                          </body>
                        </html>
                      `);
                      win.document.close();
                    } else {
                      window.open(pdfPreviewModal.url, '_blank');
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700 active:scale-95"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Open in New Tab</span>
                </button>
                <a
                  href={pdfPreviewModal.url}
                  download={pdfPreviewModal.filename}
                  onClick={(e) => {
                    downloadUrl(pdfPreviewModal.url, pdfPreviewModal.filename);
                  }}
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
                data={`${pdfPreviewModal.url}#toolbar=1&navpanes=0`}
                type="application/pdf"
                className="w-full h-full rounded-2xl border-0 bg-white"
              >
                <iframe
                  src={`${pdfPreviewModal.url}#toolbar=1&navpanes=0`}
                  className="w-full h-full rounded-2xl border-0 bg-white"
                  title="PDF Document Preview"
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
              <p className="text-xs font-bold text-white">Brochure {lastExportedFile.fileType} Ready!</p>
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

      {/* ========================================================================= */}
      {/* OFF-SCREEN HIGH-RESOLUTION EXPORT STAGE FOR html2canvas & jsPDF           */}
      {/* Renders exact user content, styles, templates, colors, logos & QR codes  */}
      {/* ========================================================================= */}
      <div 
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: -9999,
          top: 0,
          pointerEvents: 'none',
          zIndex: -9999,
          opacity: 1
        }}
      >
        {selectedFormat === 'tri-fold' && (
          <>
            {/* TRI-FOLD: OUTER SPREAD (1188px x 840px, A4 Landscape) */}
            <div
              ref={outerSpreadExportRef}
              style={{ width: 1188, height: 840 }}
              className={`select-none flex overflow-hidden border-0 ${currentTheme.bgPrimary}`}
            >
              <div className="w-full h-full grid grid-cols-3 divide-x divide-white/10 relative z-10">
                {/* PANEL 1: INSIDE FLAP */}
                <div className={`p-8 flex flex-col justify-between ${currentTheme.bgSecondary}`}>
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-slate-300">
                      <Award className="w-4 h-4 text-amber-400" /> Why Choose Us
                    </div>
                    <h3 className={`text-xl font-extrabold leading-snug ${currentTheme.textPrimary}`}>
                      Built for Performance, Speed & Real Results
                    </h3>
                    <p className={`text-sm leading-relaxed ${currentTheme.textSecondary}`}>
                      {data.aboutText}
                    </p>
                    <div className="space-y-2.5 pt-2">
                      {data.whyChooseUs.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${currentTheme.accentColor}`} />
                          <span className="leading-tight">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer Review */}
                  <div className={`p-4 rounded-2xl ${currentTheme.cardBg} space-y-2`}>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className={`text-xs italic leading-relaxed ${currentTheme.textSecondary}`}>
                      &ldquo;{data.testimonial.quote}&rdquo;
                    </p>
                    <p className="text-xs font-bold text-white">
                      {data.testimonial.author} <span className="opacity-60">({data.testimonial.role})</span>
                    </p>
                  </div>
                </div>

                {/* PANEL 2: BACK COVER */}
                <div className={`p-8 flex flex-col justify-between items-center text-center ${currentTheme.bgPrimary}`}>
                  <div className="space-y-2 w-full flex flex-col items-center">
                    <span className={`text-xs font-bold uppercase tracking-widest ${currentTheme.accentColor}`}>
                      Connect With Us
                    </span>
                    <h4 className={`text-xl font-extrabold ${currentTheme.textPrimary}`}>
                      {data.companyName}
                    </h4>
                    <p className={`text-xs max-w-xs ${currentTheme.textSecondary}`}>
                      Scan QR code to access our interactive digital vCard & start instant WhatsApp chat.
                    </p>
                  </div>

                  <div className="flex flex-col items-center my-auto">
                    <div className="p-4 rounded-2xl bg-white shadow-2xl">
                      {qrCodeDataUrl ? (
                        <img 
                          src={qrCodeDataUrl} 
                          alt="Brochure QR"
                          className="w-36 h-36 object-contain"
                        />
                      ) : (
                        <div className="w-36 h-36 bg-slate-100 flex items-center justify-center text-slate-800 text-xs font-mono">
                          QR Code
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-mono font-bold text-indigo-400 mt-2">
                      oneclickbiz.in/v/{data.slug}
                    </span>
                  </div>

                  <div className="w-full space-y-2 text-xs border-t border-white/10 pt-4">
                    <div className="flex items-center justify-center gap-2 text-slate-300">
                      <Phone className={`w-4 h-4 shrink-0 ${currentTheme.accentColor}`} />
                      <span>{data.phone}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-slate-300">
                      <Mail className={`w-4 h-4 shrink-0 ${currentTheme.accentColor}`} />
                      <span className="truncate">{data.email}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-slate-300">
                      <MapPin className={`w-4 h-4 shrink-0 ${currentTheme.accentColor}`} />
                      <span className="truncate max-w-xs">{data.address}</span>
                    </div>
                  </div>
                </div>

                {/* PANEL 3: FRONT COVER */}
                <div className={`p-8 flex flex-col justify-between relative overflow-hidden ${currentTheme.bgSecondary}`}>
                  {data.coverImageUrl && (
                    <div 
                      className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none"
                      style={{ backgroundImage: `url(${data.coverImageUrl})` }}
                    />
                  )}

                  <div className="relative z-10 flex items-center gap-3">
                    {data.logoUrl ? (
                      <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/20 p-1.5 flex items-center justify-center overflow-hidden shrink-0 shadow">
                        <img src={data.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${currentTheme.gradientBadge} flex items-center justify-center font-black text-base shadow`}>
                        {data.companyName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className={`text-base font-black tracking-tight ${currentTheme.textPrimary}`}>
                        {data.companyName}
                      </h4>
                      <p className={`text-xs uppercase tracking-wider ${currentTheme.textSecondary}`}>
                        {data.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 space-y-3 my-auto">
                    <div className="w-10 h-1 bg-amber-400 rounded-full" />
                    <h2 className={`text-2xl font-black leading-tight tracking-tight ${currentTheme.textPrimary}`}>
                      {data.headline}
                    </h2>
                    <p className={`text-xs leading-relaxed ${currentTheme.textSecondary}`}>
                      {data.subheadline}
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                    <span className={`font-semibold uppercase tracking-wider ${currentTheme.accentColor}`}>
                      Tri-Fold Print Catalog
                    </span>
                    <span className="text-slate-400 font-mono">
                      {new Date().getFullYear()} Edition
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* TRI-FOLD: INNER SPREAD (1188px x 840px, A4 Landscape) */}
            <div
              ref={innerSpreadExportRef}
              style={{ width: 1188, height: 840 }}
              className={`select-none flex overflow-hidden border-0 ${currentTheme.bgPrimary}`}
            >
              <div className="w-full h-full grid grid-cols-3 divide-x divide-white/10 relative z-10">
                {/* INNER PANEL 1 */}
                <div className={`p-8 flex flex-col justify-between ${currentTheme.bgSecondary}`}>
                  <div className="space-y-3.5">
                    <div className="flex items-center gap-2">
                      <Briefcase className={`w-5 h-5 ${currentTheme.accentColor}`} />
                      <span className={`text-xs font-bold uppercase tracking-wider ${currentTheme.textPrimary}`}>
                        About Our Studio
                      </span>
                    </div>
                    <h3 className={`text-lg font-extrabold ${currentTheme.textPrimary}`}>
                      Driven by Innovation
                    </h3>
                    <p className={`text-xs leading-relaxed ${currentTheme.textSecondary}`}>
                      {data.aboutText}
                    </p>
                    <p className={`text-xs leading-relaxed italic ${currentTheme.textSecondary}`}>
                      &ldquo;{data.missionText}&rdquo;
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
                    <div className={`p-2.5 rounded-xl ${currentTheme.cardBg}`}>
                      <p className={`text-base font-black ${currentTheme.accentColor}`}>{data.stats.stat1Number}</p>
                      <p className="text-[10px] text-slate-400 truncate">{data.stats.stat1Label}</p>
                    </div>
                    <div className={`p-2.5 rounded-xl ${currentTheme.cardBg}`}>
                      <p className={`text-base font-black ${currentTheme.accentColor}`}>{data.stats.stat2Number}</p>
                      <p className="text-[10px] text-slate-400 truncate">{data.stats.stat2Label}</p>
                    </div>
                    <div className={`p-2.5 rounded-xl ${currentTheme.cardBg}`}>
                      <p className={`text-base font-black ${currentTheme.accentColor}`}>{data.stats.stat3Number}</p>
                      <p className="text-[10px] text-slate-400 truncate">{data.stats.stat3Label}</p>
                    </div>
                  </div>
                </div>

                {/* INNER PANEL 2 */}
                <div className={`p-8 flex flex-col justify-between ${currentTheme.bgPrimary}`}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold uppercase tracking-wider ${currentTheme.accentColor}`}>
                        Services & Offerings
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">Bespoke</span>
                    </div>

                    <div className="space-y-3">
                      {data.services.slice(0, 3).map(srv => (
                        <div key={srv.id} className={`p-3.5 rounded-2xl ${currentTheme.cardBg} space-y-1.5`}>
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-white truncate max-w-[180px]">
                              {srv.title}
                            </h4>
                            <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-amber-500/10 ${currentTheme.accentColor}`}>
                              {srv.price}
                            </span>
                          </div>
                          <p className={`text-[11px] line-clamp-2 leading-snug ${currentTheme.textSecondary}`}>
                            {srv.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 border-t border-white/10 pt-3">
                    <span>Transparent Rates</span>
                    <span className={`font-semibold ${currentTheme.accentColor}`}>100% Guaranteed</span>
                  </div>
                </div>

                {/* INNER PANEL 3 */}
                <div className={`p-8 flex flex-col justify-between ${currentTheme.bgSecondary}`}>
                  <div className="space-y-3">
                    <span className={`text-xs font-bold uppercase tracking-wider ${currentTheme.textPrimary}`}>
                      Featured Portfolio
                    </span>

                    <div className="w-full h-36 rounded-2xl overflow-hidden relative shadow-md">
                      <img 
                        src={data.featureImageUrl} 
                        alt="Portfolio Showcase" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                        <p className="text-xs font-bold text-white">Award-Winning Digital Ecosystems</p>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {data.whyChooseUs.map((pt, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <Zap className={`w-3.5 h-3.5 shrink-0 ${currentTheme.accentColor}`} />
                          <span className="truncate">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`p-3 rounded-2xl ${currentTheme.accentBg} flex items-center justify-between shadow`}>
                    <div className="leading-tight">
                      <p className="text-xs font-black">Ready to Start?</p>
                      <p className="text-[10px] opacity-80">30-Min Strategy Consultation</p>
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-black/20 text-xs font-bold">
                      WhatsApp Us
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {selectedFormat === 'bi-fold' && (
          <>
            {/* BI-FOLD: OUTER SPREAD (1188px x 840px, A4 Landscape) */}
            <div
              ref={outerSpreadExportRef}
              style={{ width: 1188, height: 840 }}
              className={`select-none flex overflow-hidden border-0 ${currentTheme.bgPrimary}`}
            >
              <div className="w-full h-full grid grid-cols-2 divide-x divide-white/10 relative z-10">
                {/* PAGE 4: BACK COVER */}
                <div className={`p-10 flex flex-col justify-between items-center text-center ${currentTheme.bgPrimary}`}>
                  <div className="space-y-2.5 w-full flex flex-col items-center">
                    <span className={`text-xs font-bold uppercase tracking-widest ${currentTheme.accentColor}`}>
                      Corporate Headquarters
                    </span>
                    <h3 className={`text-2xl font-extrabold ${currentTheme.textPrimary}`}>
                      {data.companyName}
                    </h3>
                    <p className={`text-xs max-w-sm ${currentTheme.textSecondary}`}>
                      Scan QR Code to save full contact vCard & launch WhatsApp chat.
                    </p>
                  </div>

                  <div className="flex flex-col items-center my-auto">
                    <div className="p-4 rounded-2xl bg-white shadow-2xl">
                      {qrCodeDataUrl ? (
                        <img 
                          src={qrCodeDataUrl} 
                          alt="BiFold QR"
                          className="w-40 h-40 object-contain"
                        />
                      ) : (
                        <div className="w-40 h-40 bg-slate-100 flex items-center justify-center text-slate-800 text-xs font-mono">
                          QR Code
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-mono font-bold text-indigo-400 mt-2.5">
                      oneclickbiz.in/v/{data.slug}
                    </span>
                  </div>

                  <div className="w-full space-y-2 text-xs border-t border-white/10 pt-4">
                    <div className="flex items-center justify-center gap-2 text-slate-300">
                      <Phone className={`w-4 h-4 ${currentTheme.accentColor}`} />
                      <span>{data.phone}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-slate-300">
                      <Mail className={`w-4 h-4 ${currentTheme.accentColor}`} />
                      <span>{data.email}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-slate-300">
                      <MapPin className={`w-4 h-4 ${currentTheme.accentColor}`} />
                      <span className="truncate max-w-sm">{data.address}</span>
                    </div>
                  </div>
                </div>

                {/* PAGE 1: FRONT COVER */}
                <div className={`p-10 flex flex-col justify-between relative overflow-hidden ${currentTheme.bgSecondary}`}>
                  {data.coverImageUrl && (
                    <div 
                      className="absolute inset-0 opacity-25 bg-cover bg-center pointer-events-none"
                      style={{ backgroundImage: `url(${data.coverImageUrl})` }}
                    />
                  )}

                  <div className="relative z-10 flex items-center gap-3.5">
                    {data.logoUrl ? (
                      <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/20 p-2 flex items-center justify-center overflow-hidden shrink-0 shadow-lg">
                        <img src={data.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${currentTheme.gradientBadge} flex items-center justify-center font-black text-lg shadow-lg`}>
                        {data.companyName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className={`text-lg font-black tracking-tight ${currentTheme.textPrimary}`}>
                        {data.companyName}
                      </h3>
                      <p className={`text-xs uppercase tracking-wider ${currentTheme.textSecondary}`}>
                        {data.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 space-y-4 my-auto">
                    <div className="w-12 h-1.5 bg-amber-400 rounded-full" />
                    <h1 className={`text-3xl font-black leading-tight tracking-tight ${currentTheme.textPrimary}`}>
                      {data.headline}
                    </h1>
                    <p className={`text-sm leading-relaxed ${currentTheme.textSecondary}`}>
                      {data.subheadline}
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                    <span className={`font-bold uppercase tracking-wider ${currentTheme.accentColor}`}>
                      Bi-Fold Executive Pamphlet
                    </span>
                    <span className="text-slate-400 font-mono">
                      {new Date().getFullYear()} Edition
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* BI-FOLD: INNER SPREAD (1188px x 840px, A4 Landscape) */}
            <div
              ref={innerSpreadExportRef}
              style={{ width: 1188, height: 840 }}
              className={`select-none flex overflow-hidden border-0 ${currentTheme.bgPrimary}`}
            >
              <div className="w-full h-full grid grid-cols-2 divide-x divide-white/10 relative z-10">
                {/* PAGE 2: ABOUT */}
                <div className={`p-10 flex flex-col justify-between ${currentTheme.bgSecondary}`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2.5">
                      <Briefcase className={`w-5 h-5 ${currentTheme.accentColor}`} />
                      <span className={`text-xs font-bold uppercase tracking-wider ${currentTheme.textPrimary}`}>
                        Company Overview
                      </span>
                    </div>
                    <h3 className={`text-xl font-extrabold ${currentTheme.textPrimary}`}>
                      Leading Innovation & Digital Craftsmanship
                    </h3>
                    <p className={`text-sm leading-relaxed ${currentTheme.textSecondary}`}>
                      {data.aboutText}
                    </p>
                    <div className={`p-4 rounded-2xl ${currentTheme.cardBg}`}>
                      <p className={`text-xs italic leading-relaxed ${currentTheme.textSecondary}`}>
                        &ldquo;{data.missionText}&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-center">
                    <div className={`p-3 rounded-2xl ${currentTheme.cardBg}`}>
                      <p className={`text-lg font-black ${currentTheme.accentColor}`}>{data.stats.stat1Number}</p>
                      <p className="text-xs text-slate-400 truncate">{data.stats.stat1Label}</p>
                    </div>
                    <div className={`p-3 rounded-2xl ${currentTheme.cardBg}`}>
                      <p className={`text-lg font-black ${currentTheme.accentColor}`}>{data.stats.stat2Number}</p>
                      <p className="text-xs text-slate-400 truncate">{data.stats.stat2Label}</p>
                    </div>
                    <div className={`p-3 rounded-2xl ${currentTheme.cardBg}`}>
                      <p className={`text-lg font-black ${currentTheme.accentColor}`}>{data.stats.stat3Number}</p>
                      <p className="text-xs text-slate-400 truncate">{data.stats.stat3Label}</p>
                    </div>
                  </div>
                </div>

                {/* PAGE 3: SERVICES */}
                <div className={`p-10 flex flex-col justify-between ${currentTheme.bgPrimary}`}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold uppercase tracking-wider ${currentTheme.accentColor}`}>
                        Core Services & Pricing
                      </span>
                      <span className="text-xs text-slate-400 font-mono">Custom Delivery</span>
                    </div>

                    <div className="space-y-3">
                      {data.services.map(srv => (
                        <div key={srv.id} className={`p-4 rounded-2xl ${currentTheme.cardBg} space-y-1.5`}>
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-white truncate max-w-xs">
                              {srv.title}
                            </h4>
                            <span className={`text-xs font-bold font-mono px-2.5 py-0.5 rounded bg-amber-500/10 ${currentTheme.accentColor}`}>
                              {srv.price}
                            </span>
                          </div>
                          <p className={`text-xs leading-relaxed ${currentTheme.textSecondary}`}>
                            {srv.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`p-4 rounded-2xl ${currentTheme.accentBg} flex items-center justify-between shadow-lg`}>
                    <div>
                      <p className="text-sm font-black">Ready to Elevate Your Brand?</p>
                      <p className="text-xs opacity-85">Connect for Instant Proposal</p>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-black/25 text-xs font-bold">
                      Chat on WhatsApp
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {selectedFormat === 'flyer-a4' && (
          /* FLYER: A4 PORTRAIT (840px x 1188px) */
          <div
            ref={outerSpreadExportRef}
            style={{ width: 840, height: 1188 }}
            className={`select-none p-10 flex flex-col justify-between border-0 overflow-hidden ${currentTheme.bgPrimary}`}
          >
            {/* TOP HEADER */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-4">
                {data.logoUrl ? (
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/20 p-2 flex items-center justify-center overflow-hidden shrink-0 shadow">
                    <img src={data.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                ) : (
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${currentTheme.gradientBadge} flex items-center justify-center font-black text-lg shadow`}>
                    {data.companyName.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className={`text-lg font-black tracking-tight ${currentTheme.textPrimary}`}>
                    {data.companyName}
                  </h3>
                  <p className={`text-xs uppercase tracking-wider ${currentTheme.textSecondary}`}>
                    {data.tagline}
                  </p>
                </div>
              </div>

              <span className={`text-xs font-bold font-mono px-3 py-1.5 rounded-full bg-white/10 ${currentTheme.accentColor}`}>
                {data.phone}
              </span>
            </div>

            {/* HERO SECTION */}
            <div className="space-y-4 my-4">
              <div className="space-y-2">
                <h1 className={`text-2xl font-black tracking-tight leading-tight ${currentTheme.textPrimary}`}>
                  {data.headline}
                </h1>
                <p className={`text-xs leading-relaxed ${currentTheme.textSecondary}`}>
                  {data.subheadline}
                </p>
              </div>

              {/* Feature Image */}
              <div className="w-full h-56 rounded-2xl overflow-hidden relative shadow-md">
                <img 
                  src={data.coverImageUrl} 
                  alt="Hero" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                  <p className="text-xs font-bold text-white">Delivering World-Class Digital Solutions Across 80+ Brands</p>
                </div>
              </div>
            </div>

            {/* SERVICES GRID */}
            <div className="space-y-3">
              <span className={`text-xs font-bold uppercase tracking-wider ${currentTheme.accentColor}`}>
                Featured Services
              </span>
              <div className="grid grid-cols-3 gap-3">
                {data.services.slice(0, 3).map(srv => (
                  <div key={srv.id} className={`p-4 rounded-2xl ${currentTheme.cardBg} space-y-1`}>
                    <h4 className="text-xs font-bold text-white truncate">{srv.title}</h4>
                    <p className={`text-[10px] line-clamp-3 leading-tight ${currentTheme.textSecondary}`}>{srv.description}</p>
                    <p className={`text-xs font-bold font-mono ${currentTheme.accentColor} pt-1`}>{srv.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* BOTTOM QR & FOOTER */}
            <div className="flex items-center justify-between border-t border-white/10 pt-5">
              <div className="space-y-1 text-xs">
                <p className="font-bold text-white">{data.companyName}</p>
                <p className={currentTheme.textSecondary}>{data.email} • {data.phone}</p>
                <p className="text-slate-400 truncate max-w-sm">{data.address}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white shadow">
                  {qrCodeDataUrl ? (
                    <img 
                      src={qrCodeDataUrl} 
                      alt="Flyer QR" 
                      className="w-16 h-16 object-contain"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-slate-100 flex items-center justify-center text-slate-800 text-[9px] font-mono">
                      QR Code
                    </div>
                  )}
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white">Scan for vCard</p>
                  <p className="text-[10px] text-indigo-400 font-mono">oneclickbiz.in/v/{data.slug}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
