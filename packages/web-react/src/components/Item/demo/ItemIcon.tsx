import React from 'react';
import Item from '../Item';

const ItemIcon = () => (
  <>
    <Item label="Item label" iconName="search" />
    <Item label="Item label" iconName="search" isSelected selectionDecorator="both" />
  </>
);

export default ItemIcon;
