'use client';

import { ScrollView } from '@alma-oss/spirit-web-react';
import { componentSegments } from '@local/domains/routing/routes';
import classNames from 'classnames';
import NextLink from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { type ReactNode } from 'react';
import styles from './ComponentTabNav.module.scss';

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
    <nav aria-label="Component documentation" className={styles.ComponentTabNav}>
      <ScrollView direction="horizontal" isScrollbarDisabled>
        {/* Spirit Tabs styling applied to route links; the React Tabs component only supports in-page panes. */}
        <ul className={classNames('Tabs', styles.ComponentTabNav__list)}>
          {items.map((item) => (
            <li key={item.segment} className="Tabs__item">
              <NextLink
                href={item.href}
                className={classNames('Tabs__link', { 'is-selected': selectedNav === item.segment })}
                aria-current={selectedNav === item.segment ? 'page' : undefined}
              >
                {item.label}
              </NextLink>
            </li>
          ))}
        </ul>
      </ScrollView>
    </nav>
  );
};

export default ComponentTabNavigationItems;
