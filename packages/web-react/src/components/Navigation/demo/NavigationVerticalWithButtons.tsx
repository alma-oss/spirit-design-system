import React from 'react';
import { ButtonLink } from '../../ButtonLink';
import Navigation from '../Navigation';
import NavigationItem from '../NavigationItem';

const NavigationVerticalWithButtons = () => (
  <Navigation aria-label="Vertical Navigation with Buttons" direction="vertical">
    <NavigationItem>
      <ButtonLink href="#">Button</ButtonLink>
    </NavigationItem>
    <NavigationItem>
      <ButtonLink href="#" color="secondary">
        Button
      </ButtonLink>
    </NavigationItem>
  </Navigation>
);
export default NavigationVerticalWithButtons;
