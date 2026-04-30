import React, { type ComponentProps } from 'react';
import { Sizes } from '../../../constants';
import { ControlButton } from '../../ControlButton';
import { Icon } from '../../Icon';

export interface PasswordToggleAddonButtonProps {
  size?: NonNullable<ComponentProps<typeof ControlButton>['size']>;
}

const PasswordToggleAddonButton = ({ size = Sizes.MEDIUM }: PasswordToggleAddonButtonProps) => (
  <ControlButton
    type="button"
    aria-checked={false}
    aria-label="Show password"
    data-spirit-toggle="password"
    role="switch"
    size={size}
    isSymmetrical
    isSubtle
  >
    <Icon name="visibility-on" />
  </ControlButton>
);

export default PasswordToggleAddonButton;
