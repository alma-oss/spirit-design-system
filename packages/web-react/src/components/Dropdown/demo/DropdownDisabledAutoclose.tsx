import React, { useState } from 'react';
import { Button } from '../../Button';
import Dropdown from '../Dropdown';
import DropdownPopover from '../DropdownPopover';
import DropdownTrigger from '../DropdownTrigger';
import { dropdownContent } from './constants';
import DropdownContentFactory from './DropdownContentFactory';

const DropdownDisabledAutoclose = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onToggle = () => setIsOpen(!isOpen);

  return (
    <Dropdown id="dropdown-disabled-autoclose" isOpen={isOpen} onToggle={onToggle} enableAutoClose={false}>
      <DropdownTrigger elementType={Button}>Button as anchor</DropdownTrigger>
      <DropdownPopover>
        <DropdownContentFactory content={dropdownContent} />
      </DropdownPopover>
    </Dropdown>
  );
};

export default DropdownDisabledAutoclose;
