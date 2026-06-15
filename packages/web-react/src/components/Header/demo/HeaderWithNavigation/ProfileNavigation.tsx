import React from 'react';
import { Icon } from '../../../Icon';
import { Navigation, NavigationAvatar, NavigationItem } from '../../../Navigation';
import { Text } from '../../../Text';

interface ProfileNavigationProps {
  isSquare?: boolean;
}

const ProfileNavigation = ({ isSquare = false }: ProfileNavigationProps) => (
  <Navigation aria-label="Profile" direction="vertical">
    <NavigationItem alignmentY="left">
      <NavigationAvatar avatarContent={<Icon name="profile" />} aria-label="Profile of Jiří Bárta" isSquare={isSquare}>
        <Text elementType="span" size="small" emphasis="semibold">
          My Account
        </Text>
      </NavigationAvatar>
    </NavigationItem>
  </Navigation>
);

export default ProfileNavigation;
