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

  it('should render with correct class for content', () => {
    render(<DrawerPanel data-testid="test">Test content</DrawerPanel>);

    expect(screen.getByText('Test content')).toHaveClass('DrawerPanel__content');
    expect(screen.getByText('Test content')).toContainHTML('div');
  });

  it('should render the close button inside the panel header', () => {
    render(
      <DrawerPanel data-testid="test" closeButton={<button type="button">Close</button>}>
        Test content
      </DrawerPanel>,
    );

    const closeButton = screen.getByRole('button', { name: 'Close' });

    expect(closeButton).toBeInTheDocument();
    expect(closeButton.parentElement).toHaveClass('DrawerPanel__header');
  });

  it('should not render the panel header when no close button is provided', () => {
    const { container } = render(<DrawerPanel data-testid="test">Test content</DrawerPanel>);

    expect(container.querySelector('.DrawerPanel__header')).not.toBeInTheDocument();
  });
});
