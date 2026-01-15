import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { RouterProvider, useRouterContext } from '../RouterContext';

const RouterConsumer = () => {
  const router = useRouterContext();

  return (
    <button type="button" onClick={() => router?.navigate('/test')}>
      Button
    </button>
  );
};

describe('RouterProvider', () => {
  it('should provide router to descendants', () => {
    const navigate = jest.fn();

    render(
      <RouterProvider value={{ navigate }}>
        <RouterConsumer />
      </RouterProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Button' }));

    expect(navigate).toHaveBeenCalledWith('/test');
  });
});
