import React from 'react';
import { Icon } from '../../Icon';
import { Item } from '../../Item';
import { Label } from '../../Label';

// Shared constants
export const AVATAR_CONTENT = <Icon name="profile" />;
export const AVATAR_ARIA_LABEL = 'Profile of Jiří Bárta';
export const AVATAR_TEXT = 'My Account';

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
