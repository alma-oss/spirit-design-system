import { act, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { runAxe } from '@local/tests/testUtils/runAxe';
import Drawer from '../Drawer';
import DrawerCloseButton from '../DrawerCloseButton';
import DrawerPanel from '../DrawerPanel';
import DrawerPanelContent from '../DrawerPanelContent';
import DrawerPanelHeader from '../DrawerPanelHeader';
import '@local/tests/mocks/dialog';

describe('Drawer accessibility', () => {
  it('should be accessible when open', async () => {
    await act(async () => {
      render(
        <Drawer id="drawer-example" isOpen onClose={() => {}}>
          <DrawerPanel>
            <DrawerPanelHeader>
              <DrawerCloseButton />
            </DrawerPanelHeader>
            <DrawerPanelContent hasSpacing>Drawer content</DrawerPanelContent>
          </DrawerPanel>
        </Drawer>,
      );
    });

    const element = await waitFor(() => screen.getByRole('dialog'));

    const results = await runAxe(element);

    expect(results).toHaveNoAxeViolations();
  });
});
