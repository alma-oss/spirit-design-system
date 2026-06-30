import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { TextAlignments, TextColors, TextHyphens, TextWordBreaks } from '../../../constants';
import { type TextColorsType } from '../../../types';
import { getAccentTextColors, getEmotionTextColors } from '../../../utils';
import ReadMe from '../README.md?raw';
import { CaptionText } from '..';

const textColorValues = [
  ...Object.values(TextColors),
  ...Object.values(getAccentTextColors()),
  ...Object.values(getEmotionTextColors()),
];

const meta: Meta<typeof CaptionText> = {
  title: 'Components/CaptionText',
  component: CaptionText,
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
      table: {
        defaultValue: { summary: 'span' },
      },
    },
    isTextBalanced: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
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
    children: 'Caption text',
    elementType: 'span',
    isTextBalanced: false,
    textAlignment: TextAlignments.LEFT,
    textColor: undefined,
    textHyphens: undefined,
    textWordBreak: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof CaptionText>;

export const Playground: Story = {
  name: 'CaptionText',
  render: (args) => {
    const { children, textColor, ...restProps } = args;
    const bgColor = (textColor as TextColorsType)?.replace(/basic|subtle/, (match) =>
      match === 'basic' ? 'subtle' : 'basic',
    );
    const boxClass = (textColor as TextColorsType)?.match(/basic|subtle/) ? `bg-${bgColor}` : '';

    return (
      <div className={`${boxClass} px-800 py-800`}>
        <CaptionText textColor={textColor} {...restProps}>
          {children}
        </CaptionText>
      </div>
    );
  },
};
