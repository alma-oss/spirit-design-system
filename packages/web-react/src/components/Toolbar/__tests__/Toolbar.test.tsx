import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import { ariaAttributesTest, restPropsTest, stylePropsTest, validHtmlAttributesTest } from '@local/tests';
import { type DirectionDictionaryType } from '../../../types';
import { Button } from '../../Button';
import { ButtonLink } from '../../ButtonLink';
import { Collapse } from '../../Collapse';
import { Dropdown, DropdownPopover, DropdownTrigger } from '../../Dropdown';
import { Modal, ModalBody, ModalDialog } from '../../Modal';
import { Navigation, NavigationAction, NavigationAvatar, NavigationItem } from '../../Navigation';
import { TextField } from '../../TextField';
import Toolbar from '../Toolbar';

jest.mock('../../../hooks/useIcon');

const renderToolbar = ({
  orientation,
  isSecondDisabled = false,
}: { orientation?: DirectionDictionaryType; isSecondDisabled?: boolean } = {}) =>
  render(
    <>
      <button type="button">Before</button>
      <Toolbar aria-label="CV actions" orientation={orientation}>
        <Navigation>
          <NavigationItem>
            <NavigationAction href="#">Edit</NavigationAction>
          </NavigationItem>
          <NavigationItem>
            <NavigationAction href="#" isDisabled={isSecondDisabled}>
              Download
            </NavigationAction>
          </NavigationItem>
          <NavigationItem>
            <Button>Share</Button>
          </NavigationItem>
        </Navigation>
      </Toolbar>
      <button type="button">After</button>
    </>,
  );

const focusToolbar = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole('button', { name: 'Before' }));
  await user.tab();
};

describe('Toolbar', () => {
  stylePropsTest(Toolbar);

  restPropsTest(Toolbar, 'div');

  validHtmlAttributesTest(Toolbar);

  ariaAttributesTest(Toolbar);

  let warn: jest.SpyInstance;

  beforeEach(() => {
    warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render a toolbar with orientation', () => {
    renderToolbar({ orientation: 'vertical' });

    expect(screen.getByRole('toolbar', { name: 'CV actions' })).toHaveAttribute('aria-orientation', 'vertical');
    expect(screen.getByRole('toolbar').querySelector('.Navigation')).toHaveClass('Navigation--vertical');
  });

  it('should default the orientation to horizontal', () => {
    renderToolbar();

    expect(screen.getByRole('toolbar')).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('should render a Navigation as a div', () => {
    renderToolbar();

    expect(screen.getByRole('toolbar').querySelector('.Navigation')?.localName).toBe('div');
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  describe('development warnings', () => {
    it('should not warn when a toolbar has no accessible name', () => {
      render(
        <Toolbar>
          <Navigation>
            <NavigationItem>
              <Button>Share</Button>
            </NavigationItem>
          </Navigation>
        </Toolbar>,
      );

      expect(warn).not.toHaveBeenCalled();
    });
  });

  it('should let a Navigation elementType override the toolbar default', () => {
    render(
      <Toolbar aria-label="CV actions">
        <Navigation elementType="section">
          <NavigationItem>
            <Button>Share</Button>
          </NavigationItem>
        </Navigation>
      </Toolbar>,
    );

    expect(screen.getByRole('toolbar').querySelector('.Navigation')?.localName).toBe('section');
  });

  it('should let a Navigation direction override the toolbar orientation', () => {
    render(
      <Toolbar aria-label="CV actions" orientation="vertical">
        <Navigation direction="horizontal">
          <NavigationItem>
            <Button>Share</Button>
          </NavigationItem>
        </Navigation>
      </Toolbar>,
    );

    expect(screen.getByRole('toolbar').querySelector('.Navigation')).toHaveClass('Navigation--horizontal');
  });

  it('should render the list and its items as presentational', () => {
    renderToolbar();

    const navigation = screen.getByRole('toolbar').querySelector('.Navigation');

    expect(navigation?.querySelector('ul')).toHaveAttribute('role', 'presentation');

    navigation?.querySelectorAll('li').forEach((item) => expect(item).toHaveAttribute('role', 'presentation'));
  });

  it('should not expose list semantics of a Navigation', () => {
    renderToolbar();

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('should not touch the Navigation outside of a toolbar', () => {
    render(
      <Navigation aria-label="Main">
        <NavigationItem>
          <NavigationAction href="#">Home</NavigationAction>
        </NavigationItem>
        <NavigationItem>
          <Button>Sign in</Button>
        </NavigationItem>
      </Navigation>,
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('tabindex');
    expect(screen.getByRole('button', { name: 'Sign in' })).not.toHaveAttribute('tabindex');
  });

  it('should make the first item the only tab stop', () => {
    renderToolbar();

    expect(screen.getByRole('link', { name: 'Edit' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('link', { name: 'Download' })).toHaveAttribute('tabindex', '-1');
    expect(screen.getByRole('button', { name: 'Share' })).toHaveAttribute('tabindex', '-1');
  });

  it('should be a single tab stop', async () => {
    const user = userEvent.setup();
    renderToolbar();

    await focusToolbar(user);

    expect(screen.getByRole('link', { name: 'Edit' })).toHaveFocus();

    await user.tab();

    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();

    await user.tab({ shift: true });

    expect(screen.getByRole('link', { name: 'Edit' })).toHaveFocus();
  });

  it('should move focus with left and right arrows in a horizontal toolbar and wrap', async () => {
    const user = userEvent.setup();
    renderToolbar();

    await focusToolbar(user);
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('link', { name: 'Download' })).toHaveFocus();

    await user.keyboard('{ArrowRight}{ArrowRight}');

    expect(screen.getByRole('link', { name: 'Edit' })).toHaveFocus();

    await user.keyboard('{ArrowLeft}');

    expect(screen.getByRole('button', { name: 'Share' })).toHaveFocus();

    await user.keyboard('{ArrowDown}');

    expect(screen.getByRole('button', { name: 'Share' })).toHaveFocus();
  });

  it('should move focus with up and down arrows in a vertical toolbar', async () => {
    const user = userEvent.setup();
    renderToolbar({ orientation: 'vertical' });

    await focusToolbar(user);
    await user.keyboard('{ArrowDown}');

    expect(screen.getByRole('link', { name: 'Download' })).toHaveFocus();

    await user.keyboard('{ArrowUp}');

    expect(screen.getByRole('link', { name: 'Edit' })).toHaveFocus();

    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('link', { name: 'Edit' })).toHaveFocus();
  });

  it('should move focus to the first and last item with Home and End', async () => {
    const user = userEvent.setup();
    renderToolbar();

    await focusToolbar(user);
    await user.keyboard('{End}');

    expect(screen.getByRole('button', { name: 'Share' })).toHaveFocus();

    await user.keyboard('{Home}');

    expect(screen.getByRole('link', { name: 'Edit' })).toHaveFocus();
  });

  it('should swap left and right in a right-to-left layout', async () => {
    const user = userEvent.setup();
    const { getComputedStyle } = window;
    jest.spyOn(window, 'getComputedStyle').mockImplementation((element, pseudoElement) => {
      const style = getComputedStyle(element, pseudoElement);
      Object.defineProperty(style, 'direction', { value: 'rtl' });

      return style;
    });
    renderToolbar();

    await focusToolbar(user);
    await user.keyboard('{ArrowLeft}');

    expect(screen.getByRole('link', { name: 'Download' })).toHaveFocus();
  });

  it('should return to the last focused item when tabbing back in', async () => {
    const user = userEvent.setup();
    renderToolbar();

    await focusToolbar(user);
    await user.keyboard('{ArrowRight}');
    await user.tab();

    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();

    await user.tab({ shift: true });

    expect(screen.getByRole('link', { name: 'Download' })).toHaveFocus();
  });

  it('should make the clicked item the tab stop', async () => {
    const user = userEvent.setup();
    renderToolbar();

    await user.click(screen.getByRole('button', { name: 'Share' }));

    expect(screen.getByRole('button', { name: 'Share' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('link', { name: 'Edit' })).toHaveAttribute('tabindex', '-1');
  });

  it('should skip disabled actions', async () => {
    const user = userEvent.setup();
    renderToolbar({ isSecondDisabled: true });

    await focusToolbar(user);
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('button', { name: 'Share' })).toHaveFocus();
  });

  it('should include ButtonLink, NavigationAvatar and a native button', async () => {
    const user = userEvent.setup();
    render(
      <Toolbar aria-label="CV actions">
        <Navigation>
          <NavigationItem>
            <ButtonLink href="#">Preview</ButtonLink>
          </NavigationItem>
          <NavigationItem>
            <NavigationAvatar href="#" avatarContent="JB" aria-label="Profile">
              Profile
            </NavigationAvatar>
          </NavigationItem>
          <NavigationItem>
            <button type="button">Custom</button>
          </NavigationItem>
        </Navigation>
      </Toolbar>,
    );

    await user.tab();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('link', { name: 'Profile' })).toHaveFocus();

    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('button', { name: 'Custom' })).toHaveFocus();
  });

  it('should leave out a non-interactive NavigationAvatar', () => {
    render(
      <Toolbar aria-label="CV actions">
        <Navigation>
          <NavigationItem>
            <NavigationAvatar elementType="div" avatarContent="JB" data-testid="avatar">
              Profile
            </NavigationAvatar>
          </NavigationItem>
        </Navigation>
      </Toolbar>,
    );

    expect(screen.getByTestId('avatar')).not.toHaveAttribute('tabindex');
  });

  it('should keep controls outside of a NavigationItem as their own tab stops', async () => {
    const user = userEvent.setup();
    render(
      <Toolbar aria-label="CV actions">
        <Navigation>
          <NavigationItem>
            <NavigationAction href="#">Edit</NavigationAction>
          </NavigationItem>
          <NavigationItem>
            <NavigationAction href="#">Download</NavigationAction>
          </NavigationItem>
        </Navigation>
        <TextField id="name" name="name" label="Name" defaultValue="ab" />
      </Toolbar>,
    );

    const textField = screen.getByRole('textbox', { name: 'Name' });

    expect(textField).not.toHaveAttribute('tabindex');

    await user.tab();
    await user.tab();

    expect(textField).toHaveFocus();

    await user.keyboard('{ArrowLeft}');

    expect(textField).toHaveFocus();
  });

  it('should leave keys already handled by an item alone', async () => {
    const user = userEvent.setup();
    render(
      <Toolbar aria-label="CV actions">
        <Navigation>
          <NavigationItem>
            <Button onKeyDown={(event) => event.preventDefault()}>Menu</Button>
          </NavigationItem>
          <NavigationItem>
            <NavigationAction href="#">Edit</NavigationAction>
          </NavigationItem>
        </Navigation>
      </Toolbar>,
    );

    await user.tab();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('button', { name: 'Menu' })).toHaveFocus();
  });

  it('should keep the controls of an overlay inside an item out of the toolbar', () => {
    render(
      <Toolbar aria-label="CV actions">
        <Navigation>
          <NavigationItem>
            <NavigationAction href="#">Edit</NavigationAction>
            <Modal id="share-modal" isOpen onClose={() => {}}>
              <ModalDialog>
                <ModalBody>
                  <Button>Inside modal</Button>
                </ModalBody>
              </ModalDialog>
            </Modal>
            <Collapse id="details" isOpen>
              <Button>Inside collapse</Button>
            </Collapse>
            <Collapse id="inline-details" elementType="span" isOpen>
              <Button>Inside inline collapse</Button>
            </Collapse>
          </NavigationItem>
        </Navigation>
      </Toolbar>,
    );

    expect(screen.getByText('Inside modal').closest('button')).not.toHaveAttribute('tabindex');
    expect(screen.getByText('Inside collapse').closest('button')).not.toHaveAttribute('tabindex');
    expect(screen.getByText('Inside inline collapse').closest('button')).not.toHaveAttribute('tabindex');
  });

  it('should make a Dropdown trigger the item and leave its popover alone', async () => {
    const user = userEvent.setup();
    render(
      <Toolbar aria-label="CV actions">
        <Navigation>
          <NavigationItem>
            <NavigationAction href="#">Edit</NavigationAction>
          </NavigationItem>
          <NavigationItem>
            <Dropdown id="more" isOpen onToggle={() => {}}>
              <DropdownTrigger elementType={Button}>More</DropdownTrigger>
              <DropdownPopover aria-label="Options">
                <Button>Rename</Button>
                <Button>Delete</Button>
              </DropdownPopover>
            </Dropdown>
          </NavigationItem>
        </Navigation>
      </Toolbar>,
    );

    expect(screen.getByRole('button', { name: 'More' })).toHaveAttribute('tabindex', '-1');
    expect(screen.getByRole('button', { name: 'Rename' })).not.toHaveAttribute('tabindex');

    await user.click(screen.getByRole('button', { name: 'Rename' }));
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('button', { name: 'Rename' })).toHaveFocus();
    expect(screen.getByRole('link', { name: 'Edit' })).toHaveAttribute('tabindex', '0');
  });

  it('should join a Button once it stops loading', async () => {
    const user = userEvent.setup();
    const renderWithLoading = (isLoading: boolean) => (
      <Toolbar aria-label="CV actions">
        <Navigation>
          <NavigationItem>
            <NavigationAction href="#">Edit</NavigationAction>
          </NavigationItem>
          <NavigationItem>
            <Button isLoading={isLoading}>Save</Button>
          </NavigationItem>
        </Navigation>
      </Toolbar>
    );
    const { rerender } = render(renderWithLoading(true));

    rerender(renderWithLoading(false));
    await user.tab();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByText('Save').closest('button')).toHaveFocus();
  });

  it('should keep a loading ButtonLink out of the tab order', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Toolbar aria-label="CV actions">
          <Navigation>
            <NavigationItem>
              <NavigationAction href="#">Edit</NavigationAction>
            </NavigationItem>
            <NavigationItem>
              <ButtonLink href="#" isLoading>
                Save
              </ButtonLink>
            </NavigationItem>
          </Navigation>
        </Toolbar>
        <button type="button">After</button>
      </>,
    );

    expect(screen.getByText('Save').closest('a')).toHaveAttribute('tabindex', '-1');

    await user.tab();
    await user.tab();

    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
  });

  it('should skip hidden items', async () => {
    const user = userEvent.setup();
    render(
      <Toolbar aria-label="CV actions">
        <Navigation>
          <NavigationItem>
            <NavigationAction href="#" hidden>
              Hidden
            </NavigationAction>
          </NavigationItem>
          <NavigationItem>
            <NavigationAction href="#">Edit</NavigationAction>
          </NavigationItem>
          <NavigationItem>
            <NavigationAction href="#">Download</NavigationAction>
          </NavigationItem>
        </Navigation>
      </Toolbar>,
    );

    expect(screen.getByRole('link', { name: 'Edit' })).toHaveAttribute('tabindex', '0');

    await user.tab();
    await user.keyboard('{End}{ArrowRight}');

    expect(screen.getByRole('link', { name: 'Edit' })).toHaveFocus();
  });

  it('should move the tab stop away from an item that gets natively disabled', () => {
    const renderWithDisabled = (isDisabled: boolean) => (
      <Toolbar aria-label="CV actions">
        <Navigation>
          <NavigationItem>
            <NavigationAction elementType="button" type="button" disabled={isDisabled}>
              Edit
            </NavigationAction>
          </NavigationItem>
          <NavigationItem>
            <NavigationAction href="#">Download</NavigationAction>
          </NavigationItem>
        </Navigation>
      </Toolbar>
    );
    const { rerender } = render(renderWithDisabled(false));

    rerender(renderWithDisabled(true));

    expect(screen.getByRole('link', { name: 'Download' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('link', { name: 'Download' })).not.toHaveFocus();
  });

  it('should move focus when the focused control becomes disabled', async () => {
    const user = userEvent.setup();
    const renderWithDisabled = (isDisabled: boolean) => (
      <Toolbar aria-label="CV actions">
        <Navigation>
          <NavigationItem>
            <NavigationAction elementType="button" type="button" disabled={isDisabled}>
              Edit
            </NavigationAction>
          </NavigationItem>
          <NavigationItem>
            <NavigationAction href="#">Download</NavigationAction>
          </NavigationItem>
        </Navigation>
      </Toolbar>
    );
    const { rerender } = render(renderWithDisabled(false));

    await user.click(screen.getByRole('button', { name: 'Edit' }));
    rerender(renderWithDisabled(true));

    expect(screen.getByRole('link', { name: 'Download' })).toHaveFocus();
  });

  it('should move focus when a focused NavigationAction is replaced by a disabled span', async () => {
    const user = userEvent.setup();
    const renderWithDisabled = (isDisabled: boolean) => (
      <Toolbar aria-label="CV actions">
        <Navigation>
          <NavigationItem>
            <NavigationAction href="#" isDisabled={isDisabled}>
              Edit
            </NavigationAction>
          </NavigationItem>
          <NavigationItem>
            <NavigationAction href="#">Download</NavigationAction>
          </NavigationItem>
        </Navigation>
      </Toolbar>
    );
    const { rerender } = render(renderWithDisabled(false));

    await user.click(screen.getByRole('link', { name: 'Edit' }));
    rerender(renderWithDisabled(true));

    expect(screen.getByRole('link', { name: 'Download' })).toHaveFocus();
  });

  it('should not move focus when a NavigationAction is disabled after focus has left', async () => {
    const user = userEvent.setup();
    const renderWithDisabled = (isDisabled: boolean) => (
      <>
        <Toolbar aria-label="CV actions">
          <Navigation>
            <NavigationItem>
              <NavigationAction href="#" isDisabled={isDisabled}>
                Edit
              </NavigationAction>
            </NavigationItem>
            <NavigationItem>
              <NavigationAction href="#">Download</NavigationAction>
            </NavigationItem>
          </Navigation>
        </Toolbar>
        <button type="button">After</button>
      </>
    );
    const { rerender } = render(renderWithDisabled(false));

    await user.click(screen.getByRole('link', { name: 'Edit' }));
    await user.click(screen.getByRole('button', { name: 'After' }));
    rerender(renderWithDisabled(true));

    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
  });

  it('should move the tab stop when a class hides the active control', async () => {
    render(
      <Toolbar aria-label="CV actions">
        <Navigation>
          <NavigationItem>
            <NavigationAction elementType="button" type="button">
              Edit
            </NavigationAction>
          </NavigationItem>
          <NavigationItem>
            <NavigationAction href="#">Download</NavigationAction>
          </NavigationItem>
        </Navigation>
      </Toolbar>,
    );

    const edit = screen.getByRole('button', { name: 'Edit' });
    const download = screen.getByRole('link', { name: 'Download' });

    expect(edit).toHaveAttribute('tabindex', '0');

    Object.defineProperty(edit, 'checkVisibility', { configurable: true, value: () => false });
    act(() => {
      edit.classList.add('is-hidden');
    });

    await waitFor(() => {
      expect(download).toHaveAttribute('tabindex', '0');
    });

    expect(edit).toHaveAttribute('tabindex', '-1');
  });

  it('should move the tab stop when the active control hides itself without rendering the toolbar', async () => {
    const user = userEvent.setup();
    const HidingItem = () => {
      const [isHidden, setIsHidden] = useState(false);

      return (
        <NavigationItem>
          <Button hidden={isHidden} onClick={() => setIsHidden(true)}>
            Hide me
          </Button>
        </NavigationItem>
      );
    };
    render(
      <Toolbar aria-label="CV actions">
        <Navigation>
          <HidingItem />
          <NavigationItem>
            <NavigationAction href="#">Download</NavigationAction>
          </NavigationItem>
        </Navigation>
      </Toolbar>,
    );

    await user.click(screen.getByRole('button', { name: 'Hide me' }));

    await waitFor(() => expect(screen.getByRole('link', { name: 'Download' })).toHaveFocus());
  });

  it('should follow the DOM order regardless of the mount order', () => {
    const { rerender } = render(
      <Toolbar aria-label="CV actions">
        <Navigation>
          <NavigationItem key="second">
            <Button>Second</Button>
          </NavigationItem>
        </Navigation>
      </Toolbar>,
    );

    rerender(
      <Toolbar aria-label="CV actions">
        <Navigation>
          <NavigationItem key="first">
            <Button>First</Button>
          </NavigationItem>
          <NavigationItem key="second">
            <Button>Second</Button>
          </NavigationItem>
        </Navigation>
      </Toolbar>,
    );

    expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('tabindex', '-1');
  });

  it('should move the tab stop to the first item when the active one unmounts', async () => {
    const user = userEvent.setup();
    const first = (
      <NavigationItem key="first">
        <Button>First</Button>
      </NavigationItem>
    );
    const second = (
      <NavigationItem key="second">
        <Button>Second</Button>
      </NavigationItem>
    );
    const renderItems = (hasSecond: boolean) => (
      <Toolbar aria-label="CV actions">
        <Navigation>{hasSecond ? [first, second] : [first]}</Navigation>
      </Toolbar>
    );
    const { rerender } = render(renderItems(true));

    await user.click(screen.getByRole('button', { name: 'Second' }));
    rerender(renderItems(false));

    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('tabindex', '0');
  });

  it('should compose consumer focus and keydown handlers', async () => {
    const user = userEvent.setup();
    const onFocus = jest.fn();
    const onKeyDown = jest.fn();
    render(
      <Toolbar aria-label="CV actions" onFocus={onFocus} onKeyDown={onKeyDown}>
        <Navigation>
          <NavigationItem>
            <Button>First</Button>
          </NavigationItem>
          <NavigationItem>
            <Button>Second</Button>
          </NavigationItem>
        </Navigation>
      </Toolbar>,
    );

    await user.tab();
    await user.keyboard('{ArrowRight}');

    expect(onFocus).toHaveBeenCalled();
    expect(onKeyDown).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Second' })).toHaveFocus();
  });

  it('should forward the ref of the toolbar', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Toolbar aria-label="CV actions" ref={ref}>
        <Navigation>
          <NavigationItem>
            <Button>Share</Button>
          </NavigationItem>
        </Navigation>
      </Toolbar>,
    );

    expect(ref.current).toBe(screen.getByRole('toolbar'));
  });

  it('should keep the refs of the item controls', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <Toolbar aria-label="CV actions">
        <Navigation>
          <NavigationItem>
            <Button ref={ref}>Share</Button>
          </NavigationItem>
        </Navigation>
      </Toolbar>,
    );

    expect(ref.current).toBe(screen.getByRole('button', { name: 'Share' }));
  });
});
