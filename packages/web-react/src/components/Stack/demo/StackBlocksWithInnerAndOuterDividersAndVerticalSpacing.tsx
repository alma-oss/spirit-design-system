import React from 'react';
import DocsBox from '../../../../docs/DocsBox';
import Stack from '../Stack';
import StackItem from '../StackItem';

const StackBlocksWithInnerAndOuterDividersAndVerticalSpacing = () => (
  <Stack elementType="ul" hasSpacing hasIntermediateDividers hasStartDivider hasEndDivider>
    {[1, 2, 3].map((i) => (
      <StackItem key={`stack-dividers-${i}`}>
        <DocsBox>Block {i}</DocsBox>
      </StackItem>
    ))}
  </Stack>
);

export default StackBlocksWithInnerAndOuterDividersAndVerticalSpacing;
