import Link from 'next/link';
import JsonLd, { breadcrumb } from './JsonLd';
import { Reveal } from './Motion';
import Icon from './Icon';
import type { ReactNode } from 'react';

type Props = {
  slug: string;
  crumb: string;
  cover: string;
  title: string;
  meta: string;
  headline: string;
  datePublished: string;
  children: ReactNode;
};

export default function ArticleShell({ slug, crumb, cover, title, meta, headline, datePublished, children }: Props) {
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    inLanguage: 'uk-UA',
    author: { '@type': 'Organization', name: 'БудСміла' },
    publisher: { '@type': 'Organization', name: 'БудСміла' },
    mainEntityOfPage: `https://smilarda.org.ua/blog/${slug}`,
    datePublished,
  };
  return (
    <>
      <JsonLd
        data={[
          article,
          breadcrumb([
            { name: 'Головна', path: '/' },
            { name: 'Блог', path: '/blog' },
            { name: crumb, path: `/blog/${slug}` },
          ]),
        ]}
      />
      <div className="container">
        <div className="crumbs"><Link href="/">Головна</Link> → <Link href="/blog">Блог</Link> → {crumb}</div>
      </div>
      <section className="block" style={{ paddingTop: 6 }}>
        <div className="container">
          <Reveal className="article">
            <div className="cover-hero"><Icon name={cover} /></div>
            <h1>{title}</h1>
            <p className="meta">{meta}</p>
            {children}
          </Reveal>
        </div>
      </section>
    </>
  );
}
