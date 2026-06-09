import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import { Item, Icon, Label, HelperText } from '@alma-oss/spirit-web-react';

const itemLabel = 'Item label';
const itemHelperText = 'Helper text';
const isSelected = true;
const isItemDisabled = true;
const props = { elementType: 'a', href: '#' };

export const MyComponent = () => (
  <>
    <Item elementType="button"><Label elementType="span">Item label</Label></Item>
    <Item
      startSlot={<Icon name="search" />}
      endSlot={<Icon name="check-plain" color="selected" />}
      elementType="button"
      isSelected><Label elementType="span">{itemLabel}</Label><HelperText elementType="span" helperText={itemHelperText} /></Item>
    <Item
      startSlot={<Icon name="lock" />}
      endSlot={<Icon name="check-plain" />}
      elementType="button"
      isSelected
      isDisabled><Label elementType="span">Disabled selected icon</Label></Item>
    <Item
      startSlot={<Icon name="lock" />}
      endSlot={<Icon
        name="check-plain"
        {...isSelected && !isItemDisabled ? {
          color: "selected"
        } : {}} />}
      elementType="button"
      isSelected
      isDisabled={isItemDisabled}><Label elementType="span">Dynamic disabled selected icon</Label></Item>
    <Item
      startSlot={<Icon name="search" />}
      endSlot={isSelected && <Icon
        name="check-plain"
        {...isSelected ? {
          color: "selected"
        } : {}} />}
      elementType="button"
      isSelected={isSelected}><Label elementType="span">Dynamic selected icon</Label></Item>
    <Item elementType="button" isSelected><Label elementType="span">Background</Label></Item>
    <Item
      endSlot={isSelected && <Icon
        name="check-plain"
        {...isSelected ? {
          color: "selected"
        } : {}} />}
      elementType="button"
      isSelected={isSelected}><Label elementType="span">Icon</Label></Item>
    <Item
      endSlot={<Icon name="check-plain" color="selected" />}
      elementType="button"
      isSelected><Label elementType="span">Both</Label></Item>
    <Item elementType="a" href="#"><Label elementType="span">Already link</Label></Item>
    <Item elementType="button" {...props}><Label elementType="span">Spread element type</Label></Item>
    <Item
      elementType="button"
      startSlot={<Icon name="profile" />}
      endSlot={<Icon name="more" />}
      isSelected><Label elementType="span">Existing slots</Label></Item>
  </>
);
