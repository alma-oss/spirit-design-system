import React from 'react';
import { accessibilityDisabledTest, accessibilityTest } from '@local/tests';
import { type SpiritItemProps } from '../../../types';
import { Label } from '../../Label';
import Item from '../Item';

jest.mock('../../../hooks/useIcon');

describe('Item accessibility', () => {
  const ItemTest = (props: SpiritItemProps) => (
    <Item {...props}>
      <Label>Item label</Label>
    </Item>
  );

  accessibilityTest(ItemTest, '.Item');

  accessibilityDisabledTest(ItemTest, '.Item');
});
