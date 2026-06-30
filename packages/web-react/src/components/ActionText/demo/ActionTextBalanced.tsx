import React from 'react';
import { ActionText } from '..';

const ActionTextBalanced = () => (
  <div style={{ maxWidth: '34.375rem' }}>
    <ActionText>
      This action text is not balanced. It may not have optimal line breaks and may appear uneven or awkward.
    </ActionText>
    <ActionText isTextBalanced>
      This action text is balanced. It will minimize orphans and improve overall readability.
    </ActionText>
  </div>
);

export default ActionTextBalanced;
