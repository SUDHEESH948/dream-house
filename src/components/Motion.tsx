'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);
export function Motion() {
  const pathname = usePathname();
  useEffect(() => {
    const media = gsap.matchMedia();
    let lenis: Lenis | undefined;
    let tick: ((time: number) => void) | undefined;
    media.add('(prefers-reduced-motion: no-preference)', () => {
      lenis = new Lenis({ duration: 1.2, smoothWheel: true, anchors: true });
      lenis.on('scroll', ScrollTrigger.update);
      tick = time => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.utils.toArray<HTMLElement>('.dh-footer-wordmark').forEach(wordmark => {
        const text = wordmark.querySelector('.dh-footer-wordmark-text');
        if (!text) return;
        gsap.fromTo(text, { yPercent: 110 }, {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: wordmark,
            start: 'top 95%',
            end: 'clamp(top 70%)',
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
      });
      gsap.utils.toArray<HTMLElement>('[data-intro-scene]').forEach(section => {
        const photo = section.querySelector('.home-introduction-photo');
        const image = section.querySelector('.home-introduction-photo-drift');
        const title = section.querySelector('.home-introduction-title');
        const copy = section.querySelector('.home-introduction-copy');
        const distance = () => window.innerWidth >= 768 ? 36 : 14;
        const travel = { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.7, invalidateOnRefresh: true };
        if (photo) gsap.fromTo(photo, { clipPath: 'inset(8% 6% 8% 6% round 80px)' }, {
          clipPath: 'inset(0% 0% 0% 0% round 16px)', ease: 'none',
          scrollTrigger: { trigger: photo, start: 'top 95%', end: 'top 30%', scrub: 0.7 },
        });
        if (image) gsap.fromTo(image, { yPercent: -6, scale: 1.06 }, {
          yPercent: 6, scale: 1, ease: 'none', scrollTrigger: { ...travel },
        });
        if (title) gsap.fromTo(title, { y: distance }, {
          y: () => -distance(), ease: 'none', scrollTrigger: { ...travel },
        });
        if (copy) gsap.fromTo(copy, { y: () => distance() * 1.6 }, {
          y: () => -distance() * 0.6, ease: 'none', scrollTrigger: { ...travel },
        });
      });
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => {
        const kind = element.dataset.reveal;
        gsap.fromTo(element, { autoAlpha: 0, y: kind === 'up' ? 35 : 0, x: kind === 'horizontal' ? -20 : 0, scale: kind === 'scale' ? 0.95 : 1 },
          { autoAlpha: 1, y: 0, x: 0, scale: 1, duration: 1.1, ease: 'power3.out', clearProps: 'opacity,visibility,transform', scrollTrigger: { trigger: element, start: 'top 94%', once: true } });
      });
      gsap.utils.toArray<HTMLElement>('[data-image-reveal]').forEach(element => {
        gsap.fromTo(element, { clipPath: 'inset(15% 5% 15% 5%)', borderRadius: 60 }, {
          clipPath: 'inset(0% 0% 0% 0%)', borderRadius: 20, ease: 'none',
          scrollTrigger: { trigger: element, start: 'top 90%', end: 'top 20%', scrub: 1 },
        });
      });
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach(element => {
        gsap.fromTo(element, { yPercent: -4 }, { yPercent: 4, ease: 'none',
          scrollTrigger: { trigger: element.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      return () => { lenis?.destroy(); if (tick) gsap.ticker.remove(tick); };
    });
    let disposed = false;
    let refreshFrame = 0;
    const refresh = () => {
      if (disposed || refreshFrame) return;
      refreshFrame = requestAnimationFrame(() => {
        refreshFrame = 0;
        ScrollTrigger.refresh();
      });
    };
    document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);
    let previousWidth = -1;
    let previousHeight = -1;
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const { width, height } = entry.contentRect;
      if (Math.abs(width - previousWidth) < 1 && Math.abs(height - previousHeight) < 1) return;
      previousWidth = width;
      previousHeight = height;
      refresh();
    });
    const main = document.querySelector('main');
    if (main) observer.observe(main);
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(refreshFrame);
      window.removeEventListener('load', refresh);
      media.revert();
    };
  }, [pathname]);
  return null;
}
