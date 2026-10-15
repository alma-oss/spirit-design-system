import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Intensity, TextAlignments, TextColors, TextHyphens, TextWordBreaks } from '../../../constants';
import { type BoxBackgroundColorsType, type TextColorsType } from '../../../types';
import { getAccentTextColors, getEmotionTextColors } from '../../../utils';
import { Box } from '../../Box';
import ReadMe from '../README.md?raw';
import { UNSTABLE_EyebrowText } from '..';

const textColorValues = [
  ...Object.values(TextColors),
  ...Object.values(getAccentTextColors()),
  ...Object.values(getEmotionTextColors()),
];

const intensityPattern = new RegExp(`${Intensity.BASIC}|${Intensity.SUBTLE}`);

const meta: Meta<typeof UNSTABLE_EyebrowText> = {
  title: 'Experimental/UNSTABLE_EyebrowText',
  component: UNSTABLE_EyebrowText,
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
        defaultValue: { summary: 'p' },
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
    children: 'EyebrowText',
    elementType: 'p',
    textAlignment: TextAlignments.LEFT,
    textColor: undefined,
    textHyphens: undefined,
    textWordBreak: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof UNSTABLE_EyebrowText>;

export const Playground: Story = {
  name: 'UNSTABLE_EyebrowText',
  render: (args) => {
    const { children, textColor, ...restProps } = args;
    const bgColor = (textColor as TextColorsType)?.replace(intensityPattern, (match) =>
      match === Intensity.BASIC ? Intensity.SUBTLE : Intensity.BASIC,
    );
    const backgroundColor = (textColor as TextColorsType)?.match(intensityPattern) ? bgColor : undefined;

    return (
      <Box backgroundColor={backgroundColor as BoxBackgroundColorsType | undefined} padding="space-800">
        <UNSTABLE_EyebrowText textColor={textColor} {...restProps}>
          {children}
        </UNSTABLE_EyebrowText>
      </Box>
    );
  },
};
