import { Sizes, SizesExtended } from '../../constants';
import type { SizeExtendedDictionaryType } from '../../types';

type PickerShellSize = (typeof Sizes)[keyof typeof Sizes];

export const DEFAULT_SIZE = Sizes.MEDIUM;

/** Maps picker shell size to extended sizes for nested Tag and ControlButton. */
export const PICKER_NESTED_SIZE_MAP: Record<PickerShellSize, SizeExtendedDictionaryType> = {
  [Sizes.SMALL]: SizesExtended.XSMALL,
  [Sizes.MEDIUM]: SizesExtended.SMALL,
  [Sizes.LARGE]: SizesExtended.MEDIUM,
};
