import React from 'react';
import Item from '../Item';

const ItemHelperText = () => (
  <>
    <Item label="Item label" helperText="Helper text" />
    <Item label="Item label" helperText="Helper text" isSelected selectionDecorator="both" />
    <Item label="Item label" helperText="Helper text" isDisabled />
    <Item label="Item label" helperText="Helper text" isSelected isDisabled />
  </>
);

export default ItemHelperText;
