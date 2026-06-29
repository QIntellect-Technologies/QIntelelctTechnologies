import { Metadata } from 'next';
import ServicesClient from '@/components/ServicesClient';

export const metadata: Metadata = {
  title: 'Our Services | AI, Chatbots & Enterprise Software | QIntellect Technologies',
  description: 'Explore QIntellect Technologies Services: Custom AI development, intelligent chatbots, Dynamics 365, ERP integrations, and enterprise web solutions.',
  keywords: 'QIntellect Technologies services, Q Intellect Technologies, AI development company, custom chatbots, enterprise software, Dynamics 365 experts, ERP services',
  alternates: {
    canonical: 'https://www.qintellecttechnologies.com/services',
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
