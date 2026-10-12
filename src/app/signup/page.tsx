'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Sparkles, 
  Lock, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  AlertCircle,
  AlertTriangle,
  Building,
  User,
  Phone,
  CreditCard,
  Check,
  Crown,
  Zap,
  Download,
  Receipt,
  ArrowLeft,
  ChevronRight,
  Shield,
  Smartphone,
  Tag,
  Building2,
  HeartPulse,
  Scale,
  UtensilsCrossed,
  Laptop,
  TrendingUp,
  ShoppingBag,
  Compass,
  GraduationCap,
  Shirt,
  Car,
  Camera,
  Plane,
  Wrench,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { initiateCashfreePayment } from '@/lib/cashfree-client';
import { exportInvoicePDF } from '@/lib/pdf-export';
import { validateAndCalculateCoupon, CouponApplicationResult } from '@/lib/coupons';
import { getTemplateProfile } from '@/data/templatePresets';
import { VCARD_CATEGORY_LIST, VCardCategory, normalizeCategory } from '@/data/vcardTemplates';

function GoogleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#EA4335"
        d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
      />
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
      />
      <path
        fill="#FBBC05"
        d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2s.7 5.5 1.9 7.9l3.7-2.9z"
      />
      <path
        fill="#34A853"
        d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16.5C3.7 20.9 7.5 23.5 12 23.5z"
      />
    </svg>
  );
}

const DEFAULT_PLANS_CONFIG = {
  Basic: {
    id: 'BASIC',
    name: 'Basic Plan',
    price: 999,
    cards: '1 Smart Digital Card',
    domains: 'Standard Subdomain',
    description: 'Essential digital identity card for solo professionals & consultants.',
    features: [
      '1 Interactive Digital Card (/v/handle)',
      '1-Click .VCF Direct Contact Downloader',
      'Dynamic Editable Cloud QR Code',
      'Social Links & Interactive Portfolio',
      'Inbound Lead Capture Form with Alerts',
      'Standard Visitor Analytics Dashboard'
    ]
  },
  Pro: {
    id: 'PRO',
    name: 'Pro Plan',
    price: 1599,
    cards: 'Up to 3 Smart Cards',
    domains: '1 White-Label Custom Domain',
    description: 'Complete commercial suite for multi-service agencies and modern businesses.',
    features: [
      'Up to 3 Smart Digital Identity Cards',
      '1 White-Label Custom Domain CNAME (card.yourdomain.com)',
      'Full Interactive WhatsApp Store Catalog with Direct Checkout',
      'Appointment & Slot Booking Engine with Auto Confirmation',
      'Executive PDF Analytics & Lead Exporting Suite',
      'Leads CRM Pipeline Inbox & Real-Time Sync',
      'Priority WhatsApp & Email Support'
    ]
  },
  Advanced: {
    id: 'ADVANCED',
    name: 'Advanced Plan',
    price: 2199,
    cards: 'Up to 5 Smart Cards',
    domains: '5 White-Label Custom Domains',
    description: 'For corporate teams, serial founders, and high-growth commercial enterprises.',
    features: [
      'Up to 5 Digital Cards & Team Profiles',
      '5 White-Label Custom Domains CNAMEs',
      'Unlimited 4K Video Uploads & High-Speed CDN',
      'Blog Studio & Unlimited Article Publishing',
      '50+ High-Res Portfolio Case Studies with Zoom',
      'Dedicated Account Manager & 24/7 VIP SLA'
    ]
  }
};

const INDUSTRY_OPTIONS = [
  {
    id: 'real-estate',
    category: 'Real Estate' as VCardCategory,
    templateId: 're-builders',
    label: 'Real Estate & Builders',
    badge: '⭐ Flagship Mini-Website',
    desc: 'Builders, Developers, Realtors, Gated Villas, Open Plots & RERA Approvals',
    icon: Building2,
    gradient: 'from-amber-500/10 via-orange-500/10 to-amber-500/5',
    activeBorder: 'border-amber-600 bg-amber-50/90 text-amber-950',
    highlightText: 'Pre-loaded with High-Rise Towers, Gated Villas, Open Plots, TS-RERA Badges, Blueprint Galleries, EMI Calculator, and VIP Site Visit booking.'
  },
  {
    id: 'interior-design',
    category: 'Interior Design' as VCardCategory,
    templateId: 'home-interior',
    label: 'Interior Design & Architecture',
    badge: '✨ Flagship 3D Studio',
    desc: 'Interior Designers, Turnkey Fitouts, Modular Kitchens, Architects & 3D Renderings',
    icon: Compass,
    gradient: 'from-amber-600/10 via-yellow-600/10 to-amber-600/5',
    activeBorder: 'border-amber-600 bg-amber-50/90 text-amber-950',
    highlightText: 'Pre-loaded with 3D Lookbook, Living & Dining transformations, Modular Kitchens, IIID Certification, Cost Estimator, and 10-Yr Warranty guarantees.'
  },
  {
    id: 'fashion',
    category: 'Fashion & Clothing' as VCardCategory,
    templateId: 'fash-boutique',
    label: 'Fashion, Boutiques & Apparel',
    badge: '👗 Couture & Retail',
    desc: 'Designer Boutiques, Silk Sarees, Bespoke Suits, Men & Women Ethnic Wear',
    icon: Shirt,
    gradient: 'from-pink-500/10 via-rose-500/10 to-pink-500/5',
    activeBorder: 'border-pink-600 bg-pink-50/90 text-pink-950',
    highlightText: 'Pre-loaded with Digital Lookbook, Fabric Details, Custom Tailoring Consultations, and 1-Click WhatsApp Catalog Store.'
  },
  {
    id: 'beauty',
    category: 'Beauty & Personal Care' as VCardCategory,
    templateId: 'beauty-salon',
    label: 'Beauty, Salons & Wellness',
    badge: '💄 Salon & Spa',
    desc: 'Luxury Salons, Bridal Makeup Studios, Wellness Spas & Elite Fitness Gyms',
    icon: Sparkles,
    gradient: 'from-purple-500/10 via-pink-500/10 to-purple-500/5',
    activeBorder: 'border-purple-600 bg-purple-50/90 text-purple-950',
    highlightText: 'Pre-loaded with Service Rate Card, Bridal Makeover Portfolio, and Instant Doorstep / Salon Appointment Booking.'
  },
  {
    id: 'food',
    category: 'Food Business' as VCardCategory,
    templateId: 'restaurant-menu',
    label: 'Restaurants & Dining',
    badge: '🍽️ Digital Menu',
    desc: 'Fine Dining, Cafes, Bakeries, Homemade Pickles, Lounges & Cloud Kitchens',
    icon: UtensilsCrossed,
    gradient: 'from-rose-500/10 via-pink-500/10 to-rose-500/5',
    activeBorder: 'border-rose-600 bg-rose-50/90 text-rose-950',
    highlightText: 'Pre-loaded with Interactive WhatsApp Food Menu, Table Reservations & 0% Commission Direct UPI Ordering.'
  },
  {
    id: 'healthcare',
    category: 'Healthcare' as VCardCategory,
    templateId: 'vcard36',
    label: 'Healthcare & Doctors',
    badge: '🏥 OPD & Clinic',
    desc: 'Physicians, Clinics, Dentists, Diagnostics, Physiotherapy & Healthcare Centers',
    icon: HeartPulse,
    gradient: 'from-emerald-500/10 via-teal-500/10 to-emerald-500/5',
    activeBorder: 'border-emerald-600 bg-emerald-50/90 text-emerald-950',
    highlightText: 'Pre-loaded with Doctor OPD Timings, Treatment Packages & Instant Consultation Booking.'
  },
  {
    id: 'automobile',
    category: 'Automobile' as VCardCategory,
    templateId: 'auto-cardeal',
    label: 'Automobile & Garages',
    badge: '🚗 Auto Suite',
    desc: 'Car Dealerships, Bike Showrooms, Multi-Brand Garages & Ceramic Detailing',
    icon: Car,
    gradient: 'from-sky-500/10 via-blue-500/10 to-sky-500/5',
    activeBorder: 'border-sky-600 bg-sky-50/90 text-sky-950',
    highlightText: 'Pre-loaded with Pre-Owned Vehicle Inventory, Test Drive Bookings, and Service Rate Cards.'
  },
  {
    id: 'education',
    category: 'Education' as VCardCategory,
    templateId: 'edu-coaching',
    label: 'Education & Academies',
    badge: '🎓 Academy Hub',
    desc: 'Coaching Institutes, Academies, Tutors, Music Schools & Training Centres',
    icon: GraduationCap,
    gradient: 'from-violet-500/10 via-purple-500/10 to-violet-500/5',
    activeBorder: 'border-violet-600 bg-violet-50/90 text-violet-950',
    highlightText: 'Pre-loaded with Course Curriculum, Demo Class Slots & Student Admissions.'
  },
  {
    id: 'events',
    category: 'Events & Creative' as VCardCategory,
    templateId: 'events-planner',
    label: 'Events, Photography & Studios',
    badge: '📸 Creative Studio',
    desc: 'Wedding Planners, Photographers, Cinematographers, Florists & DJs',
    icon: Camera,
    gradient: 'from-indigo-500/10 via-purple-500/10 to-indigo-500/5',
    activeBorder: 'border-indigo-600 bg-indigo-50/90 text-indigo-950',
    highlightText: 'Pre-loaded with Event Showcase Reels, Photography Portfolios, and Wedding Date Consultation Desk.'
  },
  {
    id: 'legal',
    category: 'Professional Services' as VCardCategory,
    templateId: 'vcard16',
    label: 'Law & Legal Advocates',
    badge: '⚖️ Legal Suite',
    desc: 'High Court Advocates, Corporate Law Firms, Legal Counsel & Notaries',
    icon: Scale,
    gradient: 'from-blue-500/10 via-indigo-500/10 to-blue-500/5',
    activeBorder: 'border-blue-600 bg-blue-50/90 text-blue-950',
    highlightText: 'Pre-loaded with Practice Areas, Retainers, Bar Association Affiliation & Case Queries.'
  },
  {
    id: 'tech',
    category: 'Professional Services' as VCardCategory,
    templateId: 'tech-portfolio',
    label: 'IT, Tech & SaaS Labs',
    badge: '💻 Tech Studio',
    desc: 'Software Companies, AI Labs, SaaS Startups & Developers',
    icon: Laptop,
    gradient: 'from-indigo-500/10 via-purple-500/10 to-indigo-500/5',
    activeBorder: 'border-indigo-600 bg-indigo-50/90 text-indigo-950',
    highlightText: 'Pre-loaded with SaaS Showcase, Tech Stack, Github Stars & Consultation Discovery Calls.'
  },
  {
    id: 'finance',
    category: 'Professional Services' as VCardCategory,
    templateId: 'prof-ca',
    label: 'Finance & CA (Tax)',
    badge: '📊 Financial Suite',
    desc: 'Chartered Accountants, Tax Filers & Wealth Advisory',
    icon: TrendingUp,
    gradient: 'from-teal-500/10 via-cyan-500/10 to-teal-500/5',
    activeBorder: 'border-teal-600 bg-teal-50/90 text-teal-950',
    highlightText: 'Pre-loaded with GST / Income Tax Advisory, Auditing & Portfolio Wealth Desk.'
  },
  {
    id: 'corporate',
    category: 'Professional Services' as VCardCategory,
    templateId: 'vcard43',
    label: 'Executives & Founders',
    badge: '👑 Executive Suite',
    desc: 'Managing Directors, Corporate CXOs & Board Members',
    icon: Crown,
    gradient: 'from-amber-500/10 via-yellow-500/10 to-amber-500/5',
    activeBorder: 'border-amber-600 bg-amber-50/90 text-amber-950',
    highlightText: 'Pre-loaded with Executive Credentials, Media Features, Speaking & Boardroom Profile.'
  },
  {
    id: 'retail',
    category: 'Retail & Local Shops' as VCardCategory,
    templateId: 'ret-electronics',
    label: 'Retail, Supermarkets & Shops',
    badge: '🛍️ WhatsApp Store',
    desc: 'Electronics, Jewelry, Supermarkets, Opticals & Local Retail',
    icon: ShoppingBag,
    gradient: 'from-purple-500/10 via-fuchsia-500/10 to-purple-500/5',
    activeBorder: 'border-purple-600 bg-purple-50/90 text-purple-950',
    highlightText: 'Pre-loaded with WhatsApp Catalog Store, Instant UPI QR Pay & New Arrivals Showcase.'
  },
  {
    id: 'home-services',
    category: 'Home & Professional Services' as VCardCategory,
    templateId: 'home-plumber',
    label: 'Home & Technical Services',
    badge: '🛠️ Emergency Services',
    desc: 'Plumbers, Electricians, AC & HVAC, Pest Control & Home Repair',
    icon: Wrench,
    gradient: 'from-cyan-500/10 via-sky-500/10 to-cyan-500/5',
    activeBorder: 'border-cyan-600 bg-cyan-50/90 text-cyan-950',
    highlightText: 'Pre-loaded with 24/7 Emergency Dialing, Transparent Rate Cards, and Instant Doorstep Visits.'
  },
  {
    id: 'travel',
    category: 'Travel & Hospitality' as VCardCategory,
    templateId: 'trav-agency',
    label: 'Travel, Hospitality & Tourism',
    badge: '✈️ Travel Suite',
    desc: 'Travel Agencies, Luxury Resorts, Hotels, Cabs & Homestays',
    icon: Plane,
    gradient: 'from-teal-500/10 via-emerald-500/10 to-teal-500/5',
    activeBorder: 'border-teal-600 bg-teal-50/90 text-teal-950',
    highlightText: 'Pre-loaded with Tour Packages, Hotel Booking Inquiries, and Airport Taxi Dispatch.'
  }
];

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Query Params
  const paramSlug = searchParams.get('slug') || '';
  const paramTemplate = searchParams.get('template') || '';
  const paramCategory = searchParams.get('category') || '';
  const paramPlan = searchParams.get('plan') || '';
  const paramEmail = searchParams.get('email') || '';
  const paramName = searchParams.get('name') || '';
  const paramStep = searchParams.get('step') || '';
  const paramUnpaid = searchParams.get('unpaid') === 'true';
  const paramCoupon = searchParams.get('coupon') || '';

  const [plans, setPlans] = useState(DEFAULT_PLANS_CONFIG);

  useEffect(() => {
    async function loadDynamicPricing() {
      try {
        const res = await fetch('/api/settings', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data.config) {
            const bPrice = Number(data.config.basicPrice) || 999;
            const pPrice = Number(data.config.proPrice) || 1599;
            const aPrice = Number(data.config.advancedPrice) || 2199;
            setPlans(prev => ({
              Basic: { ...prev.Basic, price: bPrice },
              Pro: { ...prev.Pro, price: pPrice },
              Advanced: { ...prev.Advanced, price: aPrice }
            }));
          }
        }
      } catch (err) {
        console.error('Failed to load dynamic pricing in signup:', err);
      }
    }
    loadDynamicPricing();
  }, []);

  // Plan Selection: Support Basic, Pro, or Advanced from query params (default Pro)
  const normalizedParamPlan = (paramPlan || '').toLowerCase();
  const initialPlan: 'Basic' | 'Pro' | 'Advanced' = 
    normalizedParamPlan === 'basic' ? 'Basic' :
    normalizedParamPlan === 'advanced' ? 'Advanced' : 'Pro';
  const [selectedPlanKey, setSelectedPlanKey] = useState<'Basic' | 'Pro' | 'Advanced'>(initialPlan);
  const activePlan = plans[selectedPlanKey];

  // Wizard Step: 1 = Details & Credentials, 2 = Cashfree Payment Confirmation, 3 = Payment Success
  const [step, setStep] = useState<1 | 2 | 3>(paramStep === '2' || paramUnpaid ? 2 : 1);

  // Industry & Profession Selection
  const initialCategory: VCardCategory = paramCategory 
    ? normalizeCategory(paramCategory, paramTemplate) 
    : (paramTemplate ? normalizeCategory(null, paramTemplate) : 'Real Estate');
  const initialTemplateId = paramTemplate || (
    initialCategory === 'Interior Design' ? 'home-interior' :
    initialCategory === 'Real Estate' ? 're-builders' :
    initialCategory === 'Fashion & Clothing' ? 'fash-boutique' :
    initialCategory === 'Beauty & Personal Care' ? 'beauty-salon' :
    initialCategory === 'Food Business' ? 'restaurant-menu' :
    initialCategory === 'Healthcare' ? 'vcard36' :
    initialCategory === 'Automobile' ? 'auto-cardeal' :
    initialCategory === 'Education' ? 'edu-coaching' :
    initialCategory === 'Events & Creative' ? 'events-planner' :
    initialCategory === 'Retail & Local Shops' ? 'ret-electronics' :
    initialCategory === 'Home & Professional Services' ? 'home-plumber' :
    initialCategory === 'Travel & Hospitality' ? 'trav-agency' :
    'vcard16'
  );

  const [category, setCategory] = useState<VCardCategory>(initialCategory);
  const [templateId, setTemplateId] = useState(initialTemplateId);

  // Form State
  const [fullName, setFullName] = useState(paramName || '');
  const [email, setEmail] = useState(paramEmail || '');
  const [password, setPassword] = useState('google_oauth_auth_2026');
  const [showPassword, setShowPassword] = useState(false);
  const [businessName, setBusinessName] = useState(
    paramName 
      ? (initialCategory === 'Interior Design' ? `${paramName} Studio & Interiors` : initialCategory === 'Real Estate' ? `${paramName} Builders & Realty` : `${paramName}'s Business`)
      : (initialCategory === 'Interior Design' ? 'Luxe Living Interiors & Architecture' : initialCategory === 'Real Estate' ? 'Skyline Builders & Developers' : '')
  );
  const [entityType, setEntityType] = useState('Private Limited / LLC');
  const [phone, setPhone] = useState('');
  const [slug, setSlug] = useState(paramSlug ? paramSlug.toLowerCase() : '');

  // UI / Payment States
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [error, setError] = useState('');
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  // Mandatory Legal Acceptance Checkbox (Terms & Conditions and Privacy Policy)
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);

  // Coupon State
  const [couponInput, setCouponInput] = useState(paramCoupon || '');
  const [appliedCoupon, setAppliedCoupon] = useState<CouponApplicationResult | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Auto-validate coupon when plan, step, or query param changes
  useEffect(() => {
    async function validateCurrentCoupon() {
      const codeToTest = appliedCoupon?.coupon?.code || paramCoupon || couponInput;
      if (!codeToTest) return;

      try {
        const res = await fetch('/api/coupons/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code: codeToTest,
            price: activePlan.price,
            planId: activePlan.id,
            email,
            phone
          })
        });
        const data = await res.json();
        if (res.ok && data.success && data.result) {
          setAppliedCoupon(data.result);
          setCouponError(null);
          return;
        }
      } catch (e) {
        // Fallback to local evaluation
      }

      const localRes = validateAndCalculateCoupon(codeToTest, activePlan.price, activePlan.id, email, phone);
      if (localRes.valid) {
        setAppliedCoupon(localRes);
        setCouponError(null);
      } else if (appliedCoupon) {
        setAppliedCoupon(null);
        setCouponError(localRes.error || null);
      }
    }

    validateCurrentCoupon();
  }, [selectedPlanKey, plans, paramCoupon]);

  const handleApplyCoupon = async (codeToApply?: string) => {
    const code = (codeToApply !== undefined ? codeToApply : couponInput).trim();
    if (!code) {
      setCouponError('Please enter a coupon code.');
      setAppliedCoupon(null);
      return;
    }

    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          price: activePlan.price,
          planId: activePlan.id,
          email,
          phone
        })
      });
      const data = await res.json();
      if (res.ok && data.success && data.result) {
        setAppliedCoupon(data.result);
        setCouponError(null);
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
        return;
      } else if (data.result && !data.result.valid) {
        setAppliedCoupon(null);
        setCouponError(data.result.error || 'Invalid or expired coupon code.');
        return;
      }
    } catch (e) {
      // Fallback
    }

    const localRes = validateAndCalculateCoupon(code, activePlan.price, activePlan.id, email, phone);
    if (localRes.valid) {
      setAppliedCoupon(localRes);
      setCouponError(null);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    } else {
      setAppliedCoupon(null);
      setCouponError(localRes.error || 'Invalid coupon code.');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  // Restore stored session if arriving directly at payment step without query params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedSession = localStorage.getItem('oneclickbiz_user_session');
        if (savedSession) {
          const parsed = JSON.parse(savedSession);
          if (parsed.email && !email) setEmail(parsed.email);
          if (parsed.fullName && !fullName) setFullName(parsed.fullName);
          if (parsed.businessName && !businessName) setBusinessName(parsed.businessName);
          if (parsed.slug && !slug) setSlug(parsed.slug);
          if (parsed.phone && (!phone || phone === '+91 63049 89071')) setPhone(parsed.phone);
        }
      } catch (e) {
        console.error('Failed to parse local session:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (paramSlug && !slug) {
      setSlug(paramSlug.toLowerCase().replace(/[^a-z0-9-]/g, ''));
    }
  }, [paramSlug, slug]);

  const handleNameChange = (val: string) => {
    setFullName(val);
    if (!slug || slug === fullName.toLowerCase().replace(/[^a-z0-9]/g, '-')) {
      if (!paramSlug) {
        setSlug(val.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30));
      }
    }
    if (!businessName) {
      setBusinessName(`${val}'s Business`);
    }
  };

  useEffect(() => {
    // Dynamically inject Google Identity Services script
    if (typeof window !== 'undefined' && !document.getElementById('google-gsi-script')) {
      const script = document.createElement('script');
      script.id = 'google-gsi-script';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  // Google OAuth Handshake -> Moves directly to Step 2 (Cashfree Checkout)
  const handleGoogleSignUp = () => {
    setGoogleLoading(true);
    setError('');

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '786059341452-g7lm4qd6upl759gft7o1ggd9n2as94ne.apps.googleusercontent.com';

    if (typeof window !== 'undefined' && (window as any).google?.accounts?.oauth2) {
      try {
        const client = (window as any).google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: 'email profile openid',
          callback: async (tokenResponse: any) => {
            if (tokenResponse.error) {
              setError(tokenResponse.error_description || 'Google sign up was cancelled.');
              setGoogleLoading(false);
              return;
            }

            try {
              const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ accessToken: tokenResponse.access_token }),
              });

              const data = await res.json();
              if (!res.ok) throw new Error(data.error || 'Google authentication failed');

              setFullName(data.user.name);
              setEmail(data.user.email);
              const generatedBizName = businessName || `${data.user.name}'s Business`;
              const generatedSlug = data.user.slug || data.user.name.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 25);
              
              setBusinessName(generatedBizName);
              setSlug(generatedSlug);
              setPassword('google_oauth_auth_2026');

              if (typeof window !== 'undefined') {
                localStorage.setItem('oneclickbiz_user_session', JSON.stringify({
                  fullName: data.user.name,
                  email: data.user.email,
                  businessName: generatedBizName,
                  entityType,
                  category,
                  designation: category === 'Interior Design' ? 'Principal Architect & Founder' : (category === 'Real Estate' ? 'Managing Director & Builder' : 'Founder / Managing Director'),
                  phone,
                  slug: generatedSlug,
                  plan: activePlan.id,
                  template: templateId,
                  isBusinessEntity: true,
                  loggedIn: true
                }));

                try {
                  const initialCustomProfile = getTemplateProfile(templateId);
                  initialCustomProfile.category = category;
                  initialCustomProfile.templateId = templateId;
                  initialCustomProfile.name = data.user.name;
                  initialCustomProfile.company = generatedBizName;
                  initialCustomProfile.phone = phone;
                  initialCustomProfile.email = data.user.email;
                  initialCustomProfile.slug = generatedSlug;
                  if (phone) {
                    initialCustomProfile.whatsapp = phone.replace(/\D/g, '');
                  }
                  localStorage.setItem(`oneclickbiz_custom_profile_${generatedSlug}`, JSON.stringify(initialCustomProfile));
                  localStorage.setItem('oneclickbiz_active_profile', JSON.stringify(initialCustomProfile));

                  const initialCards = [
                    {
                      id: `card_${generatedSlug}`,
                      slug: generatedSlug,
                      title: `${generatedBizName} vCard`,
                      name: data.user.name,
                      company: generatedBizName,
                      designation: category === 'Interior Design' ? 'Principal Architect & Founder' : (category === 'Real Estate' ? 'Managing Director & Builder' : 'Founder & Managing Director'),
                      templateId: templateId,
                      theme: initialCustomProfile.theme,
                      avatarUrl: initialCustomProfile.avatarUrl,
                      createdAt: new Date().toISOString()
                    }
                  ];
                  localStorage.setItem('oneclickbiz_user_cards', JSON.stringify(initialCards));
                } catch (e) {
                  console.error('Failed to pre-seed profile locally:', e);
                }
              }

              setGoogleLoading(false);
              // Move immediately to Cashfree Payment Step!
              setStep(2);
            } catch (err: any) {
              setError(err.message || 'Failed to complete Google Sign-Up.');
              setGoogleLoading(false);
            }
          },
        });
        client.requestAccessToken({ prompt: 'select_account' });
      } catch (e: any) {
        setError(e.message || 'Error opening Google account selector');
        setGoogleLoading(false);
      }
    } else {
      setError('Google Sign-In is loading, please try again in a moment.');
      setGoogleLoading(false);
    }
  };

  // Step 1 Submission: Validates credentials and advances to Step 2 (Cashfree Checkout)
  const handleProceedToPaymentStep = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim() || !email.trim() || password.length < 6) {
      setError('Please fill in your representative name, valid email, and password (minimum 6 characters).');
      return;
    }

    const cleanSlug = (slug || fullName.toLowerCase().replace(/[^a-z0-9]/g, '-')).toLowerCase();
    const cleanBiz = businessName.trim() || `${fullName}'s Business`;

    try {
      // Register or ensure user exists in PostgreSQL Database
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          email,
          password,
          phone,
          businessName: cleanBiz,
          slug: cleanSlug,
          category,
          templateId
        })
      });

      const data = await res.json();
      // If user already exists (409), that is ok, proceed to payment
      if (!res.ok && res.status !== 409) {
        throw new Error(data.error || 'Failed to initialize business registration');
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('oneclickbiz_user_session', JSON.stringify({
          fullName,
          email,
          businessName: cleanBiz,
          entityType,
          category,
          designation: category === 'Interior Design' ? 'Principal Architect & Founder' : (category === 'Real Estate' ? 'Managing Director & Builder' : 'Founder / Managing Director'),
          phone,
          slug: cleanSlug,
          plan: activePlan.id,
          template: templateId,
          isBusinessEntity: true,
          loggedIn: true
        }));

        try {
          const initialCustomProfile = getTemplateProfile(templateId);
          initialCustomProfile.category = category;
          initialCustomProfile.templateId = templateId;
          initialCustomProfile.name = fullName;
          initialCustomProfile.company = cleanBiz;
          initialCustomProfile.phone = phone;
          initialCustomProfile.email = email;
          initialCustomProfile.slug = cleanSlug;
          if (phone) {
            initialCustomProfile.whatsapp = phone.replace(/\D/g, '');
          }
          localStorage.setItem(`oneclickbiz_custom_profile_${cleanSlug}`, JSON.stringify(initialCustomProfile));
          localStorage.setItem('oneclickbiz_active_profile', JSON.stringify(initialCustomProfile));

          const initialCards = [
            {
              id: `card_${cleanSlug}`,
              slug: cleanSlug,
              title: `${cleanBiz} vCard`,
              name: fullName,
              company: cleanBiz,
              designation: category === 'Interior Design' ? 'Principal Architect & Founder' : (category === 'Real Estate' ? 'Managing Director & Builder' : 'Founder & Managing Director'),
              templateId: templateId,
              theme: initialCustomProfile.theme,
              avatarUrl: initialCustomProfile.avatarUrl,
              createdAt: new Date().toISOString()
            }
          ];
          localStorage.setItem('oneclickbiz_user_cards', JSON.stringify(initialCards));
        } catch (e) {
          console.error('Failed to pre-seed profile locally:', e);
        }
      }

      setStep(2);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error registering account. Please try again.');
    }
  };

  // Step 2 Action: Initiates Cashfree PG Checkout Modal Directly!
  const handleLaunchCashfreePayment = async () => {
    setError('');

    // Strict Legal Gate: Customer must accept Terms and Conditions & Privacy Policy
    if (!agreedToTerms) {
      setTermsError(true);
      setError('You must accept the OneClickBiz Terms & Conditions and Privacy Policy before proceeding to payment.');
      return;
    }

    setIsProcessingPayment(true);

    const finalPayable = appliedCoupon?.valid ? appliedCoupon.finalPrice : activePlan.price;

    try {
      const res = await fetch('/api/payments/cashfree/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: activePlan.id,
          planName: activePlan.name,
          price: activePlan.price,
          couponCode: appliedCoupon?.valid ? appliedCoupon.coupon?.code : undefined,
          customerName: fullName || 'OneClickBiz Customer',
          customerEmail: email || 'billing@oneclickbiz.in',
          customerPhone: phone || '6304989071'
        })
      });

      const data = await res.json();
      if (!res.ok || !data.paymentSessionId) {
        setError(data.error || 'Failed to initialize Cashfree payment gateway.');
        setIsProcessingPayment(false);
        return;
      }

      // Launch Cashfree Checkout Modal
      await initiateCashfreePayment({
        paymentSessionId: data.paymentSessionId,
        mode: (process.env.NEXT_PUBLIC_CASHFREE_ENV as any) || 'production',
        onSuccess: async () => {
          // Verify with Backend Server
          const verifyRes = await fetch('/api/payments/cashfree/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: data.orderId,
              planId: activePlan.id
            })
          });

          const verifyData = await verifyRes.json();
          if (verifyData.isPaid) {
            setCompletedOrder({
              orderId: data.orderId,
              amount: `₹${finalPayable.toLocaleString()}.00`,
              planName: activePlan.name,
              discountApplied: appliedCoupon?.valid ? `₹${appliedCoupon.discountAmount}` : undefined,
              couponCode: appliedCoupon?.valid ? appliedCoupon.coupon?.code : undefined,
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            });

            if (typeof window !== 'undefined') {
              localStorage.setItem('oneclickbiz_user_plan', activePlan.id);
              const savedSession = localStorage.getItem('oneclickbiz_user_session');
              if (savedSession) {
                const parsed = JSON.parse(savedSession);
                parsed.plan = activePlan.id;
                parsed.isPaid = true;
                localStorage.setItem('oneclickbiz_user_session', JSON.stringify(parsed));
              }
            }

            setStep(3);
            setIsProcessingPayment(false);

            confetti({
              particleCount: 150,
              spread: 90,
              origin: { y: 0.6 }
            });
          } else {
            setError('Payment verification pending or incomplete. Please check your bank or retry.');
            setIsProcessingPayment(false);
          }
        },
        onFailure: (err: any) => {
          console.error('Cashfree payment failed or cancelled:', err);
          setError('Payment was not completed or was cancelled. Please try again.');
          setIsProcessingPayment(false);
        },
        onClose: () => {
          setIsProcessingPayment(false);
        }
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Connection error with payment gateway. Please retry.');
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100/95 via-purple-100/80 to-pink-100/90 text-slate-800 flex flex-col justify-center py-10 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[550px] bg-gradient-to-r from-indigo-400/40 via-purple-400/40 to-pink-400/35 blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-gradient-to-l from-emerald-400/30 to-sky-400/30 blur-[130px] pointer-events-none -z-10" />

      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl text-center space-y-3 px-4">
        <Link href="/" className="inline-block group mb-2">
          <img 
            src="/logo-brand.png?v=4" 
            alt="OneClickBiz - Connect | Build | Share" 
            className="h-12 sm:h-14 w-auto max-w-[220px] sm:max-w-[260px] mx-auto object-contain transition-transform group-hover:scale-105 duration-200"
          />
        </Link>

        {/* Live Security Notice Banner */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Live Gateway Active • Instant Activation • Verified GST Invoices</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {step === 1 && 'Select Your Plan & Create Business Account'}
          {step === 2 && 'Complete Annual Subscription via Cashfree PG'}
          {step === 3 && 'Subscription Active & Paid!'}
        </h1>
        
        {/* Stepper Indicator */}
        <div className="flex items-center justify-center gap-2 pt-1 text-xs">
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold shadow-xs ${
            step === 1 ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
          }`}>
            <span>1. Plan & Profile</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold shadow-xs ${
            step === 2 ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
          }`}>
            <span>2. Cashfree Payment (₹{activePlan.price})</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold shadow-xs ${
            step === 3 ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
          }`}>
            <span>3. Studio Access</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-2xl px-4 sm:px-0">
        <div className="bg-white/90 border border-white/90 backdrop-blur-2xl py-7 px-5 sm:px-8 shadow-2xl shadow-indigo-950/10 rounded-3xl space-y-6">
          
          {paramUnpaid && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-200 text-indigo-900 text-xs flex items-start gap-3 shadow-sm">
              <Sparkles className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-bold text-slate-900 text-xs">Annual Plan Activation</p>
                <p className="text-[11px] text-slate-600">
                  Please choose your preferred annual plan below to activate your digital smart card and commercial studio access. You can select between Basic, Pro, or Advanced at any time.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: PLAN SELECTION & CREDENTIALS */}
          {step === 1 && (
            <div className="space-y-5">
              
              {/* Plan Switcher Grid */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Step 1: Choose Subscription Plan
                  </label>
                  <span className="text-[11px] text-indigo-600 font-semibold">Selected: {activePlan.name} (₹{activePlan.price}/yr)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Basic */}
                  <div
                    onClick={() => setSelectedPlanKey('Basic')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-2 relative ${
                      selectedPlanKey === 'Basic'
                        ? 'bg-indigo-50/90 border-2 border-indigo-600 shadow-md text-slate-900'
                        : 'bg-slate-50/80 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase">Basic</span>
                      {selectedPlanKey === 'Basic' && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                    </div>
                    <div>
                      <div className="text-xl font-extrabold text-slate-900">₹{plans.Basic.price}<span className="text-[10px] font-normal text-slate-500">/yr</span></div>
                      <div className="text-[10px] text-slate-500">1 Digital Card</div>
                    </div>
                    <ul className="text-[10px] text-slate-500 space-y-1 pt-1 border-t border-slate-200">
                      <li>• Standard QR Code</li>
                      <li>• Direct VCF Download</li>
                    </ul>
                  </div>

                  {/* Pro (Recommended) */}
                  <div
                    onClick={() => setSelectedPlanKey('Pro')}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all space-y-2 relative ${
                      selectedPlanKey === 'Pro'
                        ? 'bg-gradient-to-b from-indigo-50 to-purple-50 border-indigo-600 shadow-xl shadow-indigo-500/10 text-slate-900'
                        : 'bg-slate-50/80 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-600 to-pink-600 text-[8px] font-extrabold text-white uppercase tracking-wider shadow-xs">
                      ⭐ Recommended
                    </span>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase text-indigo-700">Pro Plan</span>
                      {selectedPlanKey === 'Pro' && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                    </div>
                    <div>
                      <div className="text-xl font-black text-slate-900">₹{plans.Pro.price}<span className="text-[10px] font-normal text-slate-500">/yr</span></div>
                      <div className="text-[10px] text-indigo-700 font-medium">Up to 3 Cards + CNAME</div>
                    </div>
                    <ul className="text-[10px] text-slate-600 space-y-1 pt-1 border-t border-indigo-100">
                      <li>• White-Label Custom Domain</li>
                      <li>• WhatsApp Store + Booking</li>
                    </ul>
                  </div>

                  {/* Advanced */}
                  <div
                    onClick={() => setSelectedPlanKey('Advanced')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-2 relative ${
                      selectedPlanKey === 'Advanced'
                        ? 'bg-rose-50/90 border-2 border-rose-600 shadow-md text-slate-900'
                        : 'bg-slate-50/80 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase text-rose-700">Advanced</span>
                      {selectedPlanKey === 'Advanced' && <CheckCircle2 className="w-4 h-4 text-rose-600" />}
                    </div>
                    <div>
                      <div className="text-xl font-extrabold text-slate-900">₹{plans.Advanced.price}<span className="text-[10px] font-normal text-slate-500">/yr</span></div>
                      <div className="text-[10px] text-slate-500">Up to 5 Cards & Team</div>
                    </div>
                    <ul className="text-[10px] text-slate-500 space-y-1 pt-1 border-t border-slate-200">
                      <li>• 5 White-Label Domains</li>
                      <li>• Video CDN & Blog Studio</li>
                    </ul>
                  </div>

                </div>
              </div>

              {/* Step 2: Profession / Business Industry Selector */}
              <div className="space-y-3 pt-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Step 2: Choose Your Profession / Industry
                  </label>
                  <span className="text-[11px] font-bold text-indigo-800 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200 self-start sm:self-auto">
                    Active Suite: {category}
                  </span>
                </div>

                {/* PROMINENT BUSINESS CATEGORY SELECTION BOX */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50/90 via-purple-50/70 to-sky-50/80 border border-indigo-200/90 shadow-xs space-y-2.5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        <span>Business Category Selection Box</span>
                        <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-indigo-600 text-white">
                          13 Industry Suites
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-normal">
                        Select your business category to instantly unlock your tailored template suite and features:
                      </p>
                    </div>

                    <div className="relative min-w-[260px] sm:min-w-[280px]">
                      <select
                        value={category}
                        onChange={(e) => {
                          const newCat = e.target.value as VCardCategory;
                          setCategory(newCat);
                          const matchOpt = INDUSTRY_OPTIONS.find(i => i.category === newCat);
                          if (matchOpt) {
                            setTemplateId(matchOpt.templateId);
                          }
                          if (!businessName || businessName.includes('Business') || businessName.includes('Builders') || businessName.includes('Interiors')) {
                            if (newCat === 'Real Estate') setBusinessName(fullName ? `${fullName} Builders & Realty` : 'Skyline Builders & Developers');
                            else if (newCat === 'Interior Design') setBusinessName(fullName ? `${fullName} Studio & Interiors` : 'Luxe Living Interiors & Architecture');
                            else setBusinessName(fullName ? `${fullName}'s Business` : '');
                          }
                        }}
                        className="w-full pl-3.5 pr-9 py-2.5 rounded-xl bg-white border-2 border-indigo-300 text-xs font-extrabold text-slate-900 shadow-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 appearance-none cursor-pointer transition-all"
                      >
                        {VCARD_CATEGORY_LIST.map((catItem) => (
                          <option key={catItem.id} value={catItem.id}>
                            {catItem.icon} {catItem.name} Suite
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-indigo-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Category Quick Filter Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-indigo-200/60">
                    <span className="text-[10px] font-bold uppercase text-slate-400 mr-1">Quick Select:</span>
                    {VCARD_CATEGORY_LIST.map((catItem) => {
                      const isActive = category === catItem.id;
                      return (
                        <button
                          key={catItem.id}
                          type="button"
                          onClick={() => {
                            setCategory(catItem.id);
                            const matchOpt = INDUSTRY_OPTIONS.find(i => i.category === catItem.id);
                            if (matchOpt) {
                              setTemplateId(matchOpt.templateId);
                            }
                          }}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer select-none ${
                            isActive
                              ? 'bg-indigo-600 text-white shadow-xs scale-105'
                              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          <span>{catItem.icon}</span>
                          <span>{catItem.name.split(' ')[0]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Grid of Templates for All Industries */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[460px] overflow-y-auto pr-1">
                  {INDUSTRY_OPTIONS.map((ind) => {
                    const isSelected = category === ind.category && (ind.templateId ? templateId === ind.templateId : true);
                    const isCategoryMatch = category === ind.category;
                    const IconComponent = ind.icon;
                    return (
                      <div
                        key={ind.id}
                        onClick={() => {
                          setCategory(ind.category);
                          setTemplateId(ind.templateId);
                          if (!businessName || businessName.includes('Business') || businessName.includes('Builders') || businessName.includes('Interiors')) {
                            if (ind.id === 'real-estate') setBusinessName(fullName ? `${fullName} Builders & Realty` : 'Skyline Builders & Developers');
                            else if (ind.id === 'interior-design') setBusinessName(fullName ? `${fullName} Studio & Interiors` : 'Luxe Living Interiors & Architecture');
                            else setBusinessName(fullName ? `${fullName}'s Business` : '');
                          }
                        }}
                        className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-1.5 relative select-none ${
                          isSelected
                            ? ind.activeBorder + ' shadow-md ring-2 ring-indigo-500/40 scale-[1.01]'
                            : isCategoryMatch
                            ? 'bg-indigo-50/50 border-indigo-200 text-slate-800'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 shadow-xs'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1.5">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                            }`}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold truncate leading-snug">{ind.label}</p>
                              <span className="text-[9px] font-semibold text-slate-500 block truncate">{ind.badge}</span>
                            </div>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500 line-clamp-1 leading-tight">
                          {ind.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Active Studio Highlight Banner */}
                {INDUSTRY_OPTIONS.find(i => i.category === category && (i.templateId ? templateId === i.templateId : true)) && (
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-300 text-amber-950 text-xs flex items-start gap-2.5 shadow-xs animate-in fade-in duration-200">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <p className="font-extrabold text-amber-900 text-xs">
                        {category === 'Real Estate' ? '🏰 Flagship Real Estate Studio Enabled' : category === 'Interior Design' ? '✨ Flagship Interior Design & 3D Studio Enabled' : `✨ ${category} Studio Enabled`}
                      </p>
                      <p className="text-[11px] text-amber-800 leading-relaxed">
                        {INDUSTRY_OPTIONS.find(i => i.category === category && (i.templateId ? templateId === i.templateId : true))?.highlightText}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* One-Click Google Auth */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  disabled={googleLoading}
                  className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-xs flex items-center justify-center gap-3 transition-all shadow-sm active:scale-95 disabled:opacity-50"
                >
                  {googleLoading ? (
                    <div className="w-4 h-4 border-2 border-slate-400 border-t-indigo-600 rounded-full animate-spin" />
                  ) : (
                    <>
                      <GoogleIcon className="w-4 h-4" />
                      <span>Continue with Google Workspace (1-Click & Pay ₹{activePlan.price})</span>
                    </>
                  )}
                </button>
              </div>

              {/* Clean Divider */}
              <div className="relative flex items-center justify-center my-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative bg-white/95 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap select-none">
                  Or enter company details
                </div>
              </div>

              {/* Manual Form */}
              <form onSubmit={handleProceedToPaymentStep} className="space-y-3.5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-700">
                      Representative Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => handleNameChange(e.target.value)}
                        placeholder="e.g. Adduri Sai Kishore"
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50/90 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-700">
                      Official Work Email *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="founder@oneclickbiz.in"
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50/90 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-700">
                      Business / Company Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Building className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="text"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Merlinflow Technologies"
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50/90 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-700">
                      WhatsApp Contact Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50/90 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-slate-700">
                    Account Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full pl-9 pr-9 py-2 rounded-xl bg-slate-50/90 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Slug Handle */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-slate-700">
                    Your Digital Card Handle
                  </label>
                  <div className="flex items-center rounded-xl bg-slate-50/90 border border-slate-200 overflow-hidden focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
                    <span className="px-3 text-slate-500 text-xs font-mono select-none bg-slate-100 border-r border-slate-200 py-2">
                      oneclickbiz.in/v/
                    </span>
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                      placeholder="kishore-patel"
                      className="w-full px-3 py-2 bg-transparent text-slate-900 text-xs font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 text-center px-1">
                  By proceeding, you agree to OneClickBiz{' '}
                  <Link href="/terms" target="_blank" className="text-indigo-600 hover:text-indigo-800 underline font-medium">Terms of Service</Link>
                  {', '}
                  <Link href="/privacy" target="_blank" className="text-indigo-600 hover:text-indigo-800 underline font-medium">Privacy Policy</Link>
                  {' and '}
                  <Link href="/refund" target="_blank" className="text-indigo-600 hover:text-indigo-800 underline font-medium">Refund Policy</Link>.
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                >
                  <span>Proceed to Payment Confirmation (₹{activePlan.price}.00)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </form>

            </div>
          )}

          {/* STEP 2: CASHFREE DIRECT PAYMENT CHECKOUT */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              
              {/* Step 2 Plan Selection Grid: Customer's Choice */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select Your Preferred Plan
                  </label>
                  <span className="text-[11px] text-indigo-600 font-medium">
                    Chosen: <strong className="text-slate-900 font-bold">{activePlan.name}</strong> (₹{activePlan.price}/yr)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Basic Plan */}
                  <div
                    onClick={() => setSelectedPlanKey('Basic')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-2 relative ${
                      selectedPlanKey === 'Basic'
                        ? 'bg-indigo-50 border-2 border-indigo-600 shadow-md text-slate-900'
                        : 'bg-slate-50/80 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Basic</span>
                      {selectedPlanKey === 'Basic' ? (
                        <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                      )}
                    </div>
                    <div>
                      <div className="text-xl font-extrabold text-slate-900">₹{plans.Basic.price}<span className="text-[10px] font-normal text-slate-500">/yr</span></div>
                      <div className="text-[10px] text-slate-500 font-medium">1 Digital Card • Standard QR</div>
                    </div>
                    <div className="text-[10px] text-slate-500 pt-1.5 border-t border-slate-200">
                      Direct VCF Download & Leads
                    </div>
                  </div>

                  {/* Pro Plan (Most Popular) */}
                  <div
                    onClick={() => setSelectedPlanKey('Pro')}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all space-y-2 relative ${
                      selectedPlanKey === 'Pro'
                        ? 'bg-gradient-to-b from-indigo-50 to-purple-50 border-indigo-600 shadow-xl shadow-indigo-500/10 text-slate-900'
                        : 'bg-slate-50/80 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-600 to-pink-600 text-[8px] font-extrabold text-white uppercase tracking-wider shadow-xs whitespace-nowrap">
                      ⭐ Most Popular
                    </span>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Pro</span>
                      {selectedPlanKey === 'Pro' ? (
                        <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                      )}
                    </div>
                    <div>
                      <div className="text-xl font-black text-slate-900">₹{plans.Pro.price}<span className="text-[10px] font-normal text-slate-500">/yr</span></div>
                      <div className="text-[10px] text-indigo-700 font-medium">Up to 3 Cards • Custom Domain</div>
                    </div>
                    <div className="text-[10px] text-slate-600 pt-1.5 border-t border-indigo-100">
                      WhatsApp Store + Lead Engine
                    </div>
                  </div>

                  {/* Advanced Plan */}
                  <div
                    onClick={() => setSelectedPlanKey('Advanced')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-2 relative ${
                      selectedPlanKey === 'Advanced'
                        ? 'bg-rose-50 border-2 border-rose-600 shadow-md text-slate-900'
                        : 'bg-slate-50/80 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-700">Advanced</span>
                      {selectedPlanKey === 'Advanced' ? (
                        <CheckCircle2 className="w-4 h-4 text-rose-600" />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                      )}
                    </div>
                    <div>
                      <div className="text-xl font-extrabold text-slate-900">₹{plans.Advanced.price}<span className="text-[10px] font-normal text-slate-500">/yr</span></div>
                      <div className="text-[10px] text-slate-500 font-medium">Up to 5 Cards • 5 Domains</div>
                    </div>
                    <div className="text-[10px] text-slate-500 pt-1.5 border-t border-slate-200">
                      4K Video CDN & Priority SLA
                    </div>
                  </div>
                </div>
              </div>

              {/* Promo & Coupon Discount Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/70 via-white to-orange-50/50 border border-amber-200 space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
                    <Tag className="w-3.5 h-3.5 text-amber-600" />
                    <span>Have a Promo or Referral Coupon?</span>
                  </div>
                  {appliedCoupon?.valid && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-200 flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-600" />
                      Saved ₹{appliedCoupon.discountAmount}
                    </span>
                  )}
                </div>

                {appliedCoupon?.valid ? (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-xs text-emerald-900">{appliedCoupon.coupon?.code}</span>
                        <span className="text-[10px] text-emerald-700">({appliedCoupon.coupon?.description})</span>
                      </div>
                      <p className="text-[10px] text-emerald-600 mt-0.5 font-semibold">
                        Instant ₹{appliedCoupon.discountAmount} discount applied! Net payable: ₹{appliedCoupon.finalPrice.toLocaleString()}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-[10px] font-bold text-rose-600 hover:text-rose-800 bg-white px-2 py-1 rounded border border-rose-200"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter promo coupon code"
                        value={couponInput}
                        onChange={e => setCouponInput(e.target.value.toUpperCase())}
                        className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 font-mono uppercase placeholder-slate-400 focus:outline-none focus:border-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleApplyCoupon()}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition active:scale-95 shadow-sm"
                      >
                        Apply Code
                      </button>
                    </div>

                    {couponError && (
                      <p className="text-[10px] text-rose-600 font-semibold">{couponError}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Order Breakdown Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center">
                      <Receipt className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{activePlan.name} (Annual Subscription)</h4>
                      <p className="text-[10px] text-slate-500">Account: {email || fullName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {appliedCoupon?.valid ? (
                      <div>
                        <span className="text-lg font-black text-emerald-600">₹{appliedCoupon.finalPrice.toLocaleString()}.00</span>
                        <span className="block text-[10px] text-slate-400 line-through">₹{activePlan.price}.00</span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-lg font-black text-slate-900">₹{activePlan.price}.00</span>
                        <span className="block text-[9px] text-emerald-600 font-bold uppercase">Annual Plan</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>Subscription Term</span>
                    <span className="text-slate-800 font-medium">365 Days Full Commercial Access</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>Business Entity</span>
                    <span className="text-slate-800 font-medium">{businessName || `${fullName}'s Business`}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>Public URL Handle</span>
                    <span className="text-indigo-600 font-mono">oneclickbiz.in/v/{slug || 'card'}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>Plan Price</span>
                    <span className="text-slate-800 font-medium">₹{activePlan.price}.00</span>
                  </div>
                  {appliedCoupon?.valid && (
                    <div className="flex justify-between text-emerald-700 text-[11px] font-semibold">
                      <span>Promo Coupon ({appliedCoupon.coupon?.code})</span>
                      <span>-₹{appliedCoupon.discountAmount}.00</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>GST (18% Included)</span>
                    <span className="text-slate-800 font-medium">
                      ₹{(((appliedCoupon?.valid ? appliedCoupon.finalPrice : activePlan.price) - ((appliedCoupon?.valid ? appliedCoupon.finalPrice : activePlan.price) / 1.18))).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-bold text-xs pt-2 border-t border-slate-200">
                    <span>Total Net Amount Payable</span>
                    <span className="text-emerald-600 text-sm">
                      ₹{(appliedCoupon?.valid ? appliedCoupon.finalPrice : activePlan.price).toLocaleString()}.00
                    </span>
                  </div>
                </div>
              </div>

              {/* Gateway Supported Modes Badge */}
              <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-200 space-y-2">
                <div className="flex items-center gap-2 text-indigo-800 text-xs font-bold">
                  <Shield className="w-4 h-4 text-indigo-600" />
                  <span>Official Cashfree Live Gateway Protection</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  All Indian payment methods enabled: <strong>UPI (GPay, PhonePe, Paytm), Debit/Credit Cards, and NetBanking</strong>.
                </p>
                <div className="flex items-center gap-2 text-[10px] text-slate-600">
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 shadow-xs">⚡ Instant Gateway Verification</span>
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 shadow-xs">🔒 256-Bit SSL Encrypted</span>
                </div>
              </div>

              {/* Mandatory Terms & Conditions + Privacy Policy Consent Checkbox */}
              <div className={`p-4 rounded-2xl border transition-all ${
                termsError && !agreedToTerms
                  ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-200'
                  : agreedToTerms
                  ? 'bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-200/50'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}>
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => {
                      setAgreedToTerms(e.target.checked);
                      if (e.target.checked) setTermsError(false);
                    }}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shrink-0 accent-indigo-600"
                  />
                  <div className="space-y-1">
                    <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                      I have read, understood, and agree to the{' '}
                      <Link 
                        href="/terms" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 underline font-bold"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Terms &amp; Conditions
                      </Link>
                      {' '}and{' '}
                      <Link 
                        href="/privacy" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 underline font-bold"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Privacy Policy
                      </Link>
                      {' '}(Effective Date: Oct 10, 2026).
                    </p>
                    <p className="text-[11px] text-slate-500 leading-normal">
                      By proceeding, I confirm my subscription details and acknowledge that digital services are provisioned electronically upon payment verification.
                    </p>
                    {termsError && !agreedToTerms && (
                      <p className="text-[11px] text-rose-600 font-bold flex items-center gap-1 pt-0.5">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        Please check this box to confirm acceptance before paying.
                      </p>
                    )}
                  </div>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={isProcessingPayment}
                  className="px-4 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer shadow-xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back / Edit Details</span>
                </button>

                <button
                  type="button"
                  onClick={handleLaunchCashfreePayment}
                  disabled={isProcessingPayment || !agreedToTerms}
                  className={`flex-1 py-3.5 px-5 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer ${
                    !agreedToTerms
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-80'
                      : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white shadow-xl shadow-emerald-600/25'
                  }`}
                >
                  {isProcessingPayment ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Opening Cashfree Payment Modal...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>
                        Pay ₹{(appliedCoupon?.valid ? appliedCoupon.finalPrice : activePlan.price).toLocaleString()}.00 via Cashfree PG
                      </span>
                      <ArrowRight className="w-4 h-4 ml-auto" />
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: PAYMENT COMPLETED & SUCCESS */}
          {step === 3 && completedOrder && (
            <div className="space-y-6 text-center py-4 animate-in fade-in duration-300">
              
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xl">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Paid Transaction
                </div>
                <h3 className="text-2xl font-black text-slate-900">Payment Successful & Account Active!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you! Your payment of <strong>{completedOrder.amount}</strong> has been received via Cashfree PG. Your {completedOrder.planName} is now active.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between text-slate-500">
                  <span>Cashfree Order Reference</span>
                  <span className="text-slate-900 font-mono font-bold">{completedOrder.orderId}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Activated Plan</span>
                  <span className="text-emerald-600 font-bold">{completedOrder.planName}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Public Handle</span>
                  <span className="text-indigo-600 font-mono">oneclickbiz.in/v/{slug}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => exportInvoicePDF({
                    invoiceNumber: completedOrder.orderId,
                    date: completedOrder.date,
                    amount: completedOrder.amount,
                    planName: completedOrder.planName,
                    customerName: fullName || 'Valued Client',
                    companyName: businessName || `${fullName}'s Business`
                  })}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Download GST Tax Invoice</span>
                </button>

                <button
                  onClick={() => router.push(`/dashboard/builder?slug=${slug}&template=${templateId}`)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/25 active:scale-95 cursor-pointer"
                >
                  <span>Launch Business Studio Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* Switch to Login & Help */}
          <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
            <div>
              Already have an active account?{' '}
              <Link 
                href="/login" 
                className="text-indigo-600 hover:text-indigo-800 font-bold underline"
              >
                Sign In to Business Portal
              </Link>
            </div>
            <a 
              href="https://wa.me/916304989071?text=Hi%20OneClickBiz%20Support%2C%20I%20need%20help%20with%20registration." 
              target="_blank" 
              rel="noreferrer"
              className="text-emerald-600 hover:text-emerald-700 font-semibold inline-flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>Need Help? Desk (+91 63049 89071)</span>
            </a>
          </div>

          {/* Trust Row */}
          <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-center gap-3 text-[10px] text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Cashfree Verified Merchant</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>256-Bit SSL Encrypted</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <Receipt className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>Instant GST Tax Invoice</span>
            </span>
            <span className="text-slate-300">•</span>
            <span>🇮🇳 Made in India</span>
          </div>

        </div>

        {/* Outer Legal & Company Footer */}
        <div className="mt-6 text-center space-y-3 pb-6">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-600">
            <Link href="/" className="hover:text-indigo-600 transition-colors">← Main Website</Link>
            <span className="text-slate-300">•</span>
            <Link href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link>
            <span className="text-slate-300">•</span>
            <Link href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
            <span className="text-slate-300">•</span>
            <Link href="/refund" className="hover:text-indigo-600 transition-colors">Refund Policy</Link>
            <span className="text-slate-300">•</span>
            <Link href="/shipping" className="hover:text-indigo-600 transition-colors">Shipping Policy</Link>
            <span className="text-slate-300">•</span>
            <Link href="/contact" className="hover:text-indigo-600 transition-colors">Contact Support</Link>
          </div>

          <div className="text-[11px] text-slate-500 space-y-0.5">
            <p>© 2026 OneClickBiz. All rights reserved.</p>
            <p>Developed & Maintained by <span className="text-slate-700 font-medium">Merlinflow Technologies Pvt Ltd</span> • Hyderabad, India</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-700 text-sm">
        Loading business entity portal...
      </div>
    }>
      <SignUpForm />
    </Suspense>
  );
}
