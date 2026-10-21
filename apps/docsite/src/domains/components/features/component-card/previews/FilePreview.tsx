'use client';

import { Box, File, Icon } from '@alma-oss/spirit-web-react';
import React from 'react';

const FilePreview = () => (
  <ul aria-label="File attachments" style={{ width: 280 }}>
    <File
      helperText="8,5 kB"
      iconName="file"
      label="Document.pdf"
      previewSlot={
        <Box
          UNSAFE_className="File__preview"
          backgroundColor="emotion-informative-subtle"
          textColor="emotion-informative-basic"
        >
          <Icon boxSize={20} name="file" />
        </Box>
      }
      removeText="Remove file Document.pdf"
      onDismiss={() => undefined}
    />
  </ul>
);

export default FilePreview;
