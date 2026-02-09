import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import TooltipCloseButton from '../TooltipCloseButton';

jest.mock('../../../hooks/useIcon');
jest.mock('../../../hooks/useI18n', () => ({
  useI18n: () => ({
    t: (key: string) => (key === 'common.close' ? 'Close' : key),
  }),
}));

describe('TooltipCloseButton', () => {
  classNamePrefixProviderTest(TooltipCloseButton, 'ControlButton');

  stylePropsTest(TooltipCloseButton);

  restPropsTest(TooltipCloseButton, 'button');

  validHtmlAttributesTest(TooltipCloseButton);

  ariaAttributesTest(TooltipCloseButton);

  it('should render close button', () => {
    render(<TooltipCloseButton />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should have close icon with aria-hidden', () => {
    render(<TooltipCloseButton />);

    const svg = screen.getByRole('button').firstElementChild;

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('should have visually hidden label with default translation', () => {
    render(<TooltipCloseButton />);

    const buttonText = screen.getByRole('button').lastElementChild;
    expect(buttonText?.textContent).toBe('Close');
    expect(buttonText).toHaveClass('accessibility-hidden');
  });

  it('should use custom label when provided', () => {
    render(<TooltipCloseButton label="Close tooltip" />);

    const buttonText = screen.getByRole('button').lastElementChild;
    expect(buttonText?.textContent).toBe('Close tooltip');
    expect(buttonText).toHaveClass('accessibility-hidden');
  });

  it('should be symmetrical', () => {
    render(<TooltipCloseButton />);

    expect(screen.getByRole('button')).toHaveClass('ControlButton--symmetrical');
  });

  it('should have aria-expanded attribute set to true', () => {
    render(<TooltipCloseButton />);

    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('should handle onClick', () => {
    const mockedOnClick = jest.fn();
    render(<TooltipCloseButton onClick={mockedOnClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockedOnClick).toHaveBeenCalledTimes(1);
  });

  it('should pass click event to onClick handler', () => {
    const mockedOnClick = jest.fn();
    render(<TooltipCloseButton onClick={mockedOnClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockedOnClick).toHaveBeenCalledWith(expect.any(Object));
    expect(mockedOnClick.mock.calls[0][0]).toHaveProperty('type', 'click');
  });

  it('should not throw when onClick is not provided', () => {
    expect(() => {
      render(<TooltipCloseButton />);
      const button = screen.getByRole('button');
      fireEvent.click(button);
    }).not.toThrow();
  });

  it('should apply UNSAFE_className from styleProps', () => {
    render(<TooltipCloseButton UNSAFE_className="custom-class" />);

    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('should apply UNSAFE_style from styleProps', () => {
    render(<TooltipCloseButton UNSAFE_style={{ marginTop: '10px' }} />);

    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ marginTop: '10px' });
  });
});
