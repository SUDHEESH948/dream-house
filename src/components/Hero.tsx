'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const slides = [
  { image: 'img2', first: 'Sculpting', second: 'Light.', alt: 'Warmly lit tropical architecture opening onto a tranquil landscape' },
  { image: 'img3', first: 'Quiet', second: 'Luxury.', alt: 'An intimate interior composed from natural materials and soft light' },
  { image: 'img8', first: 'Living', second: 'Art.', alt: 'Contemporary architecture in harmony with its surrounding landscape' },
];

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const root = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: ReturnType<typeof setInterval> | undefined;
    function schedule() {
      clearInterval(timer);
      if (!paused && !reduced.matches && !document.hidden) timer = setInterval(() => setActive(i => (i + 1) % slides.length), 6000);
    }
    schedule();
    reduced.addEventListener('change', schedule);
    document.addEventListener('visibilitychange', schedule);
    return () => { clearInterval(timer); reduced.removeEventListener('change', schedule); document.removeEventListener('visibilitychange', schedule); };
  }, [paused]);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = gsap.context(() => {
      gsap.fromTo(heading.current, { opacity: 0, filter: 'blur(8px)', scale: 0.96, y: 10 },
        { opacity: 1, filter: 'blur(0px)', scale: 1, y: 0, duration: 1.6, ease: 'power3.out', delay: 0.3 });
    }, root);
    return () => context.revert();
  }, [active]);
  return <section ref={root} className="hero" aria-label="Dream House architecture and interiors">
    <div className="hero-images" aria-hidden="true">
      {slides.map((slide, i) => <div key={slide.image} className={`hero-slide ${i === active ? 'active' : ''}`}>
        <Image src={`/images/${slide.image}.webp`} alt="" fill sizes="100vw" priority={i === 0} className="hero-desktop" />
        <Image src={`/images/${slide.image}-mobile.webp`} alt="" fill sizes="100vw" priority={i === 0} className="hero-mobile" />
      </div>)}
    </div>
    <div className="hero-copy"><h1 ref={heading} key={active} className="hero-heading">
      <span>{slides[active].first}</span><em>{slides[active].second}</em>
    </h1></div>
    <button className="hero-pause" type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Resume slideshow' : 'Pause slideshow'} aria-pressed={paused}>
      <svg viewBox="0 0 24 24" aria-hidden="true">{paused ? <path d="m9 5 10 7-10 7Z" /> : <path d="M8 5v14M16 5v14" />}</svg>
      <span>{paused ? 'Play' : 'Pause'}</span>
    </button>
  </section>;
}
