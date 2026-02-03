'use client';

import React, { type ElementType, type ReactElement, forwardRef } from 'react';
import { Sizes } from '../../constants';
import { useStyleProps } from '../../hooks';
import { type PolymorphicRef, type SpiritNavigationAvatarProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { Avatar } from '../Avatar';
import { useNavigationStyleProps } from './useNavigationStyleProps';

const defaultProps: Partial<SpiritNavigationAvatarProps> = {
  elementType: 'a',
  isSquare: false,
};

/* We need an exception for components exported with forwardRef */
/* eslint no-underscore-dangle: ['error', { allow: ['_NavigationAvatar'] }] */
const _NavigationAvatar = <E extends ElementType = 'a'>(
  props: SpiritNavigationAvatarProps<E> & { avatarContent: React.ReactElement | React.ReactNode },
  ref: PolymorphicRef<E>,
): ReactElement => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const {
    elementType: ElementTag = defaultProps.elementType as ElementType,
    avatarContent,
    isSquare,
    children,
    ...restProps
  } = propsWithDefaults;

  const { classProps, props: modifiedProps } = useNavigationStyleProps({ isSquare, ...restProps });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps: classProps.avatar, styleProps, otherProps });

  return (
    <ElementTag {...otherProps} {...mergedStyleProps} href={restProps.href} ref={ref}>
      <Avatar size={Sizes.SMALL} isSquare={isSquare}>
        {avatarContent}
      </Avatar>
      {children}
    </ElementTag>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NavigationAvatar = forwardRef(_NavigationAvatar) as any as (<E extends ElementType = 'a'>(
  props: SpiritNavigationAvatarProps<E> & { ref?: PolymorphicRef<E> },
) => ReactElement) & {
  spiritComponent: string;
};

NavigationAvatar.spiritComponent = 'NavigationAvatar';

export default NavigationAvatar;
