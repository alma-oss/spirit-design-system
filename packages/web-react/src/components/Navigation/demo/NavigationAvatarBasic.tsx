import React from 'react';
import Navigation from '../Navigation';
import NavigationAvatar from '../NavigationAvatar';
import NavigationItem from '../NavigationItem';
import { AVATAR_CONTENT, AVATAR_TEXT } from './navigationAvatarDemoHelpers';

const NavigationAvatarBasic = () => (
  <Navigation aria-label="Navigation Avatar">
    <NavigationItem>
      <NavigationAvatar avatarContent={AVATAR_CONTENT} elementType="div">
        {AVATAR_TEXT}
      </NavigationAvatar>
    </NavigationItem>
    <NavigationItem>
      <NavigationAvatar avatarContent={AVATAR_CONTENT} isSquare elementType="div">
        {AVATAR_TEXT}
      </NavigationAvatar>
    </NavigationItem>
  </Navigation>
);

export default NavigationAvatarBasic;
