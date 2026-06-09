import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import { Item, Icon } from '@alma-oss/spirit-web-react';

const itemLabel = 'Item label';
const itemHelperText = 'Helper text';
const isSelected = true;
const isItemDisabled = true;
const props = { elementType: 'a', href: '#' };

export const MyComponent = () => (
  <>
    <Item label="Item label" />
    <Item label={itemLabel} helperText={itemHelperText} iconName="search" isSelected />
    <Item label="Disabled selected icon" iconName="lock" isSelected isDisabled />
    <Item label="Dynamic disabled selected icon" iconName="lock" isSelected isDisabled={isItemDisabled} />
    <Item label="Dynamic selected icon" iconName="search" isSelected={isSelected} />
    <Item label="Background" isSelected selectionDecorator="background" />
    <Item label="Icon" isSelected={isSelected} selectionDecorator="icon" />
    <Item label="Both" isSelected selectionDecorator="both" />
    <Item elementType="a" label="Already link" href="#" />
    <Item label="Spread element type" {...props} />
    <Item label="Existing slots" iconName="search" startSlot={<Icon name="profile" />} endSlot={<Icon name="more" />} isSelected />
  </>
);
