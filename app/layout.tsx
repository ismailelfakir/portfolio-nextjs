import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { getSEOInfo } from '@/lib/config';

const inter = Inter({ subsets: ['latin'] });
const seoInfo = getSEOInfo();

export const metadata: Metadata = {
  title: seoInfo.title,
  description: seoInfo.description,
  keywords: seoInfo.keywords,
  authors: [{ name: seoInfo.author }],
  creator: seoInfo.author,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: seoInfo.siteUrl,
    title: seoInfo.title,
    description: seoInfo.description,
    siteName: `${seoInfo.author} Portfolio`,
  },
  twitter: {
    card: 'summary_large_image',
    title: seoInfo.title,
    description: seoInfo.description,
    creator: seoInfo.twitterHandle,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}