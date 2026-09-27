import React from 'react';
import Link from 'next/link';
import { Clock, User, Tag, ArrowRight, Eye } from 'lucide-react';

export interface ArticleCardProps {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string | null;
  category: string;
  readTimeMinutes: number;
  authorName?: string;
  publishedAt: string | Date;
  viewsCount?: number;
  tags?: string[];
  featured?: boolean;
}

function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

const CATEGORY_COLORS: Record<string, string> = {
  'Business Tips': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Digital Marketing': 'bg-blue-50 text-blue-700 border-blue-200',
  'Technology': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Success Stories': 'bg-amber-50 text-amber-800 border-amber-200',
  'Product Updates': 'bg-purple-50 text-purple-700 border-purple-200',
  'General': 'bg-slate-100 text-slate-700 border-slate-200',
};

function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || 'bg-indigo-50 text-indigo-700 border-indigo-200';
}

export default function ArticleCard({ article, featured = false }: { article: ArticleCardProps; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      id={`article-card-${article.slug}`}
      className={`group block rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100/70 ${
        featured
          ? 'border-indigo-200 bg-white hover:border-indigo-400 shadow-md shadow-slate-200/50'
          : 'border-slate-200/90 bg-white hover:border-indigo-300 shadow-sm'
      }`}
    >
      {/* Cover Image */}
      <div className={`relative overflow-hidden ${featured ? 'aspect-[16/7]' : 'aspect-[16/9]'} bg-slate-100`}>
        {article.coverImage ? (
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-50 via-slate-100 to-purple-50">
            <div className="text-center space-y-2 opacity-60">
              <div className="text-4xl">✍️</div>
              <div className="text-slate-500 text-xs font-medium uppercase tracking-widest">Article</div>
            </div>
          </div>
        )}
        {/* Category badge on image */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border shadow-sm ${getCategoryColor(article.category)}`}>
            <Tag size={10} />
            {article.category}
          </span>
        </div>
        {featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-md">
              ⭐ Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {article.readTimeMinutes} min read
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span>{formatDate(article.publishedAt)}</span>
          {article.viewsCount !== undefined && article.viewsCount > 0 && (
            <>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="flex items-center gap-1">
                <Eye size={11} />
                {article.viewsCount.toLocaleString()}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h2 className={`font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug line-clamp-2 ${featured ? 'text-xl' : 'text-base'}`}>
          {article.title}
        </h2>

        {/* Excerpt */}
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>

        {/* Author & CTA */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm">
              {article.authorName?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <span className="text-slate-600 text-xs font-medium truncate max-w-[120px]">{article.authorName || 'OneClickBiz Team'}</span>
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:text-indigo-700 transition-colors">
            Read more <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(article.tags as string[]).slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-600 border border-slate-200">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
