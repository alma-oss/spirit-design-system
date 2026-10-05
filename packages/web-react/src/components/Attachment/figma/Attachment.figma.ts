// url=<FIGMA_FILE_ID>?node-id=40955%3A1966
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Attachment/Attachment.tsx
// component=Attachment

import figma from 'figma';

const type = figma.selectedInstance.getEnum('Type', { File: undefined, Image: 'image' });
const status = figma.selectedInstance.getEnum('Status', {
  Default: undefined,
  Uploading: 'uploading',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
  Disabled: 'disabled',
});

const example = figma.code`
  <Attachment
    fileName="document.pdf"
    ${type ? figma.code`type="${type}"` : ''}
    ${status ? figma.code`status="${status}"` : ''}
  />`;

export default {
  id: 'Attachment',
  imports: ["import { Attachment } from '@alma-oss/spirit-web-react';"],
  example,
};
