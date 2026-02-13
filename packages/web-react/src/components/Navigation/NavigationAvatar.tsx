'use client';

import React, { type ElementType, forwardRef } from 'react';
import { Sizes } from '../../constants';
import { useStyleProps } from '../../hooks';
import {
  type NavigationAvatarProps,
  type PolymorphicComponent,
  type PolymorphicRef,
  type SpiritNavigationAvatarProps,
} from '../../types';
import { mergeStyleProps } from '../../utils';
import { Avatar } from '../Avatar';
import { useNavigationStyleProps } from './useNavigationStyleProps';

const defaultProps: Partial<SpiritNavigationAvatarProps> = {
  elementType: 'a',
  isSquare: false,
  avatarSize: Sizes.SMALL,
};

const _NavigationAvatar = <E extends ElementType = 'a'>(
  props: SpiritNavigationAvatarProps<E>,
  ref: PolymorphicRef<E>,
) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const {
    elementType: ElementTag = defaultProps.elementType as ElementType,
    avatarContent,
    avatarSize = defaultProps.avatarSize,
    isSquare,
    children,
    ...restProps
  } = propsWithDefaults;

  const { classProps, props: modifiedProps } = useNavigationStyleProps({ isSquare, ...restProps });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps: classProps.avatar, styleProps, otherProps });

  return (
    <ElementTag {...otherProps} {...mergedStyleProps} ref={ref}>
      <Avatar size={avatarSize} isSquare={isSquare}>
        {avatarContent}
      </Avatar>
      {children}
    </ElementTag>
  );
};

const NavigationAvatar = forwardRef<HTMLAnchorElement, SpiritNavigationAvatarProps<'a'>>(
  _NavigationAvatar as never,
) as unknown as PolymorphicComponent<'a', NavigationAvatarProps<ElementType>>;

NavigationAvatar.spiritComponent = 'NavigationAvatar';
NavigationAvatar.displayName = 'NavigationAvatar';

export default NavigationAvatar;
