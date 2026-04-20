'use client';

import React, { type ElementType } from 'react';
import { useStyleProps } from '../../hooks';
import { type SpiritCardTitleProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useCardStyleProps } from './useCardStyleProps';

const defaultProps: Partial<SpiritCardTitleProps> = {
  elementType: 'h4',
  isHeading: true,
};

const CardTitle = <E extends ElementType = 'h4'>(props: SpiritCardTitleProps<E>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType, children, isHeading, ...restProps } = propsWithDefaults;
  const Component = elementType as ElementType;
  const { classProps } = useCardStyleProps({ isHeading });
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps: classProps.title, styleProps, otherProps });

  return (
    <Component {...otherProps} {...mergedStyleProps}>
      {children}
    </Component>
  );
};

CardTitle.spiritComponent = 'CardTitle';
CardTitle.displayName = 'CardTitle';

export default CardTitle;
