import React, { type ElementType, forwardRef, useState } from 'react';
import { type PolymorphicRef, type SpiritNavigationActionProps } from '../../../../types';
import { Dropdown, DropdownPopover, DropdownTrigger } from '../../../Dropdown';
import { Icon } from '../../../Icon';
import { Item } from '../../../Item';
import { Label } from '../../../Label';
import { NavigationAction } from '../../../Navigation';

const _NavigationActionAsDropdownTrigger = <E extends ElementType = 'a'>(
  props: SpiritNavigationActionProps<E>,
  ref: PolymorphicRef<E>,
) => <NavigationAction {...props} elementType="button" ref={ref} />;

const NavigationActionAsDropdownTrigger = forwardRef<HTMLButtonElement, SpiritNavigationActionProps<'a'>>(
  _NavigationActionAsDropdownTrigger as never,
);

export const DropdownPopoverContent = () => (
  <ul className="list-unstyled">
    <li>
      <Item elementType="a" href="https://www.example.com">
        <Label>My Account</Label>
      </Item>
    </li>
    <li>
      <Item elementType="a" href="https://www.example.com">
        <Label>Settings</Label>
      </Item>
    </li>
    <li>
      <Item elementType="a" href="https://www.example.com">
        <Label>Log Out</Label>
      </Item>
    </li>
  </ul>
);

const MainHorizontalNavigationDropdown = () => {
  const [isNavigationActionDropdownOpen, setIsNavigationActionDropdownOpen] = useState(false);

  return (
    <Dropdown
      alignmentX="stretch"
      alignmentY="stretch"
      id="navigation-action-dropdown"
      isOpen={isNavigationActionDropdownOpen}
      onToggle={() => setIsNavigationActionDropdownOpen(!isNavigationActionDropdownOpen)}
      placement="bottom-end"
    >
      <DropdownTrigger elementType={NavigationActionAsDropdownTrigger}>
        Menu
        <Icon name={`chevron-${isNavigationActionDropdownOpen ? 'up' : 'down'}`} boxSize={20} />
      </DropdownTrigger>
      <DropdownPopover>
        <DropdownPopoverContent />
      </DropdownPopover>
    </Dropdown>
  );
};

export default MainHorizontalNavigationDropdown;
