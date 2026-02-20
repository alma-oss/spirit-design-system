import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Emphasis, SizesExtended, TextAlignments, TextColors, TextHyphens, TextWordBreaks } from '../../../constants';
import { getAccentTextColors, getEmotionTextColors } from '../../../utils';
import ReadMe from '../README.md?raw';
import { Heading } from '..';

const accentColorsObject = getAccentTextColors();
const emotionColorsObject = getEmotionTextColors();
const textColorValues = [
  ...Object.values(TextColors),
  ...Object.values(accentColorsObject),
  ...Object.values(emotionColorsObject),
];

const meta: Meta<typeof Heading> = {
  title: 'Components/Heading',
  component: Heading,
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
    emphasis: {
      control: 'select',
      options: [...Object.values(Emphasis), undefined],
      table: {
        defaultValue: { summary: Emphasis.BOLD },
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
      options: [...Object.values(SizesExtended)],
      table: {
        defaultValue: { summary: SizesExtended.MEDIUM },
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
    children: 'Heading',
    elementType: 'h1',
    emphasis: Emphasis.BOLD,
    isTextBalanced: false,
    size: SizesExtended.MEDIUM,
    textAlignment: TextAlignments.LEFT,
    textColor: undefined,
    textHyphens: undefined,
    textWordBreak: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Playground: Story = {
  name: 'Heading',
  render: (args) => {
    const { children, textColor, ...restProps } = args;
    const bgColor = textColor?.replace(/basic|subtle/, (match) => (match === 'basic' ? 'subtle' : 'basic'));
    const boxClass = textColor?.match(/basic|subtle/) ? `bg-${bgColor}` : '';

    return (
      <div className={`${boxClass} p-800`}>
        <Heading textColor={textColor} {...restProps}>
          {children}
        </Heading>
      </div>
    );
  },
};
