'use client';

import React, { type ReactNode, useId } from 'react';
import { getNodeText } from '../../hooks';
import { FieldGroup } from '../FieldGroup';
import { usePickerPopoverContext } from './PickerPopoverContext';
import type { SpiritUnstablePickerGroupProps } from './types';

const UNSTABLE_PickerGroup = ({ children, label, ...restProps }: SpiritUnstablePickerGroupProps) => {
  const pickerPopoverContext = usePickerPopoverContext();
  const generatedId = useId();
  const id = pickerPopoverContext.id ? `${pickerPopoverContext.id}-group-${generatedId}` : generatedId;

  return (
    <FieldGroup {...restProps} id={id} isLabelHidden label={label}>
      {children}
    </FieldGroup>
  );
};

UNSTABLE_PickerGroup.spiritComponent = 'UNSTABLE_PickerGroup';

UNSTABLE_PickerGroup.getCollectionNode = function* getCollectionNode(props: Record<string, unknown>) {
  yield {
    type: 'section' as const,
    key: `group:${getNodeText(props.label as ReactNode)}`,
    textValue: getNodeText(props.label as ReactNode),
    hasChildNodes: true,
    children: props.children as ReactNode,
  };
};

export default UNSTABLE_PickerGroup;
