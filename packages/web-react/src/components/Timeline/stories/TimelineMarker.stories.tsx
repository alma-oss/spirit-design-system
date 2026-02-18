import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { BackgroundColors, BorderColors, TextColors } from '../../../constants';
import {
  getAccentBackgroundColors,
  getAccentBorderColors,
  getAccentTextColors,
  getEmotionBackgroundColors,
  getEmotionBorderColors,
  getEmotionTextColors,
} from '../../../utils';
import { Icon } from '../../Icon';
import { TIMELINE_MARKER } from '../constants';
import ReadMe from '../README.md?raw';
import TimelineMarker from '../TimelineMarker';

const accentTextColorsObject = getAccentTextColors();
const emotionTextColorsObject = getEmotionTextColors();
const accentBorderColorsObject = getAccentBorderColors();
const emotionBorderColorsObject = getEmotionBorderColors();
const accentBackgroundColorsObject = getAccentBackgroundColors();
const emotionBackgroundColorsObject = getEmotionBackgroundColors();

const meta: Meta<typeof TimelineMarker> = {
  title: 'Components/Timeline',
  component: TimelineMarker,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    children: {
      control: 'select',
      options: ['Number', 'Dot', 'Icon'],
      description: 'Marker type and content',
      mapping: {
        Number: '1',
        Dot: '',
        Icon: <Icon name="file" />,
      },
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    variant: {
      control: 'select',
      options: ['number', 'dot', 'icon'],
      table: {
        defaultValue: { summary: 'number' },
      },
      description: 'Marker variant type (use undefined for icons)',
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
          summary: 'BorderColorsDictionaryType | AccentColorNamesType | EmotionColorsNameType',
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
          summary: 'BackgroundColorsDictionaryType | AccentColorNamesType | EmotionColorsNameType',
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
          summary: 'TextColorsDictionaryType | AccentColorNamesType | EmotionColorsNameType',
        },
      },
    },
  },
  args: {
    children: 'Number',
    variant: TIMELINE_MARKER.NUMBER,
    borderColor: undefined,
    backgroundColor: undefined,
    textColor: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof TimelineMarker>;

export const TimelineMarkerPlayground: Story = {
  name: 'TimelineMarker',
};
