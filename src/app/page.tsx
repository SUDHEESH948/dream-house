import reference from '../../content/reference.json';
import { Hero } from '@/components/Hero';
import { ReferenceMarkup } from '@/components/ReferenceMarkup';
import { PortfolioBook } from '@/components/PortfolioBook';

export default function Home() {
  return <>
    <Hero />
    <ReferenceMarkup html={reference.home[1]} />
    <PortfolioBook />
    {reference.home.slice(3).map((section, i) => <ReferenceMarkup key={i} html={section} />)}
  </>;
}
