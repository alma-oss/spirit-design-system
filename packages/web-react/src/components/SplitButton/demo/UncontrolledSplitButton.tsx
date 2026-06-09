import React from 'react';
import { Item } from '../../Item';
import { Label } from '../../Label';
import UncontrolledSplitButton from '../UncontrolledSplitButton';

const UncontrolledSplitButtonDemo = () => (
  <UncontrolledSplitButton
    buttonIconName="check-plain"
    buttonLabel="Button"
    buttonOnClick={() => alert('Button clicked')}
    color="primary"
    dropdownPlacement="top-end"
    dropdownTriggerIconName="more"
    dropdownTriggerLabel="More"
    id="uncontrolled-split-button"
    isButtonLabelHidden
    isDisabled={false}
    isDropdownTriggerLabelHidden
    size="large"
  >
    <Item>
      <Label>Item 1</Label>
    </Item>
    <Item>
      <Label>Item 2</Label>
    </Item>
  </UncontrolledSplitButton>
);

export default UncontrolledSplitButtonDemo;
