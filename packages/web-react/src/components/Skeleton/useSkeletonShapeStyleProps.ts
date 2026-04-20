import { cssVariablePrefix } from '@alma-oss/spirit-design-tokens';
import classNames from 'classnames';
import { type CSSProperties } from 'react';
import { useClassNamePrefix } from '../../hooks';
import { type SkeletonShapeBaseProps } from '../../types';

interface CustomizedCSSProperties extends CSSProperties {
  [key: string]: string | undefined | number;
}

const setCustomDimension = (prefix: string, size: number | undefined): CustomizedCSSProperties => {
  if (!size) return {};

  const propName = `--${prefix}`;

  return { [propName]: `${size?.toString()}px` } as CustomizedCSSProperties;
};

const setCustomBorderRadius = (
  prefix: string,
  radius: object | number | string | undefined,
): CustomizedCSSProperties => {
  const style: CustomizedCSSProperties = {};
  const cssPrefix: string = `--${cssVariablePrefix}radius-`;

  if (typeof radius === 'object' && radius !== null) {
    Object.keys(radius).forEach((key) => {
      const breakpointSuffix = key === 'mobile' ? '' : `-${key}`;
      const value = (radius as Record<string, string | undefined>)[key];
      (style as Record<string, string | undefined>)[`--${prefix}${breakpointSuffix}`] = `var(${cssPrefix}${value})`;
    });
  } else if (radius) {
    (style as Record<string, string | undefined>)[`--${prefix}`] = `var(${cssPrefix}${radius})`;
  }

  return style;
};

export const useSkeletonShapeStyleProps = <E = void>(props: SkeletonShapeBaseProps<E>) => {
  const { height, width, borderRadius, ...otherProps } = props;

  const skeletonClass = useClassNamePrefix('Skeleton');
  const skeletonItemClass = `${skeletonClass}--shape`;

  const classProps = classNames(skeletonClass, skeletonItemClass);
  const stylePrefix: string = `${cssVariablePrefix}skeleton-shape`;

  const customizedShapeStyle = {
    ...setCustomDimension(`${stylePrefix}-width`, width),
    ...setCustomDimension(`${stylePrefix}-height`, height),
    ...(borderRadius ? setCustomBorderRadius(`${stylePrefix}-radius`, borderRadius) : {}),
  };

  return {
    classProps,
    skeletonShapeStyleProps: customizedShapeStyle,
    props: otherProps,
  };
};
