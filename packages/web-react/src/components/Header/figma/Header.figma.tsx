import figma from '@figma/code-connect';
import React, { useState } from 'react';
import { type NavigationActionVariantsType } from '../../../types';
import { Button, ButtonLink } from '../../Button';
import { Container } from '../../Container';
import { Drawer, DrawerCloseButton, DrawerPanel } from '../../Drawer';
import { Flex } from '../../Flex';
import { Icon } from '../../Icon';
import { Navigation, NavigationAction, NavigationAvatar, NavigationItem } from '../../Navigation';
import { ProductLogo } from '../../ProductLogo';
import { Stack, StackItem } from '../../Stack';
import Header from '../Header';
import HeaderLogo from '../HeaderLogo';

const HEADER_NODE_URL = '<FIGMA_FILE_ID>?node-id=23259%3A7513';

const HeaderWithNavigationLoggedIn = ({ itemVariant }: { itemVariant: NavigationActionVariantsType }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Header>
        <Container>
          <Flex alignmentX="left" alignmentY="stretch" spacing="space-1000">
            <HeaderLogo href="#" aria-label="JobBoard homepage">
              <ProductLogo>{/* Logo goes here */}</ProductLogo>
            </HeaderLogo>
            <Navigation aria-label="Main Navigation" hideOn={['mobile', 'tablet']}>
              <NavigationItem>
                <NavigationAction href="#" isSelected variant={itemVariant}>
                  Selected
                </NavigationAction>
              </NavigationItem>
              <NavigationItem>
                <NavigationAction href="#" variant={itemVariant}>
                  Link
                </NavigationAction>
              </NavigationItem>
              <NavigationItem>
                <NavigationAction href="#" isDisabled variant={itemVariant}>
                  Disabled
                </NavigationAction>
              </NavigationItem>
            </Navigation>
            <Navigation marginLeft="auto" aria-label="Secondary Navigation">
              <NavigationItem alignmentY="center" hideOn={['mobile', 'tablet']}>
                <NavigationAvatar avatarContent={<Icon name="profile" />} aria-label="Profile of Jiří Bárta">
                  My Account
                </NavigationAvatar>
              </NavigationItem>
              <NavigationItem hideOn="desktop">
                <Button
                  id="drawer-navigation-expanded-open-button"
                  color="tertiary"
                  aria-label="Toggle Menu"
                  aria-controls="drawer-navigation-expanded"
                  aria-expanded="false"
                  onClick={() => setDrawerOpen(true)}
                  isSymmetrical
                >
                  <Icon name="hamburger" />
                </Button>
              </NavigationItem>
            </Navigation>
          </Flex>
        </Container>
      </Header>

      <Drawer id="drawer-navigation-expanded" isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <DrawerPanel closeButton={<DrawerCloseButton />}>
          <Stack hasIntermediateDividers hasSpacing marginBottom="space-900" spacing="space-900">
            <StackItem>
              <Navigation aria-label="Profile" direction="vertical">
                <NavigationItem alignmentY="left">
                  <NavigationAvatar avatarContent={<Icon name="profile" />} aria-label="Profile of Jiří Bárta" isSquare>
                    My Account
                  </NavigationAvatar>
                </NavigationItem>
              </Navigation>
            </StackItem>
            <StackItem>
              <Navigation aria-label="Main Navigation" direction="vertical">
                <NavigationItem>
                  <NavigationAction href="#" isSelected variant={itemVariant}>
                    Selected
                  </NavigationAction>
                </NavigationItem>
                <NavigationItem>
                  <NavigationAction href="#" variant={itemVariant}>
                    Link
                  </NavigationAction>
                </NavigationItem>
                <NavigationItem>
                  <NavigationAction href="#" isDisabled variant={itemVariant}>
                    Disabled
                  </NavigationAction>
                </NavigationItem>
              </Navigation>
            </StackItem>
            <StackItem>
              <Navigation aria-label="Secondary Navigation" direction="vertical">
                <NavigationItem>
                  <ButtonLink href="#" color="secondary">
                    Log Out
                  </ButtonLink>
                </NavigationItem>
              </Navigation>
            </StackItem>
          </Stack>
        </DrawerPanel>
      </Drawer>
    </>
  );
};

const HeaderWithNavigationLoggedOut = ({ itemVariant }: { itemVariant: NavigationActionVariantsType }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Header>
        <Container>
          <Flex alignmentX="left" alignmentY="stretch" spacing="space-1000">
            <HeaderLogo href="#" aria-label="JobBoard homepage">
              <ProductLogo>{/* Logo goes here */}</ProductLogo>
            </HeaderLogo>
            <Navigation aria-label="Main Navigation" hideOn={['mobile', 'tablet']}>
              <NavigationItem>
                <NavigationAction href="#" isSelected variant={itemVariant}>
                  Selected
                </NavigationAction>
              </NavigationItem>
              <NavigationItem>
                <NavigationAction href="#" variant={itemVariant}>
                  Link
                </NavigationAction>
              </NavigationItem>
              <NavigationItem>
                <NavigationAction href="#" isDisabled variant={itemVariant}>
                  Disabled
                </NavigationAction>
              </NavigationItem>
            </Navigation>
            <Navigation marginLeft="auto" aria-label="Secondary Navigation">
              <NavigationItem hideOn={['mobile', 'tablet']}>
                <ButtonLink href="#" color="secondary">
                  Register
                </ButtonLink>
              </NavigationItem>
              <NavigationItem hideOn={['mobile', 'tablet']}>
                <ButtonLink href="#">Log In</ButtonLink>
              </NavigationItem>
              <NavigationItem hideOn="desktop">
                <Button
                  id="drawer-navigation-expanded-open-button"
                  color="tertiary"
                  aria-label="Toggle Menu"
                  aria-controls="drawer-navigation-expanded"
                  aria-expanded="false"
                  onClick={() => setDrawerOpen(true)}
                  isSymmetrical
                >
                  <Icon name="hamburger" />
                </Button>
              </NavigationItem>
            </Navigation>
          </Flex>
        </Container>
      </Header>

      <Drawer id="drawer-navigation-expanded" isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <DrawerPanel closeButton={<DrawerCloseButton />}>
          <Stack hasIntermediateDividers hasSpacing marginBottom="space-900" spacing="space-900">
            <StackItem>
              <Navigation aria-label="Main Navigation" direction="vertical">
                <NavigationItem>
                  <NavigationAction href="#" isSelected variant={itemVariant}>
                    Selected
                  </NavigationAction>
                </NavigationItem>
                <NavigationItem>
                  <NavigationAction href="#" variant={itemVariant}>
                    Link
                  </NavigationAction>
                </NavigationItem>
                <NavigationItem>
                  <NavigationAction href="#" isDisabled variant={itemVariant}>
                    Disabled
                  </NavigationAction>
                </NavigationItem>
              </Navigation>
            </StackItem>
            <StackItem>
              <Navigation aria-label="Secondary Navigation" direction="vertical">
                <NavigationItem>
                  <ButtonLink href="#" color="secondary">
                    Register
                  </ButtonLink>
                </NavigationItem>
                <NavigationItem>
                  <ButtonLink href="#">Log In</ButtonLink>
                </NavigationItem>
              </Navigation>
            </StackItem>
          </Stack>
        </DrawerPanel>
      </Drawer>
    </>
  );
};

const commonProps = {
  itemVariant: figma.enum('Item-type', {
    Pill: 'pill',
  }),
};

figma.connect(Header, HEADER_NODE_URL, {
  props: {},
  variant: {
    'Logo only': true,
  },
  example: () => (
    <Header>
      <Flex alignmentX="center" alignmentY="center">
        <HeaderLogo href="#" aria-label="JobBoard homepage">
          <ProductLogo>{/* Logo goes here */}</ProductLogo>
        </HeaderLogo>
      </Flex>
    </Header>
  ),
});

figma.connect(Header, HEADER_NODE_URL, {
  props: commonProps,
  variant: {
    'Logo only': false,
    'Logged in': 'True',
  },
  example: HeaderWithNavigationLoggedIn,
});

figma.connect(Header, HEADER_NODE_URL, {
  props: commonProps,
  variant: {
    'Logo only': false,
    'Logged in': 'False',
  },
  example: HeaderWithNavigationLoggedOut,
});
