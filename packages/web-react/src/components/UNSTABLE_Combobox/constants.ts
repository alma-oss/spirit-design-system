import { cssVariablePrefix } from '@alma-oss/spirit-design-tokens';
import { Sizes, SizesExtended } from '../../constants';
import type { SizeExtendedDictionaryType, StyleProps } from '../../types';
import type { ComboboxOptionsRole } from './types';

type ComboboxShellSize = (typeof Sizes)[keyof typeof Sizes];

export const DEFAULT_SIZE = Sizes.MEDIUM;

/** Default popup pattern: simple selectable options (`listbox` → `option`). */
export const DEFAULT_OPTIONS_ROLE: ComboboxOptionsRole = 'listbox';

/**
 * Option items inside the popup widget (`listbox` → `option`, `grid` → `row`).
 * Selection tags use `role="row"` too, but they live outside this container.
 */
export const COMBOBOX_OPTION_ITEM_SELECTOR = '[role="option"], [role="row"]';

/**
 * Selected items in the Combobox input (`UNSTABLE_ComboboxTag`, `UNSTABLE_ComboboxSplitTag`).
 * Clicks on these rows must not steal focus or reopen the Combobox popover.
 * Keep this narrow — broad `button`/`a` matches can block Clear and other input addons.
 */
export const COMBOBOX_SELECTION_SELECTOR = '[role="row"]';

/**
 * Nested interactive controls inside an option row (e.g. remove button in a grid cell).
 * Links are omitted — row-level Enter activates `a[href]`; Left/Right only reach secondary controls.
 * Includes `tabindex="-1"` targets so arrow keys can focus them without putting them in the tab order.
 */
export const COMBOBOX_OPTION_CELL_CONTROL_SELECTOR =
  'button:not([disabled]), [role="button"]:not([aria-disabled="true"])';

/** Attribute holding the selection key on an option item (DOM `id` is namespaced). */
export const COMBOBOX_OPTION_VALUE_ATTR = 'data-spirit-value';

/** Optional short label for selection tags when option children are rich content. */
export const COMBOBOX_OPTION_LABEL_ATTR = 'data-spirit-label';

/** CSS custom property controlling the filter input min-width (see web Combobox theme). */
export const COMBOBOX_INPUT_MIN_WIDTH_CSS_VAR = `--${cssVariablePrefix}combobox-input-min-width`;

/** Default props for the inner `DropdownPopover` (overridable via `popoverProps`). */
export const DEFAULT_POPOVER_PROPS: StyleProps = {
  theme: 'theme-light-default',
};

/** Maps combobox shell size to Tag size for nested tags. */
export const COMBOBOX_NESTED_SIZE_MAP: Record<ComboboxShellSize, SizeExtendedDictionaryType> = {
  [Sizes.SMALL]: SizesExtended.XSMALL,
  [Sizes.MEDIUM]: SizesExtended.SMALL,
  [Sizes.LARGE]: SizesExtended.MEDIUM,
};

/** Maps combobox shell size to ControlButton size inside nested tags / clear addon. */
export const COMBOBOX_NESTED_CONTROL_BUTTON_SIZE_MAP: Record<ComboboxShellSize, SizeExtendedDictionaryType> = {
  [Sizes.SMALL]: SizesExtended.XSMALL,
  [Sizes.MEDIUM]: SizesExtended.XSMALL,
  [Sizes.LARGE]: SizesExtended.XSMALL,
};

export const COMBOBOX_CLEAR_CONTROL_BUTTON_SIZE_MAP: Record<ComboboxShellSize, SizeExtendedDictionaryType> = {
  [Sizes.SMALL]: SizesExtended.SMALL,
  [Sizes.MEDIUM]: SizesExtended.MEDIUM,
  [Sizes.LARGE]: SizesExtended.LARGE,
};
