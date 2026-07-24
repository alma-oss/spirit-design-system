import React from 'react';
import Navigation from '../Navigation';
import NavigationAction from '../NavigationAction';
import NavigationItem from '../NavigationItem';

const NavigationVerticalWithPillAction = () => (
  <Navigation aria-label="Vertical Navigation with Pill NavigationAction" direction="vertical">
    <NavigationItem>
      <NavigationAction href="/" variant="pill">
        Link
      </NavigationAction>
    </NavigationItem>
    <NavigationItem>
      <NavigationAction href="/" variant="pill" aria-current="page" isSelected>
        Selected
      </NavigationAction>
    </NavigationItem>
    <NavigationItem>
      <NavigationAction href="/" variant="pill" isDisabled>
        Disabled
      </NavigationAction>
    </NavigationItem>
  </Navigation>
);
export default NavigationVerticalWithPillAction;
