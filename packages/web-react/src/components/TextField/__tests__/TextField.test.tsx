import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  formFieldHelperTextContextPropsTest,
  formFieldLabelContextPropsTest,
  formFieldValidationTextContextPropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { Sizes } from '../../../constants';
import { type TextFieldType } from '../../../types';
import TextField from '../TextField';

jest.mock('../../../hooks/useIcon');

describe('TextField', () => {
  formFieldLabelContextPropsTest({
    renderComponent: (props) => <TextField id="textfield-context" label="Label" type="text" {...props} />,
  });

  formFieldHelperTextContextPropsTest({
    renderComponent: (props) => <TextField id="textfield-helper-context" label="Label" type="text" {...props} />,
  });

  formFieldValidationTextContextPropsTest({
    renderComponent: (props) => <TextField id="textfield-validation-context" label="Label" type="text" {...props} />,
  });

  describe.each(['text', 'password', 'email'])('input type %s', (type) => {
    stylePropsTest(TextField);

    restPropsTest(TextField, 'input');

    validHtmlAttributesTest(TextField);

    ariaAttributesTest(TextField);

    it.each([Object.values(Sizes)])('should render size %s', async (size) => {
      render(<TextField id="textfield" label="Label" type={type as TextFieldType} size={size} />);

      await waitFor(() => {
        const inputContainer = screen.getByLabelText('Label').parentElement;

        expect(inputContainer?.getAttribute('class')).toContain(size);
      });
    });

    it('should have label', () => {
      render(<TextField id="textfield" label="Label" type={type as TextFieldType} />);

      expect(screen.getByText('Label')).toBeInTheDocument();
    });

    it('should have disabled attribute on input when isDisabled prop is set', () => {
      render(<TextField id="textfield" label="Label" type={type as TextFieldType} isDisabled />);

      expect(screen.getByLabelText('Label')).toHaveAttribute('disabled');
    });

    it('should render label with html tags', () => {
      render(
        <TextField
          id="textfield"
          label={
            <>
              TextField <b>Label</b>
            </>
          }
          type={type as TextFieldType}
        />,
      );

      const element = screen.getByText('Label').parentElement as HTMLElement;

      expect(element).toHaveTextContent('TextField Label');
      expect(element.innerHTML).toBe('TextField <b>Label</b>');
    });
  });

  describe('hasPasswordToggle', () => {
    beforeEach(() => {
      render(<TextField id="textfield" label="Label" hasPasswordToggle />);
    });

    it('should have password toggle button', () => {
      expect(screen.getByRole('switch')).toHaveClass('ControlButton');
    });

    it('should have type password with password toggle', () => {
      expect(screen.getByLabelText('Label')).toHaveAttribute('type', 'password');
    });

    it('should have correct aria label of the password toggle', () => {
      expect(screen.getByRole('switch')).toHaveAttribute('aria-label', 'Show password');
    });

    it('should toggle type with password toggle', () => {
      const element = screen.getByLabelText('Label');

      expect(element).toHaveAttribute('type', 'password');

      fireEvent.click(screen.getByRole('switch'));

      expect(element).toHaveAttribute('type', 'text');
    });

    it('should toggle aria label of the password toggle', () => {
      const element = screen.getByRole('switch');

      expect(element).toHaveAttribute('aria-label', 'Show password');

      fireEvent.click(element);

      expect(element).toHaveAttribute('aria-label', 'Hide password');
    });
  });

  describe('hasPasswordToggle isDisabled', () => {
    it('should have disabled attribute on input and toggle button', () => {
      render(<TextField id="textfield" label="Label" hasPasswordToggle isDisabled />);

      expect(screen.getByLabelText('Label')).toHaveAttribute('disabled');
      expect(screen.getByRole('switch')).toHaveAttribute('disabled');
    });
  });

  it('should render validation icon when hasValidationIcon is set', () => {
    render(
      <TextField
        id="textfield-validation-icon"
        label="Label"
        type="text"
        hasValidationIcon
        validationState="danger"
        validationText="Invalid"
      />,
    );

    const validationRoot = screen.getByText('Invalid').parentElement as HTMLElement;

    expect(validationRoot.querySelector('svg')).toBeInTheDocument();
  });
});
