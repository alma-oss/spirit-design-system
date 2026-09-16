'use client';

import { Navigation, NavigationAction, NavigationItem } from '@alma-oss/spirit-web-react';
import { routes } from '@local/domains/routing/routes';
import useIsPage from '@local/hooks/useIsPage';
import NextLink from 'next/link';
import React from 'react';

const isAriaCurrent = (condition: boolean) => (condition ? { 'aria-current': true as const } : {});

const Menu = () => {
  const isComponentsPage = useIsPage(routes.components);
  const isIconPage = useIsPage(routes.icons);
  const isHelpersPage = useIsPage(routes.helpers);

  return (
    <Navigation aria-label="Main Navigation" hideOn={['mobile', 'tablet']}>
      <NavigationItem>
        <NavigationAction
          elementType={NextLink}
          variant="pill"
          href={routes.components}
          {...isAriaCurrent(isComponentsPage)}
          isSelected={isComponentsPage}
        >
          Components
        </NavigationAction>
      </NavigationItem>
      <NavigationItem>
        <NavigationAction
          elementType={NextLink}
          variant="pill"
          href={routes.icons}
          {...isAriaCurrent(isIconPage)}
          isSelected={isIconPage}
        >
          Icons
        </NavigationAction>
      </NavigationItem>
      <NavigationItem>
        <NavigationAction
          elementType={NextLink}
          variant="pill"
          href={routes.helpers}
          {...isAriaCurrent(isHelpersPage)}
          isSelected={isHelpersPage}
        >
          Helpers
        </NavigationAction>
      </NavigationItem>
    </Navigation>
  );
};

export default Menu;
