import { act, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { runAxe } from '@local/tests/testUtils/runAxe';
import { CloseButton } from '../../CloseButton';
import Drawer from '../Drawer';
import DrawerPanel from '../DrawerPanel';
import DrawerPanelBody from '../DrawerPanelBody';
import DrawerPanelHeader from '../DrawerPanelHeader';
import '@local/tests/mocks/dialog';

describe('Drawer accessibility', () => {
  it('should be accessible when open', async () => {
    await act(async () => {
      render(
        <Drawer id="drawer-example" isOpen onClose={() => {}}>
          <DrawerPanel>
            <DrawerPanelHeader>
              <CloseButton size="large" aria-expanded aria-controls="drawer-example" onClick={() => {}} />
            </DrawerPanelHeader>
            <DrawerPanelBody hasSpacing>Drawer content</DrawerPanelBody>
          </DrawerPanel>
        </Drawer>,
      );
    });

    const element = await waitFor(() => screen.getByRole('dialog'));

    const results = await runAxe(element);

    expect(results).toHaveNoAxeViolations();
  });
});
