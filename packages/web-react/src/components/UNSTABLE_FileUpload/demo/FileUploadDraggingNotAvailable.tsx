import React, { useEffect } from 'react';
import { Stack } from '../..';
import { UNSTABLE_FileUpload } from '..';

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
    <>
      <UNSTABLE_FileUpload
        id="file-uploader-dragging-not-available"
        helperText="Max file size is 10 MB"
        label="Label"
        labelText="or drag and drop here"
        linkText="Upload your file"
        name="attachments"
      />
      <Stack aria-label="Attachments" elementType="ul" hasSpacing />
    </>
  );
};

export default FileUploadDraggingNotAvailable;
