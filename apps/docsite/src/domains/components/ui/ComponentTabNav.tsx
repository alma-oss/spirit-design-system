'use client';

import { ScrollView } from '@alma-oss/spirit-web-react';
import type { ComponentTabAvailability } from '@local/domains/content/componentDocs';
import { routes, componentSegments } from '@local/domains/routing/routes';
import classNames from 'classnames';
import NextLink from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { type ReactNode } from 'react';
import ComponentBand from './ComponentBand';
import styles from './ComponentTabNav.module.scss';

interface ComponentTabNavProps {
  component: string;
  tabs: ComponentTabAvailability;
  /** Route segments of tabs that are not offered for this component. */
  hiddenTabs?: string[];
}

interface TabItem {
  href: string;
  label: ReactNode;
  segment: string;
}

const viewSegments = Object.values(componentSegments).filter((segment) => segment !== componentSegments.guidelines);

const ComponentTabNav = ({ component, tabs, hiddenTabs = [] }: ComponentTabNavProps) => {
  const selectedSegment = useSelectedLayoutSegment('views') || '';
  const selectedNav = viewSegments.includes(selectedSegment) ? selectedSegment : componentSegments.guidelines;

  const items: TabItem[] = [
    ...(tabs.overview
      ? [{ href: routes.component(component), label: 'Guidelines', segment: componentSegments.guidelines }]
      : []),
    ...(tabs.design
      ? [{ href: routes.componentTabs.design(component), label: 'Design', segment: componentSegments.design }]
      : []),
    ...(tabs.accessibility
      ? [
          {
            href: routes.componentTabs.accessibility(component),
            label: 'Accessibility',
            segment: componentSegments.accessibility,
          },
        ]
      : []),
    ...(tabs.figma
      ? [{ href: routes.componentTabs.figma(component), label: 'Figma', segment: componentSegments.figma }]
      : []),
    { href: routes.componentTabs.web(component), label: 'Web', segment: componentSegments.web },
    { href: routes.componentTabs.react(component), label: 'React', segment: componentSegments.react },
    {
      href: routes.componentTabs.webPreview(component),
      label: <>Web&nbsp;(Preview)</>,
      segment: componentSegments.webPreview,
    },
    {
      href: routes.componentTabs.reactPreview(component),
      label: <>React&nbsp;(Preview)</>,
      segment: componentSegments.reactPreview,
    },
  ];

  return (
    <ComponentBand variant="tabs">
      <nav aria-label="Component documentation" className={styles.ComponentTabNav}>
        <ScrollView direction="horizontal" isScrollbarDisabled>
          {/* Spirit Tabs styling applied to route links; the React Tabs component only supports in-page panes. */}
          <ul className={classNames('Tabs', styles.ComponentTabNav__list)}>
            {items
              .filter((item) => !hiddenTabs.includes(item.segment))
              .map((item) => (
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
    </ComponentBand>
  );
};

export default ComponentTabNav;
