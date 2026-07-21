import { Sizes, SizesExtended } from '../../constants';
import type { SizeExtendedDictionaryType, StyleProps } from '../../types';

type ComboboxShellSize = (typeof Sizes)[keyof typeof Sizes];

export const DEFAULT_SIZE = Sizes.MEDIUM;

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
