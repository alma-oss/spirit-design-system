import React from 'react';
import { Icon } from '../../Icon';
import { Item } from '../../Item';
import { Label } from '../../Label';
import HelperText from '../HelperText';

const itemContent = (label: string) => (
  <>
    <Label>{label}</Label>
    <HelperText helperText="Helper text" />
  </>
);

const HelperTextItemComponent = () => (
  <>
    <Item>{itemContent('Item label')}</Item>
    <Item endSlot={<Icon name="check-plain" color="selected" />} isSelected>
      {itemContent('Selected Item')}
    </Item>
    <Item isDisabled>{itemContent('Item label')}</Item>
  </>
);

export default HelperTextItemComponent;
