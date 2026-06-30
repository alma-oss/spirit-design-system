import React from 'react';
import { Icon } from '../../../Icon';
import { Navigation, NavigationAvatar, NavigationItem } from '../../../Navigation';

interface ProfileNavigationProps {
  isSquare?: boolean;
}

const ProfileNavigation = ({ isSquare = false }: ProfileNavigationProps) => (
  <Navigation aria-label="Profile" direction="vertical">
    <NavigationItem alignmentY="left">
      <NavigationAvatar avatarContent={<Icon name="profile" />} aria-label="Profile of Jiří Bárta" isSquare={isSquare}>
        My Account
      </NavigationAvatar>
    </NavigationItem>
  </Navigation>
);

export default ProfileNavigation;
