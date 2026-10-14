// Placeholder descriptions, shown under the name of a component on its card. A component without its own description
// gets one of the lorem ipsum texts until the team writes the final copy.
export const COMPONENT_DESCRIPTIONS: Record<string, string> = {
  Accordion: 'Expandable sections for revealing content',
  ActionGroup: 'Layout utility for grouping related buttons',
  Avatar: 'Visual representation of a user or entity',
  Button: 'Trigger for actions or commands',
  ButtonLink: 'Button Link is a great way to make a link stand out in a section or on a page',
  Card: 'Framed container for grouping related content and actions',
  CloseButton: 'Button that dismisses a surface or any custom dismissible container',
  ControlButton: 'Low-emphasis button for secondary or functional UI actions like close, back, or scroll',
  EmptyState: 'Placeholder with illustration, message, and action shown when no data is available',
  Item: 'Reusable option element for a specific selection from a list-based components like Select or Dropdown',
  Link: 'Navigational text element that takes users to another page, view, or resource',
  Pill: 'Static label or count in a rounded container',
  PricingPlan: 'Structured offer cards presenting plan name, price, features, and a clear call-to-action',
  SkipLink: 'Enables users to skip directly to primary content in any component',
  SplitButton: 'Primary action with access to secondary actions',
  Tag: 'Represents a small piece of information such as a label, category, or selected value.',
  Timeline: 'Timeline displays a series of events in chronological order',
};

export const LOREM_IPSUM_DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
];

const hashName = (name: string) => [...name].reduce((hash, character) => hash + character.charCodeAt(0), 0);

export const getComponentDescription = (component: string): string =>
  COMPONENT_DESCRIPTIONS[component] ?? LOREM_IPSUM_DESCRIPTIONS[hashName(component) % LOREM_IPSUM_DESCRIPTIONS.length];
