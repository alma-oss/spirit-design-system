import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  requiredPropsTest,
  restPropsTest,
  sizePropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
  validationStatePropsTest,
  validationTextPropsTest,
} from '@local/tests';
import TextArea from '../TextArea';

jest.mock('../../../hooks/useIcon');

describe('TextArea', () => {
  let consoleWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });

  classNamePrefixProviderTest(TextArea, 'TextArea');

  stylePropsTest(TextArea);

  requiredPropsTest(TextArea, 'textbox', 'id', 'example-id');

  restPropsTest(TextArea, 'textarea');

  validationStatePropsTest(TextArea, 'TextArea--');

  validationTextPropsTest(TextArea, '.TextArea__validationText');

  validHtmlAttributesTest(TextArea);

  ariaAttributesTest(TextArea);

  sizePropsTest(TextArea);

  it('should have label', () => {
    render(<TextArea id="textarea" label="Label" />);

    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it('should have input classname', () => {
    render(<TextArea id="textarea" label="Label" />);

    expect(screen.getByRole('textbox')).toHaveClass('TextArea__input');
  });

  it('should have helper text', () => {
    render(<TextArea id="textarea" label="Label" helperText="helper text" />);

    expect(screen.getByRole('textbox').nextElementSibling).toHaveTextContent('helper text');
  });

  it('should have fluid classname', () => {
    render(<TextArea id="textarea" label="Label" isFluid />);

    expect(screen.getByRole('textbox').parentElement).toHaveClass('TextArea--fluid');
  });

  describe('autoresizing', () => {
    it('should adjust height when mounted and autoresizing is enabled', () => {
      render(<TextArea id="textarea" label="Label" isFluid isAutoResizing />);

      expect(screen.getByRole('textbox').style.height).toBe('2px');
    });

    it('should not adjust height when mounted and autoresizing is not used', () => {
      render(<TextArea id="textarea" label="Label" isFluid />);

      expect(screen.getByRole('textbox').style.height).toBe('');
    });
  });

  it('should render label with html tags', () => {
    render(
      <TextArea
        id="textarea"
        label={
          <>
            TextArea <b>Label</b>
          </>
        }
      />,
    );

    const element = screen.getByRole('textbox').parentElement?.firstChild as HTMLElement;

    expect(element).toHaveTextContent('TextArea Label');
    expect(element.innerHTML).toBe('TextArea <b>Label</b>');
  });

  it('should use provided maxLength when counterThreshold is active', () => {
    render(<TextArea id="textarea" label="Label" counterThreshold={200} maxLength={200} />);

    expect(screen.getByRole('textbox')).toHaveAttribute('maxLength', '200');
  });

  it('should not set native maxLength when counter is not active', () => {
    render(<TextArea id="textarea" label="Label" />);

    expect(screen.getByRole('textbox')).not.toHaveAttribute('maxLength');
  });

  it('should use provided maxLength when only hasCounter is used', () => {
    render(<TextArea id="textarea" label="Label" hasCounter maxLength={10} />);

    expect(screen.getByRole('textbox')).toHaveAttribute('maxLength', '10');
  });

  it('should use consumer maxLength when lower than the safety limit and counter is active', () => {
    render(<TextArea id="textarea" label="Label" counterThreshold={200} maxLength={180} />);

    expect(screen.getByRole('textbox')).toHaveAttribute('maxLength', '180');
  });

  it('should keep consumer maxLength when counter is active', () => {
    render(<TextArea id="textarea" label="Label" counterThreshold={200} maxLength={50000} />);

    expect(screen.getByRole('textbox')).toHaveAttribute('maxLength', '50000');
  });

  it('should warn in development when maxLength is lower than counterThreshold', () => {
    render(<TextArea id="textarea" label="Label" counterThreshold={10} maxLength={5} />);

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('`maxLength` should be greater than or equal to `counterThreshold`'),
    );
  });

  describe('counter', () => {
    it('should render counter when counterThreshold is set', () => {
      render(<TextArea id="textarea" label="Label" counterThreshold={200} maxLength={200} />);

      const counter = screen.getByText('0/200');

      expect(counter).toBeInTheDocument();
    });

    it('should render counter when hasCounter is set', () => {
      render(<TextArea id="textarea" label="Label" hasCounter maxLength={10} />);

      const counter = screen.getByText('0');

      expect(counter).toBeInTheDocument();
      expect(counter).toHaveTextContent('0');
    });

    it('should not render counter without hasCounter or counterThreshold', () => {
      render(<TextArea id="textarea" label="Label" />);

      const counter = screen.queryByText('0/200');

      expect(counter).not.toBeInTheDocument();
    });

    it('should show current/threshold with counterThreshold', () => {
      render(<TextArea id="textarea" label="Label" counterThreshold={200} maxLength={200} value="Hello" />);

      const counter = screen.getByText('5/200');

      expect(counter).toHaveTextContent('5/200');
    });

    it('should show just the count with hasCounter only', () => {
      render(<TextArea id="textarea" label="Label" hasCounter maxLength={10} value="Hello" />);

      const counter = screen.getByText('5');

      expect(counter).toHaveTextContent('5');
    });

    it('should mark root as disabled when isDisabled so counter inherits disabled color', () => {
      render(<TextArea id="textarea" label="Label" counterThreshold={200} maxLength={200} isDisabled />);

      expect(screen.getByRole('textbox').closest('.TextArea')).toHaveClass('TextArea--disabled');
      expect(screen.getByText('0/200')).toBeInTheDocument();
    });

    it('should render screen reader message element', () => {
      render(<TextArea id="textarea" label="Label" counterThreshold={200} maxLength={200} />);

      const screenReaderMessage = screen.getByText('You can enter up to 200 characters');

      expect(screenReaderMessage).toBeInTheDocument();
      expect(screenReaderMessage).toHaveAttribute('id', 'textarea__counterScreenReaderMessage');
      expect(screenReaderMessage).toHaveAttribute('aria-live', 'polite');
      expect(screenReaderMessage).toHaveAttribute('aria-atomic', 'true');
    });

    it('should have counter with aria-hidden', () => {
      render(<TextArea id="textarea" label="Label" counterThreshold={200} maxLength={200} />);

      const counter = screen.getByText('0/200');

      expect(counter).toHaveAttribute('aria-hidden', 'true');
    });

    it('should update counter on uncontrolled input change', () => {
      render(<TextArea id="textarea" label="Label" counterThreshold={200} maxLength={200} />);

      const textarea = screen.getByRole('textbox');
      fireEvent.change(textarea, { target: { value: 'test' } });

      const counter = screen.getByText('4/200');

      expect(counter).toHaveTextContent('4/200');
    });

    it('should link textarea to screen reader message via aria-describedby', () => {
      render(<TextArea id="textarea" label="Label" counterThreshold={200} maxLength={200} />);

      const textarea = screen.getByRole('textbox');
      const ariaDescribedBy = textarea.getAttribute('aria-describedby') || '';

      expect(ariaDescribedBy).toContain('textarea__counterScreenReaderMessage');
    });
  });
});
