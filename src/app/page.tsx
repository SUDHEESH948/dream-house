import { Hero } from '@/components/Hero';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import { PortfolioBook } from '@/components/PortfolioBook';
import { HomeIntroduction, HomeStudio, ServiceOverview, Conversation } from '@/components/StudioSections';
import { DesignFilm } from '@/components/DesignFilm';
import { getHomeImages } from '@/lib/projectImages';

export default function Home() {
  const homeImages = getHomeImages();

  return <>
    <Hero />
    <FeaturedProjects images={homeImages} />
    <HomeIntroduction />
    <PortfolioBook />
    <DesignFilm />
    <HomeStudio />
    <ServiceOverview />
    <Conversation />
  </>;
}
