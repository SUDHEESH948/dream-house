import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import {parseDocument} from 'htmlparser2';
import {getElementsByTagName,getOuterHTML,textContent} from 'domutils';

const palette={
 '#0f2517':'#10233f','#1a2f24':'#10233f','#1a2f22':'#10233f',
 '#7a9c7e':'#1558b0','#8a9a86':'#2965ac','#6b8b6f':'#10478f',
 '#f5f5f0':'#f4f0e8','#fafafa':'#faf9f6','#fdfcfb':'#faf9f6',
 '#d4af37':'#df8d13','#b39247':'#a86400','#f0e2c6':'#f9d9a7',
 '#01140e':'#08192f','#526658':'#4c6078','#42694a':'#10478f',
 '#050806':'#08192f','#020403':'#08192f',
};
function recolor(text){
 for(const [old,next] of Object.entries(palette))text=text.replace(new RegExp(old,'gi'),next);
 return text.replace(/rgba\(15,37,23,/g,'rgba(16,35,63,').replace(/rgba\(122,156,126,/g,'rgba(21,88,176,');
}
const files=(await fs.readdir('src',{recursive:true})).filter(file=>/\.(tsx|css)$/.test(file));
for(const file of files){const full=path.join('src',file);await fs.writeFile(full,recolor(await fs.readFile(full,'utf8')));}
const original=JSON.parse(await fs.readFile('content/reference.json','utf8'));
const textReplacements={
 'Y ARCHITECTS':'DREAMHOUSE','Y Architects':'DreamHouse','Dream House':'DreamHouse',
 'hello@yarchitects.com':'dreamhousesby@gmail.com','+91 98765 43210':'+91 94467 31418','+91 99959 87125':'04936 221770',
 'Kerala — Bangalore — Dubai':'Sulthan Bathery — Wayanad — Kerala',
 'Ar. Shefin Yoosaf T':'DreamHouse Design Studio',
 'Principal Architect | Town Planner (A)':'Architectural Engineering',
 'Principal Architect':'Civil Engineering & Design','Principal Director':'Design & Engineering',
 'Meet The Directors':'Meet the Studio','The Leadership':'Our Practice','Leadership':'Our Practice',
 'Town Planner (A), DreamHouse':'Architectural Engineering, Sulthan Bathery',
 'Based in the lush landscapes of Kerala, DreamHouse operates at the intersection of geometry and vibrant ecology. We do not just build structures; we orchestrate environments.':'Based in Sulthan Bathery, DreamHouse Architectural Engineering brings civil engineering consulting and thoughtful design together. We plan spaces around the way you live and work.',
 'From expansive master planning to the most intimate interior details, our holistic approach ensures every material chosen serves a unified, enduring vision.':'From structural designing to interior and exterior designing, our services connect practical planning, AutoCAD drawings and 3D computer studio aided designing.',
 'Principal Architect | Town Planner (A), DreamHouse':'Architectural Engineering · Sulthan Bathery',
 'Leading DreamHouse with a contextual, functional, and climate-responsive design methodology. Bringing over a decade of mastery in sculpting spaces that respect Kerala\'s unique tropical ecology.':'DreamHouse offers civil engineering consulting, structural designing, and interior and exterior designing from Sulthan Bathery. AutoCAD drawings and 3D computer studio aided designing help bring each idea into focus.',
 'DreamHouse Design Studio is an Architect and Town Planner leading DreamHouse, a multidisciplinary practice established in 2015 in Malappuram. With a B.Arch from GEC Thrissur and an M.Plan from CET Trivandrum, his work focuses on contextual, functional, and climate-responsive design.':'DreamHouse Architectural Engineering is based in Sulthan Bathery. Our services include civil engineering consulting, interior and exterior designing, structural designing, AutoCAD and 3D computer studio aided designing.',
 'He is registered with the Council of Architecture, accredited as a Town Planner, and is a member of the Indian Institute of Architects.':'Discuss your requirements with the studio on 9446731418 or email dreamhousesby@gmail.com.',
 'B.Arch':'Civil Engineering','GEC Thrissur':'Consulting','M.Plan':'Design','CET Trivandrum':'Interiors & Exteriors',
 'COA Reg. No.':'Service','CA/2015/73233':'Structural Designing','Town Planner Reg. No.':'Tools','E-2050/08/14714/KKD/3/2019/TPA':'AutoCAD & 3D Studio','IIA Membership No.':'Location','23379':'Sulthan Bathery',
 'Architecture & Planning':'Civil Engineering Consulting','Interior Design':'Interior & Exterior Designing','Landscape & Ecology':'Structural Designing',
 'Master Planning':'Civil Engineering Consulting','Architecture':'Structural Designing','Interiors':'Interior & Exterior Designing','Landscapes':'AutoCAD & 3D Studio',
 'Orchestrating large-scale visions and structural frameworks that define how people live and move through space.':'Civil engineering consulting for considered planning, practical design decisions and clearly coordinated spaces.',
 'Crafting intimate, tactile environments with raw materials, warm brass, and rich textures that elevate daily rituals.':'Interior and exterior designing that brings materials, proportions and everyday use into a coherent whole.',
 'Integrating climate-responsive flora and natural light to ensure structures breathe seamlessly with the tropical environment.':'Structural designing, AutoCAD drawings and 3D computer studio aided designing for a clearly developed project.',
};
function replaceText(value){
 // Replace complete phrases before the shorter names and service labels.
 const keys=Object.keys(textReplacements).sort((a,b)=>b.length-a.length);
 value=value.replaceAll('Y Architects','DreamHouse').replaceAll('Y ARCHITECTS','DREAMHOUSE');
 for(const key of keys)value=value.replaceAll(key,textReplacements[key]);
 return value;
}
function transform(html){
 const doc=parseDocument(recolor(html));
 function walk(node){
  if(node.type==='text')node.data=replaceText(node.data);
  if(node.attribs){
   if(node.attribs.href?.startsWith('mailto:'))node.attribs.href='mailto:dreamhousesby@gmail.com';
   if(node.attribs.href?.includes('google.com/maps'))node.attribs.href='https://www.google.com/maps/search/?api=1&query=Sulthan+Bathery+Wayanad+Kerala';
   if(node.name==='iframe')node.attribs.src='https://www.google.com/maps?q=Sulthan+Bathery,+Wayanad,+Kerala&output=embed';
   if(node.attribs.id==='directors')node.attribs.id='directors';
  }
  for(const child of node.children||[])walk(child);
 }
 walk(doc);
 for(const p of getElementsByTagName('p',doc.children,true)){
  const text=textContent(p);
  if(text.includes('Chenakkal')&&text.includes('Kottakkal'))p.children=parseDocument('DreamHouse Architectural Engineering<br>Sulthan Bathery<br>Wayanad, Kerala').children;
  if(/Kerala\s*Bangalore\s*Dubai/.test(text))p.children=parseDocument('Sulthan Bathery<br>Wayanad, Kerala').children;
  if(text.startsWith('Coordinates:'))p.children=parseDocument('Sulthan Bathery · Wayanad · Kerala').children;
 }
 for(const p of getElementsByTagName('p',doc.children,true)){
  if(textContent(p).trim()==='Years')p.children=parseDocument('Design Studio').children;
  if(/^15\s*\+$/.test(textContent(p).trim()))p.children=parseDocument('DH').children;
 }
 return getOuterHTML(doc);
}
const updated={};for(const [key,value] of Object.entries(original))updated[key]=Array.isArray(value)?value.map(transform):transform(value);
await fs.writeFile('content/reference.json',JSON.stringify(updated,null,2));
await fs.mkdir('public/brand',{recursive:true});
await sharp('C:/Users/rasha/.codex/generated_images/01a16cb0-6cc3-7b40-8752-ff0e26f2654c/exec-dbebbfcc-9822-44c4-adf8-9a71fc7b467a.png')
 .trim().resize({width:1000,withoutEnlargement:true}).png().toFile('public/brand/dreamhouse-logo.png');
await fs.writeFile('content/business.json',JSON.stringify({name:'DreamHouse',descriptor:'Architectural Engineering',location:'Sulthan Bathery, Wayanad, Kerala',mobile:'9446731418',office:'04936 221770',email:'dreamhousesby@gmail.com',services:['Civil Engineering Consulting','Interior & Exterior Designing','Structural Designing','AutoCAD & 3D Computer Studio Aided Designing'],colors:{blue:'#1558b0',amber:'#df8d13',navy:'#10233f',warmWhite:'#faf9f6'},source:'User-supplied business details and orange/blue logo'},null,2));
console.log('Applied the supplied business details, blue/amber palette and prepared logo.');
