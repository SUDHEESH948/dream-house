import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const dir='public/images';const files=await fs.readdir(dir);
for(const file of files.filter(f=>/\.(png|jpe?g)$/i.test(f)&&!f.startsWith('logo'))){
 const input=path.join(dir,file);const output=input.replace(/\.(png|jpe?g)$/i,'.webp');
 await sharp(input).resize({width:1920,withoutEnlargement:true}).webp({quality:85,effort:5}).toFile(output);
 console.log(file,'→',path.basename(output),(await fs.stat(output)).size);
}
