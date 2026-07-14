import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const base = 'https://smilarda.org.ua';
const routes = ['/', '/poslugy', '/tsiny', '/kalkulyator', '/blog', '/blog/pokrivlya', '/blog/uteplennya', '/blog/remont', '/robota', '/kontakty', '/polityka-konfidentsiynosti'];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${base}${r}`,
    changeFrequency: r === '/' || r === '/blog' ? 'weekly' : 'monthly',
    priority: r === '/' ? 1 : r === '/poslugy' || r === '/tsiny' || r === '/kalkulyator' ? 0.9 : 0.7,
  }));
}
