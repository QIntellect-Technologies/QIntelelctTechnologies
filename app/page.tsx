import { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';

export const metadata: Metadata = {
  title: 'QIntellect Technologies | Custom AI & Enterprise Software Solutions',
  description: 'QIntellect Technologies delivers cutting-edge AI solutions, custom chatbots, Microsoft Dynamics 365, ERP & EDI systems, and web development for enterprises worldwide.',
  keywords: 'QIntellect Technologies, Q Intellect Technologies, QIntellect, Q Intellect, AI automation, AI platform, business automation, industry AI, finance AI, healthcare AI, SaaS AI, manufacturing AI, white-label AI, AI solutions',
  alternates: {
    canonical: 'https://www.qintellecttechnologies.com/',
  },
};

export default function Page() {
  return <HomeClient />;
}
