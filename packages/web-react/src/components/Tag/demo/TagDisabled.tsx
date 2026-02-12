import React from 'react';
import { ControlButton } from '../../ControlButton';
import { Icon } from '../../Icon';
import { Tag } from '..';

// TODO: update according to Figma design
const TagDisabled = () => (
  <>
    <Tag size="small" isDisabled>
      Disabled small
    </Tag>
    <Tag elementType="div" isDisabled>
      <span>Disabled medium</span>
      <ControlButton isSymmetrical isSubtle isDisabled aria-label="Remove Disabled medium">
        <Icon name="close" />
      </ControlButton>
    </Tag>
  </>
);

export default TagDisabled;
