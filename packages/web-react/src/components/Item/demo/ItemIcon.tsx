import React from 'react';
import { Icon } from '../../Icon';
import { Label } from '../../Label';
import Item from '../Item';

const ItemIcon = () => (
  <>
    <Item elementType="button" startSlot={<Icon name="search" />}>
      <Label>Item label</Label>
    </Item>
    <Item
      elementType="button"
      startSlot={<Icon name="search" />}
      endSlot={<Icon name="check-plain" color="selected" />}
      isSelected
    >
      <Label>Item label</Label>
    </Item>
  </>
);

export default ItemIcon;
