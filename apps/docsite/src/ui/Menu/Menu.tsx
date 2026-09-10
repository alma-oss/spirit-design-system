'use client';

import { Navigation, NavigationAction, NavigationItem } from '@alma-oss/spirit-web-react';
import { docSectionRoutes, routes } from '@local/domains/routing/routes';
import useIsSection from '@local/hooks/useIsSection';
import NextLink from 'next/link';
import React from 'react';

const isAriaCurrent = (condition: boolean) => (condition ? { 'aria-current': true as const } : {});

const ITEMS = [
  { label: 'Introduction', href: docSectionRoutes.introduction },
  { label: 'Design', href: docSectionRoutes.design },
  { label: 'Components', href: docSectionRoutes.components },
  { label: 'Icons', href: routes.icons },
  { label: 'Helpers', href: routes.helpers },
  { label: 'Development', href: docSectionRoutes.development },
  { label: 'Migrations', href: docSectionRoutes.migrations },
  { label: 'Releases', href: docSectionRoutes.releases },
] as const;

const MenuItem = ({ href, label }: { href: string; label: string }) => {
  const isCurrent = useIsSection(href);

  return (
    <NavigationItem>
      <NavigationAction
        elementType={NextLink}
        variant="pill"
        href={href}
        {...isAriaCurrent(isCurrent)}
        isSelected={isCurrent}
      >
        {label}
      </NavigationAction>
    </NavigationItem>
  );
};

const Menu = () => (
  <Navigation aria-label="Main Navigation" hideOn={['mobile', 'tablet']}>
    {ITEMS.map((item) => (
      <MenuItem key={item.href} href={item.href} label={item.label} />
    ))}
  </Navigation>
);

export default Menu;
