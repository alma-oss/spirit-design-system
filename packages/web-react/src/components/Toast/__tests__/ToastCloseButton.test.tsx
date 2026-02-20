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
import ToastCloseButton from '../ToastCloseButton';

jest.mock('../../../hooks/useIcon');

describe('ToastCloseButton', () => {
  const defaultProps = {
    id: 'test-toast',
    isOpen: true,
    closeLabel: 'Close',
    isDismissible: true,
    onClose: jest.fn(),
  };

  classNamePrefixProviderTest((props) => <ToastCloseButton {...defaultProps} {...props} />, 'ControlButton');

  stylePropsTest((props) => <ToastCloseButton {...defaultProps} {...props} />);

  restPropsTest((props) => <ToastCloseButton {...defaultProps} {...props} />, 'button');

  validHtmlAttributesTest((props) => <ToastCloseButton {...defaultProps} {...props} />);

  ariaAttributesTest((props) => <ToastCloseButton {...defaultProps} {...props} />);

  it('should render close button when isDismissible is true and onClose is provided', () => {
    render(<ToastCloseButton {...defaultProps} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should not render when isDismissible is false', () => {
    render(<ToastCloseButton {...defaultProps} isDismissible={false} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should not render when onClose is not provided', () => {
    render(
      <ToastCloseButton
        id={defaultProps.id}
        isOpen={defaultProps.isOpen}
        closeLabel={defaultProps.closeLabel}
        isDismissible={defaultProps.isDismissible}
      />,
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should not render when isDismissible is false even if onClose is provided', () => {
    render(<ToastCloseButton {...defaultProps} isDismissible={false} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should have close icon with aria-hidden', () => {
    render(<ToastCloseButton {...defaultProps} />);

    const svg = screen.getByRole('button').firstElementChild;

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('should have visually hidden label', () => {
    render(<ToastCloseButton {...defaultProps} closeLabel="Close toast" />);

    const buttonText = screen.getByRole('button').lastElementChild;
    expect(buttonText?.textContent).toBe('Close toast');
    expect(buttonText).toHaveClass('accessibility-hidden');
  });

  it('should be symmetrical', () => {
    render(<ToastCloseButton {...defaultProps} />);

    expect(screen.getByRole('button')).toHaveClass('ControlButton--symmetrical');
  });

  it('should handle onClose click', () => {
    const mockedOnClose = jest.fn();
    render(<ToastCloseButton {...defaultProps} onClose={mockedOnClose} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockedOnClose).toHaveBeenCalledTimes(1);
  });

  it('should have aria-expanded attribute', () => {
    render(<ToastCloseButton {...defaultProps} isOpen />);

    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('should have aria-expanded false when isOpen is false', () => {
    render(<ToastCloseButton {...defaultProps} isOpen={false} />);

    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
  });

  it('should have aria-controls attribute', () => {
    render(<ToastCloseButton {...defaultProps} id="my-toast" />);

    expect(screen.getByRole('button')).toHaveAttribute('aria-controls', 'my-toast');
  });

  it('should apply UNSAFE_className from styleProps', () => {
    render(<ToastCloseButton {...defaultProps} UNSAFE_className="custom-class" />);

    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('should apply UNSAFE_style from styleProps', () => {
    render(<ToastCloseButton {...defaultProps} UNSAFE_style={{ marginTop: '10px' }} />);

    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ marginTop: '10px' });
  });

  it('should return null and not throw when both isDismissible and onClose are falsy', () => {
    const { container } = render(
      <ToastCloseButton id="test" isOpen={false} closeLabel="Close" isDismissible={false} />,
    );

    expect(container.firstChild).toBeNull();
  });
});
