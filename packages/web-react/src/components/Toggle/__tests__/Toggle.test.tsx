import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  requiredPropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
  validationStatePropsTest,
} from '@local/tests';
import Toggle from '../Toggle';

describe('Toggle', () => {
  classNamePrefixProviderTest(Toggle, 'Toggle');

  stylePropsTest(Toggle);

  restPropsTest(Toggle, 'input');

  validationStatePropsTest(Toggle, 'Toggle--');

  requiredPropsTest(Toggle, 'checkbox', 'id', 'example-id');

  validHtmlAttributesTest(Toggle);

  ariaAttributesTest(Toggle);

  it('should have correct className', () => {
    render(<Toggle id="test-toggle" label="Toggle Label" />);

    expect(screen.getByRole('checkbox').parentElement).toHaveClass('Toggle');
  });

  it('should have label classname', () => {
    render(<Toggle id="test-toggle" label="Toggle Label" />);

    const label = screen.getByText('Toggle Label');

    expect(label).toHaveClass('Toggle__label');
    expect(label).toContainHTML('label');
  });

  it('should have label with required classname', () => {
    render(<Toggle id="test-toggle" label="Toggle Label" isRequired />);

    const label = screen.getByText('Toggle Label');

    expect(label).toHaveClass('Toggle__label');
    expect(label).toHaveClass('Toggle__label--required');
  });

  it('should have hidden classname', () => {
    render(<Toggle id="test-toggle" label="Toggle Label" isLabelHidden />);

    const label = screen.getByText('Toggle Label');

    expect(label).toHaveClass('Toggle__label');
    expect(label).toHaveClass('Toggle__label--hidden');
  });

  it('should have input classname', () => {
    render(<Toggle id="test-toggle" label="Toggle Label" />);

    expect(screen.getByRole('checkbox')).toHaveClass('Toggle__input');
  });

  it('should have helper text with correct classname', () => {
    render(<Toggle id="test-toggle" label="Toggle Label" helperText="Helper Text" />);

    const helperText = screen.getByText('Helper Text');

    expect(helperText).toBeInTheDocument();
  });

  it('should have correct attribute when checked', () => {
    render(<Toggle id="test-toggle" label="Toggle Label" isChecked />);

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('should have correct attribute when disabled', () => {
    render(<Toggle id="test-toggle" label="Toggle Label" isDisabled />);

    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('should have correct classname if fluid', () => {
    render(<Toggle id="test-toggle" label="Toggle Label" isFluid />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox.parentElement).toHaveClass('Toggle');
    expect(checkbox.parentElement).toHaveClass('Toggle--fluid');
  });

  it('should have indicators classname', () => {
    render(<Toggle id="test-toggle" label="Toggle Label" hasIndicators />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toHaveClass('Toggle__input');
    expect(checkbox).toHaveClass('Toggle__input--indicators');
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

    const element = screen.getByRole('checkbox').previousElementSibling?.firstChild as HTMLElement;

    expect(element).toHaveTextContent('Toggle Label');
    expect(element.innerHTML).toBe('Toggle <b>Label</b>');
  });
});
