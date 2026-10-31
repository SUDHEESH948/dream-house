import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AboutPage, ContactPage, GalleryPage, ServicesPage } from '@/components/InteriorPages';

export const dynamicParams = false;

interface PageMetaConfig {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  image: string;
  imageAlt: string;
}

const pageConfigs: Record<string, PageMetaConfig> = {
  about: {
    title: 'About DreamHouse Architectural Engineering',
    description:
      'Learn about DreamHouse Architectural Engineering in Sulthan Bathery, Wayanad. Our practice pairs rigorous civil engineering discipline with responsive regional architecture and bespoke planning.',
    ogTitle: 'About DreamHouse Architectural Engineering | Wayanad',
    ogDescription:
      'Discover our architectural engineering practice, civil consulting approach, and dedication to timeless residential architecture in Wayanad, Kerala.',
    image: '/images/residence-kerala-villa.webp',
    imageAlt: 'DreamHouse Architectural Engineering Studio and Regional Architecture in Wayanad',
  },
  services: {
    title: 'Architectural, Interior & Structural Design',
    description:
      'End-to-end building services in Sulthan Bathery, Wayanad: civil engineering consulting, custom interior and exterior design, structural engineering, AutoCAD drafting, and 3D studio visualizations.',
    ogTitle: 'Architectural, Interior & Structural Design | DreamHouse Wayanad',
    ogDescription:
      'Explore comprehensive civil consulting, structural designing, interior layouts, and 3D computer studio visualization services in Wayanad.',
    image: '/images/residence-modern-elevation.webp',
    imageAlt: 'Architectural and Structural Engineering Design Services by DreamHouse',
  },
  gallery: {
    title: 'House Designs & Architecture Portfolio',
    description:
      'Explore curated house designs, Kerala heritage villas, contemporary elevations, tropical courtyard residences, and luxury interior spaces by DreamHouse in Sulthan Bathery, Wayanad.',
    ogTitle: 'House Designs & Architecture Portfolio | DreamHouse Wayanad',
    ogDescription:
      'Curated residential portfolio featuring regional Kerala villas, modern geometric facades, courtyard living, and bespoke interiors.',
    image: '/images/residence-courtyard-villa.webp',
    imageAlt: 'DreamHouse Residential Architecture Portfolio and House Designs in Wayanad',
  },
  contact: {
    title: 'Contact Architects in Sulthan Bathery',
    description:
      'Connect with DreamHouse Architectural Engineering in Sulthan Bathery, Wayanad. Discuss house plans, structural designs, or civil engineering consulting. Call 9446731418 or 04936 221770.',
    ogTitle: 'Contact Architects in Sulthan Bathery | DreamHouse Wayanad',
    ogDescription:
      'Speak directly with civil engineers and architectural designers in Sulthan Bathery. Call 9446731418 or email dreamhousesby@gmail.com for design consultations.',
    image: '/images/residence-twilight-facade.webp',
    imageAlt: 'Contact DreamHouse Architectural Engineering in Sulthan Bathery',
  },
};

export function generateStaticParams() {
  return Object.keys(pageConfigs).map(slug => ({ slug: [slug] }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (slug.length === 1 && slug[0] in pageConfigs) {
    const config = pageConfigs[slug[0]];
    const canonical = `/${slug[0]}/`;

    return {
      title: config.title,
      description: config.description,
      alternates: {
        canonical,
      },
      openGraph: {
        type: 'website',
        title: config.ogTitle,
        description: config.ogDescription,
        url: canonical,
        locale: 'en_IN',
        images: [
          {
            url: config.image,
            width: 1200,
            height: 800,
            alt: config.imageAlt,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: config.ogTitle,
        description: config.ogDescription,
        images: [config.image],
      },
    };
  }

  return { title: 'Page not found' };
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;

  if (slug.length === 1 && slug[0] in pageConfigs) {
    const config = pageConfigs[slug[0]];
    const breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://dreamhousesby.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: config.title,
          item: `https://dreamhousesby.com/${slug[0]}/`,
        },
      ],
    };

    let pageComponent = null;
    if (slug[0] === 'about') pageComponent = <AboutPage />;
    if (slug[0] === 'services') pageComponent = <ServicesPage />;
    if (slug[0] === 'gallery') pageComponent = <GalleryPage />;
    if (slug[0] === 'contact') pageComponent = <ContactPage />;

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        {pageComponent}
      </>
    );
  }

  notFound();
}
