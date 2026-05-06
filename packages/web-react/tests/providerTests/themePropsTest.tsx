import { render, waitFor } from '@testing-library/react';
import React, { type ComponentType } from 'react';
import getElement from '../testUtils/getElement';

const DEFAULT_THEME = 'theme-light-default';
const CAMEL_CASE_THEME = 'themeLightDefault';
const NORMALIZED_THEME = 'theme-light-default';

export const themePropsTest = (Component: ComponentType<any>, testId?: string) => {
  it('renders theme class when theme prop provided', async () => {
    const dom = render(<Component theme={DEFAULT_THEME} />);

    await waitFor(() => {
      const element = getElement(dom, testId);

      expect(element).toHaveClass(DEFAULT_THEME);
    });
  });

  it('normalizes camelCase theme to kebab-case class', async () => {
    const dom = render(<Component theme={CAMEL_CASE_THEME} />);

    await waitFor(() => {
      const element = getElement(dom, testId);

      expect(element).toHaveClass(NORMALIZED_THEME);
    });
  });
};
