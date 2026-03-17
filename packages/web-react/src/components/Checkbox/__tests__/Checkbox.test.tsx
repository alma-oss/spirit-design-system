import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  formFieldHelperTextContextPropsTest,
  formFieldLabelContextPropsTest,
  formFieldValidationTextContextPropsTest,
  itemPropsTest,
  requiredPropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
  validationStatePropsTest,
} from '@local/tests';
import Checkbox from '../Checkbox';

jest.mock('../../../hooks/useIcon');

describe('Checkbox', () => {
  classNamePrefixProviderTest(Checkbox, 'Checkbox');

  itemPropsTest(Checkbox);

  stylePropsTest(Checkbox);

  restPropsTest(Checkbox, 'input');

  validationStatePropsTest(Checkbox, 'Checkbox--');

  requiredPropsTest(Checkbox, 'checkbox', 'id', 'test-checkbox');

  validHtmlAttributesTest(Checkbox);

  ariaAttributesTest(Checkbox);

  formFieldLabelContextPropsTest({
    renderComponent: (props) => <Checkbox id="checkbox-context" label="Label" {...props} />,
  });

  formFieldHelperTextContextPropsTest({
    renderComponent: (props) => <Checkbox id="checkbox-helper-context" label="Label" {...props} />,
  });

  formFieldValidationTextContextPropsTest({
    renderComponent: (props) => <Checkbox id="checkbox-validation-context" label="Label" {...props} />,
  });

  it('should have text classname', () => {
    render(<Checkbox id="checkbox" label="Label" />);

    expect(screen.getByRole('checkbox').nextElementSibling).toHaveClass('Checkbox__text');
  });

  it('should have label', () => {
    render(<Checkbox id="checkbox" label="Label" />);

    expect(screen.getByRole('checkbox', { name: 'Label' })).toBeInTheDocument();
  });

  it('should have input classname', () => {
    render(<Checkbox id="checkbox" label="Label" />);

    expect(screen.getByRole('checkbox')).toHaveClass('Checkbox__input');
  });

  it('should have helper text', () => {
    render(<Checkbox id="checkbox" label="Label" helperText="text" />);

    const element = screen.getByText('text');

    expect(element).toBeInTheDocument();
  });

  it('should render label with html tags', () => {
    render(
      <Checkbox
        id="checkbox"
        label={
          <>
            Label <b>Text</b>
          </>
        }
      />,
    );

    expect(screen.getByRole('checkbox', { name: 'Label Text' })).toBeInTheDocument();
  });

  it('should register helper and validation text ids in aria-describedby', () => {
    render(
      <Checkbox
        id="checkbox-aria-describedby"
        label="Label"
        helperText="Helper"
        validationState="danger"
        validationText="Invalid"
      />,
    );

    const input = screen.getByRole('checkbox', { name: 'Label' });
    const describedBy = input.getAttribute('aria-describedby') ?? '';

    expect(describedBy).toContain('checkbox-aria-describedby-helper-text');
    expect(describedBy).toContain('checkbox-aria-describedby-validation-text');
  });

  it('should render validation icon when hasValidationIcon is set', () => {
    render(
      <Checkbox
        id="checkbox-validation-icon"
        label="Label"
        hasValidationIcon
        validationState="danger"
        validationText="Invalid"
      />,
    );

    const validationRoot = screen.getByText('Invalid').parentElement as HTMLElement;

    expect(validationRoot.querySelector('svg')).toBeInTheDocument();
  });
});
