import parse, { attributesToProps, domToReact, Element, type DOMNode, type HTMLReactParserOptions } from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';
import { createElement } from 'react';
import { ContactForm } from './ContactForm';
import { GalleryFilters } from './GalleryFilters';
import imageDescriptions from '../../content/image-descriptions.json';

const textOf = (node: DOMNode): string => 'data' in node ? node.data : node instanceof Element ? node.children.map(child => textOf(child as DOMNode)).join(' ') : '';
const projectGrid = (node: Element) => node.attribs.class?.includes('sm:grid-cols-2') && node.attribs.class?.includes('lg:grid-cols-3');

// The reference's measured Tailwind layout is preserved as static content.
// Rendering it as React keeps navigation, image sizing and form behavior native.
export function ReferenceMarkup({ html }: { html: string }) {
  const branded = html.replaceAll('Y Architects', 'Dream House').replaceAll('Y ARCHITECTS', 'DREAM HOUSE')
    .replaceAll('hello@yarchitects.com', 'Contact the studio')
    .replaceAll('href="mailto:Contact the studio"', 'href="/contact/"')
    .replaceAll('+91 98765 43210', 'By appointment')
    .replaceAll('+91 99959 87125', 'Contact details to be confirmed')
    .replaceAll('Dream House, Chenakkal<br/>Kottakkal, Malappuram<br/>Kerala – 676503, India', 'Dream House<br/>Studio visits by appointment')
    .replace(/Dream House, Chenakkal<br\s*\/?>Kottakkal, Malappuram<br\s*\/?>Kerala (?:–|&#x2013;|&ndash;) 676503, India/g, 'Dream House<br/>Studio visits by appointment')
    .replaceAll('/privacy', '/contact/#privacy').replaceAll('/terms', '/contact/#terms');
  const options: HTMLReactParserOptions = {
    replace(node) {
      if (!(node instanceof Element)) return;
      if (['script', 'style', 'canvas', 'feTurbulence'].includes(node.name)) return <></>;
      if (node.name === 'iframe') return <div className="studio-location-note"><p>Dream House</p><span>Studio location to be confirmed.<br/>Visits by appointment.</span></div>;
      const attrs = { ...node.attribs };
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
        attrs.href = '/contact/#privacy';
        delete attrs.target;
        return <Link {...attributesToProps(attrs)} href={attrs.href}>Studio visits by appointment</Link>;
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
      if (node.name === 'h1' && textOf(node).trim() === 'DREAM HOUSE') return createElement('p', attributesToProps(attrs), domToReact(node.children as DOMNode[], options));
      if (reveal || attrs['data-gallery'] !== undefined || attrs['data-image-reveal'] !== undefined || attrs['data-parallax'] !== undefined || attrs['data-project-grid'] !== undefined || attrs['data-category'] !== undefined) {
        return createElement(node.name, attributesToProps(attrs), domToReact(node.children as DOMNode[], options));
      }
    },
  };
  return <>{parse(branded, options)}</>;
}
