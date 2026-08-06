// url=<FIGMA_FILE_ID>?node-id=43829%3A3168
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Header/Header.tsx
// component=Header

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const logoSlot = instance.getSlot('Logo Slot');

export default {
  id: 'Header',
  imports: ["import { Container, Flex, Header } from '@alma-oss/spirit-web-react';"],
  example: figma.code`<Header>
  <Container>
    <Flex alignmentX="center" alignmentY="center">
      ${logoSlot}
    </Flex>
  </Container>
</Header>`,
};
