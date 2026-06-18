import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  elementTypePropsTest,
  restPropsTest,
  sizePropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { PropsProvider } from '../../../context';
import ControlButton from '../ControlButton';

describe('ControlButton', () => {
  classNamePrefixProviderTest(ControlButton, 'ControlButton');

  sizePropsTest(ControlButton);

  stylePropsTest(ControlButton);

  restPropsTest(ControlButton, 'button');

  validHtmlAttributesTest(ControlButton);

  ariaAttributesTest(ControlButton);

  elementTypePropsTest(ControlButton);

  it('should have default classnames', () => {
    render(<ControlButton />);

    const element = screen.getByRole('button');

    expect(element).toHaveClass('ControlButton');
    expect(element).toHaveClass('ControlButton--medium');
    expect(element).toHaveClass('ControlButton--hasBackground');
    expect(element).toHaveClass('dynamic-color-background-interactive');
    expect(element).toHaveClass('dynamic-color-border');
    expect(element).toHaveClass('accessibility-tap-target');
    expect(element).toHaveClass('text-color-scheme');
  });

  it('should apply size class from context when prop is not provided', () => {
    render(
      <PropsProvider value={{ size: 'large' }}>
        <ControlButton />
      </PropsProvider>,
    );

    expect(screen.getByRole('button')).toHaveClass('ControlButton', 'ControlButton--large');
  });

  it('should prefer direct size prop over context size', () => {
    render(
      <PropsProvider value={{ size: 'large' }}>
        <ControlButton size="small" />
      </PropsProvider>,
    );

    expect(screen.getByRole('button')).toHaveClass('ControlButton--small');
    expect(screen.getByRole('button')).not.toHaveClass('ControlButton--large');
  });

  it('should render text children', () => {
    render(<ControlButton>Close</ControlButton>);

    expect(screen.getByRole('button').textContent).toBe('Close');
  });

  it('should not have specified classes when isSubtle is true', () => {
    render(<ControlButton isSubtle />);

    const element = screen.getByRole('button');

    expect(element).not.toHaveClass('ControlButton--hasBackground');
    expect(element).not.toHaveClass('dynamic-color-border');
  });

  it('should have symmetrical class when isSymmetrical is true', () => {
    render(<ControlButton isSymmetrical />);

    expect(screen.getByRole('button')).toHaveClass('ControlButton--symmetrical');
  });

  it('should have disabled class when isDisabled is true', () => {
    render(<ControlButton isDisabled />);

    const element = screen.getByRole('button');

    expect(element).toHaveClass('disabled');
    expect(element).toBeDisabled();
  });

  it('should render with custom spacing', () => {
    render(<ControlButton spacing="space-600">Close</ControlButton>);

    expect(screen.getByRole('button')).toHaveStyle({ '--control-button-spacing': 'var(--spirit-space-600)' });
  });

  it('should render with custom spacing for each breakpoint', () => {
    render(
      <ControlButton spacing={{ mobile: 'space-100', tablet: 'space-1000', desktop: 'space-1200' }}>
        Close
      </ControlButton>,
    );

    const element = screen.getByRole('button') as HTMLElement;

    expect(element).toHaveStyle({ '--control-button-spacing': 'var(--spirit-space-100)' });
    expect(element).toHaveStyle({ '--control-button-spacing-tablet': 'var(--spirit-space-1000)' });
    expect(element).toHaveStyle({ '--control-button-spacing-desktop': 'var(--spirit-space-1200)' });
  });
});
