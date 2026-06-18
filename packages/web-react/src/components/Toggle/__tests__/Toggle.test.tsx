import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  formFieldHelperTextContextPropsTest,
  formFieldLabelContextPropsTest,
  formFieldValidationTextContextPropsTest,
  requiredPropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import Toggle from '../Toggle';

describe('Toggle', () => {
  classNamePrefixProviderTest(Toggle, 'Toggle', { getByRole: 'checkbox' });

  stylePropsTest(Toggle);

  restPropsTest(Toggle, 'input');

  requiredPropsTest(Toggle, 'checkbox', 'id', 'example-id');

  validHtmlAttributesTest(Toggle);

  ariaAttributesTest(Toggle);

  formFieldLabelContextPropsTest({
    renderComponent: (props) => <Toggle id="toggle-context" label="Label" {...props} />,
  });

  formFieldHelperTextContextPropsTest({
    renderComponent: (props) => <Toggle id="toggle-helper-context" label="Label" {...props} />,
  });

  formFieldValidationTextContextPropsTest({
    renderComponent: (props) => <Toggle id="toggle-validation-context" label="Label" {...props} />,
  });

  it('should render inline layout', () => {
    render(<Toggle id="test-toggle" label="Toggle Label" />);

    expect(screen.getByRole('checkbox').parentElement).toHaveClass('Flex', 'Flex--horizontalReversed');
    expect(screen.getByRole('checkbox').parentElement).toHaveClass('Flex--alignmentXSpaceBetween');
  });

  it('should have label', () => {
    render(<Toggle id="test-toggle" label="Toggle Label" />);

    expect(screen.getByRole('checkbox', { name: 'Toggle Label' })).toBeInTheDocument();
  });

  it('should have input classname', () => {
    render(<Toggle id="test-toggle" label="Toggle Label" />);

    expect(screen.getByRole('checkbox')).toHaveClass('Toggle');
  });

  it('should have helper text', () => {
    render(<Toggle id="test-toggle" label="Toggle Label" helperText="Helper Text" />);

    expect(screen.getByText('Helper Text')).toBeInTheDocument();
  });

  it('should have correct attribute when checked', () => {
    render(<Toggle id="test-toggle" label="Toggle Label" isChecked />);

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('should have correct attribute when disabled', () => {
    render(<Toggle id="test-toggle" label="Toggle Label" isDisabled />);

    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('should have indicators classname', () => {
    render(<Toggle id="test-toggle" label="Toggle Label" hasIndicators />);

    expect(screen.getByRole('checkbox')).toHaveClass('Toggle', 'Toggle--indicators');
  });

  it('should change the state of the checkbox when clicked', () => {
    render(<Toggle id="test-toggle" label="Toggle Label" />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('should render details content', () => {
    render(<Toggle id="test-toggle" label="Toggle Label" details="Details content" />);

    expect(screen.getByText('Details content')).toBeInTheDocument();
  });

  it('should have aria-details attribute when details is provided', () => {
    render(<Toggle id="test-toggle" label="Toggle Label" details="Details content" />);

    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-details', 'test-toggle-details');
  });

  it('should not render details when not provided', () => {
    render(<Toggle id="test-toggle" label="Toggle Label" />);

    expect(screen.queryByText('Details content')).not.toBeInTheDocument();
  });

  it('should render label with html tags', () => {
    render(
      <Toggle
        id="test-toggle"
        label={
          <>
            Toggle <b>Label</b>
          </>
        }
      />,
    );

    expect(screen.getByRole('checkbox', { name: 'Toggle Label' })).toBeInTheDocument();
  });

  it('should render validation icon when hasValidationIcon is set', () => {
    render(
      <Toggle
        id="toggle-validation-icon"
        label="Toggle Label"
        hasValidationIcon
        validationState="danger"
        validationText="Invalid"
      />,
    );

    const validationRoot = screen.getByText('Invalid').parentElement as HTMLElement;

    expect(validationRoot.querySelector('svg')).toBeInTheDocument();
  });
});
