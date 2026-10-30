import fs from 'node:fs';
import path from 'node:path';
import { FALLBACK_PROJECT_IMAGES, type ProjectImage } from '../data/landmarksFallback';

export type { ProjectImage };

const SUPPORTED_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.gif',
  '.avif',
  '.svg',
]);

function parseFilenameOrder(filename: string) {
  const match = filename.match(/at (\d+)\.(\d+)\.(\d+)\s*(AM|PM)(?:\s*\((\d+)\))?/i);
  if (!match) return { time: 0, index: 0, filename };
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const seconds = parseInt(match[3], 10);
  const ampm = match[4].toUpperCase();
  if (ampm === 'PM' && hours < 12) hours += 12;
  if (ampm === 'AM' && hours === 12) hours = 0;
  const time = hours * 3600 + minutes * 60 + seconds;
  const index = match[5] ? parseInt(match[5], 10) : 0;
  return { time, index, filename };
}

export function getProjectLandmarkImages(): ProjectImage[] {
  try {
    const projectDir = path.join(process.cwd(), 'public', 'project');
    if (!fs.existsSync(projectDir)) {
      return FALLBACK_PROJECT_IMAGES;
    }

    const files = fs.readdirSync(projectDir);
    const validFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return SUPPORTED_EXTENSIONS.has(ext);
    });

    if (validFiles.length === 0) {
      return FALLBACK_PROJECT_IMAGES;
    }

    validFiles.sort((a, b) => {
      const parsedA = parseFilenameOrder(a);
      const parsedB = parseFilenameOrder(b);
      if (parsedA.time !== parsedB.time) {
        return parsedA.time - parsedB.time;
      }
      if (parsedA.index !== parsedB.index) {
        return parsedA.index - parsedB.index;
      }
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    });

    return validFiles.map((file, idx) => {
      const num = String(idx + 1).padStart(2, '0');
      return {
        id: `landmark-${idx + 1}`,
        src: `/project/${encodeURI(file)}`,
        filename: file,
        title: `Landmark Execution ${num}`,
        alt: `DreamHouse Architectural Landmark Project ${num} - Sulthan Bathery, Wayanad`,
      };
    });
  } catch (error) {
    console.error('Failed to read project images dynamically:', error);
    return FALLBACK_PROJECT_IMAGES;
  }
}

