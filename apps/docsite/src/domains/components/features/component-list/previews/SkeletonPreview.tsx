'use client';

import { SkeletonText } from '@alma-oss/spirit-web-react';
import React from 'react';

const SkeletonPreview = () => (
  <div style={{ width: 240 }}>
    <SkeletonText lines={2} size="medium" />
  </div>
);

export default SkeletonPreview;
