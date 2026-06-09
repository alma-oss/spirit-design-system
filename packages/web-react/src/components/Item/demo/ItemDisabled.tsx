import React from 'react';
import { Icon } from '../../Icon';
import { Label } from '../../Label';
import Item from '../Item';

const ItemDisabled = () => (
  <>
    <Item elementType="button" isDisabled>
      <Label>Item label</Label>
    </Item>
    <Item elementType="button" isDisabled isSelected endSlot={<Icon name="check-plain" />}>
      <Label>Item label</Label>
    </Item>
  </>
);

export default ItemDisabled;
