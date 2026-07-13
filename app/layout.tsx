import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScrollProgress } from '@/components/Motion';
import Grain from '@/components/Grain';
import Preloader from '@/components/Preloader';
import Cursor from '@/components/Cursor';

export const metadata: Metadata = {
  metadataBase: new URL('https://smilarda.org.ua'),
  title: {
    default: 'Будівництво та ремонт у Смілі — ціни, поради, підрядники 2026 | Сміла Буд',
    template: '%s | Сміла Буд',
  },
  description:
    'Сміла Буд — місцевий портал про будівництво та ремонт у Смілі й Черкаській області. Орієнтовні ціни, гайди та перевірені підрядники.',
  openGraph: { type: 'website', locale: 'uk_UA', siteName: 'Сміла Буд' },
  alternates: { canonical: '/' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){}})();",
          }}
        />
        <Preloader />
        <Cursor />
        <Grain />
        <ScrollProgress />
        <Header />
        {children}
        <Footer />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-09V5BVMP18" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-09V5BVMP18');`}
        </Script>
      </body>
    </html>
  );
}
