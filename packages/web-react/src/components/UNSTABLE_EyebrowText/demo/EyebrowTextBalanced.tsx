import React from 'react';
import { UNSTABLE_EyebrowText } from '..';

const EyebrowTextBalanced = () => (
  <div style={{ maxWidth: '650px' }}>
    <UNSTABLE_EyebrowText>
      This EyebrowText is not balanced. It may not have optimal line breaks and may appear uneven or awkward.
    </UNSTABLE_EyebrowText>
    <UNSTABLE_EyebrowText isTextBalanced>
      This EyebrowText is balanced. It will have optimal line breaks and look more even and visually appealing.
    </UNSTABLE_EyebrowText>
  </div>
);

export default EyebrowTextBalanced;
