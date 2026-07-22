import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { accessibilityTest } from '@local/tests';
import { Icon } from '../../Icon';
import Navigation from '../Navigation';
import NavigationAvatar from '../NavigationAvatar';
import NavigationItem from '../NavigationItem';

jest.mock('../../../hooks/useIcon');

describe('NavigationAvatar accessibility', () => {
  accessibilityTest(
    (props) => (
      <Navigation aria-label="Main Navigation">
        <NavigationItem>
          <NavigationAvatar
            {...props}
            avatarContent={<Icon name="profile" />}
            href="#"
            aria-label="Profile of Jiří Bárta"
          >
            My Account
          </NavigationAvatar>
        </NavigationItem>
      </Navigation>
    ),
    '[aria-label="Profile of Jiří Bárta"]',
  );

  accessibilityTest(
    (props) => (
      <Navigation aria-label="Main Navigation">
        <NavigationItem>
          <NavigationAvatar {...props} avatarContent={<Icon name="profile" />} elementType="div">
            My Account
          </NavigationAvatar>
        </NavigationItem>
      </Navigation>
    ),
    '.NavigationAvatar',
  );

  it('should mark inner Avatar as decorative', () => {
    const { container } = render(
      <NavigationAvatar avatarContent={<Icon name="profile" />} href="#">
        My Account
      </NavigationAvatar>,
    );

    expect(container.querySelector('.Avatar')).toHaveAttribute('aria-hidden', 'true');
  });
});
