import React from 'react';
import { Collapse } from '../../../Collapse';
import { NavigationAction, NavigationItem } from '../../../Navigation';

const CollapseNavigation = ({ isOpen }: { isOpen: boolean }) => (
  <Collapse id="collapse-navigation" isOpen={isOpen}>
    <ul>
      <NavigationItem>
        <NavigationAction href="https://www.example.com">My Account</NavigationAction>
      </NavigationItem>
      <NavigationItem>
        <NavigationAction href="https://www.example.com">Settings</NavigationAction>
      </NavigationItem>
      <NavigationItem>
        <NavigationAction href="https://www.example.com">Log Out</NavigationAction>
      </NavigationItem>
    </ul>
  </Collapse>
);

export default CollapseNavigation;
