import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ideas } from '../../../content/site';
import { AboutPage, ContactPage, GalleryPage, IdeaPage, ServicesPage } from '@/components/InteriorPages';
export const dynamicParams = false;
const pages = { about:'About DreamHouse', services:'Consulting, Design & Drawing Services', gallery:'Design', contact:'Contact DreamHouse' };
export function generateStaticParams() { return [...Object.keys(pages).map(slug=>({slug:[slug]})), ...ideas.map(idea=>({slug:['gallery',idea.slug]}))]; }
export async function generateMetadata({params}:{params:Promise<{slug:string[]}>}):Promise<Metadata> {
  const {slug}=await params;
  const title=slug.length===1?pages[slug[0] as keyof typeof pages]:ideas.find(idea=>slug[0]==='gallery'&&idea.slug===slug[1])?.title;
  return {title:title||'Page not found'};
}
export default async function Page({params}:{params:Promise<{slug:string[]}>}) {
  const {slug}=await params;
  if(slug.length===1) { if(slug[0]==='about') return <AboutPage/>; if(slug[0]==='services') return <ServicesPage/>; if(slug[0]==='gallery') return <GalleryPage/>; if(slug[0]==='contact') return <ContactPage/>; }
  if(slug.length===2&&slug[0]==='gallery') {const idea=ideas.find(item=>item.slug===slug[1]); if(idea) return <IdeaPage idea={idea}/>;}
  notFound();
}
