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
  Briefcase,
  UserCheck,
  Globe,
  MessageSquare,
  Calendar,
  Users,
  BarChart3,
  Layers,
  Phone,
  Shield,
  Check
} from 'lucide-react';
import { normalizeCategory } from '@/data/vcardTemplates';

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

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAdminBlocked, setIsAdminBlocked] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !document.getElementById('google-gsi-script')) {
      const script = document.createElement('script');
      script.id = 'google-gsi-script';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setIsAdminBlocked(false);

    const cleanEmail = email.toLowerCase().trim();
    if (cleanEmail === 'admin@oneclickbiz.in') {
      setIsAdminBlocked(true);
      setError('Access Restricted: Platform Super Admin accounts cannot log in through the Business User Portal. Please use the Super Admin Portal at /admin/login.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password, isAdminLogin: false })
      });

      const data = await res.json();

      if (res.status === 403) {
        setIsAdminBlocked(true);
        setError(data.error || 'Access Denied: Super Admin accounts must sign in via /admin/login.');
        setLoading(false);
        return;
      }

      if (res.ok && data.success) {
        const hasPaid = Boolean(data.hasActivePaidPlan);
        const userPlan = hasPaid ? (data.planTier || 'PRO') : 'UNPAID';
        const userStatus = data.subscriptionStatus || (hasPaid ? 'ACTIVE' : 'UNPAID');

        if (typeof window !== 'undefined') {
          const session = {
            fullName: data.user.name || cleanEmail.split('@')[0],
            email: data.user.email,
            businessName: data.user.businessName || `${data.user.name || cleanEmail.split('@')[0]}'s Business`,
            entityType: 'Private Limited / LLC',
            category: data.user.category || normalizeCategory(null, data.user.template || data.user.slug),
            designation: data.user.designation || (data.user.category === 'Interior Design' ? 'Principal Architect & Founder' : (data.user.category === 'Real Estate' ? 'Managing Director & Builder' : 'Founder / Managing Director')),
            phone: '+91 98765 43210',
            slug: data.user.slug || 'card',
            plan: userPlan,
            template: data.user.template || (data.user.slug?.startsWith('re-') ? 're-builders' : 'vcard39'),
            subscriptionStatus: userStatus,
            hasActivePaidPlan: hasPaid,
            isBusinessEntity: true,
            loggedIn: true
          };

          try {
            const keysToRemove: string[] = [];
            for (let i = 0; i < localStorage.length; i++) {
              const k = localStorage.key(i);
              if (k && (k.startsWith('oneclickbiz_custom_profile_') || k === 'oneclickbiz_active_profile' || k === 'oneclickbiz_user_cards')) {
                keysToRemove.push(k);
              }
            }
            keysToRemove.forEach(k => localStorage.removeItem(k));
          } catch (_) {}

          localStorage.setItem('oneclickbiz_user_session', JSON.stringify(session));
          localStorage.setItem('oneclickbiz_user_plan', userPlan);

          if (!hasPaid) {
            window.location.href = `/signup?email=${encodeURIComponent(data.user.email)}&name=${encodeURIComponent(data.user.name || '')}&slug=${encodeURIComponent(data.user.slug || '')}&step=2&unpaid=true`;
          } else {
            window.location.href = redirectTarget;
          }
        }
        return;
      }

      setError(data.error || 'Invalid email or password. Please check your credentials and try again.');
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Unable to connect to authentication server. Please check your internet connection.');
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
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
              setError(tokenResponse.error_description || 'Google sign in was cancelled.');
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

              const hasPaid = Boolean(data.hasActivePaidPlan);
              const userPlan = hasPaid ? (data.planTier || 'PRO') : 'UNPAID';
              const userStatus = data.subscriptionStatus || (hasPaid ? 'ACTIVE' : 'UNPAID');

              if (typeof window !== 'undefined') {
                localStorage.setItem('oneclickbiz_user_session', JSON.stringify({
                  fullName: data.user.name,
                  email: data.user.email,
                  businessName: data.user.businessName || `${data.user.name}'s Business`,
                  entityType: 'Private Limited / LLC',
                  category: data.user.category || normalizeCategory(null, data.user.template || data.user.slug),
                  designation: data.user.designation || (data.user.category === 'Interior Design' ? 'Principal Architect & Founder' : (data.user.category === 'Real Estate' ? 'Managing Director & Builder' : 'Founder / Managing Director')),
                  phone: '+91 98765 43210',
                  slug: data.user.slug || 'card',
                  plan: userPlan,
                  template: data.user.template || (data.user.slug?.startsWith('re-') ? 're-builders' : 'vcard39'),
                  subscriptionStatus: userStatus,
                  hasActivePaidPlan: hasPaid,
                  isBusinessEntity: true,
                  loggedIn: true
                }));
                localStorage.setItem('oneclickbiz_user_plan', userPlan);
              }

              if (!hasPaid) {
                router.push(`/signup?email=${encodeURIComponent(data.user.email)}&name=${encodeURIComponent(data.user.name)}&slug=${encodeURIComponent(data.user.slug || '')}&step=2&unpaid=true`);
              } else {
                router.push(redirectTarget);
              }
            } catch (err: any) {
              setError(err.message || 'Failed to complete Google Sign-In.');
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
      setError('Google Sign-In is initializing. Please try again in a moment.');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4F7FF] via-[#F8FAFF] to-[#EDF2FF] text-[#10183F] flex flex-col justify-between selection:bg-blue-100 selection:text-blue-900">
      
      {/* Top Header */}
      <header className="w-full border-b border-[#E2E8F0]/70 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <img 
              src="/logo-brand.png?v=4" 
              alt="OneClickBiz - Connect | Build | Grow" 
              className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
            />
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#174BFF] transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Website</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Services & Login Card */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6">
            
            {/* Header Titles */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDF3FF] border border-[#C7D7FE] text-[#174BFF] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#174BFF]" />
                <span>All-in-One Business Platform</span>
              </span>

              <p className="lg:hidden text-xs font-bold text-slate-500 mt-1 mb-0.5">Welcome Back 👋</p>
              <h1 className="text-2xl sm:text-4xl lg:text-[40px] font-black text-[#10183F] tracking-tight leading-tight">
                Sign in to <span className="text-[#174BFF]">OneClickBiz</span>
              </h1>
              
              <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-xl font-normal leading-relaxed">
                Access your dashboard, manage your websites, online store, bookings, leads and more.
              </p>
            </div>

            {/* Quick Services Feature Pills (Visible on Desktop & Tablet) */}
            <div className="hidden sm:flex flex-wrap items-center gap-2 pt-1 pb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-[11px] font-semibold border border-blue-200/80">
                <Globe className="w-3 h-3 text-blue-600" />
                <span>Websites</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200/80">
                <MessageSquare className="w-3 h-3 text-emerald-600" />
                <span>WhatsApp Store</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 text-[11px] font-semibold border border-rose-200/80">
                <Calendar className="w-3 h-3 text-rose-600" />
                <span>Bookings</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 text-[11px] font-semibold border border-purple-200/80">
                <Users className="w-3 h-3 text-purple-600" />
                <span>Leads</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-50 text-cyan-700 text-[11px] font-semibold border border-cyan-200/80">
                <BarChart3 className="w-3 h-3 text-cyan-600" />
                <span>Analytics</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-[11px] font-semibold border border-indigo-200/80">
                <Layers className="w-3 h-3 text-indigo-600" />
                <span>More Tools</span>
              </span>
            </div>

            {/* Mobile Visual Preview (Visible only on mobile) */}
            <div className="lg:hidden relative rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white p-3 border border-blue-100 shadow-sm overflow-hidden my-2">
              <img 
                src="/landing/hero-visual-4k.png" 
                alt="OneClickBiz Device Suite" 
                className="w-full max-h-[180px] object-contain mx-auto"
              />
              <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                <span className="px-2 py-0.5 rounded-full bg-white/90 border border-slate-200 text-[10px] font-bold text-slate-700 shadow-2xs">🏥 Healthcare</span>
                <span className="px-2 py-0.5 rounded-full bg-white/90 border border-slate-200 text-[10px] font-bold text-slate-700 shadow-2xs">🏠 Real Estate</span>
                <span className="px-2 py-0.5 rounded-full bg-white/90 border border-slate-200 text-[10px] font-bold text-slate-700 shadow-2xs">🎓 Education</span>
                <span className="px-2 py-0.5 rounded-full bg-white/90 border border-slate-200 text-[10px] font-bold text-slate-700 shadow-2xs">🛍️ Retail</span>
              </div>
            </div>

            {/* Login Glassmorphic Card */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-[0_12px_40px_rgba(23,75,255,0.06)] relative space-y-5">
              
              {/* Login Mode Tabs: Business Login (Active) & Admin Login */}
              <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#F1F5F9] border border-slate-200">
                <button
                  type="button"
                  className="py-2.5 px-3 rounded-xl bg-white text-[#174BFF] font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-default"
                >
                  <Briefcase className="w-3.5 h-3.5 text-[#174BFF]" />
                  <span>Business Login</span>
                </button>
                <Link
                  href="/admin/login"
                  className="py-2.5 px-3 rounded-xl text-slate-600 hover:text-slate-900 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-white/60 transition-all"
                >
                  <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                  <span>Admin Login</span>
                </Link>
              </div>

              {/* Error Banner */}
              {error && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium">{error}</span>
                  </div>
                  {isAdminBlocked && (
                    <div className="pt-2 border-t border-rose-200">
                      <Link
                        href="/admin/login"
                        className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Go to Super Admin Portal (/admin/login)</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Google Workspace Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all shadow-2xs active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                {googleLoading ? (
                  <div className="w-4 h-4 border-2 border-slate-400 border-t-indigo-600 rounded-full animate-spin" />
                ) : (
                  <>
                    <GoogleIcon className="w-4 h-4" />
                    <span>Continue with Google Workspace</span>
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative bg-white px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap select-none">
                  OR SIGN IN WITH EMAIL
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                
                {/* Official Work Email */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Official Work Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@yourbusiness.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#174BFF] transition-all"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#174BFF] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Keep Signed In & Forgot Password */}
                <div className="flex items-center justify-between text-xs pt-0.5">
                  <label className="inline-flex items-center gap-2 cursor-pointer select-none text-slate-600">
                    <input
                      type="checkbox"
                      checked={keepSignedIn}
                      onChange={(e) => setKeepSignedIn(e.target.checked)}
                      className="w-4 h-4 rounded text-[#174BFF] focus:ring-blue-500 border-slate-300 cursor-pointer"
                    />
                    <span>Keep me signed in</span>
                  </label>

                  <Link 
                    href="/forgot-password" 
                    className="font-semibold text-[#174BFF] hover:text-blue-800 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Sign In CTA Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#174BFF] via-[#3568FF] to-[#6035FF] hover:from-[#1340DB] hover:to-[#5028E0] text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Sign In to Business Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Create New Account Button */}
              <div className="pt-2 text-center space-y-2">
                <p className="text-xs text-slate-500">
                  Don't have a business account?
                </p>
                <Link
                  href={`/signup${redirectTarget ? `?redirect=${encodeURIComponent(redirectTarget)}&intent=build_card` : '?intent=build_card'}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#F8FAFF] hover:bg-[#EDF3FF] text-[#174BFF] border border-[#C7D7FE] text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-2xs hover:border-blue-400"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#174BFF]" />
                  <span>Create New Business Account (Sign Up)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Trust Badges Row */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[10px] text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>256-Bit SSL Encrypted</span>
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Instant Cloud Sync</span>
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Secure & Reliable</span>
                </span>
                <span className="text-slate-300">•</span>
                <span>🇮🇳 Made in India</span>
              </div>

            </div>

          </div>

          {/* Right Column: Desktop 3D Device Showcase (Hidden on Mobile) */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-5 flex-col items-center justify-center relative">
            
            {/* Ambient Backlight Glow */}
            <div className="absolute w-[450px] h-[450px] bg-gradient-to-tr from-blue-300/30 via-indigo-200/25 to-pink-200/20 blur-[100px] pointer-events-none -z-10 rounded-full" />

            {/* Doodles / Annotations */}
            <div className="w-full relative">
              
              {/* Handwritten Note Top-Right */}
              <div className="absolute -top-6 right-2 z-20 hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/95 border border-blue-200/80 shadow-md text-xs font-bold text-[#174BFF] rotate-2">
                <span>Your Business Starts Here ✍️</span>
              </div>

              {/* 3D Visual Asset */}
              <div className="relative group">
                <img 
                  src="/landing/hero-visual-4k.png" 
                  alt="OneClickBiz 3D Multi-Device Platform" 
                  className="w-full max-w-[500px] mx-auto object-contain transition-transform duration-500 group-hover:scale-[1.02] drop-shadow-[0_20px_40px_rgba(23,75,255,0.12)]"
                />

                {/* Floating Tags Matching Mockup */}
                <div className="absolute top-12 -left-3 px-3 py-1.5 rounded-full bg-white/95 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-lg flex items-center gap-1.5 animate-bounce [animation-duration:4s]">
                  <span>🏥</span>
                  <span>Healthcare</span>
                </div>

                <div className="absolute top-8 right-6 px-3 py-1.5 rounded-full bg-white/95 border border-blue-200 text-blue-800 text-xs font-bold shadow-lg flex items-center gap-1.5">
                  <span>🎓</span>
                  <span>Education</span>
                </div>

                <div className="absolute bottom-16 -left-4 px-3 py-1.5 rounded-full bg-white/95 border border-rose-200 text-rose-800 text-xs font-bold shadow-lg flex items-center gap-1.5">
                  <span>💇‍♀️</span>
                  <span>Salon & Beauty</span>
                </div>

                <div className="absolute bottom-10 right-2 px-3 py-1.5 rounded-full bg-white/95 border border-indigo-200 text-indigo-800 text-xs font-bold shadow-lg flex items-center gap-1.5">
                  <span>💼</span>
                  <span>Business & Consulting</span>
                </div>
              </div>

              {/* Handwritten Note Bottom */}
              <div className="mt-4 text-center">
                <p className="inline-block text-xs font-bold text-[#174BFF] bg-blue-50/80 px-4 py-1.5 rounded-full border border-blue-200 shadow-2xs">
                  ✨ Build Any Type of Business With OneClickBiz
                </p>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* Universal Footer Bar */}
      <footer className="w-full border-t border-[#E2E8F0] bg-white/80 backdrop-blur-xs py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>© 2026 OneClickBiz. All rights reserved.</p>
          
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link href="/terms" className="hover:text-[#174BFF] transition-colors">Terms of Service</Link>
            <span className="text-slate-300">•</span>
            <Link href="/privacy" className="hover:text-[#174BFF] transition-colors">Privacy Policy</Link>
            <span className="text-slate-300">•</span>
            <Link href="/refund" className="hover:text-[#174BFF] transition-colors">Refund Policy</Link>
            <span className="text-slate-300">•</span>
            <Link href="/contact" className="hover:text-[#174BFF] transition-colors">Contact Support</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-700 text-sm">
        Loading sign in portal...
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
