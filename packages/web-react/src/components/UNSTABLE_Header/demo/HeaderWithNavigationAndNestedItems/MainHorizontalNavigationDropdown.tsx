import React, { type ElementType, forwardRef, useState } from 'react';
import { type PolymorphicRef, type SpiritNavigationActionProps } from '../../../../types';
import { Dropdown, DropdownPopover, DropdownTrigger } from '../../../Dropdown';
import { Icon } from '../../../Icon';
import { Item } from '../../../Item';
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
      <Item elementType="a" label="My Account" href="https://www.example.com" />
    </li>
    <li>
      <Item elementType="a" label="Settings" href="https://www.example.com" />
    </li>
    <li>
      <Item elementType="a" label="Log Out" href="https://www.example.com" />
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
      <DropdownTrigger elementType={NavigationActionAsDropdownTrigger as unknown as HTMLButtonElement}>
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
