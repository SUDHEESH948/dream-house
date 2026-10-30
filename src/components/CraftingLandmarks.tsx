'use client';

import { useState, useEffect, useCallback, useId } from 'react';
import Image from 'next/image';
import { FALLBACK_PROJECT_IMAGES, type ProjectImage } from '../data/landmarksFallback';
import './crafting-landmarks.css';

interface CraftingLandmarksProps {
  images?: ProjectImage[];
}

const INITIAL_DISPLAY_COUNT = 8;
const LOAD_MORE_STEP = 5;

export function CraftingLandmarks({ images: initialImages }: CraftingLandmarksProps) {
  const images = initialImages && initialImages.length > 0 ? initialImages : FALLBACK_PROJECT_IMAGES;
  const [visibleCount, setVisibleCount] = useState(INITIAL_DISPLAY_COUNT);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const headingId = useId();

  const totalCount = images.length;
  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < totalCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_STEP, totalCount));
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % totalCount : null));
  }, [totalCount]);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + totalCount) % totalCount : null));
  }, [totalCount]);

  // Handle keyboard events in lightbox: Escape to close, Left/Right arrow keys for navigation
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox();
      } else if (event.key === 'ArrowRight') {
        showNext();
      } else if (event.key === 'ArrowLeft') {
        showPrev();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox, showNext, showPrev]);

  const activeImage = lightboxIndex !== null ? images[lightboxIndex] : null;

  return (
    <section className="dh-section crafting-landmarks-section" aria-labelledby={headingId}>
      <div className="dh-rail">
        {/* Section Header */}
        <header className="crafting-landmarks-header">
          <span className="crafting-landmarks-badge">Built Architecture & Projects</span>
          <h2 id={headingId} className="crafting-landmarks-title">
            Crafting Landmarks.<br />
            <em>Built Realities Across Wayanad.</em>
          </h2>
          <p className="crafting-landmarks-subtitle">
            Explore on-site construction executions, structural elevations, refined interiors, and finished residences
            delivered by DreamHouse Architectural Engineering. Each frame captures the tangible results of our
            dedicated engineering and design practice.
          </p>
        </header>

        {/* Responsive Gallery Grid: 4 columns on desktop, 3 columns on mobile */}
        <div
          className="crafting-landmarks-grid"
          role="region"
          aria-label="Crafting Landmarks project image gallery"
        >
          {visibleImages.map((image, index) => {
            const displayNumber = String(index + 1).padStart(2, '0');
            return (
              <div
                key={image.id || image.filename}
                className="crafting-landmarks-card group"
                onClick={() => openLightbox(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(index);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View enlarged ${image.title || `Landmark Project ${displayNumber}`}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt || `DreamHouse Project Landmark ${displayNumber}`}
                  fill
                  sizes="(max-width: 639px) 33vw, (max-width: 1023px) 33vw, 25vw"
                  className="crafting-landmarks-img"
                  loading="lazy"
                />

                {/* Subtle Hover Overlay */}
                <div className="crafting-landmarks-overlay">
                  <div className="crafting-landmarks-overlay-info">
                    <span className="crafting-landmarks-overlay-title">
                      {image.title || `Landmark ${displayNumber}`}
                    </span>
                    <span className="crafting-landmarks-overlay-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button & Progress Bar */}
        <div className="crafting-landmarks-footer">
          <div className="crafting-landmarks-progress" aria-hidden="true">
            <div
              className="crafting-landmarks-progress-fill"
              style={{ width: `${Math.round((visibleCount / totalCount) * 100)}%` }}
            />
          </div>

          <p className="crafting-landmarks-counter" role="status">
            Showing {visibleImages.length} of {totalCount} landmarks
          </p>

          {hasMore && (
            <button
              type="button"
              className="crafting-landmarks-btn"
              onClick={handleLoadMore}
              aria-label={`Load 5 more landmarks. Currently showing ${visibleImages.length} of ${totalCount}`}
            >
              <span>Load More Landmarks</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Lightbox / Preview Modal */}
      {lightboxIndex !== null && activeImage && (
        <div
          className="crafting-lightbox-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Landmark image preview"
        >
          {/* Top Bar */}
          <div className="crafting-lightbox-top">
            <div className="crafting-lightbox-info">
              <span className="crafting-lightbox-count">
                Landmark {String(lightboxIndex + 1).padStart(2, '0')} of {totalCount}
              </span>
              <h3 className="crafting-lightbox-heading">
                {activeImage.title || `Landmark Project ${String(lightboxIndex + 1).padStart(2, '0')}`}
              </h3>
            </div>

            <button
              type="button"
              className="crafting-lightbox-close"
              onClick={closeLightbox}
              aria-label="Close image preview (Escape)"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Main Stage with Navigation */}
          <div className="crafting-lightbox-stage">
            <button
              type="button"
              className="crafting-lightbox-nav crafting-lightbox-prev"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous image (Left arrow)"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div
              className="crafting-lightbox-img-wrapper"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeImage.src}
                alt={activeImage.alt || activeImage.title}
                width={1600}
                height={1200}
                className="crafting-lightbox-img"
                priority
              />
            </div>

            <button
              type="button"
              className="crafting-lightbox-nav crafting-lightbox-next"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next image (Right arrow)"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Bottom Bar / Keyboard Navigation Hint */}
          <div className="crafting-lightbox-footer">
            <p className="crafting-lightbox-hint">
              Use <kbd>←</kbd> and <kbd>→</kbd> arrow keys to browse · <kbd>ESC</kbd> or click outside to close
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

