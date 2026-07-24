'use client';

import React, { type ElementType, forwardRef } from 'react';
import { SizesExtended } from '../../constants';
import { useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import { type PolymorphicComponent, type PolymorphicRef, type SpiritTagProps } from '../../types';
import { mergeStyleProps } from '../../utils';
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
  const contextProps = useContextProps<Partial<SpiritTagProps<E, C, S>>>();
  const {
    children,
    color: propsColor,
    elementType: propsElementType,
    isDisabled: propsIsDisabled,
    isSubtle: propsIsSubtle,
    size: propsSize,
    ...restFromProps
  } = props;
  const { elementType: defaultElementType, ...defaultTagProps } = defaultProps;
  const elementType = propsElementType ?? contextProps.elementType ?? defaultElementType;
  const propsWithDefaults = {
    ...defaultTagProps,
    ...restFromProps,
    color: propsColor ?? contextProps.color ?? defaultTagProps.color,
    isDisabled: propsIsDisabled ?? contextProps.isDisabled ?? defaultTagProps.isDisabled,
    isSubtle: propsIsSubtle ?? contextProps.isSubtle ?? defaultTagProps.isSubtle,
    size: propsSize ?? contextProps.size ?? defaultTagProps.size,
  };

  const Component = elementType as ElementType;

  const { classProps, props: modifiedProps } = useTagStyleProps(propsWithDefaults);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps, otherProps });

  return (
    <Component
      {...(elementType === 'button' && { type: 'button' })}
      {...otherProps}
      {...(elementType === 'button' && propsWithDefaults.isDisabled && { disabled: true })}
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
