# DreamHouse

Website for DreamHouse Architectural Engineering, Sulthan Bathery, Wayanad, Kerala.

## Run locally

Use Node.js 22 or newer. Run commands directly in this folder; there is no nested application directory.

```sh
npm install
npm run dev
```

Open http://localhost:3000.

## Build and check

```sh
npm run build
npm run verify
npm run typecheck
```

The build exports the complete website to `out/`. Deploy the contents of `out/` to a static host supporting directory index files. Next.js server mode (`next start`) is not used with this export.

## Project layout

- `src/app/`: pages, routing, shared styles and local font declarations.
- `src/components/`: page sections, navigation, footer, contact form and animation code.
- `content/`: confirmed business details and original service/design-idea content.
- `public/`: website images, logo, icons, eight upright font files and the optimized video.
- `assets/source/`: original user-supplied video, retained for editing and excluded from the static export.
- `scripts/`: build verification and asset preparation.
- `.next/`, `out/`, `node_modules/`: generated caches, export and dependencies; ignored by Git.

## Motion and media

GSAP/ScrollTrigger and Lenis coordinate the hero, image parallax, manual folding lookbook and footer wordmark reveal. The video expands to the viewport, scrubs with scrolling, then returns to its original frame. Reduced motion provides static layouts and native video controls.

The hero uses responsive picture sources so each device requests its appropriate image. Video metadata loads first; full video preloading begins near its section. The scroll video is 720p H.264 at 24 fps with every frame a keyframe, no audio, and fast-start metadata.

Rebuild the video with an installed FFmpeg executable:

```sh
node scripts/prepare-design-film.mjs /path/to/ffmpeg
```

Rebuild browser icons with `node scripts/prepare-icons.mjs`. Asset scripts use the declared development dependency Sharp.

## Content

Contact details: 9446731418, 04936 221770, dreamhousesby@gmail.com. The enquiry form prepares a local email draft; it does not submit to a backend.

Photography is independently sourced inspiration. Sources, licenses and descriptions are recorded in `public/images/provenance.json`; gallery pages disclose that these are not completed DreamHouse commissions. No unverified staff, credentials or experience claims are included.

Production build and static asset/content checks are verified. Live browser animation performance and physical-device responsiveness still require browser verification.
