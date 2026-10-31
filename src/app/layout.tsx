import type { Metadata, Viewport } from 'next';
import './globals.css';
import './lookbook.css';
import './studio.css';
import { Navigation } from '@/components/Navigation';
import { Motion } from '@/components/Motion';
import { Footer } from '@/components/Footer';

export const viewport: Viewport = {
  themeColor: '#0a0d14',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://dreamhousesby.com'),
  title: {
    default: 'DreamHouse – Architectural Engineering, Wayanad, Kerala',
    template: '%s | DreamHouse Wayanad',
  },
  description:
    'DreamHouse Architectural Engineering in Sulthan Bathery, Wayanad, Kerala. Civil engineering consultants, house plan designers, interior & exterior designers, structural designers, and AutoCAD 3D studio services.',
  applicationName: 'DreamHouse Architectural Engineering',
  authors: [{ name: 'DreamHouse Architectural Engineering', url: 'https://dreamhousesby.com' }],
  creator: 'DreamHouse Architectural Engineering',
  publisher: 'DreamHouse Architectural Engineering',
  keywords: [
    'Architects in Sulthan Bathery',
    'Architectural Designers in Wayanad',
    'House Plan Designers in Wayanad',
    'Interior Designers in Sulthan Bathery',
    'Civil Engineering Consultants in Wayanad',
    'Exterior Design Kerala',
    'Structural Design Wayanad',
    '3D House Design Kerala',
    'DreamHouse',
    'Sulthan Bathery',
    'Wayanad Architects',
    'Kerala Architecture',
  ],
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://dreamhousesby.com',
    siteName: 'DreamHouse Architectural Engineering',
    title: 'DreamHouse – Architectural Engineering, Wayanad, Kerala',
    description:
      'Civil engineering consulting, house plans, interior and exterior design, structural engineering, and 3D studio visualizations in Sulthan Bathery, Wayanad.',
    images: [
      {
        url: '/images/residence-twilight-facade.webp',
        width: 1200,
        height: 630,
        alt: 'DreamHouse Architectural Engineering - Sulthan Bathery, Wayanad, Kerala',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DreamHouse – Architectural Engineering, Wayanad, Kerala',
    description:
      'Civil engineering consultants, house plans, interior and exterior design, structural engineering, and 3D studio in Sulthan Bathery, Wayanad.',
    images: ['/images/residence-twilight-facade.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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

const rootStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://dreamhousesby.com/#website',
      url: 'https://dreamhousesby.com',
      name: 'DreamHouse Architectural Engineering',
      description:
        'Civil engineering consulting, interior & exterior designing, structural designing, AutoCAD and 3D studio services in Sulthan Bathery, Wayanad.',
      publisher: {
        '@id': 'https://dreamhousesby.com/#organization',
      },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://dreamhousesby.com/#organization',
      name: 'DreamHouse Architectural Engineering',
      url: 'https://dreamhousesby.com',
      logo: 'https://dreamhousesby.com/brand/dreamhouse-logo.png',
      image: 'https://dreamhousesby.com/images/residence-twilight-facade.webp',
      telephone: '+919446731418',
      email: 'dreamhousesby@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sulthan Bathery',
        addressRegion: 'Kerala',
        postalCode: '673592',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 11.6664,
        longitude: 76.2559,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      areaServed: [
        { '@type': 'City', name: 'Sulthan Bathery' },
        { '@type': 'AdministrativeArea', name: 'Wayanad' },
        { '@type': 'AdministrativeArea', name: 'Kerala' },
      ],
      priceRange: '₹₹',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Architectural & Civil Engineering Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Civil Engineering Consulting',
              description: 'Project brief review, site planning, and drawing coordination in Wayanad.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Interior & Exterior Designing',
              description: 'Comprehensive room layouts, exterior elevations, finishes, and climate-responsive architecture.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Structural Designing',
              description: 'Foundation and framing coordination, structural analysis, and construction drawings.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'AutoCAD & 3D Studio Visualisation',
              description: 'Detailed AutoCAD plans and photorealistic 3D computer studio aided architectural perspectives.',
            },
          },
        ],
      },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootStructuredData) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Navigation />
        <main id="main">{children}</main>
        <Footer />
        <Motion />
      </body>
    </html>
  );
}
