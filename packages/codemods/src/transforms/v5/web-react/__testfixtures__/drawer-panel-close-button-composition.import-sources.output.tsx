import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import {
  Drawer,
  DrawerPanel as SpiritDrawerPanel,
  CloseButton,
  DrawerPanelHeader,
  DrawerPanelBody,
} from '@org/design-system';

export const WithCloseButton = ({ isOpen, onClose }) => (
  <Drawer id="my-drawer" isOpen={isOpen} onClose={onClose} aria-label="Navigation">
    <SpiritDrawerPanel><DrawerPanelHeader><CloseButton
          size="medium"
          aria-expanded={TODO_drawerIsOpen}
          aria-controls={TODO_drawerId}
          onClick={TODO_drawerOnClose} /></DrawerPanelHeader><DrawerPanelBody>
        <p>Drawer content</p>
      </DrawerPanelBody></SpiritDrawerPanel>
  </Drawer>
);
