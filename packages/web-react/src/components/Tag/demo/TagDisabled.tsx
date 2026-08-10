import React from 'react';
import { DocsStack } from '../../../../docs';
import { CloseButton } from '../../CloseButton';
import { Tag } from '..';

const TagDisabled = () => (
  <DocsStack stackAlignment="start">
    <Tag size="small" isDisabled>
      Disabled
    </Tag>
    <Tag size="small" isSubtle isDisabled>
      Disabled subtle
    </Tag>
    <Tag elementType="button" size="small" isDisabled>
      Disabled button
    </Tag>
    <Tag elementType="a" size="small" isDisabled role="link" aria-disabled="true">
      Disabled link
    </Tag>
    <Tag elementType="div" isDisabled>
      <span>Disabled with CloseButton</span>
      <CloseButton size="xsmall" isDisabled label="Remove Disabled" />
    </Tag>
    <Tag elementType="div" isSubtle isDisabled>
      <span>Disabled subtle with CloseButton</span>
      <CloseButton size="xsmall" isDisabled label="Remove Disabled subtle" />
    </Tag>
  </DocsStack>
);

export default TagDisabled;
