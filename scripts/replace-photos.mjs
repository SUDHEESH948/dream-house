import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const dir=path.resolve('public/images');
if(!dir.endsWith(path.join('dream-house','public','images')))throw Error('Unexpected image directory');
const beforeFiles=(await fs.readdir(dir)).filter(file=>file.endsWith('.webp'));
const beforeHashes=new Set(await Promise.all(beforeFiles.map(async file=>crypto.createHash('sha256').update(await fs.readFile(path.join(dir,file))).digest('hex'))));
const candidates=JSON.parse(await fs.readFile('../.photo-review/candidates.json','utf8'));
const selected={
 'garden-villa':'residence-garden',
 'villa':'residence-pool',
 'pool-house':'residence-brick',
 'living-room':'interior-sunlight',
 'quiet-interior':'interior-dining',
 'timber-interior':'interior-staircase',
 'courtyard':'residence-timber',
 'kitchen':'interior-open-plan',
 'minimal-interior':'interior-earth-tones',
 'workplace':'workspace-glass',
 'studio':'studio-collaboration',
 'urban-tower':'urban-perspective',
 'cultural-building':'sculptural-courtyard',
 'living-detail':'residence-tree-canopy',
};
const assetRecords=[];
for(const [candidate,filename] of Object.entries(selected)){
 const info=candidates.find(item=>item.name===candidate);
 const output=path.join(dir,filename+'.webp');
 await sharp('../.photo-review/'+candidate+'.jpg').rotate().resize({width:1920,withoutEnlargement:true})
  .withMetadata({exif:{IFD0:{ImageDescription:`Independent architecture stock photography. Source: ${info.url}`,Copyright:'Unsplash License https://unsplash.com/license'}}})
  .webp({quality:85,effort:5}).toFile(output);
 const metadata=await sharp(output).metadata();
 assetRecords.push({file:filename+'.webp',source:info.url,provider:'Unsplash',license:'https://unsplash.com/license',width:metadata.width,height:metadata.height});
}
for(const filename of ['residence-garden','interior-earth-tones','residence-timber']){
 const original=assetRecords.find(item=>item.file===filename+'.webp');
 const output=path.join(dir,filename+'-mobile.webp');
 await sharp(path.join(dir,filename+'.webp')).resize(900,1200,{fit:'cover',position:'centre'}).webp({quality:85,effort:5}).toFile(output);
 assetRecords.push({...original,file:filename+'-mobile.webp',width:900,height:1200,derivative:'Portrait crop of independently sourced desktop photograph'});
}
const replacements={
 'img1':'residence-garden', 'img2':'residence-garden', 'img2-mobile':'residence-garden-mobile',
 'img3':'interior-earth-tones', 'img3-mobile':'interior-earth-tones-mobile', 'img8':'residence-timber', 'img8-mobile':'residence-timber-mobile',
 'img4':'urban-perspective', 'img5':'residence-pool', 'img6':'workspace-glass', 'img7':'residence-brick',
 'img9':'sculptural-courtyard', 'img31':'interior-dining', 'hero':'residence-tree-canopy', 'hero2':'residence-garden',
 'hero3':'interior-open-plan', 'hero5':'interior-sunlight', 'hero6':'interior-staircase', 'hero_new':'interior-earth-tones',
 'hero_sketch':'sculptural-courtyard', 'shefin':'studio-collaboration', 'wall':'interior-dining',
};
let content=await fs.readFile('content/reference.json','utf8');
for(const [old,next] of Object.entries(replacements).sort((a,b)=>b[0].length-a[0].length)){
 content=content.replaceAll(old+'.png',next+'.webp').replaceAll(old+'.webp',next+'.webp');
}
await fs.writeFile('content/reference.json',content);
const descriptions={
 'residence-garden.webp':'Contemporary garden residence with warm timber and glass',
 'residence-pool.webp':'Modern white residence beside a blue swimming pool',
 'residence-brick.webp':'Contemporary home with brick, glass and a landscaped garden',
 'interior-sunlight.webp':'Sunlit living room with natural textures and plants',
 'interior-dining.webp':'Minimal dining space opening onto a courtyard',
 'interior-staircase.webp':'Airy open-plan living space and a timber staircase',
 'residence-timber.webp':'Modern facade with dark panels and warm timber detailing',
 'interior-open-plan.webp':'Open-plan interior with warm wood and neutral furnishings',
 'interior-earth-tones.webp':'Warm living room with earth tones and sculptural furniture',
 'workspace-glass.webp':'Modern workspace with glass partitions and daylight',
 'studio-collaboration.webp':'Collaborative design studio with a communal table and garden views',
 'urban-perspective.webp':'Contemporary urban towers seen from below',
 'sculptural-courtyard.webp':'Curved contemporary architecture framing an open sky',
 'residence-tree-canopy.webp':'Timber and glass residence beneath mature trees',
};
await fs.writeFile('content/image-descriptions.json',JSON.stringify(descriptions,null,2));
await fs.writeFile(path.join(dir,'provenance.json'),JSON.stringify({provider:'Unsplash',license:'https://unsplash.com/license',sourcePolicy:'All shipping photographs are independently sourced. No Y Architects photograph is retained.',assets:assetRecords},null,2));
for(const record of assetRecords){
 const digest=crypto.createHash('sha256').update(await fs.readFile(path.join(dir,record.file))).digest('hex');
 if(beforeHashes.has(digest))throw Error('Reference photograph retained: '+record.file);
}
const nextFiles=new Set(assetRecords.map(item=>item.file));
for(const filename of beforeFiles)if(!nextFiles.has(filename))await fs.unlink(path.join(dir,filename));
console.log(`Replaced ${beforeFiles.length} reference photos with ${assetRecords.length} independent photos and crops.`);
