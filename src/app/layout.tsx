import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { Motion } from '@/components/Motion';
import { ReferenceMarkup } from '@/components/ReferenceMarkup';
import reference from '../../content/reference.json';

export const metadata: Metadata = {
  title: { default: 'Dream House | Architecture & Interiors', template: '%s | Dream House' },
  description: 'Architecture in dialogue with nature. Discover considered spaces, expressive interiors and climate-responsive design at Dream House.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navigation />
    <main id="main">{children}</main>
    <ReferenceMarkup html={reference.footer} />
    <Motion />
  </body></html>;
}
