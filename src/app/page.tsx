import { Hero } from '@/components/Hero';
import { PortfolioBook } from '@/components/PortfolioBook';
import { HomeIntroduction, HomeStudio, ServiceOverview, Conversation } from '@/components/StudioSections';
import { DesignFilm } from '@/components/DesignFilm';

export default function Home() {
  return <>
    <Hero />
    <HomeIntroduction />
    <PortfolioBook />
    <DesignFilm />
    <HomeStudio />
    <ServiceOverview />
    <Conversation />
  </>;
}
