'use client';

import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, Sparkles, Share, PlusSquare } from 'lucide-react';

interface PWAInstallPromptProps {
  cardName?: string;
  avatarUrl?: string;
}

export default function PWAInstallPrompt({ cardName = 'Digital Business Card', avatarUrl }: PWAInstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [showIosGuide, setShowIosGuide] = useState<boolean>(false);

  useEffect(() => {
    // Check if dismissed before in session
    if (sessionStorage.getItem('oneclickbiz_pwa_dismissed')) {
      return;
    }

    // Detect iOS
    const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone;
    
    if (isIosDevice && !isStandalone) {
      // Show after a brief delay
      const timer = setTimeout(() => {
        setIsIOS(true);
        setShowPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }

    // Chrome / Android beforeinstallprompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => setShowPrompt(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIosGuide(true);
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('oneclickbiz_pwa_dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <>
      {/* Floating Bottom PWA Banner */}
      <div className="fixed bottom-4 inset-x-4 max-w-md mx-auto z-50 animate-in slide-in-from-bottom-5 duration-500">
        <div className="p-4 rounded-3xl bg-slate-900/95 border border-indigo-500/30 backdrop-blur-2xl shadow-2xl shadow-indigo-950/60 flex items-center justify-between gap-3 text-left">
          
          <div className="flex items-center gap-3 min-w-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={cardName}
                className="w-11 h-11 rounded-2xl object-cover border border-indigo-500/40 shrink-0"
              />
            ) : (
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shrink-0 shadow-md">
                <Smartphone className="w-5 h-5" />
              </div>
            )}

            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                <span>Save {cardName}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                Install on your phone home screen
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleInstallClick}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-bold text-[11px] shadow-md flex items-center gap-1 hover:opacity-90 active:scale-95 transition"
            >
              <Download className="w-3 h-3" />
              <span>Install</span>
            </button>

            <button
              onClick={handleDismiss}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* iOS Safari Instructions Sheet */}
      {showIosGuide && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mx-auto">
              <Smartphone className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Add to Home Screen (iOS)</h3>
              <p className="text-xs text-slate-400">Save this card as a standalone app on your iPhone:</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-left space-y-2.5 text-slate-300">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                <span>Tap the <strong>Share</strong> button <Share className="w-3.5 h-3.5 inline mx-1 text-indigo-400" /> at bottom of Safari</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                <span>Scroll down and select <strong>&quot;Add to Home Screen&quot;</strong> <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-emerald-400" /></span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                <span>Tap <strong>&quot;Add&quot;</strong> in top-right corner</span>
              </div>
            </div>

            <button
              onClick={() => setShowIosGuide(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition"
            >
              Got It!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
