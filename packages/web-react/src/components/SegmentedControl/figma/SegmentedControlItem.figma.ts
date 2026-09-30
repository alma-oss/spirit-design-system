// url=<FIGMA_FILE_ID>?node-id=29237%3A1987
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/SegmentedControl/SegmentedControlItem.tsx
// component=SegmentedControlItem

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const isDisabled = instance.getEnum('Disabled', { False: false, True: true });

const hasIcon = instance.getBoolean('Leading icon');
const icon = hasIcon ? instance.getInstanceSwap('Icon') : null;
let iconCode;
if (icon && icon.type === 'INSTANCE') {
  iconCode = icon.executeTemplate().example;
}

const hasLabel = instance.getBoolean('Label');
const action = instance.findText('Action');
const actionText = action.type !== 'ERROR' ? action.textContent : 'Label';

export default {
  id: 'SegmentedControlItem',
  imports: ["import { SegmentedControlItem, Truncate, VisuallyHidden } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <SegmentedControlItem id="segmented-control-item" value="value-1"${isDisabled ? ' isDisabled' : ''}>
      ${iconCode}
      ${
        hasLabel
          ? figma.code`<Truncate mode="lines" limit={1}>${actionText}</Truncate>`
          : figma.code`<VisuallyHidden>${actionText}</VisuallyHidden>`
      }
    </SegmentedControlItem>`,
  metadata: {
    nestable: true,
    props: { iconCode, actionText, hasLabel, isDisabled },
  },
};
