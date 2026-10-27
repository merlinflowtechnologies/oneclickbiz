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
    let isMounted = true;

    async function initializeBuilder() {
      if (typeof window === 'undefined') return;

      try {
        const querySlug = searchParams.get('slug');
        const queryTemplate = searchParams.get('template');
        const queryName = searchParams.get('name');
        const queryBiz = searchParams.get('biz');

        let parsedSession: any = null;
        try {
          const savedSession = localStorage.getItem('oneclickbiz_user_session');
          parsedSession = savedSession ? JSON.parse(savedSession) : null;
        } catch (_) {}

        // Check active session with server
        let serverUser: any = null;
        try {
          const meRes = await fetch('/api/auth/me');
          if (meRes.ok) {
            const meData = await meRes.json();
            if (meData?.authenticated && meData.user) {
              serverUser = meData.user;
            }
          }
        } catch (_) {}

        const isAuthenticated = Boolean(
          serverUser ||
          (querySlug && queryBiz) ||
          (parsedSession && parsedSession.loggedIn)
        );

        if (!isAuthenticated) {
          if (isMounted) setIsAuthVerified(false);
          return;
        }

        if (isMounted) setIsAuthVerified(true);

        // If server session exists and email differs from local session, sync local session
        if (serverUser) {
          if (!parsedSession || parsedSession.email !== serverUser.email) {
            parsedSession = {
              ...(parsedSession || {}),
              fullName: serverUser.name,
              email: serverUser.email,
              businessName: serverUser.businessName,
              slug: serverUser.slug,
              template: serverUser.template,
              category: serverUser.category,
              plan: serverUser.planTier || 'ADVANCED',
              hasActivePaidPlan: serverUser.hasActivePaidPlan,
              loggedIn: true
            };
            try {
              localStorage.setItem('oneclickbiz_user_session', JSON.stringify(parsedSession));
            } catch (_) {}
          }
        }

        // Determine target slug: explicit queryParam > serverUser.slug > parsedSession.slug > fallback
        const targetSlug = (querySlug || serverUser?.slug || parsedSession?.slug || 'alex').toLowerCase().trim();

        const isRestaurantTarget = Boolean(
          queryTemplate === 'food-restaurant' ||
          queryTemplate === 'restaurant-menu' ||
          queryTemplate === 'food-home' ||
          queryTemplate === 'food-cloud' ||
          queryTemplate === 'food' ||
          queryTemplate === 'vcard38' ||
          serverUser?.template === 'food-restaurant' ||
          serverUser?.template === 'restaurant-menu' ||
          serverUser?.template === 'food' ||
          parsedSession?.template === 'food-restaurant' ||
          parsedSession?.template === 'restaurant-menu' ||
          parsedSession?.template === 'food' ||
          parsedSession?.category === 'Food Business' ||
          parsedSession?.category === 'Restaurant' ||
          parsedSession?.category === 'Food & Dining' ||
          parsedSession?.category === 'food' ||
          serverUser?.category === 'Food Business' ||
          serverUser?.category === 'Restaurant' ||
          serverUser?.category === 'Food & Dining' ||
          targetSlug.startsWith('food-') ||
          targetSlug.includes('restaurant') ||
          targetSlug.includes('dining') ||
          targetSlug.includes('kitchen') ||
          targetSlug.includes('cafe') ||
          targetSlug.includes('bistro') ||
          parsedSession?.businessName?.toLowerCase().includes('restaurant') ||
          parsedSession?.businessName?.toLowerCase().includes('dining') ||
          parsedSession?.businessName?.toLowerCase().includes('kitchen') ||
          parsedSession?.businessName?.toLowerCase().includes('cafe') ||
          parsedSession?.businessName?.toLowerCase().includes('bistro') ||
          parsedSession?.businessName?.toLowerCase().includes('food') ||
          queryBiz?.toLowerCase().includes('restaurant') ||
          queryBiz?.toLowerCase().includes('dining') ||
          queryBiz?.toLowerCase().includes('kitchen') ||
          queryBiz?.toLowerCase().includes('cafe') ||
          queryBiz?.toLowerCase().includes('food')
        );

        const targetTemplateOrSlug = queryTemplate || targetSlug;

        const isHealthcareTarget = Boolean(
          targetTemplateOrSlug.startsWith('health-') ||
          targetTemplateOrSlug.startsWith('med-') ||
          serverUser?.category === 'Healthcare'
        );

        const isBeautyTarget = !isHealthcareTarget && Boolean(
          targetTemplateOrSlug.startsWith('beauty-') ||
          targetTemplateOrSlug.startsWith('salon-') ||
          serverUser?.category === 'Beauty & Personal Care'
        );

        const isFashionTarget = !isHealthcareTarget && !isBeautyTarget && Boolean(
          targetTemplateOrSlug.startsWith('fash-') ||
          targetTemplateOrSlug.startsWith('boutique-') ||
          serverUser?.category === 'Fashion & Clothing'
        );

        const isEducationTarget = !isHealthcareTarget && !isBeautyTarget && !isFashionTarget && Boolean(
          targetTemplateOrSlug.startsWith('edu-') ||
          targetTemplateOrSlug.startsWith('school-') ||
          serverUser?.category === 'Education'
        );

        const isEventsTarget = !isHealthcareTarget && !isBeautyTarget && !isFashionTarget && !isEducationTarget && Boolean(
          targetTemplateOrSlug.startsWith('events-') ||
          targetTemplateOrSlug.startsWith('event-') ||
          serverUser?.category === 'Events & Creative'
        );

        const isTravelTarget = !isHealthcareTarget && !isBeautyTarget && !isFashionTarget && !isEducationTarget && !isEventsTarget && Boolean(
          targetTemplateOrSlug.startsWith('travel-') ||
          targetTemplateOrSlug.startsWith('tour-') ||
          serverUser?.category === 'Travel & Hospitality'
        );

        const isJewelleryTarget = !isHealthcareTarget && !isBeautyTarget && !isFashionTarget && !isEducationTarget && !isEventsTarget && !isTravelTarget && Boolean(
          targetTemplateOrSlug.startsWith('retail-jewel') ||
          targetTemplateOrSlug.startsWith('jewel-') ||
          serverUser?.category === 'Jewellery'
        );

        const isInsuranceTarget = !isHealthcareTarget && !isBeautyTarget && !isFashionTarget && !isEducationTarget && !isEventsTarget && !isTravelTarget && !isJewelleryTarget && Boolean(
          targetTemplateOrSlug === 'prof-insurance' ||
          targetTemplateOrSlug.startsWith('insur-') ||
          serverUser?.category === 'Insurance'
        );

        const isHomeServicesTarget = !isHealthcareTarget && !isBeautyTarget && !isFashionTarget && !isEducationTarget && !isEventsTarget && !isTravelTarget && !isJewelleryTarget && !isInsuranceTarget && Boolean(
          targetTemplateOrSlug.startsWith('home-electrician') ||
          (targetTemplateOrSlug.startsWith('home-') && !targetTemplateOrSlug.startsWith('home-interior')) ||
          serverUser?.category === 'Home & Professional Services'
        );

        const isInteriorTarget = !isRestaurantTarget && !isHealthcareTarget && !isBeautyTarget && !isFashionTarget && !isEducationTarget && !isEventsTarget && !isTravelTarget && !isJewelleryTarget && !isInsuranceTarget && !isHomeServicesTarget && Boolean(
          targetTemplateOrSlug === 'home-interior' ||
          targetTemplateOrSlug === 'interior' ||
          targetTemplateOrSlug.startsWith('home-interior') ||
          targetTemplateOrSlug.startsWith('interior') ||
          serverUser?.category === 'Interior Design'
        );

        const isSpecificallyOtherIndustry = Boolean(
          isRestaurantTarget ||
          isHealthcareTarget ||
          isBeautyTarget ||
          isFashionTarget ||
          isEducationTarget ||
          isEventsTarget ||
          isTravelTarget ||
          isJewelleryTarget ||
          isInsuranceTarget ||
          isHomeServicesTarget ||
          isInteriorTarget
        );

        const isReTarget = !isSpecificallyOtherIndustry && Boolean(
          targetTemplateOrSlug.startsWith('re-') ||
          targetTemplateOrSlug === 're-builders' ||
          serverUser?.category === 'Real Estate' ||
          (parsedSession?.category === 'Real Estate' && !queryTemplate && !targetSlug)
        );

        const effectiveTemplateId = queryTemplate || (
          isRestaurantTarget ? 'food-restaurant' :
          isHealthcareTarget ? 'health-doctor' :
          isBeautyTarget ? 'beauty-salon' :
          isFashionTarget ? 'fash-boutique' :
          isEducationTarget ? 'edu-coaching' :
          isEventsTarget ? 'events-planner' :
          isTravelTarget ? 'travel-tour' :
          isJewelleryTarget ? 'retail-jewellery' :
          isInsuranceTarget ? 'prof-insurance' :
          isHomeServicesTarget ? 'home-electrician' :
          isInteriorTarget ? 'home-interior' :
          isReTarget ? 're-builders' :
          serverUser?.template || parsedSession?.template || null
        );

        // Build local fallback first
        let localFallback: DigitalProfile;
        const customSaved = localStorage.getItem(`oneclickbiz_custom_profile_${targetSlug}`);
        if (customSaved) {
          try {
            localFallback = JSON.parse(customSaved);
          } catch {
            localFallback = effectiveTemplateId ? getTemplateProfile(effectiveTemplateId) : getProfileBySlug(targetSlug);
          }
        } else if (effectiveTemplateId) {
          localFallback = getTemplateProfile(effectiveTemplateId);
          if (targetSlug) localFallback.slug = targetSlug;
        } else {
          localFallback = getProfileBySlug(targetSlug);
        }

        // Apply dedicated industry template and preset data if targeted
        if (isRestaurantTarget) {
          localFallback.templateId = 'food-restaurant';
          localFallback.category = 'Food Business';
          if (!localFallback.sectionData?.products?.items || localFallback.sectionData.products.items.length === 0) {
            localFallback.sectionData = {
              ...(localFallback.sectionData || {}),
              products: getTemplateProfile('food-restaurant').sectionData.products,
              services: getTemplateProfile('food-restaurant').sectionData.services
            };
          }
        } else if (isHealthcareTarget) {
          localFallback.templateId = 'health-doctor';
          localFallback.category = 'Healthcare';
          if (!localFallback.sectionData?.healthcare) {
            localFallback.sectionData = {
              ...(localFallback.sectionData || {}),
              healthcare: getTemplateProfile('health-doctor').sectionData.healthcare
            };
          }
        } else if (isBeautyTarget) {
          localFallback.templateId = 'beauty-salon';
          localFallback.category = 'Beauty & Personal Care';
          if (!localFallback.sectionData?.beauty) {
            localFallback.sectionData = {
              ...(localFallback.sectionData || {}),
              beauty: getTemplateProfile('beauty-salon').sectionData.beauty
            };
          }
        } else if (isFashionTarget) {
          localFallback.templateId = 'fash-boutique';
          localFallback.category = 'Fashion & Clothing';
          if (!localFallback.sectionData?.fashion) {
            localFallback.sectionData = {
              ...(localFallback.sectionData || {}),
              fashion: getTemplateProfile('fash-boutique').sectionData.fashion
            };
          }
        } else if (isEducationTarget) {
          localFallback.templateId = 'edu-coaching';
          localFallback.category = 'Education';
          if (!localFallback.sectionData?.education) {
            localFallback.sectionData = {
              ...(localFallback.sectionData || {}),
              education: getTemplateProfile('edu-coaching').sectionData.education
            };
          }
        } else if (isEventsTarget) {
          localFallback.templateId = 'events-planner';
          localFallback.category = 'Events & Creative';
          if (!localFallback.sectionData?.events) {
            localFallback.sectionData = {
              ...(localFallback.sectionData || {}),
              events: getTemplateProfile('events-planner').sectionData.events
            };
          }
        } else if (isTravelTarget) {
          localFallback.templateId = 'travel-tour';
          localFallback.category = 'Travel & Hospitality';
          if (!localFallback.sectionData?.travel) {
            localFallback.sectionData = {
              ...(localFallback.sectionData || {}),
              travel: getTemplateProfile('travel-tour').sectionData.travel
            };
          }
        } else if (isJewelleryTarget) {
          localFallback.templateId = 'retail-jewellery';
          localFallback.category = 'Jewellery';
          if (!localFallback.sectionData?.jewellery) {
            localFallback.sectionData = {
              ...(localFallback.sectionData || {}),
              jewellery: getTemplateProfile('retail-jewellery').sectionData.jewellery
            };
          }
        } else if (isInsuranceTarget) {
          localFallback.templateId = 'prof-insurance';
          localFallback.category = 'Insurance';
          if (!localFallback.sectionData?.insurance) {
            localFallback.sectionData = {
              ...(localFallback.sectionData || {}),
              insurance: getTemplateProfile('prof-insurance').sectionData.insurance
            };
          }
        } else if (isHomeServicesTarget) {
          localFallback.templateId = 'home-electrician';
          localFallback.category = 'Home & Professional Services';
          if (!localFallback.sectionData?.homeServices) {
            localFallback.sectionData = {
              ...(localFallback.sectionData || {}),
              homeServices: getTemplateProfile('home-electrician').sectionData.homeServices
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
        } else if (isReTarget) {
          const isExistingRe = localFallback.templateId?.startsWith('re-') || localFallback.templateId === 'vcard35';
          if (!isExistingRe) {
            localFallback.templateId = (effectiveTemplateId?.startsWith('re-') || effectiveTemplateId === 'vcard35') ? effectiveTemplateId : 're-builders';
          }
          localFallback.category = 'Real Estate';
          if (!localFallback.sectionData?.realEstate) {
            localFallback.sectionData = {
              ...(localFallback.sectionData || {}),
              realEstate: getTemplateProfile(localFallback.templateId || 're-builders').sectionData.realEstate
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

          // Fetch latest profile from the server DB (source of truth with zero cache)
          fetch(`/api/profiles/${targetSlug}?_t=${Date.now()}`, { cache: 'no-store' })
            .then(res => res.ok ? res.json() : null)
            .then(data => {
              if (data?.profile) {
                const dbProfile = data.profile as DigitalProfile;
                const dbCategory = dbProfile.category || localFallback.category || '';
                const dbTemplateId = dbProfile.templateId || localFallback.templateId || effectiveTemplateId || '';

                const isSpecificallyOtherIndustry = Boolean(
                  dbCategory === 'Healthcare' ||
                  dbCategory === 'Beauty & Personal Care' ||
                  dbCategory === 'Fashion & Clothing' ||
                  dbCategory === 'Education' ||
                  dbCategory === 'Events & Creative' ||
                  dbCategory === 'Travel & Hospitality' ||
                  dbCategory === 'Jewellery' ||
                  dbCategory === 'Home & Professional Services' ||
                  dbCategory === 'Interior Design' ||
                  dbTemplateId.startsWith('health-') ||
                  dbTemplateId.startsWith('beauty-') ||
                  dbTemplateId.startsWith('fash-') ||
                  dbTemplateId.startsWith('edu-') ||
                  dbTemplateId.startsWith('events-') ||
                  dbTemplateId.startsWith('travel-') ||
                  dbTemplateId.startsWith('retail-jewel') ||
                  dbTemplateId.startsWith('home-electrician') ||
                  dbTemplateId.startsWith('home-interior') ||
                  dbTemplateId === 'prof-insurance'
                );

                const dbIsRestaurant = !isSpecificallyOtherIndustry && Boolean(
                  dbTemplateId.startsWith('food-') ||
                  dbTemplateId === 'restaurant-menu' ||
                  dbCategory === 'Food Business' ||
                  dbCategory === 'Restaurant' ||
                  dbCategory === 'Food & Dining'
                );

                const dbIsRe = !isSpecificallyOtherIndustry && !dbIsRestaurant && Boolean(
                  dbCategory === 'Real Estate' ||
                  dbTemplateId.startsWith('re-') ||
                  dbTemplateId === 're-builders' ||
                  isReTarget
                );

                // Source of truth: DB fields strictly take precedence
                const merged: DigitalProfile = {
                  ...localFallback,
                  ...dbProfile,
                  templateId: dbIsRestaurant
                    ? 'food-restaurant'
                    : dbIsRe 
                    ? ((dbProfile.templateId?.startsWith('re-') || dbProfile.templateId === 'vcard35') ? dbProfile.templateId : (localFallback.templateId?.startsWith('re-') || localFallback.templateId === 'vcard35') ? localFallback.templateId : 're-builders') 
                    : isInteriorTarget ? 'home-interior' : (dbProfile.templateId || localFallback.templateId || effectiveTemplateId || undefined),
                  category: dbProfile.category || localFallback.category || (dbIsRestaurant ? 'Food Business' : dbIsRe ? 'Real Estate' : isInteriorTarget ? 'Interior Design' : parsedSession?.category || undefined),
                  name: dbProfile.name || localFallback.name,
                  company: dbProfile.company || localFallback.company,
                  designation: dbProfile.designation || localFallback.designation,
                  bio: dbProfile.bio !== undefined ? dbProfile.bio : localFallback.bio,
                  phone: dbProfile.phone || localFallback.phone,
                  email: dbProfile.email || localFallback.email,
                  whatsapp: dbProfile.whatsapp || localFallback.whatsapp,
                  address: dbProfile.address !== undefined ? dbProfile.address : localFallback.address,
                  sectionData: {
                    ...(localFallback.sectionData || {}),
                    ...(dbProfile.sectionData || {}),
                    restaurant: dbIsRestaurant
                      ? (dbProfile.sectionData?.restaurant || localFallback.sectionData?.restaurant || getTemplateProfile('food-restaurant').sectionData.restaurant)
                      : dbProfile.sectionData?.restaurant,
                    realEstate: dbIsRe 
                      ? (dbProfile.sectionData?.realEstate || localFallback.sectionData?.realEstate || getTemplateProfile('re-builders').sectionData.realEstate)
                      : (!isSpecificallyOtherIndustry ? dbProfile.sectionData?.realEstate : undefined),
                    interior: isInteriorTarget
                      ? (dbProfile.sectionData?.interior || localFallback.sectionData?.interior || getTemplateProfile('home-interior').sectionData.interior)
                      : dbProfile.sectionData?.interior,
                    healthcare: dbProfile.sectionData?.healthcare || localFallback.sectionData?.healthcare || (dbCategory === 'Healthcare' || localFallback.category === 'Healthcare' ? getTemplateProfile('health-doctor').sectionData.healthcare : undefined),
                    beauty: dbProfile.sectionData?.beauty || localFallback.sectionData?.beauty || (dbCategory === 'Beauty & Personal Care' || localFallback.category === 'Beauty & Personal Care' ? getTemplateProfile('beauty-salon').sectionData.beauty : undefined),
                    fashion: dbProfile.sectionData?.fashion || localFallback.sectionData?.fashion || (dbCategory === 'Fashion & Clothing' || localFallback.category === 'Fashion & Clothing' ? getTemplateProfile('fash-boutique').sectionData.fashion : undefined),
                    education: dbProfile.sectionData?.education || localFallback.sectionData?.education || (dbCategory === 'Education' || localFallback.category === 'Education' ? getTemplateProfile('edu-coaching').sectionData.education : undefined),
                    events: dbProfile.sectionData?.events || localFallback.sectionData?.events || (dbCategory === 'Events & Creative' || localFallback.category === 'Events & Creative' ? getTemplateProfile('events-planner').sectionData.events : undefined),
                    travel: dbProfile.sectionData?.travel || localFallback.sectionData?.travel || (dbCategory === 'Travel & Hospitality' || localFallback.category === 'Travel & Hospitality' ? getTemplateProfile('travel-tour').sectionData.travel : undefined),
                    jewellery: dbProfile.sectionData?.jewellery || localFallback.sectionData?.jewellery || (dbCategory === 'Jewellery' || localFallback.category === 'Jewellery' ? getTemplateProfile('retail-jewellery').sectionData.jewellery : undefined),
                    homeServices: dbProfile.sectionData?.homeServices || localFallback.sectionData?.homeServices || (dbCategory === 'Home & Professional Services' || localFallback.category === 'Home & Professional Services' ? getTemplateProfile('home-electrician').sectionData.homeServices : undefined),
                    insurance: dbProfile.sectionData?.insurance || localFallback.sectionData?.insurance || (dbTemplateId === 'prof-insurance' || localFallback.templateId === 'prof-insurance' || localFallback.category === 'Insurance' ? getTemplateProfile('prof-insurance').sectionData.insurance : undefined),
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
                  localStorage.setItem('oneclickbiz_active_profile', JSON.stringify(merged));
                } catch (_) {}
              }
            })
            .catch(err => console.warn('Builder: Could not fetch fresh profile from DB:', err));
      } catch (e) {
        console.error(e);
        if (isMounted) setIsAuthVerified(false);
      }
    }

    initializeBuilder();

    return () => {
      isMounted = false;
    };
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
