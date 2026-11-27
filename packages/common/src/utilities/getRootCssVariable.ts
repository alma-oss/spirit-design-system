import { isSSR } from './ssr';

/**
 * Reads a CSS custom property from the `:root` element.
 * Returns `undefined` outside the browser or when the property is not defined.
 *
 * @param name - Full custom property name including the leading dashes, e.g. `--spirit-breakpoint-desktop`
 */
export function getRootCssVariable(name: string): string | undefined {
  if (isSSR() || !document.documentElement) {
    return undefined;
  }

  const value = window.getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  return value || undefined;
}
