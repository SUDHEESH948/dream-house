import fs from 'node:fs/promises';
import path from 'node:path';
import { parseDocument } from 'htmlparser2';
import { getElementsByTagName } from 'domutils';
const files=(await fs.readdir('out',{recursive:true})).filter(f=>f.endsWith('.html')&&!f.startsWith('_next'));
const errors=[];let checked=0;
async function verifyUrl(file, url) {
 if(!url?.startsWith('/')||url.startsWith('//'))return;
 const pathname=decodeURIComponent(url.split(/[?#]/)[0]);
 let target=path.join('out',pathname);if(!path.extname(target))target=path.join(target,'index.html');
 try{await fs.access(target);checked++;}catch{errors.push(`${file}: missing ${url}`);}
}
for(const file of files){
 const doc=parseDocument(await fs.readFile(path.join('out',file),'utf8'));
 const header=getElementsByTagName('header',doc.children,true).find(node=>(node.attribs.class||'').split(/\s+/).includes('site-navigation'));
 if(!header)errors.push(`${file}: missing site navigation header`);
 else if(!getElementsByTagName('button',header.children,true).some(node=>node.attribs['aria-controls']==='site-menu'))errors.push(`${file}: missing navigation menu control`);
 for(const tag of ['a','img','source','video','link','script'])for(const node of getElementsByTagName(tag,doc.children,true)){
  await verifyUrl(file,node.attribs[['a','link'].includes(tag)?'href':'src']);
  for(const candidate of (node.attribs.srcset||'').split(','))await verifyUrl(file,candidate.trim().split(/\s+/)[0]);
 }
}
const cssFiles=(await fs.readdir('out',{recursive:true})).filter(file=>file.endsWith('.css'));
let hasReset=false;
const fonts=new Set();
for(const file of cssFiles){
 const css=await fs.readFile(path.join('out',file),'utf8');
 if(/box-sizing:\s*border-box/.test(css))hasReset=true;
 for(const match of css.matchAll(/url\(["']?([^\s"')]+)["']?\)/g)){
  await verifyUrl(file,match[1]);
  if(match[1].startsWith('/fonts/'))fonts.add(match[1]);
 }
}
if(!hasReset)errors.push('Exported CSS is missing the base box-sizing reset.');
if(fonts.size<8)errors.push(`Exported CSS includes only ${fonts.size} of the 8 required local fonts.`);
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
else console.log(`Verified ${files.length} HTML pages and ${checked} local navigation, media, icon, script and font references.`);
