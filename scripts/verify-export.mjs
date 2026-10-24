import fs from 'node:fs/promises';
import path from 'node:path';
import { parseDocument } from 'htmlparser2';
import { getElementsByTagName } from 'domutils';
const files=(await fs.readdir('out',{recursive:true})).filter(f=>f.endsWith('.html')&&!f.startsWith('_next'));
const errors=[];let checked=0;
for(const file of files){
 const doc=parseDocument(await fs.readFile(path.join('out',file),'utf8'));
 for(const tag of ['a','img'])for(const node of getElementsByTagName(tag,doc.children,true)){
  const url=node.attribs[tag==='a'?'href':'src'];
  if(!url?.startsWith('/')||url.startsWith('//'))continue;
  const pathname=decodeURIComponent(url.split(/[?#]/)[0]);
  let target=path.join('out',pathname);if(!path.extname(target))target=path.join(target,'index.html');
  try{await fs.access(target);checked++;}catch{errors.push(`${file}: missing ${url}`);}
 }
}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
else console.log(`Verified ${files.length} HTML pages and ${checked} local image/navigation references.`);
