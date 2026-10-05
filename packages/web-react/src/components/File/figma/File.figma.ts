// url=<FIGMA_FILE_ID>?node-id=40955%3A1966
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/File/File.tsx
// component=File

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const label = instance.getString('Label Text');
const type = instance.getEnum('Type', { File: undefined, Image: 'image' });
const status = instance.getEnum('Status', {
  Default: undefined,
  Uploading: 'uploading',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
  Disabled: 'disabled',
});

const isImage = type === 'image';
const isUploading = status === 'uploading';
const isDisabled = status === 'disabled';
const validationState = status === 'success' || status === 'warning' || status === 'danger' ? status : undefined;

const validationTextHandle = instance.findText('Validation text', {
  traverseInstances: true,
  path: ['Validation text'],
});
const validationText =
  validationState && validationTextHandle.type !== 'ERROR' ? validationTextHandle.textContent : undefined;

export default {
  id: 'File',
  imports: ["import { File, FileImagePreview, ProgressBar } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <File
      id="file-1"
      label="${label}"
      onDismiss={() => {}}
      ${isDisabled ? 'isDisabled' : ''}
      ${validationState ? figma.code`validationState="${validationState}"` : ''}
      ${validationText ? figma.code`validationText="${validationText}"` : ''}
      ${isImage ? figma.code`previewSlot={<FileImagePreview imagePreview="image.jpg" label="Preview of ${label}" />}` : ''}
    >
      ${isUploading ? figma.code`<ProgressBar aria-label="Uploading ${label}" value={60} />` : ''}
    </File>`,
};
