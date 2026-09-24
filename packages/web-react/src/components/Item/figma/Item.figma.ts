// url=<FIGMA_FILE_ID>?node-id=48576%3A4018
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Item/Item.tsx
// component=Item

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const variant = instance.getPropertyValue('Variant');
const labelText = instance.getString('Label Text');
const isSelected = instance.getEnum('Selected', { False: false, True: true });
const isDisabled = instance.getEnum('Disabled', { False: false, True: true });
const showIconLeft = instance.getBoolean('Icon Left');
const showIconRight = instance.getBoolean('Icon Right');
const showDivider = instance.getBoolean('Show Divider');
const showNote = instance.getBoolean('Note');

const getIconName = (propName: string) => {
  const icon = instance.getInstanceSwap(propName);

  return icon && icon.type === 'INSTANCE' ? icon.executeTemplate().metadata?.props?.iconName : undefined;
};

const getHelperMessage = () => {
  if (!showNote) {
    return undefined;
  }
  const helperText = instance.findText('Helper text', { traverseInstances: true });

  return helperText.type !== 'ERROR' ? helperText.textContent : undefined;
};

const helperMessage = getHelperMessage();

let example;
if (variant === 'Checkbox' || variant === 'Radio') {
  const Component = variant === 'Checkbox' ? 'Checkbox' : 'Radio';
  example = figma.code`
    <${Component}
      id="item-${Component.toLowerCase()}"
      name="item${Component}"
      label="${labelText}"
      isItem
      ${isSelected ? 'isChecked' : ''}
      ${isDisabled ? 'isDisabled' : ''}
      ${helperMessage ? figma.code`helperText="${helperMessage}"` : ''}
    />`;
} else {
  const iconLeftName = showIconLeft ? getIconName('Set Icon Left') : undefined;
  const iconRightName = !isSelected && showIconRight ? getIconName('Set Icon Right') : undefined;

  let endSlot;
  if (variant === 'Removable') {
    endSlot = figma.code`<CloseButton size="small" label="Remove item" />`;
  } else if (isSelected) {
    endSlot = figma.code`<Icon name="check-plain" color="selected" />`;
  } else if (iconRightName) {
    endSlot = figma.code`<Icon name="${iconRightName}" />`;
  }

  example = figma.code`
    <Item
      ${variant === 'Removable' ? '' : 'elementType="button"'}
      ${isDisabled ? 'isDisabled' : ''}
      ${isSelected ? 'isSelected' : ''}
      ${iconLeftName ? figma.code`startSlot={<Icon name="${iconLeftName}" />}` : ''}
      ${endSlot ? figma.code`endSlot={${endSlot}}` : ''}
    >
      <Label>${labelText}</Label>
      ${helperMessage ? figma.code`<HelperText helperText="${helperMessage}" />` : ''}
      ${variant === 'Section Title' && showDivider ? figma.code`<Divider />` : ''}
    </Item>`;
}

export default {
  id: 'Item',
  imports: [
    "import { CloseButton, Checkbox, Divider, HelperText, Icon, Item, Label, Radio } from '@alma-oss/spirit-web-react';",
  ],
  example,
};
