import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { fn } from 'storybook/test';
import { AlignmentX } from '../../../constants';
import { type SpiritDrawerProps } from '../../../types';
import { Button } from '../../Button';
import { CloseButton } from '../../CloseButton';
import Drawer from '../Drawer';
import DrawerPanel from '../DrawerPanel';
import DrawerPanelBody from '../DrawerPanelBody';
import DrawerPanelHeader from '../DrawerPanelHeader';
import ReadMe from '../README.md?raw';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    alignmentX: {
      control: 'select',
      options: [AlignmentX.LEFT, AlignmentX.RIGHT],
      table: {
        defaultValue: { summary: AlignmentX.RIGHT },
        type: {
          summary: 'DrawerAlignmentXType',
        },
      },
    },
    id: {
      control: 'text',
    },
    isOpen: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Whether the drawer should close when the backdrop is clicked',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    closeOnEscapeKeyDown: {
      control: 'boolean',
      description: 'Whether the drawer should close when the escape key is pressed',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    alignmentX: AlignmentX.RIGHT,
    id: 'drawer',
    isOpen: false,
    onClose: fn(),
    closeOnEscapeKeyDown: true,
    closeOnBackdropClick: true,
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

const DrawerWithHooks = (args: SpiritDrawerProps) => {
  const { isOpen, alignmentX, closeOnBackdropClick, closeOnEscapeKeyDown } = args;
  const [isDrawerOpen, setDrawerOpen] = useState(isOpen);
  const handleOpenDrawer = () => setDrawerOpen(true);

  const handleDrawerClose = () => setDrawerOpen(false);

  return (
    <>
      <Button onClick={handleOpenDrawer}>Open Drawer</Button>

      <Drawer
        alignmentX={alignmentX}
        id="example-basic"
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        aria-label="Drawer"
        closeOnBackdropClick={closeOnBackdropClick}
        closeOnEscapeKeyDown={closeOnEscapeKeyDown}
      >
        <DrawerPanel>
          <DrawerPanelHeader>
            <CloseButton
              size="large"
              aria-expanded={isDrawerOpen}
              aria-controls="example-basic"
              onClick={handleDrawerClose}
            />
          </DrawerPanelHeader>
          <DrawerPanelBody hasSpacing>Drawer content</DrawerPanelBody>
        </DrawerPanel>
      </Drawer>
    </>
  );
};

export const Playground: Story = {
  name: 'Drawer',
  render: (args) => <DrawerWithHooks {...args} />,
};
