import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ariaAttributesTest, restPropsTest, stylePropsTest, validHtmlAttributesTest } from '@local/tests';
import DrawerCloseButton from '../DrawerCloseButton';

jest.mock('../../../hooks/useIcon');

describe('DrawerCloseButton', () => {
  stylePropsTest(DrawerCloseButton);

  restPropsTest(DrawerCloseButton, 'button');

  validHtmlAttributesTest(DrawerCloseButton);

  ariaAttributesTest(DrawerCloseButton);

  it('should render drawer close button', () => {
    render(<DrawerCloseButton />);

    expect(screen.getByRole('button')).toHaveClass('ControlButton');
  });

  it('should render with correct classes', () => {
    render(<DrawerCloseButton data-testid="test" />);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('ControlButton', 'ControlButton--large', 'ControlButton--symmetrical');
  });
});
