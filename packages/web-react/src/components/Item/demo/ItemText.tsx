import React from 'react';
import { Text } from '../../Text';
import Item from '../Item';

const ItemText = () => (
  <>
    <Item>
      <Text elementType="span" emphasis="semibold">
        Semibold medium text
      </Text>
      <Text elementType="span" size="small" textColor="secondary">
        Secondary small text
      </Text>
    </Item>
    <Item>
      <Text elementType="span" size="large">
        Regular large text
      </Text>
    </Item>
  </>
);

export default ItemText;
