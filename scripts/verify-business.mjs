import fs from 'node:fs/promises';
import {parseDocument} from 'htmlparser2';
import {getElementsByTagName,textContent} from 'domutils';
const required=['DreamHouse','Sulthan Bathery','9446731418','04936 221770','dreamhousesby@gmail.com'];
for(const page of ['index.html','contact/index.html','about/index.html']){
 const html=await fs.readFile('out/'+page,'utf8');const doc=parseDocument(html);
 const text=getElementsByTagName('body',doc.children,true).map(textContent).join(' ');
 for(const value of required)if(!text.includes(value))throw Error(`${page} missing ${value}`);
 for(const value of ['Shefin','CA/2015/73233','GEC Thrissur','CET Trivandrum','hello@yarchitects.com','Chenakkal','Kottakkal'])if(text.includes(value))throw Error(`${page} retains reference business fact ${value}`);
 const images=getElementsByTagName('img',doc.children,true);
 if(images.filter(node=>node.attribs.alt==='DreamHouse Architectural Engineering').length<2)throw Error(`${page} missing header/footer logo`);
}
const contact=await fs.readFile('out/contact/index.html','utf8');
for(const href of ['tel:+919446731418','tel:+914936221770','mailto:dreamhousesby@gmail.com'])if(!contact.includes(href))throw Error(`Missing actionable contact ${href}`);
console.log('Confirmed business details, supplied-logo placements and contact links verified on home, about and contact.');
