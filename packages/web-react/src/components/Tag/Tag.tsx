'use client';

import React, { type ElementType, forwardRef } from 'react';
import { SizesExtended } from '../../constants';
import { useStyleProps } from '../../hooks';
import { type PolymorphicComponent, type PolymorphicRef, type SpiritTagProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { TagColorsExtended } from './constants';
import { useTagStyleProps } from './useTagStyleProps';

const defaultProps = {
  color: TagColorsExtended.NEUTRAL,
  elementType: 'span',
  isSubtle: false,
  size: SizesExtended.MEDIUM,
};

const _Tag = <E extends ElementType = 'span', C = void, S = void>(
  props: SpiritTagProps<E, C, S>,
  ref: PolymorphicRef<E>,
): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType = defaultProps.elementType, children, ...restProps } = propsWithDefaults;

  const Component = elementType as ElementType;

  const { classProps, props: modifiedProps } = useTagStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps, otherProps });

  return (
    <Component {...otherProps} {...mergedStyleProps} ref={ref}>
      {children}
    </Component>
  );
};

const Tag = forwardRef<HTMLSpanElement, SpiritTagProps<'span', void, void>>(_Tag) as unknown as PolymorphicComponent<
  'span',
  SpiritTagProps<ElementType, void, void>
>;

Tag.spiritComponent = 'Tag';
Tag.displayName = 'Tag';

export default Tag;
