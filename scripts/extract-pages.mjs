import fs from 'node:fs/promises';
import { parseDocument } from 'htmlparser2';
import { getElementsByTagName, getOuterHTML, getInnerHTML } from 'domutils';
const data=JSON.parse(await fs.readFile('content/reference.json','utf8'));
const routes=Object.keys(data).filter(x=>!['home','footer'].includes(x));
for(const route of routes){
 const html=await fs.readFile('../.reference/'+route.replaceAll('/','-')+'.html','utf8');
 const doc=parseDocument(html);
 const mains=getElementsByTagName('main',doc.children,true);
 const main=mains.at(-1);
 if(main) data[route]=[getOuterHTML(main).replace(/^<main\b/,'<div').replace(/<\/main>$/,'</div>')];
}
await fs.writeFile('content/reference.json',JSON.stringify(data,null,2));
const links=new Set(Object.values(data).flat().flatMap(s=>[...s.matchAll(/href="(\/[^"#?]*)/g)].map(m=>m[1])));
console.log('Routes:',routes.join(', '));console.log('Links:',[...links].join(', '));
