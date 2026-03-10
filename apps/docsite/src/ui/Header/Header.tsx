'use client';

import { Container, Flex, UNSTABLE_Header, UNSTABLE_HeaderLogo } from '@alma-oss/spirit-web-react';
import { Menu } from '@local/ui/Menu';
import SpiritLogo from '@local/ui/SpiritLogo';
import NextLink from 'next/link';
import React from 'react';
import useIsPage from '@local/hooks/useIsPage';

interface HeaderProps {
  /**
   * Disables client-side routing for navigation links (logo, etc.) by using
   * a plain `<a>` tag instead of Next.js `Link`.
   *
   * This is necessary on the global not-found page (`global-not-found.tsx`),
   * which renders its own `<html>`/`<body>` outside the normal Next.js layout
   * tree. In that context, `NextLink` performs client-side navigation that
   * changes the URL but cannot re-render the page because there is no router
   * context to handle it.
   *
   * If more issues arise with the not-found page header, consider creating
   * a dedicated simplified header component for error pages instead.
   */
  disableClientRouting?: boolean;
}

const Header = ({ disableClientRouting = false }: HeaderProps) => {
  const isHomePage = useIsPage(routes.home);
  const isComponentsPage = useIsPage(routes.components);

  return (
    <UNSTABLE_Header
      theme="theme-light-on-brand"
      {...(isComponentsPage && { UNSAFE_className: 'hide-from-visual-tests' })}
      hasBottomDivider={isHomePage}
    >
      <Container isFluid>
        <Flex alignmentX="left" spacingX="space-1000">
          <UNSTABLE_HeaderLogo elementType={disableClientRouting ? 'a' : NextLink} href={routes.home} aria-label="Spirit Development Preview">
            <SpiritLogo />
          </UNSTABLE_HeaderLogo>
          <Menu />
        </Flex>
      </Container>
    </UNSTABLE_Header>
  );
};

export default Header;
