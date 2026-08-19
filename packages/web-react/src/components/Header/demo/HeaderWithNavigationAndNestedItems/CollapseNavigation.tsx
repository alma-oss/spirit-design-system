import React from 'react';
import { type PanelAriaProps } from '../../../../hooks/disclosure';
import { Collapse } from '../../../Collapse';
import { NavigationAction, NavigationItem } from '../../../Navigation';

const CollapseNavigation = ({ isOpen, panelAriaProps }: { isOpen: boolean; panelAriaProps: PanelAriaProps }) => (
  <Collapse {...panelAriaProps} isOpen={isOpen}>
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
