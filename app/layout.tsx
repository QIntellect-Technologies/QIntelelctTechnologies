import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

export const metadata: Metadata = {
  title: 'QIntellect Technologies',
  description: 'Pioneering digital experiences that fuse art with technology.',
  verification: {
    other: {
      'msvalidate.01': '63E38E1A0A890CA1A600AD2A61D2A034',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
