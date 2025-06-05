'use client';

import { Navigation, NavigationAction, NavigationItem, Section, Flex, Container } from '@alma-oss/spirit-web-react';
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
    <Section>
      <Flex alignmentX="center" marginBottom="space-1200">
        <Navigation aria-label="Main Navigation">
          <NavigationItem>
            <NavigationAction
              elementType={NextLink}
              href={routes.component(component)}
              aria-current="page"
              isSelected={selectedNav === componentSegments.guidelines}
            >
              Guidelines
            </NavigationAction>
          </NavigationItem>
          <NavigationItem>
            <NavigationAction
              elementType={NextLink}
              href={routes.design(component)}
              aria-current="page"
              isSelected={selectedNav === componentSegments.design}
            >
              Design
            </NavigationAction>
          </NavigationItem>
          <NavigationItem>
            <NavigationAction
              elementType={NextLink}
              href={routes.web(component)}
              aria-current="page"
              isSelected={selectedNav === componentSegments.web}
            >
              Web
            </NavigationAction>
          </NavigationItem>
          <NavigationItem>
            <NavigationAction
              elementType={NextLink}
              href={routes.react(component)}
              aria-current="page"
              isSelected={selectedNav === componentSegments.react}
            >
              React
            </NavigationAction>
          </NavigationItem>
          <NavigationItem>
            <NavigationAction
              elementType={NextLink}
              href={routes.webPreview(component)}
              aria-current="page"
              isSelected={selectedNav === componentSegments.webPreview}
            >
              Web (Preview)
            </NavigationAction>
          </NavigationItem>
          <NavigationItem>
            <NavigationAction
              elementType={NextLink}
              href={routes.reactPreview(component)}
              aria-current="page"
              isSelected={selectedNav === componentSegments.reactPreview}
            >
              React (Preview)
            </NavigationAction>
          </NavigationItem>
        </Navigation>
      </Flex>
      <Container>{views}</Container>
    </Section>
  );
};

export default ViewsLayout;
