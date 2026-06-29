import { Metadata } from 'next';
import { SERVICES } from '@/constants';
import ServiceDetailClient from '@/components/ServiceDetailClient';

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const service = SERVICES.find(s => s.id === id);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.title} Services | QIntellect Technologies`,
    description: `Learn about our ${service.title} services. QIntellect Technologies offers industry-specific solutions including ${service.shortDescription}.`,
    keywords: `QIntellect Technologies ${service.title}, Q Intellect Technologies, ${service.title} AI, ${service.title} software solutions, QIntellect services`,
    alternates: {
      canonical: `https://www.qintellecttechnologies.com/services/${id}`,
    },
  };
}

export default function ServiceDetailPage() {
  return <ServiceDetailClient />;
}
