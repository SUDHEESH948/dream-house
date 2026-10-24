import fs from 'node:fs/promises';
import {parseDocument} from 'htmlparser2';
import {getElementsByTagName,getOuterHTML,textContent} from 'domutils';
const content=JSON.parse(await fs.readFile('content/reference.json','utf8'));
const phones='Mobile: <a href="tel:+919446731418">9446731418</a><br>Office: <a href="tel:+914936221770">04936 221770</a>';
function transform(html){
 const doc=parseDocument(html);
 function walk(node){
  if(node.type==='text'){
   if(node.data.includes('multidisciplinary practice established'))node.data='DreamHouse Architectural Engineering is based in Sulthan Bathery. Our services include civil engineering consulting, interior and exterior designing, structural designing, AutoCAD and 3D computer studio aided designing.';
   if(node.data==='Active Reg.')node.data='Sulthan Bathery';
   node.data=node.data.replaceAll('Interior & Exterior Designing & Exteriors','Interiors & Exteriors').replaceAll('Principal Architect','Design & Engineering');
  }
  for(const child of node.children||[])walk(child);
 }
 walk(doc);
 for(const p of getElementsByTagName('p',doc.children,true)){
  const value=textContent(p).trim();
  if(value==='+91 94467 31418'||value==='04936 221770')p.children=parseDocument(phones).children;
 }
 return getOuterHTML(doc);
}
for(const [key,value] of Object.entries(content))content[key]=Array.isArray(value)?value.map(transform):transform(value);
const gallery=parseDocument(content.gallery[0]);
const heading=getElementsByTagName('h1',gallery.children,true)[0];
if(heading){heading.children=parseDocument('Design <br><span class="inline-block pl-12 md:pl-20 pr-4 pb-3 text-sage italic">Inspiration.</span>').children;}
const paragraphs=getElementsByTagName('p',gallery.children,true);
for(const p of paragraphs){if(textContent(p).startsWith('A chronological survey'))p.children=parseDocument('A curated collection of architectural and interior design inspiration. These independently sourced stock photographs illustrate design directions; they are not presented as completed DreamHouse projects.').children;}
content.gallery=[getOuterHTML(gallery)];
for(const key of Object.keys(content).filter(key=>key.startsWith('gallery/'))){
 const doc=parseDocument(content[key][0]);
 const main=doc.children.find(node=>node.type==='tag');
 if(main){const note=parseDocument('<p class="portfolio-note max-w-[1400px] mx-auto px-6 md:px-[8%] pt-36">Design inspiration · Independent stock photography. This page is an illustrative study, not a verified DreamHouse commission.</p>').children[0];main.children.unshift(note);}
 content[key]=[getOuterHTML(doc)];
}
await fs.writeFile('content/reference.json',JSON.stringify(content,null,2));
const prompt="Background extraction and careful resolution cleanup of the user's second orange-and-blue DreamHouse logo. Preserve roof, chimney, window, DH monogram, DreamHouse lettering and Architectural engineering subtitle; remove white surrounding background to actual transparency; trim empty margins; retain orange and blue; no redesign, extra elements, slogans or shadows.";
await fs.writeFile('public/brand/logo-preparation.json',JSON.stringify({origin:'User-supplied second logo image',process:'Built-in image generation tool, background extraction edit; then project-local trim and resize',prompt,colors:{blue:'#1558b0',amber:'#df8d13',navy:'#10233f',warmWhite:'#faf9f6'}},null,2));
console.log('Confirmed business content, telephone links and portfolio disclosure updated.');
