import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import { PortfolioBook } from '@/components/PortfolioBook';
import { HomeIntroduction, HomeStudio, ServiceOverview, Conversation } from '@/components/StudioSections';
import { DesignFilm } from '@/components/DesignFilm';
import { getHomeImages } from '@/lib/projectImages';

export const metadata: Metadata = {
  title: 'Architects & Engineering in Wayanad',
  description:
    'DreamHouse Architectural Engineering delivers bespoke residential planning, civil engineering consulting, interior and exterior design, and 3D studio visualizations in Sulthan Bathery, Wayanad.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Architects & Engineering in Wayanad | DreamHouse Wayanad',
    description:
      'Bespoke residential planning, civil engineering consulting, interior and exterior design, and 3D visualizations in Sulthan Bathery, Wayanad.',
    url: '/',
    type: 'website',
    images: [
      {
        url: '/images/residence-twilight-facade.webp',
        width: 1200,
        height: 630,
        alt: 'DreamHouse Architectural Engineering - Sulthan Bathery, Wayanad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Architects & Engineering in Wayanad | DreamHouse Wayanad',
    description:
      'Residential planning, civil consulting, interior and exterior design in Sulthan Bathery, Wayanad.',
    images: ['/images/residence-twilight-facade.webp'],
  },
};

export default function Home() {
  const homeImages = getHomeImages();

  return (
    <>
      <Hero />
      <FeaturedProjects images={homeImages} />
      <HomeIntroduction />
      <PortfolioBook />
      <DesignFilm />
      <HomeStudio />
      <ServiceOverview />
      <Conversation />
    </>
  );
}
