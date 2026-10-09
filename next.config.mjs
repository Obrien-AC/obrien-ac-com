/** @type {import('next').NextConfig} */
const nextConfig = { output: 'export', trailingSlash: true, reactStrictMode: true, poweredByHeader: false, turbopack: { root: process.cwd() } };
export default nextConfig;
