import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AlignmentX } from '../../../constants';
import { type DrawerPanelProps } from '../../../types';
import Drawer from '../Drawer';
import DrawerCloseButton from '../DrawerCloseButton';
import DrawerPanel from '../DrawerPanel';
import ReadMe from '../README.md';

const meta: Meta<typeof DrawerPanel> = {
  title: 'Components/Drawer',
  component: DrawerPanel,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    elementType: {
      control: 'text',
      table: {
        defaultValue: { summary: 'div' },
      },
    },
  },
  args: {
    elementType: 'div',
    children: (
      <>
        <DrawerCloseButton />
        <div className="p-800">Drawer content</div>
      </>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof DrawerPanel>;

export const DrawerPanelPlayground: Story = {
  name: 'DrawerPanel',
  render: (args) => {
    const { elementType, children } = args as Partial<DrawerPanelProps>;

    return (
      <Drawer
        alignmentX={AlignmentX.RIGHT}
        id="drawer-panel-demo"
        isOpen
        onClose={() => {}}
        closeOnBackdropClick={false}
        closeOnEscapeKeyDown={false}
      >
        <DrawerPanel elementType={elementType}>{children}</DrawerPanel>
      </Drawer>
    );
  },
};
