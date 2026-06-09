import React from 'react';
import { Icon } from '../../Icon';
import { Label } from '../../Label';
import Item from '../Item';

const ItemSelected = () => (
  <>
    <div>
      <h3>Background</h3>
      <Item elementType="button" isSelected>
        <Label>Item label</Label>
      </Item>
    </div>
    <div>
      <h3>Icon</h3>
      <Item elementType="button" endSlot={<Icon name="check-plain" color="selected" />}>
        <Label>Item label</Label>
      </Item>
    </div>
    <div>
      <h3>Background and icon</h3>
      <Item elementType="button" endSlot={<Icon name="check-plain" color="selected" />} isSelected>
        <Label>Item label</Label>
      </Item>
    </div>
  </>
);

export default ItemSelected;
