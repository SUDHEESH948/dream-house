import fs from 'node:fs/promises';
const file='.impeccable/design.json';
const design=JSON.parse(await fs.readFile(file,'utf8'));
design.extensions.motion=design.extensions.motion.filter(entry=>!['gallery-scrub','book-turn','book-recenter','book-replay'].includes(entry.name));
design.extensions.motion.push(
 {name:'book-turn',value:'700ms power2.inOut; rotationY 0 to -180deg',purpose:'Manual, reversible two-sided page turn.'},
 {name:'book-recenter',value:'600ms; xPercent 0, 50, 100',purpose:'Center the closed front cover, open spread, or closed back cover.'},
 {name:'book-replay',value:'400ms turns staggered 45ms; 800ms recenter',purpose:'Return the finished lookbook to its front cover.'}
);
design.extensions.lookbook={
 reference:'https://redlineinteriors.in/',source:'src/components/PortfolioBook.tsx',styles:'src/app/lookbook.css',
 replacement:'Homepage horizontal gallery only',photography:'Existing independent stock assets; no reference photos copied',
 perspective:'2500px',pages:{desktop:[310,460],tablet:[240,350],mobile:'min(170px, (100vw - 40px)/2) wide; height = width × 1.45'},
 controls:['click left/right','horizontal swipe >40px','previous','next','replay','arrow keys','Home key'],
 accessibility:'Persistent primary button, focus transfer from hidden previous button, busy turn lock, visible focus, live spread status, pinch zoom allowed',
 reducedMotion:'Immediate state updates with the same controls; no automatic turns',
 verification:'Build, TypeScript, export links/images and business checks pass. Focus issue resolved in source review. Visual browser verification remains unavailable.'
};
await fs.writeFile(file,JSON.stringify(design,null,2)+'\n');
console.log('Lookbook motion and accessibility documented.');
