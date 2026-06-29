import { Metadata } from 'next';
import BlogClient from '@/components/BlogClient';

export const metadata: Metadata = {
  title: 'Blog | Enterprise AI & Software Insights | QIntellect Technologies',
  description: 'Read the QIntellect Technologies blog for expert insights on AI automation, industry-specific software solutions, custom chatbots, ERP systems, and business transformation.',
  keywords: 'QIntellect Technologies blog, Q Intellect Technologies, AI blog, artificial intelligence insights, enterprise software insights, business automation, enterprise AI, QIntellect tech insights',
  alternates: {
    canonical: 'https://www.qintellecttechnologies.com/blog',
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
