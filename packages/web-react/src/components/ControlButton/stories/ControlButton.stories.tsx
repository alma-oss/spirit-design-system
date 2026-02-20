import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Sizes } from '../../../constants';
import { Icon } from '../../Icon';
import ReadMe from '../README.md';
import { ControlButton } from '..';

const meta: Meta<typeof ControlButton> = {
  title: 'Components/ControlButton',
  component: ControlButton,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    elementType: {
      control: 'text',
      table: {
        defaultValue: {
          summary: 'button',
        },
      },
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
          summary: 'false',
        },
        type: {
          summary: 'bool | Responsive<bool>',
        },
      },
    },
    size: {
      control: 'select',
      options: [undefined, ...Object.values(Sizes)],
      table: {
        defaultValue: {
          summary: Sizes.MEDIUM,
        },
        type: {
          summary: 'SizesDictionaryType',
        },
      },
    },
    spacing: {
      control: 'object',
      description:
        'Custom spacing between control button content items. Can be a spacing token (e.g. "space-400") or an object with breakpoint keys.',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      table: {
        defaultValue: {
          summary: 'button',
        },
      },
    },
  },
  args: {
    children: <Icon name="close" />,
    isDisabled: false,
    isSubtle: false,
    isSymmetrical: true,
    type: 'button',
    'aria-label': 'Close',
  },
};

export default meta;
type Story = StoryObj<typeof ControlButton>;

export const Playground: Story = {
  name: 'ControlButton',
};
