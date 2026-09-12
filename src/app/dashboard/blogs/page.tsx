import BlogStudio from '@/components/blog/BlogStudio';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Article Studio | OneClickBiz',
  description: 'Write, manage, and publish thought leadership articles, case studies, and guides directly on your digital card profile.',
};

export default function BlogsDashboardPage() {
  return <BlogStudio />;
}
