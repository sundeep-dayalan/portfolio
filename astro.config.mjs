// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.sundeepdayalan.in',
  compressHTML: true,

  build: {
    inlineStylesheets: 'auto',
  },

  vite: {
    build: {
      cssMinify: true,
    },
  },

  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        // Homepage: highest priority
        if (item.url === 'https://www.sundeepdayalan.in/') {
          return { ...item, priority: 1.0 };
        }
        // Project case-study pages: high priority
        if (item.url.includes('/projects/')) {
          return { ...item, priority: 0.8 };
        }
        // Media/press page
        if (item.url.includes('/media-hits')) {
          return { ...item, priority: 0.6 };
        }
        return { ...item, priority: 0.7 };
      },
    }),
  ],
});
