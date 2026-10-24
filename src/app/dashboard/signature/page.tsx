'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Mail,
  Copy,
  Check,
  Sparkles,
  Phone,
  Globe,
  MapPin,
  QrCode,
  Sliders,
  Palette,
  Eye,
  Download,
  ExternalLink,
  Shield,
  MessageCircle,
  Share2,
  ArrowRight
} from 'lucide-react';
import { INITIAL_PROFILES } from '@/lib/data-store';

type SignatureTemplate = 'modern' | 'classic' | 'compact' | 'minimal' | 'banner';

export default function EmailSignaturePage() {
  const [profile, setProfile] = useState<any>(INITIAL_PROFILES[0]);
  const [template, setTemplate] = useState<SignatureTemplate>('modern');
  const [accentColor, setAccentColor] = useState<string>('#6366f1');
  const [fontFamily, setFontFamily] = useState<string>('Arial, Helvetica, sans-serif');
  const [copiedRich, setCopiedRich] = useState<boolean>(false);
  const [copiedHtml, setCopiedHtml] = useState<boolean>(false);

  // Toggle Options
  const [showAvatar, setShowAvatar] = useState<boolean>(true);
  const [showQr, setShowQr] = useState<boolean>(true);
  const [showPhone, setShowPhone] = useState<boolean>(true);
  const [showAddress, setShowAddress] = useState<boolean>(true);
  const [showSocials, setShowSocials] = useState<boolean>(true);
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(true);
  const [showBannerCta, setShowBannerCta] = useState<boolean>(true);
  const [bannerText, setBannerText] = useState<string>('✨ Book a Strategy Consultation on My Digital Card');

  const previewRef = useRef<HTMLDivElement>(null);

  // Load user profile from localStorage if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedUser = localStorage.getItem('oneclickbiz_user');
        const profilesRaw = localStorage.getItem('oneclickbiz_profiles');
        if (profilesRaw) {
          const profiles = JSON.parse(profilesRaw);
          if (profiles && profiles.length > 0) {
            setProfile(profiles[0]);
            return;
          }
        }
        if (storedUser) {
          const user = JSON.parse(storedUser);
          const matched = INITIAL_PROFILES.find(p => p.slug === user.slug);
          if (matched) setProfile(matched);
        }
      } catch (e) {
        console.error('Error loading profile for signature:', e);
      }
    }
  }, []);

  const cardUrl = `https://oneclickbiz.in/v/${profile.slug || 'alex'}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(cardUrl)}&color=${accentColor.replace('#', '')}&bgcolor=ffffff`;

  // Generate Raw HTML for Email Signature
  const generateRawHtml = () => {
    const avatarImg = showAvatar && profile.avatarUrl 
      ? `<td style="vertical-align: top; padding-right: 16px;">
          <img src="${profile.avatarUrl}" alt="${profile.fullName}" width="80" height="80" style="border-radius: 50%; display: block; object-fit: cover; border: 2px solid ${accentColor};" />
        </td>` 
      : '';

    const qrImg = showQr 
      ? `<td style="vertical-align: top; padding-left: 16px; border-left: 1px solid #e2e8f0; text-align: center;">
          <a href="${cardUrl}" target="_blank" style="text-decoration: none;">
            <img src="${qrUrl}" alt="Scan Card" width="70" height="70" style="display: block; border-radius: 8px; border: 1px solid #cbd5e1;" />
            <span style="font-size: 9px; color: ${accentColor}; font-weight: bold; display: block; margin-top: 4px;">TAP TO VIEW</span>
          </a>
        </td>` 
      : '';

    const bannerBlock = showBannerCta 
      ? `<tr>
          <td colspan="3" style="padding-top: 12px;">
            <a href="${cardUrl}" target="_blank" style="display: block; background: #f8fafc; border: 1px dashed ${accentColor}; border-radius: 8px; padding: 8px 12px; text-decoration: none; color: #1e293b; font-size: 11px; font-weight: bold; text-align: center;">
              ${bannerText} →
            </a>
          </td>
        </tr>` 
      : '';

    const disclaimerBlock = showDisclaimer 
      ? `<tr>
          <td colspan="3" style="padding-top: 10px; font-size: 9px; color: #94a3b8; line-height: 1.3;">
            CONFIDENTIALITY NOTICE: This email transmission may contain confidential or legally privileged information intended only for the use of the intended recipient.
          </td>
        </tr>` 
      : '';

    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${fontFamily}; color: #334155; font-size: 12px; line-height: 1.4; max-width: 520px;">
  <tr>
    ${avatarImg}
    <td style="vertical-align: top;">
      <div style="font-size: 16px; font-weight: bold; color: #0f172a; margin-bottom: 2px;">
        ${profile.fullName || 'Kishore Patel'}
      </div>
      <div style="font-size: 12px; color: ${accentColor}; font-weight: 600; margin-bottom: 8px;">
        ${profile.designation || 'Founder & Managing Director'} • ${profile.businessName || 'Himastech Digital Reality'}
      </div>
      <table cellpadding="0" cellspacing="0" border="0" style="font-size: 11px; color: #475569;">
        ${showPhone && profile.phone ? `<tr><td style="padding: 1px 0;">📞 <a href="tel:${profile.phone}" style="color: #475569; text-decoration: none;">${profile.phone}</a></td></tr>` : ''}
        ${profile.email ? `<tr><td style="padding: 1px 0;">✉️ <a href="mailto:${profile.email}" style="color: #475569; text-decoration: none;">${profile.email}</a></td></tr>` : ''}
        <tr><td style="padding: 1px 0;">🌐 <a href="${cardUrl}" target="_blank" style="color: ${accentColor}; font-weight: bold; text-decoration: none;">${cardUrl.replace('https://', '')}</a></td></tr>
        ${showAddress && profile.address ? `<tr><td style="padding: 1px 0;">📍 <span style="color: #64748b;">${profile.address}</span></td></tr>` : ''}
      </table>
    </td>
    ${qrImg}
  </tr>
  ${bannerBlock}
  ${disclaimerBlock}
</table>`;
  };

  // Copy Rich HTML to Clipboard
  const handleCopyRichSignature = async () => {
    try {
      const html = generateRawHtml();
      const textBlob = new Blob([html.replace(/<[^>]*>?/gm, '')], { type: 'text/plain' });
      const htmlBlob = new Blob([html], { type: 'text/html' });

      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/plain': textBlob,
            'text/html': htmlBlob
          })
        ]);
        setCopiedRich(true);
        setTimeout(() => setCopiedRich(false), 3000);
      } else {
        await navigator.clipboard.writeText(html);
        setCopiedRich(true);
        setTimeout(() => setCopiedRich(false), 3000);
      }
    } catch (err) {
      console.error('Failed to copy signature:', err);
      // Fallback
      navigator.clipboard.writeText(generateRawHtml());
      setCopiedRich(true);
      setTimeout(() => setCopiedRich(false), 3000);
    }
  };

  // Copy Raw HTML Source
  const handleCopyRawHtml = async () => {
    await navigator.clipboard.writeText(generateRawHtml());
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
              <Mail className="w-3.5 h-3.5" />
              <span>Professional Email Tool</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Email Signature Generator
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Create a clickable HTML email signature linked to your digital profile for Gmail, Outlook, Apple Mail, and Thunderbird.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/dashboard/builder"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition flex items-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              <span>Profile Studio</span>
            </Link>
            <Link
              href={`/v/${profile.slug}`}
              target="_blank"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Card</span>
            </Link>
          </div>
        </div>

        {/* Main Grid: Left Controls & Right Live Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Customization Controls (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Template Selector */}
            <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                <span>Signature Layout Style</span>
              </label>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'modern', label: 'Modern Split', desc: 'Avatar + Info + QR' },
                  { id: 'classic', label: 'Classic Corporate', desc: 'Formal Navy Theme' },
                  { id: 'compact', label: 'Compact Badge', desc: 'Clean Single Row' },
                  { id: 'minimal', label: 'Minimalist', desc: 'Text Forward Sleek' },
                  { id: 'banner', label: 'Promo Banner', desc: 'With CTA Action Bar' }
                ].map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => setTemplate(tpl.id as SignatureTemplate)}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      template === tpl.id
                        ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-md'
                        : 'bg-slate-950/60 hover:bg-slate-850 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <p className={`text-xs font-bold ${template === tpl.id ? 'text-indigo-300' : 'text-slate-200'}`}>
                      {tpl.label}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{tpl.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Color & Font Settings */}
            <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-pink-400" />
                <span>Color & Typography</span>
              </label>

              {/* Accent Color Chips */}
              <div className="space-y-1.5">
                <span className="text-[11px] text-slate-400 font-medium">Brand Accent Color</span>
                <div className="flex items-center gap-2">
                  {['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#0f172a'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setAccentColor(c)}
                      style={{ backgroundColor: c }}
                      className={`w-7 h-7 rounded-full transition-transform border-2 ${
                        accentColor === c ? 'scale-125 border-white shadow-lg' : 'border-slate-800 hover:scale-110'
                      }`}
                    />
                  ))}
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-7 h-7 rounded-full bg-transparent border-0 cursor-pointer"
                    title="Custom Color"
                  />
                </div>
              </div>

              {/* Font Family Selector */}
              <div className="space-y-1.5">
                <span className="text-[11px] text-slate-400 font-medium">Email Safe Font</span>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Arial, Helvetica, sans-serif">Arial / Helvetica (Universal)</option>
                  <option value="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">Segoe UI / Modern</option>
                  <option value="Georgia, Times, serif">Georgia (Editorial Serif)</option>
                  <option value="'Trebuchet MS', Lucida, sans-serif">Trebuchet MS (Clean)</option>
                  <option value="Verdana, Geneva, sans-serif">Verdana (Clear)</option>
                </select>
              </div>
            </div>

            {/* Toggle Elements */}
            <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Visible Elements
              </label>

              <div className="space-y-2 text-xs">
                {[
                  { label: 'Show Avatar Photo', state: showAvatar, setter: setShowAvatar },
                  { label: 'Show Dynamic QR Code', state: showQr, setter: setShowQr },
                  { label: 'Show Phone Number', state: showPhone, setter: setShowPhone },
                  { label: 'Show Physical Address', state: showAddress, setter: setShowAddress },
                  { label: 'Show CTA Action Banner', state: showBannerCta, setter: setShowBannerCta },
                  { label: 'Show Legal Confidentiality Disclaimer', state: showDisclaimer, setter: setShowDisclaimer }
                ].map((item, i) => (
                  <label key={i} className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 cursor-pointer hover:bg-slate-900">
                    <span className="text-slate-300">{item.label}</span>
                    <input
                      type="checkbox"
                      checked={item.state}
                      onChange={(e) => item.setter(e.target.checked)}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-0 focus:ring-offset-0 bg-slate-800 border-slate-700 cursor-pointer"
                    />
                  </label>
                ))}
              </div>

              {showBannerCta && (
                <div className="pt-2 space-y-1">
                  <span className="text-[11px] text-slate-400">Custom Banner Action Text</span>
                  <input
                    type="text"
                    value={bannerText}
                    onChange={(e) => setBannerText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Live Rendered Signature Preview & Action Bar (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Preview Container Box */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-bold text-white ml-2">Live Email Signature Preview</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                  ● Gmail / Outlook Ready
                </span>
              </div>

              {/* White Email Canvas */}
              <div className="p-6 rounded-2xl bg-white text-slate-900 shadow-inner overflow-x-auto">
                <div ref={previewRef} dangerouslySetInnerHTML={{ __html: generateRawHtml() }} />
              </div>

              {/* Primary Copy Buttons Bar */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleCopyRichSignature}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white font-bold text-xs shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 transition active:scale-95"
                >
                  {copiedRich ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Copied Rich Signature! Ready to Paste</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Rich Signature (for Gmail / Outlook)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleCopyRawHtml}
                  className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition"
                >
                  {copiedHtml ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>Copy HTML Code</span>
                </button>
              </div>

            </div>

            {/* Quick 3-Step Setup Guide */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>How to Install in 30 Seconds</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center">
                    1
                  </div>
                  <p className="font-bold text-white">Click &quot;Copy Rich Signature&quot;</p>
                  <p className="text-slate-400 text-[11px]">Copies the styled format directly to your clipboard.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="w-6 h-6 rounded-full bg-purple-600 text-white font-black text-xs flex items-center justify-center">
                    2
                  </div>
                  <p className="font-bold text-white">Open Email Settings</p>
                  <p className="text-slate-400 text-[11px]">Go to Gmail Settings → General → Signature (or Outlook Settings).</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="w-6 h-6 rounded-full bg-pink-600 text-white font-black text-xs flex items-center justify-center">
                    3
                  </div>
                  <p className="font-bold text-white">Paste (Cmd/Ctrl + V) & Save</p>
                  <p className="text-slate-400 text-[11px]">Paste directly into the box. All links and images remain live!</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
