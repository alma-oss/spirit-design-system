import { render } from '@testing-library/react';
import React from 'react';
import { validHtmlAttributesTest } from '@local/tests';
import UNSTABLE_FileUpload from '../UNSTABLE_FileUpload';
import UNSTABLE_FileUploadAttachments from '../UNSTABLE_FileUploadAttachments';

jest.mock('../../../hooks/useIcon');

describe('UNSTABLE_FileUploadAttachments', () => {
  const props = {
    label: 'File uploader',
    id: 'file-uploader',
  };

  validHtmlAttributesTest(UNSTABLE_FileUploadAttachments, props);

  it('should render the component with the provided props', () => {
    const { getByText, getByRole } = render(<UNSTABLE_FileUploadAttachments {...props} />);
    const label = getByText(props.label);
    const list = getByRole('list');

    expect(label).toBeInTheDocument();
    expect(list).toBeInTheDocument();
  });

  it('should render the attachments as children', () => {
    const { getByText } = render(
      <UNSTABLE_FileUpload id="test">
        <UNSTABLE_FileUploadAttachments {...props}>
          <li key="1">file1.txt</li>
          <li key="2">file2.txt</li>
        </UNSTABLE_FileUploadAttachments>
      </UNSTABLE_FileUpload>,
    );

    expect(getByText('file1.txt')).toBeInTheDocument();
    expect(getByText('file2.txt')).toBeInTheDocument();
  });
});
