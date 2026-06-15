import React, { useState } from 'react';
import { Container } from '../../Container';
import { Drawer, DrawerCloseButton, DrawerPanel } from '../../Drawer';
import { Flex } from '../../Flex';
import { ProductLogo } from '../../ProductLogo';
import { defaultSvgLogo } from '../../ProductLogo/demo/ProductLogoDefault';
import { Stack } from '../../Stack';
import Header from '../Header';
import HeaderLogo from '../HeaderLogo';
import {
  MainNavigation,
  ProfileNavigation,
  SecondaryHorizontalNavigation,
  SecondaryVerticalNavigation,
} from './HeaderWithNavigation/index';

const HeaderWithNavigation = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Header>
        <Container>
          <Flex alignmentX="left" alignmentY="stretch" spacing="space-1000">
            <HeaderLogo href="#" aria-label="JobBoard homepage">
              <ProductLogo>{defaultSvgLogo}</ProductLogo>
            </HeaderLogo>
            <MainNavigation />
            <SecondaryHorizontalNavigation id="drawer-navigation" handleOpenDrawer={() => setDrawerOpen(true)} />
          </Flex>
        </Container>
      </Header>

      <Drawer id="drawer-navigation" isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <DrawerPanel>
          <DrawerCloseButton />
          <Stack hasIntermediateDividers hasSpacing marginY="space-900" spacing="space-900">
            <ProfileNavigation />
            <MainNavigation direction="vertical" />
            <SecondaryVerticalNavigation />
          </Stack>
        </DrawerPanel>
      </Drawer>
    </>
  );
};

export default HeaderWithNavigation;
