'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Save, 
  ShieldCheck, 
  Globe2, 
  CreditCard, 
  Bell, 
  Mail, 
  Check, 
  Key, 
  Database,
  Lock
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [platformName, setPlatformName] = useState('OneClickBiz');
  const [basicPrice, setBasicPrice] = useState('999');
  const [proPrice, setProPrice] = useState('1599');
  const [advancedPrice, setAdvancedPrice] = useState('2199');
  const [allowPublicSignup, setAllowPublicSignup] = useState(true);
  const [requireEmailVerification, setRequireEmailVerification] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadLiveSettings() {
      try {
        const res = await fetch('/api/admin/settings', {
          cache: 'no-store',
          headers: { 'x-admin-key': 'oneclickbiz_admin_2026' }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.config) {
            const cfg = data.config;
            if (cfg.platformName) setPlatformName(cfg.platformName);
            if (cfg.basicPrice !== undefined) setBasicPrice(String(cfg.basicPrice));
            if (cfg.proPrice !== undefined) setProPrice(String(cfg.proPrice));
            if (cfg.advancedPrice !== undefined) setAdvancedPrice(String(cfg.advancedPrice));
            if (cfg.allowPublicSignup !== undefined) setAllowPublicSignup(cfg.allowPublicSignup);
            if (cfg.requireEmailVerification !== undefined) setRequireEmailVerification(cfg.requireEmailVerification);
          }
        }
      } catch (err) {
        console.error('Failed to load server settings:', err);
      }
    }
    loadLiveSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const config = {
      platformName,
      basicPrice: Number(basicPrice) || 999,
      proPrice: Number(proPrice) || 1599,
      advancedPrice: Number(advancedPrice) || 2199,
      allowPublicSignup,
      requireEmailVerification,
      updatedAt: new Date().toISOString()
    };

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': 'oneclickbiz_admin_2026'
        },
        body: JSON.stringify(config)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('oneclickbiz_admin_settings', JSON.stringify(config));
        }
        setSaved(true);
        setTimeout(() => setSaved(false), 4000);
      } else {
        setErrorMessage(data.error || 'Failed to save settings to server.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Network error connecting to settings server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-bold uppercase tracking-wider mb-2 shadow-sm">
          <Settings className="w-3.5 h-3.5 text-rose-600" /> System Control
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Platform System Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Configure default subscription pricing, platform registration controls, and infrastructure defaults.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-sm">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Platform system settings saved successfully!</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2 shadow-sm">
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Section 1: Global Subscription Pricing */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-slate-200/80 shadow-md space-y-6 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Default Subscription Pricing (INR / Year)</h2>
              <p className="text-xs text-slate-500">Set the annual pricing shown on the marketing page and checkout.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Basic Plan (₹/yr)</label>
              <input
                type="number"
                value={basicPrice}
                onChange={(e) => setBasicPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Pro Plan (₹/yr)</label>
              <input
                type="number"
                value={proPrice}
                onChange={(e) => setProPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Advanced Plan (₹/yr)</label>
              <input
                type="number"
                value={advancedPrice}
                onChange={(e) => setAdvancedPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white font-mono"
              />
            </div>

          </div>
        </div>

        {/* Section 2: Platform Security & Access */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-slate-200/80 shadow-md space-y-6 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Platform Security &amp; Registration</h2>
              <p className="text-xs text-slate-500">Manage member onboarding and account verification rules.</p>
            </div>
          </div>

          <div className="space-y-4">
            
            <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/80 transition-all">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-slate-900">Allow Public Self-Registration</div>
                <div className="text-[11px] text-slate-500">Permit new businesses to register smart business cards from the homepage.</div>
              </div>
              <input
                type="checkbox"
                checked={allowPublicSignup}
                onChange={(e) => setAllowPublicSignup(e.target.checked)}
                className="w-4 h-4 accent-rose-600 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/80 transition-all">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-slate-900">Enforce Email OTP Verification</div>
                <div className="text-[11px] text-slate-500">Require 6-digit email confirmation code before activating public card URLs.</div>
              </div>
              <input
                type="checkbox"
                checked={requireEmailVerification}
                onChange={(e) => setRequireEmailVerification(e.target.checked)}
                className="w-4 h-4 accent-rose-600 rounded cursor-pointer"
              />
            </label>

          </div>
        </div>

        {/* Section 3: Database & Cloud Infrastructure */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-slate-200/80 shadow-md space-y-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Infrastructure Status</h2>
              <p className="text-xs text-slate-500">Connected database and cloud object storage endpoints.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2 font-mono">
            <div className="flex items-center justify-between text-slate-700">
              <span>Database Engine:</span>
              <span className="text-emerald-700 font-bold">PostgreSQL (Prisma ORM)</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span>Host Region:</span>
              <span className="text-indigo-700 font-bold">BLR1 (Bengaluru, IN)</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span>Dynamic Routing Subsystem:</span>
              <span className="text-emerald-700 font-bold">Active (/v/[slug], /q/[id], /nfc/[id])</span>
            </div>
          </div>
        </div>

        {/* Save CTA */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-rose-600/25 flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving to Database...' : 'Save System Settings'}</span>
          </button>
        </div>

      </form>

    </div>
  );
}

