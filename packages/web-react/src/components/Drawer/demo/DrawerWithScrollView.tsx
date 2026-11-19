import React, { useState } from 'react';
import { Button, ScrollView } from '../..';
import { CloseButton } from '../../CloseButton';
import Drawer from '../Drawer';
import DrawerPanel from '../DrawerPanel';
import DrawerPanelBody from '../DrawerPanelBody';
import DrawerPanelHeader from '../DrawerPanelHeader';

const DrawerWithScrollView = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  return (
    <>
      <Button onClick={handleOpenDrawer} data-testid="drawer-scrollview-open-button">
        Open Drawer with ScrollView
      </Button>

      <Drawer
        id="example-scroll-view"
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        aria-label="Drawer with ScrollView"
      >
        <DrawerPanel>
          <DrawerPanelHeader>
            <CloseButton
              size="large"
              aria-expanded={isDrawerOpen}
              aria-controls="example-scroll-view"
              onClick={handleDrawerClose}
            />
          </DrawerPanelHeader>
          <ScrollView data-spirit-toggle="scrollView" overflowDecorators="borders">
            <DrawerPanelBody hasSpacing>
              {[...Array(8)].map((_, index) => {
                const key = `paragraph-${index}`;

                return (
                  <p key={key}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at excepturi laudantium magnam
                    mollitia perferendis reprehenderit, voluptate. Cum delectus dicta ducimus eligendi excepturi natus
                    perferendis provident unde. Eveniet, iste, molestiae?
                  </p>
                );
              })}
            </DrawerPanelBody>
          </ScrollView>
        </DrawerPanel>
      </Drawer>
    </>
  );
};

export default DrawerWithScrollView;
