export const DOCUMENTATION_MENU = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'design', label: 'Design' },
  { id: 'components', label: 'Components' },
  { id: 'icons', label: 'Icons' },
  { id: 'helpers', label: 'Helpers' },
  { id: 'development', label: 'Development' },
  { id: 'migrations', label: 'Migrations' },
  { id: 'releases', label: 'Releases' },
] as const;

export type DocumentedPageSection = (typeof DOCUMENTATION_MENU)[number]['id'];
