import { Hero } from '@/components/Hero';
import { PortfolioBook } from '@/components/PortfolioBook';
import { HomeIntroduction, HomeBrief, HomeStudio, ServiceOverview, Conversation } from '@/components/StudioSections';

export default function Home() {
  return <>
    <Hero />
    <HomeIntroduction />
    <PortfolioBook />
    <HomeBrief />
    <HomeStudio />
    <ServiceOverview />
    <Conversation />
  </>;
}
