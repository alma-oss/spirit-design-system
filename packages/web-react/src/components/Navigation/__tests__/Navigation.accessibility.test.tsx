import React from 'react';
import { accessibilityTest } from '@local/tests';
import Navigation from '../Navigation';
import NavigationAction from '../NavigationAction';
import NavigationItem from '../NavigationItem';

jest.mock('../../../hooks/useIcon');

describe('Navigation accessibility', () => {
  accessibilityTest(
    (props) => (
      <Navigation {...props} aria-label="Main Navigation">
        <NavigationItem>
          <NavigationAction href="#">Home</NavigationAction>
        </NavigationItem>
        <NavigationItem>
          <NavigationAction href="#">About</NavigationAction>
        </NavigationItem>
      </Navigation>
    ),
    'nav',
  );

  describe('as toolbar', () => {
    accessibilityTest(
      (props) => (
        <Navigation {...props} role="toolbar" aria-label="CV actions" direction="vertical">
          <NavigationItem>
            <NavigationAction href="#">Edit</NavigationAction>
          </NavigationItem>
          <NavigationItem>
            <NavigationAction elementType="button" type="button">
              Share
            </NavigationAction>
          </NavigationItem>
        </Navigation>
      ),
      '[role="toolbar"]',
    );
  });
});
