import React from 'react';
import { ControlButton } from '../../ControlButton';
import { Icon } from '../../Icon';
import { Label } from '../../Label';
import Item from '../Item';

const ItemEndSlotControl = () => (
  <Item
    endSlot={
      <ControlButton isSymmetrical size="small" aria-label="Remove item">
        <Icon name="close" />
      </ControlButton>
    }
  >
    <Label>Dismissible item</Label>
  </Item>
);

export default ItemEndSlotControl;
