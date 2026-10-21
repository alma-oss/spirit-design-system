import { Stack } from '@alma-oss/spirit-web-react';
import React from 'react';

const StackPreview = () => (
  <Stack hasSpacing UNSAFE_style={{ width: 200 }}>
    <div>Block 1</div>
    <div>Block 2</div>
    <div>Block 3</div>
  </Stack>
);

export default StackPreview;
