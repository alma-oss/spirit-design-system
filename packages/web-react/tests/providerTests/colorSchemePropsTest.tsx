import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { getColorSchemeClassName } from '../../src';
import getElement from '../testUtils/getElement';

type ColorSchemeComponentProps<C extends string> = {
  color?: C;
  isSubtle?: boolean;
};

type ColorSchemeTestComponent<C extends string> = (props: ColorSchemeComponentProps<C>) => JSX.Element;

export function colorSchemePropsTest<C extends string>(
  Component: ColorSchemeTestComponent<C>,
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
    const dom = render(<Component color={color} isSubtle={isSubtle} />);

    await waitFor(() => {
      const element = getElement(dom, testId);

      expect(element).toHaveClass(getColorSchemeClassName({ color, isSubtle }));
    });
  });
}

export function colorSchemeBasicTest<C extends string>(
  Component: ColorSchemeTestComponent<C>,
  colors: readonly C[],
  testId?: string,
): void {
  it.each(colors)('should render color scheme class for %s', async (color) => {
    const dom = render(<Component color={color} />);

    await waitFor(() => {
      const element = getElement(dom, testId);

      expect(element).toHaveClass(getColorSchemeClassName({ color, isSubtle: false }));
    });
  });
}

export function colorSchemeSubtleTest<C extends string>(
  Component: ColorSchemeTestComponent<C>,
  colors: readonly C[],
  testId?: string,
): void {
  it.each(colors)('should render color scheme class for %s', async (color) => {
    const dom = render(<Component color={color} />);

    await waitFor(() => {
      const element = getElement(dom, testId);

      expect(element).toHaveClass(getColorSchemeClassName({ color, isSubtle: true }));
    });
  });
}
