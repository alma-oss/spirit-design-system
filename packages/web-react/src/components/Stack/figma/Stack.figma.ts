// url=<FIGMA_FILE_ID>?node-id=9568%3A4284
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Stack/Stack.tsx
// component=Stack

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const hasStartDivider = instance.getBoolean('Start Divider');
const hasEndDivider = instance.getBoolean('End Divider');
const hasSpacing = instance.getEnum('Spacing', { False: false, True: true });
const hasIntermediateDividers = instance.getEnum('Intermediate Dividers', { False: false, True: true });

export default {
  id: 'Stack',
  imports: ["import { Stack } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <Stack
      elementType="ul"
      ${hasStartDivider ? 'hasStartDivider' : ''}
      ${hasEndDivider ? 'hasEndDivider' : ''}
      ${hasSpacing ? 'hasSpacing' : ''}
      ${hasIntermediateDividers ? 'hasIntermediateDividers' : ''}
    >
      <li>First Item</li>
      <li>Second Item</li>
    </Stack>`,
};
