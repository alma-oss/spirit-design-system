import React from 'react';
import { accessibilityTest } from '@local/tests';
import { UNSTABLE_FileUpload, UNSTABLE_FileUploadAttachments } from '..';

jest.mock('../../../hooks/useIcon');

describe('FileUploadAttachments accessibility', () => {
  accessibilityTest(
    (props) => (
      <UNSTABLE_FileUpload id="file-uploader">
        <UNSTABLE_FileUploadAttachments {...props} id="file-uploader-list" label="Attachments" />
      </UNSTABLE_FileUpload>
    ),
    'ul',
  );
});
