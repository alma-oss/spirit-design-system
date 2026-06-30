import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import { ControlButton, Tag } from '@alma-oss/spirit-web-react';

export const MyComponent = (props) => (
  <>
    {/* Inside Tag — sizes that should be remapped */}
    <Tag elementType="div" color="selected">
      <span>Tag label</span>
      <ControlButton size="xsmall" isSymmetrical aria-label="Remove">X</ControlButton>
    </Tag>
    <Tag elementType="div" color="selected" size="small">
      <span>Tag label</span>
      <ControlButton size="small" isSymmetrical aria-label="Remove">X</ControlButton>
    </Tag>
    <Tag elementType="div" color="selected" size="medium">
      <span>Tag label</span>
      <ControlButton size="small" isSymmetrical aria-label="Remove">X</ControlButton>
    </Tag>
    <Tag elementType="div" color="selected" size="large">
      <span>Tag label</span>
      <ControlButton size="medium" isSymmetrical aria-label="Remove">X</ControlButton>
    </Tag>
    <Tag elementType="div" color="selected" size="xlarge">
      <span>Tag label</span>
      <ControlButton size="medium" isSymmetrical aria-label="Remove">X</ControlButton>
    </Tag>

    {/* Inside Tag — responsive object value */}
    <Tag elementType="div" color="selected">
      <span>Tag label</span>
      <ControlButton size={{ mobile: 'small', tablet: 'medium' }} isSymmetrical aria-label="Remove">X</ControlButton>
    </Tag>

    {/* Inside Tag — spread attribute, should be skipped */}
    <Tag elementType="div" color="selected">
      <span>Tag label</span>
      <ControlButton {...props} isSymmetrical aria-label="Remove">X</ControlButton>
    </Tag>

    {/* Outside Tag — should NOT be changed */}
    <ControlButton size="small" isSymmetrical aria-label="Remove">X</ControlButton>
    <ControlButton size="medium" isSymmetrical aria-label="Remove">X</ControlButton>
  </>
);
