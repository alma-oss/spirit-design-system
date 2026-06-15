import React, { useState } from 'react';
import { Container } from '../../Container';
import { Drawer, DrawerCloseButton, DrawerPanel } from '../../Drawer';
import { Flex } from '../../Flex';
import { ProductLogo } from '../../ProductLogo';
import { defaultSvgLogo } from '../../ProductLogo/demo/ProductLogoDefault';
import { Stack } from '../../Stack';
import Header from '../Header';
import HeaderLogo from '../HeaderLogo';
import { ProfileNavigation } from './HeaderWithNavigation/index';
import {
  MainHorizontalNavigation,
  MainVerticalNavigation,
  SecondaryHorizontalNavigation,
  SecondaryVerticalNavigation,
} from './HeaderWithNavigationAndNestedItems/index';

const HeaderWithNavigationAndNestedItems = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Header>
        <Container>
          <Flex alignmentX="left" alignmentY="stretch" spacing="space-1000">
            <HeaderLogo href="#" aria-label="JobBoard homepage">
              <ProductLogo>{defaultSvgLogo}</ProductLogo>
            </HeaderLogo>
            <MainHorizontalNavigation />
            <SecondaryHorizontalNavigation handleOpenDrawer={() => setDrawerOpen(true)} />
          </Flex>
        </Container>
      </Header>

      <Drawer id="drawer-navigation-expanded" isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <DrawerPanel>
          <DrawerCloseButton />
          <Stack hasIntermediateDividers hasSpacing marginY="space-900" spacing="space-900">
            <ProfileNavigation isSquare />
            <MainVerticalNavigation />
            <SecondaryVerticalNavigation />
          </Stack>
        </DrawerPanel>
      </Drawer>
    </>
  );
};
export default HeaderWithNavigationAndNestedItems;
