import fs from 'node:fs/promises';
import path from 'node:path';
import { parseDocument } from 'htmlparser2';
import { getElementsByTagName, getOuterHTML } from 'domutils';
import sharp from 'sharp';
const base='https://yarchitect-seven.vercel.app';
const data=JSON.parse(await fs.readFile('content/reference.json','utf8'));
for(const route of ['gallery/the-brass-pavilion','gallery/urban-canopy']){
 const res=await fetch(base+'/'+route);if(!res.ok)throw Error(`${route}: ${res.status}`);
 const html=await res.text();const doc=parseDocument(html);const main=getElementsByTagName('main',doc.children,true).at(-1);
 data[route]=[getOuterHTML(main).replace(/^<main\b/,'<div').replace(/<\/main>$/,'</div>')];
 for(const m of html.matchAll(/(?:src="|%2F)([^"&?<>]+\.(?:png|jpe?g|webp))/g)){
  let url=m[1];if(url.startsWith('http'))continue;if(!url.startsWith('/'))url='/'+decodeURIComponent(url);
  const file=path.basename(url);if(file.startsWith('logo'))continue;const output='public/images/'+file.replace(/\.(png|jpe?g)$/i,'.webp');
  try{await fs.access(output);continue;}catch{}
  const res=await fetch(base+url);if(!res.ok)throw Error(url);const bytes=Buffer.from(await res.arrayBuffer());
  await sharp(bytes).resize({width:1920,withoutEnlargement:true}).webp({quality:85}).toFile(output);
 }
}
await fs.writeFile('content/reference.json',JSON.stringify(data,null,2));
console.log('All six project detail pages prepared');
