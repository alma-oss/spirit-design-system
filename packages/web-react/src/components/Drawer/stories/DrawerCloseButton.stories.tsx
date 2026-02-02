import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AlignmentX, ComponentButtonColors, EmotionColors, Sizes } from '../../../constants';
import { defaultLabels } from '../../../translations/defaults';
import Drawer from '../Drawer';
import DrawerCloseButton from '../DrawerCloseButton';
import DrawerPanel from '../DrawerPanel';
import ReadMe from '../README.md';

const meta: Meta<typeof DrawerCloseButton> = {
  title: 'Components/Drawer',
  component: DrawerCloseButton,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: [...Object.values(ComponentButtonColors), ...Object.values(EmotionColors), undefined],
      table: {
        defaultValue: { summary: ComponentButtonColors.TERTIARY },
      },
    },
    iconBoxSize: {
      control: 'object',
      table: {
        defaultValue: { summary: '24' },
      },
    },
    label: {
      control: 'text',
      table: {
        defaultValue: { summary: defaultLabels.common.close },
      },
    },
    size: {
      control: 'select',
      options: [...Object.values(Sizes)],
      table: {
        defaultValue: { summary: Sizes.MEDIUM },
      },
    },
  },
  args: {
    color: ComponentButtonColors.TERTIARY,
    label: defaultLabels.common.close,
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
      <DrawerPanel>
        <DrawerCloseButton {...args} />
        <div className="p-800">Drawer content</div>
      </DrawerPanel>
    </Drawer>
  ),
};
