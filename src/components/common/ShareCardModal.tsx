'use client';

import React, { useState, useEffect } from 'react';
import {
  Share2,
  Copy,
  Check,
  QrCode,
  Download,
  Mail,
  MessageCircle,
  ExternalLink,
  Code,
  X,
  Sparkles,
  Send
} from 'lucide-react';

interface ShareCardModalProps {
  profile: any;
  onClose: () => void;
  isOpen?: boolean;
}

export default function ShareCardModal({ profile, onClose, isOpen = true }: ShareCardModalProps) {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [activeTab, setActiveTab] = useState<'social' | 'qr' | 'embed'>('social');
  const [cardUrl, setCardUrl] = useState(`https://oneclickbiz.in/v/${profile.slug}`);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCardUrl(`${window.location.origin}/v/${profile.slug}`);
    }
  }, [profile.slug]);

  if (!isOpen) return null;

  const shareText = `Connect with ${profile.fullName} (${profile.designation} at ${profile.businessName}). View mini-website & WhatsApp store: ${cardUrl}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(cardUrl)}&color=000000&bgcolor=ffffff`;

  const embedCode = `<iframe src="${cardUrl}" width="380" height="680" style="border:none; border-radius:32px; box-shadow:0 20px 50px rgba(0,0,0,0.3);" title="${profile.fullName} Mini-Website"></iframe>`;

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(cardUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 3000);
  };

  const handleCopyEmbed = async () => {
    await navigator.clipboard.writeText(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 3000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.fullName} | OneClickBiz Commercial Mini-Website`,
          text: shareText,
          url: cardUrl
        });
      } catch (err) {
        console.error('Native share error:', err);
      }
    } else {
      handleCopyUrl();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 text-white shadow-2xl space-y-5 relative max-h-[92vh] overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center text-white shadow-md">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Share Digital Business Card</h3>
              <p className="text-[10px] text-slate-400">Distribute your card across channels</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('social')}
            className={`py-2 rounded-xl transition ${
              activeTab === 'social' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Quick Share
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`py-2 rounded-xl transition ${
              activeTab === 'qr' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            QR Code
          </button>
          <button
            onClick={() => setActiveTab('embed')}
            className={`py-2 rounded-xl transition ${
              activeTab === 'embed' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Website Embed
          </button>
        </div>

        {/* Tab 1: Social Direct Share */}
        {activeTab === 'social' && (
          <div className="space-y-4">
            
            {/* Copy Link Field */}
            <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2">
              <span className="text-xs text-indigo-300 font-mono truncate px-2">
                {cardUrl}
              </span>
              <button
                onClick={handleCopyUrl}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-md transition"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUrl ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-4 gap-2.5 text-center text-[10px] font-semibold text-slate-300">
              
              {/* WhatsApp */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 hover:border-emerald-500/50 hover:bg-emerald-900/40 transition flex flex-col items-center gap-1.5 text-emerald-400"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                </div>
                <span>WhatsApp</span>
              </a>

              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(cardUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-sky-950/40 border border-sky-500/20 hover:border-sky-500/50 hover:bg-sky-900/40 transition flex flex-col items-center gap-1.5 text-sky-400"
              >
                <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
                  in
                </div>
                <span>LinkedIn</span>
              </a>

              {/* X / Twitter */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-slate-950 border border-slate-700 hover:border-slate-500 transition flex flex-col items-center gap-1.5 text-slate-200"
              >
                <div className="w-8 h-8 rounded-xl bg-black border border-slate-700 text-white flex items-center justify-center font-black">
                  𝕏
                </div>
                <span>X / Twitter</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:?subject=${encodeURIComponent(`Connecting with ${profile.fullName}`)}&body=${encodeURIComponent(shareText)}`}
                className="p-3 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 hover:border-indigo-500/50 hover:bg-indigo-900/40 transition flex flex-col items-center gap-1.5 text-indigo-400"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <span>Email</span>
              </a>

            </div>

            {/* Native Sheet Trigger */}
            {typeof navigator !== 'undefined' && (
              <button
                onClick={handleNativeShare}
                className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <Share2 className="w-3.5 h-3.5 text-pink-400" />
                <span>Open Native Phone Share Sheet</span>
              </button>
            )}

          </div>
        )}

        {/* Tab 2: QR Code */}
        {activeTab === 'qr' && (
          <div className="space-y-4 text-center">
            {(profile.avatarUrl || profile.avatar) && (
              <div className="flex flex-col items-center gap-1.5 pb-1">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-indigo-500 shadow-md bg-slate-800">
                  <img 
                    src={profile.avatarUrl || profile.avatar} 
                    alt={profile.fullName || profile.name} 
                    key={profile.avatarUrl || profile.avatar}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{profile.fullName || profile.name}</h4>
                  <p className="text-[10px] text-slate-400">{profile.designation || profile.businessName}</p>
                </div>
              </div>
            )}

            <div className="p-4 bg-white rounded-2xl inline-block shadow-xl border border-slate-800 relative">
              <img src={qrUrl} alt="QR Code" className="w-44 h-44 object-contain" />
              {(profile.avatarUrl || profile.avatar) && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white">
                    <img 
                      src={profile.avatarUrl || profile.avatar} 
                      alt={profile.fullName || profile.name} 
                      key={profile.avatarUrl || profile.avatar}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Scan with any smartphone camera to open this digital business card instantly.
            </p>
            <div className="flex items-center justify-center gap-2 pt-1">
              <a
                href={qrUrl}
                download={`${profile.slug}-qr-code.png`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:opacity-90 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Print QR (300 DPI)</span>
              </a>
            </div>
          </div>
        )}

        {/* Tab 3: Website Embed */}
        {activeTab === 'embed' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-300">
              Paste this HTML snippet into your portfolio or company website to embed a live interactive card widget:
            </p>
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-[10px] text-slate-400 break-all select-all max-h-32 overflow-y-auto">
              {embedCode}
            </div>
            <button
              onClick={handleCopyEmbed}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
            >
              {copiedEmbed ? <Check className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
              <span>{copiedEmbed ? 'Embed Code Copied!' : 'Copy Embed Code'}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
