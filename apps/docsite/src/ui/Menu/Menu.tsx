'use client';

import { Navigation, NavigationAction, NavigationItem } from '@alma-oss/spirit-web-react';
import { routes } from '@local/domains/routing/routes';
import useIsPage from '@local/hooks/useIsPage';
import NextLink from 'next/link';
import React from 'react';

const Menu = () => {
  const isComponentsPage = useIsPage(routes.components);

  return (
    <Navigation aria-label="Main Navigation" hideOn={['mobile', 'tablet']}>
      <NavigationItem>
        <NavigationAction
          elementType={NextLink}
          variant="pill"
          href={routes.components}
          {...(isComponentsPage && { 'aria-current': true })}
          isSelected={isComponentsPage}
        >
          Components
        </NavigationAction>
      </NavigationItem>
    </Navigation>
  );
};

export default Menu;
