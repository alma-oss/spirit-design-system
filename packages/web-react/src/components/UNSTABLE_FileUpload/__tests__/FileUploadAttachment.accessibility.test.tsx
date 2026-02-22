import React from 'react';
import { accessibilityTest } from '@local/tests';
import UNSTABLE_FileUploadAttachment from '../UNSTABLE_FileUploadAttachment';

jest.mock('../../../hooks/useIcon');

describe('UNSTABLE_FileUploadAttachment accessibility', () => {
  accessibilityTest(
    (props) => (
      <ul>
        <UNSTABLE_FileUploadAttachment
          {...props}
          id="file-uploader-attachment"
          label="test-file.txt"
          onDismiss={() => {}}
        />
      </ul>
    ),
    'li',
  );
});
