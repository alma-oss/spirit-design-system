import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Sizes, SizesExtended } from '../../../constants';
import ReadMe from '../README.md?raw';
import { CloseButton } from '..';

const meta: Meta<typeof CloseButton> = {
  title: 'Components/CloseButton',
  component: CloseButton,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Accessible label for the close button. Falls back to the localized "Close" string.',
    },
    isDisabled: {
      control: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    isSubtle: {
      control: 'boolean',
      description: 'Whether the button is in subtle variant (without border)',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    isSymmetrical: {
      control: 'object',
      description:
        'Whether the button should be symmetrical. Can be a boolean or responsive object, e.g. `{ mobile: true, tablet: false }`',
      table: {
        defaultValue: {
          summary: 'true',
        },
        type: {
          summary: 'bool | Responsive<bool>',
        },
      },
    },
    size: {
      control: 'select',
      options: [undefined, ...Object.values(SizesExtended)],
      table: {
        defaultValue: {
          summary: Sizes.MEDIUM,
        },
        type: {
          summary: 'SizesDictionaryType',
        },
      },
    },
  },
  args: {
    isDisabled: false,
    isSubtle: false,
  },
};

export default meta;
type Story = StoryObj<typeof CloseButton>;

export const Playground: Story = {
  name: 'CloseButton',
};
