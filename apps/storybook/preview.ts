import './assets/stylesheets/index.scss';
import { IconGlobalDecorator } from './decorators/IconGlobalDecorator';
import SpiritTheme from './spirit.theme';
import {
  displayArgTypes,
  displayArgs,
  escapeHatchArgTypes,
  escapeHatchArgs,
  marginArgTypes,
  marginArgs,
  themeArgType,
  themeArgs,
  themeDecorators,
  themeGlobalTypes,
} from './config';

// Storybook config
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true,
    sort: 'alpha',
    hideNoControlsWarning: true,
    disableSaveFromUI: true // Disable the "save story" button in the UI. It is overlapping with the last row of controls.
  },
  docs: {
    theme: SpiritTheme,
  },
  backgrounds: {
    disable: true,
  },
  options: {
    storySort: {
      order: [
        'Introduction',
        ['Installation', 'Branding'],
        'Colors',
        'Typography',
        'Layout',
        'Components',
        'Deprecated',
        'Experimental',
        'Examples',
      ],
    },
  },
} as const;

// Arg types
export const argTypes = {
  theme: themeArgType,
  ...marginArgTypes,
  ...displayArgTypes,
  ...escapeHatchArgTypes,
};

// Args defaults
export const args = {
  ...themeArgs,
  ...marginArgs,
  ...displayArgs,
  ...escapeHatchArgs,
};

// Global types
export const globalTypes = themeGlobalTypes;

// Decorators
export const decorators = [...themeDecorators, IconGlobalDecorator];
export const tags = ['autodocs'];
