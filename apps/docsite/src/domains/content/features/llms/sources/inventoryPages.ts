import { fetchAllHelpers } from '@local/domains/helpers/repositories/helpersRepository';
import { fetchAllIcons } from '@local/domains/icons/repositories/iconsRepository';
import { bulletList, type DocumentedPage, type Roots } from './page';

const isEnoent = (error: unknown): boolean => error instanceof Error && 'code' in error && error.code === 'ENOENT';

const readNames = (read: () => string[]): string[] => {
  try {
    return read();
  } catch (error) {
    if (isEnoent(error)) {
      return [];
    }

    throw error;
  }
};

const renderInventory = (title: string, items: string[], pathName: string): DocumentedPage => ({
  path: pathName,
  title,
  section: pathName.slice(1) as DocumentedPage['section'],
  description: title,
  body: `# ${title}\n\n${bulletList(items.map((item) => `- ${item}`))}`,
});

const renderIcons = (roots: Roots): DocumentedPage =>
  renderInventory(
    'Icons',
    readNames(() => fetchAllIcons(roots.repoRoot)).sort((left, right) => left.localeCompare(right, 'en')),
    '/icons',
  );

const renderHelpers = (roots: Roots): DocumentedPage =>
  renderInventory(
    'Helpers',
    readNames(() => fetchAllHelpers(roots.repoRoot).map((helper) => helper.title)).sort((left, right) =>
      left.localeCompare(right, 'en'),
    ),
    '/helpers',
  );

export const collectInventoryPage = (section: 'icons' | 'helpers', roots: Roots): DocumentedPage =>
  section === 'icons' ? renderIcons(roots) : renderHelpers(roots);
