import { Metadata } from 'next';
import { BLOGS } from '@/constants';
import BlogDetailClient from '@/components/BlogDetailClient';

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = BLOGS.find(p => p.id === id);

  if (!post) {
    return {
      title: 'Blog Not Found',
    };
  }

  return {
    title: `${post.title} | QIntellect Technologies Blog`,
    description: post.excerpt,
    keywords: `QIntellect Technologies blog, Q Intellect Technologies, ${post.category}, ${post.tags ? post.tags.join(', ') : ''}, AI, QIntellect AI, business automation`,
    alternates: {
      canonical: `https://www.qintellecttechnologies.com/blog/${id}`,
    },
    openGraph: {
      type: 'article',
      images: [post.image],
    }
  };
}

export default function BlogDetailPage() {
  return <BlogDetailClient />;
}
