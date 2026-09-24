import { breakpoints } from '@alma-oss/spirit-design-tokens';
import { DisplayStyleProps, SpacingStyleProp } from '@alma-oss/spirit-web-react';

export type SelectEntry<T extends string | undefined = string | undefined> = {
  label: string;
  value: T;
};

export type ThemeEntry = SelectEntry<string>;

export type PreviewGlobals = Record<string, unknown>;

export type BreakpointName = keyof typeof breakpoints;

export type MarginPropName = Exclude<keyof typeof SpacingStyleProp, 'margin'>;

export type MarginArgs = Record<MarginPropName, undefined>;

export type DisplayPropName = keyof typeof DisplayStyleProps;

export type DisplayArgs = Record<DisplayPropName, undefined>;
