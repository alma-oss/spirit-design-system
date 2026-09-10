import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
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
import { getColorSchemeClassName } from '../../../utils';
import { ProgressBarColorsExtended } from '../constants';
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

  it('should render disabled bar without a color scheme', () => {
    render(<ProgressBar {...defaultProps} isDisabled />);

    const element = screen.getByRole('progressbar');

    expect(element).toHaveClass('ProgressBar');
    expect(element).not.toHaveClass('color-scheme-on-disabled');
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

  it('should render value label to the right of the bar', () => {
    const { container } = render(<ProgressBar {...defaultProps} valueLabel="60 %" />);

    expect(screen.getByText('60 %')).toBeInTheDocument();
    expect(container.querySelector('.Flex')).toHaveClass(
      'Flex',
      'Flex--horizontal',
      'Flex--noWrap',
      'Flex--alignmentYCenter',
    );
    expect(container.querySelector('.Flex')).not.toHaveClass('Flex--alignmentXStretch');
  });

  it('should render value label below the bar', () => {
    const { container } = render(<ProgressBar {...defaultProps} valuePlacement="bottom" valueLabel="4 out of 20" />);

    expect(container.querySelector('.Flex')).toHaveClass('Flex', 'Flex--vertical');
    expect(container.querySelector('.Flex')).not.toHaveClass('Flex--noWrap');
    expect(container.querySelector('.Flex')).not.toHaveClass('Flex--alignmentXStretch');
  });

  it('should hide value label from assistive technologies when aria-valuetext is set', () => {
    render(<ProgressBar {...defaultProps} aria-valuetext="4 out of 20 awards" valueLabel="4 out of 20 awards" />);

    expect(screen.getByText('4 out of 20 awards')).toHaveAttribute('aria-hidden', 'true');
  });

  it('should apply the disabled color scheme to the value row', () => {
    const { container } = render(<ProgressBar {...defaultProps} isDisabled valueLabel="40 %" />);

    expect(container.querySelector('.Flex')).toHaveClass('color-scheme-on-disabled');
    expect(screen.getByText('40 %')).toHaveClass('text-color-scheme');
  });

  it('should apply --progress-bar-value as a percentage of max', () => {
    render(<ProgressBar {...defaultProps} max={20} value={4} />);

    expect(screen.getByRole('progressbar').style.getPropertyValue('--progress-bar-value')).toBe('20%');
  });

  it('should set id on the visible value label', () => {
    render(<ProgressBar {...defaultProps} valueLabel="30 %" valueLabelId="progress-bar-animated-value" />);

    expect(screen.getByText('30 %')).toHaveAttribute('id', 'progress-bar-animated-value');
  });
});
