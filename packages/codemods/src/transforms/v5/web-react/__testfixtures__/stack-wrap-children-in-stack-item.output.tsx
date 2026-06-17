import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import { Stack, StackItem } from '@alma-oss/spirit-web-react';

export const MyComponent = () => (
  <>
    {/* Stack without dividers — should NOT be transformed */}
    <Stack hasSpacing>
      <div>Item 1</div>
      <div>Item 2</div>
    </Stack>

    {/* Stack with intermediate dividers — children should be wrapped in StackItem */}
    <Stack hasIntermediateDividers>
      <StackItem><div>Item 1</div></StackItem>
      <StackItem><div>Item 2</div></StackItem>
    </Stack>

    {/* Stack with start and end dividers — fragment children should become StackItem */}
    <Stack elementType="ul" hasStartDivider hasEndDivider>
      <StackItem>Item 1</StackItem>
      <StackItem>Item 2</StackItem>
    </Stack>

    {/* Stack with conditional child and JSX comment — expression containers should NOT be wrapped */}
    <Stack hasIntermediateDividers>
      {/* a comment */}
      {true && <div>Conditional item</div>}
      <StackItem><div>Regular item</div></StackItem>
    </Stack>
  </>
);
