import React, { type FunctionComponent } from 'react';
import { type ClickEvent } from '../../../../types';
import { Button } from '../../../Button';
import { ButtonLink } from '../../../ButtonLink';
import { Icon } from '../../../Icon';
import { Navigation, NavigationAvatar, NavigationItem } from '../../../Navigation';
import { VisuallyHidden } from '../../../VisuallyHidden';

interface SecondaryHorizontalNavigationProps {
  id: string;
  'aria-label': string;
  handleOpenDrawer: (event: ClickEvent) => void;
}

const SecondaryHorizontalNavigation: FunctionComponent<SecondaryHorizontalNavigationProps> = ({
  id,
  'aria-label': ariaLabel,
  handleOpenDrawer,
}) => (
  <Navigation marginLeft="auto" aria-label={ariaLabel}>
    <NavigationItem>
      <Button color="tertiary" size="small" isSymmetrical>
        <Icon name="search" />
        <VisuallyHidden>Search</VisuallyHidden>
      </Button>
    </NavigationItem>
    <NavigationItem alignmentY="center" hideOn={['mobile', 'tablet']}>
      <NavigationAvatar avatarContent={<Icon name="profile" />} aria-label="Profile of Jiří Bárta">
        My Account
      </NavigationAvatar>
    </NavigationItem>
    <NavigationItem hideOn={['mobile', 'tablet']}>
      <ButtonLink href="#" color="secondary" size="small">
        Log In
      </ButtonLink>
    </NavigationItem>
    <NavigationItem hideOn={['mobile', 'tablet']}>
      <ButtonLink href="#" size="small">
        Post a Job
      </ButtonLink>
    </NavigationItem>
    <NavigationItem hideOn="desktop">
      <Button
        id={`${id}-open-button`}
        color="tertiary"
        aria-label="Toggle Menu"
        aria-controls={id}
        aria-expanded="false"
        onClick={handleOpenDrawer}
        size="small"
        isSymmetrical
      >
        <Icon name="hamburger" />
      </Button>
    </NavigationItem>
  </Navigation>
);

export default SecondaryHorizontalNavigation;
