import React, { useEffect } from 'react';
import { UNSTABLE_FileUpload, UNSTABLE_FileUploadAttachments, UNSTABLE_FileUploadInput } from '..';

const FileUploadDraggingNotAvailable = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const element = document
        .getElementById('file-uploader-dragging-not-available')
        ?.querySelector('.has-drag-and-drop');
      element?.classList.remove('has-drag-and-drop');
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // ⚠️ VISUAL EXAMPLE ONLY – shows how the input looks when drag-and-drop is not supported. No files are added.
  return (
    <UNSTABLE_FileUpload id="file-uploader-dragging-not-available">
      <UNSTABLE_FileUploadInput
        helperText="Max file size is 10 MB"
        id="file-uploader-dragging-not-available-input"
        label="Label"
        labelText="or drag and drop here"
        linkText="Upload your file"
        name="attachments"
      />
      <UNSTABLE_FileUploadAttachments id="file-uploader-dragging-not-available-attachment" label="Attachments" />
    </UNSTABLE_FileUpload>
  );
};

export default FileUploadDraggingNotAvailable;
