import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import { Drawer, DrawerCloseButton, DrawerPanel } from '@alma-oss/spirit-web-react';

export const WithCloseButton = ({ isOpen, onClose }) => (
  <Drawer id="my-drawer" isOpen={isOpen} onClose={onClose} aria-label="Navigation">
    <DrawerPanel closeButton={<DrawerCloseButton />}>
      <p>Drawer content</p>
    </DrawerPanel>
  </Drawer>
);

export const WithoutCloseButton = ({ isOpen, onClose }) => (
  <Drawer id="my-drawer-no-btn" isOpen={isOpen} onClose={onClose} aria-label="Navigation">
    <DrawerPanel>
      <p>Unaffected drawer</p>
    </DrawerPanel>
  </Drawer>
);
