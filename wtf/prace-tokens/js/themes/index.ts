import * as themeLightDefault from './theme-light-default';
import * as themeLightOnBrand from './theme-light-on-brand';

// The first theme is the default theme, as the left column in the Figma table.
export const themes = {
  themeLightDefault: {
    tokens: themeLightDefault,
  },
  themeLightOnBrand: {
    tokens: themeLightOnBrand,
  },
};

export * from './colorTokens';
