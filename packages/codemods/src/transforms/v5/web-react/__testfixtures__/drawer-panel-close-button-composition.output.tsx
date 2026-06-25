import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import { Drawer, DrawerPanel, CloseButton, DrawerPanelHeader, DrawerPanelBody } from '@alma-oss/spirit-web-react';

export const WithCloseButton = ({ isOpen, onClose }) => (
  <Drawer id="my-drawer" isOpen={isOpen} onClose={onClose} aria-label="Navigation">
    <DrawerPanel><DrawerPanelHeader><CloseButton
          size='large'
          aria-expanded={TODO_drawerIsOpen}
          aria-controls={TODO_drawerId}
          onClick={TODO_drawerOnClose} /></DrawerPanelHeader><DrawerPanelBody>
        <p>Drawer content</p>
      </DrawerPanelBody></DrawerPanel>
  </Drawer>
);

export const WithoutCloseButton = ({ isOpen, onClose }) => (
  <Drawer id="my-drawer-no-btn" isOpen={isOpen} onClose={onClose} aria-label="Navigation">
    <DrawerPanel>
      <p>Unaffected drawer</p>
    </DrawerPanel>
  </Drawer>
);
