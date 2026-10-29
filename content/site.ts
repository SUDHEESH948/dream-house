export const services = [
  { slug: 'civil-engineering', title: 'Civil Engineering Consulting', short: 'Give your plans a practical starting point.', description: 'Discuss the space you want to create, the questions you need to resolve and the drawings you already have. Start with a clear brief before moving into the details.', points: ['Project requirements', 'Planning questions', 'Drawing coordination'], image: 'residence-kerala-villa' },
  { slug: 'interior-exterior', title: 'Interior & Exterior Designing', short: 'Consider the inside and the outside together.', description: 'Explore room arrangements, finishes, openings and the appearance of your building as parts of one design. Bring the details you like and the everyday needs they must work around.', points: ['Room layouts', 'Materials and finishes', 'Exterior appearance'], image: 'interior-luxury-living' },
  { slug: 'structural-design', title: 'Structural Designing', short: 'Make space for the engineering decisions.', description: 'Talk through the structural design requirements of your proposal alongside its layout. Share your available plans so the scope and information needed can be discussed.', points: ['Structural requirements', 'Available plan review', 'Design coordination'], image: 'residence-modern-elevation' },
  { slug: 'cad-visualisation', title: 'AutoCAD & 3D Studio', short: 'See the idea beyond the sketch.', description: 'Use drawing and visualisation to discuss proportions, arrangements and design choices. DreamHouse offers AutoCAD and 3D computer studio aided designing as part of its listed services.', points: ['AutoCAD drawings', '3D design views', 'Visual discussion'], image: 'residence-twilight-facade' },
] as const;

export const ideas = [
  {
    slug: 'kerala-heritage-villa',
    title: 'Kerala Heritage & Modern Villa',
    category: 'Exteriors',
    image: 'residence-kerala-villa',
    detail: 'residence-modern-elevation',
    focus: 'Pitched terracotta roofs, car porch and regional elegance',
    intro: 'A celebration of timeless Kerala architecture harmonized with contemporary luxury. Sloped terracotta tile roofs, ornamental gables, and granite pillar verandahs respond effortlessly to Wayanad’s climate.',
    body: 'From the sweeping landscaped driveway and stone steps to the warm teakwood frontage and expansive car porch, this residence represents architectural distinction. Notice how traditional rooflines pair with modern spacious planning.',
    prompts: ['Do you prefer traditional Kerala sloped roofs or flat modern terraces?', 'How large should the covered car porch and arrival drop-off be?', 'Which regional materials—teakwood, granite, or clay tiles—do you want featured?']
  },
  {
    slug: 'modern-contemporary-elevation',
    title: 'Contemporary Elevation & Massing',
    category: 'Exteriors',
    image: 'residence-modern-elevation',
    detail: 'residence-minimalist-villa',
    focus: 'Sculptural forms and facade composition',
    intro: 'A home’s exterior is an architectural statement of geometry, texture and proportion. Clean vertical lines and balanced overhangs create dynamic light and shadow throughout the day.',
    body: 'Notice the balance between solid geometric planes and expansive glass openings. We work with site elevations to ensure the building massing responds to Wayanad terrain and climate while delivering distinctive modern aesthetics.',
    prompts: ['What exterior architectural style appeals most to you?', 'How should the building orient toward natural light and breezes?', 'Which exterior textures—stone, timber, or render—do you prefer?']
  },
  {
    slug: 'warm-timber-living-lounge',
    title: 'Warm Timber Living Lounge',
    category: 'Interiors',
    image: 'interior-luxury-living',
    detail: 'interior-acoustic-lounge',
    focus: 'Warm wood paneling and ambient illumination',
    intro: 'A living room should offer effortless comfort and refined visual warmth. Rich natural wood finishes combined with warm layered lighting create an inviting atmosphere for relaxation and conversation.',
    body: 'Rather than clinical minimalism, warm timber textures bring depth and tactile luxury to everyday living spaces. Bespoke wall units and hidden warm LED profiles create subtle elegance without visual clutter.',
    prompts: ['How do you prefer your family gathering area to feel?', 'Would you like integrated media units with hidden wiring?', 'Which wood species and tones complement your style?']
  },
  {
    slug: 'tropical-courtyard-villa',
    title: 'Tropical Courtyard Residence',
    category: 'Exteriors',
    image: 'residence-courtyard-villa',
    detail: 'residence-tropical-estate',
    focus: 'Integrated courtyards and lush landscape harmony',
    intro: 'Bringing nature into the core of the home transforms daily life. Open and semi-covered courtyards draw natural ventilation and greenery deep inside the floor plan.',
    body: 'In Kerala’s climate, courtyard design provides natural stack ventilation, passive cooling, and private open-to-sky gardens sheltered from street views. Open terraces seamlessly link interior rooms with landscaped grounds.',
    prompts: ['Would you like an internal courtyard or water feature?', 'How much garden view should each bedroom have?', 'Do you prefer open sit-outs on the ground or upper floor?']
  },
  {
    slug: 'refined-dining-and-lighting',
    title: 'Refined Dining & Ceiling Detail',
    category: 'Interiors',
    image: 'interior-dining-cove',
    detail: 'interior-designer-kitchen',
    focus: 'Bespoke dining setups and cove lighting',
    intro: 'Dining spaces are central to family rituals and hospitality. Thoughtful ceiling treatments and focal pendant illumination establish intimate spaces for gathering and meals.',
    body: 'The connection between dining and kitchen needs balanced zoning. Custom cove false ceilings with dimmable ambient lighting allow the space to shift effortlessly from bright daytime breakfasts to intimate evening dinners.',
    prompts: ['How many guests do you typically entertain?', 'Should the dining area be open to or semi-partitioned from the kitchen?', 'What ceiling designs or lighting accents do you envision?']
  },
  {
    slug: 'twilight-horizon-architecture',
    title: 'Twilight Horizon & Night Illumination',
    category: 'Exteriors',
    image: 'residence-twilight-facade',
    detail: 'residence-geometric-compound',
    focus: 'Architectural lighting and night silhouettes',
    intro: 'Architecture takes on a dramatic new presence after sunset. Strategically positioned warm exterior spotlights, soffit lights, and illuminated glazing bring facades alive at night.',
    body: 'Outdoor lighting accentuates architectural reveals, textured stone accents, and boundary perimeters while providing clear security and path visibility. Every facade elevation is planned for daytime impact and evening beauty.',
    prompts: ['What mood should the residence convey at night?', 'Where would you like accent lighting—facade walls, driveway, or garden?', 'Are smart automated lighting controls desired?']
  },
  {
    slug: 'master-bedroom-sanctuary',
    title: 'Master Bedroom Sanctuary',
    category: 'Interiors',
    image: 'interior-master-suite',
    detail: 'interior-luxury-living',
    focus: 'Private suites designed for calm and rest',
    intro: 'The master suite should be a restful private haven away from household activity. Acoustic wall paneling, subdued color palettes, and soft glare-free lighting encourage tranquility.',
    body: 'Every detail in the bedroom contributes to restorative sleep and privacy. Integrated wardrobe joinery, cushioned headboards, and bedside reading lights create a cohesive boutique hotel aesthetic in your own home.',
    prompts: ['What storage and dressing room layout do you require?', 'Do you prefer carpet, timber, or vitrified tile flooring?', 'What level of acoustic isolation and room darkening do you need?']
  },
  {
    slug: 'garden-verandah-and-sitouts',
    title: 'Garden Verandahs & Outdoor Sit-Outs',
    category: 'Exteriors',
    image: 'residence-verandah-greens',
    detail: 'residence-terrace-garden',
    focus: 'Sheltered sit-outs and rooftop sky terraces',
    intro: 'Outdoor living spaces celebrate the temperate Wayanad environment. Deep roof overhangs provide shade and monsoon shelter, creating comfortable spaces to enjoy morning tea and garden breezes.',
    body: 'Verandahs and rooftop terraces act as transitional zones between home and nature. Weather-resistant finishes, pergola seating, and planter boxes expand usable square footage while framing views of the hills and gardens.',
    prompts: ['How would you use an outdoor terrace or verandah?', 'Do you prefer covered pergolas or open rooftop lounges?', 'Would you like outdoor dining or barbecue provisions?']
  },
  {
    slug: 'panoramic-glass-pavilion',
    title: 'Panoramic Glass & Hillside Contours',
    category: 'Exteriors',
    image: 'residence-glass-pavilion',
    detail: 'residence-panoramic-view',
    focus: 'Expansive glazing and natural site topography',
    intro: 'Maximizing natural light and framing panoramic views elevates modern living. Floor-to-ceiling glass fenestrations blur the threshold between interior luxury and the surrounding environment.',
    body: 'Designing homes on sloping contours requires structural expertise to optimize views without compromising stability. Large sliding glass panels allow cool hill breezes to circulate naturally throughout living zones.',
    prompts: ['What are the key views on your building site?', 'Do you prefer floor-to-ceiling glass walls or framed picture windows?', 'How do you want to address sun orientation and privacy?']
  },
] as const;

export type Idea = (typeof ideas)[number];
