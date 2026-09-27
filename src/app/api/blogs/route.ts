import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';
import { SAMPLE_BLOG_POSTS } from '@/lib/blog-data';

// GET all blog articles (public or filtered by user org)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const slug = searchParams.get('slug');

    if (slug) {
      let article: any = null;
      try {
        article = await prisma.blogPost.findUnique({
          where: { slug }
        });
      } catch (dbErr) {
        console.warn('DB lookup failed, checking fallback:', dbErr);
      }

      if (!article) {
        article = SAMPLE_BLOG_POSTS.find((b) => b.slug === slug);
      }

      if (!article) return NextResponse.json({ error: 'Article not found' }, { status: 404 });
      
      // Increment views if DB post
      if (article.id && !article.id.startsWith('blog_')) {
        prisma.blogPost.update({
          where: { id: article.id },
          data: { viewsCount: { increment: 1 } }
        }).catch(err => console.error(err));
      }

      return NextResponse.json({ success: true, article });
    }

    let articles: any[] = [];
    try {
      const where: any = { isPublished: true };
      if (category && category.toLowerCase() !== 'all') {
        where.category = { equals: category, mode: 'insensitive' };
      }

      articles = await prisma.blogPost.findMany({
        where,
        orderBy: { publishedAt: 'desc' }
      });
    } catch (dbErr) {
      console.warn('DB fetch failed, falling back to curated posts:', dbErr);
    }

    // If database has 0 articles, fallback to curated high-value articles
    if (articles.length === 0) {
      if (category && category.toLowerCase() !== 'all') {
        articles = SAMPLE_BLOG_POSTS.filter(
          (b) => b.category.toLowerCase() === category.toLowerCase()
        );
      } else {
        articles = SAMPLE_BLOG_POSTS;
      }
    }

    return NextResponse.json({ success: true, articles });
  } catch (error: any) {
    console.error('Fetch blogs error:', error);
    return NextResponse.json({ success: true, articles: SAMPLE_BLOG_POSTS });
  }
}

// POST create blog article
export async function POST(req: NextRequest) {
  try {
    const session = await getSessionUser(req);
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, slug, excerpt, content, coverImage, category, readTimeMinutes, tags, authorName } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const cleanSlug = (slug || title.toLowerCase().replace(/[^a-z0-9]/g, '-')).trim();

    const existing = await prisma.blogPost.findUnique({
      where: { slug: cleanSlug }
    });

    if (existing) {
      return NextResponse.json({ error: 'An article with this slug already exists' }, { status: 409 });
    }

    const article = await prisma.blogPost.create({
      data: {
        organizationId: session.organizationId,
        title,
        slug: cleanSlug,
        excerpt: excerpt || title,
        content,
        coverImage,
        category: category || 'General',
        readTimeMinutes: readTimeMinutes || 3,
        authorName: authorName || session.email,
        tags: tags || [],
        isPublished: true
      }
    });

    return NextResponse.json({ success: true, article }, { status: 201 });
  } catch (error: any) {
    console.error('Create blog article error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
