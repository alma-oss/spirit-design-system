import React, { useState } from 'react';
import { CloseButton } from '../../CloseButton';
import { Container } from '../../Container';
import { Drawer, DrawerPanel, DrawerPanelBody, DrawerPanelHeader } from '../../Drawer';
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
            <MainNavigation variant="pill" aria-label="Main with pill menu, desktop" />
            <SecondaryHorizontalNavigation
              id="drawer-navigation-pill"
              aria-label="Secondary with pill menu, desktop"
              handleOpenDrawer={() => setDrawerOpen(true)}
            />
          </Flex>
        </Container>
      </Header>

      <Drawer
        id="drawer-navigation-pill"
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        aria-label="Navigation"
      >
        <DrawerPanel>
          <DrawerPanelHeader>
            <CloseButton
              size="large"
              aria-expanded={isDrawerOpen}
              aria-controls="drawer-navigation-pill"
              onClick={() => setDrawerOpen(false)}
            />
          </DrawerPanelHeader>
          <DrawerPanelBody>
            <Stack hasIntermediateDividers hasSpacing marginBottom="space-900" spacing="space-900">
              <StackItem>
                <ProfileNavigation />
              </StackItem>
              <StackItem>
                <MainNavigation direction="vertical" variant="pill" aria-label="Main with pill menu, mobile" />
              </StackItem>
              <StackItem>
                <SecondaryVerticalNavigation aria-label="Secondary with pill menu, mobile" />
              </StackItem>
            </Stack>
          </DrawerPanelBody>
        </DrawerPanel>
      </Drawer>
    </>
  );
};

export default HeaderWithPillNavigation;
