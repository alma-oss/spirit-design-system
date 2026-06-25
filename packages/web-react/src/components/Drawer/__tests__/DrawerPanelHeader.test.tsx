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
  classNamePrefixProviderTest(DrawerPanelHeader, 'DrawerPanelHeader');

  stylePropsTest(DrawerPanelHeader);

  restPropsTest(DrawerPanelHeader, 'header');

  validHtmlAttributesTest(DrawerPanelHeader);

  ariaAttributesTest(DrawerPanelHeader);

  it('should render with correct class', () => {
    render(<DrawerPanelHeader />);

    expect(screen.getByRole('banner')).toHaveClass('DrawerPanelHeader');
  });

  it('should render children', () => {
    render(
      <DrawerPanelHeader>
        <button type="button">Close</button>
      </DrawerPanelHeader>,
    );

    const closeButton = screen.getByRole('button', { name: 'Close' });

    expect(closeButton).toBeInTheDocument();
  });
});
