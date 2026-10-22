import { ScrollView } from '@alma-oss/spirit-web-react';
import { COMPONENTS_BAND_VARIANTS, ComponentsBand } from '@local/domains/components/features/component-list';
import { getComponentViewsAvailability } from '@local/domains/components/repositories/componentsRepository';
import ComponentTabNavigationItems, { type TabItem } from '@local/domains/components/ui/ComponentTabNavigationItems';
import { getComponentTabAvailability } from '@local/domains/content/componentDocs';
import { routes, componentSegments } from '@local/domains/routing/routes';

interface ComponentTabNavigationProps {
  component: string;
  /** Route segments of tabs that are not offered for this component. */
  hiddenTabs?: string[];
}

const ComponentTabNavigation = async ({ component, hiddenTabs = [] }: ComponentTabNavigationProps) => {
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
    <ComponentsBand variant={COMPONENTS_BAND_VARIANTS.TABS}>
      <div className="d-grid">
        <ScrollView direction="horizontal" isScrollbarDisabled>
          <ComponentTabNavigationItems items={items.filter((item) => !hiddenTabs.includes(item.segment))} />
        </ScrollView>
      </div>
    </ComponentsBand>
  );
};

export default ComponentTabNavigation;
export { ComponentTabNavigation };
