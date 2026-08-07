// url=<FIGMA_FILE_ID>?node-id=43829%3A6120
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Header/Header.tsx
// component=Header

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const variant = instance.getPropertyValue('Variant');
const logoSlot = instance.getSlot('Logo Slot');
const menuItemsDesktop = instance.getSlot('Menu Items Desktop');
const rightActionsDesktop = instance.getSlot('Right Actions Desktop');
const userActionsDesktop = instance.getSlot('User Actions Desktop');

const actionsSlot = variant === 'Logged in' ? userActionsDesktop : rightActionsDesktop;

export default {
  id: 'HeaderPill',
  imports: [
    "import { useState } from 'react';",
    "import { Button, CloseButton, Container, Drawer, DrawerPanel, DrawerPanelBody, DrawerPanelHeader, Flex, Header, Icon, Navigation, NavigationItem } from '@alma-oss/spirit-web-react';",
  ],
  example: figma.code`function Example() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  return (<>
    <Header>
      <Container>
        <Flex alignmentX="left" alignmentY="stretch" spacing="space-1000">
          ${logoSlot}
          <Navigation aria-label="Main Navigation" hideOn={['mobile', 'tablet']}>
            ${menuItemsDesktop}
          </Navigation>
          <Navigation marginLeft="auto" aria-label="Secondary Navigation">
            <NavigationItem hideOn={['mobile', 'tablet']}>
              ${actionsSlot}
            </NavigationItem>
            <NavigationItem hideOn="desktop">
              <Button color="tertiary" isSymmetrical aria-label="Toggle Menu" onClick={() => setDrawerOpen(true)}>
                <Icon name="hamburger" />
              </Button>
            </NavigationItem>
          </Navigation>
        </Flex>
      </Container>
    </Header>

    <Drawer id="drawer-navigation" isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} aria-label="Navigation">
      <DrawerPanel>
        <DrawerPanelHeader>
          <CloseButton size="large" onClick={() => setDrawerOpen(false)} />
        </DrawerPanelHeader>
        <DrawerPanelBody>
          ${menuItemsDesktop}
        </DrawerPanelBody>
      </DrawerPanel>
    </Drawer>
  </>);
}`,
};
