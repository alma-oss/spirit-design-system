import React from 'react';
import { Flex } from '../../Flex';
import { ProductLogo } from '../../ProductLogo';
import { defaultSvgLogo } from '../../ProductLogo/demo/ProductLogoDefault';
import Header from '../Header';
import HeaderLogo from '../HeaderLogo';

const HeaderMinimal = () => (
  <Header>
    <Flex alignmentX="center" alignmentY="center">
      <HeaderLogo href="#" aria-label="JobBoard homepage">
        <ProductLogo>{defaultSvgLogo}</ProductLogo>
      </HeaderLogo>
    </Flex>
  </Header>
);

export default HeaderMinimal;
