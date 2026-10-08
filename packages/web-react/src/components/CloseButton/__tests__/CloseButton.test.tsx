import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { restPropsTest } from '@local/tests';
import { I18nProvider } from '../../../context';
import { CloseButton } from '..';

describe('CloseButton', () => {
  restPropsTest(CloseButton, 'button');

  it('should render close icon', () => {
    render(<CloseButton />);

    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();
  });

  it('should render with default localized label', () => {
    render(<CloseButton />);

    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('should render with custom label', () => {
    render(<CloseButton label="Dismiss" />);

    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
  });

  it('should render a literal string override without leaking strings to the DOM', () => {
    render(<CloseButton strings={{ ariaLabel: { close: 'Dismiss' } }} />);

    const button = screen.getByRole('button', { name: 'Dismiss' });

    expect(button).not.toHaveAttribute('strings');
  });

  it('should resolve a translation reference with parameters from the provider', () => {
    render(
      <I18nProvider translations={{ dialog: { close: 'Close {name}' } }}>
        <CloseButton strings={{ ariaLabel: { close: { key: 'dialog.close', params: { name: 'Settings' } } } }} />
      </I18nProvider>,
    );

    expect(screen.getByRole('button', { name: 'Close Settings' })).toBeInTheDocument();
  });

  it('should prefer strings over the deprecated label', () => {
    render(<CloseButton label="Deprecated" strings={{ ariaLabel: { close: 'Current' } }} />);

    expect(screen.getByRole('button', { name: 'Current' })).toBeInTheDocument();
  });

  it('should be symmetrical by default', () => {
    render(<CloseButton />);

    expect(screen.getByRole('button')).toHaveClass('ControlButton--symmetrical');
  });

  it('should forward the size to the underlying control button', () => {
    render(<CloseButton size="large" />);

    expect(screen.getByRole('button')).toHaveClass('ControlButton--large');
  });

  it('should default to medium size', () => {
    render(<CloseButton />);

    expect(screen.getByRole('button')).toHaveClass('ControlButton--medium');
  });

  it('should forward aria attributes', () => {
    render(<CloseButton aria-expanded aria-controls="dialog-id" />);

    const element = screen.getByRole('button');

    expect(element).toHaveAttribute('aria-expanded', 'true');
    expect(element).toHaveAttribute('aria-controls', 'dialog-id');
  });

  it('should call onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<CloseButton onClick={onClick} />);

    await user.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
