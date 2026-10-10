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

        const savedSession = localStorage.getItem('oneclickbiz_user_session');
        const parsedSession = savedSession ? JSON.parse(savedSession) : null;

        const targetSlug = (querySlug || parsedSession?.slug || 'alex').toLowerCase().trim();
        const effectiveTemplateId = queryTemplate || parsedSession?.template || (parsedSession?.category === 'Real Estate' || targetSlug.startsWith('re-') ? 're-builders' : (parsedSession?.category === 'Interior Design' || targetSlug.startsWith('home-interior') || targetSlug.startsWith('interior') ? 'home-interior' : null));
        const isReTarget = Boolean(
          effectiveTemplateId?.startsWith('re-') || 
          parsedSession?.category === 'Real Estate' || 
          targetSlug.startsWith('re-') ||
          effectiveTemplateId === 're-builders' ||
          parsedSession?.businessName?.toLowerCase().includes('builder') ||
          parsedSession?.businessName?.toLowerCase().includes('developer') ||
          parsedSession?.businessName?.toLowerCase().includes('realty') ||
          parsedSession?.businessName?.toLowerCase().includes('infra') ||
          parsedSession?.businessName?.toLowerCase().includes('estate') ||
          queryBiz?.toLowerCase().includes('builder') ||
          queryBiz?.toLowerCase().includes('developer') ||
          queryBiz?.toLowerCase().includes('realty') ||
          queryBiz?.toLowerCase().includes('infra')
        );
        const isInteriorTarget = Boolean(
          effectiveTemplateId === 'home-interior' ||
          effectiveTemplateId === 'interior' ||
          parsedSession?.category === 'Interior Design' ||
          targetSlug.startsWith('interior') ||
          targetSlug.startsWith('home-interior') ||
          queryTemplate === 'home-interior'
        );

        // If user came from signup/login query params OR has valid session
        if ((querySlug && queryBiz) || (parsedSession && parsedSession.loggedIn)) {
          setIsAuthVerified(true);

          // Build a local fallback first (from localStorage or preset)
          let localFallback: DigitalProfile;
          const customSaved = localStorage.getItem(`oneclickbiz_custom_profile_${targetSlug}`);
          if (customSaved) {
            try {
              localFallback = JSON.parse(customSaved);
              if (isReTarget) {
                localFallback.templateId = 're-builders';
                localFallback.category = 'Real Estate';
                if (!localFallback.sectionData?.realEstate) {
                  localFallback.sectionData = {
                    ...(localFallback.sectionData || {}),
                    realEstate: getTemplateProfile('re-builders').sectionData.realEstate
                  };
                }
              } else if (isInteriorTarget) {
                localFallback.templateId = 'home-interior';
                localFallback.category = 'Interior Design';
                if (!localFallback.sectionData?.interior) {
                  localFallback.sectionData = {
                    ...(localFallback.sectionData || {}),
                    interior: getTemplateProfile('home-interior').sectionData.interior
                  };
                }
              }
            } catch {
              localFallback = effectiveTemplateId ? getTemplateProfile(effectiveTemplateId) : getProfileBySlug(targetSlug);
            }
          } else if (effectiveTemplateId || isReTarget || isInteriorTarget) {
            localFallback = getTemplateProfile(effectiveTemplateId || (isInteriorTarget ? 'home-interior' : 're-builders'));
            if (targetSlug) localFallback.slug = targetSlug;
          } else {
            localFallback = getProfileBySlug(targetSlug);
          }

          if (isReTarget) {
            localFallback.templateId = 're-builders';
            localFallback.category = 'Real Estate';
            if (!localFallback.sectionData?.realEstate) {
              localFallback.sectionData = {
                ...(localFallback.sectionData || {}),
                realEstate: getTemplateProfile('re-builders').sectionData.realEstate
              };
            }
          } else if (isInteriorTarget) {
            localFallback.templateId = 'home-interior';
            localFallback.category = 'Interior Design';
            if (!localFallback.sectionData?.interior) {
              localFallback.sectionData = {
                ...(localFallback.sectionData || {}),
                interior: getTemplateProfile('home-interior').sectionData.interior
              };
            }
          }

          if (queryName && !customSaved) localFallback.name = decodeURIComponent(queryName);
          if (queryBiz && !customSaved) localFallback.company = decodeURIComponent(queryBiz);
          if (parsedSession?.fullName && !customSaved) localFallback.name = parsedSession.fullName;
          if (parsedSession?.businessName && !customSaved) localFallback.company = parsedSession.businessName;
          if (parsedSession?.phone && !customSaved) {
            localFallback.phone = parsedSession.phone;
            localFallback.whatsapp = parsedSession.phone.replace(/\D/g, '');
          }
          if (parsedSession?.email && !customSaved) localFallback.email = parsedSession.email;
          if (targetSlug) localFallback.slug = targetSlug;

          // Show local data immediately, then fetch fresh from DB
          setProfile(localFallback);

          // Fetch latest profile from the server DB (source of truth)
          fetch(`/api/profiles/${targetSlug}`)
            .then(res => res.ok ? res.json() : null)
            .then(data => {
              if (data?.profile) {
                const dbProfile = data.profile as DigitalProfile;
                const dbIsRe = Boolean(
                  isReTarget ||
                  dbProfile.category === 'Real Estate' ||
                  dbProfile.templateId?.startsWith('re-') ||
                  dbProfile.company?.toLowerCase().includes('builder') ||
                  dbProfile.company?.toLowerCase().includes('developer') ||
                  dbProfile.company?.toLowerCase().includes('realty') ||
                  dbProfile.company?.toLowerCase().includes('infra') ||
                  dbProfile.company?.toLowerCase().includes('properties') ||
                  dbProfile.company?.toLowerCase().includes('estate') ||
                  dbProfile.designation?.toLowerCase().includes('infrastructure') ||
                  dbProfile.designation?.toLowerCase().includes('builder') ||
                  dbProfile.sectionData?.realEstate
                );
                // Merge: DB fields override local, but keep local-only fields
                const merged: DigitalProfile = {
                  ...localFallback,
                  ...dbProfile,
                  templateId: dbIsRe ? 're-builders' : isInteriorTarget ? 'home-interior' : (dbProfile.templateId || localFallback.templateId || effectiveTemplateId || undefined),
                  category: dbIsRe ? 'Real Estate' : isInteriorTarget ? 'Interior Design' : (dbProfile.category || localFallback.category || parsedSession?.category || undefined),
                  // Ensure sectionData.about.content reflects the DB bio & trust configs are preserved
                  sectionData: {
                    ...(localFallback.sectionData || {}),
                    ...(dbProfile.sectionData || {}),
                    realEstate: dbIsRe 
                      ? (dbProfile.sectionData?.realEstate || localFallback.sectionData?.realEstate || getTemplateProfile('re-builders').sectionData.realEstate)
                      : dbProfile.sectionData?.realEstate,
                    interior: isInteriorTarget
                      ? (dbProfile.sectionData?.interior || localFallback.sectionData?.interior || getTemplateProfile('home-interior').sectionData.interior)
                      : dbProfile.sectionData?.interior,
                    about: {
                      ...(localFallback.sectionData?.about || {}),
                      ...(dbProfile.sectionData?.about || {}),
                      content: dbProfile.bio != null ? dbProfile.bio : (localFallback.sectionData?.about?.content || localFallback.bio || '')
                    }
                  }
                };
                setProfile(merged);
                // Update localStorage with fresh DB data
                try {
                  localStorage.setItem(`oneclickbiz_custom_profile_${targetSlug}`, JSON.stringify(merged));
                } catch (_) {}
              }
            })
            .catch(err => console.warn('Builder: Could not fetch fresh profile from DB:', err));

          return;
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
