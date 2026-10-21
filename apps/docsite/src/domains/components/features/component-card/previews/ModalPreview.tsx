import { ModalBody, ModalDialog, ModalHeader } from '@alma-oss/spirit-web-react';
import React from 'react';
import type { PreviewComponent } from '../../component-catalog';
import { PREVIEW_GUIDES } from '../../component-catalog/constants/previewGuides';

const ModalPreview: PreviewComponent = () => (
  <div style={{ width: 300 }}>
    <ModalDialog>
      <ModalHeader>Modal Title</ModalHeader>
      <ModalBody>
        <p>A short description of the modal content.</p>
      </ModalBody>
    </ModalDialog>
  </div>
);

ModalPreview.guides = PREVIEW_GUIDES.VERTICAL;

export default ModalPreview;
