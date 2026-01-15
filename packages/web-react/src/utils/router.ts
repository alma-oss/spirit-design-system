import { type MouseEvent, type MouseEventHandler } from 'react';
import { type RouterContextType } from '../context/RouterContext';

const isProtocolRelativeUrl = (href: string): boolean => href.trim().startsWith('//');
const hasNonPathUrlScheme = (href: string): boolean => /^[a-z][a-z0-9+.-]*:/i.test(href.trim());
const isExternalOrNonPathHref = (href: string): boolean => hasNonPathUrlScheme(href) || isProtocolRelativeUrl(href);
const isHashOnlyHref = (href: string): boolean => href.trim().startsWith('#');
const shouldDeferToBrowserForTarget = (target?: string): boolean =>
  typeof target === 'string' && target.toLowerCase() !== '_self';

const shouldDeferToBrowserForLinkClick = (
  event: Pick<MouseEvent, 'metaKey' | 'ctrlKey' | 'shiftKey' | 'altKey' | 'button'>,
): boolean =>
  event.metaKey ||
  event.ctrlKey ||
  event.shiftKey ||
  event.altKey ||
  (typeof event.button === 'number' && event.button !== 0);

export type HandleLinkClickOptions = {
  router: RouterContextType;
  routerOptions?: Record<string, unknown>;
  href?: string;
  target?: string;
  download?: string | boolean;
  onClick?: MouseEventHandler;
  isDisabled?: boolean;
};

/**
 * Creates click handler for link-like components integrated with RouterProvider.
 * Returns original `onClick` when router navigation should not be used
 * (e.g. missing router/href, disabled state, URL with a dedicated scheme such as
 * `https:` or `mailto:`, protocol-relative URL, hash-only URL, non-`_self`
 * target, `download` links, or modified / non-primary clicks).
 * If router navigation is applicable, the returned handler invokes `onClick` and
 * only navigates when the event is not prevented. If another handler already set
 * `event.defaultPrevented` before this handler runs, it exits early without
 * invoking `onClick` or navigating.
 *
 * @param {HandleLinkClickOptions} options Handler options object.
 * @param {RouterContextType} options.router Router context used for navigation.
 * @param {Record<string, unknown>} [options.routerOptions] Extra options for router navigation.
 * @param {string} [options.href] Link target URL.
 * @param {string} [options.target] HTML link target.
 * @param {string | boolean} [options.download] HTML link download attribute.
 * @param {MouseEventHandler} [options.onClick] Original click handler.
 * @param {boolean} [options.isDisabled] Whether the link is disabled.
 */
export const handleLinkClick = (options: HandleLinkClickOptions): MouseEventHandler | undefined => {
  const { router, routerOptions, href, target, download, onClick: onNativeClick, isDisabled } = options;
  const isNonPathHref = typeof href === 'string' && isExternalOrNonPathHref(href);
  const isHashHref = typeof href === 'string' && isHashOnlyHref(href);
  const hasDownloadAttribute = download === true || typeof download === 'string';
  const shouldUseRouter = Boolean(
    router &&
    href &&
    !isDisabled &&
    !hasDownloadAttribute &&
    !shouldDeferToBrowserForTarget(target) &&
    !isNonPathHref &&
    !isHashHref,
  );

  const onRouterClick: MouseEventHandler = (event) => {
    if (event.defaultPrevented) {
      return;
    }

    onNativeClick?.(event);

    if (shouldDeferToBrowserForLinkClick(event) || event.defaultPrevented) {
      return;
    }

    event.preventDefault();
    router?.navigate(String(href), routerOptions);
  };

  return shouldUseRouter ? onRouterClick : onNativeClick;
};
