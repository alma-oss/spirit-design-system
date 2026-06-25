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
import DrawerPanelHeader from '../DrawerPanelHeader';

describe('DrawerPanelHeader', () => {
  classNamePrefixProviderTest(DrawerPanelHeader, 'DrawerPanel__header');

  stylePropsTest(DrawerPanelHeader);

  restPropsTest(DrawerPanelHeader, 'div');

  validHtmlAttributesTest(DrawerPanelHeader);

  ariaAttributesTest(DrawerPanelHeader);

  it('should render with correct class', () => {
    render(<DrawerPanelHeader data-testid="test" />);

    expect(screen.getByTestId('test')).toHaveClass('DrawerPanel__header');
  });

  it('should render children', () => {
    render(
      <DrawerPanelHeader>
        <button type="button">Close</button>
      </DrawerPanelHeader>,
    );

    const closeButton = screen.getByRole('button', { name: 'Close' });

    expect(closeButton).toBeInTheDocument();
    expect(closeButton.parentElement).toHaveClass('DrawerPanel__header');
  });
});
