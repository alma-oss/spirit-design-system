import { ControlButton, Icon, InputAddon, InputContainer } from '@alma-oss/spirit-web-react';
import React from 'react';

const InputAddonPreview = () => (
  <div style={{ width: 260 }}>
    <InputContainer>
      <input type="password" id="card-input-addon" name="cardInputAddon" placeholder="Password" aria-label="Password" />
      <InputAddon>
        <ControlButton type="button" aria-label="Show password" isSymmetrical isSubtle>
          <Icon name="visibility-on" boxSize={20} />
        </ControlButton>
      </InputAddon>
    </InputContainer>
  </div>
);

export default InputAddonPreview;
