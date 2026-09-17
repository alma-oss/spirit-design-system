import React from 'react';
import { Icon } from '../../Icon';
import { Label } from '../../Label';
import Item from '../Item';

const ItemSizes = () => (
  <>
    <Item size="xsmall" startSlot={<Icon name="search" />} endSlot={<Icon name="check-plain" color="selected" />}>
      <Label>XSmall item</Label>
    </Item>
    <Item size="small" startSlot={<Icon name="search" />} endSlot={<Icon name="check-plain" color="selected" />}>
      <Label>Small item</Label>
    </Item>
    <Item startSlot={<Icon name="search" />} endSlot={<Icon name="check-plain" color="selected" />}>
      <Label>Medium item</Label>
    </Item>
    <Item size="large" startSlot={<Icon name="search" />} endSlot={<Icon name="check-plain" color="selected" />}>
      <Label>Large item</Label>
    </Item>
    <Item size="xlarge" startSlot={<Icon name="search" />} endSlot={<Icon name="check-plain" color="selected" />}>
      <Label>XLarge item</Label>
    </Item>
  </>
);

export default ItemSizes;
