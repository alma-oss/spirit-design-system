/**
 * Story UI configuration for the Spirit Design System Storybook.
 *
 * Story UI generates Storybook stories from natural-language prompts. Generated stories must be
 * composed only of real `@alma-oss/spirit-web-react` components and Spirit design tokens.
 * Spirit-specific knowledge for the model lives in `./story-ui-docs/` and `./story-ui-considerations.md`.
 *
 * Paths are relative to this file. The Story UI server must be started from this directory
 * (`yarn workspace @alma-oss/spirit-storybook start:story-ui`).
 *
 * @see https://github.com/southleft/story-ui#reference
 */
module.exports = {
  // Components are imported from the published package entry point, exactly as consumers do
  importPath: '@alma-oss/spirit-web-react',
  importStyle: 'barrel',
  componentPrefix: '',

  framework: 'react',
  componentFramework: 'react',
  storybookFramework: '@storybook/react-vite',

  generatedStoriesPath: './stories/generated/',
  storyPrefix: 'Generated/',
  considerationsPath: './story-ui-considerations.md',

  // Base URL of this Storybook; Story UI calls `<url>/mcp` provided by `@storybook/addon-mcp`.
  // The server loads `.env` before this file, so `STORYBOOK_URL` there is the single source of truth.
  storybookMcpUrl: process.env.STORYBOOK_URL || 'http://localhost:6006',
  storybookMcpTimeout: 5000,

  // Internal building blocks, providers, contexts and deprecated APIs that stories must not use directly
  excludeComponents: [
    'AccordionContext',
    'AccordionItemContext',
    'CharacterCounter',
    'ClassNamePrefixProvider',
    'ComboboxPopoverContextProvider',
    'ContextPropsProvider',
    'DrawerProvider',
    'DropdownContext',
    'FormFieldsContext',
    'I18nProvider',
    'IconsProvider',
    'InlineElementsContext',
    'InputDetails',
    'ListItemsContext',
    'ModalProvider',
    'NoSsr',
    'PaginationButtonLink',
    'PickerPopoverContextProvider',
    'RouterProvider',
    'SkeletonItem',
    'TabContext',
    'TabsProvider',
    'TextFieldBase',
    'TextInputBase',
    'ToastContext',
    'UniversalProvider',
    'WithFormFieldContext',
  ],

  // Read by the prompt builder; detailed Spirit rules live in `story-ui-docs/` and the considerations file
  layoutRules: {
    multiColumnWrapper: 'Grid',
    columnComponent: 'GridItem',
    containerComponent: 'Container',
    layoutExamples: {
      twoColumn: `<Grid cols={{ mobile: 1, tablet: 2 }}>
  <GridItem>…</GridItem>
  <GridItem>…</GridItem>
</Grid>`,
    },
    prohibitedElements: ['div', 'span', 'section', 'style'],
  },

  designSystemGuidelines: {
    // Shown in the workspace UI as the design system name
    name: 'Spirit Design System',
  },
};
