import { Select } from '@alma-oss/spirit-web-react';
import React from 'react';

const SelectPreview = () => (
  <Select id="card-select" label="Label" isLabelHidden UNSAFE_style={{ width: 280 }}>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </Select>
);

export default SelectPreview;
