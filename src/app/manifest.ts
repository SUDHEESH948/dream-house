import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DreamHouse Architectural Engineering',
    short_name: 'DreamHouse',
    description:
      'Civil engineering consulting, interior & exterior designing, structural designing, AutoCAD and 3D studio services in Sulthan Bathery, Wayanad.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0d14',
    theme_color: '#0a0d14',
    icons: [
      {
        src: '/brand/favicon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/brand/favicon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
