import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { type ReactNode, forwardRef, useState } from 'react';
import { ToolbarBoundary, ToolbarContextProvider } from '../ToolbarContext';
import { type ToolbarOrientation, getToolbarMove, useToolbar } from '../useToolbar';
import { useToolbarItem } from '../useToolbarItem';

const Toolbar = ({
  children,
  isEnabled,
  orientation = 'horizontal',
}: {
  children: ReactNode;
  isEnabled?: boolean;
  orientation?: ToolbarOrientation;
}) => {
  const toolbar = useToolbar({ isEnabled, orientation });

  return (
    <div role="toolbar" aria-label="Actions">
      <ToolbarContextProvider value={toolbar}>{children}</ToolbarContextProvider>
    </div>
  );
};

const CustomButton = forwardRef<HTMLButtonElement, { children: ReactNode; isDisabled?: boolean }>(
  ({ children, isDisabled }, ref) => {
    const toolbarItemProps = useToolbarItem({ isDisabled, ref });

    return (
      <button type="button" {...toolbarItemProps}>
        {children}
      </button>
    );
  },
);

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

describe('useToolbar', () => {
  it('should let custom components join the toolbar via useToolbarItem', async () => {
    const user = userEvent.setup();
    render(
      <Toolbar>
        <CustomButton>First</CustomButton>
        <CustomButton>Second</CustomButton>
      </Toolbar>,
    );

    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('tabindex', '-1');

    await user.tab();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('button', { name: 'Second' })).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('tabindex', '0');
  });

  it('should follow the DOM order regardless of the mount order', () => {
    const { rerender } = render(
      <Toolbar>
        <CustomButton key="second">Second</CustomButton>
      </Toolbar>,
    );

    rerender(
      <Toolbar>
        <CustomButton key="first">First</CustomButton>
        <CustomButton key="second">Second</CustomButton>
      </Toolbar>,
    );

    expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('tabindex', '0');
  });

  it('should move the tab stop to the first item when the active one unmounts', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <Toolbar>
        <CustomButton key="first">First</CustomButton>
        <CustomButton key="second">Second</CustomButton>
      </Toolbar>,
    );

    await user.click(screen.getByRole('button', { name: 'Second' }));

    rerender(
      <Toolbar>
        <CustomButton key="first">First</CustomButton>
      </Toolbar>,
    );

    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('tabindex', '0');
  });

  it('should leave out disabled items', () => {
    render(
      <Toolbar>
        <CustomButton isDisabled>First</CustomButton>
        <CustomButton>Second</CustomButton>
      </Toolbar>,
    );

    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('tabindex', '-1');
    expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('tabindex', '0');
  });

  it('should move the tab stop when the active item hides itself', async () => {
    const user = userEvent.setup();
    const HidingButton = () => {
      const [isHidden, setIsHidden] = useState(false);
      const toolbarItemProps = useToolbarItem<HTMLButtonElement>({});

      return (
        <>
          <button type="button" hidden={isHidden} {...toolbarItemProps}>
            First
          </button>
          <button type="button" onClick={() => setIsHidden(true)}>
            Hide
          </button>
        </>
      );
    };
    render(
      <Toolbar>
        <HidingButton />
        <CustomButton>Second</CustomButton>
      </Toolbar>,
    );

    await user.click(screen.getByRole('button', { name: 'Hide' }));

    expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('tabindex', '0');
  });

  it('should leave the items untouched when disabled', async () => {
    const user = userEvent.setup();
    render(
      <Toolbar isEnabled={false}>
        <CustomButton>First</CustomButton>
        <CustomButton>Second</CustomButton>
      </Toolbar>,
    );

    expect(screen.getByRole('button', { name: 'First' })).not.toHaveAttribute('tabindex');

    await user.tab();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('button', { name: 'First' })).toHaveFocus();
  });

  it('should not re-register an item when its inline ref changes', () => {
    const register = jest.fn(() => () => {});
    const refs: Array<HTMLButtonElement | null> = [];
    const renderItem = () => (
      <ToolbarContextProvider
        value={{ activeKey: null, isEnabled: true, onItemKeyDown: () => {}, register, setActiveKey: () => {} }}
      >
        <CustomButton ref={(element) => refs.push(element)}>Item</CustomButton>
      </ToolbarContextProvider>
    );
    const { rerender } = render(renderItem());

    rerender(renderItem());

    expect(register).toHaveBeenCalledTimes(1);
    expect(refs.at(-1)).toBe(screen.getByRole('button', { name: 'Item' }));
  });

  it('should stop the toolbar at a ToolbarBoundary', () => {
    render(
      <Toolbar>
        <CustomButton>First</CustomButton>
        <ToolbarBoundary>
          <CustomButton>Inside boundary</CustomButton>
        </ToolbarBoundary>
      </Toolbar>,
    );

    expect(screen.getByRole('button', { name: 'Inside boundary' })).not.toHaveAttribute('tabindex');
  });

  it('should leave items outside of a toolbar untouched', () => {
    render(<CustomButton>Alone</CustomButton>);

    expect(screen.getByRole('button', { name: 'Alone' })).not.toHaveAttribute('tabindex');
  });
});
