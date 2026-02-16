import React from 'react';
import { accessibilityTest } from '@local/tests';
import UNSTABLE_Attachment from '../UNSTABLE_Attachment';

jest.mock('../../../hooks/useIcon');

describe('UNSTABLE_Attachment accessibility', () => {
  accessibilityTest(
    (props) => (
      <ul>
        <UNSTABLE_Attachment {...props} id="file-uploader-attachment" label="test-file.txt" onDismiss={() => {}} />
      </ul>
    ),
    'li',
  );
});
