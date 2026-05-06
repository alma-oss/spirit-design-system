import { render, waitFor } from '@testing-library/react';
import React, { type ComponentType } from 'react';
import { ClassNamePrefixProvider } from '../../src/context/ClassNamePrefixContext';
import getElement from '../testUtils/getElement';

export const classNamePrefixProviderTest = (Component: ComponentType<any>, className: string, testId?: string) => {
  it('renders with class name prefix', async () => {
    const prefix = 'lmc';
    const dom = render(
      <ClassNamePrefixProvider value={prefix}>
        <Component />
      </ClassNamePrefixProvider>,
    );

    await waitFor(() => {
      const element = getElement(dom, testId);

      expect(element).toHaveClass(`${prefix}-${className}`);
    });
  });

  it('renders without class name prefix', async () => {
    const dom = render(<Component />);

    await waitFor(() => {
      const element = getElement(dom, testId);

      expect(element).toHaveClass(className);
    });
  });
};
