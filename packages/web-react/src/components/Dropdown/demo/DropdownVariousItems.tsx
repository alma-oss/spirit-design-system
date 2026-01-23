import React, { useState } from 'react';
import { Button } from '../../Button';
import { Checkbox } from '../../Checkbox';
import { Item } from '../../Item';
import { Radio } from '../../Radio';
import Dropdown from '../Dropdown';
import DropdownPopover from '../DropdownPopover';
import DropdownTrigger from '../DropdownTrigger';

const DropdownVariousItems = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onToggle = () => setIsOpen(!isOpen);

  return (
    <Dropdown id="dropdown-various-items" isOpen={isOpen} onToggle={onToggle}>
      <DropdownTrigger elementType={Button}>Button as anchor</DropdownTrigger>
      <DropdownPopover>
        <Item elementType="a" href="#" label="Plain text" />
        <Item elementType="a" href="#" label="Item with icon" iconName="info" />
        <Checkbox id="checkbox-item" label="Item with checkbox" isItem />
        <Radio id="radio-item" label="Item with radio" isItem isChecked />
      </DropdownPopover>
    </Dropdown>
  );
};

export default DropdownVariousItems;
