// url=<FIGMA_FILE_ID>?node-id=18805%3A227
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Avatar/Avatar.tsx
// component=Avatar

import figma from 'figma';
import { getInstance, getText } from '../../../figma/helpers';

const instance = getInstance();

const style = instance.getPropertyValue('Style');
const isSquare = instance.getEnum('Type', { Square: true, Circle: false });
const size = instance.getEnum('Size', {
  XSmall: 'xsmall',
  Small: 'small',
  Medium: undefined,
  Large: 'large',
  XLarge: 'xlarge',
});

const initialsText = getText(instance, 'Text');

let example;
if (style === 'Initials') {
  example = figma.code`
    <Avatar${isSquare ? figma.code` isSquare` : ''}${size ? figma.code` size="${size}"` : ''} aria-label="John Doe">
      <span aria-hidden="true">${initialsText}</span>
    </Avatar>`;
} else if (style === 'Photo') {
  example = figma.code`
    <Avatar${isSquare ? figma.code` isSquare` : ''}${size ? figma.code` size="${size}"` : ''} aria-label="John Doe">
      <img src="https://picsum.photos/seed/avatar/150/150" alt="" aria-hidden="true" />
    </Avatar>`;
} else {
  example = figma.code`
    <Avatar${isSquare ? figma.code` isSquare` : ''}${size ? figma.code` size="${size}"` : ''} aria-label="John Doe" />`;
}

export default {
  id: 'Avatar',
  imports: ["import { Avatar } from '@alma-oss/spirit-web-react';"],
  example,
};
