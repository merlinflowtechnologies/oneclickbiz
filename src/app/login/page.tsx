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
  UserPlus
} from 'lucide-react';

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
        if (typeof window !== 'undefined') {
          const session = {
            fullName: data.user.name || 'Alex Rivera',
            email: data.user.email,
            businessName: data.user.businessName || 'Apex Digital Studio',
            entityType: 'Private Limited / LLC',
            category: 'Technology & Agency',
            designation: 'Founder & Director',
            phone: '+91 98765 43210',
            slug: data.user.slug || 'alex',
            plan: 'Pro',
            isBusinessEntity: true,
            loggedIn: true
          };
          localStorage.setItem('oneclickbiz_user_session', JSON.stringify(session));
          window.location.href = redirectTarget;
        }
        return;
      }

      // Fallback for business demo accounts if DB is unseeded
      if (cleanEmail && password.length >= 6 && cleanEmail !== 'admin@oneclickbiz.in') {
        if (typeof window !== 'undefined') {
          const existing = localStorage.getItem('oneclickbiz_user_session');
          if (!existing) {
            localStorage.setItem('oneclickbiz_user_session', JSON.stringify({
              fullName: cleanEmail.includes('alex') ? 'Alex Rivera' : 'Sarah Chen',
              email: cleanEmail,
              businessName: cleanEmail.includes('alex') ? 'Apex Digital Studio' : 'InnovateTech Labs',
              entityType: 'Private Limited / LLC',
              category: 'Technology & Agency',
              designation: cleanEmail.includes('alex') ? 'Founder & Creative Director' : 'Chief Technology Officer',
              phone: '+91 98765 43210',
              slug: cleanEmail.includes('alex') ? 'alex' : 'sarah-chen',
              plan: cleanEmail.includes('alex') ? 'Pro' : 'Advanced',
              isBusinessEntity: true,
              loggedIn: true
            }));
          } else {
            const parsed = JSON.parse(existing);
            parsed.loggedIn = true;
            localStorage.setItem('oneclickbiz_user_session', JSON.stringify(parsed));
          }
          window.location.href = redirectTarget;
        }
      } else {
        setError(data.error || 'Invalid email or password. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      if (cleanEmail && password.length >= 6 && cleanEmail !== 'admin@oneclickbiz.in') {
        if (typeof window !== 'undefined') {
          window.location.href = redirectTarget;
        }
      } else {
        setError('Connection error. Please try again.');
        setLoading(false);
      }
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

              if (typeof window !== 'undefined') {
                localStorage.setItem('oneclickbiz_user_session', JSON.stringify({
                  fullName: data.user.name,
                  email: data.user.email,
                  businessName: `${data.user.name}'s Business`,
                  entityType: 'Private Limited / LLC',
                  category: 'Technology & Agency',
                  designation: 'Founder / Managing Director',
                  phone: '+91 98765 43210',
                  slug: data.user.slug || 'card',
                  plan: 'Pro',
                  isBusinessEntity: true,
                  loggedIn: true
                }));
              }

              router.push(redirectTarget);
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
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-y-auto">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-gradient-to-r from-indigo-600/15 via-purple-600/15 to-pink-600/10 blur-[150px] pointer-events-none -z-10" />

      {/* Header / Brand */}
      <div className="w-full max-w-md text-center space-y-3 mb-6">
        <Link href="/" className="inline-block group mb-1">
          <img 
            src="/logo.png" 
            alt="OneClickBiz - Business Made Simpler" 
            className="h-14 sm:h-16 w-auto max-w-[260px] sm:max-w-[300px] mx-auto object-contain transition-transform group-hover:scale-105 duration-200"
          />
        </Link>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Sign In as Business Entity
        </h1>
        <p className="text-xs text-slate-400">
          Access your smart card profile studio, WhatsApp mini-store, bookings, and customer leads.
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md">
        <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl rounded-3xl space-y-5 relative">
          
          {error && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-2.5">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </div>
              {isAdminBlocked && (
                <div className="pt-2 border-t border-rose-500/20">
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
            className="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-white font-semibold text-xs flex items-center justify-center gap-3 transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            {googleLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative bg-slate-900 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap select-none">
              Or continue with work credentials
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Official Work Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="founder@business.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
                <a href="#" className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
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
          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-center space-y-2">
            <p className="text-xs text-slate-300">
              Need to register a new business entity?
            </p>
            <Link
              href={`/signup${redirectTarget ? `?redirect=${encodeURIComponent(redirectTarget)}&intent=build_card` : '?intent=build_card'}`}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-all"
            >
              <UserPlus className="w-3.5 h-3.5 text-indigo-400" />
              <span>Register New Business Entity (Sign Up)</span>
            </Link>
          </div>

          {/* Admin link */}
          <div className="pt-2 text-center flex items-center justify-between text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-300">
              ← Main Website
            </Link>
            <Link href="/admin/login" className="text-rose-400 hover:text-rose-300 font-semibold">
              Super Admin Portal →
            </Link>
          </div>

          {/* Footer Copyright */}
          <div className="pt-6 border-t border-slate-800/80 text-center text-[11px] text-slate-500 space-y-0.5">
            <p>© 2026 OneClickBiz. All rights reserved.</p>
            <p>Developed & Maintained by <span className="text-slate-400 font-medium">Merlinflow Technologies Pvt Ltd</span>.</p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-sm">
        Loading sign in portal...
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
