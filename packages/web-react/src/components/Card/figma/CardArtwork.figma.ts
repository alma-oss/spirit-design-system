// url=<FIGMA_FILE_ID>?node-id=37173%3A2084
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Card/CardArtwork.tsx
// component=CardArtwork

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const type = instance.getPropertyValue('Type');

let example;
if (type === 'Iconbox') {
  const iconBox = instance.findInstance('Icon Box');
  let iconBoxCode;
  if (iconBox && iconBox.type === 'INSTANCE') {
    iconBoxCode = iconBox.executeTemplate().example;
  }
  example = figma.code`
    <CardArtwork>
      ${iconBoxCode}
    </CardArtwork>`;
} else {
  // Illustration
  example = figma.code`
    <CardArtwork>
      <img src="https://picsum.photos/seed/card/200/200" alt="" />
    </CardArtwork>`;
}

export default {
  id: 'CardArtwork',
  imports: ["import { CardArtwork } from '@alma-oss/spirit-web-react';"],
  example,
};
