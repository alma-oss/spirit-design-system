import { Icon, Item, Label } from '@alma-oss/spirit-web-react';
import React from 'react';

const ItemPreview = () => (
  <Item size="medium" startSlot={<Icon name="info" boxSize={24} />} UNSAFE_style={{ width: 220 }}>
    <Label>Item label</Label>
  </Item>
);

export default ItemPreview;
