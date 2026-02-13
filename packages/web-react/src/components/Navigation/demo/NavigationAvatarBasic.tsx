import React from 'react';
import Navigation from '../Navigation';
import NavigationAvatar from '../NavigationAvatar';
import NavigationItem from '../NavigationItem';
import { AVATAR_ARIA_LABEL, AVATAR_CONTENT, AVATAR_TEXT } from './navigationAvatarDemoHelpers';

const NavigationAvatarBasic = () => (
  <Navigation aria-label="NavigationAvatar">
    <NavigationItem>
      <NavigationAvatar avatarContent={AVATAR_CONTENT} aria-label={AVATAR_ARIA_LABEL} elementType="div">
        {AVATAR_TEXT}
      </NavigationAvatar>
    </NavigationItem>
    <NavigationItem>
      <NavigationAvatar avatarContent={AVATAR_CONTENT} isSquare aria-label={AVATAR_ARIA_LABEL} elementType="div">
        {AVATAR_TEXT}
      </NavigationAvatar>
    </NavigationItem>
  </Navigation>
);

export default NavigationAvatarBasic;
