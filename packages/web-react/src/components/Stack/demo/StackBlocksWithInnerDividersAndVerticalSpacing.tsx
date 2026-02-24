import React from 'react';
import DocsBox from '../../../../docs/DocsBox';
import Stack from '../Stack';
import StackItem from '../StackItem';

const StackBlocksWithInnerDividersAndVerticalSpacing = () => (
  <Stack elementType="ul" hasSpacing hasIntermediateDividers>
    {[1, 2, 3].map((i) => (
      <StackItem key={`stack-dividers-spacing-${i}`}>
        <DocsBox>Block {i}</DocsBox>
      </StackItem>
    ))}
  </Stack>
);

export default StackBlocksWithInnerDividersAndVerticalSpacing;
