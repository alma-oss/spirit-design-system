import { render, waitFor } from '@testing-library/react';
import React, { type ComponentType } from 'react';
import { getColorSchemeClassName } from '../../src';
import getElement from '../testUtils/getElement';

type ColorSchemeComponentProps<C extends string> = {
  color?: C;
  isSubtle?: boolean;
};

interface ColorSchemePropsTestOptions {
  testId?: string;
  isSubtle?: boolean;
  hasSubtleProp?: boolean;
}

export function colorSchemePropsTest<C extends string, P extends object = ColorSchemeComponentProps<C>>(
  Component: ComponentType<P>,
  colors: readonly C[],
  { testId, isSubtle = false, hasSubtleProp = true }: ColorSchemePropsTestOptions = {},
): void {
  it.each(colors)('should render color scheme class for %s', async (color) => {
    const props = (hasSubtleProp ? { color, isSubtle } : { color }) as P;
    const dom = render(<Component {...props} />);

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
}
