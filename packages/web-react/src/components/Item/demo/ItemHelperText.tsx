import React from 'react';
import { HelperText } from '../../HelperText';
import { Icon } from '../../Icon';
import { Label } from '../../Label';
import Item from '../Item';

const itemContent = (
  <>
    <Label>Item label</Label>
    <HelperText helperText="Helper text" />
  </>
);

const ItemHelperText = () => (
  <>
    <Item elementType="button">{itemContent}</Item>
    <Item elementType="button" endSlot={<Icon name="check-plain" color="selected" />} isSelected>
      {itemContent}
    </Item>
    <Item elementType="button" isDisabled>
      {itemContent}
    </Item>
    <Item elementType="button" endSlot={<Icon name="check-plain" />} isDisabled isSelected>
      {itemContent}
    </Item>
  </>
);

export default ItemHelperText;
