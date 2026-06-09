import React from 'react';
import { HelperText } from '../../HelperText';
import { Icon } from '../../Icon';
import { Label } from '../../Label';
import Item from '../Item';

const ItemAlignment = () => (
  <>
    <Item alignmentY="top" elementType="button" startSlot={<Icon name="search" />}>
      <Label>Top aligned item</Label>
      <HelperText helperText="Additional helper text makes the content taller than the icon." />
    </Item>
    <Item alignmentY="center" elementType="button" startSlot={<Icon name="search" />}>
      <Label>Center aligned item</Label>
      <HelperText helperText="Additional helper text makes the content taller than the icon." />
    </Item>
    <Item alignmentY="bottom" elementType="button" startSlot={<Icon name="search" />}>
      <Label>Bottom aligned item</Label>
      <HelperText helperText="Additional helper text makes the content taller than the icon." />
    </Item>
  </>
);

export default ItemAlignment;
