import {
  DEFAULT_CSS_SOURCE_FILE_NAME,
  DEFAULT_CSS_SOURCE_ID,
  STORYBOOK_CSS_MANIFEST_PATH,
  STORYBOOK_CSS_PREFIX,
} from './cssSourceEntries';

const resolvePreviewAssetUrl = (path: string): string => {
  if (typeof document === 'undefined') {
    return path;
  }

  return new URL(path, document.baseURI).toString();
};

export const getDefaultCssSourceHref = (): string =>
  import.meta.env.DEV ? `${STORYBOOK_CSS_PREFIX}/${DEFAULT_CSS_SOURCE_ID}.css` : resolvePreviewAssetUrl(DEFAULT_CSS_SOURCE_FILE_NAME);

export const getCssSourceManifestUrl = (): string =>
  import.meta.env.DEV ? STORYBOOK_CSS_MANIFEST_PATH : resolvePreviewAssetUrl('assets/storybook-css-sources.json');

export const resolveCssSourceHref = (path: string): string =>
  import.meta.env.DEV ? path : resolvePreviewAssetUrl(path);
