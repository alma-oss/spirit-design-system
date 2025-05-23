import { Navigation, NavigationAction, NavigationItem } from '@alma-oss/spirit-web-react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Menu = () => {
  const currentPage = usePathname();
  const isComponentsPage = currentPage.includes('components');

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
