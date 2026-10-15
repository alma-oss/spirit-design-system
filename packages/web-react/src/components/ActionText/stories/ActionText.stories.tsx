import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Intensity, Sizes, TextAlignments, TextColors, TextHyphens, TextWordBreaks } from '../../../constants';
import { type BoxBackgroundColorsType, type TextColorsType } from '../../../types';
import { getAccentTextColors, getEmotionTextColors } from '../../../utils';
import { Box } from '../../Box';
import ReadMe from '../README.md?raw';
import { ActionText } from '..';

const textColorValues = [
  ...Object.values(TextColors),
  ...Object.values(getAccentTextColors()),
  ...Object.values(getEmotionTextColors()),
];

const intensityPattern = new RegExp(`${Intensity.BASIC}|${Intensity.SUBTLE}`);

const meta: Meta<typeof ActionText> = {
  title: 'Components/ActionText',
  component: ActionText,
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
    size: {
      control: 'select',
      options: [...Object.values(Sizes)],
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
    children: 'Action text',
    elementType: 'span',
    isTextBalanced: false,
    size: Sizes.MEDIUM,
    textAlignment: TextAlignments.LEFT,
    textColor: undefined,
    textHyphens: undefined,
    textWordBreak: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof ActionText>;

export const Playground: Story = {
  name: 'ActionText',
  render: (args) => {
    const { children, textColor, size = Sizes.MEDIUM, ...restProps } = args;
    const bgColor = (textColor as TextColorsType)?.replace(intensityPattern, (match) =>
      match === Intensity.BASIC ? Intensity.SUBTLE : Intensity.BASIC,
    );
    const backgroundColor = (textColor as TextColorsType)?.match(intensityPattern) ? bgColor : undefined;

    return (
      <Box backgroundColor={backgroundColor as BoxBackgroundColorsType | undefined} padding="space-800">
        <ActionText textColor={textColor} size={size} {...restProps}>
          {children}
        </ActionText>
      </Box>
    );
  },
};
