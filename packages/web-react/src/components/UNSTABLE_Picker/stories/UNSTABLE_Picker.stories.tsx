import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Sizes, ValidationStates } from '../../../constants';
import { useToggle } from '../../../hooks';
import { UNSTABLE_PICKER_DOCS_DEMO_WRAPPER_CLASSNAME } from '../demo/constants';
import { renderPickerLanguageItems } from '../demo/PickerLanguageItems';
import ReadMe from '../README.md?raw';
import { UNSTABLE_Picker, UNSTABLE_PickerGroup, UNSTABLE_UncontrolledPicker } from '..';

const PLAYGROUND_PICKER_ID = 'story-picker-playground';

const meta: Meta<typeof UNSTABLE_Picker> = {
  title: 'Experimental/UNSTABLE_Picker',
  component: UNSTABLE_Picker,
  decorators: [
    (Story) => (
      <div className={UNSTABLE_PICKER_DOCS_DEMO_WRAPPER_CLASSNAME}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
    controls: { exclude: ['children', 'hasValidationIcon'] },
  },
  argTypes: {
    addButtonLabel: { control: 'text' },
    closeButtonLabel: { control: 'text' },
    emptySelectionLabel: { control: 'text' },
    hasValidationIcon: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    helperText: { control: 'text' },
    id: { control: 'text' },
    isAggregated: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    isDisabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    isLabelHidden: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    isRequired: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    label: { control: 'text' },
    removeAllLabel: { control: 'text' },
    removeItemLabel: { control: 'text' },
    selectionAriaLabel: { control: 'text' },
    selectionMode: {
      control: 'select',
      options: ['multiple', 'single'],
      table: { defaultValue: { summary: 'multiple' } },
    },
    size: {
      control: 'select',
      options: [...Object.values(Sizes), undefined],
      table: { defaultValue: { summary: Sizes.MEDIUM } },
    },
    tagDescriptionText: { control: 'text' },
    validationState: {
      control: 'select',
      options: [...Object.values(ValidationStates), undefined],
      table: { defaultValue: { summary: 'undefined' } },
    },
    validationText: {
      control: 'object',
      description:
        'The validation text. Only visible if validationState is set. Use a string `"foo"` for single validation text or an array for multiple validation texts `["foo", "bar"]`.',
    },
  },
  args: {
    addButtonLabel: 'Add',
    closeButtonLabel: 'Close',
    emptySelectionLabel: 'Languages',
    hasValidationIcon: false,
    helperText: undefined,
    id: PLAYGROUND_PICKER_ID,
    isAggregated: false,
    isDisabled: false,
    isLabelHidden: false,
    isRequired: false,
    label: 'Languages',
    removeAllLabel: 'Remove all',
    removeItemLabel: 'Remove {itemLabel}',
    selectionAriaLabel: 'Selected {label}',
    selectionMode: 'multiple',
    size: Sizes.MEDIUM,
    tagDescriptionText: 'Press Delete or Backspace to remove',
    validationState: undefined,
    validationText: 'Validation message',
  },
};

export default meta;
type Story = StoryObj<typeof UNSTABLE_Picker>;

const PlaygroundStory = (args: React.ComponentProps<typeof UNSTABLE_Picker>) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [isOpen, onToggle] = useToggle(false);

  return (
    <UNSTABLE_Picker
      {...args}
      isOpen={isOpen}
      onToggle={onToggle}
      onSelectionChange={setSelectedKeys}
      selectedKeys={selectedKeys}
    >
      <UNSTABLE_PickerGroup label="Language">{renderPickerLanguageItems()}</UNSTABLE_PickerGroup>
    </UNSTABLE_Picker>
  );
};

const UncontrolledStory = (args: React.ComponentProps<typeof UNSTABLE_Picker>) => {
  const { id } = args;
  const rest = { ...args } as Record<string, unknown>;
  delete rest.id;
  delete rest.isOpen;
  delete rest.onToggle;
  delete rest.selectedKeys;
  delete rest.onSelectionChange;

  return (
    <UNSTABLE_UncontrolledPicker
      {...(rest as unknown as React.ComponentProps<typeof UNSTABLE_UncontrolledPicker>)}
      id={`${id}-uncontrolled`}
      defaultSelectedKeys={['cs']}
    >
      <UNSTABLE_PickerGroup label="Language">{renderPickerLanguageItems()}</UNSTABLE_PickerGroup>
    </UNSTABLE_UncontrolledPicker>
  );
};

export const Playground: Story = {
  name: 'UNSTABLE_Picker',
  render: (args: React.ComponentProps<typeof UNSTABLE_Picker>) => <PlaygroundStory {...args} />,
};

export const UncontrolledPlayground: Story = {
  name: 'UNSTABLE_UncontrolledPicker',
  render: (args: React.ComponentProps<typeof UNSTABLE_Picker>) => <UncontrolledStory {...args} />,
};
