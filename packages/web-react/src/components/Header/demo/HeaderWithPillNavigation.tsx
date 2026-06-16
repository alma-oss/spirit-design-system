import React, { useState } from 'react';
import { Container } from '../../Container';
import { Drawer, DrawerCloseButton, DrawerPanel } from '../../Drawer';
import { Flex } from '../../Flex';
import { ProductLogo } from '../../ProductLogo';
import { defaultSvgLogo } from '../../ProductLogo/demo/ProductLogoDefault';
import { Stack, StackItem } from '../../Stack';
import Header from '../Header';
import HeaderLogo from '../HeaderLogo';
import {
  MainNavigation,
  ProfileNavigation,
  SecondaryHorizontalNavigation,
  SecondaryVerticalNavigation,
} from './HeaderWithNavigation/index';

const HeaderWithPillNavigation = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Header>
        <Container>
          <Flex alignmentX="left" alignmentY="stretch" spacing="space-1000">
            <HeaderLogo href="#" aria-label="JobBoard homepage">
              <ProductLogo>{defaultSvgLogo}</ProductLogo>
            </HeaderLogo>
            <MainNavigation variant="pill" />
            <SecondaryHorizontalNavigation id="drawer-navigation-pill" handleOpenDrawer={() => setDrawerOpen(true)} />
          </Flex>
        </Container>
      </Header>

      <Drawer id="drawer-navigation-pill" isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <DrawerPanel closeButton={<DrawerCloseButton />}>
          <Stack hasIntermediateDividers hasSpacing marginBottom="space-900" spacing="space-900">
            <StackItem>
              <ProfileNavigation />
            </StackItem>
            <StackItem>
              <MainNavigation direction="vertical" variant="pill" />
            </StackItem>
            <StackItem>
              <SecondaryVerticalNavigation />
            </StackItem>
          </Stack>
        </DrawerPanel>
      </Drawer>
    </>
  );
};

export default HeaderWithPillNavigation;
