import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { renderToString } from 'react-dom/server';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  formFieldHelperTextContextPropsTest,
  formFieldLabelContextPropsTest,
  formFieldValidationTextContextPropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import UNSTABLE_FileUpload from '../UNSTABLE_FileUpload';

jest.mock('../../../hooks/useIcon');

const defaultProps = { id: 'file-uploader' };
const defaultPropsWithInput = { id: 'file-upload-input', name: 'file-upload-input', label: 'upload' };

describe('UNSTABLE_FileUpload', () => {
  classNamePrefixProviderTest((props) => <UNSTABLE_FileUpload {...defaultProps} {...props} />, 'FileUploader');

  stylePropsTest((props) => <UNSTABLE_FileUpload {...defaultProps} {...props} />);

  restPropsTest((props) => <UNSTABLE_FileUpload {...defaultProps} {...props} />, 'div');

  validHtmlAttributesTest(UNSTABLE_FileUpload, defaultProps);

  ariaAttributesTest(UNSTABLE_FileUpload, defaultProps);

  describe('with input (name provided)', () => {
    restPropsTest((props) => <UNSTABLE_FileUpload {...defaultPropsWithInput} {...props} />, 'div');

    validHtmlAttributesTest(UNSTABLE_FileUpload, defaultPropsWithInput);

    formFieldLabelContextPropsTest({
      renderComponent: (props) => <UNSTABLE_FileUpload {...defaultPropsWithInput} {...props} />,
      labelText: 'upload',
    });

    formFieldHelperTextContextPropsTest({
      renderComponent: (props) => <UNSTABLE_FileUpload {...defaultPropsWithInput} {...props} />,
      labelText: 'upload',
    });

    formFieldValidationTextContextPropsTest({
      renderComponent: (props) => <UNSTABLE_FileUpload {...defaultPropsWithInput} {...props} />,
      labelText: 'upload',
    });

    it('should have drag-and-drop class in Client component', () => {
      const { container } = render(<UNSTABLE_FileUpload {...defaultPropsWithInput} data-testid="test" />);

      const inputBlock = container.querySelector('.has-drag-and-drop');

      expect(inputBlock).toBeInTheDocument();
    });

    it('should not have drag-and-drop class in Server component', () => {
      const container = renderToString(<UNSTABLE_FileUpload {...defaultPropsWithInput} data-testid="test" />);

      expect(container).not.toContain('has-drag-and-drop');
    });

    it('should render label with html tags', () => {
      render(
        <UNSTABLE_FileUpload
          {...defaultPropsWithInput}
          label={
            <>
              Upload <b>File</b>
            </>
          }
          data-testid="test"
        />,
      );

      const labelElement = screen.getByText('File').parentElement as HTMLElement;

      expect(labelElement.innerHTML).toBe('Upload <b>File</b>');
    });

    it('should set wrapper id on root div and derive input id as {id}-input', () => {
      render(<UNSTABLE_FileUpload id="file-upload-wrapper" name="files" label="Upload" data-testid="wrapper" />);

      const wrapper = screen.getByTestId('wrapper');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveAttribute('id', 'file-upload-wrapper');
      expect(wrapper?.localName).toBe('div');

      const input = screen.getByLabelText('Upload');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('id', 'file-upload-wrapper-input');
      expect((input as HTMLInputElement).type).toBe('file');
    });

    it('should associate label with input via htmlFor and set helper/validation ids', () => {
      render(
        <UNSTABLE_FileUpload
          id="file-upload-with-messages"
          name="files"
          label="Upload"
          helperText="Max 10 MB"
          validationState="danger"
          validationText="Error"
        />,
      );

      const label = screen.getByText('Upload');
      expect(label).toHaveAttribute('for', 'file-upload-with-messages-input');

      expect(screen.getByText('Max 10 MB')).toHaveAttribute('id', 'file-upload-with-messages-input-helper-text');
      expect(screen.getByText('Error')).toHaveAttribute('id', 'file-upload-with-messages-input-validation-text');
    });

    it('should render validation icon when hasValidationIcon is set', () => {
      render(
        <UNSTABLE_FileUpload
          id="file-upload-validation-icon"
          name="files"
          label="Upload"
          hasValidationIcon
          validationState="danger"
          validationText="Invalid"
        />,
      );

      const validationRoot = screen.getByText('Invalid').parentElement as HTMLElement;

      expect(validationRoot.querySelector('svg')).toBeInTheDocument();
    });
  });
});
