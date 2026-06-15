import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import { Container, Flex, UNSTABLE_Header, UNSTABLE_HeaderLogo } from '@alma-oss/spirit-web-react';

export const MyHeader = () => (
  <UNSTABLE_Header hasBottomDivider>
    <Container isFluid>
      <Flex alignmentX="left" alignmentY="stretch" spacing="space-1000">
        <UNSTABLE_HeaderLogo href="/" aria-label="Homepage">
          Logo
        </UNSTABLE_HeaderLogo>
      </Flex>
    </Container>
  </UNSTABLE_Header>
);
