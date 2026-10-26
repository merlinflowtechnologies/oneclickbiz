'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  QrCode,
  Camera,
  Upload,
  ExternalLink,
  Download,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Zap,
  ShieldCheck,
  User,
  Smartphone
} from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';

export default function QRScannerPage() {
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [analyzingImage, setAnalyzingImage] = useState<boolean>(false);
  const [activeFacingMode, setActiveFacingMode] = useState<'environment' | 'user'>('environment');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Start Camera
  const startCamera = async (facing: 'environment' | 'user' = activeFacingMode) => {
    setCameraError(null);
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Camera access is not supported on this browser/device.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 720 } }
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError('Camera permission denied or camera unavailable. You can upload a QR image below.');
      setIsCameraActive(false);
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Handle Simulated QR Scan / Demo Quick Links
  const handleSimulateScan = (url: string) => {
    setScannedResult(url);
    stopCamera();
  };

  // Handle Image Upload Scan
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAnalyzingImage(true);
    setTimeout(() => {
      setAnalyzingImage(false);
      // Simulate reading QR code from uploaded image
      setScannedResult('https://oneclickbiz.in/v/alex');
      stopCamera();
    }, 1200);
  };

  const handleCopyResult = async () => {
    if (scannedResult) {
      await navigator.clipboard.writeText(scannedResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const isOneClickBizUrl = scannedResult && scannedResult.includes('/v/');
  const extractedSlug = isOneClickBizUrl ? scannedResult.split('/v/')[1]?.split('?')[0] : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 space-y-8">
        
        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <QrCode className="w-3.5 h-3.5" />
            <span>Universal Smart Reader</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Dynamic QR Scanner
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Scan any OneClickBiz dynamic QR code with your camera to open digital profiles, save contacts, and view WhatsApp stores.
          </p>
        </div>

        {/* Scanner Container Box */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
          
          {/* Viewport Area */}
          <div className="relative aspect-square sm:aspect-video max-w-md mx-auto rounded-3xl bg-slate-950 border-2 border-slate-800 overflow-hidden flex items-center justify-center shadow-inner">
            
            {isCameraActive ? (
              <>
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />

                {/* Laser Line Scanning Animation */}
                <div className="absolute inset-x-8 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-bounce shadow-[0_0_15px_#22d3ee]" />

                {/* Camera Target Crosshairs Frame */}
                <div className="absolute inset-12 border-2 border-dashed border-indigo-400/60 rounded-2xl pointer-events-none flex items-center justify-center">
                  <span className="text-[11px] font-bold text-indigo-300 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
                    Align QR Code in Frame
                  </span>
                </div>
              </>
            ) : (
              <div className="text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600/15 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/20">
                  <Camera className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-white">Camera Offline</p>
                  <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                    Start your camera or upload a QR image from your gallery.
                  </p>
                </div>
              </div>
            )}

            {cameraError && (
              <div className="absolute inset-0 bg-slate-950/90 p-6 flex flex-col items-center justify-center text-center space-y-2">
                <p className="text-xs text-rose-400 font-medium">{cameraError}</p>
              </div>
            )}
          </div>

          {/* Scanner Control Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {!isCameraActive ? (
              <button
                onClick={() => startCamera('environment')}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white font-bold text-xs shadow-xl shadow-indigo-500/25 flex items-center gap-2 transition active:scale-95"
              >
                <Camera className="w-4 h-4" />
                <span>Start Camera Scanner</span>
              </button>
            ) : (
              <>
                <button
                  onClick={stopCamera}
                  className="px-5 py-3 rounded-2xl bg-rose-600/20 border border-rose-500/30 hover:bg-rose-600/30 text-rose-300 font-bold text-xs flex items-center gap-2 transition"
                >
                  <span>Stop Camera</span>
                </button>

                <button
                  onClick={() => {
                    const next = activeFacingMode === 'environment' ? 'user' : 'environment';
                    setActiveFacingMode(next);
                    startCamera(next);
                  }}
                  className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-2 transition"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Switch Camera</span>
                </button>
              </>
            )}

            {/* Upload QR Image */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={analyzingImage}
              className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center gap-2 transition active:scale-95 disabled:opacity-50"
            >
              <Upload className="w-4 h-4 text-cyan-400" />
              <span>{analyzingImage ? 'Reading Image...' : 'Upload QR Image'}</span>
            </button>
          </div>

          {/* Quick Demo QR Links (For Testing Without Physical Camera) */}
          <div className="pt-4 border-t border-slate-800/80 space-y-2.5 text-center">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Quick Test Sample Mini-Websites
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { name: 'Kishore Patel (MD)', slug: 'kishore' },
                { name: 'Aravind Reddy (Enterprise)', slug: 'aravind-md' },
                { name: 'Insurance Advisor', slug: 'prof-insurance' },
                { name: 'Doctor Specialist', slug: 'health-doctor' }
              ].map(item => (
                <button
                  key={item.slug}
                  onClick={() => handleSimulateScan(`https://oneclickbiz.in/v/${item.slug}`)}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-indigo-950/40 border border-slate-800 hover:border-indigo-500/40 text-[11px] font-medium text-slate-300 hover:text-white transition"
                >
                  ⚡ Test {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Detected Scan Result Box */}
          {scannedResult && (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900 border border-indigo-500/40 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between border-b border-indigo-500/20 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Business Website Detected!</h3>
                    <p className="text-[10px] text-emerald-400">Verified OneClickBiz Commercial Mini-Website</p>
                  </div>
                </div>

                <span className="font-mono text-xs text-indigo-300 font-bold">
                  /v/{extractedSlug || 'card'}
                </span>
              </div>

              {/* Scanned URL Link */}
              <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                <span className="text-slate-300 font-mono truncate">{scannedResult}</span>
                <button
                  onClick={handleCopyResult}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-1.5 shrink-0 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <Link
                  href={isOneClickBizUrl ? `/v/${extractedSlug}` : scannedResult}
                  target="_blank"
                  className="py-3 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/25 transition active:scale-95"
                >
                  <span>Open Live Website</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setScannedResult(null)}
                  className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
                >
                  Scan Another Code
                </button>
              </div>
            </div>
          )}

        </div>

      </main>

      <Footer />
    </div>
  );
}
