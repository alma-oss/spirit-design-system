// url=<FIGMA_FILE_ID>?node-id=37173%3A1977
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Card/Card.tsx
// component=Card

import figma from 'figma';
import { getInstance, getText } from '../../../figma/helpers';

const instance = getInstance();

const showArtwork = instance.getBoolean('Artwork');
const showAction = instance.getBoolean('Action');
const showEyebrow = instance.getBoolean('Eyebrow');
const showParagraph = instance.getBoolean('Paragraph text');
const direction = instance.getEnum('Artwork placement', {
  Left: 'horizontal',
  Top: undefined,
  Right: 'horizontal-reversed',
});
const isBoxed = instance.getEnum('Boxed', { False: false, True: true });

const headlineText = getText(instance, 'Headline');
const eyebrowText = getText(instance, 'Eybrow title');
const paragraphText = getText(instance, 'Paragraph  text');

let artworkCode;
if (showArtwork) {
  const artwork = instance.findConnectedInstance('CardArtwork');
  if (artwork && artwork.type === 'INSTANCE') {
    artworkCode = artwork.executeTemplate().example;
  }
}

let footerCode;
if (showAction) {
  const footer = instance.findConnectedInstance('CardFooter');
  if (footer && footer.type === 'INSTANCE') {
    footerCode = footer.executeTemplate().example;
  }
}

export default {
  id: 'Card',
  imports: ["import { Card, CardBody, CardEyebrow, CardFooter, CardTitle } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <Card${direction ? figma.code` direction="${direction}"` : ''}${isBoxed ? figma.code` isBoxed` : ''}>
      ${artworkCode}
      <CardBody>
        ${showEyebrow ? figma.code`<CardEyebrow>${eyebrowText}</CardEyebrow>` : ''}
        <CardTitle isHeading>${headlineText}</CardTitle>
        ${showParagraph ? figma.code`<p>${paragraphText}</p>` : ''}
      </CardBody>
      ${footerCode}
    </Card>`,
};
