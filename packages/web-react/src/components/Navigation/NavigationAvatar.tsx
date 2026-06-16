'use client';

import React, { type ElementType, forwardRef } from 'react';
import { Sizes } from '../../constants';
import { useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import {
  type NavigationAvatarBaseProps,
  type PolymorphicComponent,
  type PolymorphicRef,
  type SpiritNavigationAvatarProps,
} from '../../types';
import { mergeProps, mergeStyleProps } from '../../utils';
import { Avatar } from '../Avatar';
import { useNavigationStyleProps } from './useNavigationStyleProps';

const defaultProps = {
  elementType: 'a',
  isSquare: false,
  avatarSize: Sizes.SMALL,
};

const _NavigationAvatar = <E extends ElementType = 'a'>(
  props: SpiritNavigationAvatarProps<E>,
  ref: PolymorphicRef<E>,
) => {
  const mergedProps = useContextProps(props, 'navigationAvatar') as SpiritNavigationAvatarProps<E>;
  const propsWithDefaults = mergeProps(defaultProps, mergedProps);
  const {
    elementType = defaultProps.elementType,
    avatarContent,
    avatarSize,
    isSquare,
    children,
    ...restProps
  } = propsWithDefaults;
  const ElementTag = elementType as ElementType;

  const { classProps, props: modifiedProps } = useNavigationStyleProps({ isSquare, ...restProps });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps: classProps.avatar, styleProps, otherProps });

  return (
    <ElementTag {...otherProps} {...mergedStyleProps} ref={ref}>
      <Avatar size={avatarSize} isSquare={isSquare} aria-hidden="true">
        {avatarContent}
      </Avatar>
      {children}
    </ElementTag>
  );
};

const NavigationAvatar = forwardRef<HTMLAnchorElement, SpiritNavigationAvatarProps<'a'>>(
  _NavigationAvatar as never,
) as unknown as PolymorphicComponent<'a', NavigationAvatarBaseProps>;

NavigationAvatar.spiritComponent = 'NavigationAvatar';
NavigationAvatar.displayName = 'NavigationAvatar';

export default NavigationAvatar;
