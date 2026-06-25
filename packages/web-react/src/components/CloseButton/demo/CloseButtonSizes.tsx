import React from 'react';
import { DocsStack } from '../../../../docs';
import { SizesExtended } from '../../../constants';
import { CloseButton } from '..';

const CloseButtonSizes = () => (
  <DocsStack stackAlignment="start">
    {Object.values(SizesExtended).map((size) => (
      <CloseButton key={size} size={size} />
    ))}
  </DocsStack>
);

export default CloseButtonSizes;
