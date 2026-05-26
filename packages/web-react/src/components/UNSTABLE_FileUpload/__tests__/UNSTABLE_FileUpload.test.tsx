import '@testing-library/jest-dom';
import { createEvent, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { renderToString } from 'react-dom/server';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
  validationTextPropsTest,
} from '@local/tests';
import UNSTABLE_FileUpload from '../UNSTABLE_FileUpload';

jest.mock('../../../hooks/useIcon');

const defaultProps = { id: 'file-uploader' };
const defaultPropsWithInput = { id: 'test-uploader', name: 'test-uploader', label: 'upload' };

describe('UNSTABLE_FileUpload', () => {
  classNamePrefixProviderTest((props) => <UNSTABLE_FileUpload {...defaultProps} {...props} />, 'UNSTABLE_FileUpload');

  stylePropsTest((props) => <UNSTABLE_FileUpload {...defaultProps} {...props} />);

  restPropsTest((props) => <UNSTABLE_FileUpload {...defaultProps} {...props} />, 'div');

  validHtmlAttributesTest(UNSTABLE_FileUpload, defaultProps);

  ariaAttributesTest(UNSTABLE_FileUpload, defaultProps);

  describe('with input (name provided)', () => {
    restPropsTest((props) => <UNSTABLE_FileUpload {...defaultPropsWithInput} {...props} />, 'div');

    validationTextPropsTest(
      (props) => <UNSTABLE_FileUpload {...defaultPropsWithInput} {...props} />,
      '.UNSTABLE_FileUploadInput__validationText',
    );

    validHtmlAttributesTest(UNSTABLE_FileUpload, defaultPropsWithInput);

    it('should have drag-and-drop class in Client component', () => {
      const { container } = render(<UNSTABLE_FileUpload {...defaultPropsWithInput} data-testid="test" />);

      const inputBlock = container.querySelector('.has-drag-and-drop');

      expect(inputBlock).toBeInTheDocument();
    });

    it('should omit drag-and-drop class when isDragAndDropSupported is false', () => {
      const { container } = render(
        <UNSTABLE_FileUpload {...defaultPropsWithInput} isDragAndDropSupported={false} data-testid="test" />,
      );

      expect(container.querySelector('.has-drag-and-drop')).not.toBeInTheDocument();
    });

    it('should not have drag-and-drop class in Server component', () => {
      const container = renderToString(<UNSTABLE_FileUpload {...defaultPropsWithInput} data-testid="test" />);

      expect(container).not.toContain('has-drag-and-drop');
    });

    it('should render label with html tags', () => {
      const { container } = render(
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

      const labelElement = container.querySelector('.UNSTABLE_FileUploadInput__label');

      expect(labelElement).toHaveTextContent('Upload File');
      expect(labelElement?.innerHTML).toBe('Upload <b>File</b>');
    });

    it('should set id on root wrapper when rootId is provided', () => {
      const { container } = render(
        <UNSTABLE_FileUpload {...defaultPropsWithInput} rootId="example-with-file-list" data-testid="test" />,
      );

      const root = container.querySelector('.UNSTABLE_FileUpload');

      expect(root).toHaveAttribute('id', 'example-with-file-list');
    });

    it('should disable only upload interactions when isUploadDisabled is true', async () => {
      const user = userEvent.setup();
      const onFilesSelected = jest.fn();
      const { container } = render(
        <UNSTABLE_FileUpload {...defaultPropsWithInput} isUploadDisabled onFilesSelected={onFilesSelected} />,
      );

      const input = container.querySelector('input[type="file"]');
      const inputRoot = container.querySelector('.UNSTABLE_FileUploadInput');
      const dropZone = container.querySelector('.UNSTABLE_FileUploadInput__dropZone');
      const dropZoneLabel = container.querySelector('.UNSTABLE_FileUploadInput__dropZoneLabel');

      expect(input).toBeDisabled();
      expect(inputRoot).not.toHaveClass('UNSTABLE_FileUploadInput--disabled');
      expect(dropZone).toHaveClass('UNSTABLE_FileUploadInput__dropZone--disabled');
      expect(dropZoneLabel).toBeInTheDocument();

      if (dropZoneLabel) {
        await user.click(dropZoneLabel);
      }

      expect(onFilesSelected).not.toHaveBeenCalled();
    });

    it('should prevent default browser drop behavior when upload is disabled', () => {
      const { container } = render(<UNSTABLE_FileUpload {...defaultPropsWithInput} isUploadDisabled />);

      const inputRoot = container.querySelector('.UNSTABLE_FileUploadInput');

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
