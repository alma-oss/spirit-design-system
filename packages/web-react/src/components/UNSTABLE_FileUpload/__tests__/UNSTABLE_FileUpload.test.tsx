import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
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
  classNamePrefixProviderTest((props) => <UNSTABLE_FileUpload {...defaultProps} {...props} />, 'FileUploader');

  stylePropsTest((props) => <UNSTABLE_FileUpload {...defaultProps} {...props} />);

  restPropsTest((props) => <UNSTABLE_FileUpload {...defaultProps} {...props} />, 'div');

  validHtmlAttributesTest(UNSTABLE_FileUpload, defaultProps);

  ariaAttributesTest(UNSTABLE_FileUpload, defaultProps);

  describe('with input (name provided)', () => {
    restPropsTest((props) => <UNSTABLE_FileUpload {...defaultPropsWithInput} {...props} />, 'div');

    validationTextPropsTest(
      (props) => <UNSTABLE_FileUpload {...defaultPropsWithInput} {...props} />,
      '.FileUploaderInput__validationText',
    );

    validHtmlAttributesTest(UNSTABLE_FileUpload, defaultPropsWithInput);

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

      const labelElement = container.querySelector('.FileUploaderInput__label');

      expect(labelElement).toHaveTextContent('Upload File');
      expect(labelElement?.innerHTML).toBe('Upload <b>File</b>');
    });
  });
});
