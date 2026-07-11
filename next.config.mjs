/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // /Users/error has a stray middleware.ts + lockfile that confuses workspace-root
  // detection; pin the root to this project so Turbopack ignores it.
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
