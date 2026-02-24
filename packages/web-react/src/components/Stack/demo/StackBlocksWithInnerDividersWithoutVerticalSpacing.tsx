import React from 'react';
import DocsBox from '../../../../docs/DocsBox';
import Stack from '../Stack';
import StackItem from '../StackItem';

const StackBlocksWithInnerDividersWithoutVerticalSpacing = () => (
  <Stack elementType="ul" hasIntermediateDividers>
    {[1, 2, 3].map((i) => (
      <StackItem key={`stack-dividers-without-spacing-${i}`}>
        <DocsBox>Block {i}</DocsBox>
      </StackItem>
    ))}
  </Stack>
);

export default StackBlocksWithInnerDividersWithoutVerticalSpacing;
