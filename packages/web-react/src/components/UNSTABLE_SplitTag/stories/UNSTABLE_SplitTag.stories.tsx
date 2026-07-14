import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { EmotionColors, SizesExtended } from '../../../constants';
import { type SizeExtendedDictionaryType, type TagColor } from '../../../types';
import { TagColorsExtended } from '../../Tag';
import SplitTagPragueRadius from '../demo/SplitTagPragueRadius';
import ReadMe from '../README.md?raw';
import { UNSTABLE_SplitTag } from '..';

const meta: Meta<typeof UNSTABLE_SplitTag> = {
  title: 'Experimental/UNSTABLE_SplitTag',
  component: UNSTABLE_SplitTag,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
    controls: { exclude: ['ElementTag', 'UNSAFE_className', 'UNSAFE_style', 'transferClassName'] },
  },
  argTypes: {
    color: {
      control: 'select',
      options: [...Object.values(TagColorsExtended), ...Object.values(EmotionColors)],
      table: {
        defaultValue: { summary: TagColorsExtended.NEUTRAL },
      },
    },
    isDisabled: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isSubtle: {
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
  },
  args: {
    color: TagColorsExtended.NEUTRAL,
    isDisabled: false,
    isSubtle: false,
    size: SizesExtended.MEDIUM,
  },
};

export default meta;
type Story = StoryObj<typeof UNSTABLE_SplitTag>;

export const Playground: Story = {
  name: 'UNSTABLE_SplitTag',
  render: (args) => (
    <SplitTagPragueRadius
      color={args.color as TagColor<void>}
      id="storybook-split-tag-prague-radius"
      isDisabled={args.isDisabled}
      isSubtle={args.isSubtle}
      size={args.size as SizeExtendedDictionaryType}
    />
  ),
};

export const RemoveSegmentTagButton: Story = {
  name: 'Remove segment: Tag as button',
  render: (args) => (
    <SplitTagPragueRadius
      color={args.color as TagColor<void>}
      id="storybook-split-tag-prague-radius-tag-button"
      isDisabled={args.isDisabled}
      isSubtle={args.isSubtle}
      removeSegmentVariant="tag-button"
      size={args.size as SizeExtendedDictionaryType}
    />
  ),
};

export const RemoveSegmentControlButton: Story = {
  name: 'Remove segment: ControlButton as button',
  render: (args) => (
    <SplitTagPragueRadius
      color={args.color as TagColor<void>}
      id="storybook-split-tag-prague-radius-control-button"
      isDisabled={args.isDisabled}
      isSubtle={args.isSubtle}
      removeSegmentVariant="control-button"
      size={args.size as SizeExtendedDictionaryType}
    />
  ),
};
