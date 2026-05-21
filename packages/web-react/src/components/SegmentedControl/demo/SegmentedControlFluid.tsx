import React, { useState } from 'react';
import { FillVariants } from '../../../constants';
import { Icon } from '../../Icon';
import { Truncate } from '../../Truncate';
import SegmentedControl from '../SegmentedControl';
import SegmentedControlItem from '../SegmentedControlItem';

const SegmentedControlFluid = () => {
  const items = ['Label 1', 'Label 2 - this label will be truncated', 'Label 3', 'Label 4', 'Label 5'];
  const [selectedValue, setSelectedValue] = useState<string | string[]>('value-1');

  return (
    <SegmentedControl
      label="Label"
      name="segmented-stretch-filled"
      variant={FillVariants.FILL}
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
      isFluid
    >
      {items.map((label, index) => (
        <SegmentedControlItem
          key={`item-${index + 1}`}
          id={`segmented-control-label-stretch-${index + 1}`}
          value={`value-${index + 1}`}
        >
          <Icon name="file" />
          {index === 1 ? (
            <Truncate mode="lines" limit={1}>
              {label}
            </Truncate>
          ) : (
            label
          )}
        </SegmentedControlItem>
      ))}
    </SegmentedControl>
  );
};

export default SegmentedControlFluid;
