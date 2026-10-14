'use client';

import { Container, Flex, Header, HeaderLogo } from '@alma-oss/spirit-web-react';
import React from 'react';

const HeaderPreview = () => (
  <Header UNSAFE_style={{ width: 320 }}>
    <Container>
      <Flex alignmentX="left" alignmentY="center">
        <HeaderLogo href="#" aria-label="Homepage">
          <strong>JobBoard</strong>
        </HeaderLogo>
      </Flex>
    </Container>
  </Header>
);

export default HeaderPreview;
