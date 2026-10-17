'use client';

import React, { useState, useEffect } from 'react';
import { 
  Share2, 
  Copy, 
  Check, 
  QrCode, 
  ExternalLink, 
  Sparkles, 
  X, 
  ChevronUp, 
  ChevronDown,
  ArrowRight,
  Globe
} from 'lucide-react';
import QRCode from 'qrcode';

interface SharePreviewFloatingBarProps {
  profile: {
    slug: string;
    name: string;
    company?: string;
    designation?: string;
    templateId?: string;
  };
}

export default function SharePreviewFloatingBar({ profile }: SharePreviewFloatingBarProps) {
  const [copied, setCopied] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(`https://oneclickbiz.in/v/${profile.slug}`);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fullUrl = window.location.href;
      setCurrentUrl(fullUrl);
      
      QRCode.toDataURL(fullUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff'
        }
      })
        .then((url: string) => setQrCodeDataUrl(url))
        .catch(() => {});
    }
  }, [profile.slug]);

  const handleCopyLink = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = currentUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Check out ${profile.name}'s interactive mini-website and digital profile on OneClickBiz:\n${currentUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${profile.name} - ${profile.company || 'OneClickBiz Mini-Website'}`,
          text: `Check out ${profile.name}'s official mini-website:`,
          url: currentUrl
        });
      } catch {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <>
      {/* Floating Action Bar at Bottom of Viewport */}
      <aside 
        aria-label="Share and template actions"
        className="fixed bottom-4 inset-x-3 sm:inset-x-auto sm:right-6 sm:left-auto z-40 flex flex-col items-end pointer-events-none"
      >
        <div className="pointer-events-auto">
          {isMinimized ? (
            <button
              onClick={() => setIsMinimized(false)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/95 hover:bg-slate-900 text-white text-xs font-bold shadow-2xl border border-indigo-500/40 backdrop-blur-xl hover:scale-105 active:scale-95 transition-all group"
              title="Expand Share Bar"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Share2 className="w-3.5 h-3.5 text-indigo-400 group-hover:rotate-12 transition-transform" />
              <span>Share Mini-Website</span>
              <ChevronUp className="w-3 h-3 text-slate-400" />
            </button>
          ) : (
            <div className="bg-slate-900/95 border border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl sm:rounded-full p-2 sm:py-2 sm:px-3 text-white backdrop-blur-xl flex flex-wrap sm:flex-nowrap items-center gap-2 max-w-full animate-in fade-in slide-in-from-bottom-3 duration-200">
              
              {/* Badge info */}
              <div className="hidden md:flex items-center gap-2 pr-2 border-r border-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[11px] font-bold text-slate-300 whitespace-nowrap">
                  Shareable Mini-Website
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 w-full sm:w-auto justify-between sm:justify-start">
                
                {/* 1-Click Copy Link */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer ${
                    copied 
                      ? 'bg-emerald-600 text-white ring-2 ring-emerald-400' 
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                  }`}
                  title="Copy permanent shareable link"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
                      <span className="text-emerald-200">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-indigo-300" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>

                {/* WhatsApp Share */}
                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                  title="Share directly via WhatsApp"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">WhatsApp</span>
                  <span className="xs:hidden">WA</span>
                </button>

                {/* QR Code */}
                <button
                  type="button"
                  onClick={() => setIsQrModalOpen(true)}
                  className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                  title="Scan QR Code to open on Mobile"
                >
                  <QrCode className="w-3.5 h-3.5 text-purple-300" />
                  <span className="hidden sm:inline">QR</span>
                </button>

                {/* Build with this template */}
                <a
                  href={`/signup?intent=build_card&template=${profile.slug || profile.templateId || 're-builders'}`}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 text-white shadow-md shadow-indigo-500/25 active:scale-95 transition-all whitespace-nowrap"
                >
                  <span>Use Template</span>
                  <ArrowRight className="w-3 h-3" />
                </a>

                {/* Minimize Button */}
                <button
                  type="button"
                  onClick={() => setIsMinimized(true)}
                  aria-label="Minimize share dock"
                  className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-0.5"
                  title="Minimize"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

              </div>
            </div>
          )}
        </div>
      </aside>

      {/* QR Code Modal for Real Phone Scanning */}
      {isQrModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsQrModalOpen(false)}
        >
          <div 
            className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl space-y-5 text-center relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                  <QrCode className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white text-left">Scan with Phone</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsQrModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                aria-label="Close QR Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-white p-4 rounded-2xl inline-block mx-auto shadow-xl">
              {qrCodeDataUrl ? (
                <img 
                  src={qrCodeDataUrl} 
                  alt={`QR Code for ${profile.name}`} 
                  className="w-56 h-56 mx-auto object-contain"
                />
              ) : (
                <div className="w-56 h-56 flex items-center justify-center text-slate-400 text-xs">
                  Generating QR Code...
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <p className="text-xs font-bold text-slate-200">
                {profile.name}
              </p>
              <p className="text-[11px] text-slate-400 break-all bg-slate-950 p-2 rounded-xl border border-slate-800 font-mono">
                {currentUrl}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleCopyLink}
                className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 shadow-md"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
