import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { type DirectionDictionaryType } from '../../../types';
import { Button } from '../../Button';
import { ButtonLink } from '../../ButtonLink';
import { Collapse } from '../../Collapse';
import { Modal, ModalBody, ModalDialog } from '../../Modal';
import Navigation from '../Navigation';
import NavigationAction from '../NavigationAction';
import NavigationAvatar from '../NavigationAvatar';
import NavigationItem from '../NavigationItem';

jest.mock('../../../hooks/useIcon');

const renderToolbar = ({
  direction,
  isSecondDisabled = false,
}: { direction?: DirectionDictionaryType; isSecondDisabled?: boolean } = {}) =>
  render(
    <>
      <button type="button">Before</button>
      <Navigation role="toolbar" aria-label="CV actions" direction={direction}>
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
      <button type="button">After</button>
    </>,
  );

const focusToolbar = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole('button', { name: 'Before' }));
  await user.tab();
};

describe('Navigation as toolbar', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render a toolbar with orientation derived from direction', () => {
    renderToolbar({ direction: 'vertical' });

    expect(screen.getByRole('toolbar', { name: 'CV actions' })).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('should render as div by default', () => {
    renderToolbar();

    expect(screen.getByRole('toolbar').localName).toBe('div');
  });

  describe('development warnings', () => {
    let warn: jest.SpyInstance;

    beforeEach(() => {
      warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    it('should render a div when elementType is nav', () => {
      render(
        <Navigation role="toolbar" elementType="nav" aria-label="CV actions">
          <NavigationItem>
            <Button>Share</Button>
          </NavigationItem>
        </Navigation>,
      );

      expect(screen.getByRole('toolbar').localName).toBe('div');
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('not allowed on `nav`'));
    });

    it('should warn when a toolbar has no accessible name', () => {
      render(
        <Navigation role="toolbar">
          <NavigationItem>
            <Button>Share</Button>
          </NavigationItem>
        </Navigation>,
      );

      expect(warn).toHaveBeenCalledWith(expect.stringContaining('aria-label'));
    });
  });

  it('should not expose list semantics', () => {
    renderToolbar();

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('should default the orientation to horizontal', () => {
    renderToolbar();

    expect(screen.getByRole('toolbar')).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('should not touch the items when not a toolbar', () => {
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

    expect(screen.getByRole('navigation')).not.toHaveAttribute('aria-orientation');
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
    renderToolbar({ direction: 'vertical' });

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

  it('should include ButtonLink and NavigationAvatar', async () => {
    const user = userEvent.setup();
    render(
      <Navigation role="toolbar" aria-label="CV actions">
        <NavigationItem>
          <ButtonLink href="#">Preview</ButtonLink>
        </NavigationItem>
        <NavigationItem>
          <NavigationAvatar href="#" avatarContent="JB" aria-label="Profile">
            Profile
          </NavigationAvatar>
        </NavigationItem>
      </Navigation>,
    );

    await user.tab();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('link', { name: 'Profile' })).toHaveFocus();
  });

  it('should leave out a non-interactive NavigationAvatar', () => {
    render(
      <Navigation role="toolbar" aria-label="CV actions">
        <NavigationItem>
          <NavigationAvatar elementType="div" avatarContent="JB" data-testid="avatar">
            Profile
          </NavigationAvatar>
        </NavigationItem>
      </Navigation>,
    );

    expect(screen.getByTestId('avatar')).not.toHaveAttribute('tabindex');
  });

  it('should keep a native button that has not joined the toolbar as its own tab stop', async () => {
    const user = userEvent.setup();
    render(
      <Navigation role="toolbar" aria-label="CV actions">
        <NavigationItem>
          <NavigationAction href="#">Edit</NavigationAction>
        </NavigationItem>
        <NavigationItem>
          <button type="button">Custom</button>
        </NavigationItem>
      </Navigation>,
    );

    await user.tab();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('link', { name: 'Edit' })).toHaveFocus();

    await user.tab();

    expect(screen.getByRole('button', { name: 'Custom' })).toHaveFocus();
  });

  it('should leave keys already handled by an item alone', async () => {
    const user = userEvent.setup();
    render(
      <Navigation role="toolbar" aria-label="CV actions">
        <NavigationItem>
          <Button onKeyDown={(event) => event.preventDefault()}>Menu</Button>
        </NavigationItem>
        <NavigationItem>
          <NavigationAction href="#">Edit</NavigationAction>
        </NavigationItem>
      </Navigation>,
    );

    await user.tab();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('button', { name: 'Menu' })).toHaveFocus();
  });

  it('should keep the controls of an overlay inside the toolbar out of it', () => {
    render(
      <Navigation role="toolbar" aria-label="CV actions">
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
        </NavigationItem>
      </Navigation>,
    );

    expect(screen.getByText('Inside modal').closest('button')).not.toHaveAttribute('tabindex');
    expect(screen.getByText('Inside collapse').closest('button')).not.toHaveAttribute('tabindex');
  });

  it('should join a Button once it stops loading', async () => {
    const user = userEvent.setup();
    const renderWithLoading = (isLoading: boolean) => (
      <Navigation role="toolbar" aria-label="CV actions">
        <NavigationItem>
          <NavigationAction href="#">Edit</NavigationAction>
        </NavigationItem>
        <NavigationItem>
          <Button isLoading={isLoading}>Save</Button>
        </NavigationItem>
      </Navigation>
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
        <Navigation role="toolbar" aria-label="CV actions">
          <NavigationItem>
            <NavigationAction href="#">Edit</NavigationAction>
          </NavigationItem>
          <NavigationItem>
            <ButtonLink href="#" isLoading>
              Save
            </ButtonLink>
          </NavigationItem>
        </Navigation>
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
      <Navigation role="toolbar" aria-label="CV actions">
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
      </Navigation>,
    );

    expect(screen.getByRole('link', { name: 'Edit' })).toHaveAttribute('tabindex', '0');

    await user.tab();
    await user.keyboard('{End}{ArrowRight}');

    expect(screen.getByRole('link', { name: 'Edit' })).toHaveFocus();
  });

  it('should move the tab stop away from an item that gets natively disabled', () => {
    const renderWithDisabled = (isDisabled: boolean) => (
      <Navigation role="toolbar" aria-label="CV actions">
        <NavigationItem>
          <NavigationAction elementType="button" type="button" disabled={isDisabled}>
            Edit
          </NavigationAction>
        </NavigationItem>
        <NavigationItem>
          <NavigationAction href="#">Download</NavigationAction>
        </NavigationItem>
      </Navigation>
    );
    const { rerender } = render(renderWithDisabled(false));

    rerender(renderWithDisabled(true));

    expect(screen.getByRole('link', { name: 'Download' })).toHaveAttribute('tabindex', '0');
  });

  it('should keep the controls of an open inline Collapse out of the toolbar', () => {
    render(
      <Navigation role="toolbar" aria-label="CV actions">
        <NavigationItem>
          <NavigationAction href="#">Edit</NavigationAction>
          <Collapse id="details" elementType="span" isOpen>
            <Button>Inside collapse</Button>
          </Collapse>
        </NavigationItem>
      </Navigation>,
    );

    expect(screen.getByText('Inside collapse').closest('button')).not.toHaveAttribute('tabindex');
  });

  it('should forward the ref of the toolbar', () => {
    const ref = React.createRef<HTMLElement>();
    render(
      <Navigation role="toolbar" aria-label="CV actions" ref={ref}>
        <NavigationItem>
          <Button>Share</Button>
        </NavigationItem>
      </Navigation>,
    );

    expect(ref.current).toBe(screen.getByRole('toolbar'));
  });

  it('should skip natively disabled items with arrow keys', async () => {
    const user = userEvent.setup();
    render(
      <Navigation role="toolbar" aria-label="CV actions">
        <NavigationItem>
          <NavigationAction href="#">Edit</NavigationAction>
        </NavigationItem>
        <NavigationItem>
          <NavigationAction elementType="button" type="button" disabled>
            Download
          </NavigationAction>
        </NavigationItem>
        <NavigationItem>
          <Button>Share</Button>
        </NavigationItem>
      </Navigation>,
    );

    await user.tab();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('button', { name: 'Share' })).toHaveFocus();
  });

  it('should forward refs of the items', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <Navigation role="toolbar" aria-label="CV actions">
        <NavigationItem>
          <Button ref={ref}>Share</Button>
        </NavigationItem>
      </Navigation>,
    );

    expect(ref.current).toBe(screen.getByRole('button', { name: 'Share' }));
  });
});
