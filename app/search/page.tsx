import { Metadata } from 'next';
import SearchClient from '@/components/SearchClient';

export const metadata: Metadata = {
  title: 'Search | QIntellect Technologies',
  description: 'Search for QIntellect Technologies services, industries, and blog articles.',
  robots: 'noindex, follow', // usually we don't index search results pages
};

export default function SearchPage() {
  return <SearchClient />;
}
