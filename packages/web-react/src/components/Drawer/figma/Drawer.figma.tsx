import figma from '@figma/code-connect';
import React from 'react';
import { CloseButton } from '../../CloseButton';
import Drawer from '../Drawer';
import DrawerPanel from '../DrawerPanel';

figma.connect(Drawer, '<FIGMA_FILE_ID>?node-id=27293%3A7890', {
  props: {},
  example: (props) => (
    <Drawer id="drawer-example" isOpen onClose={() => {}} {...props}>
      <DrawerPanel
        closeButton={<CloseButton size="large" aria-expanded aria-controls="drawer-example" onClick={() => {}} />}
      >
        <div>Drawer content</div>
      </DrawerPanel>
    </Drawer>
  ),
});
