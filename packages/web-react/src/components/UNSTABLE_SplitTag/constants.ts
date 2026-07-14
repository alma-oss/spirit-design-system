import { SizesExtended } from '../../constants';
import type { SizeExtendedDictionaryType } from '../../types';

export const UNSTABLE_SPLIT_TAG_CONTROL_BUTTON_SIZE_MAP: Record<
  NonNullable<SizeExtendedDictionaryType>,
  SizeExtendedDictionaryType
> = {
  [SizesExtended.XSMALL]: SizesExtended.XSMALL,
  [SizesExtended.SMALL]: SizesExtended.XSMALL,
  [SizesExtended.MEDIUM]: SizesExtended.XSMALL,
  [SizesExtended.LARGE]: SizesExtended.SMALL,
  [SizesExtended.XLARGE]: SizesExtended.SMALL,
};

export const UNSTABLE_SPLIT_TAG_DROPDOWN_ICON_SIZE_MAP: Partial<
  Record<NonNullable<SizeExtendedDictionaryType>, number>
> = {
  [SizesExtended.XSMALL]: 16,
};
