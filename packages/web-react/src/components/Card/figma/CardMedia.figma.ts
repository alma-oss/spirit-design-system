// url=<FIGMA_FILE_ID>?node-id=37201%3A1917
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Card/CardMedia.tsx
// component=CardMedia

import figma from 'figma';
import { getInstance, getText } from '../../../figma/helpers';

const instance = getInstance();

const showAction = instance.getBoolean('Action');
const showEyebrow = instance.getBoolean('Eyebrow');
const showParagraph = instance.getBoolean('Paragraph text');
const direction = instance.getEnum('Photo placement', {
  Left: 'horizontal',
  Top: undefined,
  Right: 'horizontal-reversed',
});
const isBoxed = instance.getEnum('Boxed', { False: false, True: true });
const isExpanded = instance.getEnum('Photo boxed', { True: true, False: false });

const headlineText = getText(instance, 'Headline');
const eyebrowText = getText(instance, 'Eybrow title');
const paragraphText = getText(instance, 'Paragraph  text');

let footerCode;
if (showAction) {
  const footer = instance.findConnectedInstance('CardFooter');
  if (footer && footer.type === 'INSTANCE') {
    footerCode = footer.executeTemplate().example;
  }
}

export default {
  id: 'CardMedia',
  imports: [
    "import { Card, CardBody, CardEyebrow, CardFooter, CardMedia, CardTitle } from '@alma-oss/spirit-web-react';",
  ],
  example: figma.code`
    <Card${direction ? figma.code` direction="${direction}"` : ''}${isBoxed ? figma.code` isBoxed` : ''}>
      <CardMedia${isExpanded ? figma.code` isExpanded` : ''}>
        <img src="https://picsum.photos/seed/card-media/800/450" alt="" />
      </CardMedia>
      <CardBody>
        ${showEyebrow ? figma.code`<CardEyebrow>${eyebrowText}</CardEyebrow>` : ''}
        <CardTitle isHeading>${headlineText}</CardTitle>
        ${showParagraph ? figma.code`<p>${paragraphText}</p>` : ''}
      </CardBody>
      ${footerCode}
    </Card>`,
};
