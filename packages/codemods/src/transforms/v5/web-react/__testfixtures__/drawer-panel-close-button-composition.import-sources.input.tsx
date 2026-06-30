import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import {
  Drawer,
  DrawerCloseButton as DrawerDismissButton,
  DrawerPanel as SpiritDrawerPanel,
} from '@org/design-system';

export const WithCloseButton = ({ isOpen, onClose }) => (
  <Drawer id="my-drawer" isOpen={isOpen} onClose={onClose} aria-label="Navigation">
    <SpiritDrawerPanel closeButton={<DrawerDismissButton size="medium" />}>
      <p>Drawer content</p>
    </SpiritDrawerPanel>
  </Drawer>
);
