'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import {
  VCARD_TEMPLATES_CATALOG,
  VCardTemplateItem
} from '@/data/vcardTemplates';
import TemplateQuickPreviewModal from '@/components/templates/TemplateQuickPreviewModal';
import {
  Search,
  Sparkles,
  ArrowRight,
  Eye,
  CheckCircle2,
  X,
  ExternalLink,
  Layers
} from 'lucide-react';

export default function VCardTemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewTemplate, setPreviewTemplate] = useState<VCardTemplateItem | null>(null);

  const categories = [
    { id: 'all', label: `All Templates (${VCARD_TEMPLATES_CATALOG.length})`, icon: '✨' },
    { id: 'Real Estate', label: 'Real Estate', icon: '🏠' },
    { id: 'Interior Design', label: 'Interior Design', icon: '🛋️' },
    { id: 'Fashion & Clothing', label: 'Fashion & Clothing', icon: '👗' },
    { id: 'Beauty & Personal Care', label: 'Beauty & Care', icon: '💄' },
    { id: 'Food Business', label: 'Food Business', icon: '🍽️' },
    { id: 'Healthcare', label: 'Healthcare', icon: '🏥' },
    { id: 'Education', label: 'Education', icon: '🎓' },
    { id: 'Home & Professional Services', label: 'Home Services', icon: '🛠️' },
    { id: 'Automobile', label: 'Automobile', icon: '🚗' },
    { id: 'Events & Creative', label: 'Events & Creative', icon: '📸' },
    { id: 'Professional Services', label: 'Professional', icon: '💼' },
    { id: 'Retail & Local Shops', label: 'Retail & Shops', icon: '🛍️' },
    { id: 'Travel & Hospitality', label: 'Travel & Hotels', icon: '✈️' },
  ];

  const filteredTemplates = useMemo(() => {
    return VCARD_TEMPLATES_CATALOG.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(q) ||
        item.tagline.toLowerCase().includes(q) ||
        (item.subCategory && item.subCategory.toLowerCase().includes(q)) ||
        item.features.some((f) => f.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex flex-col relative selection:bg-indigo-600 selection:text-white">
      {/* Ambient Blurred Background Lights */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-pink-500/15 blur-[120px]" />
        <div className="absolute top-[20%] right-[-5%] w-[600px] h-[600px] rounded-full bg-purple-500/15 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[600px] h-[600px] rounded-full bg-indigo-500/15 blur-[140px]" />
      </div>

      <Navbar />

      <main className="flex-1">
        {/* Page Banner Header */}
        <section className="relative pt-32 pb-16 overflow-hidden border-b border-white/10 bg-slate-950/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-indigo-300 text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              13 Industry Categories &bull; {VCARD_TEMPLATES_CATALOG.length}+ Designer Templates
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              Business{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Templates
              </span>
            </h1>

            <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
              Explore {VCARD_TEMPLATES_CATALOG.length}+ industry-crafted digital visiting card templates for Real Estate, Doctors, Boutiques, Restaurants, Salons, Institutes, Car Dealers, and Professional Consultants.
            </p>

            {/* Search and Filters Bar */}
            <div className="max-w-xl mx-auto pt-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by business (e.g. Boutique, Doctor, Saree, Bakery, CA, Hotel)..."
                  className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition-all shadow-lg backdrop-blur-xl"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
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
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-105 font-bold border border-indigo-400/50'
                      : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 hover:shadow-md border border-white/10 backdrop-blur-md'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Templates Gallery Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Canva & Adobe Express Pro Integration Banner */}
          <div className="mb-10 p-6 sm:p-8 rounded-3xl glass-card border border-white/20 shadow-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-slate-950/90 via-indigo-950/80 to-purple-950/90">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                <Sparkles className="w-3.5 h-3.5" /> 100% Canva &amp; Adobe Express Compatible
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Have a Custom Design from Canva or Adobe Express?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                Import your custom front &amp; back artwork directly into OneClickBiz. We automatically overlay dynamic QR codes, custom links, and generate 300 DPI print-ready PDFs.
              </p>
            </div>

            <div className="flex items-center flex-wrap gap-3 shrink-0">
              <Link
                href="/dashboard/visiting-cards"
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:opacity-95 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <span>Open Canva / Adobe Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-slate-300 font-medium">
              Showing <span className="text-white font-bold">{filteredTemplates.length}</span> of {VCARD_TEMPLATES_CATALOG.length} templates
            </p>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300 glass-card px-3 py-1 rounded-full border border-white/10 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              All templates include 1-Click .VCF &amp; Dynamic QR Sharing
            </div>
          </div>

          {filteredTemplates.length === 0 ? (
            <div className="text-center py-20 glass-card rounded-3xl border border-white/15 p-8 shadow-xl backdrop-blur-xl">
              <Layers className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-1">No templates found</h3>
              <p className="text-sm text-slate-400 mb-6">
                No templates matched your search &quot;{searchQuery}&quot;. Try a different keyword or category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold hover:opacity-95 transition-all shadow-md cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="group rounded-3xl border border-white/15 glass-card glass-card-hover transition-all duration-300 flex flex-col overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1 relative backdrop-blur-xl text-white"
                >
                  {/* Ribbon Badge if present */}
                  {template.badge && (
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-md">
                        {template.badge}
                      </span>
                    </div>
                  )}

                  {/* Card Image Container with smooth auto-scroll on hover */}
                  <div
                    onClick={() => setPreviewTemplate(template)}
                    className="relative h-[480px] sm:h-[540px] w-full bg-slate-950 overflow-hidden cursor-pointer group/img flex items-center justify-center"
                  >
                    <img
                      src={template.imgUrl}
                      alt={template.name}
                      className="vcard-template-img w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Subtle top/bottom gradient cues */}
                    <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-slate-950/60 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent pointer-events-none flex items-end justify-center pb-2">
                      <span className="text-[10px] font-medium text-slate-200 flex items-center gap-1 bg-slate-900/80 px-2.5 py-0.5 rounded-full border border-white/20 backdrop-blur-md shadow-sm">
                        Hover to scroll card
                      </span>
                    </div>

                    {/* Hover Overlay with Preview button */}
                    <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewTemplate(template);
                        }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-xl hover:bg-slate-100 hover:scale-105 transition-all cursor-pointer"
                      >
                        <Eye className="w-4 h-4 text-indigo-600" />
                        Quick Preview
                      </button>

                      <Link
                        href={`/signup?intent=build_card&template=${template.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-xs shadow-xl hover:scale-105 transition-all"
                      >
                        Use This Template
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Card Footer Details */}
                  <div className="p-6 border-t border-white/10 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h3 className="text-xl font-extrabold text-white group-hover:text-indigo-400 transition-colors">
                          {template.name}
                        </h3>
                        <span className="text-[11px] font-semibold text-slate-300 px-2.5 py-0.5 rounded-md bg-white/10 border border-white/15">
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
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Actions */}
                    <div className="pt-2 flex items-center gap-2">
                      <Link
                        href={`/signup?intent=build_card&template=${template.id}`}
                        className="flex-1 py-2.5 px-4 rounded-xl text-center text-xs font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-95 shadow-lg shadow-indigo-500/25 hover:scale-[1.02] transition-all"
                      >
                        Use Template
                      </Link>
                      <button
                        onClick={() => setPreviewTemplate(template)}
                        className="py-2.5 px-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition-all text-xs font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
                        title="Preview template"
                      >
                        <Eye className="w-3.5 h-3.5 text-indigo-400" />
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
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl p-8 sm:p-12 glass-card border border-white/20 shadow-2xl backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-8 bg-gradient-to-r from-slate-950/80 via-indigo-950/70 to-slate-950/80">
              <div className="space-y-3 max-w-2xl text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Need a Custom Brand or Team Design?
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  All templates include 1-click contact download (.VCF), QR sharing, direct UPI payments, and automated WhatsApp mini-stores.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <Link
                  href="/signup?intent=build_card"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 hover:scale-105 transition-all"
                >
                  Create Your Free Card Now
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all shadow-sm"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quick Interactive Preview Modal */}
      <TemplateQuickPreviewModal
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
      />

      <Footer />
    </div>
  );
}
