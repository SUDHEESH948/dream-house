# DreamHouse

Next.js App Router website for DreamHouse Architectural Engineering, Sulthan Bathery, Wayanad, Kerala.

Run with Node 22+: `npm install`, then `npm run dev`. `npm run build` produces a static export in `out/`. GSAP, ScrollTrigger and Lenis coordinate motion; reduced-motion preferences are supported. Images use Next.js Image with local WebP assets and locally hosted fonts.

All visitor-facing copy is original DreamHouse content. `content/site.ts` defines the four confirmed services and six original design-idea articles. Native React components render each page. The legacy reference HTML, copied project stories and their rendering pipeline have been removed.

The user supplied the blue-and-amber logo and business details: mobile 9446731418, office 04936 221770, email dreamhousesby@gmail.com. No team biographies, registrations, years of experience or completed-project claims are invented. Photography is independent Unsplash inspiration, with sources in `public/images/provenance.json`. Gallery articles and the folding homepage album clearly disclose that these are not completed DreamHouse commissions.

The manually operated photo book supports click, swipe, keyboard navigation, previous/next/replay and instant changes with reduced motion. The enquiry form validates and prepares a copyable draft for the visitor to send through their email app. The map shows the locality; call to confirm directions before visiting.

Checks: `node scripts/verify-export.mjs`, `node scripts/verify-business.mjs`, `node scripts/verify-original-content.mjs`. Browser screenshot comparison remains unverified because the available browser tool could not open the site.
