import { Sizes, SizesExtended } from '../../constants';
import type { SizeExtendedDictionaryType, StyleProps } from '../../types';

type PickerShellSize = (typeof Sizes)[keyof typeof Sizes];

export const DEFAULT_SIZE = Sizes.MEDIUM;

/**
 * ARIA role for the popover option list (see decision 013 — Listbox vs Grid for Selectable Options):
 * - `group` — native `Checkbox`/`Radio` inside a `FieldGroup` (default; use for real form controls).
 * - `listbox` — `role="listbox"` with `role="option"` items and `aria-selected` (use for simple selectable items).
 */
export const PickerOptionsRoles = {
  GROUP: 'group',
  LISTBOX: 'listbox',
} as const;

export const DEFAULT_OPTIONS_ROLE = PickerOptionsRoles.GROUP;

/** Default props for the inner `DropdownPopover` (overridable via `popoverProps`). */
export const DEFAULT_POPOVER_PROPS: StyleProps = {
  theme: 'theme-light-default',
};

/** Maps picker shell size to Tag size for nested tags. */
export const PICKER_NESTED_SIZE_MAP: Record<PickerShellSize, SizeExtendedDictionaryType> = {
  [Sizes.SMALL]: SizesExtended.XSMALL,
  [Sizes.MEDIUM]: SizesExtended.SMALL,
  [Sizes.LARGE]: SizesExtended.MEDIUM,
};

/** Maps picker shell size to CloseButton size inside nested tags. */
export const PICKER_NESTED_CLOSE_BUTTON_SIZE_MAP: Record<PickerShellSize, SizeExtendedDictionaryType> = {
  [Sizes.SMALL]: SizesExtended.XSMALL,
  [Sizes.MEDIUM]: SizesExtended.XSMALL,
  [Sizes.LARGE]: SizesExtended.XSMALL,
};
