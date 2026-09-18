import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { FillVariants, Sizes, ValidationStates } from '../../../constants';
import { useSelectionState, useToggle } from '../../../hooks';
import { renderPickerLanguageItems } from '../demo/PickerLanguageItems';
import ReadMe from '../README.md?raw';
import { UNSTABLE_Picker, UNSTABLE_PickerGroup, UNSTABLE_UncontrolledPicker } from '..';
import { ContextualHelp } from '../..';

const PLAYGROUND_PICKER_ID = 'story-picker-playground';

type PickerStoryArgs = React.ComponentProps<typeof UNSTABLE_Picker> & {
  showContextualHelp?: boolean;
};

const meta = {
  title: 'Experimental/UNSTABLE_Picker',
  component: UNSTABLE_Picker,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
    controls: { exclude: ['children', 'hasValidationIcon', 'contextualHelp'] },
  },
  argTypes: {
    addButtonLabel: { control: 'text' },
    closeButtonLabel: { control: 'text' },
    showContextualHelp: {
      control: 'boolean',
      description: 'Shows `ContextualHelp` next to the label.',
      table: { defaultValue: { summary: 'false' } },
    },
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
    tagProps: { control: 'object' },
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
    variant: {
      control: 'select',
      options: [...Object.values(FillVariants), undefined],
      table: { defaultValue: { summary: FillVariants.FILL } },
    },
  },
  args: {
    addButtonLabel: 'Add',
    closeButtonLabel: 'Close',
    showContextualHelp: false,
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
    variant: FillVariants.FILL,
  },
} as Meta<PickerStoryArgs>;

export default meta;
type Story = StoryObj<PickerStoryArgs>;

const PlaygroundStory = (args: PickerStoryArgs) => {
  const { showContextualHelp, ...pickerArgs } = args;
  const { selectionMode } = args;
  const { selectedKeys, setSelectedKeys } = useSelectionState({
    defaultSelectedKeys: [],
    selectionMode,
  });
  const [isOpen, onToggle] = useToggle(false);

  return (
    <UNSTABLE_Picker
      {...pickerArgs}
      contextualHelp={
        showContextualHelp ? (
          <ContextualHelp id={`${pickerArgs.id}-contextual-help`} label="More information about Languages">
            Choose all languages you can use.
          </ContextualHelp>
        ) : undefined
      }
      isOpen={isOpen}
      onToggle={onToggle}
      onSelectionChange={setSelectedKeys}
      selectedKeys={selectedKeys}
    >
      <UNSTABLE_PickerGroup label="Language">{renderPickerLanguageItems()}</UNSTABLE_PickerGroup>
    </UNSTABLE_Picker>
  );
};

const UncontrolledStory = (args: PickerStoryArgs) => {
  const { showContextualHelp } = args;
  const { id } = args;
  const rest = { ...args } as Record<string, unknown>;
  delete rest.showContextualHelp;
  delete rest.id;
  delete rest.isOpen;
  delete rest.onToggle;
  delete rest.selectedKeys;
  delete rest.onSelectionChange;

  return (
    <UNSTABLE_UncontrolledPicker
      {...(rest as unknown as React.ComponentProps<typeof UNSTABLE_UncontrolledPicker>)}
      contextualHelp={
        showContextualHelp ? (
          <ContextualHelp id={`${id}-uncontrolled-contextual-help`} label="More information about Languages">
            Choose all languages you can use.
          </ContextualHelp>
        ) : undefined
      }
      id={`${id}-uncontrolled`}
      defaultSelectedKeys={['cs']}
    >
      <UNSTABLE_PickerGroup label="Language">{renderPickerLanguageItems()}</UNSTABLE_PickerGroup>
    </UNSTABLE_UncontrolledPicker>
  );
};

export const Playground: Story = {
  name: 'UNSTABLE_Picker',
  render: (args: PickerStoryArgs) => <PlaygroundStory {...args} />,
};

export const UncontrolledPlayground: Story = {
  name: 'UNSTABLE_UncontrolledPicker',
  render: (args: PickerStoryArgs) => <UncontrolledStory {...args} />,
};
