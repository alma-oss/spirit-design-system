'use client';

import { Navigation, NavigationAction, NavigationItem } from '@alma-oss/spirit-web-react';
import { componentSegments } from '@local/domains/routing/routes';
import NextLink from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { type ReactNode } from 'react';

export interface TabItem {
  href: string;
  label: ReactNode;
  segment: string;
}

interface ComponentTabNavigationItemsProps {
  items: TabItem[];
}

const viewSegments = Object.values(componentSegments).filter((segment) => segment !== componentSegments.guidelines);

const ComponentTabNavigationItems = ({ items }: ComponentTabNavigationItemsProps) => {
  const selectedSegment = useSelectedLayoutSegment('views') || '';
  const selectedNav = viewSegments.includes(selectedSegment) ? selectedSegment : componentSegments.guidelines;

  return (
    <Navigation aria-label="Component documentation">
      {items.map((item) => (
        <NavigationItem key={item.segment}>
          <NavigationAction
            elementType={NextLink}
            href={item.href}
            {...{ 'aria-current': selectedNav === item.segment ? 'page' : undefined }}
            isSelected={selectedNav === item.segment}
          >
            {item.label}
          </NavigationAction>
        </NavigationItem>
      ))}
    </Navigation>
  );
};

export default ComponentTabNavigationItems;
