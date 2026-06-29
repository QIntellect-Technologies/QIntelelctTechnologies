import { Metadata } from 'next';
import ContactClient from '@/components/ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us | QIntellect Technologies',
  description: 'Ready to transform your business with AI and custom software? Contact QIntellect Technologies today to get a tailored enterprise solution.',
  keywords: 'contact QIntellect Technologies, contact Q Intellect Technologies, hire AI developers, AI consultation, QIntellect support, ERP consultants',
  alternates: {
    canonical: 'https://www.qintellecttechnologies.com/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
