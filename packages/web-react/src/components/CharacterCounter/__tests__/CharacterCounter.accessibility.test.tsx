import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { accessibilityTest } from '@local/tests';
import CharacterCounter from '../CharacterCounter';

describe('CharacterCounter accessibility', () => {
  const defaultProps = {
    currentLength: 0,
    id: 'counter-a11y',
    registerAria: jest.fn(),
    UNSAFE_className: 'TextArea__counter',
  };

  beforeEach(() => {
    defaultProps.registerAria = jest.fn();
  });

  describe('with counterThreshold', () => {
    accessibilityTest(
      () => (
        <CharacterCounter
          id="counter-a11y-threshold"
          registerAria={jest.fn()}
          UNSAFE_className="TextArea__counter"
          counterThreshold={200}
          currentLength={0}
        />
      ),
      '[aria-live="polite"]',
    );
  });

  describe('with hasCounter only', () => {
    accessibilityTest(
      () => (
        <CharacterCounter
          id="counter-a11y-count"
          registerAria={jest.fn()}
          UNSAFE_className="TextArea__counter"
          hasCounter
          currentLength={0}
        />
      ),
      '[aria-live="polite"]',
    );
  });

  describe('aria semantics', () => {
    it('renders visible counter as aria-hidden', () => {
      render(<CharacterCounter {...defaultProps} counterThreshold={200} />);

      expect(screen.getByText('0/200')).toHaveAttribute('aria-hidden', 'true');
    });

    it('renders screen reader message element with polite live-region attributes', () => {
      render(<CharacterCounter {...defaultProps} counterThreshold={200} />);

      const screenReaderMessage = document.getElementById('counter-a11y__counterScreenReaderMessage');

      expect(screenReaderMessage).toBeInTheDocument();
      expect(screenReaderMessage).toHaveAttribute('aria-live', 'polite');
      expect(screenReaderMessage).toHaveAttribute('aria-atomic', 'true');
    });

    it('registers screen reader message id for aria-describedby', () => {
      render(<CharacterCounter {...defaultProps} counterThreshold={200} />);

      expect(defaultProps.registerAria).toHaveBeenCalledWith({ add: 'counter-a11y__counterScreenReaderMessage' });
    });

    it('unregisters screen reader message id on unmount', () => {
      const { unmount } = render(<CharacterCounter {...defaultProps} counterThreshold={200} />);

      unmount();

      expect(defaultProps.registerAria).toHaveBeenCalledWith({ remove: 'counter-a11y__counterScreenReaderMessage' });
    });

    it('does not register aria ids when counter is not visible', () => {
      render(<CharacterCounter {...defaultProps} />);

      expect(defaultProps.registerAria).not.toHaveBeenCalled();
    });
  });
});
