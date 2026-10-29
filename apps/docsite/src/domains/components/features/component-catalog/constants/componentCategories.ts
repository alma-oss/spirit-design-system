// Component categories
//
// Groups components by what they are for. The docsite shows these categories and their
// descriptions publicly in the categorical component listing (/components?sort=categorical).
//
// PLACEMENT RULE: The first sentence of each category description is the rule for placing
// a component in the category. The second sentence is copy for docsite readers.
//
// To place a component:
//   1. Read the first sentence of every description and pick the category whose rule fits.
//   2. If more than one fits, decide by what the component is, not by what it usually
//      contains or where it is used.
//   3. If none fits, consider rewording a rule or adding a category rather than stretching
//      a rule to fit. Before adding a category, consider shifting the borders between
//      categories so it also takes in existing components that would fit it better than
//      their current category. Try to avoid single-component categories created only for
//      lack of a better fit.
//
// When you edit a description, keep its first sentence a rule that decides placement.
//
// Keep categories and their components sorted alphabetically. Docsite tests fail when
// a component is missing, listed twice, misspelled, or out of order.

export const COMPONENT_CATEGORIES: Record<string, string[]> = {
  Actions: ['ActionGroup', 'Button', 'ButtonLink', 'CloseButton', 'ControlButton', 'Link', 'SplitButton'],
  'Data Display': ['Card', 'File', 'Item', 'PricingPlan', 'Timeline', 'UNSTABLE_Table'],
  Feedback: ['Alert', 'EmptyState', 'ProgressBar', 'Skeleton', 'Spinner', 'Toast'],
  'Form Parts': [
    'CharacterCounter',
    'HelperText',
    'InputAddon',
    'InputContainer',
    'InputDetails',
    'Label',
    'TextFieldBase',
    'ValidationText',
  ],
  Forms: [
    'Checkbox',
    'FieldGroup',
    'FileUpload',
    'Radio',
    'SegmentedControl',
    'Select',
    'Slider',
    'TextArea',
    'TextField',
    'Toggle',
    'UNSTABLE_Combobox',
    'UNSTABLE_Picker',
  ],
  Indicators: ['Pill', 'Tag', 'UNSTABLE_SplitTag'],
  Layout: ['Container', 'Flex', 'Grid', 'Matrix', 'Stack'],
  'Media and Icons': ['Avatar', 'Icon', 'IconBox', 'PartnerLogo', 'ProductLogo'],
  Navigation: ['Breadcrumbs', 'Navigation', 'Pagination', 'SkipLink', 'Tabs'],
  Overlays: ['ContextualHelp', 'Dialog', 'Drawer', 'Dropdown', 'Modal', 'Tooltip'],
  Structure: ['Accordion', 'Box', 'Divider', 'Footer', 'Header', 'ScrollView', 'Section', 'UNSTABLE_Tile'],
  Text: ['ActionText', 'CaptionText', 'Heading', 'Text', 'UNSTABLE_DisplayHeading', 'UNSTABLE_EyebrowText'],
  Utilities: ['Collapse', 'Hidden', 'NoSsr', 'Truncate', 'VisuallyHidden'],
};

export const COMPONENT_CATEGORY_DESCRIPTIONS: Record<string, string> = {
  Actions:
    'Controls that let people do or reach one thing chosen by the author, and the groups that arrange them. They make clear what can be done and how important it is.',
  'Data Display':
    'Components that present one thing or a set of things through a fixed set of slots, such as a title, media, metadata, or rows. They turn records into clear, scannable units.',
  Feedback:
    'Elements that tell people the state of the system or the result of their action, from confirmations and errors to loading and empty states. They keep users informed without getting in their way.',
  'Form Parts':
    'Pieces that build, label, or explain a single form field and are not meant to be used as a complete field on their own. They compose into consistent, accessible fields.',
  Forms:
    'Controls that let people enter, choose, or upload a value, and the groups that wrap them. They cover everything from short text to picking options and attaching files.',
  Indicators:
    'Compact labels attached to something else to show its status, count, or category. They let people scan and compare items at a glance.',
  Layout:
    'Elements that only set where content sits, such as width, columns, gaps, and alignment, without a surface of their own. They define the spacing and the responsive grid of an interface.',
  'Media and Icons':
    'Imagery that stands for a person, a brand, or an idea. They carry avatars, icons, and brand marks.',
  Navigation:
    'Elements that move people through the product or the page, with destinations given by its structure rather than by its content. They show where the user is and what can be reached from there.',
  Overlays:
    'Surfaces that appear above the page, tied to a trigger, until they are dismissed. They keep extra content or a focused task in context.',
  Structure:
    'Surfaces and separators that frame, group, separate, or collapse any content without dictating what goes inside. They break a page into regions and digestible parts.',
  Text: 'Components that only render text in a predefined style, without belonging to another component. They establish hierarchy and readability across headings, body copy, and supporting text.',
  Utilities:
    'Helpers that adjust behavior or visibility without adding visual design of their own. They support accessibility, responsiveness, and rendering.',
};
