import { componentNameToSlug } from '../components/utils/componentSlug';

const ROUTE_DELIMITER = '/';

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

export const docSectionRoutes = {
  introduction: `${ROUTE_DELIMITER}introduction`,
  design: `${ROUTE_DELIMITER}design`,
  components: `${ROUTE_DELIMITER}components`,
  development: `${ROUTE_DELIMITER}development`,
  migrations: `${ROUTE_DELIMITER}migrations`,
  releases: `${ROUTE_DELIMITER}releases`,
};

export const routes = {
  homepage: ROUTE_DELIMITER,
  components: docSectionRoutes.components,
  component: (componentName: string) => `${routes.components}/${componentNameToSlug(componentName)}`,
  guidelines: (componentName: string) =>
    `${routes.component(componentName)}${ROUTE_DELIMITER}${componentSegments.guidelines}`,
  design: (componentName: string) => `${routes.component(componentName)}${ROUTE_DELIMITER}${componentSegments.design}`,
  accessibility: (componentName: string) =>
    `${routes.component(componentName)}${ROUTE_DELIMITER}${componentSegments.accessibility}`,
  figma: (componentName: string) => `${routes.component(componentName)}${ROUTE_DELIMITER}${componentSegments.figma}`,
  web: (componentName: string) => `${routes.component(componentName)}${ROUTE_DELIMITER}${componentSegments.web}`,
  react: (componentName: string) => `${routes.component(componentName)}${ROUTE_DELIMITER}${componentSegments.react}`,
  webPreview: (componentName: string) =>
    `${routes.component(componentName)}${ROUTE_DELIMITER}${componentSegments.webPreview}`,
  reactPreview: (componentName: string) =>
    `${routes.component(componentName)}${ROUTE_DELIMITER}${componentSegments.reactPreview}`,
};
