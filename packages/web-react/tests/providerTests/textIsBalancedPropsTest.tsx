import { render, waitFor } from '@testing-library/react';
import React, { type ComponentType } from 'react';
import getElement from '../testUtils/getElement';

export const textIsBalancedPropsTest = async (
  Component: ComponentType<any>,
  expectedClassName = 'text-wrap-balance',
  testId?: string,
) => {
  const dom = render(<Component isTextBalanced />);

  await waitFor(() => {
    const element = getElement(dom, testId);

    expect(element).toHaveClass(expectedClassName);
  });
};
