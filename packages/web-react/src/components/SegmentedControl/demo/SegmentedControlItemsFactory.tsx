import React, { type FunctionComponent, useState } from 'react';
import { FillVariants } from '../../../constants';
import { type FillVariantDictionaryType } from '../../../types';
import { Icon } from '../../Icon';
import { Truncate } from '../../Truncate';
import { VisuallyHidden } from '../../VisuallyHidden';
import SegmentedControl from '../SegmentedControl';
import SegmentedControlItem from '../SegmentedControlItem';

type SegmentedControlItemsFactoryProps = {
  contentVariant?: 'label-only' | 'icon-only' | 'label-icon';
  isMultiselect?: boolean;
  isFluid?: boolean;
  label?: string;
  name?: string;
  variant?: FillVariantDictionaryType;
};

const SegmentedControlItemsFactory: FunctionComponent<SegmentedControlItemsFactoryProps> = ({
  contentVariant = 'label-only',
  isMultiselect = false,
  isFluid = false,
  name = '',
  label,
  variant = FillVariants.OUTLINE,
}) => {
  const items = ['value-1', 'value-2', 'value-3'];
  const [selectedValue, setSelectedValue] = useState<string | string[]>(isMultiselect ? ['value-1'] : 'value-1');

  return (
    <SegmentedControl
      label={label ?? `Label for ${name}`}
      name={name}
      variant={variant}
      isMultiselect={isMultiselect}
      isFluid={isFluid}
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
    >
      {items.map((value, index) => (
        <SegmentedControlItem key={value} id={`segmentedControl-${name}-${index + 1}`} value={value}>
          {contentVariant !== 'label-only' && (
            <>
              <Icon name="file" />
              <VisuallyHidden>Label</VisuallyHidden>
            </>
          )}
          {contentVariant !== 'icon-only' && (
            <Truncate mode="lines" limit={1}>
              Label
            </Truncate>
          )}
        </SegmentedControlItem>
      ))}
    </SegmentedControl>
  );
};

export default SegmentedControlItemsFactory;
