import { Navigation, NavigationAction, NavigationItem } from '@alma-oss/spirit-web-react';
import React from 'react';

const NavigationPreview = () => (
  <Navigation aria-label="Main">
    <NavigationItem>
      <NavigationAction href="#">Home</NavigationAction>
    </NavigationItem>
    <NavigationItem>
      <NavigationAction href="#" isSelected aria-current="page">
        Jobs
      </NavigationAction>
    </NavigationItem>
    <NavigationItem>
      <NavigationAction href="#">About</NavigationAction>
    </NavigationItem>
  </Navigation>
);

export default NavigationPreview;
