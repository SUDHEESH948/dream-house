'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';

const photographs = [
  { image: 'interior-earth-tones', caption: 'Considered interiors', alt: 'Warm living room with earth tones and sculptural furniture' },
  { image: 'interior-sunlight', caption: 'Room for light', alt: 'Sunlit living room with natural textures and plants' },
  { image: 'interior-dining', caption: 'Everyday rituals', alt: 'Minimal dining space opening onto a courtyard' },
  { image: 'residence-garden', caption: 'Open to nature', alt: 'Contemporary garden residence with timber and glass' },
  { image: 'interior-staircase', caption: 'Connected spaces', alt: 'Airy living space with a timber staircase' },
  { image: 'interior-open-plan', caption: 'A material dialogue', alt: 'Open-plan interior with wood and neutral furnishings' },
  { image: 'residence-brick', caption: 'Form and texture', alt: 'Contemporary home with brick, glass and a garden' },
  { image: 'workspace-glass', caption: 'Designed for working', alt: 'Modern workspace with glass partitions and daylight' },
  { image: 'residence-timber', caption: 'Quiet geometry', alt: 'Modern facade with dark panels and timber detailing' },
  { image: 'residence-tree-canopy', caption: 'Architecture in context', alt: 'Timber and glass residence beneath mature trees' },
  { image: 'sculptural-courtyard', caption: 'Another perspective', alt: 'Curved architecture framing an open sky' },
  { image: 'residence-pool', caption: 'Your next chapter', alt: 'Modern white residence beside a swimming pool' },
];
const sheets = Array.from({ length: photographs.length / 2 }, (_, i) => [photographs[i * 2], photographs[i * 2 + 1]]);
const total = sheets.length;
const offset = (page: number) => page === 0 ? 0 : page === total ? 100 : 50;
const stack = (sheet: number, page: number) => sheet < page ? sheet + 1 : total - sheet;

function Arrow({ previous = false }: { previous?: boolean }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={previous ? 'M19 12H5m6-6-6 6 6 6' : 'M5 12h14m-6-6 6 6-6 6'} /></svg>;
}

export function PortfolioBook() {
  const [page, setPage] = useState(0);
  const [turning, setTurning] = useState(false);
  const [turningSheet, setTurningSheet] = useState<number | null>(null);
  const book = useRef<HTMLDivElement>(null);
  const previousButton = useRef<HTMLButtonElement>(null);
  const nextButton = useRef<HTMLButtonElement>(null);
  const leaves = useRef<(HTMLDivElement | null)[]>([]);
  const current = useRef(0);
  const locked = useRef(false);
  const reduced = useRef(false);
  const animation = useRef<gsap.core.Timeline | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const lastSwipe = useRef(0);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      reduced.current = preference.matches;
      if (preference.matches) animation.current?.progress(1);
    };
    update(); preference.addEventListener('change', update);
    return () => { preference.removeEventListener('change', update); animation.current?.kill(); };
  }, []);

  function finish(next: number) {
    // The previous control disappears at the cover; keep its user in the book.
    if (next === 0 && document.activeElement === previousButton.current) nextButton.current?.focus();
    current.current = next;
    setPage(next); setTurning(false); setTurningSheet(null);
    leaves.current.forEach((leaf, i) => { if (leaf) gsap.set(leaf, { zIndex: stack(i, next), willChange: 'auto' }); });
    locked.current = false;
    animation.current = null;
  }

  function turn(direction: 1 | -1) {
    if (locked.current) return;
    const from = current.current;
    const next = from + direction;
    if (next < 0 || next > total) return;
    const index = direction === 1 ? from : next;
    const leaf = leaves.current[index];
    if (!leaf || !book.current) return;
    locked.current = true; setTurning(true); setTurningSheet(index);
    // React owns the resting page; GSAP exclusively owns its 3D transform.
    // Keep the turning leaf above both stacks until the turn has finished.
    gsap.set(leaf, { zIndex: total + 2, willChange: 'transform' });
    if (reduced.current) {
      gsap.set(book.current, { xPercent: offset(next) });
      gsap.set(leaf, { rotationY: direction === 1 ? -180 : 0 });
      finish(next);
      return;
    }
    animation.current = gsap.timeline({ onComplete: () => finish(next) })
      .to(book.current, { xPercent: offset(next), duration: reduced.current ? 0 : 0.6, ease: 'power2.inOut' }, 0)
      .to(leaf, { rotationY: direction === 1 ? -180 : 0, duration: reduced.current ? 0 : 0.7, ease: 'power2.inOut' }, 0);
  }

  function replay() {
    if (locked.current || current.current === 0 || !book.current) return;
    locked.current = true; setTurning(true);
    if (reduced.current) {
      gsap.set(book.current, { xPercent: 0 });
      gsap.set(leaves.current.filter(Boolean), { rotationY: 0 });
      finish(0);
      return;
    }
    const timeline = gsap.timeline({ onComplete: () => finish(0) });
    animation.current = timeline;
    timeline.to(book.current, { xPercent: 0, duration: reduced.current ? 0 : 0.8, ease: 'power2.inOut' }, 0);
    for (let i = current.current - 1; i >= 0; i--) {
      const leaf = leaves.current[i];
      const start = reduced.current ? 0 : (current.current - 1 - i) * 0.045;
      timeline.set(leaf, { zIndex: total * 2 - i, willChange: 'transform' }, start)
        .to(leaf, { rotationY: 0, duration: reduced.current ? 0 : 0.4, ease: 'power2.inOut' }, start);
    }
  }

  function keydown(event: KeyboardEvent<HTMLDivElement>) {
    if (['ArrowRight', 'ArrowLeft', 'Enter', ' ', 'Home'].includes(event.key)) event.preventDefault();
    if (event.key === 'ArrowLeft') turn(-1);
    else if (event.key === 'Home') replay();
    else if (['ArrowRight', 'Enter', ' '].includes(event.key)) page === total ? replay() : turn(1);
  }

  function endSwipe(event: TouchEvent<HTMLDivElement>) {
    if (!touch.current) return;
    const x = touch.current.x - event.changedTouches[0].clientX;
    const y = touch.current.y - event.changedTouches[0].clientY;
    touch.current = null;
    if (Math.abs(x) > 40 && Math.abs(x) > Math.abs(y)) {
      lastSwipe.current = Date.now();
      if (x > 0 && current.current === total) replay(); else turn(x > 0 ? 1 : -1);
    }
  }

  const status = page === 0 ? 'Front cover' : page === total ? 'Back cover' : `Spread ${page} of ${total - 1}`;

  return <section className="lookbook-section" id="lookbook" aria-labelledby="lookbook-title">
    <div className="lookbook-heading">
      <h2 id="lookbook-title">The ideas <em>album.</em></h2>
      <p>Browse spaces, finishes and details to shape your brief.</p>
    </div>
    <div className={`book-stage ${turning ? 'is-turning' : ''}`} role="button" tabIndex={0}
      aria-label={page === 0 ? 'Open the DreamHouse lookbook' : page === total ? 'Replay the DreamHouse lookbook' : 'Turn a lookbook page. Click left to go back or right to go forward.'}
      aria-describedby="book-instructions" aria-busy={turning} aria-disabled={turning}
      onKeyDown={keydown}
      onClick={event => {
        if (Date.now() - lastSwipe.current < 600) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (page > 0 && page < total && event.clientX - bounds.left < bounds.width / 2) turn(-1);
        else if (page === total) replay(); else turn(1);
      }}
      onTouchStart={event => { touch.current = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null; }}
      onTouchEnd={endSwipe} onTouchCancel={() => { touch.current = null; }}>
      <div className="portfolio-book" ref={book} data-open={page > 0 || turning}>
        {sheets.map(([front, back], i) => <div key={front.image} className="book-leaf" ref={element => { leaves.current[i] = element; }}
          style={{ zIndex: turningSheet === i ? total + 2 : stack(i, page) }}>
          <div className="book-face book-front" aria-hidden={i !== page}>
            <Image src={`/images/${front.image}.webp`} alt={front.alt} fill sizes="(max-width: 639px) 170px, (max-width: 1023px) 240px, 310px" draggable={false} />
            {i === 0 ? <div className="book-cover-type"><span>DreamHouse</span><small>ARCHITECTURAL ENGINEERING</small><p>A collection of<br/><em>possibilities.</em></p></div> : <span className="book-caption">{front.caption}</span>}
          </div>
          <div className="book-face book-back" aria-hidden={i !== page - 1}>
            <Image src={`/images/${back.image}.webp`} alt={back.alt} fill sizes="(max-width: 639px) 170px, (max-width: 1023px) 240px, 310px" draggable={false} />
            {i === total - 1 ? <div className="book-end-type"><span>DreamHouse</span><p>Your next chapter<br/>starts with a conversation.</p><small>SULTHAN BATHERY · WAYANAD</small></div> : <span className="book-caption">{back.caption}</span>}
          </div>
        </div>)}
      </div>
    </div>
    <div className="book-controls" aria-label="Lookbook controls">
      <button ref={previousButton} type="button" onClick={() => turn(-1)} hidden={page === 0} disabled={page === 0} aria-disabled={turning} aria-label="Previous lookbook page"><Arrow previous /><span>Previous</span></button>
      <span className="book-status" role="status" aria-live="polite" hidden={page === 0}>{status}</span>
      <button ref={nextButton} type="button" className={page === 0 ? 'book-open' : 'book-next'} onClick={() => page === total ? replay() : turn(1)} aria-disabled={turning}
        aria-label={page === 0 ? 'Open lookbook' : page === total ? 'Replay lookbook' : 'Next lookbook page'}>
        <span>{page === 0 ? 'Open lookbook' : page === total ? 'Replay' : 'Next'}</span><Arrow />
      </button>
    </div>
    <p id="book-instructions" className="book-instructions">Click a page or swipe to turn. Use the arrow keys when the book is focused.</p>
    <Link className="book-portfolio-link" href="/gallery/">View the design ideas <Arrow /></Link>
    <p className="book-disclosure">Photographic references for your brief. These are not completed DreamHouse commissions.</p>
  </section>;
}
