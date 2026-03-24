import { getDefaultCssSourceHref } from './cssSourceUrls';

const LINK_ID = 'storybook-css-source-link';

if (typeof document !== 'undefined' && !document.getElementById(LINK_ID)) {
  const link = document.createElement('link');
  link.id = LINK_ID;
  link.rel = 'stylesheet';
  link.href = getDefaultCssSourceHref();
  document.head.append(link);
}
