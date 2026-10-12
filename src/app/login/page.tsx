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
  Building,
  UserPlus,
  Phone,
  Shield
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
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

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

  const [isAdminBlocked, setIsAdminBlocked] = useState(false);

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
      // 1. Attempt backend database authentication & set HTTP-only cookie
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

          // Clean up any stale profile caches from previous accounts on this machine
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

              // STRICT POLICY: If user has not paid for an annual plan, DO NOT open active profile/dashboard!
              // Redirect immediately to payment confirmation via Cashfree.
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

  const handleQuickDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100/95 via-purple-100/80 to-pink-100/90 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-y-auto">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-gradient-to-r from-indigo-400/40 via-purple-400/40 to-pink-400/35 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-gradient-to-l from-emerald-400/30 to-sky-400/30 blur-[130px] pointer-events-none -z-10" />

      {/* Header / Brand */}
      <div className="w-full max-w-md text-center space-y-3 mb-6">
        <Link href="/" className="inline-block group mb-1">
          <img 
            src="/logo-brand.png?v=2" 
            alt="OneClickBiz - Connect | Build | Grow" 
            className="h-12 sm:h-14 w-auto max-w-[220px] sm:max-w-[260px] mx-auto object-contain transition-transform group-hover:scale-105 duration-200"
          />
        </Link>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-[11px] font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Enterprise Smart Card & WhatsApp Studio</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Sign In as Business Entity
        </h1>
        <p className="text-xs text-slate-600 max-w-sm mx-auto">
          Access your smart card profile studio, WhatsApp mini-store, appointment bookings, and customer leads.
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md">
        <div className="bg-white/90 border border-white/90 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl shadow-indigo-950/10 rounded-3xl space-y-5 relative">
          
          {searchParams.get('reset') === 'success' && !error && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Password updated successfully! Please sign in with your new password.</span>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs space-y-2.5">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </div>
              {isAdminBlocked && (
                <div className="pt-2 border-t border-rose-200">
                  <Link
                    href="/admin/login"
                    className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 hover:from-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Go to Super Admin Portal (/admin/login)</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Continue with Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-xs flex items-center justify-center gap-3 transition-all shadow-sm active:scale-95 disabled:opacity-50"
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

          {/* Clean Robust Divider */}
          <div className="relative flex items-center justify-center my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative bg-white/95 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap select-none">
              Or continue with work credentials
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
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
                  placeholder="founder@business.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/90 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <Link href="/forgot-password" className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50/90 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
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

          {/* Switch to Sign Up */}
          <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-center space-y-2">
            <p className="text-xs text-slate-600">
              Need to register a new business entity?
            </p>
            <Link
              href={`/signup${redirectTarget ? `?redirect=${encodeURIComponent(redirectTarget)}&intent=build_card` : '?intent=build_card'}`}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-50 text-indigo-700 border border-indigo-200 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <UserPlus className="w-3.5 h-3.5 text-indigo-600" />
              <span>Register New Business Entity (Sign Up)</span>
            </Link>
          </div>

          {/* Navigation & Help Links */}
          <div className="pt-2 text-center flex items-center justify-between text-xs text-slate-600">
            <Link href="/" className="hover:text-indigo-600 font-medium transition-colors">
              ← Main Website
            </Link>
            <a 
              href="https://wa.me/916304989071?text=Hi%20OneClickBiz%20Support%2C%20I%20need%20help%20signing%20in." 
              target="_blank" 
              rel="noreferrer"
              className="text-emerald-600 hover:text-emerald-700 font-semibold inline-flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>Need Help?</span>
            </a>
            <Link href="/admin/login" className="text-rose-600 hover:text-rose-700 font-semibold transition-colors">
              Super Admin →
            </Link>
          </div>

          {/* Trust Row */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-center gap-3 text-[10px] text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>256-Bit SSL Encrypted</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>Instant Cloud Sync</span>
            </span>
            <span className="text-slate-300">•</span>
            <span>🇮🇳 Made in India</span>
          </div>

        </div>

        {/* Outer Legal & Company Footer */}
        <div className="mt-6 text-center space-y-3 pb-6">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-600">
            <Link href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link>
            <span className="text-slate-300">•</span>
            <Link href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
            <span className="text-slate-300">•</span>
            <Link href="/refund" className="hover:text-indigo-600 transition-colors">Refund Policy</Link>
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
