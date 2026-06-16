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
  const {
    elementType: propsElementType,
    avatarContent,
    avatarSize = defaultProps.avatarSize,
    isSquare,
    children,
    ...restProps
  } = props;
  const contextProps = useContextProps<Partial<SpiritNavigationAvatarProps<E>>>();
  const elementType = propsElementType ?? contextProps.elementType ?? defaultProps.elementType;
  const ElementTag = elementType as ElementType;

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
) as unknown as PolymorphicComponent<'a', NavigationAvatarBaseProps>;

NavigationAvatar.spiritComponent = 'NavigationAvatar';
NavigationAvatar.displayName = 'NavigationAvatar';

export default NavigationAvatar;
