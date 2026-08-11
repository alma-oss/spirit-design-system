'use client';

import React, { type ElementType, forwardRef } from 'react';
import { SizesExtended } from '../../constants';
import { useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import { type PolymorphicComponent, type PolymorphicRef, type SpiritTagProps } from '../../types';
import { filterDOMProps, mergeProps, mergeStyleProps } from '../../utils';
import { TagColorsExtended } from './constants';
import { useTagStyleProps } from './useTagStyleProps';

const defaultProps = {
  color: TagColorsExtended.NEUTRAL,
  elementType: 'span',
  isDisabled: false,
  isSubtle: false,
  size: SizesExtended.MEDIUM,
};

const _Tag = <E extends ElementType = 'span', C = void, S = void>(
  props: SpiritTagProps<E, C, S>,
  ref: PolymorphicRef<E>,
): JSX.Element => {
  const mergedProps = useContextProps(props, 'tag') as SpiritTagProps<E, C, S>;
  const propsWithDefaults = mergeProps(defaultProps, mergedProps);
  const { elementType = defaultProps.elementType, children, ...restProps } = propsWithDefaults;

  const Component = elementType as ElementType;
  const isButtonElement = elementType === 'button';

  const { classProps, props: modifiedProps } = useTagStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps, otherProps });

  return (
    <Component
      {...(isButtonElement && { type: 'button' })}
      {...filterDOMProps(otherProps)}
      {...(isButtonElement && restProps.isDisabled && { disabled: true })}
      {...mergedStyleProps}
      ref={ref}
    >
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
