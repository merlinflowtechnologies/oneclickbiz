import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import ArticleCard, { ArticleCardProps } from '@/components/blog/ArticleCard';
import ArticleClientInteractions from '@/components/blog/ArticleClientInteractions';
import { SAMPLE_BLOG_POSTS } from '@/lib/blog-data';
import {
  ArrowLeft,
  Clock,
  Eye,
  Tag,
  Calendar,
  User,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://oneclickbiz.in';

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    let article: any = null;
    try {
      article = await prisma.blogPost.findUnique({ where: { slug } });
    } catch {
      // fallback
    }

    if (!article) {
      article = SAMPLE_BLOG_POSTS.find((b) => b.slug === slug);
    }

    if (!article) return { title: 'Article Not Found | OneClickBiz Blog' };

    const publishedDate = article.publishedAt instanceof Date 
      ? article.publishedAt.toISOString() 
      : new Date(article.publishedAt).toISOString();

    return {
      title: `${article.title} | OneClickBiz Blog`,
      description: article.excerpt,
      alternates: { canonical: `${BASE_URL}/blog/${slug}` },
      openGraph: {
        title: article.title,
        description: article.excerpt,
        url: `${BASE_URL}/blog/${slug}`,
        siteName: 'OneClickBiz Blog',
        type: 'article',
        publishedTime: publishedDate,
        authors: [article.authorName || 'OneClickBiz Team'],
        images: article.coverImage
          ? [{ url: article.coverImage, width: 1200, height: 630, alt: article.title }]
          : [{ url: `${BASE_URL}/og-cover.png`, width: 1024, height: 1024, alt: 'OneClickBiz Blog' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.excerpt,
        images: article.coverImage ? [article.coverImage] : [`${BASE_URL}/og-cover.png`],
      },
    };
  } catch {
    return { title: 'Blog | OneClickBiz' };
  }
}

function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const CATEGORY_COLORS: Record<string, string> = {
  'Business Tips': 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  'Digital Marketing': 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  Technology: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
  'Success Stories': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  'Product Updates': 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  General: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
};

function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
}

// ── Page Component ─────────────────────────────────────────────────────────────
export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let article: any = null;
  let related: ArticleCardProps[] = [];

  try {
    article = await prisma.blogPost.findUnique({ where: { slug, isPublished: true } });
  } catch {
    // ignore db error, proceed to fallback
  }

  if (!article) {
    article = SAMPLE_BLOG_POSTS.find((b) => b.slug === slug);
  }

  if (!article) return notFound();

  // Increment view count if in DB
  if (article.id && !article.id.startsWith('blog_')) {
    prisma.blogPost
      .update({
        where: { id: article.id },
        data: { viewsCount: { increment: 1 } },
      })
      .catch(() => {});
  }

  try {
    // Fetch related articles (same category, exclude current)
    const relatedRaw = await prisma.blogPost.findMany({
      where: {
        isPublished: true,
        category: article.category,
        slug: { not: slug },
      },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    });

    related = relatedRaw.map((r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt,
      coverImage: r.coverImage,
      category: r.category,
      readTimeMinutes: r.readTimeMinutes,
      authorName: r.authorName,
      publishedAt: r.publishedAt,
      viewsCount: r.viewsCount,
      tags: r.tags as string[],
    }));
  } catch {
    // related fallback handled below
  }

  if (related.length === 0) {
    related = SAMPLE_BLOG_POSTS.filter(
      (b) => b.slug !== slug && (b.category === article.category || !article.category)
    )
      .slice(0, 3)
      .map((r) => ({
        id: r.id,
        slug: r.slug,
        title: r.title,
        excerpt: r.excerpt,
        coverImage: r.coverImage,
        category: r.category,
        readTimeMinutes: r.readTimeMinutes,
        authorName: r.authorName || 'OneClickBiz Team',
        publishedAt: r.publishedAt,
        viewsCount: r.viewsCount,
        tags: r.tags || [],
      }));
  }

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article!.title,
    description: article!.excerpt,
    image: article!.coverImage || `${BASE_URL}/og-cover.png`,
    author: {
      '@type': 'Person',
      name: article!.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'OneClickBiz',
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo.png` },
    },
    datePublished: article!.publishedAt.toISOString(),
    dateModified: article!.updatedAt.toISOString(),
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/blog/${slug}` },
  };

    return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen bg-slate-50 text-slate-900 pb-20">
        {/* ── Top Navigation & Header ─────────────────────────────────────────── */}
        <div className="bg-white border-b border-slate-200/80 pt-8 pb-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors mb-6 group"
            >
              <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
              Back to all articles
            </Link>

            {/* Category badge */}
            <div className="mb-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${getCategoryColor(article!.category)}`}>
                <Tag size={11} />
                {article!.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 leading-tight tracking-tight mb-6">
              {article!.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500 border-t border-slate-100 pt-4">
              <span className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm">
                  {article!.authorName?.charAt(0)?.toUpperCase() || 'A'}
                </div>
                <span className="font-semibold text-slate-800">{article!.authorName || 'OneClickBiz Team'}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-slate-400" />
                {formatDate(article!.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} className="text-slate-400" />
                {article!.readTimeMinutes} min read
              </span>
              {article!.viewsCount > 0 && (
                <span className="flex items-center gap-1.5">
                  <Eye size={13} className="text-slate-400" />
                  {article!.viewsCount.toLocaleString()} views
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Featured Cover Image (if available) ─────────────────────────────── */}
        {article!.coverImage && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 mb-10">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 aspect-[16/8] bg-slate-100">
              <img
                src={article!.coverImage}
                alt={article!.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* ── Article Body ───────────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">

            {/* Main Content Card */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm">
              {/* Excerpt / Summary card */}
              {article!.excerpt && article!.excerpt !== article!.title && (
                <div className="mb-8 p-5 rounded-2xl bg-indigo-50/80 border-l-4 border-indigo-600">
                  <p className="text-slate-800 text-base leading-relaxed font-medium italic">
                    &ldquo;{article!.excerpt}&rdquo;
                  </p>
                </div>
              )}

              {/* Article prose content */}
              <div
                className="prose-blog"
                dangerouslySetInnerHTML={{ __html: article!.content }}
              />

              {/* Tags */}
              {Array.isArray(article!.tags) && (article!.tags as string[]).length > 0 && (
                <div className="mt-10 pt-8 border-t border-slate-100">
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-3">Related Topics</p>
                  <div className="flex flex-wrap gap-2">
                    {(article!.tags as string[]).map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?search=${encodeURIComponent(tag)}`}
                        className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Share strip */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <ArticleClientInteractions
                  title={article!.title}
                  slug={slug}
                />
              </div>

              {/* Author Card */}
              <div className="mt-10 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 shadow-md">
                  {article!.authorName?.charAt(0)?.toUpperCase() || 'A'}
                </div>
                <div className="space-y-1">
                  <p className="text-slate-900 font-bold text-base">{article!.authorName || 'OneClickBiz Team'}</p>
                  <p className="text-indigo-600 text-xs font-semibold">Editorial Team · OneClickBiz</p>
                  <p className="text-slate-600 text-xs leading-relaxed pt-1">
                    Sharing practical insights on digital business cards, WhatsApp stores, and high-conversion marketing.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="sticky top-24 space-y-6">
                {/* Article info card */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-slate-900 font-bold text-sm flex items-center gap-2">
                    <BookOpen size={16} className="text-indigo-600" />
                    Article Details
                  </h3>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <dt className="text-slate-500">Published</dt>
                      <dd className="text-slate-800 font-medium">{formatDate(article!.publishedAt)}</dd>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <dt className="text-slate-500">Read time</dt>
                      <dd className="text-slate-800 font-medium">{article!.readTimeMinutes} min</dd>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <dt className="text-slate-500">Category</dt>
                      <dd className="text-slate-800 font-medium">{article!.category}</dd>
                    </div>
                    {article!.viewsCount > 0 && (
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Views</dt>
                        <dd className="text-slate-800 font-medium">{article!.viewsCount.toLocaleString()}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                {/* CTA Card */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg space-y-3 text-center">
                  <div className="text-3xl">⚡</div>
                  <h3 className="text-white font-bold text-base">Go Digital Today</h3>
                  <p className="text-indigo-100 text-xs leading-relaxed">
                    Create your smart digital visiting card and WhatsApp store in under 2 minutes.
                  </p>
                  <a
                    id="article-sidebar-cta"
                    href="/signup"
                    className="flex items-center justify-center gap-1.5 w-full py-3 rounded-xl text-xs font-bold bg-white text-indigo-700 hover:bg-indigo-50 transition-all shadow"
                  >
                    Get Started Free <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* ── Related Articles ───────────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
            <div className="border-t border-slate-200 pt-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  More in{' '}
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {article!.category}
                  </span>
                </h2>
                <Link
                  href={`/blog?category=${encodeURIComponent(article!.category)}`}
                  className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors group"
                >
                  View all <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((rel) => (
                  <ArticleCard key={rel.id} article={rel} />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
