import React from 'react';
import { Navigation, NavigationAction, NavigationItem } from '../../../Navigation';
import MainHorizontalNavigationDropdown from './MainHorizontalNavigationDropdown';

interface MainHorizontalNavigationProps {
  'aria-label': string;
}

export const MainHorizontalNavigation = ({ 'aria-label': ariaLabel }: MainHorizontalNavigationProps) => (
  <Navigation aria-label={ariaLabel} hideOn={['mobile', 'tablet']}>
    <NavigationItem>
      <NavigationAction href="#" aria-current="page" isSelected>
        Selected
      </NavigationAction>
    </NavigationItem>
    <NavigationItem>
      <NavigationAction href="#">Link</NavigationAction>
    </NavigationItem>
    <NavigationItem>
      <MainHorizontalNavigationDropdown />
    </NavigationItem>
    <NavigationItem>
      <NavigationAction href="#" isDisabled>
        Disabled
      </NavigationAction>
    </NavigationItem>
  </Navigation>
);

export default MainHorizontalNavigation;
