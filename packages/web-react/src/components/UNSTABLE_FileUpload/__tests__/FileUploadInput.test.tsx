import { render, screen } from '@testing-library/react';
import React from 'react';
import { renderToString } from 'react-dom/server';
import {
  classNamePrefixProviderTest,
  restPropsTest,
  validHtmlAttributesTest,
  validationTextPropsTest,
} from '@local/tests';
import UNSTABLE_FileUploadInput from '../UNSTABLE_FileUploadInput';
import '@testing-library/jest-dom';

jest.mock('../../../hooks/useIcon');

describe('UNSTABLE_FileUploadInput', () => {
  classNamePrefixProviderTest(UNSTABLE_FileUploadInput, 'FileUploaderInput');

  restPropsTest(UNSTABLE_FileUploadInput, 'div');

  validationTextPropsTest(UNSTABLE_FileUploadInput, '.FileUploaderInput__validationText');

  validHtmlAttributesTest(UNSTABLE_FileUploadInput);

  it('should have drag-and-drop class in Client component', () => {
    render(<UNSTABLE_FileUploadInput id="test-uploader" name="test-uploader" label="upload" data-testid="test" />);

    const dropZone = screen.getAllByTestId('test')[0];

    expect(dropZone).toHaveClass('has-drag-and-drop');
  });

  it('should not have drag-and-drop class in Server component', () => {
    const container = renderToString(
      <UNSTABLE_FileUploadInput id="test-uploader" name="test-uploader" label="upload" data-testid="test" />,
    );

    expect(container).not.toContain('has-drag-and-drop');
  });

  it('should render label with html tags', () => {
    render(
      <UNSTABLE_FileUploadInput
        id="test-uploader"
        name="test-uploader"
        label={
          <>
            Upload <b>File</b>
          </>
        }
        data-testid="test"
      />,
    );

    const element = screen.getAllByTestId('test')[0].firstChild as HTMLElement;

    expect(element).toHaveTextContent('Upload File');
    expect(element.innerHTML).toBe('Upload <b>File</b>');
  });
});
