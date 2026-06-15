import React from 'react';
import { accessibilityTest } from '@local/tests';
import Header from '../Header';

describe('Header accessibility', () => {
  accessibilityTest((props) => <Header {...props}>Content</Header>, 'header');
});
