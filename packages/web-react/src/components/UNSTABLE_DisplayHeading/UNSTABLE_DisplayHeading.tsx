'use client';

import React, { type ElementType } from 'react';
import { HeadingStyleProps, Sizes, TextStyleProps } from '../../constants';
import { useStyleProps } from '../../hooks';
import { mergeStyleProps } from '../../utils';
import { type SpiritDisplayHeadingProps } from './types';
import { useDisplayHeadingStyleProps } from './useDisplayHeadingStyleProps';

const defaultProps: Partial<SpiritDisplayHeadingProps> = {
  size: Sizes.MEDIUM,
};

const UNSTABLE_DisplayHeading = <E extends ElementType = 'h1', C = void>(
  props: SpiritDisplayHeadingProps<E, C>,
): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType, children, ...restProps } = propsWithDefaults;
  const Component = elementType as ElementType;
  const { classProps, props: modifiedProps } = useDisplayHeadingStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps, {
    isTextBalanced: HeadingStyleProps.isTextBalanced,
    textAlignment: TextStyleProps.textAlignment,
    textHyphens: TextStyleProps.textHyphens,
    textWordBreak: TextStyleProps.textWordBreak,
  });
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps, otherProps });

  return (
    <Component {...otherProps} {...mergedStyleProps}>
      {children}
    </Component>
  );
};

UNSTABLE_DisplayHeading.spiritComponent = 'UNSTABLE_DisplayHeading';
UNSTABLE_DisplayHeading.displayName = 'UNSTABLE_DisplayHeading';

export default UNSTABLE_DisplayHeading;
