'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Sparkles, 
  Lock, 
  Mail, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  AlertCircle,
  Building,
  User,
  Phone,
  CreditCard,
  Check,
  Crown,
  Zap,
  Download,
  Receipt,
  Search,
  ChevronRight,
  Shield,
  Tag,
  Users,
  ChevronDown,
  ChevronUp,
  Camera,
  Video,
  Globe
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
    displayName: 'Basic',
    price: 999,
    serviceCount: '11 Services Included',
    badge: 'Solo Professionals & Local Shops',
    subtitle: 'Complete commercial business mini-website with integrated WhatsApp store & catalog.',
    photoQuota: '15 HD Photos',
    videoQuota: '1 Direct Local Video',
    domainInfo: 'Free oneclickbiz.in/v/name URL + SSL',
    mandatoryFeatures: [
      'WhatsApp Store (0% Commission Direct Orders)',
      'Social Profiles Hub (Instagram, FB, LinkedIn, Maps)',
      'Instagram Reels & YouTube Embedded Video Player',
      '1 Verified Commercial Business Mini-Website',
    ],
    features: [
      'Mini-Website & WhatsApp Store (0% Commission)',
      'Personal Profile & Product Space Catalog',
      'Customized QR Code (Editable 24x7 without reprint)',
      'Visiting Cards & Downloadable PDF Flyers',
      'Custom Templates & Brand Easy Designing Customizer',
      'Live Profile High-Speed Cloud Hosting (SSL Secured)',
      'Direct App (PWA - 1-Tap Add to Home Screen)',
      'Gallery Space (15 HD Photos & 1 Local Video Upload)',
    ],
    servicesList: [
      'Mini Website',
      'WhatsApp Store',
      'Personal Profile',
      'Product Space',
      'Customized QR Code',
      'Visiting Cards & Flyers',
      'Custom Templates',
      'Easy Designing',
      'Live Profile & Hosting',
      'Direct App (PWA)',
      'Gallery Space (15 Photos/1 Video)',
    ],
  },
  Pro: {
    id: 'PRO',
    name: 'Pro Plan',
    displayName: 'Pro',
    price: 1599,
    serviceCount: '19 Services Total (11 Basic + 8 Growth)',
    badge: 'Multi-Service Studios & Clinics',
    subtitle: 'Commercial mini-website with online appointments, UPI payments, custom domain & CRM.',
    photoQuota: '50 HD Photos',
    videoQuota: '5 Direct Local Videos',
    domainInfo: '1 Custom Domain Connection + Free Cloud SSL',
    mandatoryFeatures: [
      'Advanced WhatsApp Store (Unlimited SKUs, Variants & Cart)',
      'Social Profiles Hub + Clickable HTML Email Signature',
      'Full 4K YouTube Video Hub & Embedded Instagram Feed',
      '1 Verified Commercial Business Mini-Website',
    ],
    features: [
      'All 11 Basic Services Included',
      'Custom Domain Connection (Connect your own domain + Free SSL)',
      'Slot & Appointment Booking Engine',
      'Payment Gateways & Instant UPI QR (GPay, PhonePe, Cards)',
      'Google 5-Star Reviews Booster & Feedback Engine',
      'Customer Leads CRM with 1-Click Excel / CSV Export',
      'Canva & Adobe Banner Creative Sync Studio',
      'HTML Email Signature Generator',
      'E-Commerce Shopping Cart & SKU Variants (Sizes/Colors)',
      'Gallery Space (50 HD Photos & 5 Direct Local Videos)',
    ],
    servicesList: [
      'All 11 Basic Services',
      'Custom Domain & SSL',
      'Slot & Appointment Booking',
      'Payment Gateways & UPI',
      'Google 5-Star Reviews',
      'Lead CRM & Excel Export',
      'Canva & Adobe Studio',
      'HTML Email Signature',
      'E-Commerce Cart & SKUs',
    ],
  },
  Advance: {
    id: 'ADVANCED',
    name: 'Advance Plan',
    displayName: 'Advance',
    price: 2199,
    serviceCount: 'All 24 Services Included',
    badge: 'Enterprises & Multi-Branch Outlets',
    subtitle: 'Full enterprise commercial mini-website with 100% white-label, multi-branch scaling & cockpit CRM.',
    photoQuota: 'Unlimited HD Photos',
    videoQuota: '15 Direct Local 4K Videos',
    domainInfo: 'Up to 5 Custom Domains + 100% White-Label',
    mandatoryFeatures: [
      'Enterprise Multi-Category WhatsApp E-Commerce Store',
      'Omnichannel Social Media Command Hub (All Staff Profiles)',
      'Unlimited High-Bitrate YouTube & Instagram Video Galleries',
      '1 Verified Commercial Business Mini-Website',
    ],
    features: [
      'All 19 Pro Services Included',
      '100% White-Label Rights (Zero OneClickBiz Branding on Website)',
      'Multi-Branch & Locations Scaling Engine (Multi-City Outlets)',
      'Articles & SEO Blog Studio (Rank #1 on Google Search)',
      'Report PDF Extract & Automated GST Invoicing Suite',
      'All-in-One Operations Cockpit CRM (Leads, Revenue, WhatsApp)',
      'Gallery Space (Unlimited HD Photos & 15 Local 4K Videos)',
    ],
    servicesList: [
      'All 19 Pro Services',
      '100% White-Label Rights',
      'Multi-Branch Scaling',
      'SEO Blog & Articles Studio',
      'Report PDF & GST Invoicing',
      'Operations Cockpit CRM',
    ],
  },
};

const ALL_20_CATEGORIES = [
  { id: 'real-estate', name: 'Real Estate', icon: '🏠', image: '/categories/real-estate.png?v=5', defaultTag: 'Real Estate' },
  { id: 'restaurants', name: 'Restaurants & Cafés', icon: '🍽️', image: '/categories/restaurants.png?v=5', defaultTag: 'Food Business' },
  { id: 'salons', name: 'Salons & Beauty', icon: '💇‍♀️', image: '/categories/salons.png?v=5', defaultTag: 'Beauty & Personal Care' },
  { id: 'hospitals', name: 'Hospitals & Clinics', icon: '🏥', image: '/categories/hospitals.png?v=5', defaultTag: 'Healthcare' },
  { id: 'education', name: 'Education & Coaching', icon: '🎓', image: '/categories/education.png?v=5', defaultTag: 'Education' },
  { id: 'retail', name: 'Retail Stores', icon: '🛍️', image: '/categories/retail.png?v=5', defaultTag: 'Retail & Local Shops' },
  { id: 'gyms', name: 'Gyms & Fitness', icon: '💪', image: '/categories/gyms.png?v=5', defaultTag: 'Beauty & Personal Care' },
  { id: 'consultants', name: 'Consultants & Freelancers', icon: '👔', image: '/categories/consultants.png?v=5', defaultTag: 'Professional Services' },
  { id: 'services', name: 'Service Businesses', icon: '🛠️', image: '/categories/services.png?v=5', defaultTag: 'Home & Professional Services' },
  { id: 'automobile', name: 'Automobile', icon: '🚗', image: '/categories/automobile.png?v=5', defaultTag: 'Automobile' },
  { id: 'finance', name: 'Finance & CA', icon: '💰', image: '/categories/finance.png?v=5', defaultTag: 'Professional Services' },
  { id: 'tech', name: 'IT & Tech', icon: '💻', image: '/categories/tech.png?v=5', defaultTag: 'Professional Services' },
  { id: 'law', name: 'Law & Legal', icon: '⚖️', image: '/categories/law.png?v=5', defaultTag: 'Professional Services' },
  { id: 'home-services', name: 'Home Services', icon: '👷', image: '/categories/home-services.png?v=5', defaultTag: 'Home & Professional Services' },
  { id: 'travel', name: 'Travel & Hospitality', icon: '🏖️', image: '/categories/travel.png?v=5', defaultTag: 'Travel & Hospitality' },
  { id: 'manufacturing', name: 'Manufacturing', icon: '🏭', image: '/categories/manufacturing.png?v=5', defaultTag: 'Professional Services' },
  { id: 'beverages', name: 'Food & Beverages', icon: '🍹', image: '/categories/beverages.png?v=5', defaultTag: 'Food Business' },
  { id: 'healthcare', name: 'Healthcare', icon: '🩺', image: '/categories/healthcare.png?v=5', defaultTag: 'Healthcare' },
  { id: 'events', name: 'Events & Studios', icon: '📷', image: '/categories/events.png?v=5', defaultTag: 'Events & Creative' },
  { id: 'other', name: 'Other Businesses', icon: '🏢', image: '/categories/other.png?v=5', defaultTag: 'Professional Services' },
];

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paramStep = searchParams.get('step');
  const paramPlan = searchParams.get('plan');
  const paramEmail = searchParams.get('email');
  const paramName = searchParams.get('name');
  const paramSlug = searchParams.get('slug');
  const paramCategory = searchParams.get('category');
  const paramCoupon = searchParams.get('coupon');

  // Multi-step overall state: 1 = Plan & Profile, 2 = Payment, 3 = Studio Access
  const [step, setStep] = useState<number>(paramStep ? parseInt(paramStep) : 1);
  
  // Mobile sub-step state (1 = Plan, 2 = Category, 3 = Details)
  const [mobileSubStep, setMobileSubStep] = useState<number>(1);

  // Selected plan
  const [selectedPlanKey, setSelectedPlanKey] = useState<'Basic' | 'Pro' | 'Advance'>(() => {
    const p = paramPlan?.toLowerCase();
    if (p === 'basic') return 'Basic';
    if (p === 'advanced' || p === 'advance') return 'Advance';
    return 'Pro';
  });

  const [showCheckoutDetails, setShowCheckoutDetails] = useState<boolean>(false);

  const activePlan = DEFAULT_PLANS_CONFIG[selectedPlanKey];

  // Industry / Category selection
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>(paramCategory || 'Real Estate');
  const [categorySearch, setCategorySearch] = useState<string>('');

  // Form Fields
  const [fullName, setFullName] = useState(paramName || '');
  const [email, setEmail] = useState(paramEmail || '');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [slug, setSlug] = useState(paramSlug ? paramSlug.toLowerCase() : '');

  // Legal Checkbox
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [termsError, setTermsError] = useState(false);

  // UI / Payment States
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [error, setError] = useState('');
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  // Coupon State
  const [couponInput, setCouponInput] = useState(paramCoupon || '');
  const [appliedCoupon, setAppliedCoupon] = useState<CouponApplicationResult | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Auto-generate slug from full name or business name
  const handleNameChange = (val: string) => {
    setFullName(val);
    if (!slug || slug === fullName.toLowerCase().replace(/[^a-z0-9]/g, '')) {
      if (!paramSlug) {
        setSlug(val.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 25));
      }
    }
    if (!businessName) {
      setBusinessName(`${val}'s Business`);
    }
  };

  // Restore stored session if arriving directly at payment step
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
          if (parsed.phone && (!phone || phone === '+91 6304 989 071')) setPhone(parsed.phone);
        }
      } catch (e) {
        console.error('Failed to parse local session:', e);
      }
    }
  }, []);

  // Filtered categories
  const filteredCategories = ALL_20_CATEGORIES.filter(c => 
    c.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  // Coupon evaluation
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
      } catch (e) {}

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
  }, [selectedPlanKey, paramCoupon]);

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
    } catch (e) {}

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

  // Step 1 Submission: Validates credentials and advances to Step 2 (Cashfree Checkout)
  const handleProceedToPaymentStep = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');

    if (!fullName.trim() || !email.trim() || password.length < 6) {
      setError('Please fill in your representative name, valid official work email, and a password (minimum 6 characters).');
      // If on mobile, jump to sub-step 3 so user sees fields
      setMobileSubStep(3);
      return;
    }

    if (!agreedToTerms) {
      setTermsError(true);
      setError('You must agree to the Terms of Service, Privacy Policy and Refund Policy to proceed.');
      return;
    }

    setLoading(true);

    const cleanSlug = (slug || fullName.toLowerCase().replace(/[^a-z0-9]/g, '-')).toLowerCase();
    const cleanBiz = businessName.trim() || `${fullName}'s Business`;

    try {
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
          category: selectedCategoryName,
          templateId: selectedCategoryName === 'Real Estate' ? 're-builders' : 'vcard39'
        })
      });

      const data = await res.json();
      if (!res.ok && res.status !== 409) {
        throw new Error(data.error || 'Failed to initialize business registration');
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('oneclickbiz_user_session', JSON.stringify({
          fullName,
          email,
          businessName: cleanBiz,
          entityType: 'Private Limited / LLC',
          category: selectedCategoryName,
          designation: 'Managing Director & Founder',
          phone,
          slug: cleanSlug,
          plan: activePlan.id,
          template: selectedCategoryName === 'Real Estate' ? 're-builders' : 'vcard39',
          isBusinessEntity: true,
          loggedIn: true
        }));
      }

      setLoading(false);
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error registering account. Please try again.');
      setLoading(false);
    }
  };

  // Step 2 Action: Initiates Cashfree PG Checkout Modal Directly
  const handleLaunchCashfreePayment = async () => {
    setError('');
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
          customerEmail: email || 'support@oneclickbiz.in',
          customerPhone: phone || '6304989071'
        })
      });

      const data = await res.json();
      if (!res.ok || !data.paymentSessionId) {
        setError(data.error || 'Failed to initialize Cashfree payment gateway.');
        setIsProcessingPayment(false);
        return;
      }

      await initiateCashfreePayment({
        paymentSessionId: data.paymentSessionId,
        mode: (process.env.NEXT_PUBLIC_CASHFREE_ENV as any) || 'production',
        onSuccess: async () => {
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
            confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
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

  // Direct simulation fallback for dev/testing
  const handleSimulatePaymentSuccess = () => {
    const finalPayable = appliedCoupon?.valid ? appliedCoupon.finalPrice : activePlan.price;
    setCompletedOrder({
      orderId: `OCB_TEST_${Date.now().toString().slice(-6)}`,
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
    confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4F7FF] via-[#F8FAFF] to-[#EDF2FF] text-[#10183F] flex flex-col justify-between selection:bg-blue-100 selection:text-blue-900 pb-12">
      
      {/* Top Header with Stepper */}
      <header className="w-full border-b border-[#E2E8F0]/70 bg-white/90 backdrop-blur-md sticky top-0 z-30">
        {/* DESKTOP HEADER */}
        <div className="hidden lg:flex max-w-7xl mx-auto px-8 h-18 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2 group">
            <img 
              src="/logo-brand.png?v=4" 
              alt="OneClickBiz - Connect | Build | Grow" 
              className="h-9 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
            />
          </Link>

          {/* Stepper (Desktop) */}
          <div className="flex items-center gap-6 text-sm">
            <div className={`flex items-center gap-2 font-bold ${
              step === 1 ? 'text-[#174BFF]' : 'text-slate-400'
            }`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                step === 1 ? 'bg-[#174BFF] text-white shadow-xs' : 'bg-slate-200 text-slate-600'
              }`}>
                1
              </span>
              <span>Plan & Profile</span>
            </div>

            <div className={`h-0.5 w-8 ${step >= 2 ? 'bg-[#174BFF]' : 'bg-slate-200'}`} />

            <div className={`flex items-center gap-2 font-bold ${
              step === 2 ? 'text-[#174BFF]' : 'text-slate-400'
            }`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                step === 2 ? 'bg-[#174BFF] text-white shadow-xs' : (step > 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600')
              }`}>
                2
              </span>
              <span>Payment</span>
            </div>

            <div className={`h-0.5 w-8 ${step >= 3 ? 'bg-emerald-600' : 'bg-slate-200'}`} />

            <div className={`flex items-center gap-2 font-bold ${
              step === 3 ? 'text-emerald-600' : 'text-slate-400'
            }`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                step === 3 ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-200 text-slate-600'
              }`}>
                3
              </span>
              <span>Studio Access</span>
            </div>
          </div>

          {/* Back to Website */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-[#174BFF] transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Website</span>
          </Link>
        </div>

        {/* MOBILE HEADER (Matches Mobile Mockup Frames 2, 3, 4) */}
        <div className="lg:hidden px-4 pt-3 pb-2.5 space-y-2.5">
          {/* Top Bar: Arrow on Left, Centered Logo */}
          <div className="flex items-center justify-between">
            {mobileSubStep === 1 ? (
              <Link href="/" className="p-1 -ml-1 text-slate-700 hover:text-slate-900">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setMobileSubStep((prev) => Math.max(1, prev - 1))}
                className="p-1 -ml-1 text-slate-700 hover:text-slate-900"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}

            <Link href="/" className="inline-flex items-center">
              <img 
                src="/logo-brand.png?v=4" 
                alt="OneClickBiz - Connect | Build | Grow" 
                className="h-7 w-auto object-contain"
              />
            </Link>

            <div className="w-5" />
          </div>

          {/* Mobile Stepper (Under Logo) */}
          <div className="flex items-center justify-between px-6 pt-1">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black ${
                mobileSubStep >= 1 ? 'bg-[#174BFF] text-white shadow-xs' : 'bg-slate-200 text-slate-600'
              }`}>
                1
              </span>
              <span className={`text-[10px] mt-1 ${
                mobileSubStep === 1 ? 'text-[#174BFF] font-bold' : 'text-slate-400 font-medium'
              }`}>
                Plan & Profile
              </span>
            </div>

            <div className={`flex-1 h-0.5 mx-2 -mt-4 transition-colors ${
              mobileSubStep >= 2 ? 'bg-[#174BFF]' : 'bg-slate-200'
            }`} />

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black ${
                mobileSubStep >= 2 ? 'bg-[#174BFF] text-white shadow-xs' : 'bg-slate-100 text-slate-400 border border-slate-200'
              }`}>
                2
              </span>
              <span className={`text-[10px] mt-1 ${
                mobileSubStep === 2 ? 'text-[#174BFF] font-bold' : 'text-slate-400 font-medium'
              }`}>
                Payment
              </span>
            </div>

            <div className={`flex-1 h-0.5 mx-2 -mt-4 transition-colors ${
              mobileSubStep >= 3 ? 'bg-[#174BFF]' : 'bg-slate-200'
            }`} />

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black ${
                mobileSubStep >= 3 ? 'bg-[#174BFF] text-white shadow-xs' : 'bg-slate-100 text-slate-400 border border-slate-200'
              }`}>
                3
              </span>
              <span className={`text-[10px] mt-1 ${
                mobileSubStep === 3 ? 'text-[#174BFF] font-bold' : 'text-slate-400 font-medium'
              }`}>
                Studio Access
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        
        {/* Error Notification */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5 shadow-xs">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* STEP 1: PLAN SELECTION & PROFILE DETAILS */}
        {step === 1 && (
          <div className="space-y-8">
            
            {/* Top Headline - shown on desktop */}
            <div className="hidden lg:block text-left space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDF3FF] border border-[#C7D7FE] text-[#174BFF] text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#174BFF]" />
                <span>Create Your Business Account</span>
              </span>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#10183F] tracking-tight">
                Select Your Plan & Create Business Account
              </h1>
              
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl font-normal leading-relaxed">
                Join thousands of business owners and get access to mini-website studio, WhatsApp store, bookings, analytics and more.
              </p>
            </div>

            {/* DESKTOP VIEW (All 3 Sections on One Page) */}
            <div className="hidden lg:block space-y-8">
              
              {/* SECTION 1: Choose Subscription Plan */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#174BFF] text-white flex items-center justify-center text-xs font-black">
                      1
                    </span>
                    <h2 className="text-lg font-black text-[#10183F]">Choose Subscription Plan</h2>
                  </div>
                  <span className="text-xs font-bold text-[#174BFF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    Selected: {activePlan.displayName} Plan (₹{activePlan.price.toLocaleString()}/yr)
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  
                  {/* Basic */}
                  <div 
                    onClick={() => setSelectedPlanKey('Basic')}
                    className={`rounded-3xl p-6 border-2 transition-all cursor-pointer flex flex-col justify-between relative ${
                      selectedPlanKey === 'Basic'
                        ? 'border-[#174BFF] bg-white shadow-xl shadow-blue-500/10'
                        : 'border-slate-200 bg-white/70 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
                          <User className="w-5 h-5" />
                        </div>
                        <input 
                          type="radio" 
                          name="plan_desktop" 
                          checked={selectedPlanKey === 'Basic'} 
                          onChange={() => setSelectedPlanKey('Basic')}
                          className="w-5 h-5 text-[#174BFF] cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap mb-1">
                          <h3 className="text-lg font-black text-[#10183F]">Basic</h3>
                          <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#174BFF] border border-blue-200 text-[10px] font-black uppercase">
                            11 Services
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">{DEFAULT_PLANS_CONFIG.Basic.subtitle}</p>
                      </div>

                      <div className="text-2xl font-black text-[#10183F]">
                        ₹999 <span className="text-xs font-normal text-slate-500">/ year</span>
                      </div>

                      {/* Quotas & Mandatory Inclusions */}
                      <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/80 text-[11px] space-y-1">
                        <div className="font-bold text-[#174BFF] flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#174BFF]" />
                          <span>Includes 11 Services &amp; 1 Mini-Website</span>
                        </div>
                        <div className="text-slate-600 flex items-center gap-2">
                          <span>📸 15 HD Photos</span>
                          <span>•</span>
                          <span>🎥 1 Local Video</span>
                        </div>
                      </div>

                      <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100 font-medium">
                        <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" /><span>Mini-Website &amp; WhatsApp Store</span></li>
                        <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" /><span>Personal Profile &amp; Product Space</span></li>
                        <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" /><span>Customized QR Code &amp; Visiting Cards</span></li>
                        <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" /><span>Custom Templates &amp; Easy Designing</span></li>
                        <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" /><span>Live Profile Hosting &amp; Direct App (PWA)</span></li>
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedPlanKey('Basic')}
                      className={`w-full mt-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
                        selectedPlanKey === 'Basic'
                          ? 'bg-[#174BFF] text-white shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {selectedPlanKey === 'Basic' ? 'Selected' : 'Select Basic Plan'}
                    </button>
                  </div>

                  {/* Pro (MOST POPULAR) */}
                  <div 
                    onClick={() => setSelectedPlanKey('Pro')}
                    className={`rounded-3xl p-6 border-2 transition-all cursor-pointer flex flex-col justify-between relative ${
                      selectedPlanKey === 'Pro'
                        ? 'border-[#174BFF] bg-white shadow-2xl shadow-blue-500/15 ring-2 ring-blue-500/20'
                        : 'border-slate-200 bg-white/70 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[#174BFF] to-[#7547F5] text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                      ⭐ MOST POPULAR
                    </span>

                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
                          <Users className="w-5 h-5" />
                        </div>
                        <input 
                          type="radio" 
                          name="plan_desktop" 
                          checked={selectedPlanKey === 'Pro'} 
                          onChange={() => setSelectedPlanKey('Pro')}
                          className="w-5 h-5 text-[#174BFF] cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap mb-1">
                          <h3 className="text-lg font-black text-[#10183F]">Pro</h3>
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black uppercase">
                            19 Services Total
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">{DEFAULT_PLANS_CONFIG.Pro.subtitle}</p>
                      </div>

                      <div className="text-2xl font-black text-[#10183F]">
                        ₹1,599 <span className="text-xs font-normal text-slate-500">/ year</span>
                      </div>

                      {/* Quotas & Mandatory Inclusions */}
                      <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-[11px] space-y-1">
                        <div className="font-bold text-emerald-800 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-emerald-600" />
                          <span>19 Services Total (11 Basic + 8 Growth)</span>
                        </div>
                        <div className="text-slate-600 flex items-center gap-2">
                          <span>📸 50 HD Photos</span>
                          <span>•</span>
                          <span>🎥 5 Local Videos</span>
                        </div>
                      </div>

                      <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100 font-medium">
                        <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" /><span>All 11 Basic Services Included</span></li>
                        <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" /><span>Custom Domain &amp; Free Cloud SSL</span></li>
                        <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" /><span>Slot &amp; Appointment Booking Engine</span></li>
                        <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" /><span>Payment Gateways &amp; Instant UPI QR</span></li>
                        <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" /><span>Google 5-Star Reviews &amp; Leads CRM</span></li>
                        <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" /><span>Canva/Adobe Studio, Signature &amp; Cart</span></li>
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedPlanKey('Pro')}
                      className={`w-full mt-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
                        selectedPlanKey === 'Pro'
                          ? 'bg-gradient-to-r from-[#174BFF] to-[#3568FF] text-white shadow-md'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {selectedPlanKey === 'Pro' ? 'Get Started with Pro →' : 'Choose Pro Plan'}
                    </button>
                  </div>

                  {/* Advance */}
                  <div 
                    onClick={() => setSelectedPlanKey('Advance')}
                    className={`rounded-3xl p-6 border-2 transition-all cursor-pointer flex flex-col justify-between relative ${
                      selectedPlanKey === 'Advance'
                        ? 'border-[#7547F5] bg-white shadow-xl shadow-purple-500/10'
                        : 'border-slate-200 bg-white/70 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#7547F5] flex items-center justify-center font-bold text-lg">
                          <Crown className="w-5 h-5" />
                        </div>
                        <input 
                          type="radio" 
                          name="plan_desktop" 
                          checked={selectedPlanKey === 'Advance'} 
                          onChange={() => setSelectedPlanKey('Advance')}
                          className="w-5 h-5 text-[#7547F5] cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap mb-1">
                          <h3 className="text-lg font-black text-[#10183F]">Advance</h3>
                          <span className="px-2 py-0.5 rounded-md bg-purple-50 text-[#7547F5] border border-purple-200 text-[10px] font-black uppercase">
                            All 24 Services
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">{DEFAULT_PLANS_CONFIG.Advance.subtitle}</p>
                      </div>

                      <div className="text-2xl font-black text-[#10183F]">
                        ₹2,199 <span className="text-xs font-normal text-slate-500">/ year</span>
                      </div>

                      {/* Quotas & Mandatory Inclusions */}
                      <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200/80 text-[11px] space-y-1">
                        <div className="font-bold text-[#7547F5] flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#7547F5]" />
                          <span>All 24 Services Included (Enterprise)</span>
                        </div>
                        <div className="text-slate-600 flex items-center gap-2">
                          <span>📸 Unlimited Photos</span>
                          <span>•</span>
                          <span>🎥 15 4K Videos</span>
                        </div>
                      </div>

                      <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100 font-medium">
                        <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-600 shrink-0 font-bold" /><span>All 19 Pro Services Included</span></li>
                        <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-600 shrink-0 font-bold" /><span>100% White-Label Rights (Zero Branding)</span></li>
                        <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-600 shrink-0 font-bold" /><span>Multi-Branch &amp; Locations Scaling</span></li>
                        <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-600 shrink-0 font-bold" /><span>SEO Blog &amp; Articles Studio (Google #1)</span></li>
                        <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-600 shrink-0 font-bold" /><span>Report PDF Extract &amp; GST Invoicing</span></li>
                        <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-600 shrink-0 font-bold" /><span>Operations Cockpit CRM</span></li>
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedPlanKey('Advance')}
                      className={`w-full mt-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
                        selectedPlanKey === 'Advance'
                          ? 'bg-[#7547F5] text-white shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {selectedPlanKey === 'Advance' ? 'Selected' : 'Choose Advance Plan'}
                    </button>
                  </div>

                </div>
              </div>

              {/* SECTION 2: Choose Your Business Category / Industry */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#174BFF] text-white flex items-center justify-center text-xs font-black">
                      2
                    </span>
                    <h2 className="text-lg font-black text-[#10183F]">Choose Your Business Category / Industry</h2>
                  </div>

                  {/* Search Bar */}
                  <div className="relative w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      placeholder="Search industry..."
                      value={categorySearch}
                      onChange={(e) => setCategorySearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-[#174BFF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {filteredCategories.map((cat) => {
                    const isSelected = selectedCategoryName === cat.name;
                    return (
                      <div
                        key={cat.id}
                        onClick={() => setSelectedCategoryName(cat.name)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                          isSelected
                            ? 'bg-blue-50/90 border-[#174BFF] shadow-sm text-[#174BFF]'
                            : 'bg-white border-slate-200 hover:border-blue-300 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <img 
                            src={cat.image} 
                            alt={cat.name} 
                            className="w-7 h-7 shrink-0 object-contain rounded-md" 
                          />
                          <span className="text-xs font-bold truncate">{cat.name}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                          isSelected ? 'text-[#174BFF] translate-x-0.5' : 'text-slate-300 group-hover:text-slate-500'
                        }`} />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 3: Enter Business Details */}
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#174BFF] text-white flex items-center justify-center text-xs font-black">
                      3
                    </span>
                    <h2 className="text-lg font-black text-[#10183F]">Enter Business Details</h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 pl-8">
                    Tell us about your business to create your account.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                  
                  {/* 2-Column Form Fields */}
                  <div className="grid grid-cols-2 gap-5">
                    
                    {/* Representative Name */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Representative Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => handleNameChange(e.target.value)}
                          placeholder="Your full name"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-[#174BFF] transition-all"
                        />
                      </div>
                    </div>

                    {/* Official Work Email */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Official Work Email <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@yourbusiness.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-[#174BFF] transition-all"
                        />
                      </div>
                    </div>

                    {/* Business / Company Name */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Business / Company Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="Your business name"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-[#174BFF] transition-all"
                        />
                      </div>
                    </div>

                    {/* WhatsApp Contact Number */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        WhatsApp Contact Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative flex">
                        <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-slate-600 text-xs font-semibold">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                          placeholder="98765 43210"
                          maxLength={10}
                          className="w-full px-3.5 py-2.5 rounded-r-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-[#174BFF] transition-all"
                        />
                      </div>
                    </div>

                    {/* Account Password */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Account Password <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Create a strong password"
                          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-[#174BFF] transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Your Business Mini-Website Handle */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Your Mini-Website &amp; Store URL
                      </label>
                      <div className="relative flex">
                        <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-slate-500 text-xs font-mono">
                          oneclickbiz.in/v/
                        </span>
                        <input
                          type="text"
                          value={slug}
                          onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                          placeholder="yourname"
                          className="w-full px-3.5 py-2.5 rounded-r-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono text-[#174BFF] focus:bg-white focus:outline-none focus:border-[#174BFF] transition-all"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Selected Plan Inclusions Summary Card (Desktop) */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-purple-50/70 border border-blue-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#174BFF] text-white flex items-center justify-center font-bold">
                          <Crown className="w-4 h-4 text-amber-300" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-[#10183F]">
                              {activePlan.displayName} Plan Subscription
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-[#174BFF] text-white text-[10px] font-black uppercase">
                              {activePlan.serviceCount}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 font-medium">{activePlan.subtitle}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-black text-[#10183F]">₹{activePlan.price.toLocaleString()}</span>
                        <span className="text-xs text-slate-500"> / year</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-blue-200/60 text-xs">
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-slate-200/70 text-slate-700">
                        <Camera className="w-4 h-4 text-[#174BFF] shrink-0" />
                        <div>
                          <span className="block text-[10px] text-slate-400 font-semibold uppercase">Photo Gallery</span>
                          <span className="font-bold text-slate-800 text-xs">{activePlan.photoQuota}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-slate-200/70 text-slate-700">
                        <Video className="w-4 h-4 text-[#7547F5] shrink-0" />
                        <div>
                          <span className="block text-[10px] text-slate-400 font-semibold uppercase">Local Video Upload</span>
                          <span className="font-bold text-slate-800 text-xs">{activePlan.videoQuota}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-slate-200/70 text-slate-700">
                        <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <span className="block text-[10px] text-slate-400 font-semibold uppercase">Domain &amp; Web</span>
                          <span className="font-bold text-slate-800 text-xs truncate">
                            {activePlan.displayName === 'Basic' ? 'oneclickbiz.in/v/ URL' : (activePlan.displayName === 'Pro' ? '1 Custom Domain' : '5 Custom Domains')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-[11px] text-slate-600 font-medium pt-1">
                      <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> 1 Commercial Mini-Website</span>
                      <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> WhatsApp Store (0% Commission)</span>
                      <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Dynamic Cloud QR Code (Editable 24x7)</span>
                      <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Leads CRM &amp; Inquiries</span>
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="pt-2">
                    <label className="inline-flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 select-none">
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => {
                          setAgreedToTerms(e.target.checked);
                          if (e.target.checked) setTermsError(false);
                        }}
                        className="w-4 h-4 mt-0.5 rounded text-[#174BFF] focus:ring-blue-500 border-slate-300 cursor-pointer"
                      />
                      <span>
                        I agree to the{' '}
                        <Link href="/terms" target="_blank" className="text-[#174BFF] font-semibold hover:underline">Terms of Service</Link>,{' '}
                        <Link href="/privacy" target="_blank" className="text-[#174BFF] font-semibold hover:underline">Privacy Policy</Link> and{' '}
                        <Link href="/refund" target="_blank" className="text-[#174BFF] font-semibold hover:underline">Refund Policy</Link>.
                      </span>
                    </label>
                  </div>

                  {/* Full-width Gradient Button */}
                  <button
                    type="button"
                    onClick={() => handleProceedToPaymentStep()}
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#174BFF] via-[#3568FF] to-[#7547F5] hover:from-[#1340DB] hover:to-[#6533EB] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Proceed to Payment Confirmation (₹{activePlan.price.toLocaleString()}.00)</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  {/* Footer Badges */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Cashfree Verified Merchant</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-blue-600" />
                      <span>256-Bit SSL Encrypted</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Receipt className="w-4 h-4 text-purple-600" />
                      <span>Instant GST Tax Invoice</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span>🇮🇳 Made in India</span>
                    </span>
                  </div>

                </div>
              </div>

            </div>

            {/* MOBILE VIEW (3 Sub-Step Flow) */}
            <div className="lg:hidden space-y-6">
              
              {/* Mobile Sub-Step 1: Select Your Plan */}
              {mobileSubStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-black text-[#10183F]">Select Your Plan</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Choose the plan that fits your business needs.</p>
                  </div>

                  <div className="space-y-3.5">
                    
                    {/* Basic */}
                    <div
                      onClick={() => setSelectedPlanKey('Basic')}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                        selectedPlanKey === 'Basic'
                          ? 'border-[#174BFF] bg-blue-50/40 shadow-md ring-1 ring-[#174BFF]/20'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                            <User className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h3 className="text-base font-black text-[#10183F]">Basic</h3>
                              <span className="px-2 py-0.2 rounded-md bg-blue-50 text-[#174BFF] border border-blue-200 text-[9px] font-black uppercase">
                                11 Services
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{DEFAULT_PLANS_CONFIG.Basic.subtitle}</p>
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="mobile_plan"
                          checked={selectedPlanKey === 'Basic'}
                          onChange={() => setSelectedPlanKey('Basic')}
                          className="w-5 h-5 text-[#174BFF] mt-1 shrink-0"
                        />
                      </div>

                      <div className="mt-2 text-xl font-black text-[#10183F]">
                        ₹999 <span className="text-xs font-normal text-slate-500">/ year</span>
                      </div>

                      {/* Quotas & Inclusions Pill */}
                      <div className="mt-2 p-2 rounded-xl bg-blue-50/80 border border-blue-200 text-[11px] text-slate-700 space-y-0.5">
                        <div className="font-bold text-[#174BFF] flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#174BFF]" />
                          <span>Includes 11 Services &amp; 1 Mini-Website</span>
                        </div>
                        <div className="text-slate-600 font-medium">
                          📸 15 HD Photos • 🎥 1 Local Video
                        </div>
                      </div>

                      <ul className="mt-2 pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-700 font-medium">
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" /><span>Mini-Website &amp; WhatsApp Store</span></li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" /><span>Personal Profile &amp; Product Space</span></li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" /><span>Customized QR Code &amp; Visiting Cards</span></li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" /><span>Custom Templates &amp; Easy Designing</span></li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" /><span>Live Profile Hosting &amp; Direct App (PWA)</span></li>
                      </ul>
                    </div>

                    {/* Pro */}
                    <div
                      onClick={() => setSelectedPlanKey('Pro')}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                        selectedPlanKey === 'Pro'
                          ? 'border-[#174BFF] bg-blue-50/40 shadow-lg ring-2 ring-blue-500/20'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <span className="absolute -top-2.5 left-6 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#174BFF] to-[#7547F5] text-white text-[9px] font-black uppercase tracking-wider">
                        ⭐ MOST POPULAR
                      </span>

                      <div className="flex items-start justify-between pt-1">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                            <Users className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h3 className="text-base font-black text-[#10183F]">Pro</h3>
                              <span className="px-2 py-0.2 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-black uppercase">
                                19 Services Total
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{DEFAULT_PLANS_CONFIG.Pro.subtitle}</p>
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="mobile_plan"
                          checked={selectedPlanKey === 'Pro'}
                          onChange={() => setSelectedPlanKey('Pro')}
                          className="w-5 h-5 text-[#174BFF] mt-1 shrink-0"
                        />
                      </div>

                      <div className="mt-2 text-xl font-black text-[#10183F]">
                        ₹1,599 <span className="text-xs font-normal text-slate-500">/ year</span>
                      </div>

                      {/* Quotas & Inclusions Pill */}
                      <div className="mt-2 p-2 rounded-xl bg-emerald-50/80 border border-emerald-200 text-[11px] text-slate-700 space-y-0.5">
                        <div className="font-bold text-emerald-800 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-emerald-600" />
                          <span>19 Services Total (11 Basic + 8 Growth)</span>
                        </div>
                        <div className="text-slate-600 font-medium">
                          📸 50 HD Photos • 🎥 5 Local Videos
                        </div>
                      </div>

                      <ul className="mt-2 pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-700 font-medium">
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" /><span>All 11 Basic Services Included</span></li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" /><span>Custom Domain &amp; Free Cloud SSL</span></li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" /><span>Slot &amp; Appointment Booking Engine</span></li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" /><span>Payment Gateways &amp; Instant UPI QR</span></li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" /><span>Google 5-Star Reviews &amp; Leads CRM</span></li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" /><span>Canva/Adobe Studio, Signature &amp; Cart</span></li>
                      </ul>
                    </div>

                    {/* Advance */}
                    <div
                      onClick={() => setSelectedPlanKey('Advance')}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                        selectedPlanKey === 'Advance'
                          ? 'border-[#7547F5] bg-purple-50/40 shadow-md ring-1 ring-purple-500/20'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#7547F5] flex items-center justify-center font-bold">
                            <Crown className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h3 className="text-base font-black text-[#10183F]">Advance</h3>
                              <span className="px-2 py-0.2 rounded-md bg-purple-50 text-[#7547F5] border border-purple-200 text-[9px] font-black uppercase">
                                All 24 Services
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{DEFAULT_PLANS_CONFIG.Advance.subtitle}</p>
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="mobile_plan"
                          checked={selectedPlanKey === 'Advance'}
                          onChange={() => setSelectedPlanKey('Advance')}
                          className="w-5 h-5 text-[#7547F5] mt-1 shrink-0"
                        />
                      </div>

                      <div className="mt-2 text-xl font-black text-[#10183F]">
                        ₹2,199 <span className="text-xs font-normal text-slate-500">/ year</span>
                      </div>

                      {/* Quotas & Inclusions Pill */}
                      <div className="mt-2 p-2 rounded-xl bg-purple-50/80 border border-purple-200 text-[11px] text-slate-700 space-y-0.5">
                        <div className="font-bold text-[#7547F5] flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#7547F5]" />
                          <span>All 24 Services Included (Enterprise)</span>
                        </div>
                        <div className="text-slate-600 font-medium">
                          📸 Unlimited Photos • 🎥 15 4K Videos
                        </div>
                      </div>

                      <ul className="mt-2 pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-700 font-medium">
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-600 shrink-0 font-bold" /><span>All 19 Pro Services Included</span></li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-600 shrink-0 font-bold" /><span>100% White-Label Rights (Zero Branding)</span></li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-600 shrink-0 font-bold" /><span>Multi-Branch &amp; Locations Scaling</span></li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-600 shrink-0 font-bold" /><span>SEO Blog &amp; Articles Studio (Google #1)</span></li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-600 shrink-0 font-bold" /><span>Report PDF Extract &amp; GST Invoicing</span></li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-600 shrink-0 font-bold" /><span>Operations Cockpit CRM</span></li>
                      </ul>
                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileSubStep(2);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full mt-4 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#174BFF] to-[#7547F5] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Continue to Business Category</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500 pt-2 font-medium">
                    <span>🛡️ Secure Payment</span>
                    <span>•</span>
                    <span>⚡ No Hidden Charges</span>
                    <span>•</span>
                    <span>⚡ Instant Activation</span>
                  </div>
                </div>
              )}

              {/* Mobile Sub-Step 2: Choose Your Business Category */}
              {mobileSubStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-black text-[#10183F]">Choose Your Business Category</h2>
                      <p className="text-xs text-slate-500 mt-0.5">Select your industry to get a tailored experience.</p>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      placeholder="Search business category..."
                      value={categorySearch}
                      onChange={(e) => setCategorySearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-[#174BFF]"
                    />
                  </div>

                  {/* 2-Column Categories Grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {filteredCategories.map((cat) => {
                      const isSelected = selectedCategoryName === cat.name;
                      return (
                        <div
                          key={cat.id}
                          onClick={() => setSelectedCategoryName(cat.name)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-blue-50 border-[#174BFF] shadow-xs text-[#174BFF]'
                              : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <img 
                              src={cat.image} 
                              alt={cat.name} 
                              className="w-6 h-6 shrink-0 object-contain rounded-md" 
                            />
                            <span className="text-xs font-bold truncate">{cat.name}</span>
                          </div>
                          <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${
                            isSelected ? 'text-[#174BFF]' : 'text-slate-300'
                          }`} />
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileSubStep(3);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#174BFF] to-[#7547F5] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
                    >
                      <span>Continue to Business Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Mobile Sub-Step 3: Enter Business Details */}
              {mobileSubStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-black text-[#10183F]">Enter Business Details</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Tell us about your business to create your account.</p>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4 shadow-sm">
                    
                    {/* Representative Name */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Representative Name *</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => handleNameChange(e.target.value)}
                          placeholder="Your full name"
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:outline-none focus:border-[#174BFF]"
                        />
                      </div>
                    </div>

                    {/* Official Work Email */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Official Work Email *</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@yourbusiness.com"
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:outline-none focus:border-[#174BFF]"
                        />
                      </div>
                    </div>

                    {/* Business Name */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Business / Company Name *</label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="Your business name"
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:outline-none focus:border-[#174BFF]"
                        />
                      </div>
                    </div>

                    {/* WhatsApp Contact Number */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">WhatsApp Contact Number *</label>
                      <div className="relative flex">
                        <span className="inline-flex items-center px-2.5 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-slate-600 text-xs font-semibold">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                          placeholder="98765 43210"
                          maxLength={10}
                          className="w-full px-3 py-2 rounded-r-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:outline-none focus:border-[#174BFF]"
                        />
                      </div>
                    </div>

                    {/* Account Password */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Account Password *</label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Create a strong password"
                          className="w-full pl-9 pr-9 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:outline-none focus:border-[#174BFF]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                        >
                          {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Mini-Website Handle */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Your Mini-Website &amp; Store URL</label>
                      <div className="relative flex">
                        <span className="inline-flex items-center px-2.5 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-slate-500 text-[11px] font-mono">
                          oneclickbiz.in/v/
                        </span>
                        <input
                          type="text"
                          value={slug}
                          onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                          placeholder="yourname"
                          className="w-full px-3 py-2 rounded-r-xl bg-slate-50 border border-slate-200 text-xs font-mono text-[#174BFF] focus:bg-white focus:outline-none focus:border-[#174BFF]"
                        />
                      </div>
                    </div>

                    {/* Terms Checkbox */}
                    <label className="inline-flex items-start gap-2 cursor-pointer text-[11px] text-slate-600 select-none pt-1">
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="w-3.5 h-3.5 mt-0.5 rounded text-[#174BFF]"
                      />
                      <span>
                        I agree to the <Link href="/terms" target="_blank" className="text-[#174BFF] underline">Terms</Link>, <Link href="/privacy" target="_blank" className="text-[#174BFF] underline">Privacy</Link> and <Link href="/refund" target="_blank" className="text-[#174BFF] underline">Refund Policy</Link>.
                      </span>
                    </label>

                    {/* Plan Summary Box with Quotas & Inclusions */}
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-amber-50/80 border border-amber-200/90 space-y-2.5">
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-amber-100/90 text-amber-700 flex items-center justify-center shrink-0">
                          <Crown className="w-4 h-4 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="text-xs font-black text-amber-950">
                              {activePlan.displayName} Plan
                            </h4>
                            <span className="px-1.5 py-0.2 rounded bg-amber-200/80 text-amber-900 text-[9px] font-black uppercase">
                              {activePlan.serviceCount}
                            </span>
                          </div>
                          <p className="text-[10px] text-amber-800 font-semibold">
                            ₹{activePlan.price.toLocaleString()}/year • Commercial Subscription
                          </p>
                        </div>
                      </div>

                      {/* Quotas grid */}
                      <div className="grid grid-cols-2 gap-1.5 text-[10px] bg-white/80 p-2 rounded-xl border border-amber-200/60 font-semibold text-slate-700">
                        <div className="flex items-center gap-1.5">
                          <Camera className="w-3.5 h-3.5 text-[#174BFF] shrink-0" />
                          <span>📸 {activePlan.photoQuota}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Video className="w-3.5 h-3.5 text-[#7547F5] shrink-0" />
                          <span>🎬 {activePlan.videoQuota}</span>
                        </div>
                      </div>
                      
                      <ul className="space-y-1 pt-1 text-[11px] text-slate-700 font-medium border-t border-amber-200/50">
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 font-bold shrink-0" />
                          <span>1 Commercial Mini-Website &amp; WhatsApp Store</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 font-bold shrink-0" />
                          <span>{activePlan.domainInfo}</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 font-bold shrink-0" />
                          <span>Dynamic 24x7 Editable Cloud QR &amp; Leads CRM</span>
                        </li>
                      </ul>
                    </div>

                    {/* Full-width Proceed to Payment CTA */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => handleProceedToPaymentStep()}
                        disabled={loading}
                        className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#174BFF] via-[#7547F5] to-[#D926A9] hover:opacity-95 text-white font-bold text-xs shadow-md shadow-purple-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                      >
                        {loading ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>Proceed to Payment (₹{activePlan.price.toLocaleString()}.00)</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Trust Badges under CTA */}
                    <div className="flex items-center justify-center gap-3 text-[10px] text-slate-500 pt-1 font-medium">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Cashfree Verified Merchant</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Lock className="w-3 h-3 text-blue-600" />
                        <span>256-Bit SSL Encrypted</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Receipt className="w-3 h-3 text-purple-600" />
                        <span>Instant GST Invoice</span>
                      </span>
                    </div>

                  </div>
                </div>
              )}

            </div>

          </div>
        )}

        {/* STEP 2: CASHFREE DIRECT PAYMENT CHECKOUT */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto space-y-6">
            
            <div className="text-center space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#174BFF] text-xs font-bold uppercase tracking-wider">
                Step 2 of 3: Instant PG Checkout
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#10183F]">
                Complete Annual Subscription via Cashfree PG
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                100% Secure 256-Bit SSL Encrypted Indian Payment Gateway
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-6">
              
              {/* Plan Switcher */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {(['Basic', 'Pro', 'Advance'] as const).map((key) => {
                  const p = DEFAULT_PLANS_CONFIG[key];
                  const isSel = selectedPlanKey === key;
                  return (
                    <div
                      key={key}
                      onClick={() => setSelectedPlanKey(key)}
                      className={`p-3 rounded-2xl border-2 transition-all cursor-pointer text-center relative ${
                        isSel 
                          ? 'border-[#174BFF] bg-blue-50/70 shadow-sm ring-1 ring-blue-500/20' 
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      {key === 'Pro' && (
                        <span className="hidden sm:inline-block absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.2 rounded-full bg-[#174BFF] text-white text-[8px] font-black uppercase tracking-wider">
                          POPULAR
                        </span>
                      )}
                      <p className="text-xs font-bold text-slate-800">{p.displayName}</p>
                      <p className="text-base font-black text-[#10183F] mt-0.5">₹{p.price.toLocaleString()}</p>
                      <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 text-[9px] font-bold">
                        {key === 'Basic' ? '11 Services' : (key === 'Pro' ? '19 Services' : 'All 24 Services')}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* SELECTED PLAN INCLUSIONS & QUOTAS WHILE BUYING (Visible on Mobile & Desktop) */}
              <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-[#F8FAFF] via-white to-blue-50/40 border-2 border-blue-200/90 shadow-sm space-y-4">
                
                {/* Header with Title and Dynamic Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#174BFF] to-[#7547F5] text-white flex items-center justify-center font-black shadow-xs shrink-0">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm sm:text-base font-black text-[#10183F]">
                          {activePlan.displayName} Plan Inclusions
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#174BFF] text-white text-[10px] font-black uppercase tracking-wide">
                          {activePlan.serviceCount}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{activePlan.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200 self-start sm:self-auto font-bold shadow-2xs">
                    <span>Yearly Billing:</span>
                    <span className="text-sm font-black text-[#174BFF]">₹{activePlan.price.toLocaleString()}</span>
                  </div>
                </div>

                {/* Quota Highlights Bar (Mobile & Desktop Responsive Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Photo Quota */}
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200/80 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#174BFF] flex items-center justify-center shrink-0">
                      <Camera className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Photo Gallery</p>
                      <p className="text-xs font-black text-slate-900">{activePlan.photoQuota}</p>
                      <p className="text-[10px] text-slate-500">Upload from local device</p>
                    </div>
                  </div>

                  {/* Video Quota */}
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200/80 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#7547F5] flex items-center justify-center shrink-0">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Local Video Upload</p>
                      <p className="text-xs font-black text-slate-900">{activePlan.videoQuota}</p>
                      <p className="text-[10px] text-slate-500">Upload directly from device</p>
                    </div>
                  </div>

                  {/* Domain Spec */}
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200/80 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Domain &amp; Web</p>
                      <p className="text-xs font-black text-slate-900 truncate">
                        {activePlan.displayName === 'Basic' ? 'oneclickbiz.in/v/ URL' : (activePlan.displayName === 'Pro' ? '1 Custom Domain' : '5 Custom Domains')}
                      </p>
                      <p className="text-[10px] text-slate-500">{activePlan.displayName === 'Advance' ? '100% White-Label' : 'Free SSL Included'}</p>
                    </div>
                  </div>
                </div>

                {/* Core Commercial Mini-Website Features */}
                <div className="p-3 sm:p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200/70 space-y-1.5 text-xs text-slate-700">
                  <div className="font-bold text-[#174BFF] flex items-center gap-1.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#174BFF] shrink-0" />
                    <span>Included With Every Subscription:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-slate-600 font-medium text-[11px] sm:text-xs">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 font-bold shrink-0" />
                      <span>1 Commercial Business Mini-Website</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 font-bold shrink-0" />
                      <span>WhatsApp Store (0% Commission)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 font-bold shrink-0" />
                      <span>Dynamic Cloud QR Code (Editable 24x7)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 font-bold shrink-0" />
                      <span>Direct PWA Mobile App &amp; Leads CRM</span>
                    </div>
                  </div>
                </div>

                {/* Expandable All Services Breakdown */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowCheckoutDetails(!showCheckoutDetails)}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 transition text-xs font-bold text-slate-800 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span>{showCheckoutDetails ? 'Hide' : 'View'} All {activePlan.servicesList.length} Included Business Services for {activePlan.displayName}</span>
                      <span className="text-[10px] text-slate-500 font-normal">({activePlan.serviceCount})</span>
                    </span>
                    {showCheckoutDetails ? (
                      <ChevronUp className="w-4 h-4 text-slate-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-600" />
                    )}
                  </button>

                  {showCheckoutDetails && (
                    <div className="mt-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 space-y-3 animate-in fade-in duration-200">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {activePlan.servicesList.map((srv, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-800 font-medium">
                            <Check className="w-3.5 h-3.5 text-emerald-600 font-bold shrink-0" />
                            <span className="truncate">{srv}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tier Upgrade Tip */}
                      {selectedPlanKey === 'Basic' && (
                        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 flex items-center justify-between">
                          <span>Need 50 photos, 5 videos, custom domain &amp; appointment booking?</span>
                          <button
                            type="button"
                            onClick={() => setSelectedPlanKey('Pro')}
                            className="font-bold text-[#174BFF] underline hover:text-blue-800 ml-2 shrink-0 cursor-pointer"
                          >
                            Switch to Pro (₹1,599)
                          </button>
                        </div>
                      )}
                      {selectedPlanKey === 'Pro' && (
                        <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-[11px] text-purple-900 flex items-center justify-between">
                          <span>Need Unlimited photos, 15 videos, multi-branch &amp; 100% white-label?</span>
                          <button
                            type="button"
                            onClick={() => setSelectedPlanKey('Advance')}
                            className="font-bold text-[#7547F5] underline hover:text-purple-800 ml-2 shrink-0 cursor-pointer"
                          >
                            Switch to Advance (₹2,199)
                          </button>
                        </div>
                      )}
                      {selectedPlanKey === 'Advance' && (
                        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-medium">
                          ⭐ You have chosen the maximum tier with all 24 services, 100% white-label and free Smart NFC Acrylic Standee!
                        </div>
                      )}
                    </div>
                  )}
                </div>

              </div>

              {/* Promo Coupon Box */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
                    <Tag className="w-4 h-4 text-amber-600" />
                    <span>Have a Promo or Referral Coupon?</span>
                  </div>
                  {appliedCoupon?.valid && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                      Saved ₹{appliedCoupon.discountAmount}
                    </span>
                  )}
                </div>

                {appliedCoupon?.valid ? (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-emerald-900">{appliedCoupon.coupon?.code}</span>
                        <span className="text-[10px] text-emerald-700">({appliedCoupon.coupon?.description})</span>
                      </div>
                      <p className="text-[10px] text-emerald-600 mt-0.5 font-semibold">
                        Instant ₹{appliedCoupon.discountAmount} discount applied!
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-[10px] font-bold text-rose-600 hover:text-rose-800 bg-white px-2.5 py-1 rounded border border-rose-200 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter coupon code (e.g. SAVE20)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono uppercase focus:outline-none focus:border-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleApplyCoupon()}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition active:scale-95 cursor-pointer"
                      >
                        Apply Code
                      </button>
                    </div>
                    {couponError && <p className="text-[11px] text-rose-600 font-semibold">{couponError}</p>}
                  </div>
                )}
              </div>

              {/* Order Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-slate-900">{activePlan.name}</h4>
                      <span className="px-1.5 py-0.2 rounded bg-blue-100 text-[#174BFF] text-[9px] font-bold">
                        {activePlan.serviceCount}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500">
                      📸 {activePlan.photoQuota} • 🎬 {activePlan.videoQuota} • Account: {email || fullName || 'Business Account'}
                    </p>
                  </div>
                  <div className="text-right">
                    {appliedCoupon?.valid ? (
                      <div>
                        <span className="text-lg font-black text-emerald-600">₹{appliedCoupon.finalPrice.toLocaleString()}.00</span>
                        <span className="block text-[10px] text-slate-400 line-through">₹{activePlan.price}.00</span>
                      </div>
                    ) : (
                      <span className="text-lg font-black text-slate-900">₹{activePlan.price.toLocaleString()}.00</span>
                    )}
                  </div>
                </div>

                <div className="space-y-1 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Base Subscription</span>
                    <span>₹{activePlan.price.toLocaleString()}.00</span>
                  </div>
                  {appliedCoupon?.valid && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Promo Discount</span>
                      <span>-₹{appliedCoupon.discountAmount}.00</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>18% GST (Tax Inclusive)</span>
                    <span>₹0.00 (Inclusive)</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 font-black text-slate-900 text-sm">
                    <span>Total Amount Payable</span>
                    <span className="text-[#174BFF]">
                      ₹{(appliedCoupon?.valid ? appliedCoupon.finalPrice : activePlan.price).toLocaleString()}.00
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleLaunchCashfreePayment}
                  disabled={isProcessingPayment}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                >
                  {isProcessingPayment ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      <span>Pay ₹{(appliedCoupon?.valid ? appliedCoupon.finalPrice : activePlan.price).toLocaleString()}.00 via Cashfree PG</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Direct Simulation Button (Resilience / Test Mode) */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to edit details</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSimulatePaymentSuccess}
                    className="text-[11px] font-semibold text-slate-400 hover:text-slate-600 underline"
                  >
                    Simulate Test Payment
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* STEP 3: STUDIO ACCESS (PAYMENT CONFIRMATION) */}
        {step === 3 && completedOrder && (
          <div className="max-w-xl mx-auto space-y-6 text-center animate-in fade-in duration-300">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1.5">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                Subscription Active & Paid!
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#10183F]">
                Welcome to OneClickBiz Studio!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Your annual business account has been initialized and activated.
              </p>
            </div>

            {/* Receipt Box */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 text-left space-y-4 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs text-slate-500 font-medium">Order ID</span>
                <span className="text-xs font-mono font-bold text-slate-800">{completedOrder.orderId}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs text-slate-500 font-medium">Plan Activated</span>
                <span className="text-xs font-bold text-slate-800">{completedOrder.planName}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs text-slate-500 font-medium">Amount Paid</span>
                <span className="text-base font-black text-emerald-600">{completedOrder.amount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Payment Date</span>
                <span className="text-xs text-slate-700">{completedOrder.date}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Link
                href="/dashboard"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#174BFF] to-[#7547F5] text-white font-black text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] transition-all"
              >
                <span>Enter Studio Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  try {
                    exportInvoicePDF({
                      invoiceNumber: completedOrder.orderId,
                      date: completedOrder.date,
                      customerName: fullName || 'Valued Business Partner',
                      companyName: businessName || `${fullName}'s Business`,
                      planName: completedOrder.planName,
                      amount: completedOrder.amount,
                    });
                  } catch (e) {
                    window.print();
                  }
                }}
                className="w-full py-3 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>Download Official GST Tax Invoice (PDF)</span>
              </button>
            </div>

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#E2E8F0] bg-white/80 backdrop-blur-xs py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>© 2026 OneClickBiz. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link href="/terms" className="hover:text-[#174BFF]">Terms of Service</Link>
            <span className="text-slate-300">•</span>
            <Link href="/privacy" className="hover:text-[#174BFF]">Privacy Policy</Link>
            <span className="text-slate-300">•</span>
            <Link href="/refund" className="hover:text-[#174BFF]">Refund Policy</Link>
            <span className="text-slate-300">•</span>
            <Link href="/contact" className="hover:text-[#174BFF]">Contact Support</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-700 text-sm">
        Loading business registration portal...
      </div>
    }>
      <SignupForm />
    </Suspense>
  );
}
