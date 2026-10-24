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
      const cleanups: (() => void)[] = [];
      lenis = new Lenis({ duration: 1.2, smoothWheel: true, anchors: true });
      lenis.on('scroll', ScrollTrigger.update);
      tick = time => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
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
      gsap.utils.toArray<HTMLElement>('[data-gallery]').forEach(gallery => {
        const track = gallery.querySelector<HTMLElement>('.w-max');
        if (!track) return;
        const animation = gsap.to(track, { x: () => -(track.scrollWidth - window.innerWidth), ease: 'none',
          scrollTrigger: { trigger: gallery, start: 'top top', end: 'bottom bottom', scrub: 0.8, invalidateOnRefresh: true } });
        const revealFocused = (event: FocusEvent) => {
          const link = (event.target as HTMLElement).closest('a');
          if (!link || !track.contains(link)) return;
          const bounds = link.getBoundingClientRect();
          if (bounds.left >= 0 && bounds.right <= window.innerWidth) return;
          const currentX = Number(gsap.getProperty(track, 'x')) || 0;
          const maxTravel = Math.max(1, track.scrollWidth - window.innerWidth);
          const distance = gsap.utils.clamp(0, maxTravel, bounds.left - currentX - window.innerWidth * 0.1);
          const progress = distance / maxTravel;
          const trigger = animation.scrollTrigger;
          if (!trigger) return;
          const scroll = trigger.start + (trigger.end - trigger.start) * progress;
          lenis?.scrollTo(scroll, { immediate: true });
          if (!lenis) window.scrollTo({ top: scroll, behavior: 'instant' });
          ScrollTrigger.update();
          animation.progress(progress);
        };
        gallery.addEventListener('focusin', revealFocused);
        cleanups.push(() => gallery.removeEventListener('focusin', revealFocused));
        const progress = gallery.querySelector<HTMLElement>('[style*="scaleX"]');
        if (progress) gsap.fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: 'none',
          scrollTrigger: { trigger: gallery, start: 'top top', end: 'bottom bottom', scrub: true } });
      });
      return () => { cleanups.forEach(cleanup => cleanup()); lenis?.destroy(); if (tick) gsap.ticker.remove(tick); };
    });
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);
    const observer = new ResizeObserver(() => ScrollTrigger.refresh());
    const main = document.querySelector('main'); if (main) observer.observe(main);
    return () => { observer.disconnect(); window.removeEventListener('load', refresh); media.revert(); };
  }, [pathname]);
  return null;
}
