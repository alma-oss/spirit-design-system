// url=<FIGMA_FILE_ID>?node-id=27632%3A5746
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Skeleton/SkeletonShape.tsx
// component=SkeletonShape

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const type = instance.getPropertyValue('Type');

let example;
if (type === 'Circle') {
  example = figma.code`<SkeletonShape width={58} height={58} borderRadius="full" />`;
} else if (type === 'Square') {
  example = figma.code`<SkeletonShape width={58} height={58} />`;
} else {
  // Rectangle
  example = figma.code`<SkeletonText />`;
}

export default {
  id: 'Skeleton',
  imports: ["import { SkeletonShape, SkeletonText } from '@alma-oss/spirit-web-react';"],
  example,
};
