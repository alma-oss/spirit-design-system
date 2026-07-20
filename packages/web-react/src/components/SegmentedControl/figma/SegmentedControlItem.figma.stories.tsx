import figma from '@figma/code-connect';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { type ComponentProps } from 'react';
import { Icon } from '../../Icon';
import { Truncate } from '../../Truncate';
import SegmentedControlItem from '../SegmentedControlItem';

const meta: Meta<typeof SegmentedControlItem> = {
  title: 'Components/SegmentedControl/Figma',
  component: SegmentedControlItem,
  tags: ['!autodocs', 'figma'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/w9Ca4hvkuYLshsrHu1bYwT/SPIRIT-DESIGN-SYSTEM--UI-Kit-?node-id=29237%3A1987',
      props: {
        isDisabled: figma.boolean('Disabled'),
        isSelected: figma.boolean('Selected'),
        isLabelHidden: figma.boolean('Label', {
          true: false,
          false: true,
        }),
        labelProps: figma.boolean('Label', {
          true: figma.nestedProps('Label', {
            label: figma.string('Label'),
          }),
          false: { label: 'Fill accessible label' },
        }),
      },
      examples: [
        { example: 'FigmaWithIcon', variant: { Icon: true } },
        { example: 'FigmaWithoutIcon', variant: { Icon: false } },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedControlItem>;

type SegmentedControlItemFigmaProps = ComponentProps<typeof SegmentedControlItem> & {
  labelProps?: { label?: string };
};

export const FigmaWithIcon: Story = {
  name: 'With Icon',
  render: ({ labelProps = {}, ...props }: SegmentedControlItemFigmaProps) => (
    <SegmentedControlItem {...props}>
      <Icon name="placeholder" />
      <Truncate mode="lines" limit={1}>
        {labelProps.label}
      </Truncate>
    </SegmentedControlItem>
  ),
};

export const FigmaWithoutIcon: Story = {
  name: 'Without Icon',
  render: ({ labelProps = {}, ...props }: SegmentedControlItemFigmaProps) => (
    <SegmentedControlItem {...props}>
      <Truncate mode="lines" limit={1}>
        {labelProps.label}
      </Truncate>
    </SegmentedControlItem>
  ),
};
