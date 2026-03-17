import { render, screen } from '@testing-library/react';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { classNamePrefixProviderTest, restPropsTest, validHtmlAttributesTest } from '@local/tests';
import FileUploaderInput from '../FileUploaderInput';
import '@testing-library/jest-dom';

jest.mock('../../../hooks/useIcon');

describe('FileUploaderInput', () => {
  classNamePrefixProviderTest(FileUploaderInput, 'FileUploaderInput');

  restPropsTest(FileUploaderInput, 'div');

  validHtmlAttributesTest(FileUploaderInput);

  it('should have drag-and-drop class in Client component', () => {
    render(<FileUploaderInput id="test-uploader" name="test-uploader" label="upload" data-testid="test" />);

    const dropZone = screen.getAllByTestId('test')[0];

    expect(dropZone).toHaveClass('has-drag-and-drop');
  });

  it('should not have drag-and-drop class in Server component', () => {
    const container = renderToString(
      <FileUploaderInput id="test-uploader" name="test-uploader" label="upload" data-testid="test" />,
    );

    expect(container).not.toContain('has-drag-and-drop');
  });

  it('should render label with html tags', () => {
    render(
      <FileUploaderInput
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
