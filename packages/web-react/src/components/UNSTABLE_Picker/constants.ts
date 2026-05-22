import { Sizes, SizesExtended } from '../../constants';
import type { SizeExtendedDictionaryType, StyleProps } from '../../types';

type PickerShellSize = (typeof Sizes)[keyof typeof Sizes];

export const DEFAULT_SIZE = Sizes.MEDIUM;

/** Default props for the inner `DropdownPopover` (overridable via `popoverProps`). */
export const DEFAULT_POPOVER_PROPS: StyleProps = {
  theme: 'theme-light-default',
};

/** Maps picker shell size to extended sizes for nested Tag and ControlButton. */
export const PICKER_NESTED_SIZE_MAP: Record<PickerShellSize, SizeExtendedDictionaryType> = {
  [Sizes.SMALL]: SizesExtended.XSMALL,
  [Sizes.MEDIUM]: SizesExtended.SMALL,
  [Sizes.LARGE]: SizesExtended.MEDIUM,
};
