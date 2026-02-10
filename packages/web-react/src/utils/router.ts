'use client';

import { type RouterContextType } from '../context/RouterContext';
import { type ClickEvent } from '../types';

type HandleLinkClickOptions = {
  router: RouterContextType;
  href?: string;
  isDisabled?: boolean;
  target?: string;
  routerOptions?: Record<string, unknown>;
  onClick?: (event: ClickEvent) => void;
};

export const handleLinkClick = ({
  router,
  href,
  isDisabled,
  target,
  routerOptions,
  onClick,
}: HandleLinkClickOptions): ((event: ClickEvent) => void) | undefined => {
  const isExternalHref = typeof href === 'string' && /^https?:\/\//.test(href);
  const shouldUseRouter = Boolean(router && href && !isDisabled && target !== '_blank' && !isExternalHref);

  if (!shouldUseRouter) {
    return onClick;
  }

  return (event: ClickEvent) => {
    if (typeof onClick === 'function') {
      onClick(event);
      if (event.defaultPrevented) {
        return;
      }
    }
    event.preventDefault();
    router?.navigate(String(href), routerOptions);
  };
};
