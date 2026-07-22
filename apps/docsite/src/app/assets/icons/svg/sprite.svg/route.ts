import { readFile } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';

// apps/demo serves this same path from its Vite `publicDir` (repo-root `static/`, itself built
// from packages/icons). Docsite has no equivalent static dir, so `preview.html` files' `<use
// href="/assets/icons/svg/sprite.svg#...">` icons would otherwise 404 here — serve the sprite
// straight from packages/web's build output, which is kept in sync with packages/icons.
const SPRITE_PATH = join(process.cwd(), '../../packages/web/public/icons/svg/sprite.svg');

export const GET = async () => {
  const sprite = await readFile(SPRITE_PATH, 'utf-8');

  return new NextResponse(sprite, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
