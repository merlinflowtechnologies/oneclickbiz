'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  ArrowLeft,
  AlertCircle,
  Eye,
  EyeOff,
  KeyRound,
  Briefcase,
  BarChart3,
  Users,
  CreditCard
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
    <div className="min-h-screen bg-gradient-to-b from-[#F4F7FF] via-[#F8FAFF] to-[#EDF2FF] text-[#10183F] flex flex-col justify-between selection:bg-rose-100 selection:text-rose-900">
      
      {/* Top Header Matching UI Design System */}
      <header className="w-full border-b border-[#E2E8F0]/70 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          <div className="flex items-center gap-3 mx-auto lg:mx-0">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <img 
                src="/logo-brand.png?v=4" 
                alt="OneClickBiz - Connect | Build | Grow" 
                className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
              />
            </Link>
            <span className="hidden sm:inline-flex text-[10px] uppercase font-extrabold tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 shadow-2xs">
              Super Admin Console
            </span>
          </div>

          <Link
            href="/"
            className="hidden lg:inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#174BFF] transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Website</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col justify-start">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Service Badges & Admin Login Card */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-5">
            
            {/* Header Titles */}
            <div>
              <span className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
                <span>Restricted Super Admin Console</span>
              </span>

              <p className="lg:hidden text-xs sm:text-sm font-bold text-rose-600 mb-0.5">Super Admin Portal 🛡️</p>
              <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#10183F] tracking-tight leading-tight">
                Sign in to <span className="text-[#174BFF]">Admin Console</span>
              </h1>
              
              <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-xl font-normal leading-relaxed">
                Secure portal to inspect platform analytics, track user subscription revenue, and manage all member profiles.
              </p>
            </div>

            {/* Service & Security Feature Pills */}
            <div className="hidden sm:flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold text-slate-600">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 border border-slate-200 shadow-2xs">
                <BarChart3 className="w-3 h-3 text-[#174BFF]" />
                <span>Platform Telemetry</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 border border-slate-200 shadow-2xs">
                <Users className="w-3 h-3 text-indigo-600" />
                <span>Member Management</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 border border-slate-200 shadow-2xs">
                <CreditCard className="w-3 h-3 text-amber-600" />
                <span>Revenue Audit</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 border border-slate-200 shadow-2xs">
                <ShieldCheck className="w-3 h-3 text-rose-600" />
                <span>256-Bit SSL</span>
              </span>
            </div>

            {/* Mobile Visual Preview */}
            <div className="lg:hidden rounded-2xl overflow-hidden my-2 shadow-xs border border-blue-100/80">
              <img 
                src="/landing/auth_hero_3d_mobile_clean.png?v=5" 
                alt="OneClickBiz Multi-Device Business Suite" 
                className="w-full object-contain mx-auto"
              />
            </div>

            {/* Login Card Matching Figma Design System */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-[0_12px_40px_rgba(23,75,255,0.06)] relative space-y-5">
              
              {/* Login Mode Tabs: Business Login & Admin Login (Active) */}
              <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#F1F5F9] border border-slate-200">
                <Link
                  href="/login"
                  className="py-2.5 px-3 rounded-xl text-slate-600 hover:text-slate-900 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-white/60 transition-all"
                >
                  <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                  <span>Business Login</span>
                </Link>
                <button
                  type="button"
                  className="py-2.5 px-3 rounded-xl bg-white text-rose-700 font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-default"
                >
                  <KeyRound className="w-3.5 h-3.5 text-rose-600" />
                  <span>Admin Login</span>
                </button>
              </div>

              {/* Admin Authority Banner */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-rose-50 border border-rose-200/90 text-rose-800 text-xs font-semibold">
                <span className="flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Restricted Authority Area</span>
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-rose-200/90 text-rose-950 font-bold uppercase tracking-wider">
                  256-Bit SSL
                </span>
              </div>

              {/* Error Banner */}
              {error && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium">{error}</span>
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

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                
                {/* Super Admin Email */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
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
                      className="w-full pl-10 pr-4 h-12 rounded-2xl bg-slate-50/70 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Master Security Key / Password */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700">
                      Master Security Key / Password
                    </label>
                    <span className="text-[11px] font-semibold text-rose-600">
                      Root Access
                    </span>
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
                      className="w-full pl-10 pr-10 h-12 rounded-2xl bg-slate-50/70 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 focus:bg-white transition-all font-mono"
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
                  className="w-full h-12 rounded-2xl bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-sm shadow-md shadow-rose-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Authenticate & Enter Admin Hub</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>

              {/* Navigation Back & Switch Links */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                <Link href="/" className="hover:text-slate-800 transition-colors inline-flex items-center gap-1 font-medium">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Main Website</span>
                </Link>
                <Link href="/login" className="text-[#174BFF] hover:text-blue-700 font-bold transition-colors inline-flex items-center gap-1">
                  <span>Business User Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Trust Badges Row */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-500">
                <span className="flex items-center gap-1 font-medium">
                  <KeyRound className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>Restricted Root Console</span>
                </span>
                <span className="text-slate-300">•</span>
                <span className="font-medium">256-Bit SSL Encrypted</span>
                <span className="text-slate-300">•</span>
                <span className="font-medium">🇮🇳 Made in India</span>
              </div>

            </div>

          </div>

          {/* Right Column: 3D Device Showcase (Exact Parity with Login Screen) */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-5 flex-col items-center justify-center relative">
            <img 
              src="/landing/auth_hero_3d_desktop_clean.png?v=5" 
              alt="OneClickBiz 3D Multi-Device Platform" 
              className="w-full max-w-[420px] object-contain drop-shadow-xl"
            />
          </div>

        </div>
      </main>

      {/* Universal Footer Bar Matching Design System */}
      <footer className="w-full border-t border-[#E2E8F0] bg-white/80 backdrop-blur-xs py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>© 2026 OneClickBiz. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-600">
            <Link href="/" className="hover:text-[#174BFF] transition-colors">Main Website</Link>
            <span className="text-slate-300">•</span>
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
