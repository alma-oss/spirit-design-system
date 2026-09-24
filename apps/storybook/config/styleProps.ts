import { breakpoints, spaces } from '@alma-oss/spirit-design-tokens';
import { DisplayStyleProps, SpacingStyleProp } from '@alma-oss/spirit-web-react';
import { type BreakpointName, type DisplayArgs, type DisplayPropName, type MarginArgs, type MarginPropName, type SelectEntry } from './types';
import { makeSelectMap, toTitleCase } from './utils';

// Spacing entries
const spacingEntries: Array<SelectEntry<string>> = Object.entries(spaces).map(([token, size]) => {
  const value = `space-${token}`;
  const readable = typeof size === 'number' ? String(size) : size;

  return { label: `${value} (${readable})`, value };
});

const MARGIN_OPTIONS = {
  None: undefined,
  ...makeSelectMap(spacingEntries),
} as const;

const MARGIN_PROP_NAMES = (Object.keys(SpacingStyleProp) as Array<keyof typeof SpacingStyleProp>).filter((prop): prop is MarginPropName => prop !== 'margin');

// Breakpoint entries
const BREAKPOINT_ENTRIES = (Object.keys(breakpoints) as BreakpointName[]).map((breakpoint) => ({
  label: toTitleCase(breakpoint),
  value: breakpoint,
}));

const BREAKPOINT_CONTROL_ENTRIES: Array<SelectEntry<BreakpointName | undefined>> = [
  { label: 'undefined', value: undefined },
  ...BREAKPOINT_ENTRIES,
];

const BREAKPOINT_SELECT_OPTIONS = makeSelectMap(BREAKPOINT_CONTROL_ENTRIES);

// Margin arg types
export const marginArgTypes = Object.fromEntries(MARGIN_PROP_NAMES.map((propName) => [
  propName,
  {
    control: { type: 'select' },
    options: MARGIN_OPTIONS,
    description: `Applies the ${propName} utility based on spacing tokens.`,
    table: {
      type: { summary: 'SpaceToken | Responsive<SpaceToken> | undefined' },
      defaultValue: { summary: 'undefined' },
      category: 'Style props',
    },
  },
])) as Record<MarginPropName, unknown>;

export const marginArgs = Object.fromEntries(MARGIN_PROP_NAMES.map((propName) => [propName, undefined])) as MarginArgs;

// Display arg types
export const displayArgTypes = {
  hideOn: {
    control: { type: 'multi-select' },
    options: BREAKPOINT_SELECT_OPTIONS,
    description: 'Hides the component at the chosen breakpoints (accepts one or more values). Select "undefined" to clear the utility.',
    table: {
      type: { summary: 'Breakpoint | Breakpoint[] | undefined' },
      defaultValue: { summary: 'undefined' },
      category: 'Style props',
    },
  },
  hideFrom: {
    control: { type: 'select' },
    options: BREAKPOINT_SELECT_OPTIONS,
    description: 'Hides the component from the selected breakpoint and up. Select "undefined" to clear the utility.',
    table: {
      type: { summary: 'Breakpoint | undefined' },
      defaultValue: { summary: 'undefined' },
      category: 'Style props',
    },
  },
} as const satisfies Record<DisplayPropName, unknown>;

export const displayArgs = Object.fromEntries((Object.keys(DisplayStyleProps) as DisplayPropName[]).map((propName) => [propName, undefined])) as DisplayArgs;
