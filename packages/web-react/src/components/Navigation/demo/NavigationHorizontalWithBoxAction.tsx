import React from 'react';
import Navigation from '../Navigation';
import NavigationAction from '../NavigationAction';
import NavigationItem from '../NavigationItem';

const NavigationHorizontalWithBoxAction = () => (
  <Navigation aria-label="Horizontal Navigation with Box NavigationAction">
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
export default NavigationHorizontalWithBoxAction;
