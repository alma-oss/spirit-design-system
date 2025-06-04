import { componentNameToSlug } from '../components/utils/componentSlug';

const ROUTE_DELIMITER = '/';

export const componentSegments = {
  guidelines: 'guidelines',
  design: 'design',
  web: 'web',
  react: 'react',
  webPreview: 'web-preview',
  reactPreview: 'react-preview',
};

export const routes = {
  homepage: ROUTE_DELIMITER,
  components: `${ROUTE_DELIMITER}components`,
  component: (componentName: string) => `${routes.components}/${componentNameToSlug(componentName)}`,
  guidelines: (componentName: string) =>
    `${routes.component(componentName)}${ROUTE_DELIMITER}${componentSegments.guidelines}`,
  design: (componentName: string) => `${routes.component(componentName)}${ROUTE_DELIMITER}${componentSegments.design}`,
  web: (componentName: string) => `${routes.component(componentName)}${ROUTE_DELIMITER}${componentSegments.web}`,
  react: (componentName: string) => `${routes.component(componentName)}${ROUTE_DELIMITER}${componentSegments.react}`,
  webPreview: (componentName: string) =>
    `${routes.component(componentName)}${ROUTE_DELIMITER}${componentSegments.webPreview}`,
  reactPreview: (componentName: string) =>
    `${routes.component(componentName)}${ROUTE_DELIMITER}${componentSegments.reactPreview}`,
};
