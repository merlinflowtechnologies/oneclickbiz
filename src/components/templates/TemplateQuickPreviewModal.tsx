'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import QRCode from 'qrcode';
import { 
  X, 
  Smartphone, 
  Image as ImageIcon, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  QrCode, 
  Layers, 
  ShieldCheck, 
  Zap,
  ShoppingBag,
  Calendar,
  Share2,
  RefreshCw,
  Eye
} from 'lucide-react';
import { VCardTemplateItem } from '@/data/vcardTemplates';
import { getTemplateProfile } from '@/data/templatePresets';
import ProfileCardView from '@/components/templates/ProfileCardView';
import { DigitalProfile } from '@/lib/types';

interface TemplateQuickPreviewModalProps {
  template: VCardTemplateItem | null;
  onClose: () => void;
}

export default function TemplateQuickPreviewModal({
  template,
  onClose
}: TemplateQuickPreviewModalProps) {
  const [activeTab, setActiveTab] = useState<'interactive' | 'poster'>('interactive');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isQrExpanded, setIsQrExpanded] = useState<boolean>(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Generate QR Code for real phone scanning
  useEffect(() => {
    if (template) {
      const demoUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/v/${template.id}`
        : `https://oneclickbiz.in/v/${template.id}`;
      
      QRCode.toDataURL(demoUrl, {
        width: 256,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff'
        }
      })
        .then((url: string) => setQrCodeUrl(url))
        .catch(() => {});
    }
  }, [template]);

  if (!template) return null;

  const demoProfile: DigitalProfile = getTemplateProfile(template.id);

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl bg-white rounded-3xl sm:rounded-[32px] border border-slate-200/80 shadow-2xl overflow-hidden flex flex-col max-h-[94vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-3.5 py-3 sm:px-6 sm:py-4.5 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold text-white">
                  {template.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Free Live Demo
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                {template.category} &bull; {template.tagline}
              </p>
            </div>
          </div>

          {/* View Mode Toggle & Close */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-slate-800/90 p-1 rounded-xl flex items-center gap-1 border border-slate-700/80">
              <button
                type="button"
                onClick={() => setActiveTab('interactive')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'interactive'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Live Interactive</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('poster')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'poster'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Design Poster</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="flex-1 overflow-y-auto lg:overflow-hidden grid grid-cols-1 lg:grid-cols-12 bg-slate-50">
          
          {/* Left Column: Interactive Phone Mockup / Poster */}
          <div className="lg:col-span-7 bg-slate-900/95 p-3 sm:p-6 flex flex-col items-center justify-center overflow-y-auto relative min-h-[380px] sm:min-h-[500px] lg:min-h-[560px]">
            {/* Ambient Backlight */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

            {activeTab === 'interactive' ? (
              <div className="w-full max-w-[275px] xs:max-w-[310px] sm:max-w-[360px] md:max-w-[380px] relative z-10 flex flex-col items-center">
                {/* Smartphone Device Frame */}
                <div className="w-full bg-slate-950 rounded-[40px] sm:rounded-[44px] p-2.5 sm:p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-[4px] sm:border-[5px] border-slate-700/80 relative ring-1 ring-white/10">
                  {/* Speaker Ear Notch */}
                  <div className="absolute top-2.5 sm:top-3 inset-x-0 flex justify-center z-30 pointer-events-none">
                    <div className="w-20 sm:w-24 h-3.5 sm:h-4 bg-slate-950 rounded-full flex items-center justify-center gap-2 border border-slate-800/80 shadow-inner">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-slate-900 border border-slate-800" />
                      <div className="w-8 sm:w-10 h-1 bg-slate-800 rounded-full" />
                    </div>
                  </div>

                  {/* Phone Screen Container */}
                  <div className="w-full h-[460px] sm:h-[540px] lg:h-[580px] bg-slate-900 rounded-[30px] sm:rounded-[34px] overflow-y-auto scrollbar-none relative border border-slate-800/60 pt-4">
                    <ProfileCardView profile={demoProfile} isMockup={true} />
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Interactive: Click buttons, add products to cart &amp; test booking live</span>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-[275px] xs:max-w-[310px] sm:max-w-[360px] md:max-w-[380px] h-[460px] sm:h-[540px] lg:h-[580px] bg-slate-950 rounded-[34px] sm:rounded-[36px] overflow-y-auto scrollbar-none border border-slate-800 p-2 shadow-2xl relative z-10">
                <img
                  src={template.imgUrl}
                  alt={template.name}
                  className="w-full h-auto rounded-[28px] object-cover"
                />
              </div>
            )}
          </div>

          {/* Right Column: Template Info, Actions & Mobile QR Scan */}
          <div className="lg:col-span-5 p-5 sm:p-7 lg:p-8 flex flex-col justify-between overflow-y-auto space-y-6 bg-white border-t lg:border-t-0 lg:border-l border-slate-200">
            <div className="space-y-5">
              {/* Category & Tag */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
                    {template.category}
                  </span>
                  {template.badge && (
                    <span className="px-2.5 py-1 rounded-lg bg-pink-50 border border-pink-200 text-pink-700 text-xs font-bold">
                      {template.badge}
                    </span>
                  )}
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                  {template.name}
                </h4>
                <p className="text-sm text-slate-600 mt-1 font-medium leading-relaxed">
                  {template.tagline}
                </p>
              </div>

              {/* Included Features List */}
              <div className="space-y-3 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Ready-to-Use Features:
                </span>
                <ul className="space-y-2 text-xs text-slate-700">
                  {template.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium">{feat}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-medium">1-Tap .VCF Contact Download &amp; Dynamic QR Ready</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-medium">WhatsApp Store &amp; Direct Lead Capture</span>
                  </li>
                </ul>
              </div>

              {/* Mobile Scan Test Section */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/60 to-purple-50/60 border border-indigo-100 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <QrCode className="w-4 h-4 text-blue-600" />
                    Scan to Preview on Phone
                  </span>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Point your camera at this QR code to test this exact live demo on your smartphone.
                  </p>
                </div>
                {qrCodeUrl ? (
                  <div className="w-16 h-16 shrink-0 bg-white p-1 rounded-xl border border-blue-200 shadow-sm">
                    <img src={qrCodeUrl} alt="QR Code Preview" className="w-full h-full object-contain" />
                  </div>
                ) : (
                  <div className="w-16 h-16 shrink-0 bg-slate-200 rounded-xl animate-pulse" />
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-3">
              <Link
                href={`/signup?intent=build_card&template=${template.id}`}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <span>Use This Template Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href={`/v/${template.id}`}
                  target="_blank"
                  className="py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  <span>Full Screen Demo</span>
                </Link>

                <button
                  type="button"
                  onClick={onClose}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
                >
                  Close Preview
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-400 font-medium">
                100% Free Quick Preview &bull; No Login Or Credit Card Required
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
