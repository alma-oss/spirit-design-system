import React from 'react';
import { UNSTABLE_DisplayHeading } from '..';

const DisplayHeadingBalanced = () => (
  <div style={{ maxWidth: '650px' }}>
    <UNSTABLE_DisplayHeading elementType="h2" size="small">
      This display heading is not balanced. It may not have optimal line breaks and may appear uneven or awkward.
    </UNSTABLE_DisplayHeading>
    <UNSTABLE_DisplayHeading elementType="h2" isTextBalanced size="small">
      This display heading is balanced. It will have optimal line breaks and look more even and visually appealing.
    </UNSTABLE_DisplayHeading>
  </div>
);

export default DisplayHeadingBalanced;
