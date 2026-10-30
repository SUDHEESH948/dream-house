import type { NextConfig } from 'next';
const config: NextConfig = {
  // Static export is a production build target. Leaving it enabled in `next dev`
  // makes Next treat the catch-all route as an export route while serving HMR
  // assets, which can fail requests for generated `/_next` chunks.
  ...(process.env.NODE_ENV === 'production' ? { output: 'export' as const } : {}),
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: {
    cpus: 1,
    staticGenerationMaxConcurrency: 1,
  },
};
export default config;
