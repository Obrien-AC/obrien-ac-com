import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://obrien-ac.com', changeFrequency: 'monthly', priority: 1 },
    { url: 'https://obrien-ac.com/membership/', changeFrequency: 'monthly', priority: 0.9 },
  ];
}
