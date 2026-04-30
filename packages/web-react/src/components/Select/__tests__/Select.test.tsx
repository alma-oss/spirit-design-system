import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  formFieldHelperTextContextPropsTest,
  formFieldLabelContextPropsTest,
  formFieldValidationTextContextPropsTest,
  requiredPropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { Sizes } from '../../../constants';
import Select from '../Select';

jest.mock('../../../hooks/useIcon');

describe('Select', () => {
  const selectChild = (
    <option value="1" key="1">
      Option 1
    </option>
  );

  stylePropsTest(Select);

  restPropsTest(Select, 'select');

  requiredPropsTest(Select, 'combobox', 'id', 'test-select');

  validHtmlAttributesTest(Select);

  ariaAttributesTest(Select);

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

  it.each([Object.values(Sizes)])('should render size %s', async (size) => {
    render(<Select id="select" label="Label" size={size} />);

    const inputContainer = screen.getByRole('combobox').parentElement;

    expect(inputContainer?.getAttribute('class')).toContain(size);
  });

  it('should have label', () => {
    render(
      <Select id="test-select" label="Label">
        {selectChild}
      </Select>,
    );

    expect(screen.getByText('Label')).toBeInTheDocument();
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
