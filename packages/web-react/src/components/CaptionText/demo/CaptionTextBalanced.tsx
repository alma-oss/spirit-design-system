import React from 'react';
import { CaptionText } from '..';

const CaptionTextBalanced = () => (
  <div style={{ maxWidth: '34.375rem' }}>
    <CaptionText elementType="p">
      This caption text is not balanced. It may not have optimal line breaks and may appear uneven or awkward.
    </CaptionText>
    <CaptionText elementType="p" isTextBalanced>
      This caption text is balanced. It will minimize orphans and improve overall readability.
    </CaptionText>
  </div>
);

export default CaptionTextBalanced;
