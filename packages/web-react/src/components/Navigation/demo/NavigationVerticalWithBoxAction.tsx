import React from 'react';
import Navigation from '../Navigation';
import NavigationAction from '../NavigationAction';
import NavigationItem from '../NavigationItem';

const NavigationVerticalWithBoxAction = () => (
  <Navigation aria-label="Vertical Navigation with Box NavigationAction" direction="vertical">
    <NavigationItem>
      <NavigationAction href="/">Link</NavigationAction>
    </NavigationItem>
    <NavigationItem>
      <NavigationAction href="/" aria-current="page" isSelected>
        Selected
      </NavigationAction>
    </NavigationItem>
    <NavigationItem>
      <NavigationAction href="/" isDisabled>
        Disabled
      </NavigationAction>
    </NavigationItem>
  </Navigation>
);
export default NavigationVerticalWithBoxAction;
