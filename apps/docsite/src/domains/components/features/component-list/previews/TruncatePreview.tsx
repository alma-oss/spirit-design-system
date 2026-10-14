'use client';

import { Truncate } from '@alma-oss/spirit-web-react';
import React from 'react';

const TruncatePreview = () => (
  <Truncate elementType="p" mode="lines" limit={2} UNSAFE_style={{ width: 240, margin: 0 }}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua.
  </Truncate>
);

export default TruncatePreview;
