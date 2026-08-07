// url=<FIGMA_FILE_ID>?node-id=35661%3A27096
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/ActionGroup/ActionGroup.tsx
// component=ActionGroup

import figma from 'figma';

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue('Type') === 'Buttons') {
  template = {
    id: 'ActionGroup',
    imports: ["import { ActionGroup, Button } from '@alma-oss/spirit-web-react';"],
    example: figma.code`
      <ActionGroup>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
      </ActionGroup>`,
  };
} else if (figma.selectedInstance.getPropertyValue('Type') === 'Links') {
  template = {
    id: 'ActionGroup',
    imports: ["import { ActionGroup, Link } from '@alma-oss/spirit-web-react';"],
    example: figma.code`
      <ActionGroup>
        <Link href="#link">Link</Link>
        <Link href="#link">Link</Link>
        <Link href="#link">Link</Link>
      </ActionGroup>`,
  };
}

export default { ...template };
