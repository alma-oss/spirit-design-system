'use client';

import React, { forwardRef, type ElementType } from 'react';
import { BackgroundStyleProps, BorderRadiusStyleProps, BorderStyles, PaddingStyleProps } from '../../constants';
import { useStyleProps } from '../../hooks';
import { type BoxProps, type PolymorphicRef, type SpiritComponentStaticProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useBoxStyleProps } from './useBoxStyleProps';

const defaultProps = {
  elementType: 'div' as const,
  borderStyle: BorderStyles.SOLID,
};

/* We need an exception for components exported with forwardRef */
/* eslint no-underscore-dangle: ['error', { allow: ['_Box'] }] */
const _Box = <T extends ElementType = 'div'>(
  props: BoxProps<T>,
  ref: PolymorphicRef<T>,
) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType = defaultProps.elementType, children, ...restProps } = propsWithDefaults;

  const Component = elementType as React.ElementType;

  const { classProps, props: modifiedProps } = useBoxStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps, {
    ...BackgroundStyleProps,
    ...BorderRadiusStyleProps,
    ...PaddingStyleProps,
  });
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps });

  return (
    <Component {...otherProps} {...mergedStyleProps} ref={ref}>
      {children}
    </Component>
  );
};

const Box = forwardRef(_Box) as unknown as (<T extends ElementType = 'div'>(
  props: BoxProps<T> & { ref?: PolymorphicRef<T> }
) => React.ReactElement) &
  SpiritComponentStaticProps;

Box.spiritComponent = 'Box';
Box.displayName = 'Box';

export default Box;
