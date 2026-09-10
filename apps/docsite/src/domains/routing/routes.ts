import { componentNameToSlug } from '../components/utils/componentSlug';
import documentationSchema from '../content/documentation.schema.json';

const ROUTE_DELIMITER = '/';

export const componentDocTabs = documentationSchema.componentDocs.tabs;

export type ComponentDocTab = (typeof componentDocTabs)[number];

export const componentDocsDirectory = documentationSchema.componentDocs.directory;

export const componentSegments = {
  guidelines: 'guidelines',
  design: 'design',
  accessibility: 'accessibility',
  figma: 'figma',
  web: 'web',
  react: 'react',
  webPreview: 'web-preview',
  reactPreview: 'react-preview',
};

const componentsRoute = `${ROUTE_DELIMITER}components`;

const componentRoute = (componentName: string) => `${componentsRoute}/${componentNameToSlug(componentName)}`;

const componentTabRoute = (componentName: string, segment: string) =>
  `${componentRoute(componentName)}${ROUTE_DELIMITER}${segment}`;

export const routes = {
  homepage: ROUTE_DELIMITER,
  introduction: `${ROUTE_DELIMITER}introduction`,
  design: `${ROUTE_DELIMITER}design`,
  components: componentsRoute,
  icons: `${ROUTE_DELIMITER}icons`,
  helpers: `${ROUTE_DELIMITER}helpers`,
  development: `${ROUTE_DELIMITER}development`,
  migrations: `${ROUTE_DELIMITER}migrations`,
  releases: `${ROUTE_DELIMITER}releases`,
  helper: (helperName: string) => `${routes.helpers}${ROUTE_DELIMITER}${helperName}`,
  component: componentRoute,
  componentTabs: {
    guidelines: (componentName: string) => componentTabRoute(componentName, componentSegments.guidelines),
    design: (componentName: string) => componentTabRoute(componentName, componentSegments.design),
    accessibility: (componentName: string) => componentTabRoute(componentName, componentSegments.accessibility),
    figma: (componentName: string) => componentTabRoute(componentName, componentSegments.figma),
    web: (componentName: string) => componentTabRoute(componentName, componentSegments.web),
    react: (componentName: string) => componentTabRoute(componentName, componentSegments.react),
    webPreview: (componentName: string) => componentTabRoute(componentName, componentSegments.webPreview),
    reactPreview: (componentName: string) => componentTabRoute(componentName, componentSegments.reactPreview),
  },
};
