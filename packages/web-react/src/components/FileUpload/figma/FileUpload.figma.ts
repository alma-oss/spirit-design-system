// url=<FIGMA_FILE_ID>?node-id=31127%3A2687
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/FileUpload/FileUpload.tsx
// component=FileUpload

import figma from 'figma';

const isCompact = figma.selectedInstance.getEnum('Style', { Expanded: undefined, Compact: true });
const isDisabled = figma.selectedInstance.getEnum('Disabled', { False: false, True: true });

const example = figma.code`
  <FileUpload
    ${isCompact ? 'isCompact' : ''}
    ${isDisabled ? 'isDisabled' : ''}
  />`;

export default {
  id: 'FileUpload',
  imports: ["import { FileUpload } from '@alma-oss/spirit-web-react';"],
  example,
};
