// url=<FIGMA_FILE_ID>?node-id=4701%3A4086
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Tooltip/Tooltip.tsx
// component=Tooltip

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const isDismissible = instance.getBoolean('Dismissible');
const placement = instance.getEnum('Placement', {
  Bottom: undefined,
  'Bottom Start': 'bottom-start',
  'Bottom End': 'bottom-end',
  Top: 'top',
  'Top Start': 'top-start',
  'Top End': 'top-end',
  Right: 'right',
  'Right End': 'right-end',
  'Right Start': 'right-start',
  Left: 'left',
  'Left End': 'left-end',
  'Left Start': 'left-start',
});
const text = instance.getString('Text');

export default {
  id: 'Tooltip',
  imports: ["import { Tooltip, TooltipPopover, TooltipTrigger } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <Tooltip
      id="tooltip-example"
      onToggle={() => {}}
      ${isDismissible ? 'isDismissible' : ''}
      ${placement ? figma.code`placement="${placement}"` : ''}
    >
      <TooltipTrigger>Trigger</TooltipTrigger>
      <TooltipPopover>${text}</TooltipPopover>
    </Tooltip>`,
};
