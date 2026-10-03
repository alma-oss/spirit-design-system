import { readFileSync } from 'fs';
import { join } from 'path';
import icons from '@alma-oss/spirit-icons/icons';
import { compilePreview } from '@local/domains/components/utils/compilePreview';
import { getRepoRoot } from '@local/domains/content/paths';

const { error: logError } = console;

const CARD_PREVIEW_FILE = 'doc-preview-card.html';

// Components that exist only in React have no `packages/web` folder, so their preview lives next to the React source.
const componentDirectories = ['packages/web/src/scss/components', 'packages/web-react/src/components'];

// Web HTML references icons through an external sprite which docsite doesn't serve. Inline the same icon paths the
// React components get from `IconsProvider` instead, so the preview doesn't depend on any sprite file.
const ICON_PATTERN = /<svg([^>]*)>\s*<use\s+href="[^"#]*#([\w-]+)"\s*\/?>(?:<\/use>)?\s*<\/svg>/g;

const inlineIcons = (html: string): string =>
  html.replace(ICON_PATTERN, (match, attributes: string, name: string) => {
    const paths = (icons as Record<string, string>)[name];

    return paths ? `<svg${attributes} viewBox="0 0 24 24">${paths}</svg>` : match;
  });

const readCardPreview = (component: string): string | undefined => {
  const source = componentDirectories.reduce<string | undefined>((found, directory) => {
    if (found !== undefined) {
      return found;
    }

    try {
      return readFileSync(join(getRepoRoot(), directory, component, CARD_PREVIEW_FILE), 'utf-8');
    } catch (error) {
      // A component without a preview is expected (ENOENT), anything else is worth knowing about.
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        logError(`[ComponentCard] Failed to read the card preview of "${component}":`, error);
      }

      return undefined;
    }
  }, undefined);

  return source === undefined ? undefined : inlineIcons(compilePreview(source));
};

/**
 * Compiles `doc-preview-card.html` (a single default/primary, medium-sized example) of every component that has one.
 * Components without it are omitted and the card falls back to a placeholder.
 *
 * @param components - Component names.
 * @returns {Record<string, string>} Compiled HTML keyed by component name.
 */
export const fetchCardPreviews = (components: string[]): Record<string, string> =>
  components.reduce<Record<string, string>>((previews, component) => {
    const html = readCardPreview(component);

    return html === undefined ? previews : { ...previews, [component]: html };
  }, {});
