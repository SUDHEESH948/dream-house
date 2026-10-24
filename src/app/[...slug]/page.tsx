import reference from '../../../content/reference.json';
import { ReferenceMarkup } from '@/components/ReferenceMarkup';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type RouteKey = Exclude<keyof typeof reference, 'home' | 'footer'>;
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(reference).filter(key => key !== 'home' && key !== 'footer').map(key => ({ slug: key.split('/') }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.at(-1)!.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
  return { title };
}
export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const sections = reference[slug.join('/') as RouteKey];
  if (!sections) notFound();
  return <div className="inner-page">{sections.map((html, index) => <ReferenceMarkup key={index} html={html} />)}</div>;
}
