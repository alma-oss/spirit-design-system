// url=<FIGMA_FILE_ID>?node-id=27293%3A7890
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Drawer/Drawer.tsx
// component=Drawer

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const variant = instance.getPropertyValue('Variant');

let example;
if (variant === 'Logged in NEW') {
  example = figma.code`
    <Drawer id="drawer-example" isOpen onClose={() => {}} aria-label="Drawer">
      <DrawerPanel>
        <DrawerPanelHeader>
          <CloseButton size="large" aria-expanded aria-controls="drawer-example" onClick={() => {}} />
        </DrawerPanelHeader>
        <DrawerPanelBody hasSpacing>
          <Stack hasIntermediateDividers hasSpacing spacing="space-900">
            <StackItem>
              <Navigation aria-label="Main" direction="vertical">
                <NavigationItem>
                  <NavigationAction href="#" isSelected>Item</NavigationAction>
                </NavigationItem>
                <NavigationItem>
                  <NavigationAction href="#">Item</NavigationAction>
                </NavigationItem>
              </Navigation>
            </StackItem>
            <StackItem>
              <Navigation aria-label="Profile" direction="vertical">
                <NavigationItem alignmentY="left">
                  <NavigationAvatar avatarContent={<Icon name="profile" />} aria-label="Profile" isSquare>
                    My Account
                  </NavigationAvatar>
                </NavigationItem>
              </Navigation>
              <Navigation aria-label="Secondary" direction="vertical">
                <NavigationItem>
                  <NavigationAction href="#">Item</NavigationAction>
                </NavigationItem>
                <NavigationItem>
                  <NavigationAction href="#">Item</NavigationAction>
                </NavigationItem>
              </Navigation>
            </StackItem>
          </Stack>
        </DrawerPanelBody>
      </DrawerPanel>
    </Drawer>`;
} else {
  example = figma.code`
    <Drawer id="drawer-example" isOpen onClose={() => {}} aria-label="Drawer">
      <DrawerPanel>
        <DrawerPanelHeader>
          <CloseButton size="large" aria-expanded aria-controls="drawer-example" onClick={() => {}} />
        </DrawerPanelHeader>
        <DrawerPanelBody hasSpacing>
        <Stack hasIntermediateDividers hasSpacing spacing="space-900">
          <StackItem>
            <Navigation aria-label="Main Navigation" direction="vertical">
              <NavigationItem>
                <NavigationAction href="#" isSelected>Item</NavigationAction>
              </NavigationItem>
              <NavigationItem>
                <NavigationAction href="#">Item</NavigationAction>
              </NavigationItem>
            </Navigation>
          </StackItem>
          <StackItem>
            <Navigation aria-label="Secondary" direction="vertical">
              <NavigationItem>
                <ButtonLink href="#" color="secondary" size="small">
                  Button
                </ButtonLink>
              </NavigationItem>
              <NavigationItem>
                <ButtonLink href="#" size="small">
                  Button
                </ButtonLink>
              </NavigationItem>
            </Navigation>
          </StackItem>
        </Stack>
        </DrawerPanelBody>
      </DrawerPanel>
    </Drawer>`;
}

export default {
  id: 'Drawer',
  imports: [
    "import { ButtonLink, CloseButton, Drawer, DrawerPanel, DrawerPanelBody, DrawerPanelHeader, Icon, Navigation, NavigationAction, NavigationAvatar, NavigationItem, Stack, StackItem } from '@alma-oss/spirit-web-react';",
  ],
  example,
};
