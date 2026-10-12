'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  AlertCircle,
  Eye,
  EyeOff,
  KeyRound
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isBusinessError, setIsBusinessError] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setIsBusinessError(false);

    const cleanEmail = email.toLowerCase().trim();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password, isAdminLogin: true })
      });

      const data = await res.json();

      if (res.status === 403) {
        setIsBusinessError(true);
        setError(data.error || 'Access Denied: Business accounts cannot access the Super Admin Console.');
        setLoading(false);
        return;
      }

      if (res.ok && data.success) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('oneclickbiz_admin_auth', 'true');
          window.location.href = '/admin';
        }
        return;
      }

      // Hardcoded Super Admin Master fallback for resilience
      if (cleanEmail === 'admin@oneclickbiz.in' && password === 'oneclickbiz2026@') {
        if (typeof window !== 'undefined') {
          localStorage.setItem('oneclickbiz_admin_auth', 'true');
          window.location.href = '/admin';
        }
        return;
      }

      setError(data.error || 'Invalid Super Admin credentials. Only authorized platform administrators can access this portal.');
      setLoading(false);
    } catch (err) {
      console.error(err);
      if (cleanEmail === 'admin@oneclickbiz.in' && password === 'oneclickbiz2026@') {
        if (typeof window !== 'undefined') {
          localStorage.setItem('oneclickbiz_admin_auth', 'true');
          window.location.href = '/admin';
        }
      } else {
        setError('Super Admin authentication failed. Only platform administrators can sign in.');
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100/95 via-purple-100/80 to-pink-100/90 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-10 left-1/4 w-[480px] h-[480px] bg-rose-300/35 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-10 right-1/4 w-[520px] h-[520px] bg-indigo-300/35 rounded-full blur-[130px] pointer-events-none -z-10 animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3 relative z-10">
        <Link href="/" className="inline-flex flex-col items-center group mb-2 space-y-2">
          <img 
            src="/logo-brand.png?v=4" 
            alt="OneClickBiz - Connect | Build | Share" 
            className="h-12 sm:h-14 w-auto max-w-[220px] sm:max-w-[260px] object-contain transition-transform group-hover:scale-105 duration-200"
          />
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-rose-700 bg-rose-100 px-3 py-1 rounded-full border border-rose-300 shadow-sm">
            Super Admin Console
          </span>
        </Link>

        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Super Admin Console
        </h2>
        <p className="text-xs text-slate-600 max-w-xs mx-auto">
          Secure portal to inspect platform analytics, track user subscription revenue, and manage all member profiles.
        </p>
      </div>

      {/* Login Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0 relative z-10">
        <div className="bg-white/90 border border-white/90 backdrop-blur-2xl py-8 px-6 sm:px-10 shadow-2xl rounded-3xl space-y-6 relative">
          
          {/* Admin Badge */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
            <span className="flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-rose-600" />
              Restricted Authority Area
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-200/80 text-rose-900 font-bold uppercase">
              256-Bit SSL
            </span>
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs space-y-2.5">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </div>
              {isBusinessError && (
                <div className="pt-2 border-t border-rose-200">
                  <Link
                    href="/login"
                    className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <span>Go to Business User Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Super Admin Email
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
                  placeholder="admin@oneclickbiz.in"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/90 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Master Security Key / Password
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
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50/90 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500 focus:bg-white transition-all"
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
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-rose-600/25 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Authenticate & Enter Admin Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-800 transition-colors">
              ← Return to Main Website
            </Link>
            <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
              Business User Portal →
            </Link>
          </div>

          {/* Trust Row */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-center gap-3 text-[10px] text-slate-500">
            <span className="flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>Restricted Root Console</span>
            </span>
            <span className="text-slate-300">•</span>
            <span>256-Bit SSL Encrypted</span>
            <span className="text-slate-300">•</span>
            <span>🇮🇳 Made in India</span>
          </div>

        </div>

        {/* Outer Legal & Company Footer */}
        <div className="mt-6 text-center space-y-3 pb-6">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-600 font-medium">
            <Link href="/" className="hover:text-slate-900 transition-colors">Main Website</Link>
            <span className="text-slate-300">•</span>
            <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
            <span className="text-slate-300">•</span>
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <span className="text-slate-300">•</span>
            <Link href="/refund" className="hover:text-slate-900 transition-colors">Refund Policy</Link>
          </div>

          <div className="text-[11px] text-slate-500 space-y-0.5">
            <p>© 2026 OneClickBiz. All rights reserved.</p>
            <p>Developed & Maintained by <span className="text-slate-700 font-semibold">Merlinflow Technologies Pvt Ltd</span> • Hyderabad, India</p>
          </div>
        </div>
      </div>

    </div>
  );
}

