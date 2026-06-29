import { Metadata } from 'next';
import IndustriesClient from '@/components/IndustriesClient';

export const metadata: Metadata = {
  title: 'Industries We Serve | AI Solutions | QIntellect Technologies',
  description: 'QIntellect Technologies provides industry-specific AI automation and software solutions for Healthcare, Finance, SaaS, Manufacturing, and Logistics.',
  keywords: 'QIntellect Technologies industries, Q Intellect Technologies, AI in healthcare, AI in finance, AI in manufacturing, AI SaaS, AI automation platform, prebuilt AI workflows, industry AI',
  alternates: {
    canonical: 'https://www.qintellecttechnologies.com/industries',
  },
};

export default function IndustriesPage() {
  return <IndustriesClient />;
}
