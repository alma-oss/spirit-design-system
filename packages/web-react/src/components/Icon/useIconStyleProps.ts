import { cssVariablePrefix } from '@alma-oss/spirit-design-tokens';
import classNames from 'classnames';
import { type CSSProperties } from 'react';
import { TextColors } from '../../constants';
import { useClassNamePrefix } from '../../hooks';
import type { IconBoxSize, IconStyleProps, SpiritIconProps } from '../../types';
import { pxToRem } from '../../utils';

const setBaseDimensionValue = (compositionPropertyName: string, sizePx: number): string =>
  `var(${compositionPropertyName}, ${pxToRem(sizePx)})`;

const setCustomDimension = (
  prefix: string,
  compositionPrefix: string,
  size: IconBoxSize,
  hasCompositionFallback = false,
): CSSProperties => {
  const style: CSSProperties = {};

  if (typeof size === 'object') {
    Object.entries(size).forEach(([breakpoint, breakpointSize]) => {
      const breakpointSuffix = breakpoint === 'mobile' ? '' : `-${breakpoint}`;
      const propertyName = `${prefix}${breakpointSuffix}`;

      if (breakpointSize === undefined) {
        (style as Record<string, string | undefined>)[propertyName] = undefined;
      } else if (breakpoint === 'mobile' && hasCompositionFallback) {
        (style as Record<string, string | undefined>)[propertyName] = setBaseDimensionValue(
          compositionPrefix,
          breakpointSize,
        );
      } else {
        (style as Record<string, string | undefined>)[propertyName] = pxToRem(breakpointSize);
      }
    });
  } else {
    (style as Record<string, string | undefined>)[prefix] = hasCompositionFallback
      ? setBaseDimensionValue(compositionPrefix, size)
      : pxToRem(size);
  }

  return style;
};

export interface IconStyles {
  classProps: string;
  iconStyleProps: CSSProperties;
  props: Omit<SpiritIconProps, keyof IconStyleProps>;
}

export const useIconStyleProps = (props: SpiritIconProps, hasCompositionFallback = false): IconStyles => {
  const { boxSize, color, name, ...otherProps } = props;
  const stylePrefix: string = `--${cssVariablePrefix}icon`;
  const isDualtoneIcon = String(name).includes('-dualtone');
  const dualtoneColorWithDefault = isDualtoneIcon && !color ? TextColors.PRIMARY : color;

  const iconClass = useClassNamePrefix('Icon');
  const iconDualtoneColorClass = `${iconClass}--${dualtoneColorWithDefault}`;
  const classProps = classNames(iconClass, {
    [iconDualtoneColorClass]: color || dualtoneColorWithDefault,
  });

  const customizedIconStyle = {
    ...(boxSize
      ? setCustomDimension(`${stylePrefix}-size`, `${stylePrefix}-composition-size`, boxSize, hasCompositionFallback)
      : {}),
  };

  return {
    classProps,
    iconStyleProps: customizedIconStyle,
    props: otherProps,
  };
};
