import React from 'react';
import { ControlButton } from '../../ControlButton';
import { Icon } from '../../Icon';
import { InputContainer } from '../../InputContainer';
import { Label } from '../../Label';
import { VisuallyHidden } from '../../VisuallyHidden';
import InputAddon from '../InputAddon';

const INPUT_ID = 'input-addon-multiple';

const InputAddonMultiple = () => (
  <div>
    <Label htmlFor={INPUT_ID}>Username</Label>
    <InputContainer size="medium">
      <InputAddon elementType="label" htmlFor={INPUT_ID}>
        <Icon name="link" />
      </InputAddon>
      <InputAddon elementType="label" htmlFor={INPUT_ID}>
        <span aria-hidden="true">@</span>
        <VisuallyHidden>Insert your username without the @ symbol</VisuallyHidden>
      </InputAddon>
      <input id={INPUT_ID} type="text" name="inputAddonMultiple" placeholder="spirit-design-system" />
      <InputAddon>
        <ControlButton type="button" aria-label="Clear" size="medium" isSymmetrical isSubtle>
          <Icon name="close" />
        </ControlButton>
      </InputAddon>
    </InputContainer>
  </div>
);

export default InputAddonMultiple;
