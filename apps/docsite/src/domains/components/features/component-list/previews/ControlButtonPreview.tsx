import { ControlButton, Icon } from '@alma-oss/spirit-web-react';
import React from 'react';

const ControlButtonPreview = () => (
  <ControlButton aria-label="Close" isSymmetrical size="medium">
    <Icon boxSize={16} name="close" />
  </ControlButton>
);

export default ControlButtonPreview;
