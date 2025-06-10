import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/header';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ismail El Fakir | Full Stack Developer Portfolio',
  description: 'Personal portfolio showcasing projects and skills in web development, digital transformation, and skills engineering',
  keywords: ['full stack developer', 'web developer', 'portfolio', 'projects', 'React', 'Next.js', 'digital transformation', 'skills engineering'],
  authors: [{ name: 'Ismail El Fakir' }],
  creator: 'Ismail El Fakir',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ismailelfakir-portfolio.com',
    title: 'Ismail El Fakir | Full Stack Developer Portfolio',
    description: 'Personal portfolio showcasing projects and skills in web development, digital transformation, and skills engineering',
    siteName: 'Ismail El Fakir Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ismail El Fakir | Full Stack Developer Portfolio',
    description: 'Personal portfolio showcasing projects and skills in web development, digital transformation, and skills engineering',
    creator: '@ismailelfakir',
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