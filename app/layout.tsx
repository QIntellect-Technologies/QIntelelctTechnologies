import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

export const metadata: Metadata = {
  title: 'QIntellect Technologies',
  description: 'Pioneering digital experiences that fuse art with technology.',
  verification: {
    google: 'heBowOsfjrAuTDDDLP8p8D5teRQgSE5O9li7ZX0HOgw',
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
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-ME0EVBKB9J`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ME0EVBKB9J');
          `}
        </Script>
      </head>
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
