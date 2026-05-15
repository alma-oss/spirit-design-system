import { render, waitFor } from '@testing-library/react';
import React, { type ComponentType } from 'react';
import { getColorSchemeClassName } from '../../src';
import getElement from '../testUtils/getElement';

type ColorSchemeComponentProps<C extends string> = {
  color?: C;
  isSubtle?: boolean;
};

export function colorSchemePropsTest<C extends string, P extends object = ColorSchemeComponentProps<C>>(
  Component: ComponentType<P>,
  colors: readonly C[],
  testId?: string,
): void {
  it.each(
    colors.flatMap((color) => [
      // color, isSubtle
      [color, true],
      [color, false],
    ]),
  )('should render color scheme class for %s with isSubtle=%s', async (color, isSubtle) => {
    const props = { color, isSubtle } as P;
    const dom = render(<Component {...props} />);

    await waitFor(() => {
      const element = getElement(dom, testId);

      expect(element).toHaveClass(getColorSchemeClassName({ color, isSubtle }));
    });
  });
}

export function colorSchemeBasicTest<C extends string, P extends object = ColorSchemeComponentProps<C>>(
  Component: ComponentType<P>,
  colors: readonly C[],
  testId?: string,
): void {
  it.each(colors)('should render color scheme class for %s', async (color) => {
    const props = { color } as P;
    const dom = render(<Component {...props} />);

    await waitFor(() => {
      const element = getElement(dom, testId);

      expect(element).toHaveClass(getColorSchemeClassName({ color, isSubtle: false }));
    });
  });
}

export function colorSchemeSubtleTest<C extends string, P extends object = ColorSchemeComponentProps<C>>(
  Component: ComponentType<P>,
  colors: readonly C[],
  testId?: string,
): void {
  it.each(colors)('should render color scheme class for %s', async (color) => {
    const props = { color } as P;
    const dom = render(<Component {...props} />);

    await waitFor(() => {
      const element = getElement(dom, testId);

      expect(element).toHaveClass(getColorSchemeClassName({ color, isSubtle: true }));
    });
  });
}
