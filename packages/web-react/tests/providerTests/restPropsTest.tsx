import { render, waitFor } from '@testing-library/react';
import React, { type ComponentType } from 'react';

export const restPropsTest = (Component: ComponentType<any>, selector: string) => {
  it('should pass rest props to main element', async () => {
    const testId = 'testRestProp';
    const dom = render(<Component data-testid={testId} />);

    await waitFor(() => {
      const element = dom.container.querySelector(selector) as HTMLElement;

      expect(element).toHaveAttribute('data-testid', testId);
    });
  });
};
