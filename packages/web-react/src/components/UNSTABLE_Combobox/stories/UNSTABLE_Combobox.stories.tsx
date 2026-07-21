import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useMemo, useState } from 'react';
import { Item, Label } from '../..';
import { FillVariants, Sizes, ValidationStates } from '../../../constants';
import { useToggle } from '../../../hooks';
import {
  COMBOBOX_LANGUAGE_OPTIONS,
  COMBOBOX_LANGUAGE_OPTION_KEYS,
  filterComboboxLanguageOptions,
  renderComboboxLanguageItems,
} from '../demo/ComboboxLanguageItems';
import ReadMe from '../README.md?raw';
import { UNSTABLE_Combobox, UNSTABLE_UncontrolledCombobox } from '..';

const PLAYGROUND_COMBOBOX_ID = 'story-combobox-playground';

const meta: Meta<typeof UNSTABLE_Combobox> = {
  title: 'Experimental/UNSTABLE_Combobox',
  component: UNSTABLE_Combobox,
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
    validationText: { control: 'object' },
    variant: {
      control: 'select',
      options: [...Object.values(FillVariants), undefined],
      table: { defaultValue: { summary: FillVariants.FILL } },
    },
  },
  args: {
    id: PLAYGROUND_COMBOBOX_ID,
    label: 'Languages',
    helperText: 'You can select multiple languages.',
    hasClearButton: false,
    isDisabled: false,
    isLoading: false,
    isRequired: false,
    size: Sizes.MEDIUM,
    variant: FillVariants.FILL,
  },
};

export default meta;
type Story = StoryObj<typeof UNSTABLE_Combobox>;

const PlaygroundRender = (args: React.ComponentProps<typeof UNSTABLE_Combobox>) => {
  const [isOpen, onToggle] = useToggle(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['cs']);
  const [inputValue, setInputValue] = useState('');

  const filteredOptions = useMemo(
    () => filterComboboxLanguageOptions(inputValue, COMBOBOX_LANGUAGE_OPTIONS),
    [inputValue],
  );

  return (
    <UNSTABLE_Combobox
      {...args}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      inputValue={inputValue}
      onInputChange={setInputValue}
      optionKeys={COMBOBOX_LANGUAGE_OPTION_KEYS}
      hasEmptyState={filteredOptions.length === 0}
    >
      {renderComboboxLanguageItems(filteredOptions)}
    </UNSTABLE_Combobox>
  );
};

export const Playground: Story = {
  name: 'UNSTABLE_Combobox',
  render: (args) => <PlaygroundRender {...args} />,
};

export const UncontrolledPlayground: StoryObj<typeof UNSTABLE_UncontrolledCombobox> = {
  name: 'UNSTABLE_UncontrolledCombobox',
  render: (args) => (
    <UNSTABLE_UncontrolledCombobox
      {...args}
      id="story-combobox-uncontrolled"
      label="Languages"
      defaultSelectedKeys={['en']}
      optionKeys={COMBOBOX_LANGUAGE_OPTION_KEYS}
    >
      {COMBOBOX_LANGUAGE_OPTIONS.map((option) => (
        <Item key={option.id} id={option.id} role="row" tabIndex={-1} aria-selected={false}>
          <div role="gridcell">
            <Label>{option.label}</Label>
          </div>
        </Item>
      ))}
    </UNSTABLE_UncontrolledCombobox>
  ),
};
