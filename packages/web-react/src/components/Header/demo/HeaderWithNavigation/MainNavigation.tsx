import React from 'react';
import { Direction, ShapeVariants, isDirectionHorizontal } from '../../../../constants';
import { type NavigationActionVariantsType, type SpiritNavigationProps } from '../../../../types';
import { Navigation, NavigationAction, NavigationItem } from '../../../Navigation';

interface MainNavigationProps extends Partial<SpiritNavigationProps> {
  'aria-label'?: string;
  variant?: NavigationActionVariantsType;
}

export const MainNavigation = ({
  'aria-label': ariaLabel,
  direction = Direction.HORIZONTAL,
  variant = ShapeVariants.BOX,
}: Partial<MainNavigationProps>) => (
  <Navigation
    aria-label={ariaLabel}
    direction={direction}
    {...(isDirectionHorizontal(direction) ? { hideOn: ['mobile', 'tablet'] } : {})}
  >
    <NavigationItem>
      <NavigationAction href="#" variant={variant} aria-current="page" isSelected>
        Job Offers
      </NavigationAction>
    </NavigationItem>
    <NavigationItem>
      <NavigationAction href="#" variant={variant}>
        Magazine
      </NavigationAction>
    </NavigationItem>
    <NavigationItem>
      <NavigationAction href="#" variant={variant}>
        Contact
      </NavigationAction>
    </NavigationItem>
  </Navigation>
);

export default MainNavigation;
