import parse, { attributesToProps, domToReact, Element, type DOMNode, type HTMLReactParserOptions } from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';
import { createElement } from 'react';
import { ContactForm } from './ContactForm';
import { GalleryFilters } from './GalleryFilters';
import imageDescriptions from '../../content/image-descriptions.json';
import logo from '../../public/brand/dreamhouse-logo.png';

const textOf = (node: DOMNode): string => 'data' in node ? node.data : node instanceof Element ? node.children.map(child => textOf(child as DOMNode)).join(' ') : '';
const projectGrid = (node: Element) => node.attribs.class?.includes('sm:grid-cols-2') && node.attribs.class?.includes('lg:grid-cols-3');

// The reference's measured Tailwind layout is preserved as static content.
// Rendering it as React keeps navigation, image sizing and form behavior native.
export function ReferenceMarkup({ html }: { html: string }) {
  const branded = html.replaceAll('/privacy', '/contact/#privacy').replaceAll('/terms', '/contact/#terms');
  const options: HTMLReactParserOptions = {
    replace(node) {
      if (!(node instanceof Element)) return;
      if (['script', 'style', 'canvas', 'feTurbulence'].includes(node.name)) return <></>;
      if (node.name === 'iframe') return <iframe src="https://www.google.com/maps?q=Sulthan+Bathery,+Wayanad,+Kerala&output=embed" title="Sulthan Bathery, Wayanad, Kerala" width="100%" height="100%" className="absolute inset-0 w-full h-full" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />;
      const attrs = { ...node.attribs };
      if (node.name === 'footer') return <footer {...attributesToProps(attrs)}><div className="max-w-7xl mx-auto"><Link href="/" className="footer-logo" aria-label="DreamHouse home"><Image src={logo} alt="DreamHouse Architectural Engineering" sizes="220px" /></Link></div>{domToReact(node.children as DOMNode[], options)}</footer>;
      if (node.name === 'div' && node.children.filter(child => child instanceof Element && child.name === 'button').length === 5) return <GalleryFilters />;
      if (node.name === 'div' && projectGrid(node)) attrs['data-project-grid'] = '';
      if (node.parent instanceof Element && projectGrid(node.parent)) attrs['data-category'] = textOf(node).match(/Residential|Hospitality|Commercial|Cultural/)?.[0] || '';
      if (node.name === 'form') return <ContactForm />;
      if (node.name === 'img') {
        let src = attrs.src || '';
        if (src.startsWith('/_next/image')) src = new URL(src, 'https://reference.local').searchParams.get('url') || src;
        const filename = src.split('/').pop()?.split('?')[0];
        if (!filename || filename.startsWith('logo')) return <></>;
        const localFilename = filename.replace(/\.(png|jpe?g)$/i, '.webp');
        const description = imageDescriptions[localFilename as keyof typeof imageDescriptions];
        return <Image src={'/images/' + localFilename} alt={description || attrs.alt || 'Architectural project'}
          width={1600} height={1100} sizes="(max-width: 767px) 100vw, (max-width: 1100px) 90vw, 1300px"
          className={attrs.class} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />;
      }
      const initial = attrs.style || '';
      const reveal = /opacity:0(?:;|$)/.test(initial) || /translateY\(1\d\d%\)/.test(initial);
      if (reveal) {
        attrs['data-reveal'] = /translateX/.test(initial) ? 'horizontal' : /scale/.test(initial) ? 'scale' : 'up';
        attrs.style = initial.replace(/(?:opacity|transform|filter):[^;]+;?/g, '');
      }
      if (initial.includes('clip-path:inset')) {
        attrs['data-image-reveal'] = '';
        attrs.style = (attrs.style || '').replace(/clip-path:[^;]+;?/g, '').replace(/border-radius:[^;]+;?/g, '');
      }
      if (node.name === 'a' && attrs.href?.includes('google.com/maps')) {
        return <a {...attributesToProps(attrs)} href="https://www.google.com/maps/search/?api=1&query=Sulthan+Bathery+Wayanad+Kerala" target="_blank" rel="noopener noreferrer">Find Sulthan Bathery on Google Maps</a>;
      }
      if (node.name === 'section' && attrs.class?.includes('h-[400vh]')) {
        attrs['data-gallery'] = '';
        attrs.class = attrs.class.replace('h-[400vh]', 'gallery-scroll');
      }
      // Remove obsolete animation inline offsets; motion is orchestrated in Motion.
      if (/transform:translateY\(-(?:30|40)px\)/.test(initial)) {
        attrs['data-parallax'] = '';
        attrs.style = (attrs.style || '').replace(/transform:[^;]+;?/g, '');
      }
      if (node.name === 'a' && attrs.href?.startsWith('/') && !attrs.href.startsWith('//')) {
        return <Link {...attributesToProps(attrs)} href={attrs.href}>{domToReact(node.children as DOMNode[], options)}</Link>;
      }
      if (node.name === 'h1' && textOf(node).trim() === 'DREAMHOUSE') return createElement('p', attributesToProps(attrs), domToReact(node.children as DOMNode[], options));
      if (reveal || attrs['data-gallery'] !== undefined || attrs['data-image-reveal'] !== undefined || attrs['data-parallax'] !== undefined || attrs['data-project-grid'] !== undefined || attrs['data-category'] !== undefined) {
        return createElement(node.name, attributesToProps(attrs), domToReact(node.children as DOMNode[], options));
      }
    },
  };
  return <>{parse(branded, options)}</>;
}
