import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import { Stack } from '@alma-oss/spirit-web-react';

export const MyComponent = () => (
  <>
    {/* Stack without dividers — should NOT be transformed */}
    <Stack hasSpacing>
      <div>Item 1</div>
      <div>Item 2</div>
    </Stack>

    {/* Stack with intermediate dividers — children should be wrapped in StackItem */}
    <Stack hasIntermediateDividers>
      <div>Item 1</div>
      <div>Item 2</div>
    </Stack>

    {/* Stack with start and end dividers — fragment children should become StackItem */}
    <Stack elementType="ul" hasStartDivider hasEndDivider>
      <>Item 1</>
      <>Item 2</>
    </Stack>

    {/* Stack with conditional child and JSX comment — expression containers should NOT be wrapped */}
    <Stack hasIntermediateDividers>
      {/* a comment */}
      {true && <div>Conditional item</div>}
      <div>Regular item</div>
    </Stack>
  </>
);
