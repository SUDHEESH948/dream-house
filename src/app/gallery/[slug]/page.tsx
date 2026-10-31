import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ideas } from '../../../../content/site';
import { IdeaPage } from '@/components/InteriorPages';

export const dynamicParams = false;

export function generateStaticParams() {
  return ideas.map(idea => ({ slug: idea.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const idea = ideas.find(item => item.slug === slug);

  if (!idea) {
    return {
      title: 'Project Not Found',
      robots: { index: false, follow: false },
    };
  }

  const canonical = `/gallery/${idea.slug}/`;
  const imagePath = `/images/${idea.image}.webp`;
  const description = `${idea.intro} ${idea.focus}. Custom architectural engineering and construction coordination by DreamHouse in Wayanad, Kerala.`;

  return {
    title: idea.title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'article',
      title: `${idea.title} | DreamHouse Wayanad`,
      description: idea.intro,
      url: canonical,
      publishedTime: '2024-01-01T00:00:00.000Z',
      modifiedTime: '2026-10-30T00:00:00.000Z',
      authors: ['DreamHouse Architectural Engineering'],
      section: idea.category,
      tags: [idea.category, 'Architecture', 'House Design', 'Wayanad', 'Kerala'],
      images: [
        {
          url: imagePath,
          width: 1200,
          height: 800,
          alt: `${idea.title} - Architectural Project by DreamHouse`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${idea.title} | DreamHouse Wayanad`,
      description: idea.intro,
      images: [imagePath],
    },
  };
}

export default async function GalleryProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const idea = ideas.find(item => item.slug === slug);

  if (!idea) notFound();

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://dreamhousesby.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Design Gallery',
            item: 'https://dreamhousesby.com/gallery/',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: idea.title,
            item: `https://dreamhousesby.com/gallery/${idea.slug}/`,
          },
        ],
      },
      {
        '@type': 'Article',
        headline: idea.title,
        description: idea.intro,
        image: `https://dreamhousesby.com/images/${idea.image}.webp`,
        datePublished: '2024-01-01T00:00:00.000Z',
        dateModified: '2026-10-30T00:00:00.000Z',
        author: {
          '@type': 'Organization',
          name: 'DreamHouse Architectural Engineering',
          url: 'https://dreamhousesby.com',
        },
        publisher: {
          '@type': 'Organization',
          name: 'DreamHouse Architectural Engineering',
          logo: {
            '@type': 'ImageObject',
            url: 'https://dreamhousesby.com/brand/dreamhouse-logo.png',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://dreamhousesby.com/gallery/${idea.slug}/`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <IdeaPage idea={idea} />
    </>
  );
}

