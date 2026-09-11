import { Sizes, SizesExtended } from '../../constants';
import type { SizeExtendedDictionaryType, StyleProps } from '../../types';

type PickerShellSize = (typeof Sizes)[keyof typeof Sizes];

export const DEFAULT_SIZE = Sizes.MEDIUM;

/**
 * Interactive content inside the field label (e.g. a Tooltip trigger).
 * Clicks on these must not be redirected to the picker trigger.
 */
export const PICKER_LABEL_CONTROL_SELECTOR = 'a[href], button, input, select, textarea, [role="button"]';

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
