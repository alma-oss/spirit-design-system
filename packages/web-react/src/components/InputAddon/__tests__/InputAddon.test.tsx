import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import InputAddon from '../InputAddon';

describe('InputAddon', () => {
  it('should render children with InputAddon class', () => {
    render(
      <InputAddon>
        <span>Addon content</span>
      </InputAddon>,
    );

    const addon = screen.getByText('Addon content').parentElement;

    expect(addon).toHaveClass('InputAddon');
  });
});
