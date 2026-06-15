import React from 'react';
import { Container } from '../../Container';
import { Flex } from '../../Flex';
import { ProductLogo } from '../../ProductLogo';
import { defaultSvgLogo } from '../../ProductLogo/demo/ProductLogoDefault';
import Header from '../Header';
import HeaderLogo from '../HeaderLogo';

const HeaderDefault = () => (
  <Header>
    <Container>
      <Flex alignmentX="left" alignmentY="center">
        <HeaderLogo href="#" aria-label="JobBoard homepage">
          <ProductLogo>{defaultSvgLogo}</ProductLogo>
        </HeaderLogo>
      </Flex>
    </Container>
  </Header>
);
export default HeaderDefault;
