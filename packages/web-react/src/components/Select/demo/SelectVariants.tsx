import React from 'react';
import { FillVariants } from '../../../constants';
import Select from '../Select';

const SelectVariants = () => (
  <>
    <Select id="select-variant-fill" label="Fill (default)" name="selectVariantFill" variant={FillVariants.FILL}>
      <option value="">Placeholder</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </Select>

    <Select id="select-variant-outline" label="Outline" name="selectVariantOutline" variant={FillVariants.OUTLINE}>
      <option value="">Placeholder</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </Select>
  </>
);

export default SelectVariants;
