'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './hero.css';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add({
      desktop: '(min-width: 768px)',
      mobile: '(max-width: 767px)',
      motion: '(prefers-reduced-motion: no-preference)',
    }, context => {
      if (!context.conditions?.motion || !root.current) return;
      const desktop = context.conditions.desktop;
      const select = gsap.utils.selector(root);

      // Entrance and scroll animations own separate wrappers.
      gsap.fromTo(select('.dh-hero-word'), { yPercent: 105 }, {
        yPercent: 0, duration: 1.25, stagger: 0.14,
        ease: 'expo.out', delay: 0.15, clearProps: 'transform',
      });

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.current, start: 'top top', end: 'bottom bottom',
          scrub: 0.65, invalidateOnRefresh: true,
        },
      });
      timeline
        .fromTo(select('.dh-hero-image'), { yPercent: -5, scale: 1.12 },
          { yPercent: 5, scale: 1, duration: 1 }, 0)
        .to(select('.dh-hero-frame'), {
          clipPath: desktop ? 'inset(24px 32px 24px 32px round 20px)' : 'inset(12px 12px 12px 12px round 12px)',
          duration: 0.85,
        }, 0.15)
        .to(select('.dh-hero-title-drift'), { yPercent: -22, duration: 1 }, 0)
        .to(select('.dh-hero-introduction'), { y: -28, duration: 1 }, 0)
        .to(select('.dh-hero-bottom'), { y: -16, duration: 1 }, 0);

      if (desktop) {
        timeline.fromTo(select('.dh-hero-detail'), {
          yPercent: 22, clipPath: 'inset(100% 0% 0% 0% round 12px)',
        }, {
          yPercent: -8, clipPath: 'inset(0% 0% 0% 0% round 12px)', duration: 0.8,
        }, 0.1);
      }
    }, root);
    return () => media.revert();
  }, []);

  return <section ref={root} className="dh-hero" aria-labelledby="dh-hero-title">
    <div className="dh-hero-scene">
      <div className="dh-hero-frame">
        <div className="dh-hero-image">
          <picture>
            <source media="(max-width: 767px)" srcSet="/images/residence-garden-mobile.webp" />
            <img src="/images/residence-garden.webp" alt="Contemporary timber and glass house opening onto a green garden" width={1920} height={1280} loading="eager" fetchPriority="high" decoding="async" />
          </picture>
        </div>
        <div className="dh-hero-shade" />
      </div>

      <div className="dh-hero-content">
        <div className="dh-hero-title-drift">
          <h1 id="dh-hero-title" className="dh-hero-title">
            <span className="dh-hero-line"><span className="dh-hero-word">Begin with</span></span>
            <span className="dh-hero-line"><em className="dh-hero-word">your idea.</em></span>
          </h1>
        </div>
        <div className="dh-hero-introduction">
          <p>Thoughtful spaces begin with you.<br/>Consulting, design and drawing,<br/>together at DreamHouse.</p>
          <a href="/contact/" className="dh-hero-contact">Let’s talk about your space <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></a>
        </div>
      </div>

      <div className="dh-hero-detail" aria-hidden="true">
        <div className="dh-hero-detail-photo"><Image src="/images/interior-luxury-living.webp" alt="" fill sizes="(min-width: 768px) 28vw, 1px" /></div>
        <p>Room for the way you live.</p>
      </div>

      <div className="dh-hero-bottom">
        <p>Sulthan Bathery <span aria-hidden="true">·</span> Wayanad, Kerala</p>
        <a href="#home-introduction" className="dh-hero-explore">Explore DreamHouse <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v16m-6-6 6 6 6-6" /></svg></span></a>
      </div>
    </div>
  </section>;
}
