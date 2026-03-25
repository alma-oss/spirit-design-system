import { SkeletonShape } from '@alma-oss/spirit-web-react';
import React from 'react';

const ComponentCardSkeleton = () => (
  <li className="d-grid">
    <SkeletonShape width={0} height={66} borderRadius="200" UNSAFE_style={{ width: '100%' }} />
  </li>
);

export default ComponentCardSkeleton;
