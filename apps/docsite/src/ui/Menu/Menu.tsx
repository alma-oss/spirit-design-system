'use client';

import { Navigation, NavigationAction, NavigationItem } from '@alma-oss/spirit-web-react';
import NextLink from 'next/link';
import React from 'react';
import useIsPage from '@local/hooks/useIsPage';

const Menu = () => {
  const isComponentsPage = useIsPage('components');

  return (
    <Navigation aria-label="Main Navigation" hideOn={['mobile', 'tablet']}>
      <NavigationItem>
        <NavigationAction
          elementType={NextLink}
          variant="pill"
          href="/components"
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
