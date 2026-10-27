---
name: Dream House
description: Original DreamHouse architecture, engineering and design website.
colors:
  ink: "#10233f"
  forest: "#10233f"
  sage: "#1558b0"
  sage-muted: "#2965ac"
  paper: "#faf9f6"
  cream: "#f4f0e8"
  gold: "#df8d13"
  white: "#ffffff"
  secondary-ink: "#4c6078"
  button-hover: "#10478f"
typography:
  display:
    fontFamily: "Playfair Display, serif"
    fontSize: "clamp(48px,8vw,120px)"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Cormorant Garamond, serif"
    fontSize: "clamp(36px,4vw,70px)"
    fontWeight: 300
    lineHeight: 1.4
  wordmark:
    fontFamily: "Cormorant Garamond, serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "14px"
    fontWeight: 300
    lineHeight: 1.8
  label:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "10px"
    letterSpacing: "0.12em"
rounded:
  draft: "12px"
  footer: "16px"
  image-reveal: "20px"
  pill: "100px"
  circle: "50%"
spacing:
  control-gap: "8px"
  field-label-gap: "12px"
  mobile-gutter: "24px"
  form-gap: "30px"
  tablet-gutter: "64px"
  desktop-navigation-gutter: "160px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "18px 25px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.button-hover}"
  menu-toggle:
    backgroundColor: "#1a2f22"
    textColor: "{colors.sage}"
    rounded: "{rounded.circle}"
    width: "48px"
    height: "48px"
    padding: "0 12px"
  field:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "14px 0"
    typography: "{typography.body}"
  inquiry-draft:
    backgroundColor: "{colors.cream}"
    rounded: "{rounded.draft}"
    padding: "25px"
---

# Design System: Dream House

## Gallery coverflow carousel

The user supplied AliThemes' Framer DragableCarousel module as the gallery-top reference: https://framer.com/m/DragableCarousel-ADAPEh.js@fXOJxTG2NAtXIGjIOPmn . GalleryCarousel.tsx ports its distance-based 3D transforms, drag velocity projection and GSAP snap behavior to the local Next.js stack, without a Framer runtime dependency. Six existing inspiration images loop through a centered slide, with side rotation, depth, scaling and opacity. Navigation supports pointer drag, touch with vertical scrolling preserved, arrows, pagination, Home/End and left/right keys. Drag cancellation and lost capture settle the carousel; dragging suppresses accidental link clicks. Only the current slide link participates in keyboard navigation. There is no autoplay. Reduced motion removes depth/rotation and makes navigation instantaneous. Gallery headings use a compact two-column introduction on desktop and stack on mobile so the carousel appears near the top, above the existing filterable grid. At 320px controls fit within the 24px page gutters. Build, static export and slide/control counts were checked; live gestures and visual layout remain unverified without a connected browser.

## Upright typography preference

The user requested removing italic styling throughout the website. Emphasized phrases now use upright type through the global em/i rule, preserving the existing type families, sizes and brand accent colors. This supersedes earlier instructions to use italic hero phrases or editorial headings.

## Scroll-driven hero revision

## Expanding design film

Exit follow-up: after playback finishes, the timeline holds the final frame, then restores the original landscape frame dimensions, corner radius, heading and captions before the sticky section releases. Scroll height is now 520svh desktop / 460svh mobile to accommodate that return stage. Video time remains on the completed home throughout the shrink; reversing scroll expands it again before reversing playback.

The user requested the concept video to zoom to full screen while scrolling and then play through scrolling. DesignFilm now uses a 440svh desktop / 380svh mobile section with a full-viewport sticky scene. The first 26% of its timeline expands a centered 16:9 video frame to the viewport edges; heading and captions fade during this expansion. Video frame progression runs from 22% through 96%, followed by a short final-frame hold. The shared GSAP timeline reverses all stages when scrolling upward and uses 0.3-second scrub. Absolute frame dimensions are bounded to this contained media region and recomputed on viewport refresh; video uses object-fit cover so its proportions stay correct as the frame changes aspect ratio. Portrait fullscreen intentionally crops the sides. Existing all-keyframe encoding and coalesced seeks remain. Reduced motion restores an ordinary 16:9 player with native controls. Build and export checks passed; live browser verification is unavailable. This supersedes earlier film guidance that kept the entire frame visible throughout.

The user requested a premium animated hero with parallax. Hero.tsx and hero.css replace the previous rotating slideshow with a sticky photographic scene: 180svh desktop / 155svh mobile. Independent photo drift, scale settling, headline drift and an inset frame follow a reversible GSAP timeline with 0.65-second scrub. Desktop additionally reveals a smaller interior photograph. Existing garden and interior assets, Playfair type, navy photographic shading, warm white and pale amber #f2bd69 remain; supporting white is #f0eee7. The heading is â€œBegin with your idea.â€ Contact and introduction links stay visible and keyboard accessible through the sequence. Navigation ink switching follows the actual hero boundary. Mobile omits the inset image; reduced motion presents one static scene without extended scroll distance. No autoplay or pause control is introduced. This supersedes earlier hero slideshow guidance. Production build and static checks passed; no browser was connected for rendered layout or motion verification.

## Homepage introduction revision

Parallax follow-up: the headline now breaks into two offset lines, above a larger 6:5 architectural photo and open introductory copy. Motion.tsx scopes a reversible inset-to-full photo reveal to data-intro-scene, with independent inner-image drift/scale, heading travel and a slower copy drift. Existing generic reveals are removed from these elements to prevent competing transforms. Desktop travel is 36px, mobile 14px, and GSAP matchMedia removes the entire sequence under reduced motion. Text stays visible without animation and the about link remains accessible. Wider spacing and 16px desktop copy support the larger photograph; mobile remains a 4:3 photo and 15px copy. This supersedes the earlier single-line desktop headline and static introduction guidance below. Build and export/content checks passed; live browser motion verification remains unavailable.

Desktop follow-up: the heading now spans the section above an asymmetric two-column layout, with a wider landscape photograph on the left and vertically centered introductory copy on the right. Tablet uses equal columns. Below 768px the heading, photograph and copy remain stacked. This supersedes the earlier desktop arrangement described below.

The user requested redesigning the â€œA better home starts on paperâ€ section after reviewing its narrow mobile layout. `home-introduction.css` now owns this section: a left-aligned heading and copy sit beside a tall photograph on desktop; below 768px the order is heading, 4:3 photograph, then full-width copy. Remove the previous overlapping inset panel from this surface. Mobile gutters stay at 24px, paragraphs use 15px type at 1.85 line height, and the about link has a minimum 56px target with a circular arrow. Existing factual copy, typography families, navy, blue and warm-white palette remain. Local supporting ink #344d6b matches the other studio sections. Build and export checks passed; rendered mobile verification remains unavailable.

## Overview

The selected Y Architects reference is the authority for layout, typography and motion. Dream House uses independently sourced Unsplash architecture and interior photographs, as requested by the user, while retaining the measured composition and editorial rhythm. No Y Architects photograph is retained. Deep navy, warm white, royal blue and amber frame warm materials; expressive serif typography sits beside restrained sans-serif labels.

This document records the implemented source, not screenshot approval. Evidence is `src/app/globals.css`, `src/components/*.tsx`, `src/app/fonts.css` and the preserved Tailwind markup in `content/reference.json`. Browser visual verification was unavailable because the computer-use browser rejected the URL safety check. No generated composition was used, and no independent creative metaphor has been approved.

**Key Characteristics:**
- Large photographic surfaces and generous negative space.
- Navy ink, warm white and logo-derived royal blue and amber accents.
- Playfair hero, Cormorant display text and Montserrat supporting text.
- Slow cinematic transitions with a usable reduced-motion presentation.

## Colors

### Primary

Navy ink is the main text, footer and menu-overlay color. Legacy `forest` and `sage` token names now resolve to navy and blue for compatibility with existing markup. Use the named source tokens in the frontmatter; preserve existing alpha variations in the reference markup.

### Secondary

Sage marks focus, selection, fine accents and menu strokes. Muted sage is the Tailwind theme counterpart. These pairs coexist in the source and should not be consolidated during incidental work.

### Tertiary

Gold emphasizes the italic second phrase of the hero. Retain its established role without spreading it across unrelated controls.

### Neutral

Paper is the page canvas. Cream supports the inquiry draft and existing neutral surfaces. White supplies image-overlay type. Secondary ink handles field placeholders and supporting copy.

**The Logo Palette Rule.** Use royal blue and amber from the supplied logo, with navy text and warm white surfaces.

## Typography

Playfair Display supplies the hero's upright first phrase and italic second phrase. Cormorant Garamond supplies editorial headings, large navigation links, the wordmark and footer display. Montserrat supplies body copy, controls, captions and uppercase labels. Fonts are locally declared in `src/app/fonts.css`.

The frontmatter's headline role records the overlay navigation scale; existing editorial headings retain their measured Tailwind sizes. Body records the form-text treatment rather than asserting a universal paragraph size. The source uses multiple small-label sizes, including finely tracked footer labels. Preserve these contextual differences.

**The Three Voices Rule.** Use Playfair for the cinematic hero, Cormorant for editorial display and Montserrat for supporting information.

## Layout

Preserve the reference markup's per-section geometry, widths, crops and spacing. Existing content uses centered maximum-width containers, mixed editorial grids and full-bleed photography rather than one universal card grid. Footer content uses a maximum width of 80rem and moves from one column to two and then four.

The fixed header uses horizontal gutters of 160px on large screens, 64px from 768px through 1200px, and 24px below 768px. Hero copy follows these gutters. The hero occupies 100dvh with desktop and mobile minimum heights of 500px and 480px respectively. Its heading uses a fluid scale, with phrase gaps and top offset reduced on mobile. Dedicated 900 by 1200 portrait crops replace desktop hero images below 768px.

Inner-page first sections start beneath the header. Two-column form rows become a single column below 768px. Reference Tailwind responsive utilities use the framework's existing breakpoints; custom header and hero rules additionally use 767px and 1200px boundaries.

The selected-works gallery occupies 400vh with a sticky viewport and horizontally translated track. Reduced motion replaces this with a normal vertical stack, full-width items and no forced horizontal travel.

## Elevation & Depth

Depth comes from photography, foreground typography, translucent overlays, tonal contrast and scroll motion. Do not introduce a general shadow-based card system. The fixed navigation and full-screen menu sit above page content through explicit stacking; the dark hero pause control provides local contrast over imagery.

## Shapes

Image clipping and generous image corners are part of the reference. Scroll reveals animate an inset rounded crop toward the final image shape. Preserve existing per-image geometry rather than applying one radius everywhere. The footer rounds its upper edge. Form fields remain transparent and square with a thin bottom border; primary actions are pills and the menu trigger is circular.

## Components

### Navigation

The fixed wordmark and circular two-line trigger remain visually light. Wordmark color switches from white over the hero to forest ink after the hero threshold or on inner pages. Opening navigation presents a forest full-screen overlay, with an image on the desktop left and numbered Cormorant links on the right. Mobile hides the image. Current and hovered links become a pale botanical green; hovered arrows move into view. Keep focus containment, Escape dismissal and focus return.

### Buttons and filters

Primary inquiry actions use forest fill, white uppercase Montserrat, a pill silhouette and a thin inline arrow. Hover shifts to the established lighter green. Project filters use text and a selected sage underline rather than filled chips. The global keyboard focus ring uses sage with an offset.

### Fields and draft

Fields pair tracked uppercase labels with light-weight Montserrat values, a transparent background and a fine forest bottom border. Supporting copy uses secondary ink. A prepared inquiry appears in a cream rounded container; preserve the local draft and copy behavior with visible status feedback.

### Hero

Three independently sourced photographs rotate at six-second intervals with two-second opacity crossfades. Each has a separate mobile crop. Active heading entrance uses GSAP opacity, blur, scale and vertical movement over 1.6 seconds after a 0.3-second delay. Pause/resume is an explicit control. Hidden documents and reduced-motion preference suspend automatic cycling.

### Photography and scroll

Use the independently sourced Unsplash imagery recorded in `public/images/provenance.json`, with descriptive alternatives from `public/images/provenance.json`. Do not restore Y Architects photographs. Preserve the measured object-cover crop and wrappers. The studio portrait area now contains a collaborative studio image. General reveals run once near viewport entry; image reveals scrub their clipping, and parallax moves imagery gently through its wrapper. The homepage gallery is now a manual folding lookbook, described below. Lenis and ScrollTrigger continue to coordinate the remaining scroll effects. Reduced motion disables spatial page-turn animation and preserves the lookbook controls.

## Do's and Don'ts

- **Do** preserve the selected reference's section geometry, photo crops and typography roles.
- **Do** use dedicated mobile hero images and responsive composition.
- **Do** retain visible focus, slideshow pause and reduced-motion behavior.
- **Do** treat source inspection as evidence and record browser verification separately.
- **Don't** replace the binding reference with a generated composition or a new visual identity.
- **Don't** flatten the two established forest and sage token pairs into one color each.
- **Don't** introduce generic elevated cards into the existing photographic layouts.
- **Don't** describe this source extraction as visually verified in a browser.


## Confirmed DreamHouse identity

The user supplied the DreamHouse Architectural Engineering logo and business details. Header and footer use `public/brand/dreamhouse-logo.png`, prepared from the second supplied image with background extraction. Use royal blue `#1558b0`, amber `#df8d13`, navy `#10233f`, warm white `#faf9f6`, and warm neutral `#f4f0e8`. The logo uses its transparent image directly, without a white plate in the header or footer; navigation lines and hero emphasis use amber, and small accent text on light surfaces uses blue.

Business location: Sulthan Bathery, Wayanad, Kerala. Mobile: 9446731418. Office: 04936 221770. Email: dreamhousesby@gmail.com. Services: civil engineering consulting, interior and exterior designing, structural designing, AutoCAD and 3D computer studio aided designing. Preserve these supplied facts. Reference staff names, professional registration numbers and unverified experience figures are removed. Stock portfolio imagery is disclosed as inspiration.

## Homepage folding lookbook

The user selected https://redlineinteriors.in/ as the interaction reference. Its public markup and client code were inspected: a closed photo book opens into two facing pages, with a left-edge hinge, two-sided leaves, 2500px perspective, and 700ms turns. Implemented in `src/components/PortfolioBook.tsx` and `src/app/lookbook.css`, in place of the homepage horizontal gallery. The existing hero and later sections are preserved.

Twelve independently sourced photos form six leaves: a front cover, five interior spreads, and a back cover. Desktop pages are 310 Ã— 460px, tablets use 240 Ã— 350px, and narrow screens use at most 170px width per page at a 1.45 height ratio. Pages rotate from 0 to -180 degrees, with hidden backfaces and a visible physical spine shade. The wrapper recenters a closed cover, an open spread, or the closed back cover. Turns last 700ms, wrapper movement 600ms; replay uses 400ms reverse turns staggered by 45ms while recentering over 800ms.

Use native controls for open, previous, next and replay. The primary control keeps its DOM identity and keyboard focus across states. Left/right arrows and Home work on the focused book; horizontal swipes over 40px turn pages while vertical panning and pinch zoom remain available. A turn lock prevents overlapping animations. Reduced motion commits the same states instantly. There is no autoplay. Avoid filters, opacity grouping or overflow clipping on the preserve-3d wrapper: these flatten the scene. Photo faces may clip their own imagery.

Book-only spine gradients and offset shadow convey page material; they are not a new decorative system. Typography, blue-and-amber accents and business details remain DreamHouse's. The portfolio remains labeled as stock design inspiration. Source review and build validation passed; browser-based motion and responsive visual verification remain unavailable.

## Content authority ? latest revision
The user requires completely different content from Y Architects. This supersedes earlier instructions to preserve reference prose or markup. content/reference.json and ReferenceMarkup are deleted. content/site.ts and native StudioSections, InteriorPages and Footer components own original copy. studio.css provides responsive editorial layouts for these native sections. Only confirmed DreamHouse business facts may be stated as facts. Gallery photographs illustrate ideas and must not be presented as completed commissions. Preserve the supplied logo, palette, independent photography, hero interaction and folding album.

