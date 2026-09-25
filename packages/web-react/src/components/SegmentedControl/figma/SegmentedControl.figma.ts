// url=<FIGMA_FILE_ID>?node-id=29237%3A2108
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/SegmentedControl/SegmentedControl.tsx
// component=SegmentedControl

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const variant = instance.getEnum('Variant', { Basic: 'fill', Subtle: undefined });
const isFluid = instance.getEnum('Full-width', { False: undefined, True: true });

const renderItem = (layerName: string, value: string) => {
  const item = instance.findInstance(layerName);
  if (!item || item.type !== 'INSTANCE') {
    return undefined;
  }
  const { metadata } = item.executeTemplate();
  const { iconCode, labelText, isDisabled } = metadata?.props ?? {};

  return figma.code`
    <SegmentedControlItem id="segmented-control-example-${value}" value="${value}"${isDisabled ? ' isDisabled' : ''}>
      ${iconCode}
      ${labelText ? figma.code`<Truncate mode="lines" limit={1}>${labelText}</Truncate>` : ''}
    </SegmentedControlItem>`;
};

const item1 = renderItem('Item 01', 'value-1');
const item2 = renderItem('Item 02', 'value-2');
const item3 = renderItem('Item 03', 'value-3');
const item4 = renderItem('Item 04', 'value-4');
const item5 = renderItem('Item 05', 'value-5');

export default {
  id: 'SegmentedControl',
  imports: ["import { SegmentedControl, SegmentedControlItem, Truncate } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <SegmentedControl
      label="Fill accessible label"
      name="segmented-control-example"
      selectedValue="value-1"
      setSelectedValue={() => {}}
      ${isFluid ? 'isFluid' : ''}
      ${variant ? figma.code`variant="${variant}"` : ''}
    >
      ${item1}
      ${item2}
      ${item3}
      ${item4}
      ${item5}
    </SegmentedControl>`,
};
