'use client';

import { SegmentedControl, SegmentedControlItem } from '@alma-oss/spirit-web-react';
import React from 'react';

const SegmentedControlPreview = () => {
  const [selectedValue, setSelectedValue] = React.useState('day');

  return (
    <SegmentedControl
      label="Label"
      name="card-segmented"
      selectedValue={selectedValue}
      setSelectedValue={(value) => setSelectedValue(Array.isArray(value) ? value[0] : value)}
      variant="outline"
      UNSAFE_style={{ width: 280 }}
    >
      <SegmentedControlItem id="card-segmented-1" value="day">
        Day
      </SegmentedControlItem>
      <SegmentedControlItem id="card-segmented-2" value="week">
        Week
      </SegmentedControlItem>
      <SegmentedControlItem id="card-segmented-3" value="month">
        Month
      </SegmentedControlItem>
    </SegmentedControl>
  );
};

export default SegmentedControlPreview;
