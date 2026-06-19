import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { PropsProvider } from '../../../context';
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

  it('should apply size class from prop', () => {
    render(
      <InputAddon size="small">
        <span>Addon content</span>
      </InputAddon>,
    );

    expect(screen.getByText('Addon content').parentElement).toHaveClass('InputAddon--small');
  });

  it('should apply size class from context when prop is not provided', () => {
    render(
      <PropsProvider value={{ inputAddon: { size: 'large' } }}>
        <InputAddon>
          <span>Addon content</span>
        </InputAddon>
      </PropsProvider>,
    );

    expect(screen.getByText('Addon content').parentElement).toHaveClass('InputAddon--large');
  });

  it('should prefer direct size prop over context size', () => {
    render(
      <PropsProvider value={{ inputAddon: { size: 'large' } }}>
        <InputAddon size="medium">
          <span>Addon content</span>
        </InputAddon>
      </PropsProvider>,
    );

    const { parentElement } = screen.getByText('Addon content');

    expect(parentElement).toHaveClass('InputAddon--medium');
    expect(parentElement).not.toHaveClass('InputAddon--large');
  });
});
