import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  formFieldContextPropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import CharacterCounter from '../CharacterCounter';
import { type SpiritCharacterCounterProps } from '../types';

const characterCounterValidHtmlProps: Pick<
  SpiritCharacterCounterProps,
  'counterThreshold' | 'currentLength' | 'id' | 'registerAria'
> = {
  counterThreshold: 200,
  currentLength: 0,
  id: 'character-counter-valid-html',
  registerAria: jest.fn(),
};

const CharacterCounterForProviderTests = (props: Partial<SpiritCharacterCounterProps>) => (
  <CharacterCounter
    id="character-counter-provider"
    registerAria={jest.fn()}
    counterThreshold={200}
    currentLength={0}
    {...props}
  />
);

/** Renders a visible counter so class-name prefix tests find a root element. */
const CharacterCounterForClassNamePrefixTests = () => (
  <CharacterCounter
    id="character-counter-class-prefix"
    registerAria={jest.fn()}
    counterThreshold={200}
    currentLength={0}
  />
);

describe('CharacterCounter', () => {
  const defaultProps = {
    currentLength: 0,
    id: 'test',
    registerAria: jest.fn(),
  };

  beforeEach(() => {
    defaultProps.registerAria = jest.fn();
  });

  classNamePrefixProviderTest(CharacterCounterForClassNamePrefixTests, 'CharacterCounter');

  validHtmlAttributesTest(CharacterCounter, characterCounterValidHtmlProps);

  ariaAttributesTest(CharacterCounter, characterCounterValidHtmlProps);

  stylePropsTest(CharacterCounterForProviderTests);

  restPropsTest(CharacterCounterForProviderTests, 'div');

  formFieldContextPropsTest({
    classNamePrefix: 'CharacterCounter',
    text: '0/200',
    renderComponent: (props) => (
      <CharacterCounter {...defaultProps} counterThreshold={200} currentLength={0} {...props} />
    ),
  });

  it('should render nothing when neither hasCounter nor counterThreshold is set', () => {
    const { container } = render(<CharacterCounter {...defaultProps} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('should render counter when counterThreshold is set', () => {
    render(<CharacterCounter {...defaultProps} counterThreshold={200} />);

    const counter = screen.getByText('0/200');

    expect(counter).toHaveClass('CharacterCounter');
  });

  it('should render counter when hasCounter is set', () => {
    render(<CharacterCounter {...defaultProps} hasCounter />);

    const counter = screen.getByText('0');

    expect(counter).toHaveClass('CharacterCounter');
  });

  describe('counter text', () => {
    it('should display current/threshold format with counterThreshold', () => {
      render(<CharacterCounter {...defaultProps} counterThreshold={200} currentLength={5} />);

      expect(screen.getByText('5/200')).toHaveClass('CharacterCounter');
    });

    it('should display just the count with hasCounter only', () => {
      render(<CharacterCounter {...defaultProps} hasCounter currentLength={5} />);

      expect(screen.getByText('5')).toHaveClass('CharacterCounter');
    });
  });

  describe('visible counter element', () => {
    it('should use the provided UNSAFE_className', () => {
      const counterClass = 'test__customCounter';

      render(<CharacterCounter {...defaultProps} counterThreshold={200} UNSAFE_className={counterClass} />);

      expect(screen.getByText('0/200')).toHaveClass(counterClass);
    });

    it('should forward transfer props to the visible counter element', () => {
      render(<CharacterCounter {...defaultProps} counterThreshold={200} data-testid="char-counter" />);

      expect(screen.getByTestId('char-counter')).toHaveTextContent('0/200');
    });
  });

  describe('screen reader message', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should set initial screen reader message for empty textarea with counterThreshold', () => {
      render(<CharacterCounter {...defaultProps} counterThreshold={200} />);

      const screenReaderMessage = document.getElementById('test-counter-screen-reader-message');

      expect(screenReaderMessage).toHaveTextContent('You can enter up to 200 characters');
    });

    it('should set initial screen reader message for empty textarea with hasCounter only', () => {
      render(<CharacterCounter {...defaultProps} hasCounter />);

      const screenReaderMessage = document.getElementById('test-counter-screen-reader-message');

      expect(screenReaderMessage).toHaveTextContent('0 characters entered');
    });

    it('should debounce screen reader message updates', () => {
      const { rerender } = render(<CharacterCounter {...defaultProps} counterThreshold={200} currentLength={0} />);

      const screenReaderMessage = document.getElementById('test-counter-screen-reader-message');
      const initialMessage = screenReaderMessage?.textContent;

      rerender(<CharacterCounter {...defaultProps} counterThreshold={200} currentLength={5} />);

      expect(screenReaderMessage).toHaveTextContent(initialMessage!);

      act(() => {
        jest.advanceTimersByTime(500);
      });

      expect(screenReaderMessage).toHaveTextContent('195 characters remaining');
    });

    it('should use singular form for 1 character remaining', () => {
      render(<CharacterCounter {...defaultProps} counterThreshold={6} currentLength={5} />);

      act(() => {
        jest.advanceTimersByTime(500);
      });

      const screenReaderMessage = document.getElementById('test-counter-screen-reader-message');

      expect(screenReaderMessage).toHaveTextContent('1 character remaining');
    });

    it('should show over limit message', () => {
      render(<CharacterCounter {...defaultProps} counterThreshold={5} currentLength={11} />);

      act(() => {
        jest.advanceTimersByTime(500);
      });

      const screenReaderMessage = document.getElementById('test-counter-screen-reader-message');

      expect(screenReaderMessage).toHaveTextContent('6 characters over limit');
    });

    it('should use singular form for 1 character over limit', () => {
      render(<CharacterCounter {...defaultProps} counterThreshold={5} currentLength={6} />);

      act(() => {
        jest.advanceTimersByTime(500);
      });

      const screenReaderMessage = document.getElementById('test-counter-screen-reader-message');

      expect(screenReaderMessage).toHaveTextContent('1 character over limit');
    });

    it('should show characters entered for hasCounter without threshold', () => {
      render(<CharacterCounter {...defaultProps} hasCounter currentLength={5} />);

      act(() => {
        jest.advanceTimersByTime(500);
      });

      const screenReaderMessage = document.getElementById('test-counter-screen-reader-message');

      expect(screenReaderMessage).toHaveTextContent('5 characters entered');
    });
  });
});
