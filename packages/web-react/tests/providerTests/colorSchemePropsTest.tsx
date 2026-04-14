import { render, waitFor } from '@testing-library/react';
import React, { type ComponentType } from 'react';
import { getColorSchemeClassName } from '../../src';
import getElement from '../testUtils/getElement';

interface ColorSchemePropsTestOptions {
  testId?: string;
  isSubtle?: boolean;
}

export const colorSchemePropsTest = (
  Component: ComponentType<any>,
  colors: string[],
  { testId, isSubtle = false }: ColorSchemePropsTestOptions = {},
) => {
  it.each(colors)('should render color scheme class for %s', async (color) => {
    const dom = render(<Component color={color} isSubtle={isSubtle} />);

    await waitFor(() => {
      const element = getElement(dom, testId);
      expect(element).toHaveClass(
        getColorSchemeClassName({
          color,
          isSubtle,
        }),
      );
    });
  });
};
