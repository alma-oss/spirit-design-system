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
import ModalCloseButton from '../ModalCloseButton';

jest.mock('../../../hooks/useIcon');

describe('ModalCloseButton', () => {
  classNamePrefixProviderTest(ModalCloseButton, 'Button');

  stylePropsTest(ModalCloseButton);

  restPropsTest(ModalCloseButton, 'button');

  validHtmlAttributesTest(ModalCloseButton);

  ariaAttributesTest(ModalCloseButton);

  it('should have icon', () => {
    render(<ModalCloseButton label="close" id="test" isOpen onClose={() => {}} />);

    const svg = screen.getByRole('button').firstElementChild;

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('should have visually hidden label', () => {
    render(<ModalCloseButton label="close" id="test" isOpen onClose={() => {}} />);

    const buttonText = screen.getByRole('button').lastElementChild;

    expect(buttonText?.textContent).toBe('close');
    expect(buttonText).toHaveClass('accessibility-hidden');
  });

  it('should be symmetrical', () => {
    render(<ModalCloseButton label="close" id="test" isOpen onClose={() => {}} />);

    expect(screen.getByRole('button')).toHaveClass('Button--symmetrical');
  });

  it('should have tertiary color', () => {
    render(<ModalCloseButton label="close" id="test" isOpen onClose={() => {}} />);

    expect(screen.getByRole('button')).toHaveClass('Button--tertiary');
  });

  it('should handle on close click', () => {
    const mockedOnClose = jest.fn();
    render(<ModalCloseButton label="close" id="test" isOpen onClose={mockedOnClose} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockedOnClose).toHaveBeenCalled();
  });
});
