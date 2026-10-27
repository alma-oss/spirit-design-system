import { readdirSync } from 'fs';
import { join } from 'path';
import { componentNameToSlug } from '../../../utils/componentSlug';

const ILLUSTRATIONS_URL = '/component-illustrations';
const ILLUSTRATION_EXTENSION = '.svg';

// Wireframe illustrations in `public/component-illustrations`, one SVG per component slug.
// The directory is the source of truth: adding an SVG named after the component slug is all it takes.
// It is read on every call, not cached, so a new SVG shows up without restarting the dev server.
export const readIllustrationSlugs = (): Set<string> =>
  new Set(
    readdirSync(join(process.cwd(), 'public', ILLUSTRATIONS_URL))
      .filter((file) => file.endsWith(ILLUSTRATION_EXTENSION))
      .map((file) => file.slice(0, -ILLUSTRATION_EXTENSION.length)),
  );

export const getComponentIllustration = (component: string, illustrationSlugs: Set<string>): string | undefined => {
  const slug = componentNameToSlug(component);

  return illustrationSlugs.has(slug) ? `${ILLUSTRATIONS_URL}/${slug}${ILLUSTRATION_EXTENSION}` : undefined;
};
