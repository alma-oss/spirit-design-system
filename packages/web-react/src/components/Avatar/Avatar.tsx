'use client';

import React, { type ElementType, forwardRef } from 'react';
import { SizesExtended } from '../../constants';
import { useStyleProps } from '../../hooks';
import { type AvatarProps, type PolymorphicComponent, type PolymorphicRef, type SpiritAvatarProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useAvatarStyleProps } from './useAvatarStyleProps';

const defaultProps = {
  elementType: 'div',
  isSquare: false,
  size: SizesExtended.MEDIUM,
};

const _Avatar = <E extends ElementType = 'div'>(props: SpiritAvatarProps<E>, ref: PolymorphicRef<E>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType = defaultProps.elementType, children, ...restProps } = propsWithDefaults;

  const Component = elementType as ElementType;

  const { classProps, props: modifiedProps } = useAvatarStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps });

  return (
    <Component {...otherProps} {...mergedStyleProps} ref={ref}>
      {children}
    </Component>
  );
};

const Avatar = forwardRef<HTMLDivElement, AvatarProps<'div'>>(_Avatar) as unknown as PolymorphicComponent<
  'div',
  AvatarProps<string>
>;

Avatar.spiritComponent = 'Avatar';
Avatar.displayName = 'Avatar';

export default Avatar;
