'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  BarChart3, 
  Users, 
  CreditCard, 
  Settings, 
  LogOut, 
  ExternalLink, 
  ChevronRight, 
  Sparkles, 
  Search, 
  Bell, 
  Activity, 
  LayoutDashboard, 
  Menu, 
  X,
  Tag
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean | null>(null);
  const [sidebarStats, setSidebarStats] = useState<{ userCount: number; revenue: number }>({ userCount: 0, revenue: 0 });

  React.useEffect(() => {
    if (pathname === '/admin/login') {
      return;
    }

    let isMounted = true;

    async function verifyAdminAuth() {
      // 1. Check local admin token
      if (typeof window !== 'undefined') {
        const localAdmin = localStorage.getItem('oneclickbiz_admin_auth');
        if (localAdmin === 'true') {
          if (isMounted) setIsAdminAuthenticated(true);
        }
      }

      // 2. Verify with server session
      try {
        const meRes = await fetch('/api/auth/me');
        if (meRes.ok) {
          const data = await meRes.json();
          if (data.authenticated && data.user?.role === 'SUPER_ADMIN') {
            if (isMounted) {
              setIsAdminAuthenticated(true);
              if (typeof window !== 'undefined') localStorage.setItem('oneclickbiz_admin_auth', 'true');
            }
          } else {
            // User is authenticated as a business user or not admin
            if (isMounted) {
              setIsAdminAuthenticated(false);
              if (typeof window !== 'undefined') localStorage.removeItem('oneclickbiz_admin_auth');
            }
          }
        } else {
          // If not authenticated on server and no local admin key
          if (typeof window !== 'undefined') {
            const localAdmin = localStorage.getItem('oneclickbiz_admin_auth');
            if (localAdmin !== 'true' && isMounted) {
              setIsAdminAuthenticated(false);
            }
          }
        }
      } catch (e) {
        console.error('Admin auth check failed:', e);
      }

      // 3. Load Stats
      try {
        const res = await fetch('/api/admin/telemetry', {
          cache: 'no-store',
          headers: { 'x-admin-key': 'oneclickbiz_admin_2026' }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.metrics && isMounted) {
            setSidebarStats({
              userCount: data.metrics.totalUsers || 0,
              revenue: data.metrics.totalRevenue || 0
            });
          }
        }
      } catch (e) {
        console.error('Failed to load sidebar metrics:', e);
      }
    }

    verifyAdminAuth();

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  // If on login page, render children directly without sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    {
      name: 'Platform Overview',
      href: '/admin',
      icon: BarChart3,
      badge: 'Live',
      badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-300'
    },
    {
      name: 'Members & Profiles',
      href: '/admin/users',
      icon: Users,
      badge: sidebarStats.userCount > 0 ? `${sidebarStats.userCount}` : 'Live',
      badgeColor: 'bg-indigo-100 text-indigo-700 border-indigo-300'
    },
    {
      name: 'Revenue & Subscriptions',
      href: '/admin/revenue',
      icon: CreditCard,
      badge: sidebarStats.revenue >= 100000 
        ? `₹${(sidebarStats.revenue / 100000).toFixed(1)}L` 
        : `₹${sidebarStats.revenue}`,
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
    },
    {
      name: 'Coupons & Discounts',
      href: '/admin/coupons',
      icon: Tag,
      badge: 'Promo',
      badgeColor: 'bg-rose-100 text-rose-700 border-rose-300'
    },
    {
      name: 'System Settings',
      href: '/admin/settings',
      icon: Settings
    }
  ];

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error('Logout error:', e);
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('oneclickbiz_admin_auth');
      window.location.href = '/admin/login';
    }
  };

  // Loading state
  if (isAdminAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F4F7FF] via-[#F8FAFF] to-[#EDF2FF] text-[#10183F] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-10 h-10 border-3 border-[#174BFF] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-600 font-bold">Verifying Super Admin clearance...</p>
        </div>
      </div>
    );
  }

  // Strict Barrier Screen for non-admins / unauthorized
  if (isAdminAuthenticated === false) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F4F7FF] via-[#F8FAFF] to-[#EDF2FF] text-[#10183F] flex flex-col justify-between selection:bg-rose-100 selection:text-rose-900">
        
        {/* Top Header */}
        <header className="w-full border-b border-[#E2E8F0]/70 bg-white/80 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <img 
                src="/logo-brand.png?v=4" 
                alt="OneClickBiz - Connect | Build | Grow" 
                className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
              />
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#174BFF] transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-50"
            >
              <span>Back to Website</span>
            </Link>
          </div>
        </header>

        {/* Barrier Card Content */}
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-lg bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-[0_12px_40px_rgba(23,75,255,0.06)] text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-600 via-purple-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-rose-500/20">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5 text-rose-600" /> Super Admin Access Required
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#10183F] tracking-tight">
                Admin Console Restricted
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                This environment is strictly reserved for platform administrators with root clearance. Business entity accounts cannot access this console.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href="/admin/login"
                className="w-full h-12 rounded-2xl bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-sm shadow-md shadow-rose-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Authenticate with Super Admin Key</span>
                <ChevronRight className="w-4 h-4 ml-auto" />
              </Link>

              <Link
                href="/dashboard"
                className="w-full h-11 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <LayoutDashboard className="w-4 h-4 text-[#174BFF]" />
                <span>Go to Business User Dashboard</span>
                <ChevronRight className="w-4 h-4 ml-auto" />
              </Link>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <Link href="/" className="hover:text-slate-900 transition font-medium">
                ← Return to Main Website
              </Link>
              <Link href="/login" className="text-[#174BFF] hover:text-blue-700 font-bold">
                Business Sign In →
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-[#E2E8F0] bg-white/80 backdrop-blur-xs py-4 text-xs text-slate-500 text-center">
          <p>© 2026 OneClickBiz. All rights reserved.</p>
        </footer>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/90 via-indigo-50/40 to-sky-50/50 text-slate-900 flex flex-col md:flex-row">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex md:w-72 flex-col justify-between border-r border-slate-200/80 bg-white/90 backdrop-blur-xl p-5 sticky top-0 h-screen overflow-y-auto shadow-sm">
        
        <div className="space-y-6">
          
          {/* Brand & Super Admin Badge */}
          <div className="space-y-2">
            <Link href="/admin" className="flex items-center space-x-2 group py-1">
              <img 
                src="/logo-brand.png?v=4" 
                alt="OneClickBiz - Connect | Build | Share" 
                className="h-10 sm:h-11 w-auto max-w-[180px] sm:max-w-[200px] object-contain transition-transform group-hover:scale-105 duration-200"
              />
              <span className="text-[8px] uppercase font-extrabold tracking-widest text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded border border-rose-300 shrink-0 shadow-sm">
                ADMIN
              </span>
            </Link>

            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-[11px] text-rose-800 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-bold">
                <Activity className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                Network Master
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-200/80 font-mono font-bold text-rose-900">
                ROOT-ACCESS
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1">
              Super Admin Core
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-rose-50 border border-rose-200 text-rose-700 font-bold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-rose-600' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Context Switchers */}
          <div className="pt-4 border-t border-slate-200 space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1">
              Quick Environments
            </div>
            
            <Link
              href="/dashboard"
              className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-all"
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-3.5 h-3.5 text-indigo-600" />
                <span>User Dashboard</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <Link
              href="/v/alex"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-all"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-pink-600" />
                <span>Live Card Preview</span>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>
          </div>

        </div>

        {/* Admin User Footer */}
        <div className="pt-4 border-t border-slate-200 space-y-3">
          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center font-bold text-white text-xs">
              SA
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-bold text-slate-900 truncate">Platform Admin</span>
              <span className="text-[10px] text-slate-500 truncate">admin@oneclickbiz.in</span>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-700 border border-slate-200 hover:border-rose-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Authority</span>
          </button>

          <div className="pt-2 text-center text-[10px] text-slate-400 space-y-0.5">
            <p>© 2026 OneClickBiz. All rights reserved.</p>
            <p>Developed & Maintained by <span className="text-slate-600 font-medium">Merlinflow Technologies Pvt Ltd</span></p>
          </div>
        </div>

      </aside>

      {/* Mobile Header & Drawer */}
      <div className="md:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <Link href="/admin" className="flex items-center space-x-2">
          <img 
            src="/logo-brand.png?v=4" 
            alt="OneClickBiz - Connect | Build | Share" 
            className="h-7 w-auto max-w-[130px] object-contain"
          />
          <span className="text-[8px] uppercase font-extrabold tracking-widest text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded border border-rose-300">
            ADMIN
          </span>
        </Link>

        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-2 rounded-lg text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-200"
        >
          {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileNavOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-2 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                  isActive ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-200 flex gap-2">
            <Link
              href="/dashboard"
              className="w-1/2 py-2 text-center rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800"
            >
              User Dashboard
            </Link>
            <button
              onClick={handleSignOut}
              className="w-1/2 py-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 lg:p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}

