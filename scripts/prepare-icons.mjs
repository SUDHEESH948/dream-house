import fs from 'node:fs/promises';
import sharp from 'sharp';

// Reuse the supplied logo's DH monogram, without the small wordmark.
const mark = await sharp('public/brand/dreamhouse-logo.png')
  .extract({ left: 72, top: 250, width: 270, height: 178 })
  .png().toBuffer();

async function icon(size) {
  const foreground = await sharp(mark)
    .resize({ width: Math.round(size * 0.8) }).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: '#10233f' } })
    .composite([{ input: foreground, gravity: 'centre' }]).png().toBuffer();
}

for (const size of [32, 192, 512]) {
  await fs.writeFile(`public/brand/favicon-${size}.png`, await icon(size));
}
await fs.writeFile('public/brand/apple-touch-icon.png', await icon(180));

// ICO supports PNG payloads; include multiple sizes for browser compatibility.
const images = await Promise.all([16, 32, 48].map(async size => ({ size, data: await icon(size) })));
const header = Buffer.alloc(6 + images.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
let offset = header.length;
images.forEach(({ size, data }, i) => {
  const entry = 6 + i * 16;
  header[entry] = size;
  header[entry + 1] = size;
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(data.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += data.length;
});
await fs.writeFile('public/favicon.ico', Buffer.concat([header, ...images.map(image => image.data)]));
console.log('Prepared DreamHouse favicon and touch icons from the supplied DH monogram.');
