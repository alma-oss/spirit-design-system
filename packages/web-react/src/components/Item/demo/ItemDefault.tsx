import React from 'react';
import { Label } from '../../Label';
import Item from '../Item';

const ItemDefault = () => (
  <>
    <Item>
      <Label>Item label</Label>
    </Item>
    <Item elementType="button">
      <Label>Item label as button</Label>
    </Item>
    <Item elementType="a" href="https://www.example.com/">
      <Label>Item label as link</Label>
    </Item>
  </>
);

export default ItemDefault;
