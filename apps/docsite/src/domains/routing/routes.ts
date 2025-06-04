export const routes = {
  home: '/',
  components: '/components',
  component: (componentName: string) => `/components/${componentName.toLowerCase()}`,
};
