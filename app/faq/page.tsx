import { Metadata } from 'next';
import FaqClient from '@/components/FaqClient';

export const metadata: Metadata = {
  title: 'Technical Docs & FAQs | QIntellect Technologies',
  description: 'Find answers to common questions about our enterprise solutions, implementations, and technologies.',
  keywords: 'FAQ, technical docs, QIntellect support, AI questions, ERP documentation',
  alternates: {
    canonical: 'https://www.qintellecttechnologies.com/faq',
  },
};

export default function FaqPage() {
  return <FaqClient />;
}
