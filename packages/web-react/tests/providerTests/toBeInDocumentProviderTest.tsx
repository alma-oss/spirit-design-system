import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import React, { type ComponentType } from 'react';

export const toBeInDocumentProviderTest = (Component: ComponentType<any>, selector?: string, testId?: string) => {
  it(`renders ${selector || testId} in document`, async () => {
    if (!selector && !testId) {
      throw new Error('Either selector or testId must be provided');
    }

    const dom = render(<Component />);

    await waitFor(() => {
      const element = testId ? screen.getByTestId(testId) : (dom.container.querySelector(selector!) as HTMLElement);

      expect(element).toBeInTheDocument();
    });
  });
};
