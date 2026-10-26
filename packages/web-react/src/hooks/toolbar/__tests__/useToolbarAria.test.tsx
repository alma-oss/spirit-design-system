import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { type ReactNode, useMemo, useRef } from 'react';
import { ToolbarContextProvider } from '../ToolbarContext';
import { type ToolbarOrientation, getToolbarMove, useToolbarAria } from '../useToolbarAria';
import { useToolbarItem } from '../useToolbarItem';
import { useToolbarState } from '../useToolbarState';

const CustomToolbar = ({ children, orientation }: { children: ReactNode; orientation?: ToolbarOrientation }) => {
  const ref = useRef<HTMLDivElement>(null);
  const state = useToolbarState();
  const { toolbarProps } = useToolbarAria({ orientation }, state, ref);
  const contextValue = useMemo(
    () => ({ orientation: orientation ?? 'horizontal', register: state.register }),
    [orientation, state.register],
  );

  return (
    <div {...toolbarProps} aria-label="Actions" ref={ref}>
      <ToolbarContextProvider value={contextValue}>{children}</ToolbarContextProvider>
    </div>
  );
};

const CustomItem = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLSpanElement>(null);
  useToolbarItem(ref);

  return <span ref={ref}>{children}</span>;
};

describe('getToolbarMove', () => {
  it.each([
    ['Home', 'horizontal', false, 'first'],
    ['End', 'vertical', false, 'last'],
    ['ArrowRight', 'horizontal', false, 'next'],
    ['ArrowLeft', 'horizontal', false, 'previous'],
    ['ArrowRight', 'horizontal', true, 'previous'],
    ['ArrowLeft', 'horizontal', true, 'next'],
    ['ArrowDown', 'vertical', false, 'next'],
    ['ArrowUp', 'vertical', true, 'previous'],
    ['ArrowDown', 'horizontal', false, null],
    ['ArrowRight', 'vertical', false, null],
    ['Enter', 'horizontal', false, null],
  ] as const)('should map %s in a %s toolbar (rtl: %s) to %s', (key, orientation, isRtl, move) => {
    expect(getToolbarMove(key, orientation, isRtl)).toBe(move);
  });
});

describe('useToolbarAria', () => {
  it('should render the toolbar role and orientation', () => {
    render(
      <CustomToolbar orientation="vertical">
        <CustomItem>
          <button type="button">First</button>
        </CustomItem>
      </CustomToolbar>,
    );

    expect(screen.getByRole('toolbar', { name: 'Actions' })).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('should let custom items join the toolbar via useToolbarItem', async () => {
    const user = userEvent.setup();
    render(
      <CustomToolbar>
        <CustomItem>
          <button type="button">First</button>
        </CustomItem>
        <CustomItem>
          <a href="/second">Second</a>
        </CustomItem>
      </CustomToolbar>,
    );

    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('link', { name: 'Second' })).toHaveAttribute('tabindex', '-1');

    await user.tab();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('link', { name: 'Second' })).toHaveFocus();
    expect(screen.getByRole('link', { name: 'Second' })).toHaveAttribute('tabindex', '0');
  });

  it('should manage only the first link or button of an item', () => {
    render(
      <CustomToolbar>
        <CustomItem>
          <button type="button">Trigger</button>
          <button type="button">Popover action</button>
        </CustomItem>
      </CustomToolbar>,
    );

    expect(screen.getByRole('button', { name: 'Trigger' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('button', { name: 'Popover action' })).not.toHaveAttribute('tabindex');
  });

  it('should leave out items with no link or button', () => {
    render(
      <CustomToolbar>
        <CustomItem>
          <input aria-label="Name" />
        </CustomItem>
        <CustomItem>
          <button type="button">Second</button>
        </CustomItem>
      </CustomToolbar>,
    );

    expect(screen.getByRole('textbox', { name: 'Name' })).not.toHaveAttribute('tabindex');
    expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('tabindex', '0');
  });

  it('should restore the tabindex of a control that leaves the toolbar', () => {
    const renderItem = (hasFirst: boolean) => (
      <CustomToolbar>
        <CustomItem>
          {hasFirst && <button type="button">First</button>}
          <button type="button" tabIndex={-1}>
            Second
          </button>
        </CustomItem>
      </CustomToolbar>
    );
    const { rerender } = render(renderItem(false));

    expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('tabindex', '0');

    rerender(renderItem(true));

    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('tabindex', '-1');
  });
});

describe('useToolbarItem', () => {
  it('should leave items outside of a toolbar untouched', () => {
    render(
      <CustomItem>
        <button type="button">Alone</button>
      </CustomItem>,
    );

    expect(screen.getByRole('button', { name: 'Alone' })).not.toHaveAttribute('tabindex');
  });
});
