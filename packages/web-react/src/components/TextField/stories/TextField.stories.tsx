import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { FillVariants, Sizes, ValidationStates } from '../../../constants';
import { ControlButton } from '../../ControlButton';
import { Icon } from '../../Icon';
import { InputAddon } from '../../InputAddon';
import { VisuallyHidden } from '../../VisuallyHidden';
import ReadMe from '../README.md?raw';
import { TextField } from '..';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
    controls: { exclude: ['hasValidationStateIcon'] },
  },
  argTypes: {
    autoComplete: {
      control: 'text',
    },
    hasPasswordToggle: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    hasValidationIcon: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    helperText: {
      control: 'text',
    },
    id: {
      control: 'text',
    },
    isDisabled: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isLabelHidden: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isRequired: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
    },
    endAddon: {
      control: 'select',
      options: [undefined, 'clear button'],
      description: `This is the place for an addon rendered after the input. In the real code
        you can pass in any ReactNode you want. In this demo we have predefined options:
        \`clear button\`. Please note the predefined options in this demo are not customizable.`,
      mapping: {
        'clear button': (
          <InputAddon>
            <ControlButton isSymmetrical isSubtle>
              <Icon name="close" />
              <VisuallyHidden>Clear</VisuallyHidden>
            </ControlButton>
          </InputAddon>
        ),
      },
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    name: {
      control: 'text',
    },
    pattern: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    size: {
      control: 'select',
      options: [...Object.values(Sizes), undefined],
      table: {
        defaultValue: { summary: Sizes.MEDIUM },
      },
    },
    variant: {
      control: 'select',
      options: [...Object.values(FillVariants), undefined],
      table: {
        defaultValue: { summary: FillVariants.FILL },
      },
    },
    startAddon: {
      control: 'select',
      options: [undefined, 'search icon', 'username prefix'],
      description: `This is the place for an addon rendered before the input. In the real code
        you can pass in any ReactNode you want. In this demo we have predefined options:
        \`search icon\` and \`username prefix\`. Please note the predefined options
        in this demo are not customizable.`,
      mapping: {
        'search icon': (
          <InputAddon elementType="label" htmlFor="TextField">
            <Icon name="search" />
            <VisuallyHidden>Use search to find jobs for you</VisuallyHidden>
          </InputAddon>
        ),
        'username prefix': (
          <>
            <InputAddon elementType="label" htmlFor="TextField">
              <Icon name="link" />
              <VisuallyHidden>Profile URL</VisuallyHidden>
            </InputAddon>
            <InputAddon elementType="label" htmlFor="TextField">
              <span aria-hidden="true">@</span>
              <VisuallyHidden>Insert your username without the @ symbol</VisuallyHidden>
            </InputAddon>
          </>
        ),
      },
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    type: {
      control: 'select',
      options: ['email', 'number', 'password', 'search', 'tel', 'text', 'url'],
      table: {
        defaultValue: { summary: 'text' },
      },
    },
    validationState: {
      control: 'select',
      options: [...Object.values(ValidationStates), undefined],
      table: {
        defaultValue: { summary: undefined },
      },
    },
    validationText: {
      control: 'object',
      description:
        'The validation text. Only visible if validationState is set. Use a string `"foo"` for single validation text or an array for multiple validation texts `["foo", "bar"]`.',
    },
    value: {
      control: 'text',
    },
  },
  args: {
    autoComplete: 'off',
    hasPasswordToggle: false,
    hasValidationIcon: false,
    helperText: 'Helper text',
    id: 'TextField',
    isDisabled: false,
    isLabelHidden: false,
    isRequired: false,
    label: 'Label',
    name: 'TextField',
    pattern: undefined,
    placeholder: 'Placeholder',
    size: Sizes.MEDIUM,
    variant: FillVariants.FILL,
    type: 'text',
    validationState: undefined,
    validationText: 'Validation text',
    value: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Playground: Story = {
  name: 'TextField',
};
