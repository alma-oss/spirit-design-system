import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { FillVariants, Sizes, ValidationStates } from '../../../constants';
import { COMBOBOX_LANGUAGE_OPTION_KEYS, renderComboboxLanguageItems } from '../demo/ComboboxLanguageItems';
import ReadMe from '../README.md?raw';
import { UNSTABLE_UncontrolledCombobox } from '..';

const UNCONTROLLED_COMBOBOX_ID = 'story-combobox-uncontrolled';

const meta: Meta<typeof UNSTABLE_UncontrolledCombobox> = {
  title: 'Experimental/UNSTABLE_Combobox',
  component: UNSTABLE_UncontrolledCombobox,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
    controls: { exclude: ['children', 'hasValidationIcon'] },
  },
  argTypes: {
    addMoreLabel: { control: 'text' },
    emptySelectionLabel: { control: 'text' },
    hasClearButton: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    hasValidationIcon: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    helperText: { control: 'text' },
    id: { control: 'text' },
    isDisabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    isLabelHidden: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    isLoading: {
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
    variant: {
      control: 'select',
      options: [...Object.values(FillVariants), undefined],
      table: { defaultValue: { summary: FillVariants.FILL } },
    },
  },
  args: {
    id: UNCONTROLLED_COMBOBOX_ID,
    label: 'Languages',
    helperText: 'You can select multiple languages.',
    hasClearButton: false,
    isDisabled: false,
    isLoading: false,
    isRequired: false,
    size: Sizes.MEDIUM,
    validationState: undefined,
    validationText: 'Validation message',
    variant: FillVariants.FILL,
  },
};

export default meta;
type Story = StoryObj<typeof UNSTABLE_UncontrolledCombobox>;

export const UncontrolledPlayground: Story = {
  name: 'UNSTABLE_UncontrolledCombobox',
  render: (args) => (
    <UNSTABLE_UncontrolledCombobox {...args} defaultSelectedKeys={['cs']} optionKeys={COMBOBOX_LANGUAGE_OPTION_KEYS}>
      {renderComboboxLanguageItems()}
    </UNSTABLE_UncontrolledCombobox>
  ),
};
