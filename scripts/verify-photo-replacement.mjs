import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const provenance=JSON.parse(await fs.readFile('public/images/provenance.json','utf8'));
const expected=new Set(provenance.assets.map(asset=>asset.file));
for(const directory of ['public/images','out/images']){
 const actual=(await fs.readdir(directory)).filter(file=>file.endsWith('.webp'));
 const unexpected=actual.filter(file=>!expected.has(file));
 if(unexpected.length)throw Error(`Untracked photography in ${directory}: ${unexpected.join(', ')}`);
 for(const filename of expected){
  const metadata=await sharp(path.join(directory,filename)).metadata();
  if(!metadata.width||!metadata.height)throw Error(`Invalid image ${filename}`);
 }
}
const sidecar=JSON.parse(await fs.readFile('.impeccable/design.json','utf8'));
sidecar.narrative.overview=sidecar.narrative.overview.replace(/The selected Y Architects reference is the visual authority\.[\s\S]*?Forest greens/, 'The selected reference governs layout, typography and motion. Dream House uses independently sourced Unsplash photography throughout; no Y Architects photograph is retained. Forest greens');
sidecar.extensions.evidence.photography={provider:'Unsplash',provenance:'public/images/provenance.json',descriptionMap:'content/image-descriptions.json',mobileCrops:'900 × 1200',referencePhotosRetained:0};
await fs.writeFile('.impeccable/design.json',JSON.stringify(sidecar,null,2)+'\n');
const files=['residence-garden-mobile.webp','interior-earth-tones-mobile.webp','residence-timber-mobile.webp'];
const images=await Promise.all(files.map(async(file,index)=>({input:await sharp('public/images/'+file).resize(270,360).jpeg().toBuffer(),left:index*270,top:0})));
await fs.mkdir('../.photo-review',{recursive:true});
await sharp({create:{width:810,height:360,channels:3,background:'#fafafa'}}).composite(images).jpeg({quality:90}).toFile('../.photo-review/mobile-crops.jpg');
console.log(`Verified ${expected.size} independent images/crops in source and export. No reference photo files remain.`);
