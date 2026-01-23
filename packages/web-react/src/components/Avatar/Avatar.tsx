'use client';

import React, { type ElementType, type ReactElement, forwardRef } from 'react';
import { SizesExtended } from '../../constants';
import { useStyleProps } from '../../hooks';
import { type PolymorphicRef, type SpiritAvatarProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useAvatarStyleProps } from './useAvatarStyleProps';

const defaultProps: SpiritAvatarProps = {
  elementType: 'div',
  isSquare: false,
  size: SizesExtended.MEDIUM,
};

/* We need an exception for components exported with forwardRef */
/* eslint no-underscore-dangle: ['error', { allow: ['_Avatar'] }] */
const _Avatar = <E extends ElementType = 'div'>(props: SpiritAvatarProps<E>, ref: PolymorphicRef<E>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType: ElementTag = 'div', children, ...restProps } = propsWithDefaults;
  const { classProps, props: modifiedProps } = useAvatarStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps, styleProps });

  return (
    <ElementTag {...otherProps} {...mergedStyleProps} ref={ref}>
      {children}
    </ElementTag>
  );
};

// @ts-expect-error - TransferProps index signature causes Omit to lose type information
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Avatar = forwardRef(_Avatar) as any as (<E extends ElementType = 'div'>(
  props: SpiritAvatarProps<E> & { ref?: PolymorphicRef<E> },
) => ReactElement) & {
  spiritComponent: string;
  spiritDefaultElement: 'div';
  spiritDefaultProps: SpiritAvatarProps<'div'>;
};

Avatar.spiritComponent = 'Avatar';
Avatar.spiritDefaultElement = 'div' as const;
Avatar.spiritDefaultProps = null as unknown as SpiritAvatarProps<'div'>;

export default Avatar;
