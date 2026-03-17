import React from 'react';
import { Item } from '../../Item';

const LabelItemComponent = () => (
  <>
    <Item label="Item label" />
    <Item label="Selected Item" isSelected selectionDecorator="both" />
    <Item label="Disabled Item" isDisabled />
  </>
);

export default LabelItemComponent;
