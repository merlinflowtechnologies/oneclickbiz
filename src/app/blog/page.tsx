'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Metadata } from 'next';
import ArticleCard, { ArticleCardProps } from '@/components/blog/ArticleCard';
import { SAMPLE_BLOG_POSTS } from '@/lib/blog-data';
import {
  Search,
  BookOpen,
  Sparkles,
  Filter,
  Loader2,
  AlertCircle,
  RefreshCw,
  ArrowRight,
  TrendingUp,
  PenTool,
} from 'lucide-react';

const CATEGORIES = ['All', 'Business Tips', 'Digital Marketing', 'Technology', 'Success Stories', 'Product Updates', 'General'];

export default function BlogPage() {
  const [articles, setArticles] = useState<ArticleCardProps[]>(SAMPLE_BLOG_POSTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const PER_PAGE = 9;

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = activeCategory === 'All'
        ? '/api/blogs'
        : `/api/blogs?category=${encodeURIComponent(activeCategory)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to load articles');
      const data = await res.json();
      if (data.articles && data.articles.length > 0) {
        setArticles(data.articles);
      } else {
        const fallback = activeCategory === 'All' 
          ? SAMPLE_BLOG_POSTS 
          : SAMPLE_BLOG_POSTS.filter(b => b.category.toLowerCase() === activeCategory.toLowerCase());
        setArticles(fallback);
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
    setPage(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  // Client-side search filtering
  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return articles;
    const q = searchQuery.toLowerCase();
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        (a.authorName && a.authorName.toLowerCase().includes(q)) ||
        (Array.isArray(a.tags) && (a.tags as string[]).some((t) => t.toLowerCase().includes(q)))
    );
  }, [articles, searchQuery]);

  const paginated = filtered.slice(0, page * PER_PAGE);
  const hasMore = paginated.length < filtered.length;
  const featured = filtered[0];
  const rest = filtered.slice(1);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden pt-12 sm:pt-16 md:pt-20 pb-16 px-4 bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 border-b border-slate-200/60">
        {/* Background effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] rounded-full bg-indigo-200/30 blur-3xl pointer-events-none" />
        <div className="absolute top-10 left-0 w-72 h-72 rounded-full bg-purple-200/20 blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-0 w-72 h-72 rounded-full bg-pink-200/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-sm font-semibold shadow-sm">
            <Sparkles size={14} className="text-indigo-600" />
            OneClickBiz Blog Studio
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Insights to grow your{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              business online
            </span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Expert tips on digital business cards, WhatsApp commerce, lead generation,
            and building your brand in the digital era.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex items-center gap-2 max-w-xl mx-auto mt-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                id="blog-search-input"
                type="text"
                placeholder="Search articles, topics, authors…"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  if (!e.target.value.trim()) {
                    setSearchQuery('');
                  }
                }}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-sm transition-all"
              />
            </div>
            <button
              id="blog-search-submit"
              type="submit"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all shadow-md shadow-indigo-200 hover:scale-105 flex-shrink-0"
            >
              Search
            </button>
          </form>

          {/* Stats strip */}
          <div className="flex items-center justify-center gap-6 pt-2">
            {[
              { icon: BookOpen, label: 'Articles', value: articles.length.toString() },
              { icon: TrendingUp, label: 'Monthly Readers', value: '10K+' },
              { icon: PenTool, label: 'Categories', value: String(CATEGORIES.length - 1) },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-2 text-slate-600 text-sm">
                <Icon size={14} className="text-indigo-600" />
                <span className="font-bold text-slate-900">{value}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Filters ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
          <Filter size={14} className="text-slate-400 flex-shrink-0" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              id={`category-filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => {
                setActiveCategory(cat);
                setSearchQuery('');
                setSearchInput('');
              }}
              className={`flex-shrink-0 snap-start px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-md shadow-indigo-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Content Area ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 size={36} className="text-indigo-600 animate-spin" />
            <p className="text-slate-600 text-sm font-medium">Loading articles…</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200">
              <AlertCircle size={32} className="text-red-600" />
            </div>
            <p className="text-red-600 font-semibold">{error}</p>
            <button
              id="blog-retry-btn"
              onClick={fetchArticles}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition-all border border-slate-300 shadow-sm"
            >
              <RefreshCw size={14} /> Try again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-5 text-center">
            <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-4xl">
              📝
            </div>
            <div className="space-y-2">
              <h3 className="text-slate-900 font-bold text-lg">No articles found</h3>
              <p className="text-slate-600 text-sm max-w-xs">
                {searchQuery
                  ? `No articles match "${searchQuery}". Try a different search term.`
                  : 'No articles in this category yet. Check back soon!'}
              </p>
            </div>
            {searchQuery && (
              <button
                id="blog-clear-search"
                onClick={() => { setSearchQuery(''); setSearchInput(''); }}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 transition-all"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Articles Grid */}
        {!loading && !error && filtered.length > 0 && (
          <>
            {/* Search Results label */}
            {searchQuery && (
              <div className="mb-6 flex items-center gap-3">
                <p className="text-slate-600 text-sm">
                  <span className="text-slate-900 font-bold">{filtered.length}</span> result{filtered.length !== 1 ? 's' : ''} for &ldquo;
                  <span className="text-indigo-600 font-semibold">{searchQuery}</span>&rdquo;
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSearchInput(''); }}
                  className="text-xs text-slate-500 hover:text-slate-700 transition-colors underline"
                >
                  Clear
                </button>
              </div>
            )}

            {/* Featured Article (first one, only if not searching) */}
            {!searchQuery && featured && (
              <div className="mb-10">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Sparkles size={12} /> Featured Article
                </p>
                <ArticleCard article={featured} featured />
              </div>
            )}

            {/* Article Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(searchQuery ? paginated : rest.slice(0, (page - 1) * PER_PAGE + PER_PAGE)).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="mt-12 flex justify-center">
                <button
                  id="blog-load-more"
                  onClick={() => setPage((p) => p + 1)}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-700 text-sm font-semibold hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50/50 shadow-sm transition-all group"
                >
                  Load more articles
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* ── CTA Banner ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 p-10 text-center text-white shadow-xl shadow-indigo-900/20">
          <div className="relative space-y-4">
            <div className="text-3xl">🚀</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to take your business digital?
            </h2>
            <p className="text-indigo-100 max-w-md mx-auto text-sm leading-relaxed">
              Create your free digital business card, WhatsApp store, and start publishing your own blog in minutes.
            </p>
            <a
              id="blog-cta-signup"
              href="/signup"
              className="inline-flex items-center gap-2 mt-2 px-7 py-3.5 rounded-xl bg-white text-indigo-700 font-bold text-sm hover:bg-indigo-50 transition-all shadow-lg hover:scale-105"
            >
              Get Started Free <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
