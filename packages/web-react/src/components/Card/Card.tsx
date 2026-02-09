'use client';

import React, { type ElementType } from 'react';
import { DirectionExtended } from '../../constants';
import { useStyleProps } from '../../hooks';
import { type SpiritCardProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useCardStyleProps } from './useCardStyleProps';

const defaultProps: Partial<SpiritCardProps> = {
  direction: DirectionExtended.VERTICAL,
  elementType: 'article',
  isBoxed: false,
};

const Card = <E extends ElementType = 'article'>(props: SpiritCardProps<E>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const {
    elementType: ElementTag = 'article',
    alignmentY,
    direction,
    isBoxed,
    children,
    ...restProps
  } = propsWithDefaults;
  const { classProps } = useCardStyleProps({ alignmentY, direction, isBoxed });
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps: classProps.root, styleProps, otherProps });

  return (
    <ElementTag {...otherProps} {...mergedStyleProps}>
      {children}
    </ElementTag>
  );
};

Card.spiritComponent = 'Card';

export default Card;
