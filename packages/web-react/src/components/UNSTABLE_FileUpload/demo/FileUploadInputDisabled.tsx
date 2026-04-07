import React from 'react';
import { UNSTABLE_FileUpload } from '..';

const FileUploadInputDisabled = () => (
  <div className="Grid Grid--alignmentXStretch Grid--alignmentYStretch Grid--tablet--cols-2 Grid--cols-1">
    <UNSTABLE_FileUpload
      rootId="example-disabled-standard"
      id="file-uploader-disabled-standard"
      helperText="Max file size is 10 MB"
      label="Label"
      labelText="or drag and drop here"
      linkText="Upload your file"
      name="attachment-disabled-standard"
      isDisabled
      isRequired
    />
    <UNSTABLE_FileUpload
      rootId="example-disabled-compact"
      id="file-uploader-disabled-compact"
      helperText="Max file size is 10 MB"
      isCompact
      label="Label"
      labelText="or drag and drop here"
      linkText="Upload your file"
      name="attachment-disabled-compact"
      isDisabled
      isRequired
    />
  </div>
);

export default FileUploadInputDisabled;
