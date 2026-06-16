import React, { type ChangeEvent, useState } from 'react';
import { Button, Checkbox, Radio, Stack, TextArea } from '../..';
import { AlignmentX } from '../../../constants';
import { type DrawerAlignmentXType } from '../../../types';
import { Box } from '../../Box';
import Drawer from '../Drawer';
import DrawerCloseButton from '../DrawerCloseButton';
import DrawerPanel from '../DrawerPanel';

const DrawerDefault = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isClosableOnBackdropClick, setIsClosableOnBackdropClick] = useState(true);
  const [isClosableOnEscapeKey, setIsClosableOnEscapeKey] = useState(true);
  const [content, setContent] = useState<string>('This is a Drawer content.');
  const [drawerAlign, setDrawerAlign] = useState<DrawerAlignmentXType>(AlignmentX.RIGHT);

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);
  const handleDrawerAlignChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDrawerAlign(event.target.value as DrawerAlignmentXType);
  };

  return (
    <>
      <Box elementType="form" marginBottom="space-600">
        <Box elementType="fieldset" borderWidth="0">
          <legend>Drawer alignment:</legend>
          <Radio
            id="drawer-alignment-left"
            marginRight="space-600"
            label="Left"
            value="left"
            name="drawer-alignment"
            autoComplete="off"
            isChecked={drawerAlign === AlignmentX.LEFT}
            onChange={handleDrawerAlignChange}
          />{' '}
          <Radio
            id="drawer-alignment-right"
            label="Right"
            value="right"
            name="drawer-alignment"
            autoComplete="off"
            isChecked={drawerAlign === AlignmentX.RIGHT}
            onChange={handleDrawerAlignChange}
          />
        </Box>

        <Box elementType="fieldset" borderWidth="0">
          <Stack hasSpacing>
            <Checkbox
              id="drawer-is-closable-on-backdrop-click"
              isChecked={isClosableOnBackdropClick}
              label="Closable on Backdrop Click"
              name="is-closable-on-backdrop-click"
              onChange={() => setIsClosableOnBackdropClick(!isClosableOnBackdropClick)}
            />
            <Checkbox
              id="drawer-is-closable-on-escape-key"
              isChecked={isClosableOnEscapeKey}
              label="Closable on Escape Key Down"
              name="is-closable-on-escape-key"
              onChange={() => setIsClosableOnEscapeKey(!isClosableOnEscapeKey)}
            />
            <TextArea
              id="drawer-content"
              label="Drawer content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.currentTarget.value)}
            />
          </Stack>
        </Box>
      </Box>
      <Button onClick={handleOpenDrawer} data-testid="drawer-open-button">
        Open Drawer
      </Button>

      <Drawer
        alignmentX={drawerAlign}
        id="example-basic"
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        closeOnBackdropClick={isClosableOnBackdropClick}
        closeOnEscapeKeyDown={isClosableOnEscapeKey}
      >
        <DrawerPanel data-testid="drawer-panel" closeButton={<DrawerCloseButton />}>
          <div className="px-700 pb-900">{content}</div>
        </DrawerPanel>
      </Drawer>
    </>
  );
};

export default DrawerDefault;
