'use client';
import { useState } from 'react';

const categories = ['All', 'Exteriors', 'Interiors'];

export function GalleryFilters({ initialCount = 8 }: { initialCount?: number }) {
  const [active, setActive] = useState('All');
  const [count, setCount] = useState(initialCount);

  function filter(category: string) {
    setActive(category);
    let visible = 0;
    document.querySelectorAll<HTMLElement>('[data-project-grid] > [data-category]').forEach(card => {
      card.hidden = category !== 'All' && card.dataset.category !== category;
      if (!card.hidden) visible++;
    });
    setCount(visible);
    window.dispatchEvent(new Event('resize'));
  }

  return (
    <>
      <div className="gallery-filters" aria-label="Filter Design">
        {categories.map(category => (
          <button key={category} type="button" aria-pressed={active === category} onClick={() => filter(category)}>
            {category}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">{count} design references shown</p>
    </>
  );
}
