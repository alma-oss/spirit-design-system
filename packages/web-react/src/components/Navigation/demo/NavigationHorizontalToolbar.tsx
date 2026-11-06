import React from 'react';
import { Button } from '../../Button';
import { Toolbar } from '../../Toolbar';
import Navigation from '../Navigation';
import NavigationAction from '../NavigationAction';
import NavigationItem from '../NavigationItem';

const NavigationHorizontalToolbar = () => (
  <Toolbar aria-label="Document actions">
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
        <Button color="secondary">Share</Button>
      </NavigationItem>
    </Navigation>
  </Toolbar>
);
export default NavigationHorizontalToolbar;
