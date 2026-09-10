import React from 'react';
import { File } from '../../File';
import { ProgressBar } from '..';

const noop = () => {};

const ProgressBarWithFile = () => (
  <ul aria-label="Uploaded files">
    <File label="Document.pdf" onDismiss={noop} removeText="Cancel upload of Document.pdf">
      <ProgressBar
        aria-describedby="file-upload-status"
        aria-label="Uploading Document.pdf"
        value={60}
        valueText="60 %"
      />
      <span className="HelperText" id="file-upload-status" role="status">
        Uploading your file…
      </span>
    </File>
  </ul>
);

export default ProgressBarWithFile;
