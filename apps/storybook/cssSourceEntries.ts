export const STORYBOOK_CSS_PREFIX = '/storybook-css';
export const STORYBOOK_CSS_MANIFEST_PATH = `${STORYBOOK_CSS_PREFIX}/manifest.json`;
export const DEFAULT_CSS_SOURCE_ID = 'default';
export const DEFAULT_CSS_SOURCE_FILE_NAME = 'assets/storybook-spirit-default.css';

export const cssSourceEntries = [
  {
    id: DEFAULT_CSS_SOURCE_ID,
    label: 'Spirit',
  },
  {
    id: 'jobs-cz',
    label: 'jobs.cz',
    scssSubpath: 'jobs.cz/scss',
  },
  {
    id: 'prace-cz',
    label: 'prace.cz',
    scssSubpath: 'prace.cz/scss',
  },
] as const;

export type CssSourceId = (typeof cssSourceEntries)[number]['id'];
