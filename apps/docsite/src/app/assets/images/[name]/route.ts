import { readFile } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';

// apps/demo serves these images from its Vite `publicDir` (repo-root `static/`) and Storybook maps the same
// folder via `staticDirs`. Docsite has no equivalent static dir, so placeholder images referenced by
// `preview.html` files and demos (e.g. `/assets/images/avatar.svg`) would otherwise 404 here.
const IMAGES_DIR = join(process.cwd(), '../../static/assets/images');
const IMAGE_NAME_PATTERN = /^[a-z0-9-]+\.svg$/;

export const GET = async (_request: Request, { params }: { params: Promise<{ name: string }> }) => {
  const { name } = await params;

  if (!IMAGE_NAME_PATTERN.test(name)) {
    return new NextResponse('Image not found', { status: 404 });
  }

  try {
    const image = await readFile(join(IMAGES_DIR, name), 'utf-8');

    return new NextResponse(image, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch {
    return new NextResponse('Image not found', { status: 404 });
  }
};
