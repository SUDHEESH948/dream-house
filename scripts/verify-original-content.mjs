import fs from 'node:fs/promises';
import {parseDocument} from 'htmlparser2';
import {getElementsByTagName,textContent} from 'domutils';
const banned=/\bY\s*Architects?\b|Sculpting\s+Light|Quiet\s+Luxury|Living\s+Art|Laterite\s+House|Monsoon\s+Retreat|Oasis\s+Workspace|Vastu\s+Courtyard|Brass\s+Pavilion|Urban\s+Canopy|Shefin|CA\/2015\/73233|GEC\s+Thrissur|CET\s+Trivandrum/i;
const files=(await fs.readdir('out',{recursive:true})).filter(f=>f.endsWith('.html'));
for(const file of files){
 const doc=parseDocument(await fs.readFile('out/'+file,'utf8'));
 const body=getElementsByTagName('body',doc.children,true)[0];
 // Exclude Next hydration payloads: inspect the visitor-facing text.
 for(const node of getElementsByTagName('script',body.children,true))node.children=[];
 const text=textContent(body);
 if(banned.test(text))throw Error(`${file} retains reference content: ${text.match(banned)[0]}`);
 if(file.startsWith('gallery/')&&!text.includes('not completed DreamHouse')&&!text.includes('Not a completed DreamHouse'))throw Error(`${file} missing photography disclosure`);
}
for(const file of ['content/reference.json','src/components/ReferenceMarkup.tsx']){
 try{await fs.access(file);}catch{continue;}
 throw Error(`Legacy content pipeline remains: ${file}`);
}
console.log(`Original-content checks passed across ${files.length} exported pages. Legacy copy pipeline removed.`);
