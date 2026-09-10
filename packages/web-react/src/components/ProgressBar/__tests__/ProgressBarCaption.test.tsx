import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ContextPropsProvider } from '../../../context';
import ProgressBarCaption from '../ProgressBarCaption';

const defaultProps = {
  children: <progress aria-label="Progress" value={60} />,
  classProps: {
    value: '',
    valueLabel: '',
  },
  valueLabel: '60 %',
};

describe('ProgressBarCaption', () => {
  it('should render children and the value label', () => {
    render(<ProgressBarCaption {...defaultProps} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText('60 %')).toBeInTheDocument();
  });

  it('should place the value label to the right by default', () => {
    const { container } = render(<ProgressBarCaption {...defaultProps} />);

    expect(container.querySelector('.Flex')).toHaveClass(
      'Flex',
      'Flex--horizontal',
      'Flex--noWrap',
      'Flex--alignmentXLeft',
      'Flex--alignmentYCenter',
    );
    expect((container.querySelector('.Flex') as HTMLElement).style.getPropertyValue('--flex-spacing-x')).toBe(
      'var(--spirit-space-600)',
    );
  });

  it('should place the value label below the bar', () => {
    const { container } = render(<ProgressBarCaption {...defaultProps} valuePlacement="bottom" />);

    expect(container.querySelector('.Flex')).toHaveClass('Flex', 'Flex--vertical', 'Flex--alignmentXLeft');
    expect((container.querySelector('.Flex') as HTMLElement).style.getPropertyValue('--flex-spacing-y')).toBe(
      'var(--spirit-space-600)',
    );
  });

  it('should set id on the visible value label', () => {
    render(<ProgressBarCaption {...defaultProps} valueLabelId="progress-bar-animated-value" />);

    expect(screen.getByText('60 %')).toHaveAttribute('id', 'progress-bar-animated-value');
  });

  it('should hide the visible value label from assistive technologies', () => {
    render(<ProgressBarCaption {...defaultProps} isAriaHidden />);

    expect(screen.getByText('60 %')).toHaveAttribute('aria-hidden', 'true');
  });

  it('should use secondary text color when not disabled', () => {
    render(<ProgressBarCaption {...defaultProps} />);

    expect(screen.getByText('60 %')).toHaveClass('text-secondary');
  });

  it('should apply classProps and styleProps on the value row', () => {
    const { container } = render(
      <ProgressBarCaption
        {...defaultProps}
        classProps={{ value: 'color-scheme-on-disabled', valueLabel: 'text-color-scheme' }}
        styleProps={{ className: 'custom-row', style: { width: '20rem' } }}
      />,
    );

    expect(container.querySelector('.Flex')).toHaveClass('color-scheme-on-disabled', 'custom-row');
    expect(container.querySelector('.Flex')).toHaveStyle({ width: '20rem' });
    expect(screen.getByText('60 %')).toHaveClass('text-color-scheme');
  });

  it('should drop secondary text color when isDisabled comes from context', () => {
    render(
      <ContextPropsProvider value={{ isDisabled: true }}>
        <ProgressBarCaption {...defaultProps} />
      </ContextPropsProvider>,
    );

    expect(screen.getByText('60 %')).not.toHaveClass('text-secondary');
  });
});
