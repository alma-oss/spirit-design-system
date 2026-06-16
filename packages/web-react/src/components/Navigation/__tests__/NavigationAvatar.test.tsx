import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  elementTypePropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { SizesExtended } from '../../../constants';
import { ContextPropsProvider } from '../../../context';
import { Dropdown, DropdownPopover, DropdownTrigger } from '../../Dropdown';
import { Icon } from '../../Icon';
import NavigationAvatar from '../NavigationAvatar';

jest.mock('../../../hooks/useIcon');

const avatarContentMock = <Icon name="profile" />;

describe('NavigationAvatar', () => {
  classNamePrefixProviderTest(NavigationAvatar, 'NavigationAvatar');

  stylePropsTest(NavigationAvatar);

  restPropsTest(NavigationAvatar, 'a');

  validHtmlAttributesTest(NavigationAvatar);

  ariaAttributesTest(NavigationAvatar);

  elementTypePropsTest(NavigationAvatar);

  describe('default props', () => {
    beforeEach(() => {
      render(
        <NavigationAvatar avatarContent={avatarContentMock} href="/">
          Content
        </NavigationAvatar>,
      );
    });

    it('should have default classname', () => {
      expect(screen.getByRole('link')).toHaveClass('NavigationAvatar');
    });

    it('should render avatarContent', () => {
      const avatarContentElement = screen.getByRole('link').firstChild;

      expect(avatarContentElement).toHaveClass('Avatar Avatar--small');
      expect(avatarContentElement?.firstChild).toContainHTML('svg');
    });

    it('should render children', () => {
      expect(screen.getByRole('link')).toHaveTextContent('Content');
    });
  });

  it('should have square classname', () => {
    render(
      <NavigationAvatar avatarContent={avatarContentMock} href="/" isSquare>
        Content
      </NavigationAvatar>,
    );

    expect(screen.getByRole('link')).toHaveClass('NavigationAvatar--square');
  });

  it('should have correct elementType', () => {
    render(
      <NavigationAvatar avatarContent={avatarContentMock} elementType="button">
        Content
      </NavigationAvatar>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should apply navigationAvatar props from context when direct props are not provided', () => {
    render(
      <ContextPropsProvider value={{ navigationAvatar: { elementType: 'button' } }}>
        <NavigationAvatar avatarContent={avatarContentMock}>Content</NavigationAvatar>
      </ContextPropsProvider>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should prefer direct navigationAvatar props over context props', () => {
    render(
      <ContextPropsProvider value={{ navigationAvatar: { elementType: 'button' } }}>
        <NavigationAvatar avatarContent={avatarContentMock} elementType="div">
          Content
        </NavigationAvatar>
      </ContextPropsProvider>,
    );

    expect(screen.getByText('Content').localName).toBe('div');
  });

  it('should not consume props from a different namespace', () => {
    render(
      <ContextPropsProvider value={{ tag: { elementType: 'button' } }}>
        <NavigationAvatar avatarContent={avatarContentMock} href="/">
          Content
        </NavigationAvatar>
      </ContextPropsProvider>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should render as a button when used as DropdownTrigger', () => {
    render(
      <Dropdown id="navigation-avatar-dropdown" isOpen={false} onToggle={jest.fn()}>
        <DropdownTrigger elementType={NavigationAvatar} avatarContent={avatarContentMock} aria-label="Profile">
          Content
        </DropdownTrigger>
        <DropdownPopover>Options</DropdownPopover>
      </Dropdown>,
    );

    expect(screen.getByRole('button', { name: 'Profile' })).toHaveClass('NavigationAvatar');
  });

  it.each(Object.values(SizesExtended))('should render %s size avatar', (size) => {
    render(
      <NavigationAvatar avatarContent={avatarContentMock} href="/" avatarSize={size}>
        Content
      </NavigationAvatar>,
    );
    const avatarContentElement = screen.getByRole('link').firstChild;

    expect(avatarContentElement).toHaveClass(`Avatar Avatar--${size}`);
  });

  it('should apply responsive size classes when responsive avatarSize is provided', () => {
    render(
      <NavigationAvatar
        avatarContent={avatarContentMock}
        avatarSize={{ mobile: 'small', tablet: 'medium', desktop: 'large' }}
        href="/"
      >
        Content
      </NavigationAvatar>,
    );
    const avatarContentElement = screen.getByRole('link').firstChild;

    expect(avatarContentElement).toHaveClass('Avatar Avatar--small Avatar--tablet--medium Avatar--desktop--large');
  });
});
