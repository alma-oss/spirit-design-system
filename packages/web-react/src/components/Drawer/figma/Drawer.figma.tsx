import figma from '@figma/code-connect';
import React from 'react';
import Drawer from '../Drawer';
import DrawerCloseButton from '../DrawerCloseButton';
import DrawerPanel from '../DrawerPanel';
import DrawerPanelContent from '../DrawerPanelContent';
import DrawerPanelHeader from '../DrawerPanelHeader';

figma.connect(Drawer, '<FIGMA_FILE_ID>?node-id=27293%3A7890', {
  props: {},
  example: (props) => (
    <Drawer id="drawer-example" isOpen onClose={() => {}} {...props}>
      <DrawerPanel>
        <DrawerPanelHeader>
          <DrawerCloseButton />
        </DrawerPanelHeader>
        <DrawerPanelContent hasSpacing>Drawer content</DrawerPanelContent>
      </DrawerPanel>
    </Drawer>
  ),
});
