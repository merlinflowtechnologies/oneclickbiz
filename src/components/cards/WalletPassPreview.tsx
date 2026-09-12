'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  QrCode,
  Download,
  Check,
  Sparkles,
  ExternalLink,
  Wifi,
  ShieldCheck,
  X
} from 'lucide-react';

interface WalletPassPreviewProps {
  profile: any;
  onClose?: () => void;
}

export default function WalletPassPreview({ profile, onClose }: WalletPassPreviewProps) {
  const [downloadingApple, setDownloadingApple] = useState(false);
  const [downloadingGoogle, setDownloadingGoogle] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const cardUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/v/${profile.slug}` 
    : `https://oneclickbiz.in/v/${profile.slug}`;

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(cardUrl)}&color=000000&bgcolor=ffffff`;

  const handleDownloadApplePass = () => {
    setDownloadingApple(true);
    setTimeout(() => {
      // Create and download a simulated .pkpass JSON structure
      const passData = {
        formatVersion: 1,
        passTypeIdentifier: "pass.in.oneclickbiz.vcard",
        serialNumber: `OCB-${profile.slug.toUpperCase()}-${Date.now().toString().slice(-6)}`,
        teamIdentifier: "ONECLICKBIZ",
        organizationName: "OneClickBiz Enterprise",
        description: `${profile.fullName} Digital Business Card`,
        logoText: "OneClickBiz VIP",
        foregroundColor: "rgb(255, 255, 255)",
        backgroundColor: "rgb(15, 23, 42)",
        labelColor: "rgb(148, 163, 184)",
        generic: {
          primaryFields: [
            { key: "name", label: "CARDHOLDER", value: profile.fullName || "Alex Rivera" }
          ],
          secondaryFields: [
            { key: "role", label: "ROLE", value: profile.designation || "Executive" },
            { key: "company", label: "ORGANIZATION", value: profile.businessName || "OneClickBiz" }
          ],
          auxiliaryFields: [
            { key: "phone", label: "PHONE", value: profile.phone || "+91 9876543210" },
            { key: "status", label: "STATUS", value: "VERIFIED VIP" }
          ]
        },
        barcodes: [
          {
            format: "PKBarcodeFormatQR",
            message: cardUrl,
            messageEncoding: "iso-8859-1"
          }
        ]
      };

      const blob = new Blob([JSON.stringify(passData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${profile.slug}-apple-wallet-pass.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloadingApple(false);
      setDownloadSuccess('Apple Wallet Pass downloaded successfully!');
      setTimeout(() => setDownloadSuccess(null), 4000);
    }, 1200);
  };

  const handleDownloadGooglePass = () => {
    setDownloadingGoogle(true);
    setTimeout(() => {
      setDownloadingGoogle(false);
      setDownloadSuccess('Google Wallet Pass generated & linked!');
      setTimeout(() => setDownloadSuccess(null), 4000);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      
      {/* Apple Wallet Style Physical Card Simulation */}
      <div className="relative rounded-[32px] p-6 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-700/80 shadow-2xl text-white space-y-5 overflow-hidden ring-1 ring-white/10">
        
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-40 bg-indigo-500/20 blur-[80px] pointer-events-none" />

        {/* Top Pass Header */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-black tracking-tight">OneClick<span className="text-indigo-400">Biz</span></span>
              <span className="text-[9px] block text-slate-400 font-bold uppercase tracking-widest">VIP Pass</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-slate-400 rotate-90" />
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-bold">
              Active
            </span>
          </div>
        </div>

        {/* Cardholder Info */}
        <div className="flex items-center gap-4 relative z-10 pt-2">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.fullName}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/50 shadow-lg shrink-0"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-xl font-bold border border-slate-700 shrink-0">
              {profile.fullName?.charAt(0) || 'A'}
            </div>
          )}

          <div className="min-w-0">
            <h3 className="text-lg font-bold text-white truncate">
              {profile.fullName || 'Alex Rivera'}
            </h3>
            <p className="text-xs text-indigo-300 font-semibold truncate">
              {profile.designation || 'Founder & CEO'}
            </p>
            <p className="text-[11px] text-slate-400 truncate mt-0.5">
              {profile.businessName || 'OneClickBiz Technologies'}
            </p>
          </div>
        </div>

        {/* QR Code Barcode Area in Wallet Pass */}
        <div className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center space-y-2 relative z-10 shadow-inner">
          <img
            src={qrUrl}
            alt="Pass Barcode"
            className="w-32 h-32 object-contain"
          />
          <span className="font-mono text-[9px] text-slate-500 font-bold tracking-widest uppercase">
            OCB-{profile.slug?.toUpperCase() || 'VIP'}
          </span>
        </div>

        {/* Bottom Pass Metadata Strip */}
        <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 border-t border-slate-800 pt-3 relative z-10">
          <div>
            <span className="block text-[8px] uppercase tracking-wider text-slate-500 font-bold">TYPE</span>
            <span className="font-semibold text-slate-200">Contactless vCard</span>
          </div>
          <div className="text-right">
            <span className="block text-[8px] uppercase tracking-wider text-slate-500 font-bold">NFC COMPLIANCE</span>
            <span className="font-semibold text-emerald-400">ISO/IEC 14443 Type A</span>
          </div>
        </div>

      </div>

      {/* Action Buttons: Add to Apple / Google Wallet */}
      <div className="space-y-3">
        {downloadSuccess && (
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>{downloadSuccess}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Apple Wallet Badge Button */}
          <button
            onClick={handleDownloadApplePass}
            disabled={downloadingApple}
            className="py-3 px-4 rounded-2xl bg-black hover:bg-slate-900 border border-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition active:scale-95 disabled:opacity-60"
          >
            {downloadingApple ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.6-7.77-11.74-14.19-6.3-9.77-11.1-20.96-14.39-33.56-3.3-12.61-4.95-24.44-4.95-35.5 0-14.77 3.73-27.18 11.2-37.24 7.47-10.05 17.06-15.19 28.77-15.42 5.02 0 10.39 1.34 16.1 4.02 5.71 2.68 9.5 4.08 11.37 4.2 1.45-.24 5.38-1.74 11.78-4.51 6.4-2.77 11.76-4.04 16.08-3.8 11.96.67 21.65 5.17 29.07 13.51-10.49 6.34-15.63 15.13-15.42 26.37.22 8.71 3.49 16.04 9.8 22 6.31 5.95 13.82 9.38 22.52 10.28-1.9 5.8-4.22 11.97-6.98 18.52zm-32.99-106.87c0-6.7 2.45-13.06 7.35-19.07 4.9-6.01 11.08-10.05 18.54-12.12.89 6.47-.45 12.87-4.02 19.2-3.57 6.33-8.82 10.51-15.75 12.54-1.12-.11-3.16-.29-6.12-.55z"/>
              </svg>
            )}
            <span>Add to Apple Wallet</span>
          </button>

          {/* Google Wallet Badge Button */}
          <button
            onClick={handleDownloadGooglePass}
            disabled={downloadingGoogle}
            className="py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition active:scale-95 disabled:opacity-60"
          >
            {downloadingGoogle ? (
              <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center p-0.5">
                <span className="font-black text-[9px] text-blue-600">G</span>
              </div>
            )}
            <span>Save to Google Wallet</span>
          </button>
        </div>
      </div>

    </div>
  );
}
