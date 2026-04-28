import React from 'react';
import { accessibilityOpenTest, accessibilityTest } from '@local/tests';
import { type SpiritDropdownProps } from '../../../types';
import Dropdown from '../Dropdown';
import DropdownPopover from '../DropdownPopover';
import DropdownTrigger from '../DropdownTrigger';

describe('Dropdown accessibility', () => {
  const DropdownTest = (props: Partial<SpiritDropdownProps>) => (
    <Dropdown id="dropdown-example" onToggle={() => {}} isOpen={false} {...props}>
      <DropdownTrigger>Trigger</DropdownTrigger>
      <DropdownPopover aria-label="Dropdown">Dropdown content</DropdownPopover>
    </Dropdown>
  );

  accessibilityTest(DropdownTest, 'div');

  accessibilityOpenTest(DropdownTest, 'div');
});
