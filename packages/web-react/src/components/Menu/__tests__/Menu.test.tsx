import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { createRef, useState } from 'react';
import { restPropsTest, stylePropsTest } from '@local/tests';
import { Button } from '../../Button';
import { Dropdown, DropdownPopover, DropdownTrigger } from '../../Dropdown';
import { Icon } from '../../Icon';
import { Item } from '../../Item';
import Menu from '../Menu';

jest.mock('../../../hooks/useIcon');

const renderMenu = () =>
  render(
    <>
      <button type="button">Before</button>
      <Menu aria-label="Options">
        <Item startSlot={<Icon name="edit" />}>Edit</Item>
        <Item>Duplicate</Item>
        <Item isDisabled>Archive</Item>
        <Item>Delete</Item>
      </Menu>
      <button type="button">After</button>
    </>,
  );

const DropdownMenu = ({ onEdit }: { onEdit?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Dropdown id="actions" isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)}>
        <DropdownTrigger elementType={Button}>Actions</DropdownTrigger>
        <DropdownPopover>
          <Menu aria-label="Options">
            <Item onClick={onEdit}>Edit</Item>
            <Item>Duplicate</Item>
            <Item>Delete</Item>
          </Menu>
        </DropdownPopover>
      </Dropdown>
      <button type="button">After</button>
    </>
  );
};

describe('Menu', () => {
  stylePropsTest((props) => <Menu {...props} aria-label="Options" />);

  restPropsTest((props) => <Menu {...props} aria-label="Options" />, 'div');

  it('should render a vertical menu of menu item buttons', () => {
    renderMenu();

    expect(screen.getByRole('menu', { name: 'Options' })).toHaveAttribute('aria-orientation', 'vertical');
    expect(screen.getAllByRole('menuitem')).toHaveLength(4);
    expect(screen.getByRole('menuitem', { name: 'Edit' }).tagName).toBe('BUTTON');
  });

  it('should name a menu item by its text only', () => {
    renderMenu();

    expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument();
  });

  it('should let an item override the element type', () => {
    render(
      <Menu aria-label="Options">
        <Item elementType="a" href="#">
          Preview
        </Item>
      </Menu>,
    );

    expect(screen.getByRole('menuitem', { name: 'Preview' }).tagName).toBe('A');
  });

  it('should be a single tab stop', async () => {
    const user = userEvent.setup();
    renderMenu();

    await user.click(screen.getByRole('button', { name: 'Before' }));
    await user.tab();

    expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveFocus();
    expect(screen.getByRole('menuitem', { name: 'Duplicate' })).toHaveAttribute('tabindex', '-1');

    await user.tab();

    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
  });

  it('should move focus with up and down arrows, skip disabled items and wrap', async () => {
    const user = userEvent.setup();
    renderMenu();

    await user.click(screen.getByRole('menuitem', { name: 'Duplicate' }));
    await user.keyboard('{ArrowDown}');

    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus();

    await user.keyboard('{ArrowDown}');

    expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveFocus();

    await user.keyboard('{ArrowUp}');

    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus();
  });

  it('should leave left and right arrows alone', async () => {
    const user = userEvent.setup();
    renderMenu();

    await user.click(screen.getByRole('menuitem', { name: 'Edit' }));
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveFocus();
  });

  it('should move focus to the first and last item with Home and End', async () => {
    const user = userEvent.setup();
    renderMenu();

    await user.click(screen.getByRole('menuitem', { name: 'Duplicate' }));
    await user.keyboard('{End}');

    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus();

    await user.keyboard('{Home}');

    expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveFocus();
  });

  it('should move focus to the next item starting with the typed character', async () => {
    const user = userEvent.setup();
    renderMenu();

    await user.click(screen.getByRole('menuitem', { name: 'Edit' }));
    await user.keyboard('d');

    expect(screen.getByRole('menuitem', { name: 'Duplicate' })).toHaveFocus();
    expect(screen.getByRole('menuitem', { name: 'Duplicate' })).toHaveAttribute('tabindex', '0');

    await user.keyboard('d');

    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus();
  });

  it('should not move focus to a disabled item by typing', async () => {
    const user = userEvent.setup();
    renderMenu();

    await user.click(screen.getByRole('menuitem', { name: 'Edit' }));
    await user.keyboard('a');

    expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveFocus();
  });

  it('should skip a disabled link item', async () => {
    const user = userEvent.setup();
    render(
      <Menu aria-label="Options">
        <Item>Edit</Item>
        <Item elementType="a" href="#" isDisabled aria-disabled>
          Preview
        </Item>
        <Item>Delete</Item>
      </Menu>,
    );

    await user.click(screen.getByRole('menuitem', { name: 'Edit' }));
    await user.keyboard('{ArrowDown}');

    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus();
  });

  it('should keep an item in the menu when its element type changes', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <Menu aria-label="Options">
        <Item>Edit</Item>
        <Item>Preview</Item>
      </Menu>,
    );

    rerender(
      <Menu aria-label="Options">
        <Item>Edit</Item>
        <Item elementType="a" href="#">
          Preview
        </Item>
      </Menu>,
    );
    await user.click(screen.getByRole('menuitem', { name: 'Edit' }));
    await user.keyboard('{ArrowDown}');

    expect(screen.getByRole('menuitem', { name: 'Preview' })).toHaveFocus();
    expect(screen.getByRole('menuitem', { name: 'Preview' })).toHaveAttribute('tabindex', '0');
  });

  it('should forward the ref of the menu', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Menu aria-label="Options" ref={ref} />);

    expect(ref.current).toBe(screen.getByRole('menu'));
  });

  describe('inside a Dropdown', () => {
    it('should make the trigger control the menu', () => {
      render(<DropdownMenu />);

      const trigger = screen.getByRole('button', { name: 'Actions' });

      expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
      expect(trigger).toHaveAttribute('aria-controls', screen.getByRole('menu', { hidden: true }).id);
    });

    it('should make the popover presentational', () => {
      render(<DropdownMenu />);

      expect(screen.queryByRole('dialog', { hidden: true })).not.toBeInTheDocument();
      expect(screen.getByRole('menu', { hidden: true }).parentElement).toHaveAttribute('role', 'presentation');
    });

    it('should focus the first item when opened with a click or ArrowDown', async () => {
      const user = userEvent.setup();
      render(<DropdownMenu />);

      await user.click(screen.getByRole('button', { name: 'Actions' }));

      expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveFocus();

      await user.keyboard('{Escape}');
      await user.keyboard('{ArrowDown}');

      expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveFocus();
    });

    it('should focus the last item when opened with ArrowUp', async () => {
      const user = userEvent.setup();
      render(<DropdownMenu />);

      screen.getByRole('button', { name: 'Actions' }).focus();
      await user.keyboard('{ArrowUp}');

      expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus();
    });

    it('should close with Escape and return focus to the trigger', async () => {
      const user = userEvent.setup();
      render(<DropdownMenu />);

      const trigger = screen.getByRole('button', { name: 'Actions' });
      await user.click(trigger);
      await user.keyboard('{Escape}');

      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      await waitFor(() => expect(trigger).toHaveFocus());
    });

    it.each([
      ['a click', async (user: ReturnType<typeof userEvent.setup>) => user.click(screen.getByText('Edit'))],
      ['Enter', async (user: ReturnType<typeof userEvent.setup>) => user.keyboard('{Enter}')],
      ['Space', async (user: ReturnType<typeof userEvent.setup>) => user.keyboard(' ')],
    ])('should activate an item with %s, close and return focus to the trigger', async (_, activate) => {
      const user = userEvent.setup();
      const onEdit = jest.fn();
      render(<DropdownMenu onEdit={onEdit} />);

      const trigger = screen.getByRole('button', { name: 'Actions' });
      await user.click(trigger);
      await activate(user);

      expect(onEdit).toHaveBeenCalledTimes(1);
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      await waitFor(() => expect(trigger).toHaveFocus());
    });

    it('should activate a link item with Space', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn((event) => event.preventDefault());
      const LinkMenu = () => {
        const [isOpen, setIsOpen] = useState(false);

        return (
          <Dropdown id="links" isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)}>
            <DropdownTrigger elementType={Button}>Links</DropdownTrigger>
            <DropdownPopover>
              <Menu aria-label="Links">
                <Item elementType="a" href="#" onClick={onClick}>
                  Preview
                </Item>
              </Menu>
            </DropdownPopover>
          </Dropdown>
        );
      };
      render(<LinkMenu />);

      await user.click(screen.getByRole('button', { name: 'Links' }));
      await user.keyboard(' ');

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(screen.getByRole('button', { name: 'Links' })).toHaveAttribute('aria-expanded', 'false');
    });

    it('should not close when a disabled link item is clicked', async () => {
      const user = userEvent.setup();
      const DisabledLinkMenu = () => {
        const [isOpen, setIsOpen] = useState(true);

        return (
          <Dropdown id="disabled-links" isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)}>
            <DropdownTrigger elementType={Button}>Links</DropdownTrigger>
            <DropdownPopover>
              <Menu aria-label="Links">
                <Item elementType="a" href="#" isDisabled aria-disabled onClick={(event) => event.preventDefault()}>
                  Preview
                </Item>
              </Menu>
            </DropdownPopover>
          </Dropdown>
        );
      };
      render(<DisabledLinkMenu />);

      await user.click(screen.getByRole('menuitem', { name: 'Preview' }));

      expect(screen.getByRole('button', { name: 'Links' })).toHaveAttribute('aria-expanded', 'true');
    });

    it('should close on Tab and let focus move on', async () => {
      const user = userEvent.setup();
      render(<DropdownMenu />);

      const trigger = screen.getByRole('button', { name: 'Actions' });
      await user.click(trigger);
      await user.tab();

      expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();

      await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));

      expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
    });
  });
});
