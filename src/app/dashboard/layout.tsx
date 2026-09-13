'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Sparkles, 
  LayoutDashboard, 
  User, 
  ShoppingBag, 
  Calendar, 
  Users, 
  CreditCard, 
  BookOpen,
  Mail,
  Settings, 
  ExternalLink, 
  Menu, 
  X,
  Plus,
  Bell,
  ChevronDown,
  Crown,
  Lock,
  ShieldCheck,
  ArrowRight,
  LogIn,
  UserPlus
} from 'lucide-react';

import { getCurrentUserPlan, getUserPlanLimits, PlanTierType } from '@/lib/plan-guards';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
  const [userPlanTier, setUserPlanTier] = useState<PlanTierType>('PRO');

  const [userSession, setUserSession] = useState<{
    slug: string;
    businessName: string;
    fullName: string;
    plan: string;
  }>({
    slug: 'alex',
    businessName: 'Apex Digital Studio',
    fullName: 'Alex Rivera',
    plan: 'PRO'
  });

  useEffect(() => {
    let isMounted = true;

    async function checkAuthStatus() {
      if (typeof window !== 'undefined') {
        try {
          const detectedPlan = getCurrentUserPlan();
          setUserPlanTier(detectedPlan);

          // 1. Check authenticated user via server API
          try {
            const meRes = await fetch('/api/auth/me');
            if (meRes.ok) {
              const meData = await meRes.json();
              if (meData.authenticated) {
                if (meData.user?.role === 'SUPER_ADMIN') {
                  if (isMounted) {
                    setIsSuperAdmin(true);
                    setIsAuthenticated(false);
                  }
                  return;
                }

                // Normal authenticated business user - set real profile details
                if (isMounted) {
                  setUserSession({
                    slug: meData.user.slug || 'profile',
                    businessName: meData.user.businessName || meData.user.name || 'My Business',
                    fullName: meData.user.name || 'User',
                    plan: (meData.user.planTier || detectedPlan || 'PRO').toUpperCase()
                  });
                  setIsAuthenticated(true);
                }
                return;
              }
            }
          } catch (e) {
            console.error('Session check error:', e);
          }

          // Check if Super Admin is logged in
          const adminAuth = localStorage.getItem('oneclickbiz_admin_auth');
          const saved = localStorage.getItem('oneclickbiz_user_session');

          if (saved) {
            const parsed = JSON.parse(saved);

            if (parsed.email === 'admin@oneclickbiz.in' || parsed.role === 'SUPER_ADMIN') {
              if (isMounted) {
                setIsSuperAdmin(true);
                setUserSession({
                  slug: 'admin',
                  businessName: 'Super Admin Portal',
                  fullName: 'System Administrator',
                  plan: 'ADVANCED'
                });
                setIsAuthenticated(true);
              }
              return;
            }

            if (parsed.loggedIn) {
              if (isMounted) {
                setUserSession({
                  slug: parsed.slug || 'kishore',
                  businessName: parsed.businessName || 'Himastech Digital Reality',
                  fullName: parsed.fullName || 'Kishore Patel',
                  plan: detectedPlan
                });
                setIsAuthenticated(true);
              }
              return;
            }
          }

          if (adminAuth === 'true' && !saved) {
            if (isMounted) {
              setIsSuperAdmin(true);
              setIsAuthenticated(false);
            }
            return;
          }

          if (isMounted) setIsAuthenticated(false);
        } catch (e) {
          console.error(e);
          if (isMounted) setIsAuthenticated(false);
        }
      }
    }

    checkAuthStatus();

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  const handleDemoLogin = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('oneclickbiz_user_session', JSON.stringify({
        fullName: 'Kishore Patel',
        email: 'kishore@himastech.com',
        businessName: 'Himastech Digital Reality',
        entityType: 'Private Limited / LLC',
        category: 'Real Estate & Marketing',
        designation: 'Founder & Managing Director',
        phone: '+91 98765 43210',
        slug: 'kishore',
        plan: 'PRO',
        isBusinessEntity: true,
        loggedIn: true
      }));
      localStorage.setItem('oneclickbiz_user_plan', 'PRO');
      setUserPlanTier('PRO');
      setUserSession({
        slug: 'kishore',
        businessName: 'Himastech Digital Reality',
        fullName: 'Kishore Patel',
        plan: 'PRO'
      });
      setIsAuthenticated(true);
    }
  };

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Profile Studio', href: '/dashboard/builder', icon: User },
    { 
      name: 'WhatsApp Store', 
      href: '/dashboard/store', 
      icon: ShoppingBag,
      requiredPlan: 'PRO',
      isLocked: userPlanTier === 'BASIC'
    },
    { name: 'Email Signature', href: '/dashboard/signature', icon: Mail },
    { 
      name: 'Blog Studio', 
      href: '/dashboard/blogs', 
      icon: BookOpen,
      requiredPlan: 'ADVANCED',
      isLocked: userPlanTier === 'BASIC' || userPlanTier === 'PRO'
    },
    { name: 'Visiting Card Studio', href: '/dashboard/visiting-cards', icon: CreditCard },
    { 
      name: 'Brochure Studio', 
      href: '/dashboard/brochures', 
      icon: BookOpen,
      requiredPlan: 'PRO',
      isLocked: userPlanTier === 'BASIC'
    },
    { 
      name: 'Bookings & Slots', 
      href: '/dashboard/bookings', 
      icon: Calendar,
      requiredPlan: 'PRO',
      isLocked: userPlanTier === 'BASIC'
    },
    { name: 'Leads & Inquiries', href: '/dashboard/leads', icon: Users },
    { name: 'Settings & Billing', href: '/dashboard/settings', icon: Settings },
  ];

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-9 h-9 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-400 font-medium">Verifying business credentials...</p>
        </div>
      </div>
    );
  }

  // Strict Barrier Screen when Super Admin account is detected
  if (isSuperAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-gradient-to-r from-rose-600/15 via-purple-600/15 to-indigo-600/15 blur-[160px] pointer-events-none -z-10" />

        <div className="w-full max-w-lg bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 via-purple-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-xl shadow-rose-500/25">
            <ShieldCheck className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> Super Admin Authority Detected
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Portal Separation Notice
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Platform Super Admin accounts cannot operate business member profiles inside the Business User Portal. Please use the Super Admin Console.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href="/admin"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 hover:from-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Go to Super Admin Console (/admin)</span>
              <ArrowRight className="w-4 h-4 ml-auto" />
            </Link>

            <button
              onClick={async () => {
                try {
                  await fetch('/api/auth/logout', { method: 'POST' });
                } catch (e) {
                  console.error(e);
                }
                if (typeof window !== 'undefined') {
                  localStorage.removeItem('oneclickbiz_admin_auth');
                  localStorage.removeItem('oneclickbiz_user_session');
                  window.location.href = '/login';
                }
              }}
              className="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <LogIn className="w-4 h-4 text-indigo-400" />
              <span>Sign Out and Sign In as Business User</span>
              <ArrowRight className="w-4 h-4 ml-auto" />
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <Link href="/" className="hover:text-white transition">
              ← Main Website
            </Link>
            <Link href="/admin" className="text-rose-400 hover:text-rose-300 font-semibold">
              Admin Hub →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Strict Policy Screen when not authenticated
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-gradient-to-r from-indigo-600/15 via-purple-600/15 to-pink-600/10 blur-[160px] pointer-events-none -z-10" />

        <div className="w-full max-w-lg bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white mx-auto shadow-xl shadow-indigo-500/25">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> Strict Authentication Required
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Business Entity Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              To access your dashboard, manage subscription plans, customize cards, or view live client leads, please sign in or register your business entity.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href={`/signup?redirect=${encodeURIComponent(pathname)}&intent=select_plan`}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <UserPlus className="w-4 h-4" />
              <span>Register New Business Entity (Sign Up)</span>
              <ArrowRight className="w-4 h-4 ml-auto" />
            </Link>

            <Link
              href={`/login?redirect=${encodeURIComponent(pathname)}`}
              className="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <LogIn className="w-4 h-4 text-indigo-400" />
              <span>Sign In to Existing Business Account</span>
              <ArrowRight className="w-4 h-4 ml-auto" />
            </Link>
          </div>

          {/* Quick Demo Preview Option */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <Link href="/" className="hover:text-white transition">
              ← Main Website
            </Link>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="text-indigo-400 hover:text-indigo-300 font-semibold underline"
            >
              Explore as Demo Business →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen h-[100dvh] max-h-[100dvh] bg-slate-950 text-slate-100 font-sans flex flex-col overflow-hidden">
      
      {/* Top App Header */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between shrink-0 sticky top-0 z-40">
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white lg:hidden"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/" className="flex items-center group py-0.5">
            <img 
              src="/logo.png" 
              alt="OneClickBiz - Business Made Simpler" 
              className="h-9 sm:h-11 w-auto max-w-[180px] sm:max-w-[210px] object-contain mix-blend-screen transition-transform group-hover:scale-105 duration-200"
            />
          </Link>

          {/* Org Selector Badge */}
          <div className="hidden sm:flex items-center space-x-2 pl-4 border-l border-slate-800">
            <div className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold flex items-center gap-1.5">
              <span>{userSession.businessName}</span>
              <span className="text-[10px] px-1 rounded bg-indigo-500/20 text-indigo-300 font-bold">{userSession.plan.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center space-x-3">
          
          <Link 
            href={`/v/${userSession.slug}`} 
            target="_blank"
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 flex items-center gap-1.5 border border-slate-700 transition-all hover:border-indigo-500/50"
          >
            <span className="font-mono">Live Card: /v/{userSession.slug}</span>
            <ExternalLink className="w-3 h-3 text-indigo-400" />
          </Link>

          <button
            onClick={async () => {
              try {
                await fetch('/api/auth/logout', { method: 'POST' });
              } catch (e) {
                console.error(e);
              }
              if (typeof window !== 'undefined') {
                localStorage.removeItem('oneclickbiz_user_session');
                setIsAuthenticated(false);
                window.location.href = '/login';
              }
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-400 hover:text-rose-400 border border-slate-800 transition"
            title="Sign Out"
          >
            Sign Out
          </button>
        </div>

      </header>

      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        
        {/* Mobile Backdrop Overlay */}
        {sidebarOpen && (
          <div 
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
          />
        )}

        {/* Sidebar Nav */}
        <aside className={`
          w-64 bg-slate-900/95 lg:bg-slate-900/60 border-r border-slate-800 p-4 flex flex-col justify-between shrink-0
          fixed lg:static top-16 bottom-0 left-0 z-40 transform transition-transform duration-200 ease-in-out shadow-2xl lg:shadow-none overflow-y-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Menu
            </p>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              const isLocked = (item as any).isLocked;
              const reqPlan = (item as any).requiredPlan;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group
                    ${isActive 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'}
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
                    <span>{item.name}</span>
                  </div>
                  {isLocked && (
                    <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-amber-400/90 font-bold uppercase tracking-wider">
                      <Lock className="w-2.5 h-2.5" />
                      <span>{reqPlan}</span>
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Bottom Plan & Subscription Status Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-950/80 via-slate-900 to-purple-950/50 border border-indigo-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white">Annual Membership</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold">Active</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              Manage custom domain, quotas & GST tax invoices.
            </p>
            <Link 
              href="/dashboard/settings"
              className="block text-center py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-[11px] font-bold text-white transition-all shadow"
            >
              Plan & Billing
            </Link>
          </div>

          <div className="pt-2 text-center text-[10px] text-slate-500 space-y-0.5">
            <p>© 2026 OneClickBiz. All rights reserved.</p>
            <p>Developed & Maintained by <span className="text-slate-400 font-medium">Merlinflow Technologies Pvt Ltd</span></p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className={`flex-1 bg-slate-950 flex flex-col min-h-0 ${pathname === '/dashboard/builder' ? 'overflow-y-auto md:overflow-hidden' : 'overflow-y-auto'}`}>
          {children}
        </main>

      </div>

    </div>
  );
}
