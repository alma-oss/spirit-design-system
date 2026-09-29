// url=<FIGMA_FILE_ID>?node-id=28298%3A2738
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/SplitButton/SplitButton.tsx
// component=SplitButton

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const color = instance.getEnum('Color', { Primary: undefined, Secondary: 'secondary', Tertiary: 'tertiary' });
const isDisabled = instance.getBoolean('Disabled');
const count = instance.getPropertyValue('Count');

const extraButton =
  count === '3 buttons'
    ? figma.code`
    <Button>
      <Icon name="placeholder" />
      Label
    </Button>`
    : '';

export default {
  id: 'SplitButton',
  imports: [
    "import { Button, Dropdown, DropdownPopover, DropdownTrigger, Icon, SplitButton, VisuallyHidden } from '@alma-oss/spirit-web-react';",
  ],
  example: figma.code`
    <SplitButton
      ${color ? figma.code`color="${color}"` : ''}
      ${isDisabled ? 'isDisabled' : ''}
    >
      <Button>
        <Icon name="placeholder" />
        Label
      </Button>
      ${extraButton}
      <Dropdown id="split-button-dropdown" isOpen={false} onToggle={() => {}}>
        <DropdownTrigger elementType={Button}>
          <VisuallyHidden>Dropdown</VisuallyHidden>
          <Icon name="chevron-down" />
        </DropdownTrigger>
        <DropdownPopover>Dropdown content</DropdownPopover>
      </Dropdown>
    </SplitButton>`,
};
