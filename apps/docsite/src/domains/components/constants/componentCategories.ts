export const SORT_OPTIONS = {
  ALPHABETICAL: 'alphabetical',
  CATEGORICAL: 'categorical',
} as const;

export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];

export const COMPONENT_CATEGORIES: Record<string, string[]> = {
  Actions: ['ActionGroup', 'Button', 'ButtonLink', 'CloseButton', 'ControlButton', 'Link', 'SkipLink', 'SplitButton'],
  Content: ['Accordion', 'Avatar', 'Card', 'EmptyState', 'Item', 'Pill', 'PricingPlan', 'Tag', 'Timeline'],
  Feedback: ['Alert', 'Skeleton', 'Spinner', 'Toast', 'Tooltip'],
  Forms: [
    'Checkbox',
    'Field',
    'FieldGroup',
    'File',
    'FileUpload',
    'Radio',
    'Select',
    'Slider',
    'TextArea',
    'TextField',
    'TextFieldBase',
    'Toggle',
  ],
  Layout: ['Box', 'Collapse', 'Container', 'Divider', 'Flex', 'Grid', 'Matrix', 'ScrollView', 'Section', 'Stack'],
  'Media and Icons': ['Icon', 'IconBox', 'PartnerLogo', 'ProductLogo'],
  Navigation: ['Breadcrumbs', 'Dropdown', 'Navigation', 'Pagination', 'SegmentedControl', 'Tabs'],
  Overlays: ['Dialog', 'Drawer', 'Modal'],
  Structure: ['Footer', 'Header'],
  Typography: ['Heading', 'Text'],
  Utilities: ['Hidden', 'NoSsr', 'Truncate', 'VisuallyHidden'],
};
