import React, { type ElementType, type ReactElement, forwardRef } from 'react';
import { type PolymorphicRef, type SpiritNavigationAvatarProps } from '../../../types';
import { Icon } from '../../Icon';
import { Item } from '../../Item';
import { Text } from '../../Text';
import NavigationAvatar from '../NavigationAvatar';

// Shared constants
export const AVATAR_CONTENT = <Icon name="profile" boxSize={20} />;
export const AVATAR_ARIA_LABEL = 'Profile of Jiří Bárta';
export const AVATAR_TEXT = (
  <Text elementType="span" size="small" emphasis="semibold">
    My Account
  </Text>
);

// Shared dropdown items
export const DROPDOWN_ITEMS = (
  <>
    <Item elementType="a" href="#" label="My Account" />
    <Item elementType="a" href="#" label="Settings" />
    <Item elementType="a" href="#" label="Log out" />
  </>
);

// Shared NavigationAvatarAsDropdownTrigger component
const _NavigationAvatarAsDropdownTrigger = <E extends ElementType = 'a'>(
  props: SpiritNavigationAvatarProps<E>,
  ref: PolymorphicRef<E>,
): ReactElement => <NavigationAvatar {...props} elementType="button" ref={ref} />;

export const NavigationAvatarAsDropdownTrigger = forwardRef<
  HTMLButtonElement,
  SpiritNavigationAvatarProps<ElementType>
>(_NavigationAvatarAsDropdownTrigger);
