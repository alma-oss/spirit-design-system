import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  formFieldHelperTextContextPropsTest,
  formFieldLabelContextPropsTest,
  formFieldValidationTextContextPropsTest,
  requiredPropsTest,
  restPropsTest,
  sizePropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
  validationStatePropsTest,
} from '@local/tests';
import Select from '../Select';

jest.mock('../../../hooks/useIcon');

describe('Select', () => {
  const selectChild = (
    <option value="1" key="1">
      Option 1
    </option>
  );

  classNamePrefixProviderTest(Select, 'Select');

  stylePropsTest(Select);

  restPropsTest(Select, 'select');

  validationStatePropsTest(Select, 'Select--');

  requiredPropsTest(Select, 'combobox', 'id', 'test-select');

  validHtmlAttributesTest(Select);

  ariaAttributesTest(Select);

  sizePropsTest(Select);

  formFieldLabelContextPropsTest({
    renderComponent: (props) => (
      <Select id="select-context" label="Label" {...props}>
        {selectChild}
      </Select>
    ),
  });

  formFieldHelperTextContextPropsTest({
    renderComponent: (props) => (
      <Select id="select-helper-context" label="Label" {...props}>
        {selectChild}
      </Select>
    ),
  });

  formFieldValidationTextContextPropsTest({
    renderComponent: (props) => (
      <Select id="select-validation-context" label="Label" {...props}>
        {selectChild}
      </Select>
    ),
  });

  it('should have label', () => {
    render(
      <Select id="test-select" label="Label">
        {selectChild}
      </Select>,
    );

    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it('should have input classname', () => {
    render(
      <Select id="test-select" label="Label">
        {selectChild}
      </Select>,
    );

    expect(screen.getByLabelText('Label')).toHaveClass('Select__input');
  });

  it('should have fluid classname', () => {
    render(
      <Select id="test-select" label="Label" isFluid>
        {selectChild}
      </Select>,
    );

    expect(screen.getByText('Label').parentElement).toHaveClass('Select--fluid');
  });

  it('should render label with html tags', () => {
    render(
      <Select
        id="test-select"
        label={
          <>
            Select <b>Label</b>
          </>
        }
      >
        {selectChild}
      </Select>,
    );

    const element = screen.getByText('Label').parentElement as HTMLElement;

    expect(element).toHaveTextContent('Select Label');
    expect(element.innerHTML).toBe('Select <b>Label</b>');
  });

  it('should render validation icon when hasValidationIcon is set', () => {
    render(
      <Select
        id="select-validation-icon"
        label="Label"
        hasValidationIcon
        validationState="danger"
        validationText="Invalid"
      >
        {selectChild}
      </Select>,
    );

    const validationRoot = screen.getByText('Invalid').parentElement as HTMLElement;

    expect(validationRoot.querySelector('svg')).toBeInTheDocument();
  });
});
