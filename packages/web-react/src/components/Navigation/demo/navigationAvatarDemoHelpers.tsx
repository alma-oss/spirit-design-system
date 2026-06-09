import React, { type ReactElement, forwardRef } from 'react';
import { type PolymorphicRef, type SpiritNavigationAvatarProps } from '../../../types';
import { Icon } from '../../Icon';
import { Item } from '../../Item';
import { Label } from '../../Label';
import { Text } from '../../Text';
import NavigationAvatar from '../NavigationAvatar';

// Shared constants
export const AVATAR_CONTENT = <Icon name="profile" />;
export const AVATAR_ARIA_LABEL = 'Profile of Jiří Bárta';
export const AVATAR_TEXT = (
  <Text elementType="span" size="small" emphasis="semibold">
    My Account
  </Text>
);

// Shared dropdown items
export const DROPDOWN_ITEMS = (
  <>
    <Item elementType="a" href="#">
      <Label>My Account</Label>
    </Item>
    <Item elementType="a" href="#">
      <Label>Settings</Label>
    </Item>
    <Item elementType="a" href="#">
      <Label>Log out</Label>
    </Item>
  </>
);

// Shared NavigationAvatarAsDropdownTrigger component
const _NavigationAvatarAsDropdownTrigger = (
  props: SpiritNavigationAvatarProps<'button'>,
  ref: PolymorphicRef<'button'>,
): ReactElement => <NavigationAvatar {...props} elementType="button" ref={ref} />;

export const NavigationAvatarAsDropdownTrigger = forwardRef<HTMLButtonElement, SpiritNavigationAvatarProps<'button'>>(
  _NavigationAvatarAsDropdownTrigger,
);
