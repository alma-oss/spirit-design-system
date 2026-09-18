import { readFileSync, readdirSync } from 'fs';
import { join, resolve } from 'path';
import { kebabToTitleCase } from '@alma-oss/spirit-common/utilities/kebabToTitleCase';
import { compilePreview } from '@local/domains/components/utils/compilePreview';

export type HelperItem = {
  name: string;
  title: string;
};

const HELPERS_DIR = resolve(process.cwd(), '../../packages/web/src/scss/helpers');

let helpersCache: HelperItem[] | undefined;

// The helpers directory is static, checked-in content — it doesn't change while the server is
// running, so the (relatively expensive) directory walk is memoized here and reused by both
// fetchAllHelpers and fetchHelper instead of re-reading the filesystem on every call.
const listHelpers = (): HelperItem[] => {
  if (!helpersCache) {
    helpersCache = readdirSync(HELPERS_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .filter((entry) => readdirSync(join(HELPERS_DIR, entry.name)).includes('preview.html'))
      .map((entry) => ({ name: entry.name, title: kebabToTitleCase(entry.name) }));
  }

  return helpersCache;
};

export const fetchAllHelpers = (): HelperItem[] => listHelpers();

export const fetchHelper = (name: string): string | undefined => {
  if (!listHelpers().some((helper) => helper.name === name)) {
    return undefined;
  }

  const source = readFileSync(join(HELPERS_DIR, name, 'preview.html'), 'utf-8');

  return compilePreview(source);
};
