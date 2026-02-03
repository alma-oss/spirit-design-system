import React, { type ElementType, type ReactElement, forwardRef, useState } from 'react';
import {
  type PolymorphicRef,
  type SpiritNavigationActionProps,
  type SpiritNavigationAvatarProps,
} from '../../../types';
import Dropdown from '../../Dropdown/Dropdown';
import DropdownPopover from '../../Dropdown/DropdownPopover';
import DropdownTrigger from '../../Dropdown/DropdownTrigger';
import { Icon } from '../../Icon';
import { Item } from '../../Item';
import { Text } from '../../Text';
import Navigation from '../Navigation';
import NavigationAvatar from '../NavigationAvatar';
import NavigationItem from '../NavigationItem';

const _NavigationAvatarAsDropdownTrigger = <E extends ElementType = 'a'>(
  props: SpiritNavigationActionProps<E>,
  ref: PolymorphicRef<E>,
): ReactElement => <NavigationAvatar {...props} elementType="button" ref={ref} />;

const NavigationAvatarAsDropdownTrigger = forwardRef<HTMLButtonElement, SpiritNavigationAvatarProps<ElementType>>(
  _NavigationAvatarAsDropdownTrigger,
);

const NavigationAvatarDemo = () => {
  const [isNavigationAvatarDropdownOpen, setIsNavigationAvatarDropdownOpen] = useState(false);
  const [isNavigationAvatarSquareDropdownOpen, setIsNavigationAvatarSquareDropdownOpen] = useState(false);

  return (
    <Navigation aria-label="Main Navigation">
      <NavigationItem>
        <NavigationAvatar
          avatarContent={<Icon name="profile" boxSize={20} />}
          aria-label="Profile of Jiří Bárta"
          href="#"
        >
          <Text elementType="span" size="small" emphasis="semibold">
            My Account
          </Text>
        </NavigationAvatar>
      </NavigationItem>
      <NavigationItem>
        <NavigationAvatar
          avatarContent={<Icon name="profile" boxSize={20} />}
          isSquare
          aria-label="Profile of Jiří Bárta"
          href="#"
        >
          <Text elementType="span" size="small" emphasis="semibold">
            My Account
          </Text>
        </NavigationAvatar>
      </NavigationItem>
      <NavigationItem>
        <Dropdown
          alignmentX="stretch"
          alignmentY="stretch"
          id="dropdown-navigation"
          isOpen={isNavigationAvatarDropdownOpen}
          onToggle={() => setIsNavigationAvatarDropdownOpen(!isNavigationAvatarDropdownOpen)}
        >
          <DropdownTrigger
            elementType={NavigationAvatarAsDropdownTrigger as unknown as HTMLButtonElement}
            avatarContent={<Icon name="profile" boxSize={20} />}
            aria-label="Profile of Jiří Bárta"
          >
            <Text elementType="span" size="small" emphasis="semibold">
              My Account
            </Text>
            <Icon name={`chevron-${isNavigationAvatarDropdownOpen ? 'up' : 'down'}`} boxSize={20} />
          </DropdownTrigger>
          <DropdownPopover>
            <Item elementType="a" href="#" label="My Account" />
            <Item elementType="a" href="#" label="Settings" />
            <Item elementType="a" href="#" label="Log out" />
          </DropdownPopover>
        </Dropdown>
      </NavigationItem>
      <NavigationItem>
        <Dropdown
          alignmentX="stretch"
          alignmentY="stretch"
          id="dropdown-navigation"
          isOpen={isNavigationAvatarSquareDropdownOpen}
          onToggle={() => setIsNavigationAvatarSquareDropdownOpen(!isNavigationAvatarSquareDropdownOpen)}
        >
          <DropdownTrigger
            elementType={NavigationAvatarAsDropdownTrigger as unknown as HTMLButtonElement}
            avatarContent={<Icon name="profile" boxSize={20} />}
            isSquare
            aria-label="Profile of Jiří Bárta"
          >
            <Text elementType="span" size="small" emphasis="semibold">
              My Account
            </Text>
            <Icon name={`chevron-${isNavigationAvatarSquareDropdownOpen ? 'up' : 'down'}`} boxSize={20} />
          </DropdownTrigger>
          <DropdownPopover>
            <Item elementType="a" href="#" label="My Account" />
            <Item elementType="a" href="#" label="Settings" />
            <Item elementType="a" href="#" label="Log out" />
          </DropdownPopover>
        </Dropdown>
      </NavigationItem>
    </Navigation>
  );
};
export default NavigationAvatarDemo;
