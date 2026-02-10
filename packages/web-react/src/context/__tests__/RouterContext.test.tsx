import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { RouterProvider, useRouter } from '../RouterContext';

const RouterConsumer = () => {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router?.navigate('/test')}>
      Button
    </button>
  );
};

const RouterConsumerWithOptions = () => {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router?.navigate('/test', { replace: true })}>
      Button with options
    </button>
  );
};

describe('RouterProvider', () => {
  it('should provide router to descendants', () => {
    const navigate = jest.fn();

    render(
      <RouterProvider navigate={navigate}>
        <RouterConsumer />
      </RouterProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Button' }));

    expect(navigate).toHaveBeenCalledWith('/test');
  });

  it('should pass routerOptions to navigate', () => {
    const navigate = jest.fn();

    render(
      <RouterProvider navigate={navigate}>
        <RouterConsumerWithOptions />
      </RouterProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Button with options' }));

    expect(navigate).toHaveBeenCalledWith('/test', { replace: true });
  });

  it('should provide useHref function to context', () => {
    const navigate = jest.fn();
    const useHref = (href: string) => `/base${href}`;

    const UseHrefConsumer = () => {
      const router = useRouter();
      const transformedHref = router?.useHref?.('/test');

      return <span data-testid="href">{transformedHref}</span>;
    };

    render(
      <RouterProvider navigate={navigate} useHref={useHref}>
        <UseHrefConsumer />
      </RouterProvider>,
    );

    expect(screen.getByTestId('href')).toHaveTextContent('/base/test');
  });
});
