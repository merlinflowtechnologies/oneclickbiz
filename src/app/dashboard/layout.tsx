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
                  const isUserPaid = Boolean(meData.user?.hasActivePaidPlan);
                  setUserSession({
                    slug: meData.user.slug || 'profile',
                    businessName: meData.user.businessName || meData.user.name || 'My Business',
                    fullName: meData.user.name || 'User',
                    plan: isUserPaid ? (meData.user.planTier || detectedPlan || 'PRO').toUpperCase() : 'UNPAID'
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-100/90 via-purple-100/70 to-pink-100/90 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center p-6 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/80 shadow-xl">
          <div className="w-9 h-9 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-700 font-medium">Verifying business credentials...</p>
        </div>
      </div>
    );
  }

  // Strict Barrier Screen when Super Admin account is detected
  if (isSuperAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100/95 via-purple-100/80 to-pink-100/90 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-gradient-to-r from-rose-400/35 via-purple-400/35 to-indigo-400/35 blur-[160px] pointer-events-none -z-10" />

        <div className="w-full max-w-lg bg-white/90 border border-white/90 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-indigo-950/10 text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 via-purple-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-xl shadow-rose-500/25">
            <ShieldCheck className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> Super Admin Authority Detected
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Portal Separation Notice
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
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
              className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-indigo-600" />
              <span>Sign Out and Sign In as Business User</span>
              <ArrowRight className="w-4 h-4 ml-auto" />
            </button>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-800 transition">
              ← Main Website
            </Link>
            <Link href="/admin" className="text-rose-600 hover:text-rose-700 font-semibold">
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-100/95 via-purple-100/80 to-pink-100/90 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-gradient-to-r from-indigo-400/40 via-purple-400/40 to-pink-400/35 blur-[160px] pointer-events-none -z-10" />

        <div className="w-full max-w-lg bg-white/90 border border-white/90 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-indigo-950/10 text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white mx-auto shadow-xl shadow-indigo-500/25">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> Strict Authentication Required
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Business Entity Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              To access your dashboard, manage subscription plans, customize cards, or view live client leads, please sign in or register your business entity.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href={`/signup?redirect=${encodeURIComponent(pathname)}&intent=select_plan`}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <UserPlus className="w-4 h-4" />
              <span>Register New Business Entity (Sign Up)</span>
              <ArrowRight className="w-4 h-4 ml-auto" />
            </Link>

            <Link
              href={`/login?redirect=${encodeURIComponent(pathname)}`}
              className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <LogIn className="w-4 h-4 text-indigo-600" />
              <span>Sign In to Existing Business Account</span>
              <ArrowRight className="w-4 h-4 ml-auto" />
            </Link>
          </div>

          {/* Quick Demo Preview Option */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-800 transition">
              ← Main Website
            </Link>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="text-indigo-600 hover:text-indigo-800 font-semibold underline cursor-pointer"
            >
              Explore as Demo Business →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen h-[100dvh] max-h-[100dvh] bg-[#f1f5f9] text-slate-800 font-sans flex flex-col overflow-hidden">
      
      {/* Top App Header */}
      <header className="h-16 bg-white/90 backdrop-blur-xl border-b border-indigo-100/80 px-4 sm:px-6 flex items-center justify-between shrink-0 sticky top-0 z-40 shadow-xs">
        {/* Left Brand Header */}
        <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 sm:p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden transition shrink-0 cursor-pointer"
            aria-label="Toggle Menu"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <Link href="/" className="flex items-center group py-0.5 shrink-0">
            <img 
              src="/logo-light.png" 
              alt="OneClickBiz - Connect | Build | Grow" 
              className="h-9 sm:h-11 w-auto max-w-[160px] sm:max-w-[220px] object-contain transition-transform group-hover:scale-105 duration-200"
            />
          </Link>

          {/* Org Selector Badge */}
          <div className="hidden sm:flex items-center space-x-2 pl-4 border-l border-slate-200 min-w-0">
            <div className="px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold flex items-center gap-1.5 truncate shadow-xs">
              <span className="truncate max-w-[100px] md:max-w-[160px] lg:max-w-[220px]">{userSession.businessName}</span>
              <span className="text-[10px] px-1 rounded bg-indigo-100 text-indigo-800 font-bold shrink-0">{userSession.plan.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          
          {userSession.plan === 'UNPAID' ? (
            <Link 
              href="/dashboard/settings?checkout=true" 
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-xs font-semibold text-rose-700 flex items-center gap-1.5 border border-rose-200 transition-all shadow-xs shrink-0"
              title="Card Inactive - Click to Activate via Cashfree"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" />
              <span className="hidden sm:inline">Card Inactive (Activate Plan)</span>
              <span className="sm:hidden text-[11px]">Activate</span>
            </Link>
          ) : (
            <Link 
              href={`/v/${userSession.slug}`} 
              target="_blank"
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 border border-slate-200 transition-all hover:border-indigo-300 shadow-xs shrink-0"
              title={`Live Card: /v/${userSession.slug}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="sm:hidden font-bold text-emerald-600 text-[11px]">Live Card</span>
              <span className="hidden sm:inline font-mono text-xs truncate max-w-[200px]">
                /v/{userSession.slug}
              </span>
              <ExternalLink className="w-3 h-3 text-indigo-600 shrink-0" />
            </Link>
          )}

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
            className="px-2 sm:px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-[11px] text-slate-600 hover:text-rose-600 border border-slate-200 transition whitespace-nowrap shrink-0 cursor-pointer"
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
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
          />
        )}

        {/* Sidebar Nav */}
        <aside className={`
          w-64 bg-white/90 lg:bg-white/75 backdrop-blur-xl border-r border-indigo-100/80 p-4 flex flex-col justify-between shrink-0
          fixed lg:static top-16 bottom-0 left-0 z-40 transform transition-transform duration-200 ease-in-out shadow-2xl lg:shadow-none overflow-y-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
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
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20' 
                      : 'text-slate-600 hover:text-indigo-700 hover:bg-indigo-50/70'}
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-600'}`} />
                    <span>{item.name}</span>
                  </div>
                  {isLocked && (
                    <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-700 font-bold uppercase tracking-wider">
                      <Lock className="w-2.5 h-2.5" />
                      <span>{reqPlan}</span>
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Bottom Plan & Subscription Status Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border border-indigo-200/80 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-slate-900">Annual Membership</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.5 rounded">Active</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-tight">
              Manage custom domain, quotas & GST tax invoices.
            </p>
            <Link 
              href="/dashboard/settings"
              className="block text-center py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 text-[11px] font-bold text-white transition-all shadow-xs"
            >
              Plan & Billing
            </Link>
          </div>

          <div className="pt-2 text-center text-[10px] text-slate-400 space-y-0.5">
            <p>© 2026 OneClickBiz. All rights reserved.</p>
            <p>Developed & Maintained by <span className="text-slate-600 font-medium">Merlinflow Technologies Pvt Ltd</span></p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className={`flex-1 bg-gradient-to-br from-slate-50/90 via-indigo-50/40 to-sky-50/50 flex flex-col min-h-0 ${pathname === '/dashboard/builder' ? 'overflow-y-auto md:overflow-hidden' : 'overflow-y-auto'}`}>
          {userSession.plan === 'UNPAID' && (
            <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-purple-50 border-b border-amber-200 px-4 py-2.5 text-xs text-amber-900 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2 text-center sm:text-left">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping shrink-0" />
                <span><strong>Annual Plan Inactive:</strong> Your smart card is currently unpublished and offline. Complete your annual subscription payment via Cashfree to activate your card.</span>
              </div>
              <Link 
                href="/dashboard/settings?checkout=true"
                className="px-3.5 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-rose-500 hover:opacity-95 text-white font-bold text-xs shrink-0 shadow transition active:scale-95"
              >
                Pay & Activate Card
              </Link>
            </div>
          )}
          {children}
        </main>

      </div>

    </div>
  );
}
