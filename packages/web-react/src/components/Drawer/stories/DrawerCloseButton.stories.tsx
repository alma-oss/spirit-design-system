import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { AlignmentX } from '../../../constants';
import { defaultTranslations } from '../../../translations/defaults';
import Drawer from '../Drawer';
import DrawerCloseButton from '../DrawerCloseButton';
import DrawerPanel from '../DrawerPanel';
import ReadMe from '../README.md?raw';

const meta: Meta<typeof DrawerCloseButton> = {
  title: 'Components/Drawer',
  component: DrawerCloseButton,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    label: {
      control: 'text',
      table: {
        defaultValue: { summary: defaultTranslations.common.close },
      },
    },
  },
  args: {
    label: defaultTranslations.common.close,
  },
};

export default meta;
type Story = StoryObj<typeof DrawerCloseButton>;

export const DrawerCloseButtonPlayground: Story = {
  name: 'DrawerCloseButton',
  render: (args) => (
    <Drawer
      alignmentX={AlignmentX.RIGHT}
      id="drawer-panel-demo"
      isOpen
      onClose={() => {}}
      closeOnBackdropClick={false}
      closeOnEscapeKeyDown={false}
    >
      <DrawerPanel closeButton={<DrawerCloseButton {...args} />}>
        <div className="p-800">Drawer content</div>
      </DrawerPanel>
    </Drawer>
  ),
};
