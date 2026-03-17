import { render, screen } from '@testing-library/react';
import React from 'react';
import { renderToString } from 'react-dom/server';
import {
  classNamePrefixProviderTest,
  formFieldHelperTextContextPropsTest,
  formFieldLabelContextPropsTest,
  formFieldValidationTextContextPropsTest,
  restPropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import FileUploaderInput from '../FileUploaderInput';
import '@testing-library/jest-dom';

jest.mock('../../../hooks/useIcon');

describe('FileUploaderInput', () => {
  classNamePrefixProviderTest(FileUploaderInput, 'FileUploaderInput');

  restPropsTest(FileUploaderInput, 'div');

  validHtmlAttributesTest(FileUploaderInput);

  formFieldLabelContextPropsTest({
    renderComponent: (props) => (
      <FileUploaderInput id="file-uploader-label-context" name="file-uploader-files" {...props} />
    ),
  });

  formFieldHelperTextContextPropsTest({
    renderComponent: (props) => (
      <FileUploaderInput id="file-uploader-helper-context" name="file-uploader-files" {...props} />
    ),
  });

  formFieldValidationTextContextPropsTest({
    renderComponent: (props) => (
      <FileUploaderInput id="file-uploader-validation-context" name="file-uploader-files" {...props} />
    ),
  });

  it('should have drag-and-drop class in Client component', () => {
    render(<FileUploaderInput id="file-uploader-input" name="file-uploader-input" label="upload" data-testid="test" />);

    const dropZone = screen.getAllByTestId('test')[0];

    expect(dropZone).toHaveClass('has-drag-and-drop');
  });

  it('should not have drag-and-drop class in Server component', () => {
    const container = renderToString(
      <FileUploaderInput id="file-uploader-input" name="file-uploader-input" label="upload" data-testid="test" />,
    );

    expect(container).not.toContain('has-drag-and-drop');
  });

  it('should render label with html tags', () => {
    render(
      <FileUploaderInput
        id="file-uploader-input"
        name="file-uploader-input"
        label={
          <>
            Upload <b>File</b>
          </>
        }
        data-testid="test"
      />,
    );

    const element = screen.getByText('File').parentElement as HTMLElement;

    expect(element).toHaveTextContent('Upload File');
    expect(element.innerHTML).toBe('Upload <b>File</b>');
  });

  it('should render validation icon when hasValidationIcon is set', () => {
    render(
      <FileUploaderInput
        id="file-uploader-validation-icon"
        name="file-uploader-validation-icon"
        label="upload"
        hasValidationIcon
        validationState="danger"
        validationText="Invalid"
      />,
    );

    const validationRoot = screen.getByText('Invalid').parentElement as HTMLElement;

    expect(validationRoot.querySelector('svg')).toBeInTheDocument();
  });
});
