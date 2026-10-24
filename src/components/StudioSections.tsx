import Image from 'next/image';
import Link from 'next/link';
import { services } from '../../content/site';

export function Arrow() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>; }
export function Action({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return <Link href={href} className={`dh-action ${light ? 'dh-action-light' : ''}`}>{children}<Arrow /></Link>;
}
export function Photo({ image, alt, portrait = false }: { image: string; alt: string; portrait?: boolean }) {
  return <div className={`dh-photo ${portrait ? 'dh-photo-portrait' : ''}`} data-image-reveal=""><div className="dh-photo-drift" data-parallax=""><Image src={`/images/${image}.webp`} alt={alt} fill sizes="(max-width: 767px) 100vw, 60vw" /></div></div>;
}
export function HomeIntroduction() {
  return <section className="dh-section dh-introduction"><div className="dh-rail">
    <h2 className="dh-display dh-centered" data-reveal="up">A better home<br/>starts <em>on paper.</em></h2>
    <Photo image="residence-garden" alt="A timber and glass house with an open garden" />
    <div className="dh-intro-copy" data-reveal="up"><p>DreamHouse Architectural Engineering is based in Sulthan Bathery, Wayanad. We offer civil engineering consulting, interior and exterior designing, structural designing, AutoCAD and 3D studio services.</p><p>Have a new home in mind, a room to rethink or a drawing to develop? Tell us where you are starting and what you would like the space to become.</p><Action href="/about/">Get to know DreamHouse</Action></div>
  </div></section>;
}
export function HomeBrief() {
  return <section className="dh-section dh-soft"><div className="dh-rail dh-split">
    <div data-reveal="up"><h2 className="dh-display">Your priorities.<br/><em>A clearer brief.</em></h2><p className="dh-lead">A good starting point is a conversation about the things your space needs to do.</p><Action href="/contact/">Talk through your idea</Action></div>
    <div className="dh-points" data-reveal="up">
      <article><h3>Start with everyday life</h3><p>Who will use the space? What should feel easier? Tell us about your routines, not just the rooms on a plan.</p></article>
      <article><h3>Bring what you already have</h3><p>A sketch, an existing drawing, a few photographs or a list of questions can all help explain the starting point.</p></article>
      <article><h3>Choose the support you need</h3><p>Discuss the relevant consulting, design, structural or drawing service for your requirements.</p></article>
    </div>
  </div></section>;
}
export function HomeStudio() {
  return <section className="dh-section"><div className="dh-rail dh-split dh-studio-split">
    <Photo image="studio-collaboration" alt="A shared studio workspace with a timber table" portrait />
    <div data-reveal="up"><h2 className="dh-display">A local address.<br/><em>An open conversation.</em></h2><p className="dh-lead">Find DreamHouse in Sulthan Bathery.</p><p className="dh-body">Your questions may begin with a layout, the outside of a building or how an idea will look in three dimensions. Let us know what you want to work on, and we can discuss the service you are looking for.</p><div className="dh-contact-inline"><a href="tel:+919446731418">9446731418</a><a href="mailto:dreamhousesby@gmail.com">dreamhousesby@gmail.com</a></div><Action href="/contact/">Contact the studio</Action></div>
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
