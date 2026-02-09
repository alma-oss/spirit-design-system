'use client';

import React, { type ElementType, forwardRef } from 'react';
import { BackgroundStyleProps, BorderRadiusStyleProps, BorderStyles, PaddingStyleProps } from '../../constants';
import { useStyleProps } from '../../hooks';
import { type BoxProps, type PolymorphicComponent, type PolymorphicRef } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useBoxStyleProps } from './useBoxStyleProps';

const defaultProps = {
  elementType: 'div',
  borderStyle: BorderStyles.SOLID,
};

const _Box = <E extends ElementType = 'div'>(props: BoxProps<E>, ref: PolymorphicRef<E>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType = defaultProps.elementType, children, ...restProps } = propsWithDefaults;

  const Component = elementType as ElementType;

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

const Box = forwardRef(_Box) as unknown as PolymorphicComponent<'div', BoxProps<ElementType>>;

Box.spiritComponent = 'Box';
Box.displayName = 'Box';

export default Box;
