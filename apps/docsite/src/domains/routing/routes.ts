import { componentNameToSlug } from '../components/utils/componentSlug';

const componentsPath = '/components';

export const routes = {
  home: '/',
  components: componentsPath,
  component: (componentName: string) => `${componentsPath}/${componentNameToSlug(componentName)}`,
};
