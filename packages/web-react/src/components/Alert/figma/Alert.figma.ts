// url=<FIGMA_FILE_ID>?node-id=49085%3A3680
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Alert/Alert.tsx
// component=Alert

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const color = instance.getEnum('Color', {
  Informative: 'informative',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
});

const isCentered = instance.getEnum('Content align', {
  'Full width': false,
  Center: true,
});

const showLabel = instance.getBoolean('Label');
const labelText = instance.getString('Label Text');
const showDescription = instance.getBoolean('Description');
const descriptionText = instance.getString('Text Description');
const showLink = instance.getBoolean('Link');
const linkText = instance.getString('Link Text');

export default {
  id: 'Alert',
  imports: ["import { Alert, Heading, Link, Text } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <Alert
      color="${color}"${isCentered ? figma.code`isCentered` : ''}
    >
      ${showLabel ? figma.code`<Heading elementType="h3" emphasis="semibold">${labelText}</Heading>` : ''}
      ${showDescription ? figma.code`<Text>${descriptionText}</Text>` : ''}
      ${showLink ? figma.code`<Link href="#" underlined="always">${linkText}</Link>` : ''}
    </Alert>`,
};
