import { Container, Flex, UNSTABLE_Header, UNSTABLE_HeaderLogo } from '@alma-oss/spirit-web-react';
import useIsPage from '@local/hooks/useIsPage';
import { Menu } from '@local/ui/Menu';
import SpiritLogo from '@local/ui/SpiritLogo';
import NextLink from 'next/link';
import React from 'react';

const Header = () => {
  const isHomePage = useIsPage('/');
  const isComponentsPage = useIsPage('components');

  return (
    <UNSTABLE_Header
      theme="theme-light-on-brand"
      {...(isComponentsPage && { UNSAFE_className: 'hide-from-visual-tests' })}
      hasBottomDivider={isHomePage}
    >
      <Container isFluid>
        <Flex alignmentX="left" spacingX="space-1000">
          <UNSTABLE_HeaderLogo elementType={NextLink} href="/" aria-label="Spirit Development Preview">
            <SpiritLogo />
          </UNSTABLE_HeaderLogo>
          <Menu />
        </Flex>
      </Container>
    </UNSTABLE_Header>
  );
};

export default Header;
