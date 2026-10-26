import React from 'react';
import { Toolbar } from '../../Toolbar';
import Navigation from '../Navigation';
import NavigationAction from '../NavigationAction';
import NavigationItem from '../NavigationItem';

const NavigationVerticalToolbar = () => (
  <Toolbar orientation="vertical" aria-label="CV actions">
    <Navigation>
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
  </Toolbar>
);
export default NavigationVerticalToolbar;
