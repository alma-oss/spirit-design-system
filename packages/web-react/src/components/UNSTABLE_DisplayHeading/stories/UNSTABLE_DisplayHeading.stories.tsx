import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Sizes, TextAlignments, TextColors, TextHyphens, TextWordBreaks } from '../../../constants';
import { type TextColorsType } from '../../../types';
import { getAccentTextColors, getEmotionTextColors } from '../../../utils';
import { Box } from '../../Box';
import ReadMe from '../README.md?raw';
import { UNSTABLE_DisplayHeading } from '..';

const textColorValues = [
  ...Object.values(TextColors),
  ...Object.values(getAccentTextColors()),
  ...Object.values(getEmotionTextColors()),
];

const meta: Meta<typeof UNSTABLE_DisplayHeading> = {
  title: 'Experimental/UNSTABLE_DisplayHeading',
  component: UNSTABLE_DisplayHeading,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    children: {
      control: 'text',
    },
    elementType: {
      control: 'text',
    },
    isItalic: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isTextBalanced: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'select',
      options: [...Object.values(Sizes), undefined],
      table: {
        defaultValue: { summary: Sizes.MEDIUM },
      },
    },
    textAlignment: {
      control: 'select',
      options: [...Object.values(TextAlignments), undefined],
      table: {
        defaultValue: { summary: undefined },
      },
    },
    textColor: {
      control: 'select',
      options: [...textColorValues, undefined],
      table: {
        defaultValue: { summary: undefined },
      },
    },
    textHyphens: {
      control: 'select',
      options: [...Object.values(TextHyphens), undefined],
      table: {
        defaultValue: { summary: undefined },
      },
    },
    textWordBreak: {
      control: 'select',
      options: [...Object.values(TextWordBreaks), undefined],
      table: {
        defaultValue: { summary: undefined },
      },
    },
  },
  args: {
    children: 'Display heading',
    elementType: 'h1',
    size: Sizes.MEDIUM,
    textAlignment: TextAlignments.LEFT,
    textColor: undefined,
    textHyphens: undefined,
    textWordBreak: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof UNSTABLE_DisplayHeading>;

export const Playground: Story = {
  name: 'UNSTABLE_DisplayHeading',
  render: (args) => {
    const { children, textColor, size = Sizes.MEDIUM, ...restProps } = args;
    const bgColor = (textColor as TextColorsType)?.replace(/basic|subtle/, (match) =>
      match === 'basic' ? 'subtle' : 'basic',
    );
    const boxClass = (textColor as TextColorsType)?.match(/basic|subtle/) ? `bg-${bgColor}` : '';

    return (
      <Box UNSAFE_className={boxClass || undefined} padding="space-800">
        <UNSTABLE_DisplayHeading textColor={textColor} size={size} {...restProps}>
          {children}
        </UNSTABLE_DisplayHeading>
      </Box>
    );
  },
};
