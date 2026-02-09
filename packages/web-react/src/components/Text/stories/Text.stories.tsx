import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Emphasis, SizesExtended, TextAlignments, TextColors, TextHyphens, TextWordBreaks } from '../../../constants';
import { type TextColorsType } from '../../../types';
import { getAccentTextColors, getEmotionTextColors } from '../../../utils';
import ReadMe from '../README.md';
import { Text } from '..';

const accentColorsObject = getAccentTextColors();
const emotionColorsObject = getEmotionTextColors();
const textColorValues = [
  ...Object.values(TextColors),
  ...Object.values(accentColorsObject),
  ...Object.values(emotionColorsObject),
];

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
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
        defaultValue: { summary: Emphasis.REGULAR },
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
    children: 'Text',
    elementType: 'p',
    emphasis: Emphasis.REGULAR,
    isTextBalanced: false,
    size: SizesExtended.MEDIUM,
    textAlignment: TextAlignments.LEFT,
    textColor: undefined,
    textHyphens: undefined,
    textWordBreak: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Playground: Story = {
  name: 'Text',
  render: (args) => {
    const { children, textColor, ...restProps } = args;
    const bgColor = (textColor as TextColorsType)?.replace(/basic|subtle/, (match) =>
      match === 'basic' ? 'subtle' : 'basic',
    );
    const boxClass = (textColor as TextColorsType)?.match(/basic|subtle/) ? `bg-${bgColor}` : '';

    return (
      <div className={`${boxClass} p-800`}>
        <Text textColor={textColor} {...restProps}>
          {children}
        </Text>
      </div>
    );
  },
};
