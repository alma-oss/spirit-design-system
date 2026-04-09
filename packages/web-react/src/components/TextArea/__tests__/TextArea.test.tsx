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

  classNamePrefixProviderTest(TextArea, 'TextArea');

  stylePropsTest(TextArea);

  requiredPropsTest(TextArea, 'textbox', 'id', 'example-id');

  restPropsTest(TextArea, 'textarea');

  validationStatePropsTest(TextArea, 'TextArea--');

  validHtmlAttributesTest(TextArea);

  ariaAttributesTest(TextArea);

  sizePropsTest(TextArea);

  it('should have label', () => {
    render(<TextArea id="textarea" label="Label" />);

    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it('should have input classname', () => {
    render(<TextArea id="textarea" label="Label" />);

    expect(screen.getByRole('textbox')).toHaveClass('TextArea__input');
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
