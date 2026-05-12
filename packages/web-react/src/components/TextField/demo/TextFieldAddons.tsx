import React from 'react';
import { ControlButton } from '../../ControlButton';
import { Icon } from '../../Icon';
import { InputAddon } from '../../InputAddon';
import { VisuallyHidden } from '../../VisuallyHidden';
import TextField from '../TextField';

const TextFieldAddons = () => (
  <>
    <TextField
      id="text-field-addon-search"
      label="Search"
      name="textFieldAddonSearch"
      placeholder="Search"
      startAddon={
        <InputAddon elementType="label" htmlFor="text-field-addon-search">
          <Icon name="search" />
          <VisuallyHidden>Use search to find jobs for you</VisuallyHidden>
        </InputAddon>
      }
    />

    <TextField
      id="text-field-addon-clear"
      label="Search"
      name="textFieldAddonClear"
      placeholder="Search"
      defaultValue="Filled"
      endAddon={
        <InputAddon>
          <ControlButton isSymmetrical isSubtle>
            <Icon name="close" />
            <VisuallyHidden>Clear</VisuallyHidden>
          </ControlButton>
        </InputAddon>
      }
    />

    <TextField
      id="text-field-addon-multiple"
      label="Username"
      name="textFieldAddonMultiple"
      placeholder="spirit-design-system"
      size="large"
      startAddon={
        <>
          <InputAddon elementType="label" htmlFor="text-field-addon-multiple">
            <Icon name="link" />
            <VisuallyHidden>Profile URL</VisuallyHidden>
          </InputAddon>
          <InputAddon elementType="label" htmlFor="text-field-addon-multiple">
            <span aria-hidden="true">@</span>
            <VisuallyHidden>Insert your username without the @ symbol</VisuallyHidden>
          </InputAddon>
        </>
      }
      endAddon={
        <InputAddon>
          <ControlButton isSymmetrical isSubtle>
            <Icon name="close" />
            <VisuallyHidden>Clear</VisuallyHidden>
          </ControlButton>
        </InputAddon>
      }
    />
  </>
);

export default TextFieldAddons;
