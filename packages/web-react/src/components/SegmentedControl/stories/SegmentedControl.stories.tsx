import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import { FillVariants } from '../../../constants';
import { type SegmentedControlProps } from '../../../types/segmentedControl';
import { Icon } from '../../Icon';
import { VisuallyHidden } from '../../VisuallyHidden';
import ReadMe from '../README.md';
import SegmentedControl from '../SegmentedControl';
import SegmentedControlItem from '../SegmentedControlItem';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    children: {
      control: 'select',
      options: ['label only', 'label with icon', 'icon only'],
      description: `This is the place for the content of the SegmentedControl.
      In the real code you can pass any children you want.
      In this demo we have predefined options:
      \`label only\`, \`label with icon\` and \`icon only\`.`,
    },
    isMultiselect: {
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isFluid: {
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    name: {
      control: { type: 'text' },
    },
    label: {
      control: { type: 'text' },
    },
    variant: {
      control: 'select',
      options: [...Object.values(FillVariants)],
      table: {
        defaultValue: { summary: FillVariants.OUTLINE },
      },
    },
    onSelectionChange: {
      action: 'onSelectionChange',
      description: 'Callback triggered when selected value changes.',
      table: {
        category: 'Events',
      },
    },
    selectedValue: {
      table: {
        disable: true,
      },
    },
    setSelectedValue: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    children: 'label only',
    isMultiselect: false,
    isFluid: false,
    label: 'Segmented Control Label',
    name: 'segmented-control',
    variant: FillVariants.OUTLINE,
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

const SegmentedControlWithHooks = ({ name, label, children, ...args }: SegmentedControlProps) => {
  const defaultSingleValue = 'value-1';
  const defaultMultipleValue = ['value-1'];

  const [selectedValue, setSelectedValue] = useState<string | string[]>(
    args.isMultiselect ? defaultMultipleValue : defaultSingleValue,
  );

  useEffect(() => {
    setSelectedValue(args.isMultiselect ? defaultMultipleValue : defaultSingleValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- we want to run this only once on mount
  }, [args.isMultiselect, defaultSingleValue]);

  return (
    <SegmentedControl
      {...args}
      name={`${name}`}
      UNSAFE_style={{ display: 'inline-grid' }}
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
      label={`${label}`}
    >
      {children}
    </SegmentedControl>
  );
};

export const Playground: Story = {
  name: 'SegmentedControl',
  render: (args) => {
    const getItemContent = (isDisabled = false) => {
      const label = isDisabled ? 'Label disabled' : 'Label';

      switch (args.children) {
        case 'label with icon':
          return (
            <>
              <Icon name="file" boxSize={20} />
              {label}
            </>
          );
        case 'icon only':
          return (
            <>
              <Icon name="file" boxSize={20} />
              <VisuallyHidden>{label}</VisuallyHidden>
            </>
          );
        case 'label only':
        default:
          return label;
      }
    };

    return (
      <SegmentedControlWithHooks {...args}>
        <SegmentedControlItem value="value-1" id="segmented-control-1">
          {getItemContent()}
        </SegmentedControlItem>
        <SegmentedControlItem value="value-2" id="segmented-control-2">
          {getItemContent()}
        </SegmentedControlItem>
        <SegmentedControlItem value="value-3" id="segmented-control-3" isDisabled>
          {getItemContent(true)}
        </SegmentedControlItem>
        <SegmentedControlItem value="value-4" id="segmented-control-4">
          {getItemContent()}
        </SegmentedControlItem>
      </SegmentedControlWithHooks>
    );
  },
};
