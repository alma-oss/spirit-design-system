import React, { useState } from 'react';
import { ControlButton } from '../../ControlButton';
import { Dropdown, DropdownPopover, DropdownTrigger } from '../../Dropdown';
import { Icon } from '../../Icon';
import { Item } from '../../Item';
import { VisuallyHidden } from '../../VisuallyHidden';
import Menu from '../Menu';

const MenuDefault = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onToggle = () => setIsOpen(!isOpen);

  return (
    <Dropdown id="menu-default" isOpen={isOpen} onToggle={onToggle}>
      <DropdownTrigger elementType={ControlButton} isSymmetrical>
        <VisuallyHidden>Show actions</VisuallyHidden>
        <Icon name="more" />
      </DropdownTrigger>
      <DropdownPopover>
        <Menu aria-label="Actions">
          <Item startSlot={<Icon name="edit" />}>Edit</Item>
          <Item startSlot={<Icon name="download" />}>Download</Item>
          <Item startSlot={<Icon name="link" />} isDisabled>
            Copy link
          </Item>
          <Item startSlot={<Icon name="visibility-off" />}>Hide</Item>
        </Menu>
      </DropdownPopover>
    </Dropdown>
  );
};

export default MenuDefault;
