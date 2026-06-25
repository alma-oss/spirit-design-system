import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { restPropsTest } from '@local/tests';
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
