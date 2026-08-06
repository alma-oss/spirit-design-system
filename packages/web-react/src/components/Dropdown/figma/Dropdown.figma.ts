// url=<FIGMA_FILE_ID>?node-id=39383%3A1033
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Dropdown/Dropdown.tsx
// component=Dropdown

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const contentSlot = instance.getSlot('Content Slot');

export default {
  id: 'Dropdown',
  imports: ["import { Dropdown, DropdownPopover, DropdownTrigger } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <Dropdown id="dropdown-example" isOpen onToggle={() => {}}>
      <DropdownTrigger>Trigger</DropdownTrigger>
      <DropdownPopover>
        ${contentSlot}
      </DropdownPopover>
    </Dropdown>`,
};
