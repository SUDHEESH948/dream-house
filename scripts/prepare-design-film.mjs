import fs from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

// Usage: node scripts/prepare-design-film.mjs /path/to/ffmpeg
const encoder = process.argv[2] || 'ffmpeg';
const source = 'assets/source/design-transformation-original.mp4';
await fs.access(source);
await fs.mkdir('public/videos', { recursive: true });
const result = spawnSync(encoder, [
  '-hide_banner', '-y', '-i', source, '-an',
  // Blend the embedded Gemini sparkle into its surrounding background.
  '-vf', 'scale=1280:-2,delogo=x=1136:y=574:w=48:h=66', '-r', '24', '-c:v', 'libx264',
  '-preset', 'medium', '-crf', '23', '-g', '1', '-keyint_min', '1',
  '-sc_threshold', '0', '-bf', '0', '-pix_fmt', 'yuv420p',
  '-movflags', '+faststart', 'public/videos/design-transformation-scroll.mp4',
], { stdio: 'inherit' });
if (result.error) throw result.error;
if (result.status !== 0) throw Error(`FFmpeg exited with status ${result.status}`);
