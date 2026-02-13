import React, { type ElementType, forwardRef, useState } from 'react';
import { type PolymorphicRef, type SpiritNavigationActionProps } from '../../../types';
import Dropdown from '../../Dropdown/Dropdown';
import DropdownPopover from '../../Dropdown/DropdownPopover';
import DropdownTrigger from '../../Dropdown/DropdownTrigger';
import { Icon } from '../../Icon';
import { Item } from '../../Item';
import Navigation from '../Navigation';
import NavigationAction from '../NavigationAction';
import NavigationItem from '../NavigationItem';

const _NavigationActionAsDropdownTrigger = <E extends ElementType = 'a'>(
  props: SpiritNavigationActionProps<E>,
  ref: PolymorphicRef<E>,
) => <NavigationAction {...props} elementType="button" ref={ref} />;

const NavigationActionAsDropdownTrigger = forwardRef<HTMLButtonElement, SpiritNavigationActionProps<'a'>>(
  _NavigationActionAsDropdownTrigger as never,
);

const NavigationHorizontalWithDropdown = () => {
  const [isNavigationActionDropdownOpen, setIsNavigationActionDropdownOpen] = useState(false);

  return (
    <Navigation aria-label="Main Navigation">
      <NavigationItem>
        <NavigationAction href="/">Link</NavigationAction>
      </NavigationItem>
      <NavigationItem>
        <Dropdown
          alignmentX="stretch"
          alignmentY="stretch"
          id="dropdown-navigation"
          isOpen={isNavigationActionDropdownOpen}
          onToggle={() => setIsNavigationActionDropdownOpen(!isNavigationActionDropdownOpen)}
        >
          <DropdownTrigger elementType={NavigationActionAsDropdownTrigger as unknown as HTMLButtonElement}>
            Dropdown
            <Icon name={`chevron-${isNavigationActionDropdownOpen ? 'up' : 'down'}`} boxSize={20} />
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
export default NavigationHorizontalWithDropdown;
