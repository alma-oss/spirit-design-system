import React from 'react';
import { CloseButton } from '../../CloseButton';
import { Label } from '../../Label';
import Item from '../Item';

const ItemEndSlotControl = () => (
  <Item endSlot={<CloseButton size="small" label="Remove item" />}>
    <Label>Dismissible item</Label>
  </Item>
);

export default ItemEndSlotControl;
