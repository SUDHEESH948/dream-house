import reference from '../../content/reference.json';
import { Hero } from '@/components/Hero';
import { ReferenceMarkup } from '@/components/ReferenceMarkup';

export default function Home() {
  return <>
    <Hero />
    {reference.home.slice(1).map((section, i) => <ReferenceMarkup key={i} html={section} />)}
  </>;
}
