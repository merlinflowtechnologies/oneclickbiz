'use client';

import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  Upload, 
  Check, 
  X, 
  Image as ImageIcon, 
  ArrowRight, 
  Layers, 
  Copy, 
  CheckCircle2, 
  HelpCircle,
  QrCode,
  Wifi,
  Download,
  Palette,
  Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface CanvaAdobeArtworkConfig {
  frontArtworkUrl: string;
  backArtworkUrl: string;
  isCustomArtworkActive: boolean;
  qrPosition: 'bottom-right' | 'center' | 'top-right' | 'bottom-left' | 'none';
  qrSize: 'small' | 'medium' | 'large';
  showNfcBadge: boolean;
  artworkSource: 'canva' | 'adobe' | 'custom';
}

interface CanvaAdobeStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CanvaAdobeArtworkConfig;
  onUpdateConfig: (newConfig: Partial<CanvaAdobeArtworkConfig>) => void;
  cardSlug: string;
  companyName: string;
}

export default function CanvaAdobeStudioModal({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  cardSlug,
  companyName
}: CanvaAdobeStudioModalProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'canva-launch' | 'adobe-launch' | 'guide'>('upload');
  const [copiedLink, setCopiedLink] = useState(false);
  const frontInputRef = useRef<HTMLInputElement | null>(null);
  const backInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (type: 'front' | 'back', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, SVG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const url = event.target.result as string;
        if (type === 'front') {
          onUpdateConfig({ frontArtworkUrl: url, isCustomArtworkActive: true });
        } else {
          onUpdateConfig({ backArtworkUrl: url, isCustomArtworkActive: true });
        }
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.7 }
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const copyProfileUrl = () => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/v/${cardSlug}` : `https://oneclickbiz.in/v/${cardSlug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Direct Canva & Adobe Express Template links for 3.5" x 2" business cards
  const canvaTemplateUrl = `https://www.canva.com/create/business-cards/`;
  const canvaSearchUrl = `https://www.canva.com/templates/?query=luxury+business+card`;
  const adobeExpressUrl = `https://express.adobe.com/express-apps/business-card-maker/`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-purple-500/20 text-amber-300 text-[11px] font-semibold border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" /> Canva &amp; Adobe Express Studio Import
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              Import Custom Card Artwork
            </h2>
            <p className="text-xs text-slate-400">
              Design in Canva or Adobe Express, export high-res artwork, and let OneClickBiz overlay dynamic QR codes.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-800 bg-slate-950/40">
          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-3 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'upload'
                ? 'text-indigo-400 border-indigo-500'
                : 'text-slate-400 border-transparent hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4" /> 1. Upload Front &amp; Back Artwork
          </button>

          <button
            onClick={() => setActiveTab('canva-launch')}
            className={`pb-3 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'canva-launch'
                ? 'text-cyan-400 border-cyan-500'
                : 'text-slate-400 border-transparent hover:text-white'
            }`}
          >
            <Palette className="w-4 h-4 text-cyan-400" /> 2. Design in Canva
          </button>

          <button
            onClick={() => setActiveTab('adobe-launch')}
            className={`pb-3 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'adobe-launch'
                ? 'text-rose-400 border-rose-500'
                : 'text-slate-400 border-transparent hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-rose-400" /> 3. Design in Adobe Express
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`pb-3 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'guide'
                ? 'text-amber-400 border-amber-500'
                : 'text-slate-400 border-transparent hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4" /> How It Works
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: UPLOAD ARTWORK */}
          {activeTab === 'upload' && (
            <div className="space-y-6">
              
              {/* Toggle switch for Custom Artwork Mode */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">Enable Custom Canva / Adobe Artwork</span>
                    {config.isCustomArtworkActive && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">
                    When active, your uploaded graphics replace the default templates in the 3D flip card and 300 DPI PDF export.
                  </p>
                </div>

                <button
                  onClick={() => onUpdateConfig({ isCustomArtworkActive: !config.isCustomArtworkActive })}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                    config.isCustomArtworkActive ? 'bg-indigo-600' : 'bg-slate-800'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    config.isCustomArtworkActive ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Front & Back Dropzones */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Front Card Artwork */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-300">Front Card Graphic (3.5&quot; × 2&quot;)</label>
                    {config.frontArtworkUrl && (
                      <button
                        onClick={() => onUpdateConfig({ frontArtworkUrl: '' })}
                        className="text-[11px] text-rose-400 hover:text-rose-300 font-semibold"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <input
                    ref={frontInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/svg+xml, image/webp"
                    onChange={(e) => handleFileUpload('front', e)}
                    className="hidden"
                  />

                  <div 
                    onClick={() => frontInputRef.current?.click()}
                    className={`
                      aspect-[1.75/1] rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden relative flex flex-col items-center justify-center p-4 text-center group
                      ${config.frontArtworkUrl 
                        ? 'border-indigo-500/50 bg-slate-950' 
                        : 'border-slate-700 hover:border-indigo-500/50 bg-slate-950/60 hover:bg-slate-950'}
                    `}
                  >
                    {config.frontArtworkUrl ? (
                      <>
                        <img 
                          src={config.frontArtworkUrl} 
                          alt="Front Artwork" 
                          className="w-full h-full object-cover rounded-xl"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                          <span className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5">
                            <Upload className="w-3.5 h-3.5" /> Replace Front Image
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                          <Upload className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Upload Front Card Design</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">PNG, JPG or SVG (1050 × 600 px)</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Back Card Artwork */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-300">Back Card Graphic (3.5&quot; × 2&quot;)</label>
                    {config.backArtworkUrl && (
                      <button
                        onClick={() => onUpdateConfig({ backArtworkUrl: '' })}
                        className="text-[11px] text-rose-400 hover:text-rose-300 font-semibold"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <input
                    ref={backInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/svg+xml, image/webp"
                    onChange={(e) => handleFileUpload('back', e)}
                    className="hidden"
                  />

                  <div 
                    onClick={() => backInputRef.current?.click()}
                    className={`
                      aspect-[1.75/1] rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden relative flex flex-col items-center justify-center p-4 text-center group
                      ${config.backArtworkUrl 
                        ? 'border-purple-500/50 bg-slate-950' 
                        : 'border-slate-700 hover:border-purple-500/50 bg-slate-950/60 hover:bg-slate-950'}
                    `}
                  >
                    {config.backArtworkUrl ? (
                      <>
                        <img 
                          src={config.backArtworkUrl} 
                          alt="Back Artwork" 
                          className="w-full h-full object-cover rounded-xl"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                          <span className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold flex items-center gap-1.5">
                            <Upload className="w-3.5 h-3.5" /> Replace Back Image
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                          <Upload className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Upload Back Card Design</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">PNG, JPG or SVG (1050 × 600 px)</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Dynamic Overlay Controls */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-indigo-400" /> Dynamic Smart Overlay Settings
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* QR Position */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-400">QR Code Overlay Position</label>
                    <select
                      value={config.qrPosition}
                      onChange={(e) => onUpdateConfig({ qrPosition: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="bottom-right">Bottom Right (Standard)</option>
                      <option value="center">Center of Back</option>
                      <option value="top-right">Top Right Corner</option>
                      <option value="bottom-left">Bottom Left Corner</option>
                      <option value="none">Hide (QR is already in artwork)</option>
                    </select>
                  </div>

                  {/* QR Size */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-400">QR Code Size</label>
                    <select
                      value={config.qrSize}
                      onChange={(e) => onUpdateConfig({ qrSize: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="small">Compact (70px)</option>
                      <option value="medium">Medium (90px)</option>
                      <option value="large">Large (110px)</option>
                    </select>
                  </div>

                  {/* QR Indicator */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-400">Smart QR Badge</label>
                    <button
                      onClick={() => onUpdateConfig({ showNfcBadge: !config.showNfcBadge })}
                      className={`w-full px-3 py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                        config.showNfcBadge
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                          : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>{config.showNfcBadge ? 'QR Badge ON' : 'QR Badge OFF'}</span>
                    </button>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CANVA LAUNCHER */}
          {activeTab === 'canva-launch' && (
            <div className="space-y-6">
              
              <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-slate-900 border border-cyan-500/30 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">
                      CANVA PRO / FREE WORKFLOW
                    </span>
                    <h3 className="text-base font-bold text-white">Create in Canva with 1-Click</h3>
                    <p className="text-xs text-slate-300">
                      Open Canva’s vast library of luxury business card templates, design your card, and download as PNG/PDF.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={canvaSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95"
                  >
                    <span>Browse 1,000+ Luxury Canva Templates</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={canvaTemplateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold flex items-center gap-2 border border-slate-700 transition-all"
                  >
                    <span>Start Blank 3.5&quot; × 2&quot; Canvas</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Your Dynamic Profile Link to embed in Canva */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300">Your Dynamic Profile URL (Copy for Canva QR generator)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={typeof window !== 'undefined' ? `${window.location.origin}/v/${cardSlug}` : `https://oneclickbiz.in/v/${cardSlug}`}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-indigo-300 select-all"
                  />
                  <button
                    onClick={copyProfileUrl}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shrink-0"
                  >
                    {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  Tip: In Canva, click <strong>Apps &rarr; QR Code</strong> and paste this link to bake a live dynamic QR directly into your artwork!
                </p>
              </div>

              {/* Next Step Banner */}
              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Finished designing in Canva?</p>
                  <p className="text-[11px] text-indigo-300/70">Export as PNG (Front &amp; Back) and head to the Upload tab.</p>
                </div>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <span>Go to Upload</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}

          {/* TAB 3: ADOBE EXPRESS LAUNCHER */}
          {activeTab === 'adobe-launch' && (
            <div className="space-y-6">
              
              <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-950/40 via-red-950/30 to-slate-900 border border-rose-500/30 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/30">
                      ADOBE EXPRESS WORKFLOW
                    </span>
                    <h3 className="text-base font-bold text-white">Design in Adobe Express</h3>
                    <p className="text-xs text-slate-300">
                      Leverage Adobe’s world-class typography, generative AI styles, and vector assets.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={adobeExpressUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95"
                  >
                    <span>Launch Adobe Express Business Card Maker</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Dynamic URL Copy */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300">Your Dynamic Card Destination URL</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={typeof window !== 'undefined' ? `${window.location.origin}/v/${cardSlug}` : `https://oneclickbiz.in/v/${cardSlug}`}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-rose-300 select-all"
                  />
                  <button
                    onClick={copyProfileUrl}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shrink-0"
                  >
                    {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                  </button>
                </div>
              </div>

              {/* Action */}
              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/20 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Finished in Adobe Express?</p>
                  <p className="text-[11px] text-rose-300/70">Export page 1 &amp; page 2 as PNG, then upload here.</p>
                </div>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <span>Go to Upload</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}

          {/* TAB 4: STEP BY STEP GUIDE */}
          {activeTab === 'guide' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white">3 Simple Steps to Custom Artwork</h3>

              <div className="space-y-3">
                
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white">Create on Canva or Adobe Express</h4>
                    <p className="text-[11px] text-slate-400">
                      Use standard business card dimensions: <strong>3.5&quot; × 2.0&quot;</strong> (or <strong>1050 × 600 px</strong>). Design your front and back layout with your preferred colors, photos, and fonts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="w-7 h-7 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white">Export as High-Resolution PNG</h4>
                    <p className="text-[11px] text-slate-400">
                      Click <strong>Share &rarr; Download &rarr; PNG</strong> (or PDF Print). Save Front Page and Back Page as separate image files.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white">Upload to OneClickBiz &amp; Download 300 DPI PDF</h4>
                    <p className="text-[11px] text-slate-400">
                      Upload your front and back images in the <strong>Upload</strong> tab. OneClickBiz automatically hooks up the live 3D flip card, embeds your dynamic QR code, and generates the print-ready PDF for your printer!
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            {config.isCustomArtworkActive ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Custom Canva/Adobe artwork is active on your card!
              </span>
            ) : (
              <span>Built-in template is currently active.</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md active:scale-95"
            >
              Done &amp; Apply to Card
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
