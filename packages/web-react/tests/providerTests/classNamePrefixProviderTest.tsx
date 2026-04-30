import { render, waitFor } from '@testing-library/react';
import React, { type ComponentType } from 'react';
import { ClassNamePrefixProvider } from '../../src/context/ClassNamePrefixContext';
import getElement, { type GetElementTarget } from '../testUtils/getElement';

export const classNamePrefixProviderTest = (
  Component: ComponentType<any>,
  className: string,
  target?: GetElementTarget,
) => {
  it('renders with class name prefix', async () => {
    const prefix = 'lmc';
    const dom = render(
      <ClassNamePrefixProvider value={prefix}>
        <Component />
      </ClassNamePrefixProvider>,
    );

    await waitFor(() => {
      const element = getElement(dom, target);

      expect(element).toHaveClass(`${prefix}-${className}`);
    });
  });

  it('renders without class name prefix', async () => {
    const dom = render(<Component />);

    await waitFor(() => {
      const element = getElement(dom, target);

      expect(element).toHaveClass(className);
    });
  });
};
