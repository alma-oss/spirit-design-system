'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import { type PolymorphicRef, type SpiritCardLinkProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useCardStyleProps } from './useCardStyleProps';

const defaultProps: Partial<SpiritCardLinkProps> = {
  elementType: 'a',
};

const _CardLink = <E extends ElementType = 'a'>(props: SpiritCardLinkProps<E>, ref: PolymorphicRef<E>): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const {
    elementType: ElementTag = defaultProps.elementType as ElementType,
    children,
    href,
    ...restProps
  } = propsWithDefaults;
  const { classProps } = useCardStyleProps();
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps: classProps.link, styleProps, otherProps });

  return (
    <ElementTag {...otherProps} {...styleProps} {...mergedStyleProps} href={href} ref={ref}>
      {children}
    </ElementTag>
  );
};

const CardLink = forwardRef<HTMLAnchorElement, SpiritCardLinkProps<ElementType>>(_CardLink);

CardLink.spiritComponent = 'CardLink';

export default CardLink;
