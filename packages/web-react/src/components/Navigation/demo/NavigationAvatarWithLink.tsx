import React from 'react';
import Navigation from '../Navigation';
import NavigationAvatar from '../NavigationAvatar';
import NavigationItem from '../NavigationItem';
import { AVATAR_ARIA_LABEL, AVATAR_CONTENT, AVATAR_TEXT } from './navigationAvatarDemoHelpers';

const NavigationAvatarWithLink = () => (
  <Navigation aria-label="NavigationAvatar">
    <NavigationItem>
      <NavigationAvatar avatarContent={AVATAR_CONTENT} aria-label={AVATAR_ARIA_LABEL} href="#">
        {AVATAR_TEXT}
      </NavigationAvatar>
    </NavigationItem>
    <NavigationItem>
      <NavigationAvatar avatarContent={AVATAR_CONTENT} isSquare aria-label={AVATAR_ARIA_LABEL} href="#">
        {AVATAR_TEXT}
      </NavigationAvatar>
    </NavigationItem>
  </Navigation>
);

export default NavigationAvatarWithLink;
