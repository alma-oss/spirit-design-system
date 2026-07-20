import figma from '@figma/code-connect';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { type ReactNode } from 'react';
import { Link } from '../../Link';
import Toggle from '../Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle/Figma',
  component: Toggle,
  tags: ['!autodocs', 'figma'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/w9Ca4hvkuYLshsrHu1bYwT/SPIRIT-DESIGN-SYSTEM--UI-Kit-?node-id=19122%3A3329',
      props: {
        description: figma.boolean('Description', {
          true: <span>Description</span>,
          false: undefined,
        }),
        helperText: figma.boolean('Helper text', {
          true: 'Helper text',
          false: undefined,
        }),
        isChecked: figma.boolean('Selected'),
        isDisabled: figma.boolean('Disabled'),
        isLabelHidden: figma.boolean('Label', {
          true: false,
          false: true,
        }),
        link: figma.boolean('Link', {
          true: <Link href="#">Link</Link>,
          false: undefined,
        }),
        validationState: figma.enum('Validation State', {
          Success: 'success',
          Warning: 'warning',
          Danger: 'danger',
        }),
      },
      examples: ['FigmaPlayground'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const FigmaPlayground: Story = {
  name: 'Toggle',
  render: ({
    description,
    link,
    ...props
  }: React.ComponentProps<typeof Toggle> & { description?: ReactNode; link?: ReactNode }) => (
    <Toggle
      {...props}
      label="Label"
      id="toggle-example"
      details={
        <>
          {link}
          {description}
        </>
      }
    />
  ),
};
