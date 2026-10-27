import type { Metadata } from 'next';
import './globals.css';
import './lookbook.css';
import './studio.css';
import { Navigation } from '@/components/Navigation';
import { Motion } from '@/components/Motion';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: { default: 'DreamHouse | Architectural Engineering, Sulthan Bathery', template: '%s | DreamHouse' },
  description: 'DreamHouse Architectural Engineering, Sulthan Bathery. Civil engineering consulting, interior and exterior designing, structural designing, AutoCAD and 3D studio services. Call 9446731418.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
      { url: '/brand/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/brand/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: { url: '/brand/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navigation />
    <main id="main">{children}</main>
    <Footer />
    <Motion />
  </body></html>;
}
