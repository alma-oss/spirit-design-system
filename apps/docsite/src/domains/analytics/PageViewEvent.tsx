'use client';

import { usePageViewEvent } from '@local/domains/analytics/usePageViewEvent';

// Client boundary for the page-view hook. The tag manager itself stays a server component
// so its scripts are in the first HTML.
export const PageViewEvent = () => {
  usePageViewEvent();

  return null;
};
