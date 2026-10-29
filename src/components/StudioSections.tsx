import Image from 'next/image';
import Link from 'next/link';
import { services } from '../../content/site';
import './home-introduction.css';

export function Arrow() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6 6 6" /></svg>; }
export function Action({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="dh-action">{children}<Arrow /></Link>;
}
export function Photo({ image, alt, portrait = false, priority = false }: { image: string; alt: string; portrait?: boolean; priority?: boolean }) {
  return <div className={`dh-photo ${portrait ? 'dh-photo-portrait' : ''}`} data-image-reveal=""><div className="dh-photo-drift" data-parallax=""><Image src={`/images/${image}.webp`} alt={alt} fill sizes="(max-width: 767px) 100vw, 60vw" priority={priority} /></div></div>;
}
export function HomeIntroduction() {
  return <section id="home-introduction" className="home-introduction" data-intro-scene="" aria-labelledby="home-introduction-title"><div className="dh-rail home-introduction-grid">
    <h2 id="home-introduction-title" className="home-introduction-title"><span>A better home</span><span>starts <em>on paper.</em></span></h2>
    <div className="home-introduction-photo">
      <div className="home-introduction-photo-drift"><Image src="/images/residence-modern-elevation.webp" alt="Contemporary architectural elevation designed by DreamHouse" fill sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1396px) 55vw, 740px" /></div>
    </div>
    <div className="home-introduction-copy">
      <p>DreamHouse Architectural Engineering is based in Sulthan Bathery, Wayanad. We offer civil engineering consulting, interior and exterior designing, structural designing, AutoCAD and 3D studio services.</p>
      <p>Have a new home in mind, a room to rethink or a drawing to develop? Tell us where you are starting and what you would like the space to become.</p>
      <Link href="/about/" className="home-introduction-link">Get to know DreamHouse <span><Arrow /></span></Link>
    </div>
  </div></section>;
}
export function HomeStudio() {
  return <section id="home-studio" className="dh-section home-studio-section"><div className="dh-rail home-studio-layout">
    <div className="home-studio-photo"><Photo image="residence-courtyard-villa" alt="Modern residence and courtyard architecture" portrait /><span>Sulthan Bathery · Wayanad · Kerala</span></div>
    <div className="home-studio-content" data-reveal="up"><h2 className="dh-display">A local address.<br/><em>An open conversation.</em></h2><p className="home-studio-lead">Find DreamHouse in Sulthan Bathery.</p><p className="home-studio-copy">Your questions may begin with a layout, the outside of a building or how an idea will look in three dimensions. Let us know what you want to work on, and we can discuss the service you are looking for.</p><div className="home-studio-contacts"><a href="tel:+919446731418">Call the studio<span>9446731418</span></a><a href="mailto:dreamhousesby@gmail.com">Write to us<span>dreamhousesby@gmail.com</span></a></div><Action href="/contact/">Contact the studio</Action></div>
  </div></section>;
}
export function ServiceOverview() {
  return <section className="dh-section dh-soft"><div className="dh-rail">
    <div className="dh-section-top"><h2 className="dh-display" data-reveal="up">From the first question<br/>to <em>the finer detail.</em></h2><Action href="/services/">Explore our services</Action></div>
    <div className="dh-services-grid">{services.map(service => <article key={service.slug} className="dh-service" data-reveal="up"><h3>{service.title}</h3><p>{service.short}</p><Link href={`/services/#${service.slug}`}>Find out more<Arrow /></Link></article>)}</div>
  </div></section>;
}
export function Conversation({ title = 'Let’s put your idea into words.' }: { title?: string }) {
  return <section className="dh-section dh-conversation"><div className="dh-rail" data-reveal="up"><h2 className="dh-display">{title}</h2><p>Tell us what you are planning, where the space is and which questions you would like help with.</p><Action href="/contact/">Make an enquiry</Action><span>Sulthan Bathery · Wayanad · Kerala</span></div></section>;
}
