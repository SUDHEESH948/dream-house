---
name: Dream House
description: Architecture and interiors in dialogue with nature, faithfully recreating the selected reference.
colors:
  ink: "#0f2517"
  forest: "#1a2f24"
  sage: "#7a9c7e"
  sage-muted: "#8a9a86"
  paper: "#fafafa"
  cream: "#f5f5f0"
  gold: "#d4af37"
  white: "#ffffff"
  secondary-ink: "#526658"
  button-hover: "#42694a"
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

## Overview

The selected Y Architects reference is the authority for layout, typography and motion. Dream House uses independently sourced Unsplash architecture and interior photographs, as requested by the user, while retaining the measured composition and editorial rhythm. No Y Architects photograph is retained. Forest greens and ivory frame warm materials; expressive serif typography sits beside restrained sans-serif labels.

This document records the implemented source, not screenshot approval. Evidence is `src/app/globals.css`, `src/components/*.tsx`, `src-fonts.css` and the preserved Tailwind markup in `content/reference.json`. Browser visual verification was unavailable because the computer-use browser rejected the URL safety check. No generated composition was used, and no independent creative metaphor has been approved.

**Key Characteristics:**
- Large photographic surfaces and generous negative space.
- Forest ink, ivory paper and muted botanical accents.
- Playfair hero, Cormorant display text and Montserrat supporting text.
- Slow cinematic transitions with a usable reduced-motion presentation.

## Colors

### Primary

Forest ink is the main text, footer, menu-overlay and primary-action color. Forest is the complementary Tailwind theme green. Use the named source tokens in the frontmatter; preserve existing alpha variations in the reference markup.

### Secondary

Sage marks focus, selection, fine accents and menu strokes. Muted sage is the Tailwind theme counterpart. These pairs coexist in the source and should not be consolidated during incidental work.

### Tertiary

Gold emphasizes the italic second phrase of the hero. Retain its established role without spreading it across unrelated controls.

### Neutral

Paper is the page canvas. Cream supports the inquiry draft and existing neutral surfaces. White supplies image-overlay type. Secondary ink handles field placeholders and supporting copy.

**The Reference Palette Rule.** Preserve the source's forest, sage and ivory relationships when extending an existing surface.

## Typography

Playfair Display supplies the hero's upright first phrase and italic second phrase. Cormorant Garamond supplies editorial headings, large navigation links, the wordmark and footer display. Montserrat supplies body copy, controls, captions and uppercase labels. Fonts are locally declared in `src-fonts.css`.

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

Use the independently sourced Unsplash imagery recorded in `public/images/provenance.json`, with descriptive alternatives from `content/image-descriptions.json`. Do not restore Y Architects photographs. Preserve the measured object-cover crop and wrappers. The studio portrait area now contains a collaborative studio image. General reveals run once near viewport entry; image reveals scrub their clipping, and parallax moves imagery gently through its wrapper. Lenis smooth scrolling and GSAP ScrollTrigger coordinate the horizontal gallery. Reduced motion disables these animations and preserves readable content.

## Do's and Don'ts

- **Do** preserve the selected reference's section geometry, photo crops and typography roles.
- **Do** use dedicated mobile hero images and responsive composition.
- **Do** retain visible focus, slideshow pause and reduced-motion behavior.
- **Do** treat source inspection as evidence and record browser verification separately.
- **Don't** replace the binding reference with a generated composition or a new visual identity.
- **Don't** flatten the two established forest and sage token pairs into one color each.
- **Don't** introduce generic elevated cards into the existing photographic layouts.
- **Don't** describe this source extraction as visually verified in a browser.
