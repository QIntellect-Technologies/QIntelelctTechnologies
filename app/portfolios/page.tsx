import { Metadata } from 'next';
import PortfoliosClient from '@/components/PortfoliosClient';

export const metadata: Metadata = {
  title: 'Our Work & Case Studies | QIntellect Technologies',
  description: 'Explore our portfolio of enterprise projects powered by QIntellect Technologies: AI deployments, custom software, chatbots, and enterprise workflows.',
  keywords: 'QIntellect Technologies portfolio, Q Intellect Technologies projects, AI portfolio, enterprise AI projects, QIntellect case studies, software development portfolio',
  alternates: {
    canonical: 'https://www.qintellecttechnologies.com/portfolios',
  },
};

export default function PortfoliosPage() {
  return <PortfoliosClient />;
}
