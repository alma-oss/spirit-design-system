// url=<FIGMA_FILE_ID>?node-id=40179%3A11355
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/CharacterCounter/CharacterCounter.tsx
// component=CharacterCounter

import figma from 'figma';

const state = figma.selectedInstance.getEnum('State', {
  empty: undefined,
  typing: undefined,
  'limit-reached': undefined,
  'over-limit': 'danger',
  disabled: 'disabled',
});

const example = figma.code`
  <CharacterCounter
    id="textarea-id"
    currentLength={0}
    counterThreshold={200}
    ${state === 'danger' ? figma.code`validationState="danger"` : ''}
    ${state === 'disabled' ? figma.code`isDisabled` : ''}
  />`;

export default {
  id: 'CharacterCounter',
  imports: ["import { CharacterCounter } from '@alma-oss/spirit-web-react';"],
  example,
};
