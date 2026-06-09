import React from 'react';
import { Icon } from '../../Icon';
import { Item } from '../../Item';
import Label from '../Label';

const LabelItemComponent = () => (
  <>
    <Item>
      <Label>Item label</Label>
    </Item>
    <Item endSlot={<Icon name="check-plain" color="selected" />} isSelected>
      <Label>Selected Item</Label>
    </Item>
    <Item isDisabled>
      <Label>Disabled Item</Label>
    </Item>
  </>
);

export default LabelItemComponent;
