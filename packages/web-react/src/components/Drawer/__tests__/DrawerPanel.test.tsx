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
import DrawerPanel from '../DrawerPanel';

describe('DrawerPanel', () => {
  classNamePrefixProviderTest(DrawerPanel, 'DrawerPanel');

  stylePropsTest(DrawerPanel);

  restPropsTest(DrawerPanel, 'div');

  validHtmlAttributesTest(DrawerPanel);

  ariaAttributesTest(DrawerPanel);

  elementTypePropsTest(DrawerPanel);

  it('should render drawer panel content', () => {
    render(<DrawerPanel data-testid="test">Test content</DrawerPanel>);

    expect(screen.getByTestId('test')).toHaveTextContent('Test content');
  });

  it('should render with correct class', () => {
    render(<DrawerPanel data-testid="test" />);

    expect(screen.getByTestId('test')).toHaveClass('DrawerPanel');
  });

  it('should render children directly without wrapper', () => {
    render(
      <DrawerPanel data-testid="test">
        <span>Test content</span>
      </DrawerPanel>,
    );

    expect(screen.getByText('Test content').parentElement).toHaveClass('DrawerPanel');
  });
});
