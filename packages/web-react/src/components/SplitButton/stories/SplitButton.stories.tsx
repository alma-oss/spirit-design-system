import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ComponentButtonColors, Sizes } from '../../../constants';
import ReadMe from '../README.md?raw';
import { SplitButton } from '..';
import {
  SplitButtonWithButtons,
  SplitButtonWithDropdowns,
  SplitButtonWithEverything,
  SplitButtonWithIcons,
  SplitButtonWithTooltip,
} from './SplitButtonParts';

const meta: Meta<typeof SplitButton> = {
  title: 'Components/SplitButton',
  component: SplitButton,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
    controls: { exclude: ['ElementTag', 'UNSAFE_className', 'UNSAFE_style', 'transferClassName'] },
  },
  argTypes: {
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
    children: {
      control: 'select',
      options: ['Only Buttons', 'Only Icons', 'With Dropdown', 'With Tooltip', 'With Everything!'],
      description: 'Content of the Split Button demo.',
      mapping: {
        'Only Buttons': <SplitButtonWithButtons />,
        'Only Icons': <SplitButtonWithIcons />,
        'With Dropdown': <SplitButtonWithDropdowns />,
        'With Tooltip': <SplitButtonWithTooltip />,
        'With Everything!': <SplitButtonWithEverything />,
      },
      table: {
        defaultValue: { summary: undefined },
        type: { summary: 'ReactNode' },
      },
    },
  },
  args: {
    color: ComponentButtonColors.PRIMARY,
    size: Sizes.MEDIUM,
    children: <SplitButtonWithEverything />,
  },
};

export default meta;
type Story = StoryObj<typeof SplitButton>;

export const Playground: Story = {
  name: 'SplitButton',
  render: (args) => {
    const { children, ...rest } = args;

    return <SplitButton {...rest}>{children}</SplitButton>;
  },
};
