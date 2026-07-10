// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build
export default defineConfig({
  site: 'https://smilarda.org.ua',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
