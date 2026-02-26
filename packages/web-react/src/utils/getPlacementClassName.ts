import classNames from 'classnames';
import type { PlacementDictionaryType } from '../types/shared';

/**
 * Returns placement CSS class names for use with shared placement helpers.
 *
 * @param placement - Placement value (e.g. 'top', 'bottom-start')
 * @param options - Optional config
 * @param options.isControlled - When true, adds 'placement-controlled' for Floating UI–positioned elements
 */
export function getPlacementClassName(
  placement: PlacementDictionaryType | undefined,
  options?: { isControlled?: boolean },
): string {
  if (!placement) {
    return '';
  }

  return classNames(`placement-${placement}`, { 'placement-controlled': options?.isControlled });
}
