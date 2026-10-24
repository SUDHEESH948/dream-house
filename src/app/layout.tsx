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
  icons: { icon: '/brand/dreamhouse-logo.png' },
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
