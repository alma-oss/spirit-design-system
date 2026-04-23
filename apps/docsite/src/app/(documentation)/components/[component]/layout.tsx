'use client';

import {
  Container,
  Navigation,
  NavigationAction,
  NavigationItem,
  Section,
  ScrollView,
} from '@alma-oss/spirit-web-react';
import { routes, componentSegments } from '@local/domains/routing/routes';
import NextLink from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { use, type ReactNode } from 'react';

interface ViewsLayoutProps {
  views: ReactNode;
  params: Promise<{ component: string }>;
}

const viewSegments = Object.values(componentSegments).filter((segment) => segment !== componentSegments.guidelines);

const ViewsLayout = ({ views, params }: ViewsLayoutProps) => {
  const { component } = use(params);
  const selectedSegment = useSelectedLayoutSegment('views') || '';
  const selectedNav = viewSegments.includes(selectedSegment) ? selectedSegment : componentSegments.guidelines;

  return (
    <>
      <section className="d-grid breakout-container">
        <Container>
          <div className="d-grid">
            <ScrollView direction="horizontal" isScrollbarDisabled overflowDecorators="shadows">
              <Navigation aria-label="Main Navigation">
                <NavigationItem>
                  <NavigationAction
                    elementType={NextLink}
                    href={routes.component(component)}
                    {...{ 'aria-current': selectedNav === componentSegments.guidelines ? 'page' : undefined }}
                    isSelected={selectedNav === componentSegments.guidelines}
                  >
                    Guidelines
                  </NavigationAction>
                </NavigationItem>
                <NavigationItem>
                  <NavigationAction
                    elementType={NextLink}
                    href={routes.design(component)}
                    {...{ 'aria-current': selectedNav === componentSegments.design ? 'page' : undefined }}
                    isSelected={selectedNav === componentSegments.design}
                  >
                    Design
                  </NavigationAction>
                </NavigationItem>
                <NavigationItem>
                  <NavigationAction
                    elementType={NextLink}
                    href={routes.web(component)}
                    {...{ 'aria-current': selectedNav === componentSegments.web ? 'page' : undefined }}
                    isSelected={selectedNav === componentSegments.web}
                  >
                    Web
                  </NavigationAction>
                </NavigationItem>
                <NavigationItem>
                  <NavigationAction
                    elementType={NextLink}
                    href={routes.react(component)}
                    {...{ 'aria-current': selectedNav === componentSegments.react ? 'page' : undefined }}
                    isSelected={selectedNav === componentSegments.react}
                  >
                    React
                  </NavigationAction>
                </NavigationItem>
                <NavigationItem>
                  <NavigationAction
                    elementType={NextLink}
                    href={routes.webPreview(component)}
                    {...{ 'aria-current': selectedNav === componentSegments.webPreview ? 'page' : undefined }}
                    isSelected={selectedNav === componentSegments.webPreview}
                  >
                    Web&nbsp;(Preview)
                  </NavigationAction>
                </NavigationItem>
                <NavigationItem>
                  <NavigationAction
                    elementType={NextLink}
                    href={routes.reactPreview(component)}
                    {...{ 'aria-current': selectedNav === componentSegments.reactPreview ? 'page' : undefined }}
                    isSelected={selectedNav === componentSegments.reactPreview}
                  >
                    React&nbsp;(Preview)
                  </NavigationAction>
                </NavigationItem>
              </Navigation>
            </ScrollView>
          </div>
        </Container>
      </section>
      <Section size="xlarge">{views}</Section>
    </>
  );
};

export default ViewsLayout;
