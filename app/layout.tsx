import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScrollProgress } from '@/components/Motion';
import Grain from '@/components/Grain';

export const metadata: Metadata = {
  metadataBase: new URL('https://smilarda.org.ua'),
  title: {
    default: 'Будівництво та ремонт у Смілі — ціни, поради, підрядники 2026 | БудСміла',
    template: '%s | БудСміла',
  },
  description:
    'БудСміла — місцевий портал про будівництво та ремонт у Смілі й Черкаській області. Орієнтовні ціни, гайди та перевірені підрядники.',
  openGraph: { type: 'website', locale: 'uk_UA', siteName: 'БудСміла' },
  alternates: { canonical: '/' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <Grain />
        <ScrollProgress />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
