import React, { useState } from 'react';
import { FillVariants } from '../../../constants';
import { Icon } from '../../Icon';
import { Tooltip, TooltipPopover, TooltipTrigger } from '../../Tooltip';
import SegmentedControl from '../SegmentedControl';
import SegmentedControlItem from '../SegmentedControlItem';

const SegmentedControlWithTooltip = () => {
  const [activeTooltipIndex, setActiveTooltipIndex] = useState<number | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | string[]>('value-1');

  return (
    <SegmentedControl
      label="Label"
      name="segmented-tooltip-icon"
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
      variant={FillVariants.FILL}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const value = `value-${index + 1}`;
        const id = `segmented-control-tooltip-js-${index + 1}`;
        const isOpen = activeTooltipIndex === index;

        return (
          <Tooltip
            key={value}
            id={`tooltip-${value}`}
            isOpen={isOpen}
            onToggle={() => setActiveTooltipIndex(isOpen ? null : index)}
          >
            <TooltipTrigger
              elementType={SegmentedControlItem}
              value={value}
              id={id}
              aria-label={`Label Item ${index + 1}`}
            >
              <Icon name="file" />
            </TooltipTrigger>
            <TooltipPopover>Label</TooltipPopover>
          </Tooltip>
        );
      })}
    </SegmentedControl>
  );
};

export default SegmentedControlWithTooltip;
