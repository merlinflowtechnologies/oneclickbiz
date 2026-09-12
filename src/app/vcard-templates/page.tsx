'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import {
  VCARD_TEMPLATES_CATALOG,
  VCardTemplateItem
} from '@/data/vcardTemplates';
import {
  Search,
  Sparkles,
  ArrowRight,
  Eye,
  CheckCircle2,
  X,
  ExternalLink,
  Layers,
  Smartphone,
  Share2,
  PhoneCall,
  MessageCircle,
  Download
} from 'lucide-react';

export default function VCardTemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewTemplate, setPreviewTemplate] = useState<VCardTemplateItem | null>(null);

  const categories = [
    { id: 'all', label: `All Templates (${VCARD_TEMPLATES_CATALOG.length})` },
    { id: 'Creative', label: 'Creative & Media' },
    { id: 'Corporate', label: 'Corporate & Legal' },
    { id: 'Services', label: 'Services & Lifestyle' },
    { id: 'Healthcare', label: 'Healthcare & Wellness' },
    { id: 'Real Estate', label: 'Real Estate & Retail' },
    { id: 'Tech', label: 'Tech & Engineering' },
  ];

  const filteredTemplates = useMemo(() => {
    return VCARD_TEMPLATES_CATALOG.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* Page Banner Header */}
        <section className="relative pt-32 pb-16 overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
          {/* Ambient Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-primary-500/15 via-accent-500/15 to-indigo-600/15 blur-[160px] pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-primary-500/10 via-accent-500/10 to-indigo-500/10 border border-primary-500/20 text-primary-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-primary-400" />
              Official OneClickBiz Templates
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              vCard{' '}
              <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-indigo-400 bg-clip-text text-transparent">
                Templates
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed">
              Explore 28+ designer-curated digital business card templates crafted for consultants, doctors, real estate agencies, creative artists, and modern enterprises.
            </p>

            {/* Search and Filters Bar */}
            <div className="max-w-xl mx-auto pt-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates (e.g. Reporter, Doctor, Real Estate, Architect)..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all shadow-xl"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25 scale-105 font-bold'
                      : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Templates Gallery Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-slate-400">
              Showing <span className="text-white font-bold">{filteredTemplates.length}</span> of {VCARD_TEMPLATES_CATALOG.length} templates
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              All templates include 1-Click .VCF &amp; NFC Pairing
            </div>
          </div>

          {filteredTemplates.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 p-8">
              <Layers className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-1">No templates found</h3>
              <p className="text-sm text-slate-400 mb-6">
                No templates matched your search "{searchQuery}". Try a different keyword or category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-5 py-2.5 rounded-xl bg-primary-600 text-white text-xs font-bold hover:bg-primary-500 transition-all"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="group rounded-3xl border border-slate-800 bg-slate-900/60 hover:border-slate-700/80 transition-all duration-300 flex flex-col overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1 relative"
                >
                  {/* Ribbon Badge if present */}
                  {template.badge && (
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-md">
                        {template.badge}
                      </span>
                    </div>
                  )}

                  {/* Card Image Container with smooth auto-scroll on hover */}
                  <div
                    onClick={() => setPreviewTemplate(template)}
                    className="relative h-[480px] sm:h-[540px] w-full bg-slate-900 overflow-hidden cursor-pointer group/img flex items-center justify-center"
                  >
                    <img
                      src={template.imgUrl}
                      alt={template.name}
                      className="vcard-template-img w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Subtle top/bottom gradient cues */}
                    <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-slate-950/70 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none flex items-end justify-center pb-2">
                      <span className="text-[10px] font-medium text-slate-400 opacity-80 flex items-center gap-1 bg-slate-900/80 px-2 py-0.5 rounded-full border border-slate-800/80 backdrop-blur-sm">
                        Hover to scroll vCard
                      </span>
                    </div>

                    {/* Hover Overlay with Preview button */}
                    <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewTemplate(template);
                        }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-xl hover:bg-slate-100 hover:scale-105 transition-all"
                      >
                        <Eye className="w-4 h-4 text-primary-600" />
                        Quick Preview
                      </button>

                      <Link
                        href={`/signup?intent=build_card&template=${template.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-bold text-xs shadow-xl hover:scale-105 transition-all"
                      >
                        Use This Template
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Card Footer Details */}
                  <div className="p-6 border-t border-slate-800/80 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h3 className="text-xl font-extrabold text-white group-hover:text-primary-400 transition-colors">
                          {template.name}
                        </h3>
                        <span className="text-[11px] font-semibold text-slate-400 px-2.5 py-0.5 rounded-md bg-slate-800/80">
                          {template.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">
                        {template.tagline}
                      </p>
                    </div>

                    {/* Features checklist */}
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {template.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary-400 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Actions */}
                    <div className="pt-2 flex items-center gap-2">
                      <Link
                        href={`/signup?intent=build_card&template=${template.id}`}
                        className="flex-1 py-2.5 px-4 rounded-xl text-center text-xs font-bold text-white bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 shadow-md shadow-primary-500/20 hover:scale-[1.02] transition-all"
                      >
                        Use Template
                      </Link>
                      <button
                        onClick={() => setPreviewTemplate(template)}
                        className="py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs font-semibold flex items-center gap-1.5"
                        title="Preview template"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Global Superpowers Banner */}
        <section className="py-16 bg-slate-900/60 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Need a Custom Enterprise Design?
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  All templates include custom company domains, NFC smart card hardware pairing, CRM leads integration, and automated WhatsApp mini-stores.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <Link
                  href="/signup?intent=build_card"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-bold text-sm shadow-xl shadow-primary-500/25 hover:scale-105 transition-all"
                >
                  Create Your Free Card Now
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white font-semibold text-sm transition-all"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quick Preview Modal */}
      {previewTemplate && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setPreviewTemplate(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-lg font-bold text-white">
                  {previewTemplate.name}
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                  {previewTemplate.category}
                </span>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Card visual */}
              <div className="relative aspect-[3/4] w-full max-w-[280px] mx-auto bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center p-2">
                <img
                  src={previewTemplate.imgUrl}
                  alt={previewTemplate.name}
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>

              {/* Template specs */}
              <div className="space-y-5">
                <div>
                  <h4 className="text-base font-bold text-white mb-1">
                    Template Highlights
                  </h4>
                  <p className="text-xs text-slate-400">
                    {previewTemplate.tagline}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Included Features:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {previewTemplate.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 space-y-2.5">
                  <Link
                    href={`/signup?intent=build_card&template=${previewTemplate.id}`}
                    className="w-full py-3 px-5 rounded-xl text-center text-xs font-bold text-white bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 shadow-lg shadow-primary-500/25 hover:scale-[1.02] transition-all block"
                  >
                    Build Card with this Template →
                  </Link>
                  <Link
                    href={`/v/${previewTemplate.id}`}
                    target="_blank"
                    className="w-full py-2.5 px-4 rounded-xl text-center text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 transition-all flex items-center justify-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open Live Interactive Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
