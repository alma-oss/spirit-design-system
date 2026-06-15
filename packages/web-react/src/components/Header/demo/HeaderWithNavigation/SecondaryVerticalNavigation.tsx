import React from 'react';
import { ButtonLink } from '../../../ButtonLink';
import { Navigation, NavigationItem } from '../../../Navigation';

const SecondaryVerticalNavigation = () => (
  <Navigation aria-label="Secondary Navigation" direction="vertical">
    <NavigationItem>
      <ButtonLink href="#" color="secondary">
        Log In
      </ButtonLink>
    </NavigationItem>
    <NavigationItem>
      <ButtonLink href="#">Post a Job</ButtonLink>
    </NavigationItem>
  </Navigation>
);

export default SecondaryVerticalNavigation;
