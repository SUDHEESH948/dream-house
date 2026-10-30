import Image from 'next/image';
import Link from 'next/link';
import { FALLBACK_HOME_IMAGES, type ProjectImage } from '../lib/projectImages';
import './featured-projects.css';

interface FeaturedProjectsProps {
  images?: ProjectImage[];
}

export function FeaturedProjects({ images }: FeaturedProjectsProps) {
  const displayImages = images && images.length > 0 ? images : FALLBACK_HOME_IMAGES;

  return (
    <section className="featured-projects-section" aria-labelledby="featured-projects-title">
      <div className="dh-rail">
        {/* Section Header */}
        <div className="featured-projects-header">
          <div>
            <span className="featured-projects-badge">Selected Works &amp; Executions</span>
            <h2 id="featured-projects-title" className="featured-projects-title">
              Crafting Landmarks.<br />
              <em>Built Across Wayanad.</em>
            </h2>
          </div>
        </div>

        {/* 3 images in a single row (4 rows x 3 columns = 12 images) */}
        <div className="featured-projects-grid" role="region" aria-label="Selected project work gallery">
          {displayImages.map((image, index) => {
            const num = String(index + 1).padStart(2, '0');
            return (
              <Link
                key={image.id || image.filename || index}
                href="/gallery/"
                className="featured-project-card group"
                aria-label={`View ${image.title || `Project Work ${num}`} in gallery`}
              >
                <Image
                  src={image.src}
                  alt={image.alt || `DreamHouse Project Work ${num}`}
                  fill
                  sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 33vw"
                  className="featured-project-img"
                  loading="lazy"
                />
                <div className="featured-project-overlay">
                  <span className="featured-project-overlay-title">
                    {image.title || `Project Work ${num}`}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View More Button */}
        <div className="featured-projects-footer">
          <Link
            href="/gallery/"
            className="featured-projects-btn"
            aria-label="View more works in gallery"
          >
            <span>View More</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
