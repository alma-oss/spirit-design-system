import figma from '@figma/code-connect';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { type ComponentProps } from 'react';
import { Checkbox } from '../../Checkbox';
import { HelperText } from '../../HelperText';
import { Icon } from '../../Icon';
import { Label } from '../../Label';
import { Radio } from '../../Radio';
import Item from '../Item';

const meta: Meta<typeof Item> = {
  title: 'Components/Item/Figma',
  component: Item,
  tags: ['!autodocs', 'figma'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/w9Ca4hvkuYLshsrHu1bYwT/SPIRIT-DESIGN-SYSTEM--UI-Kit-?node-id=18686%3A1089',
      props: {
        helperTextProps: figma.boolean('Helper', {
          true: figma.nestedProps('Helper text', {
            helperText: figma.string('Message'),
          }),
          false: { helperText: undefined },
        }),
        isDisabled: figma.boolean('Disabled'),
        isSelected: figma.boolean('Selected'),
        iconProps: figma.instance('Icon').getProps<{ name: string }>(),
      },
      examples: [
        { example: 'FigmaSingleSelect', variant: { Type: 'Single select' } },
        { example: 'FigmaMultiSelect', variant: { Type: 'Multi select' } },
        { example: 'FigmaRadio', variant: { Type: 'Radio' } },
        { example: 'FigmaIconUnselected', variant: { Type: 'Single select+Icon', Selected: false } },
        { example: 'FigmaIconSelected', variant: { Type: 'Single select+Icon', Selected: true } },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Item>;

type ItemFigmaProps = ComponentProps<typeof Item> & {
  helperTextProps?: { helperText?: string };
  iconProps?: { name: string };
};

export const FigmaSingleSelect: Story = {
  name: 'Single select',
  render: ({ helperTextProps = {}, isDisabled, isSelected }: ItemFigmaProps) => (
    <Item isDisabled={isDisabled} isSelected={isSelected}>
      <Label>Item label</Label>
      <HelperText helperText={helperTextProps.helperText} />
    </Item>
  ),
};

export const FigmaMultiSelect: Story = {
  name: 'Multi select',
  render: ({ helperTextProps = {}, isDisabled, isSelected }: ItemFigmaProps) => (
    <Checkbox
      helperText={helperTextProps.helperText}
      id="checkbox-item-default"
      isChecked={isSelected}
      isDisabled={isDisabled}
      isItem
      label="Item label"
      name="checkboxItemDefault"
    />
  ),
};

export const FigmaRadio: Story = {
  name: 'Radio',
  render: ({ helperTextProps = {}, isDisabled, isSelected }: ItemFigmaProps) => (
    <Radio
      helperText={helperTextProps.helperText}
      id="radio-item-default"
      isChecked={isSelected}
      isDisabled={isDisabled}
      isItem
      label="Item label"
      name="item"
    />
  ),
};

export const FigmaIconUnselected: Story = {
  name: 'Single select + Icon (unselected)',
  render: ({ helperTextProps = {}, iconProps = { name: 'placeholder' }, isDisabled }: ItemFigmaProps) => (
    <Item isDisabled={isDisabled} startSlot={<Icon name={iconProps.name} />}>
      <Label>Item label</Label>
      <HelperText helperText={helperTextProps.helperText} />
    </Item>
  ),
};

export const FigmaIconSelected: Story = {
  name: 'Single select + Icon (selected)',
  render: ({ helperTextProps = {}, iconProps = { name: 'placeholder' }, isDisabled }: ItemFigmaProps) => (
    <Item isDisabled={isDisabled} isSelected startSlot={<Icon name={iconProps.name} color="selected" />}>
      <Label>Item label</Label>
      <HelperText helperText={helperTextProps.helperText} />
    </Item>
  ),
};
