'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Lock, 
  Crown, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  ArrowLeft 
} from 'lucide-react';
import { PlanTierType } from '@/lib/plan-guards';

interface PlanLockGateProps {
  requiredPlan: 'PRO' | 'ADVANCED';
  currentPlan: PlanTierType;
  featureTitle: string;
  featureDescription: string;
  benefits: string[];
}

export default function PlanLockGate({
  requiredPlan,
  currentPlan,
  featureTitle,
  featureDescription,
  benefits
}: PlanLockGateProps) {
  const planName = requiredPlan === 'ADVANCED' ? 'Advanced Plan' : 'Pro Plan';
  const planPrice = requiredPlan === 'ADVANCED' ? '₹2,199' : '₹1,599';
  const planColor = requiredPlan === 'ADVANCED' ? 'from-purple-600 via-pink-600 to-amber-500' : 'from-indigo-600 to-purple-600';
  const badgeBg = requiredPlan === 'ADVANCED' ? 'bg-purple-500/10 text-purple-300 border-purple-500/20' : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20';

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[70vh]">
      
      {/* Container Card */}
      <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-2xl space-y-8 relative overflow-hidden text-center">
        
        {/* Glow ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none -z-10" />

        {/* Lock & Crown Badge */}
        <div className="flex flex-col items-center space-y-3">
          <div className={`w-16 h-16 rounded-3xl bg-gradient-to-tr ${planColor} flex items-center justify-center text-white shadow-xl shadow-indigo-500/25`}>
            {requiredPlan === 'ADVANCED' ? <Crown className="w-8 h-8 text-amber-300" /> : <Lock className="w-8 h-8 text-white" />}
          </div>

          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${badgeBg}`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Requires {planName} ({planPrice}/year)</span>
          </div>
        </div>

        {/* Feature Title & Description */}
        <div className="space-y-2 max-w-xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {featureTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {featureDescription}
          </p>
          <div className="pt-1 text-[11px] text-slate-400 font-medium">
            Your current active tier is <strong className="text-white uppercase">{currentPlan} Plan</strong>.
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 text-left max-w-lg mx-auto space-y-2.5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            What unlocks with {planName}:
          </p>
          <div className="space-y-2">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
          <Link
            href={`/dashboard/settings?plan=${requiredPlan}&checkout=true`}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r ${planColor} hover:opacity-95 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95`}
          >
            <Crown className="w-4 h-4 text-amber-300" />
            <span>Upgrade to {planName} ({planPrice}/yr)</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>
        </div>

      </div>

    </div>
  );
}
