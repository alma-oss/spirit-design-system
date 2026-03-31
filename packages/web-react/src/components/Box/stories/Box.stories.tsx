import { accentColors, emotionColors } from '@alma-oss/spirit-design-tokens';
import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import {
  BackgroundColors,
  BackgroundGradients,
  BorderColors,
  BorderStyles,
  BorderWidths,
  TextColors,
} from '../../../constants';
import { type ColorSchemeType } from '../../../types';
import {
  getAccentBackgroundColors,
  getAccentBorderColors,
  getAccentTextColors,
  getEmotionBackgroundColors,
  getEmotionBorderColors,
  getEmotionTextColors,
} from '../../../utils';
import Box from '../Box';
import ReadMe from '../README.md?raw';

const colorSchemeSurfaceIntensities = ['basic', 'subtle'] as const;

const boxColorSchemeOptions: ColorSchemeType[] = [
  'disabled',
  'neutral-basic',
  'neutral-subtle',
  'selected-basic',
  'selected-subtle',
  ...(Object.keys(accentColors) as Array<keyof typeof accentColors>).flatMap((key) =>
    colorSchemeSurfaceIntensities.map((intensity) => `accent-${key}-${intensity}` as ColorSchemeType),
  ),
  ...(Object.keys(emotionColors) as Array<keyof typeof emotionColors>).flatMap((key) =>
    colorSchemeSurfaceIntensities.map((intensity) => `emotion-${key}-${intensity}` as ColorSchemeType),
  ),
];

const accentTextColorsObject = getAccentTextColors();
const emotionTextColorsObject = getEmotionTextColors();
const accentBorderColorsObject = getAccentBorderColors();
const emotionBorderColorsObject = getEmotionBorderColors();
const accentBackgroundColorsObject = getAccentBackgroundColors();
const emotionBackgroundColorsObject = getEmotionBackgroundColors();

const meta: Meta<typeof Box> = {
  title: 'Components/Box',
  component: Box,
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
          summary: 'div',
        },
      },
    },
    padding: {
      control: 'text',
      table: {
        type: {
          summary: 'SpaceToken',
        },
      },
    },
    paddingX: {
      control: 'text',
      table: {
        type: {
          summary: 'SpaceToken',
        },
      },
    },
    paddingY: {
      control: 'text',
      table: {
        type: {
          summary: 'SpaceToken',
        },
      },
    },
    paddingTop: {
      control: 'text',
      table: {
        type: {
          summary: 'SpaceToken',
        },
      },
    },
    paddingBottom: {
      control: 'text',
      table: {
        type: {
          summary: 'SpaceToken',
        },
      },
    },
    paddingLeft: {
      control: 'text',
      table: {
        type: {
          summary: 'SpaceToken',
        },
      },
    },
    paddingRight: {
      control: 'text',
      table: {
        type: {
          summary: 'SpaceToken',
        },
      },
    },
    borderWidth: {
      control: 'select',
      options: [...Object.values(BorderWidths), undefined],
      table: {
        type: {
          summary: 'BorderWidthsDictionaryType',
        },
      },
    },
    borderRadius: {
      control: 'object',
    },
    borderStyle: {
      control: 'select',
      options: Object.values(BorderStyles),
      table: {
        defaultValue: { summary: BorderStyles.SOLID },
        type: {
          summary: 'BorderStylesDictionaryType',
        },
      },
    },
    borderColor: {
      control: 'select',
      options: [
        ...Object.values(BorderColors),
        ...[...Object.values(accentBorderColorsObject), ...Object.values(emotionBorderColorsObject)],
        undefined,
      ],
      table: {
        type: {
          summary: 'BorderColorsDictionaryType | AccentColorsType | EmotionColorsType',
        },
      },
    },
    backgroundColor: {
      control: 'select',
      options: [
        ...Object.values(BackgroundColors),
        ...[...Object.values(accentBackgroundColorsObject), ...Object.values(emotionBackgroundColorsObject)],
        undefined,
      ],
      table: {
        type: {
          summary: 'BackgroundColorsDictionaryType | AccentColorsType | EmotionColorsType',
        },
      },
    },
    backgroundGradient: {
      control: 'select',
      options: [...Object.values(BackgroundGradients), undefined],
      table: {
        type: {
          summary: 'BackgroundGradientsDictionaryType',
        },
      },
    },
    textColor: {
      control: 'select',
      options: [
        ...Object.values(TextColors),
        ...[...Object.values(accentTextColorsObject), ...Object.values(emotionTextColorsObject)],
        undefined,
      ],
      table: {
        type: {
          summary: 'TextColorsDictionaryType | AccentColorsType | EmotionColorsType',
        },
      },
    },
    colorScheme: {
      control: 'select',
      options: [undefined, ...boxColorSchemeOptions],
      table: {
        type: {
          summary: 'ColorSchemeType',
        },
      },
    },
  },
  args: {
    elementType: 'div',
    padding: undefined,
    borderWidth: undefined,
    borderStyle: 'solid',
    borderRadius: {
      mobile: '100',
      tablet: '200',
      desktop: '400',
    },
    borderColor: undefined,
    backgroundColor: undefined,
    backgroundGradient: undefined,
    textColor: undefined,
    colorScheme: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Playground: Story = {
  name: 'Box',
  render: (args) => <Box {...args}>Content</Box>,
};
