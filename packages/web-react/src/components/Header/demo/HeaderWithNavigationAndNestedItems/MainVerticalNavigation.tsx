import React from 'react';
import { useCollapse } from '../../../Collapse';
import { Icon } from '../../../Icon';
import { Navigation, NavigationAction, NavigationItem } from '../../../Navigation';
import CollapseNavigation from './CollapseNavigation';

const DrawerWithNavigation = () => {
  const { isOpen: isCollapseOpen, toggleHandler: toggleCollapseHandler } = useCollapse(false);

  return (
    <Navigation aria-label="Main Navigation" direction="vertical">
      <NavigationItem>
        <NavigationAction href="#" isSelected>
          Selected
        </NavigationAction>
      </NavigationItem>
      <NavigationItem>
        <NavigationAction href="#">Link</NavigationAction>
      </NavigationItem>
      <NavigationItem>
        <NavigationAction elementType="button" aria-expanded={isCollapseOpen} onClick={toggleCollapseHandler}>
          Menu
          <Icon name={`chevron-${isCollapseOpen ? 'up' : 'down'}`} />
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
