import React, { useState } from 'react';
import { Button } from '../../Button';
import Dropdown from '../Dropdown';
import DropdownPopover from '../DropdownPopover';
import DropdownTrigger from '../DropdownTrigger';
import { dropdownContent } from './constants';
import DropdownContentFactory from './DropdownContentFactory';

const DropdownFullwidthMobileOnly = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onToggle = () => setIsOpen(!isOpen);

  return (
    <Dropdown
      id="dropdown-fullwidth-mobile-only"
      isOpen={isOpen}
      onToggle={onToggle}
      fullWidthMode="mobile-only"
      placement="top-start"
    >
      <DropdownTrigger elementType={Button}>Finibus quis imperdiet, semper imperdiet aliquam</DropdownTrigger>
      <DropdownPopover>
        <DropdownContentFactory content={dropdownContent} />
      </DropdownPopover>
    </Dropdown>
  );
};

export default DropdownFullwidthMobileOnly;
