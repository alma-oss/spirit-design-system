import React from 'react';
import { File } from '../../File';
import { ProgressBar } from '..';

const noop = () => {};

const ProgressBarWithFile = () => (
  <ul aria-label="Uploaded files">
    <File label="Document.pdf" onDismiss={noop} strings={{ ariaLabelRemove: 'Cancel upload of Document.pdf' }}>
      <ProgressBar aria-label="Uploading Document.pdf" value={60} />
    </File>
  </ul>
);

export default ProgressBarWithFile;
