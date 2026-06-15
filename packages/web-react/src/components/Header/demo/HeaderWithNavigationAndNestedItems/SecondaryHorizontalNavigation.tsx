import React, { type FunctionComponent } from 'react';
import { type ClickEvent } from '../../../../types';
import { Button } from '../../../Button';
import { ButtonLink } from '../../../ButtonLink';
import { Icon } from '../../../Icon';
import { Navigation, NavigationItem } from '../../../Navigation';
import { VisuallyHidden } from '../../../VisuallyHidden';
import SecondaryHorizontalNavigationDropdown from '../HeaderWithNavigation/SecondaryHorizontalNavigationDropdown';

interface SecondaryHorizontalNavigationProps {
  handleOpenDrawer: (event: ClickEvent) => void;
}

const SecondaryHorizontalNavigation: FunctionComponent<SecondaryHorizontalNavigationProps> = ({ handleOpenDrawer }) => (
  <Navigation marginLeft="auto" aria-label="Secondary Navigation">
    <NavigationItem>
      <Button color="tertiary" isSymmetrical>
        <Icon name="search" />
        <VisuallyHidden>Search</VisuallyHidden>
      </Button>
    </NavigationItem>
    <NavigationItem alignmentY="stretch" hideOn={['mobile', 'tablet']}>
      <SecondaryHorizontalNavigationDropdown id="dropdown-avatar" isSquare />
    </NavigationItem>
    <NavigationItem hideOn={['mobile', 'tablet']}>
      <ButtonLink href="#" color="secondary">
        Log Out
      </ButtonLink>
    </NavigationItem>
    <NavigationItem hideOn={['mobile', 'tablet']}>
      <ButtonLink href="#">Post a Job</ButtonLink>
    </NavigationItem>
    <NavigationItem hideOn="desktop">
      <Button
        id="drawer-navigation-expanded-open-button"
        color="tertiary"
        aria-label="Toggle Menu"
        aria-controls="drawer-navigation-expanded"
        aria-expanded="false"
        onClick={handleOpenDrawer}
        isSymmetrical
      >
        <Icon name="hamburger" />
      </Button>
    </NavigationItem>
  </Navigation>
);

export default SecondaryHorizontalNavigation;
