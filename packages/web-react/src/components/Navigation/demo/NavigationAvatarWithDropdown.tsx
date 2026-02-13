import React, { useState } from 'react';
import Dropdown from '../../Dropdown/Dropdown';
import DropdownPopover from '../../Dropdown/DropdownPopover';
import DropdownTrigger from '../../Dropdown/DropdownTrigger';
import { Icon } from '../../Icon';
import Navigation from '../Navigation';
import NavigationItem from '../NavigationItem';
import {
  AVATAR_ARIA_LABEL,
  AVATAR_CONTENT,
  AVATAR_TEXT,
  DROPDOWN_ITEMS,
  NavigationAvatarAsDropdownTrigger,
} from './navigationAvatarDemoHelpers';

const NavigationAvatarWithDropdown = () => {
  const [isNavigationAvatarDropdownOpen, setIsNavigationAvatarDropdownOpen] = useState(false);
  const [isNavigationAvatarSquareDropdownOpen, setIsNavigationAvatarSquareDropdownOpen] = useState(false);

  return (
    <Navigation aria-label="NavigationAvatar">
      <NavigationItem alignmentY="stretch">
        <Dropdown
          alignmentX="stretch"
          alignmentY="stretch"
          id="navigation-avatar"
          isOpen={isNavigationAvatarDropdownOpen}
          onToggle={() => setIsNavigationAvatarDropdownOpen(!isNavigationAvatarDropdownOpen)}
        >
          <DropdownTrigger
            elementType={NavigationAvatarAsDropdownTrigger as unknown as HTMLButtonElement}
            avatarContent={AVATAR_CONTENT}
            aria-label={AVATAR_ARIA_LABEL}
          >
            {AVATAR_TEXT}
            <Icon name={`chevron-${isNavigationAvatarDropdownOpen ? 'up' : 'down'}`} boxSize={20} />
          </DropdownTrigger>
          <DropdownPopover>{DROPDOWN_ITEMS}</DropdownPopover>
        </Dropdown>
      </NavigationItem>
      <NavigationItem alignmentY="stretch">
        <Dropdown
          alignmentX="stretch"
          alignmentY="stretch"
          id="navigation-avatar-square"
          isOpen={isNavigationAvatarSquareDropdownOpen}
          onToggle={() => setIsNavigationAvatarSquareDropdownOpen(!isNavigationAvatarSquareDropdownOpen)}
        >
          <DropdownTrigger
            elementType={NavigationAvatarAsDropdownTrigger as unknown as HTMLButtonElement}
            avatarContent={AVATAR_CONTENT}
            isSquare
            aria-label={AVATAR_ARIA_LABEL}
          >
            {AVATAR_TEXT}
            <Icon name={`chevron-${isNavigationAvatarSquareDropdownOpen ? 'up' : 'down'}`} boxSize={20} />
          </DropdownTrigger>
          <DropdownPopover>{DROPDOWN_ITEMS}</DropdownPopover>
        </Dropdown>
      </NavigationItem>
    </Navigation>
  );
};

export default NavigationAvatarWithDropdown;
