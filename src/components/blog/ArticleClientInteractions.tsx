'use client';

import React, { useState } from 'react';
import { Share2, Copy, Check, MessageCircle } from 'lucide-react';

interface ArticleClientInteractionsProps {
  title: string;
  slug: string;
}

export default function ArticleClientInteractions({ title, slug }: ArticleClientInteractionsProps) {
  const [copied, setCopied] = useState(false);
  const BASE = typeof window !== 'undefined' ? window.location.origin : 'https://oneclickbiz.in';
  const articleUrl = `${BASE}/blog/${slug}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(articleUrl)}&via=oneclickbiz`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${title}\n${articleUrl}`)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-1.5 text-sm text-slate-600 font-semibold">
          <Share2 size={15} className="text-indigo-600" />
          Share article:
        </span>

        <button
          id="article-share-twitter"
          onClick={shareTwitter}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium hover:text-slate-950 hover:border-slate-400 hover:bg-slate-100 transition-all shadow-sm"
        >
          <span className="font-bold text-xs">𝕏</span>
          Twitter
        </button>

        <button
          id="article-share-whatsapp"
          onClick={shareWhatsApp}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all shadow-sm"
        >
          <MessageCircle size={15} className="text-emerald-600" />
          WhatsApp
        </button>

        <button
          id="article-copy-link"
          onClick={copyLink}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all shadow-sm ${
            copied
              ? 'bg-emerald-50 border-emerald-300 text-emerald-700 font-bold'
              : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/50'
          }`}
        >
          {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
}
