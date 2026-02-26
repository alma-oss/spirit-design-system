import React from 'react';
import Item from '../Item';

const ItemDefault = () => (
  <>
    <Item label="Item label" />
    <Item elementType="a" label="Item label as link" href="https://www.example.com/" />
    <Item elementType="div" label="Item label as div" />
  </>
);

export default ItemDefault;
