import { ModalBody, ModalDialog, ModalHeader } from '@alma-oss/spirit-web-react';
import React from 'react';

const ModalPreview = () => (
  <div style={{ width: 300 }}>
    <ModalDialog>
      <ModalHeader>Modal Title</ModalHeader>
      <ModalBody>
        <p>A short description of the modal content.</p>
      </ModalBody>
    </ModalDialog>
  </div>
);

export default ModalPreview;
