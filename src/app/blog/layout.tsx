import React from 'react';
import BlogNavbar from '@/components/blog/BlogNavbar';
import BlogFooter from '@/components/blog/BlogFooter';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <BlogNavbar />
      <main className="flex-1">
        {children}
      </main>
      <BlogFooter />
    </div>
  );
}
