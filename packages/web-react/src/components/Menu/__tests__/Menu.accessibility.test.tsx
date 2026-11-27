import React from 'react';
import { accessibilityTest } from '@local/tests';
import { Item } from '../../Item';
import Menu from '../Menu';

jest.mock('../../../hooks/useIcon');

describe('Menu accessibility', () => {
  accessibilityTest(
    (props) => (
      <Menu {...props} aria-label="Options">
        <Item>Edit</Item>
        <Item isDisabled>Duplicate</Item>
        <Item elementType="a" href="#">
          Preview
        </Item>
      </Menu>
    ),
    '[role="menu"]',
  );
});
