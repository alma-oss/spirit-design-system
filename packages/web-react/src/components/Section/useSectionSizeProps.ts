import { SizesExtended, breakpointOrder } from '../../constants';
import {
  BREAKPOINT_MOBILE,
  type Responsive,
  type SectionProps,
  type SingleOrResponsive,
  type SizeExtendedDictionaryType,
  type SpaceToken,
} from '../../types';
import { isResponsive } from '../../utils';

const sizePaddingMapping: Record<SizeExtendedDictionaryType<never>, { paddingY: Responsive<SpaceToken> }> = {
  [SizesExtended.XSMALL]: { paddingY: { mobile: 'space-900', tablet: 'space-1000' } },
  [SizesExtended.SMALL]: { paddingY: { mobile: 'space-1000', tablet: 'space-1100' } },
  [SizesExtended.MEDIUM]: { paddingY: { mobile: 'space-1100', tablet: 'space-1300' } },
  [SizesExtended.LARGE]: { paddingY: { mobile: 'space-1200', tablet: 'space-1400' } },
  [SizesExtended.XLARGE]: { paddingY: { mobile: 'space-1400', tablet: 'space-1600' } },
};

// Size padding is rendered as responsive utility classes, which win over base classes from their breakpoint up,
// so the user value must be repeated on every breakpoint the size padding defines to win as well.
const fillBreakpoints = (
  value: SingleOrResponsive<SpaceToken>,
  sizePadding: Responsive<SpaceToken>,
): Responsive<SpaceToken> => {
  const responsiveValue: Responsive<SpaceToken> = isResponsive<SpaceToken>(value)
    ? value
    : { [BREAKPOINT_MOBILE]: value };
  const filled: Responsive<SpaceToken> = {};
  let lastValue: SpaceToken | undefined;

  breakpointOrder.forEach((breakpoint) => {
    lastValue = responsiveValue[breakpoint] ?? lastValue;

    if (lastValue !== undefined && (breakpoint in responsiveValue || breakpoint in sizePadding)) {
      filled[breakpoint] = lastValue;
    }
  });

  return filled;
};

export const useSectionSizeProps = (props: SectionProps = {}) => {
  const { size, paddingY, paddingTop, paddingBottom } = props;
  const sizePadding = size ? sizePaddingMapping[size as SizeExtendedDictionaryType<never>] : undefined;

  if (!sizePadding) {
    return { modifiedProps: props };
  }

  const modifiedProps = { ...sizePadding, ...props };

  if (paddingY === undefined) {
    if (paddingTop !== undefined) {
      modifiedProps.paddingTop = fillBreakpoints(paddingTop, sizePadding.paddingY);
    }

    if (paddingBottom !== undefined) {
      modifiedProps.paddingBottom = fillBreakpoints(paddingBottom, sizePadding.paddingY);
    }
  }

  return {
    modifiedProps,
  };
};
