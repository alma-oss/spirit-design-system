import figma from '@figma/code-connect';
import React from 'react';
import { Button } from '../../Button';
import { Dropdown, DropdownPopover, DropdownTrigger } from '../../Dropdown';
import { Icon } from '../../Icon';
import { VisuallyHidden } from '../../VisuallyHidden';
import SplitButton from '../SplitButton';

const SPLIT_BUTTON_NODE_URL = '<FIGMA_FILE_ID>?node-id=28298%3A2738';

const commonProps = {
  color: figma.enum('Color', {
    Secondary: 'secondary',
    Tertiary: 'tertiary',
  }),
};

figma.connect(SplitButton, SPLIT_BUTTON_NODE_URL, {
  props: commonProps,
  variant: {
    Count: '2 buttons',
  },
  example: (props) => (
    <SplitButton {...props}>
      <Button>
        <Icon name="placeholder" />
        Label
      </Button>
      <Dropdown id="split-button-dropdown" isOpen={false} onToggle={() => {}}>
        <DropdownTrigger elementType={Button}>
          <VisuallyHidden>Dropdown</VisuallyHidden>
          <Icon name="chevron-down" />
        </DropdownTrigger>
        <DropdownPopover>Dropdown content</DropdownPopover>
      </Dropdown>
    </SplitButton>
  ),
});

figma.connect(SplitButton, SPLIT_BUTTON_NODE_URL, {
  props: commonProps,
  variant: {
    Count: '3 buttons',
  },
  example: (props) => (
    <SplitButton {...props}>
      <Button>
        <Icon name="placeholder" />
        Label
      </Button>
      <Button>
        <Icon name="placeholder" />
        Label
      </Button>
      <Dropdown id="split-button-dropdown" isOpen={false} onToggle={() => {}}>
        <DropdownTrigger elementType={Button}>
          <VisuallyHidden>Dropdown</VisuallyHidden>
          <Icon name="chevron-down" />
        </DropdownTrigger>
        <DropdownPopover>Dropdown content</DropdownPopover>
      </Dropdown>
    </SplitButton>
  ),
});
