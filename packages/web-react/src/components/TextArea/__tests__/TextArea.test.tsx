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
import TextArea from '../TextArea';

jest.mock('../../../hooks/useIcon');

describe('TextArea', () => {
  formFieldLabelContextPropsTest({
    renderComponent: (props) => <TextArea id="textarea-context" label="Label" {...props} />,
  });

  formFieldHelperTextContextPropsTest({
    renderComponent: (props) => <TextArea id="textarea-helper-context" label="Label" {...props} />,
  });

  formFieldValidationTextContextPropsTest({
    renderComponent: (props) => <TextArea id="textarea-validation-context" label="Label" {...props} />,
  });

  stylePropsTest(TextArea);

  requiredPropsTest(TextArea, 'textbox', 'id', 'example-id');

  restPropsTest(TextArea, 'textarea');

  validHtmlAttributesTest(TextArea);

  ariaAttributesTest(TextArea);

  it.each([Object.values(Sizes)])('should render size %s', async (size) => {
    render(<TextArea id="textarea" label="Label" size={size} />);

    const inputContainer = screen.getByLabelText('Label').parentElement;

    expect(inputContainer?.getAttribute('class')).toContain(size);
  });

  it('should have label', () => {
    render(<TextArea id="textarea" label="Label" />);

    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  describe('autoresizing', () => {
    it('should adjust height when mounted and autoresizing is enabled', () => {
      render(<TextArea id="textarea" label="Label" isAutoResizing />);

      expect(screen.getByRole('textbox').style.height).toBe('2px');
    });

    it('should not adjust height when mounted and autoresizing is not used', () => {
      render(<TextArea id="textarea" label="Label" />);

      expect(screen.getByRole('textbox').style.height).toBe('');
    });
  });

  it('should render label with html tags', () => {
    render(
      <TextArea
        id="textarea"
        label={
          <>
            TextArea <b>Label</b>
          </>
        }
      />,
    );

    const element = screen.getByText('Label').parentElement as HTMLElement;

    expect(element).toHaveTextContent('TextArea Label');
    expect(element.innerHTML).toBe('TextArea <b>Label</b>');
  });

  it('should render validation icon when hasValidationIcon is set', () => {
    render(
      <TextArea
        id="textarea-validation-icon"
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
