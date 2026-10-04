export const SORT_OPTIONS = {
  ALPHABETICAL: 'alphabetical',
  CATEGORICAL: 'categorical',
} as const;

export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];

export const COMPONENT_CATEGORIES: Record<string, string[]> = {
  Actions: ['ActionGroup', 'Button', 'ButtonLink', 'CloseButton', 'ControlButton', 'Link', 'SkipLink', 'SplitButton'],
  Content: ['Accordion', 'Avatar', 'Card', 'EmptyState', 'Item', 'Pill', 'PricingPlan', 'Tag', 'Timeline'],
  Feedback: ['Alert', 'ContextualHelp', 'Skeleton', 'Spinner', 'Toast', 'Tooltip'],
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
  Layout: [
    'Box',
    'Collapse',
    'Container',
    'Divider',
    'Flex',
    'Grid',
    'Matrix',
    'ScrollView',
    'Section',
    'Stack',
    'UNSTABLE_Tile',
  ],
  'Media and Icons': ['Icon', 'IconBox', 'PartnerLogo', 'ProductLogo'],
  Navigation: ['Breadcrumbs', 'Dropdown', 'Navigation', 'Pagination', 'SegmentedControl', 'Tabs'],
  Overlays: ['Dialog', 'Drawer', 'Modal'],
  Structure: ['Footer', 'Header'],
  Typography: ['Heading', 'Text', 'UNSTABLE_DisplayHeading'],
  Utilities: ['Hidden', 'NoSsr', 'Truncate', 'VisuallyHidden'],
};

export const COMPONENT_CATEGORY_DESCRIPTIONS: Record<string, string> = {
  Actions:
    'Interactive elements that let people trigger an action or follow a path. They make clear what can be done and how important it is.',
  Content:
    'Building blocks for presenting information and everyday content. They organize text, media, and data into clear, scannable units.',
  Feedback:
    'Elements that tell people what is happening in the interface, from confirmations and warnings to loading states. They keep users informed without getting in their way.',
  Forms:
    'Controls for collecting input from people. They cover entering, choosing, and uploading data, together with the labels and validation around it.',
  Layout:
    'Structural elements for arranging content on a page. They define spacing, alignment, and the responsive grid of an interface.',
  'Media and Icons':
    'Visual assets that add meaning and recognition to an interface. They carry imagery, symbols, and brand marks.',
  Navigation:
    'Elements that help people find their way and move between places. They show where the user is and what can be reached from there.',
  Overlays:
    'Surfaces that appear above the main content to ask for attention or focused input. They temporarily interrupt the flow to keep a task in context.',
  Structure:
    'Page-level regions that frame an entire screen. They provide consistent starting and ending points across a product.',
  Typography:
    'Text styles that establish hierarchy and readability. They set how headings and body copy look and feel.',
  Utilities:
    'Helpers that adjust behavior or visibility without adding visual design of their own. They support accessibility, responsiveness, and rendering.',
};
