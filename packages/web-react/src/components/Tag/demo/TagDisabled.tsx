import React from 'react';
import { ControlButton } from '../../ControlButton';
import { Icon } from '../../Icon';
import { Tag } from '..';

const TagDisabled = () => (
  <>
    <Tag color="neutral" size="small" isDisabled>
      Disabled small
    </Tag>
    <Tag color="neutral" size="medium" elementType="div" isDisabled>
      <span>Disabled medium</span>
      <ControlButton size="medium" isSymmetrical isSubtle isDisabled aria-label="Remove Disabled medium">
        <Icon name="close" boxSize={16} />
      </ControlButton>
    </Tag>
  </>
);

export default TagDisabled;
