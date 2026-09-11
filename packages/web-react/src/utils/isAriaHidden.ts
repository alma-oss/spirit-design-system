import { type ReactElement } from 'react';

/**
 * Whether an element is hidden from assistive technologies, i.e. its content
 * does not take part in the accessible name.
 *
 * @param element React element
 */
export const isAriaHidden = (element: ReactElement): boolean => {
  const { 'aria-hidden': ariaHidden } = element.props as { 'aria-hidden'?: boolean | string };

  return ariaHidden === true || ariaHidden === 'true';
};
