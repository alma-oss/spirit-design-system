import React from 'react';
import { useCollapse } from '../../../Collapse';
import { Icon } from '../../../Icon';
import { Navigation, NavigationAction, NavigationItem } from '../../../Navigation';
import CollapseNavigation from './CollapseNavigation';

interface DrawerWithNavigationProps {
  'aria-label': string;
}

const DrawerWithNavigation = ({ 'aria-label': ariaLabel }: DrawerWithNavigationProps) => {
  const { isOpen: isCollapseOpen, toggleHandler: toggleCollapseHandler } = useCollapse(false);

  return (
    <Navigation aria-label={ariaLabel} direction="vertical">
      <NavigationItem>
        <NavigationAction href="#" aria-current="page" isSelected>
          Selected
        </NavigationAction>
      </NavigationItem>
      <NavigationItem>
        <NavigationAction href="#">Link</NavigationAction>
      </NavigationItem>
      <NavigationItem>
        <NavigationAction
          elementType="button"
          aria-expanded={isCollapseOpen}
          onClick={toggleCollapseHandler}
          endSlot={<Icon name={`chevron-${isCollapseOpen ? 'up' : 'down'}`} />}
        >
          Menu
        </NavigationAction>
        <CollapseNavigation isOpen={isCollapseOpen} />
      </NavigationItem>
      <NavigationItem>
        <NavigationAction href="#" isDisabled>
          Disabled
        </NavigationAction>
      </NavigationItem>
    </Navigation>
  );
};
export default DrawerWithNavigation;
