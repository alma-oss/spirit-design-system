import { cssVariablePrefix, fontSizeBases } from '@alma-oss/spirit-design-tokens';
import classNames from 'classnames';
import { type CSSProperties } from 'react';
import { TextColors } from '../../constants';
import { useClassNamePrefix } from '../../hooks';
import type { IconBoxSize, IconStyleProps, SpiritIconProps } from '../../types';
import { pxToRem } from '../../utils';

const setBreakpointDimension = (
  style: CSSProperties,
  prefix: string,
  breakpoint: string,
  size?: number,
  baseFontSize?: number | string,
) => {
  const breakpointSuffix = breakpoint === 'mobile' ? '' : `-${breakpoint}`;
  (style as Record<string, string | undefined>)[`${prefix}${breakpointSuffix}`] =
    size === undefined ? undefined : pxToRem(size, { baseFontSize });
};

const setCustomDimension = (prefix: string, size: IconBoxSize): CSSProperties => {
  const style: CSSProperties = {};
  const fontSizeBaseValues = Object.values(fontSizeBases).map((value) => Number.parseFloat(String(value)));
  const allFontSizeBasesEqual = fontSizeBaseValues.every((value) => value === fontSizeBaseValues[0]);

  if (typeof size === 'object') {
    Object.entries(size).forEach(([breakpoint, breakpointSize]) => {
      const baseFontSize = fontSizeBases[breakpoint as keyof typeof fontSizeBases];
      setBreakpointDimension(style, prefix, breakpoint, breakpointSize, baseFontSize);
    });
  } else {
    if (allFontSizeBasesEqual) {
      (style as Record<string, string | undefined>)[prefix] = pxToRem(size, { baseFontSize: fontSizeBases.mobile });
    } else {
      Object.entries(fontSizeBases).forEach(([breakpoint, baseFontSize]) => {
        setBreakpointDimension(style, prefix, breakpoint, size, baseFontSize);
      });
    }
  }

  return style;
};

export interface IconStyles {
  classProps: string;
  iconStyleProps: CSSProperties;
  props: Omit<SpiritIconProps, keyof IconStyleProps>;
}

export const useIconStyleProps = (props: SpiritIconProps): IconStyles => {
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
    ...(boxSize ? setCustomDimension(`${stylePrefix}-size`, boxSize) : {}),
  };

  return {
    classProps,
    iconStyleProps: customizedIconStyle,
    props: otherProps,
  };
};
