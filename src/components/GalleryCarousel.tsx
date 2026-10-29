'use client';

// Next.js adaptation of AliThemes' DragableCarousel physics-snap interaction:
// https://framer.com/m/DragableCarousel-ADAPEh.js@fXOJxTG2NAtXIGjIOPmn
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { gsap } from 'gsap';
import { ideas } from '../../content/site';
import './gallery-carousel.css';

const count = ideas.length;
const wrap = (value: number) => ((value % count) + count) % count;

export function GalleryCarousel() {
  const stage = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const position = useRef({ value: 0 });
  const tween = useRef<gsap.core.Tween | null>(null);
  const target = useRef(0);
  const reduced = useRef(false);
  const drag = useRef({ pointer: -1, startX: 0, startY: 0, startValue: 0, lastX: 0, lastTime: 0, velocity: 0, horizontal: false });
  const moved = useRef(false);
  const paintFrame = useRef(0);
  const metrics = useRef({ width: 320, step: 340 });
  const [active, setActive] = useState(0);

  function render() {
    const { step } = metrics.current;
    cards.current.forEach((card, index) => {
      if (!card) return;
      const delta = wrap(index - position.current.value + count / 2) - count / 2;
      const distance = Math.abs(delta);
      const rotate = reduced.current ? 0 : delta * 45;
      const depth = reduced.current ? 0 : -distance * 150;
      const scale = reduced.current ? 1 : Math.max(0.85, 1 - distance * 0.15);
      card.style.transform = `translate3d(${delta * step}px,0,${depth}px) rotateY(${rotate}deg) scale(${scale})`;
      card.style.opacity = `${distance > 2 ? Math.max(0, (3 - distance) * 0.35) : Math.max(0.35, 1 - distance * 0.5)}`;
      card.style.zIndex = `${100 - Math.round(distance * 10)}`;
    });
  }

  function scheduleRender() {
    if (paintFrame.current) return;
    paintFrame.current = requestAnimationFrame(() => { paintFrame.current = 0; render(); });
  }

  function snap(index: number, instant = false) {
    target.current = index;
    setActive(wrap(index));
    tween.current?.kill();
    if (instant || reduced.current) {
      position.current.value = index;
      render();
      return;
    }
    tween.current = gsap.to(position.current, {
      value: index, duration: 0.6, ease: 'power3.out', onUpdate: render,
    });
  }

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const resize = () => {
      const width = cards.current[0]?.offsetWidth || 320;
      metrics.current = { width, step: width + (window.innerWidth < 768 ? 16 : 28) };
      render();
    };
    const changePreference = () => { reduced.current = preference.matches; snap(target.current, true); };
    const stopDrag = () => {
      if (drag.current.pointer === -1) return;
      drag.current.pointer = -1;
      stage.current?.classList.remove('is-dragging');
      snap(Math.round(position.current.value));
    };
    reduced.current = preference.matches;
    resize();
    const observer = new ResizeObserver(resize);
    if (stage.current) observer.observe(stage.current);
    preference.addEventListener('change', changePreference);
    window.addEventListener('blur', stopDrag);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', changePreference);
      window.removeEventListener('blur', stopDrag);
      tween.current?.kill();
      cancelAnimationFrame(paintFrame.current);
    };
  }, []);

  function pointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    tween.current?.kill();
    moved.current = false;
    drag.current = { pointer: event.pointerId, startX: event.clientX, startY: event.clientY, startValue: position.current.value, lastX: event.clientX, lastTime: performance.now(), velocity: 0, horizontal: false };
  }

  function pointerMove(event: PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    if (current.pointer !== event.pointerId) return;
    const deltaX = event.clientX - current.startX;
    const deltaY = event.clientY - current.startY;
    if (!current.horizontal) {
      if (Math.abs(deltaX) < 8 && Math.abs(deltaY) < 8) return;
      if (Math.abs(deltaY) >= Math.abs(deltaX)) { current.pointer = -1; return; }
      current.horizontal = true;
      stage.current?.classList.add('is-dragging');
      stage.current?.setPointerCapture(event.pointerId);
    }
    moved.current = true;
    const now = performance.now();
    const elapsed = Math.max(16, now - current.lastTime);
    current.velocity = (event.clientX - current.lastX) / elapsed;
    current.lastX = event.clientX;
    current.lastTime = now;
    position.current.value = current.startValue - deltaX / metrics.current.step;
    scheduleRender();
  }

  function pointerEnd(event: PointerEvent<HTMLDivElement>, cancelled = false) {
    const current = drag.current;
    if (current.pointer !== event.pointerId) return;
    current.pointer = -1;
    stage.current?.classList.remove('is-dragging');
    if (stage.current?.hasPointerCapture(event.pointerId)) stage.current.releasePointerCapture(event.pointerId);
    if (cancelled) { snap(target.current); return; }
    const momentum = -current.velocity * 0.22;
    snap(Math.round(position.current.value + momentum));
  }

  function keyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowRight') { event.preventDefault(); snap(target.current + 1); }
    else if (event.key === 'ArrowLeft') { event.preventDefault(); snap(target.current - 1); }
  }

  return <section className="gallery-carousel" aria-label="Featured design inspiration" aria-roledescription="carousel">
    <div ref={stage} className="gallery-carousel-stage" tabIndex={0} aria-label="Drag to browse design inspiration, or use the left and right arrow keys"
      onKeyDown={keyDown} onPointerDown={pointerDown} onPointerMove={pointerMove}
      onPointerUp={event => pointerEnd(event)} onPointerCancel={event => pointerEnd(event, true)} onLostPointerCapture={event => pointerEnd(event, true)}
      onDragStart={event => event.preventDefault()} onClickCapture={event => { if (moved.current && event.detail !== 0) { event.preventDefault(); event.stopPropagation(); moved.current = false; } }}>
      {ideas.map((idea, index) => <article key={idea.slug} ref={element => { cards.current[index] = element; }}
        className="gallery-carousel-slide" data-slide={index} role="group" aria-hidden={index !== active} aria-roledescription="slide" aria-label={`${index + 1} of ${count}: ${idea.title}`}>
        <Link href={`/gallery/${idea.slug}/`} tabIndex={index === active ? 0 : -1} onFocus={() => { if (index !== active) snap(target.current + index - active); }}>
          <Image src={`/images/${idea.image}.webp`} alt={idea.focus} fill sizes="(max-width: 767px) 76vw, 420px" draggable={false} priority={index < 2} />
          <div className="gallery-carousel-slide-copy"><p>{idea.category}</p><h2>{idea.title}</h2></div>
        </Link>
      </article>)}
    </div>
    <div className="gallery-carousel-controls dh-rail">
      <p className="gallery-carousel-hint">Drag to explore</p>
      <div className="gallery-carousel-pagination" aria-label="Choose a design reference">{ideas.map((idea, index) => <button key={idea.slug} type="button" aria-label={`Show ${idea.title}`} aria-pressed={index === active}
        onClick={() => { const delta = wrap(index - wrap(target.current) + count / 2) - count / 2; snap(target.current + delta); }}><span /></button>)}</div>
      <div className="gallery-carousel-arrows"><button type="button" aria-label="Previous design reference" onClick={() => snap(target.current - 1)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6" /></svg></button><button type="button" aria-label="Next design reference" onClick={() => snap(target.current + 1)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></button></div>
    </div>
    <p className="sr-only" role="status" aria-live="polite">{active + 1} of {count}: {ideas[active].title}</p>
  </section>;
}
