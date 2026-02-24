import React from 'react';
import DocsBox from '../../../../docs/DocsBox';
import Stack from '../Stack';
import StackItem from '../StackItem';

const StackBlocksWithCustomSpacingAndDividers = () => (
  <Stack elementType="ul" hasStartDivider hasEndDivider hasIntermediateDividers spacing="space-800">
    {[1, 2, 3].map((i) => (
      <StackItem key={`stack-custom-spacing-dividers-${i}`}>
        <DocsBox>Block {i}</DocsBox>
      </StackItem>
    ))}
  </Stack>
);

export default StackBlocksWithCustomSpacingAndDividers;
