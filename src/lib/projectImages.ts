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

export const FALLBACK_HOME_IMAGES: ProjectImage[] = [
  {
    id: 'home-1',
    src: '/home/WhatsApp%20Image%202026-10-30%20at%205.14.31%20PM.jpeg',
    filename: 'WhatsApp Image 2026-10-30 at 5.14.31 PM.jpeg',
    title: 'Project Work 01',
    alt: 'DreamHouse Architectural Project Work 01 - Sulthan Bathery, Wayanad',
  },
  {
    id: 'home-2',
    src: '/home/WhatsApp%20Image%202026-10-30%20at%205.14.32%20PM.jpeg',
    filename: 'WhatsApp Image 2026-10-30 at 5.14.32 PM.jpeg',
    title: 'Project Work 02',
    alt: 'DreamHouse Architectural Project Work 02 - Sulthan Bathery, Wayanad',
  },
  {
    id: 'home-3',
    src: '/home/WhatsApp%20Image%202026-10-30%20at%205.14.32%20PM%20(1).jpeg',
    filename: 'WhatsApp Image 2026-10-30 at 5.14.32 PM (1).jpeg',
    title: 'Project Work 03',
    alt: 'DreamHouse Architectural Project Work 03 - Sulthan Bathery, Wayanad',
  },
  {
    id: 'home-4',
    src: '/home/WhatsApp%20Image%202026-10-30%20at%205.14.33%20PM.jpeg',
    filename: 'WhatsApp Image 2026-10-30 at 5.14.33 PM.jpeg',
    title: 'Project Work 04',
    alt: 'DreamHouse Architectural Project Work 04 - Sulthan Bathery, Wayanad',
  },
  {
    id: 'home-5',
    src: '/home/WhatsApp%20Image%202026-10-30%20at%205.14.33%20PM%20(1).jpeg',
    filename: 'WhatsApp Image 2026-10-30 at 5.14.33 PM (1).jpeg',
    title: 'Project Work 05',
    alt: 'DreamHouse Architectural Project Work 05 - Sulthan Bathery, Wayanad',
  },
  {
    id: 'home-6',
    src: '/home/WhatsApp%20Image%202026-10-30%20at%205.14.34%20PM.jpeg',
    filename: 'WhatsApp Image 2026-10-30 at 5.14.34 PM.jpeg',
    title: 'Project Work 06',
    alt: 'DreamHouse Architectural Project Work 06 - Sulthan Bathery, Wayanad',
  },
  {
    id: 'home-7',
    src: '/home/WhatsApp%20Image%202026-10-30%20at%205.14.34%20PM%20(1).jpeg',
    filename: 'WhatsApp Image 2026-10-30 at 5.14.34 PM (1).jpeg',
    title: 'Project Work 07',
    alt: 'DreamHouse Architectural Project Work 07 - Sulthan Bathery, Wayanad',
  },
  {
    id: 'home-8',
    src: '/home/WhatsApp%20Image%202026-10-30%20at%205.14.34%20PM%20(2).jpeg',
    filename: 'WhatsApp Image 2026-10-30 at 5.14.34 PM (2).jpeg',
    title: 'Project Work 08',
    alt: 'DreamHouse Architectural Project Work 08 - Sulthan Bathery, Wayanad',
  },
  {
    id: 'home-9',
    src: '/home/WhatsApp%20Image%202026-10-30%20at%205.14.35%20PM.jpeg',
    filename: 'WhatsApp Image 2026-10-30 at 5.14.35 PM.jpeg',
    title: 'Project Work 09',
    alt: 'DreamHouse Architectural Project Work 09 - Sulthan Bathery, Wayanad',
  },
  {
    id: 'home-10',
    src: '/home/WhatsApp%20Image%202026-10-30%20at%205.14.35%20PM%20(1).jpeg',
    filename: 'WhatsApp Image 2026-10-30 at 5.14.35 PM (1).jpeg',
    title: 'Project Work 10',
    alt: 'DreamHouse Architectural Project Work 10 - Sulthan Bathery, Wayanad',
  },
  {
    id: 'home-11',
    src: '/home/WhatsApp%20Image%202026-10-30%20at%205.14.36%20PM.jpeg',
    filename: 'WhatsApp Image 2026-10-30 at 5.14.36 PM.jpeg',
    title: 'Project Work 11',
    alt: 'DreamHouse Architectural Project Work 11 - Sulthan Bathery, Wayanad',
  },
  {
    id: 'home-12',
    src: '/home/WhatsApp%20Image%202026-10-30%20at%205.14.36%20PM%20(1).jpeg',
    filename: 'WhatsApp Image 2026-10-30 at 5.14.36 PM (1).jpeg',
    title: 'Project Work 12',
    alt: 'DreamHouse Architectural Project Work 12 - Sulthan Bathery, Wayanad',
  },
];

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

export function getHomeImages(): ProjectImage[] {
  try {
    const homeDir = path.join(process.cwd(), 'public', 'home');
    if (!fs.existsSync(homeDir)) {
      return FALLBACK_HOME_IMAGES;
    }

    const files = fs.readdirSync(homeDir);
    const validFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return SUPPORTED_EXTENSIONS.has(ext);
    });

    if (validFiles.length === 0) {
      return FALLBACK_HOME_IMAGES;
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
        id: `home-${idx + 1}`,
        src: `/home/${encodeURI(file)}`,
        filename: file,
        title: `Project Work ${num}`,
        alt: `DreamHouse Architectural Project Work ${num} - Sulthan Bathery, Wayanad`,
      };
    });
  } catch (error) {
    console.error('Failed to read home images dynamically:', error);
    return FALLBACK_HOME_IMAGES;
  }
}
