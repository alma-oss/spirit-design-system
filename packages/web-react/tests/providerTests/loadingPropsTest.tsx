import { render, waitFor } from '@testing-library/react';
import React, { type ComponentType } from 'react';

export const loadingPropsTest = (Component: ComponentType<any>, selector: string) => {
  it('should have loading classname', async () => {
    const dom = render(<Component isLoading />);

    await waitFor(() => {
      const element = dom.container.querySelector(selector) as HTMLElement;

      expect(element.getAttribute('class')).toContain('--loading');
    });
  });

  it('should have spinner classname', async () => {
    const dom = render(<Component isLoading />);

    await waitFor(() => {
      const element = dom.container.querySelector('svg:last-child') as SVGElement;

      expect(element).toHaveClass('animation-spin-clockwise');
    });
  });
};
