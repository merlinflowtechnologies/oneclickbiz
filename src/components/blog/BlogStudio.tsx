'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Eye, 
  Edit3, 
  Trash2, 
  Share2, 
  MessageCircle, 
  Calendar, 
  Clock, 
  Tag, 
  Upload, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Copy, 
  X,
  FileText,
  TrendingUp,
  Bookmark,
  Send,
  Sliders,
  PenTool,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BlogPostItem } from '@/lib/types';
import { INITIAL_BLOGS } from '@/lib/data-store';
import { getCurrentUserPlan, PlanTierType } from '@/lib/plan-guards';
import PlanLockGate from '@/components/common/PlanLockGate';

export default function BlogStudio() {
  const [blogs, setBlogs] = useState<BlogPostItem[]>(INITIAL_BLOGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userPlanTier, setUserPlanTier] = useState<PlanTierType>('PRO');
  const [userSession, setUserSession] = useState<{
    slug: string;
    businessName: string;
    fullName: string;
  }>({
    slug: 'kishore',
    businessName: 'Himastech Digital Reality',
    fullName: 'Kishore Patel'
  });

  // Editor Modal State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPostItem | null>(null);

  // Reader Modal State
  const [readingBlog, setReadingBlog] = useState<BlogPostItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const coverFileInputRef = useRef<HTMLInputElement | null>(null);

  // Load from local storage / session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const detectedPlan = getCurrentUserPlan();
        setUserPlanTier(detectedPlan);

        const session = localStorage.getItem('oneclickbiz_user_session');
        let currentSlug = 'alex';
        if (session) {
          const parsed = JSON.parse(session);
          currentSlug = parsed.slug || 'alex';
          setUserSession({
            slug: currentSlug,
            businessName: parsed.businessName || 'Apex Digital Studio',
            fullName: parsed.fullName || 'Alex Rivera'
          });
        }

        const savedBlogs = localStorage.getItem(`oneclickbiz_blogs_${currentSlug}`);
        if (savedBlogs) {
          setBlogs(JSON.parse(savedBlogs));
        } else {
          // Initialize with default articles
          setBlogs(INITIAL_BLOGS);
          localStorage.setItem(`oneclickbiz_blogs_${currentSlug}`, JSON.stringify(INITIAL_BLOGS));
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  // Strict Plan Gating: Blog Studio requires Advanced Plan (₹2,199/yr)
  if (userPlanTier !== 'ADVANCED') {
    return (
      <PlanLockGate
        requiredPlan="ADVANCED"
        currentPlan={userPlanTier}
        featureTitle="Custom Blog & Thought Leadership Studio"
        featureDescription="Write, format, and publish SEO-optimized articles, multimedia case studies, industry insights, and client guides directly on your public digital card profile."
        benefits={[
          'Unlimited thought leadership article & guide publishing',
          'Rich markdown text editor with header photos & formatting',
          '5 White-label custom domains & team/staff profiles',
          'Unlimited high-definition 4K video uploads & streaming CDN',
          '50+ Dynamic portfolio showcase items with zoom lightbox'
        ]}
      />
    );
  }

  // Save blogs to localStorage and sync with profile
  const saveBlogsToStorage = (updatedBlogs: BlogPostItem[]) => {
    setBlogs(updatedBlogs);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`oneclickbiz_blogs_${userSession.slug}`, JSON.stringify(updatedBlogs));
        
        // Also update the active profile in storage if exists
        const profileKey = `oneclickbiz_custom_profile_${userSession.slug}`;
        const savedProf = localStorage.getItem(profileKey);
        if (savedProf) {
          const parsedProf = JSON.parse(savedProf);
          if (!parsedProf.sectionData) parsedProf.sectionData = {};
          parsedProf.sectionData.blogs = { items: updatedBlogs };
          localStorage.setItem(profileKey, JSON.stringify(parsedProf));
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Open Editor for new or existing
  const handleOpenNew = () => {
    setEditingBlog({
      id: `blog_${Date.now()}`,
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'Insights',
      coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
      readTimeMinutes: 3,
      publishedAt: new Date().toISOString().split('T')[0],
      authorName: userSession.fullName,
      isPublished: true,
      tags: ['Growth', 'Insights'],
      viewsCount: 0
    });
    setIsEditorOpen(true);
  };

  const handleEdit = (blog: BlogPostItem) => {
    setEditingBlog({ ...blog });
    setIsEditorOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      const updated = blogs.filter(b => b.id !== id);
      saveBlogsToStorage(updated);
    }
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog || !editingBlog.title.trim()) {
      alert('Please provide an article title.');
      return;
    }

    const autoSlug = editingBlog.slug.trim() 
      ? editingBlog.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      : editingBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const finalBlog: BlogPostItem = {
      ...editingBlog,
      slug: autoSlug,
      authorName: editingBlog.authorName || userSession.fullName,
    };

    const exists = blogs.some(b => b.id === finalBlog.id);
    const updated = exists 
      ? blogs.map(b => b.id === finalBlog.id ? finalBlog : b)
      : [finalBlog, ...blogs];

    saveBlogsToStorage(updated);
    setIsEditorOpen(false);
    setEditingBlog(null);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingBlog) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setEditingBlog(prev => prev ? ({ ...prev, coverImage: ev.target?.result as string }) : null);
      }
    };
    reader.readAsDataURL(file);
  };

  const categories = ['all', ...Array.from(new Set(blogs.map(b => b.category)))];

  const filteredBlogs = blogs.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalViews = blogs.reduce((acc, b) => acc + (b.viewsCount || 0), 0);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900 border border-indigo-500/20 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-semibold">
            <PenTool className="w-3.5 h-3.5" /> Content & Thought Leadership
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Blog & Article Publishing Studio
          </h1>
          <p className="text-xs text-slate-400">
            Publish high-impact industry articles, customer case studies, and guides directly onto your digital card & profile.
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={handleOpenNew}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Write New Article</span>
          </button>

          <Link
            href={`/v/${userSession.slug}`}
            target="_blank"
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-indigo-300 flex items-center gap-1.5 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
            <span>View on Live Profile</span>
          </Link>
        </div>
      </div>

      {/* Analytics Counter Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Articles</span>
            <FileText className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-xl font-bold text-white">{blogs.length}</p>
          <span className="text-[10px] text-emerald-400 font-semibold">
            {blogs.filter(b => b.isPublished).length} Live Published
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Article Reads</span>
            <Eye className="w-4 h-4 text-pink-400" />
          </div>
          <p className="text-xl font-bold text-white">{totalViews.toLocaleString()}</p>
          <span className="text-[10px] text-indigo-300 font-semibold">From vCard visitors</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Avg. Read Time</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-xl font-bold text-white">4.1 min</p>
          <span className="text-[10px] text-amber-300 font-semibold">High engagement</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Lead Conversions</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xl font-bold text-white">38.4%</p>
          <span className="text-[10px] text-emerald-400 font-semibold">WhatsApp CTA clicks</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles, keywords, tags..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map(blog => (
          <div 
            key={blog.id} 
            className="rounded-3xl bg-slate-900/80 border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all group shadow-xl hover:-translate-y-1 duration-200"
          >
            {/* Top Cover Image */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-950">
              {blog.coverImage ? (
                <img 
                  src={blog.coverImage} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-950 to-slate-900 flex items-center justify-center text-slate-600">
                  <BookOpen className="w-8 h-8" />
                </div>
              )}
              
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-[10px] font-bold text-amber-300">
                  {blog.category}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                  blog.isPublished ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                }`}>
                  {blog.isPublished ? 'Live' : 'Draft'}
                </span>
              </div>

              <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-[10px] text-slate-300 flex items-center gap-1">
                <Clock className="w-3 h-3 text-indigo-400" />
                <span>{blog.readTimeMinutes} min read</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-indigo-400" />
                    {blog.publishedAt}
                  </span>
                  <span>•</span>
                  <span>{blog.authorName}</span>
                </div>

                <h3 
                  onClick={() => setReadingBlog(blog)}
                  className="text-sm sm:text-base font-bold text-white line-clamp-2 hover:text-indigo-300 cursor-pointer transition-colors leading-snug"
                >
                  {blog.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex items-center gap-1 flex-wrap pt-2">
                  {blog.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] text-slate-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Card Footer Actions */}
            <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-between">
              <button
                onClick={() => setReadingBlog(blog)}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Read Preview</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleEdit(blog)}
                  title="Edit Article"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  title="Delete Article"
                  className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* ============================================================== */}
      {/* MODAL 1: RICH ARTICLE EDITOR / CREATOR MODAL                   */}
      {/* ============================================================== */}
      {isEditorOpen && editingBlog && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <PenTool className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">
                    {editingBlog.id ? 'Edit Article' : 'Write New Article'}
                  </h2>
                  <p className="text-xs text-slate-400">Publish thought leadership content for your digital card visitors</p>
                </div>
              </div>

              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4">
              
              {/* Title & Slug */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Article Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5 Strategies to Scale Direct-to-Consumer Brands with WhatsApp Automation"
                  value={editingBlog.title}
                  onChange={e => setEditingBlog(prev => prev ? ({ ...prev, title: e.target.value }) : null)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Category, Read Time, Published Date */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Strategy & Growth"
                    value={editingBlog.category}
                    onChange={e => setEditingBlog(prev => prev ? ({ ...prev, category: e.target.value }) : null)}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Est. Read Time (Minutes)</label>
                  <input
                    type="number"
                    min="1"
                    value={editingBlog.readTimeMinutes}
                    onChange={e => setEditingBlog(prev => prev ? ({ ...prev, readTimeMinutes: parseInt(e.target.value) || 3 }) : null)}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Publish Date</label>
                  <input
                    type="date"
                    value={editingBlog.publishedAt}
                    onChange={e => setEditingBlog(prev => prev ? ({ ...prev, publishedAt: e.target.value }) : null)}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              {/* Cover Image Upload & URL */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-white">Cover Image</span>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-12 rounded-xl bg-slate-900 border border-slate-700 overflow-hidden shrink-0">
                    <img src={editingBlog.coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                  </div>
                  <input
                    type="url"
                    placeholder="https://... or upload local file"
                    value={editingBlog.coverImage}
                    onChange={e => setEditingBlog(prev => prev ? ({ ...prev, coverImage: e.target.value }) : null)}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                  <input
                    ref={coverFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCoverUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => coverFileInputRef.current?.click()}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1"
                  >
                    <Upload className="w-3.5 h-3.5" /> Upload
                  </button>
                </div>
              </div>

              {/* Excerpt */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Short Summary / Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="A compelling 2-3 sentence overview shown on preview cards."
                  value={editingBlog.excerpt}
                  onChange={e => setEditingBlog(prev => prev ? ({ ...prev, excerpt: e.target.value }) : null)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white resize-none"
                />
              </div>

              {/* Full Content */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">Full Article Content (Markdown Supported) *</label>
                  <span className="text-[10px] text-slate-500">Supports ### headings, - bullet points, **bold**</span>
                </div>
                <textarea
                  rows={8}
                  required
                  placeholder="Write your comprehensive insights, guide, or case study here..."
                  value={editingBlog.content}
                  onChange={e => setEditingBlog(prev => prev ? ({ ...prev, content: e.target.value }) : null)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono leading-relaxed"
                />
              </div>

              {/* Tags & Publish status */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800">
                <div className="w-full sm:w-1/2">
                  <label className="text-xs font-semibold text-slate-300">Tags (comma separated)</label>
                  <input
                    type="text"
                    placeholder="Growth, Design, Automation"
                    value={editingBlog.tags?.join(', ') || ''}
                    onChange={e => {
                      const tagArr = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                      setEditingBlog(prev => prev ? ({ ...prev, tags: tagArr }) : null);
                    }}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                    <input
                      type="checkbox"
                      checked={editingBlog.isPublished}
                      onChange={e => setEditingBlog(prev => prev ? ({ ...prev, isPublished: e.target.checked }) : null)}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-0"
                    />
                    <span>Publish Immediately</span>
                  </label>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md active:scale-95 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Save & Publish</span>
                  </button>
                </div>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: FULL ARTICLE READER PREVIEW MODAL                     */}
      {/* ============================================================== */}
      {readingBlog && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in duration-200">
            
            {/* Close button */}
            <button
              onClick={() => setReadingBlog(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Article Header */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-bold">
                  {readingBlog.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {readingBlog.readTimeMinutes} min read
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {readingBlog.title}
              </h1>

              <div className="flex items-center justify-between border-y border-slate-800 py-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
                    {readingBlog.authorName?.charAt(0) || 'A'}
                  </div>
                  <div>
                    <p className="font-bold text-white">{readingBlog.authorName || userSession.fullName}</p>
                    <p className="text-[10px] text-slate-400">{readingBlog.publishedAt}</p>
                  </div>
                </div>

                {/* Share action */}
                <button
                  onClick={() => {
                    const url = `${window.location.origin}/v/${userSession.slug}`;
                    navigator.clipboard.writeText(url);
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 2000);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied' : 'Share'}</span>
                </button>
              </div>
            </div>

            {/* Hero Cover Image */}
            {readingBlog.coverImage && (
              <div className="w-full h-64 rounded-2xl overflow-hidden shadow-lg border border-slate-800">
                <img src={readingBlog.coverImage} alt={readingBlog.title} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Excerpt Highlight */}
            <div className="p-4 rounded-2xl bg-indigo-950/30 border-l-4 border-indigo-500 text-xs sm:text-sm text-indigo-200 italic leading-relaxed">
              &ldquo;{readingBlog.excerpt}&rdquo;
            </div>

            {/* Full Body Markdown rendered text */}
            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4 whitespace-pre-line">
              {readingBlog.content}
            </div>

            {/* Author Footer & WhatsApp Inquiry CTA */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900 border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-xs font-bold text-white">Have questions about this article?</h4>
                <p className="text-[11px] text-slate-400">Connect directly with {userSession.fullName} for consulting or custom implementation.</p>
              </div>

              <Link
                href={`https://wa.me/916304989071?text=${encodeURIComponent(`Hi ${userSession.fullName}, I read your article "${readingBlog.title}" and would like to discuss it.`)}`}
                target="_blank"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </Link>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
