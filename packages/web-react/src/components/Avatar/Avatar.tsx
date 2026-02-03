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

_Avatar.spiritComponent = 'Avatar';
_Avatar.spiritDefaultElement = 'div' as const;
_Avatar.spiritDefaultProps = null as unknown as SpiritAvatarProps<'div'>;

const Avatar = forwardRef(_Avatar) as <E extends ElementType = 'div'>(
  props: SpiritAvatarProps<E> & { ref?: PolymorphicRef<E> },
) => ReactElement;

export default Avatar;
