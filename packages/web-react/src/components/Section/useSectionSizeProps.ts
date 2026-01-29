import { type ElementType } from 'react';
import { SizesExtended } from '../../constants';
import {
  type Responsive,
  type SizeExtendedDictionaryType,
  type SpaceToken,
  type SpiritSectionProps,
} from '../../types';

const sizePaddingMapping: Record<SizeExtendedDictionaryType<never>, { paddingY: Responsive<SpaceToken> }> = {
  [SizesExtended.XSMALL]: { paddingY: { mobile: 'space-900', tablet: 'space-1000' } },
  [SizesExtended.SMALL]: { paddingY: { mobile: 'space-1000', tablet: 'space-1100' } },
  [SizesExtended.MEDIUM]: { paddingY: { mobile: 'space-1100', tablet: 'space-1300' } },
  [SizesExtended.LARGE]: { paddingY: { mobile: 'space-1200', tablet: 'space-1400' } },
  [SizesExtended.XLARGE]: { paddingY: { mobile: 'space-1400', tablet: 'space-1600' } },
};

export const useSectionSizeProps = (props: Record<string, any> = {}) => {
  const { size, ...restProps } = props;

  const modifiedProps =
    size && typeof size === 'string' && size in sizePaddingMapping
      ? ({ ...sizePaddingMapping[size as SizeExtendedDictionaryType<never>], ...restProps } as typeof restProps)
      : restProps;

  return {
    modifiedProps,
  };
};
