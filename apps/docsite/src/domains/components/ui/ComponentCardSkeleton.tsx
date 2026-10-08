import { SkeletonShape } from '@alma-oss/spirit-web-react';
import React from 'react';

const ComponentCardSkeleton = () => (
  <li>
    <SkeletonShape width={0} height={262} borderRadius="0" UNSAFE_style={{ width: '100%' }} />
  </li>
);

export default ComponentCardSkeleton;
