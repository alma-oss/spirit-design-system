import { themes } from '@alma-oss/spirit-design-tokens';
import { camelCaseToKebabCase } from '@alma-oss/spirit-web-react';
import { type Decorator } from '@storybook/react';
import { DEFAULT_BODY_CLASS, DEFAULT_THEME_FALLBACK } from '../constants';
import { type PreviewGlobals, type ThemeEntry } from './types';
import { makeSelectMap, toTitleCase } from './utils';

// Theme entries
const createThemeEntries = (): ThemeEntry[] =>
  Object.keys(themes).map((key) => {
    const value = camelCaseToKebabCase(key);

    return { label: toTitleCase(value), value };
  });

const THEME_ENTRIES = createThemeEntries();
const THEME_CLASS_VALUES = new Set(THEME_ENTRIES.map(({ value }) => value));
const THEME_OPTIONS = makeSelectMap(THEME_ENTRIES);
const THEME_TOOLBAR_ITEMS = THEME_ENTRIES.map(({ label, value }) => ({ title: label, value }));
const DEFAULT_THEME = THEME_ENTRIES[0]?.value ?? DEFAULT_THEME_FALLBACK;

export const THEME_CONTROL_OPTIONS = {
  undefined,
  ...THEME_OPTIONS,
} satisfies Record<string, string | undefined>;

// Body class
const ensureBaseBodyClass = (body?: HTMLElement | null) => {
  if (!body) {
    return;
  }

  body.classList.add(DEFAULT_BODY_CLASS);
};

// Theme classes
const updateThemeClassList = (theme: string | undefined) => {
  if (typeof document === 'undefined') {
    return;
  }

  const { body, documentElement } = document;
  const targets = [body, documentElement].filter(Boolean) as HTMLElement[];

  targets.forEach((target) => {
    Array.from(target.classList)
      .filter((className) => THEME_CLASS_VALUES.has(className))
      .forEach((className) => target.classList.remove(className));

    if (theme) {
      target.classList.add(theme);
    }
  });

  ensureBaseBodyClass(body);
};

// Global theme
const getPreviewTheme = (globals: PreviewGlobals) =>
  (typeof globals.previewTheme === 'string' ? globals.previewTheme : undefined);

// Story decorator
const withBodyTheme: Decorator = (Story, context) => {
  const selectedTheme = getPreviewTheme(context.globals) ?? DEFAULT_THEME;
  updateThemeClassList(selectedTheme);

  return Story(context);
};

export const themeDecorators = [withBodyTheme];

export const themeArgType = {
  control: { type: 'select' },
  options: THEME_CONTROL_OPTIONS,
  description: 'Applies theme class to the rendered component.\n\n⚠️ **Some themes may have poor visibility. Use the toolbar to change the global preview theme if needed.**',
  table: {
    type: { summary: 'string | undefined' },
    defaultValue: { summary: 'undefined' },
    category: 'Style props',
  },
} as const;

export const themeArgs = {
  theme: undefined,
} as const;

export const themeGlobalTypes = {
  previewTheme: {
    name: 'Theme',
    description: 'Applies selected theme class to the preview iframe body element.',
    defaultValue: DEFAULT_THEME,
    toolbar: {
      icon: 'paintbrush',
      items: THEME_TOOLBAR_ITEMS,
      dynamicTitle: true,
    },
  },
} as const;
