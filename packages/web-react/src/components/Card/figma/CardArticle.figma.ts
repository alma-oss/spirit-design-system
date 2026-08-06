// url=<FIGMA_FILE_ID>?node-id=39728%3A2472
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Card/Card.tsx
// component=Card

import figma from 'figma';
import { getInstance, getText } from '../../../figma/helpers';

const instance = getInstance();

const variant = instance.getPropertyValue('Variant');
const size = instance.getEnum('Size', {
  Small: 'small',
  Medium: undefined,
  Large: 'large',
});
const showEyebrow = instance.getBoolean('Eyebrow');
const showParagraph = instance.getBoolean('Paragraph text');

const titleText = getText(instance, 'Article Title');
const eyebrowText = getText(instance, 'Eyebrow');
const paragraphText = getText(instance, 'Paragraph  text');
const linkText = getText(instance, 'Link');

const media = figma.code`<CardMedia${size ? figma.code` size="${size}"` : ''} isExpanded>
  <img src="https://picsum.photos/seed/article/180/180" alt="" />
</CardMedia>`;

let example;
if (variant === '02') {
  example = figma.code`
    <Card direction="horizontal" alignmentY="center">
      ${media}
      <CardBody>
        <Stack spacing="space-400">
          ${showEyebrow ? figma.code`<CardEyebrow>${eyebrowText}</CardEyebrow>` : ''}
          <CardTitle>
            <CardLink href="#">${titleText}</CardLink>
          </CardTitle>
          ${showParagraph ? figma.code`<Truncate limit={2}>${paragraphText}</Truncate>` : ''}
        </Stack>
      </CardBody>
    </Card>`;
} else if (variant === '03') {
  example = figma.code`
    <Card direction="horizontal" alignmentY="center">
      ${media}
      <CardBody>
        <Stack spacing="space-400">
          ${showEyebrow ? figma.code`<CardEyebrow>${eyebrowText}</CardEyebrow>` : ''}
          <CardTitle>${titleText}</CardTitle>
          <Link href="#">${linkText}</Link>
        </Stack>
      </CardBody>
    </Card>`;
} else {
  // Variant 01 (default)
  example = figma.code`
    <Card direction="horizontal" alignmentY="center">
      ${media}
      <CardBody>
        <Stack spacing="space-400">
          <CardTitle>${titleText}</CardTitle>
          ${showParagraph ? figma.code`<Truncate limit={2}>${paragraphText}</Truncate>` : ''}
          <Link href="#">${linkText}</Link>
        </Stack>
      </CardBody>
    </Card>`;
}

const imports01and03 = [
  "import { Card, CardBody, CardMedia, CardTitle, Link, Stack, Truncate } from '@alma-oss/spirit-web-react';",
];
const imports02 = [
  "import { Card, CardBody, CardEyebrow, CardLink, CardMedia, CardTitle, Stack, Truncate } from '@alma-oss/spirit-web-react';",
];

export default {
  id: 'CardArticle',
  imports: variant === '02' ? imports02 : imports01and03,
  example,
};
