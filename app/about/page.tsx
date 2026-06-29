import { Metadata } from 'next';
import AboutClient from '@/components/AboutClient';

export const metadata: Metadata = {
  title: 'About Us | QIntellect Technologies - AI & Software Experts',
  description: 'Learn about QIntellect Technologies — an advanced AI automation and software development company. We build industry-specific AI solutions, custom chatbots, and ERP systems.',
  keywords: 'QIntellect Technologies, Q Intellect Technologies, about QIntellect, AI company, AI software experts, enterprise software company, Microsoft Dynamics 365 partner, ERP experts, chatbot development team',
  alternates: {
    canonical: 'https://www.qintellecttechnologies.com/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
