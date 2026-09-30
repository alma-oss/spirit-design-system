// url=<FIGMA_FILE_ID>?node-id=18817%3A40
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Toggle/Toggle.tsx
// component=Toggle

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const isChecked = instance.getEnum('Selected', { True: true, False: false });
const isDisabled = instance.getEnum('Disabled', { False: false, True: true });

export default {
  id: 'ToggleInput',
  imports: ["import { Toggle } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <Toggle
      id="toggle-example"
      label="Label"
      isLabelHidden
      ${isChecked ? 'isChecked' : ''}
      ${isDisabled ? 'isDisabled' : ''}
    />`,
};
