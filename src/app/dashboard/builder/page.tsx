'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import ProfileBuilder from '@/components/builder/ProfileBuilder';
import { INITIAL_PROFILES, getProfileBySlug } from '@/lib/data-store';
import { getTemplateProfile } from '@/data/templatePresets';
import { DigitalProfile } from '@/lib/types';
import { ShieldCheck, Building, Lock, ArrowRight, UserPlus, LogIn, AlertCircle } from 'lucide-react';

function BuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState<DigitalProfile>(INITIAL_PROFILES[0]);
  const [isAuthVerified, setIsAuthVerified] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const querySlug = searchParams.get('slug');
        const queryTemplate = searchParams.get('template');
        const queryName = searchParams.get('name');
        const queryBiz = searchParams.get('biz');
        const queryPlan = searchParams.get('plan');

        const savedSession = localStorage.getItem('oneclickbiz_user_session');

        // Check if template parameter is supplied
        const effectiveTemplateId = queryTemplate || (savedSession ? JSON.parse(savedSession).template : null);

        // If user came from signup/login query params OR has valid session
        if (querySlug && queryBiz) {
          setIsAuthVerified(true);
          const generated = effectiveTemplateId ? getTemplateProfile(effectiveTemplateId) : getProfileBySlug(querySlug);
          if (queryName) generated.name = decodeURIComponent(queryName);
          if (queryBiz) generated.company = decodeURIComponent(queryBiz);
          if (querySlug) generated.slug = querySlug.toLowerCase();
          setProfile(generated);
          return;
        }

        if (savedSession) {
          const parsed = JSON.parse(savedSession);
          if (parsed.loggedIn) {
            setIsAuthVerified(true);
            const targetSlug = querySlug || parsed.slug || 'alex';
            const targetTemplate = queryTemplate || parsed.template;
            let resolved: DigitalProfile;
            
            const customSaved = localStorage.getItem(`oneclickbiz_custom_profile_${targetSlug}`);
            if (customSaved) {
              try {
                resolved = JSON.parse(customSaved);
              } catch {
                resolved = getProfileBySlug(targetSlug);
              }
            } else if (targetTemplate) {
              resolved = getTemplateProfile(targetTemplate);
              if (parsed.slug) resolved.slug = parsed.slug;
            } else {
              resolved = getProfileBySlug(targetSlug);
            }

            if (parsed.fullName && !customSaved) resolved.name = parsed.fullName;
            if (parsed.businessName && !customSaved) resolved.company = parsed.businessName;
            if (parsed.phone && !customSaved) {
              resolved.phone = parsed.phone;
              resolved.whatsapp = parsed.phone.replace(/\D/g, '');
            }
            if (parsed.email && !customSaved) resolved.email = parsed.email;
            setProfile(resolved);
            return;
          }
        }

        // If neither exists, user is unauthenticated
        setIsAuthVerified(false);
      } catch (e) {
        console.error(e);
        setIsAuthVerified(false);
      }
    }
  }, [searchParams]);

  // If checking authentication status
  if (isAuthVerified === null) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-400 font-medium">Verifying business entity credentials...</p>
        </div>
      </div>
    );
  }

  // Strict Policy Authentication Screen
  if (isAuthVerified === false) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white mx-auto shadow-xl shadow-indigo-500/25">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> Strict Business Policy
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Business Entity Required
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              To build, customize, and publish smart digital business cards, you must be registered and signed in as a verified business entity.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href="/signup?intent=build_card&redirect=/dashboard/builder"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <UserPlus className="w-4 h-4" />
              <span>Register New Business Entity (Sign Up)</span>
              <ArrowRight className="w-4 h-4 ml-auto" />
            </Link>

            <Link
              href="/login?redirect=/dashboard/builder"
              className="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <LogIn className="w-4 h-4 text-indigo-400" />
              <span>Sign In with Existing Business Account</span>
              <ArrowRight className="w-4 h-4 ml-auto" />
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500">
            OneClickBiz enforces authenticated business profiles for fraud prevention and digital ownership verification.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
      <ProfileBuilder 
        initialProfile={profile} 
        key={profile.slug}
        onSave={(updated) => {
          if (typeof window !== 'undefined') {
            try {
              localStorage.setItem(`oneclickbiz_custom_profile_${updated.slug}`, JSON.stringify(updated));
              localStorage.setItem('oneclickbiz_active_profile', JSON.stringify(updated));
            } catch (err) {
              console.error(err);
            }
          }
        }}
      />
    </div>
  );
}

export default function ProfileBuilderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <BuilderContent />
    </Suspense>
  );
}
