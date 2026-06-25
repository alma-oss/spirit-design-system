import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { AlignmentX } from '../../../constants';
import { type DrawerPanelProps } from '../../../types';
import { CloseButton } from '../../CloseButton';
import Drawer from '../Drawer';
import DrawerPanel from '../DrawerPanel';
import DrawerPanelBody from '../DrawerPanelBody';
import DrawerPanelHeader from '../DrawerPanelHeader';
import ReadMe from '../README.md?raw';

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
  },
};

export default meta;
type Story = StoryObj<typeof DrawerPanel>;

export const DrawerPanelPlayground: Story = {
  name: 'DrawerPanel',
  render: (args) => {
    const { elementType } = args as Partial<DrawerPanelProps>;

    return (
      <Drawer
        alignmentX={AlignmentX.RIGHT}
        id="drawer-panel-demo"
        isOpen
        onClose={() => {}}
        aria-label="Drawer"
        closeOnBackdropClick={false}
        closeOnEscapeKeyDown={false}
      >
        <DrawerPanel elementType={elementType}>
          <DrawerPanelHeader>
            <CloseButton size="large" aria-expanded aria-controls="drawer-panel-demo" onClick={() => {}} />
          </DrawerPanelHeader>
          <DrawerPanelBody hasSpacing>Drawer content</DrawerPanelBody>
        </DrawerPanel>
      </Drawer>
    );
  },
};
