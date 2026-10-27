# DreamHouse

## Product

A responsive public website for DreamHouse Architectural Engineering, Sulthan Bathery, Wayanad, Kerala. The application lives directly in the workspace root.

## Confirmed business details

- Mobile: 9446731418
- Office: 04936 221770
- Email: dreamhousesby@gmail.com
- Services: civil engineering consulting; interior and exterior designing; structural designing; AutoCAD and 3D computer studio aided designing.
- Brand: supplied amber roof/DH mark and blue DreamHouse lettering.
- Exact street address, team biographies, registrations and completed-project evidence have not been provided.

## Stack and content

Next.js App Router, React, TypeScript, Tailwind CSS, GSAP/ScrollTrigger, Lenis and local WebP photographs/fonts. Static export is generated in out/. Original services and six design-inspiration articles live in content/site.ts. Gallery images are independent stock inspiration, with provenance in public/images/provenance.json.

The form validates input and creates a copyable email draft. Phone/email links are actionable. The map shows the locality, with directions confirmed by calling the studio.

## Current experience

- Scroll-driven photographic hero with headline entrance, parallax, frame settling and a desktop interior image reveal.
- Introduction with offset two-line heading, image crop reveal and independent image/text drift.
- Manually operated folding lookbook with click, swipe, keyboard, previous/next/replay.
- Concept video: initial landscape frame, scroll expansion to viewport, scroll-scrubbed construction sequence, then shrink to the original frame before the next section. Portrait fullscreen crops the sides.
- Filterable gallery, individual design-idea articles, about, services and contact pages.
- Footer with bottom-to-top wordmark reveal and aligned developer credit linked to winshineinfotech.com.
- Upright typography throughout; no visible slideshow pause or video skip controls.
- Mobile header and footer logos are 120px wide.
- Reduced motion removes scroll animation and exposes native video controls.

## Asset and performance decisions

The original video is retained in assets/source/ and is not publicly shipped. The optimized video uses 240 keyframes across 240 frames, 720p, 24 fps, and fast-start metadata. Its embedded sparkle is blended out in the asset-generation script. Full preloading begins when approaching the section.

Only one responsive hero crop is requested per device. Ten unused fonts, three unused photos, legacy reference material, old CSS and the retired horizontal-gallery controller were removed. ScrollTrigger refreshes are coalesced and respond to actual layout size changes. Build caches and exports are regenerable.

## Verification limits

Production build, TypeScript, local navigation/media/font references and business/original-content checks are verified. Browser performance and responsive interaction remain unmeasured because no browser is connected. Do not describe source inspection as visual approval.
