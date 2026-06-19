import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { validHtmlAttributesTest } from '@local/tests';
import { ContextPropsProvider } from '../../../context';
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
      <ContextPropsProvider value={{ inputAddon: { size: 'large' } }}>
        <InputAddon>
          <span>Addon content</span>
        </InputAddon>
      </ContextPropsProvider>,
    );

    expect(screen.getByText('Addon content').parentElement).toHaveClass('InputAddon--large');
  });

  it('should prefer direct size prop over context size', () => {
    render(
      <ContextPropsProvider value={{ inputAddon: { size: 'large' } }}>
        <InputAddon size="medium">
          <span>Addon content</span>
        </InputAddon>
      </ContextPropsProvider>,
    );

    const { parentElement } = screen.getByText('Addon content');

    expect(parentElement).toHaveClass('InputAddon--medium');
    expect(parentElement).not.toHaveClass('InputAddon--large');
  });
});
