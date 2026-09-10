import React, { useState } from 'react';
import { Button } from '../../Button';
import { Flex } from '../../Flex';
import { ProgressBar } from '..';

const completions = [10, 50, 90];

const ProgressBarAnimation = () => {
  const [value, setValue] = useState(30);

  return (
    <>
      <ProgressBar
        aria-label="Profile completeness"
        id="progress-bar-animated"
        value={value}
        valueLabel={`${value} %`}
        valueLabelId="progress-bar-animated-value"
      />
      <Flex spacingX="space-500">
        {completions.map((completion) => (
          <Button key={completion} data-progress-bar-value={completion} onClick={() => setValue(completion)}>
            {completion}%
          </Button>
        ))}
      </Flex>
    </>
  );
};

export default ProgressBarAnimation;
