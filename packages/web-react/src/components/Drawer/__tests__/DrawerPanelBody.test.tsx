import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import DrawerPanelBody from '../DrawerPanelBody';

describe('DrawerPanelBody', () => {
  classNamePrefixProviderTest(DrawerPanelBody, 'DrawerPanelBody');

  stylePropsTest(DrawerPanelBody);

  restPropsTest(DrawerPanelBody, 'div');

  validHtmlAttributesTest(DrawerPanelBody);

  ariaAttributesTest(DrawerPanelBody);

  it('should render with correct class', () => {
    render(<DrawerPanelBody data-testid="test" />);

    expect(screen.getByTestId('test')).toHaveClass('DrawerPanelBody');
  });

  it('should render children', () => {
    render(<DrawerPanelBody data-testid="test">Test content</DrawerPanelBody>);

    expect(screen.getByTestId('test')).toHaveTextContent('Test content');
  });

  it('should not render the spacing modifier by default', () => {
    render(<DrawerPanelBody data-testid="test">Test content</DrawerPanelBody>);

    expect(screen.getByTestId('test')).not.toHaveClass('DrawerPanelBody--spacing');
  });

  it('should render the spacing modifier when hasSpacing is set', () => {
    render(
      <DrawerPanelBody data-testid="test" hasSpacing>
        Test content
      </DrawerPanelBody>,
    );

    expect(screen.getByTestId('test')).toHaveClass('DrawerPanelBody--spacing');
  });
});
