import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import { Container, Flex, Header, HeaderLogo } from '@alma-oss/spirit-web-react';

export const MyHeader = () => (
  <Header hasBottomDivider>
    <Container isFluid>
      <Flex alignmentX="left" alignmentY="stretch" spacing="space-1000">
        <HeaderLogo href="/" aria-label="Homepage">
          Logo
        </HeaderLogo>
      </Flex>
    </Container>
  </Header>
);
