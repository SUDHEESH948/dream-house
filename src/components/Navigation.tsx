'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import logo from '../../public/brand/dreamhouse-logo.png';

const links = [['Home', '/'], ['About', '/about/'], ['Gallery', '/gallery/'], ['Services', '/services/'], ['Contact', '/contact/']];
export function Navigation() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const path = usePathname();
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => setDark(window.scrollY > window.innerHeight * 0.78 || path !== '/');
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [path]);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const links = panel.current?.querySelectorAll<HTMLAnchorElement>('a');
    links?.[0]?.focus();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animation = reduced ? null : gsap.fromTo(panel.current?.querySelectorAll('.menu-link') || [],
      { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' });
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); }
      if (event.key === 'Tab') {
        const focusable = [trigger.current, ...Array.from(links || [])].filter(Boolean) as HTMLElement[];
        const index = focusable.indexOf(document.activeElement as HTMLElement);
        if (event.shiftKey && index === 0) { event.preventDefault(); focusable.at(-1)?.focus(); }
        else if (!event.shiftKey && index === focusable.length - 1) { event.preventDefault(); focusable[0]?.focus(); }
      }
    };
    document.addEventListener('keydown', keydown);
    return () => { document.body.style.overflow = previousOverflow; animation?.kill(); document.removeEventListener('keydown', keydown); };
  }, [open]);
  function close() { setOpen(false); trigger.current?.focus(); }
  return <>
    <header className={`site-navigation ${dark && !open ? 'dark-ink' : ''}`}>
      <Link href="/" className="wordmark brand-logo" aria-label="DreamHouse Architectural Engineering home" onClick={close}>
        <Image src={logo} alt="DreamHouse Architectural Engineering" priority sizes="(max-width: 767px) 150px, 188px" />
      </Link>
      <button ref={trigger} type="button" className={`menu-toggle ${open ? 'is-open' : ''}`} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(value => !value)}>
        <span /><span />
      </button>
    </header>
    {open && <div id="site-menu" className="menu-overlay" ref={panel} role="dialog" aria-modal="true" aria-label="Main navigation" data-lenis-prevent>
      <div className="menu-photo"><Image src="/images/residence-garden.webp" alt="Contemporary garden residence with warm timber and glass" fill sizes="50vw" /></div>
      <nav aria-label="Main"><ol>{links.map(([label, href], i) => <li key={href}>
        <Link className={`menu-link ${path === href || path === href.slice(0, -1) ? 'current' : ''}`} href={href} onClick={close}><span>0{i + 1}</span>{label}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></Link>
      </li>)}</ol><p>Architecture in dialogue with nature.</p></nav>
    </div>}
  </>;
}
