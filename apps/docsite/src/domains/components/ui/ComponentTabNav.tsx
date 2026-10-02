import { Container, Section, ScrollView } from '@alma-oss/spirit-web-react';
import { getComponentViewsAvailability } from '@local/domains/components/repositories/componentsRepository';
import ComponentTabNavItems, { type TabItem } from '@local/domains/components/ui/ComponentTabNavItems';
import { getComponentTabAvailability } from '@local/domains/content/componentDocs';
import { routes, componentSegments } from '@local/domains/routing/routes';
import { type ReactNode } from 'react';

interface ComponentTabNavProps {
  views: ReactNode;
  component: string;
}

const ComponentTabNav = async ({ views, component }: ComponentTabNavProps) => {
  const tabs = await getComponentTabAvailability(component);
  const sources = getComponentViewsAvailability(component);

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
    ...(sources.web
      ? [{ href: routes.componentTabs.web(component), label: 'Web', segment: componentSegments.web }]
      : []),
    ...(sources.react
      ? [{ href: routes.componentTabs.react(component), label: 'React', segment: componentSegments.react }]
      : []),
    ...(sources.webPreview
      ? [
          {
            href: routes.componentTabs.webPreview(component),
            label: <>Web&nbsp;(Preview)</>,
            segment: componentSegments.webPreview,
          },
        ]
      : []),
    ...(sources.reactPreview
      ? [
          {
            href: routes.componentTabs.reactPreview(component),
            label: <>React&nbsp;(Preview)</>,
            segment: componentSegments.reactPreview,
          },
        ]
      : []),
  ];

  return (
    <>
      <Container>
        <div className="d-grid">
          <ScrollView direction="horizontal" isScrollbarDisabled>
            <ComponentTabNavItems items={items} />
          </ScrollView>
        </div>
      </Container>
      <Section size="xlarge">{views}</Section>
    </>
  );
};

export default ComponentTabNav;
