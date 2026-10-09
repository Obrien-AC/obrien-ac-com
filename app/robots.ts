import type { MetadataRoute } from 'next';
export const dynamic = 'force-static';
export default function robots():MetadataRoute.Robots { return { rules:{userAgent:'*',allow:'/'}, sitemap: 'https://obrien-ac.com/sitemap.xml', host: 'https://obrien-ac.com' }; }
