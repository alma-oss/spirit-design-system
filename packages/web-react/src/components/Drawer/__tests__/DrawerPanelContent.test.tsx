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
import DrawerPanelContent from '../DrawerPanelContent';

describe('DrawerPanelContent', () => {
  classNamePrefixProviderTest(DrawerPanelContent, 'DrawerPanel__content');

  stylePropsTest(DrawerPanelContent);

  restPropsTest(DrawerPanelContent, 'div');

  validHtmlAttributesTest(DrawerPanelContent);

  ariaAttributesTest(DrawerPanelContent);

  it('should render with correct class', () => {
    render(<DrawerPanelContent data-testid="test" />);

    expect(screen.getByTestId('test')).toHaveClass('DrawerPanel__content');
  });

  it('should render children', () => {
    render(<DrawerPanelContent data-testid="test">Test content</DrawerPanelContent>);

    expect(screen.getByTestId('test')).toHaveTextContent('Test content');
  });

  it('should not render the spacing modifier by default', () => {
    render(<DrawerPanelContent data-testid="test">Test content</DrawerPanelContent>);

    expect(screen.getByTestId('test')).not.toHaveClass('DrawerPanel__content--hasSpacing');
  });

  it('should render the spacing modifier when hasSpacing is set', () => {
    render(
      <DrawerPanelContent data-testid="test" hasSpacing>
        Test content
      </DrawerPanelContent>,
    );

    expect(screen.getByTestId('test')).toHaveClass('DrawerPanel__content--hasSpacing');
  });
});
