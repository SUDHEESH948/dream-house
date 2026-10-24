# Dream House

Next.js App Router recreation of the supplied Y Architects reference, with Dream House branding.

## Run

Use Node.js 22 or later.

```sh
npm install
npm run dev
```

`npm run build` generates a deployable static site in `out/`. Images are preoptimized WebP files served through Next.js Image. All fonts are local. No third-party font requests are required at runtime.

## Content and implementation

The reference's measured section markup is preserved in `content/reference.json` and rendered into React by `ReferenceMarkup`, which applies branding, Next.js Image, Next.js links, and functional inquiry handling. The source does not execute any reference JavaScript. Reusable navigation, slideshow, inquiry form, and scroll orchestration live in `src/components`.

The source confirms a 6-second hero interval, 2-second crossfade, separate mobile hero crops, a 400vh horizontal gallery, image masking, and portrait parallax. GSAP/ScrollTrigger and Lenis implement these interactions. Reduced-motion mode uses static hero imagery, disables animated reveals, and presents selected works vertically.

All photographs are independently sourced from Unsplash under the Unsplash License. No Y Architects photo is retained in the shipping assets. Sources and dimensions are recorded in `public/images/provenance.json`; descriptive alternatives are in `content/image-descriptions.json`. The hero includes locally optimized portrait crops. The former studio portrait area now uses a collaborative studio photograph.

Project/team text remains demonstration content from the design reference. Stock photos illustrate the design and do not establish Dream House project authorship. Dream House's actual contact information, team and project details still need to replace reference content before commercial use. The inquiry form validates and prepares a copyable draft locally; a real delivery service is not configured. No inquiry is falsely reported as sent.

Privacy and terms pages in the original reference return 404. Their footer links instead lead to the preview's form privacy and engagement notes.
