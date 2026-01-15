'use client';

import { type MouseEventHandler, useMemo } from 'react';
import { useRouter } from '../context/RouterContext';
import { type HandleLinkClickOptions, handleLinkClick } from '../utils/router';

export type UseLinkClickOptions = Omit<HandleLinkClickOptions, 'router'>;

export const useLinkClick = (options: UseLinkClickOptions): MouseEventHandler | undefined => {
  const router = useRouter();
  const { routerOptions, href, target, download, onClick, isDisabled } = options;

  return useMemo(
    () => handleLinkClick({ router, routerOptions, href, target, download, onClick, isDisabled }),
    [router, routerOptions, href, target, download, onClick, isDisabled],
  );
};
