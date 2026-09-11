import React, { useState } from 'react';
import { Flex } from '../../Flex';
import { SegmentedControl, SegmentedControlItem } from '../../SegmentedControl';
import { Truncate } from '../../Truncate';
import { ProgressBar } from '..';

const completions = [10, 50, 90];

const ProgressBarAnimation = () => {
  const [value, setValue] = useState(10);

  const handleSelectionChange = (nextValue: string | string[]) => {
    setValue(Number(Array.isArray(nextValue) ? nextValue[0] : nextValue));
  };

  return (
    <>
      <ProgressBar
        aria-label="Profile completeness"
        id="progress-bar-animated"
        value={value}
        valueLabel={`${value}\u00a0%`}
        valueLabelId="progress-bar-animated-value"
      />
      <Flex>
        <SegmentedControl
          label="Profile completeness value"
          name="progress-bar-animated-value"
          onSelectionChange={handleSelectionChange}
          selectedValue={String(value)}
          setSelectedValue={handleSelectionChange}
        >
          {completions.map((completion) => (
            <SegmentedControlItem
              key={completion}
              id={`progress-bar-animated-${completion}`}
              value={String(completion)}
            >
              <Truncate limit={1} mode="lines">
                {`${completion}\u00a0%`}
              </Truncate>
            </SegmentedControlItem>
          ))}
        </SegmentedControl>
      </Flex>
    </>
  );
};

export default ProgressBarAnimation;
