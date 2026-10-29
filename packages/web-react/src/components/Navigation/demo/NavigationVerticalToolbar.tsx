import React from 'react';
import Navigation from '../Navigation';
import NavigationAction from '../NavigationAction';
import NavigationItem from '../NavigationItem';

const NavigationVerticalToolbar = () => (
  <Navigation role="toolbar" direction="vertical" aria-label="Vertical toolbar">
    <NavigationItem>
      <NavigationAction href="#" variant="pill">
        Preview
      </NavigationAction>
    </NavigationItem>
    <NavigationItem>
      <NavigationAction elementType="button" type="button" variant="pill">
        Download
      </NavigationAction>
    </NavigationItem>
    <NavigationItem>
      <NavigationAction href="#" variant="pill" isDisabled>
        Disabled
      </NavigationAction>
    </NavigationItem>
    <NavigationItem>
      <NavigationAction elementType="button" type="button" variant="pill">
        Delete
      </NavigationAction>
    </NavigationItem>
  </Navigation>
);
export default NavigationVerticalToolbar;
