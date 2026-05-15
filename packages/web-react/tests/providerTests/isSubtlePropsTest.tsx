import { render, waitFor } from '@testing-library/react';
import React, { type ComponentType } from 'react';
import { getColorSchemeClassName } from '../../src';
import getElement from '../testUtils/getElement';

type ColorSchemeComponentProps<C extends string> = {
  color?: C;
  isSubtle?: boolean;
};

export function isSubtlePropsTest<C extends string, P extends object = ColorSchemeComponentProps<C>>(
  Component: ComponentType<P>,
  color: C,
  testId?: string,
): void {
  it('should render subtle color scheme class', async () => {
    const props = { color, isSubtle: true } as P;
    const dom = render(<Component {...props} />);

    await waitFor(() => {
      const element = getElement(dom, testId);

      expect(element).toHaveClass(getColorSchemeClassName({ color, isSubtle: true }));
    });
  });
}
