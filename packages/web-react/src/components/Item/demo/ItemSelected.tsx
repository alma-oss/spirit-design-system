import React from 'react';
import Item from '../Item';

const ItemSelected = () => (
  <>
    <div>
      <h3>Icon only (default)</h3>
      <Item label="Item label" isSelected />
    </div>
    <div>
      <h3>Background only</h3>
      <Item label="Item label" isSelected selectionDecorator="background" />
    </div>
    <div>
      <h3>Background and icon</h3>
      <Item label="Item label" isSelected selectionDecorator="both" />
    </div>
  </>
);

export default ItemSelected;
