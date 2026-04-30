import React from 'react';
import { Icon } from '../../Icon';
import { InputContainer } from '../../InputContainer';
import { Label } from '../../Label';
import InputAddon from '../InputAddon';

const InputAddonIcon = () => (
  <div>
    <Label htmlFor="input-addon-search-icon">Search</Label>
    <InputContainer size="medium">
      <input type="search" id="input-addon-search-icon" name="inputAddonSearchIcon" placeholder="Search" />
      <InputAddon elementType="label" htmlFor="input-addon-search-icon">
        <Icon boxSize={20} name="search" />
      </InputAddon>
    </InputContainer>
  </div>
);

export default InputAddonIcon;
