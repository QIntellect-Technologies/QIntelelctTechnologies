import { Metadata } from 'next';
import { INDUSTRIES } from '@/constants';
import IndustryDetailClient from '@/components/IndustryDetailClient';

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const industry = INDUSTRIES.find(ind => ind.id === id);

  if (!industry) {
    return {
      title: 'Industry Not Found',
    };
  }

  return {
    title: `${industry.title} AI Solutions | QIntellect Technologies`,
    description: `QIntellect Technologies provides tailored AI and software solutions for the ${industry.title} industry. Optimize operations and grow your enterprise.`,
    keywords: `QIntellect Technologies ${industry.title}, Q Intellect Technologies, ${industry.title} AI, ${industry.title} automation, QIntellect industries, QIntalect, ${industry.title} platform`,
    alternates: {
      canonical: `https://www.qintellecttechnologies.com/industries/${id}`,
    },
  };
}

export default function IndustryDetailPage() {
  return <IndustryDetailClient />;
}
