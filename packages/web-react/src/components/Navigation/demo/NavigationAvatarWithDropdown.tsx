import React from 'react';
import { useToggle } from '../../../hooks';
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
  const [isDropdownOpen, toggleDropdown] = useToggle();
  const [isSquareDropdownOpen, toggleSquareDropdown] = useToggle();

  return (
    <Navigation aria-label="NavigationAvatar">
      <NavigationItem alignmentY="stretch">
        <Dropdown
          alignmentX="stretch"
          alignmentY="stretch"
          id="navigation-avatar"
          isOpen={isDropdownOpen}
          onToggle={toggleDropdown}
        >
          <DropdownTrigger
            elementType={NavigationAvatarAsDropdownTrigger as unknown as HTMLButtonElement}
            avatarContent={AVATAR_CONTENT}
            aria-label={AVATAR_ARIA_LABEL}
          >
            {AVATAR_TEXT}
            <Icon name={`chevron-${isDropdownOpen ? 'up' : 'down'}`} boxSize={20} />
          </DropdownTrigger>
          <DropdownPopover>{DROPDOWN_ITEMS}</DropdownPopover>
        </Dropdown>
      </NavigationItem>
      <NavigationItem alignmentY="stretch">
        <Dropdown
          alignmentX="stretch"
          alignmentY="stretch"
          id="navigation-avatar-square"
          isOpen={isSquareDropdownOpen}
          onToggle={toggleSquareDropdown}
        >
          <DropdownTrigger
            elementType={NavigationAvatarAsDropdownTrigger as unknown as HTMLButtonElement}
            avatarContent={AVATAR_CONTENT}
            isSquare
            aria-label={AVATAR_ARIA_LABEL}
          >
            {AVATAR_TEXT}
            <Icon name={`chevron-${isSquareDropdownOpen ? 'up' : 'down'}`} boxSize={20} />
          </DropdownTrigger>
          <DropdownPopover>{DROPDOWN_ITEMS}</DropdownPopover>
        </Dropdown>
      </NavigationItem>
    </Navigation>
  );
};

export default NavigationAvatarWithDropdown;
