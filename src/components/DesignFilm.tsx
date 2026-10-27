'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './design-film.css';

gsap.registerPlugin(ScrollTrigger);

const film = '/videos/design-transformation-scroll.mp4?v=2';
const framesPerSecond = 24;

export function DesignFilm() {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const player = video.current;
    if (!player || !section.current) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileViewport = window.matchMedia('(max-width: 767px)');
    let trigger: ScrollTrigger | undefined;
    let animation: gsap.core.Timeline | undefined;
    let scene: gsap.Context | undefined;
    const playhead = { frame: 0 };
    let frameRequest = 0;
    let disposed = false;

    // Seek at most once per paint, to actual encoded frames. Never interrupt a decode.
    const seek = () => {
      frameRequest = 0;
      if (disposed || player.readyState < 2 || player.seeking) return;
      const time = Math.round(playhead.frame) / framesPerSecond;
      if (Math.abs(player.currentTime - time) > 0.5 / framesPerSecond) player.currentTime = time;
    };
    const scheduleSeek = () => {
      if (!disposed && !frameRequest) frameRequest = requestAnimationFrame(seek);
    };
    const configure = () => {
      trigger?.kill();
      animation?.kill();
      scene?.revert();
      trigger = undefined;
      animation = undefined;
      cancelAnimationFrame(frameRequest);
      frameRequest = 0;
      player.pause();
      setReducedMotion(preference.matches);
      player.controls = preference.matches;
      if (!Number.isFinite(player.duration) || player.duration <= 0) return;
      const lastFrame = Math.max(0, Math.round(player.duration * framesPerSecond) - 1);
      if (preference.matches) {
        playhead.frame = lastFrame;
        scheduleSeek();
        return;
      }
      scene = gsap.context(() => {
        const sticky = section.current!.querySelector<HTMLElement>('.design-film-sticky')!;
        const frame = section.current!.querySelector<HTMLElement>('.design-film-frame')!;
        const heading = section.current!.querySelector<HTMLElement>('.design-film-heading')!;
        const caption = section.current!.querySelector<HTMLElement>('.design-film-caption')!;
        const initial = () => {
          const mobile = mobileViewport.matches;
          const gutter = mobile ? 24 : 48;
          const headingTop = mobile ? Number.parseFloat(getComputedStyle(heading).top) : heading.offsetTop;
          const belowHeading = headingTop + heading.offsetHeight + 28;
          const height = Math.max(80, Math.min((sticky.clientWidth - gutter * 2) * 9 / 16, sticky.clientHeight - belowHeading - 64));
          const width = Math.min(1280, height * 16 / 9);
          const frameHeight = width * 9 / 16;
          const y = mobile ? (sticky.clientHeight - frameHeight) / 2 : belowHeading;
          return { width, height: frameHeight, x: (sticky.clientWidth - width) / 2, y };
        };
        animation = gsap.timeline({ paused: true, defaults: { ease: 'none' } });
        const mobile = mobileViewport.matches;
        if (mobile) {
          // Keep a centered landscape frame; scrolling controls only the film.
          animation.fromTo(frame, {
            width: () => initial().width,
            height: () => initial().height,
            x: () => initial().x,
            y: () => initial().y,
            borderRadius: 14,
          }, {
            width: () => initial().width,
            height: () => initial().height,
            x: () => initial().x,
            y: () => initial().y,
            borderRadius: 14,
            duration: 1,
          }, 0)
            .fromTo(playhead, { frame: 0 }, {
              frame: lastFrame,
              duration: 1,
              onUpdate: scheduleSeek,
            }, 0);
        } else {
          animation.fromTo(frame, {
            width: () => initial().width,
            height: () => initial().height,
            x: () => initial().x,
            y: () => initial().y,
            borderRadius: 16,
          }, {
            width: () => sticky.clientWidth,
            height: () => sticky.clientHeight,
            x: 0, y: 0, borderRadius: 0, duration: 0.26,
          }, 0)
            .fromTo(heading, { y: 0, opacity: 1 }, { y: -48, opacity: 0, duration: 0.18 }, 0)
            .fromTo(caption, { opacity: 1 }, { opacity: 0, duration: 0.12 }, 0.08)
            .fromTo(playhead, { frame: 0 }, { frame: lastFrame, duration: 0.74, onUpdate: scheduleSeek }, 0.22)
            // Hold the completed home, then return to the opening frame geometry.
            .to(frame, {
              width: () => initial().width,
              height: () => initial().height,
              x: () => initial().x,
              y: () => initial().y,
              borderRadius: 16,
              duration: 0.26,
            }, 1.02)
            .to(heading, { y: 0, opacity: 1, duration: 0.14 }, 1.14)
            .to(caption, { opacity: 1, duration: 0.12 }, 1.16)
            .to({}, { duration: 0.04 }, 1.28);
        }
        trigger = ScrollTrigger.create({
          trigger: section.current,
          animation,
          start: 'top top',
          end: 'bottom bottom',
          scrub: mobileViewport.matches ? 0.65 : 0.3,
          invalidateOnRefresh: true,
          onRefresh: scheduleSeek,
        });
        animation.progress(trigger.progress);
      }, section);
      scheduleSeek();
    };
    const onSeeked = () => { if (!preference.matches) scheduleSeek(); };
    const preload = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      player.preload = 'auto';
      player.load();
      preload.disconnect();
    }, { rootMargin: '100% 0px' });
    preload.observe(section.current);
    player.addEventListener('loadedmetadata', configure);
    player.addEventListener('loadeddata', scheduleSeek);
    player.addEventListener('seeked', onSeeked);
    preference.addEventListener('change', configure);
    mobileViewport.addEventListener('change', configure);
    configure();
    return () => {
      disposed = true;
      preload.disconnect();
      trigger?.kill();
      animation?.kill();
      scene?.revert();
      cancelAnimationFrame(frameRequest);
      player.removeEventListener('loadedmetadata', configure);
      player.removeEventListener('loadeddata', scheduleSeek);
      player.removeEventListener('seeked', onSeeked);
      preference.removeEventListener('change', configure);
      mobileViewport.removeEventListener('change', configure);
    };
  }, []);

  return <section ref={section} className={`design-film${failed ? ' design-film-failed' : ''}`} aria-labelledby="design-film-title">
    <div className="design-film-sticky">
      <div className="design-film-heading">
        <h2 id="design-film-title">From an idea.<br className="design-film-break"/> <em>Into a home.</em></h2>
      </div>
      <div className="design-film-frame">
        <video ref={video} src={film} muted playsInline preload="metadata" controls={reducedMotion}
          aria-label="Conceptual architectural visualisation of a home taking shape"
          onError={() => setFailed(true)} />
        {failed && <p className="design-film-error">The video couldn’t load. <a href={film}>Open the video</a> or continue to the studio below.</p>}
      </div>
      <div className="design-film-caption">
        <p>{reducedMotion ? 'Play to explore the design.' : 'Scroll to see the idea take shape.'}</p>
        <p>Concept visualisation</p>
      </div>
    </div>
  </section>;
}
