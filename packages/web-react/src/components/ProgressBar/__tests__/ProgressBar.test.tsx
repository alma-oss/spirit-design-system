import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  colorSchemeSubtleTest,
  formFieldHelperTextContextPropsTest,
  formFieldLabelContextPropsTest,
  formFieldValidationTextContextPropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { EmotionColors } from '../../../constants';
import { ContextPropsProvider } from '../../../context';
import { getColorSchemeClassName } from '../../../utils';
import { PROGRESS_BAR_VALUE_THROTTLE_MS, ProgressBarColorsExtended } from '../constants';
import ProgressBar from '../ProgressBar';

const defaultProps = {
  'aria-label': 'Progress',
  value: 60,
};

describe('ProgressBar', () => {
  classNamePrefixProviderTest((props) => <ProgressBar {...defaultProps} {...props} />, 'ProgressBar', {
    getByRole: 'progressbar',
  });

  colorSchemeSubtleTest(
    (props) => <ProgressBar {...defaultProps} {...props} />,
    [...Object.values(EmotionColors), ...Object.values(ProgressBarColorsExtended)],
  );

  stylePropsTest(
    (props) => <ProgressBar {...defaultProps} {...props} data-testid="progress-bar-test" />,
    'progress-bar-test',
  );

  restPropsTest((props) => <ProgressBar {...defaultProps} {...props} />, 'progress');

  validHtmlAttributesTest((props) => <ProgressBar {...defaultProps} {...props} />);

  ariaAttributesTest((props) => <ProgressBar {...defaultProps} {...props} />);

  it('should have default classname', () => {
    render(<ProgressBar {...defaultProps} />);

    const element = screen.getByRole('progressbar');

    expect(element).toHaveClass('ProgressBar');
    expect(element).toHaveClass(getColorSchemeClassName({ color: 'informative', isSubtle: true }));
    expect(element).not.toHaveClass('ProgressBar--informative');
    expect(element.style.getPropertyValue('--progress-bar-value')).toBe('60%');
  });

  it('should render value and max', () => {
    render(<ProgressBar {...defaultProps} max={200} value={50} />);

    const element = screen.getByRole('progressbar');

    expect(element).toHaveAttribute('value', '50');
    expect(element).toHaveAttribute('max', '200');
    expect(element.style.getPropertyValue('--progress-bar-value')).toBe('25%');
  });

  it.each([...Object.values(EmotionColors), ...Object.values(ProgressBarColorsExtended)])(
    'should render color scheme %s',
    (color) => {
      render(<ProgressBar {...defaultProps} color={color} />);

      expect(screen.getByRole('progressbar')).toHaveClass(getColorSchemeClassName({ color, isSubtle: true }));
      expect(screen.getByRole('progressbar')).not.toHaveClass(`ProgressBar--${color}`);
    },
  );

  it('should render disabled bar without an emotion color scheme', () => {
    render(<ProgressBar {...defaultProps} isDisabled />);

    const element = screen.getByRole('progressbar');

    expect(element).toHaveClass('ProgressBar', 'color-scheme-on-disabled');
    expect(element).not.toHaveClass('ProgressBar--informative');
    expect(element).not.toHaveClass(getColorSchemeClassName({ color: 'informative', isSubtle: true }));
    expect(element.style.getPropertyValue('--progress-bar-value')).toBe('60%');
  });

  const fieldProps = {
    id: 'progress-bar-field',
    label: 'Profile completeness',
    value: 60,
  };

  formFieldLabelContextPropsTest({
    includeRequired: true,
    renderComponent: (props) => <ProgressBar {...fieldProps} {...props} />,
  });

  formFieldHelperTextContextPropsTest({
    renderComponent: (props) => <ProgressBar {...fieldProps} {...props} />,
  });

  formFieldValidationTextContextPropsTest({
    renderComponent: (props) => <ProgressBar {...fieldProps} {...props} />,
  });

  it('should associate the label with the progress element', () => {
    render(<ProgressBar {...fieldProps} />);

    expect(screen.getByLabelText(fieldProps.label)).toBe(screen.getByRole('progressbar'));
  });

  it('should describe the progress element with helper text', () => {
    render(<ProgressBar {...fieldProps} helperText="Complete your profile to get more offers" />);

    expect(screen.getByRole('progressbar')).toHaveAccessibleDescription('Complete your profile to get more offers');
  });

  it('should render validation text', () => {
    render(<ProgressBar {...fieldProps} validationState="success" validationText="Your profile is complete" />);

    expect(screen.getByText('Your profile is complete')).toBeInTheDocument();
  });

  it('should not set aria-valuetext from valueLabel', () => {
    render(<ProgressBar {...defaultProps} valueLabel="60 %" />);

    expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuetext');
    expect(screen.getByText('60 %')).not.toHaveAttribute('aria-hidden');
  });

  it('should hide the visible valueLabel when aria-valuetext is set', () => {
    render(<ProgressBar {...defaultProps} aria-valuetext="4 out of 20 awards" valueLabel="4 out of 20 awards" />);

    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuetext', '4 out of 20 awards');
    expect(screen.getByText('4 out of 20 awards')).toHaveAttribute('aria-hidden', 'true');
  });

  it('should apply the color scheme to the value row when valueLabel is set', () => {
    const { container } = render(<ProgressBar {...defaultProps} valueLabel="60 %" />);

    expect(container.querySelector('.Flex')).toHaveClass(
      getColorSchemeClassName({ color: 'informative', isSubtle: true }),
    );
    expect(screen.getByRole('progressbar')).toHaveClass('ProgressBar');
    expect(screen.getByRole('progressbar')).not.toHaveClass(
      getColorSchemeClassName({ color: 'informative', isSubtle: true }),
    );
  });

  it('should apply the disabled color scheme to the value row', () => {
    const { container } = render(<ProgressBar {...defaultProps} isDisabled valueLabel="40 %" />);

    expect(container.querySelector('.Flex')).toHaveClass('color-scheme-on-disabled');
    expect(screen.getByRole('progressbar')).toHaveClass('ProgressBar');
    expect(screen.getByRole('progressbar')).not.toHaveClass('color-scheme-on-disabled');
    expect(screen.getByText('40 %')).toHaveClass('text-color-scheme');
  });

  it('should apply --progress-bar-value as a percentage of max', () => {
    render(<ProgressBar {...defaultProps} max={20} value={4} />);

    expect(screen.getByRole('progressbar').style.getPropertyValue('--progress-bar-value')).toBe('20%');
  });

  it('should throttle rapid value and valueLabel updates to the transition interval', () => {
    jest.useFakeTimers();

    const { rerender } = render(<ProgressBar {...defaultProps} value={10} valueLabel="10 %" />);

    rerender(<ProgressBar {...defaultProps} value={20} valueLabel="20 %" />);
    rerender(<ProgressBar {...defaultProps} value={30} valueLabel="30 %" />);

    expect(screen.getByRole('progressbar')).toHaveAttribute('value', '10');
    expect(screen.getByRole('progressbar').style.getPropertyValue('--progress-bar-value')).toBe('10%');
    expect(screen.getByText('10 %')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(PROGRESS_BAR_VALUE_THROTTLE_MS);
    });

    expect(screen.getByRole('progressbar')).toHaveAttribute('value', '30');
    expect(screen.getByRole('progressbar').style.getPropertyValue('--progress-bar-value')).toBe('30%');
    expect(screen.getByText('30 %')).toBeInTheDocument();

    jest.useRealTimers();
  });

  it('should apply disabled state from context when prop is not provided', () => {
    render(
      <ContextPropsProvider value={{ isDisabled: true }}>
        <ProgressBar {...defaultProps} />
      </ContextPropsProvider>,
    );

    expect(screen.getByRole('progressbar')).toHaveClass('color-scheme-on-disabled');
    expect(screen.getByRole('progressbar')).not.toHaveClass(
      getColorSchemeClassName({ color: 'informative', isSubtle: true }),
    );
  });

  it('should prefer direct isDisabled over context', () => {
    render(
      <ContextPropsProvider value={{ isDisabled: true }}>
        <ProgressBar {...defaultProps} isDisabled={false} />
      </ContextPropsProvider>,
    );

    expect(screen.getByRole('progressbar')).not.toHaveClass('color-scheme-on-disabled');
    expect(screen.getByRole('progressbar')).toHaveClass(
      getColorSchemeClassName({ color: 'informative', isSubtle: true }),
    );
  });

  it('should apply validationState from context when prop is not provided', () => {
    render(
      <ContextPropsProvider value={{ validationState: 'danger' }}>
        <ProgressBar {...fieldProps} validationText="Add your work experience to continue" />
      </ContextPropsProvider>,
    );

    expect(screen.getByText('Add your work experience to continue')).toBeInTheDocument();
  });
});
