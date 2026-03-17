import React from 'react';
import { Item } from '../../Item';

const HelperTextItemComponent = () => (
  <>
    <Item label="Item label" helperText="Helper text" />
    <Item label="Selected Item" helperText="Helper text" isSelected selectionDecorator="both" />
    <Item label="Item label" helperText="Helper text" isDisabled />
  </>
);

export default HelperTextItemComponent;
