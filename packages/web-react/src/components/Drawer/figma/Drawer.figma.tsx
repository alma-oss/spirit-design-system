import figma from '@figma/code-connect';
import React from 'react';
import { CloseButton } from '../../CloseButton';
import Drawer from '../Drawer';
import DrawerPanel from '../DrawerPanel';
import DrawerPanelBody from '../DrawerPanelBody';
import DrawerPanelHeader from '../DrawerPanelHeader';

figma.connect(Drawer, '<FIGMA_FILE_ID>?node-id=27293%3A7890', {
  props: {},
  example: (props) => (
    <Drawer id="drawer-example" isOpen onClose={() => {}} aria-label="Drawer" {...props}>
      <DrawerPanel>
        <DrawerPanelHeader>
          <CloseButton size="large" aria-expanded aria-controls="drawer-example" onClick={() => {}} />
        </DrawerPanelHeader>
        <DrawerPanelBody hasSpacing>Drawer content</DrawerPanelBody>
      </DrawerPanel>
    </Drawer>
  ),
});
