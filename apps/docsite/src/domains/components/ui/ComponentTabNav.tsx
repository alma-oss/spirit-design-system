'use client';

import {
  Container,
  Navigation,
  NavigationAction,
  NavigationItem,
  Section,
  ScrollView,
} from '@alma-oss/spirit-web-react';
import type { ComponentTabAvailability } from '@local/domains/content/repository';
import { routes, componentSegments } from '@local/domains/routing/routes';
import NextLink from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { type ReactNode } from 'react';

interface ComponentTabNavProps {
  views: ReactNode;
  component: string;
  tabs: ComponentTabAvailability;
}

interface TabItem {
  href: string;
  label: ReactNode;
  segment: string;
}

const viewSegments = Object.values(componentSegments).filter((segment) => segment !== componentSegments.guidelines);

const ComponentTabNav = ({ views, component, tabs }: ComponentTabNavProps) => {
  const selectedSegment = useSelectedLayoutSegment('views') || '';
  const selectedNav = viewSegments.includes(selectedSegment) ? selectedSegment : componentSegments.guidelines;

  const items: TabItem[] = [
    ...(tabs.overview
      ? [{ href: routes.component(component), label: 'Guidelines', segment: componentSegments.guidelines }]
      : []),
    ...(tabs.design ? [{ href: routes.design(component), label: 'Design', segment: componentSegments.design }] : []),
    ...(tabs.accessibility
      ? [
          {
            href: routes.accessibility(component),
            label: 'Accessibility',
            segment: componentSegments.accessibility,
          },
        ]
      : []),
    ...(tabs.figma ? [{ href: routes.figma(component), label: 'Figma', segment: componentSegments.figma }] : []),
    { href: routes.web(component), label: 'Web', segment: componentSegments.web },
    { href: routes.react(component), label: 'React', segment: componentSegments.react },
    { href: routes.webPreview(component), label: <>Web&nbsp;(Preview)</>, segment: componentSegments.webPreview },
    { href: routes.reactPreview(component), label: <>React&nbsp;(Preview)</>, segment: componentSegments.reactPreview },
  ];

  return (
    <>
      <section className="d-grid breakout-container">
        <Container>
          <div className="d-grid">
            <ScrollView direction="horizontal" isScrollbarDisabled overflowDecorators="shadows">
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
            </ScrollView>
          </div>
        </Container>
      </section>
      <Section size="xlarge">{views}</Section>
    </>
  );
};

export default ComponentTabNav;
