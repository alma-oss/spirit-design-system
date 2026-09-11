import React from 'react';
import { File } from '../../File';
import { HelperText } from '../../HelperText';
import { ProgressBar } from '..';

const noop = () => {};

const ProgressBarWithFile = () => (
  <ul aria-label="Uploaded files">
    <File label="Document.pdf" onDismiss={noop} removeText="Cancel upload of Document.pdf">
      <ProgressBar
        aria-describedby="file-upload-status"
        aria-label="Uploading Document.pdf"
        value={60}
        valueLabel={'60\u00a0%'}
      />
      <HelperText elementType="span" helperText="Uploading your file…" id="file-upload-status" role="status" />
    </File>
  </ul>
);

export default ProgressBarWithFile;
