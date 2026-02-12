import React from 'react';
import { DocsStack } from '../../../../docs';
import { ControlButton } from '../../ControlButton';
import { Icon } from '../../Icon';
import { Tag } from '..';

const TagDisabled = () => (
  <DocsStack
    stackAlignment="start"
    UNSAFE_className="spirit-feature-enable-v5-control-button-expanded-size-scale spirit-feature-enable-v5-tag-appearance"
  >
    <Tag size="small" isDisabled>
      Disabled
    </Tag>
    <Tag size="small" isSubtle isDisabled>
      Disabled subtle
    </Tag>
    <Tag elementType="div" isDisabled>
      <span>Disabled with ControlButton</span>
      <ControlButton size="small" isSymmetrical isDisabled aria-label="Remove Disabled">
        <Icon name="close" />
      </ControlButton>
    </Tag>
    <Tag elementType="div" isSubtle isDisabled>
      <span>Disabled subtle with ControlButton</span>
      <ControlButton size="small" isSymmetrical isDisabled aria-label="Remove Disabled subtle">
        <Icon name="close" />
      </ControlButton>
    </Tag>
  </DocsStack>
);

export default TagDisabled;
