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
  Layers,
  ChevronRight
} from 'lucide-react';

export default function VCardTemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewTemplate, setPreviewTemplate] = useState<VCardTemplateItem | null>(null);

  const categories = [
    { id: 'all', label: `All Templates (${VCARD_TEMPLATES_CATALOG.length})`, icon: '✨' },
    { id: 'Real Estate', label: 'Real Estate', icon: '🏠' },
    { id: 'Interior Design', label: 'Interior Design', icon: '🛋️' },
    { id: 'Healthcare', label: 'Healthcare', icon: '🏥' },
    { id: 'Food Business', label: 'Food Business', icon: '🍽️' },
    { id: 'Fashion & Clothing', label: 'Fashion & Clothing', icon: '👗' },
    { id: 'Beauty & Personal Care', label: 'Beauty & Care', icon: '💄' },
    { id: 'Professional Services', label: 'Professional', icon: '💼' },
    { id: 'Education', label: 'Education', icon: '🎓' },
    { id: 'Events & Creative', label: 'Events & Creative', icon: '📸' },
    { id: 'Automobile', label: 'Automobile', icon: '🚗' },
    { id: 'Retail & Local Shops', label: 'Retail & Shops', icon: '🛍️' },
    { id: 'Home & Professional Services', label: 'Home Services', icon: '🛠️' },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/50 to-blue-50/60 text-slate-900 flex flex-col relative selection:bg-blue-600 selection:text-white">
      {/* Ambient Blurred Background Lights */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-sky-200/40 blur-[120px]" />
        <div className="absolute top-[20%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-200/30 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[600px] h-[600px] rounded-full bg-indigo-200/30 blur-[140px]" />
      </div>

      <Navbar />

      <main className="flex-1">
        {/* Page Banner Header */}
        <section className="relative pt-32 pb-16 overflow-hidden border-b border-slate-200/80 bg-white/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              12 Industry Categories &bull; {VCARD_TEMPLATES_CATALOG.length}+ Designer Templates
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
              Business{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent">
                Templates
              </span>
            </h1>

            <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
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
                  className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white/90 border border-slate-200/90 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 focus:bg-white transition-all shadow-md backdrop-blur-xl"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
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
                      ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105 font-bold'
                      : 'bg-white/85 text-slate-700 hover:text-slate-900 hover:bg-white hover:shadow-md border border-slate-200/80 backdrop-blur-md'
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
          <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950 border border-blue-500/30 shadow-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
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
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <span>Open Canva / Adobe Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-slate-600 font-medium">
              Showing <span className="text-slate-900 font-bold">{filteredTemplates.length}</span> of {VCARD_TEMPLATES_CATALOG.length} templates
            </p>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-white/70 px-3 py-1 rounded-full border border-slate-200/80 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              All templates include 1-Click .VCF &amp; Dynamic QR Sharing
            </div>
          </div>

          {filteredTemplates.length === 0 ? (
            <div className="text-center py-20 bg-white/80 rounded-3xl border border-slate-200/80 p-8 shadow-lg backdrop-blur-xl">
              <Layers className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-1">No templates found</h3>
              <p className="text-sm text-slate-500 mb-6">
                No templates matched your search &quot;{searchQuery}&quot;. Try a different keyword or category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-md cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4.5">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="group rounded-2xl border border-slate-200/80 bg-white/95 hover:border-blue-300 transition-all duration-300 flex flex-col overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 relative backdrop-blur-xl text-slate-900"
                >
                  {/* Ribbon Badge if present */}
                  {template.badge && (
                    <div className="absolute top-2.5 right-2.5 z-20">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wide bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
                        {template.badge}
                      </span>
                    </div>
                  )}

                  {/* Card Image Container with Banner & Overlay */}
                  <div
                    onClick={() => window.open(`/v/${template.id}`, '_blank', 'noopener,noreferrer')}
                    className="relative h-[220px] sm:h-[250px] w-full bg-slate-950 overflow-hidden cursor-pointer group/img flex items-center justify-center"
                    title="Click to preview live mini-website"
                  >
                    <img
                      src={template.imgUrl}
                      alt={template.name}
                      className="vcard-template-img w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Top Gradient Overlay with Title & Subtitle */}
                    <div className="absolute top-0 inset-x-0 p-3 pt-2.5 bg-gradient-to-b from-slate-950/85 via-slate-950/40 to-transparent pointer-events-none z-10">
                      <h4 className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-white drop-shadow-md truncate">
                        {template.category}
                      </h4>
                      <p className="text-[9px] sm:text-[10px] text-indigo-200 font-semibold drop-shadow-sm truncate mt-0.5">
                        {template.actionSubtitle || template.subCategory || 'Explore Portfolio'}
                      </p>
                    </div>

                    {/* Bottom Gradient Overlay with signature arrow */}
                    <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none flex items-end p-3 z-10">
                      <div className="flex items-center gap-1.5">
                        <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/40 group-hover:scale-110 transition-transform">
                          <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-bold text-white/95 drop-shadow-md group-hover:text-white transition-colors">
                          Explore
                        </span>
                      </div>
                    </div>

                    {/* Hover Overlay with Preview button */}
                    <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3 z-20">
                      <a
                        href={`/v/${template.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-slate-900 font-bold text-[10px] shadow-xl hover:bg-slate-100 hover:scale-105 transition-all cursor-pointer"
                      >
                        <Eye className="w-3 h-3 text-blue-600" />
                        Preview
                      </a>

                      <Link
                        href={`/signup?intent=build_card&template=${template.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] shadow-xl hover:scale-105 transition-all"
                      >
                        Use Free
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>

                  {/* Card Footer Details */}
                  <div className="p-3 sm:p-3.5 border-t border-slate-100 bg-white flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                        {template.name}
                      </h3>
                      <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                        {template.tagline}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="pt-1 flex items-center gap-1.5">
                      <Link
                        href={`/signup?intent=build_card&template=${template.id}`}
                        className="flex-1 py-1.5 px-2 rounded-lg text-center text-[10px] sm:text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 hover:scale-[1.02] transition-all"
                      >
                        Use Free
                      </Link>
                      <a
                        href={`/v/${template.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-2.5 rounded-lg border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-all text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 shadow-xs cursor-pointer"
                        title="Preview live mini-website"
                      >
                        <Eye className="w-3 h-3 text-slate-600" />
                        <span>Preview</span>
                      </a>
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
            <div className="rounded-3xl p-8 sm:p-12 bg-white/90 border border-slate-200/80 shadow-xl backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Need a Custom Brand or Team Design?
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  All templates include 1-click contact download (.VCF), QR sharing, direct UPI payments, and automated WhatsApp mini-stores.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <Link
                  href="/signup?intent=build_card"
                  className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl shadow-blue-500/25 hover:scale-105 transition-all"
                >
                  Create Your Free Card Now
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 font-semibold text-sm transition-all shadow-xs"
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
