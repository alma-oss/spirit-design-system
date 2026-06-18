import '@testing-library/jest-dom';
import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
import FileUpload from '../FileUpload';

jest.mock('../../../hooks/useIcon');

const defaultProps = { id: 'file-uploader' };
const defaultPropsWithInput = { id: 'file-upload-input', name: 'file-upload-input', label: 'upload' };

describe('FileUpload', () => {
  classNamePrefixProviderTest((props) => <FileUpload {...defaultProps} {...props} />, 'FileUpload');

  stylePropsTest((props) => <FileUpload {...defaultProps} {...props} />);

  restPropsTest((props) => <FileUpload {...defaultProps} {...props} />, 'div');

  validHtmlAttributesTest(FileUpload, defaultProps);

  ariaAttributesTest(FileUpload, defaultProps);

  describe('with input (name provided)', () => {
    restPropsTest((props) => <FileUpload {...defaultPropsWithInput} {...props} />, 'div');

    validHtmlAttributesTest(FileUpload, defaultPropsWithInput);

    formFieldLabelContextPropsTest({
      renderComponent: (props) => <FileUpload {...defaultPropsWithInput} {...props} />,
      labelText: 'upload',
    });

    formFieldHelperTextContextPropsTest({
      renderComponent: (props) => <FileUpload {...defaultPropsWithInput} {...props} />,
      labelText: 'upload',
    });

    formFieldValidationTextContextPropsTest({
      renderComponent: (props) => <FileUpload {...defaultPropsWithInput} {...props} />,
      labelText: 'upload',
    });

    it('should have drag-and-drop class in Client component', () => {
      const { container } = render(<FileUpload {...defaultPropsWithInput} data-testid="test" />);

      const inputBlock = container.querySelector('.has-drag-and-drop');

      expect(inputBlock).toBeInTheDocument();
    });

    it('should omit drag-and-drop class when isDragAndDropSupported is false', () => {
      const { container } = render(
        <FileUpload {...defaultPropsWithInput} isDragAndDropSupported={false} data-testid="test" />,
      );

      expect(container.querySelector('.has-drag-and-drop')).not.toBeInTheDocument();
    });

    it('should not have drag-and-drop class in Server component', () => {
      const container = renderToString(<FileUpload {...defaultPropsWithInput} data-testid="test" />);

      expect(container).not.toContain('has-drag-and-drop');
    });

    it('should render label with html tags', () => {
      render(
        <FileUpload
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
      render(<FileUpload id="file-upload-wrapper" name="files" label="Upload" data-testid="wrapper" />);

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
        <FileUpload
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
        <FileUpload
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

    it('should set id on root wrapper when rootId is provided', () => {
      const { container } = render(
        <FileUpload {...defaultPropsWithInput} rootId="example-with-file-list" data-testid="test" />,
      );

      const root = container.querySelector('.FileUpload');

      expect(root).toHaveAttribute('id', 'example-with-file-list');
    });

    it('should disable only upload interactions when isUploadDisabled is true', async () => {
      const user = userEvent.setup();
      const onFilesSelected = jest.fn();
      const { container } = render(
        <FileUpload {...defaultPropsWithInput} isUploadDisabled onFilesSelected={onFilesSelected} />,
      );

      const input = container.querySelector('input[type="file"]');
      const inputRoot = container.querySelector('.FileUploadInput');
      const dropZone = container.querySelector('.FileUploadInput__dropZone');
      const dropZoneLabel = container.querySelector('.FileUploadInput__dropZoneLabel');

      expect(input).toBeDisabled();
      expect(inputRoot).not.toHaveClass('FileUploadInput--disabled');
      expect(dropZone).toHaveClass('FileUploadInput__dropZone--disabled');
      expect(dropZoneLabel).toBeInTheDocument();

      if (dropZoneLabel) {
        await user.click(dropZoneLabel);
      }

      expect(onFilesSelected).not.toHaveBeenCalled();
    });

    it('should prevent default browser drop behavior when upload is disabled', () => {
      const { container } = render(<FileUpload {...defaultPropsWithInput} isUploadDisabled />);

      const inputRoot = container.querySelector('.FileUploadInput');

      expect(inputRoot).toBeInTheDocument();

      const dragOverEvent = createEvent.dragOver(inputRoot as HTMLElement);
      fireEvent(inputRoot as HTMLElement, dragOverEvent);

      expect(dragOverEvent.defaultPrevented).toBe(true);

      const dropEvent = createEvent.drop(inputRoot as HTMLElement);
      fireEvent(inputRoot as HTMLElement, dropEvent);

      expect(dropEvent.defaultPrevented).toBe(true);
    });
  });
});
