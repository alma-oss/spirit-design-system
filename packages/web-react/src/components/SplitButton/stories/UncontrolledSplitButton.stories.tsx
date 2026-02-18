import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ComponentButtonColors, Placements, Sizes } from '../../../constants';
import ReadMe from '../README.md?raw';
import { UncontrolledSplitButton } from '..';
import { DropdownContent } from './SplitButtonParts';

const meta: Meta<typeof UncontrolledSplitButton> = {
  title: 'Components/SplitButton',
  component: UncontrolledSplitButton,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
    controls: { exclude: ['ElementTag', 'UNSAFE_className', 'UNSAFE_style', 'transferClassName'] },
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'The ID of the Uncontrolled Split Button.',
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      options: [...Object.values(Sizes)],
      description: 'Size of the button.',
      table: {
        defaultValue: { summary: Sizes.MEDIUM },
        type: { summary: 'ButtonSize' },
      },
    },
    color: {
      control: 'select',
      options: [...Object.values(ComponentButtonColors).filter((color) => color !== ComponentButtonColors.PLAIN)],
      description: 'Color of the button.',
      table: {
        defaultValue: { summary: ComponentButtonColors.PRIMARY },
        type: { summary: 'ButtonColor' },
      },
    },
    buttonLabel: {
      control: 'text',
      description: 'The label for the button.',
      table: {
        type: { summary: 'string' },
      },
    },
    buttonIconName: {
      control: 'text',
      description: 'The name of the icon to display on the button.',
      table: {
        type: { summary: 'string' },
      },
    },
    dropdownTriggerLabel: {
      control: 'text',
      description: 'The label for the dropdown button.',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: 'text',
      description: 'The content of the dropdown.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    dropdownPlacement: {
      control: 'select',
      options: Object.values(Placements),
      table: {
        defaultValue: { summary: Placements.BOTTOM_END },
      },
      description: 'The placement of the dropdown.',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the button is disabled.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    dropdownTriggerIconName: {
      control: 'text',
      description: 'The name of the icon to display on the dropdown button.',
      table: {
        type: { summary: 'string' },
      },
    },
    buttonOnClick: {
      description: 'Function to call when the button is clicked.',
      table: {
        type: { summary: '() => void' },
      },
    },
    isButtonLabelHidden: {
      control: 'boolean',
      description: 'Whether the button label is hidden.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    isDropdownTriggerLabelHidden: {
      control: 'boolean',
      description: 'Whether the dropdown label is hidden.',
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    buttonIconName: undefined,
    buttonLabel: 'Button',
    buttonOnClick: () => {},
    children: <DropdownContent />,
    color: ComponentButtonColors.PRIMARY,
    dropdownPlacement: Placements.BOTTOM_END,
    dropdownTriggerIconName: 'chevron-down',
    dropdownTriggerLabel: 'More',
    id: 'uncontrolled-split-button',
    isButtonLabelHidden: false,
    isDisabled: false,
    isDropdownTriggerLabelHidden: false,
    size: Sizes.MEDIUM,
  },
};

export default meta;
type Story = StoryObj<typeof UncontrolledSplitButton>;

export const UncontrolledSplitButtonPlayground: Story = {
  name: 'UncontrolledSplitButton',
};
