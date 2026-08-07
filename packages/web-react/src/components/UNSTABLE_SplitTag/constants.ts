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
