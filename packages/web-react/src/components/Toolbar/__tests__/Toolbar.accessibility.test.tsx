import React from 'react';
import { accessibilityTest } from '@local/tests';
import { Navigation, NavigationAction, NavigationItem } from '../../Navigation';
import Toolbar from '../Toolbar';

jest.mock('../../../hooks/useIcon');

describe('Toolbar accessibility', () => {
  accessibilityTest(
    (props) => (
      <Toolbar {...props} aria-label="CV actions" orientation="vertical">
        <Navigation>
          <NavigationItem>
            <NavigationAction href="#">Edit</NavigationAction>
          </NavigationItem>
          <NavigationItem>
            <NavigationAction elementType="button" type="button">
              Share
            </NavigationAction>
          </NavigationItem>
        </Navigation>
      </Toolbar>
    ),
    '[role="toolbar"]',
  );
});
