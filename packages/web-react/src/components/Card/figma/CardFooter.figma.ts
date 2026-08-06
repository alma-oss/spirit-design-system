// url=<FIGMA_FILE_ID>?node-id=37173%3A2291
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Card/CardFooter.tsx
// component=CardFooter

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const type = instance.getPropertyValue('Type');

let template;
if (type === 'Buttons') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [btn0, btn1] = instance.findConnectedInstances((n: any) => n.codeConnectId() === 'Button');
  const button0 = btn0?.executeTemplate().example;
  const button1 = btn1?.executeTemplate().example;
  template = {
    example: figma.code`
      <CardFooter>
        ${button0}
        ${button1}
      </CardFooter>`,
    imports: ["import { CardFooter } from '@alma-oss/spirit-web-react';"],
  };
} else {
  // Links
  template = {
    example: figma.code`
      <CardFooter>
        <Link href="#">Link primary</Link>
        <Link href="#" color="secondary">Link secondary</Link>
      </CardFooter>`,
    imports: ["import { CardFooter, Link } from '@alma-oss/spirit-web-react';"],
  };
}

export default {
  id: 'CardFooter',
  ...template,
};
